// fetch from nested object - multple level from outside to inside,
// like fetch users, then fetch each UserId, then fetch each user's posts, then fetch each post's comments
// using recursion to get data
const fetchedNestedData = async (baseUrl, entityType, entityId = '', fetchConfig = {}) => {
  // Define the nested structure - what to fetch for each entity type
  const nestedStructure = {
    users: ['posts'], // For users, fetch their posts
    posts: ['comments'], // For posts, fetch their comments
    comments: [] // For comments, nothing further to fetch
  };

  try {
    // Construct URL based on entity type and ID
    let url = baseUrl;
    if (entityType === 'posts' && entityId) {
      url += `/users/${entityId}/posts`;
    } else if (entityType === 'comments' && entityId) {
      url += `/posts/${entityId}/comments`;
    } else {
      url += `/${entityType}`;
    }

    // Fetch the current level data
    console.log(`Fetching ${entityType}${entityId ? ` for ${entityId}` : ''}...`);
    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process array of items or single item
    const items = Array.isArray(data) ? data : [data];
    
    // For each item, recursively fetch the nested data according to the structure
    const nestedTypes = nestedStructure[entityType] || [];
    
    for (const item of items) {
      // For each nested entity type we need to fetch
      for (const nestedType of nestedTypes) {
        // Recursively fetch and attach nested data
        item[nestedType] = await fetchedNestedData(
          baseUrl, 
          nestedType, 
          item.id, 
          fetchConfig
        );
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${entityType}:`, error);
    return null;
  }
};

// Example usage:
const fetchAllData = async () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const userData = await fetchedNestedData(baseUrl, 'users');
  console.log('Complete nested data structure:', userData);
  return userData;
};
console.log('Fetching all data...', fetchAllData());

// Uncomment to execute
// fetchAllData();

// To fetch data for just one user:
const fetchSingleUserData = async (userId) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const singleUserData = await fetchedNestedData(baseUrl, 'users', userId);
  console.log(`Data for user ${userId}:`, singleUserData);
  return singleUserData;
};
console.log('Fetching single user data...', fetchSingleUserData(1));

// Uncomment to execute for a specific user (e.g., user with ID 1)
// fetchSingleUserData(1);