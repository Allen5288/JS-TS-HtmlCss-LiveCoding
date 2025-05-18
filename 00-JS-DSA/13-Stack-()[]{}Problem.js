// ()[]{}Problem
function isValid(s) {
  const stack = [];
  const mapping = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    if (curr in mapping) {
      const topElement = stack.length > 0 ? stack.pop() : "#";
      if (mapping[curr] !== topElement) {
        return false;
      }
    } else {
      stack.push(curr);
    }
  }
  return stack.length === 0;
}

// Test cases
function test() {
  const testCases = [
    ["()", true],
    ["()[]{}", true],
    ["(]", false],
    ["([)]", false],
    ["{[]}", true],
    ["", true],
  ];
  for (let i = 0; i < testCases.length; i++) {
    const [input, expected] = testCases[i];
    const result = isValid(input);
    if (result !== expected) {
      console.log(
        `Test case ${i + 1} failed: expected ${expected}, got ${result}`
      );
    } else {
      console.log(`Test case ${i + 1} passed`);
    }
  }
}

// Run the test function
test();
