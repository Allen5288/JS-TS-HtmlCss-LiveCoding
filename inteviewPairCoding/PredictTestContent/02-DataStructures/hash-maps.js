/**
 * Hash Map (Hash Table) Data Structure Implementation
 * Focus: Understanding hash functions, collision handling, and when to use hash maps
 */

// ==========================================
// Simple Hash Map Implementation
// ==========================================

class SimpleHashMap {
    constructor(initialCapacity = 16) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        
        // Initialize buckets as arrays for chaining
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }

    // Simple hash function
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.capacity;
        }
        return hash;
    }

    // O(1) average case - Set key-value pair
    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;  // Update existing
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
        this.size++;
        
        // Resize if load factor gets too high
        if (this.size > this.capacity * 0.75) {
            this._resize();
        }
    }

    // O(1) average case - Get value by key
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        
        return undefined;
    }

    // O(1) average case - Check if key exists
    has(key) {
        return this.get(key) !== undefined;
    }

    // O(1) average case - Remove key-value pair
    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        
        return false;
    }

    // Get all keys
    keys() {
        const keys = [];
        for (let bucket of this.buckets) {
            for (let [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    // Get all values
    values() {
        const values = [];
        for (let bucket of this.buckets) {
            for (let [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    // Get all key-value pairs
    entries() {
        const entries = [];
        for (let bucket of this.buckets) {
            for (let pair of bucket) {
                entries.push([...pair]);
            }
        }
        return entries;
    }

    // Resize hash table when load factor gets too high
    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity);
        
        // Initialize new buckets
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        
        // Rehash all existing entries
        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Get load factor (for debugging)
    getLoadFactor() {
        return this.size / this.capacity;
    }
}

// ==========================================
// Hash Set Implementation
// ==========================================

class SimpleHashSet {
    constructor(initialCapacity = 16) {
        this.map = new SimpleHashMap(initialCapacity);
    }

    add(value) {
        this.map.set(value, true);
    }

    has(value) {
        return this.map.has(value);
    }

    delete(value) {
        return this.map.delete(value);
    }

    size() {
        return this.map.getSize();
    }

    values() {
        return this.map.keys();  // Keys in the map are our set values
    }

    clear() {
        this.map = new SimpleHashMap();
    }
}

// ==========================================
// Hash Function Examples
// ==========================================

function hashFunctionExamples() {
    
    // Simple hash (not great - many collisions)
    function simpleHash(str, tableSize) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash % tableSize;
    }

    // Better hash function (djb2)
    function djb2Hash(str, tableSize) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return Math.abs(hash) % tableSize;
    }

    // Polynomial rolling hash
    function polynomialHash(str, tableSize) {
        const prime = 31;
        let hash = 0;
        let pow = 1;
        
        for (let i = 0; i < str.length; i++) {
            hash = (hash + str.charCodeAt(i) * pow) % tableSize;
            pow = (pow * prime) % tableSize;
        }
        
        return hash;
    }

    // Test hash distribution
    function testHashDistribution(hashFunc, words, tableSize) {
        const distribution = new Array(tableSize).fill(0);
        
        for (let word of words) {
            const index = hashFunc(word, tableSize);
            distribution[index]++;
        }
        
        return {
            distribution,
            maxCollisions: Math.max(...distribution),
            minCollisions: Math.min(...distribution),
            emptyBuckets: distribution.filter(count => count === 0).length
        };
    }

    return {
        simpleHash,
        djb2Hash,
        polynomialHash,
        testHashDistribution
    };
}

// ==========================================
// Hash Map Applications
// ==========================================

function hashMapApplications() {
    
    // Frequency counter
    function characterFrequency(str) {
        const frequency = new Map();
        
        for (let char of str) {
            frequency.set(char, (frequency.get(char) || 0) + 1);
        }
        
        return frequency;
    }

    // Two Sum problem - O(n) with hash map
    function twoSum(nums, target) {
        const numToIndex = new Map();
        
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            
            if (numToIndex.has(complement)) {
                return [numToIndex.get(complement), i];
            }
            
            numToIndex.set(nums[i], i);
        }
        
        return [];
    }

    // Group anagrams
    function groupAnagrams(strs) {
        const groups = new Map();
        
        for (let str of strs) {
            // Sort characters to create key
            const key = str.split('').sort().join('');
            
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            
            groups.get(key).push(str);
        }
        
        return Array.from(groups.values());
    }

    // LRU Cache implementation using Map
    class LRUCache {
        constructor(capacity) {
            this.capacity = capacity;
            this.cache = new Map();
        }

        get(key) {
            if (this.cache.has(key)) {
                // Move to end (most recently used)
                const value = this.cache.get(key);
                this.cache.delete(key);
                this.cache.set(key, value);
                return value;
            }
            return -1;
        }

        put(key, value) {
            if (this.cache.has(key)) {
                // Update existing
                this.cache.delete(key);
            } else if (this.cache.size >= this.capacity) {
                // Remove least recently used (first item)
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            
            this.cache.set(key, value);
        }
    }

    // Check if two strings are anagrams
    function areAnagrams(str1, str2) {
        if (str1.length !== str2.length) return false;
        
        const charCount = new Map();
        
        // Count characters in first string
        for (let char of str1) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        
        // Subtract characters in second string
        for (let char of str2) {
            if (!charCount.has(char)) return false;
            
            const count = charCount.get(char) - 1;
            if (count === 0) {
                charCount.delete(char);
            } else {
                charCount.set(char, count);
            }
        }
        
        return charCount.size === 0;
    }

    // Find first non-repeating character
    function firstNonRepeatingChar(str) {
        const charCount = new Map();
        
        // Count all characters
        for (let char of str) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        
        // Find first with count 1
        for (let char of str) {
            if (charCount.get(char) === 1) {
                return char;
            }
        }
        
        return null;
    }

    return {
        characterFrequency,
        twoSum,
        groupAnagrams,
        LRUCache,
        areAnagrams,
        firstNonRepeatingChar
    };
}

// ==========================================
// Hash Map vs Other Data Structures
// ==========================================

function hashMapComparison() {
    /**
     * Hash Maps are best for:
     * ✅ Fast lookups by key (O(1) average)
     * ✅ Counting/frequency problems
     * ✅ Caching and memoization
     * ✅ Set operations (uniqueness)
     * 
     * Consider alternatives when:
     * ❌ Need sorted/ordered data (use TreeMap/sorted array)
     * ❌ Memory is very limited (arrays might be better)
     * ❌ Keys are integers in small range (use array)
     * ❌ Need worst-case O(1) guarantee (use array for known keys)
     */

    // Example: Phone book implementation
    class PhoneBookHashMap {
        constructor() {
            this.contacts = new Map();
        }

        addContact(name, phone) {
            this.contacts.set(name.toLowerCase(), phone);
        }

        findContact(name) {
            return this.contacts.get(name.toLowerCase()) || null;
        }

        removeContact(name) {
            return this.contacts.delete(name.toLowerCase());
        }

        getAllContacts() {
            return Array.from(this.contacts.entries());
        }
    }

    class PhoneBookArray {
        constructor() {
            this.contacts = [];  // Array of {name, phone} objects
        }

        addContact(name, phone) {
            // Check if exists first
            const existing = this.contacts.find(c => 
                c.name.toLowerCase() === name.toLowerCase()
            );
            
            if (existing) {
                existing.phone = phone;
            } else {
                this.contacts.push({ name: name.toLowerCase(), phone });
            }
        }

        findContact(name) {  // O(n) linear search
            const contact = this.contacts.find(c => 
                c.name === name.toLowerCase()
            );
            return contact ? contact.phone : null;
        }

        removeContact(name) {  // O(n) to find + O(n) to remove
            const index = this.contacts.findIndex(c => 
                c.name === name.toLowerCase()
            );
            
            if (index !== -1) {
                this.contacts.splice(index, 1);
                return true;
            }
            return false;
        }

        getAllContacts() {
            return this.contacts.slice();  // Copy array
        }
    }

    return {
        PhoneBookHashMap,
        PhoneBookArray
    };
}

// ==========================================
// Collision Handling Strategies
// ==========================================

function collisionHandling() {
    
    // Linear Probing (Open Addressing)
    class LinearProbingHashMap {
        constructor(capacity = 16) {
            this.capacity = capacity;
            this.size = 0;
            this.keys = new Array(capacity);
            this.values = new Array(capacity);
        }

        _hash(key) {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = (hash + key.charCodeAt(i) * i) % this.capacity;
            }
            return hash;
        }

        set(key, value) {
            if (this.size >= this.capacity * 0.5) {
                this._resize();
            }

            let index = this._hash(key);
            
            // Linear probing to find empty slot or existing key
            while (this.keys[index] !== undefined) {
                if (this.keys[index] === key) {
                    this.values[index] = value;  // Update existing
                    return;
                }
                index = (index + 1) % this.capacity;  // Move to next slot
            }
            
            // Found empty slot
            this.keys[index] = key;
            this.values[index] = value;
            this.size++;
        }

        get(key) {
            let index = this._hash(key);
            
            while (this.keys[index] !== undefined) {
                if (this.keys[index] === key) {
                    return this.values[index];
                }
                index = (index + 1) % this.capacity;
            }
            
            return undefined;
        }

        _resize() {
            const oldKeys = this.keys;
            const oldValues = this.values;
            
            this.capacity *= 2;
            this.size = 0;
            this.keys = new Array(this.capacity);
            this.values = new Array(this.capacity);
            
            for (let i = 0; i < oldKeys.length; i++) {
                if (oldKeys[i] !== undefined) {
                    this.set(oldKeys[i], oldValues[i]);
                }
            }
        }
    }

    // Double Hashing (another open addressing method)
    class DoubleHashingMap {
        constructor(capacity = 16) {
            this.capacity = capacity;
            this.size = 0;
            this.keys = new Array(capacity);
            this.values = new Array(capacity);
        }

        _hash1(key) {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = (hash + key.charCodeAt(i)) % this.capacity;
            }
            return hash;
        }

        _hash2(key) {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = (hash + key.charCodeAt(i) * (i + 1)) % this.capacity;
            }
            return hash === 0 ? 1 : hash;  // Ensure non-zero step size
        }

        set(key, value) {
            let index = this._hash1(key);
            const stepSize = this._hash2(key);
            
            while (this.keys[index] !== undefined) {
                if (this.keys[index] === key) {
                    this.values[index] = value;
                    return;
                }
                index = (index + stepSize) % this.capacity;
            }
            
            this.keys[index] = key;
            this.values[index] = value;
            this.size++;
        }
    }

    return {
        LinearProbingHashMap,
        DoubleHashingMap
    };
}

// ==========================================
// Practice Problems
// ==========================================

function practiceProblems() {
    
    // Problem 1: Longest substring without repeating characters
    function lengthOfLongestSubstring(s) {
        const charToIndex = new Map();
        let maxLength = 0;
        let start = 0;
        
        for (let end = 0; end < s.length; end++) {
            const char = s[end];
            
            if (charToIndex.has(char) && charToIndex.get(char) >= start) {
                start = charToIndex.get(char) + 1;
            }
            
            charToIndex.set(char, end);
            maxLength = Math.max(maxLength, end - start + 1);
        }
        
        return maxLength;
    }

    // Problem 2: Valid Sudoku using hash sets
    function isValidSudoku(board) {
        const rows = Array(9).fill().map(() => new Set());
        const cols = Array(9).fill().map(() => new Set());
        const boxes = Array(9).fill().map(() => new Set());
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const val = board[i][j];
                if (val === '.') continue;
                
                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                
                if (rows[i].has(val) || cols[j].has(val) || boxes[boxIndex].has(val)) {
                    return false;
                }
                
                rows[i].add(val);
                cols[j].add(val);
                boxes[boxIndex].add(val);
            }
        }
        
        return true;
    }

    // Problem 3: Design a data structure for insert, delete, getRandom in O(1)
    class RandomizedSet {
        constructor() {
            this.valueToIndex = new Map();  // value -> index in array
            this.values = [];               // array for O(1) random access
        }

        insert(val) {
            if (this.valueToIndex.has(val)) return false;
            
            this.values.push(val);
            this.valueToIndex.set(val, this.values.length - 1);
            return true;
        }

        remove(val) {
            if (!this.valueToIndex.has(val)) return false;
            
            const index = this.valueToIndex.get(val);
            const lastVal = this.values[this.values.length - 1];
            
            // Move last element to removed element's position
            this.values[index] = lastVal;
            this.valueToIndex.set(lastVal, index);
            
            // Remove last element
            this.values.pop();
            this.valueToIndex.delete(val);
            
            return true;
        }

        getRandom() {
            const randomIndex = Math.floor(Math.random() * this.values.length);
            return this.values[randomIndex];
        }
    }

    return {
        lengthOfLongestSubstring,
        isValidSudoku,
        RandomizedSet
    };
}

// ==========================================
// Export for testing
// ==========================================

module.exports = {
    SimpleHashMap,
    SimpleHashSet,
    hashFunctionExamples: hashFunctionExamples(),
    hashMapApplications: hashMapApplications(),
    hashMapComparison: hashMapComparison(),
    collisionHandling: collisionHandling(),
    practiceProblems: practiceProblems()
};

/**
 * Interview Discussion Points:
 * 
 * 1. Hash Function Quality:
 *    - What makes a good hash function?
 *    - How do collisions affect performance?
 *    - Why is uniform distribution important?
 * 
 * 2. Collision Resolution:
 *    - Chaining vs Open Addressing trade-offs
 *    - When would you choose each method?
 *    - How does load factor affect performance?
 * 
 * 3. Real-world Applications:
 *    - When would you use hash map vs array?
 *    - How do databases use hash tables?
 *    - What about memory caches?
 * 
 * 4. Performance Considerations:
 *    - Why is average case O(1) but worst case O(n)?
 *    - How do you maintain good performance?
 *    - When might you need guaranteed worst-case performance?
 */
