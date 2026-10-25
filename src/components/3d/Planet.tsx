import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CelestialBody } from '../../data/celestialBodies';
import { useSimulation } from '../../store/simulationContext';
import { getTextureByType } from '../../utils/proceduralTextures';
import {
  calculateOrbitPosition,
  getOrbitRadiusForScale,
  getPlanetRadiusForScale,
} from '../../utils/orbitalMath';
import { RingSystem } from './RingSystem';
import { Moon } from './Moon';

interface PlanetProps {
  body: CelestialBody;
  onPositionUpdate?: (id: string, pos: THREE.Vector3) => void;
}

export const Planet: React.FC<PlanetProps> = ({ body, onPositionUpdate }) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const {
    selectedPlanetId,
    setSelectedPlanetId,
    hoveredPlanetId,
    setHoveredPlanetId,
    showLabels,
    scaleMode,
    isPaused,
    reducedMotion,
    simulatedDays,
  } = useSimulation();

  const isSelected = selectedPlanetId === body.id;
  const isHovered = hoveredPlanetId === body.id;

  const texture = useMemo(() => getTextureByType(body.textureType), [body.textureType]);

  // Scaled dimensions
  const orbitRadius = useMemo(() => {
    return getOrbitRadiusForScale(
      body.visual.illustrativeOrbitRadius,
      body.visual.trueDistanceAu,
      scaleMode
    );
  }, [body.visual, scaleMode]);

  const planetRadius = useMemo(() => {
    return getPlanetRadiusForScale(
      body.visual.illustrativeRadius,
      body.visual.trueRadiusEarthRelative,
      scaleMode
    );
  }, [body.visual, scaleMode]);

  // Unique initial phase offset so planets don't all start in a straight line
  const initialPhase = useMemo(() => {
    return (body.orderFromSun * 0.785) % (Math.PI * 2);
  }, [body.orderFromSun]);

  // Update orbit and spin every frame
  useFrame((_, delta) => {
    if (!planetGroupRef.current) return;

    // Calculate instantaneous orbit coordinate
    const pos = calculateOrbitPosition(
      orbitRadius,
      body.orbital.orbitalEccentricity,
      body.orbital.orbitalInclinationDeg,
      body.visual.orbitalAngularSpeedFactor,
      simulatedDays,
      initialPhase
    );

    planetGroupRef.current.position.copy(pos);
    if (onPositionUpdate) {
      onPositionUpdate(body.id, pos);
    }

    // Spin around its tilted axial pole
    if (!isPaused && !reducedMotion && planetMeshRef.current) {
      // Rotation direction: negative for retrograde (Venus, Uranus, Pluto)
      const rotDirection = body.physical.rotationPeriodHours < 0 ? -1 : 1;
      const hours = Math.abs(body.physical.rotationPeriodHours) || 24;
      // Faster visual spin for user appreciation
      const spinSpeed = (24 / hours) * 0.4;
      planetMeshRef.current.rotation.y += delta * spinSpeed * rotDirection;
    }
  });

  // Axial tilt in radians
  const axialTiltRad = useMemo(() => {
    return THREE.MathUtils.degToRad(body.physical.axialTiltDeg);
  }, [body.physical.axialTiltDeg]);

  return (
    <group ref={planetGroupRef}>
      {/* Tilted Axis Container */}
      <group rotation={[axialTiltRad, 0, 0]}>
        {/* Main Planet Mesh */}
        <mesh
          ref={planetMeshRef}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPlanetId(body.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPlanetId(body.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredPlanetId(null);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[planetRadius, 40, 40]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.65}
            metalness={0.1}
            emissive={isSelected ? new THREE.Color(body.glowColor) : new THREE.Color(body.color)}
            emissiveIntensity={isSelected ? 0.45 : 0.08}
          />
        </mesh>

        {/* Atmospheric Glow Shell (for Earth, Venus, Mars, Ice Giants) */}
        {body.classification !== 'Star' && (
          <mesh scale={[1.08, 1.08, 1.08]}>
            <sphereGeometry args={[planetRadius, 24, 24]} />
            <meshBasicMaterial
              color={body.glowColor}
              transparent
              opacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.1}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Planetary Ring System (Saturn, Uranus, Neptune) */}
        {body.rings && (
          <RingSystem
            innerRadius={body.rings.innerRadiusIllustrative}
            outerRadius={body.rings.outerRadiusIllustrative}
            color={body.rings.color}
            opacity={body.rings.opacity}
            textureType={body.id === 'saturn' ? 'saturn-rings' : undefined}
          />
        )}
      </group>

      {/* Selected Planet Pulsing Target Reticle */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planetRadius * 1.5, planetRadius * 1.6, 48]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Moons and Satellites */}
      {body.satellites && body.satellites.map((sat) => (
        <Moon
          key={sat.id}
          data={sat}
          planetRadius={planetRadius}
        />
      ))}

      {/* Planet Label HTML Badge */}
      {(showLabels || isHovered || isSelected) && (
        <Html
          position={[0, planetRadius + 1.2, 0]}
          center
          distanceFactor={38}
          zIndexRange={[100, 0]}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlanetId(body.id);
            }}
            aria-label={`Select ${body.name}`}
            className={`cursor-pointer px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide whitespace-nowrap transition-all duration-200 pointer-events-auto select-none ${
              isSelected
                ? 'bg-sky-500 text-slate-950 font-bold ring-2 ring-sky-300 shadow-lg shadow-sky-500/50 scale-110'
                : isHovered
                ? 'bg-space-850/90 text-sky-300 border border-sky-400/70 shadow-md scale-105'
                : 'bg-space-950/75 text-slate-200 border border-slate-700/60 backdrop-blur-sm hover:border-sky-400'
            }`}
          >
            {body.name}
            {isSelected && <span className="ml-1.5 opacity-80">({body.orbital.semiMajorAxisAu} AU)</span>}
          </button>
        </Html>
      )}
    </group>
  );
};
