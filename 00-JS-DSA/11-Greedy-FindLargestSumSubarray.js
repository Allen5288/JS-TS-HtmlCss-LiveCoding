// FindLargestSumSubarray
// Given an array of integers, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

function findLargestSumSubarray(arr) {
    if (arr.length === 0) return 0;
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
// time complexity: O(n)
// space complexity: O(1)


// Test cases
function test() {
    const testCases = [
        [[-2,1,-3,4,-1,2,1,-5,4], 6],
        [[1], 1],
        [[-1], -1],
        [[-2,-3,-1], -1],
        [[2, 3, -2, 4], 7],
        [[-2, -3, -4], -2],
        [[-1, -2, -3], -1],
        [[0], 0],
        [[-1, 0, 1], 1],
    ];
    for (let i = 0; i < testCases.length; i++) {
        const [input, expected] = testCases[i];
        const result = findLargestSumSubarray(input);
        if (result !== expected) {
            console.log(`Test case ${i + 1} failed: expected ${expected}, got ${result}`);
        } else {
            console.log(`Test case ${i + 1} passed`);
        }
    }
}

// Run the test function
test();
