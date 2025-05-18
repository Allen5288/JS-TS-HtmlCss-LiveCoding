// Bubble Sort
// Time Complexity: O(n^2). best case: O(n), worst case: O(n^2)
// Space Complexity: O(1)
// explain: Bubble Sort is a simple sorting algorithm that 
// repeatedly steps through the list, compares adjacent elements, 
// and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no two elements were swapped in the inner loop, the array is already sorted
    if (!swapped) {
      break;
    }
  }

  return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const sortedArr = bubbleSort(arr);
console.log("Sorted array:", sortedArr);
// Output: Sorted array: [11, 12, 22, 25, 34, 64, 90]