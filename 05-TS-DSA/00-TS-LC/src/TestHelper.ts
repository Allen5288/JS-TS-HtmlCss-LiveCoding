/**
 * Test utilities for LeetCode TypeScript solutions
 * Provides comprehensive testing methods with type safety and detailed output
 */

export interface TestCase<T> {
  name: string;
  expected: T;
  actual: T;
}

export interface TestResult {
  passed: boolean;
  testName: string;
  expected?: unknown;
  actual?: unknown;
  errorMessage?: string;
}

export class TestHelper {
  private static testResults: TestResult[] = [];
  
  /**
   * Run a single test case
   */
  static runTest<T>(testName: string, expected: T, actual: T): boolean {
    try {
      const passed = this.deepEquals(expected, actual);
      const result: TestResult = {
        passed,
        testName,
        expected,
        actual
      };
      
      this.testResults.push(result);
      this.printTestResult(result);
      return passed;
    } catch (error) {
      const result: TestResult = {
        passed: false,
        testName,
        expected,
        actual,
        errorMessage: error instanceof Error ? error.message : String(error)
      };
      
      this.testResults.push(result);
      this.printTestResult(result);
      return false;
    }
  }

  /**
   * Run multiple test cases
   */
  static runTests<T>(testCases: TestCase<T>[]): boolean {
    let allPassed = true;
    
    for (const testCase of testCases) {
      const passed = this.runTest(testCase.name, testCase.expected, testCase.actual);
      allPassed = allPassed && passed;
    }
    
    return allPassed;
  }

  /**
   * Deep equality comparison for complex objects and arrays
   */
  static deepEquals<T>(a: T, b: T): boolean {
    if (a === b) return true;
    
    if (a == null || b == null) return a === b;
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => this.deepEquals(item, b[index]));
    }
    
    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a as object);
      const keysB = Object.keys(b as object);
      
      if (keysA.length !== keysB.length) return false;
      
      return keysA.every(key => 
        keysB.includes(key) && 
        this.deepEquals((a as any)[key], (b as any)[key])
      );
    }
    
    return false;
  }

  /**
   * Compare two arrays for equality
   */
  static arrayEquals<T>(arr1: T[], arr2: T[]): boolean {
    return this.deepEquals(arr1, arr2);
  }

  /**
   * Print test result with colored output
   */
  private static printTestResult(result: TestResult): void {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`[${status}] ${result.testName}`);
    
    if (!result.passed) {
      console.log(`  Expected: ${this.formatValue(result.expected)}`);
      console.log(`  Actual:   ${this.formatValue(result.actual)}`);
      if (result.errorMessage) {
        console.log(`  Error:    ${result.errorMessage}`);
      }
    }
  }

  /**
   * Format values for display
   */
  private static formatValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) {
      return `[${value.map(v => this.formatValue(v)).join(', ')}]`;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    return String(value);
  }

  /**
   * Print test suite header
   */
  static printHeader(title: string): void {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 ${title}`);
    console.log(`${'='.repeat(50)}`);
  }

  /**
   * Print test suite summary
   */
  static printSummary(): void {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = total - passed;
    
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 Test Summary:`);
    console.log(`   Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
    console.log(`   Success Rate: ${total > 0 ? ((passed / total) * 100).toFixed(1) : 0}%`);
    console.log(`${'='.repeat(50)}\n`);
  }

  /**
   * Reset test results
   */
  static reset(): void {
    this.testResults = [];
  }

  /**
   * Measure execution time of a function
   */
  static measureTime<T>(fn: () => T, label: string = 'Execution'): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⏱️  ${label}: ${(end - start).toFixed(3)}ms`);
    return result;
  }

  /**
   * Assert that a condition is true
   */
  static assert(condition: boolean, message: string = 'Assertion failed'): void {
    if (!condition) {
      throw new Error(message);
    }
  }
}
