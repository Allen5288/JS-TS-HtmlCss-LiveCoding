function crawlJson(data, callBackFunction) {
  if (data === null || typeof data != "object") {
    callBackFunction(data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((item) => {
      crawlJson(item, callBackFunction);
    });
  } else {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        crawlJson(data[key], callBackFunction);
      }
    }
  }
}

const nestedJson = {
  id: 1,
  name: "Product A",
  details: {
    sku: "PA-123",
    dimensions: {
      width: 10,
      height: 20,
      unit: "cm",
    },
    features: ["color", "material"],
    description: null,
  },
  categories: [
    { id: 101, name: "Electronics" },
    { id: 102, name: "Gadgets", subCategories: ["Smartphones", "Wearables"] },
  ],
  price: 99.99,
  available: true,
  manufacturer: {
    name: "TechCorp",
    address: {
      street: "123 Tech Lane",
      city: "Innoville",
    },
  },
  reviews: [
    { rating: 5, comment: "Great product!" },
    { rating: 4, comment: "Good value.", tags: ["durable", "easy to use"] },
  ],
};

console.log("--- Crawling all values ---");
const allValues = [];
crawlJson(nestedJson, (value) => {
  allValues.push(value);
});
console.log(allValues);

console.log("\n--- Finding all strings ---");
const allStrings = [];
crawlJson(nestedJson, (value) => {
  if (typeof value === "string") {
    allStrings.push(value);
  }
});
console.log(allStrings);

console.log("\n--- Counting numbers ---");
let numberCount = 0;
crawlJson(nestedJson, (value) => {
  if (typeof value === "number") {
    numberCount++;
  }
});
console.log("Total numbers found:", numberCount);

console.log("\n--- Custom action: Log non-null primitive values ---");
crawlJson(nestedJson, (value) => {
  if (value !== null && typeof value !== "object" && !Array.isArray(value)) {
    console.log("Found primitive value:", value);
  }
});

console.log("\n--- More complex action: Collect all 'name' values ---");
const namesFound = [];

function collectNames(data) {
  if (data === null || typeof data !== "object") {
    return; // Stop if it's a primitive
  }

  if (Array.isArray(data)) {
    data.forEach((item) => collectNames(item));
  } else {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === "name" && typeof data[key] === "string") {
          namesFound.push(data[key]);
        }
        collectNames(data[key]); // Recurse on the value
      }
    }
  }
}
collectNames(nestedJson);
console.log("All names found:", namesFound);
