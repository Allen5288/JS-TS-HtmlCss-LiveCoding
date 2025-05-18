// flat
const arr = [1, 2, [3, 4], 5];
const flatArr = arr.flat();
console.log(flatArr); // [1, 2, 3, 4, 5]

// flat with depth
const arr2 = [1, 2, [3, 4, [5, 6]]];
const flatArr2 = arr2.flat(2);
console.log(flatArr2); // [1, 2, 3, 4, 5, 6]

const arr3 = [1, 2, [3, 4], [5, [6, 7]]];
const flatArr3 = arr3.flat(1);
console.log(flatArr3); // [1, 2, 3, 4, 5, [6, 7]]