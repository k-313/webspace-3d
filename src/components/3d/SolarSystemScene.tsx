import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSimulation } from '../../store/simulationContext';
import { CELESTIAL_BODIES } from '../../data/celestialBodies';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OrbitPath } from './OrbitPath';
import { AsteroidBelt } from './AsteroidBelt';
import { Starfield } from './Starfield';
import { SceneCameraController } from './SceneCameraController';

const SimulationTimeTicker: React.FC = () => {
  const { isPaused, simulationSpeed, setSimulatedDays } = useSimulation();

  useFrame((_, delta) => {
    if (!isPaused && simulationSpeed !== 0) {
      // 1 real second = simulationSpeed Earth days
      setSimulatedDays((prev) => prev + delta * simulationSpeed);
    }
  });

  return null;
};

export const SolarSystemScene: React.FC = () => {
  const planetPositions = useRef<Map<string, THREE.Vector3>>(new Map());
  const {
    showOrbits,
    scaleMode,
    selectedPlanetId,
    hoveredPlanetId,
    graphicsQuality
  } = useSimulation();

  const handlePositionUpdate = useCallback((id: string, pos: THREE.Vector3) => {
    planetPositions.current.set(id, pos.clone());
  }, []);

  const dpr = graphicsQuality === 'low' ? 1 : graphicsQuality === 'medium' ? [1, 1.5] : [1, 2];

  return (
    <div className="w-full h-full absolute inset-0 select-none bg-space-950 overflow-hidden">
      <Canvas
        camera={{ position: [0, 48, 72], fov: 45, near: 0.1, far: 2000 }}
        dpr={dpr as any}
        gl={{
          antialias: graphicsQuality !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
        onPointerDown={(e) => {
          // Deselect if user clicks empty deep space
          if (e.target === e.currentTarget) {
            // Handled at canvas level
          }
        }}
      >
        <color attach="background" args={['#030712']} />

        {/* Global time accumulator */}
        <SimulationTimeTicker />

        {/* Camera controller & OrbitControls */}
        <SceneCameraController planetPositions={planetPositions} />

        {/* Background stars */}
        <Starfield />

        {/* Central Sun */}
        <Sun />

        {/* Planets and Orbit Paths */}
        {CELESTIAL_BODIES.filter((b) => b.id !== 'sun').map((body) => (
          <React.Fragment key={body.id}>
            {showOrbits && (
              <OrbitPath
                body={body}
                scaleMode={scaleMode}
                isSelected={selectedPlanetId === body.id}
                isHovered={hoveredPlanetId === body.id}
              />
            )}
            <Planet
              body={body}
              onPositionUpdate={handlePositionUpdate}
            />
          </React.Fragment>
        ))}

        {/* Main Asteroid Belt */}
        <AsteroidBelt />
      </Canvas>
    </div>
  );
};
