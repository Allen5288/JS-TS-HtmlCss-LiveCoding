// RotateArrayByK
// Given an array of n elements and a number k, rotate the array by k elements.
// The rotation should be done in place, meaning that the original array should be modified.

function rotateArrayByK(arr, k) {
  const n = arr.length;
  k = k % n; // Handle cases where k is greater than n
  reverse(arr, 0, n - 1); // Reverse the entire array
  reverse(arr, 0, k - 1); // Reverse the first k elements
  reverse(arr, k, n - 1); // Reverse the remaining elements

  return arr; // Return the rotated array
}
function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}
// time complexity: O(n)
// space complexity: O(1)

// using splice and unshift
function rotateArrayByKMethod2(arr, k) {
  const n = arr.length;
  k = k % n; // Handle cases where k is greater than n
  if (k === 0) return arr; // No rotation needed
  const rotatedPart = arr.splice(-k); // Remove the last k elements
  arr.unshift(...rotatedPart); // Add them to the front

  return arr;
}
// time complexity: O(n)
// space complexity: O(n)
console.log(
  "rotate 2 is : ",
  rotateArrayByKMethod2([1, 2, [3, 4, 5], 4, 5], 3)
);

// Test cases
function test() {
  const testCases = [
    [[1, 2, 3, 4, 5], 2, [4, 5, 1, 2, 3]],
    [[1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
    [[1, 2, 3, 4, 5], 0, [1, 2, 3, 4, 5]],
    [[1], 1, [1]],
    [[], 1, []],
    [[1], -1, [1]],
    [[1], -2, [1]],
    [[1], -3, [1]],
    [[-1], -3, [-1]],
    [[-1], -2, [-1]],
    [[-1], -1, [-1]],
    [[-1], -0.5, [-1]],
    [[-0.5], -0.5, [-0.5]],
    [[-0.5], -0.25, [-0.5]],
    [[-0.25], -0.25, [-0.25]],
    [[-0.25], -0.125, [-0.25]],
    [[-0.125], -0.125, [-0.125]],
    [[-0.125], -0.0625, [-0.125]],
  ];
  for (let i = 0; i < testCases.length; i++) {
    const [input, k, expected] = testCases[i];
    const arr = [...input]; // Create a copy of the input array
    rotateArrayByK(arr, k);
    if (JSON.stringify(arr) !== JSON.stringify(expected)) {
      console.log(
        `Test case ${i + 1} failed: expected ${expected}, got ${arr}`
      );
    } else {
      console.log(`Test case ${i + 1} passed`);
    }
  }
}
// Run the test function
test();