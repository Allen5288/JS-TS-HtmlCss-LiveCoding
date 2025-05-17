// JavaScript Closures
// A closure is a function that has access to its own scope, the outer function's scope, 
// and the global scope, even after the outer function has returned.

// ----- BASIC CLOSURE EXAMPLE -----

// 1. Simple closure example
function createGreeting(greeting) {
  // The outer function defines a variable called 'greeting'
  
  // The inner function uses the 'greeting' variable from the outer function's scope
  return function(name) {
    console.log(`${greeting}, ${name}!`);
    // This inner function forms a closure because it "closes over" the 'greeting' variable
  };
}

// Create different greeting functions
const sayHello = createGreeting('Hello');
const sayHi = createGreeting('Hi');
const sayHowdy = createGreeting('Howdy');

// Each function maintains its own 'greeting' value through closures
sayHello('John');  // Output: Hello, John!
sayHi('Jane');     // Output: Hi, Jane!
sayHowdy('Bob');   // Output: Howdy, Bob!

// ----- PRACTICAL CLOSURE EXAMPLES -----

// 2. Counter using closure to maintain private state
function createCounter() {
  // Private variable - not accessible outside this function
  let count = 0;
  
  // Return an object with methods that have access to the private variable
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    },
    reset: function() {
      count = 0;
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getValue());  // Output: 0
console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.decrement()); // Output: 1
console.log(counter.reset());     // Output: 0

// Notice that 'count' can't be accessed directly - it's protected by the closure
// console.log(counter.count);    // Output: undefined
// The only way to interact with 'count' is through the provided methods

// 3. Factory function using closures
function createMultiplier(factor) {
  // The 'factor' is captured in a closure
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));      // Output: 10
console.log(triple(5));      // Output: 15
console.log(quadruple(5));   // Output: 20

// ----- ADVANCED CLOSURE EXAMPLES -----

// 4. Immediate Invoked Function Expression (IIFE) with closure
// This pattern is used to create private variables and methods
const calculator = (function() {
  // Private variables
  let result = 0;
  
  // Return an object with public methods
  return {
    add: function(x) {
      result += x;
      return this; // Return this for method chaining
    },
    subtract: function(x) {
      result -= x;
      return this; // Return this for method chaining
    },
    multiply: function(x) {
      result *= x;
      return this; // Return this for method chaining
    },
    divide: function(x) {
      if (x === 0) {
        console.error("Cannot divide by zero");
        return this;
      }
      result /= x;
      return this; // Return this for method chaining
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return this;
    }
  };
})(); // IIFE - Immediately invoked

// Using the calculator with method chaining
console.log(calculator.add(5).multiply(2).subtract(3).divide(2).getResult());  // Output: 3.5
calculator.reset();
console.log(calculator.getResult());  // Output: 0

// 5. Using closures for memorization (caching results)
function createMemoizedFunction(fn) {
  // Create a cache object in closure scope
  const cache = {};
  
  return function(arg) {
    // If we've seen this argument before, return the cached result
    if (arg in cache) {
      console.log(`Fetching result for ${arg} from cache`);
      return cache[arg];
    }
    
    // Otherwise, calculate the result and cache it
    console.log(`Calculating result for ${arg}`);
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

// Example: Memoized factorial function
const factorial = createMemoizedFunction(function(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // Recursive call will also benefit from memoization
});

console.log(factorial(5));  // Output: Calculating result for 5, 4, 3, 2, 1 (then) 120
console.log(factorial(5));  // Output: Fetching result for 5 from cache (then) 120
console.log(factorial(4));  // Output: Fetching result for 4 from cache (then) 24

// 6. Module pattern using closures
const bankAccount = (function() {
  // Private variables
  let balance = 0;
  const minBalance = 10; // Minimum balance requirement
  
  // Private function
  function isValidWithdrawal(amount) {
    return balance - amount >= minBalance;
  }
  
  // Public interface
  return {
    deposit: function(amount) {
      if (amount <= 0) {
        console.error("Deposit amount must be positive");
        return false;
      }
      balance += amount;
      console.log(`Deposited ${amount}. New balance: ${balance}`);
      return true;
    },
    withdraw: function(amount) {
      if (amount <= 0) {
        console.error("Withdrawal amount must be positive");
        return false;
      }
      if (!isValidWithdrawal(amount)) {
        console.error(`Cannot withdraw ${amount}. Minimum balance requirement: ${minBalance}`);
        return false;
      }
      balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${balance}`);
      return true;
    },
    getBalance: function() {
      return balance;
    }
  };
})();

// Using the bank account module
bankAccount.deposit(100);        // Output: Deposited 100. New balance: 100
bankAccount.withdraw(50);        // Output: Withdrew 50. New balance: 50
console.log(bankAccount.getBalance());  // Output: 50
bankAccount.withdraw(41);        // Output: Cannot withdraw 41. Minimum balance requirement: 10

// Notice private variables and methods can't be accessed from outside
// console.log(bankAccount.balance);  // Output: undefined
// bankAccount.isValidWithdrawal(10); // Output: Error - isValidWithdrawal is not a function

// ----- COMMON CLOSURE PITFALLS -----

// 7. Closure in loops problem
console.log("Closure in loops problem:");

// Problematic code with var (demonstrates the issue)
function createFunctionsWithVar() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log("Value of i (with var):", i);
    });
  }
  
  return functions;
}

const functionsWithVar = createFunctionsWithVar();
functionsWithVar[0]();  // Output: Value of i (with var): 3
functionsWithVar[1]();  // Output: Value of i (with var): 3
functionsWithVar[2]();  // Output: Value of i (with var): 3
// All functions reference the same 'i', which is 3 by the time they're called

// Fix 1: Using IIFE to create a new scope for each iteration
function createFunctionsWithIIFE() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    // IIFE creates a new scope with its own copy of 'i'
    (function(capturedI) {
      functions.push(function() {
        console.log("Value of i (with IIFE):", capturedI);
      });
    })(i); // Pass the current value of 'i' to the IIFE
  }
  
  return functions;
}

const functionsWithIIFE = createFunctionsWithIIFE();
functionsWithIIFE[0]();  // Output: Value of i (with IIFE): 0
functionsWithIIFE[1]();  // Output: Value of i (with IIFE): 1
functionsWithIIFE[2]();  // Output: Value of i (with IIFE): 2

// Fix 2: Using let to create a new scope for each iteration (ES6)
function createFunctionsWithLet() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) {
    // 'let' creates a new binding for each loop iteration
    functions.push(function() {
      console.log("Value of i (with let):", i);
    });
  }
  
  return functions;
}

const functionsWithLet = createFunctionsWithLet();
functionsWithLet[0]();  // Output: Value of i (with let): 0
functionsWithLet[1]();  // Output: Value of i (with let): 1
functionsWithLet[2]();  // Output: Value of i (with let): 2

// ----- CLOSURE MEMORY CONSIDERATIONS -----

// 8. Memory considerations with closures
function createLargeDataProcessor() {
  // Large data that will be kept in memory as long as the closure exists
  const largeData = new Array(1000000).fill('some data');
  
  return function processData(index) {
    // This function holds a reference to largeData through closure
    return largeData[index];
  };
}

// This will keep the large array in memory as long as processor exists
const processor = createLargeDataProcessor();
console.log(processor(0));  // Access some data

// When we're done, set the closure reference to null to allow garbage collection
// processor = null;  // Uncomment this line in a real application to free memory

// ----- SUMMARY -----
console.log("\nClosure benefits:");
console.log("1. Data privacy and encapsulation");
console.log("2. State preservation between function calls");
console.log("3. Factory functions and function customization");
console.log("4. Module pattern implementation");
console.log("5. Implementation of design patterns like memoization");
