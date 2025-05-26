/**
 * Queue Data Structure Implementation
 * Focus: FIFO principle, when to use queues, and common queue applications
 */

// ==========================================
// Array-based Queue Implementation (Naive)
// ==========================================

class NaiveArrayQueue {
    constructor() {
        this.items = [];
    }

    // O(1) - Add element to rear
    enqueue(element) {
        this.items.push(element);
        return this.size();
    }

    // O(n) - Remove element from front (requires shifting all elements)
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items.shift();  // O(n) operation!
    }

    // O(1) - View front element without removing
    front() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[0];
    }

    // O(1) - View rear element
    rear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.items.length - 1];
    }

    // O(1) - Check if queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // O(1) - Get number of elements
    size() {
        return this.items.length;
    }

    // O(n) - String representation
    toString() {
        return 'FRONT -> ' + this.items.join(' -> ') + ' <- REAR';
    }
}

// ==========================================
// Optimized Array-based Queue (Circular)
// ==========================================

class CircularArrayQueue {
    constructor(capacity = 10) {
        this.items = new Array(capacity);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
        this.capacity = capacity;
    }

    // O(1) - Add element to rear
    enqueue(element) {
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        
        this.items[this.rear] = element;
        this.rear = (this.rear + 1) % this.capacity;
        this.count++;
        
        return this.count;
    }

    // O(1) - Remove element from front
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const element = this.items[this.front];
        this.items[this.front] = undefined;  // Clear reference
        this.front = (this.front + 1) % this.capacity;
        this.count--;
        
        return element;
    }

    // O(1) - View front element
    getFront() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.front];
    }

    // O(1) - View rear element
    getRear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const rearIndex = (this.rear - 1 + this.capacity) % this.capacity;
        return this.items[rearIndex];
    }

    // O(1) - Check if queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // O(1) - Check if queue is full
    isFull() {
        return this.count === this.capacity;
    }

    // O(1) - Get number of elements
    size() {
        return this.count;
    }

    // O(n) - Convert to array for visualization
    toArray() {
        const result = [];
        let index = this.front;
        
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[index]);
            index = (index + 1) % this.capacity;
        }
        
        return result;
    }

    toString() {
        return 'FRONT -> ' + this.toArray().join(' -> ') + ' <- REAR';
    }
}

// ==========================================
// Dynamic Array Queue (Auto-resizing)
// ==========================================

class DynamicArrayQueue {
    constructor(initialCapacity = 4) {
        this.items = new Array(initialCapacity);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
        this.capacity = initialCapacity;
    }

    enqueue(element) {
        if (this.count === this.capacity) {
            this._resize();
        }
        
        this.items[this.rear] = element;
        this.rear = (this.rear + 1) % this.capacity;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const element = this.items[this.front];
        this.items[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.count--;
        
        // Shrink if needed
        if (this.count <= this.capacity / 4 && this.capacity > 4) {
            this._shrink();
        }
        
        return element;
    }

    _resize() {
        const oldItems = this.items;
        const oldCapacity = this.capacity;
        
        this.capacity *= 2;
        this.items = new Array(this.capacity);
        
        // Copy elements in correct order
        for (let i = 0; i < this.count; i++) {
            this.items[i] = oldItems[(this.front + i) % oldCapacity];
        }
        
        this.front = 0;
        this.rear = this.count;
    }

    _shrink() {
        const oldItems = this.items;
        const oldCapacity = this.capacity;
        
        this.capacity = Math.floor(this.capacity / 2);
        this.items = new Array(this.capacity);
        
        // Copy elements in correct order
        for (let i = 0; i < this.count; i++) {
            this.items[i] = oldItems[(this.front + i) % oldCapacity];
        }
        
        this.front = 0;
        this.rear = this.count;
    }

    getFront() {
        if (this.isEmpty()) throw new Error('Queue is empty');
        return this.items[this.front];
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    getCapacity() {
        return this.capacity;
    }

    toArray() {
        const result = [];
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[(this.front + i) % this.capacity]);
        }
        return result;
    }
}

// ==========================================
// Linked List-based Queue Implementation
// ==========================================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    // O(1) - Add element to rear
    enqueue(element) {
        const newNode = new ListNode(element);
        
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        
        this.count++;
        return this.count;
    }

    // O(1) - Remove element from front
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const element = this.front.val;
        this.front = this.front.next;
        
        if (!this.front) {
            this.rear = null;  // Queue is now empty
        }
        
        this.count--;
        return element;
    }

    // O(1) - View front element
    getFront() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.front.val;
    }

    // O(1) - View rear element
    getRear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.rear.val;
    }

    // O(1) - Check if queue is empty
    isEmpty() {
        return this.front === null;
    }

    // O(1) - Get number of elements
    size() {
        return this.count;
    }

    // O(n) - Convert to array for visualization
    toArray() {
        const result = [];
        let current = this.front;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }

    toString() {
        return 'FRONT -> ' + this.toArray().join(' -> ') + ' <- REAR';
    }
}

// ==========================================
// Queue Applications
// ==========================================

function queueApplications() {
    
    // 1. Breadth-First Search (BFS) Tree Traversal
    class TreeNode {
        constructor(val, left = null, right = null) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    function bfsTraversal(root) {
        if (!root) return [];
        
        const result = [];
        const queue = new LinkedListQueue();
        queue.enqueue(root);
        
        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            result.push(node.val);
            
            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }
        
        return result;
    }

    // 2. Level-order traversal with level information
    function levelOrderTraversal(root) {
        if (!root) return [];
        
        const result = [];
        const queue = new LinkedListQueue();
        queue.enqueue(root);
        
        while (!queue.isEmpty()) {
            const levelSize = queue.size();
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.dequeue();
                currentLevel.push(node.val);
                
                if (node.left) queue.enqueue(node.left);
                if (node.right) queue.enqueue(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }

    // 3. Task Scheduler Simulation
    class TaskScheduler {
        constructor() {
            this.taskQueue = new LinkedListQueue();
            this.currentTime = 0;
        }

        addTask(task, priority = 0) {
            const taskObj = {
                id: Math.random().toString(36).substr(2, 9),
                task,
                priority,
                addedAt: this.currentTime,
                estimatedTime: task.estimatedTime || 1
            };
            
            this.taskQueue.enqueue(taskObj);
            return taskObj.id;
        }

        processNextTask() {
            if (this.taskQueue.isEmpty()) {
                return null;
            }
            
            const task = this.taskQueue.dequeue();
            this.currentTime += task.estimatedTime;
            
            console.log(`Processing task: ${task.task} (took ${task.estimatedTime} units)`);
            return task;
        }

        processAllTasks() {
            const processedTasks = [];
            
            while (!this.taskQueue.isEmpty()) {
                const task = this.processNextTask();
                if (task) {
                    processedTasks.push(task);
                }
            }
            
            return processedTasks;
        }

        getQueueStatus() {
            return {
                remainingTasks: this.taskQueue.size(),
                currentTime: this.currentTime,
                nextTask: this.taskQueue.isEmpty() ? null : this.taskQueue.getFront()
            };
        }
    }

    // 4. Printer Queue Simulation
    class PrinterQueue {
        constructor() {
            this.queue = new LinkedListQueue();
            this.isProcessing = false;
            this.processedCount = 0;
        }

        addPrintJob(document, pages) {
            const job = {
                id: this.processedCount + this.queue.size() + 1,
                document,
                pages,
                addedAt: new Date(),
                estimatedTime: pages * 2  // 2 seconds per page
            };
            
            this.queue.enqueue(job);
            console.log(`Print job added: ${document} (${pages} pages)`);
            
            if (!this.isProcessing) {
                this.processNext();
            }
        }

        async processNext() {
            if (this.queue.isEmpty()) {
                this.isProcessing = false;
                return;
            }
            
            this.isProcessing = true;
            const job = this.queue.dequeue();
            
            console.log(`Printing: ${job.document}...`);
            
            // Simulate printing time
            await new Promise(resolve => setTimeout(resolve, job.estimatedTime * 100));
            
            console.log(`Completed: ${job.document}`);
            this.processedCount++;
            
            // Process next job
            this.processNext();
        }

        getQueueStatus() {
            return {
                jobsInQueue: this.queue.size(),
                isProcessing: this.isProcessing,
                totalProcessed: this.processedCount,
                nextJob: this.queue.isEmpty() ? null : this.queue.getFront()
            };
        }
    }

    return {
        TreeNode,
        bfsTraversal,
        levelOrderTraversal,
        TaskScheduler,
        PrinterQueue
    };
}

// ==========================================
// Priority Queue Implementation
// ==========================================

class PriorityQueue {
    constructor(compareFunction = (a, b) => a.priority - b.priority) {
        this.items = [];
        this.compare = compareFunction;
    }

    enqueue(element, priority = 0) {
        const item = { element, priority };
        
        // Find correct position to insert
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.compare(item, this.items[i]) < 0) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }
        
        if (!added) {
            this.items.push(item);
        }
        
        return this.items.length;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Priority queue is empty');
        }
        return this.items.shift().element;
    }

    front() {
        if (this.isEmpty()) {
            throw new Error('Priority queue is empty');
        }
        return this.items[0].element;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items.map(item => ({
            element: item.element,
            priority: item.priority
        }));
    }
}

// ==========================================
// Deque (Double-ended Queue) Implementation
// ==========================================

class Deque {
    constructor() {
        this.items = [];
    }

    // Add to front
    addFront(element) {
        this.items.unshift(element);
    }

    // Add to rear
    addRear(element) {
        this.items.push(element);
    }

    // Remove from front
    removeFront() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items.shift();
    }

    // Remove from rear
    removeRear() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items.pop();
    }

    // Peek front
    peekFront() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items[0];
    }

    // Peek rear
    peekRear() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return [...this.items];
    }
}

// ==========================================
// Queue vs Other Data Structures
// ==========================================

function queueComparison() {
    /**
     * Queues are best for:
     * ✅ Fair scheduling (first come, first served)
     * ✅ Breadth-first search algorithms
     * ✅ Handling requests in order
     * ✅ Buffer for streams of data
     * ✅ Process/task management
     * 
     * Consider alternatives when:
     * ❌ Need LIFO behavior (use stack)
     * ❌ Need priority-based ordering (use priority queue)
     * ❌ Need random access (use array/list)
     * ❌ Need sorted order (use heap/sorted structure)
     */

    // Example: Customer Service System
    class CustomerServiceQueue {
        constructor() {
            this.regularQueue = new LinkedListQueue();
            this.vipQueue = new PriorityQueue();
            this.currentlyServing = null;
            this.servedCount = 0;
        }

        addCustomer(name, isVIP = false, issue = '') {
            const customer = {
                id: Date.now() + Math.random(),
                name,
                issue,
                arrivalTime: new Date(),
                isVIP
            };

            if (isVIP) {
                this.vipQueue.enqueue(customer, 1);  // High priority
            } else {
                this.regularQueue.enqueue(customer);
            }

            console.log(`${isVIP ? 'VIP ' : ''}Customer ${name} joined the queue`);
        }

        serveNextCustomer() {
            // VIP customers have priority
            if (!this.vipQueue.isEmpty()) {
                this.currentlyServing = this.vipQueue.dequeue();
            } else if (!this.regularQueue.isEmpty()) {
                this.currentlyServing = this.regularQueue.dequeue();
            } else {
                console.log('No customers waiting');
                return null;
            }

            this.servedCount++;
            const customer = this.currentlyServing;
            const waitTime = new Date() - customer.arrivalTime;
            
            console.log(`Now serving: ${customer.name} (waited ${waitTime}ms)`);
            return customer;
        }

        getQueueStatus() {
            return {
                vipWaiting: this.vipQueue.size(),
                regularWaiting: this.regularQueue.size(),
                currentlyServing: this.currentlyServing?.name || 'None',
                totalServed: this.servedCount
            };
        }
    }

    return {
        CustomerServiceQueue
    };
}

// ==========================================
// Practice Problems
// ==========================================

function practiceProblems() {
    
    // Problem 1: Implement stack using two queues
    class StackUsingQueues {
        constructor() {
            this.queue1 = new LinkedListQueue();
            this.queue2 = new LinkedListQueue();
        }

        push(item) {
            // Always add to queue1
            this.queue1.enqueue(item);
        }

        pop() {
            if (this.queue1.isEmpty()) {
                throw new Error('Stack is empty');
            }

            // Move all but last element to queue2
            while (this.queue1.size() > 1) {
                this.queue2.enqueue(this.queue1.dequeue());
            }

            // Last element is our result
            const result = this.queue1.dequeue();

            // Swap queues
            [this.queue1, this.queue2] = [this.queue2, this.queue1];

            return result;
        }

        peek() {
            if (this.queue1.isEmpty()) {
                throw new Error('Stack is empty');
            }

            // Move all but last to queue2
            while (this.queue1.size() > 1) {
                this.queue2.enqueue(this.queue1.dequeue());
            }

            const result = this.queue1.dequeue();
            this.queue2.enqueue(result);  // Put it back

            // Swap queues
            [this.queue1, this.queue2] = [this.queue2, this.queue1];

            return result;
        }

        isEmpty() {
            return this.queue1.isEmpty();
        }
    }

    // Problem 2: Sliding window maximum using deque
    function slidingWindowMaximum(nums, k) {
        const result = [];
        const deque = new Deque();  // Store indices
        
        for (let i = 0; i < nums.length; i++) {
            // Remove indices outside window
            while (!deque.isEmpty() && deque.peekFront() <= i - k) {
                deque.removeFront();
            }
            
            // Remove indices with smaller values (they can't be maximum)
            while (!deque.isEmpty() && nums[deque.peekRear()] <= nums[i]) {
                deque.removeRear();
            }
            
            deque.addRear(i);
            
            // Window is complete
            if (i >= k - 1) {
                result.push(nums[deque.peekFront()]);
            }
        }
        
        return result;
    }

    // Problem 3: Design circular queue
    class MyCircularQueue {
        constructor(k) {
            this.capacity = k;
            this.queue = new Array(k);
            this.front = 0;
            this.rear = 0;
            this.size = 0;
        }

        enQueue(value) {
            if (this.isFull()) return false;
            
            this.queue[this.rear] = value;
            this.rear = (this.rear + 1) % this.capacity;
            this.size++;
            return true;
        }

        deQueue() {
            if (this.isEmpty()) return false;
            
            this.front = (this.front + 1) % this.capacity;
            this.size--;
            return true;
        }

        Front() {
            return this.isEmpty() ? -1 : this.queue[this.front];
        }

        Rear() {
            if (this.isEmpty()) return -1;
            const rearIndex = (this.rear - 1 + this.capacity) % this.capacity;
            return this.queue[rearIndex];
        }

        isEmpty() {
            return this.size === 0;
        }

        isFull() {
            return this.size === this.capacity;
        }
    }

    return {
        StackUsingQueues,
        slidingWindowMaximum,
        MyCircularQueue
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    NaiveArrayQueue,
    CircularArrayQueue,
    DynamicArrayQueue,
    LinkedListQueue,
    PriorityQueue,
    Deque,
    queueApplications: queueApplications(),
    queueComparison: queueComparison(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. FIFO Principle:
 *    - What real-world scenarios follow FIFO?
 *    - How does queue fairness work?
 *    - Why is order preservation important?
 * 
 * 2. Implementation Trade-offs:
 *    - Array vs Linked List implementation pros/cons
 *    - Why is circular array better than naive array?
 *    - When to use dynamic resizing?
 * 
 * 3. Variants and Extensions:
 *    - When would you use priority queue vs regular queue?
 *    - What problems need double-ended queue (deque)?
 *    - How do blocking queues work in concurrent systems?
 * 
 * 4. Algorithm Applications:
 *    - Why is BFS naturally queue-based?
 *    - How do operating systems use queues for scheduling?
 *    - What about producer-consumer patterns?
 */
