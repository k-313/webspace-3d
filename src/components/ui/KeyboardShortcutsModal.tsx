import React from 'react';
import { HelpCircle, X, Keyboard, MousePointer } from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsModalOpen, closeShortcutsModal } = useSimulation();

  if (!isShortcutsModalOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Pause or resume orbital simulation' },
    { key: 'R', desc: 'Reset camera to Solar System overview' },
    { key: 'Esc', desc: 'Close open dialogs / Deselect planet' },
    { key: '← / →', desc: 'Cycle through adjacent celestial bodies' },
    { key: '/ or ⌘K', desc: 'Open instant planet search' },
    { key: 'T', desc: 'Start or exit curated Guided Tour' },
    { key: 'Q', desc: 'Launch Astronomy Quiz Challenge' },
    { key: 'S', desc: 'Open Scale Paradox Explainer' },
    { key: 'O', desc: 'Toggle planetary orbit path lines' },
    { key: 'L', desc: 'Toggle planet text labels' },
    { key: 'F', desc: 'Toggle browser fullscreen mode' },
    { key: '?', desc: 'Show this keyboard shortcuts guide' },
  ];

  const mouseControls = [
    { action: 'Left Click + Drag', desc: 'Rotate / Orbit 3D perspective' },
    { action: 'Right Click + Drag', desc: 'Pan camera position across plane' },
    { action: 'Scroll Wheel / Pinch', desc: 'Smooth zoom in / zoom out' },
    { action: 'Click Planet / Label', desc: 'Focus camera and open scientific dossier' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts & Controls"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeShortcutsModal}
    >
      <div
        className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-6 shadow-2xl border border-sky-500/30 bg-space-950/90 overflow-hidden flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Controls & Navigation
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Observatory hotkeys and 3D camera gestures
              </span>
            </div>
          </div>

          <button
            onClick={closeShortcutsModal}
            className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white transition-colors"
            aria-label="Close shortcuts guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
          {/* Keyboard Shortcuts */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Shortcuts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs">
              {shortcuts.map((sc, i) => (
                <div key={i} className="glass-card p-2 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300 font-sans text-[11px]">{sc.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-space-900 border border-slate-700 text-sky-300 font-bold text-[10px] ml-2 flex-shrink-0">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Mouse / Touch Controls */}
          <div className="space-y-2 pt-2 border-t border-slate-700/60">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <MousePointer className="w-4 h-4" />
              <span>Mouse & Touch Gestures</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
              {mouseControls.map((mc, i) => (
                <div key={i} className="glass-card p-2 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300 font-sans text-[11px]">{mc.desc}</span>
                  <span className="text-amber-300 font-bold text-[10px] ml-2 flex-shrink-0">
                    {mc.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-700/60 flex justify-end">
          <button
            onClick={closeShortcutsModal}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
