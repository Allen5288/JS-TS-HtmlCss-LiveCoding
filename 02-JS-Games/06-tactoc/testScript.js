// Unit tests for the Tic-Tac-Toe game
// This file contains tests for the checkResult function

// Mock DOM elements and global variables
let mockCells = [];
let mockStatus = { textContent: '' };
let mockScoreX = { textContent: '0' };
let mockScoreO = { textContent: '0' };

// Create mock cells
for (let i = 0; i < 9; i++) {
    mockCells.push({
        textContent: '',
        classList: {
            add: function(className) {
                this.classes = this.classes || [];
                this.classes.push(className);
            },
            contains: function(className) {
                return this.classes && this.classes.includes(className);
            }
        },
        classes: []
    });
}

// Original game state variables (copies from script.js)
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = {
    X: 0,
    O: 0
};

// Winning combinations (copy from script.js)
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Mock updateStatus function
function updateStatus() {
    mockStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Mock updateScores function
function updateScores() {
    mockScoreX.textContent = scores.X;
    mockScoreO.textContent = scores.O;
}

// Mock saveGameToStorage function
function saveGameToStorage() {
    // This is a mock, so we do nothing here
}

// Reset state for a new test
function resetTestState() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    scores = { X: 0, O: 0 };
    mockStatus.textContent = '';
    mockScoreX.textContent = '0';
    mockScoreO.textContent = '0';
    
    // Reset mock cells
    for (let i = 0; i < 9; i++) {
        mockCells[i].textContent = '';
        mockCells[i].classes = [];
    }
}

// Copy of the checkResult function for testing
function checkResult() {
    let roundWon = false;
    let winningCells = [];
    
    // Check for winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        
        if (
            gameState[a] !== '' &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }
    
    // Handle win
    if (roundWon) {
        gameActive = false;
        mockStatus.textContent = `Player ${currentPlayer} wins!`;
        
        // Add win animation to winning cells
        winningCells.forEach(index => {
            mockCells[index].classList.add('win');
        });
        
        // Update score
        scores[currentPlayer]++;
        updateScores();
        return;
    }
    
    // Handle draw
    if (!gameState.includes('')) {
        gameActive = false;
        mockStatus.textContent = 'Game ended in a draw!';
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Test function for checkResult
function testCheckResult() {
    console.log("Running checkResult tests");
    let allTestsPassed = true;
    const totalTests = 12; // Update this when adding tests
    let passedTests = 0;
    
    // Test Case 1: X wins with top row
    resetTestState();
    gameState = [
        'X', 'X', 'X',
        '', 'O', 'O',
        '', '', ''
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player X wins!' && 
        scores.X === 1 && 
        mockCells[0].classList.contains('win') && 
        mockCells[1].classList.contains('win') && 
        mockCells[2].classList.contains('win')) {
        console.log("✅ Test 1 passed: X wins with top row");
        passedTests++;
    } else {
        console.error("❌ Test 1 failed: X wins with top row");
        allTestsPassed = false;
    }
    
    // Test Case 2: O wins with middle row
    resetTestState();
    gameState = [
        'X', '', 'X',
        'O', 'O', 'O',
        'X', '', ''
    ];
    currentPlayer = 'O';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player O wins!' && 
        scores.O === 1 && 
        mockCells[3].classList.contains('win') && 
        mockCells[4].classList.contains('win') && 
        mockCells[5].classList.contains('win')) {
        console.log("✅ Test 2 passed: O wins with middle row");
        passedTests++;
    } else {
        console.error("❌ Test 2 failed: O wins with middle row");
        allTestsPassed = false;
    }
    
    // Test Case 3: X wins with bottom row
    resetTestState();
    gameState = [
        'O', '', 'O',
        '', '', '',
        'X', 'X', 'X'
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player X wins!' && 
        scores.X === 1 && 
        mockCells[6].classList.contains('win') && 
        mockCells[7].classList.contains('win') && 
        mockCells[8].classList.contains('win')) {
        console.log("✅ Test 3 passed: X wins with bottom row");
        passedTests++;
    } else {
        console.error("❌ Test 3 failed: X wins with bottom row");
        allTestsPassed = false;
    }
    
    // Test Case 4: O wins with left column
    resetTestState();
    gameState = [
        'O', 'X', 'X',
        'O', 'X', '',
        'O', '', ''
    ];
    currentPlayer = 'O';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player O wins!' && 
        scores.O === 1 && 
        mockCells[0].classList.contains('win') && 
        mockCells[3].classList.contains('win') && 
        mockCells[6].classList.contains('win')) {
        console.log("✅ Test 4 passed: O wins with left column");
        passedTests++;
    } else {
        console.error("❌ Test 4 failed: O wins with left column");
        allTestsPassed = false;
    }
    
    // Test Case 5: X wins with middle column
    resetTestState();
    gameState = [
        'O', 'X', '',
        '', 'X', 'O',
        '', 'X', 'O'
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player X wins!' && 
        scores.X === 1 && 
        mockCells[1].classList.contains('win') && 
        mockCells[4].classList.contains('win') && 
        mockCells[7].classList.contains('win')) {
        console.log("✅ Test 5 passed: X wins with middle column");
        passedTests++;
    } else {
        console.error("❌ Test 5 failed: X wins with middle column");
        allTestsPassed = false;
    }
    
    // Test Case 6: O wins with right column
    resetTestState();
    gameState = [
        'X', '', 'O',
        'X', '', 'O',
        '', 'X', 'O'
    ];
    currentPlayer = 'O';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player O wins!' && 
        scores.O === 1 && 
        mockCells[2].classList.contains('win') && 
        mockCells[5].classList.contains('win') && 
        mockCells[8].classList.contains('win')) {
        console.log("✅ Test 6 passed: O wins with right column");
        passedTests++;
    } else {
        console.error("❌ Test 6 failed: O wins with right column");
        allTestsPassed = false;
    }
    
    // Test Case 7: X wins with diagonal (top-left to bottom-right)
    resetTestState();
    gameState = [
        'X', '', 'O',
        'O', 'X', '',
        '', '', 'X'
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player X wins!' && 
        scores.X === 1 && 
        mockCells[0].classList.contains('win') && 
        mockCells[4].classList.contains('win') && 
        mockCells[8].classList.contains('win')) {
        console.log("✅ Test 7 passed: X wins with diagonal (top-left to bottom-right)");
        passedTests++;
    } else {
        console.error("❌ Test 7 failed: X wins with diagonal (top-left to bottom-right)");
        allTestsPassed = false;
    }
    
    // Test Case 8: O wins with diagonal (top-right to bottom-left)
    resetTestState();
    gameState = [
        'X', 'X', 'O',
        'X', 'O', '',
        'O', '', ''
    ];
    currentPlayer = 'O';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Player O wins!' && 
        scores.O === 1 && 
        mockCells[2].classList.contains('win') && 
        mockCells[4].classList.contains('win') && 
        mockCells[6].classList.contains('win')) {
        console.log("✅ Test 8 passed: O wins with diagonal (top-right to bottom-left)");
        passedTests++;
    } else {
        console.error("❌ Test 8 failed: O wins with diagonal (top-right to bottom-left)");
        allTestsPassed = false;
    }
    
    // Test Case 9: Draw
    resetTestState();
    gameState = [
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O', 'X', 'X'
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === false && 
        mockStatus.textContent === 'Game ended in a draw!' && 
        scores.X === 0 && 
        scores.O === 0) {
        console.log("✅ Test 9 passed: Game ended in a draw");
        passedTests++;
    } else {
        console.error("❌ Test 9 failed: Game ended in a draw");
        allTestsPassed = false;
    }
    
    // Test Case 10: Game continues, player switch from X to O
    resetTestState();
    gameState = [
        'X', '', '',
        '', 'O', '',
        '', '', ''
    ];
    currentPlayer = 'X';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === true && 
        currentPlayer === 'O' && 
        mockStatus.textContent === "Player O's turn") {
        console.log("✅ Test 10 passed: Game continues, player switched from X to O");
        passedTests++;
    } else {
        console.error("❌ Test 10 failed: Game continues, player switched from X to O");
        allTestsPassed = false;
    }
    
    // Test Case 11: Game continues, player switch from O to X
    resetTestState();
    gameState = [
        'X', '', '',
        '', 'O', '',
        '', '', ''
    ];
    currentPlayer = 'O';
    
    // Update mock cells to match game state
    for (let i = 0; i < 9; i++) {
        if (gameState[i] !== '') {
            mockCells[i].textContent = gameState[i];
        }
    }
    
    checkResult();
    
    if (gameActive === true && 
        currentPlayer === 'X' && 
        mockStatus.textContent === "Player X's turn") {
        console.log("✅ Test 11 passed: Game continues, player switched from O to X");
        passedTests++;
    } else {
        console.error("❌ Test 11 failed: Game continues, player switched from O to X");
        allTestsPassed = false;
    }
    
    // Test Case 12: Empty board, game continues
    resetTestState();
    gameState = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    currentPlayer = 'X';
    
    checkResult();
    
    if (gameActive === true && 
        currentPlayer === 'O' && 
        mockStatus.textContent === "Player O's turn") {
        console.log("✅ Test 12 passed: Empty board, game continues");
        passedTests++;
    } else {
        console.error("❌ Test 12 failed: Empty board, game continues");
        allTestsPassed = false;
    }
    
    // Summary
    console.log(`\nTest Summary: ${passedTests} out of ${totalTests} tests passed`);
    if (allTestsPassed) {
        console.log("🎉 All tests passed successfully!");
    } else {
        console.error("❌ Some tests failed, please check the test results above.");
    }
    
    return allTestsPassed;
}

// Run the tests
testCheckResult();
