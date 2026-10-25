export interface ScientificSource {
  id: string;
  title: string;
  organization: string;
  url: string;
  authors?: string;
  publicationYear?: number;
  description: string;
}

export const SCIENTIFIC_SOURCES: Record<string, ScientificSource> = {
  nasaFactSheets: {
    id: 'nasaFactSheets',
    title: 'NASA Planetary Fact Sheet - Metric',
    organization: 'NASA Goddard Space Flight Center',
    authors: 'Dr. David R. Williams',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
    description: 'Primary baseline for planetary physical characteristics, masses, equatorial radii, orbital parameters, surface gravities, and atmospheric pressures.',
  },
  jplHorizons: {
    id: 'jplHorizons',
    title: 'JPL Solar System Dynamics & HORIZONS System',
    organization: 'NASA Jet Propulsion Laboratory / Caltech',
    url: 'https://ssd.jpl.nasa.gov/horizons/',
    description: 'High-precision orbital ephemerides, Keplerian orbital elements, inclinations, eccentricities, and mean anomaly progressions.',
  },
  iauWorkingGroup: {
    id: 'iauWorkingGroup',
    title: 'IAU Working Group on Cartographic Coordinates and Rotational Elements (WGCCRE)',
    organization: 'International Astronomical Union (IAU)',
    url: 'https://astrogeology.usgs.gov/groups/IAU-WGCCRE',
    description: 'Official definitions for planetary rotation axes, prime meridians, north poles, and reference ellipsoids.',
  },
  esaPlanetary: {
    id: 'esaPlanetary',
    title: 'European Space Agency Science & Exploration Missions',
    organization: 'ESA (European Space Agency)',
    url: 'https://www.esa.int/Science_Exploration/Space_Science',
    description: 'Mission telemetry, atmospheric composition data, and discoveries from BepiColombo, Rosetta, JUICE, and Mars Express.',
  },
  nasaSunFactSheet: {
    id: 'nasaSunFactSheet',
    title: 'NASA Sun Fact Sheet',
    organization: 'NASA Goddard Space Flight Center',
    authors: 'Dr. David R. Williams',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html',
    description: 'Solar physical parameters, luminosity, spectral type G2V, photospheric temperature, mass, and volume.',
  },
  iauPlutoResolution: {
    id: 'iauPlutoResolution',
    title: 'IAU 2006 General Assembly: Resolutions 5A and 6A',
    organization: 'International Astronomical Union',
    publicationYear: 2006,
    url: 'https://www.iau.org/news/pressreleases/detail/iau0603/',
    description: 'Formal definition of a planet in the Solar System and definition of the dwarf planet category.',
  }
};
