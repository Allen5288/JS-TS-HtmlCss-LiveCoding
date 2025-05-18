// Linked List
// A linked list is a linear data structure where each element is a separate object.
// Each element (node) of a list consists of two parts: data and a reference (link) to the next node in the sequence.
// The last node has a reference to null.
// Linked lists are dynamic in size and can grow or shrink as needed.
// They are used to implement data structures like stacks, queues, and graphs.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Pointer to the next node
  }
}

class LinkedList {
  constructor() {
    this.head = null; // Pointer to the first node
    this.size = 0; // Number of nodes in the list
  }

  addFirst(data) {
    const newNode = new Node(data);
    newNode.next = this.head; // Point the new node to the current head
    this.head = newNode; // Update the head to the new node
    this.size++;
  }

  addLast(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode; // If the list is empty, set the head to the new node
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next; // Traverse to the last node
      }
      current.next = newNode; // Link the last node to the new node
    }
    this.size++;
  }

  addAt(index, data) {
    if (index < 0 || index > this.size) {
      console.log("Index out of bounds");
      return;
    }
    if (index === 0) {
      this.addFirst(data);
    } else {
      const newNode = new Node(data);
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next; // Traverse to the node before the specified index
      }
      newNode.next = current.next; // Link the new node to the next node
      current.next = newNode; // Link the previous node to the new node
      this.size++;
    }
  }

  removeFirst() {
    if (this.head === null) {
      console.log("List is empty");
      return;
    }
    this.head = this.head.next; // Update the head to the next node
    this.size--;
  }

  removeLast() {
    if (this.head === null) {
      console.log("List is empty");
      return;
    }
    if (this.head.next === null) {
      this.head = null; // If there's only one node, set head to null
    } else {
      let current = this.head;
      while (current.next !== null && current.next.next !== null) {
        current = current.next; // Traverse to the second-to-last node
      }
      current.next = null; // Remove the last node
    }
    this.size--;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) {
      console.log("Index out of bounds");
      return;
    }
    if (index === 0) {
      this.removeFirst();
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next; // Traverse to the node before the specified index
      }
      current.next = current.next.next; // Bypass the node to be removed
      this.size--;
    }
  }

  printList() {
    let current = this.head;
    let result = "";
    while (current !== null) {
      result += current.data + " -> ";
      current = current.next; // Move to the next node
    }
    result += "null"; // End of the list
    console.log(result);
  }
}

// Example usage
const list = new LinkedList();
list.addFirst(10);
list.addLast(20);
list.printList(); // Output: 10 -> 20 -> null
list.addAt(1, 15);
list.printList(); // Output: 10 -> 15 -> 20 -> null
list.removeFirst();
list.printList(); // Output: 15 -> 20 -> null
list.removeLast();
list.printList(); // Output: 15 -> null
list.removeAt(0);
list.printList(); // Output: null
list.addFirst(30);
list.addLast(40);
list.printList(); // Output: 30 -> 40 -> null