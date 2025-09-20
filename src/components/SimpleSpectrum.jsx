import React from 'react';
import { getRegionByWavelength } from '../data/spectrumData.js';
import './SimpleSpectrum.css';

/**
 * Interactive electromagnetic spectrum visualization component.
 *
 * Displays a visual representation of the electromagnetic spectrum with clickable regions
 * and a real-time indicator showing the currently selected wavelength position.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.selectedWavelength - Currently selected wavelength in meters
 * @param {function} props.onWavelengthChange - Callback function called when wavelength changes
 *
 * @example
 * <SimpleSpectrum
 *   selectedWavelength={550e-9}  // 550 nm (green light)
 *   onWavelengthChange={setWavelength}
 * />
 *
 * @returns {JSX.Element} Interactive spectrum visualization
 */
function SimpleSpectrum({ selectedWavelength, onWavelengthChange }) {
  // These variables and functions are kept for potential future use
  // in enhanced spectrum visualization features

  // Handle click on spectrum bar
  const handleSpectrumClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = x / width; // 0 to 1 from left to right

    // Define the same regions as in calculateIndicatorPosition
    const regions = [
      { name: 'Radio', flex: 20, minWl: 1e-1, maxWl: 1e4 },
      { name: 'Microwave', flex: 10, minWl: 1e-3, maxWl: 1e-1 },
      { name: 'Infrared', flex: 15, minWl: 700e-9, maxWl: 1e-3 },
      { name: 'Visible', flex: 5, minWl: 380e-9, maxWl: 700e-9 },
      { name: 'UV', flex: 10, minWl: 10e-9, maxWl: 380e-9 },
      { name: 'X-ray', flex: 15, minWl: 10e-12, maxWl: 10e-9 },
      { name: 'Gamma', flex: 25, minWl: 1e-15, maxWl: 10e-12 }
    ];

    const totalFlex = regions.reduce((sum, region) => sum + region.flex, 0);
    let cumulativeRatio = 0;

    // Find which region was clicked
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      const regionWidth = region.flex / totalFlex;

      if (clickRatio >= cumulativeRatio && clickRatio <= cumulativeRatio + regionWidth) {
        // Calculate position within the region
        const positionInRegion = (clickRatio - cumulativeRatio) / regionWidth;

        // Convert to wavelength using logarithmic scale
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);

        // For regions where wavelength decreases left to right, invert the position
        const adjustedPosition = (i >= 2) ? (1 - positionInRegion) : positionInRegion;

        const wavelength = Math.pow(10, minLog + adjustedPosition * (maxLog - minLog));

        onWavelengthChange(wavelength);
        return;
      }

      cumulativeRatio += regionWidth;
    }
  };

  // Get current region
  const region = getRegionByWavelength(selectedWavelength);

  // Calculate position of selected wavelength on the spectrum bar
  // This matches the actual visual layout of the spectrum regions
  const calculateIndicatorPosition = () => {
    // Define the spectrum regions with their flex values and wavelength ranges
    // Ordered from shortest to longest wavelength (left to right)
    const regions = [
      { name: 'Gamma', flex: 25, minWl: 1e-15, maxWl: 10e-12 },   // 1fm to 10pm
      { name: 'X-ray', flex: 15, minWl: 10e-12, maxWl: 10e-9 },  // 10pm to 10nm
      { name: 'UV', flex: 10, minWl: 10e-9, maxWl: 380e-9 },     // 10nm to 380nm
      { name: 'Visible', flex: 5, minWl: 380e-9, maxWl: 700e-9 }, // 380nm to 700nm
      { name: 'Infrared', flex: 15, minWl: 700e-9, maxWl: 1e-3 }, // 700nm to 1mm
      { name: 'Microwave', flex: 10, minWl: 1e-3, maxWl: 1e-1 }, // 1mm to 0.1m
      { name: 'Radio', flex: 20, minWl: 1e-1, maxWl: 1e4 }      // 0.1m to 10km
    ];

    const totalFlex = regions.reduce((sum, region) => sum + region.flex, 0);
    let cumulativePosition = 0;

    // Find which region the wavelength falls into
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];

      if (selectedWavelength >= region.minWl && selectedWavelength <= region.maxWl) {
        // Calculate position within this region using logarithmic scale
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);
        const selectedLog = Math.log10(selectedWavelength);
        const ratioInRegion = (selectedLog - minLog) / (maxLog - minLog);

        // Since regions are now ordered from shortest to longest wavelength,
        // no inversion is needed - wavelength increases left to right within each region
        const adjustedRatio = ratioInRegion;

        const regionWidthPercent = (region.flex / totalFlex) * 100;
        const positionInRegion = adjustedRatio * regionWidthPercent;

        return Math.max(0, Math.min(100, cumulativePosition + positionInRegion));
      }

      cumulativePosition += (region.flex / totalFlex) * 100;
    }

    // If wavelength is outside all regions, clamp to edges
    if (selectedWavelength < 1e-15) return 0;   // Far left (gamma)
    if (selectedWavelength > 1e4) return 100; // Far right (radio)

    return 50; // Default to middle if calculation fails
  };

  const indicatorPosition = calculateIndicatorPosition();

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ color: 'var(--theme-text-primary)', marginBottom: 'var(--spacing-md)' }}>
        Electromagnetic Spectrum
      </h3>

      {/* Spectrum regions bar with indicator */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div
          className="spectrum-bar"
          style={{
            display: 'flex',
            height: '60px',
            border: '2px solid var(--theme-border)',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease'
          }}
          onClick={handleSpectrumClick}
        >

        {/* Gamma rays */}
        <div
          className="spectrum-region"
          style={{
            flex: '25',
            backgroundColor: '#B19CD9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          Gamma
        </div>

        {/* X-rays */}
        <div
          className="spectrum-region"
          style={{
            flex: '15',
            backgroundColor: '#DDA0DD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          X-ray
        </div>

        {/* Ultraviolet */}
        <div
          className="spectrum-region"
          style={{
            flex: '10',
            backgroundColor: '#FFEAA7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          UV
        </div>
        
        {/* Visible light with gradient */}
        <div
          className="spectrum-region"
          style={{
            flex: '5',
            background: 'linear-gradient(to right, #8B00FF, #0000FF, #00FF00, #FFFF00, #FFA500, #FF0000)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            textShadow: '1px 1px 2px black'
          }}
        >
          Visible
        </div>

        {/* Infrared */}
        <div
          className="spectrum-region"
          style={{
            flex: '15',
            backgroundColor: '#45B7D1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          Infrared
        </div>

        {/* Microwaves */}
        <div
          className="spectrum-region"
          style={{
            flex: '10',
            backgroundColor: '#4ECDC4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          Micro
        </div>

        {/* Radio waves */}
        <div
          className="spectrum-region"
          style={{
            flex: '20',
            backgroundColor: '#FF6B6B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          Radio
        </div>
        </div>

        {/* Selected wavelength indicator */}
        <div style={{
          position: 'absolute',
          left: `${indicatorPosition}%`,
          top: '-8px',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {/* Indicator arrow pointing down */}
          <div
            className="wavelength-indicator-arrow"
            style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '12px solid var(--theme-primary)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          ></div>
        </div>

        {/* Indicator line through the spectrum */}
        <div
          className="wavelength-indicator-line"
          style={{
            position: 'absolute',
            left: `${indicatorPosition}%`,
            top: '4px',
            bottom: '4px',
            width: '3px',
            backgroundColor: 'var(--theme-primary)',
            transform: 'translateX(-50%)',
            zIndex: 5,
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
            pointerEvents: 'none',
            opacity: 0.9
          }}
        ></div>

        {/* Indicator dot at bottom */}
        <div style={{
          position: 'absolute',
          left: `${indicatorPosition}%`,
          bottom: '-8px',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <div
            className="wavelength-indicator-dot"
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: 'var(--theme-primary)',
              borderRadius: '50%',
              border: '2px solid var(--theme-surface)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          ></div>
        </div>
      </div>

      {/* Current selection info */}
      <div style={{
        padding: 'var(--spacing-md)',
        background: region ?
          `linear-gradient(135deg, ${region.color}dd, ${region.color}aa)` :
          'var(--theme-background-secondary)',
        color: region && ['#FFEAA7'].includes(region.color) ?
          'var(--theme-text-primary)' :
          region ? 'white' : 'var(--theme-text-primary)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        border: `1px solid var(--theme-border)`,
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 'var(--spacing-md)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: 'var(--spacing-xs)',
          textShadow: region ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
        }}>
          Current Selection: {region ? region.name : 'Unknown Region'}
        </div>
        <div style={{
          fontSize: '0.9rem',
          opacity: 0.9,
          fontFamily: 'monospace',
          fontWeight: '500'
        }}>
          λ = {(selectedWavelength * 1e9).toFixed(1)} nm
          {region && (
            <span style={{ marginLeft: 'var(--spacing-sm)' }}>
              • Position: {indicatorPosition.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Instructions */}
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--theme-text-muted)',
        textAlign: 'center',
        marginTop: 'var(--spacing-md)',
        fontStyle: 'italic'
      }}>
        💡 Click anywhere on the spectrum bar above to select a wavelength
      </p>
    </div>
  );
}

export default SimpleSpectrum;
