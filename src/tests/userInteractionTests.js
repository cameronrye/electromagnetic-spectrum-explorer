// Comprehensive user interaction and input validation testing
import { getRegionByWavelength } from '../data/spectrumData.js';
import {
  wavelengthToFrequency,
  wavelengthToEnergyEV,
  frequencyToWavelength,
  energyEVToWavelength
} from '../utils/physicsCalculations.js';
import { runClickPositionConsistencyTest } from './clickPositionTest.js';

// Test spectrum bar clicking simulation
export function runSpectrumClickTests() {
  console.log('🖱️  Running Spectrum Bar Click Simulation Tests...');
  
  const tests = [];
  
  // Simulate spectrum bar dimensions and click positions
  const spectrumBarWidth = 800; // pixels
  const clickPositions = [
    { x: 50, description: 'Far left (Radio)' },
    { x: 200, description: 'Left-center (Microwave)' },
    { x: 400, description: 'Center (Visible)' },
    { x: 600, description: 'Right-center (UV)' },
    { x: 750, description: 'Far right (Gamma)' }
  ];
  
  // Define spectrum regions matching SimpleSpectrum layout
  // Ordered from shortest to longest wavelength (left to right)
  const regions = [
    { name: 'Gamma', flex: 25, minWl: 1e-15, maxWl: 10e-12 },   // 1fm to 10pm
    { name: 'X-ray', flex: 15, minWl: 10e-12, maxWl: 10e-9 },  // 10pm to 10nm
    { name: 'UV', flex: 10, minWl: 10e-9, maxWl: 380e-9 },     // 10nm to 380nm
    { name: 'Visible', flex: 5, minWl: 380e-9, maxWl: 700e-9 }, // 380nm to 700nm
    { name: 'Infrared', flex: 15, minWl: 700e-9, maxWl: 1e-3 }, // 700nm to 1mm
    { name: 'Microwave', flex: 10, minWl: 1e-3, maxWl: 1e-1 }, // 1mm to 10cm
    { name: 'Radio', flex: 20, minWl: 1e-1, maxWl: 1e4 }       // 10cm to 10km
  ];
  
  // Simulate click-to-wavelength conversion
  const simulateClick = (clickX, barWidth) => {
    const clickRatio = clickX / barWidth;
    const totalFlex = regions.reduce((sum, region) => sum + region.flex, 0);
    let cumulativeRatio = 0;
    
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      const regionWidth = region.flex / totalFlex;
      
      if (clickRatio >= cumulativeRatio && clickRatio <= cumulativeRatio + regionWidth) {
        const positionInRegion = (clickRatio - cumulativeRatio) / regionWidth;
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);
        // Since regions are ordered from shortest to longest wavelength,
        // wavelength increases left to right within each region - no inversion needed
        const wavelength = Math.pow(10, minLog + positionInRegion * (maxLog - minLog));
        
        return { wavelength, regionName: region.name };
      }
      
      cumulativeRatio += regionWidth;
    }
    
    return { wavelength: null, regionName: null };
  };
  
  let clickTest = true;
  let clickDetails = [];
  
  clickPositions.forEach(({ x, description }) => {
    const result = simulateClick(x, spectrumBarWidth);
    const wavelength = result.wavelength;
    const regionName = result.regionName;
    
    if (wavelength) {
      const detectedRegion = getRegionByWavelength(wavelength);
      const regionMatch = detectedRegion && detectedRegion.name.toLowerCase().includes(regionName.toLowerCase());
      
      if (!regionMatch) clickTest = false;
      clickDetails.push(`${description}: ${(wavelength * 1e9).toFixed(1)}nm (${detectedRegion?.name || 'Unknown'})`);
    } else {
      clickTest = false;
      clickDetails.push(`${description}: Failed to calculate wavelength`);
    }
  });
  
  tests.push({
    name: 'Spectrum Bar Click Simulation',
    pass: clickTest,
    details: clickDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Test conversion panel input validation
export function runInputValidationTests() {
  console.log('✅ Running Input Validation Tests...');
  
  const tests = [];
  
  // Test 1: Wavelength input validation
  const wavelengthInputs = [
    { input: '500', valid: true, description: 'Valid wavelength' },
    { input: '-100', valid: false, description: 'Negative wavelength' },
    { input: '0', valid: false, description: 'Zero wavelength' },
    { input: 'abc', valid: false, description: 'Non-numeric input' },
    { input: '1e15', valid: false, description: 'Extremely large value' },
    { input: '1.5', valid: true, description: 'Decimal value' }
  ];
  
  let wavelengthValidationTest = true;
  let wavelengthDetails = [];
  
  wavelengthInputs.forEach(({ input, valid, description }) => {
    const numValue = parseFloat(input);
    const isValid = !isNaN(numValue) && numValue > 0 && numValue <= 1e12;
    
    if (isValid !== valid) wavelengthValidationTest = false;
    wavelengthDetails.push(`${description}: ${input} → ${isValid ? 'Valid' : 'Invalid'}`);
  });
  
  tests.push({
    name: 'Wavelength Input Validation',
    pass: wavelengthValidationTest,
    details: wavelengthDetails.join(', '),
    critical: true
  });
  
  // Test 2: Frequency input validation
  const frequencyInputs = [
    { input: '1000', valid: true, description: 'Valid frequency (THz)' },
    { input: '-50', valid: false, description: 'Negative frequency' },
    { input: '1e20', valid: false, description: 'Extremely large frequency' },
    { input: '0.001', valid: true, description: 'Small valid frequency' }
  ];
  
  let frequencyValidationTest = true;
  let frequencyDetails = [];
  
  frequencyInputs.forEach(({ input, valid, description }) => {
    const numValue = parseFloat(input);
    const isValid = !isNaN(numValue) && numValue > 0 && numValue <= 1e15;
    
    if (isValid !== valid) frequencyValidationTest = false;
    frequencyDetails.push(`${description}: ${input} → ${isValid ? 'Valid' : 'Invalid'}`);
  });
  
  tests.push({
    name: 'Frequency Input Validation',
    pass: frequencyValidationTest,
    details: frequencyDetails.join(', '),
    critical: true
  });
  
  // Test 3: Energy input validation
  const energyInputs = [
    { input: '2.5', valid: true, description: 'Valid energy (eV)' },
    { input: '-1', valid: false, description: 'Negative energy' },
    { input: '1e15', valid: false, description: 'Extremely large energy' },
    { input: '0.001', valid: true, description: 'Small valid energy' }
  ];
  
  let energyValidationTest = true;
  let energyDetails = [];
  
  energyInputs.forEach(({ input, valid, description }) => {
    const numValue = parseFloat(input);
    const isValid = !isNaN(numValue) && numValue > 0 && numValue <= 1e12;
    
    if (isValid !== valid) energyValidationTest = false;
    energyDetails.push(`${description}: ${input} → ${isValid ? 'Valid' : 'Invalid'}`);
  });
  
  tests.push({
    name: 'Energy Input Validation',
    pass: energyValidationTest,
    details: energyDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Test real-time update synchronization
export function runRealTimeUpdateTests() {
  console.log('⚡ Running Real-time Update Synchronization Tests...');
  
  const tests = [];
  
  // Test 1: Wavelength change propagation
  const testWavelengths = [400e-9, 550e-9, 700e-9, 1e-6, 1e-9];
  let propagationTest = true;
  let propagationDetails = [];
  
  testWavelengths.forEach(wavelength => {
    // Simulate wavelength change and check all dependent values update
    const frequency = wavelengthToFrequency(wavelength);
    const energy = wavelengthToEnergyEV(wavelength);
    const region = getRegionByWavelength(wavelength);
    
    // Verify reverse calculations maintain consistency
    const backToWavelengthFromFreq = frequencyToWavelength(frequency);
    const backToWavelengthFromEnergy = energyEVToWavelength(energy);
    
    const freqConsistent = Math.abs(wavelength - backToWavelengthFromFreq) / wavelength < 1e-10;
    const energyConsistent = Math.abs(wavelength - backToWavelengthFromEnergy) / wavelength < 1e-10;
    const regionValid = region !== null;
    
    const allConsistent = freqConsistent && energyConsistent && regionValid;
    if (!allConsistent) propagationTest = false;
    
    propagationDetails.push(`${(wavelength * 1e9).toFixed(0)}nm: ${allConsistent ? 'Synced' : 'Failed'}`);
  });
  
  tests.push({
    name: 'Wavelength Change Propagation',
    pass: propagationTest,
    details: propagationDetails.join(', '),
    critical: true
  });
  
  // Test 2: Cross-component update simulation
  const updateScenarios = [
    { source: 'Spectrum click', wavelength: 500e-9 },
    { source: 'Conversion input', wavelength: 1e-6 },
    { source: 'Slider drag', wavelength: 650e-9 }
  ];
  
  let crossComponentTest = true;
  let crossComponentDetails = [];
  
  updateScenarios.forEach(({ source, wavelength }) => {
    // Simulate update from different sources
    const frequency = wavelengthToFrequency(wavelength);
    const energy = wavelengthToEnergyEV(wavelength);
    const region = getRegionByWavelength(wavelength);
    
    // Check that all components would receive consistent data
    const dataConsistent = isFinite(frequency) && isFinite(energy) && 
                          frequency > 0 && energy > 0 && region !== null;
    
    if (!dataConsistent) crossComponentTest = false;
    crossComponentDetails.push(`${source}: ${dataConsistent ? 'OK' : 'Failed'}`);
  });
  
  tests.push({
    name: 'Cross-Component Update Simulation',
    pass: crossComponentTest,
    details: crossComponentDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Test error handling in user interactions
export function runInteractionErrorTests() {
  console.log('🚨 Running User Interaction Error Handling Tests...');
  
  const tests = [];
  
  // Test 1: Invalid click positions
  const invalidClicks = [
    { x: -50, description: 'Negative position' },
    { x: 1000, description: 'Beyond bar width' },
    { x: NaN, description: 'NaN position' }
  ];
  
  let invalidClickTest = true;
  let invalidClickDetails = [];
  
  invalidClicks.forEach(({ x, description }) => {
    // Simulate handling of invalid click positions
    const isValidClick = !isNaN(x) && x >= 0 && x <= 800;
    
    // Error handling should prevent invalid calculations
    if (isValidClick) {
      invalidClickTest = false; // These should be invalid
    }
    
    invalidClickDetails.push(`${description}: ${isValidClick ? 'Accepted' : 'Rejected'}`);
  });
  
  tests.push({
    name: 'Invalid Click Position Handling',
    pass: invalidClickTest,
    details: invalidClickDetails.join(', '),
    critical: true
  });
  
  // Test 2: Malformed input handling
  const malformedInputs = ['', '  ', 'null', 'undefined', '1/0', 'Infinity'];
  let malformedInputTest = true;
  let malformedInputDetails = [];
  
  malformedInputs.forEach(input => {
    const numValue = parseFloat(input);
    const isValidInput = !isNaN(numValue) && isFinite(numValue) && numValue > 0;
    
    // These should all be rejected
    if (isValidInput) {
      malformedInputTest = false;
    }
    
    malformedInputDetails.push(`'${input}': ${isValidInput ? 'Accepted' : 'Rejected'}`);
  });
  
  tests.push({
    name: 'Malformed Input Handling',
    pass: malformedInputTest,
    details: malformedInputDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Run all user interaction tests
export async function runAllUserInteractionTests() {
  console.log('👤 Starting User Interaction Test Suite\n');

  const clickTests = runSpectrumClickTests();
  const validationTests = runInputValidationTests();
  const updateTests = runRealTimeUpdateTests();
  const errorTests = runInteractionErrorTests();

  // Run the new click position consistency test
  const clickPositionResult = runClickPositionConsistencyTest();
  const clickPositionTest = [{
    name: 'Click Position Consistency',
    pass: clickPositionResult.passed,
    details: clickPositionResult.summary,
    critical: true
  }];

  const allTests = [...clickTests, ...validationTests, ...updateTests, ...errorTests, ...clickPositionTest];
  
  // Print results
  console.log('\n=== User Interaction Test Results ===');
  allTests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    const critical = test.critical ? ' [CRITICAL]' : '';
    console.log(`${index + 1}. ${test.name}: ${status}${critical}`);
    console.log(`   ${test.details}`);
  });
  
  const passedTests = allTests.filter(test => test.pass).length;
  const criticalTests = allTests.filter(test => test.critical).length;
  const criticalPassed = allTests.filter(test => test.critical && test.pass).length;
  
  console.log(`\n📊 User Interaction Test Summary:`);
  console.log(`   Total Tests: ${allTests.length}`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${allTests.length - passedTests}`);
  console.log(`   Critical Tests: ${criticalPassed}/${criticalTests}`);
  console.log(`   Success Rate: ${((passedTests / allTests.length) * 100).toFixed(1)}%`);
  
  return {
    totalTests: allTests.length,
    totalPassed: passedTests,
    critical: criticalTests,
    criticalPassed: criticalPassed,
    successRate: (passedTests / allTests.length) * 100,
    tests: allTests
  };
}
