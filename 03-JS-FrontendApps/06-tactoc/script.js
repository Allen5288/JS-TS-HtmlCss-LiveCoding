// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

// Game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = {
    X: 0,
    O: 0
};

// Winning combinations
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

// Initialize the game
function init() {
    // Add click event to cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Add click event to reset button
    resetBtn.addEventListener('click', resetGame);
    
    // Initialize game state
    updateStatus();
    loadGameFromStorage();
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    // Check if cell is already filled or game is not active
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    
    // Update game state
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    // Check for win or draw
    checkResult();
    
    // Save game to localStorage
    saveGameToStorage();
}

// Check for win or draw
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
        status.textContent = `Player ${currentPlayer} wins!`;
        
        // Add win animation to winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('win');
        });
        
        // Update score
        scores[currentPlayer]++;
        updateScores();
        return;
    }
    
    // Handle draw
    if (!gameState.includes('')) {
        gameActive = false;
        status.textContent = 'Game ended in a draw!';
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Update game status message
function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Update scores
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Reset UI
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'win');
    });
    
    updateStatus();
    saveGameToStorage();
}

// Save game state to localStorage
function saveGameToStorage() {
    localStorage.setItem('ticTacToeGame', JSON.stringify({
        gameState,
        currentPlayer,
        gameActive,
        scores
    }));
}

// Load game state from localStorage
function loadGameFromStorage() {
    const savedGame = localStorage.getItem('ticTacToeGame');
    
    if (savedGame) {
        const { gameState: savedGameState, currentPlayer: savedPlayer, gameActive: savedGameActive, scores: savedScores } = JSON.parse(savedGame);
        
        // Restore game state
        gameState = savedGameState;
        currentPlayer = savedPlayer;
        gameActive = savedGameActive;
        scores = savedScores;
        
        // Update UI
        gameState.forEach((value, index) => {
            if (value !== '') {
                cells[index].textContent = value;
                cells[index].classList.add(value.toLowerCase());
            }
        });
        
        updateStatus();
        updateScores();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
