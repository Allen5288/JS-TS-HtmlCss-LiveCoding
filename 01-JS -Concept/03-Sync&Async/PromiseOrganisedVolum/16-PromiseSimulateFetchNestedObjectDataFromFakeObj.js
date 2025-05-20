// Our trusty recursive JSON crawling function (remains the same)
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

// --- Your Nested JSON Object to Simulate API Data ---
const simulatedApiData = {
  id: 1,
  name: 'Simulated Product',
  details: {
    sku: 'SIM-PROD-001',
    dimensions: {
      width: 15,
      height: 25,
      unit: 'cm'
    },
    features: ['wireless', 'portable'],
    description: "A fantastic simulated product for all your testing needs."
  },
  categories: [
    { id: 201, name: 'Simulated Tech' },
    { id: 202, name: 'Virtual Gadgets', subCategories: ['Augmented Reality', 'Virtual Reality'] }
  ],
  price: 123.45,
  available: true,
  manufacturer: {
    name: 'SimuCorp',
    address: {
      street: '456 Test Blvd',
      city: 'SimCity'
    }
  },
  reviews: [
    { rating: 5, comment: 'Exceeded virtual expectations!' },
    { rating: 3, comment: 'A bit too simulated.', tags: ['complex', 'abstract'] }
  ],
  isDigital: true
};

// --- Function to Simulate API Fetch using new Promise ---

/**
 * Simulates an API call that returns the given data after a delay.
 * Can simulate success or failure.
 * @param {Object} dataToReturn - The JSON object to resolve the promise with.
 * @param {number} delayMs - The delay in milliseconds before resolving/rejecting.
 * @param {boolean} [shouldSucceed=true] - Whether the promise should resolve or reject.
 * @returns {Promise<Object>} A promise that resolves with the data or rejects with an error.
 */
function simulateApiFetch(dataToReturn, delayMs, shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        console.log(`\n--- Simulated API call successful after ${delayMs}ms ---`);
        resolve(dataToReturn); // Resolve the promise with your data
      } else {
        console.log(`\n--- Simulated API call failed after ${delayMs}ms ---`);
        reject(new Error("Simulated API Error: Network disconnected or invalid request.")); // Reject the promise with an error
      }
    }, delayMs);
  });
}

// --- Using the Simulated API Fetch with Promises ---

function processSimulatedData() {
  console.log("Starting simulated data processing...");

  // Simulate a successful API call
  simulateApiFetch(simulatedApiData, 1500, true) // 1.5 second delay
    .then(data => {
      // This 'then' block is executed when the simulateApiFetch Promise resolves
      console.log("\n--- Successfully received simulated data! ---");
      console.log("Simulated Data Sample:", JSON.stringify(data, null, 2).substring(0, 200) + "...");

      // --- Now crawl the received simulated data using reusable callbacks ---

      console.log("\n--- Scenario A: Collect all strings from simulated data ---");
      const simulatedStrings = [];
      const stringCollector = createTypeCollector('string', simulatedStrings);
      crawlJson(data, stringCollector);
      console.log("Simulated strings:", simulatedStrings.slice(0, 10));

      console.log("\n--- Scenario B: Collect all numbers from simulated data ---");
      const simulatedNumbers = [];
      const numberCollector = createTypeCollector('number', simulatedNumbers);
      crawlJson(data, numberCollector);
      console.log("Simulated numbers:", simulatedNumbers.slice(0, 10));

      console.log("\n--- Scenario C: Log all boolean values from simulated data ---");
      const booleanLogger = createLogger((value) => typeof value === 'boolean', 'Simulated Boolean:');
      crawlJson(data, booleanLogger);

      // You can return some processed data here if needed for further chaining
      return {
        simulatedStrings,
        simulatedNumbers
      };
    })
    .then(processedResults => {
      // This 'then' block runs after the previous one, receiving its return value
      if (processedResults) {
        console.log("\n--- Further processing of simulated results ---");
        console.log("Total simulated strings found:", processedResults.simulatedStrings.length);
      }
    })
    .catch(error => {
      // This 'catch' block handles any errors from simulateApiFetch or any .then() block
      console.error("Error processing simulated data:", error.message);
    });
}

// --- Demonstrate a simulated API error ---
function processSimulatedError() {
  console.log("\nStarting simulated error processing...");
  simulateApiFetch({}, 1000, false) // Simulate an error after 1 second
    .then(data => {
      console.log("This should not be reached if an error was simulated.");
    })
    .catch(error => {
      console.error("Caught simulated error successfully:", error.message);
    });
}


// Run the simulation
processSimulatedData();

// Run the error simulation after a short delay so output doesn't mix immediately
setTimeout(() => {
    processSimulatedError();
}, 2000); // Start error simulation after the success one has likely finished its initial fetch message