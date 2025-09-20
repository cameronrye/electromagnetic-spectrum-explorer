import React from 'react';
import { getRegionByWavelength, SPECTRUM_REGIONS } from '../data/spectrumData.js';

/**
 * Educational content panel for electromagnetic spectrum regions.
 *
 * Displays detailed information about the currently selected electromagnetic region,
 * including applications, examples, and properties. Also provides quick navigation
 * buttons to jump to different spectrum regions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.selectedWavelength - Currently selected wavelength in meters
 * @param {function} props.onWavelengthChange - Callback function called when wavelength changes
 *
 * @example
 * <SimpleEducationalPanel
 *   selectedWavelength={550e-9}
 *   onWavelengthChange={setWavelength}
 * />
 *
 * @returns {JSX.Element} Educational content interface
 */
function SimpleEducationalPanel({ selectedWavelength, onWavelengthChange }) {
  const currentRegion = getRegionByWavelength(selectedWavelength);

  const handleRegionClick = (region) => {
    // Set wavelength to middle of the region
    const midWavelength = Math.sqrt(region.wavelengthMin * region.wavelengthMax);
    onWavelengthChange(midWavelength);
  };

  return (
    <div>
      <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: 'var(--spacing-lg)' }}>Educational Information</h3>
      
      {/* Current Region Info */}
      {currentRegion ? (
        <div style={{
          padding: '1.5rem',
          backgroundColor: currentRegion.color,
          color: ['#FFEAA7'].includes(currentRegion.color) ? 'black' : 'white',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>{currentRegion.name}</h4>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.5' }}>
            {currentRegion.description}
          </p>
          
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            <strong>Wavelength Range:</strong> {(currentRegion.wavelengthMin * 1e9).toFixed(0)} - {(currentRegion.wavelengthMax * 1e9).toFixed(0)} nm
            <br />
            <strong>Frequency Range:</strong> {(currentRegion.frequencyMin / 1e12).toFixed(2)} - {(currentRegion.frequencyMax / 1e12).toFixed(2)} THz
            <br />
            <strong>Energy Range:</strong> {currentRegion.energyMin.toFixed(4)} - {currentRegion.energyMax.toFixed(4)} eV
          </div>
          
          {currentRegion.applications && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Applications:</strong>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                {currentRegion.applications.slice(0, 3).map((app, index) => (
                  <li key={index} style={{ marginBottom: '0.25rem' }}>{app}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f0f0f0',
          color: '#666',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p>Select a wavelength to see information about that region of the electromagnetic spectrum.</p>
        </div>
      )}

      {/* Region Quick Select */}
      <div>
        <h4>Quick Region Select:</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          {SPECTRUM_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region)}
              style={{
                padding: '0.75rem 0.5rem',
                backgroundColor: region.color,
                color: ['#FFEAA7'].includes(region.color) ? 'black' : 'white',
                border: currentRegion?.id === region.id ? '3px solid #333' : '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'var(--theme-background-secondary)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--theme-primary)',
        border: '1px solid var(--theme-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--theme-primary)', fontSize: '1.1rem', fontWeight: '600' }}>💡 Did You Know?</h4>
        {currentRegion?.examples && (
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--theme-text-secondary)' }}>
            {currentRegion.examples.slice(0, 2).map((example, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
                {example}
              </li>
            ))}
          </ul>
        )}
        {!currentRegion && (
          <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--theme-text-secondary)', lineHeight: '1.5' }}>
            The electromagnetic spectrum spans from radio waves with wavelengths of kilometers
            to gamma rays with wavelengths smaller than atomic nuclei!
          </p>
        )}
      </div>
    </div>
  );
}

export default SimpleEducationalPanel;
