// Helper function to calculate the number of valid numbers ≤ num 
// where all digits (including prefix) ≤ limit and ending with suffix s
function adjust(num, limit, s) {
    let sn = parseInt(s);                  // numeric value of suffix string
    let sufMod = 10 ** s.length;          // power of 10 used to isolate suffix
    let suf = num % sufMod;               // extract suffix from num
    num = Math.floor(num / sufMod);       // extract prefix by removing suffix

    // If suffix is smaller than s, we need to reduce prefix to stay below num
    if (suf < sn) --num;

    // If prefix becomes zero or negative, we are out of range
    if (num <= 0) return num + 1;

    let sNum = num.toString();            // convert prefix to string for digit-level traversal
    let res = sNum.charCodeAt(0) - 48;    // convert first digit to int
    let tight = 1;                        // tight = 1 means we are still matching num's prefix exactly

    // If first digit is already beyond limit, all numbers with this length are valid
    if (res > limit) {
        return (limit + 1) ** sNum.length;
    }

    // Traverse remaining digits of the prefix
    for (let i = 1; i < sNum.length; ++i) {
        res *= (limit + 1);  // expand base (limit+1) representation

        if (tight) {
            let c = sNum.charCodeAt(i) - 48;
            if (c > limit) {
                tight = 0;        // we broke the prefix tightness
                res += limit + 1;
            } else {
                res += c;
            }
        }
    }

    return res + tight;
}

// Main function: return count of valid numbers in range [start, finish]
var numberOfPowerfulInt = function (start, finish, limit, s) {
    --start;                      // adjust to [0, finish] for inclusive range logic
    let ss = adjust(start, limit, s);  // valid numbers ≤ start - 1
    let ff = adjust(finish, limit, s); // valid numbers ≤ finish
    return ff - ss;                    // total valid in [start, finish]
};