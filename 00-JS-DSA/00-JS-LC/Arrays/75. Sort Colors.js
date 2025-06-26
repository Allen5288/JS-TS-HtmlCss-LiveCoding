/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
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
};
