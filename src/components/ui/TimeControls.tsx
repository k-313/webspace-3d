import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Eye,
  EyeOff,
  CircleDot,
  Compass,
  ArrowDownUp
} from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';

export const TimeControls: React.FC = () => {
  const {
    isPaused,
    togglePause,
    simulationSpeed,
    setSimulationSpeed,
    stepSimulationDays,
    simulatedDays,
    showOrbits,
    setShowOrbits,
    showLabels,
    setShowLabels,
    showAsteroidBelt,
    setShowAsteroidBelt,
    cameraMode,
    setCameraMode,
    resetView,
  } = useSimulation();

  const speedPresets = [-5, -1, 0.1, 1, 5, 25, 100];

  // Calculate simulated Earth calendar time
  const simulatedYears = (simulatedDays / 365.256).toFixed(2);
  const displayDays = Math.round(simulatedDays);

  return (
    <div className="absolute top-16 sm:top-20 left-3 sm:left-4 z-20 flex flex-col space-y-2 pointer-events-none">
      {/* Time & Orbit Speed Panel */}
      <div className="glass-panel rounded-xl p-3 sm:p-3.5 flex flex-col space-y-3 pointer-events-auto max-w-[280px] sm:max-w-[320px]">
        {/* Simulated Date / Counter */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
          <div className="flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="text-xs font-mono font-medium text-slate-300">
              {isPaused ? 'Simulation Paused' : 'Simulation Active'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
            {displayDays >= 0 ? `+${displayDays}` : displayDays} Days ({simulatedYears} y)
          </span>
        </div>

        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center justify-between space-x-2">
          <button
            onClick={() => stepSimulationDays(-10)}
            className="p-1.5 rounded-lg bg-space-850 hover:bg-space-700 text-slate-300 border border-slate-700/50 transition-colors"
            title="Step Back 10 Days"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePause}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg font-mono text-xs font-semibold transition-all shadow-md ${
              isPaused
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20'
            }`}
            title="Toggle Pause / Resume (Space)"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            onClick={() => stepSimulationDays(10)}
            className="p-1.5 rounded-lg bg-space-850 hover:bg-space-700 text-slate-300 border border-slate-700/50 transition-colors"
            title="Step Forward 10 Days"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetView}
            className="p-1.5 rounded-lg bg-space-850 hover:bg-space-700 text-slate-400 hover:text-sky-300 border border-slate-700/50 transition-colors"
            title="Reset Solar System View (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Preset Multipliers */}
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Orbital Velocity</span>
            <span className="text-sky-300">{simulationSpeed}x</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {speedPresets.map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  setSimulationSpeed(speed);
                }}
                className={`py-1 text-[10px] font-mono rounded transition-colors text-center ${
                  simulationSpeed === speed
                    ? 'bg-sky-500/25 border border-sky-400/60 text-sky-200 font-bold'
                    : 'bg-space-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-space-800'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Scene Layer Toggles */}
        <div className="pt-2 border-t border-slate-700/60 grid grid-cols-3 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setShowOrbits(!showOrbits)}
            className={`flex items-center justify-center space-x-1 py-1 px-1.5 rounded border transition-colors ${
              showOrbits
                ? 'bg-sky-950/60 border-sky-600/50 text-sky-300'
                : 'bg-space-900/40 border-slate-800 text-slate-500'
            }`}
            title="Toggle Planetary Orbit Paths (O)"
          >
            <CircleDot className="w-3 h-3" />
            <span>Orbits</span>
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center justify-center space-x-1 py-1 px-1.5 rounded border transition-colors ${
              showLabels
                ? 'bg-sky-950/60 border-sky-600/50 text-sky-300'
                : 'bg-space-900/40 border-slate-800 text-slate-500'
            }`}
            title="Toggle Planet Labels (L)"
          >
            {showLabels ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Labels</span>
          </button>

          <button
            onClick={() => setShowAsteroidBelt(!showAsteroidBelt)}
            className={`flex items-center justify-center space-x-1 py-1 px-1.5 rounded border transition-colors ${
              showAsteroidBelt
                ? 'bg-sky-950/60 border-sky-600/50 text-sky-300'
                : 'bg-space-900/40 border-slate-800 text-slate-500'
            }`}
            title="Toggle Asteroid Belt Visibility"
          >
            <Compass className="w-3 h-3" />
            <span>Asteroids</span>
          </button>
        </div>

        {/* Camera Angles */}
        <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
          <button
            onClick={() => setCameraMode(cameraMode === 'top-down' ? 'overview' : 'top-down')}
            className={`flex items-center justify-center space-x-1 py-1 px-1.5 rounded border transition-colors ${
              cameraMode === 'top-down'
                ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300 font-semibold'
                : 'bg-space-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Top-down Ecliptic Plane View"
          >
            <ArrowDownUp className="w-3 h-3" />
            <span>Top-Down Ecliptic</span>
          </button>

          <button
            onClick={() => setCameraMode('overview')}
            className={`flex items-center justify-center space-x-1 py-1 px-1.5 rounded border transition-colors ${
              cameraMode === 'overview'
                ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300 font-semibold'
                : 'bg-space-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Isometric Solar System Perspective"
          >
            <span>Overview Angle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
