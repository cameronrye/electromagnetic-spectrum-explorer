import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  logError,
  logWarning,
  safeExecute,
  isValidWavelength,
  isValidFrequency,
  isValidEnergy
} from '../errorHandling.js';

describe('errorHandling utilities', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('logError', () => {
    it('logs error with context in development mode', () => {
      const error = new Error('Test error');
      logError('TestContext', error);

      // In development mode, should log with new logger format
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'Error in TestContext', error, {});
    });

    it('accepts any error object', () => {
      const error = { message: 'Custom error' };
      logError('CustomContext', error);

      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'Error in CustomContext', error, {});
    });
  });

  describe('logWarning', () => {
    it('logs warning with context in development mode', () => {
      logWarning('TestContext', 'Test warning message');

      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', 'Warning in TestContext: Test warning message', {});
    });

    it('accepts any warning message', () => {
      logWarning('AnotherContext', 'Another warning');

      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', 'Warning in AnotherContext: Another warning', {});
    });
  });

  describe('safeExecute', () => {
    it('returns function result when no error occurs', () => {
      const fn = () => 42;
      const result = safeExecute(fn, 0, 'TestContext');
      
      expect(result).toBe(42);
    });

    it('returns fallback value when function throws', () => {
      const fn = () => { throw new Error('Test error'); };
      const result = safeExecute(fn, 'fallback', 'TestContext');
      
      expect(result).toBe('fallback');
    });

    it('logs error when function throws', () => {
      const error = new Error('Test error');
      const fn = () => { throw error; };

      safeExecute(fn, null, 'TestContext');

      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'Error in TestContext', error, {});
    });

    it('uses "Unknown" as default context', () => {
      const error = new Error('Test error');
      const fn = () => { throw error; };

      safeExecute(fn, null);

      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'Error in Unknown', error, {});
    });

    it('works with complex return values', () => {
      const fn = () => ({ value: 123, nested: { data: 'test' } });
      const result = safeExecute(fn, {}, 'TestContext');
      
      expect(result).toEqual({ value: 123, nested: { data: 'test' } });
    });
  });

  describe('isValidWavelength', () => {
    it('returns true for valid wavelength values', () => {
      expect(isValidWavelength(550e-9)).toBe(true); // Visible light
      expect(isValidWavelength(1e-12)).toBe(true); // X-ray
      expect(isValidWavelength(1)).toBe(true); // Radio wave
    });

    it('returns false for negative wavelengths', () => {
      expect(isValidWavelength(-1)).toBe(false);
      expect(isValidWavelength(-550e-9)).toBe(false);
    });

    it('returns false for zero wavelength', () => {
      expect(isValidWavelength(0)).toBe(false);
    });

    it('returns false for non-number values', () => {
      expect(isValidWavelength('550')).toBe(false);
      expect(isValidWavelength(null)).toBe(false);
      expect(isValidWavelength(undefined)).toBe(false);
      expect(isValidWavelength({})).toBe(false);
    });

    it('returns false for infinite values', () => {
      expect(isValidWavelength(Infinity)).toBe(false);
      expect(isValidWavelength(-Infinity)).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(isValidWavelength(NaN)).toBe(false);
    });

    it('returns false for wavelengths exceeding upper bound', () => {
      expect(isValidWavelength(1e11)).toBe(false);
    });
  });

  describe('isValidFrequency', () => {
    it('returns true for valid frequency values', () => {
      expect(isValidFrequency(5e14)).toBe(true); // Visible light
      expect(isValidFrequency(1e9)).toBe(true); // Microwave
      expect(isValidFrequency(1e20)).toBe(true); // Gamma ray
    });

    it('returns false for negative frequencies', () => {
      expect(isValidFrequency(-1e9)).toBe(false);
    });

    it('returns false for zero frequency', () => {
      expect(isValidFrequency(0)).toBe(false);
    });

    it('returns false for non-number values', () => {
      expect(isValidFrequency('1e9')).toBe(false);
      expect(isValidFrequency(null)).toBe(false);
    });

    it('returns false for infinite values', () => {
      expect(isValidFrequency(Infinity)).toBe(false);
    });

    it('returns false for frequencies exceeding upper bound', () => {
      expect(isValidFrequency(1e31)).toBe(false);
    });
  });

  describe('isValidEnergy', () => {
    it('returns true for valid energy values', () => {
      expect(isValidEnergy(2.25)).toBe(true); // Visible light
      expect(isValidEnergy(0.001)).toBe(true); // Low energy
      expect(isValidEnergy(1e6)).toBe(true); // High energy
    });

    it('returns false for negative energies', () => {
      expect(isValidEnergy(-1)).toBe(false);
    });

    it('returns false for zero energy', () => {
      expect(isValidEnergy(0)).toBe(false);
    });

    it('returns false for non-number values', () => {
      expect(isValidEnergy('2.25')).toBe(false);
      expect(isValidEnergy(null)).toBe(false);
    });

    it('returns false for infinite values', () => {
      expect(isValidEnergy(Infinity)).toBe(false);
    });

    it('returns false for energies exceeding upper bound', () => {
      expect(isValidEnergy(1e16)).toBe(false);
    });
  });
});

