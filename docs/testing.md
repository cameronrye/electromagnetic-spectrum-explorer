# Comprehensive Testing Suite - Electromagnetic Spectrum Explorer

## Overview

The Electromagnetic Spectrum Explorer includes a comprehensive testing suite that validates all aspects of the application, from physics calculations to user interactions. The test suite ensures accuracy, performance, and reliability across all components.

## Test Categories

### 🔬 **Physics Calculations Testing** (`physicsTests.js`)

**Coverage:**
- Physics constants validation against NIST 2018 values
- Wavelength-frequency-energy conversion accuracy
- Edge cases (very small/large values, boundary conditions)
- Unit conversion accuracy across all supported units
- Planck's equation and speed of light relationship validation

**Key Tests:**
- Speed of Light Constant: `c = 299,792,458 m/s`
- Planck Constant: `h = 6.626×10⁻³⁴ J⋅s`
- Electron Volt: `1 eV = 1.602×10⁻¹⁹ J`
- Conversion accuracy: `c = λf` and `E = hf = hc/λ`
- Boundary conditions: gamma rays (1 fm) to radio waves (1000 km)

### 🔗 **Component Integration Testing** (`integrationTests.js`)

**Coverage:**
- Data flow between App.jsx ↔ SimpleSpectrum ↔ SimpleConversionPanel ↔ SimpleEducationalPanel
- selectedWavelength prop passing and onWavelengthChange callbacks
- Indicator position accuracy matching visual spectrum layout
- Click handler synchronization with indicator positioning
- Slider range handling (1nm to 1mm) across all components

**Key Tests:**
- Prop passing simulation across component hierarchy
- Callback function integrity during user interactions
- Indicator position calculation matching visual spectrum regions
- Click-to-wavelength conversion accuracy
- Slider value clamping and conversion

### 👤 **User Interaction Testing** (`userInteractionTests.js`)

**Coverage:**
- Spectrum bar clicking at various positions
- Conversion panel input validation and error handling
- Slider interactions and value clamping
- Real-time updates across all connected components
- Error handling for invalid inputs

**Key Tests:**
- Spectrum click simulation with position-to-wavelength conversion
- Input validation for wavelength (1nm-1Tm), frequency (1Hz-1PHz), energy (1meV-1GeV)
- Real-time synchronization between components
- Malformed input handling (empty, null, infinity, negative values)

### 📊 **Data Integrity Testing** (`dataIntegrityTests.js`)

**Coverage:**
- Spectrum region data consistency (wavelength ranges, frequency ranges, ordering)
- Region detection accuracy for getRegionByWavelength function
- Educational content mapping to correct wavelength ranges
- Data structure validation and completeness

**Key Tests:**
- All regions have required properties (id, name, color, wavelength/frequency ranges)
- Wavelength-frequency relationship consistency (`c = λf`)
- Region boundary detection accuracy
- Educational content completeness and quality
- No gaps or overlaps in spectrum coverage

### ⚡ **Performance & Memory Testing** (`performanceTests.js`)

**Coverage:**
- Physics calculation performance benchmarks
- Memory usage monitoring and leak detection
- Load testing under sustained operations
- Concurrent operation handling

**Key Tests:**
- Conversion speed: >100,000 operations/second
- Memory usage: <50MB peak increase during intensive calculations
- Sustained performance: >50,000 ops/sec over 1 second
- Memory leak detection over repeated operations

## Running Tests

### **Automatic Testing**
Tests run automatically in development mode when the URL includes `?runTests=true`:

```
http://localhost:5173/?runTests=true
```

### **Manual Testing**
Open browser console and run:

```javascript
// Run all tests
await runTests();

// Quick test (essential tests only)
await quickTest();

// Run specific test suite
const { runPhysicsTests } = await import('./tests/physicsTests.js');
runPhysicsTests();
```

### **Available Test Commands**
```javascript
// Global functions available in browser console
window.runTests()           // Run complete test suite
window.quickTest()          // Run essential tests only
window.testRunner          // Access test runner instance

// Individual test suites
import('./tests/physicsTests.js').then(m => m.runPhysicsTests())
import('./tests/integrationTests.js').then(m => m.runAllIntegrationTests())
import('./tests/userInteractionTests.js').then(m => m.runAllUserInteractionTests())
import('./tests/dataIntegrityTests.js').then(m => m.runAllDataIntegrityTests())
import('./tests/performanceTests.js').then(m => m.runAllPerformanceTests())
```

## Test Results Interpretation

### **Status Indicators**
- ✅ **PASS**: Test completed successfully
- ❌ **FAIL**: Test failed, requires attention
- ⚠️ **WARNING**: Non-critical issue detected
- 🚨 **CRITICAL**: Critical test failed, application may not function correctly

### **Test Categories**
- **[CRITICAL]**: Essential for application functionality
- **[PERFORMANCE]**: Performance benchmarks and optimization
- **[EDGE CASE]**: Boundary conditions and error handling
- **[INTEGRATION]**: Component interaction and data flow

### **Success Criteria**
- **Physics Tests**: 100% pass rate required (all marked critical)
- **Integration Tests**: >95% pass rate (critical tests must pass)
- **User Interaction**: >90% pass rate (input validation critical)
- **Data Integrity**: >95% pass rate (region detection critical)
- **Performance**: >80% pass rate (benchmarks may vary by device)

## Test File Structure

```
src/tests/
├── testRunner.js              # Main test orchestration
├── physicsTests.js            # Physics calculations & constants
├── integrationTests.js        # Component integration & data flow
├── userInteractionTests.js    # User interactions & input validation
├── dataIntegrityTests.js      # Data consistency & region detection
├── performanceTests.js        # Performance benchmarks & memory
└── componentTests.js          # Legacy component tests (compatibility)
```

## Performance Benchmarks

### **Target Performance Standards**
- **Wavelength-Frequency Conversion**: >100,000 ops/sec
- **Energy Calculations**: >100,000 ops/sec
- **Region Detection**: >10,000 ops/sec
- **Value Formatting**: >5,000 ops/sec (3 operations per test)
- **Memory Usage**: <50MB peak increase
- **Sustained Performance**: >50,000 ops/sec over 1 second

### **Memory Management**
- Automatic garbage collection monitoring
- Memory leak detection over repeated operations
- Peak memory usage tracking during intensive calculations
- Memory recovery validation after operations complete

## Continuous Integration

### **Development Workflow**
1. Tests run automatically when `?runTests=true` is in URL
2. All tests must pass before deployment
3. Performance benchmarks are recorded and tracked
4. Critical test failures block releases

### **Test Coverage Requirements**
- **Physics Calculations**: 100% (all functions tested with edge cases)
- **Component Integration**: 100% (all data flows validated)
- **User Interactions**: 95% (all input paths covered)
- **Error Handling**: 90% (graceful degradation verified)
- **Performance**: 80% (benchmarks may vary by environment)

## Troubleshooting

### **Common Issues**
1. **Performance tests failing**: May indicate device limitations or background processes
2. **Memory tests unavailable**: Browser doesn't support `performance.memory` API
3. **Integration tests failing**: Check component prop passing and callback functions
4. **Physics tests failing**: Verify constants and calculation accuracy

### **Debug Mode**
Enable detailed logging by setting:
```javascript
window.DEBUG_TESTS = true;
```

This provides additional diagnostic information for failed tests.

## Contributing

When adding new features:
1. Add corresponding tests to appropriate test file
2. Ensure all existing tests continue to pass
3. Update performance benchmarks if applicable
4. Document any new test requirements

The comprehensive test suite ensures the Electromagnetic Spectrum Explorer maintains high quality, accuracy, and performance standards across all functionality.
