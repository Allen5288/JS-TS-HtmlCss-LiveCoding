/**
 * Common data structures for LeetCode problems
 */
/**
 * Binary Tree Node
 */
export declare class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null);
}
/**
 * Singly Linked List Node
 */
export declare class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null);
}
/**
 * Doubly Linked List Node
 */
export declare class DoublyListNode {
    val: number;
    prev: DoublyListNode | null;
    next: DoublyListNode | null;
    constructor(val?: number, prev?: DoublyListNode | null, next?: DoublyListNode | null);
}
/**
 * Graph Node
 */
export declare class GraphNode {
    val: number;
    neighbors: GraphNode[];
    constructor(val?: number, neighbors?: GraphNode[]);
}
/**
 * Trie Node
 */
export declare class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    constructor();
}
/**
 * Union-Find (Disjoint Set Union) data structure
 */
export declare class UnionFind {
    private parent;
    private rank;
    constructor(n: number);
    find(x: number): number;
    union(x: number, y: number): boolean;
    connected(x: number, y: number): boolean;
}
/**
 * Helper functions for creating and manipulating data structures
 */
export declare class DataStructureHelper {
    /**
     * Create a binary tree from an array (level-order)
     */
    static createBinaryTree(values: (number | null)[]): TreeNode | null;
    /**
     * Convert binary tree to array (level-order)
     */
    static treeToArray(root: TreeNode | null): (number | null)[];
    /**
     * Create a linked list from an array
     */
    static createLinkedList(values: number[]): ListNode | null;
    /**
     * Convert linked list to array
     */
    static linkedListToArray(head: ListNode | null): number[];
}
//# sourceMappingURL=DataStructures.d.ts.map