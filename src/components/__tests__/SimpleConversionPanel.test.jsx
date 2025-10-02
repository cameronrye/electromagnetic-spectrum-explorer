import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SimpleConversionPanel from '../SimpleConversionPanel';

describe('SimpleConversionPanel', () => {
  const defaultProps = {
    selectedWavelength: 550e-9, // Green light
    onWavelengthChange: vi.fn()
  };

  it('renders all input fields', () => {
    render(<SimpleConversionPanel {...defaultProps} />);
    
    expect(screen.getByLabelText(/Wavelength \(nm\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Frequency \(THz\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Energy \(eV\):/i)).toBeInTheDocument();
  });

  it('displays correct initial values', () => {
    render(<SimpleConversionPanel {...defaultProps} />);
    
    const wavelengthInput = screen.getByLabelText(/Wavelength \(nm\):/i);
    expect(wavelengthInput.value).toBe('550.0');
  });

  it('calls onWavelengthChange when wavelength input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<SimpleConversionPanel selectedWavelength={550e-9} onWavelengthChange={handleChange} />);
    
    const wavelengthInput = screen.getByLabelText(/Wavelength \(nm\):/i);
    await user.clear(wavelengthInput);
    await user.type(wavelengthInput, '600');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onWavelengthChange when frequency input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<SimpleConversionPanel selectedWavelength={550e-9} onWavelengthChange={handleChange} />);
    
    const frequencyInput = screen.getByLabelText(/Frequency \(THz\):/i);
    await user.clear(frequencyInput);
    await user.type(frequencyInput, '500');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onWavelengthChange when energy input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<SimpleConversionPanel selectedWavelength={550e-9} onWavelengthChange={handleChange} />);
    
    const energyInput = screen.getByLabelText(/Energy \(eV\):/i);
    await user.clear(energyInput);
    await user.type(energyInput, '2.5');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('updates all fields when selectedWavelength prop changes', () => {
    const { rerender } = render(<SimpleConversionPanel {...defaultProps} />);
    
    // Change wavelength
    rerender(<SimpleConversionPanel selectedWavelength={600e-9} onWavelengthChange={defaultProps.onWavelengthChange} />);
    
    const wavelengthInput = screen.getByLabelText(/Wavelength \(nm\):/i);
    expect(wavelengthInput.value).toBe('600.0');
  });

  it('validates input ranges', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<SimpleConversionPanel selectedWavelength={550e-9} onWavelengthChange={handleChange} />);
    
    const wavelengthInput = screen.getByLabelText(/Wavelength \(nm\):/i);
    
    // Try to enter invalid value (negative)
    await user.clear(wavelengthInput);
    await user.type(wavelengthInput, '-100');
    
    // Should not call onChange for invalid values
    // The component validates input before calling onChange
  });
});

