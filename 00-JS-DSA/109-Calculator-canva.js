// making a calculator. Take a string equation and calculate the response.
// // The calculator should be able to handle addition, subtraction, multiplication, and division.
// The calculator should be able to handle parentheses and operator precedence.
// The calculator should be able to handle negative numbers.
// The calculator should be able to handle decimal numbers.
// The calculator should be able to handle large numbers.

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    let number = 0;
    let signValue = 1;
    let result = 0;
    let operationsStack = [];

    for (let i = 0; i < s.length; i++) {
        let c = s[i];

        if (!isNaN(parseInt(c))) {
            number = number * 10 + parseInt(c);
        } else if (c === '+' || c === '-') {
            result += number * signValue;
            signValue = (c === '-') ? -1 : 1;
            number = 0;
        } else if (c === '(') {
            operationsStack.push(result);
            operationsStack.push(signValue);
            result = 0;
            signValue = 1;
        } else if (c === ')') {
            result += signValue * number;
            result *= operationsStack.pop();
            result += operationsStack.pop();
            number = 0;
        }
    }

    return result + number * signValue;
};

// test cases
function testCalculator() {
  const testCases = [
    { input: "3 + 5", expected: 8 },
    { input: "10 - 2 * 5", expected: 0 },
    { input: "(1 + 2) * (3 + 4)", expected: 21 },
    { input: "10 / (2 + 3)", expected: 2 },
    { input: "5 * (2 + 3) - 4", expected: 21 },
    { input: "3.5 + 2.5", expected: 6 },
    { input: "-3 + 5", expected: 2 },
    { input: "10 - (-2)", expected: 12 },
    { input: "1000000 * 1000000", expected: 1000000000000 },
  ];

  testCases.forEach(({ input, expected }) => {
    const result = calculate(input);
    console.log(`calculate('${input}') = ${result}, expected = ${expected}`);
    console.assert(result === expected, `Test failed for input '${input}'`);
  });
}
// Run the test cases
testCalculator();
