import React, { useMemo } from 'react';
import * as THREE from 'three';
import { CelestialBody } from '../../data/celestialBodies';
import { generateOrbitPathPoints, getOrbitRadiusForScale, ScaleMode } from '../../utils/orbitalMath';

interface OrbitPathProps {
  body: CelestialBody;
  scaleMode: ScaleMode;
  isSelected: boolean;
  isHovered: boolean;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({
  body,
  scaleMode,
  isSelected,
  isHovered,
}) => {
  const semiMajorAxis = getOrbitRadiusForScale(
    body.visual.illustrativeOrbitRadius,
    body.visual.trueDistanceAu,
    scaleMode
  );

  const points = useMemo(() => {
    return generateOrbitPathPoints(
      semiMajorAxis,
      body.orbital.orbitalEccentricity,
      body.orbital.orbitalInclinationDeg,
      144
    );
  }, [semiMajorAxis, body.orbital.orbitalEccentricity, body.orbital.orbitalInclinationDeg]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  const lineColor = isSelected
    ? '#38bdf8' // Vibrant sky cyan when active
    : isHovered
    ? '#fbbf24' // Warm amber on hover
    : body.color; // Planet's subtle tint

  const opacity = isSelected ? 0.95 : isHovered ? 0.75 : 0.28;

  return (
    <primitive object={new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: opacity,
        depthWrite: false,
      })
    )} />
  );
};
