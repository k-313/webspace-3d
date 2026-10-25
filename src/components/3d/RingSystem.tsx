import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getSaturnRingsTexture } from '../../utils/proceduralTextures';

interface RingSystemProps {
  innerRadius: number;
  outerRadius: number;
  color?: string;
  opacity?: number;
  textureType?: string;
}

export const RingSystem: React.FC<RingSystemProps> = ({
  innerRadius,
  outerRadius,
  color = '#e2e8f0',
  opacity = 0.85,
  textureType = 'saturn-rings',
}) => {
  const texture = useMemo(() => {
    if (textureType === 'saturn-rings') {
      return getSaturnRingsTexture();
    }
    return null;
  }, [textureType]);

  const geometry = useMemo(() => {
    // RingGeometry default is in XY plane; we rotate so it aligns horizontally with planet equator
    const geom = new THREE.RingGeometry(innerRadius, outerRadius, 96);
    // Orient ring geometry flat along XZ plane
    geom.rotateX(Math.PI / 2);
    return geom;
  }, [innerRadius, outerRadius]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        map={texture || undefined}
        alphaMap={texture || undefined}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.1}
        depthWrite={false}
      />
    </mesh>
  );
};
