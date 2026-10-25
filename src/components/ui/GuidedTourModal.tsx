import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';
import { TOUR_STOPS } from '../../data/tourStops';

export const GuidedTourModal: React.FC = () => {
  const {
    tourActive,
    tourStepIndex,
    nextTourStep,
    prevTourStep,
    endTour,
  } = useSimulation();

  const [autoPlay, setAutoPlay] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(14);

  const currentStop = TOUR_STOPS[tourStepIndex];
  const isFirst = tourStepIndex === 0;
  const isLast = tourStepIndex === TOUR_STOPS.length - 1;

  // Auto-play timer
  useEffect(() => {
    if (!tourActive || !autoPlay) return;

    setSecondsRemaining(14);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (isLast) {
            setAutoPlay(false);
            return 0;
          }
          nextTourStep();
          return 14;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tourActive, autoPlay, tourStepIndex, isLast, nextTourStep]);

  if (!tourActive || !currentStop) return null;

  return (
    <div
      role="region"
      aria-label="Guided Solar System Tour"
      className="fixed bottom-20 sm:bottom-24 left-3 sm:left-6 z-40 max-w-lg w-[calc(100vw-24px)] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-2xl border border-purple-500/30 bg-space-950/85 backdrop-blur-xl flex flex-col space-y-3">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                Guided Voyage • Step {tourStepIndex + 1} of {TOUR_STOPS.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-tight">
                {currentStop.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Auto-play toggle */}
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center space-x-1 ${
                autoPlay
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                  : 'bg-space-850 text-slate-400 hover:text-slate-200'
              }`}
              title={autoPlay ? 'Pause Autoplay' : 'Start Autoplay Tour'}
            >
              {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {autoPlay && <span className="text-[10px] font-mono">{secondsRemaining}s</span>}
            </button>

            {/* Exit tour */}
            <button
              onClick={endTour}
              className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white transition-colors"
              title="Exit Guided Tour (Esc)"
              aria-label="Exit tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs font-mono text-purple-300/90 font-medium">
          {currentStop.subtitle}
        </p>

        {/* Narration paragraphs */}
        <div className="space-y-2 text-xs font-sans text-slate-200 leading-relaxed max-h-48 overflow-y-auto pr-1">
          {currentStop.narration.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {/* Key Facts list */}
          <div className="pt-2 border-t border-purple-500/20 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center space-x-1">
              <Compass className="w-3 h-3" />
              <span>Observatory Highlights</span>
            </span>
            <ul className="space-y-1 text-[11px] text-slate-300">
              {currentStop.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
          <button
            onClick={prevTourStep}
            disabled={isFirst}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
              isFirst
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-space-850 hover:bg-space-700 text-slate-200 border border-slate-700'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {/* Step dots */}
          <div className="hidden sm:flex items-center space-x-1">
            {TOUR_STOPS.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === tourStepIndex
                    ? 'w-4 bg-purple-400'
                    : i < tourStepIndex
                    ? 'bg-purple-600'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={isLast ? endTour : nextTourStep}
            className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all"
          >
            <span>{isLast ? 'Complete Tour' : 'Next Stop'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
