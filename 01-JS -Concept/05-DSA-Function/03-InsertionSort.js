// Insertion Sort
// Time Complexity: O(n^2). best case: O(n), worst case: O(n^2)
// Space Complexity: O(1)
// explain: Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.
// It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.

function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }

  return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const sortedArr = insertionSort(arr);
console.log("Sorted array:", sortedArr);