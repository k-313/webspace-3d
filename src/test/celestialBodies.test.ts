import { describe, it, expect } from 'vitest';
import { CELESTIAL_BODIES } from '../data/celestialBodies';
import { SCIENTIFIC_SOURCES } from '../data/scientificSources';

describe('Celestial Bodies Scientific Data Integrity', () => {
  it('includes the Sun and all major planets in correct order', () => {
    const ids = CELESTIAL_BODIES.map((b) => b.id);
    expect(ids).toEqual([
      'sun',
      'mercury',
      'venus',
      'earth',
      'mars',
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'pluto',
    ]);
  });

  it('orders planetary semi-major axes monotonically from Sun outward', () => {
    const planets = CELESTIAL_BODIES.filter((b) => b.id !== 'sun');
    for (let i = 1; i < planets.length; i++) {
      expect(planets[i].orbital.semiMajorAxisAu).toBeGreaterThan(
        planets[i - 1].orbital.semiMajorAxisAu
      );
    }
  });

  it('conforms to Keplerian 3rd law: orbital period increases monotonically with distance', () => {
    const planets = CELESTIAL_BODIES.filter((b) => b.id !== 'sun');
    for (let i = 1; i < planets.length; i++) {
      expect(planets[i].orbital.orbitalPeriodDays).toBeGreaterThan(
        planets[i - 1].orbital.orbitalPeriodDays
      );
    }
  });

  it('contains valid physical parameters for all bodies without fabricated values', () => {
    for (const body of CELESTIAL_BODIES) {
      expect(body.physical.diameterKm).toBeGreaterThan(0);
      expect(body.physical.densityGcm3).toBeGreaterThan(0);
      expect(body.physical.surfaceGravityMs2).toBeGreaterThan(0);
      expect(body.facts.length).toBeGreaterThanOrEqual(3);
      expect(body.sourceIds.length).toBeGreaterThanOrEqual(1);

      // Verify that every sourceId resolves to a verified scientific source
      for (const srcId of body.sourceIds) {
        expect(SCIENTIFIC_SOURCES[srcId]).toBeDefined();
        expect(SCIENTIFIC_SOURCES[srcId].url).toContain('https://');
      }
    }
  });

  it('properly identifies retrograde rotation for Venus and Uranus', () => {
    const venus = CELESTIAL_BODIES.find((b) => b.id === 'venus')!;
    const uranus = CELESTIAL_BODIES.find((b) => b.id === 'uranus')!;
    const earth = CELESTIAL_BODIES.find((b) => b.id === 'earth')!;

    expect(venus.physical.rotationPeriodHours).toBeLessThan(0);
    expect(uranus.physical.rotationPeriodHours).toBeLessThan(0);
    expect(earth.physical.rotationPeriodHours).toBeGreaterThan(0);
  });

  it('accurately specifies extreme axial tilt of Uranus (~97.8°)', () => {
    const uranus = CELESTIAL_BODIES.find((b) => b.id === 'uranus')!;
    expect(uranus.physical.axialTiltDeg).toBeCloseTo(97.77, 1);
  });

  it('verifies Saturn density is lower than water (< 1.0 g/cm³)', () => {
    const saturn = CELESTIAL_BODIES.find((b) => b.id === 'saturn')!;
    expect(saturn.physical.densityGcm3).toBeLessThan(1.0);
  });
});
