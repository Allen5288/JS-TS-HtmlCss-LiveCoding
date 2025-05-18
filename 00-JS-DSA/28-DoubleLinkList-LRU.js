// LRU Cache Implementation using Doubly Linked List and HashMap
// explain: This implementation uses a combination of a HashMap for O(1) access to cache items
// and a Doubly Linked List to maintain the order of usage for eviction.

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = {};
    this.tail = {};

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeLastUsed() {
    const [key, next, prev] = [
      this.head.next.key,
      this.head.next.next,
      this.head,
    ];

    this.map.delete(key);
    this.head.next = next;
    this.head.next.prev = prev;
  }

  put(key, value) {
    const hasKey = this.get(key) !== -1;
    const isAtCapacity = this.map.size === this.capacity;

    if (hasKey) return (this.tail.prev.value = value);
    if (isAtCapacity) this.removeLastUsed();

    const node = { key, value };
    this.map.set(key, node);
    this.moveToFront(node);
  }

  moveToFront(node) {
    const [prev, next] = [this.tail.prev, this.tail];

    this.tail.prev.next = node;
    this.connectNode(node, { prev, next });
    this.tail.prev = node;
  }

  connectNode(node, top) {
    node.prev = top.prev;
    node.next = top.next;
  }

  get(key) {
    const hasKey = this.map.has(key);
    if (!hasKey) return -1;

    const node = this.map.get(key);

    this.disconnectNode(node);
    this.moveToFront(node);

    return node.value;
  }

  disconnectNode(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
  }
}

// Example usage for all methods and senarios
const lruCache = new LRUCache(3);
lruCache.put(1, "A");
lruCache.put(2, "B");
lruCache.put(3, "C");
console.log(lruCache.get(1)); // Output: "A"
lruCache.put(4, "D"); // Evicts key 2
console.log(lruCache.get(2)); // Output: -1 (not found)

