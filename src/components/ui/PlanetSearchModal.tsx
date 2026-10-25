import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';
import { CELESTIAL_BODIES, CelestialBody } from '../../data/celestialBodies';

export const PlanetSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, setSelectedPlanetId } = useSimulation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CELESTIAL_BODIES;

    return CELESTIAL_BODIES.filter((body) => {
      const matchName = body.name.toLowerCase().includes(q);
      const matchClass = body.classification.toLowerCase().includes(q);
      const matchTagline = body.tagline.toLowerCase().includes(q);
      const matchFacts = body.facts.some((f) => f.toLowerCase().includes(q));
      return matchName || matchClass || matchTagline || matchFacts;
    });
  }, [query]);

  const handleSelect = (body: CelestialBody) => {
    setSelectedPlanetId(body.id);
    closeSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Celestial Bodies"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeSearch}
    >
      <div
        className="glass-panel w-full max-w-lg rounded-2xl p-4 shadow-2xl border border-sky-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-space-900 border border-slate-700/80 focus-within:border-sky-400">
          <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search planets, moons, rings, atmospheric facts..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none font-sans"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white"
              aria-label="Clear query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="mt-3 max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-400">
              No celestial bodies found matching &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((body, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={body.id}
                  onClick={() => handleSelect(body)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-500/20 border border-sky-400/50 text-white'
                      : 'hover:bg-space-850/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: body.color }}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm font-sans">{body.name}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {body.classification}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-sm">
                        {body.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 font-mono text-xs text-sky-400">
                    {body.orbital.semiMajorAxisAu > 0 && (
                      <span>{body.orbital.semiMajorAxisAu} AU</span>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
