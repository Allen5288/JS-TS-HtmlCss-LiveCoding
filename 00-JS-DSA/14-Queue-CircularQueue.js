// Simple Queue Implementation using array
var CircularQueue = function (size) {
  this.size = size;
  this.queue = [];
};

CircularQueue.prototype.enqueue = function (value) {
  if (this.isFull()) {
    console.log("Queue is full");
    return false;
  }
  
  this.queue.push(value);
  return true;
};

CircularQueue.prototype.dequeue = function () {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  
  return this.queue.shift();
};

CircularQueue.prototype.peek = function () {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  return this.queue[0];
};

CircularQueue.prototype.isEmpty = function () {
  return this.queue.length === 0;
};

CircularQueue.prototype.isFull = function () {
  return this.queue.length === this.size;
};

CircularQueue.prototype.display = function () {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  
  for (let i = 0; i < this.queue.length; i++) {
    console.log(this.queue[i]);
  }
};

// Example usage
const queue = new CircularQueue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.enqueue(6); // Queue is full
console.log(queue.dequeue()); // Output: 1
console.log(queue.peek()); // Output: 2
console.log(queue.isEmpty()); // Output: false
console.log(queue.isFull()); // Output: false
queue.display(); // Output: 2 3 4 5
queue.enqueue(6);
queue.display(); // Output: 2 3 4 5 6
queue.dequeue();
queue.dequeue();
queue.enqueue(7);
queue.enqueue(8);

// Second implementation: True Circular Queue with front and rear pointers
console.log("\n--- True Circular Queue Implementation ---\n");

var TrueCircularQueue = function(size) {
  this.size = size;
  this.queue = new Array(size);
  this.front = -1;
  this.rear = -1;
  this.count = 0;
};

TrueCircularQueue.prototype.enqueue = function(value) {
  if (this.isFull()) {
    console.log("Queue is full");
    return false;
  }
  
  if (this.isEmpty()) {
    this.front = 0;
  }
  
  this.rear = (this.rear + 1) % this.size;
  this.queue[this.rear] = value;
  this.count++;
  return true;
};

TrueCircularQueue.prototype.dequeue = function() {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  
  const value = this.queue[this.front];
  
  if (this.front === this.rear) {
    // Last element in the queue
    this.front = -1;
    this.rear = -1;
  } else {
    this.front = (this.front + 1) % this.size;
  }
  
  this.count--;
  return value;
};

TrueCircularQueue.prototype.peek = function() {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  
  return this.queue[this.front];
};

TrueCircularQueue.prototype.isEmpty = function() {
  return this.front === -1;
};

TrueCircularQueue.prototype.isFull = function() {
  return ((this.rear + 1) % this.size === this.front) || (this.count === this.size);
};

TrueCircularQueue.prototype.display = function() {
  if (this.isEmpty()) {
    console.log("Queue is empty");
    return;
  }
  
  console.log("Queue elements:");
  let i = this.front;
  let itemsShown = 0;
  
  while(itemsShown < this.count) {
    console.log(this.queue[i]);
    i = (i + 1) % this.size;
    itemsShown++;
  }
};

// Example usage of the true circular queue
const circularQueue = new TrueCircularQueue(5);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
circularQueue.enqueue(4);
circularQueue.enqueue(5);
circularQueue.enqueue(6); // Queue is full
console.log(circularQueue.dequeue()); // Output: 1
console.log(circularQueue.peek()); // Output: 2
console.log(circularQueue.isEmpty()); // Output: false
console.log(circularQueue.isFull()); // Output: false
circularQueue.display(); // Output: 2 3 4 5
circularQueue.enqueue(6);
circularQueue.display(); // Output: 2 3 4 5 6
circularQueue.dequeue();
circularQueue.dequeue();
circularQueue.enqueue(7);
circularQueue.enqueue(8);
circularQueue.display(); // Output: 4 5 6 7 8
