var threeConsecutiveOdds = function(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 1) {
            count++;
        } else {
            count = 0;
        }

        if (count === 3) {
            return true;
        }
    }

    return false;
};