// finbonacci number with common test structure to test
function fibonacci(n) {
  if (typeof n !== "number" || n < 0) {
    return "Input must be a non-negative integer";
  }
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
}

// Test cases for the fibonacci function
function testFibonacci() {
  const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 2, expected: 1 },
    { input: 3, expected: 2 },
    { input: 4, expected: 3 },
    { input: 5, expected: 5 },
    { input: 6, expected: 8 },
    { input: 7, expected: 13 },
    { input: -1, expected: "Input must be a non-negative integer" },
    { input: "a", expected: "Input must be a non-negative integer" },
  ];

  let isFailed = false;
  for (const { input, expected } of testCases) {
    const result = fibonacci(input);
    if (result !== expected) {
      console.error(
        `fibonacci(${input}) = ${result}, expected ${expected}`
      );
      isFailed = true;
    }
  }
  if (!isFailed) {
    console.log("All tests passed!");
  }
}
