import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SimulationProvider } from './store/simulationContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useAudioFx } from './hooks/useAudioFx';
import { SolarSystemScene } from './components/3d/SolarSystemScene';
import { Header } from './components/ui/Header';
import { TimeControls } from './components/ui/TimeControls';
import { PlanetSelector } from './components/ui/PlanetSelector';
import { PlanetInfoDrawer } from './components/ui/PlanetInfoDrawer';
import { PlanetSearchModal } from './components/ui/PlanetSearchModal';
import { GuidedTourModal } from './components/ui/GuidedTourModal';
import { QuizModal } from './components/ui/QuizModal';
import { ScaleExplainerModal } from './components/ui/ScaleExplainerModal';
import { SourcesModal } from './components/ui/SourcesModal';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { PerformanceBadge } from './components/ui/PerformanceBadge';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL / Scene Crash Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-space-950 text-white p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-sans">3D Graphics Context Interrupted</h2>
          <p className="text-sm text-slate-300 max-w-md">
            WebGL encountered a device graphics limitation or temporary context loss.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Observatory</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ObservatoryContent: React.FC = () => {
  // Activate keyboard hotkeys and audio synthesizer
  useKeyboardShortcuts();
  useAudioFx();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-950 select-none">
      {/* 3D Scene Layer */}
      <WebGLErrorBoundary>
        <SolarSystemScene />
      </WebGLErrorBoundary>

      {/* User Interface Overlays */}
      <Header />
      <TimeControls />
      <PlanetSelector />
      <PlanetInfoDrawer />
      <GuidedTourModal />
      <PlanetSearchModal />
      <QuizModal />
      <ScaleExplainerModal />
      <SourcesModal />
      <KeyboardShortcutsModal />
      <PerformanceBadge />
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <ObservatoryContent />
    </SimulationProvider>
  );
}
