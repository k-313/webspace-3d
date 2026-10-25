import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SimulationProvider, useSimulation } from '../store/simulationContext';
import { TOUR_STOPS } from '../data/tourStops';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SimulationProvider>{children}</SimulationProvider>
);

describe('Simulation Context State Management', () => {
  it('initializes with default observatory parameters', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    expect(result.current.selectedPlanetId).toBeNull();
    expect(result.current.isPaused).toBe(false);
    expect(result.current.simulationSpeed).toBe(1);
    expect(result.current.scaleMode).toBe('illustrative');
    expect(result.current.showOrbits).toBe(true);
    expect(result.current.showLabels).toBe(true);
    expect(result.current.tourActive).toBe(false);
  });

  it('toggles pause and resume states', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.togglePause();
    });
    expect(result.current.isPaused).toBe(true);

    act(() => {
      result.current.togglePause();
    });
    expect(result.current.isPaused).toBe(false);
  });

  it('updates simulation speed and step simulation days', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.setSimulationSpeed(25);
    });
    expect(result.current.simulationSpeed).toBe(25);

    act(() => {
      result.current.stepSimulationDays(365);
    });
    expect(result.current.simulatedDays).toBe(365);
  });

  it('opens and closes planet info drawer on selection', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.setSelectedPlanetId('mars');
    });
    expect(result.current.selectedPlanetId).toBe('mars');
    expect(result.current.isInfoDrawerOpen).toBe(true);
    expect(result.current.cameraMode).toBe('follow');

    act(() => {
      result.current.setSelectedPlanetId(null);
    });
    expect(result.current.selectedPlanetId).toBeNull();
    expect(result.current.isInfoDrawerOpen).toBe(false);
    expect(result.current.cameraMode).toBe('overview');
  });

  it('manages guided tour progression through all stops', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.startTour();
    });
    expect(result.current.tourActive).toBe(true);
    expect(result.current.tourStepIndex).toBe(0);

    act(() => {
      result.current.nextTourStep();
    });
    expect(result.current.tourStepIndex).toBe(1);
    expect(result.current.selectedPlanetId).toBe(TOUR_STOPS[1].targetId);

    act(() => {
      result.current.prevTourStep();
    });
    expect(result.current.tourStepIndex).toBe(0);

    act(() => {
      result.current.endTour();
    });
    expect(result.current.tourActive).toBe(false);
  });

  it('supports modal toggles for search, quiz, and scale explainer', () => {
    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.openQuiz();
    });
    expect(result.current.isQuizOpen).toBe(true);
    act(() => {
      result.current.closeQuiz();
    });
    expect(result.current.isQuizOpen).toBe(false);

    act(() => {
      result.current.openSearch();
    });
    expect(result.current.isSearchOpen).toBe(true);
    act(() => {
      result.current.closeSearch();
    });
    expect(result.current.isSearchOpen).toBe(false);
  });
});
