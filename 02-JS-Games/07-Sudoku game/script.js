document.addEventListener('DOMContentLoaded', () => {
    // Game variables
    let board = Array(9).fill().map(() => Array(9).fill(0));
    let solution = Array(9).fill().map(() => Array(9).fill(0));
    let difficulty = 'easy';
    
    // DOM elements
    const boardElement = document.getElementById('board');
    const newGameButton = document.getElementById('new-game');
    const difficultySelect = document.getElementById('difficulty');
    const solveButton = document.getElementById('solve');
    const messageElement = document.getElementById('message');
    
    // Initialize the game
    createBoard();
    generateNewGame();
    
    // Event listeners
    newGameButton.addEventListener('click', generateNewGame);
    difficultySelect.addEventListener('change', (e) => {
        difficulty = e.target.value;
        generateNewGame();
    });
    solveButton.addEventListener('click', solvePuzzle);
    
    // Create the 9x9 board
    function createBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('maxlength', '1');
                input.dataset.row = i;
                input.dataset.col = j;
                
                // Allow only numbers 1-9
                input.addEventListener('input', (e) => {
                    const value = e.target.value;
                    if (!/^[1-9]$/.test(value) && value !== '') {
                        e.target.value = '';
                    } else if (value !== '') {
                        // Update the board array
                        const row = parseInt(e.target.dataset.row);
                        const col = parseInt(e.target.dataset.col);
                        board[row][col] = parseInt(value);
                        
                        // Check if move is valid
                        if (!isValid(board, row, col, parseInt(value))) {
                            e.target.classList.add('error');
                        } else {
                            e.target.classList.remove('error');
                            // Check if puzzle is solved
                            if (isBoardFilled()) {
                                checkSolution();
                            }
                        }
                    }
                });
                
                cell.appendChild(input);
                boardElement.appendChild(cell);
            }
        }
    }
    
    // Generate a new Sudoku puzzle
    function generateNewGame() {
        // Clear any messages
        messageElement.textContent = '';
        messageElement.className = 'message';
        
        // Generate a solved puzzle
        generateSolvedPuzzle();
        
        // Create a puzzle by removing some numbers based on difficulty
        createPuzzle();
        
        // Update the UI
        updateBoardUI();
    }
    
    // Generate a complete, solved Sudoku puzzle
    function generateSolvedPuzzle() {
        // Clear the solution board
        solution = Array(9).fill().map(() => Array(9).fill(0));
        
        // Fill the diagonal 3x3 boxes first (these don't affect each other)
        for (let i = 0; i < 9; i += 3) {
            fillBox(i, i);
        }
        
        // Solve the rest of the puzzle
        solveSudoku(solution);
        
        // Clone the solution to start with
        board = solution.map(row => [...row]);
    }
    
    // Fill a 3x3 box with random numbers
    function fillBox(row, col) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(nums);
        
        let index = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                solution[row + i][col + j] = nums[index];
                index++;
            }
        }
    }
    
    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Solve the Sudoku puzzle using backtracking
    function solveSudoku(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (grid[row][col] === 0) {
                    // Try each number 1-9
                    for (let num = 1; num <= 9; num++) {
                        if (isValidPlacement(grid, row, col, num)) {
                            grid[row][col] = num;
                            
                            // Recursively try to solve the rest
                            if (solveSudoku(grid)) {
                                return true;
                            }
                            
                            // If we get here, this number didn't work
                            grid[row][col] = 0;
                        }
                    }
                    return false; // Trigger backtracking
                }
            }
        }
        return true; // All cells filled
    }
    
    // Check if it's valid to place num at grid[row][col]
    function isValidPlacement(grid, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    // Create a puzzle by removing numbers from the solved grid
    function createPuzzle() {
        let cellsToRemove;
        // Set number of cells to remove based on difficulty
        switch (difficulty) {
            case 'easy':
                cellsToRemove = 40; // 41 clues remain
                break;
            case 'medium':
                cellsToRemove = 50; // 31 clues remain
                break;
            case 'hard':
                cellsToRemove = 60; // 21 clues remain
                break;
            default:
                cellsToRemove = 40;
        }
        
        // Randomly remove cells
        let positions = [];
        for (let i = 0; i < 81; i++) {
            positions.push(i);
        }
        shuffleArray(positions);
        
        for (let i = 0; i < cellsToRemove; i++) {
            const pos = positions[i];
            const row = Math.floor(pos / 9);
            const col = pos % 9;
            board[row][col] = 0;
        }
    }
    
    // Update the UI to display the current board state
    function updateBoardUI() {
        const inputs = boardElement.querySelectorAll('input');
        inputs.forEach((input) => {
            const row = parseInt(input.dataset.row);
            const col = parseInt(input.dataset.col);
            
            input.value = board[row][col] || '';
            input.classList.remove('error');
            
            // Make given numbers readonly
            if (board[row][col] !== 0) {
                input.classList.add('given');
                input.readOnly = true;
            } else {
                input.classList.remove('given');
                input.readOnly = false;
            }
        });
    }
    
    // Check if a move is valid within the board context
    function isValid(grid, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (i !== col && grid[row][i] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (i !== row && grid[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((boxRow + i !== row || boxCol + j !== col) && 
                    grid[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    // Check if the board is completely filled
    function isBoardFilled() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) return false;
            }
        }
        return true;
    }
    
    // Check if the current board matches the solution
    function checkSolution() {
        let isCorrect = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== solution[i][j]) {
                    isCorrect = false;
                    break;
                }
            }
            if (!isCorrect) break;
        }
        
        if (isCorrect) {
            messageElement.textContent = "Congratulations! You solved the puzzle!";
            messageElement.className = 'message success';
        } else {
            messageElement.textContent = "There are some errors in your solution.";
            messageElement.className = 'message error';
        }
    }
    
    // Solve the puzzle automatically
    function solvePuzzle() {
        // Update the board with the solution
        board = solution.map(row => [...row]);
        updateBoardUI();
        messageElement.textContent = "Puzzle solved!";
        messageElement.className = 'message';
    }
});
