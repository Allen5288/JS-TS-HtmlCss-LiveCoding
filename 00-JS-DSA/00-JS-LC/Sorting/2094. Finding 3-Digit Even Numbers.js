/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
    const nums = new Set();
    const n = digits.length;
    // Traverse the indices of three digits
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            for (let k = 0; k < n; ++k) {
                // Determine whether it meets the condition of the target even number
                if (i === j || j === k || i === k) {
                    continue;
                }
                const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                if (num >= 100 && num % 2 === 0) {
                    nums.add(num);
                }
            }
        }
    }
    // Converted to an array sorted in ascending order
    const res = Array.from(nums).sort((a, b) => a - b);
    return res;
};