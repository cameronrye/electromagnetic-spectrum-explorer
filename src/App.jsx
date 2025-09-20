import React, { useState, useEffect } from 'react';
import { wavelengthToFrequency, wavelengthToEnergyEV } from './utils/physicsCalculations.js';
import { getRegionByWavelength } from './data/spectrumData.js';
import SimpleConversionPanel from './components/SimpleConversionPanel.jsx';
import SimpleSpectrum from './components/SimpleSpectrum.jsx';
import SimpleEducationalPanel from './components/SimpleEducationalPanel.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import './App.css';

function AppContent() {
  const [selectedWavelength, setSelectedWavelength] = useState(550e-9); // Green light

  // Calculate derived values
  const frequency = wavelengthToFrequency(selectedWavelength);
  const energy = wavelengthToEnergyEV(selectedWavelength);

  // Get the current electromagnetic spectrum region
  let region = null;
  try {
    region = getRegionByWavelength(selectedWavelength);
  } catch {
    // Silently handle region detection errors - region will remain null
  }

  // Auto-run comprehensive tests in development
  useEffect(() => {
    const runTestsInDev = async () => {
      if (import.meta.env.DEV && window.location.search.includes('runTests=true')) {
        try {
          const { testRunner } = await import('./tests/testRunner.js');
          setTimeout(async () => {
            await testRunner.runAllTests();
          }, 2000); // Wait 2 seconds for app to fully load
        } catch {
          // Silently handle test runner loading errors in production builds
        }
      }
    };

    runTestsInDev();
  }, []);

  return (
    <div className="app">
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

      <main className="app-main">
        {/* Interactive Spectrum - Moved to top */}
        <div className="content-section">
          <SimpleSpectrum
            selectedWavelength={selectedWavelength}
            onWavelengthChange={setSelectedWavelength}
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
              onChange={(e) => setSelectedWavelength(e.target.value * 1e-9)}
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
            onWavelengthChange={setSelectedWavelength}
          />
        </div>

        {/* Educational Panel */}
        <div className="content-section">
          <SimpleEducationalPanel
            selectedWavelength={selectedWavelength}
            onWavelengthChange={setSelectedWavelength}
          />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
