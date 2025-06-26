import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2942. Find Words Containing Character
 * 
 * You are given a 0-indexed array of strings words and a character x.
 * Return an array of indices representing the words that contain the character x.
 * Note that the returned array may be in any order.
 * 
 * Example 1:
 * Input: words = ["leet","code","leetcode"], x = "e"
 * Output: [0,2]
 * Explanation: "e" occurs in both "leet", and "leetcode". Hence, we return indices 0 and 2.
 * 
 * Example 2:
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
 * Output: [0,2]
 * Explanation: "a" occurs in "abc", and "aaaa". Hence, we return indices 0 and 2.
 * 
 * Example 3:
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
 * Output: []
 * Explanation: "z" does not occur in any of the words. Hence, we return an empty array.
 * 
 * Constraints:
 * - 1 <= words.length <= 50
 * - 1 <= words[i].length <= 50
 * - x is a lowercase English letter.
 * - words[i] consists only of lowercase English letters.
 */
export class FindWordsContainingCharacter {
  /**
   * Approach 1: Built-in includes method
   * Time Complexity: O(n * m) where n is number of words and m is average word length
   * Space Complexity: O(k) where k is number of words containing the character
   */
  findWordsContaining(words: string[], x: string): number[] {
    const result: number[] = [];
    
    for (let i = 0; i < words.length; i++) {
      if (words[i].includes(x)) {
        result.push(i);
      }
    }
    
    return result;
  }

  /**
   * Approach 2: Manual character checking
   * Time Complexity: O(n * m)
   * Space Complexity: O(k)
   */
  findWordsContainingManual(words: string[], x: string): number[] {
    const result: number[] = [];
    
    for (let i = 0; i < words.length; i++) {
      let found = false;
      for (let j = 0; j < words[i].length; j++) {
        if (words[i][j] === x) {
          found = true;
          break;
        }
      }
      if (found) {
        result.push(i);
      }
    }
    
    return result;
  }

  /**
   * Approach 3: Using filter with map for functional style
   * Time Complexity: O(n * m)
   * Space Complexity: O(k)
   */
  findWordsContainingFunctional(words: string[], x: string): number[] {
    return words
      .map((word, index) => ({ word, index }))
      .filter(({ word }) => word.includes(x))
      .map(({ index }) => index);
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2942. Find Words Containing Character');
    
    const solution = new FindWordsContainingCharacter();
    
    const testCases = [
      {
        name: 'Example 1: ["leet","code","leetcode"], x="e"',
        words: ["leet", "code", "leetcode"],
        x: "e",
        expected: [0, 2]
      },
      {
        name: 'Example 2: ["abc","bcd","aaaa","cbc"], x="a"',
        words: ["abc", "bcd", "aaaa", "cbc"],
        x: "a",
        expected: [0, 2]
      },
      {
        name: 'Example 3: ["abc","bcd","aaaa","cbc"], x="z"',
        words: ["abc", "bcd", "aaaa", "cbc"],
        x: "z",
        expected: []
      },
      {
        name: 'All words contain character: ["hello","help","hill"], x="l"',
        words: ["hello", "help", "hill"],
        x: "l",
        expected: [0, 1, 2]
      },
      {
        name: 'Single word: ["test"], x="t"',
        words: ["test"],
        x: "t",
        expected: [0]
      },
      {
        name: 'Single word no match: ["test"], x="z"',
        words: ["test"],
        x: "z",
        expected: []
      }
    ];

    // Test all approaches
    const approaches = [
      { name: 'Built-in includes', method: solution.findWordsContaining.bind(solution) },
      { name: 'Manual checking', method: solution.findWordsContainingManual.bind(solution) },
      { name: 'Functional style', method: solution.findWordsContainingFunctional.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const result = approach.method([...testCase.words], testCase.x);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• Built-in includes: Most concise and readable');
    console.log('• Manual checking: More explicit, shows the algorithm clearly');
    console.log('• Functional style: Modern JavaScript approach with chaining');
  }
}