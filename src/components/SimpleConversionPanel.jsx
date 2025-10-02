import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  wavelengthToFrequency,
  wavelengthToEnergyEV,
  frequencyToWavelength,
  energyEVToWavelength
} from '../utils/physicsCalculations.js';
import { INPUT_RANGES, CONVERSION_FACTORS, FORMATTING_PRECISION } from '../constants/ui.js';

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
      setWavelengthNm(selectedWavelength * CONVERSION_FACTORS.METERS_TO_NANOMETERS);
      setFrequency(wavelengthToFrequency(selectedWavelength));
      setEnergy(wavelengthToEnergyEV(selectedWavelength));
    }
  }, [selectedWavelength]);

  const handleWavelengthChange = (e) => {
    const newWavelengthNm = parseFloat(e.target.value);
    if (!isNaN(newWavelengthNm) && newWavelengthNm > 0 && newWavelengthNm <= 1e12) {
      setWavelengthNm(newWavelengthNm);
      const newWavelengthM = newWavelengthNm * CONVERSION_FACTORS.NANOMETERS_TO_METERS;
      if (onWavelengthChange) {
        onWavelengthChange(newWavelengthM);
      }
    }
  };

  const handleFrequencyChange = (e) => {
    const newFrequencyTHz = parseFloat(e.target.value);
    if (!isNaN(newFrequencyTHz) && newFrequencyTHz > 0 && newFrequencyTHz <= 1e15) {
      const newFrequencyHz = newFrequencyTHz * CONVERSION_FACTORS.TERAHERTZ_TO_HERTZ;
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
          value={wavelengthNm.toFixed(FORMATTING_PRECISION.WAVELENGTH_NM)}
          onChange={handleWavelengthChange}
          min={INPUT_RANGES.WAVELENGTH_NM.MIN}
          max={INPUT_RANGES.WAVELENGTH_NM.MAX}
          step={INPUT_RANGES.WAVELENGTH_NM.STEP}
          aria-label="Wavelength in nanometers"
          aria-describedby="wavelength-description"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <span id="wavelength-description" className="sr-only">
          Enter wavelength value in nanometers. Valid range: 1 to 1,000,000 nm
        </span>
      </div>

      <div>
        <label htmlFor="frequency-input">
          <strong>Frequency (THz):</strong>
        </label>
        <input
          id="frequency-input"
          type="number"
          value={(frequency * CONVERSION_FACTORS.HERTZ_TO_TERAHERTZ).toFixed(FORMATTING_PRECISION.FREQUENCY_THz)}
          onChange={handleFrequencyChange}
          min={INPUT_RANGES.FREQUENCY_THz.MIN}
          max={INPUT_RANGES.FREQUENCY_THz.MAX}
          step={INPUT_RANGES.FREQUENCY_THz.STEP}
          aria-label="Frequency in terahertz"
          aria-describedby="frequency-description"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <span id="frequency-description" className="sr-only">
          Enter frequency value in terahertz. Valid range: 0.001 to 1,000,000 THz
        </span>
      </div>

      <div>
        <label htmlFor="energy-input">
          <strong>Energy (eV):</strong>
        </label>
        <input
          id="energy-input"
          type="number"
          value={energy.toFixed(FORMATTING_PRECISION.ENERGY_EV)}
          onChange={handleEnergyChange}
          min={INPUT_RANGES.ENERGY_EV.MIN}
          max={INPUT_RANGES.ENERGY_EV.MAX}
          step={INPUT_RANGES.ENERGY_EV.STEP}
          aria-label="Energy in electron volts"
          aria-describedby="energy-description"
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <span id="energy-description" className="sr-only">
          Enter energy value in electron volts. Valid range: 0.0001 to 1,000,000 eV
        </span>
      </div>
    </div>
  );
}

SimpleConversionPanel.propTypes = {
  selectedWavelength: PropTypes.number.isRequired,
  onWavelengthChange: PropTypes.func.isRequired
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(SimpleConversionPanel);
