# WebSpace 3D | Interactive Solar System Observatory

[![WebSpace 3D Live](https://img.shields.io/badge/Live%20Observatory-webspace--3d.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://webspace-3d.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-k--313%2Fwebspace--3d-blue?style=for-the-badge&logo=github)](https://github.com/k-313/webspace-3d)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React Three Fiber](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![Data Accuracy](https://img.shields.io/badge/Data-NASA%20GSFC%20Verified-emerald)](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)

**WebSpace 3D** is a next-generation interactive educational 3D solar system experience built with React, TypeScript, Three.js, React Three Fiber, and Drei. Designed with deep-space observatory aesthetics, verified against official NASA/JPL planetary ephemerides, and built for both desktop and mobile exploration.

---

## 🌟 Key Features

1. **Photorealistic 3D Solar System Scene**
   - Renders the central Sun with pulsating plasma granules, dynamic corona glow, and omnidirectional illumination.
   - All 8 major planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune) plus dwarf planet Pluto, natural satellites (the Moon, Galilean moons, Titan, Phobos/Deimos), and the Main Asteroid Belt (instanced 3,200+ bodies).
   - Real axial obliquity tilts: Earth 23.4°, Uranus 97.8° (orbits on its side), Venus 177.4° (retrograde spin).

2. **Keplerian Orbital Dynamics & Time Controls**
   - Models elliptical orbits with real eccentricity ($e$) and orbital inclination ($i$).
   - Keplerian velocities derived from Kepler's 3rd Law ($v \propto 1/\sqrt{a}$).
   - Time controller supporting Pause/Resume (`Space`), Single-day and 10-day stepping, and simulation multipliers (`-5x`, `-1x`, `0.1x`, `1x`, `5x`, `25x`, `100x`).
   - Live simulated mission clock displaying elapsed Earth days and years.

3. **NASA-Verified Scientific Properties Inspector**
   - Click any celestial body in 3D or in the bottom carousel to focus and inspect:
     - **Overview**: Diameter, mass, orbital period, surface temperature, and key scientific facts.
     - **Physical Specs**: Mass ($kg$ and $M_\oplus$), density ($g/cm^3$), surface gravity ($m/s^2$ and $g$), escape velocity ($km/s$), axial tilt, and sidereal rotation period.
     - **Orbital Mechanics**: Semi-major axis ($AU$ and $km$), orbital velocity ($km/s$), eccentricity ($e$), and inclination ($^\circ$).
     - **Atmosphere Breakdown**: Surface pressure bar chart and molecular composition percentages ($N_2, O_2, CO_2, H_2, He, CH_4$, etc.).
     - **Missions & Moons**: Confirmed satellites count, discoverers, and robotic exploration history.
     - **Comparative Perspective**: "Your weight on this world (100 kg on Earth = X kg)", sunlight transit delay, and jet airliner travel time.

4. **Camera Controls & Tracking Modes**
   - **Follow / Lock Mode**: Smoothly lerps to selected planet and tracks its orbital motion while allowing 360° rotational inspection.
   - **Overview Mode**: Isometric celestial perspective displaying the full solar system.
   - **Top-Down Ecliptic Mode**: 2D-like planar perspective showing concentric orbital rings and planetary alignment.
   - Smooth mouse/touch pan, zoom, and tilt with inertial damping.

5. **Separate Illustrative vs. True Scales**
   - **Illustrative Mode (Default)**: Calibrated logarithmic orbital radii and scaled planetary spheres for optimal visual clarity.
   - **True Relative Distance Mode**: Spaced strictly by Astronomical Units ($1 \text{ AU}$ to $39.5 \text{ AU}$), revealing the immense voids of cosmic space.
   - **True Relative Size Mode**: Sphere diameters scaled accurately to Earth = 1.0 (Jupiter 11× Earth, Sun 109× Earth).
   - Integrated **Scale Paradox Explainer** modal demonstrating why textbooks cannot show true 1:1 scale on standard screens.

6. **Instant Planet Search (`/` or `Cmd+K`)**
   - Fast fuzzy combobox filtering by planet name, classification, or keywords (e.g., "red", "rings", "greenhouse", "volcano", "great red spot").

7. **Curated 10-Stop Guided Tour (`T`)**
   - Step-by-step educational voyage through the solar system with automated or manual navigation, narrated text, observatory highlights, and camera fly-bys.

8. **Educational Astronomy Quiz Challenge (`Q`)**
   - 10 randomized multiple-choice questions based on verified NASA facts.
   - Instant feedback with explanation cards citing official research sources.
   - Final cosmic rank scoring ("Voyager Commander", "Senior Astrophysicist") with celebration confetti.

9. **Accessibility & Reduced Motion**
   - Fully accessible with ARIA dialog roles, tablist semantics, and keyboard navigation.
   - Detects `prefers-reduced-motion` and provides manual toggle to halt orbital rotation and use instant camera cuts.
   - Performance tier switcher (High, Medium, Low/Battery Saver) adjusting particle counts, anti-aliasing, and pixel ratios.

10. **Offline Procedural Canvas Textures**
    - 100% self-contained: All planetary textures, rings, and cloud layers are synthesized on client canvases using procedural algorithms. No external image CDNs, no CORS errors, zero broken assets.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript 5.6, Vite 5.4
- **3D Engine**: Three.js 0.169, React Three Fiber (R3F) 8.17, React Three Drei 9.114
- **Styling**: Tailwind CSS 3.4 (custom deep-space palette and glassmorphism HUD)
- **Icons**: Lucide React
- **Unit Testing**: Vitest 2.1, React Testing Library, JSDOM
- **E2E Testing**: Playwright 1.48 (Chromium, Mobile Safari)
- **CI/CD**: GitHub Actions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v20 / v24)
- npm 9+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/webspace-3d.git
cd webspace-3d

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

Visit `http://localhost:5180` in your browser.

---

## 🧪 Testing

### Running Unit & Integration Tests (Vitest)
Executes 34 tests across 7 test suites validating celestial physics, Keplerian math, data integrity, formatters, and UI components:

```bash
npm run test
```

### Running E2E Integration Tests (Playwright)
Validates planet selection, camera lerping, pause/resume, tabs, search, tour, and mobile responsiveness:

```bash
# Run headless
npm run test:e2e

# Run with interactive UI
npx playwright test --ui
```

---

## 📐 Mathematical & Orbital Modeling

### 1. Keplerian Orbit Approximation
Planetary positions are calculated using the first-order Kepler equation expansion:

$$M = (n \cdot t + M_0) \pmod{2\pi}$$

$$E \approx M + e \sin(M) + \frac{e^2}{2} \sin(2M)$$

$$x_{\text{orb}} = a (\cos E - e), \quad z_{\text{orb}} = a \sqrt{1 - e^2} \sin E$$

Where:
- $a$ is the semi-major axis
- $e$ is the orbital eccentricity
- $M$ is the mean anomaly
- $E$ is the eccentric anomaly
- $i$ is the inclination angle applied via coordinate rotation about the $X$-axis:
  $$y = -z_{\text{orb}} \sin i, \quad z = z_{\text{orb}} \cos i$$

### 2. Kepler's Third Law Angular Speed
Planetary orbital angular speed is inversely proportional to $a^{3/2}$:

$$T^2 \propto a^3 \implies \omega = \frac{2\pi}{T} \propto a^{-3/2}$$

Mercury orbits the Sun in 88 days, while Neptune requires 165 Earth years.

---

## 📁 Project Architecture

```
webspace-3d/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow
├── e2e/
│   └── observatory.spec.ts    # Playwright End-to-End test suite
├── src/
│   ├── components/
│   │   ├── 3d/                # Three.js / React Three Fiber components
│   │   │   ├── AsteroidBelt.tsx
│   │   │   ├── Moon.tsx
│   │   │   ├── OrbitPath.tsx
│   │   │   ├── Planet.tsx
│   │   │   ├── RingSystem.tsx
│   │   │   ├── SceneCameraController.tsx
│   │   │   ├── SolarSystemScene.tsx
│   │   │   ├── Starfield.tsx
│   │   │   └── Sun.tsx
│   │   └── ui/                # Accessible Glassmorphism HUD Overlays
│   │       ├── GuidedTourModal.tsx
│   │       ├── Header.tsx
│   │       ├── KeyboardShortcutsModal.tsx
│   │       ├── PerformanceBadge.tsx
│   │       ├── PlanetInfoDrawer.tsx
│   │       ├── PlanetSearchModal.tsx
│   │       ├── PlanetSelector.tsx
│   │       ├── QuizModal.tsx
│   │       ├── ScaleExplainerModal.tsx
│   │       ├── SourcesModal.tsx
│   │       └── TimeControls.tsx
│   ├── data/
│   │   ├── celestialBodies.ts   # Complete NASA metrics for Sun & planets
│   │   ├── quizQuestions.ts     # 10 educational astronomy questions
│   │   ├── scientificSources.ts # NASA, JPL, IAU, ESA bibliographic records
│   │   └── tourStops.ts         # 10 curated voyage steps
│   ├── hooks/
│   │   ├── useAudioFx.ts        # Synthesizer ambient drone & UI audio
│   │   └── useKeyboardShortcuts.ts # Global hotkey listeners
│   ├── store/
│   │   └── simulationContext.tsx # Central observatory state management
│   ├── test/                  # Vitest unit test suite
│   │   ├── celestialBodies.test.ts
│   │   ├── formatters.test.ts
│   │   ├── orbitalMath.test.ts
│   │   ├── PlanetInfoDrawer.test.tsx
│   │   ├── PlanetSearchModal.test.tsx
│   │   ├── quizQuestions.test.ts
│   │   ├── setup.ts
│   │   └── simulationContext.test.tsx
│   ├── utils/
│   │   ├── formatters.ts        # Metric conversions & unit formatting
│   │   ├── orbitalMath.ts       # Kepler orbit calculations & scale transforms
│   │   └── proceduralTextures.ts # High-fidelity HTML5 canvas textures
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── ATTRIBUTION.md             # Scientific & asset attribution dossier
├── playwright.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## 🚢 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
Add the `base: '/webspace-3d/'` option in `vite.config.ts` and run:
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

### Deploy to Netlify
```bash
npm run build
# Publish directory: dist
```

---

## 📜 Scientific Attribution & License

All planetary constants, orbital elements, masses, and atmospheric ratios are derived from the NASA Goddard Space Flight Center Planetary Fact Sheet series curated by Dr. David R. Williams and the NASA/JPL Horizons System. Zero measurements are fabricated.

Released under the [MIT License](LICENSE).
