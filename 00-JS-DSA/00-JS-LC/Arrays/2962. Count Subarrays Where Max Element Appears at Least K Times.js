/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    let count = 0;
    let maxCount = 0;
    let maxElement = Math.max(...nums);
    let windowStart = 0;

    for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
        if (nums[windowEnd] === maxElement) {
            maxCount++;
        }

        while (maxCount >= k) {
            count += nums.length - windowEnd;
            if (nums[windowStart] === maxElement) {
                maxCount--;
            }
            windowStart++;
        }
    }

    return count;
};