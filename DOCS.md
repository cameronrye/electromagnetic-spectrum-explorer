# API Documentation

This document provides information about generating and viewing the API documentation for the Electromagnetic Spectrum Explorer.

## Generating Documentation

The project uses [documentation.js](https://github.com/documentationjs/documentation) to generate API documentation from JSDoc comments in the source code.

### Available Commands

```bash
# Generate HTML documentation in the docs/ folder
npm run docs

# Generate Markdown documentation in API.md
npm run docs:md

# Start a live documentation server with auto-reload
npm run docs:serve
```

### Viewing Documentation

After running `npm run docs`, open `docs/index.html` in your browser to view the generated documentation.

For the live server (`npm run docs:serve`), the documentation will be available at `http://localhost:4001` by default.

## Documentation Structure

The API documentation is organized into the following sections:

### Components
React components for the Electromagnetic Spectrum Explorer:
- `SimpleSpectrum` - Interactive spectrum visualization
- `SimpleConversionPanel` - Unit conversion interface
- `ComparisonMode` - Side-by-side wavelength comparison
- `WavelengthHistory` - History and bookmarks management
- `WavelengthInfo` - Wavelength information display
- `AdvancedVisualization` - Advanced visualization options
- `Settings` - User preferences management
- `SectionErrorBoundary` - Error boundary for sections
- And more...

### Contexts
React contexts for state management:
- `ThemeContext` - Theme management (light/dark/system)
- `PreferencesContext` - User preferences (units, notation, etc.)

### Hooks
Custom React hooks:
- `useWavelengthHistory` - Wavelength history and bookmarks
- `useDebounce` - Debounce hook for input handling

### Utils
Utility functions and helpers:
- `physicsCalculations` - Physics conversions and formatting
- `logger` - Structured logging utility
- `safeLocalStorage` - Safe localStorage wrapper
- `errorHandling` - Error handling utilities

### Data
Data structures and constants:
- `spectrumData` - Electromagnetic spectrum regions and constants

## Writing Documentation

When adding new code, please include JSDoc comments following these guidelines:

### Functions

```javascript
/**
 * Brief description of what the function does
 * 
 * @param {type} paramName - Description of parameter
 * @returns {type} Description of return value
 * @example
 * const result = myFunction(param);
 */
export function myFunction(paramName) {
  // implementation
}
```

### React Components

```javascript
/**
 * Component description
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.propName - Description of prop
 * @example
 * <MyComponent propName="value" />
 */
const MyComponent = ({ propName }) => {
  // implementation
};
```

### Modules

```javascript
/**
 * Module description
 * 
 * Detailed explanation of what the module provides
 * 
 * @module path/to/module
 * @example
 * import { something } from './path/to/module';
 */
```

## Contributing

When contributing to the project, please ensure:

1. All public functions and components have JSDoc comments
2. Complex logic includes explanatory comments
3. Examples are provided for non-obvious usage
4. Parameter and return types are documented
5. Run `npm run docs` to verify documentation builds correctly

## Resources

- [JSDoc Documentation](https://jsdoc.app/)
- [documentation.js Guide](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md)
- [React PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

