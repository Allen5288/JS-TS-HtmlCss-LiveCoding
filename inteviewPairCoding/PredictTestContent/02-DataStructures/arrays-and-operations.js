/**
 * Array Data Structure and Operations
 * Focus: Understanding when to use arrays and their performance characteristics
 */

// ==========================================
// Array Fundamentals
// ==========================================

class ArrayOperations {
    constructor() {
        this.data = [];
    }

    // O(1) - Access by index
    get(index) {
        if (index < 0 || index >= this.data.length) {
            throw new Error('Index out of bounds');
        }
        return this.data[index];
    }

    // O(1) - Update by index
    set(index, value) {
        if (index < 0 || index >= this.data.length) {
            throw new Error('Index out of bounds');
        }
        this.data[index] = value;
    }

    // O(1) - Add to end
    push(value) {
        this.data[this.data.length] = value;
        return this.data.length;
    }

    // O(1) - Remove from end
    pop() {
        if (this.data.length === 0) return undefined;
        
        const lastElement = this.data[this.data.length - 1];
        this.data.length = this.data.length - 1;
        return lastElement;
    }

    // O(n) - Add to beginning (must shift all elements)
    unshift(value) {
        for (let i = this.data.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = value;
        return this.data.length;
    }

    // O(n) - Remove from beginning (must shift all elements)
    shift() {
        if (this.data.length === 0) return undefined;
        
        const firstElement = this.data[0];
        for (let i = 0; i < this.data.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.data.length = this.data.length - 1;
        return firstElement;
    }

    // O(n) - Insert at arbitrary position
    insertAt(index, value) {
        if (index < 0 || index > this.data.length) {
            throw new Error('Index out of bounds');
        }

        // Shift elements to the right
        for (let i = this.data.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        
        this.data[index] = value;
        return this.data.length;
    }

    // O(n) - Remove from arbitrary position
    removeAt(index) {
        if (index < 0 || index >= this.data.length) {
            throw new Error('Index out of bounds');
        }

        const removedElement = this.data[index];
        
        // Shift elements to the left
        for (let i = index; i < this.data.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        
        this.data.length = this.data.length - 1;
        return removedElement;
    }

    // O(n) - Linear search
    indexOf(value) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === value) {
                return i;
            }
        }
        return -1;
    }

    // O(n) - Check if value exists
    contains(value) {
        return this.indexOf(value) !== -1;
    }

    size() {
        return this.data.length;
    }

    isEmpty() {
        return this.data.length === 0;
    }

    toArray() {
        return [...this.data];
    }
}

// ==========================================
// Array Algorithms and Patterns
// ==========================================

/**
 * Two Pointers Technique
 * Common for array problems
 */
function twoPointersExamples() {
    
    // Remove duplicates from sorted array - O(n) time, O(1) space
    function removeDuplicates(nums) {
        if (nums.length === 0) return 0;
        
        let writeIndex = 1;  // Where to write next unique element
        
        for (let readIndex = 1; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] !== nums[readIndex - 1]) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        return writeIndex;  // New length
    }

    // Reverse array in place - O(n) time, O(1) space
    function reverseArray(arr) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
        
        return arr;
    }

    // Check if array is palindrome - O(n) time, O(1) space
    function isPalindrome(arr) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left < right) {
            if (arr[left] !== arr[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }

    return {
        removeDuplicates,
        reverseArray,
        isPalindrome
    };
}

/**
 * Sliding Window Technique
 * Useful for subarray problems
 */
function slidingWindowExamples() {
    
    // Maximum sum of k consecutive elements
    function maxSumSubarray(arr, k) {
        if (arr.length < k) return null;
        
        // Calculate sum of first window
        let windowSum = 0;
        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        let maxSum = windowSum;
        
        // Slide the window
        for (let i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];  // Remove left, add right
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }

    // Find average of all subarrays of size k
    function findAverages(arr, k) {
        const averages = [];
        let windowSum = 0;
        
        // First window
        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        averages.push(windowSum / k);
        
        // Sliding windows
        for (let i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            averages.push(windowSum / k);
        }
        
        return averages;
    }

    return {
        maxSumSubarray,
        findAverages
    };
}

// ==========================================
// Array vs Other Data Structures
// ==========================================

function arrayTradeOffs() {
    /**
     * When to use Arrays:
     * ✅ Need random access by index
     * ✅ Cache-friendly sequential access
     * ✅ Memory-efficient (no extra pointers)
     * ✅ Simple iteration
     * 
     * When NOT to use Arrays:
     * ❌ Frequent insertions/deletions in middle
     * ❌ Unknown or highly variable size
     * ❌ Need fast search in unsorted data
     */

    // Example: Array vs Set for duplicate checking
    function findDuplicatesArray(arr) {
        // O(n²) time, O(1) space
        const duplicates = [];
        
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
                    duplicates.push(arr[i]);
                }
            }
        }
        
        return duplicates;
    }

    function findDuplicatesSet(arr) {
        // O(n) time, O(n) space
        const seen = new Set();
        const duplicates = new Set();
        
        for (let num of arr) {
            if (seen.has(num)) {
                duplicates.add(num);
            } else {
                seen.add(num);
            }
        }
        
        return Array.from(duplicates);
    }

    return {
        findDuplicatesArray,
        findDuplicatesSet
    };
}

// ==========================================
// Dynamic Array Implementation
// ==========================================

class DynamicArray {
    constructor(initialCapacity = 4) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.data = new Array(this.capacity);
    }

    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        return this.data[index];
    }

    set(index, value) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        this.data[index] = value;
    }

    push(value) {
        if (this.size >= this.capacity) {
            this._resize();
        }
        
        this.data[this.size] = value;
        this.size++;
    }

    pop() {
        if (this.size === 0) return undefined;
        
        const lastElement = this.data[this.size - 1];
        this.size--;
        
        // Shrink if too much unused space
        if (this.size <= this.capacity / 4 && this.capacity > 4) {
            this._shrink();
        }
        
        return lastElement;
    }

    _resize() {
        // Double the capacity
        const oldData = this.data;
        this.capacity *= 2;
        this.data = new Array(this.capacity);
        
        // Copy old elements
        for (let i = 0; i < this.size; i++) {
            this.data[i] = oldData[i];
        }
    }

    _shrink() {
        // Halve the capacity
        const oldData = this.data;
        this.capacity = Math.floor(this.capacity / 2);
        this.data = new Array(this.capacity);
        
        // Copy elements
        for (let i = 0; i < this.size; i++) {
            this.data[i] = oldData[i];
        }
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.capacity;
    }
}

// ==========================================
// Interview Questions Practice
// ==========================================

function practiceProblems() {
    
    // Problem 1: Rotate array to the right by k steps
    function rotateArray(nums, k) {
        const n = nums.length;
        k = k % n;  // Handle k > n
        
        // Method 1: Using extra space O(n)
        const result = new Array(n);
        for (let i = 0; i < n; i++) {
            result[(i + k) % n] = nums[i];
        }
        
        // Copy back
        for (let i = 0; i < n; i++) {
            nums[i] = result[i];
        }
        
        return nums;
    }

    // Problem 2: Find maximum product of two numbers
    function maxProduct(nums) {
        let max1 = -Infinity, max2 = -Infinity;
        let min1 = Infinity, min2 = Infinity;
        
        for (let num of nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        
        return Math.max(max1 * max2, min1 * min2);
    }

    // Problem 3: Move all zeros to end
    function moveZeros(nums) {
        let writeIndex = 0;
        
        // Move all non-zero elements to the front
        for (let readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] !== 0) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        // Fill remaining positions with zeros
        while (writeIndex < nums.length) {
            nums[writeIndex] = 0;
            writeIndex++;
        }
        
        return nums;
    }

    return {
        rotateArray,
        maxProduct,
        moveZeros
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    ArrayOperations,
    DynamicArray,
    twoPointersExamples: twoPointersExamples(),
    slidingWindowExamples: slidingWindowExamples(),
    arrayTradeOffs: arrayTradeOffs(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. Array Access Patterns:
 *    - Why is random access O(1)?
 *    - What makes arrays cache-friendly?
 *    - When would you choose array over linked list?
 * 
 * 2. Dynamic Resizing:
 *    - Why do we double capacity instead of adding fixed amount?
 *    - What's the amortized complexity of push operations?
 *    - When should we shrink the array?
 * 
 * 3. Memory Layout:
 *    - How are arrays stored in memory?
 *    - What's the memory overhead compared to linked lists?
 *    - Why are arrays more cache-efficient?
 * 
 * 4. Common Patterns:
 *    - When would you use two pointers?
 *    - What problems benefit from sliding window?
 *    - How to recognize when array is the right choice?
 */
