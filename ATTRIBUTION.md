# Scientific Sources, Data & Asset Attribution

WebSpace 3D is dedicated to open science, educational integrity, and zero data fabrication. Every planetary measurement, orbital element, atmosphere fraction, and discovery record is directly verified against published astronomical records from NASA, JPL, and the IAU.

---

## 1. Primary Scientific Data Authorities

### NASA Planetary Fact Sheets
- **Authority**: NASA Goddard Space Flight Center (GSFC)
- **Author**: Dr. David R. Williams (Planetary Scientist)
- **URL**: [https://nssdc.gsfc.nasa.gov/planetary/factsheet/](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- **Data Extracted**:
  - Planetary equatorial diameters, volumes, and mean densities
  - Total masses and mass relative to Earth ($M_\oplus$)
  - Surface gravitational accelerations ($m/s^2$) and escape velocities ($km/s$)
  - Sidereal rotation periods and axial obliquity angles
  - Atmospheric surface pressures and molecular composition percentages
  - Surface temperature extremes and mean values

### JPL Solar System Dynamics & HORIZONS System
- **Authority**: NASA Jet Propulsion Laboratory (JPL) / California Institute of Technology
- **URL**: [https://ssd.jpl.nasa.gov/horizons/](https://ssd.jpl.nasa.gov/horizons/)
- **Data Extracted**:
  - Semi-major axes ($a$) in Astronomical Units (AU) and kilometers
  - Orbital eccentricities ($e$) and orbital inclinations ($i$) to the J2000 ecliptic
  - Mean orbital velocities ($km/s$) and sidereal orbital periods ($T$)
  - True anomaly progressions and Keplerian resonance parameters

### International Astronomical Union (IAU)
- **Authority**: IAU Working Group on Cartographic Coordinates and Rotational Elements (WGCCRE)
- **URL**: [https://astrogeology.usgs.gov/groups/IAU-WGCCRE](https://astrogeology.usgs.gov/groups/IAU-WGCCRE)
- **Resolutions**:
  - IAU 2006 General Assembly Resolution 5A & 6A: Definition of a Planet in the Solar System & Dwarf Planet classification for Pluto.
  - Standard planetary spin poles and right ascension / declination coordinate systems.

### European Space Agency (ESA)
- **Authority**: ESA Science & Robotic Exploration Directorate
- **URL**: [https://www.esa.int/Science_Exploration/Space_Science](https://www.esa.int/Science_Exploration/Space_Science)
- **Data Extracted**:
  - Telemetry and mission scientific summaries for BepiColombo, Rosetta, JUICE, and Mars Express.

---

## 2. Textures & Visual Rendering

- **Procedural Canvas Textures**:
  - All celestial surface textures (Sun plasma granules, Mercury impact craters, Venusian sulfuric clouds, Earth oceans and continents, Martian iron oxide canyons, Jovian banded jet streams with Great Red Spot, Saturnian rings with Cassini division, Uranus aquamarine haze, Neptune azure storms, and Pluto Tombaugh Regio heart glacier) are procedurally generated in client-side HTML5 canvas contexts using multi-frequency harmonic sinusoidal noise and vector gradient fields.
  - **License**: MIT / CC0 (Original software implementation, 100% offline, zero external image downloads or copyrighted assets).

- **Saturn Rings**:
  - Procedural alpha-mask ring generator calculating photometric density across A, B, and C rings with realistic Cassini Division ($1.99 - 2.02 R_S$) and Encke Gap.

---

## 3. Software Libraries & Fonts

- **React, Three.js, React Three Fiber & Drei**: MIT License
- **Lucide React Icons**: ISC License
- **Inter Font**: Designed by Rasmus Andersson (SIL Open Font License 1.1)
- **Space Mono Font**: Designed by Colophon Foundry (SIL Open Font License 1.1)
- **Canvas Confetti**: ISC License
