# Communication Templates for Technical Interviews

## Problem-Solving Framework

### 1. Understanding the Problem (2-3 minutes)
```
"Let me make sure I understand the problem correctly..."

Questions to ask:
- What are the inputs and expected outputs?
- Are there any constraints on input size or values?
- What edge cases should I consider?
- Are there any performance requirements?
- Can I assume the input is valid?

Example:
"So I need to find two numbers in an array that sum to a target value. 
The array can contain duplicates, and I should return the indices. 
Are there always exactly two numbers that sum to the target, or should I handle cases where no solution exists?"
```

### 2. Initial Approach (3-5 minutes)
```
"I can think of a few approaches to solve this..."

Template:
- "The most straightforward approach would be [brute force solution]"
- "This would have [time complexity] and [space complexity]"
- "A more optimized approach might be [better solution]"
- "Let me start with the simpler approach and then optimize"

Example:
"The brute force approach would be to check every pair of numbers - that's O(n²) time but O(1) space. 
A better approach would be to use a hash map to store numbers we've seen, giving us O(n) time and O(n) space. 
I'll implement the hash map solution since it's more efficient."
```

### 3. Implementation Planning (2-3 minutes)
```
"Before I start coding, let me outline my approach..."

Steps to verbalize:
1. What data structures will I use?
2. What's my main algorithm loop?
3. How will I handle edge cases?
4. What variables do I need?

Example:
"I'll use a hash map to store each number and its index as I iterate through the array. 
For each number, I'll calculate its complement and check if it's already in the map. 
If it is, I'll return both indices. If not, I'll add the current number to the map."
```

### 4. Coding Phase (15-20 minutes)
```
"Now I'll implement this solution..."

While coding:
- Explain what each line does
- Mention any assumptions you're making
- Point out potential edge cases as you encounter them
- If you make a mistake, acknowledge it and fix it

Example:
"I'm creating a new Map to store our numbers...
Now I'm iterating through the array with a for loop...
For each number, I calculate target minus current number - this is what I'm looking for...
I check if this complement exists in our map...
If it does, great! I return the stored index and current index..."
```

### 5. Testing and Validation (3-5 minutes)
```
"Let me trace through this with an example..."

Testing approach:
- Walk through with the given example
- Test an edge case
- Verify the complexity analysis

Example:
"With array [2,7,11,15] and target 9:
- i=0, num=2, complement=7, map is empty, so add 2
- i=1, num=7, complement=2, found 2 in map at index 0, return [0,1]
This looks correct. Let me also check the edge case where no solution exists..."
```

## Data Structure Discussion Templates

### When asked "Why did you choose this data structure?"

#### Hash Map/Dictionary
```
"I chose a hash map because:
- I need O(1) average lookup time
- The order of elements doesn't matter for this problem
- I'm doing key-based lookups frequently
- The trade-off of O(n) space for O(1) time is worth it here"
```

#### Array/List
```
"I chose an array because:
- I need indexed access to elements
- Memory usage is a concern (no pointer overhead)
- I'm mostly reading data, not inserting/deleting
- Cache locality will help with performance"
```

#### Stack
```
"I chose a stack because:
- This problem has a Last-In-First-Out pattern
- I need to track nested structures (like parentheses)
- I'm doing backtracking or undo operations
- The most recent item is always the most relevant"
```

#### Queue
```
"I chose a queue because:
- This problem processes items in First-In-First-Out order
- I'm doing a breadth-first search
- I'm modeling a real-world queue (like task processing)
- Order of processing matters"
```

#### Heap/Priority Queue
```
"I chose a heap because:
- I need to repeatedly find the minimum/maximum element
- I don't need random access to middle elements
- Insertion and extraction are both important operations
- I'm solving a problem involving 'top K' elements"
```

## Complexity Analysis Templates

### Time Complexity Discussion
```
"For time complexity:
- The outer loop runs n times
- Inside the loop, [operation] takes [complexity] time
- So overall time complexity is [final complexity]

I could optimize this by [optimization approach], which would give us [better complexity]"
```

### Space Complexity Discussion
```
"For space complexity:
- I'm using [data structure] that stores up to [amount] elements
- Each element takes [space] storage
- So space complexity is [final complexity]

The space trade-off here is worth it because [justification]"
```

## Problem-Solving Communication Tips

### When Stuck
```
"I'm thinking through this problem... Let me approach it differently"
"Can I simplify this by considering a smaller example first?"
"What if I work backwards from the solution?"
"Let me think about what data structure properties I really need"
```

### When Making Trade-offs
```
"I see two approaches here:
- Approach A: [pros and cons]
- Approach B: [pros and cons]
I'll go with Approach A because [specific reason for this problem]"
```

### When Optimizing
```
"This solution works, but I notice [bottleneck/inefficiency]
I could improve this by [optimization]
The trade-off would be [cost] for [benefit]
Given the problem constraints, I think this optimization is [worth it/not needed]"
```

### When Handling Edge Cases
```
"I should consider edge cases:
- What if the input is empty?
- What if there's only one element?
- What about duplicate values?
- What if no solution exists?

For this problem, [edge case] would be handled by [solution]"
```

## Common Interview Scenarios

### "Can you optimize this further?"
```
"Let me analyze the current solution:
- Time: [current complexity] 
- Space: [current complexity]

To optimize time, I could [approach] but that would increase space to [new space]
To optimize space, I could [approach] but that would increase time to [new time]

Given typical constraints for this problem, I think [chosen optimization] makes the most sense because [reasoning]"
```

### "How would this scale with larger inputs?"
```
"With larger inputs:
- Current approach: [scaling characteristics]
- Memory usage would: [growth pattern]
- Performance bottlenecks would likely be: [specific areas]

For production systems, I'd consider:
- [scaling strategy 1]
- [scaling strategy 2]
- [monitoring/optimization approach]"
```

### "How would you test this?"
```
"I'd test this with:
1. Basic functionality: [normal test cases]
2. Edge cases: [boundary conditions]
3. Error cases: [invalid inputs]
4. Performance: [large inputs]
5. Integration: [how it fits with other components]"
```

## Final Presentation Template

### Wrapping Up Your Solution
```
"To summarize my solution:
- Algorithm: [brief description]
- Time Complexity: [complexity with brief justification]
- Space Complexity: [complexity with brief justification]
- Key insights: [main algorithmic insights]
- Trade-offs: [what we optimized for and why]

This solution handles [edge cases] and should perform well for [typical use cases]"
```

## Practice Phrases

### Starting Strong
- "Let me make sure I understand the requirements..."
- "I can think of a few different approaches here..."
- "Let me start with the simplest solution and then optimize..."

### During Implementation
- "I'm using [data structure] here because..."
- "This line handles the case where..."
- "I need to be careful about [edge case] here..."

### When Explaining Complexity
- "The bottleneck in this algorithm is..."
- "This gives us [complexity] because..."
- "The trade-off here is [space] for [time]..."

### Showing Problem-Solving Skills
- "Actually, let me reconsider this approach..."
- "I realize there's a more efficient way to do this..."
- "This edge case makes me think I should..."

Remember: The goal is to show your thought process, not just arrive at the correct answer. Think out loud, explain your reasoning, and don't be afraid to discuss trade-offs and alternative approaches!
