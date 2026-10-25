import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SimulationProvider, useSimulation } from '../store/simulationContext';
import { PlanetInfoDrawer } from '../components/ui/PlanetInfoDrawer';

const TestContainer: React.FC<{ initialPlanetId: string }> = ({ initialPlanetId }) => {
  const { setSelectedPlanetId } = useSimulation();

  React.useEffect(() => {
    setSelectedPlanetId(initialPlanetId);
  }, [initialPlanetId, setSelectedPlanetId]);

  return <PlanetInfoDrawer />;
};

describe('PlanetInfoDrawer Component', () => {
  it('renders scientific details for selected planet Mars', () => {
    render(
      <SimulationProvider>
        <TestContainer initialPlanetId="mars" />
      </SimulationProvider>
    );

    expect(screen.getByRole('dialog', { name: /Mars Scientific Properties/i })).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText(/The Red Frontier/i)).toBeInTheDocument();
    expect(screen.getByText(/1.524 AU/i)).toBeInTheDocument();
  });

  it('switches between tabs and reveals detailed physical parameters', () => {
    render(
      <SimulationProvider>
        <TestContainer initialPlanetId="jupiter" />
      </SimulationProvider>
    );

    // Switch to Physical Characteristics Tab
    const physicalTab = screen.getByRole('tab', { name: /Physical/i });
    fireEvent.click(physicalTab);

    expect(screen.getByText(/Total Mass/i)).toBeInTheDocument();
    expect(screen.getByText(/Surface Gravity/i)).toBeInTheDocument();
    expect(screen.getByText(/24.79 m\/s²/i)).toBeInTheDocument();

    // Switch to Orbit & Spin Tab
    const orbitTab = screen.getByRole('tab', { name: /Orbit & Spin/i });
    fireEvent.click(orbitTab);
    expect(screen.getByText(/Semi-Major Axis \(AU\)/i)).toBeInTheDocument();
    expect(screen.getByText(/5.204 AU/i)).toBeInTheDocument();

    // Switch to Atmosphere Tab
    const atmosphereTab = screen.getByRole('tab', { name: /Atmosphere/i });
    fireEvent.click(atmosphereTab);
    expect(screen.getByText(/Hydrogen \(H₂\)/i)).toBeInTheDocument();
    expect(screen.getByText(/89.8%/i)).toBeInTheDocument();
  });

  it('closes when close button is clicked', () => {
    render(
      <SimulationProvider>
        <TestContainer initialPlanetId="earth" />
      </SimulationProvider>
    );

    const closeBtn = screen.getByLabelText(/Close planet details panel/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
