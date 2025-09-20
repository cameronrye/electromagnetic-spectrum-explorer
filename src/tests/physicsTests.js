// Comprehensive physics calculations testing suite
import {
  wavelengthToFrequency,
  wavelengthToEnergyEV,
  frequencyToWavelength,
  frequencyToEnergyEV,
  energyEVToWavelength,
  energyEVToFrequency,
  formatWavelength,
  formatFrequency,
  formatEnergy
} from '../utils/physicsCalculations.js';

import { PHYSICS_CONSTANTS } from '../data/spectrumData.js';

// Physics constants for validation (NIST 2018 values)
const REFERENCE_CONSTANTS = {
  SPEED_OF_LIGHT: 299792458, // m/s (exact)
  PLANCK_CONSTANT: 6.62607015e-34, // J⋅s (exact)
  ELECTRON_VOLT: 1.602176634e-19, // J (exact)
  PLANCK_EV: 4.135667696e-15 // eV⋅s (derived)
};

// Test physics constants accuracy
export function runPhysicsConstantsTests() {
  console.log('🔬 Running Physics Constants Validation Tests...');

  const tests = [];

  // Test 1: Speed of light constant
  const speedOfLightTest = Math.abs(PHYSICS_CONSTANTS.SPEED_OF_LIGHT - REFERENCE_CONSTANTS.SPEED_OF_LIGHT) < 1;
  tests.push({
    name: 'Speed of Light Constant',
    pass: speedOfLightTest,
    details: `App: ${PHYSICS_CONSTANTS.SPEED_OF_LIGHT}, NIST: ${REFERENCE_CONSTANTS.SPEED_OF_LIGHT}`,
    critical: true
  });

  // Test 2: Planck constant
  const planckTest = Math.abs(PHYSICS_CONSTANTS.PLANCK_CONSTANT - REFERENCE_CONSTANTS.PLANCK_CONSTANT) / REFERENCE_CONSTANTS.PLANCK_CONSTANT < 1e-10;
  tests.push({
    name: 'Planck Constant',
    pass: planckTest,
    details: `App: ${PHYSICS_CONSTANTS.PLANCK_CONSTANT}, NIST: ${REFERENCE_CONSTANTS.PLANCK_CONSTANT}`,
    critical: true
  });

  // Test 3: Electron volt conversion
  const evTest = Math.abs(PHYSICS_CONSTANTS.ELECTRON_VOLT - REFERENCE_CONSTANTS.ELECTRON_VOLT) / REFERENCE_CONSTANTS.ELECTRON_VOLT < 1e-10;
  tests.push({
    name: 'Electron Volt Constant',
    pass: evTest,
    details: `App: ${PHYSICS_CONSTANTS.ELECTRON_VOLT}, NIST: ${REFERENCE_CONSTANTS.ELECTRON_VOLT}`,
    critical: true
  });

  // Test 4: Derived constant consistency (h in eV⋅s)
  const planckEV = PHYSICS_CONSTANTS.PLANCK_CONSTANT / PHYSICS_CONSTANTS.ELECTRON_VOLT;
  const planckEVTest = Math.abs(planckEV - REFERENCE_CONSTANTS.PLANCK_EV) / REFERENCE_CONSTANTS.PLANCK_EV < 1e-10;
  tests.push({
    name: 'Planck Constant (eV⋅s)',
    pass: planckEVTest,
    details: `Calculated: ${planckEV.toExponential(9)}, NIST: ${REFERENCE_CONSTANTS.PLANCK_EV}`,
    critical: true
  });

  return tests;
}

// Test physics calculations with comprehensive coverage
export function runPhysicsCalculationTests() {
  console.log('🧮 Running Physics Calculation Tests...');

  const tests = [];
  
  // Test 1: Basic wavelength-frequency relationship (c = λf)
  const testWavelength = 500e-9; // 500 nm (green light)
  const frequency = wavelengthToFrequency(testWavelength);
  const calculatedWavelength = frequencyToWavelength(frequency);

  const test1Pass = Math.abs(testWavelength - calculatedWavelength) / testWavelength < 1e-12;
  tests.push({
    name: 'Basic Wavelength-Frequency Conversion',
    pass: test1Pass,
    details: `Original: ${testWavelength.toExponential(3)}m, Calculated: ${calculatedWavelength.toExponential(3)}m`,
    critical: true
  });

  // Test 2: Frequency calculation accuracy
  const expectedFrequency = REFERENCE_CONSTANTS.SPEED_OF_LIGHT / testWavelength;
  const frequencyAccuracyTest = Math.abs(frequency - expectedFrequency) / expectedFrequency < 1e-12;
  tests.push({
    name: 'Frequency Calculation Accuracy',
    pass: frequencyAccuracyTest,
    details: `Calculated: ${frequency.toExponential(6)} Hz, Expected: ${expectedFrequency.toExponential(6)} Hz`,
    critical: true
  });
  
  // Test 3: Energy calculations (E = hf = hc/λ)
  const energy = wavelengthToEnergyEV(testWavelength);
  const calculatedWavelengthFromEnergy = energyEVToWavelength(energy);

  const energyConversionTest = Math.abs(testWavelength - calculatedWavelengthFromEnergy) / testWavelength < 1e-12;
  tests.push({
    name: 'Wavelength-Energy Conversion',
    pass: energyConversionTest,
    details: `Original: ${testWavelength.toExponential(3)}m, Calculated: ${calculatedWavelengthFromEnergy.toExponential(3)}m`,
    critical: true
  });

  // Test 4: Energy calculation accuracy using Planck's equation
  const expectedEnergyJ = (REFERENCE_CONSTANTS.PLANCK_CONSTANT * REFERENCE_CONSTANTS.SPEED_OF_LIGHT) / testWavelength;
  const expectedEnergyEV = expectedEnergyJ / REFERENCE_CONSTANTS.ELECTRON_VOLT;
  const energyAccuracyTest = Math.abs(energy - expectedEnergyEV) / expectedEnergyEV < 1e-10;
  tests.push({
    name: 'Energy Calculation Accuracy',
    pass: energyAccuracyTest,
    details: `Calculated: ${energy.toFixed(6)} eV, Expected: ${expectedEnergyEV.toFixed(6)} eV`,
    critical: true
  });

  // Test 5: Frequency-Energy relationship (E = hf)
  const energyFromFreq = frequencyToEnergyEV(frequency);
  const freqEnergyTest = Math.abs(energy - energyFromFreq) / energy < 1e-12;
  tests.push({
    name: 'Frequency-Energy Relationship',
    pass: freqEnergyTest,
    details: `From wavelength: ${energy.toFixed(6)} eV, From frequency: ${energyFromFreq.toFixed(6)} eV`,
    critical: true
  });
  
  return tests;
}

// Test edge cases and boundary conditions
export function runEdgeCaseTests() {
  console.log('⚠️  Running Edge Case and Boundary Tests...');

  const tests = [];

  // Test 1: Very small wavelengths (gamma rays)
  const gammaWavelength = 1e-15; // 1 femtometer
  const gammaFreq = wavelengthToFrequency(gammaWavelength);
  const gammaEnergy = wavelengthToEnergyEV(gammaWavelength);

  const gammaTest = isFinite(gammaFreq) && isFinite(gammaEnergy) && gammaFreq > 0 && gammaEnergy > 0;
  tests.push({
    name: 'Gamma Ray Wavelength (1 fm)',
    pass: gammaTest,
    details: `Frequency: ${gammaFreq.toExponential(3)} Hz, Energy: ${gammaEnergy.toExponential(3)} eV`,
    critical: false
  });

  // Test 2: Very large wavelengths (radio waves)
  const radioWavelength = 1e6; // 1000 km
  const radioFreq = wavelengthToFrequency(radioWavelength);
  const radioEnergy = wavelengthToEnergyEV(radioWavelength);

  const radioTest = isFinite(radioFreq) && isFinite(radioEnergy) && radioFreq > 0 && radioEnergy > 0;
  tests.push({
    name: 'Radio Wave Wavelength (1000 km)',
    pass: radioTest,
    details: `Frequency: ${radioFreq.toExponential(3)} Hz, Energy: ${radioEnergy.toExponential(3)} eV`,
    critical: false
  });

  // Test 3: Boundary wavelengths for visible spectrum
  const violetWavelength = 380e-9; // 380 nm
  const redWavelength = 700e-9; // 700 nm

  const violetEnergy = wavelengthToEnergyEV(violetWavelength);
  const redEnergy = wavelengthToEnergyEV(redWavelength);

  const visibleBoundaryTest = violetEnergy > redEnergy && violetEnergy > 3.0 && redEnergy < 2.0;
  tests.push({
    name: 'Visible Spectrum Boundaries',
    pass: visibleBoundaryTest,
    details: `Violet (380nm): ${violetEnergy.toFixed(3)} eV, Red (700nm): ${redEnergy.toFixed(3)} eV`,
    critical: true
  });
  
  // Test 4: Zero and negative value handling
  const zeroWavelengthFreq = wavelengthToFrequency(0);
  const negativeWavelengthFreq = wavelengthToFrequency(-1e-9);

  const invalidInputTest = isNaN(zeroWavelengthFreq) && isNaN(negativeWavelengthFreq);
  tests.push({
    name: 'Invalid Input Handling',
    pass: invalidInputTest,
    details: `Zero wavelength: ${zeroWavelengthFreq} (should be NaN), Negative wavelength: ${negativeWavelengthFreq} (should be NaN)`,
    critical: true
  });

  // Test 5: Extremely large frequency values
  const extremeFreq = 1e30; // 1e30 Hz
  const extremeWavelength = frequencyToWavelength(extremeFreq);
  const extremeEnergy = frequencyToEnergyEV(extremeFreq);

  const extremeFreqTest = isFinite(extremeWavelength) && isFinite(extremeEnergy) &&
                         extremeWavelength > 0 && extremeEnergy > 0;
  tests.push({
    name: 'Extreme Frequency Values',
    pass: extremeFreqTest,
    details: `Freq: ${extremeFreq.toExponential(3)} Hz → λ: ${extremeWavelength.toExponential(3)} m, E: ${extremeEnergy.toExponential(3)} eV`,
    critical: false
  });
  
  return tests;
}

// Test unit conversion accuracy across all supported units
export function runUnitConversionTests() {
  console.log('📏 Running Unit Conversion Accuracy Tests...');

  const tests = [];

  // Test wavelength unit conversions
  const testWavelengthM = 500e-9; // 500 nm in meters
  const expectedConversions = {
    nm: 500,
    μm: 0.5,
    mm: 0.0005,
    cm: 0.00005,
    m: 500e-9,
    km: 500e-12
  };

  // Test 1: Wavelength formatting with automatic unit selection
  const formattedWavelength = formatWavelength(testWavelengthM);
  const wavelengthFormatTest = formattedWavelength.includes('500') && formattedWavelength.includes('nm');
  tests.push({
    name: 'Wavelength Auto-formatting',
    pass: wavelengthFormatTest,
    details: `${testWavelengthM} m → ${formattedWavelength}`,
    critical: true
  });

  // Test 2: Frequency formatting across scales
  const testFrequencies = [
    { value: 1e3, expectedUnit: 'kHz' },
    { value: 1e6, expectedUnit: 'MHz' },
    { value: 1e9, expectedUnit: 'GHz' },
    { value: 1e12, expectedUnit: 'THz' },
    { value: 1e15, expectedUnit: 'PHz' }
  ];

  let frequencyFormatTest = true;
  let frequencyDetails = [];

  testFrequencies.forEach(({ value, expectedUnit }) => {
    const formatted = formatFrequency(value);
    const hasCorrectUnit = formatted.includes(expectedUnit);
    if (!hasCorrectUnit) frequencyFormatTest = false;
    frequencyDetails.push(`${value.toExponential(0)} Hz → ${formatted}`);
  });

  tests.push({
    name: 'Frequency Scale Formatting',
    pass: frequencyFormatTest,
    details: frequencyDetails.join(', '),
    critical: true
  });

  // Test 3: Energy formatting across scales
  const testEnergies = [
    { value: 0.001, expectedUnit: 'meV' },
    { value: 1, expectedUnit: 'eV' },
    { value: 1000, expectedUnit: 'keV' },
    { value: 1e6, expectedUnit: 'MeV' },
    { value: 1e9, expectedUnit: 'GeV' }
  ];

  let energyFormatTest = true;
  let energyDetails = [];

  testEnergies.forEach(({ value, expectedUnit }) => {
    const formatted = formatEnergy(value);
    const hasCorrectUnit = formatted.includes(expectedUnit);
    if (!hasCorrectUnit) energyFormatTest = false;
    energyDetails.push(`${value} eV → ${formatted}`);
  });

  tests.push({
    name: 'Energy Scale Formatting',
    pass: energyFormatTest,
    details: energyDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Comprehensive physics test runner
export function runPhysicsTests() {
  console.log('🔬 Running Comprehensive Physics Test Suite...\n');

  const constantsTests = runPhysicsConstantsTests();
  const calculationTests = runPhysicsCalculationTests();
  const edgeCaseTests = runEdgeCaseTests();
  const unitTests = runUnitConversionTests();

  const allTests = [...constantsTests, ...calculationTests, ...edgeCaseTests, ...unitTests];

  // Print detailed results
  console.log('\n=== Physics Test Results ===');
  let criticalFailures = 0;

  allTests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    const critical = test.critical ? ' [CRITICAL]' : '';
    console.log(`${index + 1}. ${test.name}: ${status}${critical}`);
    console.log(`   ${test.details}`);

    if (!test.pass && test.critical) {
      criticalFailures++;
    }
  });

  const passedTests = allTests.filter(test => test.pass).length;
  const criticalTests = allTests.filter(test => test.critical).length;
  const criticalPassed = allTests.filter(test => test.critical && test.pass).length;

  console.log(`\n📊 Physics Test Summary:`);
  console.log(`   Total Tests: ${allTests.length}`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${allTests.length - passedTests}`);
  console.log(`   Critical Tests: ${criticalPassed}/${criticalTests}`);
  console.log(`   Success Rate: ${((passedTests / allTests.length) * 100).toFixed(1)}%`);

  if (criticalFailures > 0) {
    console.log(`⚠️  ${criticalFailures} critical physics test(s) failed!`);
  }

  return {
    total: allTests.length,
    passed: passedTests,
    critical: criticalTests,
    criticalPassed: criticalPassed,
    tests: allTests
  };
}

// Test spectrum data integrity
export async function runSpectrumDataTests() {
  console.log('\nRunning Spectrum Data Tests...');

  const { SPECTRUM_REGIONS } = await import('../data/spectrumData.js');
  
  const tests = [];
  
  // Test 1: All regions have required properties
  const requiredProps = ['id', 'name', 'color', 'wavelengthMin', 'wavelengthMax', 'frequencyMin', 'frequencyMax'];
  const test1Pass = SPECTRUM_REGIONS.every(region => 
    requiredProps.every(prop => region.hasOwnProperty(prop))
  );
  tests.push({
    name: 'Region Properties Complete',
    pass: test1Pass,
    details: `All ${SPECTRUM_REGIONS.length} regions have required properties`
  });
  
  // Test 2: Wavelength ranges are consistent
  const test2Pass = SPECTRUM_REGIONS.every(region => 
    region.wavelengthMin < region.wavelengthMax
  );
  tests.push({
    name: 'Wavelength Range Consistency',
    pass: test2Pass,
    details: 'All regions have min < max wavelengths'
  });
  
  // Test 3: Frequency ranges are consistent
  const test3Pass = SPECTRUM_REGIONS.every(region => 
    region.frequencyMin < region.frequencyMax
  );
  tests.push({
    name: 'Frequency Range Consistency',
    pass: test3Pass,
    details: 'All regions have min < max frequencies'
  });
  
  // Test 4: Regions are ordered by wavelength
  let test4Pass = true;
  for (let i = 1; i < SPECTRUM_REGIONS.length; i++) {
    if (SPECTRUM_REGIONS[i].wavelengthMin < SPECTRUM_REGIONS[i-1].wavelengthMin) {
      test4Pass = false;
      break;
    }
  }
  tests.push({
    name: 'Region Ordering',
    pass: test4Pass,
    details: 'Regions are ordered by increasing wavelength'
  });
  
  // Print results
  console.log('\n=== Spectrum Data Test Results ===');
  tests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${index + 1}. ${test.name}: ${status}`);
    console.log(`   ${test.details}`);
  });
  
  const passedTests = tests.filter(test => test.pass).length;
  console.log(`\nSummary: ${passedTests}/${tests.length} tests passed`);
  
  return {
    total: tests.length,
    passed: passedTests,
    tests: tests
  };
}

// Run all tests
export async function runAllTests() {
  console.log('🧪 Starting Electromagnetic Spectrum Explorer Tests\n');

  const physicsResults = runPhysicsTests();
  const dataResults = await runSpectrumDataTests();

  // Import and run component tests
  let componentResults = { totalTests: 0, totalPassed: 0 };
  try {
    const { runAllComponentTests } = await import('./componentTests.js');
    componentResults = await runAllComponentTests();
  } catch (error) {
    console.warn('Component tests not available:', error.message);
  }

  const totalTests = physicsResults.total + dataResults.total + componentResults.totalTests;
  const totalPassed = physicsResults.passed + dataResults.passed + componentResults.totalPassed;

  console.log('\n🎯 Overall Test Summary');
  console.log(`Physics Tests: ${physicsResults.passed}/${physicsResults.total}`);
  console.log(`Data Tests: ${dataResults.passed}/${dataResults.total}`);
  console.log(`Component Tests: ${componentResults.totalPassed}/${componentResults.totalTests}`);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalTests - totalPassed}`);
  console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);

  if (totalPassed === totalTests) {
    console.log('🎉 All tests passed! The application is ready.');
  } else {
    console.log('⚠️  Some tests failed. Please review the results above.');
  }

  return {
    totalTests,
    totalPassed,
    successRate: (totalPassed / totalTests) * 100
  };
}

// Auto-run tests in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Run tests after a short delay to allow modules to load
  setTimeout(async () => {
    await runAllTests();
  }, 1000);
}
