import { TestHelper } from '../TestHelper';

/**
 * LeetCode 75. Sort Colors
 * 
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, 
 * with the colors in the order red, white, and blue.
 * 
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * You must solve this problem without using the library's sort function.
 * 
 * Example 1:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * 
 * Example 2:
 * Input: nums = [2,0,1]
 * Output: [0,1,2]
 * 
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 300
 * - nums[i] is either 0, 1, or 2.
 * 
 * Follow up: Could you come up with a one-pass algorithm using only constant extra space?
 */
export class SortColors {
  /**
   * Approach 1: Dutch National Flag Algorithm (One-pass)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * 
   * This is the optimal solution using three pointers:
   * - left: next position to place 0 (red)
   * - current: current element being examined
   * - right: next position to place 2 (blue)
   */
  sortColors(nums: number[]): void {
    let left = 0; // pointer for position to place 0s
    let right = nums.length - 1; // pointer for position to place 2s
    let current = 0; // current position being examined

    while (current <= right) {
      if (nums[current] === 0) {
        // Swap current element with the element at left pointer
        [nums[left], nums[current]] = [nums[current], nums[left]];
        left++;
        current++;
      } else if (nums[current] === 2) {
        // Swap current element with the element at right pointer
        [nums[right], nums[current]] = [nums[current], nums[right]];
        right--;
        // Don't increment current here because the swapped element needs to be examined
      } else {
        // nums[current] === 1, just move forward
        current++;
      }
    }
  }

  /**
   * Approach 2: Counting Sort (Two-pass)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * 
   * Count occurrences of each color, then overwrite the array.
   */
  sortColorsCountingSort(nums: number[]): void {
    let count0 = 0, count1 = 0, count2 = 0;
    
    // First pass: count occurrences
    for (const num of nums) {
      if (num === 0) count0++;
      else if (num === 1) count1++;
      else count2++;
    }
    
    // Second pass: overwrite array
    let index = 0;
    
    // Fill 0s
    for (let i = 0; i < count0; i++) {
      nums[index++] = 0;
    }
    
    // Fill 1s
    for (let i = 0; i < count1; i++) {
      nums[index++] = 1;
    }
    
    // Fill 2s
    for (let i = 0; i < count2; i++) {
      nums[index++] = 2;
    }
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 75. Sort Colors');
    
    const solution = new SortColors();
    
    // Test cases
    const testCases = [
      {
        name: 'Example 1: [2,0,2,1,1,0]',
        input: [2, 0, 2, 1, 1, 0],
        expected: [0, 0, 1, 1, 2, 2]
      },
      {
        name: 'Example 2: [2,0,1]',
        input: [2, 0, 1],
        expected: [0, 1, 2]
      },
      {
        name: 'All same color: [1,1,1]',
        input: [1, 1, 1],
        expected: [1, 1, 1]
      },
      {
        name: 'Already sorted: [0,1,2]',
        input: [0, 1, 2],
        expected: [0, 1, 2]
      },
      {
        name: 'Reverse sorted: [2,1,0]',
        input: [2, 1, 0],
        expected: [0, 1, 2]
      },
      {
        name: 'Single element: [1]',
        input: [1],
        expected: [1]
      }
    ];

    // Test both approaches
    const approaches = [
      { name: 'Dutch National Flag (One-pass)', method: solution.sortColors.bind(solution) },
      { name: 'Counting Sort (Two-pass)', method: solution.sortColorsCountingSort.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        // Create copy since sorting is in-place
        const inputCopy = [...testCase.input];
        approach.method(inputCopy);
        TestHelper.runTest(testCase.name, testCase.expected, inputCopy);
      }
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• Dutch National Flag: One-pass, optimal for this problem');
    console.log('• Counting Sort: Two-pass, easier to understand');
    console.log('• Both have O(n) time and O(1) space complexity');
    console.log('• Dutch flag is preferred for the follow-up requirement');
  }
}
