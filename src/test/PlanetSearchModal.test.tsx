import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SimulationProvider, useSimulation } from '../store/simulationContext';
import { PlanetSearchModal } from '../components/ui/PlanetSearchModal';

const TestSearchContainer: React.FC = () => {
  const { openSearch, selectedPlanetId } = useSimulation();
  const openedRef = React.useRef(false);

  React.useEffect(() => {
    if (!openedRef.current) {
      openedRef.current = true;
      openSearch();
    }
  }, [openSearch]);

  return (
    <div>
      <PlanetSearchModal />
      <div data-testid="selected-planet">{selectedPlanetId || 'none'}</div>
    </div>
  );
};

describe('PlanetSearchModal Component', () => {
  it('renders search input and all celestial bodies by default', () => {
    render(
      <SimulationProvider>
        <TestSearchContainer />
      </SimulationProvider>
    );

    const input = screen.getByPlaceholderText(/Search planets/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Jupiter')).toBeInTheDocument();
  });

  it('filters results dynamically based on user query', () => {
    render(
      <SimulationProvider>
        <TestSearchContainer />
      </SimulationProvider>
    );

    const input = screen.getByPlaceholderText(/Search planets/i);
    fireEvent.change(input, { target: { value: 'saturn' } });

    expect(screen.getByText('Saturn')).toBeInTheDocument();
    expect(screen.queryByText('Mercury')).not.toBeInTheDocument();
  });

  it('filters based on scientific keywords like "greenhouse"', () => {
    render(
      <SimulationProvider>
        <TestSearchContainer />
      </SimulationProvider>
    );

    const input = screen.getByPlaceholderText(/Search planets/i);
    fireEvent.change(input, { target: { value: 'greenhouse' } });

    expect(screen.getByText('Venus')).toBeInTheDocument();
    expect(screen.queryByText('Uranus')).not.toBeInTheDocument();
  });

  it('selects a planet and closes the modal on click', () => {
    render(
      <SimulationProvider>
        <TestSearchContainer />
      </SimulationProvider>
    );

    const input = screen.getByPlaceholderText(/Search planets/i);
    fireEvent.change(input, { target: { value: 'neptune' } });

    const neptuneItem = screen.getByText('Neptune');
    fireEvent.click(neptuneItem);

    expect(screen.getByTestId('selected-planet')).toHaveTextContent('neptune');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
