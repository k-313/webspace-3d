import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSimulation } from '../../store/simulationContext';

export const AsteroidBelt: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { graphicsQuality, isPaused, reducedMotion, showAsteroidBelt, scaleMode } = useSimulation();

  const count = useMemo(() => {
    switch (graphicsQuality) {
      case 'low': return 750;
      case 'medium': return 1600;
      case 'high': default: return 3200;
    }
  }, [graphicsQuality]);

  const innerRadius = scaleMode === 'true-distance' ? 2.2 * 25 : 22.5;
  const outerRadius = scaleMode === 'true-distance' ? 3.3 * 25 : 26.0;

  // Initialize asteroid transforms
  const asteroidData = useMemo(() => {
    const data: Array<{
      radius: number;
      angle: number;
      speed: number;
      yOffset: number;
      scale: number;
      rotSpeed: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      // Keplerian speed approximately 1 / sqrt(r)
      const speed = (0.28 / Math.sqrt(r)) * (0.8 + Math.random() * 0.4);
      const yOffset = (Math.random() - 0.5) * (scaleMode === 'true-distance' ? 2.5 : 1.2);
      const scale = 0.04 + Math.random() * 0.08;
      const rotSpeed = (Math.random() - 0.5) * 2;

      data.push({ radius: r, angle, speed, yOffset, scale, rotSpeed });
    }
    return data;
  }, [count, innerRadius, outerRadius, scaleMode]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current || !showAsteroidBelt) return;

    for (let i = 0; i < count; i++) {
      const ast = asteroidData[i];
      if (!isPaused && !reducedMotion) {
        ast.angle += ast.speed * delta * 0.2;
      }

      const x = Math.cos(ast.angle) * ast.radius;
      const z = Math.sin(ast.angle) * ast.radius;

      dummy.position.set(x, ast.yOffset, z);
      dummy.rotation.set(ast.angle * ast.rotSpeed, ast.angle * 2, 0);
      dummy.scale.set(ast.scale, ast.scale * (0.7 + Math.random() * 0.3), ast.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!showAsteroidBelt) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#a8a29e"
        roughness={0.7}
        metalness={0.2}
      />
    </instancedMesh>
  );
};
