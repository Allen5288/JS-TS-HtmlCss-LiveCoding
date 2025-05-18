// KthMissingPositiveNumber
// Given an array of positive integers arr and an integer k, you need to find the kth positive integer that is missing from this array.
// The array is sorted in ascending order and contains no duplicates.
function findKthMissingPositive(arr, k) {
    let missingCount = 0;
    let current = 1;
    let i = 0;

    while (missingCount < k) {
        if (i < arr.length && arr[i] === current) {
            i++;
        } else {
            missingCount++;
        }
        current++;
    }

    return current - 1;
}
// time complexity: O(n)
// space complexity: O(1)

// Test cases
function testFindKthMissingPositive() {
    const testCases = [
        { arr: [2, 3, 4, 7, 11], k: 5, expected: 9 },
        { arr: [1, 2, 3, 4], k: 2, expected: 6 },
        { arr: [1, 2, 3], k: 3, expected: 6 },
        { arr: [1], k: 1, expected: 2 },
        { arr: [], k: 1, expected: 1 },
        { arr: [5], k: 5, expected: 10 },
        { arr: [1, 2, 3], k: 0, expected: -1 },
    ];

    testCases.forEach(({ arr, k, expected }, index) => {
        const result = findKthMissingPositive(arr, k);
        console.log(
            `Test case ${index + 1}: ${
                result === expected ? "Passed" : "Failed"
            }`
        );
    });
}
testFindKthMissingPositive();
