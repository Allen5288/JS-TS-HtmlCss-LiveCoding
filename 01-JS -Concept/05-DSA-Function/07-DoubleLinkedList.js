// double liindked list
// A doubly linked list is a data structure that consists of nodes, where each node contains a value and two pointers: one pointing to the next node and another pointing to the previous node. This allows for traversal in both directions (forward and backward).

class Node {
  constructor(data) {
    this.data = data; // Data of the node
    this.prev = null; // Pointer to the previous node
    this.next = null; // Pointer to the next node
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = null; // Head of the list
    this.tail = null; // Tail of the list
  }

  addFirst(data) {
    const newNode = new Node(data);
    if (!this.head) {
      // If the list is empty, set head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, insert the new node at the beginning and update pointers
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  addLast(data) {
    const newNode = new Node(data);
    if (!this.tail) {
      // If the list is empty, set head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, insert the new node at the end and update pointers
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next; // Move to the next node
    }
    return count; // Return the size of the list
  }

  addAt(index, data) {
    if (index < 0 || index > this.size()) return; // Invalid index
    const newNode = new Node(data);
    if (index === 0) {
      this.addFirst(data); // Add at the beginning
      return;
    }
    let current = this.head;
    for (let i = 0; i < index - 1 && current; i++) {
      current = current.next; // Traverse to the node before the desired index
    }
    if (!current) return; // Index out of bounds
    newNode.next = current.next;
    newNode.prev = current;
    if (current.next) {
      current.next.prev = newNode; // Update the next node's previous pointer
    } else {
      this.tail = newNode; // Update tail if adding at the end
    }
    current.next = newNode; // Update the current node's next pointer
  }

  removeFirst() {
    if (!this.head) return; // List is empty
    if (this.head === this.tail) {
      this.head = null; // If only one node, set head to null
      this.tail = null;
    } else {
      this.head = this.head.next; // Move head to the next node
      this.head.prev = null; // Update the new head's previous pointer
    }
  }

  removeLast() {
    if (!this.tail) return; // List is empty
    if (this.head === this.tail) {
      this.head = null; // If only one node, set head to null
      this.tail = null;
    } else {
      this.tail = this.tail.prev; // Move tail to the previous node
      this.tail.next = null; // Update the new tail's next pointer
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) return; // Invalid index
    if (index === 0) {
      this.removeFirst(); // Remove the first node
      return;
    }
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next; // Traverse to the desired index
    }
    if (!current) return; // Index out of bounds
    if (current.prev) {
      current.prev.next = current.next; // Update previous node's next pointer
    }
    if (current.next) {
      current.next.prev = current.prev; // Update next node's previous pointer
    } else {
      this.tail = current.prev; // Update tail if removing the last node
    }
  }

  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.data); // Collect data from each node
      current = current.next; // Move to the next node
    }
    console.log(result.join(" <-> ")); // Print the list in a readable format
  }
}

// test the doubly linked list
const dll = new DoublyLinkedList();
dll.addFirst(1);
dll.addFirst(2);
dll.addFirst(3);
dll.addLast(4);
dll.addLast(5);
dll.addAt(2, 6); // Add 6 at index 2
dll.removeFirst(); // Remove the first node
dll.removeLast(); // Remove the last node
dll.removeAt(1); // Remove the node at index 1
dll.printList(); // Print the list
// Output: 3 <-> 6
// The list should now contain: 3 <-> 6
