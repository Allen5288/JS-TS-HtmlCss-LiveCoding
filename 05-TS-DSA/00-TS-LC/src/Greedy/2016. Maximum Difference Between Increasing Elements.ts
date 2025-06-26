function maximumDifference(nums: number[]): number {
    let minValue = nums[0];
    let maxDiff = -1;
    for (let num of nums) {
        if (num <= minValue) {
            minValue = num
        }
        else {
            maxDiff = Math.max(num - minValue, maxDiff)
        }
    }
    return maxDiff
};