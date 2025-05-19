// Search in rotated linked list.
// you should avoid cyclying in this rotated linked list
function searchInRotatedLinkedList(head, target) {
  let current = head;
  const visited = new Set();

  while (current) {
    if (current.value === target) {
      return current;
    }
    if (visited.has(current)) {
      break;
    }
    visited.add(current);
    current = current.next;
  }
  return null;
}
