"use strict";
/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
function answerString(word, numFriends) {
    if (numFriends === 1) {
        return word;
    }
    const n = word.length;
    let res = "";
    for (let i = 0; i < n; i++) {
        const s = word.substring(i, Math.min(i + n - numFriends + 1, n));
        if (s > res) {
            res = s;
        }
    }
    return res;
}
//# sourceMappingURL=3403.%20Find%20the%20Lexicographically%20Largest%20String%20From%20the%20Box%20I.js.map