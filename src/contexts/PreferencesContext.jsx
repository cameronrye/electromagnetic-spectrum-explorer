import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as storage from '../utils/safeLocalStorage.js';

/**
 * Preferences context for managing user preferences
 * Supports wavelength units, frequency units, and energy units with persistent storage.
 */
const PreferencesContext = createContext();

/**
 * Hook to access preferences context.
 *
 * @returns {Object} Preferences context value
 * @returns {Object} preferences - Current preferences object
 * @returns {Function} updatePreferences - Function to update preferences
 * @returns {Function} resetPreferences - Function to reset to defaults
 *
 * @throws {Error} When used outside of PreferencesProvider
 *
 * @example
 * const { preferences, updatePreferences } = usePreferences();
 */
// eslint-disable-next-line react-refresh/only-export-components
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

// Default preferences
const DEFAULT_PREFERENCES = {
  wavelengthUnit: 'nm', // 'nm', 'μm', 'mm', 'm'
  frequencyUnit: 'Hz', // 'Hz', 'kHz', 'MHz', 'GHz', 'THz'
  energyUnit: 'eV', // 'eV', 'keV', 'MeV', 'J'
  showScientificNotation: true,
  decimalPlaces: 2
};

/**
 * Preferences provider component that manages user preferences state.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 *
 * @example
 * <PreferencesProvider>
 *   <App />
 * </PreferencesProvider>
 */
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    // Load preferences from localStorage
    const savedPreferences = storage.getJSON('user-preferences', null);
    return savedPreferences ? { ...DEFAULT_PREFERENCES, ...savedPreferences } : DEFAULT_PREFERENCES;
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    storage.setJSON('user-preferences', preferences);
  }, [preferences]);

  /**
   * Update one or more preferences
   * @param {Object} updates - Object with preference keys to update
   */
  const updatePreferences = (updates) => {
    setPreferences(prev => ({
      ...prev,
      ...updates
    }));
  };

  /**
   * Reset all preferences to defaults
   */
  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  /**
   * Format wavelength according to user preferences
   * @param {number} wavelengthInMeters - Wavelength in meters
   * @returns {string} Formatted wavelength with unit
   */
  const formatWavelength = (wavelengthInMeters) => {
    const { wavelengthUnit, showScientificNotation, decimalPlaces } = preferences;
    
    let value;
    switch (wavelengthUnit) {
      case 'μm':
        value = wavelengthInMeters * 1e6;
        break;
      case 'mm':
        value = wavelengthInMeters * 1e3;
        break;
      case 'm':
        value = wavelengthInMeters;
        break;
      default: // 'nm'
        value = wavelengthInMeters * 1e9;
    }

    const formatted = showScientificNotation 
      ? value.toExponential(decimalPlaces)
      : value.toFixed(decimalPlaces);

    return `${formatted} ${wavelengthUnit}`;
  };

  /**
   * Format frequency according to user preferences
   * @param {number} frequencyInHz - Frequency in Hz
   * @returns {string} Formatted frequency with unit
   */
  const formatFrequency = (frequencyInHz) => {
    const { frequencyUnit, showScientificNotation, decimalPlaces } = preferences;
    
    let value;
    switch (frequencyUnit) {
      case 'kHz':
        value = frequencyInHz / 1e3;
        break;
      case 'MHz':
        value = frequencyInHz / 1e6;
        break;
      case 'GHz':
        value = frequencyInHz / 1e9;
        break;
      case 'THz':
        value = frequencyInHz / 1e12;
        break;
      default: // 'Hz'
        value = frequencyInHz;
    }

    const formatted = showScientificNotation 
      ? value.toExponential(decimalPlaces)
      : value.toFixed(decimalPlaces);

    return `${formatted} ${frequencyUnit}`;
  };

  const value = {
    preferences,
    updatePreferences,
    resetPreferences,
    formatWavelength,
    formatFrequency,
    DEFAULT_PREFERENCES
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

PreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

