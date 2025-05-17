// Write a function in index.ts that takes two numbers as parameters and returns their sum. 
// Use TypeScript to annotate the types of the parameters and the return value.
function addNumbers(a, b) {
    return a + b;
}
var result = addNumbers(5, 10);
console.log("The sum of 5 and 10 is: ".concat(result));
function greet(person) {
    return "Hello, my name is ".concat(person.name, " and I am ").concat(person.age, " years old.");
}
var person = { name: "Alice", age: 30 };
console.log(greet(person));
