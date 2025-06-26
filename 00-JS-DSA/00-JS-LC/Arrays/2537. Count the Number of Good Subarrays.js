/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function(nums, k) {
    let left = 0;
    let currentPairs = 0;
    let result = 0;
    let freqMap = new Map();
    
    for (let right = 0; right < nums.length; right++) {
        // Add the new element to the frequency map
        const currentNum = nums[right];
        const currentFreq = freqMap.get(currentNum) || 0;
        
        // When we add a new occurrence, it forms pairs with all previous occurrences
        currentPairs += currentFreq;
        
        // Update frequency map
        freqMap.set(currentNum, currentFreq + 1);
        
        // Shrink window from left until we no longer satisfy the condition
        while (currentPairs >= k) {
            // All subarrays ending at 'right' and starting between 0 and 'left' (inclusive) are good
            result += (nums.length - right);
            
            // Remove leftmost element from window
            const leftNum = nums[left];
            const leftFreq = freqMap.get(leftNum);
            
            // When we remove an occurrence, we lose pairs it formed with remaining occurrences
            currentPairs -= (leftFreq - 1);
            
            // Update frequency map
            if (leftFreq === 1) {
                freqMap.delete(leftNum);
            } else {
                freqMap.set(leftNum, leftFreq - 1);
            }
            
            left++;
        }
    }
    
    return result;
};