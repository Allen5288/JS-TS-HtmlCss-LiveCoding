/**
 * fetchApiBasics.js - Demonstrates basic Fetch API operations
 * 
 * Common interview questions:
 * 1. How do you make a basic GET request using Fetch API?
 * 2. How do you handle errors with Fetch API?
 * 3. How do you make POST requests and send data?
 * 4. What's the difference between fetch() and axios?
 * 5. How does fetch() handle HTTP errors?
 */

// Display results function
const displayResult = (data, error = false) => {
  const resultsElement = document.getElementById('results');
  if (error) {
    resultsElement.innerHTML = `<span style="color: red;">ERROR: ${data}</span>`;
  } else {
    resultsElement.innerHTML = typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : data;
  }
};

// 1. Basic GET Request
const basicFetch = async () => {
  try {
    // Fetch returns a promise that resolves to a Response object
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // Important: fetch only rejects on network failure, not HTTP errors
    // You need to check response.ok to catch HTTP error status
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    displayResult(data);
    return data;
  } catch (error) {
    displayResult(`Failed to fetch data: ${error.message}`, true);
    console.error('Error in basicFetch:', error);
  }
};

// 2. POST Request (Create new resource)
const fetchPost = async () => {
  try {
    const newPost = {
      title: 'New Post Title',
      body: 'This is the content of the new post',
      userId: 1
    };
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    displayResult({ 
      message: 'Post created successfully!', 
      createdPost: data 
    });
    return data;
  } catch (error) {
    displayResult(`Failed to create post: ${error.message}`, true);
    console.error('Error in fetchPost:', error);
  }
};

// 3. Error Handling Example
const testErrorHandling = async () => {
  try {
    // Intentionally use a non-existent endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent-endpoint');
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
    }
    
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult(`Error demonstration: ${error.message}`, true);
    
    // Show different types of error handling
    let errorInfo = 'Error Analysis:\n';
    
    if (error instanceof TypeError) {
      errorInfo += '- This is a network error (e.g., failed to connect)\n';
    } else {
      errorInfo += '- This is an HTTP error (server responded with an error code)\n';
    }
    
    errorInfo += '- Best practice: Always wrap fetch in try/catch and check response.ok\n';
    errorInfo += '- Unlike axios, fetch() only rejects on network failures';
    
    console.info(errorInfo);
  }
};

// Advanced: Fetch with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  // Create a promise that rejects after the specified timeout
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  
  // Race the fetch against the timeout
  try {
    const response = await Promise.race([
      fetch(url, options),
      timeoutPromise
    ]);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch with timeout error:', error);
    throw error; // Re-throw to allow caller to handle
  }
};

// Function to initialize event listeners
const initFetchBasicsListeners = () => {
  document.getElementById('basicFetchBtn').addEventListener('click', basicFetch);
  document.getElementById('fetchPostBtn').addEventListener('click', fetchPost);
  document.getElementById('fetchErrorBtn').addEventListener('click', testErrorHandling);
};

// Export functions for potential reuse in other modules
window.basicFetch = basicFetch;
window.fetchPost = fetchPost;
window.testErrorHandling = testErrorHandling;
window.fetchWithTimeout = fetchWithTimeout;
window.initFetchBasicsListeners = initFetchBasicsListeners;
