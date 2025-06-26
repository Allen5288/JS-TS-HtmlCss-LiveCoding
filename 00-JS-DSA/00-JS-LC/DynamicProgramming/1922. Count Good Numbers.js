/**
 * @param {number} n
 * @return {number}
 */
const MOD = 1_000_000_007;

// Fast modular exponentiation: (base^exp) % mod
function modPow(base, exp, mod) {
    let result = 1n;
    let b = BigInt(base), e = BigInt(exp), m = BigInt(mod);
    while (e > 0) {
        if (e % 2n === 1n) result = (result * b) % m;
        b = (b * b) % m;
        e = e / 2n;
    }
    return result;
}

var countGoodNumbers = function (n) {
    const evenCount = Math.ceil(n / 2); // positions: 0, 2, 4, ...
    const oddCount = Math.floor(n / 2); // positions: 1, 3, 5, ...

    const evenWays = modPow(5, evenCount, MOD);
    const oddWays = modPow(4, oddCount, MOD);

    return Number((evenWays * oddWays) % BigInt(MOD));
};