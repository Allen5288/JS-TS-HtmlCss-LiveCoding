// reverse linked list

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let next = null;

  while (current) {
    next = current.next; // Store the next node
    current.next = prev; // Reverse the link
    prev = current; // Move prev to current
    current = next; // Move to the next node
  }

  return prev; // New head of the reversed list
}

function reverseLinkedListRecursive(head) {
  if (!head || !head.next) {
    return head; // Base case: empty list or single node
  }

  const newHead = reverseLinkedListRecursive(head.next); // Reverse the rest of the list
  head.next.next = head; // Reverse the link
  head.next = null; // Set the next of the current node to null

  return newHead; // New head of the reversed list
}
// time complexity: O(n)
// space complexity: O(n) for recursive approach, O(1) for iterative approach