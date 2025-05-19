/**
 * fetchApiData.js - Main reference file for fetch API interview concepts
 * 
 * This file serves as a quick reference guide with comprehensive examples
 * of fetch API usage and data manipulation that are commonly asked in
 * JavaScript interviews.
 * 
 * Topics covered:
 * 1. Basic fetch API usage (GET, POST, etc.)
 * 2. Extracting data from nested objects
 * 3. Recursive fetch operations
 * 4. Batch processing API data
 * 
 * Each topic is covered in more detail in their respective files:
 * - fetchApiBasics.js
 * - nestedDataExtraction.js
 * - recursiveFetching.js
 * - batchProcessing.js
 * 
 * Run the examples through the index.html file in this directory.
 */

// Reference Quick Guide

// ===============================================
// 1. BASIC FETCH API USAGE
// ===============================================

// Simple GET request
const simpleGet = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// POST request
const simplePost = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// PUT request
const simplePut = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// DELETE request
const simpleDelete = async (url) => {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// ===============================================
// 2. EXTRACTING DATA FROM NESTED OBJECTS
// ===============================================

// Safe data extraction with optional chaining
const safeExtract = (obj, path, defaultValue = undefined) => {
  return path.split('.')
    .reduce((o, key) => {
      // Handle array access with [n] notation
      if (key.includes('[') && key.includes(']')) {
        const keyName = key.substring(0, key.indexOf('['));
        const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
        return (o && o[keyName] && o[keyName][index] !== undefined) ? o[keyName][index] : undefined;
      }
      return (o && o[key] !== undefined) ? o[key] : undefined;
    }, obj) || defaultValue;
};

// Modern approach with optional chaining
// const getValue = (obj) => obj?.prop1?.prop2?.[0]?.something;

// ===============================================
// 3. RECURSIVE FETCH OPERATIONS
// ===============================================

// Recursive fetch with depth control
const recursiveFetchWithDepth = async (url, maxDepth = 3, currentDepth = 0, cache = new Map()) => {
  // Base cases
  if (currentDepth >= maxDepth) return null;
  if (cache.has(url)) return cache.get(url);
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    cache.set(url, data);
    
    // Process nested URLs if they exist and if we haven't reached max depth
    if (data && typeof data === 'object' && currentDepth < maxDepth) {
      // Process object properties that might be URLs
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.startsWith('http')) {
          data[`${key}Data`] = await recursiveFetchWithDepth(value, maxDepth, currentDepth + 1, cache);
        }
      }
      
      // Process arrays of objects that might contain URLs
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item && typeof item === 'object') {
            for (const [key, value] of Object.entries(item)) {
              if (typeof value === 'string' && value.startsWith('http')) {
                item[`${key}Data`] = await recursiveFetchWithDepth(value, maxDepth, currentDepth + 1, cache);
              }
            }
          }
        }
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: error.message };
  }
};

// ===============================================
// 4. BATCH PROCESSING API DATA
// ===============================================

// Process data in controlled batches
const batchProcess = async (urls, batchSize = 5, processFn = null) => {
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    
    // Process the current batch in parallel
    const batchPromises = batch.map(url => fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
    );
    
    // Wait for the batch to complete
    const batchResults = await Promise.all(batchPromises);
    
    // Apply custom processing if provided
    const processedResults = processFn 
      ? batchResults.map(processFn)
      : batchResults;
      
    results.push(...processedResults);
    
    // Add a delay between batches to be nice to the API
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  return results;
};

// Throttle API requests to respect rate limits
const throttledFetch = (maxRequestsPerSecond = 5) => {
  const queue = [];
  let activeRequests = 0;
  const interval = 1000 / maxRequestsPerSecond;
  
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
      setTimeout(processQueue, interval);
    }
  };
  
  return (url, options = {}) => {
    return new Promise((resolve, reject) => {
      queue.push({ url, options, resolve, reject });
      if (activeRequests < maxRequestsPerSecond) {
        processQueue();
      }
    });
  };
};

// Export all utility functions
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    simpleGet,
    simplePost,
    simplePut,
    simpleDelete,
    safeExtract,
    recursiveFetchWithDepth,
    batchProcess,
    throttledFetch
  };
} else {
  // Browser environment
  window.fetchApiUtils = {
    simpleGet,
    simplePost,
    simplePut,
    simpleDelete,
    safeExtract,
    recursiveFetchWithDepth,
    batchProcess,
    throttledFetch
  };
}