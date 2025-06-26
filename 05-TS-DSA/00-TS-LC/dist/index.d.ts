/**
 * LeetCode TypeScript Solutions - Main Entry Point
 *
 * This file runs all the implemented solutions and their test cases.
 * Each problem includes multiple approaches with detailed analysis.
 */
declare class LeetCodeRunner {
    private problems;
    /**
     * Run all problems
     */
    runAll(): void;
    /**
     * Run problems by category
     */
    runByCategory(category: string): void;
    /**
     * Run problems by difficulty
     */
    runByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): void;
    /**
     * List all available problems
     */
    listProblems(): void;
    /**
     * Print statistics about the problems
     */
    private printStatistics;
    /**
     * Display help information
     */
    showHelp(): void;
}
export { LeetCodeRunner };
//# sourceMappingURL=index.d.ts.map