/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function(low, high) {
    let count = 0;
    
    for (let num = low; num <= high; num++) {
        const numStr = num.toString();
        const length = numStr.length;
        
        // Skip numbers with odd number of digits
        if (length % 2 === 0) {
            const half = length / 2;
            let firstHalfSum = 0;
            let secondHalfSum = 0;
            
            // Calculate sum of first half digits
            for (let i = 0; i < half; i++) {
                firstHalfSum += parseInt(numStr[i]);
            }
            
            // Calculate sum of second half digits
            for (let i = half; i < length; i++) {
                secondHalfSum += parseInt(numStr[i]);
            }
            
            // If sums are equal, it's a symmetric integer
            if (firstHalfSum === secondHalfSum) {
                count++;
            }
        }
    }
    
    return count;
};