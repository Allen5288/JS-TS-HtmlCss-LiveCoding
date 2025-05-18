# LRU Cache (Least Recently Used Cache)

## What is an LRU Cache?

An LRU (Least Recently Used) Cache is a data structure that maintains a fixed-size collection of items, discarding the least recently used item when the cache reaches its capacity limit and a new item needs to be added.

## Key Characteristics

- **Fixed Capacity**: LRU cache has a predefined maximum size.
- **Fast Access**: Operations like get and put should ideally have O(1) time complexity.
- **Eviction Policy**: When full, removes the least recently used items first.

## Operations

- **Get(key)**: Retrieves an item from the cache by key. If found, marks it as recently used.
- **Put(key, value)**: Adds or updates an item. If cache is full, removes the least recently used item first.

## Implementation Approach

An efficient LRU Cache implementation typically combines:

1. **HashMap/Object**: For O(1) key-value lookups
2. **Doubly Linked List**: To track usage order and enable O(1) removal/insertion

## JavaScript Implementation

### Using Built-in JavaScript Map

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map preserves insertion order
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Remove & re-add to make it most recently used
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }
  
  put(key, value) {
    // If key exists, remove it first
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } 
    // If at capacity, remove least recently used item (first item in map)
    else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    // Add new key-value pair (will be at the end, marking it as most recently used)
    this.cache.set(key, value);
  }
}
```

### Custom Implementation with Doubly Linked List

```javascript
class DLLNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // maps key to node
    
    // Initialize dummy head and tail
    this.head = new DLLNode(0, 0);
    this.tail = new DLLNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  // Helper: move node to the end (most recently used)
  moveToEnd(node) {
    this.removeNode(node);
    this.addToEnd(node);
  }
  
  // Helper: remove node from current position
  removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }
  
  // Helper: add node to end (before tail)
  addToEnd(node) {
    const prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const node = this.cache.get(key);
    this.moveToEnd(node);
    return node.value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToEnd(node);
      return;
    }
    
    if (this.cache.size >= this.capacity) {
      // Remove least recently used (the one after head)
      const lruNode = this.head.next;
      this.removeNode(lruNode);
      this.cache.delete(lruNode.key);
    }
    
    const newNode = new DLLNode(key, value);
    this.addToEnd(newNode);
    this.cache.set(key, newNode);
  }
}
```

## Time and Space Complexity

### Time Complexity

- **Get**: O(1) - Constant time for hashmap lookup, and for moving item to most recently used position
- **Put**: O(1) - Constant time for insertion and potential eviction

### Space Complexity

- O(capacity) - Stores at most 'capacity' key-value pairs

## Applications

1. **Browser Cache**: Storing recently visited webpages
2. **Database Query Cache**: Storing results of recent queries
3. **Application-Level Caching**: Storing computation results
4. **Operating Systems**: Page replacement algorithms
5. **React's Memorization**: LRU-style cache for optimizing render performance

## Example Usage

```javascript
const cache = new LRUCache(2);

cache.put(1, 1);           // Cache: {1=1}
cache.put(2, 2);           // Cache: {1=1, 2=2}
console.log(cache.get(1)); // returns 1, Cache: {2=2, 1=1}
cache.put(3, 3);           // Cache full, evicts key 2, Cache: {1=1, 3=3}
console.log(cache.get(2)); // returns -1 (not found)
cache.put(4, 4);           // Cache full, evicts key 1, Cache: {3=3, 4=4}
console.log(cache.get(1)); // returns -1 (not found)
console.log(cache.get(3)); // returns 3, Cache: {4=4, 3=3}
console.log(cache.get(4)); // returns 4, Cache: {3=3, 4=4}
```

## Interview Tips

- Understand the use case for LRU cache
- Pay attention to edge cases (empty cache, duplicate keys)  
- If asked to implement from scratch, the doubly linked list + hashmap approach is optimal
- Know the time complexity of each operation and be ready to explain the design choices
