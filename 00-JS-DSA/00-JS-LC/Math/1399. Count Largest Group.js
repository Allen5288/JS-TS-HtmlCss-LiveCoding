/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function(n) {
    // Map to store the count of each digit sum
    const groups = new Map();
    
    // Helper function to calculate sum of digits
    const getDigitSum = (num) => {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    
    // Group the numbers from 1 to n
    for (let i = 1; i <= n; i++) {
        const digitSum = getDigitSum(i);
        groups.set(digitSum, (groups.get(digitSum) || 0) + 1);
    }
    
    // Find the maximum group size
    let maxSize = 0;
    for (const size of groups.values()) {
        maxSize = Math.max(maxSize, size);
    }
    
    // Count groups with the maximum size
    let count = 0;
    for (const size of groups.values()) {
        if (size === maxSize) {
            count++;
        }
    }
    
    return count;
};