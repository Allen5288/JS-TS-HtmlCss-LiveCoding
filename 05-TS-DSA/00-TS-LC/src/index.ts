/**
 * LeetCode TypeScript Solutions - Main Entry Point
 * 
 * This file runs all the implemented solutions and their test cases.
 * Each problem includes multiple approaches with detailed analysis.
 */

import { TestHelper } from './TestHelper';

// Import all problem solutions
import { TwoSum } from './Arrays/TwoSum';
import { MaximumDepthOfBinaryTree } from './Trees/MaximumDepthOfBinaryTree';
import { ClimbingStairs } from './DynamicProgramming/ClimbingStairs';
import { ReverseString } from './Strings/ReverseString';
import { ReverseLinkedList } from './LinkedLists/ReverseLinkedList';

interface ProblemSuite {
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  runTests: () => void;
}

class LeetCodeRunner {  private problems: ProblemSuite[] = [
    {
      name: 'Two Sum',
      category: 'Arrays',
      difficulty: 'Easy',
      runTests: TwoSum.runTests
    },
    {
      name: 'Maximum Depth of Binary Tree',
      category: 'Trees',
      difficulty: 'Easy',
      runTests: MaximumDepthOfBinaryTree.runTests
    },
    {
      name: 'Climbing Stairs',
      category: 'Dynamic Programming',
      difficulty: 'Easy',
      runTests: ClimbingStairs.runTests
    },
    {
      name: 'Reverse String',
      category: 'Strings',
      difficulty: 'Easy',
      runTests: ReverseString.runTests
    },
    {
      name: 'Reverse Linked List',
      category: 'Linked Lists',
      difficulty: 'Easy',
      runTests: ReverseLinkedList.runTests
    }
  ];

  /**
   * Run all problems
   */
  runAll(): void {
    console.log('🚀 LeetCode TypeScript Solutions Test Runner');
    console.log('=' .repeat(60));
    console.log(`📊 Total Problems: ${this.problems.length}`);
    console.log(`📁 Categories: ${[...new Set(this.problems.map(p => p.category))].join(', ')}`);
    console.log(`🎯 Difficulties: ${[...new Set(this.problems.map(p => p.difficulty))].join(', ')}`);
    console.log('=' .repeat(60));

    TestHelper.reset();
    const startTime = performance.now();

    for (const problem of this.problems) {
      try {
        console.log(`\n🧩 Running: ${problem.name} (${problem.category} - ${problem.difficulty})`);
        problem.runTests();
      } catch (error) {
        console.error(`❌ Error running ${problem.name}:`, error);
      }
    }

    const endTime = performance.now();
    
    console.log('\n' + '=' .repeat(60));
    console.log('🏁 All Tests Completed!');
    console.log(`⏱️  Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
    
    TestHelper.printSummary();
    this.printStatistics();
  }

  /**
   * Run problems by category
   */
  runByCategory(category: string): void {
    const categoryProblems = this.problems.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryProblems.length === 0) {
      console.log(`❌ No problems found for category: ${category}`);
      return;
    }

    console.log(`🚀 Running ${category} Problems`);
    console.log('=' .repeat(40));

    TestHelper.reset();

    for (const problem of categoryProblems) {
      console.log(`\n🧩 ${problem.name} (${problem.difficulty})`);
      problem.runTests();
    }

    TestHelper.printSummary();
  }

  /**
   * Run problems by difficulty
   */
  runByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): void {
    const difficultyProblems = this.problems.filter(p => p.difficulty === difficulty);

    if (difficultyProblems.length === 0) {
      console.log(`❌ No ${difficulty} problems found`);
      return;
    }

    console.log(`🚀 Running ${difficulty} Problems`);
    console.log('=' .repeat(40));

    TestHelper.reset();

    for (const problem of difficultyProblems) {
      console.log(`\n🧩 ${problem.name} (${problem.category})`);
      problem.runTests();
    }

    TestHelper.printSummary();
  }

  /**
   * List all available problems
   */
  listProblems(): void {
    console.log('📋 Available LeetCode Problems:\n');
    
    const groupedByCategory = this.problems.reduce((acc, problem) => {
      if (!acc[problem.category]) {
        acc[problem.category] = [];
      }
      acc[problem.category].push(problem);
      return acc;
    }, {} as Record<string, ProblemSuite[]>);

    for (const [category, problems] of Object.entries(groupedByCategory)) {
      console.log(`📂 ${category}:`);
      problems.forEach(problem => {
        const difficultyEmoji = problem.difficulty === 'Easy' ? '🟢' : 
                              problem.difficulty === 'Medium' ? '🟡' : '🔴';
        console.log(`   ${difficultyEmoji} ${problem.name}`);
      });
      console.log();
    }
  }

  /**
   * Print statistics about the problems
   */
  private printStatistics(): void {
    const categories = [...new Set(this.problems.map(p => p.category))];
    const difficulties = this.problems.reduce((acc, p) => {
      acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('📈 Problem Statistics:');
    console.log(`   Total Categories: ${categories.length}`);
    console.log(`   Easy: ${difficulties.Easy || 0}`);
    console.log(`   Medium: ${difficulties.Medium || 0}`);
    console.log(`   Hard: ${difficulties.Hard || 0}`);
    
    console.log('\n📁 Categories:');
    categories.forEach(category => {
      const count = this.problems.filter(p => p.category === category).length;
      console.log(`   • ${category}: ${count} problem${count !== 1 ? 's' : ''}`);
    });
  }

  /**
   * Display help information
   */
  showHelp(): void {
    console.log('🔧 LeetCode TypeScript Solutions - Usage Guide\n');
    console.log('Available commands:');
    console.log('  npm run dev              - Run all problems');
    console.log('  npm run test             - Run all problems');
    console.log('  npm run build            - Build TypeScript to JavaScript');
    console.log('  npm start                - Run compiled JavaScript');
    console.log('\nTo run specific categories or difficulties, modify the main() function in src/index.ts\n');
    console.log('Example usage in code:');
    console.log('  runner.runByCategory("Arrays");');
    console.log('  runner.runByDifficulty("Easy");');
    console.log('  runner.listProblems();');
  }
}

/**
 * Main execution function
 */
function main(): void {
  const runner = new LeetCodeRunner();
  
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Run all problems by default
    runner.runAll();
  } else {
    const command = args[0].toLowerCase();
    
    switch (command) {
      case 'list':
        runner.listProblems();
        break;
      case 'help':
        runner.showHelp();
        break;
      case 'category':
        if (args[1]) {
          runner.runByCategory(args[1]);
        } else {
          console.log('❌ Please specify a category (e.g., Arrays, Trees)');
        }
        break;
      case 'difficulty':
        if (args[1] && ['Easy', 'Medium', 'Hard'].includes(args[1])) {
          runner.runByDifficulty(args[1] as 'Easy' | 'Medium' | 'Hard');
        } else {
          console.log('❌ Please specify a valid difficulty (Easy, Medium, Hard)');
        }
        break;
      default:
        console.log(`❌ Unknown command: ${command}`);
        runner.showHelp();
    }
  }
}

// Export for potential module usage
export { LeetCodeRunner };

// Run if this is the main module
if (require.main === module) {
  main();
}
