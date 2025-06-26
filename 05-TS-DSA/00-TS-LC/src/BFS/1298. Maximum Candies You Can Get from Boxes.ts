import { TestHelper } from '../TestHelper';

/**
 * LeetCode 1298. Maximum Candies You Can Get from Boxes
 * 
 * TODO: Add problem description
 */
export class MaximumCandiesYouCanGetFromBoxes {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  maxCandies(status: any, candies: number[], keys: any, containedBoxes: any, initialBoxes: any): number {
    const n = status.length;
        const canOpen = new Array(n).fill(false);
        const hasBox = new Array(n).fill(false);
        const used = new Array(n).fill(false);
    
        for (let i = 0; i < n; ++i) {
            canOpen[i] = status[i] === 1;
        }
        const q = [];
        let ans = 0;
        for (const box of initialBoxes) {
            hasBox[box] = true;
            if (canOpen[box]) {
                q.push(box);
                used[box] = true;
                ans += candies[box];
            }
        }
        while (q.length > 0) {
            const bigBox = q.shift();
            for (const key of keys[bigBox]) {
                canOpen[key] = true;
                if (!used[key] && hasBox[key]) {
                    q.push(key);
                    used[key] = true;
                    ans += candies[key];
                }
            }
            for (const box of containedBoxes[bigBox]) {
                hasBox[box] = true;
                if (!used[box] && canOpen[box]) {
                    q.push(box);
                    used[box] = true;
                    ans += candies[box];
                }
            }
        }
    
        return ans;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 1298. Maximum Candies You Can Get from Boxes');
    
    const solution = new MaximumCandiesYouCanGetFromBoxes();
    
    // TODO: Add comprehensive test cases
    console.log('✅ MaximumCandiesYouCanGetFromBoxes created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}