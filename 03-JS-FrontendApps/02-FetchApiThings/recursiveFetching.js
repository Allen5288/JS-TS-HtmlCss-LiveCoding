/**
 * recursiveFetching.js - Demonstrates recursive API fetching techniques
 * 
 * Common interview questions:
 * 1. How would you recursively fetch data until a condition is met?
 * 2. How can you implement pagination with the Fetch API?
 * 3. How would you fetch nested resources recursively?
 * 4. How can you handle rate limiting when recursively fetching data?
 */

// Display results function (reusing from previous files)
const displayRecursiveResult = (data, error = false) => {
  const resultsElement = document.getElementById('results');
  if (error) {
    resultsElement.innerHTML = `<span style="color: red;">ERROR: ${data}</span>`;
  } else {
    resultsElement.innerHTML = typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : data;
  }
};

// 1. Recursive Fetch Example: Fetch users and their posts
const recursiveFetch = async () => {
  try {
    displayRecursiveResult("Starting recursive fetch...");
    
    // First, fetch a list of users
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!usersResponse.ok) throw new Error(`HTTP error! Status: ${usersResponse.status}`);
    const users = await usersResponse.json();
    
    // Then recursively fetch posts for each user
    const usersWithPosts = await fetchUserPostsRecursively(users, 0, []);
    
    displayRecursiveResult({
      message: "Recursive fetch complete!",
      userCount: usersWithPosts.length,
      totalPostCount: usersWithPosts.reduce((sum, user) => sum + user.posts.length, 0),
      users: usersWithPosts
    });
    
  } catch (error) {
    displayRecursiveResult(`Failed during recursive fetch: ${error.message}`, true);
    console.error('Error in recursiveFetch:', error);
  }
};

// Helper function to recursively fetch posts for each user
const fetchUserPostsRecursively = async (users, index, results) => {
  // Base case: we've processed all users
  if (index >= users.length) {
    return results;
  }
  
  const currentUser = users[index];
  
  try {
    // Update the UI to show progress
    displayRecursiveResult(`Fetching posts for user ${index + 1}/${users.length}: ${currentUser.name}...`);
    
    // Fetch posts for the current user
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`);
    if (!postsResponse.ok) throw new Error(`HTTP error! Status: ${postsResponse.status}`);
    
    const posts = await postsResponse.json();
    
    // Add posts to the user object
    const userWithPosts = {
      ...currentUser,
      posts: posts
    };
    
    // Add this user to our results
    results.push(userWithPosts);
    
    // Recursive call: move to the next user
    return fetchUserPostsRecursively(users, index + 1, results);
  } catch (error) {
    console.error(`Error fetching posts for user ${currentUser.name}:`, error);
    
    // Even if this user failed, we'll continue with the next one
    // Add the user without posts to maintain the user list
    results.push({
      ...currentUser,
      posts: [],
      error: `Failed to fetch posts: ${error.message}`
    });
    
    // Recursive call: move to the next user
    return fetchUserPostsRecursively(users, index + 1, results);
  }
};

// 2. Pagination Example: Fetch data with pagination
const handlePagination = async () => {
  try {
    const allItems = await fetchAllPages('https://reqres.in/api/users', 1);
    
    displayRecursiveResult({
      message: "Pagination complete!",
      totalItemsCount: allItems.length,
      items: allItems
    });
    
  } catch (error) {
    displayRecursiveResult(`Pagination error: ${error.message}`, true);
    console.error('Error in handlePagination:', error);
  }
};

// Recursive function to fetch all pages
const fetchAllPages = async (baseUrl, currentPage, allItems = []) => {
  // Update UI with progress
  displayRecursiveResult(`Fetching page ${currentPage}...`);
  
  try {
    // Fetch the current page
    const response = await fetch(`${baseUrl}?page=${currentPage}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    
    // Extract items from this page and add to our collection
    const newItems = data.data || [];
    const updatedItems = [...allItems, ...newItems];
    
    // Check if there are more pages
    const totalPages = data.total_pages || 1;
    
    // Base case: we've fetched all pages
    if (currentPage >= totalPages) {
      return updatedItems;
    }
    
    // Recursive case: fetch the next page
    // Add a small delay to avoid rate limiting (good practice)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Recursive call
    return fetchAllPages(baseUrl, currentPage + 1, updatedItems);
  } catch (error) {
    console.error(`Error fetching page ${currentPage}:`, error);
    // Return what we have so far, even if incomplete
    return allItems;
  }
};

// 3. Advanced: Recursively fetch nested resources with depth control
const fetchNestedResources = async (initialUrl, maxDepth = 3) => {
  const cache = new Map(); // Cache to avoid fetching the same resource twice
  
  const fetchResource = async (url, depth = 0) => {
    // Base cases
    if (depth > maxDepth) return { _info: `Max depth ${maxDepth} reached` };
    if (cache.has(url)) return cache.get(url);
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      
      // Store in cache
      cache.set(url, data);
      
      // Look for nested resources to fetch recursively
      if (data && typeof data === 'object') {
        // If we have nested URLs, fetch them recursively
        const promises = [];
        
        // Check for common URL patterns in the response
        Object.entries(data).forEach(([key, value]) => {
          // If it looks like a URL and contains our API domain, fetch it
          if (typeof value === 'string' && value.startsWith('http') && 
              value.includes('jsonplaceholder.typicode.com')) {
            promises.push(
              (async () => {
                const nestedData = await fetchResource(value, depth + 1);
                data[key + 'Data'] = nestedData; // Store under a new key
              })()
            );
          }
        });
        
        // If we have array of objects with URLs, process them too
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item && typeof item === 'object') {
              Object.entries(item).forEach(([key, value]) => {
                if (typeof value === 'string' && value.startsWith('http') && 
                    value.includes('jsonplaceholder.typicode.com')) {
                  promises.push(
                    (async () => {
                      const nestedData = await fetchResource(value, depth + 1);
                      item[key + 'Data'] = nestedData;
                    })()
                  );
                }
              });
            }
          });
        }
        
        // Wait for all nested fetches to complete
        if (promises.length > 0) {
          await Promise.all(promises);
        }
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return { error: error.message };
    }
  };
  
  return fetchResource(initialUrl);
};

// Show recursive fetching with depth control
const showNestedResourceFetch = async () => {
  try {
    displayRecursiveResult("Starting nested resource fetch...");
    
    // Fetch a user, then their posts, then comments on their posts
    const userData = await fetchNestedResources('https://jsonplaceholder.typicode.com/users/1', 2);
    
    displayRecursiveResult({
      message: "Nested resource fetch complete!",
      userData
    });
  } catch (error) {
    displayRecursiveResult(`Nested resource fetch error: ${error.message}`, true);
  }
};

// Function to initialize event listeners
const initRecursiveFetchListeners = () => {
  document.getElementById('recursiveFetchBtn').addEventListener('click', recursiveFetch);
  document.getElementById('paginationBtn').addEventListener('click', handlePagination);
  
  // Add listener for nested resource example if button exists
  const nestedResourceBtn = document.getElementById('nestedResourceBtn');
  if (nestedResourceBtn) {
    nestedResourceBtn.addEventListener('click', showNestedResourceFetch);
  }
};

// Export functions for potential reuse
window.recursiveFetch = recursiveFetch;
window.handlePagination = handlePagination;
window.fetchNestedResources = fetchNestedResources;
window.initRecursiveFetchListeners = initRecursiveFetchListeners;
