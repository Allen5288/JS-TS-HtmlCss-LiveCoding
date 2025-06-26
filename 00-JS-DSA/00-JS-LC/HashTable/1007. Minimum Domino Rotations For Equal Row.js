/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function(tops, bottoms) {
    const n = tops.length;
    const check = (target) => {
        let missingT = 0, missingB = 0;
        for (let i = 0; i < n; i++){
            const top = tops[i], bottom = bottoms[i];
            if (top !== target && bottom !== target){
                return -1;
            }

            if (top !== target) missingT++;
            if (bottom !== target) missingB++;
        }
        return  Math.min(missingT, missingB);
    };

    let result = check(tops[0]);
    if (result !== -1 || tops[0] === bottoms[0]) return result;
    return check(bottoms[0]);
};