/**
 * @param {number[]} nums
 * @return {number}
 */
var countSubarrays = function(nums) {
    if (nums.length < 3) return 0;
    
    let count = 0;
    
    // Iterate up to length-2 to ensure we can form subarrays of length 3
    for (let i = 0; i <= nums.length - 3; i++) {
        // Check if the sum of first and third equals half of the second
        if (nums[i] + nums[i+2] === nums[i+1] / 2) {
            count++;
        }
    }
    
    return count;
};