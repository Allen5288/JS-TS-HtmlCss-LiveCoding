// merge sort algorithm
// Time Complexity: O(n log n). best case: O(n log n), worst case: O(n log n)
// Space Complexity: O(n)
// explain: Merge Sort is a divide-and-conquer algorithm that sorts an array by
// recursively dividing it into two halves, sorting each half, and then merging the sorted halves.

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr; // Base case: array is already sorted
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // Sort the left half
  const right = mergeSort(arr.slice(mid)); // Sort the right half

  return merge(left, right); // Merge the sorted halves
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Merge the two sorted arrays
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add any remaining elements from the left array
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  // Add any remaining elements from the right array
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
const sortedArr = mergeSort(arr);
console.log("Sorted array:", sortedArr);