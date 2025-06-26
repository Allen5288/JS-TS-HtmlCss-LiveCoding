import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1295. Find Numbers with Even Number of Digits
 * 
 * Given an array nums of integers, return how many of them contain an even number of digits.
 * 
 * Example 1:
 * Input: nums = [12,345,2,6,7896]
 * Output: 2
 * Explanation: 
 * 12 contains 2 digits (even number of digits). 
 * 345 contains 3 digits (odd number of digits). 
 * 2 contains 1 digit (odd number of digits). 
 * 6 contains 1 digit (odd number of digits). 
 * 7896 contains 4 digits (even number of digits). 
 * Therefore only 12 and 7896 contain an even number of digits.
 * 
 * Example 2:
 * Input: nums = [555,901,482,1771]
 * Output: 1 
 * Explanation: 
 * Only 1771 contains an even number of digits.
 * 
 * Constraints:
 * - 1 <= nums.length <= 500
 * - 1 <= nums[i] <= 10^5
 */
export class FindNumbersWithEvenNumberOfDigits {
  /**
   * Approach 1: Range checking (optimized for constraints)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * 
   * Since constraints limit numbers to 1 <= nums[i] <= 10^5,
   * we can use range checking for efficiency.
   */
  findNumbers(nums: number[]): number {
    let evenDigitCount = 0;

    for (const num of nums) {
      // 2 digits: 10-99, 4 digits: 1000-9999, 6 digits: 100000
      if ((num >= 10 && num <= 99) || 
          (num >= 1000 && num <= 9999) || 
          num === 100000) {
        evenDigitCount++;
      }
    }

    return evenDigitCount;
  }

  /**
   * Approach 2: String conversion
   * Time Complexity: O(n * log(max_num))
   * Space Complexity: O(log(max_num)) for string conversion
   */
  findNumbersString(nums: number[]): number {
    let evenDigitCount = 0;

    for (const num of nums) {
      const digitCount = num.toString().length;
      if (digitCount % 2 === 0) {
        evenDigitCount++;
      }
    }

    return evenDigitCount;
  }

  /**
   * Approach 3: Mathematical counting
   * Time Complexity: O(n * log(max_num))
   * Space Complexity: O(1)
   */
  findNumbersMath(nums: number[]): number {
    let evenDigitCount = 0;

    for (const num of nums) {
      let digitCount = 0;
      let temp = num;
      
      while (temp > 0) {
        digitCount++;
        temp = Math.floor(temp / 10);
      }
      
      if (digitCount % 2 === 0) {
        evenDigitCount++;
      }
    }

    return evenDigitCount;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1295. Find Numbers with Even Number of Digits');
    
    const solution = new FindNumbersWithEvenNumberOfDigits();
    
    const testCases = [
      {
        name: 'Example 1: [12,345,2,6,7896]',
        nums: [12, 345, 2, 6, 7896],
        expected: 2
      },
      {
        name: 'Example 2: [555,901,482,1771]',
        nums: [555, 901, 482, 1771],
        expected: 1
      },
      {
        name: 'All single digits: [1,2,3,4,5]',
        nums: [1, 2, 3, 4, 5],
        expected: 0
      },
      {
        name: 'All even digits: [12,34,56,78]',
        nums: [12, 34, 56, 78],
        expected: 4
      },
      {
        name: 'Mixed: [1,12,123,1234,12345]',
        nums: [1, 12, 123, 1234, 12345],
        expected: 2
      },
      {
        name: 'Maximum value: [100000]',
        nums: [100000],
        expected: 1
      }
    ];

    // Test all approaches
    const approaches = [
      { name: 'Range Checking', method: solution.findNumbers.bind(solution) },
      { name: 'String Conversion', method: solution.findNumbersString.bind(solution) },
      { name: 'Mathematical', method: solution.findNumbersMath.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const result = approach.method([...testCase.nums]);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• Range Checking: Most efficient for given constraints');
    console.log('• String Conversion: Most readable, slight overhead');
    console.log('• Mathematical: No extra space, but slower for large numbers');
  }
}