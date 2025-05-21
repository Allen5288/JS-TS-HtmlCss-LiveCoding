// filepath: f:\Coding\JS-HtmlCss-LiveCoding\00-JS-DSA\113-snakeJudge.js
// Game constants
const GRID_SIZE = 10; // Example grid size

// Directions
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

class SnakeGame {
  /**
   * Initializes the game state.
   * @param {number} gridSize - The size of the game grid (width and height).
   */
  constructor(gridSize = GRID_SIZE) {
    this.gridSize = gridSize;
    this.snake = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }]; // Snake starts in the middle
    this.food = this._getRandomFoodPosition();
    this.direction = DIRECTIONS.RIGHT; // Initial direction
    this.gameOver = false;
    this.score = 0;
  }

  /**
   * Generates a random position for food, ensuring it's not on the snake.
   * @returns {object} Coordinates {x, y} for the food.
   * Time Complexity: O(N) in the worst case, where N is the number of cells in the grid (if snake occupies most of it). Average case is O(1) if the snake is small.
   * Space Complexity: O(1)
   */
  _getRandomFoodPosition() {
    let foodPosition;
    do {
      foodPosition = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize),
      };
    } while (this.snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));
    return foodPosition;
  }

  /**
   * Moves the snake in the current direction and checks for collisions or food.
   * Time Complexity: O(S) where S is the length of the snake (due to self-collision check and updating snake body).
   * Space Complexity: O(1) (modifies the instance in place).
   */
  moveSnake() {
    if (this.gameOver) {
      return;
    }

    const head = { ...this.snake[0] };
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    // 1. Check for wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= this.gridSize ||
      newHead.y < 0 ||
      newHead.y >= this.gridSize
    ) {
      this.gameOver = true;
      console.log("Game Over: Hit a wall!");
      return;
    }

    // 2. Check for self-collision
    // The tail will move unless food is eaten, so self-collision check should be against the body excluding the current tail.
    const snakeBodyWithoutTail = this.snake.slice(0, this.snake.length -1);
    if (snakeBodyWithoutTail.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      // Allow moving into the previous tail position if not eating food
      if (!(this.snake.length > 1 && newHead.x === this.snake[this.snake.length -1].x && newHead.y === this.snake[this.snake.length -1].y)) {
          this.gameOver = true;
          console.log("Game Over: Hit itself!");
          return;
      }
    }

    this.snake.unshift(newHead); // Add new head

    // 3. Check for food collection
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score++;
      console.log("Ate food! Score:", this.score);
      // Don't remove tail, snake grows
      this.food = this._getRandomFoodPosition();
    } else {
      this.snake.pop(); // Remove tail if no food eaten
    }
  }

  /**
   * Changes the snake's direction, preventing it from immediately reversing.
   * @param {object} newDirection - The new direction (e.g., DIRECTIONS.UP).
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  changeDirection(newDirection) {
    const currentDirection = this.direction;
    // Prevent reversing direction
    if (
      (newDirection === DIRECTIONS.UP && currentDirection !== DIRECTIONS.DOWN) ||
      (newDirection === DIRECTIONS.DOWN && currentDirection !== DIRECTIONS.UP) ||
      (newDirection === DIRECTIONS.LEFT && currentDirection !== DIRECTIONS.RIGHT) ||
      (newDirection === DIRECTIONS.RIGHT && currentDirection !== DIRECTIONS.LEFT)
    ) {
      this.direction = newDirection;
    }
  }
}

// --- Unit Tests ---
function runTests() {
  console.log("--- Running Snake Game Tests (Class Version) ---");

  // Test 1: Initialization
  let game = new SnakeGame(10);
  console.assert(game.gridSize === 10, "Test 1.1 Failed: Grid size initialization");
  console.assert(game.snake.length === 1, "Test 1.2 Failed: Snake initial length");
  console.assert(game.food.x >= 0 && game.food.x < 10, "Test 1.3 Failed: Food X within bounds");
  console.assert(game.food.y >= 0 && game.food.y < 10, "Test 1.4 Failed: Food Y within bounds");
  console.assert(game.gameOver === false, "Test 1.5 Failed: Game not over initially");
  console.assert(game.score === 0, "Test 1.6 Failed: Initial score");
  console.log("Test 1 (Initialization): Passed");

  // Test 2: Simple Move
  game = new SnakeGame(10);
  game.snake = [{ x: 5, y: 5 }];
  game.direction = DIRECTIONS.RIGHT;
  game.moveSnake();
  console.assert(game.snake[0].x === 6 && game.snake[0].y === 5, "Test 2.1 Failed: Snake moved right");
  console.assert(game.snake.length === 1, "Test 2.2 Failed: Snake length after move");
  console.assert(!game.gameOver, "Test 2.3 Failed: Game not over after simple move");
  console.log("Test 2 (Simple Move): Passed");

  // Test 3: Change Direction
  game = new SnakeGame(10);
  game.changeDirection(DIRECTIONS.UP);
  console.assert(game.direction === DIRECTIONS.UP, "Test 3.1 Failed: Changed direction to UP");
  game.changeDirection(DIRECTIONS.DOWN); // Try to reverse
  console.assert(game.direction === DIRECTIONS.UP, "Test 3.2 Failed: Prevented reversing to DOWN");
  game.changeDirection(DIRECTIONS.LEFT);
  console.assert(game.direction === DIRECTIONS.LEFT, "Test 3.3 Failed: Changed direction to LEFT");
  console.log("Test 3 (Change Direction): Passed");

  // Test 4: Eat Food
  game = new SnakeGame(5);
  game.snake = [{ x: 1, y: 1 }];
  game.food = { x: 2, y: 1 };
  game.direction = DIRECTIONS.RIGHT;
  game.moveSnake();
  console.assert(game.snake[0].x === 2 && game.snake[0].y === 1, "Test 4.1 Failed: Snake moved to food");
  console.assert(game.snake.length === 2, "Test 4.2 Failed: Snake grew after eating food");
  console.assert(game.score === 1, "Test 4.3 Failed: Score incremented");
  console.assert(game.food.x !== 2 || game.food.y !== 1, "Test 4.4 Failed: New food generated");
  console.assert(!game.gameOver, "Test 4.5 Failed: Game not over after eating food");
  console.log("Test 4 (Eat Food): Passed");

  // Test 5: Wall Collision - Right
  game = new SnakeGame(3);
  game.snake = [{ x: 2, y: 1 }];
  game.direction = DIRECTIONS.RIGHT;
  game.moveSnake();
  console.assert(game.gameOver, "Test 5.1 Failed: Game over after hitting right wall");
  console.log("Test 5 (Wall Collision - Right): Passed");

  // Test 6: Wall Collision - Left
  game = new SnakeGame(3);
  game.snake = [{ x: 0, y: 1 }];
  game.direction = DIRECTIONS.LEFT;
  game.moveSnake();
  console.assert(game.gameOver, "Test 6.1 Failed: Game over after hitting left wall");
  console.log("Test 6 (Wall Collision - Left): Passed");

  // Test 7: Wall Collision - Top
  game = new SnakeGame(3);
  game.snake = [{ x: 1, y: 0 }];
  game.direction = DIRECTIONS.UP;
  game.moveSnake();
  console.assert(game.gameOver, "Test 7.1 Failed: Game over after hitting top wall");
  console.log("Test 7 (Wall Collision - Top): Passed");

  // Test 8: Wall Collision - Bottom
  game = new SnakeGame(3);
  game.snake = [{ x: 1, y: 2 }];
  game.direction = DIRECTIONS.DOWN;
  game.moveSnake();
  console.assert(game.gameOver, "Test 8.1 Failed: Game over after hitting bottom wall");
  console.log("Test 8 (Wall Collision - Bottom): Passed");

  // Test 9: Self Collision
  game = new SnakeGame(5);
  // Manually set snake to a state where next move causes collision
  // Snake: (2,2) (head), (3,2), (3,1), (2,1)
  // Moving UP from (2,2) to (2,1) should cause collision
  game.snake = [ {x: 2, y:2}, {x: 3, y:2}, {x: 3, y:1}, {x:2, y:1}];
  game.direction = DIRECTIONS.UP;
  game.moveSnake(); // Moves to (2,1) - should collide
  console.assert(game.gameOver, "Test 9.1 Failed: Game over after self-collision");

  // Test 9.2: Self Collision - more complex scenario
  game = new SnakeGame(10);
  game.snake = [
    { x: 5, y: 5 }, // head
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 3, y: 6 }, 
    { x: 4, y: 6 }, 
  ];
  game.direction = DIRECTIONS.DOWN; 
  game.moveSnake(); // Moves to (5,6)
  console.assert(!game.gameOver, "Test 9.2.1 Failed: Should not be game over yet");
  game.changeDirection(DIRECTIONS.LEFT); 
  game.moveSnake(); // Moves to (4,6) - should collide
  console.assert(game.gameOver, "Test 9.2.2 Failed: Game over after self-collision (complex)");
  console.log("Test 9 (Self Collision): Passed");


  // Test 10: Snake moves into its previous tail position (should not be game over)
  game = new SnakeGame(5);
  game.snake = [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }]; 
  game.direction = DIRECTIONS.DOWN; 
  game.moveSnake();
  console.assert(game.snake[0].x === 2 && game.snake[0].y === 3, "Test 10.1 Failed: Snake moved down");
  console.assert(!game.gameOver, "Test 10.2 Failed: Game not over after moving into previous tail spot (step 1)");

  game.changeDirection(DIRECTIONS.RIGHT); 
  game.moveSnake();
  console.assert(game.snake[0].x === 3 && game.snake[0].y === 3, "Test 10.3 Failed: Snake moved right");
  console.assert(!game.gameOver, "Test 10.4 Failed: Game not over after moving into previous tail spot (step 2)");

  game.changeDirection(DIRECTIONS.UP); 
  game.moveSnake();
  console.assert(game.snake[0].x === 3 && game.snake[0].y === 2, "Test 10.5 Failed: Snake moved up");
  console.assert(!game.gameOver, "Test 10.6 Failed: Game not over after moving into previous tail spot (step 3)");

  game.changeDirection(DIRECTIONS.LEFT); 
  game.moveSnake();
  console.assert(game.snake[0].x === 2 && game.snake[0].y === 2, "Test 10.7 Failed: Snake moved left into previous body part (now empty)");
  console.assert(!game.gameOver, "Test 10.8 Failed: Game not over after moving into previous tail spot (step 4 - completing a square)");
  console.log("Test 10 (Moving into previous tail position): Passed");


  console.log("--- All Tests Completed ---");
}

// To run the tests when this file is executed (e.g., via Node.js)
if (typeof require !== 'undefined' && require.main === module) {
  runTests();
}

// Export class and constants if used in a module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SnakeGame,
    DIRECTIONS,
    GRID_SIZE,
  };
}
