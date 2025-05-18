// sort
const arr = [1, 8, 3, 4, 5, 6, 7, 2, 9, 10];
const arr2 = arr.sort((a, b) => a - b);
console.log(arr2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// sort with string
const arr3 = ["banana", "apple", "orange", "kiwi"];
const arr4 = arr3.sort();
console.log(arr4); // ["apple", "banana", "kiwi", "orange"]

// sort with object
const arr5 = [
  { name: "John", age: 25 },
  { name: "Jane", age: 20 },
  { name: "Bob", age: 30 },
];
const arr6 = arr5.sort((a, b) => a.age - b.age);
console.log(arr6); // [{ name: "Jane", age: 20 }, { name: "John", age: 25 }, { name: "Bob", age: 30 }]

// sort with custom function
const arr7 = [
  { name: "John", age: 25 },
  { name: "Jane", age: 20 },
  { name: "Bob", age: 30 },
];
const compareFunc = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
const arr8 = arr7.sort(compareFunc);
console.log(arr8); // [{ name: "Bob", age: 30 }, { name: "Jane", age: 20 }, { name: "John", age: 25 }]

// sort with custom function and locale
const arr9 = [
  { name: "John", age: 25 },
  { name: "Jane", age: 20 },
  { name: "Bob", age: 30 },
];
const arr10 = arr9.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
console.log(arr10); // [{ name: "Bob", age: 30 }, { name: "Jane", age: 20 }, { name: "John", age: 25 }]