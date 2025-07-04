import { TestHelper } from '../TestHelper';

/**
 * LeetCode 3272. Find the Count of Good Integers
 * 
 * TODO: Add problem description
 */
export class FindTheCountOfGoodIntegers {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  countGoodIntegers(n: number, k: number): number {
    const uniqueSortedDigits = new Set();
        const isOddLength = n % 2 === 1;
        const halfLength = Math.floor((n + 1) / 2);
        const start = Math.pow(10, halfLength - 1);
        const end = Math.pow(10, halfLength);
    
        // Generate all palindromes of length `n`
        for (let i = start; i < end; i++) {
            let firstHalf = i.toString();
            let secondHalf = firstHalf.split("").reverse().slice(isOddLength ? 1 : 0).join("");
            let palindromeStr = firstHalf + secondHalf;
            let palindromeNum = parseInt(palindromeStr);
    
            if (palindromeNum % k === 0) {
                let sortedDigits = palindromeStr.split("").sort().join("");
                uniqueSortedDigits.add(sortedDigits);
            }
        }
        // Precompute factorials using BigInt
        const factorial = [1n];
        for (let i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * BigInt(i);
        }
    
        let total = 0n;
        for (const sorted of uniqueSortedDigits) {
            const count = Array(10).fill(0);
            for (const digit of sorted) {
                count[parseInt(digit)]++;
            }
            // Count valid permutations (no leading zero)
            const leadingOptions = n - count[0];
            let perms = BigInt(leadingOptions) * factorial[n - 1];
            for (const c of count) {
                perms /= factorial[c];
            }
            total += perms;
        }
        return Number(total);
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 3272. Find the Count of Good Integers');
    
    const solution = new FindTheCountOfGoodIntegers();
    
    // TODO: Add comprehensive test cases
    console.log('✅ FindTheCountOfGoodIntegers created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}