import { TestHelper } from '../TestHelper';
import { TreeNode, DataStructureHelper } from '../DataStructures';

/**
 * LeetCode 104. Maximum Depth of Binary Tree
 * 
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 * 
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 * 
 * Example 2:
 * Input: root = [1,null,2]
 * Output: 2
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 10^4].
 * - -100 <= Node.val <= 100
 */

export class MaximumDepthOfBinaryTree {
  /**
   * Approach 1: Recursive DFS
   * Time Complexity: O(n) where n is the number of nodes
   * Space Complexity: O(h) where h is the height of the tree (O(n) worst case, O(log n) best case)
   */
  maxDepthRecursive(root: TreeNode | null): number {
    if (!root) return 0;
    
    const leftDepth = this.maxDepthRecursive(root.left);
    const rightDepth = this.maxDepthRecursive(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /**
   * Approach 2: Iterative BFS (Level Order Traversal)
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is the maximum width of the tree
   */
  maxDepthIterativeBFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    const queue: TreeNode[] = [root];
    let depth = 0;
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      depth++;
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    
    return depth;
  }

  /**
   * Approach 3: Iterative DFS with Stack
   * Time Complexity: O(n)
   * Space Complexity: O(h)
   */
  maxDepthIterativeDFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    const stack: { node: TreeNode; depth: number }[] = [{ node: root, depth: 1 }];
    let maxDepth = 0;
    
    while (stack.length > 0) {
      const { node, depth } = stack.pop()!;
      maxDepth = Math.max(maxDepth, depth);
      
      if (node.left) {
        stack.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        stack.push({ node: node.right, depth: depth + 1 });
      }
    }
    
    return maxDepth;
  }

  /**
   * Approach 4: Morris Traversal (Advanced)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  maxDepthMorris(root: TreeNode | null): number {
    if (!root) return 0;
    
    let maxDepth = 0;
    let currentDepth = 0;
    let current = root;
    
    while (current) {
      if (!current.left) {
        // Visit current node
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        let steps = 1;
        
        while (predecessor.right && predecessor.right !== current) {
          predecessor = predecessor.right;
          steps++;
        }
        
        if (!predecessor.right) {
          // Create thread
          predecessor.right = current;
          currentDepth++;
          current = current.left;
        } else {
          // Remove thread and backtrack
          predecessor.right = null;
          currentDepth -= steps;
          current = current.right;
        }
      }
    }
    
    return maxDepth;
  }

  /**
   * Run all test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 104. Maximum Depth of Binary Tree');
    
    const solution = new MaximumDepthOfBinaryTree();
    
    // Test cases
    const testCases = [
      {
        name: 'Example 1: [3,9,20,null,null,15,7]',
        tree: [3, 9, 20, null, null, 15, 7],
        expected: 3
      },
      {
        name: 'Example 2: [1,null,2]',
        tree: [1, null, 2],
        expected: 2
      },
      {
        name: 'Empty tree: []',
        tree: [],
        expected: 0
      },
      {
        name: 'Single node: [0]',
        tree: [0],
        expected: 1
      },
      {
        name: 'Left skewed: [1,2,null,3,null,4]',
        tree: [1, 2, null, 3, null, 4],
        expected: 4
      },
      {
        name: 'Right skewed: [1,null,2,null,3,null,4]',
        tree: [1, null, 2, null, 3, null, 4],
        expected: 4
      },
      {
        name: 'Balanced tree: [1,2,3,4,5,6,7]',
        tree: [1, 2, 3, 4, 5, 6, 7],
        expected: 3
      }
    ];

    // Test all approaches
    const approaches = [
      { name: 'Recursive DFS', method: solution.maxDepthRecursive.bind(solution) },
      { name: 'Iterative BFS', method: solution.maxDepthIterativeBFS.bind(solution) },
      { name: 'Iterative DFS', method: solution.maxDepthIterativeDFS.bind(solution) },
      { name: 'Morris Traversal', method: solution.maxDepthMorris.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const root = DataStructureHelper.createBinaryTree(testCase.tree);
        const result = approach.method(root);
        TestHelper.runTest(testCase.name, testCase.expected, result);
      }
    }

    // Performance comparison with a larger tree
    console.log('\n⚡ Performance Comparison:');
    const largeTreeArray = Array.from({ length: 1023 }, (_, i) => i + 1); // Complete binary tree with 1023 nodes
    const largeTreeRoot = DataStructureHelper.createBinaryTree(largeTreeArray);

    for (const approach of approaches) {
      TestHelper.measureTime(
        () => approach.method(largeTreeRoot),
        `${approach.name} (1023 nodes)`
      );
    }

    console.log('\n📝 Algorithm Comparison:');
    console.log('• Recursive DFS: Most intuitive, uses call stack');
    console.log('• Iterative BFS: Good for level-by-level processing');
    console.log('• Iterative DFS: Explicit stack, avoids recursion overhead');
    console.log('• Morris Traversal: Constant space, but modifies tree temporarily');
    
    console.log('\n');
  }
}
