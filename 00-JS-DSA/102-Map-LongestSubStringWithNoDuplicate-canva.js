// LongestSubStringWithNoDuplicate
// space shouyld be O(1)
// time should be O(n)

function longestSubStringWithNoDuplicate(str) {
  let maxLength = 0;
  let start = 0;
  const charIndexMap = new Map();

  for (let i = 0.; i < str.length; i++) {
    const char = str[i];

    if (charIndexMap.has(char) && charIndexMap.get(char) >= start) {
      start = charIndexMap.get(char) + 1;
    }

    charIndexMap.set(char, i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}
// time complexity: O(n), where n is the length of the string
// space complexity: O(1), since we are using a fixed-size map for the characters

// using a constant space approach
function longestSubStringWithNoDuplicateConstantSpace(str) {
  let maxLength = 0;
  let start = 0;
  const charIndexMap = new Array(128).fill(-1); // Assuming ASCII characters

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    if (charIndexMap[charCode] >= start) {
      start = charIndexMap[charCode] + 1;
    }

    charIndexMap[charCode] = i;
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}


// Test cases
function testLongestSubStringWithNoDuplicate() {
  const testCases = [
    {
      input: "abcabcbb",
      expected: 3,
    },
    {
      input: "bbbbb",
      expected: 1,
    },
    {
      input: "pwwkew",
      expected: 3,
    },
    {
      input: "",
      expected: 0,
    },
    {
      input: "aabbcc",
      expected: 2,
    },
  ];

  testCases.forEach((testCase, index) => {
    const result = longestSubStringWithNoDuplicate(testCase.input);
    console.log(`Test case ${index + 1}:`, result);
    console.assert(
      result === testCase.expected,
      `Expected ${testCase.expected} but got ${result}`
    );
  });
}

// Run the test function
testLongestSubStringWithNoDuplicate();
