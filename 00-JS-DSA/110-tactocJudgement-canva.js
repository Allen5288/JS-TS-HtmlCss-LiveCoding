// filepath: f:\\Coding\\JS-HtmlCss-LiveCoding\\00-JS-DSA\\110-tactocJudgement-canva.js

/**
 * Determines the state of a Tic-Tac-Toe game.
 *
 * @param {Array<Array<string|null>>} board - A 3x3 array representing the Tic-Tac-Toe board.
 *                                            'X' for player X, 'O' for player O, null for empty.
 * @returns {string} - 'X wins', 'O wins', 'Draw', or 'Ongoing'.
 */
function judgeTicTacToe(board) {
  const n = 3;

  // Helper function to check if all elements in an array are the same and not null
  const checkLine = (line) => {
    return line.every(cell => cell === line[0] && cell !== null);
  };

  // Check rows
  for (let i = 0; i < n; i++) {
    if (checkLine(board[i])) {
      return `${board[i][0]} wins`;
    }
  }

  // Check columns
  for (let j = 0; j < n; j++) {
    const column = [board[0][j], board[1][j], board[2][j]];
    if (checkLine(column)) {
      return `${column[0]} wins`;
    }
  }

  // Check diagonals
  const diag1 = [board[0][0], board[1][1], board[2][2]];
  if (checkLine(diag1)) {
    return `${diag1[0]} wins`;
  }

  const diag2 = [board[0][2], board[1][1], board[2][0]];
  if (checkLine(diag2)) {
    return `${diag2[0]} wins`;
  }

  // Check for draw (no empty cells left)
  let isDraw = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }
  if (isDraw) {
    return 'Draw';
  }

  // If no winner and not a draw, game is ongoing
  return 'Ongoing';
}
// time performance: O(n^2) for checking rows, columns, and diagonals
// space performance: O(1) for checking rows, columns, and diagonals

// method 2, list all possible winning combinations
function judgeTicTacToeMethod2(board) {
  const winningCombinations = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const combination of winningCombinations) {
    if (combination[0] && combination[0] === combination[1] && combination[0] === combination[2]) {
      return `${combination[0]} wins`;
    }
  }

  // Check for draw (no empty cells left)
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }
  if (isDraw) {
    return 'Draw';
  }

  // If no winner and not a draw, game is ongoing
  return 'Ongoing';
}
// time performance: O(n) for checking winning combinations
// space performance: O(1) for checking winning combinations


// using map() some() filter() every() and reduce() methods for this problem
function judgeTicTacToeMethod3(board) {
  const checkLine = (line) => line.every(cell => cell === line[0] && cell !== null);

  // Check rows
  if (board.some(checkLine)) {
    return `${board.find(checkLine)[0]} wins`;
  }

  // Check columns
  const columns = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  if (columns.some(checkLine)) {
    return `${columns.find(checkLine)[0]} wins`;
  }

  // Check diagonals
  const diag1 = [board[0][0], board[1][1], board[2][2]];
  const diag2 = [board[0][2], board[1][1], board[2][0]];
  if (checkLine(diag1)) {
    return `${diag1[0]} wins`;
  }
  if (checkLine(diag2)) {
    return `${diag2[0]} wins`;
  }

  // Check for draw (no empty cells left)
  if (board.flat().every(cell => cell !== null)) {
    return 'Draw';
  }

  // If no winner and not a draw, game is ongoing
  return 'Ongoing';
}

// --- Unit Tests ---

function runTicTacToeTests() {
  const tests = [
    // X wins
    {
      board: [['X', 'X', 'X'], [null, 'O', null], ['O', null, null]],
      expected: 'X wins',
      name: 'X wins - row 1'
    },
    {
      board: [[null, 'O', null], ['X', 'X', 'X'], ['O', null, null]],
      expected: 'X wins',
      name: 'X wins - row 2'
    },
    {
      board: [['O', null, null], [null, 'O', null], ['X', 'X', 'X']],
      expected: 'X wins',
      name: 'X wins - row 3'
    },
    {
      board: [['X', 'O', null], ['X', 'O', null], ['X', null, 'X']],
      expected: 'X wins',
      name: 'X wins - col 1'
    },
    {
      board: [['O', 'X', null], ['O', 'X', null], [null, 'X', 'X']],
      expected: 'X wins',
      name: 'X wins - col 2'
    },
    {
      board: [[null, 'O', 'X'], [null, 'O', 'X'], ['X', null, 'X']],
      expected: 'X wins',
      name: 'X wins - col 3'
    },
    {
      board: [['X', 'O', null], [null, 'X', 'O'], [null, null, 'X']],
      expected: 'X wins',
      name: 'X wins - diagonal 1'
    },
    {
      board: [[null, 'O', 'X'], [null, 'X', 'O'], ['X', null, null]],
      expected: 'X wins',
      name: 'X wins - diagonal 2'
    },

    // O wins
    {
      board: [['O', 'O', 'O'], ['X', null, 'X'], [null, 'X', null]],
      expected: 'O wins',
      name: 'O wins - row 1'
    },
    {
      board: [['X', null, 'X'], ['O', 'O', 'O'], [null, 'X', null]],
      expected: 'O wins',
      name: 'O wins - row 2'
    },
    {
      board: [['X', null, 'X'], [null, 'X', null], ['O', 'O', 'O']],
      expected: 'O wins',
      name: 'O wins - row 3'
    },
    {
      board: [['O', 'X', null], ['O', 'X', null], ['O', null, 'X']],
      expected: 'O wins',
      name: 'O wins - col 1'
    },
    {
      board: [['X', 'O', null], ['X', 'O', null], [null, 'O', 'X']],
      expected: 'O wins',
      name: 'O wins - col 2'
    },
    {
      board: [['X', null, 'O'], ['X', null, 'O'], [null, 'X', 'O']],
      expected: 'O wins',
      name: 'O wins - col 3'
    },
    {
      board: [['O', 'X', null], [null, 'O', 'X'], [null, null, 'O']],
      expected: 'O wins',
      name: 'O wins - diagonal 1'
    },
    {
      board: [[null, 'X', 'O'], [null, 'O', 'X'], ['O', null, null]],
      expected: 'O wins',
      name: 'O wins - diagonal 2'
    },

    // Draw
    {
      board: [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']],
      expected: 'Draw',
      name: 'Draw game'
    },
    {
      board: [['O', 'X', 'O'], ['X', 'X', 'O'], ['X', 'O', 'X']],
      expected: 'Draw',
      name: 'Draw game 2'
    },


    // Ongoing
    {
      board: [['X', 'O', 'X'], [null, 'O', 'O'], ['O', 'X', 'X']],
      expected: 'Ongoing',
      name: 'Ongoing game - one empty'
    },
    {
      board: [[null, null, null], [null, null, null], [null, null, null]],
      expected: 'Ongoing',
      name: 'Ongoing game - empty board'
    },
    {
      board: [['X', 'O', null], ['O', 'X', null], [null, null, null]],
      expected: 'Ongoing',
      name: 'Ongoing game - multiple empty'
    }
  ];

  let testsPassed = 0;
  tests.forEach((test, index) => {
    const result = judgeTicTacToe(test.board);
    if (result === test.expected) {
      console.log(`Test ${index + 1} (${test.name}): Passed`);
      testsPassed++;
    } else {
      console.error(`Test ${index + 1} (${test.name}): Failed. Expected "${test.expected}", got "${result}"`);
      console.log("Board:");
      test.board.forEach(row => console.log(row));
    }
  });

  console.log(`\n--- Summary ---`);
  console.log(`${testsPassed} out of ${tests.length} tests passed.`);
  if (testsPassed === tests.length) {
    console.log("All tests passed successfully!");
  } else {
    console.error("Some tests failed.");
  }
}

// Run the tests
runTicTacToeTests();
