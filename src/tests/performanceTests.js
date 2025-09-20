// Comprehensive performance and memory usage testing
import { 
  wavelengthToFrequency, 
  wavelengthToEnergyEV,
  frequencyToWavelength,
  energyEVToWavelength,
  formatWavelength,
  formatFrequency,
  formatEnergy
} from '../utils/physicsCalculations.js';
import { getRegionByWavelength } from '../data/spectrumData.js';

// Performance benchmarking utilities
class PerformanceBenchmark {
  constructor(name) {
    this.name = name;
    this.startTime = 0;
    this.endTime = 0;
    this.iterations = 0;
  }
  
  start(iterations = 1) {
    this.iterations = iterations;
    this.startTime = performance.now();
  }
  
  end() {
    this.endTime = performance.now();
    return this.getDuration();
  }
  
  getDuration() {
    return this.endTime - this.startTime;
  }
  
  getAverageTime() {
    return this.getDuration() / this.iterations;
  }
  
  getOperationsPerSecond() {
    return (this.iterations / this.getDuration()) * 1000;
  }
}

// Test physics calculation performance
export function runCalculationPerformanceTests() {
  console.log('⚡ Running Physics Calculation Performance Tests...');
  
  const tests = [];
  
  // Test 1: Wavelength to frequency conversion speed
  const wavelengthConversionBench = new PerformanceBenchmark('Wavelength to Frequency');
  const testIterations = 100000;
  
  wavelengthConversionBench.start(testIterations);
  for (let i = 0; i < testIterations; i++) {
    const wavelength = Math.random() * 1e-6 + 1e-9; // Random wavelength 1nm to 1μm
    wavelengthToFrequency(wavelength);
  }
  wavelengthConversionBench.end();
  
  const conversionSpeed = wavelengthConversionBench.getOperationsPerSecond();
  const conversionTest = conversionSpeed > 100000; // Should handle >100k ops/sec
  
  tests.push({
    name: 'Wavelength-Frequency Conversion Speed',
    pass: conversionTest,
    details: `${conversionSpeed.toFixed(0)} ops/sec (${wavelengthConversionBench.getAverageTime().toFixed(3)}ms avg)`,
    critical: false,
    benchmark: {
      operations: testIterations,
      duration: wavelengthConversionBench.getDuration(),
      opsPerSecond: conversionSpeed
    }
  });
  
  // Test 2: Energy calculation performance
  const energyBench = new PerformanceBenchmark('Energy Calculation');
  
  energyBench.start(testIterations);
  for (let i = 0; i < testIterations; i++) {
    const wavelength = Math.random() * 1e-6 + 1e-9;
    wavelengthToEnergyEV(wavelength);
  }
  energyBench.end();
  
  const energySpeed = energyBench.getOperationsPerSecond();
  const energyTest = energySpeed > 100000;
  
  tests.push({
    name: 'Energy Calculation Speed',
    pass: energyTest,
    details: `${energySpeed.toFixed(0)} ops/sec (${energyBench.getAverageTime().toFixed(3)}ms avg)`,
    critical: false,
    benchmark: {
      operations: testIterations,
      duration: energyBench.getDuration(),
      opsPerSecond: energySpeed
    }
  });
  
  // Test 3: Region detection performance
  const regionBench = new PerformanceBenchmark('Region Detection');
  const regionIterations = 10000; // Fewer iterations as this might be more complex
  
  regionBench.start(regionIterations);
  for (let i = 0; i < regionIterations; i++) {
    const wavelength = Math.random() * 1e-6 + 1e-9;
    getRegionByWavelength(wavelength);
  }
  regionBench.end();
  
  const regionSpeed = regionBench.getOperationsPerSecond();
  const regionTest = regionSpeed > 10000; // Should handle >10k ops/sec
  
  tests.push({
    name: 'Region Detection Speed',
    pass: regionTest,
    details: `${regionSpeed.toFixed(0)} ops/sec (${regionBench.getAverageTime().toFixed(3)}ms avg)`,
    critical: false,
    benchmark: {
      operations: regionIterations,
      duration: regionBench.getDuration(),
      opsPerSecond: regionSpeed
    }
  });
  
  // Test 4: Formatting performance
  const formatBench = new PerformanceBenchmark('Value Formatting');
  const formatIterations = 10000;
  
  formatBench.start(formatIterations);
  for (let i = 0; i < formatIterations; i++) {
    const wavelength = Math.random() * 1e-6 + 1e-9;
    const frequency = Math.random() * 1e15 + 1e12;
    const energy = Math.random() * 10 + 0.1;
    
    formatWavelength(wavelength);
    formatFrequency(frequency);
    formatEnergy(energy);
  }
  formatBench.end();
  
  const formatSpeed = formatBench.getOperationsPerSecond();
  const formatTest = formatSpeed > 5000; // Should handle >5k ops/sec (3 operations per iteration)
  
  tests.push({
    name: 'Value Formatting Speed',
    pass: formatTest,
    details: `${formatSpeed.toFixed(0)} ops/sec (${formatBench.getAverageTime().toFixed(3)}ms avg)`,
    critical: false,
    benchmark: {
      operations: formatIterations * 3, // 3 format operations per iteration
      duration: formatBench.getDuration(),
      opsPerSecond: formatSpeed
    }
  });
  
  return tests;
}

// Test memory usage and garbage collection
export async function runMemoryUsageTests() {
  console.log('🧠 Running Memory Usage Tests...');

  const tests = [];
  
  // Test 1: Memory usage during intensive calculations
  const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  // Perform intensive calculations
  const calculations = [];
  for (let i = 0; i < 10000; i++) {
    const wavelength = Math.random() * 1e-6 + 1e-9;
    calculations.push({
      wavelength: wavelength,
      frequency: wavelengthToFrequency(wavelength),
      energy: wavelengthToEnergyEV(wavelength),
      region: getRegionByWavelength(wavelength)
    });
  }
  
  const peakMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  // Clear calculations and force garbage collection if possible
  calculations.length = 0;
  if (window.gc) {
    window.gc();
  }
  
  // Wait a bit for potential garbage collection
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  const memoryIncrease = peakMemory - initialMemory;
  const memoryRecovered = peakMemory - finalMemory;
  const memoryTest = !performance.memory || memoryIncrease < 50 * 1024 * 1024; // Less than 50MB
  
  tests.push({
    name: 'Memory Usage During Calculations',
    pass: memoryTest,
    details: performance.memory ? 
      `Peak increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB, Recovered: ${(memoryRecovered / 1024 / 1024).toFixed(2)}MB` : 
      'Memory monitoring not available',
    critical: false,
    benchmark: {
      initialMemory,
      peakMemory,
      finalMemory,
      memoryIncrease,
      memoryRecovered
    }
  });
  
  // Test 2: Memory leaks in repeated operations
  const memoryLeakTest = async () => {
    if (!performance.memory) {
      return {
        name: 'Memory Leak Detection',
        pass: true,
        details: 'Memory monitoring not available',
        critical: false
      };
    }
    
    const baselineMemory = performance.memory.usedJSHeapSize;
    const iterations = 5;
    const memoryReadings = [];
    
    for (let iteration = 0; iteration < iterations; iteration++) {
      // Perform a batch of operations
      for (let i = 0; i < 1000; i++) {
        const wavelength = Math.random() * 1e-6 + 1e-9;
        wavelengthToFrequency(wavelength);
        wavelengthToEnergyEV(wavelength);
        getRegionByWavelength(wavelength);
      }
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
      
      // Wait for GC
      await new Promise(resolve => setTimeout(resolve, 50));
      
      memoryReadings.push(performance.memory.usedJSHeapSize);
    }
    
    // Check if memory is consistently increasing (potential leak)
    let consistentIncrease = true;
    for (let i = 1; i < memoryReadings.length; i++) {
      if (memoryReadings[i] <= memoryReadings[i - 1]) {
        consistentIncrease = false;
        break;
      }
    }
    
    const totalIncrease = memoryReadings[memoryReadings.length - 1] - baselineMemory;
    const leakTest = !consistentIncrease || totalIncrease < 10 * 1024 * 1024; // Less than 10MB total increase
    
    return {
      name: 'Memory Leak Detection',
      pass: leakTest,
      details: `Total increase: ${(totalIncrease / 1024 / 1024).toFixed(2)}MB, Consistent increase: ${consistentIncrease}`,
      critical: false,
      benchmark: {
        baselineMemory,
        memoryReadings,
        totalIncrease,
        consistentIncrease
      }
    };
  };
  
  return [tests[0], await memoryLeakTest()];
}

// Test real-time performance under load
export async function runLoadPerformanceTests() {
  console.log('🔥 Running Load Performance Tests...');

  const tests = [];
  
  // Test 1: Sustained calculation performance
  const sustainedBench = new PerformanceBenchmark('Sustained Performance');
  const duration = 1000; // 1 second test
  let operations = 0;
  
  sustainedBench.start();
  const startTime = performance.now();
  
  while (performance.now() - startTime < duration) {
    const wavelength = Math.random() * 1e-6 + 1e-9;
    wavelengthToFrequency(wavelength);
    wavelengthToEnergyEV(wavelength);
    operations++;
  }
  
  sustainedBench.end();
  
  const sustainedOpsPerSec = (operations / duration) * 1000;
  const sustainedTest = sustainedOpsPerSec > 50000; // Should maintain >50k ops/sec
  
  tests.push({
    name: 'Sustained Calculation Performance',
    pass: sustainedTest,
    details: `${sustainedOpsPerSec.toFixed(0)} ops/sec over ${duration}ms`,
    critical: false,
    benchmark: {
      operations,
      duration,
      opsPerSecond: sustainedOpsPerSec
    }
  });
  
  // Test 2: Concurrent operation simulation
  const concurrentBench = new PerformanceBenchmark('Concurrent Operations');
  const concurrentPromises = [];
  const concurrentOperations = 1000;
  
  concurrentBench.start();
  
  for (let i = 0; i < 10; i++) {
    concurrentPromises.push(
      new Promise(resolve => {
        setTimeout(() => {
          for (let j = 0; j < concurrentOperations; j++) {
            const wavelength = Math.random() * 1e-6 + 1e-9;
            wavelengthToFrequency(wavelength);
            getRegionByWavelength(wavelength);
          }
          resolve();
        }, Math.random() * 10); // Random delay 0-10ms
      })
    );
  }
  
  return Promise.all(concurrentPromises).then(() => {
    concurrentBench.end();
    
    const concurrentSpeed = (concurrentOperations * 10) / concurrentBench.getDuration() * 1000;
    const concurrentTest = concurrentSpeed > 10000; // Should handle concurrent load
    
    tests.push({
      name: 'Concurrent Operation Handling',
      pass: concurrentTest,
      details: `${concurrentSpeed.toFixed(0)} ops/sec with concurrent execution`,
      critical: false,
      benchmark: {
        operations: concurrentOperations * 10,
        duration: concurrentBench.getDuration(),
        opsPerSecond: concurrentSpeed
      }
    });
    
    return tests;
  });
}

// Run all performance tests
export async function runAllPerformanceTests() {
  console.log('🚀 Starting Performance Test Suite\n');
  
  const calculationTests = runCalculationPerformanceTests();
  const memoryTests = await runMemoryUsageTests();
  const loadTests = await runLoadPerformanceTests();
  
  const allTests = [...calculationTests, ...memoryTests, ...loadTests];
  
  // Print results
  console.log('\n=== Performance Test Results ===');
  allTests.forEach((test, index) => {
    const status = test.pass ? '✅ PASS' : '❌ FAIL';
    const critical = test.critical ? ' [CRITICAL]' : '';
    console.log(`${index + 1}. ${test.name}: ${status}${critical}`);
    console.log(`   ${test.details}`);
    
    if (test.benchmark) {
      console.log(`   📊 Benchmark: ${JSON.stringify(test.benchmark, null, 2)}`);
    }
  });
  
  const passedTests = allTests.filter(test => test.pass).length;
  const criticalTests = allTests.filter(test => test.critical).length;
  const criticalPassed = allTests.filter(test => test.critical && test.pass).length;
  
  console.log(`\n📊 Performance Test Summary:`);
  console.log(`   Total Tests: ${allTests.length}`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${allTests.length - passedTests}`);
  console.log(`   Critical Tests: ${criticalPassed}/${criticalTests}`);
  console.log(`   Success Rate: ${((passedTests / allTests.length) * 100).toFixed(1)}%`);
  
  // Performance summary
  const benchmarks = allTests.filter(test => test.benchmark);
  if (benchmarks.length > 0) {
    console.log(`\n⚡ Performance Summary:`);
    benchmarks.forEach(test => {
      if (test.benchmark.opsPerSecond) {
        console.log(`   ${test.name}: ${test.benchmark.opsPerSecond.toFixed(0)} ops/sec`);
      }
    });
  }
  
  return {
    totalTests: allTests.length,
    totalPassed: passedTests,
    critical: criticalTests,
    criticalPassed: criticalPassed,
    successRate: (passedTests / allTests.length) * 100,
    tests: allTests,
    benchmarks: benchmarks.map(test => ({
      name: test.name,
      benchmark: test.benchmark
    }))
  };
}
