// ImplementQueueWithStack
// Implement a queue using two stacks. The queue should support the following operations:

var MyQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
    }
    MyQueue.prototype.push = function (x) {
        this.stack1.push(x);
    };
    MyQueue.prototype.pop = function () {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    };
    MyQueue.prototype.peek = function () {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    };
    MyQueue.prototype.empty = function () {
        return this.stack1.length === 0 && this.stack2.length === 0;
    };
    MyQueue.prototype.size = function () {
        return this.stack1.length + this.stack2.length;
    };
    MyQueue.prototype.display = function () {
        console.log("Stack 1:", this.stack1);
        console.log("Stack 2:", this.stack2);
    };

    // Example usage
    const queue = new MyQueue();
    queue.push(1);
    queue.push(2);
    queue.push(3);
    console.log(queue.peek()); // Output: 1
    console.log(queue.pop()); // Output: 1
    console.log(queue.empty()); // Output: false