/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
    const MOD = 1e9 + 7;
    if (n === 1) return 1;
    if (n === 2) return 2;

    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // 1 way to fill empty board
    dp[1] = 1;  // 1 way for n = 1 (vertical domino)
    dp[2] = 2;  // 2 ways for n = 2 (two vertical dominos OR two horizontal dominos)

    for (let i = 3; i <= n; i++) {
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
    }

    return dp[n];
};