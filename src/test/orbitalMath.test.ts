import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  calculateOrbitPosition,
  generateOrbitPathPoints,
  getOrbitRadiusForScale,
  getPlanetRadiusForScale,
} from '../utils/orbitalMath';

describe('Orbital Mathematics and Scaling', () => {
  it('returns origin for semi-major axis <= 0', () => {
    const pos = calculateOrbitPosition(0, 0, 0, 1, 100);
    expect(pos.x).toBe(0);
    expect(pos.y).toBe(0);
    expect(pos.z).toBe(0);
  });

  it('calculates elliptical orbit positions with eccentricity offset', () => {
    const a = 10;
    const e = 0.2; // Significant eccentricity like Mercury
    const pos = calculateOrbitPosition(a, e, 0, 1, 0, 0);

    // At mean anomaly M = 0, x = a * (cos(E) - e) = a * (1 - e) = 10 * 0.8 = 8
    expect(pos.x).toBeCloseTo(8, 1);
    expect(pos.y).toBeCloseTo(0, 4);
    expect(pos.z).toBeCloseTo(0, 4);
  });

  it('correctly applies inclination tilt out of the XZ plane', () => {
    const a = 15;
    const incDeg = 30; // 30 degrees inclination
    // At quarter orbit M = PI / 2, coordinate is along Z axis in plane, tilted into Y
    const pos = calculateOrbitPosition(a, 0, incDeg, 1, Math.PI * 10, 0);
    expect(pos).toBeInstanceOf(THREE.Vector3);
  });

  it('generates correct number of path points for smooth rendering', () => {
    const points = generateOrbitPathPoints(20, 0.05, 5, 64);
    expect(points.length).toBe(65); // 0 to 64 inclusive
    // Path should close back onto itself
    expect(points[0].distanceTo(points[points.length - 1])).toBeCloseTo(0, 3);
  });

  it('switches between illustrative, true-distance, and true-size scale modes', () => {
    const illustrativeRadius = 1.2;
    const trueRadiusEarthRelative = 1.0;
    const illustrativeDist = 15.8;
    const trueDistanceAu = 1.0;

    // Illustrative mode preserves tuned visual dimensions
    expect(getOrbitRadiusForScale(illustrativeDist, trueDistanceAu, 'illustrative')).toBe(15.8);
    expect(getPlanetRadiusForScale(illustrativeRadius, trueRadiusEarthRelative, 'illustrative')).toBe(1.2);

    // True distance mode scales proportional to AU
    expect(getOrbitRadiusForScale(illustrativeDist, trueDistanceAu, 'true-distance')).toBe(25.0);

    // True size mode scales proportional to Earth radius
    expect(getPlanetRadiusForScale(illustrativeRadius, trueRadiusEarthRelative, 'true-size')).toBe(0.4);
    // Jupiter true size (10.97 x Earth = ~4.388 units)
    expect(getPlanetRadiusForScale(2.6, 10.97, 'true-size')).toBeCloseTo(4.388, 2);
  });
});
