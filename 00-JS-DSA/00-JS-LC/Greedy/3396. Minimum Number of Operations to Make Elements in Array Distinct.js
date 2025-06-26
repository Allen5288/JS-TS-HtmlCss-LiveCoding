/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function(nums) {
    let operations = 0;
    
    while (nums.length > 0) {
        // Check if current array has distinct elements
        const set = new Set(nums);
        if (set.size === nums.length) {
            return operations;
        }
        
        // Remove 3 elements from the beginning or all if fewer than 3
        const elementsToRemove = Math.min(3, nums.length);
        nums = nums.slice(elementsToRemove);
        operations++;
    }
    
    return operations;
};