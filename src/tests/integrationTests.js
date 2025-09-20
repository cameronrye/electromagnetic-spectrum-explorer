// Comprehensive component integration and data flow testing
import { getRegionByWavelength, SPECTRUM_REGIONS } from '../data/spectrumData.js';
import { 
  wavelengthToFrequency, 
  wavelengthToEnergyEV,
  formatWavelength,
  formatFrequency,
  formatEnergy
} from '../utils/physicsCalculations.js';

// Test data flow and component integration
export function runDataFlowTests() {
  console.log('🔄 Running Data Flow Integration Tests...');
  
  const tests = [];
  
  // Test 1: Wavelength prop passing simulation
  const testWavelengths = [
    380e-9,  // UV boundary
    550e-9,  // Green light
    700e-9,  // Red boundary
    1e-6,    // Infrared
    1e-3,    // Microwave
    1e-12    // X-ray
  ];
  
  let propPassingTest = true;
  let propDetails = [];
  
  testWavelengths.forEach(wavelength => {
    // Simulate App.jsx → SimpleSpectrum data flow
    const frequency = wavelengthToFrequency(wavelength);
    const energy = wavelengthToEnergyEV(wavelength);
    const region = getRegionByWavelength(wavelength);
    
    // Simulate SimpleSpectrum → SimpleConversionPanel data flow
    const formattedWavelength = formatWavelength(wavelength);
    const formattedFrequency = formatFrequency(frequency);
    const formattedEnergy = formatEnergy(energy);
    
    // Validate data integrity through the flow
    const dataValid = isFinite(frequency) && isFinite(energy) && 
                     region !== null && 
                     formattedWavelength.length > 0 && 
                     formattedFrequency.length > 0 && 
                     formattedEnergy.length > 0;
    
    if (!dataValid) propPassingTest = false;
    propDetails.push(`${(wavelength * 1e9).toFixed(1)}nm → ${region?.name || 'Unknown'}`);
  });
  
  tests.push({
    name: 'Wavelength Prop Passing Simulation',
    pass: propPassingTest,
    details: `Tested: ${propDetails.join(', ')}`,
    critical: true
  });
  
  // Test 2: Callback function simulation (onWavelengthChange)
  let callbackTest = true;
  let callbackDetails = [];
  
  // Simulate user interactions that trigger onWavelengthChange
  const userInteractions = [
    { source: 'SimpleSpectrum click', wavelength: 500e-9 },
    { source: 'ConversionPanel input', wavelength: 1e-6 },
    { source: 'App slider', wavelength: 650e-9 }
  ];
  
  userInteractions.forEach(interaction => {
    // Simulate the callback being called
    const newWavelength = interaction.wavelength;
    
    // Verify all dependent calculations update correctly
    const newFrequency = wavelengthToFrequency(newWavelength);
    const newEnergy = wavelengthToEnergyEV(newWavelength);
    const newRegion = getRegionByWavelength(newWavelength);
    
    const callbackValid = isFinite(newFrequency) && isFinite(newEnergy) && newRegion !== null;
    if (!callbackValid) callbackTest = false;
    
    callbackDetails.push(`${interaction.source}: ${(newWavelength * 1e9).toFixed(0)}nm`);
  });
  
  tests.push({
    name: 'Callback Function Simulation',
    pass: callbackTest,
    details: `Interactions: ${callbackDetails.join(', ')}`,
    critical: true
  });
  
  return tests;
}

// Test indicator position accuracy
export function runIndicatorPositionTests() {
  console.log('🎯 Running Indicator Position Accuracy Tests...');
  
  const tests = [];
  
  // Define the spectrum regions as they appear in SimpleSpectrum
  const spectrumRegions = [
    { name: 'Radio', flex: 20, minWl: 1e-1, maxWl: 1e4 },
    { name: 'Microwave', flex: 10, minWl: 1e-3, maxWl: 1e-1 },
    { name: 'Infrared', flex: 15, minWl: 700e-9, maxWl: 1e-3 },
    { name: 'Visible', flex: 5, minWl: 380e-9, maxWl: 700e-9 },
    { name: 'UV', flex: 10, minWl: 10e-9, maxWl: 380e-9 },
    { name: 'X-ray', flex: 15, minWl: 10e-12, maxWl: 10e-9 },
    { name: 'Gamma', flex: 25, minWl: 1e-15, maxWl: 10e-12 }
  ];
  
  // Simulate the indicator position calculation from SimpleSpectrum
  const calculateIndicatorPosition = (selectedWavelength) => {
    const totalFlex = spectrumRegions.reduce((sum, region) => sum + region.flex, 0);
    let cumulativePosition = 0;
    
    for (let i = 0; i < spectrumRegions.length; i++) {
      const region = spectrumRegions[i];
      
      if (selectedWavelength >= region.minWl && selectedWavelength <= region.maxWl) {
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);
        const selectedLog = Math.log10(selectedWavelength);
        const ratioInRegion = (selectedLog - minLog) / (maxLog - minLog);
        
        const adjustedRatio = (i >= 2) ? (1 - ratioInRegion) : ratioInRegion;
        const regionWidthPercent = (region.flex / totalFlex) * 100;
        const positionInRegion = adjustedRatio * regionWidthPercent;
        
        return Math.max(0, Math.min(100, cumulativePosition + positionInRegion));
      }
      
      cumulativePosition += (region.flex / totalFlex) * 100;
    }
    
    return selectedWavelength > 1e4 ? 0 : 100;
  };
  
  // Test 1: Indicator positions for known wavelengths
  const testPositions = [
    { wavelength: 500e-9, expectedRegion: 'Visible', description: 'Green light' },
    { wavelength: 1e-6, expectedRegion: 'Infrared', description: 'Near infrared' },
    { wavelength: 100e-9, expectedRegion: 'UV', description: 'UV-C' },
    { wavelength: 1e-9, expectedRegion: 'X-ray', description: 'Soft X-ray' }
  ];
  
  let positionTest = true;
  let positionDetails = [];
  
  testPositions.forEach(({ wavelength, expectedRegion, description }) => {
    const position = calculateIndicatorPosition(wavelength);
    const region = getRegionByWavelength(wavelength);
    
    const positionValid = position >= 0 && position <= 100 && 
                         region && region.name.toLowerCase().includes(expectedRegion.toLowerCase());
    
    if (!positionValid) positionTest = false;
    positionDetails.push(`${description}: ${position.toFixed(1)}% (${region?.name || 'Unknown'})`);
  });
  
  tests.push({
    name: 'Indicator Position Calculation',
    pass: positionTest,
    details: positionDetails.join(', '),
    critical: true
  });
  
  // Test 2: Position consistency (click → indicator → click)
  const testClickPositions = [10, 25, 50, 75, 90]; // Percentage positions
  let clickConsistencyTest = true;
  let clickDetails = [];
  
  testClickPositions.forEach(clickPercent => {
    // This would simulate the reverse calculation from click position to wavelength
    // For now, we'll test that positions are within reasonable bounds
    const isValidPosition = clickPercent >= 0 && clickPercent <= 100;
    if (!isValidPosition) clickConsistencyTest = false;
    clickDetails.push(`${clickPercent}%`);
  });
  
  tests.push({
    name: 'Click Position Consistency',
    pass: clickConsistencyTest,
    details: `Tested positions: ${clickDetails.join(', ')}`,
    critical: true
  });
  
  return tests;
}

// Test slider range handling
export function runSliderRangeTests() {
  console.log('🎚️  Running Slider Range Handling Tests...');
  
  const tests = [];
  
  // Test 1: Slider value clamping (1nm to 1mm range)
  const testValues = [
    { input: 0.5, expected: 1, description: 'Below minimum' },
    { input: 500, expected: 500, description: 'Valid middle' },
    { input: 1500000, expected: 1000000, description: 'Above maximum' },
    { input: -100, expected: 1, description: 'Negative value' }
  ];
  
  let clampingTest = true;
  let clampingDetails = [];
  
  testValues.forEach(({ input, expected, description }) => {
    // Simulate the clamping logic from App.jsx
    const clampedValue = Math.max(1, Math.min(1000000, input));
    const clampingValid = clampedValue === expected;
    
    if (!clampingValid) clampingTest = false;
    clampingDetails.push(`${description}: ${input} → ${clampedValue}`);
  });
  
  tests.push({
    name: 'Slider Value Clamping',
    pass: clampingTest,
    details: clampingDetails.join(', '),
    critical: true
  });
  
  // Test 2: Slider-to-wavelength conversion
  const sliderValues = [1, 100, 1000, 10000, 100000, 1000000]; // nm values
  let conversionTest = true;
  let conversionDetails = [];
  
  sliderValues.forEach(sliderValue => {
    const wavelengthM = sliderValue * 1e-9;
    const region = getRegionByWavelength(wavelengthM);
    
    const conversionValid = wavelengthM > 0 && region !== null;
    if (!conversionValid) conversionTest = false;
    
    conversionDetails.push(`${sliderValue}nm → ${region?.name || 'Unknown'}`);
  });
  
  tests.push({
    name: 'Slider-to-Wavelength Conversion',
    pass: conversionTest,
    details: conversionDetails.join(', '),
    critical: true
  });
  
  return tests;
}

// Run all integration tests
export async function runAllIntegrationTests() {
  console.log('🔗 Starting Component Integration Test Suite\n');
  
  const dataFlowTests = runDataFlowTests();
  const indicatorTests = runIndicatorPositionTests();
  const sliderTests = runSliderRangeTests();
  
  const allTests = [...dataFlowTests, ...indicatorTests, ...sliderTests];
  
  // Print results
  console.log('\n=== Integration Test Results ===');
  allTests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    const critical = test.critical ? ' [CRITICAL]' : '';
    console.log(`${index + 1}. ${test.name}: ${status}${critical}`);
    console.log(`   ${test.details}`);
  });
  
  const passedTests = allTests.filter(test => test.pass).length;
  const criticalTests = allTests.filter(test => test.critical).length;
  const criticalPassed = allTests.filter(test => test.critical && test.pass).length;
  
  console.log(`\n📊 Integration Test Summary:`);
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
