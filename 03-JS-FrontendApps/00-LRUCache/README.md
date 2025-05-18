# LRU Cache React Implementation

This project demonstrates a Least Recently Used (LRU) Cache implementation in React using a custom hook.

## Features

- LRU Cache implementation with a React hook interface
- Interactive UI for testing cache operations
- Dynamic content loading demonstration
- Visualization of the cache state

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Navigate to the project directory:
   ```
   cd 03-JS-FrontendApps/00-LRUCache
   ```

2. Install the required packages:
   ```
   npm install
   ```

### Running the Application

Start the development server:
```
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

- **Put Operation**: Enter a key and value, then click "Put" to add or update the entry in the cache
- **Get Operation**: Enter a key and click "Get" to retrieve the value from the cache (returns -1 if not found)
- **Cache State**: View the current state of the cache with the most recently used entries first
- **Dynamic Content Loader**: Click on tabs to load content dynamically (demonstrating a use case for caching)

## How It Works

The LRU Cache is implemented with a combination of:

1. A hash map for O(1) key-value lookup
2. A doubly linked list to maintain usage order
3. A React custom hook that wraps the core functionality with React state management

When the cache capacity is reached, the least recently used item is evicted.
