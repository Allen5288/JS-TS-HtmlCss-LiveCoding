// slice
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.slice(0, 3);
console.log(arr2); // [1, 2, 3]

// slice with 1 argument
const arr3 = arr.slice(2);
console.log(arr3); // [3, 4, 5]

// slice with negative index
const arr4 = arr.slice(-3);
console.log(arr4); // [3, 4, 5]

// slice with negative index and 1 argument
const arr5 = arr.slice(-3, -1);
console.log(arr5); // [3, 4]

// splice
const arr6 = [1, 2, 3, 4, 5];
const arr7 = arr6.splice(0, 3);
console.log(arr6); // [4, 5]
console.log(arr7); // [1, 2, 3]

// splice with 1 argument
const arr8 = [1,2,3,4,5];
const arr9 = arr8.splice(2);
console.log(arr8); // [1, 2]
console.log(arr9); // [3, 4, 5]

// splice with negative index
const arr10 = [1, 2, 3, 4, 5];
const arr11 = arr10.splice(-3);
console.log(arr10); // [1, 2]
console.log(arr11); // [3, 4, 5]

// splice with negative index and 1 argument
const arr12 = [1, 2, 3, 4, 5];
const arr13 = arr12.splice(-3, 1);
console.log(arr12); // [1, 2, 4, 5]
console.log(arr13); // [3]

// splice add
const arr14 = [1, 2, 3, 4, 5];
arr14.splice(2, 0, "a", "b");
console.log(arr14); // [1, 2, "a", "b", 3, 4, 5]
// splice remove and add (replace)
const arr15 = [1, 2, 3, 4, 5];
arr15.splice(2, 1, "a", "b");
console.log(arr15); // [1, 2, "a", "b", 4, 5]

// splice remove and add with negative index
const arr16 = [1, 2, 3, 4, 5];
arr16.splice(-3, 1, "a", "b");
console.log(arr16); // [1, 2, "a", "b", 4, 5]
