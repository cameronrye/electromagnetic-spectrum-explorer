import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SimpleSpectrum from '../SimpleSpectrum';

describe('SimpleSpectrum', () => {
  const defaultProps = {
    selectedWavelength: 550e-9, // Green light
    onWavelengthChange: vi.fn()
  };

  it('renders without crashing', () => {
    render(<SimpleSpectrum {...defaultProps} />);
    expect(screen.getByText(/Electromagnetic Spectrum/i)).toBeInTheDocument();
  });

  it('displays the current region name', () => {
    render(<SimpleSpectrum {...defaultProps} />);
    expect(screen.getByText(/Current Selection:/i)).toBeInTheDocument();
    expect(screen.getByText(/Visible Light/i)).toBeInTheDocument();
  });

  it('calls onWavelengthChange when spectrum bar is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <SimpleSpectrum selectedWavelength={550e-9} onWavelengthChange={handleChange} />
    );

    const spectrumBar = container.querySelector('.spectrum-bar');
    // Simulate a click with proper bounding rect
    const rect = { left: 0, width: 1000 };
    spectrumBar.getBoundingClientRect = () => rect;
    fireEvent.click(spectrumBar, { clientX: 500 });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays all spectrum regions', () => {
    const { container } = render(<SimpleSpectrum {...defaultProps} />);

    // Check that all regions are displayed in the spectrum bar
    const regions = container.querySelectorAll('.spectrum-region');
    expect(regions.length).toBe(7);

    // Check specific regions exist
    expect(screen.getAllByText(/Gamma/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/X-ray/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/UV/i).length).toBeGreaterThan(0);
  });

  it('updates when selectedWavelength prop changes', () => {
    const { rerender } = render(<SimpleSpectrum {...defaultProps} />);
    expect(screen.getByText(/Current Selection:/i)).toBeInTheDocument();
    expect(screen.getByText(/Visible Light/i)).toBeInTheDocument();

    // Change to infrared
    rerender(<SimpleSpectrum selectedWavelength={1e-6} onWavelengthChange={defaultProps.onWavelengthChange} />);
    expect(screen.getAllByText(/Infrared/i).length).toBeGreaterThan(0);
  });

  it('handles edge case wavelengths', () => {
    // Test gamma ray wavelength
    const { rerender } = render(
      <SimpleSpectrum selectedWavelength={1e-15} onWavelengthChange={defaultProps.onWavelengthChange} />
    );
    expect(screen.getByText(/Gamma Rays/i)).toBeInTheDocument();
    
    // Test radio wave wavelength
    rerender(
      <SimpleSpectrum selectedWavelength={1e2} onWavelengthChange={defaultProps.onWavelengthChange} />
    );
    expect(screen.getByText(/Radio Waves/i)).toBeInTheDocument();
  });
});

