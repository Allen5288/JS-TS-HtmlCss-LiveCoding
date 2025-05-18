// Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = {};

    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }

    return true;
}
// time complexity: O(n)
// space complexity: O(n)

function isAnagramMethod2(s, t) {
    if (s.length !== t.length) return false;

    const sortedS = s.split('').sort().join('');
    const sortedT = t.split('').sort().join('');

    return sortedS === sortedT;
}
// time complexity: O(n log n)
// space complexity: O(n)

// Test cases for the isAnagram function
function testAnagram() {
    const testCases = [
        { input: ["anagram", "nagaram"], expected: true },
        { input: ["rat", "car"], expected: false },
        { input: ["listen", "silent"], expected: true },
        { input: ["hello", "world"], expected: false },
        { input: ["evil", "vile"], expected: true },
        { input: ["dormitory", "dirty room"], expected: true },
    ];

    testCases.forEach(({ input, expected }) => {
        const result = isAnagram(...input);
        console.assert(result === expected, `isAnagram(${input}) = ${result}, expected ${expected}`);
    });

    console.log("All tests passed!");
}
testAnagram();
