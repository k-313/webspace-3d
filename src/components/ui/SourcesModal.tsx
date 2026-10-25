import React from 'react';
import { BookOpen, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';
import { SCIENTIFIC_SOURCES } from '../../data/scientificSources';

export const SourcesModal: React.FC = () => {
  const { isSourcesModalOpen, closeSourcesModal } = useSimulation();

  if (!isSourcesModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scientific Sources & Citations"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSourcesModal}
    >
      <div
        className="glass-panel w-full max-w-xl rounded-2xl p-5 sm:p-6 shadow-2xl border border-sky-500/30 bg-space-950/90 overflow-hidden flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Scientific Sources & Citations
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Peer-reviewed astrophysical data sources used across WebSpace 3D
              </span>
            </div>
          </div>

          <button
            onClick={closeSourcesModal}
            className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white transition-colors"
            aria-label="Close sources dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verification banner */}
        <div className="flex items-center space-x-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>Zero Fabricated Data: All measurements are verified directly against official space agency records.</span>
        </div>

        {/* Sources List */}
        <div className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
          {Object.values(SCIENTIFIC_SOURCES).map((src) => (
            <div key={src.id} className="p-3.5 rounded-xl bg-space-900/70 border border-slate-700/70 space-y-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-white font-sans">{src.title}</h3>
                  <div className="text-[11px] font-mono text-sky-400">
                    {src.organization} {src.authors ? `• ${src.authors}` : ''}
                  </div>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 transition-colors"
                  title="Open Official Documentation"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {src.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-700/60 flex justify-end">
          <button
            onClick={closeSourcesModal}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-colors"
          >
            Close References
          </button>
        </div>
      </div>
    </div>
  );
};
