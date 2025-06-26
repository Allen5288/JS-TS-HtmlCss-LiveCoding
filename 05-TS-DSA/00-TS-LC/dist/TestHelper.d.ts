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
export declare class TestHelper {
    private static testResults;
    /**
     * Run a single test case
     */
    static runTest<T>(testName: string, expected: T, actual: T): boolean;
    /**
     * Run multiple test cases
     */
    static runTests<T>(testCases: TestCase<T>[]): boolean;
    /**
     * Deep equality comparison for complex objects and arrays
     */
    static deepEquals<T>(a: T, b: T): boolean;
    /**
     * Compare two arrays for equality
     */
    static arrayEquals<T>(arr1: T[], arr2: T[]): boolean;
    /**
     * Print test result with colored output
     */
    private static printTestResult;
    /**
     * Format values for display
     */
    private static formatValue;
    /**
     * Print test suite header
     */
    static printHeader(title: string): void;
    /**
     * Print test suite summary
     */
    static printSummary(): void;
    /**
     * Reset test results
     */
    static reset(): void;
    /**
     * Measure execution time of a function
     */
    static measureTime<T>(fn: () => T, label?: string): T;
    /**
     * Assert that a condition is true
     */
    static assert(condition: boolean, message?: string): void;
}
//# sourceMappingURL=TestHelper.d.ts.map