import React, { useState, useEffect } from 'react';
import {
  wavelengthToFrequency,
  wavelengthToEnergyEV,
  frequencyToWavelength,
  energyEVToWavelength
} from '../utils/physicsCalculations.js';

/**
 * Unit conversion panel for electromagnetic radiation properties.
 *
 * Provides real-time conversion between wavelength (nm), frequency (THz), and energy (eV).
 * All fields are synchronized and update automatically when any value changes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.selectedWavelength - Currently selected wavelength in meters
 * @param {function} props.onWavelengthChange - Callback function called when wavelength changes
 *
 * @example
 * <SimpleConversionPanel
 *   selectedWavelength={550e-9}
 *   onWavelengthChange={setWavelength}
 * />
 *
 * @returns {JSX.Element} Unit conversion interface
 */
function SimpleConversionPanel({ selectedWavelength, onWavelengthChange }) {
  const [wavelengthNm, setWavelengthNm] = useState(550);
  const [frequency, setFrequency] = useState(0);
  const [energy, setEnergy] = useState(0);

  // Update all values when selectedWavelength changes
  useEffect(() => {
    if (selectedWavelength) {
      setWavelengthNm(selectedWavelength * 1e9);
      setFrequency(wavelengthToFrequency(selectedWavelength));
      setEnergy(wavelengthToEnergyEV(selectedWavelength));
    }
  }, [selectedWavelength]);

  const handleWavelengthChange = (e) => {
    const newWavelengthNm = parseFloat(e.target.value);
    if (!isNaN(newWavelengthNm) && newWavelengthNm > 0 && newWavelengthNm <= 1e12) {
      setWavelengthNm(newWavelengthNm);
      const newWavelengthM = newWavelengthNm * 1e-9;
      if (onWavelengthChange) {
        onWavelengthChange(newWavelengthM);
      }
    }
  };

  const handleFrequencyChange = (e) => {
    const newFrequencyTHz = parseFloat(e.target.value);
    if (!isNaN(newFrequencyTHz) && newFrequencyTHz > 0 && newFrequencyTHz <= 1e15) {
      const newFrequencyHz = newFrequencyTHz * 1e12;
      setFrequency(newFrequencyHz);
      const newWavelengthM = frequencyToWavelength(newFrequencyHz);
      if (onWavelengthChange && isFinite(newWavelengthM) && newWavelengthM > 0) {
        onWavelengthChange(newWavelengthM);
      }
    }
  };

  const handleEnergyChange = (e) => {
    const newEnergyEV = parseFloat(e.target.value);
    if (!isNaN(newEnergyEV) && newEnergyEV > 0 && newEnergyEV <= 1e12) {
      setEnergy(newEnergyEV);
      const newWavelengthM = energyEVToWavelength(newEnergyEV);
      if (onWavelengthChange && isFinite(newWavelengthM) && newWavelengthM > 0) {
        onWavelengthChange(newWavelengthM);
      }
    }
  };

  return (
    <div style={{ 
      display: 'grid', 
      gap: '1rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }}>
      <div>
        <label htmlFor="wavelength-input">
          <strong>Wavelength (nm):</strong>
        </label>
        <input
          id="wavelength-input"
          type="number"
          value={wavelengthNm.toFixed(1)}
          onChange={handleWavelengthChange}
          min="1"
          max="1000000"
          step="0.1"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div>
        <label htmlFor="frequency-input">
          <strong>Frequency (THz):</strong>
        </label>
        <input
          id="frequency-input"
          type="number"
          value={(frequency / 1e12).toFixed(3)}
          onChange={handleFrequencyChange}
          min="0.001"
          max="1000000"
          step="0.001"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div>
        <label htmlFor="energy-input">
          <strong>Energy (eV):</strong>
        </label>
        <input
          id="energy-input"
          type="number"
          value={energy.toFixed(4)}
          onChange={handleEnergyChange}
          min="0.0001"
          max="1000000"
          step="0.0001"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
    </div>
  );
}

export default SimpleConversionPanel;
