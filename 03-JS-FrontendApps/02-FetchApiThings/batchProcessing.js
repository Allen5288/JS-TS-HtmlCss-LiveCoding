/**
 * batchProcessing.js - Demonstrates batch processing of API data
 * 
 * Common interview questions:
 * 1. How would you fetch data from multiple endpoints in parallel?
 * 2. How can you implement controlled batch processing to avoid overwhelming an API?
 * 3. How would you handle dependencies between API calls?
 * 4. How can you process large amounts of data efficiently from an API?
 */

// Display results function (reusing from previous files)
const displayBatchResult = (data, error = false) => {
  const resultsElement = document.getElementById('results');
  if (error) {
    resultsElement.innerHTML = `<span style="color: red;">ERROR: ${data}</span>`;
  } else {
    resultsElement.innerHTML = typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : data;
  }
};

// 1. Parallel Fetch with Promise.all
const parallelFetch = async () => {
  try {
    displayBatchResult("Starting parallel fetch...");
    
    const startTime = performance.now();
    
    // Define multiple endpoints to fetch in parallel
    const endpoints = [
      'https://jsonplaceholder.typicode.com/users/1',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/albums/1',
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/photos/1'
    ];
    
    // Create an array of fetch promises
    const fetchPromises = endpoints.map(url => 
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
    );
    
    // Wait for all promises to resolve
    const results = await Promise.all(fetchPromises);
    
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    // Organize the results by type
    const [user, post, album, todo, photo] = results;
    
    displayBatchResult({
      message: `Parallel fetch complete in ${duration}ms!`,
      user,
      post,
      album,
      todo,
      photo
    });
    
  } catch (error) {
    displayBatchResult(`Parallel fetch error: ${error.message}`, true);
    console.error('Error in parallelFetch:', error);
  }
};

// 2. Controlled Batch Processing
const batchProcessing = async () => {
  try {
    displayBatchResult("Starting controlled batch processing...");
    
    // Get a list of IDs to process (simulating a large dataset)
    const allIds = Array.from({ length: 50 }, (_, i) => i + 1);
    
    // Process in batches to avoid overwhelming the API
    const batchSize = 5;
    const delayBetweenBatches = 300; // milliseconds
    
    const processInBatches = async () => {
      const results = [];
      
      // Process ids in batches
      for (let i = 0; i < allIds.length; i += batchSize) {
        // Get the current batch
        const batchIds = allIds.slice(i, i + batchSize);
        
        displayBatchResult(`Processing batch ${i/batchSize + 1}/${Math.ceil(allIds.length/batchSize)}: IDs ${batchIds.join(', ')}...`);
        
        // Process this batch in parallel
        const batchPromises = batchIds.map(id => 
          fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => {
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              return response.json();
            })
        );
        
        // Wait for the current batch to complete
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Add a delay before the next batch to be nice to the API
        if (i + batchSize < allIds.length) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
      }
      
      return results;
    };
    
    const todos = await processInBatches();
    
    // Do something with the results - for example, count completed vs. not completed
    const completed = todos.filter(todo => todo.completed).length;
    const pending = todos.length - completed;
    
    displayBatchResult({
      message: "Batch processing complete!",
      totalProcessed: todos.length,
      statistics: {
        completed,
        pending,
        completionRate: `${((completed / todos.length) * 100).toFixed(1)}%`
      },
      firstFewResults: todos.slice(0, 5)
    });
    
  } catch (error) {
    displayBatchResult(`Batch processing error: ${error.message}`, true);
    console.error('Error in batchProcessing:', error);
  }
};

// 3. Sequential Batch Processing (for dependent operations)
const sequentialBatchProcessing = async () => {
  try {
    displayBatchResult("Starting sequential batch processing...");
    
    // Step 1: Get a user
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);
    const user = await userResponse.json();
    
    displayBatchResult(`Processing user: ${user.name}...`);
    
    // Step 2: Get the user's posts
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    if (!postsResponse.ok) throw new Error(`HTTP error! Status: ${postsResponse.status}`);
    const posts = await postsResponse.json();
    
    displayBatchResult(`Found ${posts.length} posts for ${user.name}. Fetching comments...`);
    
    // Step 3: For each post, get the comments
    // Process one post at a time to demonstrate sequential processing
    const postsWithComments = [];
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      
      displayBatchResult(`Processing post ${i+1}/${posts.length}: "${post.title.substring(0, 30)}..."...`);
      
      const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
      if (!commentsResponse.ok) throw new Error(`HTTP error! Status: ${commentsResponse.status}`);
      const comments = await commentsResponse.json();
      
      postsWithComments.push({
        ...post,
        comments
      });
      
      // Add a small delay to be nice to the API
      if (i < posts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    // Final results
    displayBatchResult({
      message: "Sequential batch processing complete!",
      user,
      postCount: postsWithComments.length,
      commentCount: postsWithComments.reduce((sum, post) => sum + post.comments.length, 0),
      firstPostWithComments: postsWithComments[0]
    });
    
  } catch (error) {
    displayBatchResult(`Sequential batch processing error: ${error.message}`, true);
    console.error('Error in sequentialBatchProcessing:', error);
  }
};

// 4. Advanced: Throttled API Requests with Rate Limiting
const createThrottledFetcher = (maxRequestsPerSecond = 5) => {
  const queue = [];
  let activeRequests = 0;
  const interval = 1000 / maxRequestsPerSecond;
  
  // Process the next item in the queue
  const processQueue = async () => {
    if (queue.length === 0 || activeRequests >= maxRequestsPerSecond) return;
    
    const { url, options, resolve, reject } = queue.shift();
    activeRequests++;
    
    try {
      const response = await fetch(url, options);
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      activeRequests--;
      
      // Schedule the next request
      setTimeout(processQueue, interval);
    }
  };
  
  // Return a function that will throttle fetch requests
  return (url, options = {}) => {
    return new Promise((resolve, reject) => {
      queue.push({ url, options, resolve, reject });
      
      // If we're not at capacity, process immediately
      if (activeRequests < maxRequestsPerSecond) {
        processQueue();
      }
    });
  };
};

// Demo of throttled fetch
const demoThrottledFetch = async () => {
  const throttledFetch = createThrottledFetcher(3); // Max 3 requests per second
  
  const urls = Array.from({ length: 10 }, (_, i) => 
    `https://jsonplaceholder.typicode.com/todos/${i+1}`
  );
  
  const results = [];
  
  for (const url of urls) {
    try {
      const response = await throttledFetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      results.push(data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }
  
  return results;
};

// Function to initialize event listeners
const initBatchProcessingListeners = () => {
  document.getElementById('parallelFetchBtn').addEventListener('click', parallelFetch);
  document.getElementById('batchProcessingBtn').addEventListener('click', batchProcessing);
  document.getElementById('sequentialBatchBtn').addEventListener('click', sequentialBatchProcessing);
  
  // Add listener for throttled fetch demo if button exists
  const throttledBtn = document.getElementById('throttledFetchBtn');
  if (throttledBtn) {
    throttledBtn.addEventListener('click', async () => {
      displayBatchResult("Starting throttled fetch demo...");
      const results = await demoThrottledFetch();
      displayBatchResult({
        message: "Throttled fetch complete!",
        results
      });
    });
  }
};

// Export functions for potential reuse
window.parallelFetch = parallelFetch;
window.batchProcessing = batchProcessing;
window.sequentialBatchProcessing = sequentialBatchProcessing;
window.createThrottledFetcher = createThrottledFetcher;
window.initBatchProcessingListeners = initBatchProcessingListeners;
