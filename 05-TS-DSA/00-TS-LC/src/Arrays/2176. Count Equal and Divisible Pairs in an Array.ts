import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2176. Count Equal and Divisible Pairs in an Array
 * 
 * Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.
 * 
 * Example 1:
 * Input: nums = [3,1,2,2,2,1,3], k = 2
 * Output: 4
 * Explanation: There are 4 pairs that meet all the requirements:
 * - nums[0] == nums[6], and 0 * 6 == 0, which is divisible by 2.
 * - nums[2] == nums[3], and 2 * 3 == 6, which is divisible by 2.
 * - nums[2] == nums[4], and 2 * 4 == 8, which is divisible by 2.
 * - nums[3] == nums[4], and 3 * 4 == 12, which is divisible by 2.
 * 
 * Example 2:
 * Input: nums = [1,2,3,4], k = 1
 * Output: 0
 * Explanation: Since no value in nums is repeated, there are no pairs (i,j) where nums[i] == nums[j].
 * 
 * Constraints:
 * - 1 <= nums.length <= 100
 * - 1 <= nums[i], k <= 100
 */
export class CountEqualAndDivisiblePairs {
  /**
   * Approach: Group by value and check divisibility
   * Time Complexity: O(n²) in worst case when all elements are same
   * Space Complexity: O(n) for storing indices
   * 
   * Key insight: Only equal elements can form valid pairs, so group by value first.
   */
  countPairs(nums: number[], k: number): number {
    const pos: { [key: number]: number[] } = {}; // Map to store indices for each number
    let count = 0;

    // Step 1: Group numbers by their values
    for (let i = 0; i < nums.length; i++) {
      if (!pos[nums[i]]) {
        pos[nums[i]] = [];
      }

      // Step 2: Check only within the same group (same number)
      for (const j of pos[nums[i]]) {
        if ((i * j) % k === 0) {
          count++;
        }
      }

      // Step 3: Add current index to the list for the number
      pos[nums[i]].push(i);
    }

    return count;
  }

  /**
   * Alternative approach: Brute force for comparison
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  countPairsBruteForce(nums: number[], k: number): number {
    let count = 0;
    
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] === nums[j] && (i * j) % k === 0) {
          count++;
        }
      }
    }
    
    return count;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2176. Count Equal and Divisible Pairs in an Array');
    
    const solution = new CountEqualAndDivisiblePairs();
    
    const testCases = [
      {
        name: 'Example 1: [3,1,2,2,2,1,3], k=2',
        nums: [3, 1, 2, 2, 2, 1, 3],
        k: 2,
        expected: 4
      },
      {
        name: 'Example 2: [1,2,3,4], k=1',
        nums: [1, 2, 3, 4],
        k: 1,
        expected: 0
      },
      {
        name: 'All same elements: [1,1,1,1], k=1',
        nums: [1, 1, 1, 1],
        k: 1,
        expected: 6
      },
      {
        name: 'Single pair: [2,2], k=1',
        nums: [2, 2],
        k: 1,
        expected: 1
      },
      {
        name: 'No valid pairs: [1,2,1,2], k=3',
        nums: [1, 2, 1, 2],
        k: 3,
        expected: 1
      }
    ];

    // Test both approaches
    const approaches = [
      { name: 'Optimized (Group by value)', method: solution.countPairs.bind(solution) },
      { name: 'Brute Force', method: solution.countPairsBruteForce.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const result = approach.method([...testCase.nums], testCase.k);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    console.log('\n📝 Algorithm Notes:');
    console.log('• Optimized approach groups elements by value first');
    console.log('• Only checks pairs within same value groups');
    console.log('• Brute force checks all pairs for comparison');
  }
}