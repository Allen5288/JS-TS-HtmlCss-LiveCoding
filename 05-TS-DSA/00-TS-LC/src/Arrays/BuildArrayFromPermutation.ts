import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1920. Build Array from Permutation
 * 
 * Given a zero-based permutation nums (0-indexed), build an array ans of the same length where ans[i] = nums[nums[i]] for each 0 <= i < nums.length and return it.
 * A zero-based permutation nums is an array of distinct integers from 0 to nums.length - 1 (inclusive).
 * 
 * Example 1:
 * Input: nums = [0,2,1,5,3,4]
 * Output: [0,1,2,4,5,3]
 * Explanation: The array ans is built as follows: 
 * ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
 *     = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
 *     = [0,1,2,4,5,3]
 * 
 * Example 2:
 * Input: nums = [5,0,1,2,3,4]
 * Output: [4,5,0,1,2,3]
 * Explanation: The array ans is built as follows:
 * ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
 *     = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
 *     = [4,5,0,1,2,3]
 * 
 * Constraints:
 * - 1 <= nums.length <= 1000
 * - 0 <= nums[i] < nums.length
 * - The elements in nums are distinct.
 */
export class BuildArrayFromPermutation {
  /**
   * Approach: In-place using mathematical encoding
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * 
   * Key insight: Use the formula nums[i] = nums[i] + 1000 * nums[nums[i]]
   * to encode both old and new values in the same array element.
   */
  buildArray(nums: number[]): number[] {
    const n = nums.length;
    
    // Build the final value on the first iteration
    // Store both old and new values: new_val = old_val + 1000 * target_val
    for (let i = 0; i < n; i++) {
      nums[i] += 1000 * (nums[nums[i]] % 1000);
    }
    
    // Extract the final values on the second iteration
    for (let i = 0; i < n; i++) {
      nums[i] = Math.floor(nums[i] / 1000);
    }
    
    return nums;
  }

  /**
   * Alternative approach: Using extra space (more intuitive)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  buildArraySimple(nums: number[]): number[] {
    const result: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
      result[i] = nums[nums[i]];
    }
    
    return result;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1920. Build Array from Permutation');
    
    const solution = new BuildArrayFromPermutation();
    
    // Test cases
    const testCases = [
      {
        name: 'Example 1: [0,2,1,5,3,4]',
        input: [0, 2, 1, 5, 3, 4],
        expected: [0, 1, 2, 4, 5, 3]
      },
      {
        name: 'Example 2: [5,0,1,2,3,4]',
        input: [5, 0, 1, 2, 3, 4],
        expected: [4, 5, 0, 1, 2, 3]
      },
      {
        name: 'Single element: [0]',
        input: [0],
        expected: [0]
      },
      {
        name: 'Two elements: [1,0]',
        input: [1, 0],
        expected: [0, 1]
      }
    ];

    // Test both approaches
    const approaches = [
      { name: 'In-place (O(1) space)', method: solution.buildArray.bind(solution) },
      { name: 'Simple (O(n) space)', method: solution.buildArraySimple.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        // Create copy for in-place modification
        const inputCopy = [...testCase.input];
        const result = approach.method(inputCopy);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    console.log('\n📝 Algorithm Notes:');
    console.log('• In-place approach uses mathematical encoding to store both values');
    console.log('• Simple approach is more readable but uses extra space');
    console.log('• Both approaches have O(n) time complexity');
  }
}
