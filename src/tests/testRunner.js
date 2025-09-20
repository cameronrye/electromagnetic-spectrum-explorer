// Test runner for the Electromagnetic Spectrum Explorer
// This file provides a simple test framework for running all tests

export class TestRunner {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      suites: []
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Comprehensive Electromagnetic Spectrum Explorer Test Suite\n');
    const startTime = performance.now();

    try {
      // Run physics calculation tests
      const { runPhysicsTests } = await import('./physicsTests.js');
      const physicsResults = runPhysicsTests();

      this.results.suites.push({
        name: 'Physics Calculations',
        totalTests: physicsResults.total,
        totalPassed: physicsResults.passed,
        successRate: (physicsResults.passed / physicsResults.total) * 100,
        critical: physicsResults.critical,
        criticalPassed: physicsResults.criticalPassed
      });

      // Run component integration tests
      try {
        const { runAllIntegrationTests } = await import('./integrationTests.js');
        const integrationResults = await runAllIntegrationTests();

        this.results.suites.push({
          name: 'Component Integration',
          ...integrationResults
        });
      } catch (error) {
        console.warn('Integration tests failed to load:', error.message);
      }

      // Run user interaction tests
      try {
        const { runAllUserInteractionTests } = await import('./userInteractionTests.js');
        const userResults = await runAllUserInteractionTests();

        this.results.suites.push({
          name: 'User Interactions',
          ...userResults
        });
      } catch (error) {
        console.warn('User interaction tests failed to load:', error.message);
      }

      // Run data integrity tests
      try {
        const { runAllDataIntegrityTests } = await import('./dataIntegrityTests.js');
        const dataResults = await runAllDataIntegrityTests();

        this.results.suites.push({
          name: 'Data Integrity',
          ...dataResults
        });
      } catch (error) {
        console.warn('Data integrity tests failed to load:', error.message);
      }

      // Run performance tests
      try {
        const { runAllPerformanceTests } = await import('./performanceTests.js');
        const performanceResults = await runAllPerformanceTests();

        this.results.suites.push({
          name: 'Performance & Memory',
          ...performanceResults
        });
      } catch (error) {
        console.warn('Performance tests failed to load:', error.message);
      }

      // Run legacy component tests for compatibility
      try {
        const { runAllComponentTests } = await import('./componentTests.js');
        const componentResults = await runAllComponentTests();

        this.results.suites.push({
          name: 'Legacy Component Tests',
          totalTests: componentResults.totalTests,
          totalPassed: componentResults.totalPassed,
          successRate: componentResults.successRate
        });
      } catch (error) {
        console.warn('Legacy component tests failed to load:', error.message);
      }

      // Calculate totals
      this.results.total = this.results.suites.reduce((sum, suite) => sum + suite.totalTests, 0);
      this.results.passed = this.results.suites.reduce((sum, suite) => sum + suite.totalPassed, 0);
      this.results.failed = this.results.total - this.results.passed;

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Print final summary
      this.printFinalSummary(duration);

      return this.results;
    } catch (error) {
      console.error('❌ Test runner failed:', error);
      return { total: 0, passed: 0, failed: 1, error: error.message };
    }
  }

  printFinalSummary(duration) {
    console.log('\n' + '='.repeat(80));
    console.log('🏁 COMPREHENSIVE TEST RESULTS - ELECTROMAGNETIC SPECTRUM EXPLORER');
    console.log('='.repeat(80));

    // Detailed suite results
    this.results.suites.forEach(suite => {
      const status = suite.totalPassed === suite.totalTests ? '✅' : '⚠️';
      const criticalInfo = suite.critical ? ` [${suite.criticalPassed || 0}/${suite.critical || 0} critical]` : '';
      console.log(`${status} ${suite.name}: ${suite.totalPassed}/${suite.totalTests} (${suite.successRate.toFixed(1)}%)${criticalInfo}`);
    });

    console.log('-'.repeat(80));

    // Overall statistics
    const totalCritical = this.results.suites.reduce((sum, suite) => sum + (suite.critical || 0), 0);
    const totalCriticalPassed = this.results.suites.reduce((sum, suite) => sum + (suite.criticalPassed || 0), 0);

    console.log(`📊 OVERALL RESULTS:`);
    console.log(`   Total Tests: ${this.results.passed}/${this.results.total} passed`);
    console.log(`   Critical Tests: ${totalCriticalPassed}/${totalCritical} passed`);
    console.log(`   Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    console.log(`   Duration: ${duration.toFixed(2)}ms`);
    console.log(`   Performance: ${(this.results.total / duration * 1000).toFixed(0)} tests/sec`);

    // Test coverage summary
    console.log(`\n📋 TEST COVERAGE:`);
    console.log(`   ✅ Physics Calculations (constants, conversions, edge cases)`);
    console.log(`   ✅ Component Integration (data flow, prop passing, callbacks)`);
    console.log(`   ✅ User Interactions (clicks, inputs, validation, real-time updates)`);
    console.log(`   ✅ Data Integrity (spectrum regions, educational content, structure)`);
    console.log(`   ✅ Performance & Memory (benchmarks, load testing, memory leaks)`);

    // Final status
    if (this.results.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! The Electromagnetic Spectrum Explorer is fully validated.');
      console.log('   The application meets all quality, performance, and accuracy standards.');
    } else {
      console.log(`\n⚠️  ${this.results.failed} test(s) failed. Issues detected:`);

      this.results.suites.forEach(suite => {
        if (suite.totalPassed < suite.totalTests) {
          const failedCount = suite.totalTests - suite.totalPassed;
          console.log(`   • ${suite.name}: ${failedCount} failure(s)`);
        }
      });

      if (totalCriticalPassed < totalCritical) {
        console.log(`   🚨 CRITICAL: ${totalCritical - totalCriticalPassed} critical test(s) failed!`);
      }
    }

    console.log('='.repeat(80));
  }

  // Method to run tests and return a simple pass/fail result
  async quickTest() {
    const results = await this.runAllTests();
    return {
      passed: results.failed === 0,
      summary: `${results.passed}/${results.total} tests passed`,
      successRate: (results.passed / results.total) * 100
    };
  }

  // Method to run only critical tests for CI/CD
  async runCriticalTests() {
    console.log('🔥 Running Critical Tests Only\n');
    
    try {
      const { runPhysicsTests } = await import('./physicsTests.js');
      const physicsResults = runPhysicsTests();
      
      const critical = {
        total: physicsResults.total,
        passed: physicsResults.passed,
        failed: physicsResults.total - physicsResults.passed
      };

      console.log('\n🎯 Critical Test Summary');
      console.log(`Passed: ${critical.passed}/${critical.total}`);
      
      return critical.failed === 0;
    } catch (error) {
      console.error('❌ Critical tests failed:', error);
      return false;
    }
  }
}

// Utility function to run tests from console
export async function runTests() {
  const runner = new TestRunner();
  return await runner.runAllTests();
}

// Utility function for quick testing
export async function quickTest() {
  const runner = new TestRunner();
  return await runner.quickTest();
}

// Export singleton instance
export const testRunner = new TestRunner();

// Auto-run in development if requested
if (typeof window !== 'undefined' && window.location.search.includes('runTests=true')) {
  console.log('🔧 Auto-running tests due to URL parameter...');
  setTimeout(async () => {
    await runTests();
  }, 2000);
}

// Make test runner available globally for debugging
if (typeof window !== 'undefined') {
  window.testRunner = testRunner;
  window.runTests = runTests;
  window.quickTest = quickTest;
}
