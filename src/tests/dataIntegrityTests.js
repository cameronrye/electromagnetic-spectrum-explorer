// Comprehensive data integrity and spectrum data validation testing
import { SPECTRUM_REGIONS, getRegionByWavelength, PHYSICS_CONSTANTS } from '../data/spectrumData.js';
import { wavelengthToFrequency, wavelengthToEnergyEV } from '../utils/physicsCalculations.js';

// Test spectrum region data consistency
export function runSpectrumDataConsistencyTests() {
  console.log('📊 Running Spectrum Data Consistency Tests...');
  
  const tests = [];
  
  // Test 1: All regions have required properties
  const requiredProps = ['id', 'name', 'color', 'wavelengthMin', 'wavelengthMax', 'frequencyMin', 'frequencyMax'];
  let propertiesTest = true;
  let missingProps = [];
  
  SPECTRUM_REGIONS.forEach((region, index) => {
    requiredProps.forEach(prop => {
      if (!region.hasOwnProperty(prop) || region[prop] === null || region[prop] === undefined) {
        propertiesTest = false;
        missingProps.push(`Region ${index} (${region.name || 'Unknown'}): missing ${prop}`);
      }
    });
  });
  
  tests.push({
    name: 'Required Properties Complete',
    pass: propertiesTest,
    details: propertiesTest ? `All ${SPECTRUM_REGIONS.length} regions have required properties` : missingProps.join(', '),
    critical: true
  });
  
  // Test 2: Wavelength ranges are physically consistent
  let wavelengthConsistencyTest = true;
  let wavelengthIssues = [];
  
  SPECTRUM_REGIONS.forEach(region => {
    if (region.wavelengthMin >= region.wavelengthMax) {
      wavelengthConsistencyTest = false;
      wavelengthIssues.push(`${region.name}: min (${region.wavelengthMin}) >= max (${region.wavelengthMax})`);
    }
    
    if (region.wavelengthMin <= 0 || region.wavelengthMax <= 0) {
      wavelengthConsistencyTest = false;
      wavelengthIssues.push(`${region.name}: non-positive wavelength values`);
    }
  });
  
  tests.push({
    name: 'Wavelength Range Consistency',
    pass: wavelengthConsistencyTest,
    details: wavelengthConsistencyTest ? 'All wavelength ranges are valid' : wavelengthIssues.join(', '),
    critical: true
  });
  
  // Test 3: Frequency ranges are physically consistent
  let frequencyConsistencyTest = true;
  let frequencyIssues = [];
  
  SPECTRUM_REGIONS.forEach(region => {
    if (region.frequencyMin >= region.frequencyMax) {
      frequencyConsistencyTest = false;
      frequencyIssues.push(`${region.name}: min (${region.frequencyMin}) >= max (${region.frequencyMax})`);
    }
    
    if (region.frequencyMin <= 0 || region.frequencyMax <= 0) {
      frequencyConsistencyTest = false;
      frequencyIssues.push(`${region.name}: non-positive frequency values`);
    }
  });
  
  tests.push({
    name: 'Frequency Range Consistency',
    pass: frequencyConsistencyTest,
    details: frequencyConsistencyTest ? 'All frequency ranges are valid' : frequencyIssues.join(', '),
    critical: true
  });
  
  // Test 4: Wavelength-frequency relationship consistency (c = λf)
  let relationshipTest = true;
  let relationshipIssues = [];
  
  SPECTRUM_REGIONS.forEach(region => {
    // Check if wavelength and frequency ranges are consistent with c = λf
    const calculatedFreqMin = PHYSICS_CONSTANTS.SPEED_OF_LIGHT / region.wavelengthMax;
    const calculatedFreqMax = PHYSICS_CONSTANTS.SPEED_OF_LIGHT / region.wavelengthMin;
    
    const freqMinError = Math.abs(calculatedFreqMin - region.frequencyMin) / region.frequencyMin;
    const freqMaxError = Math.abs(calculatedFreqMax - region.frequencyMax) / region.frequencyMax;
    
    if (freqMinError > 0.1 || freqMaxError > 0.1) { // Allow 10% tolerance
      relationshipTest = false;
      relationshipIssues.push(`${region.name}: wavelength-frequency relationship error (${(freqMinError * 100).toFixed(1)}%, ${(freqMaxError * 100).toFixed(1)}%)`);
    }
  });
  
  tests.push({
    name: 'Wavelength-Frequency Relationship',
    pass: relationshipTest,
    details: relationshipTest ? 'All regions satisfy c = λf relationship' : relationshipIssues.join(', '),
    critical: true
  });
  
  return tests;
}

// Test region detection accuracy
export function runRegionDetectionTests() {
  console.log('🎯 Running Region Detection Accuracy Tests...');
  
  const tests = [];
  
  // Test 1: Known wavelength classifications
  const knownWavelengths = [
    { wavelength: 380e-9, expectedRegion: 'visible', description: 'Violet boundary' },
    { wavelength: 550e-9, expectedRegion: 'visible', description: 'Green light' },
    { wavelength: 700e-9, expectedRegion: 'visible', description: 'Red boundary' },
    { wavelength: 1e-6, expectedRegion: 'infrared', description: 'Near infrared' },
    { wavelength: 1e-3, expectedRegion: 'microwave', description: 'Microwave boundary' },
    { wavelength: 100e-9, expectedRegion: 'ultraviolet', description: 'UV-C' },
    { wavelength: 1e-9, expectedRegion: 'x-ray', description: 'Soft X-ray' },
    { wavelength: 1e-12, expectedRegion: 'gamma', description: 'Gamma ray' }
  ];
  
  let detectionTest = true;
  let detectionDetails = [];
  
  knownWavelengths.forEach(({ wavelength, expectedRegion, description }) => {
    const region = getRegionByWavelength(wavelength);
    const regionMatch = region && region.id.toLowerCase().includes(expectedRegion.toLowerCase());
    
    if (!regionMatch) detectionTest = false;
    detectionDetails.push(`${description}: ${region?.name || 'Unknown'} (${regionMatch ? 'Correct' : 'Wrong'})`);
  });
  
  tests.push({
    name: 'Known Wavelength Classification',
    pass: detectionTest,
    details: detectionDetails.join(', '),
    critical: true
  });
  
  // Test 2: Boundary condition handling
  const boundaryTests = [
    { wavelength: 0, description: 'Zero wavelength' },
    { wavelength: -1e-9, description: 'Negative wavelength' },
    { wavelength: 1e20, description: 'Extremely large wavelength' },
    { wavelength: 1e-20, description: 'Extremely small wavelength' }
  ];
  
  let boundaryTest = true;
  let boundaryDetails = [];
  
  boundaryTests.forEach(({ wavelength, description }) => {
    const region = getRegionByWavelength(wavelength);
    
    // Invalid wavelengths should return null or handle gracefully
    if (wavelength <= 0) {
      const handledCorrectly = region === null;
      if (!handledCorrectly) boundaryTest = false;
      boundaryDetails.push(`${description}: ${handledCorrectly ? 'Handled correctly' : 'Not handled'}`);
    } else {
      // Very large/small but positive wavelengths should either find a region or return null gracefully
      const handledGracefully = region === null || (region && region.name);
      if (!handledGracefully) boundaryTest = false;
      boundaryDetails.push(`${description}: ${handledGracefully ? 'Handled gracefully' : 'Error'}`);
    }
  });
  
  tests.push({
    name: 'Boundary Condition Handling',
    pass: boundaryTest,
    details: boundaryDetails.join(', '),
    critical: true
  });
  
  // Test 3: Region coverage completeness
  const testWavelengths = [];
  for (let exp = -15; exp <= 6; exp++) {
    testWavelengths.push(Math.pow(10, exp)); // 1e-15 to 1e6 meters
  }
  
  let coverageTest = true;
  let uncoveredWavelengths = [];
  
  testWavelengths.forEach(wavelength => {
    const region = getRegionByWavelength(wavelength);
    if (!region && wavelength > 0) {
      coverageTest = false;
      uncoveredWavelengths.push(`${wavelength.toExponential(0)}m`);
    }
  });
  
  tests.push({
    name: 'Spectrum Coverage Completeness',
    pass: coverageTest,
    details: coverageTest ? 'All test wavelengths covered' : `Uncovered: ${uncoveredWavelengths.join(', ')}`,
    critical: false
  });
  
  return tests;
}

// Test educational content mapping
export function runEducationalContentTests() {
  console.log('📚 Running Educational Content Mapping Tests...');
  
  const tests = [];
  
  // Test 1: All regions have educational content
  let educationalContentTest = true;
  let contentIssues = [];
  
  SPECTRUM_REGIONS.forEach(region => {
    const hasDescription = region.description && region.description.length > 0;
    const hasExamples = region.examples && Array.isArray(region.examples) && region.examples.length > 0;
    const hasApplications = region.applications && Array.isArray(region.applications) && region.applications.length > 0;
    
    if (!hasDescription) {
      educationalContentTest = false;
      contentIssues.push(`${region.name}: missing description`);
    }
    
    if (!hasExamples) {
      educationalContentTest = false;
      contentIssues.push(`${region.name}: missing examples`);
    }
    
    if (!hasApplications) {
      educationalContentTest = false;
      contentIssues.push(`${region.name}: missing applications`);
    }
  });
  
  tests.push({
    name: 'Educational Content Completeness',
    pass: educationalContentTest,
    details: educationalContentTest ? 'All regions have complete educational content' : contentIssues.join(', '),
    critical: false
  });
  
  // Test 2: Content quality validation
  let contentQualityTest = true;
  let qualityIssues = [];
  
  SPECTRUM_REGIONS.forEach(region => {
    // Check description length (should be informative)
    if (region.description && region.description.length < 50) {
      contentQualityTest = false;
      qualityIssues.push(`${region.name}: description too short`);
    }
    
    // Check examples count (should have multiple examples)
    if (region.examples && region.examples.length < 2) {
      contentQualityTest = false;
      qualityIssues.push(`${region.name}: insufficient examples`);
    }
    
    // Check applications count (should have practical applications)
    if (region.applications && region.applications.length < 2) {
      contentQualityTest = false;
      qualityIssues.push(`${region.name}: insufficient applications`);
    }
  });
  
  tests.push({
    name: 'Educational Content Quality',
    pass: contentQualityTest,
    details: contentQualityTest ? 'All educational content meets quality standards' : qualityIssues.join(', '),
    critical: false
  });
  
  return tests;
}

// Test data ordering and structure
export function runDataStructureTests() {
  console.log('🏗️  Running Data Structure Tests...');
  
  const tests = [];
  
  // Test 1: Regions are ordered by decreasing wavelength (increasing energy/frequency)
  let orderingTest = true;
  let orderingIssues = [];

  for (let i = 1; i < SPECTRUM_REGIONS.length; i++) {
    const prevRegion = SPECTRUM_REGIONS[i - 1];
    const currentRegion = SPECTRUM_REGIONS[i];

    // Each subsequent region should have smaller wavelengths (higher energy)
    if (currentRegion.wavelengthMax > prevRegion.wavelengthMin) {
      orderingTest = false;
      orderingIssues.push(`${currentRegion.name} wavelength range overlaps incorrectly with ${prevRegion.name}`);
    }
  }
  
  tests.push({
    name: 'Region Wavelength Ordering',
    pass: orderingTest,
    details: orderingTest ? 'Regions are properly ordered by wavelength' : orderingIssues.join(', '),
    critical: true
  });
  
  // Test 2: No wavelength gaps or overlaps
  let gapOverlapTest = true;
  let gapOverlapIssues = [];
  
  for (let i = 1; i < SPECTRUM_REGIONS.length; i++) {
    const prevRegion = SPECTRUM_REGIONS[i - 1];
    const currentRegion = SPECTRUM_REGIONS[i];
    
    // Check for gaps (previous max should connect to current min)
    const gap = currentRegion.wavelengthMin - prevRegion.wavelengthMax;
    const relativeGap = Math.abs(gap) / prevRegion.wavelengthMax;
    
    if (relativeGap > 0.1) { // Allow 10% tolerance for rounding
      gapOverlapTest = false;
      gapOverlapIssues.push(`Gap between ${prevRegion.name} and ${currentRegion.name}: ${gap.toExponential(2)}m`);
    }
    
    // Check for overlaps (previous max should not exceed current min significantly)
    if (prevRegion.wavelengthMax > currentRegion.wavelengthMax) {
      gapOverlapTest = false;
      gapOverlapIssues.push(`Overlap: ${prevRegion.name} max > ${currentRegion.name} max`);
    }
  }
  
  tests.push({
    name: 'Wavelength Range Continuity',
    pass: gapOverlapTest,
    details: gapOverlapTest ? 'No significant gaps or overlaps in wavelength ranges' : gapOverlapIssues.join(', '),
    critical: false
  });
  
  return tests;
}

// Run all data integrity tests
export async function runAllDataIntegrityTests() {
  console.log('🔍 Starting Data Integrity Test Suite\n');
  
  const consistencyTests = runSpectrumDataConsistencyTests();
  const detectionTests = runRegionDetectionTests();
  const educationalTests = runEducationalContentTests();
  const structureTests = runDataStructureTests();
  
  const allTests = [...consistencyTests, ...detectionTests, ...educationalTests, ...structureTests];
  
  // Print results
  console.log('\n=== Data Integrity Test Results ===');
  allTests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    const critical = test.critical ? ' [CRITICAL]' : '';
    console.log(`${index + 1}. ${test.name}: ${status}${critical}`);
    console.log(`   ${test.details}`);
  });
  
  const passedTests = allTests.filter(test => test.pass).length;
  const criticalTests = allTests.filter(test => test.critical).length;
  const criticalPassed = allTests.filter(test => test.critical && test.pass).length;
  
  console.log(`\n📊 Data Integrity Test Summary:`);
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
