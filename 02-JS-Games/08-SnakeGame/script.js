// DOM Elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 150; // milliseconds between moves
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let gameActive = false;
let gamePaused = false;

// Initialize the game
function init() {
    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    restartBtn.addEventListener('click', () => {
        gameOverModal.style.display = 'none';
        resetGame();
        startGame();
    });
    
    // Disable pause button at start
    pauseBtn.disabled = true;
    
    // Draw initial screen
    drawGrid();
    drawInstructions();
    
    // Load high score from localStorage
    highScoreElement.textContent = highScore;
}

// Start the game
function startGame() {
    if (gameActive) return;
    
    // Initialize snake
    snake = [
        {x: 6, y: 10},
        {x: 5, y: 10},
        {x: 4, y: 10}
    ];
    
    // Generate initial food
    generateFood();
    
    // Reset game state
    score = 0;
    direction = 'right';
    nextDirection = 'right';
    gameActive = true;
    gamePaused = false;
    
    // Update UI
    scoreElement.textContent = score;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // Start game loop
    gameInterval = setInterval(gameLoop, GAME_SPEED);
}

// Reset the game
function resetGame() {
    clearInterval(gameInterval);
    gameActive = false;
    gamePaused = false;
    score = 0;
    
    // Reset UI
    scoreElement.textContent = score;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    
    // Draw initial screen
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid();
    drawInstructions();
}

// Toggle pause
function togglePause() {
    if (!gameActive) return;
    
    if (gamePaused) {
        // Resume game
        gameInterval = setInterval(gameLoop, GAME_SPEED);
        gamePaused = false;
        pauseBtn.textContent = 'Pause';
    } else {
        // Pause game
        clearInterval(gameInterval);
        gamePaused = true;
        pauseBtn.textContent = 'Resume';
        
        // Draw paused message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Paused', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
}

// Update game state
function update() {
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = {...snake[0]};
    
    switch(direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // Check for collisions
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score += 10;
        scoreElement.textContent = score;
        
        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Generate new food
        generateFood();
    } else {
        // Remove tail if not eating
        snake.pop();
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw grid
    drawGrid();
    
    // Draw food
    ctx.fillStyle = '#FF5252';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    
    // Draw snake
    snake.forEach((segment, index) => {
        // Head is a different color
        if (index === 0) {
            ctx.fillStyle = '#4CAF50';
        } else {
            ctx.fillStyle = '#66BB6A';
        }
        
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        
        // Add eyes to head
        if (index === 0) {
            ctx.fillStyle = 'white';
            
            // Position eyes based on direction
            if (direction === 'right') {
                ctx.fillRect(segment.x * GRID_SIZE + 12, segment.y * GRID_SIZE + 4, 4, 4);
                ctx.fillRect(segment.x * GRID_SIZE + 12, segment.y * GRID_SIZE + 12, 4, 4);
            } else if (direction === 'left') {
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 4, 4, 4);
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 12, 4, 4);
            } else if (direction === 'up') {
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 4, 4, 4);
                ctx.fillRect(segment.x * GRID_SIZE + 12, segment.y * GRID_SIZE + 4, 4, 4);
            } else if (direction === 'down') {
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 12, 4, 4);
                ctx.fillRect(segment.x * GRID_SIZE + 12, segment.y * GRID_SIZE + 12, 4, 4);
            }
        }
        
        // Add border to each segment
        ctx.strokeStyle = '#388E3C';
        ctx.strokeRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
}

// Draw grid
function drawGrid() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
    }
}

// Draw instructions on canvas
function drawInstructions() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to Play', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
    
    ctx.font = '16px Arial';
    ctx.fillText('Use Arrow Keys to control the snake', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
    ctx.fillText('Eat food to grow and earn points', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
}

// Generate food in a random position
function generateFood() {
    // Create random position for food
    let foodPosition = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
    };
    
    // Make sure food doesn't spawn on snake
    while (snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y)) {
        foodPosition = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
    }
    
    food = foodPosition;
}

// Check for collisions
function checkCollision(position) {
    // Check wall collisions
    if (
        position.x < 0 || 
        position.y < 0 || 
        position.x >= GRID_WIDTH || 
        position.y >= GRID_HEIGHT
    ) {
        return true;
    }
    
    // Check snake body collision (skip head)
    for (let i = 1; i < snake.length; i++) {
        if (position.x === snake[i].x && position.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// Handle keyboard input
function handleKeyPress(event) {
    if (!gameActive || gamePaused) return;
    
    // Prevent default action (scrolling) for arrow keys
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
    }
    
    // Update direction based on key pressed
    switch(event.keyCode) {
        case 38: // Up arrow
            if (direction !== 'down') {
                nextDirection = 'up';
            }
            break;
        case 40: // Down arrow
            if (direction !== 'up') {
                nextDirection = 'down';
            }
            break;
        case 37: // Left arrow
            if (direction !== 'right') {
                nextDirection = 'left';
            }
            break;
        case 39: // Right arrow
            if (direction !== 'left') {
                nextDirection = 'right';
            }
            break;
        case 32: // Spacebar
            togglePause();
            break;
    }
}

// Game over
function gameOver() {
    clearInterval(gameInterval);
    gameActive = false;
    
    // Update UI
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Show game over modal
    finalScoreElement.textContent = score;
    gameOverModal.style.display = 'flex';
    
    // Save high score
    if (score > highScore) {
        localStorage.setItem('snakeHighScore', score);
    }
}

// Save game state to localStorage
function saveGameToStorage() {
    const gameData = {
        snake: snake,
        food: food,
        direction: direction,
        nextDirection: nextDirection,
        score: score,
        highScore: highScore,
        gameActive: gameActive,
        gamePaused: gamePaused
    };
    
    localStorage.setItem('snakeGameState', JSON.stringify(gameData));
}

// Load game state from localStorage
function loadGameFromStorage() {
    const savedGame = localStorage.getItem('snakeGameState');
    
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        
        snake = gameData.snake;
        food = gameData.food;
        direction = gameData.direction;
        nextDirection = gameData.nextDirection;
        score = gameData.score;
        highScore = gameData.highScore;
        gameActive = gameData.gameActive;
        gamePaused = gameData.gamePaused;
        
        // Update UI
        scoreElement.textContent = score;
        highScoreElement.textContent = highScore;
        
        // Update button states
        startBtn.disabled = gameActive;
        pauseBtn.disabled = !gameActive;
        
        // Restart game loop if game was active
        if (gameActive && !gamePaused) {
            gameInterval = setInterval(gameLoop, GAME_SPEED);
        } else if (gameActive && gamePaused) {
            // Draw paused message
            draw();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Game Paused', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            pauseBtn.textContent = 'Resume';
        } else {
            // Draw initial screen
            drawGrid();
            drawInstructions();
        }
    }
}

// Event listener for before page unload
window.addEventListener('beforeunload', saveGameToStorage);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if canvas context is available
    if (!ctx) {
        console.error('Canvas context not supported!');
        return;
    }
    
    init();
    loadGameFromStorage();
});
