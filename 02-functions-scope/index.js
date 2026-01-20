// ============================================
// FUNCTIONS & SCOPE
// ============================================

console.log('=== 1. FUNCTION DECLARATIONS ===\n');

// Function Declaration (hoisted)
function greet(name) {
  return `Hello, ${name}!`;
}
console.log('Function declaration:', greet('Omkar'));

// Function Expression (not hoisted)
const greetExpression = function(name) {
  return `Hi, ${name}!`;
};
console.log('Function expression:', greetExpression('Omkar'));

// Arrow Function
const greetArrow = (name) => `Hey, ${name}!`;
console.log('Arrow function:', greetArrow('Omkar'));

// Arrow function with multiple statements
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log('Arrow with block:', multiply(5, 3));

// Arrow function with no parameters
const sayHello = () => 'Hello!';
console.log('Arrow no params:', sayHello());

// Arrow function with single parameter (no parentheses needed)
const double = x => x * 2;
console.log('Arrow single param:', double(5));

console.log('\n=== 2. FUNCTION PARAMETERS ===\n');

// Default Parameters
function greetWithDefault(name = 'Guest') {
  return `Hello, ${name}!`;
}
console.log('Default param (with value):', greetWithDefault('Omkar'));
console.log('Default param (no value):', greetWithDefault());

// Rest Parameters
function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log('Rest parameters:', sumAll(1, 2, 3, 4, 5));

// Destructuring Parameters
function displayUser({ name, age, city = 'Unknown' }) {
  return `${name} is ${age} years old from ${city}`;
}
const user = { name: 'Omkar', age: 25 };
console.log('Destructured params:', displayUser(user));

console.log('\n=== 3. RETURN VALUES ===\n');

// Single return value
function add(a, b) {
  return a + b;
}
console.log('Single return:', add(5, 3));

// Multiple return values (using object)
function getCoordinates() {
  return { x: 10, y: 20 };
}
const { x, y } = getCoordinates();
console.log('Multiple returns (object):', { x, y });

// Multiple return values (using array)
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([1, 5, 3, 9, 2]);
console.log('Multiple returns (array):', { min, max });

// Early return
function checkAge(age) {
  if (age < 0) return 'Invalid age';
  if (age < 18) return 'Minor';
  return 'Adult';
}
console.log('Early return:', checkAge(25));

console.log('\n=== 4. SCOPE ===\n');

// Global Scope
const globalVar = 'I am global';

function testGlobalScope() {
  console.log('Access global from function:', globalVar);
}
testGlobalScope();

// Function Scope
function testFunctionScope() {
  const functionVar = 'I am in function scope';
  console.log('Inside function:', functionVar);
}
testFunctionScope();
// console.log(functionVar); // Error! functionVar is not defined

// Block Scope (let and const)
if (true) {
  const blockVar = 'I am in block scope';
  let blockLet = 'I am also in block scope';
  console.log('Inside block:', blockVar);
}
// console.log(blockVar); // Error! blockVar is not defined

// var is function scoped, not block scoped
if (true) {
  var varVariable = 'var is function scoped';
}
console.log('var outside block:', varVariable); // Works!

console.log('\n=== 5. HOISTING ===\n');

// Function Declaration Hoisting
console.log('Call hoisted function:', hoistedFunction()); // Works!
function hoistedFunction() {
  return 'I am hoisted!';
}

// var Hoisting
console.log('Hoisted var:', hoistedVar); // undefined (not error)
var hoistedVar = 'I am hoisted but undefined initially';

// let and const are not hoisted (Temporal Dead Zone)
// console.log(notHoisted); // Error! Cannot access before initialization
let notHoisted = 'I am not hoisted';

console.log('\n=== 6. CLOSURES ===\n');

// Basic Closure
function outer() {
  const outerVar = 'I am from outer function';

  function inner() {
    console.log('Closure accessing:', outerVar);
  }

  return inner;
}

const closureFunc = outer();
closureFunc(); // Can still access outerVar!

// Practical Closure Example - Counter
function createCounter() {
  let count = 0;

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
    }
  };
}

const counter = createCounter();
console.log('Counter increment:', counter.increment());
console.log('Counter increment:', counter.increment());
console.log('Counter getValue:', counter.getValue());
console.log('Counter decrement:', counter.decrement());

// Closure in Loop (common interview question)
console.log('\nClosure in loops:');
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(`  let in loop: ${i}`); // Prints 0, 1, 2
  }, 100);
}

// Private variables using closure
function BankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount > balance) return 'Insufficient funds';
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = BankAccount(1000);
console.log('\nBank account balance:', account.getBalance());
console.log('After deposit 500:', account.deposit(500));
console.log('After withdraw 200:', account.withdraw(200));

console.log('\n=== 7. THIS KEYWORD ===\n');

// this in regular function
const obj = {
  name: 'Omkar',
  regularFunc: function() {
    console.log('Regular function this.name:', this.name);
  }
};
obj.regularFunc();

// this in arrow function (lexical this)
const objArrow = {
  name: 'Omkar',
  arrowFunc: () => {
    console.log('Arrow function this:', this); // Global/undefined
  },
  methodWithArrow: function() {
    const arrow = () => {
      console.log('Arrow inside method, this.name:', this.name);
    };
    arrow();
  }
};
objArrow.arrowFunc();
objArrow.methodWithArrow();

// call, apply, bind
function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}

const person = { name: 'Omkar' };

console.log('\ncall():', introduce.call(person, 'Hello', '!'));
console.log('apply():', introduce.apply(person, ['Hi', '.']));

const boundFunc = introduce.bind(person, 'Hey');
console.log('bind():', boundFunc('...'));

console.log('\n=== 8. IIFE (Immediately Invoked Function Expression) ===\n');

// IIFE to avoid polluting global scope
(function() {
  const privateVar = 'I am private';
  console.log('IIFE executed:', privateVar);
})();

// IIFE with parameters
(function(name) {
  console.log(`IIFE with param: Hello, ${name}!`);
})('Omkar');

// IIFE with arrow function
(() => {
  console.log('Arrow IIFE executed');
})();

console.log('\n=== 9. CALLBACK FUNCTIONS ===\n');

// Basic callback
function processUserInput(callback) {
  const name = 'Omkar';
  callback(name);
}

processUserInput((name) => {
  console.log('Callback executed:', `Hello, ${name}!`);
});

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];

console.log('\nmap():', numbers.map(num => num * 2));
console.log('filter():', numbers.filter(num => num > 2));
console.log('reduce():', numbers.reduce((sum, num) => sum + num, 0));
console.log('forEach():');
numbers.forEach(num => console.log(`  ${num}`));

// Find methods
console.log('\nfind():', numbers.find(num => num > 3));
console.log('findIndex():', numbers.findIndex(num => num > 3));
console.log('some():', numbers.some(num => num > 4));
console.log('every():', numbers.every(num => num > 0));

console.log('\n=== 10. HIGHER-ORDER FUNCTIONS ===\n');

// Function that returns a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double2 = multiplier(2);
const triple = multiplier(3);

console.log('Higher-order function double:', double2(5));
console.log('Higher-order function triple:', triple(5));

// Function that takes a function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

console.log('\nRepeat with callback:');
repeat(3, (i) => {
  console.log(`  Iteration ${i}`);
});

console.log('\n=== 11. PURE FUNCTIONS ===\n');

// Pure function (same input = same output, no side effects)
function pureAdd(a, b) {
  return a + b;
}
console.log('Pure function:', pureAdd(2, 3));
console.log('Pure function:', pureAdd(2, 3)); // Always same result

// Impure function (has side effects)
let total = 0;
function impureAdd(a) {
  total += a; // Modifies external state
  return total;
}
console.log('Impure function:', impureAdd(5));
console.log('Impure function:', impureAdd(5)); // Different result!

console.log('\n=== 12. RECURSION ===\n');

// Factorial using recursion
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive case
}
console.log('Factorial(5):', factorial(5));

// Fibonacci using recursion
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log('Fibonacci(7):', fibonacci(7));

// Countdown using recursion
function countdown(n) {
  if (n <= 0) {
    console.log('  Blast off!');
    return;
  }
  console.log(` ${n}...`);
  countdown(n - 1);
}
console.log('\nCountdown:');
countdown(3);

console.log('\n=== 13. CURRYING ===\n');

// Basic currying
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log('Curried function:', curriedAdd(1)(2)(3));

// Practical currying
const curriedMultiply = (a) => (b) => a * b;
const multiplyBy5 = curriedMultiply(5);
console.log('Currying practical:', multiplyBy5(10));

console.log('\n✅ Functions & Scope completed! Run: npm run functions');
