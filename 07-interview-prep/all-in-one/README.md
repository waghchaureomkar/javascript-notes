# JavaScript Interview Prep - Quick Revision Cheat Sheet 🚀

> **All Topics in One Place for Last-Minute Revision**
> Essential concepts, code snippets, and interview answers

---

## 📋 Table of Contents

1. [Core JavaScript Concepts](#core-javascript-concepts)
2. [Debouncing & Throttling](#debouncing--throttling)
3. [Memoization](#memoization)
4. [Object Manipulation](#object-manipulation)
5. [Event Loop](#event-loop)
6. [Tricky Questions Quick Reference](#tricky-questions-quick-reference)
7. [Must-Know One-Liners](#must-know-one-liners)

---

## Core JavaScript Concepts

### Execution Context

```javascript
// 2 Types: Global Execution Context & Function Execution Context
// Contains: Variable Environment, Scope Chain, 'this'

// 2 Phases:
// 1. Creation Phase: Hoisting happens, variables set to undefined
// 2. Execution Phase: Code runs line by line
```

### Call Stack

```javascript
// LIFO (Last In, First Out) structure
// Tracks function execution

function first() {
  second();
}
function second() {
  third();
}
function third() {
  console.log("Done");
}
first();

// Stack: [Global] → [Global, first] → [Global, first, second] → [Global, first, second, third]
```

### Memory Heap

```javascript
// Stack: Primitives (number, string, boolean, null, undefined)
// Heap: Objects, Arrays, Functions

let a = 10; // Stack
let obj = { name: "John" }; // Reference in Stack, Object in Heap
```

### Hoisting

```javascript
// var: Hoisted, initialized with undefined
console.log(x); // undefined
var x = 5;

// let/const: Hoisted, but in Temporal Dead Zone (TDZ)
console.log(y); // ReferenceError
let y = 10;

// Functions: Fully hoisted
greet(); // Works!
function greet() {
  console.log("Hello");
}
```

### Closures

```javascript
// Inner function has access to outer function's variables

function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
```

### Prototypes

```javascript
// __proto__: Property of instances (actual prototype object)
// prototype: Property of constructor functions

function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const john = new Person("John");
john.__proto__ === Person.prototype; // true
```

---

## Debouncing & Throttling

### Debouncing (Wait for pause, then execute)

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Use Case: Search autocomplete
const debouncedSearch = debounce(searchAPI, 500);
searchInput.addEventListener("input", (e) => debouncedSearch(e.target.value));
```

### Throttling (Execute at most once per interval)

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Use Case: Scroll events
const throttledScroll = throttle(handleScroll, 1000);
window.addEventListener("scroll", throttledScroll);
```

### Key Difference

| Aspect       | Debouncing             | Throttling                    |
| ------------ | ---------------------- | ----------------------------- |
| **When**     | After events stop      | During continuous events      |
| **How Often**| Once after delay       | Multiple times at intervals   |
| **Use For**  | Search, form validation| Scroll, mouse move, resize    |

---

## Memoization

### Basic Memoization

```javascript
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Use Case: Expensive calculations
const expensiveFunc = memoize((n) => {
  // Heavy computation
  return n * 2;
});
```

### Memoized Fibonacci (1000x+ speedup!)

```javascript
const fibonacci = (function () {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
})();

// Without memo: fib(40) takes ~1 second
// With memo: fib(40) takes ~0.001 second
```

### LRU Cache (Interview Favorite!)

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // Move to end (most recent)
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value); // Remove oldest
    }
  }
}
```

---

## Object Manipulation

### Shallow Copy

```javascript
// Method 1: Spread operator
const copy1 = { ...original };

// Method 2: Object.assign
const copy2 = Object.assign({}, original);

// ⚠️ Warning: Nested objects are still referenced!
const obj = { a: 1, nested: { b: 2 } };
const shallow = { ...obj };
shallow.nested.b = 999;
console.log(obj.nested.b); // 999 (modified!)
```

### Deep Copy

```javascript
// Method 1: JSON (limitations: loses functions, Date, undefined)
const deepCopy1 = JSON.parse(JSON.stringify(original));

// Method 2: structuredClone() (Modern, best)
const deepCopy2 = structuredClone(original);

// Method 3: Custom recursive
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

### Object.freeze vs Object.seal

```javascript
const obj = { name: "John", age: 25 };

// freeze: Can't add, delete, or modify
Object.freeze(obj);
obj.age = 30; // Ignored (strict mode: error)
obj.city = "NYC"; // Ignored
delete obj.name; // Ignored

// seal: Can modify, but can't add or delete
Object.seal(obj);
obj.age = 30; // ✅ Works
obj.city = "NYC"; // ❌ Ignored
delete obj.name; // ❌ Ignored

// preventExtensions: Can modify and delete, but can't add
Object.preventExtensions(obj);
obj.age = 30; // ✅ Works
delete obj.name; // ✅ Works
obj.city = "NYC"; // ❌ Ignored
```

---

## Event Loop

### Execution Order

```
1. Synchronous code (Call Stack)
2. ALL Microtasks (Promise.then, queueMicrotask)
3. ONE Macrotask (setTimeout, setInterval)
4. Repeat from step 2
```

### Microtasks vs Macrotasks

```javascript
// Microtasks (High Priority)
Promise.then();
Promise.catch();
Promise.finally();
queueMicrotask();
async / await;

// Macrotasks (Lower Priority)
setTimeout();
setInterval();
setImmediate(); // Node.js
```

### Classic Example

```javascript
console.log("1"); // Sync

setTimeout(() => console.log("2"), 0); // Macrotask

Promise.resolve().then(() => console.log("3")); // Microtask

console.log("4"); // Sync

// Output: 1, 4, 3, 2
// Explanation: Sync first, then ALL Microtasks, then Macrotasks
```

### Complex Example

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => console.log("D"));

console.log("E");

// Output: A, E, D, B, C
// Why:
// Sync: A, E
// Microtask: D
// Macrotask: B (creates Microtask C)
// Microtask: C (must complete before next Macrotask)
```

---

## Tricky Questions Quick Reference

### Type Coercion

```javascript
// == vs ===
5 == "5"; // true (type coercion)
5 === "5"; // false (strict equality)

// typeof null
typeof null; // "object" (historical bug)

// NaN
NaN === NaN; // false
Number.isNaN(NaN); // true

// Array & Object addition
[] + []; // "" (empty string)
[] + {}; // "[object Object]"
{
}
+[]; // 0 (depends on context)
{
}
+{}; // NaN
```

### Hoisting

```javascript
// var hoisting
console.log(x); // undefined
var x = 5;

// let/const TDZ
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Function hoisting
greet(); // Works!
function greet() {
  console.log("Hello");
}
```

### Closures

```javascript
// setTimeout in loop (var)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (var is function-scoped)

// Fix 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 (let is block-scoped)

// Fix 2: IIFE
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2
```

### `this` Keyword

```javascript
// Regular function: 'this' depends on call site
const obj = {
  name: "John",
  greet: function () {
    console.log(this.name);
  },
};
obj.greet(); // "John"
const fn = obj.greet;
fn(); // undefined (lost context)

// Arrow function: 'this' is lexically bound
const obj2 = {
  name: "Jane",
  greet: () => {
    console.log(this.name); // 'this' from outer scope
  },
};
obj2.greet(); // undefined (arrow function doesn't have own 'this')
```

---

## Must-Know One-Liners

### Interview Answers

**Q: What is a closure?**
→ A closure is when an inner function has access to variables from its outer function, even after the outer function has returned.

**Q: What's the difference between `==` and `===`?**
→ `==` does type coercion before comparison, `===` checks both value and type without coercion.

**Q: What is the Event Loop?**
→ The Event Loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading tasks to browser APIs and executing callbacks when the call stack is empty.

**Q: What's the difference between debounce and throttle?**
→ Debounce delays execution until events stop, throttle executes at most once per interval during continuous events.

**Q: What is hoisting?**
→ Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Variables declared with `var` are hoisted and initialized with `undefined`, while `let/const` are hoisted but remain in the Temporal Dead Zone.

**Q: Shallow copy vs deep copy?**
→ Shallow copy only copies the first level (nested objects remain referenced), deep copy recursively copies all levels creating completely independent objects.

**Q: What is `prototype` in JavaScript?**
→ Every JavaScript object has a prototype property that references another object, creating a chain for inheritance. Objects inherit properties and methods from their prototype.

**Q: What is memoization?**
→ Memoization is an optimization technique that caches function results based on inputs, avoiding redundant calculations for the same arguments.

---

## Code Patterns (Copy-Paste Ready)

### Debounce

```javascript
const debounce = (fn, delay) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
};
```

### Throttle

```javascript
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
```

### Memoize

```javascript
const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn(...args));
  };
};
```

### Deep Clone

```javascript
const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
};
```

### Deep Freeze

```javascript
const deepFreeze = (obj) => {
  Object.freeze(obj);
  Object.values(obj).forEach((val) => {
    if (typeof val === "object" && val !== null) deepFreeze(val);
  });
  return obj;
};
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting `this` context

```javascript
// Wrong
setTimeout(obj.method, 1000); // Lost context

// Correct
setTimeout(() => obj.method(), 1000);
setTimeout(obj.method.bind(obj), 1000);
```

### ❌ Mistake 2: Shallow copy nested objects

```javascript
// Wrong
const copy = { ...original }; // Nested objects still referenced!

// Correct
const copy = structuredClone(original);
```

### ❌ Mistake 3: Not clearing timers

```javascript
// Wrong
setInterval(() => {
  /* ... */
}, 1000);
// Memory leak if component unmounts!

// Correct
const id = setInterval(() => {
  /* ... */
}, 1000);
// Later: clearInterval(id);
```

### ❌ Mistake 4: Modifying frozen objects

```javascript
// Wrong
const obj = Object.freeze({ a: 1 });
obj.a = 2; // Silently fails (strict mode: error)

// Correct
const obj = { a: 1 }; // Don't freeze if you need to modify
```

---

## Interview Probability

| Topic                      | Probability | Prepare Time |
| -------------------------- | ----------- | ------------ |
| Event Loop                 | ⭐⭐⭐⭐⭐ | 2 hours      |
| Debounce/Throttle          | ⭐⭐⭐⭐⭐ | 1 hour       |
| Closures                   | ⭐⭐⭐⭐⭐ | 1 hour       |
| Prototypes                 | ⭐⭐⭐⭐   | 1.5 hours    |
| Memoization                | ⭐⭐⭐⭐   | 1 hour       |
| Deep/Shallow Copy          | ⭐⭐⭐⭐   | 1 hour       |
| Hoisting                   | ⭐⭐⭐⭐   | 30 mins      |
| `this` keyword             | ⭐⭐⭐⭐   | 1 hour       |
| CORS                       | ⭐⭐⭐     | 30 mins      |
| Memory Leaks               | ⭐⭐⭐     | 45 mins      |
| Object.freeze/seal         | ⭐⭐⭐     | 30 mins      |

---

## Quick Revision Checklist

**Before Interview (30 minutes):**

- [ ] Review Event Loop execution order
- [ ] Practice debounce/throttle implementation
- [ ] Know difference between shallow and deep copy
- [ ] Understand closure setTimeout loop problem
- [ ] Know `==` vs `===` and type coercion
- [ ] Understand `this` in different contexts
- [ ] Know prototype chain basics
- [ ] Understand hoisting (var, let, const)

**Key Things to Remember:**

✅ Event Loop: Microtasks before Macrotasks
✅ Debounce: Wait for pause
✅ Throttle: Regular intervals
✅ Memoization: Cache results
✅ Shallow copy: Only first level
✅ `typeof null`: Returns "object"
✅ Arrow functions: No own `this`
✅ Closures: Inner function accesses outer scope

---

## Time Complexity Quick Reference

| Operation              | Time Complexity |
| ---------------------- | --------------- |
| Memoized function call | O(1)            |
| LRU Cache get/put      | O(1)            |
| Deep clone             | O(n)            |
| Array shallow copy     | O(n)            |
| Object.freeze          | O(1)            |
| Deep freeze            | O(n)            |

---

## Final Tips

1. **Practice output questions daily** - 5-10 questions
2. **Implement from scratch** - Don't just read
3. **Explain while coding** - Talk through your thought process
4. **Know trade-offs** - Memory vs Speed, Shallow vs Deep
5. **Edge cases matter** - null, undefined, circular references

---

**Revision Time Required:** 2-3 hours for complete review

**Best Time to Review:** 1 day before interview

---

Good luck! 🚀 Ab interview crack karne mein kuch bhi problem nahi hogi!

**Remember:** If you understand Event Loop, Closures, and Prototypes deeply, you're already ahead of 80% candidates!
