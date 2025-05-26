/**
 * LIVEWIRE MARKETS INTERVIEW PREPARATION
 * Real-World Scenarios and Applications
 * 
 * This file contains practical examples of data structures used in real software systems.
 * Focus on understanding WHEN and WHY to use each data structure.
 */

// ===== FINANCIAL TRADING SYSTEMS =====

/**
 * 1. ORDER BOOK MANAGEMENT
 * Real trading systems need to manage buy/sell orders efficiently
 */

class OrderBook {
    constructor() {
        // Use heaps for efficient price-time priority
        this.buyOrders = []; // Max heap (highest price first)
        this.sellOrders = []; // Min heap (lowest price first)
        this.orderMap = new Map(); // Hash map for O(1) order lookup
    }

    // Time: O(log n), Space: O(1)
    addBuyOrder(price, quantity, timestamp) {
        const order = { price, quantity, timestamp, type: 'buy' };
        // In real system, would use proper heap
        this.buyOrders.push(order);
        this.buyOrders.sort((a, b) => b.price - a.price); // Max heap
        this.orderMap.set(order.timestamp, order);
        
        console.log(`Added buy order: ${quantity} @ $${price}`);
        return order.timestamp;
    }

    // Time: O(log n), Space: O(1)
    addSellOrder(price, quantity, timestamp) {
        const order = { price, quantity, timestamp, type: 'sell' };
        this.sellOrders.push(order);
        this.sellOrders.sort((a, b) => a.price - b.price); // Min heap
        this.orderMap.set(order.timestamp, order);
        
        console.log(`Added sell order: ${quantity} @ $${price}`);
        return order.timestamp;
    }

    // Time: O(1), Space: O(1)
    getBestBid() {
        return this.buyOrders.length > 0 ? this.buyOrders[0].price : null;
    }

    // Time: O(1), Space: O(1)
    getBestAsk() {
        return this.sellOrders.length > 0 ? this.sellOrders[0].price : null;
    }

    // Interview Discussion: Why heaps? Need efficient priority-based insertion/removal
    // Why hash map? Need O(1) order cancellation by ID
}

/**
 * 2. PRICE HISTORY AND MOVING AVERAGES
 * Financial systems need sliding window calculations
 */

class PriceTracker {
    constructor(windowSize) {
        this.prices = []; // Array for sequential access
        this.windowSize = windowSize;
        this.sum = 0;
    }

    // Time: O(1), Space: O(1) amortized
    addPrice(price) {
        this.prices.push(price);
        this.sum += price;

        // Sliding window: remove old prices
        if (this.prices.length > this.windowSize) {
            const oldPrice = this.prices.shift();
            this.sum -= oldPrice;
        }

        return this.getMovingAverage();
    }

    // Time: O(1), Space: O(1)
    getMovingAverage() {
        return this.prices.length > 0 ? this.sum / this.prices.length : 0;
    }

    // Interview Discussion: Array vs Circular Buffer?
    // Array: Simple but O(n) for shift()
    // Circular Buffer: O(1) all operations but more complex
}

// ===== WEB APPLICATION SCENARIOS =====

/**
 * 3. BROWSER HISTORY (Stack Application)
 * Back/Forward functionality in browsers
 */

class BrowserHistory {
    constructor() {
        this.history = []; // Stack for back navigation
        this.forwardStack = []; // Stack for forward navigation
        this.currentIndex = -1;
    }

    // Time: O(1), Space: O(1)
    visit(url) {
        // Clear forward history when visiting new page
        this.forwardStack = [];
        this.history.push(url);
        this.currentIndex = this.history.length - 1;
        console.log(`Visited: ${url}`);
    }

    // Time: O(1), Space: O(1)
    back() {
        if (this.currentIndex > 0) {
            const current = this.history[this.currentIndex];
            this.forwardStack.push(current);
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    // Time: O(1), Space: O(1)
    forward() {
        if (this.forwardStack.length > 0) {
            const url = this.forwardStack.pop();
            this.currentIndex++;
            return url;
        }
        return null;
    }

    // Interview Discussion: Why stacks? LIFO behavior matches user expectations
}

/**
 * 4. CACHING SYSTEM (Hash Map + Linked List)
 * LRU Cache for web applications
 */

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Hash map for O(1) access
        // In real implementation, would use doubly linked list
        this.usage = []; // Simple array to track usage order
    }

    // Time: O(1) average, Space: O(1)
    get(key) {
        if (this.cache.has(key)) {
            // Move to end (most recently used)
            this.usage = this.usage.filter(k => k !== key);
            this.usage.push(key);
            return this.cache.get(key);
        }
        return null;
    }

    // Time: O(1) average, Space: O(1)
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing
            this.cache.set(key, value);
            this.usage = this.usage.filter(k => k !== key);
            this.usage.push(key);
        } else {
            // Add new
            if (this.cache.size >= this.capacity) {
                // Remove least recently used
                const lru = this.usage.shift();
                this.cache.delete(lru);
            }
            this.cache.set(key, value);
            this.usage.push(key);
        }
    }

    // Interview Discussion: Why Map + List combination?
    // Map: O(1) key lookup
    // List: Track usage order for eviction
}

// ===== SYSTEM DESIGN SCENARIOS =====

/**
 * 5. TASK SCHEDULING (Queue Application)
 * Background job processing systems
 */

class TaskScheduler {
    constructor() {
        this.priorityQueue = []; // Priority queue for urgent tasks
        this.normalQueue = []; // Regular queue for normal tasks
        this.processing = false;
    }

    // Time: O(log n) for priority, O(1) for normal
    addTask(task, priority = 'normal') {
        const taskObj = { ...task, timestamp: Date.now() };
        
        if (priority === 'high') {
            this.priorityQueue.push(taskObj);
            // Sort by priority (in real system, use proper heap)
            this.priorityQueue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
        } else {
            this.normalQueue.push(taskObj);
        }

        this.processNext();
    }

    // Time: O(1), Space: O(1)
    processNext() {
        if (this.processing) return;

        let nextTask = null;
        
        // Check priority queue first
        if (this.priorityQueue.length > 0) {
            nextTask = this.priorityQueue.shift();
        } else if (this.normalQueue.length > 0) {
            nextTask = this.normalQueue.shift();
        }

        if (nextTask) {
            this.processing = true;
            console.log(`Processing task: ${nextTask.name}`);
            
            // Simulate task processing
            setTimeout(() => {
                this.processing = false;
                this.processNext(); // Process next task
            }, nextTask.duration || 1000);
        }
    }

    // Interview Discussion: Why multiple queues?
    // Separate priority levels, different processing strategies
}

/**
 * 6. USER SESSION MANAGEMENT (Hash Map Application)
 * Web server session tracking
 */

class SessionManager {
    constructor() {
        this.sessions = new Map(); // sessionId -> session data
        this.userSessions = new Map(); // userId -> Set of sessionIds
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    }

    // Time: O(1), Space: O(1)
    createSession(userId) {
        const sessionId = this.generateSessionId();
        const session = {
            userId,
            createdAt: Date.now(),
            lastActivity: Date.now(),
            data: {}
        };

        this.sessions.set(sessionId, session);
        
        if (!this.userSessions.has(userId)) {
            this.userSessions.set(userId, new Set());
        }
        this.userSessions.get(userId).add(sessionId);

        return sessionId;
    }

    // Time: O(1), Space: O(1)
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session && this.isSessionValid(session)) {
            session.lastActivity = Date.now();
            return session;
        }
        return null;
    }

    // Time: O(1), Space: O(1)
    isSessionValid(session) {
        return Date.now() - session.lastActivity < this.sessionTimeout;
    }

    generateSessionId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    // Interview Discussion: Why nested maps?
    // Fast session lookup by ID, fast user session lookup for cleanup
}

// ===== EXAMPLE USAGE AND TESTING =====

function demonstrateScenarios() {
    console.log("=== LIVEWIRE MARKETS INTERVIEW SCENARIOS ===\n");

    // 1. Trading System
    console.log("1. Order Book Management:");
    const orderBook = new OrderBook();
    orderBook.addBuyOrder(100.50, 1000, Date.now());
    orderBook.addSellOrder(100.75, 500, Date.now() + 1);
    console.log(`Best Bid: $${orderBook.getBestBid()}`);
    console.log(`Best Ask: $${orderBook.getBestAsk()}\n`);

    // 2. Price Tracking
    console.log("2. Price Tracking:");
    const priceTracker = new PriceTracker(5);
    [100, 101, 99, 102, 98].forEach(price => {
        const avg = priceTracker.addPrice(price);
        console.log(`Price: $${price}, Moving Average: $${avg.toFixed(2)}`);
    });
    console.log("");

    // 3. Browser History
    console.log("3. Browser History:");
    const browser = new BrowserHistory();
    browser.visit("google.com");
    browser.visit("github.com");
    browser.visit("stackoverflow.com");
    console.log(`Back to: ${browser.back()}`);
    console.log(`Back to: ${browser.back()}`);
    console.log(`Forward to: ${browser.forward()}`);
    console.log(`Forward to: ${browser.forward()}\n`);

    // 4. Caching
    console.log("4. LRU Cache:");
    const cache = new LRUCache(3);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    console.log(`Get 'a': ${cache.get("a")}`);
    cache.put("d", 4); // Should evict 'b'
    console.log(`Get 'b': ${cache.get("b")} (should be null)\n`);
}

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OrderBook,
        PriceTracker,
        BrowserHistory,
        LRUCache,
        TaskScheduler,
        SessionManager,
        demonstrateScenarios
    };
}

// Run demonstration only if this file is run directly, not when imported
if (typeof window === 'undefined' && require.main === module) {
    demonstrateScenarios();
}
