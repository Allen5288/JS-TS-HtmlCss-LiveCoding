// BSearch-SearchInSortedArray
// Binary Search - Search in Sorted Array
// Time Complexity: O(log n)
// Space Complexity: O(1)

// arr[mid] < target
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}

// alternative implementation using recursion
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1; // Base case: target not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid; // Target found
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right); // Search in the right half
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1); // Search in the left half
  }
}



// Test cases
function testBinarySearch() {
  const testCases = [
    { arr: [1, 2, 3, 4, 5], target: 3, expected: 2 },
    { arr: [1, 2, 3, 4, 5], target: 6, expected: -1 },
    { arr: [1], target: 1, expected: 0 },
    { arr: [], target: 1, expected: -1 },
    { arr: [1, 2, 3], target: 2, expected: 1 },
    { arr: [5, 6, 7], target: 5, expected: 0 },
    { arr: [10, 20, 30], target: 30, expected: 2 },
    { arr: [10, 20, 30], target: -10, expected: -1 },
    { arr: [-10, -5, -1], target: -5, expected: 1 },
    { arr: [-10, -5, -1], target: -20, expected: -1 },
    { arr: [-10], target: -10, expected: 0 },
    { arr: [-10], target: -20, expected: -1 },
    { arr: [0], target: 0, expected: 0 },
    { arr: [0], target: -1, expected: -1 },
    { arr: [1000000], target: 1000000, expected: 0 },
    { arr: [1000000], target: -1000000, expected: -1 }
  ];
  testCases.forEach(({ arr, target, expected }, index) => {
    const result = binarySearch(arr, target);
    console.assert(result === expected, `Test case ${index + 1} failed: expected ${expected}, got ${result}`);
  });
    console.log("All tests passed!");
}
testBinarySearch();