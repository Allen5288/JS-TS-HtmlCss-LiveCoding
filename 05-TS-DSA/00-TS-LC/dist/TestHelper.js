"use strict";
/**
 * Test utilities for LeetCode TypeScript solutions
 * Provides comprehensive testing methods with type safety and detailed output
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHelper = void 0;
class TestHelper {
    /**
     * Run a single test case
     */
    static runTest(testName, expected, actual) {
        try {
            const passed = this.deepEquals(expected, actual);
            const result = {
                passed,
                testName,
                expected,
                actual
            };
            this.testResults.push(result);
            this.printTestResult(result);
            return passed;
        }
        catch (error) {
            const result = {
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
    static runTests(testCases) {
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
    static deepEquals(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return a === b;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length)
                return false;
            return a.every((item, index) => this.deepEquals(item, b[index]));
        }
        if (typeof a === 'object' && typeof b === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length)
                return false;
            return keysA.every(key => keysB.includes(key) &&
                this.deepEquals(a[key], b[key]));
        }
        return false;
    }
    /**
     * Compare two arrays for equality
     */
    static arrayEquals(arr1, arr2) {
        return this.deepEquals(arr1, arr2);
    }
    /**
     * Print test result with colored output
     */
    static printTestResult(result) {
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
    static formatValue(value) {
        if (value === null)
            return 'null';
        if (value === undefined)
            return 'undefined';
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
    static printHeader(title) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`🚀 ${title}`);
        console.log(`${'='.repeat(50)}`);
    }
    /**
     * Print test suite summary
     */
    static printSummary() {
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
    static reset() {
        this.testResults = [];
    }
    /**
     * Measure execution time of a function
     */
    static measureTime(fn, label = 'Execution') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`⏱️  ${label}: ${(end - start).toFixed(3)}ms`);
        return result;
    }
    /**
     * Assert that a condition is true
     */
    static assert(condition, message = 'Assertion failed') {
        if (!condition) {
            throw new Error(message);
        }
    }
}
exports.TestHelper = TestHelper;
TestHelper.testResults = [];
//# sourceMappingURL=TestHelper.js.map