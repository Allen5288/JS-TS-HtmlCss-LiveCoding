/**
 * LeetCode 70. Climbing Stairs
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 * Example 1:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * Example 2:
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 *
 * Constraints:
 * - 1 <= n <= 45
 */
export declare class ClimbingStairs {
    /**
     * Approach 1: Naive Recursion (Exponential Time - for educational purposes)
     * Time Complexity: O(2^n)
     * Space Complexity: O(n) - recursion stack
     *
     * Note: This approach will be very slow for large n (n > 30)
     */
    climbStairsRecursive(n: number): number;
    /**
     * Approach 2: Memoization (Top-Down DP)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    climbStairsMemo(n: number): number;
    /**
     * Approach 3: Tabulation (Bottom-Up DP)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    climbStairsTabulation(n: number): number;
    /**
     * Approach 4: Space Optimized DP
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    climbStairsOptimized(n: number): number;
    /**
     * Approach 5: Matrix Exponentiation
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    climbStairsMatrix(n: number): number;
    /**
     * Approach 6: Mathematical Formula (Fibonacci Formula)
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * Uses Binet's formula for Fibonacci numbers
     */
    climbStairsMath(n: number): number;
    /**
     * Run all test cases
     */
    static runTests(): void;
}
//# sourceMappingURL=ClimbingStairs.d.ts.map