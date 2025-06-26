import { TestHelper } from '../TestHelper';

/**
 * LeetCode 75. Sort Colors
 * 
 * TODO: Add problem description
 */
export class SortColors {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  sortColors(nums: number[]): void {
    // Dutch national flag algorithm: one-pass solution
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
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 75. Sort Colors');
    
    const solution = new SortColors();
    
    // TODO: Add comprehensive test cases
    console.log('✅ SortColors created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}