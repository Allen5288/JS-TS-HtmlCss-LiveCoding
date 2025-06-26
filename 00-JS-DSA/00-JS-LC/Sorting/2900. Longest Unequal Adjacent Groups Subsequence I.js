var getLongestSubsequence = function(words, groups) {
    let ans = [];
    let n = words.length;
    for (let i = 0; i < n; i++) {
        if (i === 0 || groups[i] !== groups[i - 1]) {
            ans.push(words[i]);
        }
    }
    return ans;
};