
var findWordsContaining = function (words, x) {
    const res = [];
    const n = words.length;
    for (let i = 0; i < n; i++) {
        if (words[i].includes(x)) {
            res.push(i);
        }
    }
    return res;
};