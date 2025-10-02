/**
 * Error handling utilities for the Electromagnetic Spectrum Explorer
 */

/**
 * Log error to console in development mode
 * @param {string} context - Context where the error occurred
 * @param {Error} error - The error object
 */
export function logError(context, error) {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
}

/**
 * Log warning to console in development mode
 * @param {string} context - Context where the warning occurred
 * @param {string} message - Warning message
 */
export function logWarning(context, message) {
  if (import.meta.env.DEV) {
    console.warn(`[${context}]`, message);
  }
}

/**
 * Safe wrapper for functions that might throw
 * @param {Function} fn - Function to execute
 * @param {*} fallback - Fallback value if function throws
 * @param {string} context - Context for error logging
 * @returns {*} Result of function or fallback value
 */
export function safeExecute(fn, fallback, context = 'Unknown') {
  try {
    return fn();
  } catch (error) {
    logError(context, error);
    return fallback;
  }
}

/**
 * Validate wavelength value
 * @param {number} wavelength - Wavelength in meters
 * @returns {boolean} True if valid
 */
export function isValidWavelength(wavelength) {
  return (
    typeof wavelength === 'number' &&
    isFinite(wavelength) &&
    wavelength > 0 &&
    wavelength <= 1e10 // Reasonable upper bound
  );
}

/**
 * Validate frequency value
 * @param {number} frequency - Frequency in Hz
 * @returns {boolean} True if valid
 */
export function isValidFrequency(frequency) {
  return (
    typeof frequency === 'number' &&
    isFinite(frequency) &&
    frequency > 0 &&
    frequency <= 1e30 // Reasonable upper bound
  );
}

/**
 * Validate energy value
 * @param {number} energy - Energy in eV
 * @returns {boolean} True if valid
 */
export function isValidEnergy(energy) {
  return (
    typeof energy === 'number' &&
    isFinite(energy) &&
    energy > 0 &&
    energy <= 1e15 // Reasonable upper bound
  );
}

