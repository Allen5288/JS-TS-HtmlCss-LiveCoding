function maxDifference(s: string, k: number): number {
    const n = s.length;
    let ans = -Infinity;

    const getStatus = (cnt_a: number, cnt_b: number): number => {
        return ((cnt_a & 1) << 1) | (cnt_b & 1);  // status: 2-bit number
    };

    const chars = ["0", "1", "2", "3", "4"];

    for (const a of chars) {
        for (const b of chars) {
            if (a === b) continue;

            const best = [Infinity, Infinity, Infinity, Infinity];
            let cnt_a = 0, cnt_b = 0;
            let prev_a = 0, prev_b = 0;
            let left = -1;

            for (let right = 0; right < n; right++) {
                if (s[right] === a) cnt_a++;
                if (s[right] === b) cnt_b++;

                while (right - left >= k && cnt_b - prev_b >= 2) {
                    const leftStatus = getStatus(prev_a, prev_b);
                    best[leftStatus] = Math.min(best[leftStatus], prev_a - prev_b);

                    left++;
                    if (s[left] === a) prev_a++;
                    if (s[left] === b) prev_b++;
                }

                const rightStatus = getStatus(cnt_a, cnt_b);
                const targetStatus = rightStatus ^ 0b10;  // want left a's parity to be opposite

                if (best[targetStatus] !== Infinity) {
                    ans = Math.max(ans, (cnt_a - cnt_b) - best[targetStatus]);
                }
            }
        }
    }

    return ans === -Infinity ? -1 : ans;
};