# Livewire Markets Interview Questions & Practice

## Core Data Structure Questions

### Arrays and String Manipulation

#### 1. Two Sum Problem
**Question:** Given an array of integers and a target sum, find two numbers that add up to the target.

**Discussion Points:**
- Brute force vs hash map approach
- Time/space complexity trade-offs
- How to handle duplicates
- What if no solution exists?

**Expected Complexity:** O(n) time, O(n) space

**Follow-up:** What if the array is sorted? (Two pointers approach)

---

#### 2. Maximum Subarray Sum (Kadane's Algorithm)
**Question:** Find the contiguous subarray with the largest sum.

**Discussion Points:**
- Why does Kadane's algorithm work?
- How to track the actual subarray (not just sum)
- Edge cases: all negative numbers
- Real-world applications

**Expected Complexity:** O(n) time, O(1) space

---

#### 3. Merge Sorted Arrays
**Question:** Merge two sorted arrays into one sorted array.

**Discussion Points:**
- In-place vs extra space approaches
- Two-pointer technique
- How to handle different array sizes
- Stability of the merge

**Expected Complexity:** O(m + n) time, O(1) space for in-place

---

### Linked Lists

#### 4. Reverse a Linked List
**Question:** Reverse a singly linked list iteratively and recursively.

**Discussion Points:**
- Iterative vs recursive approaches
- Space complexity differences
- How to handle empty list or single node
- Stack overflow considerations for recursion

**Expected Complexity:** O(n) time, O(1) space iterative / O(n) space recursive

---

#### 5. Detect Cycle in Linked List
**Question:** Determine if a linked list has a cycle.

**Discussion Points:**
- Floyd's cycle detection algorithm (tortoise and hare)
- Why does the algorithm work?
- How to find the start of the cycle
- Space-efficient solutions

**Expected Complexity:** O(n) time, O(1) space

---

#### 6. Merge Two Sorted Linked Lists
**Question:** Merge two sorted linked lists into one sorted list.

**Discussion Points:**
- Recursive vs iterative approaches
- Dummy node technique
- Memory management considerations
- How this relates to merge sort

**Expected Complexity:** O(m + n) time, O(1) space iterative

---

### Hash Maps and Sets

#### 7. First Non-Repeating Character
**Question:** Find the first character in a string that doesn't repeat.

**Discussion Points:**
- Hash map for counting vs two-pass solution
- One-pass vs two-pass approaches
- Character encoding considerations
- Time/space trade-offs

**Expected Complexity:** O(n) time, O(1) space (limited character set)

---

#### 8. Group Anagrams
**Question:** Group an array of strings into anagrams.

**Discussion Points:**
- Sorting vs character counting for anagram detection
- Hash map key design
- How to handle edge cases (empty strings)
- Performance with large datasets

**Expected Complexity:** O(n * m log m) time where m is average string length

---

#### 9. Longest Substring Without Repeating Characters
**Question:** Find the length of the longest substring without repeating characters.

**Discussion Points:**
- Sliding window technique
- Hash set vs hash map approaches
- How to optimize the window movement
- Character encoding considerations

**Expected Complexity:** O(n) time, O(min(m,n)) space where m is character set size

---

### Stacks and Queues

#### 10. Valid Parentheses
**Question:** Determine if a string of brackets is properly balanced.

**Discussion Points:**
- Why stack is the natural choice
- How to handle different bracket types
- Early termination optimizations
- Real-world applications (compilers, editors)

**Expected Complexity:** O(n) time, O(n) space

---

#### 11. Implement Queue Using Stacks
**Question:** Implement a queue data structure using only stacks.

**Discussion Points:**
- Two-stack approach
- Amortized time complexity analysis
- When to transfer elements between stacks
- Trade-offs vs native queue implementation

**Expected Complexity:** O(1) amortized for enqueue and dequeue

---

#### 12. Daily Temperatures
**Question:** Given daily temperatures, find how many days until a warmer temperature.

**Discussion Points:**
- Monotonic stack concept
- Why stack works for this "next greater element" pattern
- How to store indices vs values
- Applications in financial data (next higher price)

**Expected Complexity:** O(n) time, O(n) space

---

### Trees and Heaps

#### 13. Binary Tree Level Order Traversal
**Question:** Return the level order traversal of a binary tree.

**Discussion Points:**
- BFS using queue
- How to separate levels
- Recursive vs iterative approaches
- Memory usage considerations

**Expected Complexity:** O(n) time, O(w) space where w is maximum width

---

#### 14. Find K Largest Elements
**Question:** Find the k largest elements in an array.

**Discussion Points:**
- Min heap vs max heap approach
- Heap vs sorting vs quickselect
- Space-time trade-offs for different k values
- Streaming data considerations

**Expected Complexity:** O(n log k) time, O(k) space using min heap

---

#### 15. Running Median
**Question:** Design a data structure to find the median of a stream of numbers.

**Discussion Points:**
- Two-heap approach (max heap + min heap)
- How to balance the heaps
- Alternative approaches (sorted array, BST)
- Real-world applications (financial data, monitoring)

**Expected Complexity:** O(log n) insertion, O(1) median retrieval

---

## System Design Questions

### 16. Design a Cache System
**Question:** Design an LRU (Least Recently Used) cache.

**Discussion Points:**
- Hash map + doubly linked list approach
- Why this combination is optimal
- Thread safety considerations
- Cache eviction policies
- Performance under different access patterns

**Expected Operations:** O(1) get, O(1) put

---

### 17. Design a Rate Limiter
**Question:** Design a system to limit API requests per user.

**Discussion Points:**
- Different algorithms (token bucket, sliding window)
- Data structures for each approach
- Distributed rate limiting
- Storage backend considerations
- Handling burst traffic

**Approaches:** Token bucket (queue), sliding window (circular buffer)

---

### 18. Design a URL Shortener
**Question:** Design a system like bit.ly for shortening URLs.

**Discussion Points:**
- Hash map for URL mapping
- Base62 encoding for short URLs
- Database vs in-memory storage
- Handling collisions
- Analytics and click tracking

**Core Data Structures:** Hash map, counters, possibly bloom filters

---

## Algorithm Design Questions

### 19. Meeting Room Scheduler
**Question:** Given meeting times, determine if a person can attend all meetings.

**Discussion Points:**
- Sorting intervals
- Interval overlap detection
- Follow-up: minimum meeting rooms needed (heap)
- Real-world scheduling applications

**Expected Complexity:** O(n log n) time for sorting

---

### 20. Stock Trading Problems
**Question:** Given stock prices over time, maximize profit from buying/selling.

**Discussion Points:**
- Single transaction vs multiple transactions
- State machine approach
- When to use greedy vs dynamic programming
- Real-world trading constraints

**Variants:** Best time to buy/sell stock I, II, with cooldown, with transaction fee

---

## Communication and Problem-Solving Questions

### 21. Explain Big-O Notation
**Question:** Explain Big-O notation and give examples of different complexities.

**Discussion Points:**
- What Big-O represents (worst-case, asymptotic)
- Common complexities with examples
- Why we care about asymptotic analysis
- Best case vs average case vs worst case

**Examples:** O(1) - hash lookup, O(log n) - binary search, O(n) - linear search, etc.

---

### 22. When to Use Each Data Structure
**Question:** Given a scenario, choose the appropriate data structure.

**Scenarios to Discuss:**
- Undo functionality in text editor (Stack)
- Print job queue (Queue)
- Phone book lookup (Hash Map)
- Autocomplete suggestions (Trie)
- Finding shortest path (Graph + Queue/Priority Queue)

---

### 23. Optimize This Code
**Question:** Given a working but inefficient solution, optimize it.

**Example:** Nested loop solution for finding duplicates
```javascript
// O(n²) solution
function findDuplicates(arr) {
    const duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                duplicates.push(arr[i]);
            }
        }
    }
    return duplicates;
}
```

**Discussion Points:**
- How to identify bottlenecks
- Data structure improvements (use Set/Map)
- Space-time trade-offs
- When optimization is worth it

---

## Practice Interview Flow

### Sample 45-minute Interview Structure:

**Minutes 0-5:** Introduction and problem presentation
- Clarify requirements
- Ask about constraints
- Discuss expected input/output

**Minutes 5-10:** Solution planning
- Discuss approaches
- Analyze time/space complexity
- Choose optimal approach

**Minutes 10-30:** Implementation
- Code the solution
- Explain each step
- Handle edge cases

**Minutes 30-40:** Testing and optimization
- Trace through examples
- Discuss optimizations
- Handle follow-up questions

**Minutes 40-45:** Wrap-up and questions
- Summarize solution
- Discuss scalability
- Ask questions about the role/company

---

## Practice Problems by Difficulty

### Easy (Good for warming up)
1. Two Sum
2. Valid Parentheses
3. Merge Two Sorted Lists
4. Maximum Subarray
5. Best Time to Buy and Sell Stock

### Medium (Core interview level)
1. Group Anagrams
2. Longest Substring Without Repeating Characters
3. Daily Temperatures
4. LRU Cache
5. Meeting Rooms II

### Advanced (Senior/Staff level)
1. Running Median
2. Design Rate Limiter
3. Serialize/Deserialize Binary Tree
4. Word Search II
5. Design Search Autocomplete System

---

## Red Flags to Avoid

### During Problem Solving:
- ❌ Starting to code immediately without understanding
- ❌ Not considering edge cases
- ❌ Not explaining your thought process
- ❌ Getting stuck and going silent
- ❌ Not testing your solution

### During Communication:
- ❌ Being overly confident without justification
- ❌ Dismissing interviewer hints
- ❌ Not asking clarifying questions
- ❌ Focusing only on algorithmic tricks
- ❌ Not discussing trade-offs

### Technical Mistakes:
- ❌ Not analyzing time/space complexity
- ❌ Choosing inappropriate data structures
- ❌ Ignoring memory management
- ❌ Over-engineering simple solutions
- ❌ Not considering system constraints

---

## Success Indicators

### What Interviewers Look For:
- ✅ Clear problem understanding
- ✅ Systematic approach to solution
- ✅ Good data structure choices
- ✅ Clean, readable code
- ✅ Proper complexity analysis
- ✅ Edge case consideration
- ✅ Good communication throughout
- ✅ Ability to optimize and iterate
- ✅ Testing mindset
- ✅ Real-world application understanding

Remember: It's not just about getting the right answer, but demonstrating how you think about and solve technical problems!
