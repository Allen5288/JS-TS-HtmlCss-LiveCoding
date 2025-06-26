class Mat {
    constructor(copyFrom = null) {
        this.a = Array.from({ length: 26 }, () => new Array(26).fill(0n));
        if (copyFrom) {
            for (let i = 0; i < 26; i++) {
                for (let j = 0; j < 26; j++) {
                    this.a[i][j] = copyFrom.a[i][j];
                }
            }
        }
    }

    mul(other) {
        const MOD = BigInt(1e9 + 7);
        const result = new Mat();
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                for (let k = 0; k < 26; k++) {
                    result.a[i][j] =
                        (result.a[i][j] + this.a[i][k] * other.a[k][j]) % MOD;
                }
            }
        }
        return result;
    }
}

/* identity matrix */
function I() {
    const m = new Mat();
    for (let i = 0; i < 26; i++) {
        m.a[i][i] = 1n;
    }
    return m;
}

/* matrix exponentiation by squaring */
function quickmul(x, y) {
    let ans = I();
    let cur = new Mat(x);
    while (y > 0n) {
        if (y & (1n != 0n)) {
            ans = ans.mul(cur);
        }
        cur = cur.mul(cur);
        y >>= 1;
    }
    return ans;
}

var lengthAfterTransformations = function (s, t, nums) {
    const MOD = BigInt(1e9 + 7);
    const T = new Mat();
    for (let i = 0; i < 26; i++) {
        for (let j = 1; j <= nums[i]; j++) {
            T.a[(i + j) % 26][i] = 1n;
        }
    }

    const res = quickmul(T, t);
    const f = new Array(26).fill(0n);
    for (const ch of s) {
        f[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    let ans = 0n;
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            ans = (ans + res.a[i][j] * f[j]) % MOD;
        }
    }
    return Number(ans);
};