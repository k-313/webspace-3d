import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ScaleMode } from '../utils/orbitalMath';
import { TOUR_STOPS } from '../data/tourStops';

export type CameraMode = 'free' | 'follow' | 'top-down' | 'overview';
export type GraphicsQuality = 'high' | 'medium' | 'low';

export interface SimulationContextValue {
  selectedPlanetId: string | null;
  hoveredPlanetId: string | null;
  isPaused: boolean;
  simulationSpeed: number; // e.g., 0.1, 1, 5, 25, 100, -1, -5
  scaleMode: ScaleMode;
  cameraMode: CameraMode;
  showOrbits: boolean;
  showLabels: boolean;
  showAsteroidBelt: boolean;
  simulatedDays: number;
  graphicsQuality: GraphicsQuality;
  audioEnabled: boolean;
  reducedMotion: boolean;

  // Modals & Panels
  isInfoDrawerOpen: boolean;
  isQuizOpen: boolean;
  isSearchOpen: boolean;
  isScaleModalOpen: boolean;
  isSourcesModalOpen: boolean;
  isShortcutsModalOpen: boolean;

  // Guided Tour
  tourActive: boolean;
  tourStepIndex: number;

  // Actions
  setSelectedPlanetId: (id: string | null) => void;
  setHoveredPlanetId: (id: string | null) => void;
  togglePause: () => void;
  setIsPaused: (paused: boolean) => void;
  setSimulationSpeed: (speed: number) => void;
  stepSimulationDays: (days: number) => void;
  setScaleMode: (mode: ScaleMode) => void;
  setCameraMode: (mode: CameraMode) => void;
  setShowOrbits: (show: boolean) => void;
  setShowLabels: (show: boolean) => void;
  setShowAsteroidBelt: (show: boolean) => void;
  setSimulatedDays: React.Dispatch<React.SetStateAction<number>>;
  setGraphicsQuality: (quality: GraphicsQuality) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setIsInfoDrawerOpen: (open: boolean) => void;

  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;

  openQuiz: () => void;
  closeQuiz: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openScaleModal: () => void;
  closeScaleModal: () => void;
  openSourcesModal: () => void;
  closeSourcesModal: () => void;
  openShortcutsModal: () => void;
  closeShortcutsModal: () => void;
  resetView: () => void;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlanetId, setSelectedPlanetIdState] = useState<string | null>(null);
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [scaleMode, setScaleMode] = useState<ScaleMode>('illustrative');
  const [cameraMode, setCameraMode] = useState<CameraMode>('overview');
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showAsteroidBelt, setShowAsteroidBelt] = useState<boolean>(true);
  const [simulatedDays, setSimulatedDays] = useState<number>(0);
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>('high');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Modals & Panels
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScaleModalOpen, setIsScaleModalOpen] = useState<boolean>(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Guided Tour
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);

  // Check OS reduced motion preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener?.('change', listener);
      return () => mediaQuery.removeEventListener?.('change', listener);
    }
  }, []);

  const setSelectedPlanetId = useCallback((id: string | null) => {
    setSelectedPlanetIdState(id);
    if (id) {
      setIsInfoDrawerOpen(true);
      setCameraMode('follow');
    } else {
      setIsInfoDrawerOpen(false);
      setCameraMode('overview');
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const stepSimulationDays = useCallback((days: number) => {
    setSimulatedDays((prev) => prev + days);
  }, []);

  const resetView = useCallback(() => {
    setSelectedPlanetIdState(null);
    setIsInfoDrawerOpen(false);
    setCameraMode('overview');
  }, []);

  // Tour controls
  const startTour = useCallback(() => {
    setTourActive(true);
    setTourStepIndex(0);
    setIsInfoDrawerOpen(false);
    setIsQuizOpen(false);
    setIsSearchOpen(false);
    const firstStop = TOUR_STOPS[0];
    setSelectedPlanetIdState(firstStop.targetId);
  }, []);

  const nextTourStep = useCallback(() => {
    setTourStepIndex((prev) => {
      const nextIdx = Math.min(prev + 1, TOUR_STOPS.length - 1);
      const stop = TOUR_STOPS[nextIdx];
      setSelectedPlanetIdState(stop.targetId);
      return nextIdx;
    });
  }, []);

  const prevTourStep = useCallback(() => {
    setTourStepIndex((prev) => {
      const nextIdx = Math.max(prev - 1, 0);
      const stop = TOUR_STOPS[nextIdx];
      setSelectedPlanetIdState(stop.targetId);
      return nextIdx;
    });
  }, []);

  const endTour = useCallback(() => {
    setTourActive(false);
    resetView();
  }, [resetView]);

  return (
    <SimulationContext.Provider
      value={{
        selectedPlanetId,
        hoveredPlanetId,
        isPaused,
        simulationSpeed,
        scaleMode,
        cameraMode,
        showOrbits,
        showLabels,
        showAsteroidBelt,
        simulatedDays,
        graphicsQuality,
        audioEnabled,
        reducedMotion,
        isInfoDrawerOpen,
        isQuizOpen,
        isSearchOpen,
        isScaleModalOpen,
        isSourcesModalOpen,
        isShortcutsModalOpen,
        tourActive,
        tourStepIndex,
        setSelectedPlanetId,
        setHoveredPlanetId,
        togglePause,
        setIsPaused,
        setSimulationSpeed,
        stepSimulationDays,
        setScaleMode,
        setCameraMode,
        setShowOrbits,
        setShowLabels,
        setShowAsteroidBelt,
        setSimulatedDays,
        setGraphicsQuality,
        setAudioEnabled,
        setReducedMotion,
        setIsInfoDrawerOpen,
        startTour,
        nextTourStep,
        prevTourStep,
        endTour,
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openScaleModal: () => setIsScaleModalOpen(true),
        closeScaleModal: () => setIsScaleModalOpen(false),
        openSourcesModal: () => setIsSourcesModalOpen(true),
        closeSourcesModal: () => setIsSourcesModalOpen(false),
        openShortcutsModal: () => setIsShortcutsModalOpen(true),
        closeShortcutsModal: () => setIsShortcutsModalOpen(false),
        resetView,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export function useSimulation(): SimulationContextValue {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
