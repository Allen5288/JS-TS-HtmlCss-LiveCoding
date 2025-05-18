// FindTheLargestSecondNum with duplicate numbers
// Given an array of numbers, find the largest second number in the array.
function findTheLargestSecondNum(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num < first) {
      second = num;
    }
  }

  return second;
}
// time complexity: O(n)
// space complexity: O(1)

function findTheLargestSecondNumMethod2(arr) {
  const uniqueValues = [...new Set(arr)];
  if (uniqueValues.length < 2) return -Infinity;
  uniqueValues.sort((a, b) => b - a);
  return uniqueValues[1];
}
// time complexity: O(n log n)
// space complexity: O(n)

// Test cases
function test() {
  testCases = [
    [[1, 2, 3, 4, 5], 4],
    [[5, 4, 3, 2, 1], 4],
    [[1, 2, 3, 4, 5, 5], 4],
    [[5, 5, 5, 5], -Infinity],
    [[1], -Infinity],
    [[], -Infinity],
    [[-1, -2, -3], -2],
    [[-1, -2, -3, -4], -2],
    [[-1, -2, -3, -4, -5], -2],
    [[-1, -2, -3, -4, -5, -5], -2],
    [[-1, -2, -3, -4, -5, -6], -2],
    [[-1, -2, -3, -4, -5, 0], 0],
    [[-1, -2, -3, 0], 0],
    [[-1, 0], 0],
    [[0], -Infinity],
    [[1], -Infinity],
    [[1, 2], 1],
    [[2, 1], 1],
  ];
  for (let i = 0; i < testCases.length; i++) {
    const [input, expected] = testCases[i];
    const result = findTheLargestSecondNum(input);
    if (result !== expected) {
      console.log(
        `Test case ${i + 1} failed: expected ${expected}, got ${result}`
      );
    } else {
      console.log(`Test case ${i + 1} passed`);
    }
  }
}
test();
