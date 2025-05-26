/**
 * Big-O Time Complexity Examples
 * Focus: Understanding how different operations scale with input size
 */

// ==========================================
// O(1) - Constant Time
// ==========================================
function constantTimeExample(arr) {
    // Accessing array element by index
    return arr[0]; // Always takes same time regardless of array size
}

function hashMapLookup(map, key) {
    // Hash map lookup is O(1) average case
    return map.get(key);
}

// Interview Discussion Points:
// - Why is array access O(1)?
// - What makes hash map lookup constant time?

// ==========================================
// O(log n) - Logarithmic Time
// ==========================================
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (sortedArr[mid] === target) {
            return mid;
        } else if (sortedArr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Interview Discussion Points:
// - Why is this O(log n)? -- each iteration halves the search space
// - What's the pattern of elimination? -- answer: we eliminate half of the elements each time
// - When would you use binary search? -- answer: when the array is sorted

// ==========================================
// O(n) - Linear Time
// ==========================================
function linearSearch(arr, target) {
    // Worst case: check every element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

function sumArray(arr) {
    let sum = 0;
    for (let num of arr) {  // Must visit each element once
        sum += num;
    }
    return sum;
}

// Interview Discussion Points:
// - Why can't we do better than O(n) for sum?
// - When is linear time acceptable?

// ==========================================
// O(n log n) - Linearithmic Time
// ==========================================
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));    // log n levels
    const right = mergeSort(arr.slice(mid));      // log n levels
    
    return merge(left, right);                     // O(n) merge at each level
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Interview Discussion Points:
// - Why is merge sort O(n log n)?
// - What's happening at each level of recursion?
// - Why is this better than O(n²) sorts?

// ==========================================
// O(n²) - Quadratic Time
// ==========================================
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {           // Outer loop: n iterations
        for (let j = 0; j < n - i - 1; j++) {   // Inner loop: n iterations
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

function findDuplicatesNaive(arr) {
    const duplicates = [];
    
    for (let i = 0; i < arr.length; i++) {      // n iterations
        for (let j = i + 1; j < arr.length; j++) { // n iterations
            if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
                duplicates.push(arr[i]);
            }
        }
    }
    
    return duplicates;
}

// Better O(n) solution for duplicates:
function findDuplicatesOptimal(arr) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (let num of arr) {  // Single pass: O(n)
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }
    
    return Array.from(duplicates);
}

// Interview Discussion Points:
// - Why is nested loop often O(n²)?
// - How did we optimize the duplicate finding?
// - When might O(n²) be acceptable?

// ==========================================
// Practical Time Complexity Analysis
// ==========================================

/**
 * Practice: Analyze the time complexity of this function
 * What's the Big-O? Why?
 */
function mysteryFunction(arr) {
    let result = 0;
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            result += arr[i] * arr[j];
        }
    }
    
    return result;
}
// Answer: O(n²) - nested loops, inner loop depends on outer loop

/**
 * Practice: What's the complexity here?
 */
function anotherMystery(n) {
    let count = 0;
    
    for (let i = 1; i < n; i *= 2) {  // How many times can we multiply by 2?
        count++;
    }
    
    return count;
}
// Answer: O(log n) - dividing problem space by 2 each iteration

// ==========================================
// Interview Scenarios
// ==========================================

/**
 * Scenario: You need to find if an array contains duplicates
 * Multiple approaches with different complexities
 */

// Approach 1: Brute Force - O(n²)
function hasDuplicatesBrute(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return true;
        }
    }
    return false;
}

// Approach 2: Sorting First - O(n log n)
function hasDuplicatesSort(arr) {
    arr.sort();  // O(n log n)
    for (let i = 1; i < arr.length; i++) {  // O(n)
        if (arr[i] === arr[i-1]) return true;
    }
    return false;
}

// Approach 3: Hash Set - O(n)
function hasDuplicatesHash(arr) {
    const seen = new Set();
    for (let num of arr) {  // O(n)
        if (seen.has(num)) return true;  // O(1)
        seen.add(num);  // O(1)
    }
    return false;
}

/**
 * Interview Discussion:
 * 1. Which approach would you choose and why?
 * 2. What are the trade-offs?
 * 3. What if memory is limited?
 * 4. What if the array is already sorted?
 */

module.exports = {
    constantTimeExample,
    binarySearch,
    linearSearch,
    mergeSort,
    bubbleSort,
    findDuplicatesNaive,
    findDuplicatesOptimal,
    hasDuplicatesBrute,
    hasDuplicatesSort,
    hasDuplicatesHash
};
