import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SatelliteData } from '../../data/celestialBodies';
import { getMoonTexture } from '../../utils/proceduralTextures';
import { useSimulation } from '../../store/simulationContext';

interface MoonProps {
  data: SatelliteData;
  planetRadius: number;
}

export const Moon: React.FC<MoonProps> = ({ data, planetRadius }) => {
  const groupRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  const { isPaused, reducedMotion } = useSimulation();

  const texture = useMemo(() => getMoonTexture(), []);

  // Compute illustrative orbit radius around parent planet
  const orbitRadius = Math.max(planetRadius * 1.5, data.illustrativeOrbitRadius);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Orbit around parent planet
    if (!isPaused && !reducedMotion) {
      // Angular velocity omega = 2*PI / period
      const speed = (2 * Math.PI) / (data.orbitalPeriodDays || 27.3);
      groupRef.current.rotation.y += delta * speed * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbit ring around planet */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={useMemo(() => {
              const pts = new Float32Array(64 * 3);
              for (let i = 0; i < 64; i++) {
                const angle = (i / 64) * Math.PI * 2;
                pts[i * 3] = Math.cos(angle) * orbitRadius;
                pts[i * 3 + 1] = 0;
                pts[i * 3 + 2] = Math.sin(angle) * orbitRadius;
              }
              return pts;
            }, [orbitRadius])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.15} />
      </line>

      {/* Moon mesh */}
      <mesh
        ref={moonMeshRef}
        position={[orbitRadius, 0, 0]}
      >
        <sphereGeometry args={[data.illustrativeRadius, 24, 24]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};
