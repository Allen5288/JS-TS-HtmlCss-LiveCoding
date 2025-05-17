// JavaScript Map - A collection of key-value pairs with key order preservation

// ----- CREATING MAPS -----

// 1. Creating an empty Map
const emptyMap = new Map();
console.log('Empty Map:', emptyMap);
// Output: Empty Map: Map(0) {}

// 2. Creating a Map from an array of key-value pairs
const userMap = new Map([
  ['id1', 'John Doe'],
  ['id2', 'Jane Smith'],
  ['id3', 'Bob Johnson']
]);
console.log('Map from array of pairs:', userMap);
// Output: Map from array of pairs: Map(3) {'id1' => 'John Doe', 'id2' => 'Jane Smith', 'id3' => 'Bob Johnson'}

// ----- MAP PROPERTIES -----

// 1. size - returns the number of key-value pairs in the Map
console.log('Size of userMap:', userMap.size);
// Output: Size of userMap: 3

// ----- MAP METHODS -----

// 1. set() - adds or updates a key-value pair in the Map
const fruitPrices = new Map();
fruitPrices.set('apple', 1.29);
fruitPrices.set('banana', 0.79);
fruitPrices.set('orange', 1.09);
console.log('After setting values:', fruitPrices);
// Output: After setting values: Map(3) {'apple' => 1.29, 'banana' => 0.79, 'orange' => 1.09}

// set() returns the Map itself, allowing for chaining
fruitPrices.set('mango', 2.49).set('pineapple', 3.99).set('grape', 4.29);
console.log('After chained set():', fruitPrices);
// Output: After chained set(): Map(6) {'apple' => 1.29, 'banana' => 0.79, 'orange' => 1.09, 'mango' => 2.49, 'pineapple' => 3.99, 'grape' => 4.29}

// Setting existing keys will update the value
fruitPrices.set('apple', 1.49);
console.log('After updating a value:', fruitPrices);
// Output: After updating a value: Map(6) {'apple' => 1.49, 'banana' => 0.79, 'orange' => 1.09, 'mango' => 2.49, 'pineapple' => 3.99, 'grape' => 4.29}

// 2. get() - retrieves a value by its key
console.log('Price of banana:', fruitPrices.get('banana'));
// Output: Price of banana: 0.79

console.log('Price of watermelon:', fruitPrices.get('watermelon'));
// Output: Price of watermelon: undefined

// 3. has() - checks if a key exists in the Map
console.log('Has apple?', fruitPrices.has('apple'));
// Output: Has apple? true

console.log('Has watermelon?', fruitPrices.has('watermelon'));
// Output: Has watermelon? false

// 4. delete() - removes a key-value pair by key
fruitPrices.delete('banana');
console.log('After deleting banana:', fruitPrices);
// Output: After deleting banana: Map(5) {'apple' => 1.49, 'orange' => 1.09, 'mango' => 2.49, 'pineapple' => 3.99, 'grape' => 4.29}

// delete() returns a boolean indicating if deletion was successful
const deleteResult1 = fruitPrices.delete('orange'); // exists
const deleteResult2 = fruitPrices.delete('banana'); // doesn't exist anymore
console.log('Delete results:', deleteResult1, deleteResult2);
// Output: Delete results: true false

// 5. clear() - removes all key-value pairs from the Map
const colorHex = new Map([
  ['red', '#FF0000'],
  ['green', '#00FF00'],
  ['blue', '#0000FF']
]);
console.log('Before clear():', colorHex);
// Output: Before clear(): Map(3) {'red' => '#FF0000', 'green' => '#00FF00', 'blue' => '#0000FF'}

colorHex.clear();
console.log('After clear():', colorHex);
// Output: After clear(): Map(0) {}

// ----- ITERATION METHODS -----

// Create a Map for demonstrating iteration
const countries = new Map([
  ['US', 'United States'],
  ['CA', 'Canada'],
  ['MX', 'Mexico'],
  ['BR', 'Brazil']
]);

// 1. keys() - returns an iterator of all keys in the Map
console.log('keys() iterator:');
const keysIterator = countries.keys();
for (const key of keysIterator) {
  console.log(key);
}
// Output:
// US
// CA
// MX
// BR

// 2. values() - returns an iterator of all values in the Map
console.log('values() iterator:');
const valuesIterator = countries.values();
for (const value of valuesIterator) {
  console.log(value);
}
// Output:
// United States
// Canada
// Mexico
// Brazil

// 3. entries() - returns an iterator of [key, value] pairs
console.log('entries() iterator:');
const entriesIterator = countries.entries();
for (const entry of entriesIterator) {
  console.log(entry);
}
// Output:
// ['US', 'United States']
// ['CA', 'Canada']
// ['MX', 'Mexico']
// ['BR', 'Brazil']

// 4. forEach() - executes a function for each key-value pair
console.log('forEach() method:');
countries.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});
// Output:
// US: United States
// CA: Canada
// MX: Mexico
// BR: Brazil

// 5. for...of - iterates over Map entries
console.log('for...of loop with destructuring:');
for (const [code, name] of countries) {
  console.log(`${code} - ${name}`);
}
// Output:
// US - United States
// CA - Canada
// MX - Mexico
// BR - Brazil

// ----- ADVANCED MAP FEATURES -----

// 1. Using objects as keys (not possible with regular objects)
const employeeMap = new Map();

const john = { name: 'John', id: 1 };
const jane = { name: 'Jane', id: 2 };

employeeMap.set(john, { department: 'IT', salary: 50000 });
employeeMap.set(jane, { department: 'HR', salary: 60000 });

console.log('Map with object keys:', employeeMap);
// Output: Map with object keys: Map(2) { {name: 'John', id: 1} => {department: 'IT', salary: 50000}, {name: 'Jane', id: 2} => {department: 'HR', salary: 60000} }

console.log('John\'s info:', employeeMap.get(john));
// Output: John's info: { department: 'IT', salary: 50000 }

// 2. Converting between Maps and Arrays
const mapEntries = [...countries.entries()];
console.log('Map to array of entries:', mapEntries);
// Output: Map to array of entries: [['US', 'United States'], ['CA', 'Canada'], ['MX', 'Mexico'], ['BR', 'Brazil']]

const mapFromEntries = new Map([
  ['FR', 'France'],
  ['DE', 'Germany'],
  ['IT', 'Italy']
]);
console.log('Map from array of entries:', mapFromEntries);
// Output: Map from array of entries: Map(3) {'FR' => 'France', 'DE' => 'Germany', 'IT' => 'Italy'}

// 3. Converting between Maps and Objects
// Map to Object (works best when keys are strings)
const countryObj = Object.fromEntries(countries);
console.log('Map to Object:', countryObj);
// Output: Map to Object: { US: 'United States', CA: 'Canada', MX: 'Mexico', BR: 'Brazil' }

// Object to Map
const carObj = { toyota: 'Camry', honda: 'Civic', ford: 'Mustang' };
const carMap = new Map(Object.entries(carObj));
console.log('Object to Map:', carMap);
// Output: Object to Map: Map(3) {'toyota' => 'Camry', 'honda' => 'Civic', 'ford' => 'Mustang'}

// 4. Map merging
const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['b', 3], ['c', 4]]);
const mergedMap = new Map([...map1, ...map2]); // Note: map2 values override map1 on duplicate keys
console.log('Merged Map:', mergedMap);
// Output: Merged Map: Map(3) {'a' => 1, 'b' => 3, 'c' => 4} // Note that 'b' value from map2 overwrites map1

// 5. Filtering and transforming Maps
const prices = new Map([
  ['apple', 1.49],
  ['banana', 0.79],
  ['orange', 1.09],
  ['mango', 2.49]
]);

// Filter items less than $1
const cheapFruits = new Map(
  [...prices].filter(([_, price]) => price < 1)
);
console.log('Cheap fruits:', cheapFruits);
// Output: Cheap fruits: Map(1) {'banana' => 0.79}

// Apply a discount to all prices
const discountedPrices = new Map(
  [...prices].map(([fruit, price]) => [fruit, price * 0.9])
);
console.log('Discounted prices:', discountedPrices);
// Output: Discounted prices: Map(4) {'apple' => 1.341, 'banana' => 0.711, 'orange' => 0.981, 'mango' => 2.241}

// ----- PERFORMANCE CONSIDERATIONS -----
console.log('Map vs. Object performance benefits:');
console.log('1. Maps have built-in methods for common operations');
console.log('2. Maps preserve insertion order of keys');
console.log('3. Keys can be any value (including objects, functions)');
console.log('4. Maps are optimized for frequent additions/removals');
console.log('5. Maps have O(1) lookup time complexity like Objects');
// Output is the list of performance benefits as shown above
