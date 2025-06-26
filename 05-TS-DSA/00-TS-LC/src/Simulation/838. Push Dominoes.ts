import { TestHelper } from '../TestHelper';

/**
 * LeetCode 838. Push Dominoes
 * 
 * There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.
 * 
 * After each second, each domino that is falling to the left pushes the adjacent domino on the left.
 * Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.
 * 
 * When a domino receives a push from both sides, it remains upright due to the balance of forces.
 * For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.
 * 
 * Given a string dominoes representing the initial state where:
 * - dominoes[i] = 'L', if the ith domino has been pushed to the left,
 * - dominoes[i] = 'R', if the ith domino has been pushed to the right, and
 * - dominoes[i] = '.', if the ith domino has not been pushed.
 * 
 * Return a string representing the final state.
 * 
 * Example 1:
 * Input: dominoes = "RR.L"
 * Output: "RR.L"
 * Explanation: The first domino expends no additional force on the second domino.
 * 
 * Example 2:
 * Input: dominoes = ".L.R...L..R."
 * Output: "LL.RR.LLRR.."
 * 
 * Constraints:
 * - n == dominoes.length
 * - 1 <= n <= 10^5
 * - dominoes[i] is either 'L', 'R', or '.'.
 */
export class PushDominoes {
  /**
   * Approach: Force calculation
   * Time Complexity: O(n) where n is the length of dominoes
   * Space Complexity: O(n) for forces array
   * 
   * Calculate the net force on each position by:
   * 1. Computing rightward forces from 'R' dominoes
   * 2. Computing leftward forces from 'L' dominoes
   * 3. Determining final state based on net force
   */
  pushDominoes(dominoes: string): string {
    const n = dominoes.length;
    const forces = new Array(n).fill(0);
    
    // Compute right forces (R)
    let force = 0;
    for (let i = 0; i < n; i++) {
      if (dominoes[i] === 'R') {
        force = n; // Max force applied
      } else if (dominoes[i] === 'L') {
        force = 0; // Counter force cancels R
      } else {
        force = Math.max(0, force - 1); // Gradual decrease
      }
      forces[i] += force;
    }
    
    // Compute left forces (L)
    force = 0;
    for (let i = n - 1; i >= 0; i--) {
      if (dominoes[i] === 'L') {
        force = n;
      } else if (dominoes[i] === 'R') {
        force = 0;
      } else {
        force = Math.max(0, force - 1);
      }
      forces[i] -= force; // Subtract because L opposes R
    }
    
    // Construct final result
    return forces.map(f => f > 0 ? 'R' : f < 0 ? 'L' : '.').join('');
  }

  /**
   * Alternative approach: Two pointers with interval processing
   * Time Complexity: O(n)
   * Space Complexity: O(1) excluding output
   */
  pushDominoesAlternative(dominoes: string): string {
    const result = dominoes.split('');
    let i = 0;
    
    while (i < dominoes.length) {
      let j = i;
      
      // Find the next domino that's not '.'
      while (j < dominoes.length && dominoes[j] === '.') {
        j++;
      }
      
      // Process the interval [i, j)
      if (i > 0 && j < dominoes.length) {
        const left = dominoes[i - 1];
        const right = dominoes[j];
        
        if (left === 'R' && right === 'L') {
          // Meeting forces: RR...LL
          let l = i, r = j - 1;
          while (l < r) {
            result[l++] = 'R';
            result[r--] = 'L';
          }
        } else if (left === 'R') {
          // Only right force: RR...R
          for (let k = i; k < j; k++) {
            result[k] = 'R';
          }
        } else if (right === 'L') {
          // Only left force: L...LL
          for (let k = i; k < j; k++) {
            result[k] = 'L';
          }
        }
      } else if (i === 0 && j < dominoes.length && dominoes[j] === 'L') {
        // Left boundary with L
        for (let k = i; k < j; k++) {
          result[k] = 'L';
        }
      } else if (i > 0 && dominoes[i - 1] === 'R') {
        // Right boundary with R
        for (let k = i; k < dominoes.length; k++) {
          result[k] = 'R';
        }
      }
      
      i = j + 1;
    }
    
    return result.join('');
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 838. Push Dominoes');
    
    const solution = new PushDominoes();
    
    const testCases = [
      {
        name: 'Example 1: "RR.L"',
        dominoes: "RR.L",
        expected: "RR.L"
      },
      {
        name: 'Example 2: ".L.R...L..R."',
        dominoes: ".L.R...L..R.",
        expected: "LL.RR.LLRR.."
      },
      {
        name: 'All falling right: "R.R.R"',
        dominoes: "R.R.R",
        expected: "RRRRR"
      },
      {
        name: 'All falling left: "L.L.L"',
        dominoes: "L.L.L",
        expected: "LLLLL"
      },
      {
        name: 'Meeting in middle: "R...L"',
        dominoes: "R...L",
        expected: "RR.LL"
      },
      {
        name: 'No change: "L.R"',
        dominoes: "L.R",
        expected: "L.R"
      },
      {
        name: 'Single domino: "."',
        dominoes: ".",
        expected: "."
      }
    ];

    // Test both approaches
    const approaches = [
      { name: 'Force Calculation', method: solution.pushDominoes.bind(solution) },
      { name: 'Two Pointers', method: solution.pushDominoesAlternative.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const result = approach.method(testCase.dominoes);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• Force Calculation: Uses physics simulation approach');
    console.log('• Two Pointers: Processes intervals between fixed dominoes');
    console.log('• Both approaches have O(n) time complexity');
  }
}