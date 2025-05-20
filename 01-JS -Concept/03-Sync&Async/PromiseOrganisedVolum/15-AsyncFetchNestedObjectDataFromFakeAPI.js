// Our trusty recursive JSON crawling function (remains the same as it's synchronous)
function crawlJson(data, callback) {
  if (data === null || typeof data !== 'object') {
    callback(data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach(item => {
      crawlJson(item, callback);
    });
  } else {
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        crawlJson(data[key], callback);
      }
    }
  }
}

// Reusable Callback Functions (remain the same)
function createTypeCollector(targetType, collectionArray) {
  return (value) => {
    if (typeof value === targetType) {
      collectionArray.push(value);
    }
  };
}

function createPrimitiveCollector(collectionArray) {
  return (value) => {
    if (value !== null && typeof value !== 'object' && !Array.isArray(value)) {
      collectionArray.push(value);
    }
  };
}

function createLogger(conditionFn, prefix = 'Found:') {
  return (value) => {
    if (conditionFn(value)) {
      console.log(`${prefix} ${value}`);
    }
  };
}

// --- Integration with Fetch API using Promise Chain ---

function fetchAndProcessDataWithPromises(apiUrl) {
  console.log(`Workspaceing data from: ${apiUrl}... (using Promises)`);

  return fetch(apiUrl) // Start the fetch operation
    .then(response => {
      // Check if the response was successful (status 2xx)
      if (!response.ok) {
        // If not successful, throw an error to be caught by the .catch() block
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // If successful, parse the JSON response
      return response.json();
    })
    .then(data => {
      // This .then() block receives the parsed JSON data
      console.log("\n--- Successfully fetched data! ---");
      console.log("Fetched Data Sample:", JSON.stringify(data, null, 2).substring(0, 200) + "...");

      // --- Using our reusable callbacks ---

      console.log("\n--- Scenario 1: Collect all strings ---");
      const allStrings = [];
      const stringCollector = createTypeCollector('string', allStrings);
      crawlJson(data, stringCollector);
      console.log("All strings:", allStrings.slice(0, 10));

      console.log("\n--- Scenario 2: Collect all numbers ---");
      const allNumbers = [];
      const numberCollector = createTypeCollector('number', allNumbers);
      crawlJson(data, numberCollector);
      console.log("All numbers:", allNumbers.slice(0, 10));

      console.log("\n--- Scenario 3: Collect all primitive values ---");
      const allPrimitives = [];
      const primitiveCollector = createPrimitiveCollector(allPrimitives);
      crawlJson(data, primitiveCollector);
      console.log("All primitives:", allPrimitives.slice(0, 10));

      console.log("\n--- Scenario 4: Log all booleans directly ---");
      const booleanLogger = createLogger((value) => typeof value === 'boolean', 'Boolean Value:');
      crawlJson(data, booleanLogger);

      console.log("\n--- Scenario 5: Log all non-null values longer than 5 characters ---");
      const customLogger = createLogger((value) => typeof value === 'string' && value.length > 5, 'Long String:');
      crawlJson(data, customLogger);

      // Optionally, you can return something from this chain if further processing is needed
      return {
        allStrings,
        allNumbers,
        allPrimitives
      };

    })
    .catch(error => {
      // This .catch() block handles any errors that occurred in the entire Promise chain
      console.error("Error fetching or parsing data:", error);
    });
}

// --- Example API URL ---
const apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';

// Call the function to start the Promise chain
fetchAndProcessDataWithPromises(apiUrl);

// Example of chaining further (e.g., if fetchAndProcessDataWithPromises returned something)
// fetchAndProcessDataWithPromises(apiUrl)
//   .then(results => {
//     if (results) { // Check if results were actually returned
//       console.log("\n--- Further processing after initial crawl (e.g., total strings) ---");
//       console.log("Total strings found:", results.allStrings.length);
//     }
//   })
//   .catch(err => console.error("Error in further processing:", err));