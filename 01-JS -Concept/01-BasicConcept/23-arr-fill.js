// fill()
// The fill() method fills the elements in an array with a static value.
const array1 = [1, 2, 3, 4, 5];
// Fill all elements with 0
array1.fill(0);
console.log(array1); // [0, 0, 0, 0, 0]

// Fill from index 1 to 3 with 0
const array2 = [1, 2, 3, 4, 5];
array2.fill(0, 1, 4);
console.log(array2); // [1, 0, 0, 0, 5]

