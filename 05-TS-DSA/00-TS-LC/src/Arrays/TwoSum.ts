import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1. Two Sum
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 * 
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 * 
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 * 
 * Constraints:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * - Only one valid answer exists.
 */

export class TwoSum {
  /**
   * Approach 1: Brute Force
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  twoSumBruteForce(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
    return [];
  }

  /**
   * Approach 2: Hash Map (One Pass)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  twoSumHashMap(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      
      if (map.has(complement)) {
        return [map.get(complement)!, i];
      }
      
      map.set(nums[i], i);
    }
    
    return [];
  }

  /**
   * Approach 3: Two Pointers (requires sorted indices)
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  twoSumTwoPointers(nums: number[], target: number): number[] {
    const indices = nums.map((num, index) => ({ num, index }))
                       .sort((a, b) => a.num - b.num);
    
    let left = 0;
    let right = indices.length - 1;
    
    while (left < right) {
      const sum = indices[left].num + indices[right].num;
      
      if (sum === target) {
        return [indices[left].index, indices[right].index].sort((a, b) => a - b);
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    
    return [];
  }

  /**
   * Run all test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1. Two Sum');
    
    const solution = new TwoSum();
    
    // Test cases
    const testCases = [
      {
        name: 'Example 1: [2,7,11,15], target = 9',
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1]
      },
      {
        name: 'Example 2: [3,2,4], target = 6',
        nums: [3, 2, 4],
        target: 6,
        expected: [1, 2]
      },
      {
        name: 'Example 3: [3,3], target = 6',
        nums: [3, 3],
        target: 6,
        expected: [0, 1]
      },
      {
        name: 'Large numbers: [-1,-2,-3,-4,-5], target = -8',
        nums: [-1, -2, -3, -4, -5],
        target: -8,
        expected: [2, 4]
      },
      {
        name: 'Two elements: [1,2], target = 3',
        nums: [1, 2],
        target: 3,
        expected: [0, 1]
      }
    ];

    // Test Hash Map approach
    console.log('\n🔍 Testing Hash Map Approach:');
    for (const testCase of testCases) {
      const result = solution.twoSumHashMap(testCase.nums, testCase.target);
      TestHelper.runTest(testCase.name, testCase.expected, result);
    }

    // Test Brute Force approach
    console.log('\n🔍 Testing Brute Force Approach:');
    for (const testCase of testCases) {
      const result = solution.twoSumBruteForce(testCase.nums, testCase.target);
      TestHelper.runTest(`${testCase.name} (Brute Force)`, testCase.expected, result);
    }

    // Test Two Pointers approach
    console.log('\n🔍 Testing Two Pointers Approach:');
    for (const testCase of testCases) {
      const result = solution.twoSumTwoPointers(testCase.nums, testCase.target);
      TestHelper.runTest(`${testCase.name} (Two Pointers)`, testCase.expected, result);
    }

    // Performance comparison
    console.log('\n⚡ Performance Comparison:');
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    const largeTarget = 1998; // Last two elements

    TestHelper.measureTime(
      () => solution.twoSumHashMap(largeArray, largeTarget),
      'Hash Map (1000 elements)'
    );

    TestHelper.measureTime(
      () => solution.twoSumTwoPointers(largeArray, largeTarget),
      'Two Pointers (1000 elements)'
    );

    // Note: Brute force would be too slow for large arrays, so we skip it

    console.log('\n');
  }
}
