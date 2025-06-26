"use strict";
/**
 * Common data structures for LeetCode problems
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStructureHelper = exports.UnionFind = exports.TrieNode = exports.GraphNode = exports.DoublyListNode = exports.ListNode = exports.TreeNode = void 0;
/**
 * Binary Tree Node
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}
exports.TreeNode = TreeNode;
/**
 * Singly Linked List Node
 */
class ListNode {
    constructor(val, next) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}
exports.ListNode = ListNode;
/**
 * Doubly Linked List Node
 */
class DoublyListNode {
    constructor(val, prev, next) {
        this.val = val ?? 0;
        this.prev = prev ?? null;
        this.next = next ?? null;
    }
}
exports.DoublyListNode = DoublyListNode;
/**
 * Graph Node
 */
class GraphNode {
    constructor(val, neighbors) {
        this.val = val ?? 0;
        this.neighbors = neighbors ?? [];
    }
}
exports.GraphNode = GraphNode;
/**
 * Trie Node
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}
exports.TrieNode = TrieNode;
/**
 * Union-Find (Disjoint Set Union) data structure
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY)
            return false;
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        }
        else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        }
        else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}
exports.UnionFind = UnionFind;
/**
 * Helper functions for creating and manipulating data structures
 */
class DataStructureHelper {
    /**
     * Create a binary tree from an array (level-order)
     */
    static createBinaryTree(values) {
        if (values.length === 0 || values[0] === null)
            return null;
        const root = new TreeNode(values[0]);
        const queue = [root];
        let i = 1;
        while (queue.length > 0 && i < values.length) {
            const node = queue.shift();
            if (i < values.length && values[i] !== null) {
                node.left = new TreeNode(values[i]);
                queue.push(node.left);
            }
            i++;
            if (i < values.length && values[i] !== null) {
                node.right = new TreeNode(values[i]);
                queue.push(node.right);
            }
            i++;
        }
        return root;
    }
    /**
     * Convert binary tree to array (level-order)
     */
    static treeToArray(root) {
        if (!root)
            return [];
        const result = [];
        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
                result.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            }
            else {
                result.push(null);
            }
        }
        // Remove trailing nulls
        while (result.length > 0 && result[result.length - 1] === null) {
            result.pop();
        }
        return result;
    }
    /**
     * Create a linked list from an array
     */
    static createLinkedList(values) {
        if (values.length === 0)
            return null;
        const head = new ListNode(values[0]);
        let current = head;
        for (let i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
        }
        return head;
    }
    /**
     * Convert linked list to array
     */
    static linkedListToArray(head) {
        const result = [];
        let current = head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
}
exports.DataStructureHelper = DataStructureHelper;
//# sourceMappingURL=DataStructures.js.map