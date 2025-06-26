function minimumDeletions(word: string, k: number): number {
    const A = new Array(26).fill(0);
    for (const c of word) {
        A[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    let res = 1e6;
    for (const x of A) {
        let cur = 0;
        for (const a of A) {
            cur += (a < x) ? a : Math.max(0, a - (x + k));
        }
        res = Math.min(res, cur);
    }
    return res;
}