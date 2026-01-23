# JavaScript Basics - Complete Guide

> **Foundation of JavaScript Programming**
> Master the fundamentals before moving to advanced concepts.

---

## Table of Contents

1. [Variables](#variables)
2. [Data Types](#data-types)
3. [Type Conversion](#type-conversion)
4. [Operators](#operators)
5. [Strings](#strings)
6. [Arrays](#arrays)
7. [Objects](#objects)
8. [Conditionals](#conditionals)
9. [Loops](#loops)
10. [Modern Features](#modern-features)
11. [Interview Questions](#interview-questions)
12. [Practice Problems](#practice-problems)

---

## Variables

### What are Variables?

Variables are **containers for storing data values**. Think of them as labeled boxes where you can store information.

### Types of Variable Declarations

#### 1. `var` (Old way - avoid in modern code)

```javascript
var name = "John";
var age = 25;

// Problems with var:
// - Function scoped (not block scoped)
// - Can be re-declared
// - Gets hoisted
```

**Issues:**
- ❌ No block scope
- ❌ Can be accidentally re-declared
- ❌ Creates bugs in large codebases

#### 2. `let` (Modern - use for values that change)

```javascript
let count = 0;
count = 1; // ✅ Can reassign

let score = 10;
// let score = 20; // ❌ Error: Cannot redeclare

if (true) {
    let blockVar = "inside";
    console.log(blockVar); // ✅ Works
}
// console.log(blockVar); // ❌ Error: Not accessible outside block
```

**Use when:**
- ✅ Value will change
- ✅ Need block scope
- ✅ Loop counters

#### 3. `const` (Modern - use by default)

```javascript
const PI = 3.14159;
// PI = 3.14; // ❌ Error: Cannot reassign

const user = { name: "John" };
user.name = "Jane"; // ✅ Can modify object properties
user.age = 25;      // ✅ Can add properties
// user = {};       // ❌ Cannot reassign the variable itself

const arr = [1, 2, 3];
arr.push(4);  // ✅ Can modify array
// arr = [];  // ❌ Cannot reassign
```

**Use when:**
- ✅ Value should not be reassigned
- ✅ Object/Array (default choice)
- ✅ Constants

### Variable Naming Rules

```javascript
// ✅ Valid names
let firstName = "John";
let _private = "secret";
let $jquery = "library";
let user123 = "test";

// ❌ Invalid names
// let 123user = "test";     // Cannot start with number
// let first-name = "John";  // No hyphens
// let let = "keyword";      // Cannot use reserved keywords
```

**Best Practices:**
- Use **camelCase** for variables: `firstName`, `userAge`
- Use **UPPER_CASE** for constants: `MAX_SIZE`, `API_KEY`
- Use **descriptive names**: `userEmail` not `ue`
- Avoid single letters except in loops: `i`, `j`, `k`

---

## Data Types

JavaScript has **8 data types**: 7 primitive + 1 object type.

### Primitive Types (Immutable)

#### 1. String

```javascript
let name = "John";
let message = 'Hello';
let template = `Hello ${name}`; // Template literal

// String methods
console.log(name.length);           // 4
console.log(name.toUpperCase());    // JOHN
console.log(name.toLowerCase());    // john
console.log(name.charAt(0));        // J
console.log(name.includes("oh"));   // true
```

#### 2. Number

```javascript
let age = 25;
let price = 99.99;
let negative = -10;

// Special numeric values
let inf = Infinity;
let negInf = -Infinity;
let notANumber = NaN;

// Number methods
console.log(Number.isInteger(25));     // true
console.log(Number.isNaN(NaN));        // true
console.log((99.99).toFixed(1));       // "100.0"
```

#### 3. BigInt (for very large numbers)

```javascript
let bigNum = 1234567890123456789012345678901234567890n;
let another = BigInt("9007199254740991");
```

#### 4. Boolean

```javascript
let isActive = true;
let isDeleted = false;

// Truthy values: true, 1, "hello", [], {}, etc.
// Falsy values: false, 0, "", null, undefined, NaN
```

#### 5. Undefined

```javascript
let x;
console.log(x); // undefined

function test() {
    // No return statement
}
console.log(test()); // undefined
```

#### 6. Null

```javascript
let empty = null; // Intentional absence of value

// Common mistake
console.log(typeof null); // "object" (JavaScript bug)
```

#### 7. Symbol (unique identifier)

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (always unique)
```

### Reference Type

#### 8. Object

```javascript
// Object literal
let user = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

// Array (special object)
let numbers = [1, 2, 3, 4, 5];

// Function (special object)
function greet() {
    return "Hello";
}
```

### Type Checking

```javascript
console.log(typeof "hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object" ⚠️
console.log(typeof {});             // "object"
console.log(typeof []);             // "object" ⚠️

// Better array check
console.log(Array.isArray([]));     // true
```

---

## Type Conversion

### Implicit Conversion (Coercion)

```javascript
// String coercion
console.log("5" + 3);        // "53"
console.log("5" + true);     // "5true"

// Number coercion
console.log("5" - 3);        // 2
console.log("5" * "2");      // 10
console.log("10" / 2);       // 5

// Boolean coercion
console.log(Boolean(""));    // false
console.log(Boolean("hi"));  // true
console.log(Boolean(0));     // false
console.log(Boolean(1));     // true
```

### Explicit Conversion

```javascript
// To String
String(123);              // "123"
(123).toString();         // "123"

// To Number
Number("123");            // 123
parseInt("123px");        // 123
parseFloat("12.34");      // 12.34
+"123";                   // 123 (unary plus)

// To Boolean
Boolean(1);               // true
Boolean(0);               // false
!!"hello";                // true (double NOT)
```

---

## Operators

### Arithmetic Operators

```javascript
let a = 10, b = 3;

console.log(a + b);   // 13 (Addition)
console.log(a - b);   // 7  (Subtraction)
console.log(a * b);   // 30 (Multiplication)
console.log(a / b);   // 3.333... (Division)
console.log(a % b);   // 1  (Remainder/Modulo)
console.log(a ** b);  // 1000 (Exponentiation)

// Increment/Decrement
let x = 5;
console.log(x++);     // 5 (returns then increments)
console.log(++x);     // 7 (increments then returns)
```

### Comparison Operators

```javascript
// Loose equality (with type coercion)
console.log(5 == "5");      // true ⚠️
console.log(0 == false);    // true ⚠️

// Strict equality (no type coercion)
console.log(5 === "5");     // false ✅
console.log(0 === false);   // false ✅

// Other comparisons
console.log(10 > 5);        // true
console.log(10 >= 10);      // true
console.log(5 < 10);        // true
console.log(5 !== "5");     // true
```

**Rule:** Always use `===` and `!==` (strict equality)

### Logical Operators

```javascript
// AND (&&)
console.log(true && true);    // true
console.log(true && false);   // false

// OR (||)
console.log(true || false);   // true
console.log(false || false);  // false

// NOT (!)
console.log(!true);           // false
console.log(!false);          // true

// Short-circuit evaluation
let user = null;
let name = user && user.name;  // null (doesn't throw error)

let defaultName = name || "Guest";  // "Guest"
```

### Assignment Operators

```javascript
let x = 10;

x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 5;   // x = x % 5  → 1
x **= 3;  // x = x ** 3 → 1
```

### Ternary Operator

```javascript
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";

// Nested ternary (avoid if complex)
let category = age < 13 ? "Child"
             : age < 20 ? "Teen"
             : "Adult";
```

---

## Strings

### String Methods

```javascript
let text = "  Hello World  ";

// Length
console.log(text.length);              // 15

// Trimming
console.log(text.trim());              // "Hello World"

// Case conversion
console.log(text.toUpperCase());       // "  HELLO WORLD  "
console.log(text.toLowerCase());       // "  hello world  "

// Searching
console.log(text.includes("World"));   // true
console.log(text.indexOf("World"));    // 8
console.log(text.startsWith("  He")); // true
console.log(text.endsWith("ld  "));   // true

// Extracting
console.log(text.slice(2, 7));         // "Hello"
console.log(text.substring(2, 7));     // "Hello"
console.log(text.charAt(2));           // "H"

// Replacing
console.log(text.replace("World", "JS")); // "  Hello JS  "

// Splitting
console.log("a,b,c".split(","));       // ["a", "b", "c"]

// Repeating
console.log("Ha".repeat(3));           // "HaHaHa"
```

### Template Literals (ES6)

```javascript
let name = "John";
let age = 25;

// Old way
let message1 = "My name is " + name + " and I'm " + age;

// Modern way (template literal)
let message2 = `My name is ${name} and I'm ${age}`;

// Multi-line
let html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;

// Expressions
let price = 100;
console.log(`Total: $${price * 1.1}`); // Total: $110
```

---

## Arrays

### Creating Arrays

```javascript
let arr1 = [1, 2, 3];
let arr2 = new Array(5);           // [empty × 5]
let arr3 = Array.of(1, 2, 3);      // [1, 2, 3]
let arr4 = Array.from("hello");    // ["h", "e", "l", "l", "o"]
```

### Array Methods

```javascript
let fruits = ["apple", "banana", "orange"];

// Add/Remove at end
fruits.push("grape");      // ["apple", "banana", "orange", "grape"]
fruits.pop();              // "grape"

// Add/Remove at start
fruits.unshift("mango");   // ["mango", "apple", "banana", "orange"]
fruits.shift();            // "mango"

// Access
console.log(fruits[0]);    // "apple"
console.log(fruits.length); // 3

// Find
console.log(fruits.indexOf("banana"));     // 1
console.log(fruits.includes("apple"));     // true

// Extract
console.log(fruits.slice(0, 2));          // ["apple", "banana"]

// Modify
fruits.splice(1, 1, "kiwi");              // Remove 1 at index 1, add "kiwi"

// Iterate
fruits.forEach(fruit => console.log(fruit));

// Transform
let upper = fruits.map(f => f.toUpperCase());
let filtered = fruits.filter(f => f.length > 5);
let total = [1, 2, 3].reduce((sum, n) => sum + n, 0);
```

---

## Objects

### Creating Objects

```javascript
// Object literal (most common)
let user = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

// Constructor
let person = new Object();
person.name = "Jane";

// Object.create()
let admin = Object.create(user);
```

### Accessing Properties

```javascript
let user = { name: "John", age: 25 };

// Dot notation
console.log(user.name);       // "John"

// Bracket notation
console.log(user["age"]);     // 25
let key = "name";
console.log(user[key]);       // "John"
```

### Modifying Objects

```javascript
let user = { name: "John" };

// Add property
user.age = 25;

// Modify property
user.name = "Jane";

// Delete property
delete user.age;

// Check property
console.log("name" in user);           // true
console.log(user.hasOwnProperty("age")); // false
```

### Object Methods

```javascript
let user = { name: "John", age: 25, city: "NYC" };

// Get keys
console.log(Object.keys(user));        // ["name", "age", "city"]

// Get values
console.log(Object.values(user));      // ["John", 25, "NYC"]

// Get entries
console.log(Object.entries(user));
// [["name", "John"], ["age", 25], ["city", "NYC"]]

// Merge objects
let merged = Object.assign({}, user, { country: "USA" });

// Freeze object
Object.freeze(user);
user.name = "Jane";  // Won't work
```

---

## Conditionals

### if-else

```javascript
let age = 18;

if (age < 13) {
    console.log("Child");
} else if (age < 20) {
    console.log("Teenager");
} else {
    console.log("Adult");
}
```

### switch

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("Almost weekend");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Midweek");
}
```

---

## Loops

### for Loop

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
```

### while Loop

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

### do-while Loop

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

### for...of (Arrays/Strings)

```javascript
let arr = [1, 2, 3];
for (let num of arr) {
    console.log(num);
}
```

### for...in (Objects)

```javascript
let user = { name: "John", age: 25 };
for (let key in user) {
    console.log(key, user[key]);
}
```

---

## Modern Features (ES6+)

### Destructuring

```javascript
// Array destructuring
let [a, b, c] = [1, 2, 3];

// Object destructuring
let user = { name: "John", age: 25 };
let { name, age } = user;
```

### Spread Operator

```javascript
// Array
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Object
let user = { name: "John" };
let fullUser = { ...user, age: 25 };
```

### Rest Operator

```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4));  // 10
```

---

## Interview Questions

### Beginner

**Q1: What's the difference between `let`, `const`, and `var`?**

**A:**
- `var`: Function-scoped, can be redeclared, hoisted
- `let`: Block-scoped, cannot be redeclared, not hoisted
- `const`: Block-scoped, cannot be reassigned, use by default

**Q2: What are falsy values in JavaScript?**

**A:** `false`, `0`, `""`, `null`, `undefined`, `NaN`

**Q3: What's the difference between `==` and `===`?**

**A:**
- `==`: Loose equality (type coercion)
- `===`: Strict equality (no type coercion) ✅ Use this

### Intermediate

**Q4: Explain type coercion with examples.**

**A:**
```javascript
"5" + 3    // "53" (string concatenation)
"5" - 3    // 2 (numeric operation)
true + 1   // 2 (true becomes 1)
false + 1  // 1 (false becomes 0)
```

**Q5: What's the output?**

```javascript
console.log(typeof null);          // "object" (bug)
console.log(typeof undefined);     // "undefined"
console.log(typeof []);            // "object"
console.log(Array.isArray([]));    // true
```

---

## Practice Problems

### Easy

1. **Swap two variables without temp**
```javascript
let a = 5, b = 10;
[a, b] = [b, a];
```

2. **Check if number is even**
```javascript
const isEven = num => num % 2 === 0;
```

3. **Find largest of three numbers**
```javascript
const largest = (a, b, c) => Math.max(a, b, c);
```

### Medium

4. **Reverse a string**
```javascript
const reverse = str => str.split('').reverse().join('');
```

5. **Count vowels in string**
```javascript
const countVowels = str =>
    (str.match(/[aeiou]/gi) || []).length;
```

6. **Check if palindrome**
```javascript
const isPalindrome = str =>
    str === str.split('').reverse().join('');
```

---

## Quick Reference

### Variable Declaration
```javascript
const value = 10;      // ✅ Use by default
let counter = 0;       // ✅ When value changes
// var x = 5;          // ❌ Don't use
```

### Type Checking
```javascript
typeof value          // Get type
Array.isArray(arr)    // Check array
value instanceof Type // Check instance
```

### Common Patterns
```javascript
// Default value
const name = inputName || "Guest";

// Ternary
const result = condition ? value1 : value2;

// Short-circuit
user && user.name    // Safe property access
```

---

## Next Steps

✅ Complete: JavaScript Basics
⬜ Next: [Functions & Scope](../02-functions-scope/README.md)
⬜ Then: [Advanced JavaScript](../03-advanced/README.md)

---

**Remember:** JavaScript is a **loosely-typed**, **dynamic** language. Master these basics before moving forward! 🚀
