/**
 * Utility formatters for scientific measurements.
 */

export function formatNumber(val: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: Number.isInteger(val) ? 0 : Math.min(decimals, 1),
  }).format(val);
}

export function formatDistanceKm(km: number): string {
  if (km >= 1_000_000_000) {
    return `${(km / 1_000_000_000).toFixed(2)} billion km`;
  }
  if (km >= 1_000_000) {
    return `${(km / 1_000_000).toFixed(2)} million km`;
  }
  return `${formatNumber(km)} km`;
}

export function formatTemperature(celsius: number): string {
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  const kelvin = Math.round(celsius + 273.15);
  return `${celsius > 0 ? '+' : ''}${celsius} °C (${fahrenheit} °F / ${kelvin} K)`;
}

export function formatPeriod(days: number): string {
  if (days === 0) return 'N/A';
  if (days >= 365.25) {
    const years = days / 365.25;
    return `${years.toFixed(2)} Earth years (${formatNumber(Math.round(days))} days)`;
  }
  return `${formatNumber(days, 2)} Earth days`;
}

export function formatRotation(hours: number): string {
  const isRetrograde = hours < 0;
  const absHours = Math.abs(hours);
  const prefix = isRetrograde ? 'Retrograde (' : '';
  const suffix = isRetrograde ? ')' : '';

  if (absHours >= 24) {
    const days = (absHours / 24).toFixed(1);
    return `${prefix}${days} Earth days (${formatNumber(absHours, 1)} h)${suffix}`;
  }
  return `${prefix}${formatNumber(absHours, 2)} hours${suffix}`;
}

export function formatSpeed(kms: number): string {
  const mph = Math.round(kms * 2236.94);
  return `${formatNumber(kms, 2)} km/s (~${formatNumber(mph)} mph)`;
}
