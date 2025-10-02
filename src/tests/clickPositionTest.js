// Test to verify click position matches indicator position
// This test simulates clicking at various positions and checks if the resulting
// wavelength indicator appears at the same position

export function runClickPositionConsistencyTest() {
  console.log('🎯 Running Click Position Consistency Test...');
  
  // Define the same regions as used in SimpleSpectrum component
  const regions = [
    { name: 'Gamma', flex: 25, minWl: 1e-15, maxWl: 10e-12 },   // 1fm to 10pm
    { name: 'X-ray', flex: 15, minWl: 10e-12, maxWl: 10e-9 },  // 10pm to 10nm
    { name: 'UV', flex: 10, minWl: 10e-9, maxWl: 380e-9 },     // 10nm to 380nm
    { name: 'Visible', flex: 5, minWl: 380e-9, maxWl: 700e-9 }, // 380nm to 700nm
    { name: 'Infrared', flex: 15, minWl: 700e-9, maxWl: 1e-3 }, // 700nm to 1mm
    { name: 'Microwave', flex: 10, minWl: 1e-3, maxWl: 1e-1 }, // 1mm to 10cm
    { name: 'Radio', flex: 20, minWl: 1e-1, maxWl: 1e4 }       // 10cm to 10km
  ];

  const totalFlex = regions.reduce((sum, region) => sum + region.flex, 0);

  // Simulate click-to-wavelength conversion (same as handleSpectrumClick)
  const simulateClick = (clickRatio) => {
    let cumulativeRatio = 0;
    
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      const regionWidth = region.flex / totalFlex;
      
      if (clickRatio >= cumulativeRatio && clickRatio <= cumulativeRatio + regionWidth) {
        const positionInRegion = (clickRatio - cumulativeRatio) / regionWidth;
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);
        const wavelength = Math.pow(10, minLog + positionInRegion * (maxLog - minLog));
        return wavelength;
      }
      
      cumulativeRatio += regionWidth;
    }
    
    return null;
  };

  // Simulate wavelength-to-position conversion (same as calculateIndicatorPosition)
  const calculateIndicatorPosition = (selectedWavelength) => {
    let cumulativePosition = 0;
    
    for (const region of regions) {
      if (selectedWavelength >= region.minWl && selectedWavelength <= region.maxWl) {
        const minLog = Math.log10(region.minWl);
        const maxLog = Math.log10(region.maxWl);
        const selectedLog = Math.log10(selectedWavelength);
        const ratioInRegion = (selectedLog - minLog) / (maxLog - minLog);
        
        const regionWidthPercent = (region.flex / totalFlex) * 100;
        const positionInRegion = ratioInRegion * regionWidthPercent;
        
        return Math.max(0, Math.min(100, cumulativePosition + positionInRegion));
      }
      
      cumulativePosition += (region.flex / totalFlex) * 100;
    }
    
    return 50; // Default fallback
  };

  // Test various click positions
  const testPositions = [
    0.05,  // Far left (Gamma)
    0.15,  // Left (Gamma)
    0.35,  // Left-center (X-ray)
    0.50,  // Center (UV/Visible)
    0.65,  // Right-center (Visible/Infrared)
    0.80,  // Right (Microwave)
    0.95   // Far right (Radio)
  ];

  let allTestsPassed = true;
  const results = [];

  testPositions.forEach((clickRatio) => {
    // Convert click position to percentage
    const clickPositionPercent = clickRatio * 100;
    
    // Simulate the click -> wavelength conversion
    const wavelength = simulateClick(clickRatio);
    
    if (wavelength) {
      // Calculate where the indicator should appear for this wavelength
      const indicatorPositionPercent = calculateIndicatorPosition(wavelength);
      
      // Check if positions match (allow small tolerance for floating point precision)
      const tolerance = 0.1; // 0.1% tolerance
      const positionMatch = Math.abs(clickPositionPercent - indicatorPositionPercent) <= tolerance;
      
      if (!positionMatch) {
        allTestsPassed = false;
      }
      
      results.push({
        clickPosition: clickPositionPercent.toFixed(1),
        indicatorPosition: indicatorPositionPercent.toFixed(1),
        wavelength: (wavelength * 1e9).toFixed(1),
        match: positionMatch,
        difference: Math.abs(clickPositionPercent - indicatorPositionPercent).toFixed(2)
      });
    } else {
      allTestsPassed = false;
      results.push({
        clickPosition: clickPositionPercent.toFixed(1),
        indicatorPosition: 'N/A',
        wavelength: 'Failed',
        match: false,
        difference: 'N/A'
      });
    }
  });

  // Print results
  console.log('\n=== Click Position Consistency Test Results ===');
  console.log('Click Pos% | Indicator Pos% | Wavelength (nm) | Match | Diff%');
  console.log('-----------|----------------|-----------------|-------|------');
  
  results.forEach(result => {
    const status = result.match ? '✅' : '❌';
    console.log(`${result.clickPosition.padStart(9)} | ${result.indicatorPosition.padStart(14)} | ${result.wavelength.padStart(15)} | ${status.padStart(5)} | ${result.difference.padStart(5)}`);
  });

  console.log('\n' + (allTestsPassed ? '✅ All position consistency tests PASSED!' : '❌ Some position consistency tests FAILED!'));
  
  return {
    passed: allTestsPassed,
    results: results,
    summary: `${results.filter(r => r.match).length}/${results.length} tests passed`
  };
}
