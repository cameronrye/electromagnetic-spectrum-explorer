import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { wavelengthToFrequency, wavelengthToEnergyEV } from './utils/physicsCalculations.js';
import { getRegionByWavelength } from './data/spectrumData.js';
import { logError, logWarning } from './utils/errorHandling.js';
import SimpleConversionPanel from './components/SimpleConversionPanel.jsx';
import SimpleSpectrum from './components/SimpleSpectrum.jsx';
import SimpleEducationalPanel from './components/SimpleEducationalPanel.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Footer from './components/Footer.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import './App.css';

function AppContent() {
  const [selectedWavelength, setSelectedWavelength] = useState(550e-9); // Green light

  // Memoize wavelength change handler to prevent unnecessary re-renders
  const handleWavelengthChange = useCallback((newWavelength) => {
    setSelectedWavelength(newWavelength);
  }, []);

  // Memoize derived calculations to avoid recalculating on every render
  const frequency = useMemo(() =>
    wavelengthToFrequency(selectedWavelength),
    [selectedWavelength]
  );

  const energy = useMemo(() =>
    wavelengthToEnergyEV(selectedWavelength),
    [selectedWavelength]
  );

  // Memoize region lookup to avoid recalculating on every render
  const region = useMemo(() => {
    try {
      return getRegionByWavelength(selectedWavelength);
    } catch (error) {
      logError('App.getRegionByWavelength', error);
      return null; // UI will handle gracefully
    }
  }, [selectedWavelength]);

  // Auto-run comprehensive tests in development
  useEffect(() => {
    const runTestsInDev = async () => {
      if (import.meta.env.DEV && window.location.search.includes('runTests=true')) {
        try {
          const { testRunner } = await import('./tests/testRunner.js');
          setTimeout(async () => {
            await testRunner.runAllTests();
          }, 2000); // Wait 2 seconds for app to fully load
        } catch (error) {
          logWarning('App.runTestsInDev', 'Failed to load test runner: ' + error.message);
        }
      }
    };

    runTestsInDev();
  }, []);

  return (
    <div className="app">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header">
        <div className="header-controls">
          <ThemeSwitcher />
        </div>
        <div className="header-content">
          <h1>Electromagnetic Spectrum Explorer</h1>
          <p className="app-subtitle">
            Interactive tool for exploring the electromagnetic spectrum from radio waves to gamma rays
          </p>
        </div>
      </header>

      <main id="main-content" className="app-main">
        {/* Interactive Spectrum - Moved to top */}
        <div className="content-section">
          <SimpleSpectrum
            selectedWavelength={selectedWavelength}
            onWavelengthChange={handleWavelengthChange}
          />
        </div>

        <div className="info-section">
          <h2>Basic Spectrum Explorer</h2>
          <p>Selected Wavelength: {selectedWavelength.toExponential(2)} meters</p>
          <p>This is approximately {(selectedWavelength * 1e9).toFixed(0)} nanometers</p>
          <p>Frequency: {frequency.toExponential(2)} Hz</p>
          <p>Energy: {energy.toFixed(3)} eV</p>
          <p>Region: {region ? region.name : `Unknown (wavelength: ${selectedWavelength.toExponential(2)}m)`}</p>
          {region && (
            <p style={{color: region.color, fontWeight: 'bold'}}>
              {region.description}
            </p>
          )}


          <div className="wavelength-controls">
            <label htmlFor="wavelength-slider">Adjust Wavelength (nm): </label>
            <input
              id="wavelength-slider"
              type="range"
              min="1"
              max="1000000"
              step="1"
              value={Math.max(1, Math.min(1000000, selectedWavelength * 1e9))}
              onChange={(e) => handleWavelengthChange(e.target.value * 1e-9)}
              className="wavelength-slider"
            />
            <span>{(selectedWavelength * 1e9).toFixed(1)} nm</span>
          </div>

          <div
            className="color-preview"
            style={{
              backgroundColor: `hsl(${((700 - selectedWavelength * 1e9) / 320) * 280}, 100%, 50%)`
            }}
          >
          </div>

          <p>Approximate color representation of the selected wavelength</p>
        </div>



        {/* Interactive Conversion Panel */}
        <div className="content-section">
          <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
            Unit Conversion Panel
          </h3>
          <p style={{ marginBottom: 'var(--spacing-md)', color: 'var(--theme-text-secondary)', textAlign: 'center' }}>
            Enter values in any field to convert between units:
          </p>
          <SimpleConversionPanel
            selectedWavelength={selectedWavelength}
            onWavelengthChange={handleWavelengthChange}
          />
        </div>

        {/* Educational Panel */}
        <div className="content-section">
          <SimpleEducationalPanel
            selectedWavelength={selectedWavelength}
            onWavelengthChange={handleWavelengthChange}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
