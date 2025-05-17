// Best time to buy and sell stocks
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]; // Update the minimum price
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice; // Update the maximum profit
    }
  }

  return maxProfit;
}


// Test cases for the maxProfit function
function testMaxProfit() {
  const testCases = [
    { input: [7, 1, 5, 3, 6, 4], expected: 5 }, // Buy at 1, sell at 6
    { input: [7, 6, 4, 3, 1], expected: 0 }, // No profit possible
    { input: [2, 4, 1], expected: 2 }, // Buy at 2, sell at 4
    { input: [3, 2], expected: 0 }, // No profit possible
    { input: [1, 2, 3, 4, 5], expected: 4 }, // Buy at 1, sell at 5
    { input: [], expected: 0 }, // No prices given
    { input: [5], expected: 0 }, // Single price
    { input: [10, 20], expected: 10 }, // Buy at 10, sell at 20
    { input: [20, 10], expected: 0 }, // No profit possible
    { input: [1, -1, -2, -3], expected: 0 } // No profit possible with negative prices
  ];

  let allPassed = true;
  
  testCases.forEach(({ input, expected }) => {
    const result = maxProfit(input);
    if (result !== expected) {
      console.error(`maxProfit(${JSON.stringify(input)}) = ${result}, expected ${expected}`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log("All tests passed!");
  }
}
testMaxProfit();
