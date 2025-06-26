function findKDistantIndices(nums: number[], key: number, k: number): number[] {
    const res: number[] = [];
    const n = nums.length;
    // traverse number pairs
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (nums[j] === key && Math.abs(i - j) <= k) {
                res.push(i);
                break; // early termination to prevent duplicate addition
            }
        }
    }
    return res;
}