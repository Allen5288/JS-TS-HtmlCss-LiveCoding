// FindDuplicateWords
// find duplicate words in a string
function findDuplicateWords(str) {
    const words = str.split(" ");
    const wordCount = {};
    const duplicates = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    for (const word in wordCount) {
        if (wordCount[word] > 1) {
            duplicates.push(word);
        }
    }

    return duplicates;
}



function testFindDuplicateWords() {
    const testCases = [
        {
            input: "This is a test This is only a test",
            expected: ["this", "is", "a", "test"],
        },
        {
            input: "Hello world Hello",
            expected: ["hello"],
        },
        {
            input: "No duplicates here",
            expected: [],
        },
        {
            input: "Duplicate Duplicate Duplicate",
            expected: ["duplicate"],
        },
    ];

    testCases.forEach((testCase, index) => {
        const result = findDuplicateWords(testCase.input);
        console.log(`Test case ${index + 1}:`, result);
        console.assert(
            JSON.stringify(result) === JSON.stringify(testCase.expected),
            `Expected ${JSON.stringify(testCase.expected)} but got ${JSON.stringify(result)}`
        );
    });
}
// Run the test function
testFindDuplicateWords();