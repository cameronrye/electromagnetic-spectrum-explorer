# Architecture Overview

This document provides a comprehensive overview of the Electromagnetic Spectrum Explorer's architecture, design decisions, and technical implementation.

## Table of Contents

- [System Architecture](#system-architecture)
- [Component Hierarchy](#component-hierarchy)
- [Data Flow](#data-flow)
- [Physics Engine](#physics-engine)
- [Design Decisions](#design-decisions)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)

## System Architecture

The Electromagnetic Spectrum Explorer follows a modern React architecture with functional components, hooks, and context-based state management.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Environment                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Theme System  │  │  Physics Engine │  │ Visualization│ │
│  │   (CSS + JS)    │  │   (Pure JS)     │  │   (React)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    React Application                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  App Component                          │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │ │
│  │  │   Spectrum  │ │ Conversion  │ │   Educational   │   │ │
│  │  │    Panel    │ │    Panel    │ │     Panel       │   │ │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Utility Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Physics Calcs   │  │ Unit Conversion │  │ Data Sources │ │
│  │ (Pure Functions)│  │ (Pure Functions)│  │ (Constants)  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Core Principles

1. **Functional Programming**: Pure functions for all calculations
2. **Unidirectional Data Flow**: Props down, callbacks up
3. **Separation of Concerns**: UI, logic, and data are clearly separated
4. **Scientific Accuracy**: All calculations based on NIST constants
5. **Performance**: Optimized for real-time interactions

## Component Hierarchy

```
App (Root)
├── ThemeProvider (Context)
│   └── AppContent
│       ├── Header
│       │   └── ThemeSwitcher
│       └── Main
│           ├── SimpleSpectrum
│           ├── SimpleConversionPanel
│           └── SimpleEducationalPanel
```

### Component Responsibilities

| Component | Responsibility | State Management |
|-----------|---------------|------------------|
| `App` | Root component, theme provider | None |
| `AppContent` | Global state, component coordination | `selectedWavelength` |
| `SimpleSpectrum` | Spectrum visualization, user interaction | Local UI state |
| `SimpleConversionPanel` | Unit conversion interface | Local form state |
| `SimpleEducationalPanel` | Educational content display | None (pure) |
| `ThemeSwitcher` | Theme selection UI | Local UI state |

## Data Flow

### Primary Data Flow Pattern

The application follows a unidirectional data flow pattern with a single source of truth for the primary state (selected wavelength) and derived calculations performed on-demand.

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Application State                  │
├─────────────────────────────────────────────────────────────┤
│  selectedWavelength (number) - Primary state in AppContent  │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                      Derived Values                         │
├─────────────────────────────────────────────────────────────┤
│  • frequency = wavelengthToFrequency(selectedWavelength)    │
│  • energy = wavelengthToEnergyEV(selectedWavelength)        │
│  • region = getRegionByWavelength(selectedWavelength)       │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Component Local State                    │
├─────────────────────────────────────────────────────────────┤
│  • Input field values and validation states                │
│  • UI interaction states (dropdowns, hover effects)        │
│  • Theme preferences and visual settings                   │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Flow Example

1. **User clicks on spectrum**: `SimpleSpectrum` handles click
2. **Calculate wavelength**: Convert click position to wavelength
3. **Update global state**: Call `onWavelengthChange(newWavelength)`
4. **State propagation**: `selectedWavelength` updates in `AppContent`
5. **Component updates**: All components receive new `selectedWavelength`
6. **UI synchronization**: Visual indicators and values update

### State Management Strategy

- **Global State**: Single source of truth for `selectedWavelength`
- **Local State**: Component-specific UI state (dropdowns, inputs)
- **Derived State**: Calculated values (frequency, energy) computed on-demand
- **Context State**: Theme preferences with localStorage persistence

## Physics Engine

The physics engine is built on pure functional programming principles, using NIST-certified constants and peer-reviewed physics relationships to ensure scientific accuracy across all calculations.

### Core Physics Constants (NIST 2018 Values)

```javascript
export const PHYSICS_CONSTANTS = {
  SPEED_OF_LIGHT: 299792458,           // m/s (exact)
  PLANCK_CONSTANT: 6.62607015e-34,     // J⋅s (exact)
  PLANCK_CONSTANT_EV: 4.135667696e-15, // eV⋅s (exact)
  ELECTRON_VOLT: 1.602176634e-19,      // J (exact)
};
```

### Fundamental Relationships

1. **Wave Equation**: `c = λf` (speed of light = wavelength × frequency)
2. **Planck's Equation**: `E = hf` (energy = Planck constant × frequency)
3. **Combined Relationship**: `E = hc/λ` (energy = Planck constant × speed of light / wavelength)

### Calculation Functions

- **Wavelength ↔ Frequency**: `wavelengthToFrequency()`, `frequencyToWavelength()`
- **Wavelength ↔ Energy**: `wavelengthToEnergyEV()`, `energyEVToWavelength()`
- **Frequency ↔ Energy**: `frequencyToEnergyEV()`, `energyEVToFrequency()`

### Accuracy and Precision

- **Floating Point Precision**: JavaScript's 64-bit IEEE 754 standard
- **Range Coverage**: 1 femtometer to 1000 kilometers wavelength
- **Validation**: Comprehensive test suite validates all calculations
- **Error Handling**: Graceful handling of edge cases and invalid inputs

## Design Decisions

### 1. Single Wavelength State

**Decision**: Use wavelength as the primary state variable

**Rationale**:
- Wavelength is the most intuitive for educational purposes
- Direct mapping to visual spectrum representation
- Simplifies state management and reduces complexity
- All other values (frequency, energy) can be derived

### 2. Pure Function Architecture

**Decision**: Implement all physics calculations as pure functions

**Rationale**:
- Predictable behavior and easy testing
- No side effects or hidden dependencies
- Enables memoization and optimization
- Scientific accuracy through deterministic calculations

### 3. Component Composition

**Decision**: Use composition over inheritance for component design

**Rationale**:
- React best practices and functional programming principles
- Better reusability and maintainability
- Clear separation of concerns
- Easier testing and debugging

### 4. Real-time Synchronization

**Decision**: Synchronize all components in real-time

**Rationale**:
- Enhanced user experience and immediate feedback
- Educational value through visual correlation
- Demonstrates physics relationships effectively
- Modern web application expectations

## Technology Stack

### Frontend Framework
- **React 18**: Modern hooks-based architecture
- **Functional Components**: Simplified state management
- **Context API**: Theme and global state management

### Build Tools
- **Vite**: Fast development server and build tool
- **ESLint**: Code quality and consistency
- **Modern JavaScript**: ES6+ features and modules

### Styling
- **CSS Custom Properties**: Theme system implementation
- **CSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first approach

### Visualization
- **CSS Gradients**: Visible spectrum representation
- **Flexbox Layout**: Responsive spectrum regions
- **CSS Animations**: Smooth transitions and interactions

### Testing
- **Custom Test Runner**: Physics calculation validation
- **Browser-based Testing**: Real-time test execution
- **Comprehensive Coverage**: All calculation functions tested

## Project Structure

```
src/
├── components/           # React components
│   ├── SimpleSpectrum.jsx       # Main spectrum visualization
│   ├── SimpleConversionPanel.jsx # Unit conversion interface
│   ├── SimpleEducationalPanel.jsx # Educational content
│   ├── ThemeSwitcher.jsx        # Theme selection
│   └── *.css                    # Component styles
├── contexts/            # React contexts
│   └── ThemeContext.jsx         # Theme management
├── data/               # Scientific data and constants
│   └── spectrumData.js          # Spectrum regions and physics constants
├── utils/              # Utility functions
│   ├── physicsCalculations.js   # Core physics functions
│   └── unitConversions.js       # Unit conversion utilities
├── tests/              # Test suites
│   ├── physicsTests.js          # Physics calculation tests
│   ├── componentTests.js        # Component integration tests
│   ├── dataIntegrityTests.js    # Data validation tests
│   ├── performanceTests.js      # Performance benchmarks
│   ├── userInteractionTests.js  # UI interaction tests
│   ├── integrationTests.js      # End-to-end tests
│   └── testRunner.js            # Test execution framework
├── assets/             # Static assets
└── App.jsx            # Main application component
```

### Directory Organization Principles

1. **Feature-based**: Components grouped by functionality
2. **Separation of Concerns**: Logic, data, and UI clearly separated
3. **Scalability**: Structure supports future feature additions
4. **Maintainability**: Clear naming and organization conventions

## Performance Considerations

### Optimization Strategies

1. **Pure Functions**: Enable memoization and caching
2. **React.memo**: Prevent unnecessary re-renders
3. **Efficient Calculations**: Optimized physics algorithms
4. **Minimal State**: Only essential state in components
5. **CSS Performance**: Hardware-accelerated animations

### Scalability Features

1. **Modular Architecture**: Easy to add new spectrum regions
2. **Extensible Calculations**: Simple to add new physics functions
3. **Theme System**: Supports unlimited theme variations
4. **Test Framework**: Automated validation for new features

---

*For implementation details, see the Developer Guide and API Reference documentation.*
