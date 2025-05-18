import { useState, useCallback, useEffect } from 'react';

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.head = null;
        this.tail = null;
    }

    // Create a new node
    createNode(key, value) {
        return { key, value, next: null, prev: null };
    }

    // Get value from cache
    get(key) {
        // If key doesn't exist, return -1
        if (!this.cache[key]) return -1;

        // If key exists, move to front (most recently used)
        const node = this.cache[key];
        this.removeNode(node);
        this.addToFront(node);
        return node.value;
    }

    // Add or update a key-value pair
    put(key, value) {
        // If key already exists, update value and move to front
        if (this.cache[key]) {
            const node = this.cache[key];
            node.value = value;
            this.removeNode(node);
            this.addToFront(node);
            return;
        }

        // Create new node
        const newNode = this.createNode(key, value);
        
        // If at capacity, remove least recently used (tail)
        if (Object.keys(this.cache).length >= this.capacity) {
            const tailKey = this.tail.key;
            this.removeNode(this.tail);
            delete this.cache[tailKey];
        }
        
        // Add new node to front and to cache
        this.addToFront(newNode);
        this.cache[key] = newNode;
    }

    // Remove a node from the linked list
    removeNode(node) {
        // Handle edge cases
        if (this.head === node && this.tail === node) {
            this.head = null;
            this.tail = null;
            return;
        }

        // Handle head case
        if (this.head === node) {
            this.head = node.next;
            this.head.prev = null;
            return;
        }

        // Handle tail case
        if (this.tail === node) {
            this.tail = node.prev;
            this.tail.next = null;
            return;
        }

        // Handle middle case
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Add a node to the front (most recently used)
    addToFront(node) {
        // If list is empty
        if (!this.head) {
            this.head = node;
            this.tail = node;
            node.next = null;
            node.prev = null;
            return;
        }

        // Add to front
        node.next = this.head;
        node.prev = null;
        this.head.prev = node;
        this.head = node;
    }    // Get all cache entries
    getEntries() {
        const entries = [];
        let current = this.head;
        
        // Add position information for better visualization
        let position = 0;
        while (current) {
            entries.push({ 
                key: current.key, 
                value: current.value,
                position: position, // 0 = most recently used
                isMostRecent: position === 0,
                isLeastRecent: current === this.tail
            });
            current = current.next;
            position++;
        }
        return entries;
    }
}

// React hook to use LRU Cache
function useLRUCache(capacity = 10) {
    const [cache] = useState(() => new LRUCache(capacity));
    const [entries, setEntries] = useState([]);

    // Update the entries state whenever the cache changes
    const updateEntries = useCallback(() => {
        setEntries(cache.getEntries());
    }, [cache]);

    // Get method wrapped with React state update
    const get = useCallback((key) => {
        const value = cache.get(key);
        updateEntries();
        return value;
    }, [cache, updateEntries]);

    // Put method wrapped with React state update
    const put = useCallback((key, value) => {
        cache.put(key, value);
        updateEntries();
    }, [cache, updateEntries]);

    // Initialize entries
    useEffect(() => {
        updateEntries();
    }, [updateEntries]);

    return {
        get,
        put,
        entries
    };
}

export default useLRUCache;