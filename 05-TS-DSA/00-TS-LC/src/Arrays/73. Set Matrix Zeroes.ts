import { TestHelper } from '../TestHelper';

/**
 * LeetCode 73. Set Matrix Zeroes
 * 
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
 * You must do it in place.
 * 
 * Example 1:
 * Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[1,0,1],[0,0,0],[1,0,1]]
 * 
 * Example 2:
 * Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 * 
 * Constraints:
 * - m == matrix.length
 * - n == matrix[0].length
 * - 1 <= m, n <= 200
 * - -2^31 <= matrix[i][j] <= 2^31 - 1
 * 
 * Follow up:
 * - A straightforward solution using O(mn) space is probably a bad idea.
 * - A simple improvement uses O(m + n) space, but still not the best solution.
 * - Could you devise a constant extra space solution?
 */
export class SetMatrixZeroes {
  /**
   * Approach 1: O(1) Space using first row/column as markers
   * Time Complexity: O(m * n)
   * Space Complexity: O(1)
   */
  setZeroes(matrix: number[][]): void {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return;
    
    const m = matrix.length;
    const n = matrix[0].length;
    
    // Check if first row has zero
    let firstRowHasZero = false;
    for (let j = 0; j < n; j++) {
      if (matrix[0][j] === 0) {
        firstRowHasZero = true;
        break;
      }
    }
    
    // Check if first column has zero
    let firstColHasZero = false;
    for (let i = 0; i < m; i++) {
      if (matrix[i][0] === 0) {
        firstColHasZero = true;
        break;
      }
    }
    
    // Use first row and column as markers
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][0] = 0; // Mark row
          matrix[0][j] = 0; // Mark column
        }
      }
    }
    
    // Set zeros based on markers
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][0] === 0 || matrix[0][j] === 0) {
          matrix[i][j] = 0;
        }
      }
    }
    
    // Handle first row
    if (firstRowHasZero) {
      for (let j = 0; j < n; j++) {
        matrix[0][j] = 0;
      }
    }
    
    // Handle first column
    if (firstColHasZero) {
      for (let i = 0; i < m; i++) {
        matrix[i][0] = 0;
      }
    }
  }

  /**
   * Approach 2: O(m + n) Space using additional arrays
   * Time Complexity: O(m * n)
   * Space Complexity: O(m + n)
   */
  setZeroesExtraSpace(matrix: number[][]): void {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return;
    
    const m = matrix.length;
    const n = matrix[0].length;
    const rows = new Set<number>();
    const cols = new Set<number>();
    
    // Find all rows and columns that should be zeroed
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 0) {
          rows.add(i);
          cols.add(j);
        }
      }
    }
    
    // Set rows to zero
    for (const row of rows) {
      for (let j = 0; j < n; j++) {
        matrix[row][j] = 0;
      }
    }
    
    // Set columns to zero
    for (const col of cols) {
      for (let i = 0; i < m; i++) {
        matrix[i][col] = 0;
      }
    }
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 73. Set Matrix Zeroes');
    
    const solution = new SetMatrixZeroes();
    
    const testCases = [
      {
        name: 'Example 1: 3x3 matrix with one zero',
        matrix: [[1,1,1],[1,0,1],[1,1,1]],
        expected: [[1,0,1],[0,0,0],[1,0,1]]
      },
      {
        name: 'Example 2: 3x4 matrix with multiple zeros',
        matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]],
        expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
      },
      {
        name: 'Single element zero: [[0]]',
        matrix: [[0]],
        expected: [[0]]
      },
      {
        name: 'No zeros: [[1,2],[3,4]]',
        matrix: [[1,2],[3,4]],
        expected: [[1,2],[3,4]]
      },
      {
        name: 'All zeros: [[0,0],[0,0]]',
        matrix: [[0,0],[0,0]],
        expected: [[0,0],[0,0]]
      }
    ];

    // Test both approaches
    const approaches = [
      { name: 'O(1) Space', method: solution.setZeroes.bind(solution) },
      { name: 'O(m+n) Space', method: solution.setZeroesExtraSpace.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        // Deep copy matrix for testing
        const matrixCopy = testCase.matrix.map(row => [...row]);
        approach.method(matrixCopy);
        TestHelper.runTest(testCase.name, testCase.expected, matrixCopy);
      }
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• O(1) Space: Uses first row/column as markers, most optimal');
    console.log('• O(m+n) Space: Uses additional sets, easier to understand');
    console.log('• Both have O(m*n) time complexity');
  }
}