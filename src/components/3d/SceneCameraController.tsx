import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { useSimulation } from '../../store/simulationContext';
import { CELESTIAL_BODIES } from '../../data/celestialBodies';
import { TOUR_STOPS } from '../../data/tourStops';
import { getPlanetRadiusForScale } from '../../utils/orbitalMath';

interface SceneCameraControllerProps {
  planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>>;
}

export const SceneCameraController: React.FC<SceneCameraControllerProps> = ({
  planetPositions,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 48, 72));

  const {
    selectedPlanetId,
    cameraMode,
    scaleMode,
    tourActive,
    tourStepIndex,
    reducedMotion,
  } = useSimulation();

  // Handle tour camera presets or planet selection changes
  useEffect(() => {
    if (tourActive) {
      const stop = TOUR_STOPS[tourStepIndex];
      if (stop) {
        targetCamPos.current.set(...stop.cameraSettings.position);
        targetLookAt.current.set(...stop.cameraSettings.lookAt);
      }
      return;
    }

    if (!selectedPlanetId) {
      if (cameraMode === 'top-down') {
        targetCamPos.current.set(0, 110, 0.01);
        targetLookAt.current.set(0, 0, 0);
      } else {
        // Overview mode
        targetCamPos.current.set(0, 48, 72);
        targetLookAt.current.set(0, 0, 0);
      }
      return;
    }

    // A specific planet or the Sun is selected
    const body = CELESTIAL_BODIES.find((b) => b.id === selectedPlanetId);
    if (!body) return;

    const r = getPlanetRadiusForScale(
      body.visual.illustrativeRadius,
      body.visual.trueRadiusEarthRelative,
      scaleMode
    );

    // Compute comfortable camera distance proportional to radius
    const dist = Math.max(3.2, r * 3.4);
    const planetPos = planetPositions.current.get(selectedPlanetId) || new THREE.Vector3(0, 0, 0);

    targetLookAt.current.copy(planetPos);
    targetCamPos.current.copy(planetPos).add(new THREE.Vector3(0, dist * 0.45, dist * 0.95));
  }, [selectedPlanetId, cameraMode, scaleMode, tourActive, tourStepIndex, planetPositions]);

  // Smooth lerping frame loop
  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // In follow mode, continuously track the moving target
    if (selectedPlanetId && cameraMode === 'follow' && !tourActive) {
      const livePos = planetPositions.current.get(selectedPlanetId);
      if (livePos) {
        // Delta offset between previous target and current live position
        const offset = camera.position.clone().sub(controlsRef.current.target);
        targetLookAt.current.copy(livePos);
        targetCamPos.current.copy(livePos).add(offset);
      }
    }

    const lerpFactor = reducedMotion ? 1.0 : Math.min(1.0, delta * 3.8);

    controlsRef.current.target.lerp(targetLookAt.current, lerpFactor);
    camera.position.lerp(targetCamPos.current, lerpFactor);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.05}
      minDistance={1.5}
      maxDistance={450}
      maxPolarAngle={Math.PI / 2 + 0.15}
    />
  );
};
