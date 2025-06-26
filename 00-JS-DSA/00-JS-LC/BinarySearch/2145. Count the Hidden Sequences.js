/**
 * @param {number[]} differences
 * @param {number} lower
 * @param {number} 
 * @return {number}
 */
var numberOfArrays = function (differences, lower, upper) {
    let prev = 0
    let low = lower
    let up = upper

    for (let i = 0; i < differences.length; i++) {

        const accumDif = differences[i] + prev
        prev = accumDif

        let lowerSatisfy = lower - accumDif
        let upperSatisfy = upper - accumDif

        low = Math.max(low, lowerSatisfy)
        up = Math.min(up, upperSatisfy)

        if (up - low + 1 <= 0) return 0
    }


    return up - low + 1

};