/**
 * Linked List Data Structure Implementation
 * Focus: Understanding when linked lists are better than arrays
 */

// ==========================================
// Node Definition
// ==========================================

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ==========================================
// Singly Linked List Implementation
// ==========================================

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // O(1) - Add to beginning
    prepend(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
        return this;
    }

    // O(n) - Add to end (no tail pointer)
    append(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {  // Traverse to end
                current = current.next;
            }
            current.next = newNode;
        }
        
        this.size++;
        return this;
    }

    // O(n) - Insert at specific index
    insertAt(index, val) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            return this.prepend(val);
        }

        const newNode = new ListNode(val);
        let current = this.head;
        
        // Traverse to position before insertion point
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        return this;
    }

    // O(1) - Remove first element
    removeFirst() {
        if (!this.head) return null;
        
        const removedVal = this.head.val;
        this.head = this.head.next;
        this.size--;
        return removedVal;
    }

    // O(n) - Remove last element
    removeLast() {
        if (!this.head) return null;
        
        if (!this.head.next) {
            // Only one element
            const removedVal = this.head.val;
            this.head = null;
            this.size--;
            return removedVal;
        }
        
        // Find second-to-last node
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        
        const removedVal = current.next.val;
        current.next = null;
        this.size--;
        return removedVal;
    }

    // O(n) - Remove at specific index
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        
        // Traverse to position before removal point
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        const removedVal = current.next.val;
        current.next = current.next.next;
        this.size--;
        return removedVal;
    }

    // O(n) - Find element
    find(val) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.val === val) {
                return index;
            }
            current = current.next;
            index++;
        }
        
        return -1;
    }

    // O(n) - Get element at index
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }

    // O(n) - Check if list contains value
    contains(val) {
        return this.find(val) !== -1;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    // O(n) - Convert to array for easy visualization
    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }

    // O(n) - Display list
    toString() {
        return this.toArray().join(' -> ') + ' -> null';
    }
}

// ==========================================
// Optimized Linked List with Tail Pointer
// ==========================================

class OptimizedLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // O(1) - Add to beginning
    prepend(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        this.size++;
        return this;
    }

    // O(1) - Add to end (with tail pointer!)
    append(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
        return this;
    }

    // O(1) - Remove first
    removeFirst() {
        if (!this.head) return null;
        
        const removedVal = this.head.val;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;  // List is now empty
        }
        
        this.size--;
        return removedVal;
    }

    // Still O(n) - Remove last (need to find new tail)
    removeLast() {
        if (!this.head) return null;
        
        if (this.head === this.tail) {
            // Only one element
            const removedVal = this.head.val;
            this.head = this.tail = null;
            this.size--;
            return removedVal;
        }
        
        // Find second-to-last node
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }
        
        const removedVal = this.tail.val;
        current.next = null;
        this.tail = current;
        this.size--;
        return removedVal;
    }

    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }
}

// ==========================================
// Doubly Linked List
// ==========================================

class DoublyListNode {
    constructor(val = 0, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // O(1) - Add to beginning
    prepend(val) {
        const newNode = new DoublyListNode(val);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        
        this.size++;
        return this;
    }

    // O(1) - Add to end
    append(val) {
        const newNode = new DoublyListNode(val);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
        return this;
    }

    // O(1) - Remove first
    removeFirst() {
        if (!this.head) return null;
        
        const removedVal = this.head.val;
        
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        
        this.size--;
        return removedVal;
    }

    // O(1) - Remove last (advantage of doubly linked!)
    removeLast() {
        if (!this.tail) return null;
        
        const removedVal = this.tail.val;
        
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        
        this.size--;
        return removedVal;
    }

    // O(1) - Remove specific node (if you have reference to it)
    removeNode(node) {
        if (node === this.head) {
            return this.removeFirst();
        }
        
        if (node === this.tail) {
            return this.removeLast();
        }
        
        // Middle node - easy with doubly linked!
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.size--;
        return node.val;
    }

    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }

    toArrayReverse() {
        const result = [];
        let current = this.tail;
        
        while (current) {
            result.push(current.val);
            current = current.prev;
        }
        
        return result;
    }
}

// ==========================================
// Classic Linked List Algorithms
// ==========================================

function linkedListAlgorithms() {
    
    // Reverse a linked list iteratively
    function reverseListIterative(head) {
        let prev = null;
        let current = head;
        
        while (current) {
            const nextTemp = current.next;  // Store next
            current.next = prev;            // Reverse link
            prev = current;                 // Move prev forward
            current = nextTemp;             // Move current forward
        }
        
        return prev;  // New head
    }

    // Reverse a linked list recursively
    function reverseListRecursive(head) {
        // Base case
        if (!head || !head.next) {
            return head;
        }
        
        // Recursively reverse the rest
        const newHead = reverseListRecursive(head.next);
        
        // Reverse current connection
        head.next.next = head;
        head.next = null;
        
        return newHead;
    }

    // Find middle of linked list (Floyd's tortoise and hare)
    function findMiddle(head) {
        if (!head) return null;
        
        let slow = head;
        let fast = head;
        
        // Fast moves 2 steps, slow moves 1
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;  // Slow is at middle when fast reaches end
    }

    // Detect cycle in linked list
    function hasCycle(head) {
        if (!head) return false;
        
        let slow = head;
        let fast = head;
        
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow === fast) {
                return true;  // Cycle detected
            }
        }
        
        return false;
    }

    // Merge two sorted linked lists
    function mergeSortedLists(list1, list2) {
        const dummy = new ListNode(0);
        let current = dummy;
        
        while (list1 && list2) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        // Append remaining nodes
        current.next = list1 || list2;
        
        return dummy.next;
    }

    // Remove nth node from end
    function removeNthFromEnd(head, n) {
        const dummy = new ListNode(0, head);
        let slow = dummy;
        let fast = dummy;
        
        // Move fast pointer n+1 steps ahead
        for (let i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // Move both until fast reaches end
        while (fast) {
            slow = slow.next;
            fast = fast.next;
        }
        
        // Remove the nth node
        slow.next = slow.next.next;
        
        return dummy.next;
    }

    return {
        reverseListIterative,
        reverseListRecursive,
        findMiddle,
        hasCycle,
        mergeSortedLists,
        removeNthFromEnd
    };
}

// ==========================================
// Linked List vs Array Comparison
// ==========================================

function linkedListVsArray() {
    /**
     * Linked Lists are better when:
     * ✅ Frequent insertions/deletions at beginning
     * ✅ Unknown or highly variable size
     * ✅ Don't need random access
     * ✅ Memory is fragmented
     * 
     * Arrays are better when:
     * ✅ Need random access by index
     * ✅ Cache locality is important
     * ✅ Memory is limited (no pointer overhead)
     * ✅ Simple iteration patterns
     */

    // Example: Implementing a simple undo system
    class UndoSystemLinkedList {
        constructor() {
            this.head = null;
            this.maxSize = 10;
            this.currentSize = 0;
        }

        addAction(action) {
            const newNode = new ListNode(action, this.head);
            this.head = newNode;
            this.currentSize++;
            
            // Remove oldest if over limit
            if (this.currentSize > this.maxSize) {
                this.removeOldest();
            }
        }

        undo() {
            if (!this.head) return null;
            
            const action = this.head.val;
            this.head = this.head.next;
            this.currentSize--;
            return action;
        }

        removeOldest() {
            if (!this.head) return;
            
            if (!this.head.next) {
                this.head = null;
                this.currentSize = 0;
                return;
            }
            
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
            this.currentSize--;
        }
    }

    class UndoSystemArray {
        constructor() {
            this.actions = [];
            this.maxSize = 10;
        }

        addAction(action) {
            this.actions.unshift(action);  // O(n) - must shift all elements
            
            if (this.actions.length > this.maxSize) {
                this.actions.pop();  // O(1)
            }
        }

        undo() {
            return this.actions.shift() || null;  // O(n) - must shift all elements
        }
    }

    return {
        UndoSystemLinkedList,
        UndoSystemArray
    };
}

// ==========================================
// Practice Problems
// ==========================================

function practiceProblems() {
    
    // Problem 1: Check if linked list is palindrome
    function isPalindrome(head) {
        if (!head || !head.next) return true;
        
        // Find middle
        let slow = head, fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse second half
        let secondHalf = reverseList(slow.next);
        
        // Compare first and second half
        let firstHalf = head;
        while (secondHalf) {
            if (firstHalf.val !== secondHalf.val) {
                return false;
            }
            firstHalf = firstHalf.next;
            secondHalf = secondHalf.next;
        }
        
        return true;
    }

    function reverseList(head) {
        let prev = null;
        while (head) {
            const next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }

    // Problem 2: Add two numbers represented as linked lists
    function addTwoNumbers(l1, l2) {
        const dummy = new ListNode(0);
        let current = dummy;
        let carry = 0;
        
        while (l1 || l2 || carry) {
            const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
            carry = Math.floor(sum / 10);
            
            current.next = new ListNode(sum % 10);
            current = current.next;
            
            l1 = l1?.next;
            l2 = l2?.next;
        }
        
        return dummy.next;
    }

    // Problem 3: Intersection of two linked lists
    function getIntersectionNode(headA, headB) {
        if (!headA || !headB) return null;
        
        let a = headA;
        let b = headB;
        
        // When they meet, they'll be at intersection
        // or both will be null (no intersection)
        while (a !== b) {
            a = a ? a.next : headB;
            b = b ? b.next : headA;
        }
        
        return a;
    }

    return {
        isPalindrome,
        addTwoNumbers,
        getIntersectionNode
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    ListNode,
    SinglyLinkedList,
    OptimizedLinkedList,
    DoublyLinkedList,
    DoublyListNode,
    linkedListAlgorithms: linkedListAlgorithms(),
    linkedListVsArray: linkedListVsArray(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. Memory Layout:
 *    - How are linked lists stored vs arrays?
 *    - What's the memory overhead of pointers?
 *    - Why are arrays more cache-friendly?
 * 
 * 2. Performance Trade-offs:
 *    - When is O(1) insertion worth O(n) access?
 *    - Why can't we have O(1) access AND insertion everywhere?
 *    - How does cache locality affect real-world performance?
 * 
 * 3. Design Decisions:
 *    - When would you add a tail pointer?
 *    - When is doubly-linked worth the extra memory?
 *    - How to choose between singly vs doubly linked?
 * 
 * 4. Common Patterns:
 *    - Two-pointer technique applications
 *    - When to use dummy nodes
 *    - Recursive vs iterative approaches
 */
