/**
 * Common data structures for LeetCode problems
 */

/**
 * Binary Tree Node
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/**
 * Singly Linked List Node
 */
export class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

/**
 * Doubly Linked List Node
 */
export class DoublyListNode {
  val: number;
  prev: DoublyListNode | null;
  next: DoublyListNode | null;
  
  constructor(val?: number, prev?: DoublyListNode | null, next?: DoublyListNode | null) {
    this.val = val ?? 0;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

/**
 * Graph Node
 */
export class GraphNode {
  val: number;
  neighbors: GraphNode[];
  
  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val ?? 0;
    this.neighbors = neighbors ?? [];
  }
}

/**
 * Trie Node
 */
export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

/**
 * Union-Find (Disjoint Set Union) data structure
 */
export class UnionFind {
  private parent: number[];
  private rank: number[];
  
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false;
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    
    return true;
  }
  
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

/**
 * Helper functions for creating and manipulating data structures
 */
export class DataStructureHelper {
  /**
   * Create a binary tree from an array (level-order)
   */
  static createBinaryTree(values: (number | null)[]): TreeNode | null {
    if (values.length === 0 || values[0] === null) return null;
    
    const root = new TreeNode(values[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (queue.length > 0 && i < values.length) {
      const node = queue.shift()!;
      
      if (i < values.length && values[i] !== null) {
        node.left = new TreeNode(values[i]!);
        queue.push(node.left);
      }
      i++;
      
      if (i < values.length && values[i] !== null) {
        node.right = new TreeNode(values[i]!);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }
  
  /**
   * Convert binary tree to array (level-order)
   */
  static treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) return [];
    
    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
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
  static createLinkedList(values: number[]): ListNode | null {
    if (values.length === 0) return null;
    
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
  static linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;
    
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    
    return result;
  }
}
