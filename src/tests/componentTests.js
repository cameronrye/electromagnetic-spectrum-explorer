// Component integration tests for the Electromagnetic Spectrum Explorer
import { 
  wavelengthToFrequency, 
  wavelengthToEnergyEV,
  formatWavelength,
  formatFrequency,
  formatEnergy,
  getLogPosition,
  getValueFromLogPosition
} from '../utils/physicsCalculations.js';

import {
  convertWavelength,
  // convertFrequency,
  // convertEnergy,
  getBestWavelengthUnit,
  // getBestFrequencyUnit,
  // getBestEnergyUnit
} from '../utils/unitConversions.js';

import { getRegionByWavelength } from '../data/spectrumData.js';

// Test utility functions
export function runUtilityTests() {
  console.log('\nRunning Utility Function Tests...');
  
  const tests = [];
  
  // Test 1: Log position calculations
  const testValue = 1e-6; // 1 micrometer
  const min = 1e-9;
  const max = 1e-3;
  const position = getLogPosition(testValue, min, max);
  const retrievedValue = getValueFromLogPosition(position, min, max);
  
  const test1Pass = Math.abs(testValue - retrievedValue) / testValue < 0.001; // 0.1% tolerance
  tests.push({
    name: 'Log Position Calculations',
    pass: test1Pass,
    details: `Original: ${testValue}, Retrieved: ${retrievedValue}, Position: ${position}`
  });
  
  // Test 2: Unit conversions
  const wavelengthInNm = 500;
  const wavelengthInM = convertWavelength(wavelengthInNm, 'nm', 'm');
  const expectedInM = 500e-9;
  
  const test2Pass = Math.abs(wavelengthInM - expectedInM) < 1e-12;
  tests.push({
    name: 'Wavelength Unit Conversion',
    pass: test2Pass,
    details: `${wavelengthInNm} nm = ${wavelengthInM} m (expected: ${expectedInM})`
  });
  
  // Test 3: Best unit selection
  const bestUnit = getBestWavelengthUnit(500e-9);
  const test3Pass = bestUnit.unit === 'nm' && Math.abs(bestUnit.value - 500) < 0.1;
  tests.push({
    name: 'Best Unit Selection',
    pass: test3Pass,
    details: `500e-9 m -> ${bestUnit.value} ${bestUnit.unit}`
  });
  
  // Test 4: Region detection
  const visibleRegion = getRegionByWavelength(550e-9);
  const test4Pass = visibleRegion && visibleRegion.id === 'visible';
  tests.push({
    name: 'Region Detection',
    pass: test4Pass,
    details: `550 nm -> ${visibleRegion ? visibleRegion.name : 'null'}`
  });
  
  // Test 5: Edge case handling
  const invalidRegion = getRegionByWavelength(-1);
  const test5Pass = invalidRegion === null;
  tests.push({
    name: 'Invalid Input Handling',
    pass: test5Pass,
    details: `Negative wavelength -> ${invalidRegion}`
  });
  
  // Print results
  console.log('\n=== Utility Test Results ===');
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

// Test error handling and edge cases
export function runErrorHandlingTests() {
  console.log('\nRunning Error Handling Tests...');
  
  const tests = [];
  
  // Test 1: Invalid wavelength conversions
  let test1Pass = true;
  try {
    const result = wavelengthToFrequency(0);
    test1Pass = !isFinite(result) || result === Infinity;
  } catch {
    test1Pass = true; // Expected to throw or return invalid result
  }
  tests.push({
    name: 'Zero Wavelength Handling',
    pass: test1Pass,
    details: 'Zero wavelength handled appropriately'
  });
  
  // Test 2: Negative values
  let test2Pass = true;
  try {
    const result = wavelengthToEnergyEV(-1e-9);
    test2Pass = !isFinite(result) || result <= 0;
  } catch {
    test2Pass = true;
  }
  tests.push({
    name: 'Negative Wavelength Handling',
    pass: test2Pass,
    details: 'Negative wavelength handled appropriately'
  });
  
  // Test 3: Extremely large values
  let test3Pass = true;
  try {
    const result = wavelengthToFrequency(1e20);
    test3Pass = isFinite(result) && result > 0;
  } catch {
    test3Pass = false;
  }
  tests.push({
    name: 'Large Value Handling',
    pass: test3Pass,
    details: 'Large wavelength values handled correctly'
  });
  
  // Test 4: NaN inputs
  let test4Pass = true;
  try {
    const result = formatWavelength(NaN);
    test4Pass = typeof result === 'string' && result.includes('Invalid');
  } catch {
    test4Pass = true; // Expected to handle gracefully
  }
  tests.push({
    name: 'NaN Input Handling',
    pass: test4Pass,
    details: 'NaN inputs handled gracefully'
  });
  
  // Test 5: Unit conversion edge cases
  let test5Pass = true;
  try {
    const result = convertWavelength(0, 'nm', 'm');
    test5Pass = result === 0;
  } catch {
    test5Pass = false;
  }
  tests.push({
    name: 'Zero Unit Conversion',
    pass: test5Pass,
    details: 'Zero value unit conversion works correctly'
  });
  
  // Print results
  console.log('\n=== Error Handling Test Results ===');
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

// Test performance and memory usage
export function runPerformanceTests() {
  console.log('\nRunning Performance Tests...');
  
  const tests = [];
  
  // Test 1: Conversion speed
  const startTime = performance.now();
  for (let i = 0; i < 10000; i++) {
    wavelengthToFrequency(Math.random() * 1e-6 + 1e-9);
  }
  const endTime = performance.now();
  const conversionTime = endTime - startTime;
  
  const test1Pass = conversionTime < 100; // Should complete in under 100ms
  tests.push({
    name: 'Conversion Performance',
    pass: test1Pass,
    details: `10,000 conversions in ${conversionTime.toFixed(2)}ms`
  });
  
  // Test 2: Formatting speed
  const formatStartTime = performance.now();
  for (let i = 0; i < 1000; i++) {
    formatWavelength(Math.random() * 1e-6 + 1e-9);
    formatFrequency(Math.random() * 1e15 + 1e12);
    formatEnergy(Math.random() * 10 + 0.1);
  }
  const formatEndTime = performance.now();
  const formatTime = formatEndTime - formatStartTime;
  
  const test2Pass = formatTime < 50; // Should complete in under 50ms
  tests.push({
    name: 'Formatting Performance',
    pass: test2Pass,
    details: `3,000 format operations in ${formatTime.toFixed(2)}ms`
  });
  
  // Test 3: Memory usage (basic check)
  const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  const largeArray = [];
  for (let i = 0; i < 1000; i++) {
    largeArray.push({
      wavelength: Math.random() * 1e-6,
      frequency: wavelengthToFrequency(Math.random() * 1e-6),
      energy: wavelengthToEnergyEV(Math.random() * 1e-6)
    });
  }
  const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  const memoryIncrease = finalMemory - initialMemory;
  
  const test3Pass = !performance.memory || memoryIncrease < 10 * 1024 * 1024; // Less than 10MB
  tests.push({
    name: 'Memory Usage',
    pass: test3Pass,
    details: performance.memory ? 
      `Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB` : 
      'Memory monitoring not available'
  });
  
  // Print results
  console.log('\n=== Performance Test Results ===');
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

// Run all component tests
export async function runAllComponentTests() {
  console.log('🔧 Starting Component and Integration Tests\n');
  
  const utilityResults = runUtilityTests();
  const errorResults = runErrorHandlingTests();
  const performanceResults = runPerformanceTests();
  
  const totalTests = utilityResults.total + errorResults.total + performanceResults.total;
  const totalPassed = utilityResults.passed + errorResults.passed + performanceResults.passed;
  
  console.log('\n🎯 Component Test Summary');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalTests - totalPassed}`);
  console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
  
  return {
    totalTests,
    totalPassed,
    successRate: (totalPassed / totalTests) * 100
  };
}
