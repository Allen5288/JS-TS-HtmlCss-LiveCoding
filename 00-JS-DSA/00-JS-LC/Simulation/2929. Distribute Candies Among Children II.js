var distributeCandies = function (n, limit) {
    let ans = 0;
    for (let i = 0; i <= Math.min(limit, n); i++) {
        if (n - i > 2 * limit) {
            continue;
        }
        ans += Math.min(n - i, limit) - Math.max(0, n - i - limit) + 1;
    }
    return ans;
};