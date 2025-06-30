function findLHS(nums: number[]): number {
    let dict = new Map<number, number>();
    let maxLength = 0;
    for (let num of nums) {
        dict.set(num, (dict.get(num) || 0) + 1);
    }
    for (let [key, value] of dict) {
        if (dict.has(key + 1)) {
            maxLength = Math.max(maxLength, value + dict.get(key + 1)!);
        }
    }
    return maxLength;
};