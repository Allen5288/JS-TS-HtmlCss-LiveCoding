import { TestHelper } from '../TestHelper';

/**
 * LeetCode 344. Reverse String
 * 
 * Write a function that reverses a string. The input string is given as an array of characters s.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 * 
 * Example 1:
 * Input: s = ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 * 
 * Example 2:
 * Input: s = ["H","a","n","n","a","h"]
 * Output: ["h","a","n","n","a","H"]
 */

export class ReverseString {
  /**
   * Approach 1: Two Pointers
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseStringTwoPointers(s: string[]): void {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  }

  /**
   * Approach 2: Recursion
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  reverseStringRecursive(s: string[]): void {
    const helper = (left: number, right: number): void => {
      if (left >= right) return;
      [s[left], s[right]] = [s[right], s[left]];
      helper(left + 1, right - 1);
    };
    
    helper(0, s.length - 1);
  }

  static runTests(): void {
    TestHelper.printHeader('LeetCode 344. Reverse String');
    
    const solution = new ReverseString();
    
    const testCases = [
      {
        name: 'Example 1: ["h","e","l","l","o"]',
        input: ["h", "e", "l", "l", "o"],
        expected: ["o", "l", "l", "e", "h"]
      },
      {
        name: 'Example 2: ["H","a","n","n","a","h"]',
        input: ["H", "a", "n", "n", "a", "h"],
        expected: ["h", "a", "n", "n", "a", "H"]
      }
    ];

    console.log('\n🔍 Testing Two Pointers Approach:');
    for (const testCase of testCases) {
      const inputCopy = [...testCase.input];
      solution.reverseStringTwoPointers(inputCopy);
      TestHelper.runTest(testCase.name, testCase.expected, inputCopy);
    }

    console.log('\n🔍 Testing Recursive Approach:');
    for (const testCase of testCases) {
      const inputCopy = [...testCase.input];
      solution.reverseStringRecursive(inputCopy);
      TestHelper.runTest(`${testCase.name} (Recursive)`, testCase.expected, inputCopy);
    }
    
    console.log('\n');
  }
}
