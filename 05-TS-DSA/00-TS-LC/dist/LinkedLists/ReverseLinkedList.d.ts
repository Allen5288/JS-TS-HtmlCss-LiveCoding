import { ListNode } from '../DataStructures';
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
export declare class ReverseLinkedList {
    /**
     * Approach 1: Iterative (Two Pointers)
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    reverseListIterative(head: ListNode | null): ListNode | null;
    /**
     * Approach 2: Recursive
     * Time Complexity: O(n)
     * Space Complexity: O(n) - recursion stack
     */
    reverseListRecursive(head: ListNode | null): ListNode | null;
    /**
     * Approach 3: Stack-based
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    reverseListStack(head: ListNode | null): ListNode | null;
    /**
     * Approach 4: Two-pass with Array
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    reverseListArray(head: ListNode | null): ListNode | null;
    /**
     * Helper method to create a deep copy of linked list
     */
    private copyLinkedList;
    /**
     * Run all test cases
     */
    static runTests(): void;
}
//# sourceMappingURL=ReverseLinkedList.d.ts.map