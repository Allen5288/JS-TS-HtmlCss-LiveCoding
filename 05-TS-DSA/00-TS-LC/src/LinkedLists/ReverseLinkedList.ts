import { TestHelper } from '../TestHelper';
import { ListNode, DataStructureHelper } from '../DataStructures';

/**
 * LeetCode 206. Reverse Linked List
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Example 2:
 * Input: head = [1,2]
 * Output: [2,1]
 * 
 * Example 3:
 * Input: head = []
 * Output: []
 * 
 * Constraints:
 * - The number of nodes in the list is the range [0, 5000].
 * - -5000 <= Node.val <= 5000
 * 
 * Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
 */

export class ReverseLinkedList {
  /**
   * Approach 1: Iterative (Two Pointers)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseListIterative(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current = head;
    
    while (current !== null) {
      const nextTemp = current.next;
      current.next = prev;
      prev = current;
      current = nextTemp;
    }
    
    return prev;
  }

  /**
   * Approach 2: Recursive
   * Time Complexity: O(n)
   * Space Complexity: O(n) - recursion stack
   */
  reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case
    if (head === null || head.next === null) {
      return head;
    }
    
    // Recursively reverse the rest of the list
    const newHead = this.reverseListRecursive(head.next);
    
    // Reverse the current connection
    head.next.next = head;
    head.next = null;
    
    return newHead;
  }

  /**
   * Approach 3: Stack-based
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  reverseListStack(head: ListNode | null): ListNode | null {
    if (!head) return null;
    
    const stack: ListNode[] = [];
    let current = head;
    
    // Push all nodes onto stack
    while (current) {
      stack.push(current);
      current = current.next;
    }
    
    // Pop nodes from stack to reverse
    const newHead = stack.pop()!;
    current = newHead;
    
    while (stack.length > 0) {
      current.next = stack.pop()!;
      current = current.next;
    }
    
    current.next = null;
    return newHead;
  }

  /**
   * Approach 4: Two-pass with Array
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  reverseListArray(head: ListNode | null): ListNode | null {
    if (!head) return null;
    
    const values: number[] = [];
    let current = head;
    
    // First pass: collect values
    while (current) {
      values.push(current.val);
      current = current.next;
    }
    
    // Reverse the values array
    values.reverse();
    
    // Second pass: create new list
    return DataStructureHelper.createLinkedList(values);
  }

  /**
   * Helper method to create a deep copy of linked list
   */
  private copyLinkedList(head: ListNode | null): ListNode | null {
    if (!head) return null;
    
    const values = DataStructureHelper.linkedListToArray(head);
    return DataStructureHelper.createLinkedList(values);
  }

  /**
   * Run all test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 206. Reverse Linked List');
    
    const solution = new ReverseLinkedList();
    
    // Test cases
    const testCases = [
      {
        name: 'Example 1: [1,2,3,4,5]',
        input: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1]
      },
      {
        name: 'Example 2: [1,2]',
        input: [1, 2],
        expected: [2, 1]
      },
      {
        name: 'Example 3: []',
        input: [],
        expected: []
      },
      {
        name: 'Single node: [42]',
        input: [42],
        expected: [42]
      },
      {
        name: 'Three nodes: [1,2,3]',
        input: [1, 2, 3],
        expected: [3, 2, 1]
      },
      {
        name: 'Negative numbers: [-1,-2,-3]',
        input: [-1, -2, -3],
        expected: [-3, -2, -1]
      },
      {
        name: 'Large list: [1,2,3,4,5,6,7,8,9,10]',
        input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        expected: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      }
    ];

    // Test all approaches
    const approaches = [
      { name: 'Iterative', method: solution.reverseListIterative.bind(solution) },
      { name: 'Recursive', method: solution.reverseListRecursive.bind(solution) },
      { name: 'Stack-based', method: solution.reverseListStack.bind(solution) },
      { name: 'Array-based', method: solution.reverseListArray.bind(solution) }
    ];

    for (const approach of approaches) {
      console.log(`\n🔍 Testing ${approach.name}:`);
      
      for (const testCase of testCases) {
        const inputList = DataStructureHelper.createLinkedList(testCase.input);
        const result = approach.method(inputList);
        const resultArray = DataStructureHelper.linkedListToArray(result);
        TestHelper.runTest(testCase.name, testCase.expected, resultArray);
      }
    }    // Performance comparison
    console.log('\n⚡ Performance Comparison:');
    const largeList = Array.from({ length: 10000 }, (_, i) => i + 1);
    
    // Test non-recursive approaches with large input
    const safeApproaches = [
      { name: 'Iterative', method: solution.reverseListIterative.bind(solution) },
      { name: 'Stack-based', method: solution.reverseListStack.bind(solution) },
      { name: 'Array-based', method: solution.reverseListArray.bind(solution) }
    ];
    
    for (const approach of safeApproaches) {
      const testList = DataStructureHelper.createLinkedList(largeList);
      TestHelper.measureTime(
        () => approach.method(testList),
        `${approach.name} (10k nodes)`
      );
    }
    
    // Test recursive with smaller input to avoid stack overflow
    console.log('⚠️  Recursive approach tested with smaller input to avoid stack overflow:');
    const smallList = Array.from({ length: 1000 }, (_, i) => i + 1);
    const smallTestList = DataStructureHelper.createLinkedList(smallList);
    TestHelper.measureTime(
      () => solution.reverseListRecursive(smallTestList),
      'Recursive (1k nodes)'
    );

    // Memory usage and complexity analysis
    console.log('\n💾 Space Complexity Analysis:');
    console.log('• Iterative: O(1) extra space - optimal');
    console.log('• Recursive: O(n) space due to call stack');
    console.log('• Stack-based: O(n) space for explicit stack');
    console.log('• Array-based: O(n) space for values array');

    console.log('\n🔄 Algorithm Characteristics:');
    console.log('• Iterative: In-place reversal, most efficient');
    console.log('• Recursive: Elegant but uses system stack');
    console.log('• Stack-based: Explicit stack, educational value');
    console.log('• Array-based: Creates new list, preserves original');

    console.log('\n🎯 Best Choice: Iterative approach for production code');
    console.log('  - Constant space complexity');
    console.log('  - No risk of stack overflow');
    console.log('  - Simple and readable');
    
    console.log('\n');
  }
}
