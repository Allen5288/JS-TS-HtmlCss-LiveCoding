// classical N-Queen problem

function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  backtrack(0, board, solutions);
  return solutions;
}

function backtrack(row, board, solutions) {
  if (row === board.length) {
    // Found a valid solution, add it to the results
    // Convert board to a string representation
    solutions.push(board.map((row) => row.join("")));
    return;
  }

  for (let col = 0; col < board.length; col++) {
    if (isValidMove(row, col, board)) {
      board[row][col] = "Q";
      backtrack(row + 1, board, solutions);
      board[row][col] = "."; // Undo move
    }
  }
}

function isValidMove(row, col, board) {
  // Check column
  for (let i = 0; i < row; i++) {
    if (board[i][col] === "Q") return false;
  }

  // Check diagonals
  for (let i = 0; i < row; i++) {
    // Check left up diagonal
    if (board[i][col - (row - i)] === "Q") return false;
    // Check right up diagonal
    if (board[i][col + (row - i)] === "Q") return false;
  }

  return true;
}

// Test cases
function testNQueens() {
  const testCases = [
    { input: 4, expected: 2 },
    { input: 1, expected: 1 },
    { input: 2, expected: 0 },
    { input: 3, expected: 0 },
    { input: 5, expected: 10 },
    { input: 6, expected: 4 },
    { input: 7, expected: 40 },
    { input: 8, expected: 92 },
    { input: 9, expected: 352 },
    { input: 10, expected: 724 },
  ];

  let allPassed = true;

  testCases.forEach((testCase, index) => {
    const result = solveNQueens(testCase.input);

    if (result.length !== testCase.expected) {
      allPassed = false;
      console.error(
        `Test case ${index + 1} failed: Expected ${testCase.expected} but got ${result.length}`
      );
    }
  });
  if (allPassed) {
    console.log("All test cases passed!");
  } else {
    console.log("Some test cases failed.");
  }
}

// Run the test function
testNQueens();
