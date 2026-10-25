import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../store/simulationContext';

export const Starfield: React.FC = () => {
  const { graphicsQuality } = useSimulation();

  const count = useMemo(() => {
    switch (graphicsQuality) {
      case 'low': return 2500;
      case 'medium': return 6000;
      case 'high': default: return 12000;
    }
  }, [graphicsQuality]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const starColors = [
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#93c5fd'), // Blue-white
      new THREE.Color('#fef08a'), // Warm yellow
      new THREE.Color('#fed7aa'), // Orange tint
      new THREE.Color('#f43f5e'), // Red tint
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars on a sphere of radius 300 - 800
      const radius = 300 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        sizeAttenuation={false}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
