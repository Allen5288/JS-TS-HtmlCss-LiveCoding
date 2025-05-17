// Write a function in index.ts that takes two numbers as parameters and returns their sum. 
// Use TypeScript to annotate the types of the parameters and the return value.
function addNumbers(a: number, b: number): number {
    return a + b;
}

const result = addNumbers(5, 10);
console.log(`The sum of 5 and 10 is: ${result}`);


// Define an interface Person with properties name (string) and age (number). 
// Create a function greet that takes a Person object as a parameter and prints a greeting message.
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return `Hello, my name is ${person.name} and I am ${person.age} years old.`;
}

const person: Person = { name: "Alice", age: 30 };
console.log(greet(person));