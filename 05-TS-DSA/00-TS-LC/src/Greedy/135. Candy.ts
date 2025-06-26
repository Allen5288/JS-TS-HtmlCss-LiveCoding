import { TestHelper } from '../TestHelper';

/**
 * LeetCode 135. Candy
 * 
 * TODO: Add problem description
 */
export class Candy {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  candy(ratings: any): number[] {
    const n = ratings.length;
        const cand = new Array(n).fill(1); // Step 1: Each child gets at least one candy
    
        // Step 2: Left to right
        for (let i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                cand[i] = cand[i - 1] + 1;
            }
        }
    
        // Step 3: Right to left
        for (let i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1] && cand[i] <= cand[i + 1]) {
                cand[i] = cand[i + 1] + 1;
            }
        }
    
        // Step 4: Sum all candies
        return cand.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 135. Candy');
    
    const solution = new Candy();
    
    // TODO: Add comprehensive test cases
    console.log('✅ Candy created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}