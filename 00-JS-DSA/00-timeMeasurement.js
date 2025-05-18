// Measure the time taken by a function to execute
const functionToMeasure = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}
//time complexity: O(n)

measureTime(functionToMeasure);

function measureTime(func) {
  const start = performance.now();
  const result = func([1, 2, 3, 4, 5]);
  const end = performance.now();
  console.log(`Function executed in ${(end - start) * 1000} microseconds`);
  return result;
}

// time measurement
// O(1) - constant time complexity
// O(n) - linear time complexity
// O(n^2) (n square) - quadratic time complexity
// O(log n) (logarithm base 2 of n) - logarithmic time complexity
// O(n log n) (n log n) - linearithmic time complexity
// O(2^n) (2 exponent n) - exponential time complexity
// O(n!) (n factorial) - factorial time complexity