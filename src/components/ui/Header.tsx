import React from 'react';
import {
  Compass,
  Search,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useSimulation } from '../../store/simulationContext';

export const Header: React.FC = () => {
  const {
    openSearch,
    openQuiz,
    startTour,
    openScaleModal,
    openSourcesModal,
    openShortcutsModal,
    audioEnabled,
    setAudioEnabled,
    scaleMode,
    setScaleMode,
  } = useSimulation();

  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 flex items-center justify-between pointer-events-none">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-amber-500 shadow-lg shadow-sky-500/20 border border-sky-400/30">
          <Compass className="w-5 h-5 text-white animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans drop-shadow-md">
              WebSpace <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-400">3D</span>
            </h1>
            <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300">
              NASA Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Interactive Solar System Observatory
          </p>
        </div>
      </div>

      {/* Navigation & Mode Controls */}
      <div className="flex items-center space-x-2 sm:space-x-2.5 pointer-events-auto">
        {/* Scale Switcher */}
        <div className="hidden lg:flex items-center rounded-lg bg-space-900/80 border border-slate-700/60 p-0.5 backdrop-blur-md">
          <button
            onClick={() => setScaleMode('illustrative')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
              scaleMode === 'illustrative'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Illustrative Scale (Logarithmic spacing for easy viewing)"
          >
            Illustrative
          </button>
          <button
            onClick={() => setScaleMode('true-distance')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
              scaleMode === 'true-distance'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="True Distance Scale (Astronomical Units)"
          >
            True Distance
          </button>
          <button
            onClick={() => setScaleMode('true-size')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
              scaleMode === 'true-size'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="True Size Scale (Relative Planetary Radii)"
          >
            True Size
          </button>
          <button
            onClick={openScaleModal}
            className="p-1 text-slate-400 hover:text-sky-300 ml-1"
            title="Explain Scale Differences"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Button */}
        <button
          onClick={openSearch}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-sky-400/50 backdrop-blur-md transition-all text-xs font-mono shadow-sm"
          title="Search Planets & Objects (/ or Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden md:inline px-1 py-0.2 text-[9px] bg-slate-800 text-slate-400 rounded border border-slate-700">
            /
          </kbd>
        </button>

        {/* Guided Tour */}
        <button
          onClick={startTour}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-400 backdrop-blur-md transition-all text-xs font-mono shadow-sm hover:shadow-purple-500/20"
          title="Start Guided Solar System Tour (T)"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="hidden sm:inline">Guided Tour</span>
        </button>

        {/* Educational Quiz */}
        <button
          onClick={openQuiz}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-950/80 to-orange-950/80 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 backdrop-blur-md transition-all text-xs font-mono shadow-sm hover:shadow-amber-500/20"
          title="Take Astronomy Quiz Challenge (Q)"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Quiz</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`p-2 rounded-lg border backdrop-blur-md transition-colors ${
            audioEnabled
              ? 'bg-sky-500/20 border-sky-400/50 text-sky-300'
              : 'bg-space-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
          title={audioEnabled ? 'Mute Ambient Audio' : 'Enable Space Drone Audio'}
          aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Scientific Sources */}
        <button
          onClick={openSourcesModal}
          className="p-2 rounded-lg bg-space-900/80 border border-slate-700/60 text-slate-400 hover:text-sky-300 backdrop-blur-md transition-colors"
          title="View Scientific References & Citations"
          aria-label="Scientific references"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Keyboard Shortcuts Help */}
        <button
          onClick={openShortcutsModal}
          className="hidden sm:block p-2 rounded-lg bg-space-900/80 border border-slate-700/60 text-slate-400 hover:text-sky-300 backdrop-blur-md transition-colors"
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-space-900/80 border border-slate-700/60 text-slate-400 hover:text-slate-200 backdrop-blur-md transition-colors"
          title="Toggle Fullscreen (F)"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
