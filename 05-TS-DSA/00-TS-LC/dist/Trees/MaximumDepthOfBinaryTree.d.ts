import { TreeNode } from '../DataStructures';
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
export declare class MaximumDepthOfBinaryTree {
    /**
     * Approach 1: Recursive DFS
     * Time Complexity: O(n) where n is the number of nodes
     * Space Complexity: O(h) where h is the height of the tree (O(n) worst case, O(log n) best case)
     */
    maxDepthRecursive(root: TreeNode | null): number;
    /**
     * Approach 2: Iterative BFS (Level Order Traversal)
     * Time Complexity: O(n)
     * Space Complexity: O(w) where w is the maximum width of the tree
     */
    maxDepthIterativeBFS(root: TreeNode | null): number;
    /**
     * Approach 3: Iterative DFS with Stack
     * Time Complexity: O(n)
     * Space Complexity: O(h)
     */
    maxDepthIterativeDFS(root: TreeNode | null): number;
    /**
     * Approach 4: Morris Traversal (Advanced)
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    maxDepthMorris(root: TreeNode | null): number;
    /**
     * Run all test cases
     */
    static runTests(): void;
}
//# sourceMappingURL=MaximumDepthOfBinaryTree.d.ts.map