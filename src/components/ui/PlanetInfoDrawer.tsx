import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Compass,
  Scale,
  Orbit,
  Wind,
  Moon as MoonIcon,
  Sparkles,
  Info
} from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';
import { CELESTIAL_BODIES } from '../../data/celestialBodies';
import { SCIENTIFIC_SOURCES } from '../../data/scientificSources';
import {
  formatDistanceKm,
  formatPeriod,
  formatRotation,
  formatSpeed,
  formatNumber,
} from '../../utils/formatters';

type TabKey = 'overview' | 'physical' | 'orbital' | 'atmosphere' | 'exploration';

export const PlanetInfoDrawer: React.FC = () => {
  const { selectedPlanetId, setSelectedPlanetId, isInfoDrawerOpen, setIsInfoDrawerOpen } = useSimulation();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  if (!isInfoDrawerOpen || !selectedPlanetId) return null;

  const body = CELESTIAL_BODIES.find((b) => b.id === selectedPlanetId);
  if (!body) return null;

  const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
    { key: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5" /> },
    { key: 'physical', label: 'Physical', icon: <Scale className="w-3.5 h-3.5" /> },
    { key: 'orbital', label: 'Orbit & Spin', icon: <Orbit className="w-3.5 h-3.5" /> },
    { key: 'atmosphere', label: 'Atmosphere', icon: <Wind className="w-3.5 h-3.5" /> },
    { key: 'exploration', label: 'Missions & Moons', icon: <MoonIcon className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${body.name} Scientific Properties`}
      className="absolute top-14 sm:top-16 right-0 bottom-16 sm:bottom-20 z-30 w-full sm:w-[420px] md:w-[460px] p-2 sm:p-4 pointer-events-none transition-all duration-300"
    >
      <div className="glass-panel w-full h-full rounded-2xl flex flex-col pointer-events-auto shadow-2xl border border-sky-500/20 overflow-hidden animate-in fade-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700/60 bg-space-900/60 flex items-start justify-between">
          <div className="flex-1 pr-3">
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: body.color }}
              />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400">
                {body.classification}
              </span>
              {body.orderFromSun > 0 && (
                <span className="text-[11px] font-mono text-slate-400 bg-space-800 px-1.5 py-0.5 rounded">
                  #{body.orderFromSun} from Sun
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold font-sans text-white tracking-tight mt-1">
              {body.name}
            </h2>
            <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">
              {body.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              setIsInfoDrawerOpen(false);
              setSelectedPlanetId(null);
            }}
            className="p-1.5 rounded-lg bg-space-800 text-slate-400 hover:text-white hover:bg-space-700 transition-colors"
            aria-label="Close planet details panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          className="flex border-b border-slate-700/60 bg-space-950/40 px-2 py-1.5 space-x-1 overflow-x-auto text-xs font-mono"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-space-850'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm font-sans text-slate-300">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="glass-card p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Distance from Sun</div>
                  <div className="text-base font-bold text-sky-300 mt-0.5">
                    {body.orbital.semiMajorAxisAu} AU
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {formatDistanceKm(body.orbital.semiMajorAxisMillionKm * 1_000_000)}
                  </div>
                </div>

                <div className="glass-card p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Equatorial Diameter</div>
                  <div className="text-base font-bold text-amber-300 mt-0.5">
                    {formatNumber(body.physical.diameterKm)} km
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {body.visual.trueRadiusEarthRelative}× Earth
                  </div>
                </div>

                <div className="glass-card p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Orbital Period (Year)</div>
                  <div className="text-base font-bold text-emerald-300 mt-0.5">
                    {body.orbital.orbitalPeriodYears > 0 ? `${body.orbital.orbitalPeriodYears} yr` : 'N/A'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {formatNumber(body.orbital.orbitalPeriodDays)} days
                  </div>
                </div>

                <div className="glass-card p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Mean Surface Temp</div>
                  <div className="text-base font-bold text-rose-300 mt-0.5">
                    {body.physical.meanTemperatureC} °C
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {Math.round((body.physical.meanTemperatureC * 9) / 5 + 32)} °F
                  </div>
                </div>
              </div>

              {/* Scientific Facts */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Scientific Insights</span>
                </h3>
                <ul className="space-y-2 text-xs leading-relaxed">
                  {body.facts.map((fact, i) => (
                    <li key={i} className="flex items-start space-x-2 glass-card p-2.5 rounded-lg">
                      <span className="text-sky-400 font-mono text-[10px] mt-0.5">✦</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relative Human Perspective Comparisons */}
              <div className="glass-card p-3 rounded-xl space-y-2 border border-indigo-500/30 bg-indigo-950/20">
                <h4 className="text-xs font-mono font-semibold text-indigo-300 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Comparative Perspective</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Your weight on this world:</div>
                    <div className="font-mono font-bold text-slate-200">
                      100 kg ➔ {Math.round(100 * body.comparisons.weightMultiplier)} kg
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Sunlight travel time:</div>
                    <div className="font-mono font-bold text-slate-200">
                      {body.comparisons.lightTravelTimeFromSun}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] text-slate-400">Travel time from Sun by commercial jet (900 km/h):</div>
                    <div className="font-mono font-bold text-slate-200">
                      {body.comparisons.jetFlightTimeYears} nonstop
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PHYSICAL CHARACTERISTICS */}
          {activeTab === 'physical' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Total Mass</span>
                  <span className="font-semibold text-white">{body.physical.massKg} kg</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Mass (Earth Relative)</span>
                  <span className="font-semibold text-white">{body.physical.massEarthRelative} M⊕</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Mean Density</span>
                  <span className="font-semibold text-white">{body.physical.densityGcm3} g/cm³</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Surface Gravity</span>
                  <span className="font-semibold text-white">
                    {body.physical.surfaceGravityMs2} m/s² ({body.physical.gravityEarthRelative}g)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Escape Velocity</span>
                  <span className="font-semibold text-white">{body.physical.escapeVelocityKms} km/s</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Axial Tilt (Obliquity)</span>
                  <span className="font-semibold text-white">{body.physical.axialTiltDeg}°</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Sidereal Rotation Period</span>
                  <span className="font-semibold text-white">
                    {formatRotation(body.physical.rotationPeriodHours)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Surface Temperature Range</span>
                  <span className="font-semibold text-white">
                    {body.physical.minTemperatureC !== undefined
                      ? `${body.physical.minTemperatureC} °C to ${body.physical.maxTemperatureC} °C`
                      : `${body.physical.meanTemperatureC} °C`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ORBITAL MECHANICS */}
          {activeTab === 'orbital' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Semi-Major Axis (AU)</span>
                  <span className="font-semibold text-white">{body.orbital.semiMajorAxisAu} AU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Semi-Major Axis (km)</span>
                  <span className="font-semibold text-white">
                    {formatDistanceKm(body.orbital.semiMajorAxisMillionKm * 1_000_000)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Orbital Period (Sidereal)</span>
                  <span className="font-semibold text-white">
                    {formatPeriod(body.orbital.orbitalPeriodDays)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Orbital Velocity</span>
                  <span className="font-semibold text-white">
                    {formatSpeed(body.orbital.orbitalVelocityKms)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Orbital Eccentricity (e)</span>
                  <span className="font-semibold text-white">
                    {body.orbital.orbitalEccentricity} ({body.orbital.orbitalEccentricity < 0.05 ? 'Nearly Circular' : 'Elliptical'})
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Orbital Inclination</span>
                  <span className="font-semibold text-white">{body.orbital.orbitalInclinationDeg}° to Ecliptic</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ATMOSPHERE */}
          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              <div className="glass-card p-3 rounded-xl font-mono text-xs space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Surface Barometric Pressure</div>
                <div className="font-semibold text-sky-300">{body.atmosphere.surfacePressureBar}</div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Chemical Composition
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  {body.atmosphere.composition.map((comp, idx) => (
                    <div key={idx} className="glass-card p-2 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">{comp.gas}</span>
                        <span className="font-bold text-sky-400">{comp.percentage}</span>
                      </div>
                      <div className="w-full bg-space-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full"
                          style={{
                            width: comp.percentage.includes('%')
                              ? Math.min(100, Math.max(4, parseFloat(comp.percentage))) + '%'
                              : '15%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MISSIONS & MOONS */}
          {activeTab === 'exploration' && (
            <div className="space-y-4 text-xs">
              <div className="glass-card p-3 rounded-xl font-mono space-y-2">
                <div className="flex justify-between border-b border-slate-700/50 pb-2">
                  <span className="text-slate-400">Confirmed Natural Moons</span>
                  <span className="font-bold text-amber-300">{body.exploration.moonsCount}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/50 pb-2">
                  <span className="text-slate-400">Discovery Record</span>
                  <span className="font-bold text-slate-200">{body.exploration.discoveryYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Discovered By</span>
                  <span className="font-medium text-slate-300">{body.exploration.discoveredBy}</span>
                </div>
              </div>

              {/* Notable Satellites */}
              {body.satellites && body.satellites.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-mono font-bold uppercase tracking-wider text-slate-300">
                    Notable Natural Satellites
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                    {body.satellites.map((sat) => (
                      <div key={sat.id} className="glass-card p-2 rounded-lg flex justify-between items-center">
                        <span className="font-medium text-slate-200">{sat.name}</span>
                        <span className="text-slate-400">Radius: {formatNumber(sat.radiusKm)} km</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Robotic Exploration Missions */}
              <div className="space-y-2">
                <h4 className="font-mono font-bold uppercase tracking-wider text-slate-300">
                  Pioneering Robotic & Human Missions
                </h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {body.exploration.notableMissions.map((mission, idx) => (
                    <div key={idx} className="glass-card p-2 rounded-lg flex items-center space-x-2">
                      <span className="text-sky-400">🚀</span>
                      <span className="text-slate-200">{mission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scientific Citations Footer */}
          <div className="pt-3 border-t border-slate-700/50">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
              <span>Scientific Sources & Citations</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {body.sourceIds.map((srcId) => {
                const src = SCIENTIFIC_SOURCES[srcId];
                if (!src) return null;
                return (
                  <a
                    key={srcId}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/60 border border-sky-800 text-sky-300 hover:text-white hover:bg-sky-900/60 transition-colors"
                  >
                    <span>{src.organization}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
