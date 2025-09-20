// Physics calculations for electromagnetic radiation
import { PHYSICS_CONSTANTS } from '../data/spectrumData.js';

const { SPEED_OF_LIGHT, PLANCK_CONSTANT, PLANCK_CONSTANT_EV, ELECTRON_VOLT } = PHYSICS_CONSTANTS;

/**
 * Convert wavelength to frequency
 * Formula: f = c / λ
 * @param {number} wavelength - wavelength in meters
 * @returns {number} frequency in Hz
 */
export function wavelengthToFrequency(wavelength) {
  if (!isFinite(wavelength) || wavelength <= 0) return NaN;
  return SPEED_OF_LIGHT / wavelength;
}

/**
 * Convert frequency to wavelength
 * Formula: λ = c / f
 * @param {number} frequency - frequency in Hz
 * @returns {number} wavelength in meters
 */
export function frequencyToWavelength(frequency) {
  if (!isFinite(frequency) || frequency <= 0) return NaN;
  return SPEED_OF_LIGHT / frequency;
}

/**
 * Convert frequency to photon energy in Joules
 * Formula: E = h × f
 * @param {number} frequency - frequency in Hz
 * @returns {number} energy in Joules
 */
export function frequencyToEnergyJoules(frequency) {
  return PLANCK_CONSTANT * frequency;
}

/**
 * Convert frequency to photon energy in electron volts
 * Formula: E = h × f (using h in eV⋅s)
 * @param {number} frequency - frequency in Hz
 * @returns {number} energy in eV
 */
export function frequencyToEnergyEV(frequency) {
  if (!isFinite(frequency) || frequency <= 0) return NaN;
  return PLANCK_CONSTANT_EV * frequency;
}

/**
 * Convert wavelength to photon energy in electron volts
 * Formula: E = hc / λ
 * @param {number} wavelength - wavelength in meters
 * @returns {number} energy in eV
 */
export function wavelengthToEnergyEV(wavelength) {
  if (!isFinite(wavelength) || wavelength <= 0) return NaN;
  return (PLANCK_CONSTANT_EV * SPEED_OF_LIGHT) / wavelength;
}

/**
 * Convert photon energy in eV to wavelength
 * Formula: λ = hc / E
 * @param {number} energy - energy in eV
 * @returns {number} wavelength in meters
 */
export function energyEVToWavelength(energy) {
  if (!isFinite(energy) || energy <= 0) return NaN;
  return (PLANCK_CONSTANT_EV * SPEED_OF_LIGHT) / energy;
}

/**
 * Convert photon energy in eV to frequency
 * Formula: f = E / h
 * @param {number} energy - energy in eV
 * @returns {number} frequency in Hz
 */
export function energyEVToFrequency(energy) {
  if (!isFinite(energy) || energy <= 0) return NaN;
  return energy / PLANCK_CONSTANT_EV;
}

/**
 * Format wavelength with appropriate units
 * @param {number} wavelength - wavelength in meters
 * @returns {string} formatted wavelength string
 */
export function formatWavelength(wavelength) {
  if (!isFinite(wavelength) || wavelength <= 0) {
    return 'Invalid wavelength';
  }

  if (wavelength >= 1e-3) {
    if (wavelength >= 1) {
      return `${wavelength.toExponential(2)} m`;
    } else {
      return `${(wavelength * 1000).toFixed(2)} mm`;
    }
  } else if (wavelength >= 1e-6) {
    return `${(wavelength * 1e6).toFixed(2)} μm`;
  } else if (wavelength >= 1e-9) {
    return `${(wavelength * 1e9).toFixed(2)} nm`;
  } else if (wavelength >= 1e-12) {
    return `${(wavelength * 1e12).toFixed(2)} pm`;
  } else {
    return `${wavelength.toExponential(2)} m`;
  }
}

/**
 * Format frequency with appropriate units
 * @param {number} frequency - frequency in Hz
 * @returns {string} formatted frequency string
 */
export function formatFrequency(frequency) {
  if (!isFinite(frequency) || frequency <= 0) {
    return 'Invalid frequency';
  }

  if (frequency >= 1e15) {
    return `${(frequency / 1e15).toFixed(2)} PHz`;
  } else if (frequency >= 1e12) {
    return `${(frequency / 1e12).toFixed(2)} THz`;
  } else if (frequency >= 1e9) {
    return `${(frequency / 1e9).toFixed(2)} GHz`;
  } else if (frequency >= 1e6) {
    return `${(frequency / 1e6).toFixed(2)} MHz`;
  } else if (frequency >= 1e3) {
    return `${(frequency / 1e3).toFixed(2)} kHz`;
  } else {
    return `${frequency.toFixed(2)} Hz`;
  }
}

/**
 * Format energy with appropriate units
 * @param {number} energy - energy in eV
 * @returns {string} formatted energy string
 */
export function formatEnergy(energy) {
  if (!isFinite(energy) || energy <= 0) {
    return 'Invalid energy';
  }

  if (energy >= 1e9) {
    return `${(energy / 1e9).toFixed(2)} GeV`;
  } else if (energy >= 1e6) {
    return `${(energy / 1e6).toFixed(2)} MeV`;
  } else if (energy >= 1e3) {
    return `${(energy / 1e3).toFixed(2)} keV`;
  } else if (energy >= 1) {
    return `${energy.toFixed(2)} eV`;
  } else if (energy >= 1e-3) {
    return `${(energy * 1e3).toFixed(2)} meV`;
  } else {
    return `${energy.toExponential(2)} eV`;
  }
}

/**
 * Validate and parse numeric input safely
 * @param {string} input - input string to validate
 * @returns {number} parsed number or NaN if invalid
 */
function safeParseFloat(input) {
  // Handle empty or whitespace-only strings
  if (!input || typeof input !== 'string' || input.trim() === '') {
    return NaN;
  }

  // Check for obviously invalid inputs
  const trimmed = input.trim();
  if (trimmed === 'null' || trimmed === 'undefined' ||
      trimmed.includes('/') || trimmed.includes('Infinity') ||
      trimmed.includes('NaN')) {
    return NaN;
  }

  const value = parseFloat(trimmed);

  // Additional validation
  if (isNaN(value) || !isFinite(value) || value <= 0) {
    return NaN;
  }

  return value;
}

/**
 * Parse wavelength input with units
 * @param {string} input - wavelength string with units
 * @returns {number} wavelength in meters
 */
export function parseWavelength(input) {
  const value = safeParseFloat(input);
  if (isNaN(value)) return NaN;
  
  const unit = input.toLowerCase().replace(/[0-9.\-+e\s]/g, '');
  
  switch (unit) {
    case 'km':
      return value * 1e3;
    case 'm':
      return value;
    case 'cm':
      return value * 1e-2;
    case 'mm':
      return value * 1e-3;
    case 'μm':
    case 'um':
    case 'micron':
    case 'micrometers':
      return value * 1e-6;
    case 'nm':
    case 'nanometers':
      return value * 1e-9;
    case 'pm':
    case 'picometers':
      return value * 1e-12;
    case 'fm':
    case 'femtometers':
      return value * 1e-15;
    case 'å':
    case 'angstrom':
    case 'angstroms':
      return value * 1e-10;
    default:
      return value; // assume meters if no unit
  }
}

/**
 * Parse frequency input with units
 * @param {string} input - frequency string with units
 * @returns {number} frequency in Hz
 */
export function parseFrequency(input) {
  const value = safeParseFloat(input);
  if (isNaN(value)) return NaN;
  
  const unit = input.toLowerCase().replace(/[0-9.\-+e\s]/g, '');
  
  switch (unit) {
    case 'thz':
      return value * 1e12;
    case 'ghz':
      return value * 1e9;
    case 'mhz':
      return value * 1e6;
    case 'khz':
      return value * 1e3;
    case 'hz':
      return value;
    case 'phz':
      return value * 1e15;
    default:
      return value; // assume Hz if no unit
  }
}

/**
 * Parse energy input with units
 * @param {string} input - energy string with units
 * @returns {number} energy in eV
 */
export function parseEnergy(input) {
  const value = safeParseFloat(input);
  if (isNaN(value)) return NaN;
  
  const unit = input.toLowerCase().replace(/[0-9.\-+e\s]/g, '');
  
  switch (unit) {
    case 'tev':
      return value * 1e12;
    case 'gev':
      return value * 1e9;
    case 'mev':
      return value * 1e6;
    case 'kev':
      return value * 1e3;
    case 'ev':
      return value;
    case 'mev_milli': // milli-eV
    case 'mev_m': // alternative notation for milli-eV
      return value * 1e-3;
    case 'j':
    case 'joules':
      return value / (1.602176634e-19); // Convert Joules to eV
    default:
      return value; // assume eV if no unit
  }
}

/**
 * Get logarithmic position for visualization
 * @param {number} value - the value to position
 * @param {number} min - minimum value of range
 * @param {number} max - maximum value of range
 * @returns {number} position between 0 and 1
 */
export function getLogPosition(value, min, max) {
  if (value <= 0 || min <= 0 || max <= 0) return 0;
  const logValue = Math.log10(value);
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  return (logValue - logMin) / (logMax - logMin);
}

/**
 * Get value from logarithmic position
 * @param {number} position - position between 0 and 1
 * @param {number} min - minimum value of range
 * @param {number} max - maximum value of range
 * @returns {number} the value at that position
 */
export function getValueFromLogPosition(position, min, max) {
  if (min <= 0 || max <= 0) return 0;
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  const logValue = logMin + position * (logMax - logMin);
  return Math.pow(10, logValue);
}
