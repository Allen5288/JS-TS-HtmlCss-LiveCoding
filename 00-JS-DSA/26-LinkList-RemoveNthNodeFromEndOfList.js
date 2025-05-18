// RemoveNthNodeFromEndOfList

function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0, head);
  let first = dummy;
  let second = dummy;

  // Move first n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }

  // Move both pointers until first reaches the end
  while (first) {
    first = first.next;
    second = second.next;
  }

  // Remove the nth node from the end
  second.next = second.next.next;

  return dummy.next;
}