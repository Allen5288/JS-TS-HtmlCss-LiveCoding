var buildArray = function (nums) {
  const n = nums.length;
  // Build the final value on the first iteration
  for (let i = 0; i < n; ++i) {
    nums[i] += 1000 * (nums[nums[i]] % 1000);
  }
  // Modified to final value on the second iteration
  for (let i = 0; i < n; ++i) {
    nums[i] = Math.floor(nums[i] / 1000);
  }
  return nums;
};
