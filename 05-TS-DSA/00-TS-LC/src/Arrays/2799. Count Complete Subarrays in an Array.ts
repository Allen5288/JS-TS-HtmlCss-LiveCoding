import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2799. Count Complete Subarrays in an Array
 * 
 * TODO: Add problem description
 */
export class CountCompleteSubarraysInAnArray {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  countCompleteSubarrays(nums: number[]): number {
    let res = 0;
        let cnt = new Map();
        const n = nums.length;
        let right = 0;
        const distinct = new Set(nums).size;
    
        for (let left = 0; left < n; left++) {
            if (left > 0) {
                const remove = nums[left - 1];
                cnt.set(remove, cnt.get(remove) - 1);
                if (cnt.get(remove) === 0) {
                    cnt.delete(remove);
                }
            }
            while (right < n && cnt.size < distinct) {
                const add = nums[right];
                cnt.set(add, (cnt.get(add) || 0) + 1);
                right++;
            }
            if (cnt.size === distinct) {
                res += n - right + 1;
            }
        }
        return res;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2799. Count Complete Subarrays in an Array');
    
    const solution = new CountCompleteSubarraysInAnArray();
    
    // TODO: Add comprehensive test cases
    console.log('✅ CountCompleteSubarraysInAnArray created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}