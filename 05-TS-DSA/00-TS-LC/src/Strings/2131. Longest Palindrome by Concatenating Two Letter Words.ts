import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2131. Longest Palindrome by Concatenating Two Letter Words
 * 
 * TODO: Add problem description
 */
export class LongestPalindromeByConcatenatingTwoLetterWords {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  longestPalindrome(words: string[]): number {
    const freq = {};
        for (let word of words) {
            freq[word] = (freq[word] || 0) + 1;
        }
    
        let ans = 0;
        let hasCenter = false;
    
        for (let word in freq) {
            const rev = word[1] + word[0];
            const count = freq[word];
    
            if (word === rev) {
                ans += Math.floor(count / 2) * 4;
                if (count % 2 === 1) hasCenter = true;
            } else if (freq[rev]) {
                const pairs = Math.min(count, freq[rev]);
                ans += pairs * 4;
                freq[rev] = 0; // mark reverse as used
            }
    
            freq[word] = 0; // mark as used
        }
    
        if (hasCenter) ans += 2;
        return ans;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2131. Longest Palindrome by Concatenating Two Letter Words');
    
    const solution = new LongestPalindromeByConcatenatingTwoLetterWords();
    
    // TODO: Add comprehensive test cases
    console.log('✅ LongestPalindromeByConcatenatingTwoLetterWords created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}