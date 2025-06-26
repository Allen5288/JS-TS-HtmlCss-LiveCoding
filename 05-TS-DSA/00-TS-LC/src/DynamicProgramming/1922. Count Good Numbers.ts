import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1922. Count Good Numbers，，
 * 
 * A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (2, 3, 5, or 7).
 * 
 * For example, "2582" is good because the digits at even indices are 2 and 8 (both even), and the digits at odd indices are 5 and 2 (both prime). Note that 2 is the only even prime number.
 * Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return it modulo 10^9 + 7.
 * 
 * A digit string is a string consisting of digits 0-9.
 * 
 * Example 1:
 * Input: n = 1
 * Output: 5
 * Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".
 * 
 * Example 2:
 * Input: n = 4
 * Output: 400
 * 
 * Example 3:
 * Input: n = 50
 * Output: 564908303
 * 
 * Constraints:
 * - 1 <= n <= 10^15
 */
export class CountGoodNumbers {
  private static readonly MOD = 1_000_000_007;

  /**
   * Fast modular exponentiation: (base^exp) % mod
   * Time Complexity: O(log exp)
   * Space Complexity: O(1)
   */
  private modPow(base: number, exp: number, mod: number): bigint {
    let result = 1n;
    let b = BigInt(base);
    let e = BigInt(exp);
    const m = BigInt(mod);
    
    while (e > 0) {
      if (e % 2n === 1n) {
        result = (result * b) % m;
      }
      b = (b * b) % m;
      e = e / 2n;
    }
    return result;
  }

  /**
   * Approach: Mathematical calculation with modular exponentiation
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   * 
   * Key insights:
   * - Even positions (0, 2, 4, ...): can use digits 0, 2, 4, 6, 8 (5 choices)
   * - Odd positions (1, 3, 5, ...): can use digits 2, 3, 5, 7 (4 choices)
   * - Use fast exponentiation for large numbers
   */
  countGoodNumbers(n: number): number {
    const evenCount = Math.ceil(n / 2); // positions: 0, 2, 4, ...
    const oddCount = Math.floor(n / 2); // positions: 1, 3, 5, ...

    const evenWays = this.modPow(5, evenCount, CountGoodNumbers.MOD);
    const oddWays = this.modPow(4, oddCount, CountGoodNumbers.MOD);

    return Number((evenWays * oddWays) % BigInt(CountGoodNumbers.MOD));
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1922. Count Good Numbers');
    
    const solution = new CountGoodNumbers();
    
    const testCases = [
      {
        name: 'Example 1: n = 1',
        n: 1,
        expected: 5
      },
      {
        name: 'Example 2: n = 4',
        n: 4,
        expected: 400
      },
      {
        name: 'Example 3: n = 50',
        n: 50,
        expected: 564908303
      },
      {
        name: 'Small case: n = 2',
        n: 2,
        expected: 20
      },
      {
        name: 'Small case: n = 3',
        n: 3,
        expected: 100
      }
    ];

    for (const testCase of testCases) {
      const result = solution.countGoodNumbers(testCase.n);
      TestHelper.runTest(testCase.name, testCase.expected, result);
    }

    console.log('\n📝 Algorithm Notes:');
    console.log('• Even positions: 5 choices (0, 2, 4, 6, 8)');
    console.log('• Odd positions: 4 choices (2, 3, 5, 7)');
    console.log('• Uses fast modular exponentiation for efficiency');
    console.log('• Result = 5^(ceil(n/2)) * 4^(floor(n/2)) mod (10^9 + 7)');
  }
}