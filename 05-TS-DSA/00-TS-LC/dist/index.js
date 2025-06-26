"use strict";
/**
 * LeetCode TypeScript Solutions - Main Entry Point
 *
 * This file runs all the implemented solutions and their test cases.
 * Each problem includes multiple approaches with detailed analysis.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeetCodeRunner = void 0;
const TestHelper_1 = require("./TestHelper");
// Import all problem solutions
const TwoSum_1 = require("./Arrays/TwoSum");
const MaximumDepthOfBinaryTree_1 = require("./Trees/MaximumDepthOfBinaryTree");
const ClimbingStairs_1 = require("./DynamicProgramming/ClimbingStairs");
const ReverseString_1 = require("./Strings/ReverseString");
const ReverseLinkedList_1 = require("./LinkedLists/ReverseLinkedList");
class LeetCodeRunner {
    constructor() {
        this.problems = [
            {
                name: 'Two Sum',
                category: 'Arrays',
                difficulty: 'Easy',
                runTests: TwoSum_1.TwoSum.runTests
            },
            {
                name: 'Maximum Depth of Binary Tree',
                category: 'Trees',
                difficulty: 'Easy',
                runTests: MaximumDepthOfBinaryTree_1.MaximumDepthOfBinaryTree.runTests
            },
            {
                name: 'Climbing Stairs',
                category: 'Dynamic Programming',
                difficulty: 'Easy',
                runTests: ClimbingStairs_1.ClimbingStairs.runTests
            },
            {
                name: 'Reverse String',
                category: 'Strings',
                difficulty: 'Easy',
                runTests: ReverseString_1.ReverseString.runTests
            },
            {
                name: 'Reverse Linked List',
                category: 'Linked Lists',
                difficulty: 'Easy',
                runTests: ReverseLinkedList_1.ReverseLinkedList.runTests
            }
        ];
    }
    /**
     * Run all problems
     */
    runAll() {
        console.log('🚀 LeetCode TypeScript Solutions Test Runner');
        console.log('='.repeat(60));
        console.log(`📊 Total Problems: ${this.problems.length}`);
        console.log(`📁 Categories: ${[...new Set(this.problems.map(p => p.category))].join(', ')}`);
        console.log(`🎯 Difficulties: ${[...new Set(this.problems.map(p => p.difficulty))].join(', ')}`);
        console.log('='.repeat(60));
        TestHelper_1.TestHelper.reset();
        const startTime = performance.now();
        for (const problem of this.problems) {
            try {
                console.log(`\n🧩 Running: ${problem.name} (${problem.category} - ${problem.difficulty})`);
                problem.runTests();
            }
            catch (error) {
                console.error(`❌ Error running ${problem.name}:`, error);
            }
        }
        const endTime = performance.now();
        console.log('\n' + '='.repeat(60));
        console.log('🏁 All Tests Completed!');
        console.log(`⏱️  Total Execution Time: ${(endTime - startTime).toFixed(2)}ms`);
        TestHelper_1.TestHelper.printSummary();
        this.printStatistics();
    }
    /**
     * Run problems by category
     */
    runByCategory(category) {
        const categoryProblems = this.problems.filter(p => p.category.toLowerCase() === category.toLowerCase());
        if (categoryProblems.length === 0) {
            console.log(`❌ No problems found for category: ${category}`);
            return;
        }
        console.log(`🚀 Running ${category} Problems`);
        console.log('='.repeat(40));
        TestHelper_1.TestHelper.reset();
        for (const problem of categoryProblems) {
            console.log(`\n🧩 ${problem.name} (${problem.difficulty})`);
            problem.runTests();
        }
        TestHelper_1.TestHelper.printSummary();
    }
    /**
     * Run problems by difficulty
     */
    runByDifficulty(difficulty) {
        const difficultyProblems = this.problems.filter(p => p.difficulty === difficulty);
        if (difficultyProblems.length === 0) {
            console.log(`❌ No ${difficulty} problems found`);
            return;
        }
        console.log(`🚀 Running ${difficulty} Problems`);
        console.log('='.repeat(40));
        TestHelper_1.TestHelper.reset();
        for (const problem of difficultyProblems) {
            console.log(`\n🧩 ${problem.name} (${problem.category})`);
            problem.runTests();
        }
        TestHelper_1.TestHelper.printSummary();
    }
    /**
     * List all available problems
     */
    listProblems() {
        console.log('📋 Available LeetCode Problems:\n');
        const groupedByCategory = this.problems.reduce((acc, problem) => {
            if (!acc[problem.category]) {
                acc[problem.category] = [];
            }
            acc[problem.category].push(problem);
            return acc;
        }, {});
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
    printStatistics() {
        const categories = [...new Set(this.problems.map(p => p.category))];
        const difficulties = this.problems.reduce((acc, p) => {
            acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
            return acc;
        }, {});
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
    showHelp() {
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
exports.LeetCodeRunner = LeetCodeRunner;
/**
 * Main execution function
 */
function main() {
    const runner = new LeetCodeRunner();
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length === 0) {
        // Run all problems by default
        runner.runAll();
    }
    else {
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
                }
                else {
                    console.log('❌ Please specify a category (e.g., Arrays, Trees)');
                }
                break;
            case 'difficulty':
                if (args[1] && ['Easy', 'Medium', 'Hard'].includes(args[1])) {
                    runner.runByDifficulty(args[1]);
                }
                else {
                    console.log('❌ Please specify a valid difficulty (Easy, Medium, Hard)');
                }
                break;
            default:
                console.log(`❌ Unknown command: ${command}`);
                runner.showHelp();
        }
    }
}
// Run if this is the main module
if (require.main === module) {
    main();
}
//# sourceMappingURL=index.js.map