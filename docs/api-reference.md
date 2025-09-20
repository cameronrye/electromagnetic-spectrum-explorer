# API Reference

This document provides comprehensive documentation for all React components, utilities, and data structures in the Electromagnetic Spectrum Explorer.

## Table of Contents

- [Components](#components)
  - [Core Components](#core-components)
  - [UI Components](#ui-components)
- [Utilities](#utilities)
  - [Physics Calculations](#physics-calculations)
  - [Unit Conversions](#unit-conversions)
- [Data Structures](#data-structures)
- [Contexts](#contexts)

## Components

### Core Components

#### `App`

The main application component that manages global state and renders all child components.

**Props:** None (root component)

**State:**
- `selectedWavelength` (number): Currently selected wavelength in meters

**Key Features:**
- Manages global wavelength state
- Provides theme context
- Coordinates data flow between components
- Handles automatic test execution in development

---

#### `SimpleSpectrum`

Interactive electromagnetic spectrum visualization component with clickable regions.

**Props:**
```typescript
interface SimpleSpectrumProps {
  selectedWavelength: number;    // Current wavelength in meters
  onWavelengthChange: (wavelength: number) => void;  // Callback for wavelength changes
}
```

**Features:**
- Visual spectrum bar with color-coded regions
- Interactive clicking for wavelength selection
- Real-time indicator positioning
- Responsive design for all screen sizes
- Logarithmic scaling for accurate representation

**Usage:**
```jsx
<SimpleSpectrum 
  selectedWavelength={wavelength}
  onWavelengthChange={setWavelength}
/>
```

---

#### `SimpleConversionPanel`

Unit conversion interface allowing input in wavelength, frequency, or energy units.

**Props:**
```typescript
interface SimpleConversionPanelProps {
  selectedWavelength: number;    // Current wavelength in meters
  onWavelengthChange: (wavelength: number) => void;  // Callback for wavelength changes
}
```

**Features:**
- Multi-unit input support (wavelength, frequency, energy)
- Real-time conversion and validation
- Scientific notation support
- Unit selection dropdowns
- Error handling for invalid inputs

**Supported Units:**
- **Wavelength**: meters (m), nanometers (nm), micrometers (μm), millimeters (mm)
- **Frequency**: hertz (Hz), kilohertz (kHz), megahertz (MHz), gigahertz (GHz), terahertz (THz)
- **Energy**: electron volts (eV), millielectron volts (meV), kiloelectron volts (keV), megaelectron volts (MeV)

---

#### `SimpleEducationalPanel`

Educational content display component showing information about the selected electromagnetic region.

**Props:**
```typescript
interface SimpleEducationalPanelProps {
  selectedWavelength: number;    // Current wavelength in meters
}
```

**Features:**
- Dynamic content based on selected wavelength
- Region-specific information and applications
- Scientific explanations and real-world examples
- Safety information where applicable
- Responsive layout for all devices

---

### UI Components

#### `ThemeSwitcher`

Theme selection component with support for light, dark, and system themes.

**Props:** None (uses ThemeContext)

**Features:**
- Dropdown interface with smooth animations
- System theme detection and following
- Theme persistence in localStorage
- Accessibility support with keyboard navigation
- Mobile-optimized icon-only mode

**Usage:**
```jsx
<ThemeSwitcher />
```

---

## Utilities

### Physics Calculations

Located in `src/utils/physicsCalculations.js`

#### `wavelengthToFrequency(wavelength)`

Converts wavelength to frequency using the speed of light.

**Parameters:**
- `wavelength` (number): Wavelength in meters

**Returns:**
- (number): Frequency in hertz

**Formula:** `f = c / λ`

**Example:**
```javascript
const frequency = wavelengthToFrequency(500e-9); // 500nm
// Returns: 5.99584916e14 Hz
```

#### `frequencyToWavelength(frequency)`

Converts frequency to wavelength using the speed of light.

**Parameters:**
- `frequency` (number): Frequency in hertz

**Returns:**
- (number): Wavelength in meters

**Formula:** `λ = c / f`

#### `wavelengthToEnergyEV(wavelength)`

Converts wavelength to photon energy in electron volts.

**Parameters:**
- `wavelength` (number): Wavelength in meters

**Returns:**
- (number): Energy in electron volts

**Formula:** `E = hc / λ`

#### `energyEVToWavelength(energy)`

Converts photon energy to wavelength.

**Parameters:**
- `energy` (number): Energy in electron volts

**Returns:**
- (number): Wavelength in meters

**Formula:** `λ = hc / E`

### Unit Conversions

Located in `src/utils/unitConversions.js`

#### Wavelength Conversions

- `metersToNanometers(meters)`: Convert meters to nanometers
- `nanometersToMeters(nanometers)`: Convert nanometers to meters
- `metersToMicrometers(meters)`: Convert meters to micrometers
- `micrometersToMeters(micrometers)`: Convert micrometers to meters
- `metersToMillimeters(meters)`: Convert meters to millimeters
- `millimetersToMeters(millimeters)`: Convert millimeters to meters

#### Frequency Conversions

- `hertzToKilohertz(hertz)`: Convert Hz to kHz
- `kilohertzToHertz(kilohertz)`: Convert kHz to Hz
- `hertzToMegahertz(hertz)`: Convert Hz to MHz
- `megahertzToHertz(megahertz)`: Convert MHz to Hz
- `hertzToGigahertz(hertz)`: Convert Hz to GHz
- `gigahertzToHertz(gigahertz)`: Convert GHz to Hz
- `hertzToTerahertz(hertz)`: Convert Hz to THz
- `terahertzToHertz(terahertz)`: Convert THz to Hz

#### Energy Conversions

- `electronVoltsToMilliElectronVolts(eV)`: Convert eV to meV
- `milliElectronVoltsToElectronVolts(meV)`: Convert meV to eV
- `electronVoltsToKiloElectronVolts(eV)`: Convert eV to keV
- `kiloElectronVoltsToElectronVolts(keV)`: Convert keV to eV
- `electronVoltsToMegaElectronVolts(eV)`: Convert eV to MeV
- `megaElectronVoltsToElectronVolts(MeV)`: Convert MeV to eV

## Data Structures

### Spectrum Regions

Located in `src/data/spectrumData.js`

```javascript
const spectrumRegions = [
  {
    id: 'radio',
    name: 'Radio Waves',
    color: '#FF6B6B',
    wavelengthRange: [1e-1, 1e5],     // 0.1m to 100km
    frequencyRange: [3e3, 3e9],       // 3kHz to 3GHz
    description: 'Long wavelength electromagnetic radiation...',
    applications: ['Broadcasting', 'Communication', 'Radar'],
    examples: ['AM/FM Radio', 'Television', 'Cell Phones']
  },
  // ... more regions
];
```

### Physics Constants

```javascript
export const PHYSICS_CONSTANTS = {
  SPEED_OF_LIGHT: 299792458,           // m/s (exact)
  PLANCK_CONSTANT: 6.62607015e-34,     // J⋅s (exact)
  PLANCK_CONSTANT_EV: 4.135667696e-15, // eV⋅s (exact)
  ELECTRON_VOLT: 1.602176634e-19,      // J (exact)
};
```

## Contexts

### ThemeContext

Located in `src/contexts/ThemeContext.jsx`

Provides theme management functionality throughout the application.

**Context Value:**
```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isDark: boolean;
  isLight: boolean;
}
```

**Usage:**
```jsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();
  
  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Theme
      </button>
    </div>
  );
}
```

---

## Testing API

### Test Runner

Located in `src/tests/testRunner.js`

**Global Functions:**
- `window.runTests()`: Execute complete test suite
- `window.quickTest()`: Execute essential tests only
- `window.testRunner`: Access test runner instance

**Individual Test Suites:**
```javascript
// Import and run specific test suites
import('./tests/physicsTests.js').then(m => m.runPhysicsTests());
import('./tests/integrationTests.js').then(m => m.runAllIntegrationTests());
import('./tests/userInteractionTests.js').then(m => m.runAllUserInteractionTests());
```

### Test Categories

1. **Physics Tests** (`physicsTests.js`): Validate all physics calculations
2. **Integration Tests** (`integrationTests.js`): Test component interactions
3. **User Interaction Tests** (`userInteractionTests.js`): Validate user inputs
4. **Data Integrity Tests** (`dataIntegrityTests.js`): Check data consistency
5. **Performance Tests** (`performanceTests.js`): Benchmark calculations

---

This API reference covers all major components, utilities, and data structures. For implementation details and examples, refer to the source code and other documentation files.
