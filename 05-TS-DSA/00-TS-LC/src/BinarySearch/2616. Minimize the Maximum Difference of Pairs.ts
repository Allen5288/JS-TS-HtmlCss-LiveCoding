function minimizeMax(nums: number[], p: number): number {
    nums.sort((a, b) => a - b);
    let left = 0;
    let right = nums[nums.length - 1] - nums[0];

    const canFormPairs = (maxDiff: number): boolean => {
        let count = 0;
        for (let i = 1; i < nums.length && count < p; i++) {
            if (nums[i] - nums[i - 1] <= maxDiff) {
                count++;
                i++;
            }
        }
        return count >= p;
    };

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canFormPairs(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};