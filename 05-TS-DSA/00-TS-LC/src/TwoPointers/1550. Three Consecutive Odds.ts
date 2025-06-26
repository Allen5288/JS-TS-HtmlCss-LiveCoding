import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1550. Three Consecutive Odds
 * 
 * Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.
 * 
 * Example 1:
 * Input: arr = [2,6,4,1]
 * Output: false
 * Explanation: There are no three consecutive odds.
 * 
 * Example 2:
 * Input: arr = [1,2,34,3,4,5,7,23,12]
 * Output: true
 * Explanation: [5,7,23] are three consecutive odds.
 * 
 * Constraints:
 * - 1 <= arr.length <= 1000
 * - 1 <= arr[i] <= 1000
 */
export class ThreeConsecutiveOdds {
  /**
   * Approach: Single pass with counter
   * Time Complexity: O(n) where n is the length of arr
   * Space Complexity: O(1)
   * 
   * Keep track of consecutive odd numbers. Reset counter when even number is found.
   */
  threeConsecutiveOdds(arr: number[]): boolean {
    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 1) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    
    return false;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1550. Three Consecutive Odds');
    
    const solution = new ThreeConsecutiveOdds();
    
    const testCases = [
      {
        name: 'Example 1: [2,6,4,1]',
        arr: [2, 6, 4, 1],
        expected: false
      },
      {
        name: 'Example 2: [1,2,34,3,4,5,7,23,12]',
        arr: [1, 2, 34, 3, 4, 5, 7, 23, 12],
        expected: true
      },
      {
        name: 'All odd: [1,3,5]',
        arr: [1, 3, 5],
        expected: true
      },
      {
        name: 'All even: [2,4,6]',
        arr: [2, 4, 6],
        expected: false
      },
      {
        name: 'Two consecutive odds: [1,3,2]',
        arr: [1, 3, 2],
        expected: false
      },
      {
        name: 'Three odds at end: [2,4,1,3,5]',
        arr: [2, 4, 1, 3, 5],
        expected: true
      },
      {
        name: 'Single element odd: [1]',
        arr: [1],
        expected: false
      }
    ];

    for (const testCase of testCases) {
      const result = solution.threeConsecutiveOdds([...testCase.arr]);
      TestHelper.runTest(testCase.name, testCase.expected, result);
    }

    console.log('\n📝 Algorithm Notes:');
    console.log('• Single pass solution with O(1) space');
    console.log('• Counter tracks consecutive odd numbers');
    console.log('• Early return when three consecutive odds found');
  }
}