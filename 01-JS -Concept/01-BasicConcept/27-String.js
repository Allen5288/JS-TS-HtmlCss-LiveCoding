// List all the string methods in JavaScript

// generate string methods in JavaScript
const str = "Hello World";
const str2 = `Hello World ${str} Australia`;

// String methods in JavaScript
let str3 = "Hello World and Hello Universe";
// 1. charAt() - Returns the character at a specified index in a string.
console.log(str3.charAt(0)); // H
// 2. charCodeAt() - Returns the Unicode of the character at a specified index in a string.
console.log(str3.charCodeAt(0)); // 72
// 3. concat() - Combines two or more strings and returns a new string.
console.log(str3.concat("!", " How are you?")); // Hello World and Hello Universe! How are you?
// 4. includes() - Checks if a string contains a specified substring.
console.log(str3.includes("Hello")); // true
// 5. indexOf() - Returns the index of the first occurrence of a specified substring.
console.log(str3.indexOf("Hello")); // 0
// 6. lastIndexOf() - Returns the index of the last occurrence of a specified substring.
console.log(str3.lastIndexOf("Hello")); // 13
// 7. localeCompare() - Compares two strings in the current locale.
console.log(str3.localeCompare("Hello World")); // -1 (less than)
console.log(str3.localeCompare("Hello World and Hello Universe")); // 0 (equal)
console.log(str3.localeCompare("Hello World and Hello Universe!")); // 1 (greater than)
// 8. match() - Searches a string for a match against a regular expression.
console.log(str3.match(/Hello/g)); // [ 'Hello', 'Hello' ]
// 9. replace() - Replaces a specified substring with another substring.
console.log(str3.replace(/Hello/g, "Hi")); // Hi World and Hi Universe
// 10. slice() - Extracts a section of a string and returns it as a new string.
console.log(str3.slice(0, 5)); // Hello
// 11. split() - Splits a string into an array of substrings.
console.log(str3.split(" ")); // [ 'Hello', 'World', 'and', 'Hello', 'Universe' ]
// 12. toLowerCase() - Converts a string to lowercase.
console.log(str3.toLowerCase()); // hello world and hello universe
// 13. toUpperCase() - Converts a string to uppercase.
console.log(str3.toUpperCase()); // HELLO WORLD AND HELLO UNIVERSE
// 14. trim() - Removes whitespace from both ends of a string.
console.log(str3.trim()); // Hello World and Hello Universe
// 15. valueOf() - Returns the primitive value of a string object.
console.log(str3.valueOf()); // Hello World and Hello Universe
// 16. startsWith() - Checks if a string starts with a specified substring.
console.log(str3.startsWith("Hello")); // true
// 17. endsWith() - Checks if a string ends with a specified substring.
console.log(str3.endsWith("Universe")); // true
// 18. repeat() - Returns a new string with a specified number of copies of the original string.
console.log(str3.repeat(2)); // Hello World and Hello UniverseHello World and Hello Universe
// 19. substring() - Extracts characters from a string between two specified indices.
console.log(str3.substring(0, 5)); // Hello
// 20. substr() - Extracts a substring from a string, starting at a specified index and extending for a specified number of characters.
console.log(str3.substr(0, 5)); // Hello
// 21. search() - Searches a string for a match against a regular expression and returns the index of the match.
console.log(str3.search(/Hello/)); // 0
// 22. fromCharCode() - Converts Unicode values to characters.
console.log(String.fromCharCode(72)); // H
