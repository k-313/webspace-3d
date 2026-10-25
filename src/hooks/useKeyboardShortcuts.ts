import { useEffect } from 'react';
import { useSimulation } from '../store/simulationContext';
import { CELESTIAL_BODIES } from '../data/celestialBodies';

export function useKeyboardShortcuts() {
  const {
    togglePause,
    resetView,
    selectedPlanetId,
    setSelectedPlanetId,
    showOrbits,
    setShowOrbits,
    showLabels,
    setShowLabels,
    openSearch,
    openQuiz,
    openShortcutsModal,
    openScaleModal,
    startTour,
    tourActive,
    nextTourStep,
    prevTourStep,
    endTour,
    closeSearch,
    closeQuiz,
    closeScaleModal,
    closeShortcutsModal,
    isInfoDrawerOpen,
    setIsInfoDrawerOpen,
    isSearchOpen,
    isQuizOpen,
    isScaleModalOpen,
    isSourcesModalOpen,
    closeSourcesModal,
    isShortcutsModalOpen,
  } = useSimulation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        if (e.key === 'Escape') {
          closeSearch();
        }
        return;
      }

      // Check if any modal is open
      const hasModalOpen =
        isSearchOpen ||
        isQuizOpen ||
        isScaleModalOpen ||
        isSourcesModalOpen ||
        isShortcutsModalOpen;

      if (e.key === 'Escape') {
        if (hasModalOpen) {
          closeSearch();
          closeQuiz();
          closeScaleModal();
          closeSourcesModal();
          closeShortcutsModal();
          return;
        }
        if (tourActive) {
          endTour();
          return;
        }
        if (isInfoDrawerOpen || selectedPlanetId) {
          setSelectedPlanetId(null);
          setIsInfoDrawerOpen(false);
          return;
        }
      }

      // Tour navigation shortcuts
      if (tourActive) {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          e.preventDefault();
          nextTourStep();
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevTourStep();
          return;
        }
      }

      // Search shortcut (/ or Cmd+K / Ctrl+K)
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openSearch();
        return;
      }

      // Space: Pause/Resume
      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
      }

      // R: Reset view
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        resetView();
        return;
      }

      // O: Toggle orbit lines
      if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setShowOrbits(!showOrbits);
        return;
      }

      // L: Toggle planet labels
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setShowLabels(!showLabels);
        return;
      }

      // T: Start/toggle tour
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (tourActive) endTour();
        else startTour();
        return;
      }

      // Q: Open quiz
      if (e.key.toLowerCase() === 'q') {
        e.preventDefault();
        openQuiz();
        return;
      }

      // S: Open scale explainer
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        openScaleModal();
        return;
      }

      // ?: Open shortcuts
      if (e.key === '?') {
        e.preventDefault();
        openShortcutsModal();
        return;
      }

      // Left / Right Arrow to cycle planets
      if (e.key === 'ArrowRight' && !tourActive) {
        e.preventDefault();
        const currentIdx = CELESTIAL_BODIES.findIndex((b) => b.id === selectedPlanetId);
        const nextIdx = (currentIdx + 1) % CELESTIAL_BODIES.length;
        setSelectedPlanetId(CELESTIAL_BODIES[nextIdx].id);
        return;
      }

      if (e.key === 'ArrowLeft' && !tourActive) {
        e.preventDefault();
        const currentIdx = CELESTIAL_BODIES.findIndex((b) => b.id === selectedPlanetId);
        const prevIdx = currentIdx <= 0 ? CELESTIAL_BODIES.length - 1 : currentIdx - 1;
        setSelectedPlanetId(CELESTIAL_BODIES[prevIdx].id);
        return;
      }

      // F: Toggle fullscreen
      if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePause,
    resetView,
    selectedPlanetId,
    setSelectedPlanetId,
    showOrbits,
    setShowOrbits,
    showLabels,
    setShowLabels,
    openSearch,
    openQuiz,
    openShortcutsModal,
    openScaleModal,
    startTour,
    tourActive,
    nextTourStep,
    prevTourStep,
    endTour,
    closeSearch,
    closeQuiz,
    closeScaleModal,
    closeSourcesModal,
    closeShortcutsModal,
    isInfoDrawerOpen,
    setIsInfoDrawerOpen,
    isSearchOpen,
    isQuizOpen,
    isScaleModalOpen,
    isSourcesModalOpen,
    isShortcutsModalOpen,
  ]);
}
