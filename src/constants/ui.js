/**
 * UI Constants
 * Centralized location for magic numbers and configuration values
 */

// Wavelength bounds (in meters)
export const WAVELENGTH_BOUNDS = {
  MIN: 1e-15, // Minimum wavelength (femtometers)
  MAX: 1e4,   // Maximum wavelength (10 km)
  DEFAULT: 550e-9, // Default wavelength (550 nm - green visible light)
};

// Conversion factors
export const CONVERSION_FACTORS = {
  METERS_TO_NANOMETERS: 1e9,
  NANOMETERS_TO_METERS: 1e-9,
  HERTZ_TO_TERAHERTZ: 1e-12,
  TERAHERTZ_TO_HERTZ: 1e12,
};

// Input validation ranges
export const INPUT_RANGES = {
  WAVELENGTH_NM: {
    MIN: 1,
    MAX: 1000000,
    STEP: 0.1,
  },
  FREQUENCY_THz: {
    MIN: 0.001,
    MAX: 1000000,
    STEP: 0.001,
  },
  ENERGY_EV: {
    MIN: 0.0001,
    MAX: 1000000,
    STEP: 0.0001,
  },
};

// Keyboard navigation
export const KEYBOARD_NAV = {
  NORMAL_STEP: 1,
  SHIFT_STEP: 10,
  STEP_MULTIPLIER: 0.05, // 5% change per step
};

// Spectrum visualization
export const SPECTRUM_VISUAL = {
  BAR_HEIGHT: 60, // pixels
  BORDER_WIDTH: 2, // pixels
  BORDER_RADIUS: 8, // pixels
  INDICATOR_WIDTH: 3, // pixels
  INDICATOR_DOT_SIZE: 12, // pixels
  INDICATOR_ARROW_SIZE: 8, // pixels
  INDICATOR_ARROW_HEIGHT: 12, // pixels
};

// Region flex weights for spectrum bar
export const REGION_FLEX_WEIGHTS = {
  GAMMA: 25,
  XRAY: 15,
  ULTRAVIOLET: 10,
  VISIBLE: 5,
  INFRARED: 15,
  MICROWAVE: 10,
  RADIO: 20,
};

// Precision for number formatting
export const FORMATTING_PRECISION = {
  WAVELENGTH_NM: 1,
  FREQUENCY_THz: 3,
  ENERGY_EV: 4,
  POSITION_PERCENT: 1,
};

// Animation and transition durations (milliseconds)
export const ANIMATION = {
  TRANSITION_DURATION: 200,
  HOVER_DURATION: 150,
};

// Z-index layers
export const Z_INDEX = {
  INDICATOR_DOT: 10,
  INDICATOR_ARROW: 10,
  INDICATOR_LINE: 5,
  SKIP_LINK: 100,
};

// Opacity values
export const OPACITY = {
  INDICATOR_LINE: 0.9,
  REGION_INFO_TEXT: 0.9,
  DISABLED: 0.6,
};

// Shadow intensities
export const SHADOW = {
  INDICATOR_GLOW: 'rgba(59, 130, 246, 0.6)',
  INDICATOR_DOT: 'rgba(0,0,0,0.3)',
  INDICATOR_ARROW: 'rgba(0,0,0,0.2)',
};

// Gradient opacity values for region info
export const GRADIENT_OPACITY = {
  START: 0.867,
  END: 0.667,
};

