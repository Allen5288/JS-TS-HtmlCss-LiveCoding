// 15-Queue-ImplementStackWithQueue

var MyStack = function() {
  this.q1 = [];
    this.q2 = [];
}
MyStack.prototype.push = function(x) {
  this.q1.push(x);
}
MyStack.prototype.pop = function() {
  while (this.q1.length > 1) {
    this.q2.push(this.q1.shift());
  }
  const poppedElement = this.q1.shift();
  [this.q1, this.q2] = [this.q2, this.q1];
  return poppedElement;
}
MyStack.prototype.top = function() {
  return this.q1[this.q1.length - 1];
}
MyStack.prototype.empty = function() {
  return this.q1.length === 0;
}

// Example usage
const stack = new MyStack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.top()); // Output: 3
console.log(stack.pop()); // Output: 3
console.log(stack.empty()); // Output: false