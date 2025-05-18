// convert between string and number
const str = "123";
const num = Number(str);
console.log(num); // 123
// convert between number and string
const num2 = 123;
const str2 = String(num2);
console.log(str2); // "123"

// convert between string and boolean
const str3 = "true";
const bool = Boolean(str3);
console.log(bool); // true
// convert between boolean and string
const bool2 = true;
const str4 = String(bool2);
console.log(str4); // "true"

// convert between string and array
const str5 = "1,2,3,4,5";
const arr = str5.split(",");
console.log(arr); // ["1", "2", "3", "4", "5"]
// convert between array and string
const arr2 = [1, 2, 3, 4, 5];
const str6 = arr2.join(",");
console.log(str6); // "1,2,3,4,5"

// convert between string and object
const str7 = '{"name":"John","age":30}';
const obj = JSON.parse(str7);
console.log(obj); // { name: 'John', age: 30 }
// convert between object and string
const obj2 = { name: "John", age: 30 };
const str8 = JSON.stringify(obj2);
console.log(str8); // '{"name":"John","age":30}'