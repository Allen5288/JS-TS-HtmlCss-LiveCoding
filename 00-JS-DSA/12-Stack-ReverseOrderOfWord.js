// Reverse the order of words in a given string
// there amy be spaces in the beginning and end and middle
function reverseWords(str) {
    const words = str.split(" ");
    const stack = [];
    for (let i = 0; i < words.length; i++) {
        stack.push(words[i]);
    }
    let reversed = "";
    while (stack.length > 0) {
        reversed += stack.pop();
        if (stack.length > 0) {
            reversed += " ";
        }
    }
    return reversed;
}
// time complexity: O(n)
// space complexity: O(n)

function reverseWordsMethod2(str) {
    const words = str.split(" ");
    let reversed = "";
    for (let i = words.length - 1; i >= 0; i--) {
        reversed += words[i];
        if (i > 0) {
            reversed += " ";
        }
    }
    return reversed;
}

// Test cases
function test() {
    const testCases = [
        ["Hello World", "World Hello"],
        ["JavaScript is fun", "fun is JavaScript"],
        ["   Leading and trailing spaces   ", "spaces trailing and Leading   "],
        ["SingleWord", "SingleWord"],
        ["", ""],
    ];
    for (let i = 0; i < testCases.length; i++) {
        const [input, expected] = testCases[i];
        const result = reverseWords(input);
        if (result !== expected) {
            console.log(`Test case ${i + 1} failed: expected ${expected}, got ${result}`);
        } else {
            console.log(`Test case ${i + 1} passed`);
        }
    }
}

// Run the test function
test();
