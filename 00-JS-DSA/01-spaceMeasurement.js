// space complexity of an algorithm
// Measure the space used by a function
function measureSpace(func) {
  const initialMemory = process.memoryUsage().heapUsed;
  func();
  const finalMemory = process.memoryUsage().heapUsed;
  console.log(`Space complexity: ${finalMemory - initialMemory} bytes`);
}

// func1 - O(1) - constant space complexity
function func1(arr) {
  let sum = 0; // O(1) space
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// func2 - O(n) - linear space complexity
function func2(arr) {
  let result = []; // O(n) space
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}

// func3 - O(n^2) - quadratic space complexity
function func3(arr) {
  let result = []; // O(n^2) space
  for (let i = 0; i < arr.length; i++) {
    let innerArray = [];
    for (let j = 0; j < arr.length; j++) {
      innerArray.push(arr[i] + arr[j]);
    }
    result.push(innerArray);
  }
  return result;
}

// Measure space complexity of the functions
measureSpace(() => func1([1, 2, 3, 4, 5]));
measureSpace(() => func2([1, 2, 3, 4, 5]));
measureSpace(() => func3([1, 2, 3, 4, 5]));

