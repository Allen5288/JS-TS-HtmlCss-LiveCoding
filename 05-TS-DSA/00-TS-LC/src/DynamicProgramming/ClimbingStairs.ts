import { TestHelper } from '../TestHelper';

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

export class ClimbingStairs {
  /**
   * Approach 1: Naive Recursion (Exponential Time - for educational purposes)
   * Time Complexity: O(2^n)
   * Space Complexity: O(n) - recursion stack
   * 
   * Note: This approach will be very slow for large n (n > 30)
   */
  climbStairsRecursive(n: number): number {
    if (n <= 2) return n;
    return this.climbStairsRecursive(n - 1) + this.climbStairsRecursive(n - 2);
  }

  /**
   * Approach 2: Memoization (Top-Down DP)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  climbStairsMemo(n: number): number {
    const memo = new Map<number, number>();
    
    const helper = (n: number): number => {
      if (n <= 2) return n;
      
      if (memo.has(n)) {
        return memo.get(n)!;
      }
      
      const result = helper(n - 1) + helper(n - 2);
      memo.set(n, result);
      return result;
    };
    
    return helper(n);
  }

  /**
   * Approach 3: Tabulation (Bottom-Up DP)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  climbStairsTabulation(n: number): number {
    if (n <= 2) return n;
    
    const dp: number[] = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
  }

  /**
   * Approach 4: Space Optimized DP
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  climbStairsOptimized(n: number): number {
    if (n <= 2) return n;
    
    let prev2 = 1; // dp[i-2]
    let prev1 = 2; // dp[i-1]
    
    for (let i = 3; i <= n; i++) {
      const current = prev1 + prev2;
      prev2 = prev1;
      prev1 = current;
    }
    
    return prev1;
  }

  /**
   * Approach 5: Matrix Exponentiation
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  climbStairsMatrix(n: number): number {
    if (n <= 2) return n;
    
    // Matrix [[1, 1], [1, 0]] represents the transformation
    // [F(n), F(n-1)] = [F(n-1), F(n-2)] * [[1, 1], [1, 0]]
    
    const matrixMultiply = (a: number[][], b: number[][]): number[][] => {
      return [
        [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
        [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
      ];
    };
    
    const matrixPower = (matrix: number[][], power: number): number[][] => {
      let result = [[1, 0], [0, 1]]; // Identity matrix
      let base = matrix;
      
      while (power > 0) {
        if (power % 2 === 1) {
          result = matrixMultiply(result, base);
        }
        base = matrixMultiply(base, base);
        power = Math.floor(power / 2);
      }
      
      return result;
    };    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n);
    
    // The matrix [[1,1],[1,0]]^n gives us [[F(n+1), F(n)], [F(n), F(n-1)]]
    // For climbing stairs, we want F(n+1), which is at position [0][0]
    return resultMatrix[0][0];
  }

  /**
   * Approach 6: Mathematical Formula (Fibonacci Formula)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   * 
   * Uses Binet's formula for Fibonacci numbers
   */
  climbStairsMath(n: number): number {
    const sqrt5 = Math.sqrt(5);
    const phi = (1 + sqrt5) / 2; // Golden ratio
    const psi = (1 - sqrt5) / 2;
    
    // Since climbing stairs follows Fibonacci pattern with F(1)=1, F(2)=2
    // We need to adjust: climbStairs(n) = Fibonacci(n+1)
    const fibN1 = (Math.pow(phi, n + 1) - Math.pow(psi, n + 1)) / sqrt5;
    
    return Math.round(fibN1);
  }

  /**
   * Run all test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 70. Climbing Stairs');
    
    const solution = new ClimbingStairs();
    
    // Test cases
    const testCases = [
      { name: 'n = 1', n: 1, expected: 1 },
      { name: 'n = 2', n: 2, expected: 2 },
      { name: 'n = 3', n: 3, expected: 3 },
      { name: 'n = 4', n: 4, expected: 5 },
      { name: 'n = 5', n: 5, expected: 8 },
      { name: 'n = 10', n: 10, expected: 89 },
      { name: 'n = 20', n: 20, expected: 10946 },
      { name: 'n = 30', n: 30, expected: 1346269 }
    ];

    // Test all approaches (except naive recursion for large n)
    const approaches = [
      { name: 'Memoization', method: solution.climbStairsMemo.bind(solution) },
      { name: 'Tabulation', method: solution.climbStairsTabulation.bind(solution) },
      { name: 'Space Optimized', method: solution.climbStairsOptimized.bind(solution) },
      { name: 'Matrix Exponentiation', method: solution.climbStairsMatrix.bind(solution) },
      { name: 'Mathematical Formula', method: solution.climbStairsMath.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const result = approach.method(testCase.n);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    // Test naive recursion only for small n
    console.log('\n🔍 Testing Naive Recursion (small n only):');
    const smallTestCases = testCases.filter(tc => tc.n <= 10);
    for (const testCase of smallTestCases) {
      const result = solution.climbStairsRecursive(testCase.n);
      TestHelper.runTest(testCase.name, testCase.expected, result);
    }

    // Performance comparison
    console.log('\n⚡ Performance Comparison (n = 40):');
    const n = 40;
    
    for (const approach of approaches) {
      TestHelper.measureTime(
        () => approach.method(n),
        approach.name
      );
    }

    // Test with very large n for mathematical approach
    console.log('\n🚀 Large Input Test (n = 45):');
    const largeN = 45;
    const expected = 1836311903; // Known result for n = 45
    
    // Only test approaches that can handle large n efficiently
    const efficientApproaches = [
      solution.climbStairsOptimized.bind(solution),
      solution.climbStairsMatrix.bind(solution),
      solution.climbStairsMath.bind(solution)
    ];
    
    const efficientNames = ['Space Optimized', 'Matrix Exponentiation', 'Mathematical Formula'];
    
    for (let i = 0; i < efficientApproaches.length; i++) {
      const result = efficientApproaches[i](largeN);
      TestHelper.runTest(`${efficientNames[i]} (n = ${largeN})`, expected, result);
    }

    console.log('\n📝 Algorithm Analysis:');
    console.log('• Naive Recursion: Simple but exponential time - avoid for n > 30');
    console.log('• Memoization: Good for learning top-down DP concepts');
    console.log('• Tabulation: Classic bottom-up DP approach');
    console.log('• Space Optimized: Best practical solution - O(n) time, O(1) space');
    console.log('• Matrix Exponentiation: Fastest for very large n - O(log n) time');
    console.log('• Mathematical Formula: Constant time but potential floating-point errors');
    
    console.log('\n');
  }
}
