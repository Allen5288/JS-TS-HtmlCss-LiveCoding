// Selection Sort
// Time Complexity: O(n^2). best case: O(n^2), worst case: O(n^2)
// Space Complexity: O(1)
// explain: Selection Sort is a simple sorting algorithm that divides the input list into two parts: 
// a sorted part and an unsorted part. 
// It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the sorted part.

function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Find the index of the minimum element in the unsorted part
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element of the unsorted part
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// Example usage
const arr = [64, 25, 12, 22, 11];
const sortedArr = selectionSort(arr);
console.log("Sorted array:", sortedArr);