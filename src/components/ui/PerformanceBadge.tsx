import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Zap } from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';

export const PerformanceBadge: React.FC = () => {
  const {
    graphicsQuality,
    setGraphicsQuality,
    reducedMotion,
    setReducedMotion,
  } = useSimulation();

  const [fps, setFps] = useState(60);
  const [isOpen, setIsOpen] = useState(false);

  // Approximate client FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 pointer-events-auto">
      <div className="relative">
        {/* Trigger Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-panel-subtle flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          title="Performance & Graphics Quality Settings"
        >
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>{fps} FPS</span>
          <span className="text-slate-600">•</span>
          <span className="capitalize">{graphicsQuality}</span>
          {reducedMotion && <span className="text-amber-400">⚡</span>}
        </button>

        {/* Flyout popover */}
        {isOpen && (
          <div className="glass-panel absolute bottom-full left-0 mb-2 w-56 rounded-xl p-3 shadow-xl border border-slate-700/80 space-y-2.5 text-xs font-mono animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
              <span className="text-slate-300 font-bold flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Render Performance</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Quality tier */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Graphics Fidelity</span>
              <div className="grid grid-cols-3 gap-1">
                {(['low', 'medium', 'high'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setGraphicsQuality(q)}
                    className={`py-1 rounded text-center capitalize transition-colors ${
                      graphicsQuality === q
                        ? 'bg-sky-500/20 border border-sky-400 text-sky-200 font-bold'
                        : 'bg-space-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="pt-1.5 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-300 flex items-center space-x-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Reduced Motion</span>
              </span>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  reducedMotion ? 'bg-sky-500' : 'bg-space-900 border border-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    reducedMotion ? 'left-4.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
