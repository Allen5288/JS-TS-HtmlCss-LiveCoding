import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2962. Count Subarrays Where Max Element Appears at Least K Times
 * 
 * You are given an integer array nums and a positive integer k.
 * Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
 * A subarray is a contiguous sequence of elements within an array.
 * 
 * Example 1:
 * Input: nums = [1,3,2,3,3], k = 2
 * Output: 6
 * Explanation: The subarrays that contain the element 3 at least 2 times are:
 * [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].
 * 
 * Example 2:
 * Input: nums = [1,4,2,1], k = 3
 * Output: 0
 * Explanation: No subarray contains the element 4 at least 3 times.
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^6
 * - 1 <= k <= nums.length
 */
export class CountSubarraysWhereMaxElementAppearsAtLeastKTimes {
  /**
   * Approach: Sliding Window
   * Time Complexity: O(n) where n is the length of nums
   * Space Complexity: O(1)
   * 
   * Key insight: Use sliding window to find all subarrays where the maximum element
   * appears at least k times. For each valid window ending at position i,
   * all subarrays from windowStart to i are valid.
   */
  countSubarrays(nums: number[], k: number): number {
    let count = 0;
    let maxCount = 0;
    const maxElement = Math.max(...nums);
    let windowStart = 0;

    for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
      // Expand the window
      if (nums[windowEnd] === maxElement) {
        maxCount++;
      }

      // Shrink the window when we have at least k occurrences of max element
      while (maxCount >= k) {
        // All subarrays from windowStart to any position >= windowEnd are valid
        count += nums.length - windowEnd;
        
        // Shrink the window from left
        if (nums[windowStart] === maxElement) {
          maxCount--;
        }
        windowStart++;
      }
    }

    return count;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2962. Count Subarrays Where Max Element Appears at Least K Times');
    
    const solution = new CountSubarraysWhereMaxElementAppearsAtLeastKTimes();
    
    const testCases = [
      {
        name: 'Example 1: [1,3,2,3,3], k=2',
        nums: [1, 3, 2, 3, 3],
        k: 2,
        expected: 6
      },
      {
        name: 'Example 2: [1,4,2,1], k=3',
        nums: [1, 4, 2, 1],
        k: 3,
        expected: 0
      },
      {
        name: 'Single element: [5], k=1',
        nums: [5],
        k: 1,
        expected: 1
      },
      {
        name: 'All same elements: [3,3,3], k=2',
        nums: [3, 3, 3],
        k: 2,
        expected: 3
      },
      {
        name: 'k equals array length: [1,2,3], k=3',
        nums: [1, 2, 3],
        k: 3,
        expected: 0
      }
    ];

    for (const testCase of testCases) {
      const result = solution.countSubarrays([...testCase.nums], testCase.k);
      TestHelper.runTest(testCase.name, testCase.expected, result);
    }

    console.log('\n📝 Algorithm Notes:');
    console.log('• Uses sliding window technique with two pointers');
    console.log('• Finds maximum element first, then counts valid subarrays');
    console.log('• For each valid window, all subarrays from start to end are counted');
  }
}