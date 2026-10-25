import React from 'react';
import { CELESTIAL_BODIES } from '../../data/celestialBodies';
import { useSimulation } from '../../store/simulationContext';

export const PlanetSelector: React.FC = () => {
  const { selectedPlanetId, setSelectedPlanetId, hoveredPlanetId, setHoveredPlanetId } = useSimulation();

  return (
    <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex justify-center px-2 pointer-events-none">
      <div
        data-testid="planet-selector-tray"
        className="glass-panel rounded-2xl p-1.5 sm:p-2 flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto max-w-full pointer-events-auto shadow-2xl"
      >
        {CELESTIAL_BODIES.map((body) => {
          const isSelected = selectedPlanetId === body.id;
          const isHovered = hoveredPlanetId === body.id;

          return (
            <button
              key={body.id}
              onClick={() => setSelectedPlanetId(isSelected ? null : body.id)}
              onMouseEnter={() => setHoveredPlanetId(body.id)}
              onMouseLeave={() => setHoveredPlanetId(null)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 select-none whitespace-nowrap text-xs font-mono ${
                isSelected
                  ? 'bg-sky-500/25 border border-sky-400 text-sky-200 font-bold shadow-md shadow-sky-500/20 scale-105'
                  : isHovered
                  ? 'bg-space-800 border border-slate-600 text-slate-100 scale-102'
                  : 'bg-space-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-space-850'
              }`}
              title={`${body.name} (${body.classification}) - ${body.orbital.semiMajorAxisAu} AU`}
            >
              {/* Planetary Swatch Dot */}
              <span
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 transition-transform"
                style={{
                  backgroundColor: body.color,
                  boxShadow: isSelected ? `0 0 10px ${body.color}` : 'none',
                }}
              />
              <span className="font-sans font-medium">{body.name}</span>
              {body.id !== 'sun' && (
                <span className="hidden md:inline-block text-[10px] text-slate-500 font-mono">
                  {body.orbital.semiMajorAxisAu} AU
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
