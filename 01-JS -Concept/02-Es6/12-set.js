// JavaScript Set - A collection of unique values

// ----- CREATING SETS -----

// 1. Creating an empty Set
const emptySet = new Set();
console.log('Empty Set:', emptySet);
// Output: Empty Set: Set(0) {}

// 2. Creating a Set from an array
const numbersArray = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
const numbersSet = new Set(numbersArray);
console.log('Set from array:', numbersSet); // Duplicates are automatically removed
// Output: Set from array: Set(5) { 1, 2, 3, 4, 5 }
console.log('Original array:', numbersArray);
// Output: Original array: [1, 2, 3, 4, 5, 5, 4, 3, 2, 1]

// 3. Creating a Set from a string
const lettersSet = new Set('hello');
console.log('Set from string:', lettersSet); // {'h', 'e', 'l', 'o'}
// Output: Set from string: Set(4) { 'h', 'e', 'l', 'o' } - Note only one 'l' is kept

// ----- SET PROPERTIES -----

// 1. size - returns the number of elements in the Set
console.log('Size of numbersSet:', numbersSet.size); // 5
// Output: Size of numbersSet: 5

// ----- SET METHODS -----

// 1. add() - adds a new element to the Set
const fruitsSet = new Set();
fruitsSet.add('apple');
fruitsSet.add('banana');
fruitsSet.add('orange');
console.log('After adding elements:', fruitsSet);
// Output: After adding elements: Set(3) { 'apple', 'banana', 'orange' }

// add() returns the Set itself, allowing for chaining
fruitsSet.add('mango').add('pineapple').add('grape');
console.log('After chained add():', fruitsSet);
// Output: After chained add(): Set(6) { 'apple', 'banana', 'orange', 'mango', 'pineapple', 'grape' }

// Adding duplicate elements (will be ignored)
fruitsSet.add('apple');
console.log('After adding duplicate:', fruitsSet); // Apple not added twice
// Output: After adding duplicate: Set(6) { 'apple', 'banana', 'orange', 'mango', 'pineapple', 'grape' }

// 2. delete() - removes a specified element from the Set
fruitsSet.delete('banana');
console.log('After delete():', fruitsSet);
// Output: After delete(): Set(5) { 'apple', 'orange', 'mango', 'pineapple', 'grape' }

// delete() returns a boolean indicating if deletion was successful
const deleteResult1 = fruitsSet.delete('orange'); // exists
const deleteResult2 = fruitsSet.delete('banana'); // doesn't exist anymore
console.log('Delete results:', deleteResult1, deleteResult2); // true, false
// Output: Delete results: true false

// 3. has() - checks if an element exists in the Set
console.log('Has apple?', fruitsSet.has('apple')); // true
// Output: Has apple? true
console.log('Has banana?', fruitsSet.has('banana')); // false
// Output: Has banana? false

// 4. clear() - removes all elements from the Set
const colorSet = new Set(['red', 'green', 'blue']);
console.log('Before clear():', colorSet);
// Output: Before clear(): Set(3) { 'red', 'green', 'blue' }
colorSet.clear();
console.log('After clear():', colorSet); // empty set
// Output: After clear(): Set(0) {}

// ----- ITERATION METHODS -----

// Create a Set for demonstrating iteration
const carsSet = new Set(['BMW', 'Mercedes', 'Audi', 'Toyota']);

// 1. values() - returns an iterator of all values in the Set
console.log('values() iterator:');
const valuesIterator = carsSet.values();
for (const value of valuesIterator) {
  console.log(value);
}

// 2. keys() - same as values() in Sets (for compatibility with Map)
console.log('keys() iterator (same as values in Sets):');
const keysIterator = carsSet.keys();
for (const key of keysIterator) {
  console.log(key);
}

// 3. entries() - returns an iterator of [value, value] pairs
console.log('entries() iterator:');
const entriesIterator = carsSet.entries();
for (const entry of entriesIterator) {
  console.log(entry); // [value, value] pairs
}

// 4. forEach() - executes a function for each element
console.log('forEach() method:');
carsSet.forEach((value, valueAgain, set) => {
  console.log(`Value: ${value}, ValueAgain: ${valueAgain}`);
});

// 5. for...of - iterates over Set values
console.log('for...of loop:');
for (const car of carsSet) {
  console.log(car);
}

// ----- COMMON SET OPERATIONS -----

// Example: Remove duplicates from an array
const duplicatesArray = [1, 2, 3, 4, 4, 5, 5, 5, 6];
const uniqueArray = [...new Set(duplicatesArray)];
console.log('Removing duplicates:', uniqueArray);

// Example: Set operations using Sets
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union (A ∪ B)
const union = new Set([...setA, ...setB]);
console.log('Union of sets:', union);

// Intersection (A ∩ B)
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log('Intersection of sets:', intersection);

// Difference (A - B)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log('Difference of sets (A - B):', difference);

// Example: Check if a set is a subset of another
function isSubset(setA, setB) {
  return [...setA].every(element => setB.has(element));
}

const set1 = new Set([1, 2]);
const set2 = new Set([1, 2, 3, 4]);
console.log('Is set1 a subset of set2?', isSubset(set1, set2)); // true
console.log('Is set2 a subset of set1?', isSubset(set2, set1)); // false

// Example: Converting between Sets and Arrays
const setFromArray = new Set([1, 2, 3]);
const arrayFromSet = Array.from(setFromArray);
// Alternative: const arrayFromSet = [...setFromArray];
console.log('Set to Array:', arrayFromSet);
