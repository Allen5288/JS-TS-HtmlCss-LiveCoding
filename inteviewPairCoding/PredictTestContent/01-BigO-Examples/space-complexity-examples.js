/**
 * Big-O Space Complexity Examples
 * Focus: Understanding how memory usage scales with input size
 */

// ==========================================
// O(1) - Constant Space
// ==========================================

function constantSpaceSum(arr) {
    let sum = 0;  // Only one variable, regardless of input size
    
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];  // Reusing the same variable
    }
    
    return sum;
}

function constantSpaceMax(arr) {
    if (arr.length === 0) return null;
    
    let max = arr[0];  // Single variable
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];  // Updating same variable
        }
    }
    
    return max;
}

// Interview Discussion Points:
// - Why is this O(1) space even though we process n elements?
// - What variables are we tracking?

// ==========================================
// O(n) - Linear Space
// ==========================================

function linearSpaceCopy(arr) {
    const copy = [];  // New array grows with input size
    
    for (let i = 0; i < arr.length; i++) {
        copy.push(arr[i]);
    }
    
    return copy;  // Space used: n elements
}

function createFrequencyMap(arr) {
    const frequency = new Map();  // In worst case, all elements unique = n entries
    
    for (let element of arr) {
        frequency.set(element, (frequency.get(element) || 0) + 1);
    }
    
    return frequency;
}

function reverseArray(arr) {
    const reversed = [];  // New array of size n
    
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    
    return reversed;
}

// Interview Discussion Points:
// - When do we need O(n) space?
// - Could we reverse in-place for O(1) space?

// ==========================================
// O(log n) - Logarithmic Space
// ==========================================

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Each recursive call adds to call stack
    // Maximum depth = log n levels
    
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Compare with iterative version (O(1) space):
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {  // No recursion = no additional stack space
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Interview Discussion Points:
// - Why does recursion add space complexity?
// - How many function calls are on the stack?
// - When would you choose recursive vs iterative?

// ==========================================
// O(n²) - Quadratic Space
// ==========================================

function create2DArray(n) {
    const matrix = [];  // Array of arrays
    
    for (let i = 0; i < n; i++) {
        matrix[i] = [];  // Each row is an array of size n
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i * j;
        }
    }
    
    return matrix;  // Total space: n × n = n²
}

function findAllPairs(arr) {
    const pairs = [];  // Could be up to n² pairs
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    
    return pairs;
}

// Interview Discussion Points:
// - When might you need quadratic space?
// - How could you avoid storing all pairs?

// ==========================================
// Recursive Space Complexity Examples
// ==========================================

function factorialRecursive(n) {
    // Call stack depth = n
    // Each call stores: n, return address
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);  // O(n) space due to call stack
}

function factorialIterative(n) {
    // Only stores result variable
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;  // O(1) space
}

function fibonacciRecursiveNaive(n) {
    // Exponential time AND space due to overlapping subproblems
    if (n <= 1) return n;
    return fibonacciRecursiveNaive(n - 1) + fibonacciRecursiveNaive(n - 2);
}

function fibonacciMemoized(n, memo = {}) {
    // O(n) space for memoization table
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

function fibonacciIterative(n) {
    // O(1) space - only track last two values
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

// ==========================================
// Space vs Time Trade-offs
// ==========================================

/**
 * Scenario: Find two numbers in array that sum to target
 */

// Approach 1: Brute Force - O(1) space, O(n²) time
function twoSumBruteForce(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Approach 2: Hash Map - O(n) space, O(n) time
function twoSumHashMap(nums, target) {
    const numToIndex = new Map();  // Extra space for hash map
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numToIndex.has(complement)) {
            return [numToIndex.get(complement), i];
        }
        
        numToIndex.set(nums[i], i);
    }
    
    return [];
}

/**
 * Interview Discussion:
 * 1. Which approach uses more memory? Why? -- Hash map uses O(n) space, brute force uses O(1).
 * 2. Which is faster? Why? -- Hash map is O(n) time, brute force is O(n²).
 * 3. When would you choose each approach? -- Brute force is simple, but inefficient for large arrays. Hash map is efficient but uses extra space.
 * 4. What if memory is very limited? -- Consider using the brute force approach or optimizing the hash map.
 * 5. What if the array is huge but you need multiple queries? -- Use the hash map to store results and avoid recomputation.
 */

// ==========================================
// In-Place vs Extra Space Examples
// ==========================================

// In-place reversal (O(1) space)
function reverseArrayInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap elements
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;  // Modified original array
}

// Extra space reversal (O(n) space)
function reverseArrayExtraSpace(arr) {
    const result = [];
    
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    
    return result;  // New array, original unchanged
}

/**
 * Interview Discussion:
 * 1. When would you modify the original array?
 * 2. When would you create a new array?
 * 3. What are the trade-offs?
 */

// ==========================================
// Practice Problems
// ==========================================

/**
 * Analyze space complexity:
 * What's the space complexity of this function?
 */
function mysterySpaceFunction(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mysterySpaceFunction(arr.slice(0, mid));
    const right = mysterySpaceFunction(arr.slice(mid));
    
    return left.concat(right);
}
// Answer: O(n log n) - each level creates new arrays, log n levels

/**
 * How can we optimize this for space?
 */
function findUniqueElements(arr) {
    const result = [];
    const frequency = {};
    
    // Count frequencies
    for (let element of arr) {
        frequency[element] = (frequency[element] || 0) + 1;
    }
    
    // Find unique elements
    for (let element in frequency) {
        if (frequency[element] === 1) {
            result.push(element);
        }
    }
    
    return result;
}
// Current: O(n) space for both frequency map and result array
// Optimization ideas: Single pass? Different data structure?

module.exports = {
    constantSpaceSum,
    linearSpaceCopy,
    binarySearchRecursive,
    binarySearchIterative,
    factorialRecursive,
    factorialIterative,
    fibonacciIterative,
    twoSumBruteForce,
    twoSumHashMap,
    reverseArrayInPlace,
    reverseArrayExtraSpace
};
