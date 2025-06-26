var isZeroArray = function (nums, queries) {
    const deltaArray = new Array(nums.length + 1).fill(0);
    for (const [left, right] of queries) {
        deltaArray[left] += 1;
        deltaArray[right + 1] -= 1;
    }
    const operationCounts = [];
    let currentOperations = 0;
    for (const delta of deltaArray) {
        currentOperations += delta;
        operationCounts.push(currentOperations);
    }
    for (let i = 0; i < nums.length; i++) {
        if (operationCounts[i] < nums[i]) {
            return false;
        }
    }
    return true;
};