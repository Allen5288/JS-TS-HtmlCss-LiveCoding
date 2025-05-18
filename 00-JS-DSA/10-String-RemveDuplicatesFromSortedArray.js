// 10-RemveDuplicatesFromSortedArray
// Given a sorted array, remove the duplicates in-place such that each element appears only once and return the new length.
// Do not allocate extra space for another array.
// You must do this by modifying the input array in-place with O(1) extra memory.

function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let uniqueIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[uniqueIndex]) {
      uniqueIndex++;
      arr[uniqueIndex] = arr[i];
    }
  }

  // Resize the array to the new length
  arr.length = uniqueIndex + 1;
  return arr.length;
}
// time complexity: O(n)
// space complexity: O(1)

// using splice
function removeDuplicatesMethod2(arr) {
  if (arr.length === 0) return 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr.length;
}

// Test cases
function test() {
  const testCases = [
    [[1, 1, 2], 2],
    [[0, 0, 1, 1, 2, 2, 3, 3, 4], 5],
    [[1, 2, 3], 3],
    [[1], 1],
    [[], 0],
    [[1, 1, 1], 1],
    [[1, 2, 2], 2],
    [[1, 2, 3], 3],
    [[-1, -1, -1], -1],
    [[-1, -2, -3], -3],
    [[-3, -2, -1], -1],
    [[-3, -3, -2], -2],
    [[-3, -2], -2],
    [[-2], -2],
    [[-3], -3],
    [[-4], -4],
    [[-4, -4], -4],
    [[-4, -5], -5],
    [[-5], -5],
    [[-5, -6], -6],
    [[-6], -6],
    [[-6, -7], -7],
  ];
  for (let i = 0; i < testCases.length; i++) {
    const [input, expected] = testCases[i];
    const result = removeDuplicates(input);
    if (result !== expected) {
      console.log(
        `Test case ${i + 1} failed: expected ${expected}, got ${result}`
      );
    } else {
      console.log(`Test case ${i + 1} passed`);
    }
  }
}
// Run the test function
test();
