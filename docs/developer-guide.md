# Developer Guide

Welcome to the Electromagnetic Spectrum Explorer development guide! This comprehensive resource will help you set up, understand, and contribute to the project.

## Table of Contents

- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)

## Quick Start

### Prerequisites

- **Node.js**: Version 16 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Modern Browser**: Chrome, Firefox, Safari, or Edge
- **Code Editor**: VS Code recommended with extensions

### 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/cameronrye/electromagnetic-spectrum-explorer.git
cd electromagnetic-spectrum-explorer

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

You should see the application running with hot reload enabled!

## Development Setup

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Environment Configuration

Create a `.env.local` file for local development:

```bash
# Development settings
VITE_DEV_MODE=true
VITE_DEBUG_PHYSICS=false
VITE_AUTO_RUN_TESTS=false
```

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Development server with automatic tests
npm run dev:test

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run tests in browser
# Open http://localhost:5173/?runTests=true
```

## Project Structure

### Directory Overview

```
electromagnetic-spectrum-explorer/
├── docs/                    # Documentation (this folder)
├── public/                  # Static assets
├── src/                     # Source code
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   ├── data/               # Scientific data and constants
│   ├── utils/              # Utility functions
│   ├── tests/              # Test suites
│   └── assets/             # Images and static files
├── dist/                   # Built application (generated)
├── node_modules/           # Dependencies (generated)
├── package.json            # Project configuration
├── vite.config.js          # Build tool configuration
├── eslint.config.js        # Linting rules
└── README.md               # Main project README
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application component |
| `src/main.jsx` | Application entry point |
| `src/data/spectrumData.js` | Scientific constants and spectrum data |
| `src/utils/physicsCalculations.js` | Core physics functions |
| `src/tests/testRunner.js` | Test execution framework |
| `vite.config.js` | Build configuration |
| `package.json` | Dependencies and scripts |

### Component Architecture

```
App (Root)
├── ThemeProvider (Context)
│   └── AppContent (State Management)
│       ├── Header
│       │   └── ThemeSwitcher
│       └── Main
│           ├── SimpleSpectrum (Visualization)
│           ├── SimpleConversionPanel (Input/Output)
│           └── SimpleEducationalPanel (Content)
```

## Coding Standards

### JavaScript/JSX Style

```javascript
// Use functional components with hooks
function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  // Use descriptive variable names
  const selectedWavelength = 550e-9; // meters
  
  // Use JSDoc for function documentation
  /**
   * Converts wavelength to frequency
   * @param {number} wavelength - Wavelength in meters
   * @returns {number} Frequency in Hz
   */
  function wavelengthToFrequency(wavelength) {
    return SPEED_OF_LIGHT / wavelength;
  }
  
  return (
    <div className="component-container">
      {/* Use semantic HTML */}
      <main role="main">
        <h1>Component Title</h1>
      </main>
    </div>
  );
}
```

### CSS Conventions

```css
/* Use CSS custom properties for theming */
:root {
  --theme-primary: #3b82f6;
  --theme-background: #ffffff;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-md: 0.375rem;
}

/* Use BEM-like naming for components */
.spectrum-bar {
  display: flex;
  height: 60px;
}

.spectrum-bar__region {
  display: flex;
  align-items: center;
}

.spectrum-bar__indicator {
  position: absolute;
  z-index: 10;
}
```

### File Naming Conventions

- **Components**: PascalCase (`SimpleSpectrum.jsx`)
- **Utilities**: camelCase (`physicsCalculations.js`)
- **Constants**: UPPER_SNAKE_CASE (`PHYSICS_CONSTANTS`)
- **CSS files**: Match component name (`SimpleSpectrum.css`)

### Import/Export Standards

```javascript
// Named exports for utilities
export function wavelengthToFrequency(wavelength) { /* ... */ }
export function frequencyToWavelength(frequency) { /* ... */ }

// Default export for components
function SimpleSpectrum({ selectedWavelength, onWavelengthChange }) {
  // Component implementation
}

export default SimpleSpectrum;

// Import order: external libraries, internal modules, relative imports
import React, { useState, useEffect } from 'react';
import { wavelengthToFrequency } from '../utils/physicsCalculations.js';
import './SimpleSpectrum.css';
```

## Development Workflow

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-spectrum-region

# 2. Make changes and commit frequently
git add .
git commit -m "Add infrared spectrum region data"

# 3. Push branch and create pull request
git push origin feature/new-spectrum-region
```

### Commit Message Format

```
type(scope): description

feat(spectrum): add infrared region visualization
fix(physics): correct energy calculation for gamma rays
docs(api): update component documentation
test(physics): add boundary condition tests
refactor(ui): simplify theme switching logic
```

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Functions have JSDoc documentation
- [ ] Tests pass (run `npm run dev:test`)
- [ ] No console errors in browser
- [ ] Responsive design works on mobile
- [ ] Accessibility standards met
- [ ] Physics calculations are accurate

### Adding New Features

1. **Plan the feature**: Discuss in issues before coding
2. **Write tests first**: Define expected behavior
3. **Implement incrementally**: Small, focused commits
4. **Document thoroughly**: Update API docs and user guides
5. **Test comprehensively**: Manual and automated testing

## Testing

### Test Structure

```
src/tests/
├── testRunner.js           # Test execution framework
├── physicsTests.js         # Physics calculation tests
├── componentTests.js       # Component integration tests
├── dataIntegrityTests.js   # Data validation tests
├── performanceTests.js     # Performance benchmarks
├── userInteractionTests.js # UI interaction tests
└── integrationTests.js     # End-to-end tests
```

### Running Tests

```bash
# Run all tests in browser
npm run dev:test

# Or manually open
# http://localhost:5173/?runTests=true

# Check browser console for results
```

### Writing Tests

```javascript
// Example physics test
export function testWavelengthToFrequency() {
  const wavelength = 550e-9; // 550 nm
  const frequency = wavelengthToFrequency(wavelength);
  const expected = 5.45e14; // ~545 THz
  
  const tolerance = 1e12; // 1 THz tolerance
  const passed = Math.abs(frequency - expected) < tolerance;
  
  return {
    name: 'Wavelength to frequency conversion',
    passed,
    expected,
    actual: frequency,
    tolerance
  };
}
```

### Test Categories

1. **Physics Tests**: Verify calculation accuracy
2. **Component Tests**: Test React component behavior
3. **Integration Tests**: Test component communication
4. **Performance Tests**: Measure calculation speed
5. **Data Tests**: Validate spectrum data integrity

## Deployment

### Build Process

```bash
# Create production build
npm run build

# Preview build locally
npm run preview

# Deploy to hosting service
# (Copy dist/ folder contents)
```

### Environment Variables

```bash
# Production settings
VITE_NODE_ENV=production
VITE_DEBUG_PHYSICS=false
VITE_AUTO_RUN_TESTS=false
```

### Deployment Checklist

- [ ] All tests pass
- [ ] Build completes without errors
- [ ] No console errors in production build
- [ ] Performance is acceptable
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested

## Contributing Guidelines

### Before You Start

1. **Read the documentation**: Understand the project goals
2. **Check existing issues**: Avoid duplicate work
3. **Discuss major changes**: Open an issue for discussion
4. **Follow the style guide**: Maintain code consistency

### Pull Request Process

1. **Fork the repository**: Create your own copy
2. **Create feature branch**: Use descriptive names
3. **Make focused changes**: One feature per PR
4. **Write good commit messages**: Clear and descriptive
5. **Update documentation**: Keep docs in sync
6. **Test thoroughly**: Ensure nothing breaks
7. **Request review**: Tag maintainers for review

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Maintain scientific accuracy
- Prioritize educational value

## Getting Help

### Resources

- **Documentation**: Start with this guide and API reference
- **Issues**: Check GitHub issues for known problems
- **Discussions**: Use GitHub discussions for questions
- **Code**: Read existing code for examples

### Common Issues

| Problem | Solution |
|---------|----------|
| Tests failing | Check browser console for errors |
| Hot reload not working | Restart dev server |
| Physics calculations wrong | Verify input units and constants |
| Styling issues | Check CSS custom properties |
| Build errors | Clear node_modules and reinstall |

### Development Tips

1. **Use the browser dev tools**: Essential for debugging
2. **Test with different values**: Try edge cases
3. **Check the physics**: Verify calculations manually
4. **Read the existing code**: Learn from current patterns
5. **Start small**: Make incremental improvements

---

*Ready to contribute? Start by exploring the codebase and running the tests. The physics calculations in `src/utils/physicsCalculations.js` are a great place to begin understanding the project!*
