/**
Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

 

Example 1:

Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.
Example 2:

Input: nums = [1,2,4,8]
Output: [1,2,4,8]
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 109
All the integers in nums are unique.
 */
var largestDivisibleSubset = function(nums) {
    const n = nums.length;
    if (n === 0) return [];
    
    // Sort the array
    nums.sort((a, b) => a - b);
    
    // dp[i] represents the size of the largest subset ending with nums[i]
    const dp = new Array(n).fill(1);
    // prev[i] represents the index of the previous element in the largest subset ending with nums[i]
    const prev = new Array(n).fill(-1);
    
    let maxIndex = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > dp[maxIndex]) {
            maxIndex = i;
        }
    }
    
    // Reconstruct the subset
    const result = [];
    while (maxIndex !== -1) {
        result.unshift(nums[maxIndex]);
        maxIndex = prev[maxIndex];
    }
    
    return result;
};