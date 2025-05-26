/**
 * Heap Data Structure Implementation
 * Focus: Understanding heap properties, when to use heaps, and heap applications
 */

// ==========================================
// Min Heap Implementation
// ==========================================

class MinHeap {
    constructor(compareFunction = (a, b) => a - b) {
        this.heap = [];
        this.compare = compareFunction;
    }

    // Get index of parent node
    _parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // Get index of left child
    _leftChild(index) {
        return 2 * index + 1;
    }

    // Get index of right child
    _rightChild(index) {
        return 2 * index + 2;
    }

    // Check if node has parent
    _hasParent(index) {
        return this._parent(index) >= 0;
    }

    // Check if node has left child
    _hasLeftChild(index) {
        return this._leftChild(index) < this.heap.length;
    }

    // Check if node has right child
    _hasRightChild(index) {
        return this._rightChild(index) < this.heap.length;
    }

    // Swap two elements in heap
    _swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Bubble up to maintain heap property
    _heapifyUp() {
        let index = this.heap.length - 1;
        
        while (this._hasParent(index) && 
               this.compare(this.heap[index], this.heap[this._parent(index)]) < 0) {
            this._swap(index, this._parent(index));
            index = this._parent(index);
        }
    }

    // Bubble down to maintain heap property
    _heapifyDown() {
        let index = 0;
        
        while (this._hasLeftChild(index)) {
            let smallerChildIndex = this._leftChild(index);
            
            // Find smaller child
            if (this._hasRightChild(index) && 
                this.compare(this.heap[this._rightChild(index)], 
                           this.heap[this._leftChild(index)]) < 0) {
                smallerChildIndex = this._rightChild(index);
            }
            
            // If current node is smaller than both children, stop
            if (this.compare(this.heap[index], this.heap[smallerChildIndex]) < 0) {
                break;
            }
            
            this._swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    // O(log n) - Insert element
    insert(element) {
        this.heap.push(element);
        this._heapifyUp();
    }

    // O(log n) - Remove and return minimum element
    extractMin() {
        if (this.isEmpty()) {
            throw new Error('Heap is empty');
        }
        
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();  // Move last to root
        this._heapifyDown();
        
        return min;
    }

    // O(1) - View minimum element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error('Heap is empty');
        }
        return this.heap[0];
    }

    // O(1) - Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // O(1) - Get number of elements
    size() {
        return this.heap.length;
    }

    // O(n) - Convert to array (for visualization)
    toArray() {
        return [...this.heap];
    }

    // O(n log n) - Build heap from array
    static fromArray(arr, compareFunction) {
        const heap = new MinHeap(compareFunction);
        for (let element of arr) {
            heap.insert(element);
        }
        return heap;
    }

    // O(n) - More efficient way to build heap
    static heapify(arr, compareFunction = (a, b) => a - b) {
        const heap = new MinHeap(compareFunction);
        heap.heap = [...arr];
        
        // Start from last non-leaf node and heapify down
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            heap._heapifyDownFrom(i);
        }
        
        return heap;
    }

    _heapifyDownFrom(startIndex) {
        let index = startIndex;
        
        while (this._hasLeftChild(index)) {
            let smallerChildIndex = this._leftChild(index);
            
            if (this._hasRightChild(index) && 
                this.compare(this.heap[this._rightChild(index)], 
                           this.heap[this._leftChild(index)]) < 0) {
                smallerChildIndex = this._rightChild(index);
            }
            
            if (this.compare(this.heap[index], this.heap[smallerChildIndex]) < 0) {
                break;
            }
            
            this._swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
}

// ==========================================
// Max Heap Implementation
// ==========================================

class MaxHeap extends MinHeap {
    constructor(compareFunction = (a, b) => b - a) {  // Reverse comparison for max heap
        super(compareFunction);
    }

    // Override method names for clarity
    extractMax() {
        return this.extractMin();  // Still uses extractMin logic but with reversed comparison
    }

    peekMax() {
        return this.peek();
    }

    static fromArray(arr, compareFunction = (a, b) => b - a) {
        return super.fromArray(arr, compareFunction);
    }

    static heapify(arr, compareFunction = (a, b) => b - a) {
        return super.heapify(arr, compareFunction);
    }
}

// ==========================================
// Priority Queue using Heap
// ==========================================

class PriorityQueue {
    constructor(compareFunction = (a, b) => a.priority - b.priority) {
        this.heap = new MinHeap(compareFunction);
    }

    // Add element with priority
    enqueue(element, priority = 0) {
        const item = { element, priority };
        this.heap.insert(item);
    }

    // Remove highest priority element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Priority queue is empty');
        }
        return this.heap.extractMin().element;
    }

    // View highest priority element
    peek() {
        if (this.isEmpty()) {
            throw new Error('Priority queue is empty');
        }
        return this.heap.peek().element;
    }

    isEmpty() {
        return this.heap.isEmpty();
    }

    size() {
        return this.heap.size();
    }

    // Get all elements with their priorities
    toArray() {
        return this.heap.toArray().map(item => ({
            element: item.element,
            priority: item.priority
        }));
    }
}

// ==========================================
// Heap Applications
// ==========================================

function heapApplications() {
    
    // 1. Find K largest elements
    function findKLargest(arr, k) {
        if (k <= 0 || k > arr.length) {
            throw new Error('Invalid value of k');
        }
        
        // Use min heap of size k
        const minHeap = new MinHeap();
        
        for (let num of arr) {
            if (minHeap.size() < k) {
                minHeap.insert(num);
            } else if (num > minHeap.peek()) {
                minHeap.extractMin();
                minHeap.insert(num);
            }
        }
        
        return minHeap.toArray().sort((a, b) => b - a);  // Return in descending order
    }

    // 2. Find K smallest elements
    function findKSmallest(arr, k) {
        if (k <= 0 || k > arr.length) {
            throw new Error('Invalid value of k');
        }
        
        // Use max heap of size k
        const maxHeap = new MaxHeap();
        
        for (let num of arr) {
            if (maxHeap.size() < k) {
                maxHeap.insert(num);
            } else if (num < maxHeap.peekMax()) {
                maxHeap.extractMax();
                maxHeap.insert(num);
            }
        }
        
        return maxHeap.toArray().sort((a, b) => a - b);  // Return in ascending order
    }

    // 3. Merge K sorted arrays
    function mergeKSortedArrays(arrays) {
        const result = [];
        const minHeap = new MinHeap((a, b) => a.value - b.value);
        
        // Initialize heap with first element from each array
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) {
                minHeap.insert({
                    value: arrays[i][0],
                    arrayIndex: i,
                    elementIndex: 0
                });
            }
        }
        
        while (!minHeap.isEmpty()) {
            const min = minHeap.extractMin();
            result.push(min.value);
            
            // Add next element from same array
            const nextIndex = min.elementIndex + 1;
            if (nextIndex < arrays[min.arrayIndex].length) {
                minHeap.insert({
                    value: arrays[min.arrayIndex][nextIndex],
                    arrayIndex: min.arrayIndex,
                    elementIndex: nextIndex
                });
            }
        }
        
        return result;
    }

    // 4. Running Median Calculator
    class RunningMedian {
        constructor() {
            this.maxHeap = new MaxHeap();  // For smaller half
            this.minHeap = new MinHeap();  // For larger half
        }

        addNumber(num) {
            // Add to appropriate heap
            if (this.maxHeap.isEmpty() || num <= this.maxHeap.peekMax()) {
                this.maxHeap.insert(num);
            } else {
                this.minHeap.insert(num);
            }
            
            // Rebalance heaps
            this._rebalance();
        }

        _rebalance() {
            // Ensure size difference is at most 1
            if (this.maxHeap.size() > this.minHeap.size() + 1) {
                this.minHeap.insert(this.maxHeap.extractMax());
            } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
                this.maxHeap.insert(this.minHeap.extractMin());
            }
        }

        getMedian() {
            if (this.maxHeap.isEmpty() && this.minHeap.isEmpty()) {
                throw new Error('No numbers added yet');
            }
            
            if (this.maxHeap.size() === this.minHeap.size()) {
                return (this.maxHeap.peekMax() + this.minHeap.peek()) / 2;
            } else if (this.maxHeap.size() > this.minHeap.size()) {
                return this.maxHeap.peekMax();
            } else {
                return this.minHeap.peek();
            }
        }
    }

    // 5. Task Scheduler with Priority
    class TaskScheduler {
        constructor() {
            this.taskQueue = new PriorityQueue((a, b) => a.priority - b.priority);
            this.completedTasks = [];
        }

        addTask(name, priority, estimatedTime = 1) {
            const task = {
                id: Date.now() + Math.random(),
                name,
                priority,
                estimatedTime,
                addedAt: new Date()
            };
            
            this.taskQueue.enqueue(task, priority);
            console.log(`Task added: ${name} (priority: ${priority})`);
        }

        executeNextTask() {
            if (this.taskQueue.isEmpty()) {
                console.log('No tasks to execute');
                return null;
            }
            
            const task = this.taskQueue.dequeue();
            const startTime = new Date();
            
            console.log(`Executing: ${task.name} (estimated time: ${task.estimatedTime})`);
            
            // Simulate task execution
            setTimeout(() => {
                const completedTask = {
                    ...task,
                    startedAt: startTime,
                    completedAt: new Date(),
                    actualTime: (new Date() - startTime) / 1000
                };
                
                this.completedTasks.push(completedTask);
                console.log(`Completed: ${task.name}`);
            }, task.estimatedTime * 1000);
            
            return task;
        }

        getQueueStatus() {
            return {
                tasksInQueue: this.taskQueue.size(),
                nextTask: this.taskQueue.isEmpty() ? null : this.taskQueue.peek(),
                completedTasks: this.completedTasks.length
            };
        }
    }

    return {
        findKLargest,
        findKSmallest,
        mergeKSortedArrays,
        RunningMedian,
        TaskScheduler
    };
}

// ==========================================
// Heap Sort Implementation
// ==========================================

function heapSort(arr) {
    // Build max heap
    const maxHeap = MaxHeap.heapify([...arr]);
    const sorted = [];
    
    // Extract max elements one by one
    while (!maxHeap.isEmpty()) {
        sorted.unshift(maxHeap.extractMax());  // Add to beginning for ascending order
    }
    
    return sorted;
}

// In-place heap sort (more memory efficient)
function heapSortInPlace(arr) {
    const n = arr.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        // Call heapify on reduced heap
        heapifyDown(arr, i, 0);
    }
    
    return arr;
}

function heapifyDown(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyDown(arr, n, largest);
    }
}

// ==========================================
// Heap vs Other Data Structures
// ==========================================

function heapComparison() {
    /**
     * Heaps are best for:
     * ✅ Finding min/max quickly (O(1))
     * ✅ Priority queues
     * ✅ Heap sort (O(n log n) guaranteed)
     * ✅ Graph algorithms (Dijkstra, Prim's)
     * ✅ Streaming data problems (top K, median)
     * 
     * Consider alternatives when:
     * ❌ Need to search for arbitrary elements (use hash table)
     * ❌ Need sorted order iteration (use balanced BST)
     * ❌ Need to access middle elements (use array)
     * ❌ Simple FIFO/LIFO needed (use queue/stack)
     */

    // Example: Event Simulation System
    class EventSimulator {
        constructor() {
            this.eventQueue = new PriorityQueue((a, b) => a.priority - b.priority);
            this.currentTime = 0;
            this.processedEvents = [];
        }

        scheduleEvent(name, priority, delay = 0) {
            const event = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                priority,
                scheduledTime: this.currentTime + delay,
                createdAt: this.currentTime
            };
            
            this.eventQueue.enqueue(event, priority);
            console.log(`Event scheduled: ${name} at time ${event.scheduledTime}`);
        }

        processNextEvent() {
            if (this.eventQueue.isEmpty()) {
                console.log('No events to process');
                return null;
            }
            
            const event = this.eventQueue.dequeue();
            this.currentTime = Math.max(this.currentTime, event.scheduledTime);
            
            console.log(`Processing event: ${event.name} at time ${this.currentTime}`);
            this.processedEvents.push({
                ...event,
                processedAt: this.currentTime
            });
            
            return event;
        }

        processAllEvents() {
            while (!this.eventQueue.isEmpty()) {
                this.processNextEvent();
            }
            
            return this.processedEvents;
        }

        getStatus() {
            return {
                currentTime: this.currentTime,
                eventsRemaining: this.eventQueue.size(),
                eventsProcessed: this.processedEvents.length,
                nextEvent: this.eventQueue.isEmpty() ? null : this.eventQueue.peek()
            };
        }
    }

    return {
        EventSimulator
    };
}

// ==========================================
// Practice Problems
// ==========================================

function practiceProblems() {
    
    // Problem 1: Find the kth largest element in array
    function findKthLargest(nums, k) {
        // Use min heap of size k
        const minHeap = new MinHeap();
        
        for (let num of nums) {
            if (minHeap.size() < k) {
                minHeap.insert(num);
            } else if (num > minHeap.peek()) {
                minHeap.extractMin();
                minHeap.insert(num);
            }
        }
        
        return minHeap.peek();
    }

    // Problem 2: Top K frequent elements
    function topKFrequent(nums, k) {
        // Count frequencies
        const frequency = new Map();
        for (let num of nums) {
            frequency.set(num, (frequency.get(num) || 0) + 1);
        }
        
        // Use min heap with frequencies
        const minHeap = new MinHeap((a, b) => a.freq - b.freq);
        
        for (let [num, freq] of frequency) {
            if (minHeap.size() < k) {
                minHeap.insert({ num, freq });
            } else if (freq > minHeap.peek().freq) {
                minHeap.extractMin();
                minHeap.insert({ num, freq });
            }
        }
        
        return minHeap.toArray().map(item => item.num);
    }

    // Problem 3: Merge k sorted linked lists
    class ListNode {
        constructor(val = 0, next = null) {
            this.val = val;
            this.next = next;
        }
    }

    function mergeKLists(lists) {
        if (!lists || lists.length === 0) return null;
        
        const minHeap = new MinHeap((a, b) => a.val - b.val);
        
        // Add first node from each list
        for (let list of lists) {
            if (list) {
                minHeap.insert(list);
            }
        }
        
        const dummy = new ListNode(0);
        let current = dummy;
        
        while (!minHeap.isEmpty()) {
            const node = minHeap.extractMin();
            current.next = node;
            current = current.next;
            
            if (node.next) {
                minHeap.insert(node.next);
            }
        }
        
        return dummy.next;
    }

    // Problem 4: Sliding window median
    function medianSlidingWindow(nums, k) {
        const result = [];
        const medianCalculator = new heapApplications().RunningMedian();
        
        // Process first window
        for (let i = 0; i < k; i++) {
            medianCalculator.addNumber(nums[i]);
        }
        result.push(medianCalculator.getMedian());
        
        // Process remaining windows
        for (let i = k; i < nums.length; i++) {
            // This is a simplified version - actual implementation
            // would need to remove the element going out of window
            // which requires more complex heap operations
            medianCalculator.addNumber(nums[i]);
            result.push(medianCalculator.getMedian());
        }
        
        return result;
    }

    return {
        findKthLargest,
        topKFrequent,
        ListNode,
        mergeKLists,
        medianSlidingWindow
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    MinHeap,
    MaxHeap,
    PriorityQueue,
    heapSort,
    heapSortInPlace,
    heapApplications: heapApplications(),
    heapComparison: heapComparison(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. Heap Properties:
 *    - What makes a complete binary tree a heap?
 *    - Why is array representation efficient for heaps?
 *    - How do min-heap and max-heap differ?
 * 
 * 2. Time Complexities:
 *    - Why is insert O(log n) instead of O(1)?
 *    - How does heapify work in O(n) time?
 *    - What operations are O(1) in heaps?
 * 
 * 3. Applications:
 *    - When would you use heap over sorted array?
 *    - How do priority queues use heaps internally?
 *    - Why is heap sort not stable?
 * 
 * 4. Problem Recognition:
 *    - What keywords suggest using a heap?
 *    - How to recognize "top K" problems?
 *    - When is median calculation heap-appropriate?
 */
