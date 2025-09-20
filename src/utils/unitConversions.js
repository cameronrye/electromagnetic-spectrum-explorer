// Unit conversion utilities for electromagnetic spectrum

/**
 * Wavelength unit conversions
 */
export const WAVELENGTH_UNITS = {
  m: { name: 'meters', symbol: 'm', factor: 1 },
  cm: { name: 'centimeters', symbol: 'cm', factor: 1e-2 },
  mm: { name: 'millimeters', symbol: 'mm', factor: 1e-3 },
  μm: { name: 'micrometers', symbol: 'μm', factor: 1e-6 },
  nm: { name: 'nanometers', symbol: 'nm', factor: 1e-9 },
  pm: { name: 'picometers', symbol: 'pm', factor: 1e-12 },
  fm: { name: 'femtometers', symbol: 'fm', factor: 1e-15 },
  Å: { name: 'angstroms', symbol: 'Å', factor: 1e-10 },
  km: { name: 'kilometers', symbol: 'km', factor: 1e3 }
};

/**
 * Frequency unit conversions
 */
export const FREQUENCY_UNITS = {
  Hz: { name: 'hertz', symbol: 'Hz', factor: 1 },
  kHz: { name: 'kilohertz', symbol: 'kHz', factor: 1e3 },
  MHz: { name: 'megahertz', symbol: 'MHz', factor: 1e6 },
  GHz: { name: 'gigahertz', symbol: 'GHz', factor: 1e9 },
  THz: { name: 'terahertz', symbol: 'THz', factor: 1e12 },
  PHz: { name: 'petahertz', symbol: 'PHz', factor: 1e15 }
};

/**
 * Energy unit conversions
 */
export const ENERGY_UNITS = {
  eV: { name: 'electron volts', symbol: 'eV', factor: 1 },
  meV: { name: 'millielectron volts', symbol: 'meV', factor: 1e-3 },
  keV: { name: 'kiloelectron volts', symbol: 'keV', factor: 1e3 },
  MeV: { name: 'megaelectron volts', symbol: 'MeV', factor: 1e6 },
  GeV: { name: 'gigaelectron volts', symbol: 'GeV', factor: 1e9 },
  TeV: { name: 'teraelectron volts', symbol: 'TeV', factor: 1e12 },
  J: { name: 'joules', symbol: 'J', factor: 6.241509074e18 } // 1 J = 6.241509074e18 eV
};

/**
 * Convert wavelength between units
 * @param {number} value - wavelength value
 * @param {string} fromUnit - source unit
 * @param {string} toUnit - target unit
 * @returns {number} converted value
 */
export function convertWavelength(value, fromUnit, toUnit) {
  if (!WAVELENGTH_UNITS[fromUnit] || !WAVELENGTH_UNITS[toUnit]) {
    throw new Error(`Invalid wavelength unit: ${fromUnit} or ${toUnit}`);
  }
  
  // Convert to meters first, then to target unit
  const meters = value * WAVELENGTH_UNITS[fromUnit].factor;
  return meters / WAVELENGTH_UNITS[toUnit].factor;
}

/**
 * Convert frequency between units
 * @param {number} value - frequency value
 * @param {string} fromUnit - source unit
 * @param {string} toUnit - target unit
 * @returns {number} converted value
 */
export function convertFrequency(value, fromUnit, toUnit) {
  if (!FREQUENCY_UNITS[fromUnit] || !FREQUENCY_UNITS[toUnit]) {
    throw new Error(`Invalid frequency unit: ${fromUnit} or ${toUnit}`);
  }
  
  // Convert to Hz first, then to target unit
  const hertz = value * FREQUENCY_UNITS[fromUnit].factor;
  return hertz / FREQUENCY_UNITS[toUnit].factor;
}

/**
 * Convert energy between units
 * @param {number} value - energy value
 * @param {string} fromUnit - source unit
 * @param {string} toUnit - target unit
 * @returns {number} converted value
 */
export function convertEnergy(value, fromUnit, toUnit) {
  if (!ENERGY_UNITS[fromUnit] || !ENERGY_UNITS[toUnit]) {
    throw new Error(`Invalid energy unit: ${fromUnit} or ${toUnit}`);
  }
  
  // Convert to eV first, then to target unit
  const electronVolts = value * ENERGY_UNITS[fromUnit].factor;
  return electronVolts / ENERGY_UNITS[toUnit].factor;
}

/**
 * Get the best unit for displaying a wavelength value
 * @param {number} wavelengthInMeters - wavelength in meters
 * @returns {object} { value, unit, symbol }
 */
export function getBestWavelengthUnit(wavelengthInMeters) {
  const absValue = Math.abs(wavelengthInMeters);
  
  if (absValue >= 1e3) {
    return {
      value: wavelengthInMeters / 1e3,
      unit: 'km',
      symbol: 'km'
    };
  } else if (absValue >= 1) {
    return {
      value: wavelengthInMeters,
      unit: 'm',
      symbol: 'm'
    };
  } else if (absValue >= 1e-2) {
    return {
      value: wavelengthInMeters / 1e-2,
      unit: 'cm',
      symbol: 'cm'
    };
  } else if (absValue >= 1e-3) {
    return {
      value: wavelengthInMeters / 1e-3,
      unit: 'mm',
      symbol: 'mm'
    };
  } else if (absValue >= 1e-6) {
    return {
      value: wavelengthInMeters / 1e-6,
      unit: 'μm',
      symbol: 'μm'
    };
  } else if (absValue >= 1e-9) {
    return {
      value: wavelengthInMeters / 1e-9,
      unit: 'nm',
      symbol: 'nm'
    };
  } else if (absValue >= 1e-12) {
    return {
      value: wavelengthInMeters / 1e-12,
      unit: 'pm',
      symbol: 'pm'
    };
  } else if (absValue >= 1e-15) {
    return {
      value: wavelengthInMeters / 1e-15,
      unit: 'fm',
      symbol: 'fm'
    };
  } else {
    return {
      value: wavelengthInMeters,
      unit: 'm',
      symbol: 'm'
    };
  }
}

/**
 * Get the best unit for displaying a frequency value
 * @param {number} frequencyInHz - frequency in Hz
 * @returns {object} { value, unit, symbol }
 */
export function getBestFrequencyUnit(frequencyInHz) {
  const absValue = Math.abs(frequencyInHz);
  
  if (absValue >= 1e15) {
    return {
      value: frequencyInHz / 1e15,
      unit: 'PHz',
      symbol: 'PHz'
    };
  } else if (absValue >= 1e12) {
    return {
      value: frequencyInHz / 1e12,
      unit: 'THz',
      symbol: 'THz'
    };
  } else if (absValue >= 1e9) {
    return {
      value: frequencyInHz / 1e9,
      unit: 'GHz',
      symbol: 'GHz'
    };
  } else if (absValue >= 1e6) {
    return {
      value: frequencyInHz / 1e6,
      unit: 'MHz',
      symbol: 'MHz'
    };
  } else if (absValue >= 1e3) {
    return {
      value: frequencyInHz / 1e3,
      unit: 'kHz',
      symbol: 'kHz'
    };
  } else {
    return {
      value: frequencyInHz,
      unit: 'Hz',
      symbol: 'Hz'
    };
  }
}

/**
 * Get the best unit for displaying an energy value
 * @param {number} energyInEV - energy in eV
 * @returns {object} { value, unit, symbol }
 */
export function getBestEnergyUnit(energyInEV) {
  const absValue = Math.abs(energyInEV);
  
  if (absValue >= 1e12) {
    return {
      value: energyInEV / 1e12,
      unit: 'TeV',
      symbol: 'TeV'
    };
  } else if (absValue >= 1e9) {
    return {
      value: energyInEV / 1e9,
      unit: 'GeV',
      symbol: 'GeV'
    };
  } else if (absValue >= 1e6) {
    return {
      value: energyInEV / 1e6,
      unit: 'MeV',
      symbol: 'MeV'
    };
  } else if (absValue >= 1e3) {
    return {
      value: energyInEV / 1e3,
      unit: 'keV',
      symbol: 'keV'
    };
  } else if (absValue >= 1) {
    return {
      value: energyInEV,
      unit: 'eV',
      symbol: 'eV'
    };
  } else if (absValue >= 1e-3) {
    return {
      value: energyInEV / 1e-3,
      unit: 'meV',
      symbol: 'meV'
    };
  } else {
    return {
      value: energyInEV,
      unit: 'eV',
      symbol: 'eV'
    };
  }
}

/**
 * Format a number with appropriate precision
 * @param {number} value - the number to format
 * @param {number} precision - number of significant digits
 * @returns {string} formatted number
 */
export function formatNumber(value, precision = 3) {
  if (value === 0) return '0';
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1000 || absValue < 0.001) {
    return value.toExponential(precision - 1);
  } else if (absValue >= 100) {
    return value.toFixed(0);
  } else if (absValue >= 10) {
    return value.toFixed(1);
  } else if (absValue >= 1) {
    return value.toFixed(2);
  } else {
    return value.toFixed(precision);
  }
}
