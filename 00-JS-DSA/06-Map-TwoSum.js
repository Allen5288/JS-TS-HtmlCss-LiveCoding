// two sum
function twoSum(nums, target) {
  const numMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return [];
}

function twoSumMethod2(nums, target) {
  const numMap = {};
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap[complement] !== undefined) {
      return [numMap[complement], i];
    }
    
    numMap[nums[i]] = i;
  }
  
  return [];
}

// Test cases for the twoSum function
function testTwoSum() {
  const testCases = [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[3, 2, 4], 6], expected: [1, 2] },
    { input: [[3, 3], 6], expected: [0, 1] },
    { input: [[1, 5, 3, 4], 8], expected: [1, 2] },
    { input: [[1, 2, 3], 7], expected: [] },
  ];

  let allPassed = true;
  testCases.forEach(({ input, expected }) => {
    const result = twoSum(...input);
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      console.error(`twoSum(${JSON.stringify(input)}) = ${JSON.stringify(result)}, expected ${JSON.stringify(expected)}`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log("All tests passed!");
  }
}
testTwoSum();