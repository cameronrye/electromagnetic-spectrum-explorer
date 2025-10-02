import { describe, it, expect } from 'vitest';
import {
  wavelengthToFrequency,
  wavelengthToEnergyEV,
  frequencyToWavelength,
  energyEVToWavelength,
  formatWavelength,
  formatFrequency,
  formatEnergy
} from '../physicsCalculations';
import { PHYSICS_CONSTANTS } from '../../data/spectrumData';

describe('Physics Calculations', () => {
  describe('wavelengthToFrequency', () => {
    it('calculates frequency correctly for visible light', () => {
      const wavelength = 550e-9; // 550 nm (green light)
      const frequency = wavelengthToFrequency(wavelength);
      const expected = PHYSICS_CONSTANTS.SPEED_OF_LIGHT / wavelength;
      
      expect(frequency).toBeCloseTo(expected, 5);
    });

    it('returns NaN for invalid inputs', () => {
      expect(wavelengthToFrequency(0)).toBeNaN();
      expect(wavelengthToFrequency(-1)).toBeNaN();
      expect(wavelengthToFrequency(Infinity)).toBeNaN();
    });
  });

  describe('wavelengthToEnergyEV', () => {
    it('calculates energy correctly', () => {
      const wavelength = 550e-9;
      const energy = wavelengthToEnergyEV(wavelength);
      
      expect(energy).toBeGreaterThan(0);
      expect(energy).toBeCloseTo(2.25, 1); // Approximately 2.25 eV for green light
    });

    it('returns NaN for invalid inputs', () => {
      expect(wavelengthToEnergyEV(0)).toBeNaN();
      expect(wavelengthToEnergyEV(-1)).toBeNaN();
    });
  });

  describe('frequencyToWavelength', () => {
    it('converts frequency to wavelength correctly', () => {
      const frequency = 5e14; // 500 THz
      const wavelength = frequencyToWavelength(frequency);
      const expected = PHYSICS_CONSTANTS.SPEED_OF_LIGHT / frequency;
      
      expect(wavelength).toBeCloseTo(expected, 15);
    });

    it('is inverse of wavelengthToFrequency', () => {
      const originalWavelength = 550e-9;
      const frequency = wavelengthToFrequency(originalWavelength);
      const calculatedWavelength = frequencyToWavelength(frequency);
      
      expect(calculatedWavelength).toBeCloseTo(originalWavelength, 15);
    });
  });

  describe('energyEVToWavelength', () => {
    it('converts energy to wavelength correctly', () => {
      const energy = 2.25; // eV
      const wavelength = energyEVToWavelength(energy);
      
      expect(wavelength).toBeGreaterThan(0);
      expect(wavelength).toBeCloseTo(550e-9, -9); // Approximately 550 nm
    });

    it('is inverse of wavelengthToEnergyEV', () => {
      const originalWavelength = 550e-9;
      const energy = wavelengthToEnergyEV(originalWavelength);
      const calculatedWavelength = energyEVToWavelength(energy);
      
      expect(calculatedWavelength).toBeCloseTo(originalWavelength, 15);
    });
  });

  describe('formatWavelength', () => {
    it('formats wavelength with appropriate units', () => {
      expect(formatWavelength(550e-9)).toContain('nm');
      expect(formatWavelength(1e-6)).toContain('μm');
      expect(formatWavelength(1e-3)).toContain('mm');
    });

    it('handles edge cases', () => {
      expect(formatWavelength(1e-15)).toBeTruthy();
      expect(formatWavelength(1e3)).toBeTruthy();
    });
  });

  describe('formatFrequency', () => {
    it('formats frequency with appropriate units', () => {
      expect(formatFrequency(1e12)).toContain('THz');
      expect(formatFrequency(1e9)).toContain('GHz');
      expect(formatFrequency(1e6)).toContain('MHz');
    });
  });

  describe('formatEnergy', () => {
    it('formats energy with appropriate units', () => {
      expect(formatEnergy(1)).toContain('eV');
      expect(formatEnergy(1000)).toContain('keV');
      expect(formatEnergy(1e6)).toContain('MeV');
    });
  });

  describe('Physics Constants', () => {
    it('uses correct speed of light', () => {
      expect(PHYSICS_CONSTANTS.SPEED_OF_LIGHT).toBe(299792458);
    });

    it('uses correct Planck constant', () => {
      expect(PHYSICS_CONSTANTS.PLANCK_CONSTANT).toBeCloseTo(6.62607015e-34, 40);
    });

    it('uses correct electron volt', () => {
      expect(PHYSICS_CONSTANTS.ELECTRON_VOLT).toBeCloseTo(1.602176634e-19, 25);
    });
  });

  describe('Edge Cases', () => {
    it('handles very small wavelengths (gamma rays)', () => {
      const wavelength = 1e-15;
      const frequency = wavelengthToFrequency(wavelength);
      const energy = wavelengthToEnergyEV(wavelength);
      
      expect(frequency).toBeGreaterThan(0);
      expect(energy).toBeGreaterThan(0);
      expect(isFinite(frequency)).toBe(true);
      expect(isFinite(energy)).toBe(true);
    });

    it('handles very large wavelengths (radio waves)', () => {
      const wavelength = 1e6;
      const frequency = wavelengthToFrequency(wavelength);
      const energy = wavelengthToEnergyEV(wavelength);
      
      expect(frequency).toBeGreaterThan(0);
      expect(energy).toBeGreaterThan(0);
      expect(isFinite(frequency)).toBe(true);
      expect(isFinite(energy)).toBe(true);
    });
  });
});

