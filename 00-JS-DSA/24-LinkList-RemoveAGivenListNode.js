// RemoveAGivenListNode

function removeNode(node) {
  if (!node || !node.next) {
    return; // Cannot remove the node if it's null or the last node
  }

  // Copy the data from the next node to the current node
  node.data = node.next.data;
  node.next = node.next.next; // Remove the next node
}
