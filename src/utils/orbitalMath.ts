import * as THREE from 'three';

export type ScaleMode = 'illustrative' | 'true-distance' | 'true-size';

/**
 * Calculates the 3D position of a body in its orbit at a given simulation time.
 * We model Keplerian elliptical orbits with real eccentricities and inclinations.
 * 
 * @param semiMajorAxis The orbital radius (illustrative or AU scaled)
 * @param eccentricity The orbital eccentricity (0 for circular, e.g. 0.2056 for Mercury)
 * @param inclinationDeg The orbital plane tilt relative to ecliptic (degrees)
 * @param angularSpeed The speed multiplier derived from Kepler's 3rd Law
 * @param time Current accumulated simulation time in days
 * @param initialPhase Initial starting angle in radians
 */
export function calculateOrbitPosition(
  semiMajorAxis: number,
  eccentricity: number,
  inclinationDeg: number,
  angularSpeed: number,
  time: number,
  initialPhase: number = 0
): THREE.Vector3 {
  if (semiMajorAxis <= 0) {
    return new THREE.Vector3(0, 0, 0);
  }

  // Mean anomaly M = n * t + M0
  const meanAnomaly = (angularSpeed * time * 0.05 + initialPhase) % (Math.PI * 2);

  // Approximate eccentric anomaly E using first-order Kepler equation expansion:
  // E ≈ M + e * sin(M) + (e^2 / 2) * sin(2M)
  const eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly) + (eccentricity * eccentricity / 2) * Math.sin(2 * meanAnomaly);

  // True coordinates in orbital plane
  const a = semiMajorAxis;
  const b = a * Math.sqrt(Math.max(0.001, 1 - eccentricity * eccentricity));
  const xOrb = a * (Math.cos(eccentricAnomaly) - eccentricity);
  const zOrb = b * Math.sin(eccentricAnomaly);

  // Apply orbital inclination tilt about X-axis
  const incRad = THREE.MathUtils.degToRad(inclinationDeg);
  const y = -zOrb * Math.sin(incRad);
  const z = zOrb * Math.cos(incRad);
  const x = xOrb;

  return new THREE.Vector3(x, y, z);
}

/**
 * Generates an array of points for rendering an anti-aliased elliptical orbit path.
 */
export function generateOrbitPathPoints(
  semiMajorAxis: number,
  eccentricity: number,
  inclinationDeg: number,
  segments: number = 128
): THREE.Vector3[] {
  if (semiMajorAxis <= 0) return [];

  const points: THREE.Vector3[] = [];
  const incRad = THREE.MathUtils.degToRad(inclinationDeg);
  const a = semiMajorAxis;
  const b = a * Math.sqrt(Math.max(0.001, 1 - eccentricity * eccentricity));

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const xOrb = a * (Math.cos(theta) - eccentricity);
    const zOrb = b * Math.sin(theta);

    const x = xOrb;
    const y = -zOrb * Math.sin(incRad);
    const z = zOrb * Math.cos(incRad);

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

/**
 * Converts scale mode to distance factor.
 * In illustrative mode, we use tuned logarithmic distances so all planets can be seen together.
 * In true-distance mode, 1 AU = 25 units.
 */
export function getOrbitRadiusForScale(
  illustrativeRadius: number,
  trueDistanceAu: number,
  scaleMode: ScaleMode
): number {
  if (scaleMode === 'true-distance') {
    return trueDistanceAu * 25;
  }
  return illustrativeRadius;
}

/**
 * Converts scale mode to planet radius factor.
 */
export function getPlanetRadiusForScale(
  illustrativeRadius: number,
  trueRadiusEarthRelative: number,
  scaleMode: ScaleMode
): number {
  if (scaleMode === 'true-size') {
    // In true size mode, scale proportional to Earth radius = 0.4 units
    return Math.max(0.1, trueRadiusEarthRelative * 0.4);
  }
  return illustrativeRadius;
}
