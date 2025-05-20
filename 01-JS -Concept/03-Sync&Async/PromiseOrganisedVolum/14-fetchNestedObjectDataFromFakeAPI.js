// Our trusty recursive JSON crawling function
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

// --- Reusable Callback Functions ---

/**
 * Creates a callback that collects all values of a specific type into an array.
 * @param {string} targetType - The JavaScript type to collect (e.g., 'string', 'number', 'boolean').
 * @param {Array} collectionArray - The array to push the collected values into.
 * @returns {function} A callback function for `crawlJson`.
 */
function createTypeCollector(targetType, collectionArray) {
  return (value) => {
    if (typeof value === targetType) {
      collectionArray.push(value);
    }
  };
}

/**
 * Creates a callback that collects all non-null primitive values into an array.
 * @param {Array} collectionArray - The array to push the collected values into.
 * @returns {function} A callback function for `crawlJson`.
 */
function createPrimitiveCollector(collectionArray) {
  return (value) => {
    if (value !== null && typeof value !== 'object' && !Array.isArray(value)) {
      collectionArray.push(value);
    }
  };
}

/**
 * Creates a callback that logs values based on a condition.
 * @param {function} conditionFn - A function that returns true if the value should be logged.
 * @param {string} [prefix='Found:'] - An optional prefix for the log message.
 * @returns {function} A callback function for `crawlJson`.
 */
function createLogger(conditionFn, prefix = 'Found:') {
  return (value) => {
    if (conditionFn(value)) {
      console.log(`${prefix} ${value}`);
    }
  };
}

// --- Integration with Fetch API (as before) ---

async function fetchAndProcessData(apiUrl) {
  try {
    console.log(`Workspaceing data from: ${apiUrl}...`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("\n--- Successfully fetched data! ---");
    console.log("Fetched Data Sample:", JSON.stringify(data));

    // --- Using our reusable callbacks ---

    console.log("\n--- Scenario 1: Collect all strings ---");
    const allStrings = [];
    const stringCollector = createTypeCollector('string', allStrings);
    crawlJson(data, stringCollector);
    console.log("All strings:", allStrings.slice(0, 10)); // Show first 10

    console.log("\n--- Scenario 2: Collect all numbers ---");
    const allNumbers = [];
    const numberCollector = createTypeCollector('number', allNumbers);
    crawlJson(data, numberCollector);
    console.log("All numbers:", allNumbers.slice(0, 10)); // Show first 10

    console.log("\n--- Scenario 3: Collect all primitive values ---");
    const allPrimitives = [];
    const primitiveCollector = createPrimitiveCollector(allPrimitives);
    crawlJson(data, primitiveCollector);
    console.log("All primitives:", allPrimitives.slice(0, 10)); // Show first 10

    console.log("\n--- Scenario 4: Log all booleans directly ---");
    const booleanLogger = createLogger((value) => typeof value === 'boolean', 'Boolean Value:');
    crawlJson(data, booleanLogger);

    console.log("\n--- Scenario 5: Log all non-null values longer than 5 characters ---");
    const customLogger = createLogger((value) => typeof value === 'string' && value.length > 5, 'Long String:');
    crawlJson(data, customLogger);

  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

// --- Example API URL ---
// Using a JSONPlaceholder endpoint that returns an array of photo objects,
// which has strings, numbers, and booleans (implicitly, if you were to add one).
const apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';

fetchAndProcessData(apiUrl);