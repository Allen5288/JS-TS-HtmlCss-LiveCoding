/**
 * Stack Data Structure Implementation
 * Focus: LIFO principle, when to use stacks, and common stack applications
 */

// ==========================================
// Array-based Stack Implementation
// ==========================================

class ArrayStack {
    constructor() {
        this.items = [];
    }

    // O(1) - Add element to top
    push(element) {
        this.items.push(element);
        return this.size();
    }

    // O(1) - Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items.pop();
    }

    // O(1) - View top element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items[this.items.length - 1];
    }

    // O(1) - Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // O(1) - Get number of elements
    size() {
        return this.items.length;
    }

    // O(1) - Remove all elements
    clear() {
        this.items = [];
    }

    // O(n) - Convert to array (for visualization)
    toArray() {
        return [...this.items];
    }

    // O(n) - String representation
    toString() {
        return this.items.join(' <- ') + ' <- TOP';
    }
}

// ==========================================
// Linked List-based Stack Implementation
// ==========================================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedListStack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    // O(1) - Add element to top
    push(element) {
        const newNode = new ListNode(element, this.top);
        this.top = newNode;
        this.length++;
        return this.length;
    }

    // O(1) - Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        
        const poppedValue = this.top.val;
        this.top = this.top.next;
        this.length--;
        return poppedValue;
    }

    // O(1) - View top element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.top.val;
    }

    // O(1) - Check if stack is empty
    isEmpty() {
        return this.top === null;
    }

    // O(1) - Get number of elements
    size() {
        return this.length;
    }

    // O(1) - Remove all elements
    clear() {
        this.top = null;
        this.length = 0;
    }

    // O(n) - Convert to array (for visualization)
    toArray() {
        const result = [];
        let current = this.top;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }
}

// ==========================================
// Stack Applications
// ==========================================

function stackApplications() {
    
    // 1. Balanced Parentheses Checker
    function isBalanced(str) {
        const stack = new ArrayStack();
        const pairs = {
            '(': ')',
            '[': ']',
            '{': '}'
        };
        
        for (let char of str) {
            if (char in pairs) {
                // Opening bracket
                stack.push(char);
            } else if (Object.values(pairs).includes(char)) {
                // Closing bracket
                if (stack.isEmpty()) {
                    return false;  // No matching opening bracket
                }
                
                const opening = stack.pop();
                if (pairs[opening] !== char) {
                    return false;  // Mismatched brackets
                }
            }
        }
        
        return stack.isEmpty();  // All brackets should be matched
    }

    // 2. Reverse a string using stack
    function reverseString(str) {
        const stack = new ArrayStack();
        
        // Push all characters
        for (let char of str) {
            stack.push(char);
        }
        
        // Pop all characters (LIFO = reverse order)
        let reversed = '';
        while (!stack.isEmpty()) {
            reversed += stack.pop();
        }
        
        return reversed;
    }

    // 3. Evaluate postfix expression
    function evaluatePostfix(expression) {
        const stack = new ArrayStack();
        const operators = new Set(['+', '-', '*', '/']);
        
        const tokens = expression.split(' ');
        
        for (let token of tokens) {
            if (operators.has(token)) {
                // Operator: pop two operands
                if (stack.size() < 2) {
                    throw new Error('Invalid expression');
                }
                
                const b = stack.pop();
                const a = stack.pop();
                let result;
                
                switch (token) {
                    case '+': result = a + b; break;
                    case '-': result = a - b; break;
                    case '*': result = a * b; break;
                    case '/': result = a / b; break;
                }
                
                stack.push(result);
            } else {
                // Operand: push to stack
                stack.push(parseFloat(token));
            }
        }
        
        if (stack.size() !== 1) {
            throw new Error('Invalid expression');
        }
        
        return stack.pop();
    }

    // 4. Convert infix to postfix (Shunting Yard Algorithm)
    function infixToPostfix(expression) {
        const stack = new ArrayStack();
        const output = [];
        
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const isOperator = (char) => char in precedence;
        
        const tokens = expression.split(' ');
        
        for (let token of tokens) {
            if (!isNaN(token)) {
                // Operand
                output.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                // Pop until opening parenthesis
                while (!stack.isEmpty() && stack.peek() !== '(') {
                    output.push(stack.pop());
                }
                stack.pop();  // Remove '('
            } else if (isOperator(token)) {
                // Pop operators with higher or equal precedence
                while (!stack.isEmpty() && 
                       stack.peek() !== '(' && 
                       precedence[stack.peek()] >= precedence[token]) {
                    output.push(stack.pop());
                }
                stack.push(token);
            }
        }
        
        // Pop remaining operators
        while (!stack.isEmpty()) {
            output.push(stack.pop());
        }
        
        return output.join(' ');
    }

    // 5. Function call simulation
    class CallStack {
        constructor() {
            this.stack = new ArrayStack();
        }

        call(functionName, parameters = {}) {
            const frame = {
                function: functionName,
                parameters,
                locals: {},
                timestamp: Date.now()
            };
            
            this.stack.push(frame);
            console.log(`Calling: ${functionName}`);
        }

        return(returnValue) {
            if (this.stack.isEmpty()) {
                throw new Error('No function to return from');
            }
            
            const frame = this.stack.pop();
            console.log(`Returning from: ${frame.function} with value: ${returnValue}`);
            return returnValue;
        }

        getCurrentFunction() {
            if (this.stack.isEmpty()) {
                return null;
            }
            return this.stack.peek().function;
        }

        getCallStack() {
            return this.stack.toArray().map(frame => frame.function);
        }
    }

    return {
        isBalanced,
        reverseString,
        evaluatePostfix,
        infixToPostfix,
        CallStack
    };
}

// ==========================================
// Stack-based Algorithms
// ==========================================

function stackAlgorithms() {
    
    // 1. Next Greater Element
    function nextGreaterElement(nums) {
        const result = new Array(nums.length).fill(-1);
        const stack = new ArrayStack();  // Store indices
        
        for (let i = 0; i < nums.length; i++) {
            // While stack not empty and current element is greater
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                const index = stack.pop();
                result[index] = nums[i];
            }
            
            stack.push(i);
        }
        
        return result;
    }

    // 2. Daily Temperatures (variation of next greater element)
    function dailyTemperatures(temperatures) {
        const result = new Array(temperatures.length).fill(0);
        const stack = new ArrayStack();  // Store indices
        
        for (let i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                const index = stack.pop();
                result[index] = i - index;  // Days until warmer
            }
            
            stack.push(i);
        }
        
        return result;
    }

    // 3. Largest Rectangle in Histogram
    function largestRectangleArea(heights) {
        const stack = new ArrayStack();  // Store indices
        let maxArea = 0;
        
        for (let i = 0; i <= heights.length; i++) {
            const currentHeight = i === heights.length ? 0 : heights[i];
            
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                const height = heights[stack.pop()];
                const width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            
            stack.push(i);
        }
        
        return maxArea;
    }

    // 4. Valid Parentheses with detailed error reporting
    function validateParenthesesDetailed(s) {
        const stack = new ArrayStack();
        const pairs = { '(': ')', '[': ']', '{': '}' };
        const opening = new Set(['(', '[', '{']);
        const closing = new Set([')', ']', '}']);
        
        for (let i = 0; i < s.length; i++) {
            const char = s[i];
            
            if (opening.has(char)) {
                stack.push({ char, position: i });
            } else if (closing.has(char)) {
                if (stack.isEmpty()) {
                    return {
                        valid: false,
                        error: `Unmatched closing '${char}' at position ${i}`
                    };
                }
                
                const { char: openChar, position: openPos } = stack.pop();
                if (pairs[openChar] !== char) {
                    return {
                        valid: false,
                        error: `Mismatched: '${openChar}' at ${openPos} with '${char}' at ${i}`
                    };
                }
            }
        }
        
        if (!stack.isEmpty()) {
            const { char, position } = stack.peek();
            return {
                valid: false,
                error: `Unmatched opening '${char}' at position ${position}`
            };
        }
        
        return { valid: true, error: null };
    }

    return {
        nextGreaterElement,
        dailyTemperatures,
        largestRectangleArea,
        validateParenthesesDetailed
    };
}

// ==========================================
// Stack vs Other Data Structures
// ==========================================

function stackComparison() {
    /**
     * Stacks are best for:
     * ✅ Function call management
     * ✅ Undo operations
     * ✅ Expression parsing/evaluation
     * ✅ Backtracking algorithms
     * ✅ Browser history navigation
     * 
     * Consider alternatives when:
     * ❌ Need random access to elements (use array/list)
     * ❌ Need FIFO behavior (use queue)
     * ❌ Need to access middle elements (use array/list)
     * ❌ Need sorted order (use heap/priority queue)
     */

    // Example: Undo System Implementation
    class UndoRedoSystem {
        constructor() {
            this.undoStack = new ArrayStack();
            this.redoStack = new ArrayStack();
        }

        executeCommand(command, data) {
            // Execute the command
            const result = command.execute(data);
            
            // Save for undo
            this.undoStack.push({
                command,
                data,
                timestamp: Date.now()
            });
            
            // Clear redo stack (new action invalidates redo history)
            this.redoStack.clear();
            
            return result;
        }

        undo() {
            if (this.undoStack.isEmpty()) {
                throw new Error('Nothing to undo');
            }
            
            const action = this.undoStack.pop();
            
            // Execute undo
            const result = action.command.undo(action.data);
            
            // Move to redo stack
            this.redoStack.push(action);
            
            return result;
        }

        redo() {
            if (this.redoStack.isEmpty()) {
                throw new Error('Nothing to redo');
            }
            
            const action = this.redoStack.pop();
            
            // Re-execute command
            const result = action.command.execute(action.data);
            
            // Move back to undo stack
            this.undoStack.push(action);
            
            return result;
        }

        canUndo() {
            return !this.undoStack.isEmpty();
        }

        canRedo() {
            return !this.redoStack.isEmpty();
        }
    }

    // Example: Browser History Simulation
    class BrowserHistory {
        constructor() {
            this.history = new ArrayStack();
            this.currentPage = null;
        }

        visit(url) {
            if (this.currentPage) {
                this.history.push(this.currentPage);
            }
            this.currentPage = url;
        }

        back() {
            if (this.history.isEmpty()) {
                throw new Error('No previous page');
            }
            
            const previousPage = this.history.pop();
            this.currentPage = previousPage;
            return previousPage;
        }

        getCurrentPage() {
            return this.currentPage;
        }

        getHistorySize() {
            return this.history.size();
        }
    }

    return {
        UndoRedoSystem,
        BrowserHistory
    };
}

// ==========================================
// Min Stack Implementation
// ==========================================

class MinStack {
    constructor() {
        this.stack = new ArrayStack();
        this.minStack = new ArrayStack();
    }

    push(val) {
        this.stack.push(val);
        
        // Update min stack
        if (this.minStack.isEmpty() || val <= this.minStack.peek()) {
            this.minStack.push(val);
        }
    }

    pop() {
        if (this.stack.isEmpty()) {
            throw new Error('Stack is empty');
        }
        
        const popped = this.stack.pop();
        
        // Update min stack
        if (popped === this.minStack.peek()) {
            this.minStack.pop();
        }
        
        return popped;
    }

    top() {
        return this.stack.peek();
    }

    getMin() {
        if (this.minStack.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.minStack.peek();
    }
}

// ==========================================
// Practice Problems
// ==========================================

function practiceProblems() {
    
    // Problem 1: Implement queue using two stacks
    class QueueUsingStacks {
        constructor() {
            this.inStack = new ArrayStack();
            this.outStack = new ArrayStack();
        }

        enqueue(item) {
            this.inStack.push(item);
        }

        dequeue() {
            if (this.outStack.isEmpty()) {
                if (this.inStack.isEmpty()) {
                    throw new Error('Queue is empty');
                }
                
                // Transfer all elements from in to out
                while (!this.inStack.isEmpty()) {
                    this.outStack.push(this.inStack.pop());
                }
            }
            
            return this.outStack.pop();
        }

        peek() {
            if (this.outStack.isEmpty()) {
                if (this.inStack.isEmpty()) {
                    throw new Error('Queue is empty');
                }
                
                while (!this.inStack.isEmpty()) {
                    this.outStack.push(this.inStack.pop());
                }
            }
            
            return this.outStack.peek();
        }

        isEmpty() {
            return this.inStack.isEmpty() && this.outStack.isEmpty();
        }
    }

    // Problem 2: Decode string with nested brackets
    function decodeString(s) {
        const countStack = new ArrayStack();
        const stringStack = new ArrayStack();
        let currentString = '';
        let currentCount = 0;
        
        for (let char of s) {
            if (char >= '0' && char <= '9') {
                currentCount = currentCount * 10 + parseInt(char);
            } else if (char === '[') {
                countStack.push(currentCount);
                stringStack.push(currentString);
                currentCount = 0;
                currentString = '';
            } else if (char === ']') {
                const count = countStack.pop();
                const prevString = stringStack.pop();
                currentString = prevString + currentString.repeat(count);
            } else {
                currentString += char;
            }
        }
        
        return currentString;
    }

    // Problem 3: Remove duplicate letters (monotonic stack)
    function removeDuplicateLetters(s) {
        const stack = new ArrayStack();
        const inStack = new Set();
        const lastOccurrence = new Map();
        
        // Count last occurrence of each character
        for (let i = 0; i < s.length; i++) {
            lastOccurrence.set(s[i], i);
        }
        
        for (let i = 0; i < s.length; i++) {
            const char = s[i];
            
            if (inStack.has(char)) {
                continue;  // Skip if already in result
            }
            
            // Remove characters that are greater and appear later
            while (!stack.isEmpty() && 
                   stack.peek() > char && 
                   lastOccurrence.get(stack.peek()) > i) {
                const removed = stack.pop();
                inStack.delete(removed);
            }
            
            stack.push(char);
            inStack.add(char);
        }
        
        return stack.toArray().join('');
    }

    return {
        QueueUsingStacks,
        decodeString,
        removeDuplicateLetters
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    ArrayStack,
    LinkedListStack,
    MinStack,
    stackApplications: stackApplications(),
    stackAlgorithms: stackAlgorithms(),
    stackComparison: stackComparison(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. LIFO Principle:
 *    - What problems naturally fit stack's LIFO behavior?
 *    - How does call stack work in programming languages?
 *    - Why is stack perfect for recursive algorithm simulation?
 * 
 * 2. Implementation Choices:
 *    - Array vs Linked List implementation trade-offs
 *    - When would you choose each approach?
 *    - How does memory usage differ?
 * 
 * 3. Applications:
 *    - How do compilers use stacks for parsing?
 *    - Why are stacks essential for function calls?
 *    - How do undo/redo systems work?
 * 
 * 4. Problem Recognition:
 *    - How to identify when a problem needs a stack?
 *    - What patterns suggest stack usage?
 *    - When to use stack vs other data structures?
 */
