// Palindrome

function isPalindrome(str) {
    if (typeof str !== "string") {
    return false; // Not a string
  }
  const cleaned = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

function isPalindromeNumber(num) {
  if (typeof num !== "number" || num < 0) {
    return false; // Negative numbers are not palindromes
  }
  // const strNum = num.toString();
  // const reversedNum = strNum.split('').reverse().join('');
  // return strNum === reversedNum;
  return num === +num.toString().split("").reverse().join("");
}

// if there are special characters, they are ignored
function isPalindromeWithSpecialChars(str) {
  const cleaned = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return cleaned === cleaned.split("").reverse().join("");
}


// Test cases for the palindrome functions
function testPalindrome() {
  const testCases = [
    { input: "A man, a plan, a canal: Panama", expected: true },
    { input: "racecar", expected: true },
    { input: "hello", expected: false },
    { input: "A Toyota's a Toyota", expected: true },
    { input: 12321, expected: true },
    { input: 12345, expected: false },
    { input: "No 'x' in Nixon", expected: true },
  ];

  testCases.forEach(({ input, expected }) => {
    const result = isPalindrome(input);
    console.assert(result === expected, `isPalindrome(${input}) = ${result}, expected ${expected}`);
  });

  console.log("All tests passed!");
}

testPalindrome();