import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatDistanceKm,
  formatTemperature,
  formatPeriod,
  formatRotation,
  formatSpeed,
} from '../utils/formatters';

describe('Scientific Measurement Formatters', () => {
  it('formats large distances into millions and billions of kilometers', () => {
    expect(formatDistanceKm(149_600_000)).toBe('149.60 million km');
    expect(formatDistanceKm(1_433_500_000)).toBe('1.43 billion km');
    expect(formatDistanceKm(4879)).toBe('4,879 km');
  });

  it('formats temperatures in Celsius, Fahrenheit, and Kelvin', () => {
    const temp = formatTemperature(464);
    expect(temp).toContain('+464 °C');
    expect(temp).toContain('867 °F');
    expect(temp).toContain('737 K');

    const freezing = formatTemperature(-180);
    expect(freezing).toContain('-180 °C');
    expect(freezing).toContain('-292 °F');
  });

  it('formats orbital periods into days and years', () => {
    expect(formatPeriod(87.97)).toContain('87.97 Earth days');
    expect(formatPeriod(365.256)).toContain('1.00 Earth years');
    expect(formatPeriod(4332.59)).toContain('11.86 Earth years');
  });

  it('formats rotation periods with retrograde indicator', () => {
    expect(formatRotation(23.934)).toContain('23.93 hours');
    expect(formatRotation(-5832.5)).toContain('Retrograde');
  });

  it('formats orbital velocities with mph equivalence', () => {
    const speed = formatSpeed(29.78);
    expect(speed).toContain('29.78 km/s');
    expect(speed).toContain('mph');
  });

  it('formats numbers with international grouping separators', () => {
    expect(formatNumber(1392700)).toBe('1,392,700');
  });
});
