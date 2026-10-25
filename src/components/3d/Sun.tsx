import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSimulation } from '../../store/simulationContext';
import { getSunTexture } from '../../utils/proceduralTextures';
import { CELESTIAL_BODIES } from '../../data/celestialBodies';
import { getPlanetRadiusForScale } from '../../utils/orbitalMath';

export const Sun: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const {
    selectedPlanetId,
    setSelectedPlanetId,
    hoveredPlanetId,
    setHoveredPlanetId,
    showLabels,
    scaleMode,
    isPaused,
    reducedMotion
  } = useSimulation();

  const sunData = CELESTIAL_BODIES.find((b) => b.id === 'sun')!;
  const isSelected = selectedPlanetId === 'sun';
  const isHovered = hoveredPlanetId === 'sun';

  const texture = useMemo(() => getSunTexture(), []);

  // Compute radius based on scale mode
  const radius = useMemo(() => {
    return getPlanetRadiusForScale(
      sunData.visual.illustrativeRadius,
      sunData.visual.trueRadiusEarthRelative,
      scaleMode
    );
  }, [sunData, scaleMode]);

  // Gentle rotation of the Sun on its axis (~25 day period)
  useFrame((_, delta) => {
    if (!isPaused && !reducedMotion) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.08;
      }
      if (coronaRef.current) {
        coronaRef.current.rotation.z -= delta * 0.04;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Omnidirectional Solar Illumination & Ambient Space Starlight */}
      <pointLight
        color="#fffbeb"
        intensity={scaleMode === 'true-distance' ? 8.0 : 5.0}
        distance={500}
        decay={0.6}
      />
      <ambientLight intensity={0.7} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#1e293b"
        intensity={0.4}
      />

      {/* Sun Photosphere Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPlanetId('sun');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPlanetId('sun');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredPlanetId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          emissive="#f59e0b"
          emissiveMap={texture}
          emissiveIntensity={isSelected ? 1.6 : isHovered ? 1.4 : 1.15}
          roughness={0.7}
        />
      </mesh>

      {/* Atmospheric Corona Glow Halo */}
      <mesh ref={coronaRef} scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={isSelected ? 0.35 : 0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Solar Flare Shell */}
      <mesh scale={[1.45, 1.45, 1.45]}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Sun Label Badge */}
      {(showLabels || isHovered || isSelected) && (
        <Html
          position={[0, radius + 1.2, 0]}
          center
          distanceFactor={35}
          zIndexRange={[100, 0]}
        >
          <div
            onClick={() => setSelectedPlanetId('sun')}
            className={`cursor-pointer px-2.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider whitespace-nowrap transition-all duration-200 pointer-events-auto select-none ${
              isSelected
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-lg shadow-amber-500/50 scale-110'
                : isHovered
                ? 'bg-space-850/90 text-amber-400 border border-amber-400/60 shadow-md scale-105'
                : 'bg-space-950/75 text-amber-300/90 border border-amber-500/30 backdrop-blur-sm'
            }`}
          >
            ☀️ THE SUN
          </div>
        </Html>
      )}
    </group>
  );
};
