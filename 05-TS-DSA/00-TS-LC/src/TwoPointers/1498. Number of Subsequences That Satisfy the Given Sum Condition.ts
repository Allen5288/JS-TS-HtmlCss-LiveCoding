function numSubseq(nums: number[], target: number): number {
    const MOD = 10 ** 9 + 7
    nums.sort((a, b) => a-b)
    let left = 0
    let right = nums.length - 1
    let res = 0

    // Calculate power of 2 according to MOD
    const powerMod = new Array(nums.length).fill(1)
    for(let i=1; i<nums.length; i+=1) {
        powerMod[i] = (powerMod[i-1] * 2) % MOD
    }

    // Using two pointer to loop to check
    while(left <= right) {
        // If sastisfied => calculate number of sub sequence including LEFT char
        // subsequence: left char + subsequence of (right-left) char : 2^(right-left)
        if (nums[left] + nums[right] <= target) {
            res = (res + powerMod[right - left]) % MOD
            left += 1
        } else {
            right -= 1
        }
    }

    return res
};