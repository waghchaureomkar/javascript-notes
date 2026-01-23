# Functions & Scope - Master Guide

> **The Heart of JavaScript Programming**
> Functions are first-class citizens in JavaScript - they're the building blocks of everything!

---

## Table of Contents

1. [Function Basics](#function-basics)
2. [Function Types](#function-types)
3. [Parameters & Arguments](#parameters--arguments)
4. [Return Values](#return-values)
5. [Scope](#scope)
6. [Hoisting](#hoisting)
7. [Closures](#closures)
8. [this Keyword](#this-keyword)
9. [call, apply, bind](#call-apply-bind)
10. [Higher-Order Functions](#higher-order-functions)
11. [Pure Functions](#pure-functions)
12. [Recursion](#recursion)
13. [Currying](#currying)
14. [Interview Questions](#interview-questions)

---

## Function Basics

### What is a Function?

A function is a **reusable block of code** that performs a specific task.

```javascript
// Basic function
function greet() {
    console.log("Hello!");
}

greet();  // Call/Invoke the function
```

### Why Use Functions?

✅ **Reusability** - Write once, use many times
✅ **Organization** - Break code into logical pieces
✅ **Maintainability** - Easier to debug and update
✅ **Abstraction** - Hide complex logic

---

## Function Types

### 1. Function Declaration

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 3));  // 8
```

**Characteristics:**
- ✅ Hoisted (can call before declaration)
- ✅ Has a name
- ✅ Good for main functions

### 2. Function Expression

```javascript
const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(5, 3));  // 15
```

**Characteristics:**
- ❌ Not hoisted
- ✅ Can be anonymous
- ✅ Good for callbacks

### 3. Arrow Function (ES6)

```javascript
// Single line
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// Multiple lines
const greet = name => {
    const message = `Hello ${name}!`;
    return message;
};

// No parameters
const random = () => Math.random();
```

**Characteristics:**
- ✅ Shorter syntax
- ✅ Lexical `this` binding
- ❌ No `arguments` object
- ❌ Cannot be used as constructor

**When to use Arrow Functions:**
```javascript
// ✅ Array methods
[1, 2, 3].map(x => x * 2);

// ✅ Short callbacks
setTimeout(() => console.log("Done"), 1000);

// ❌ Object methods (this issue)
const obj = {
    count: 0,
    increment: () => {
        this.count++;  // ❌ Won't work
    }
};
```

### 4. IIFE (Immediately Invoked Function Expression)

```javascript
(function() {
    console.log("I run immediately!");
})();

// With parameters
(function(name) {
    console.log(`Hello ${name}!`);
})("John");

// Arrow IIFE
(() => {
    console.log("Modern IIFE");
})();
```

**Use cases:**
- Create private scope
- Avoid polluting global scope
- Module pattern

### 5. Anonymous Functions

```javascript
// Used as callbacks
setTimeout(function() {
    console.log("Anonymous function");
}, 1000);

// In array methods
[1, 2, 3].map(function(x) {
    return x * 2;
});
```

---

## Parameters & Arguments

### Default Parameters

```javascript
// Old way
function greet(name) {
    name = name || "Guest";
    return `Hello ${name}`;
}

// Modern way (ES6)
function greet(name = "Guest") {
    return `Hello ${name}`;
}

console.log(greet());         // "Hello Guest"
console.log(greet("John"));   // "Hello John"
```

### Rest Parameters

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15

// Must be last parameter
function log(message, ...tags) {
    console.log(message, tags);
}

log("Error", "critical", "database", "timeout");
// "Error" ["critical", "database", "timeout"]
```

### Destructuring Parameters

```javascript
// Object destructuring
function createUser({ name, age, email }) {
    return { name, age, email };
}

createUser({ name: "John", age: 25, email: "john@example.com" });

// Array destructuring
function getCoordinates([x, y]) {
    return { x, y };
}

getCoordinates([10, 20]);  // { x: 10, y: 20 }

// Default values in destructuring
function config({ port = 3000, host = 'localhost' } = {}) {
    return { port, host };
}
```

### Arguments Object (Traditional Functions)

```javascript
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum(1, 2, 3, 4));  // 10

// ⚠️ Not available in arrow functions
const multiply = () => {
    console.log(arguments);  // ❌ ReferenceError
};
```

---

## Return Values

### Basic Return

```javascript
function add(a, b) {
    return a + b;  // Returns value and exits function
    console.log("Never runs");  // Unreachable
}

let result = add(5, 3);  // 8
```

### Multiple Returns

```javascript
function getStatus(score) {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Pass";
    return "Fail";
}
```

### Returning Objects

```javascript
// Must wrap in parentheses for arrow functions
const createUser = (name, age) => ({ name, age });

// Traditional
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
```

### No Return Statement

```javascript
function doSomething() {
    console.log("Hello");
    // No return statement
}

let result = doSomething();
console.log(result);  // undefined
```

---

## Scope

### What is Scope?

**Scope** determines the **accessibility** (visibility) of variables.

### Types of Scope

#### 1. Global Scope

```javascript
let globalVar = "I'm global";

function test() {
    console.log(globalVar);  // ✅ Accessible
}

test();
console.log(globalVar);  // ✅ Accessible
```

#### 2. Function Scope

```javascript
function myFunction() {
    let localVar = "I'm local";
    console.log(localVar);  // ✅ Accessible
}

myFunction();
// console.log(localVar);  // ❌ ReferenceError
```

#### 3. Block Scope (ES6)

```javascript
if (true) {
    let blockVar = "I'm in a block";
    const alsoBlock = "Me too";
    var notBlock = "I escape!";

    console.log(blockVar);  // ✅ Works
}

// console.log(blockVar);     // ❌ Error
// console.log(alsoBlock);    // ❌ Error
console.log(notBlock);        // ✅ Works (var is function-scoped)
```

### Lexical Scope (Static Scope)

```javascript
function outer() {
    let outerVar = "outer";

    function inner() {
        let innerVar = "inner";
        console.log(outerVar);  // ✅ Can access outer scope
        console.log(innerVar);  // ✅ Can access own scope
    }

    inner();
    // console.log(innerVar);  // ❌ Cannot access inner scope
}

outer();
```

### Scope Chain

```javascript
let global = "global";

function level1() {
    let l1 = "level 1";

    function level2() {
        let l2 = "level 2";

        function level3() {
            let l3 = "level 3";
            console.log(global, l1, l2, l3);  // ✅ All accessible
        }

        level3();
    }

    level2();
}

level1();
```

---

## Hoisting

### What is Hoisting?

JavaScript **moves declarations to the top** of their scope during compilation.

### Function Hoisting

```javascript
// ✅ Works - function declarations are hoisted
greet();

function greet() {
    console.log("Hello!");
}

// ❌ Error - function expressions are NOT hoisted
sayHi();  // TypeError: sayHi is not a function

var sayHi = function() {
    console.log("Hi!");
};
```

### Variable Hoisting

```javascript
// var is hoisted (as undefined)
console.log(x);  // undefined (not error!)
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;

// let and const are hoisted but not initialized (Temporal Dead Zone)
// console.log(y);  // ❌ ReferenceError
let y = 10;
```

---

## Closures

### What is a Closure?

A **closure** is a function that has access to its outer function's variables, even after the outer function has returned.

### Basic Closure

```javascript
function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();
counter();  // 1
counter();  // 2
counter();  // 3
```

### Why Closures?

✅ **Data Privacy** - Create private variables
✅ **Function Factories** - Create customized functions
✅ **Event Handlers** - Maintain state
✅ **Callbacks** - Preserve context

### Practical Examples

#### 1. Counter with Private State

```javascript
function createCounter() {
    let count = 0;  // Private variable

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2
// console.log(counter.count);     // undefined (private!)
```

#### 2. Function Factory

```javascript
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

#### 3. Loop Closure Problem

```javascript
// ❌ Problem with var
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // 4, 4, 4 (all print 4!)
    }, i * 1000);
}

// ✅ Solution 1: Use let
for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // 1, 2, 3 (correct!)
    }, i * 1000);
}

// ✅ Solution 2: IIFE
for (var i = 1; i <= 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);  // 1, 2, 3
        }, j * 1000);
    })(i);
}
```

---

## this Keyword

### What is `this`?

`this` refers to the **context** in which a function is called.

### Rules for `this`

#### 1. Global Context

```javascript
console.log(this);  // Window (browser) or global (Node.js)
```

#### 2. Method Call

```javascript
const user = {
    name: "John",
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

user.greet();  // "Hello, I'm John"
```

#### 3. Function Call

```javascript
function showThis() {
    console.log(this);
}

showThis();  // Window (non-strict) or undefined (strict mode)
```

#### 4. Arrow Functions

```javascript
const obj = {
    name: "John",
    regularFunction() {
        console.log(this.name);  // "John"
    },
    arrowFunction: () => {
        console.log(this.name);  // undefined (lexical this)
    }
};

obj.regularFunction();
obj.arrowFunction();
```

#### 5. Constructor

```javascript
function Person(name) {
    this.name = name;
}

const john = new Person("John");
console.log(john.name);  // "John"
```

#### 6. Event Handler

```javascript
button.addEventListener('click', function() {
    console.log(this);  // button element
});

button.addEventListener('click', () => {
    console.log(this);  // Window (lexical binding)
});
```

---

## call, apply, bind

### call()

Call a function with a given `this` value and **arguments individually**.

```javascript
function greet(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user = { name: "John" };

greet.call(user, "Hello", "!");
// "Hello, I'm John!"
```

### apply()

Call a function with a given `this` value and **arguments as array**.

```javascript
function greet(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user = { name: "Jane" };

greet.apply(user, ["Hi", "."]);
// "Hi, I'm Jane."
```

### bind()

Create a **new function** with a bound `this` value.

```javascript
function greet() {
    console.log(`Hello, I'm ${this.name}`);
}

const user = { name: "John" };

const boundGreet = greet.bind(user);
boundGreet();  // "Hello, I'm John"

// With arguments
function multiply(a, b) {
    return a * b * this.factor;
}

const obj = { factor: 2 };
const double = multiply.bind(obj, 3);  // Partial application
console.log(double(5));  // 30 (3 * 5 * 2)
```

### Comparison

| Method | Executes Immediately? | Arguments | Returns |
|--------|----------------------|-----------|---------|
| call   | Yes                  | Individual| Result  |
| apply  | Yes                  | Array     | Result  |
| bind   | No                   | Individual| Function|

---

## Higher-Order Functions

### What are Higher-Order Functions?

Functions that **take functions as arguments** or **return functions**.

### Examples

```javascript
// Takes function as argument
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);  // 0, 1, 2

// Returns function
function multiplier(factor) {
    return num => num * factor;
}

const double = multiplier(2);
console.log(double(5));  // 10
```

### Array Methods (Built-in HOFs)

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform
const doubled = numbers.map(n => n * 2);

// filter - select
const evens = numbers.filter(n => n % 2 === 0);

// reduce - combine
const sum = numbers.reduce((acc, n) => acc + n, 0);

// forEach - iterate
numbers.forEach(n => console.log(n));

// find - first match
const found = numbers.find(n => n > 3);

// some - any match
const hasEven = numbers.some(n => n % 2 === 0);

// every - all match
const allPositive = numbers.every(n => n > 0);
```

---

## Pure Functions

### What is a Pure Function?

A function that:
1. **Same input → Same output** (deterministic)
2. **No side effects** (doesn't modify external state)

### Examples

```javascript
// ✅ Pure
function add(a, b) {
    return a + b;
}

// ✅ Pure
function multiply(a, b) {
    return a * b;
}

// ❌ Impure (side effect)
let count = 0;
function increment() {
    count++;  // Modifies external state
    return count;
}

// ❌ Impure (not deterministic)
function random() {
    return Math.random();  // Different output each time
}

// ❌ Impure (side effect)
function addToArray(arr, item) {
    arr.push(item);  // Mutates input
    return arr;
}

// ✅ Pure version
function addToArray(arr, item) {
    return [...arr, item];  // Returns new array
}
```

### Benefits

✅ **Predictable** - Easy to test and debug
✅ **Cacheable** - Can memoize results
✅ **Parallelizable** - No shared state
✅ **Composable** - Easy to combine

---

## Recursion

### What is Recursion?

A function that **calls itself**.

### Basic Structure

```javascript
function recursive(n) {
    // Base case (stop condition)
    if (n <= 0) {
        return;
    }

    // Recursive case
    console.log(n);
    recursive(n - 1);
}

recursive(3);  // 3, 2, 1
```

### Examples

#### Factorial

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));  // 120
```

#### Fibonacci

```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // 13
```

#### Sum Array

```javascript
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}

console.log(sumArray([1, 2, 3, 4]));  // 10
```

---

## Currying

### What is Currying?

Transforming a function with **multiple arguments** into a **sequence of functions**, each taking a single argument.

### Example

```javascript
// Normal function
function add(a, b, c) {
    return a + b + c;
}

add(1, 2, 3);  // 6

// Curried version
function addCurried(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

addCurried(1)(2)(3);  // 6

// Arrow function version
const addCurried = a => b => c => a + b + c;

// Partial application
const add1 = addCurried(1);
const add1and2 = add1(2);
console.log(add1and2(3));  // 6
```

### Use Cases

```javascript
// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// Usage
function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4));  // 24
console.log(curriedMultiply(2, 3)(4));  // 24
console.log(curriedMultiply(2)(3, 4));  // 24
```

---

## Interview Questions

### Q1: What's the difference between function declaration and expression?

**A:**
- **Declaration**: Hoisted, can be called before definition
- **Expression**: Not hoisted, assigned to variable

### Q2: Explain closures with example.

**A:** A closure gives you access to outer function's scope from inner function.

```javascript
function outer() {
    let count = 0;
    return function inner() {
        return ++count;
    };
}

const counter = outer();
console.log(counter());  // 1
console.log(counter());  // 2
```

### Q3: What will this print and why?

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```

**A:** Prints `3, 3, 3` because `var` is function-scoped. Use `let` or IIFE to fix.

### Q4: What's the difference between `call`, `apply`, and `bind`?

**A:**
- `call`: Calls function immediately, arguments individually
- `apply`: Calls function immediately, arguments as array
- `bind`: Returns new function with bound context

### Q5: What are pure functions?

**A:** Functions with no side effects that always return same output for same input.

---

## Practice Problems

1. **Create a counter using closure**
2. **Implement `Array.prototype.map` from scratch**
3. **Write a function to flatten nested arrays**
4. **Create a memoization function**
5. **Implement `debounce` and `throttle`**

---

## Next Steps

✅ Complete: Functions & Scope
⬜ Next: [Advanced JavaScript](../03-advanced/README.md)
⬜ Practice: Build mini-projects using functions

---

**Remember:** Functions are the heart of JavaScript. Master them! 🚀
