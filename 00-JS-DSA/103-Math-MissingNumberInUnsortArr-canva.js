// MissingNumberInUnsortArr

// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one number that is missing from the array.

function missingNumber(arr, lowerBound, upperBound) {
  const n = upperBound - lowerBound + 1;
  const totalSum = (n * (n - 1)) / 2;
  const arrSum = arr.reduce((acc, num) => acc + num, 0);
  return totalSum - arrSum;
}

function missingNumberXOR(arr, lowerBound, upperBound) {
  const n = upperBound - lowerBound + 1;
  let xorAll = 0;
  let xorArr = 0;

  for (let i = lowerBound; i <= upperBound; i++) {
    xorAll ^= i;
  }

  for (let i = 0; i < arr.length; i++) {
    xorArr ^= arr[i];
  }

  return xorAll ^ xorArr;
}

function testMissingNumber() {
    const testCases = [
        {
        input: [3, 0, 1],
        lowerBound: 0,
        upperBound: 3,
        expected: 2,
        },
        {
        input: [0, 1],
        lowerBound: 0,
        upperBound: 2,
        expected: 2,
        },
        {
        input: [9, 6, 4, 2, 3, 5, 7, 0, 1],
        lowerBound: 0,
        upperBound: 9,
        expected: 8,
        },
        {
        input: [0],
        lowerBound: 0,
        upperBound: 1,
        expected: 1,
        },
        {
        input: [],
        lowerBound: 0,
        upperBound: 0,
        expected: 0,
        },
    ];
    
    testCases.forEach((testCase, index) => {
        const result = missingNumber(testCase.input, testCase.lowerBound, testCase.upperBound);
        console.log(`Test case ${index + 1}:`, result);
        console.assert(
        result === testCase.expected,
        `Expected ${testCase.expected} but got ${result}`
        );
    });
}

// Run the test function
testMissingNumber();
