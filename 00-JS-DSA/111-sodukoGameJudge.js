// filepath: f:\\Coding\\JS-HtmlCss-LiveCoding\\00-JS-DSA\\110-sodukoGameJudge.js

/**
 * Sudoku Game Judgement Function
 *
 * @param {number[][]} board - A 9x9 array representing the Sudoku board.
 *                             0 represents an empty cell.
 * @returns {boolean} - True if the board is valid according to Sudoku rules, false otherwise.
 *
 * Time Complexity: O(1) - The board size is fixed at 9x9. We iterate through 81 cells three times
 *                         (for rows, columns, and sub-grids). For each cell, operations like
 *                         Set add/has are O(1) on average.
 *                         If the board size were N^2 x N^2 (where a sub-grid is N x N),
 *                         the complexity would be O(N^4) because we iterate N^2 rows, N^2 columns,
 *                         and N^2 sub-grids, each of size N^2.
 *
 * Space Complexity: O(1) - We use a Set to store seen numbers for each row, column, or sub-grid.
 *                          The maximum size of this set is 9.
 *                          If the board size were N^2 x N^2, the space for the set would be O(N^2).
 */
function isValidSudoku(board) {
  if (!board || board.length !== 9 || board.some(row => row.length !== 9)) {
    console.error("Invalid board dimensions. Board must be 9x9.");
    return false;
  }

  // Helper function to validate a unit (row, column, or 3x3 sub-grid)
  const isValidUnit = (unit) => {
    const seen = new Set();
    for (const num of unit) {
      if (num === 0 || num === '.') continue; // Skip empty cells
      if (num < 1 || num > 9 || !Number.isInteger(num)) return false; // Invalid number
      if (seen.has(num)) {
        return false; // Duplicate found
      }
      seen.add(num);
    }
    return true;
  };

  // 1. Check rows
  for (let i = 0; i < 9; i++) {
    if (!isValidUnit(board[i])) {
      // console.log(`Invalid row: ${i}`);
      return false;
    }
  }

  // 2. Check columns
  for (let j = 0; j < 9; j++) {
    const column = [];
    for (let i = 0; i < 9; i++) {
      column.push(board[i][j]);
    }
    if (!isValidUnit(column)) {
      // console.log(`Invalid column: ${j}`);
      return false;
    }
  }

  // 3. Check 3x3 sub-grids
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const subGrid = [];
      for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
        for (let j = boxCol * 3; j < boxCol * 3 + 3; j++) {
          subGrid.push(board[i][j]);
        }
      }
      if (!isValidUnit(subGrid)) {
        // console.log(`Invalid sub-grid starting at row ${boxRow*3}, col ${boxCol*3}`);
        return false;
      }
    }
  }

  return true;
}

// --- Unit Tests ---

function runSudokuTests() {
  let testsPassed = 0;
  let testsFailed = 0;

  const testCases = [
    {
      name: "Valid, completely filled Sudoku",
      board: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: true
    },
    {
      name: "Valid, partially filled Sudoku (using 0 for empty)",
      board: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ],
      expected: true
    },
    {
      name: "Valid, partially filled Sudoku (using '.' for empty - should be handled if we adapt, current expects 0)",
      board: [ // Assuming 0 is the standard for empty as per current function
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ],
      expected: true // This test is same as above, just noting the '.' possibility
    },
    {
      name: "Invalid Sudoku (duplicate in a row)",
      board: [
        [5, 3, 4, 6, 7, 8, 9, 1, 5], // Duplicate 5 in first row
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: false
    },
    {
      name: "Invalid Sudoku (duplicate in a column)",
      board: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [5, 4, 5, 2, 8, 6, 1, 7, 9] // Duplicate 5 in first column
      ],
      expected: false
    },
    {
      name: "Invalid Sudoku (duplicate in a 3x3 sub-grid)",
      board: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7], // Sub-grid top-left has 5,3,4,6,7,2,1,9,8
        [8, 5, 9, 7, 6, 1, 4, 2, 3], // This 5 makes the middle-left sub-grid invalid
        [4, 2, 6, 8, 5, 3, 7, 9, 1], // (8,5,9, 4,2,6, 7,1,3)
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: false // The original board was valid, let's make a subgrid invalid
                      // Change board[3][1] from 5 to 4 to create duplicate in subgrid
                      // board[3][1] = 4; // [8,4,9...], subgrid now has two 4s
                      // No, let's make it more obvious:
                      // board[0][0] = 1, board[1][1] = 1
    },
    { // Corrected test for sub-grid invalidity
      name: "Invalid Sudoku (duplicate in a 3x3 sub-grid - corrected)",
      board: [
        [1, 3, 4, 6, 7, 8, 9, 1, 2], // Row invalid (1 repeated)
        [6, 1, 2, 1, 9, 5, 3, 4, 8], // Sub-grid top-left now has two 1s
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: false
    },
    {
      name: "Empty board (all zeros)",
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      expected: true
    },
    {
      name: "Board with invalid number (e.g., 10)",
      board: [
        [10,3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: false
    },
    {
      name: "Board with non-integer number",
      board: [
        [5.5,3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: false
    },
     {
      name: "Invalid Sudoku (duplicate 0 - should be ignored and valid if other rules pass)",
      board: [
        [0, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 0, 9, 7, 6, 1, 4, 2, 3], // two 0s in this row
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      expected: true // Zeros are empty cells, duplicates of zeros are fine.
    }
  ];

  // Adjusting the "Invalid Sudoku (duplicate in a 3x3 sub-grid)" test case for clarity
  const specificInvalidSubgridBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
  specificInvalidSubgridBoard[0][0] = 1; // Original: 5
  specificInvalidSubgridBoard[1][1] = 1; // Original: 7. Now subgrid 0,0 has two 1s.
                                       // This also makes row 0 and col 1 invalid if not careful with test setup.
                                       // Let's make a cleaner subgrid error that doesn't also fail row/col immediately.
  
  const cleanInvalidSubgridBoard = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5,2, 8, 6, 1, 7, 9]
    ];
    // Make the first subgrid invalid:
    // board[0][0] is 5, board[1][1] is 7. Change board[1][1] to 5.
    cleanInvalidSubgridBoard[1][1] = 5; // Now subgrid (0,0) has two 5s. Row 0 and Row 1 are still fine. Col 0 and Col 1 fine.

  testCases.forEach((tc, index) => {
    let boardToTest = tc.board;
    if (tc.name === "Invalid Sudoku (duplicate in a 3x3 sub-grid - corrected)") {
        // This test case was problematic, let's use the clean one.
        // Find the original test case for subgrid and replace its board
        const subgridTestIndex = testCases.findIndex(t => t.name === "Invalid Sudoku (duplicate in a 3x3 sub-grid)");
        if (subgridTestIndex !== -1) {
            testCases[subgridTestIndex].board = cleanInvalidSubgridBoard;
            testCases[subgridTestIndex].name = "Invalid Sudoku (duplicate in a 3x3 sub-grid)"; // revert name for clarity
            if (index === subgridTestIndex) boardToTest = cleanInvalidSubgridBoard;
        }
    }
    // The "corrected" one can be removed or simply use the clean board for the original one.
    // For simplicity, I'll ensure the original subgrid test uses the clean board.
    if (tc.name === "Invalid Sudoku (duplicate in a 3x3 sub-grid)") {
        boardToTest = cleanInvalidSubgridBoard;
    }


    const result = isValidSudoku(boardToTest);
    if (result === tc.expected) {
      console.log(`Test '${tc.name}': Passed`);
      testsPassed++;
    } else {
      console.error(`Test '${tc.name}': Failed. Expected ${tc.expected}, got ${result}`);
      testsFailed++;
    }
  });
  
  // Remove the "corrected" test case as it's now merged
  const correctedTestIndex = testCases.findIndex(t => t.name === "Invalid Sudoku (duplicate in a 3x3 sub-grid - corrected)");
  if (correctedTestIndex > -1 && testCases[correctedTestIndex].board[0][0] === 1 && testCases[correctedTestIndex].board[1][1] === 1) {
      // This is the one we want to skip if it's the messy one.
      // However, the loop structure means this logic is a bit off.
      // It's better to prepare testCases array fully before iterating.
  }


  console.log("\n--- Test Summary ---");
  console.log(`Total Tests: ${testCases.length}`); // This will be off if we dynamically alter testCases array length during loop
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  console.log("--------------------\n");

  // Re-calculate total for summary after potential modification
  // For now, let's assume the initial testCases array is what we test.
  // The modification logic for testCases within the loop is flawed for summary.
  // A better approach:
}

// To run tests:
// 1. Open your browser's developer console (for console.log)
// 2. Or run this file with Node.js: node 110-sodukoGameJudge.js
// runSudokuTests(); // Uncomment to run tests when executing the file

/*
Example of how to use:

const mySudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

if (isValidSudoku(mySudokuBoard)) {
  console.log("This Sudoku board is valid (so far).");
} else {
  console.log("This Sudoku board is invalid.");
}

const solvedBoard = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];
console.log(\`Solved board valid: \${isValidSudoku(solvedBoard)}\`); // Expected: true

const invalidBoardRow = [
  [5,3,4,6,7,8,9,1,5], // 5 is repeated
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];
console.log(\`Invalid board (row) valid: \${isValidSudoku(invalidBoardRow)}\`); // Expected: false

*/

// Refined Test Runner (to fix the test summary count issue)
function runAllSudokuTests() {
    console.log("--- Running Sudoku Tests ---");
    let testsPassed = 0;
    let testsFailed = 0;

    const testSuite = [
        {
            name: "Valid, completely filled Sudoku",
            board: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            expected: true
        },
        {
            name: "Valid, partially filled Sudoku (0 for empty)",
            board: [
                [5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            expected: true
        },
        {
            name: "Invalid Sudoku (duplicate in a row)",
            board: [
                [5, 3, 4, 6, 7, 8, 9, 1, 5], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            expected: false
        },
        {
            name: "Invalid Sudoku (duplicate in a column)",
            board: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [5, 4, 5, 2, 8, 6, 1, 7, 9] // First col has 5,6,1,8,4,7,9,2,5
            ],
            expected: false
        },
        {
            name: "Invalid Sudoku (duplicate in a 3x3 sub-grid)",
            board: [ // board[1][1] changed from 7 to 5, making first subgrid invalid
                [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 5, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            expected: false
        },
        {
            name: "Empty board (all zeros)",
            board: [
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]
            ],
            expected: true
        },
        {
            name: "Board with invalid number (10)",
            board: [
                [10,3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            expected: false
        },
        {
            name: "Board with non-integer number (5.5)",
            board: [
                [5.5,3,4,6,7,8,9,1,2], [6,7,2,1,9,5,3,4,8], [1,9,8,3,4,2,5,6,7],
                [8,5,9,7,6,1,4,2,3], [4,2,6,8,5,3,7,9,1], [7,1,3,9,2,4,8,5,6],
                [9,6,1,5,3,7,2,8,4], [2,8,7,4,1,9,6,3,5], [3,4,5,2,8,6,1,7,9]
            ],
            expected: false
        },
        {
            name: "Board with negative number (-1)",
            board: [
                [-1,3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            expected: false
        }
    ];

    testSuite.forEach(tc => {
        const result = isValidSudoku(tc.board);
        if (result === tc.expected) {
            console.log(`Test '${tc.name}': Passed`);
            testsPassed++;
        } else {
            console.error(`Test '${tc.name}': Failed. Expected ${tc.expected}, got ${result}`);
            testsFailed++;
        }
    });

    console.log("\n--- Test Summary ---");
    console.log(`Total Tests: ${testSuite.length}`);
    console.log(`Passed: ${testsPassed}`);
    console.log(`Failed: ${testsFailed}`);
    console.log("--------------------\n");
}

// To run the tests when this file is executed directly (e.g., with Node.js)
if (typeof require !== 'undefined' && require.main === module) {
    runAllSudokuTests();
}
