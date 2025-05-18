// maxSlidingWindow
// Given an integer array nums and an integer k, return the maximum sliding window of size k.
// You must write an algorithm that runs in O(n) time.

function maxSlidingWindow(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return [];

  const result = [];
  const deque = []; // This will store indices of the elements in nums

  for (let i = 0; i < n; i++) {
    // Remove elements not in the sliding window
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove elements smaller than the current element from the back of the deque
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Add the current element's index to the deque
    deque.push(i);

    // The front of the deque is the maximum for the current window
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// test cases
function testMaxSlidingWindow() {
  const testCases = [
    { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] },
    { nums: [1], k: 1, expected: [1] },
    { nums: [1, -1], k: 1, expected: [1, -1] },
    { nums: [9, 11], k: 2, expected: [11] },
    { nums: [4, -2], k: 2, expected: [4] },
    { nums: [], k: 0, expected: [] },
    { nums: [7], k: 1, expected: [7] },
  ];

  testCases.forEach(({ nums, k, expected }, index) => {
    const result = maxSlidingWindow(nums, k);
    console.log(
      `Test case ${index + 1}: ${
        JSON.stringify(result) === JSON.stringify(expected)
          ? "Passed"
          : "Failed"
      }`
    );
  });
}
testMaxSlidingWindow();
