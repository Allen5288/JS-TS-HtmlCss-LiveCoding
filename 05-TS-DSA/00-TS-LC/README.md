# LeetCode TypeScript Solutions

A comprehensive collection of LeetCode problems solved in TypeScript with multiple approaches, detailed analysis, and robust testing framework.

## 🎯 Features

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Multiple Approaches**: Each problem includes various solution strategies
- **Performance Analysis**: Time and space complexity analysis with benchmarking
- **Comprehensive Testing**: Robust test framework with detailed output
- **Organized Structure**: Problems categorized by algorithm type
- **Modern Development**: Uses latest TypeScript features and best practices

## 📁 Project Structure

```
TS/
├── src/
│   ├── Arrays/                    # Array manipulation problems
│   │   └── TwoSum.ts             # LeetCode 1: Multiple approaches with analysis
│   ├── Trees/                     # Binary tree problems
│   │   └── MaximumDepthOfBinaryTree.ts  # LeetCode 104: 4 different approaches
│   ├── DynamicProgramming/        # DP problems
│   │   └── ClimbingStairs.ts     # LeetCode 70: 6 different approaches
│   ├── Strings/                   # String processing
│   ├── LinkedLists/               # Linked list problems
│   ├── BinarySearch/              # Binary search algorithms
│   ├── Graph/                     # Graph algorithms
│   ├── Greedy/                    # Greedy algorithms
│   ├── HashTable/                 # Hash table problems
│   ├── Math/                      # Mathematical problems
│   ├── Stack/                     # Stack-based problems
│   ├── Queue/                     # Queue-based problems
│   ├── TwoPointers/               # Two pointers technique
│   ├── Sorting/                   # Sorting algorithms
│   ├── Simulation/                # Simulation problems
│   ├── Backtracking/              # Backtracking algorithms
│   ├── BFS/                       # Breadth-first search
│   ├── DataStructures.ts          # Common data structures and utilities
│   ├── TestHelper.ts              # Comprehensive testing framework
│   └── index.ts                   # Main runner with advanced features
├── package.json                   # Project configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd TS
npm install
```

### Running Solutions

```bash
# Run all problems
npm run dev

# Build and run
npm run build
npm start

# Watch mode (auto-reload on changes)
npm run watch

# Run tests
npm test
```

### Advanced Usage

```bash
# Run specific category
npm run dev category Arrays

# Run by difficulty
npm run dev difficulty Easy

# List all problems
npm run dev list

# Show help
npm run dev help
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run with ts-node (development) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled JavaScript |
| `npm run watch` | Watch mode with auto-reload |
| `npm test` | Run all test suites |
| `npm run clean` | Remove compiled files |
| `npm run rebuild` | Clean and build |

## 🧩 Implemented Problems

### Arrays (1 problem)
- **LeetCode 1 - Two Sum** 🟢 Easy
  - Brute Force: O(n²) time, O(1) space
  - Hash Map: O(n) time, O(n) space
  - Two Pointers: O(n log n) time, O(n) space

### Trees (1 problem)
- **LeetCode 104 - Maximum Depth of Binary Tree** 🟢 Easy
  - Recursive DFS: O(n) time, O(h) space
  - Iterative BFS: O(n) time, O(w) space
  - Iterative DFS: O(n) time, O(h) space
  - Morris Traversal: O(n) time, O(1) space

### Dynamic Programming (1 problem)
- **LeetCode 70 - Climbing Stairs** 🟢 Easy
  - Naive Recursion: O(2^n) time, O(n) space
  - Memoization: O(n) time, O(n) space
  - Tabulation: O(n) time, O(n) space
  - Space Optimized: O(n) time, O(1) space
  - Matrix Exponentiation: O(log n) time, O(1) space
  - Mathematical Formula: O(1) time, O(1) space

## 🛠️ Key Features

### Type-Safe Data Structures

```typescript
// Comprehensive data structure definitions
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export class ListNode {
  val: number;
  next: ListNode | null;
}

// Helper utilities
export class DataStructureHelper {
  static createBinaryTree(values: (number | null)[]): TreeNode | null;
  static createLinkedList(values: number[]): ListNode | null;
}
```

### Robust Testing Framework

```typescript
// Advanced testing with detailed output
TestHelper.runTest('Test Name', expected, actual);
TestHelper.measureTime(() => solution.method(), 'Algorithm Name');
TestHelper.printSummary(); // Comprehensive test statistics
```

### Multiple Solution Approaches

Each problem includes:
- **Brute Force**: Simple, intuitive solution
- **Optimized**: Efficient algorithm with better complexity
- **Advanced**: Alternative approaches (mathematical, matrix, etc.)
- **Detailed Analysis**: Time/space complexity explanation

## 📈 Performance Features

### Execution Time Measurement
```typescript
TestHelper.measureTime(() => solution.algorithm(), 'Algorithm Name');
```

### Comprehensive Benchmarking
- Compare multiple approaches side-by-side
- Large input testing for scalability analysis
- Memory usage insights

### Visual Test Results
```
✅ PASS Test Case 1: [2,7,11,15], target = 9
✅ PASS Test Case 2: [3,2,4], target = 6
❌ FAIL Test Case 3: Expected [0,1], Got [1,0]
```

## 🎓 Learning Resources

### Algorithm Complexity Analysis
Each solution includes:
- **Time Complexity**: Big O notation explanation
- **Space Complexity**: Memory usage analysis
- **Trade-offs**: When to use each approach

### Best Practices Demonstrated
- TypeScript strict mode usage
- Comprehensive error handling
- Clean, readable code structure
- Proper type annotations
- Performance optimization techniques

## 🔧 Development Setup

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Adding New Problems

1. **Choose Category**: Select appropriate folder (Arrays, Trees, etc.)
2. **Create File**: Follow naming convention `ProblemName.ts`
3. **Use Template**:
   ```typescript
   import { TestHelper } from '../TestHelper';
   
   export class ProblemName {
     solution(input: InputType): OutputType {
       // Implementation
     }
     
     static runTests(): void {
       TestHelper.printHeader('LeetCode X. Problem Name');
       // Test cases
     }
   }
   ```
4. **Add to Index**: Import and add to problem list in `src/index.ts`

### File Naming Convention
- Use PascalCase for class names
- Use descriptive names: `MaximumDepthOfBinaryTree.ts`
- Include LeetCode number in comments: `// LeetCode 104`

## 🌟 Advanced Features

### Command Line Interface
```bash
npm run dev list                    # List all problems
npm run dev category Trees          # Run tree problems only
npm run dev difficulty Medium       # Run medium problems only
```

### Flexible Test Runner
- Run individual problems
- Filter by category or difficulty
- Comprehensive statistics
- Performance benchmarking

### Type Safety Benefits
- Compile-time error checking
- IntelliSense support
- Refactoring safety
- Clear interface contracts

## 📝 Problem Template

```typescript
import { TestHelper } from '../TestHelper';

/**
 * LeetCode XXX. Problem Name
 * 
 * Problem description here...
 * 
 * Example:
 * Input: example input
 * Output: example output
 * 
 * Constraints:
 * - constraint details
 */

export class ProblemName {
  /**
   * Approach 1: Description
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  solution1(input: InputType): OutputType {
    // Implementation
  }

  /**
   * Approach 2: Optimized
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  solution2(input: InputType): OutputType {
    // Implementation
  }

  static runTests(): void {
    TestHelper.printHeader('LeetCode XXX. Problem Name');
    
    const solution = new ProblemName();
    
    // Test cases
    const testCases = [
      { name: 'Example 1', input: ..., expected: ... },
      // More test cases
    ];

    // Test all approaches
    for (const testCase of testCases) {
      const result1 = solution.solution1(testCase.input);
      TestHelper.runTest(testCase.name, testCase.expected, result1);
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-problem`)
3. Add your solution following the template
4. Ensure all tests pass
5. Add comprehensive test cases
6. Update documentation if needed
7. Submit a pull request

## 📚 Resources

- [LeetCode Official](https://leetcode.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Algorithm Visualizations](https://visualgo.net/)
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🚀** 

Practice makes perfect. Keep solving, keep learning!
