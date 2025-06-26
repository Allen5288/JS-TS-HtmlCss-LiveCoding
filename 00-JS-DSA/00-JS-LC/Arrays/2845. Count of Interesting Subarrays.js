/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function(nums, modulo, k) {
    const len = nums.length
    if (modulo === 1)   return len * (1 + len) / 2

    
    let result = 0, countSF = 0
    if (modulo <= 5) {
        const totals = new Array(modulo).fill(0)
        totals[0] = 1
        for (const [i, val] of nums.entries()) {
            const rmd = val % modulo
            if (rmd === k) {
                countSF++
            }

            const seekedRmd = (countSF - k + modulo) % modulo
            const outcome = totals[seekedRmd]
            result += outcome

            totals[countSF % modulo]++
        }
    } else {
        const count2freq = [1]
        for (const [i, val] of nums.entries()) {
            const rmd = val % modulo
            if (rmd === k) {
                countSF++
            }

            for (let seekMe = countSF - k; seekMe > -1; seekMe -= modulo) {
                result += count2freq[seekMe] ?? 0
            }

            count2freq[countSF] = 1 + (count2freq[countSF] ?? 0)
        }
    }


    return result
};