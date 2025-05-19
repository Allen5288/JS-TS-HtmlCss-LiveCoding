// LongestLengthOfSubArrayLessEqualThanK
// Find the length of longest contiguous sub-array where the sum of the elements in subarray is less than or equal to "k".

function longestLengthOfSubArrayLessEqualThanK(arr, k) {
  let maxLength = 0;
  let sum = 0;
  let start = 0;

  for (let end = 0; end < arr.length; end++) {
    sum += arr[end];

    while (sum > k) {
      sum -= arr[start];
      start++;
    }

    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}


// test function
function testLongestLengthOfSubArrayLessEqualThanK() {
  const testCases = [
    { arr: [1, 2, 3, 4, 5], k: 5, expected: 2 },
    { arr: [1, 2, 3, 4, 5], k: 10, expected: 5 },
    { arr: [1, -1, 2, -2, 3], k: 3, expected: 5 },
    { arr: [1, -1, -1, -1], k: -1, expected: 4 },
    { arr: [], k: 0, expected: 0 },
    { arr: [1], k: 0, expected: 0 },
    { arr: [1], k: 1, expected: 1 },
    { arr: [1], k: -1, expected: 0 },
    { arr: [-1], k: -1, expected: 0 },
    { arr: [-1], k: -2, expected: 1 },
    { arr: [-1], k: -3, expected: 1 },
    { arr: [-1], k: -4, expected: 0 },
  ];

  testCases.forEach(({ arr, k, expected }) => {
    const result = longestLengthOfSubArrayLessEqualThanK(arr, k);
    console.assert(result === expected, `For arr: ${JSON.stringify(arr)} and k: ${k}, expected ${expected} but got ${result}`);
  });
}
// Run the test function
testLongestLengthOfSubArrayLessEqualThanK();