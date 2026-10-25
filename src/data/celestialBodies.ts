export type BodyClassification =
  | 'Star'
  | 'Terrestrial Planet'
  | 'Gas Giant'
  | 'Ice Giant'
  | 'Dwarf Planet'
  | 'Natural Satellite';

export interface AtmosphereComponent {
  gas: string;
  percentage: string;
}

export interface SatelliteData {
  id: string;
  name: string;
  radiusKm: number;
  orbitRadiusKm: number;
  orbitalPeriodDays: number;
  illustrativeRadius: number;
  illustrativeOrbitRadius: number;
  color: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  tagline: string;
  classification: BodyClassification;
  orderFromSun: number;
  color: string;
  glowColor: string;
  textureType: 'sun' | 'mercury' | 'venus' | 'earth' | 'moon' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
  
  rings?: {
    innerRadiusIllustrative: number;
    outerRadiusIllustrative: number;
    innerRadiusTrue: number;
    outerRadiusTrue: number;
    color: string;
    opacity: number;
  };

  satellites?: SatelliteData[];

  physical: {
    diameterKm: number;
    massKg: string; // e.g. "1.989 × 10³⁰"
    massEarthRelative: number;
    densityGcm3: number;
    surfaceGravityMs2: number;
    gravityEarthRelative: number;
    escapeVelocityKms: number;
    axialTiltDeg: number;
    rotationPeriodHours: number; // negative for retrograde
    meanTemperatureC: number;
    minTemperatureC?: number;
    maxTemperatureC?: number;
  };

  orbital: {
    semiMajorAxisAu: number;
    semiMajorAxisMillionKm: number;
    orbitalPeriodDays: number;
    orbitalPeriodYears: number;
    orbitalVelocityKms: number;
    orbitalInclinationDeg: number;
    orbitalEccentricity: number;
  };

  atmosphere: {
    surfacePressureBar: string;
    composition: AtmosphereComponent[];
  };

  exploration: {
    moonsCount: number;
    discoveredBy: string;
    discoveryYear: string;
    notableMissions: string[];
  };

  visual: {
    // Illustrative scale sizes (tuned for visual balance so inner planets are visible alongside outer gas giants)
    illustrativeRadius: number;
    illustrativeOrbitRadius: number;
    // Real scale relative ratios (Earth radius = 1 unit, 1 AU = 100 units)
    trueRadiusEarthRelative: number;
    trueDistanceAu: number;
    // Keplerian angular velocity factor (omega = 2*PI / T)
    orbitalAngularSpeedFactor: number;
  };

  facts: string[];
  comparisons: {
    weightMultiplier: number;
    lightTravelTimeFromSun: string;
    jetFlightTimeYears: string; // At 900 km/h from Sun
  };

  sourceIds: string[];
}

export const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    name: 'The Sun',
    tagline: 'The Gravitational Anchor and Fusion Heart of Our Solar System',
    classification: 'Star',
    orderFromSun: 0,
    color: '#fbbf24',
    glowColor: '#f59e0b',
    textureType: 'sun',
    physical: {
      diameterKm: 1392700,
      massKg: '1.989 × 10³⁰',
      massEarthRelative: 333000,
      densityGcm3: 1.408,
      surfaceGravityMs2: 274.0,
      gravityEarthRelative: 27.94,
      escapeVelocityKms: 617.7,
      axialTiltDeg: 7.25,
      rotationPeriodHours: 609.12, // ~25.4 Earth days at equator
      meanTemperatureC: 5505, // Photosphere (~5778 K)
      maxTemperatureC: 15000000, // Core
    },
    orbital: {
      semiMajorAxisAu: 0,
      semiMajorAxisMillionKm: 0,
      orbitalPeriodDays: 0,
      orbitalPeriodYears: 0,
      orbitalVelocityKms: 220, // Orbiting Galactic Center
      orbitalInclinationDeg: 0,
      orbitalEccentricity: 0,
    },
    atmosphere: {
      surfacePressureBar: 'Photosphere (~0.868 mbar)',
      composition: [
        { gas: 'Hydrogen (H₂)', percentage: '73.46%' },
        { gas: 'Helium (He)', percentage: '24.85%' },
        { gas: 'Oxygen (O)', percentage: '0.77%' },
        { gas: 'Carbon (C)', percentage: '0.29%' },
        { gas: 'Iron (Fe)', percentage: '0.16%' },
        { gas: 'Neon (Ne)', percentage: '0.12%' },
      ],
    },
    exploration: {
      moonsCount: 0,
      discoveredBy: 'Known since antiquity',
      discoveryYear: 'Prehistoric',
      notableMissions: ['SOHO', 'Solar Dynamics Observatory (SDO)', 'Parker Solar Probe', 'Solar Orbiter'],
    },
    visual: {
      illustrativeRadius: 3.8,
      illustrativeOrbitRadius: 0,
      trueRadiusEarthRelative: 109.3,
      trueDistanceAu: 0,
      orbitalAngularSpeedFactor: 0,
    },
    facts: [
      'Accounts for approximately 99.86% of the total mass of the entire Solar System.',
      'Fuses approximately 600 million metric tons of hydrogen into helium every second in its core.',
      'Photons generated in the core take over 100,000 years to reach the surface, but only 8 minutes and 20 seconds to reach Earth.',
      'The Sun is currently about 4.6 billion years old and halfway through its main-sequence lifespan.',
    ],
    comparisons: {
      weightMultiplier: 27.94,
      lightTravelTimeFromSun: '0 minutes',
      jetFlightTimeYears: '0 years',
    },
    sourceIds: ['nasaSunFactSheet', 'nasaFactSheets'],
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The Scorched, Cratered Swift Planet',
    classification: 'Terrestrial Planet',
    orderFromSun: 1,
    color: '#9ca3af',
    glowColor: '#6b7280',
    textureType: 'mercury',
    physical: {
      diameterKm: 4879,
      massKg: '3.301 × 10²³',
      massEarthRelative: 0.0553,
      densityGcm3: 5.427,
      surfaceGravityMs2: 3.7,
      gravityEarthRelative: 0.38,
      escapeVelocityKms: 4.3,
      axialTiltDeg: 0.034,
      rotationPeriodHours: 1407.6, // 58.65 Earth days
      meanTemperatureC: 167,
      minTemperatureC: -180,
      maxTemperatureC: 430,
    },
    orbital: {
      semiMajorAxisAu: 0.387,
      semiMajorAxisMillionKm: 57.91,
      orbitalPeriodDays: 87.97,
      orbitalPeriodYears: 0.241,
      orbitalVelocityKms: 47.36,
      orbitalInclinationDeg: 7.00,
      orbitalEccentricity: 0.2056,
    },
    atmosphere: {
      surfacePressureBar: 'Trace exosphere (~10⁻¹⁴ bar)',
      composition: [
        { gas: 'Oxygen (O₂)', percentage: '42%' },
        { gas: 'Sodium (Na)', percentage: '29%' },
        { gas: 'Hydrogen (H₂)', percentage: '22%' },
        { gas: 'Helium (He)', percentage: '6%' },
        { gas: 'Potassium (K)', percentage: '0.5%' },
      ],
    },
    exploration: {
      moonsCount: 0,
      discoveredBy: 'Known since antiquity (Assyrian astronomers recorded ~14th century BCE)',
      discoveryYear: 'Antiquity',
      notableMissions: ['Mariner 10 (1974-1975)', 'MESSENGER (2011-2015)', 'BepiColombo (en route)'],
    },
    visual: {
      illustrativeRadius: 0.7,
      illustrativeOrbitRadius: 7.5,
      trueRadiusEarthRelative: 0.383,
      trueDistanceAu: 0.387,
      orbitalAngularSpeedFactor: 4.15, // 365.25 / 87.97
    },
    facts: [
      'Mercury has the highest orbital speed of any planet, traveling at ~47.4 km/s (~106,000 mph).',
      'It experiences a 3:2 spin-orbit resonance: rotating three times on its axis for every two orbits around the Sun.',
      'Possesses the most eccentric orbit of all eight planets, varying from 46 million km to 70 million km from the Sun.',
      'Despite being closest to the Sun, water ice has been discovered in permanently shadowed craters at its north pole.',
    ],
    comparisons: {
      weightMultiplier: 0.38,
      lightTravelTimeFromSun: '3.2 minutes',
      jetFlightTimeYears: '7.3 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons'],
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'Earth’s Hostile Twin with Runaway Greenhouse Heat',
    classification: 'Terrestrial Planet',
    orderFromSun: 2,
    color: '#fbbf24',
    glowColor: '#f59e0b',
    textureType: 'venus',
    physical: {
      diameterKm: 12104,
      massKg: '4.867 × 10²⁴',
      massEarthRelative: 0.815,
      densityGcm3: 5.243,
      surfaceGravityMs2: 8.87,
      gravityEarthRelative: 0.904,
      escapeVelocityKms: 10.36,
      axialTiltDeg: 177.36, // Retrograde spin
      rotationPeriodHours: -5832.5, // -243 Earth days (retrograde)
      meanTemperatureC: 464,
      minTemperatureC: 438,
      maxTemperatureC: 482,
    },
    orbital: {
      semiMajorAxisAu: 0.723,
      semiMajorAxisMillionKm: 108.21,
      orbitalPeriodDays: 224.70,
      orbitalPeriodYears: 0.615,
      orbitalVelocityKms: 35.02,
      orbitalInclinationDeg: 3.39,
      orbitalEccentricity: 0.0067, // Most circular orbit
    },
    atmosphere: {
      surfacePressureBar: '92.0 bar (equivalent to 900m underwater on Earth)',
      composition: [
        { gas: 'Carbon Dioxide (CO₂)', percentage: '96.5%' },
        { gas: 'Nitrogen (N₂)', percentage: '3.5%' },
        { gas: 'Sulfur Dioxide (SO₂)', percentage: '0.015%' },
        { gas: 'Water Vapor (H₂O)', percentage: '0.002%' },
      ],
    },
    exploration: {
      moonsCount: 0,
      discoveredBy: 'Known since antiquity (Named after Roman goddess of love)',
      discoveryYear: 'Antiquity',
      notableMissions: ['Venera series (USSR, first landers)', 'Magellan (radar mapping)', 'Akatsuki (JAXA)', 'DAVINCI / VERITAS (future)'],
    },
    visual: {
      illustrativeRadius: 1.1,
      illustrativeOrbitRadius: 11.5,
      trueRadiusEarthRelative: 0.949,
      trueDistanceAu: 0.723,
      orbitalAngularSpeedFactor: 1.625, // 365.25 / 224.70
    },
    facts: [
      'The hottest planet in the Solar System, hotter than Mercury despite being twice as far from the Sun.',
      'Rotates clockwise (retrograde); the Sun rises in the west and sets in the east.',
      'A single Venusian day (rotation period of 243 Earth days) lasts longer than its year (224.7 Earth days).',
      'Its clouds rain corrosive sulfuric acid, which evaporates before reaching the scorching basalt surface.',
    ],
    comparisons: {
      weightMultiplier: 0.90,
      lightTravelTimeFromSun: '6.0 minutes',
      jetFlightTimeYears: '13.7 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'esaPlanetary'],
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Oasis of Liquid Water and Known Life',
    classification: 'Terrestrial Planet',
    orderFromSun: 3,
    color: '#38bdf8',
    glowColor: '#0284c7',
    textureType: 'earth',
    satellites: [
      {
        id: 'moon',
        name: 'The Moon (Luna)',
        radiusKm: 1737.4,
        orbitRadiusKm: 384400,
        orbitalPeriodDays: 27.32,
        illustrativeRadius: 0.32,
        illustrativeOrbitRadius: 2.2,
        color: '#e2e8f0',
      }
    ],
    physical: {
      diameterKm: 12742,
      massKg: '5.972 × 10²⁴',
      massEarthRelative: 1.000,
      densityGcm3: 5.514,
      surfaceGravityMs2: 9.807,
      gravityEarthRelative: 1.000,
      escapeVelocityKms: 11.19,
      axialTiltDeg: 23.44,
      rotationPeriodHours: 23.934,
      meanTemperatureC: 15,
      minTemperatureC: -89.2,
      maxTemperatureC: 56.7,
    },
    orbital: {
      semiMajorAxisAu: 1.000,
      semiMajorAxisMillionKm: 149.60,
      orbitalPeriodDays: 365.256,
      orbitalPeriodYears: 1.000,
      orbitalVelocityKms: 29.78,
      orbitalInclinationDeg: 0.00,
      orbitalEccentricity: 0.0167,
    },
    atmosphere: {
      surfacePressureBar: '1.013 bar (1 atm at sea level)',
      composition: [
        { gas: 'Nitrogen (N₂)', percentage: '78.08%' },
        { gas: 'Oxygen (O₂)', percentage: '20.95%' },
        { gas: 'Argon (Ar)', percentage: '0.93%' },
        { gas: 'Carbon Dioxide (CO₂)', percentage: '0.042%' },
        { gas: 'Water Vapor (H₂O)', percentage: '0.4% - 4% variable' },
      ],
    },
    exploration: {
      moonsCount: 1,
      discoveredBy: 'Home planet of humanity',
      discoveryYear: 'Home',
      notableMissions: ['Apollo 11 (first human moon landing, 1969)', 'International Space Station (ISS)', 'Hubble Space Telescope', 'James Webb Space Telescope'],
    },
    visual: {
      illustrativeRadius: 1.2,
      illustrativeOrbitRadius: 15.8,
      trueRadiusEarthRelative: 1.000,
      trueDistanceAu: 1.000,
      orbitalAngularSpeedFactor: 1.000,
    },
    facts: [
      'The only known astronomical object harboring active biology and stable liquid water on its surface.',
      'Possesses a dynamic geomagnetic dynamo generated by liquid nickel-iron convective flow in its outer core.',
      'Its 23.44° axial tilt gives rise to temperate seasons, with solstice and equinox cycles.',
      'The Moon is the fifth largest satellite in the Solar System and stabilizes Earth’s axial wobble.',
    ],
    comparisons: {
      weightMultiplier: 1.00,
      lightTravelTimeFromSun: '8.3 minutes',
      jetFlightTimeYears: '19.0 years',
    },
    sourceIds: ['nasaFactSheets', 'iauWorkingGroup'],
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Red Frontier of Giant Canyons and Past Rivers',
    classification: 'Terrestrial Planet',
    orderFromSun: 4,
    color: '#ef4444',
    glowColor: '#b91c1c',
    textureType: 'mars',
    satellites: [
      {
        id: 'phobos',
        name: 'Phobos',
        radiusKm: 11.26,
        orbitRadiusKm: 9376,
        orbitalPeriodDays: 0.318,
        illustrativeRadius: 0.16,
        illustrativeOrbitRadius: 1.6,
        color: '#94a3b8',
      },
      {
        id: 'deimos',
        name: 'Deimos',
        radiusKm: 6.2,
        orbitRadiusKm: 23463,
        orbitalPeriodDays: 1.263,
        illustrativeRadius: 0.12,
        illustrativeOrbitRadius: 2.3,
        color: '#64748b',
      }
    ],
    physical: {
      diameterKm: 6779,
      massKg: '6.417 × 10²³',
      massEarthRelative: 0.107,
      densityGcm3: 3.934,
      surfaceGravityMs2: 3.72,
      gravityEarthRelative: 0.379,
      escapeVelocityKms: 5.03,
      axialTiltDeg: 25.19,
      rotationPeriodHours: 24.623, // 1 sol = 24h 37m
      meanTemperatureC: -63,
      minTemperatureC: -140,
      maxTemperatureC: 20,
    },
    orbital: {
      semiMajorAxisAu: 1.524,
      semiMajorAxisMillionKm: 227.94,
      orbitalPeriodDays: 686.98,
      orbitalPeriodYears: 1.881,
      orbitalVelocityKms: 24.07,
      orbitalInclinationDeg: 1.85,
      orbitalEccentricity: 0.0934,
    },
    atmosphere: {
      surfacePressureBar: '0.00636 bar (6.36 mbar)',
      composition: [
        { gas: 'Carbon Dioxide (CO₂)', percentage: '95.32%' },
        { gas: 'Nitrogen (N₂)', percentage: '2.6%' },
        { gas: 'Argon (Ar)', percentage: '1.9%' },
        { gas: 'Oxygen (O₂)', percentage: '0.13%' },
        { gas: 'Carbon Monoxide (CO)', percentage: '0.08%' },
      ],
    },
    exploration: {
      moonsCount: 2,
      discoveredBy: 'Known since antiquity (named after Roman god of war)',
      discoveryYear: 'Antiquity',
      notableMissions: ['Viking 1 & 2 (1976)', 'Pathfinder/Sojourner (1997)', 'Curiosity (2012)', 'Perseverance & Ingenuity (2021)'],
    },
    visual: {
      illustrativeRadius: 0.85,
      illustrativeOrbitRadius: 20.5,
      trueRadiusEarthRelative: 0.532,
      trueDistanceAu: 1.524,
      orbitalAngularSpeedFactor: 0.532, // 365.25 / 686.98
    },
    facts: [
      'Home to Olympus Mons, a shield volcano 21.9 km high—nearly triple the height of Mount Everest.',
      'Hosts Valles Marineris, an immense tectonic rift canyon system stretching over 4,000 km long and up to 7 km deep.',
      'The red hue is caused by iron(III) oxide (rust) widespread across its basaltic crust.',
      'Its thin atmosphere allows Martian dust devils and planet-encircling seasonal dust storms.',
    ],
    comparisons: {
      weightMultiplier: 0.38,
      lightTravelTimeFromSun: '12.6 minutes',
      jetFlightTimeYears: '28.9 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'esaPlanetary'],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'The Colossal Sovereign of Radiation and Storms',
    classification: 'Gas Giant',
    orderFromSun: 5,
    color: '#d97706',
    glowColor: '#b45309',
    textureType: 'jupiter',
    satellites: [
      { id: 'io', name: 'Io (Volcanic)', radiusKm: 1821.6, orbitRadiusKm: 421700, orbitalPeriodDays: 1.769, illustrativeRadius: 0.28, illustrativeOrbitRadius: 3.6, color: '#fbbf24' },
      { id: 'europa', name: 'Europa (Subsurface Ocean)', radiusKm: 1560.8, orbitRadiusKm: 670900, orbitalPeriodDays: 3.551, illustrativeRadius: 0.25, illustrativeOrbitRadius: 4.5, color: '#e0f2fe' },
      { id: 'ganymede', name: 'Ganymede (Largest Moon)', radiusKm: 2634.1, orbitRadiusKm: 1070400, orbitalPeriodDays: 7.155, illustrativeRadius: 0.36, illustrativeOrbitRadius: 5.6, color: '#cbd5e1' },
      { id: 'callisto', name: 'Callisto (Cratered Ice)', radiusKm: 2410.3, orbitRadiusKm: 1882700, orbitalPeriodDays: 16.689, illustrativeRadius: 0.33, illustrativeOrbitRadius: 6.8, color: '#94a3b8' },
    ],
    physical: {
      diameterKm: 139820,
      massKg: '1.898 × 10²⁷',
      massEarthRelative: 317.83,
      densityGcm3: 1.326,
      surfaceGravityMs2: 24.79,
      gravityEarthRelative: 2.528,
      escapeVelocityKms: 59.5,
      axialTiltDeg: 3.13,
      rotationPeriodHours: 9.925, // Fastest rotation in solar system
      meanTemperatureC: -110,
    },
    orbital: {
      semiMajorAxisAu: 5.204,
      semiMajorAxisMillionKm: 778.57,
      orbitalPeriodDays: 4332.59,
      orbitalPeriodYears: 11.862,
      orbitalVelocityKms: 13.07,
      orbitalInclinationDeg: 1.30,
      orbitalEccentricity: 0.0485,
    },
    atmosphere: {
      surfacePressureBar: '>1000 bar in deep interior (1 bar reference altitude)',
      composition: [
        { gas: 'Hydrogen (H₂)', percentage: '89.8%' },
        { gas: 'Helium (He)', percentage: '10.2%' },
        { gas: 'Methane (CH₄)', percentage: '0.3%' },
        { gas: 'Ammonia (NH₃)', percentage: '0.026%' },
        { gas: 'Hydrogen Deuteride (HD)', percentage: '0.003%' },
      ],
    },
    exploration: {
      moonsCount: 95,
      discoveredBy: 'Known since antiquity (first detailed telescope studies by Galileo Galilei, 1610)',
      discoveryYear: 'Antiquity',
      notableMissions: ['Pioneer 10 & 11', 'Voyager 1 & 2', 'Galileo Orbiter & Probe', 'Juno (ongoing)', 'Europa Clipper (launched 2024)', 'JUICE (ESA, en route)'],
    },
    visual: {
      illustrativeRadius: 2.6,
      illustrativeOrbitRadius: 28.0,
      trueRadiusEarthRelative: 10.97,
      trueDistanceAu: 5.204,
      orbitalAngularSpeedFactor: 0.0843, // 365.25 / 4332.59
    },
    facts: [
      'More than twice as massive as all other planets in the Solar System combined.',
      'The Great Red Spot is a persistent anticyclonic storm larger than planet Earth that has raged for at least 350 years.',
      'Generates an enormous magnetosphere that extends up to 7 million kilometers towards the Sun and nearly to Saturn’s orbit.',
      'Ganymede, its largest moon, is bigger than the planet Mercury and has its own internally generated magnetic field.',
    ],
    comparisons: {
      weightMultiplier: 2.53,
      lightTravelTimeFromSun: '43.2 minutes',
      jetFlightTimeYears: '98.7 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'esaPlanetary'],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Ringed Masterpiece of the Cosmos',
    classification: 'Gas Giant',
    orderFromSun: 6,
    color: '#eab308',
    glowColor: '#ca8a04',
    textureType: 'saturn',
    rings: {
      innerRadiusIllustrative: 3.2,
      outerRadiusIllustrative: 5.4,
      innerRadiusTrue: 1.25,
      outerRadiusTrue: 2.3,
      color: '#d4b996',
      opacity: 0.85,
    },
    satellites: [
      { id: 'titan', name: 'Titan (Dense Atmosphere)', radiusKm: 2574.7, orbitRadiusKm: 1221870, orbitalPeriodDays: 15.945, illustrativeRadius: 0.35, illustrativeOrbitRadius: 6.2, color: '#f59e0b' },
      { id: 'enceladus', name: 'Enceladus (Ice Geysers)', radiusKm: 252.1, orbitRadiusKm: 238000, orbitalPeriodDays: 1.370, illustrativeRadius: 0.18, illustrativeOrbitRadius: 4.8, color: '#f8fafc' },
      { id: 'mimas', name: 'Mimas (Death Star Crater)', radiusKm: 198.2, orbitRadiusKm: 185520, orbitalPeriodDays: 0.942, illustrativeRadius: 0.15, illustrativeOrbitRadius: 4.2, color: '#cbd5e1' },
    ],
    physical: {
      diameterKm: 116460,
      massKg: '5.683 × 10²⁶',
      massEarthRelative: 95.16,
      densityGcm3: 0.687, // Less dense than water!
      surfaceGravityMs2: 10.44,
      gravityEarthRelative: 1.065,
      escapeVelocityKms: 35.5,
      axialTiltDeg: 26.73,
      rotationPeriodHours: 10.656,
      meanTemperatureC: -140,
    },
    orbital: {
      semiMajorAxisAu: 9.582,
      semiMajorAxisMillionKm: 1433.53,
      orbitalPeriodDays: 10759.22,
      orbitalPeriodYears: 29.457,
      orbitalVelocityKms: 9.69,
      orbitalInclinationDeg: 2.49,
      orbitalEccentricity: 0.0555,
    },
    atmosphere: {
      surfacePressureBar: '>1000 bar in deep interior (1 bar reference altitude)',
      composition: [
        { gas: 'Hydrogen (H₂)', percentage: '96.3%' },
        { gas: 'Helium (He)', percentage: '3.25%' },
        { gas: 'Methane (CH₄)', percentage: '0.45%' },
        { gas: 'Ammonia (NH₃)', percentage: '0.0125%' },
      ],
    },
    exploration: {
      moonsCount: 146,
      discoveredBy: 'Known since antiquity (rings resolved by Christiaan Huygens in 1655)',
      discoveryYear: 'Antiquity',
      notableMissions: ['Pioneer 11 (1979)', 'Voyager 1 & 2 (1980-1981)', 'Cassini-Huygens (2004-2017, landed Huygens on Titan)'],
    },
    visual: {
      illustrativeRadius: 2.2,
      illustrativeOrbitRadius: 36.5,
      trueRadiusEarthRelative: 9.14,
      trueDistanceAu: 9.582,
      orbitalAngularSpeedFactor: 0.0339, // 365.25 / 10759.22
    },
    facts: [
      'Its average density is only 0.687 g/cm³; Saturn would float if placed in a sufficiently gargantuan bathtub of water.',
      'The ring system spans ~282,000 km across, yet is remarkably thin—averaging only 10 to 30 meters in vertical thickness.',
      'Rings consist of 99% pure water ice particles ranging from tiny dust grains to house-sized boulders.',
      'Hosts Titan, the only moon with a thick nitrogen atmosphere and standing lakes of liquid methane and ethane.',
    ],
    comparisons: {
      weightMultiplier: 1.06,
      lightTravelTimeFromSun: '79.6 minutes',
      jetFlightTimeYears: '181.8 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'esaPlanetary'],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The Tilted Ice Giant Rotating on Its Side',
    classification: 'Ice Giant',
    orderFromSun: 7,
    color: '#06b6d4',
    glowColor: '#0891b2',
    textureType: 'uranus',
    rings: {
      innerRadiusIllustrative: 2.2,
      outerRadiusIllustrative: 2.7,
      innerRadiusTrue: 1.3,
      outerRadiusTrue: 1.6,
      color: '#67e8f9',
      opacity: 0.35,
    },
    satellites: [
      { id: 'miranda', name: 'Miranda (Chaotic Canyons)', radiusKm: 235.8, orbitRadiusKm: 129900, orbitalPeriodDays: 1.413, illustrativeRadius: 0.16, illustrativeOrbitRadius: 3.2, color: '#e2e8f0' },
      { id: 'ariel', name: 'Ariel', radiusKm: 578.9, orbitRadiusKm: 191020, orbitalPeriodDays: 2.520, illustrativeRadius: 0.22, illustrativeOrbitRadius: 3.8, color: '#cbd5e1' },
      { id: 'titania', name: 'Titania (Largest Moon)', radiusKm: 788.4, orbitRadiusKm: 436300, orbitalPeriodDays: 8.706, illustrativeRadius: 0.26, illustrativeOrbitRadius: 4.6, color: '#94a3b8' },
    ],
    physical: {
      diameterKm: 50724,
      massKg: '8.681 × 10²⁵',
      massEarthRelative: 14.54,
      densityGcm3: 1.271,
      surfaceGravityMs2: 8.69,
      gravityEarthRelative: 0.886,
      escapeVelocityKms: 21.3,
      axialTiltDeg: 97.77, // Extreme tilt: rolls like a ball!
      rotationPeriodHours: -17.24, // Retrograde
      meanTemperatureC: -195,
      minTemperatureC: -224, // Coldest planetary atmosphere recorded
    },
    orbital: {
      semiMajorAxisAu: 19.201,
      semiMajorAxisMillionKm: 2872.46,
      orbitalPeriodDays: 30685.4,
      orbitalPeriodYears: 84.011,
      orbitalVelocityKms: 6.81,
      orbitalInclinationDeg: 0.77,
      orbitalEccentricity: 0.0463,
    },
    atmosphere: {
      surfacePressureBar: '>100 bar deep interior (1 bar reference)',
      composition: [
        { gas: 'Hydrogen (H₂)', percentage: '82.5%' },
        { gas: 'Helium (He)', percentage: '15.2%' },
        { gas: 'Methane (CH₄)', percentage: '2.3%' },
        { gas: 'Hydrogen Deuteride (HD)', percentage: '0.009%' },
      ],
    },
    exploration: {
      moonsCount: 28,
      discoveredBy: 'Sir William Herschel',
      discoveryYear: '1781 (First planet discovered via telescope)',
      notableMissions: ['Voyager 2 (historic flyby in January 1986)'],
    },
    visual: {
      illustrativeRadius: 1.6,
      illustrativeOrbitRadius: 44.5,
      trueRadiusEarthRelative: 3.98,
      trueDistanceAu: 19.201,
      orbitalAngularSpeedFactor: 0.0119, // 365.25 / 30685.4
    },
    facts: [
      'Has an unprecedented axial tilt of 97.77°, orbiting the Sun essentially on its side with poles experiencing 42 years of continuous sunlight followed by 42 years of darkness.',
      'Atmospheric methane absorbs red light, imparting a serene pale cyan-aquamarine appearance.',
      'Holds the record for the coldest recorded planetary atmosphere in the Solar System at -224 °C (49 K).',
      'Possesses 13 known faint rings and 28 moons named after literary characters from Shakespeare and Alexander Pope.',
    ],
    comparisons: {
      weightMultiplier: 0.89,
      lightTravelTimeFromSun: '2.7 hours',
      jetFlightTimeYears: '364.3 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'iauWorkingGroup'],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The Supersonic Storm Giant of the Deep Blue',
    classification: 'Ice Giant',
    orderFromSun: 8,
    color: '#3b82f6',
    glowColor: '#1d4ed8',
    textureType: 'neptune',
    rings: {
      innerRadiusIllustrative: 2.0,
      outerRadiusIllustrative: 2.4,
      innerRadiusTrue: 1.25,
      outerRadiusTrue: 1.5,
      color: '#93c5fd',
      opacity: 0.25,
    },
    satellites: [
      { id: 'triton', name: 'Triton (Retrograde Cryovolcanoes)', radiusKm: 1353.4, orbitRadiusKm: 354759, orbitalPeriodDays: -5.877, illustrativeRadius: 0.30, illustrativeOrbitRadius: 3.6, color: '#f1f5f9' },
      { id: 'proteus', name: 'Proteus', radiusKm: 210.0, orbitRadiusKm: 117647, orbitalPeriodDays: 1.122, illustrativeRadius: 0.16, illustrativeOrbitRadius: 2.8, color: '#94a3b8' },
    ],
    physical: {
      diameterKm: 49244,
      massKg: '1.024 × 10²⁶',
      massEarthRelative: 17.15,
      densityGcm3: 1.638,
      surfaceGravityMs2: 11.15,
      gravityEarthRelative: 1.137,
      escapeVelocityKms: 23.5,
      axialTiltDeg: 28.32,
      rotationPeriodHours: 16.11,
      meanTemperatureC: -200,
    },
    orbital: {
      semiMajorAxisAu: 30.047,
      semiMajorAxisMillionKm: 4495.06,
      orbitalPeriodDays: 60189.0,
      orbitalPeriodYears: 164.79,
      orbitalVelocityKms: 5.43,
      orbitalInclinationDeg: 1.77,
      orbitalEccentricity: 0.0095,
    },
    atmosphere: {
      surfacePressureBar: '>100 bar deep interior (1 bar reference)',
      composition: [
        { gas: 'Hydrogen (H₂)', percentage: '80.0%' },
        { gas: 'Helium (He)', percentage: '19.0%' },
        { gas: 'Methane (CH₄)', percentage: '1.5%' },
        { gas: 'Hydrogen Deuteride (HD)', percentage: '0.019%' },
      ],
    },
    exploration: {
      moonsCount: 16,
      discoveredBy: 'Urbain Le Verrier & Johann Galle (mathematical prediction before visual confirmation)',
      discoveryYear: '1846',
      notableMissions: ['Voyager 2 (August 1989 flyby)'],
    },
    visual: {
      illustrativeRadius: 1.55,
      illustrativeOrbitRadius: 52.0,
      trueRadiusEarthRelative: 3.86,
      trueDistanceAu: 30.047,
      orbitalAngularSpeedFactor: 0.00607, // 365.25 / 60189
    },
    facts: [
      'Whipped by the fastest planetary winds ever measured in the Solar System, clocking up to 2,100 km/h (1,300 mph).',
      'The first planet discovered through mathematical calculation before being observed through a telescope.',
      'Radiates 2.61 times more heat than it receives from the Sun due to primordial internal thermal reservoirs.',
      'Its massive moon Triton orbits backwards (retrograde), indicating it was a captured Kuiper Belt dwarf planet.',
    ],
    comparisons: {
      weightMultiplier: 1.14,
      lightTravelTimeFromSun: '4.1 hours',
      jetFlightTimeYears: '570.1 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons'],
  },
  {
    id: 'pluto',
    name: 'Pluto',
    tagline: 'The Enigmatic Heart of the Kuiper Belt',
    classification: 'Dwarf Planet',
    orderFromSun: 9,
    color: '#c084fc',
    glowColor: '#9333ea',
    textureType: 'pluto',
    satellites: [
      { id: 'charon', name: 'Charon (Binary Companion)', radiusKm: 606.0, orbitRadiusKm: 19591, orbitalPeriodDays: 6.387, illustrativeRadius: 0.24, illustrativeOrbitRadius: 1.8, color: '#e2e8f0' }
    ],
    physical: {
      diameterKm: 2376.6,
      massKg: '1.303 × 10²²',
      massEarthRelative: 0.00218,
      densityGcm3: 1.854,
      surfaceGravityMs2: 0.62,
      gravityEarthRelative: 0.063,
      escapeVelocityKms: 1.21,
      axialTiltDeg: 122.53, // Highly tilted retrograde
      rotationPeriodHours: -153.29, // 6.387 days
      meanTemperatureC: -225,
      minTemperatureC: -233,
      maxTemperatureC: -223,
    },
    orbital: {
      semiMajorAxisAu: 39.482,
      semiMajorAxisMillionKm: 5906.38,
      orbitalPeriodDays: 90560.0,
      orbitalPeriodYears: 247.92,
      orbitalVelocityKms: 4.74,
      orbitalInclinationDeg: 17.16, // Steep orbital tilt!
      orbitalEccentricity: 0.2488, // Highly elliptical
    },
    atmosphere: {
      surfacePressureBar: '10 µbar (1 Pa, highly variable with orbital distance)',
      composition: [
        { gas: 'Nitrogen (N₂)', percentage: '99%' },
        { gas: 'Methane (CH₄)', percentage: '0.5%' },
        { gas: 'Carbon Monoxide (CO)', percentage: '0.05%' },
      ],
    },
    exploration: {
      moonsCount: 5,
      discoveredBy: 'Clyde Tombaugh at Lowell Observatory',
      discoveryYear: '1930',
      notableMissions: ['New Horizons (historic July 2015 flyby)'],
    },
    visual: {
      illustrativeRadius: 0.55,
      illustrativeOrbitRadius: 59.0,
      trueRadiusEarthRelative: 0.186,
      trueDistanceAu: 39.482,
      orbitalAngularSpeedFactor: 0.00403, // 365.25 / 90560
    },
    facts: [
      'Reclassified as a Dwarf Planet by the IAU in 2006 for not clearing the neighborhood around its orbit.',
      'Features Tombaugh Regio, an enormous heart-shaped glacier primarily composed of nitrogen and carbon monoxide ice.',
      'Pluto and its largest moon Charon form a binary system; their barycenter lies outside Pluto’s surface.',
      'Its orbit is in a stable 2:3 orbital resonance with Neptune; for every three orbits Neptune makes, Pluto completes two.',
    ],
    comparisons: {
      weightMultiplier: 0.063,
      lightTravelTimeFromSun: '5.5 hours',
      jetFlightTimeYears: '749.1 years',
    },
    sourceIds: ['nasaFactSheets', 'jplHorizons', 'iauPlutoResolution'],
  },
];
