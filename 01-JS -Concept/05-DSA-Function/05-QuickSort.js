// quick sort
// time complexity: O(n log n), best case: O(n log n), worst case: O(n^2)
// space complexity: O(log n)
// explain: Quick Sort is a divide-and-conquer algorithm that sorts an array by
// selecting a 'pivot' element and partitioning the other elements into two sub-arrays
// according to whether they are less than or greater than the pivot. The sub-arrays are
// then sorted recursively.

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSortInPlace(arr, left, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

// Example usage
const array = [3, 6, 8, 10, 1, 2, 1];
const sortedArray = quickSort(array);
console.log("Sorted Array:", sortedArray); // Output: [1, 1, 2, 3, 6, 8, 10]