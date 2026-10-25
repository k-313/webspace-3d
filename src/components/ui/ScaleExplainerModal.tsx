import React from 'react';
import { Layers, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';

export const ScaleExplainerModal: React.FC = () => {
  const { isScaleModalOpen, closeScaleModal, scaleMode, setScaleMode } = useSimulation();

  if (!isScaleModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Solar System Scale Explainer"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeScaleModal}
    >
      <div
        className="glass-panel w-full max-w-xl rounded-2xl p-5 sm:p-6 shadow-2xl border border-sky-500/30 bg-space-950/90 overflow-hidden flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                The Solar System Scale Paradox
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Why standard textbooks and apps use illustrative scaling
              </span>
            </div>
          </div>

          <button
            onClick={closeScaleModal}
            className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white transition-colors"
            aria-label="Close scale explainer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Educational Narrative */}
        <div className="space-y-3 text-xs font-sans text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-space-900/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-400 font-mono font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>The Cosmic Empty Space Reality</span>
            </div>
            <p>
              In our real universe, space is virtually empty. If the Sun were scaled down to the size of a standard <strong>1-meter beach ball</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-200 font-mono text-[11px]">
              <li><strong>Mercury</strong> would be a tiny 3.5 mm mustard seed <strong>42 meters</strong> away.</li>
              <li><strong>Earth</strong> would be a 9 mm blueberry <strong>107 meters</strong> away (the length of a football field!).</li>
              <li><strong>Jupiter</strong> would be a 10 cm grapefruit over <strong>half a kilometer</strong> away (550 meters).</li>
              <li><strong>Neptune</strong> would be an icy 3.5 cm walnut over <strong>3.2 kilometers (2 miles)</strong> away!</li>
            </ul>
            <p>
              If rendered in true 1:1 scale on a computer monitor, the Sun would fill the entire room, while Earth and Mars would be microscopic sub-pixel dots scattered miles across the horizon.
            </p>
          </div>

          {/* Interactive Scale Modes Switcher */}
          <div className="space-y-2 pt-1">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-200">
              Select Viewing Model in WebSpace 3D
            </h3>

            <div className="grid grid-cols-1 gap-2 font-mono text-xs">
              {/* Illustrative */}
              <div
                onClick={() => setScaleMode('illustrative')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  scaleMode === 'illustrative'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-md shadow-sky-500/10'
                    : 'bg-space-900/60 border-slate-800 text-slate-400 hover:bg-space-850'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sky-300 mb-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Illustrative Observatory Mode (Default)</span>
                  </div>
                  {scaleMode === 'illustrative' && (
                    <span className="text-[10px] bg-sky-500/30 px-2 py-0.5 rounded text-sky-200">Active</span>
                  )}
                </div>
                <p className="text-[11px] font-sans text-slate-300">
                  Logarithmically compressed orbital radii and aesthetically calibrated planetary spheres so you can inspect planetary terrain, rings, and orbital planes simultaneously.
                </p>
              </div>

              {/* True Distance */}
              <div
                onClick={() => setScaleMode('true-distance')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  scaleMode === 'true-distance'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-md shadow-sky-500/10'
                    : 'bg-space-900/60 border-slate-800 text-slate-400 hover:bg-space-850'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sky-300 mb-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>True Relative Distance Mode (AU Proportional)</span>
                  </div>
                  {scaleMode === 'true-distance' && (
                    <span className="text-[10px] bg-sky-500/30 px-2 py-0.5 rounded text-sky-200">Active</span>
                  )}
                </div>
                <p className="text-[11px] font-sans text-slate-300">
                  Orbital distances correspond faithfully to actual Astronomical Units (1 AU to 39.5 AU), illustrating the vast emptiness separating the inner rocky terrestrial planets from outer giant systems.
                </p>
              </div>

              {/* True Size */}
              <div
                onClick={() => setScaleMode('true-size')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  scaleMode === 'true-size'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-md shadow-sky-500/10'
                    : 'bg-space-900/60 border-slate-800 text-slate-400 hover:bg-space-850'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sky-300 mb-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>True Relative Size Mode (Radius Ratios)</span>
                  </div>
                  {scaleMode === 'true-size' && (
                    <span className="text-[10px] bg-sky-500/30 px-2 py-0.5 rounded text-sky-200">Active</span>
                  )}
                </div>
                <p className="text-[11px] font-sans text-slate-300">
                  Planetary sphere radii are scaled accurately to Earth = 1.0 (Jupiter is 11× Earth, Saturn is 9.1× Earth, Mercury is 0.38× Earth).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-700/60 flex justify-end">
          <button
            onClick={closeScaleModal}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
