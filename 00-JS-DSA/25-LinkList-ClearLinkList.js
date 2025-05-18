// ClearLinkList

function clearLinkList(linkList) {
  if (linkList.head === null) {
    return;
  }

  let currentNode = linkList.head;
  let nextNode;

  while (currentNode !== null) {
    nextNode = currentNode.next;
    currentNode.next = null; // Clear the reference to the next node
    currentNode = nextNode;
  }

  linkList.head = null; // Set the head to null
}