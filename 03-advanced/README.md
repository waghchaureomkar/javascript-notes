# Advanced JavaScript - Master Guide

> **Modern JavaScript for Production**
> Async programming, ES6+ features, and advanced concepts

---

## Table of Contents

1. [Promises](#promises)
2. [Async/Await](#asyncawait)
3. [Event Loop](#event-loop) 🔥 **Most Asked**
4. [Error Handling](#error-handling)
5. [Classes](#classes)
6. [Modules](#modules)
7. [Iterators & Generators](#iterators--generators)
8. [Proxy & Reflect](#proxy--reflect)
9. [Symbols](#symbols)
10. [Map & Set](#map--set)
11. [Advanced Array Methods](#advanced-array-methods)
12. [Interview Questions](#interview-questions)

---

## Promises

### What is a Promise?

A Promise is an object representing the **eventual completion or failure** of an asynchronous operation.

**States:**
- **Pending** ⏳ - Initial state
- **Fulfilled** ✅ - Operation completed successfully
- **Rejected** ❌ - Operation failed

### Creating Promises

```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = true;

        if (success) {
            resolve("Success!"); // Fulfilled
        } else {
            reject("Error!"); // Rejected
        }
    }, 1000);
});

// Consuming promise
promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));
```

### Promise Chaining

```javascript
fetch('https://api.example.com/user')
    .then(response => response.json())
    .then(user => fetch(`https://api.example.com/posts/${user.id}`))
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.error('Error:', error));
```

### Promise Methods

#### Promise.all()

Waits for **all promises** to resolve. Fails if **any** promise rejects.

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));
const promise3 = fetch('https://api.example.com/data');

Promise.all([promise1, promise2, promise3])
    .then(values => console.log(values))
    .catch(error => console.error(error));

// Use case: Load multiple resources
Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(([users, posts, comments]) => {
        console.log({ users, posts, comments });
    });
```

#### Promise.race()

Returns the **first settled** promise (resolved or rejected).

```javascript
const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'one'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2])
    .then(value => console.log(value)); // "two"

// Use case: Timeout
Promise.race([
    fetch('/api/data'),
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
    )
])
    .then(response => response.json())
    .catch(error => console.error(error));
```

#### Promise.allSettled()

Waits for **all promises** to settle (resolve or reject).

```javascript
const promises = [
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('✅', result.value);
            } else {
                console.log('❌', result.reason);
            }
        });
    });
```

#### Promise.any()

Returns the **first fulfilled** promise. Rejects only if **all** reject.

```javascript
const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success'),
    Promise.reject('Error 2')
];

Promise.any(promises)
    .then(value => console.log(value)) // "Success"
    .catch(error => console.error(error));
```

---

## Async/Await

### What is Async/Await?

Syntactic sugar over Promises that makes async code look **synchronous**.

### Basic Usage

```javascript
// Promise way
function fetchUser() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => console.log(user))
        .catch(error => console.error(error));
}

// Async/Await way
async function fetchUser() {
    try {
        const response = await fetch('/api/user');
        const user = await response.json();
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}
```

### Rules

1. `async` function **always returns a Promise**
2. `await` can only be used **inside async functions**
3. `await` **pauses execution** until promise settles

### Examples

#### Sequential Execution

```javascript
async function sequential() {
    const user = await fetchUser();      // Wait
    const posts = await fetchPosts(user.id);  // Then wait
    const comments = await fetchComments(posts[0].id); // Then wait

    return { user, posts, comments };
}
```

#### Parallel Execution

```javascript
async function parallel() {
    // Start all at once
    const userPromise = fetchUser();
    const postsPromise = fetchPosts();
    const commentsPromise = fetchComments();

    // Wait for all
    const [user, posts, comments] = await Promise.all([
        userPromise,
        postsPromise,
        commentsPromise
    ]);

    return { user, posts, comments };
}
```

#### Error Handling

```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw if needed
    }
}
```

#### Top-Level Await (ES2022)

```javascript
// In modules
const response = await fetch('/api/config');
const config = await response.json();

console.log(config);
```

---

## Event Loop

> **🔥🔥🔥 MOST ASKED INTERVIEW TOPIC**
> Understanding Event Loop is CRITICAL for JavaScript interviews!

### What is the Event Loop?

The **Event Loop** is the mechanism that allows JavaScript to perform **non-blocking operations** despite being **single-threaded**.

**Key Components:**
1. **Call Stack** - Where code executes (LIFO)
2. **Web APIs** - Browser features (setTimeout, fetch, DOM events)
3. **Callback Queue (Macrotask Queue)** - Callbacks waiting to execute
4. **Microtask Queue** - High-priority tasks (Promises, queueMicrotask)
5. **Event Loop** - Monitors and moves tasks to Call Stack

### How Event Loop Works

```
┌───────────────────────────┐
│      Call Stack           │  ← Code executes here
│  (Currently executing)    │
└───────────────────────────┘
            ↑
            │ Event Loop checks: Is Call Stack empty?
            │
┌───────────────────────────┐
│   Microtask Queue         │  ← Checked FIRST (Higher Priority)
│   - Promise callbacks     │
│   - queueMicrotask        │
│   - MutationObserver      │
└───────────────────────────┘
            ↑
            │ If microtask queue empty, then...
            │
┌───────────────────────────┐
│   Macrotask Queue         │  ← Checked SECOND (Lower Priority)
│   - setTimeout            │
│   - setInterval           │
│   - setImmediate (Node)   │
│   - I/O operations        │
└───────────────────────────┘
```

### Execution Order

**Rules:**
1. Execute all **synchronous** code first (Call Stack)
2. When Call Stack is empty, check **Microtask Queue**
3. Execute **ALL** microtasks until queue is empty
4. Take **ONE** task from Macrotask Queue
5. Repeat from step 2

### Example 1: Basic Event Loop

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

console.log("3");

// Output:
// 1
// 3
// 2

// Explanation:
// 1. "1" - Synchronous, executes immediately
// 2. setTimeout - Goes to Web API, callback to Macrotask Queue
// 3. "3" - Synchronous, executes immediately
// 4. Call Stack empty, Event Loop moves setTimeout callback
// 5. "2" - Executes
```

### Example 2: Promises (Microtasks)

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");

// Output:
// 1
// 4
// 3
// 2

// Explanation:
// 1. "1" - Synchronous
// 2. setTimeout - Macrotask Queue
// 3. Promise.then - Microtask Queue
// 4. "4" - Synchronous
// 5. Call Stack empty → Check Microtask Queue first
// 6. "3" - Promise callback (Microtask)
// 7. Microtask Queue empty → Check Macrotask Queue
// 8. "2" - setTimeout callback (Macrotask)
```

### Example 3: Multiple Promises and setTimeout

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
    })
    .then(() => {
        console.log("Promise 2");
    });

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 3");
});

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 3
// Promise 2
// Timeout 1
// Timeout 2

// Explanation:
// 1. Synchronous: "Start", "End"
// 2. ALL Microtasks first: Promise 1, Promise 3, Promise 2
// 3. Macrotasks one by one: Timeout 1, Timeout 2
```

### Example 4: Nested setTimeout and Promise

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
    Promise.resolve().then(() => {
        console.log("3");
    });
}, 0);

Promise.resolve().then(() => {
    console.log("4");
    setTimeout(() => {
        console.log("5");
    }, 0);
});

console.log("6");

// Output:
// 1
// 6
// 4
// 2
// 3
// 5

// Explanation:
// 1. "1", "6" - Synchronous
// 2. "4" - First Promise (Microtask)
//    - Creates setTimeout for "5" (added to Macrotask Queue)
// 3. "2" - First setTimeout (Macrotask)
//    - Creates Promise for "3" (added to Microtask Queue)
// 4. "3" - Promise from inside setTimeout (Microtask - must complete before next Macrotask!)
// 5. "5" - Second setTimeout (Macrotask)
```

### Example 5: Complex Interview Question

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
    .then(() => console.log("C"))
    .then(() => console.log("D"));

setTimeout(() => {
    console.log("E");
    Promise.resolve().then(() => console.log("F"));
}, 0);

Promise.resolve().then(() => {
    console.log("G");
    setTimeout(() => console.log("H"), 0);
});

console.log("I");

// Output:
// A
// I
// C
// G
// D
// B
// E
// F
// H

// Detailed Execution:
// Synchronous: A, I
// Microtasks (all): C, G, D
// Macrotask 1: B
// Macrotask 2: E (creates Microtask F)
// Microtask: F (must execute before next Macrotask)
// Macrotask 3: H
```

### Microtask vs Macrotask Queue

#### Microtasks (High Priority)
- `Promise.then()`, `Promise.catch()`, `Promise.finally()`
- `async/await` (Promise-based)
- `queueMicrotask()`
- `MutationObserver`

#### Macrotasks (Lower Priority)
- `setTimeout()`
- `setInterval()`
- `setImmediate()` (Node.js)
- `I/O operations`
- `UI rendering`

### Why Does Priority Matter?

```javascript
// Microtasks can "block" Macrotasks

Promise.resolve().then(function loop() {
    console.log("Microtask");
    Promise.resolve().then(loop);  // Create another Microtask
});

setTimeout(() => {
    console.log("Macrotask - Never runs!");
}, 0);

// Output: Infinite "Microtask" logs
// setTimeout NEVER executes because Microtask Queue never empties!
```

### async/await and Event Loop

```javascript
console.log("1");

async function fetchData() {
    console.log("2");
    await Promise.resolve();
    console.log("3");  // After await = Microtask!
}

fetchData();

console.log("4");

Promise.resolve().then(() => console.log("5"));

// Output:
// 1
// 2
// 4
// 3
// 5

// Explanation:
// - "await" creates a Microtask for everything after it
// - "3" and "5" are both Microtasks, executed in order
```

### Visual Step-by-Step Example

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
    .then(() => console.log("Promise 1"))
    .then(() => console.log("Promise 2"));

console.log("End");
```

**Step-by-Step Execution:**

```
Step 1: Call Stack = [console.log("Start")]
        Output: "Start"

Step 2: Call Stack = [setTimeout]
        Web API: setTimeout registered
        Macrotask Queue: [() => console.log("Timeout")]

Step 3: Call Stack = [Promise.resolve().then]
        Microtask Queue: [() => console.log("Promise 1")]

Step 4: Call Stack = [console.log("End")]
        Output: "End"

Step 5: Call Stack = []  ← EMPTY!
        Event Loop checks Microtask Queue first

Step 6: Call Stack = [() => console.log("Promise 1")]
        Output: "Promise 1"
        Microtask Queue: [() => console.log("Promise 2")]

Step 7: Call Stack = [() => console.log("Promise 2")]
        Output: "Promise 2"
        Microtask Queue: []  ← EMPTY!

Step 8: Event Loop checks Macrotask Queue
        Call Stack = [() => console.log("Timeout")]
        Output: "Timeout"
```

**Final Output:**
```
Start
End
Promise 1
Promise 2
Timeout
```

### Common Interview Mistakes

#### Mistake 1: Thinking setTimeout(0) is instant

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

// Wrong assumption: 1, 2, 3
// Correct: 1, 3, 2
```

#### Mistake 2: Not knowing Microtasks have priority

```javascript
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));

// Wrong assumption: Timeout, Promise
// Correct: Promise, Timeout
```

#### Mistake 3: Forgetting await creates Microtasks

```javascript
async function test() {
    console.log("1");
    await Promise.resolve();
    console.log("2");  // Microtask!
}

test();
console.log("3");

// Wrong assumption: 1, 2, 3
// Correct: 1, 3, 2
```

### Real Interview Question

**Q: What will this output?**

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
    Promise.resolve().then(() => console.log("C"));
}, 0);

new Promise((resolve) => {
    console.log("D");
    resolve();
}).then(() => {
    console.log("E");
});

console.log("F");

// Answer: A, D, F, E, B, C

// Explanation:
// Synchronous: A, D (Promise executor is sync!), F
// Microtask: E
// Macrotask: B (creates Microtask C)
// Microtask: C (must execute before next Macrotask)
```

### Key Takeaways

1. ✅ JavaScript is **single-threaded**
2. ✅ **Microtasks** > **Macrotasks** (priority)
3. ✅ **ALL microtasks** execute before **ONE macrotask**
4. ✅ `await` creates **Microtasks** for code after it
5. ✅ Promise executor runs **synchronously**
6. ✅ `setTimeout(0)` is **NOT immediate** - it's a Macrotask

---

## Error Handling

### Try-Catch

```javascript
try {
    // Code that might throw error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle error
    console.error('Error:', error.message);
} finally {
    // Always runs (optional)
    console.log('Cleanup');
}
```

### Custom Errors

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
    }
}

// Usage
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required');
    }
    if (!user.name) {
        throw new ValidationError('Name is required');
    }
}

try {
    validateUser({ name: 'John' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    } else {
        console.log('Unknown error:', error);
    }
}
```

### Error Handling Patterns

```javascript
// 1. Error-first callback (Node.js style)
function readFile(path, callback) {
    fs.readFile(path, (error, data) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

// 2. Result object
async function fetchData() {
    try {
        const data = await fetch('/api/data');
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// 3. Either pattern (functional)
class Either {
    static right(value) {
        return { isRight: true, value };
    }

    static left(error) {
        return { isRight: false, error };
    }
}
```

---

## Classes

### Basic Class

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }

    haveBirthday() {
        this.age++;
    }
}

const john = new Person('John', 25);
console.log(john.greet()); // "Hello, I'm John"
```

### Getters and Setters

```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    set area(value) {
        this.width = Math.sqrt(value);
        this.height = Math.sqrt(value);
    }
}

const rect = new Rectangle(5, 10);
console.log(rect.area); // 50 (getter called)
rect.area = 100; // Setter called
```

### Static Methods

```javascript
class MathUtils {
    static PI = 3.14159;

    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.PI); // 3.14159
```

### Inheritance

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }

    speak() {
        return `${this.name} barks`;
    }

    fetch() {
        return `${this.name} fetches the ball`;
    }
}

const dog = new Dog('Rex', 'Labrador');
console.log(dog.speak()); // "Rex barks"
console.log(dog.fetch()); // "Rex fetches the ball"
```

### Private Fields (ES2022)

```javascript
class BankAccount {
    #balance = 0; // Private field

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // ❌ SyntaxError
```

---

## Modules

### ES6 Modules

#### Named Exports

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Or export at once
const subtract = (a, b) => a - b;
export { subtract };
```

```javascript
// Import
import { PI, add, multiply } from './math.js';

// Import with alias
import { add as addition } from './math.js';

// Import all
import * as MathUtils from './math.js';
console.log(MathUtils.add(5, 3));
```

#### Default Export

```javascript
// calculator.js
export default class Calculator {
    add(a, b) {
        return a + b;
    }
}

// Can have only ONE default export per file
```

```javascript
// Import
import Calculator from './calculator.js';
import MyCalc from './calculator.js'; // Can rename

// Mix default and named
import Calculator, { PI, add } from './calculator.js';
```

### Dynamic Imports

```javascript
// Load module conditionally
if (condition) {
    const module = await import('./module.js');
    module.doSomething();
}

// Load on demand
button.addEventListener('click', async () => {
    const { heavyFunction } = await import('./heavy-module.js');
    heavyFunction();
});
```

---

## Iterators & Generators

### Iterators

```javascript
const myIterator = {
    current: 0,
    last: 5,

    [Symbol.iterator]() {
        return this;
    },

    next() {
        if (this.current <= this.last) {
            return { value: this.current++, done: false };
        } else {
            return { done: true };
        }
    }
};

for (let num of myIterator) {
    console.log(num); // 0, 1, 2, 3, 4, 5
}
```

### Generators

```javascript
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { done: true }

// Infinite generator
function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

// Generator with input
function* echo() {
    while (true) {
        const input = yield;
        console.log(input);
    }
}
```

---

## Proxy & Reflect

### Proxy

```javascript
const target = {
    name: 'John',
    age: 25
};

const handler = {
    get(target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },

    set(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        if (property === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Getting name → "John"
proxy.age = 26; // Setting age to 26
```

### Reflect

```javascript
const obj = { name: 'John', age: 25 };

// Similar to direct access but more functional
Reflect.get(obj, 'name'); // "John"
Reflect.set(obj, 'age', 26);
Reflect.has(obj, 'name'); // true
Reflect.deleteProperty(obj, 'age');
```

---

## Symbols

### What are Symbols?

**Unique** and **immutable** primitive values, often used as object property keys.

```javascript
const id = Symbol('id');
const anotherId = Symbol('id');

console.log(id === anotherId); // false (always unique!)

// Use as object key
const user = {
    name: 'John',
    [id]: 123
};

console.log(user[id]); // 123
console.log(Object.keys(user)); // ['name'] (symbol keys hidden)
```

### Well-known Symbols

```javascript
// Symbol.iterator
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

// Symbol.toStringTag
class MyClass {
    get [Symbol.toStringTag]() {
        return 'MyClass';
    }
}

console.log(Object.prototype.toString.call(new MyClass()));
// "[object MyClass]"
```

---

## Map & Set

### Map

Key-value pairs where **keys can be any type**.

```javascript
const map = new Map();

// Set values
map.set('name', 'John');
map.set(1, 'number key');
map.set(true, 'boolean key');

// Get values
console.log(map.get('name')); // "John"

// Check existence
console.log(map.has('name')); // true

// Delete
map.delete(1);

// Size
console.log(map.size); // 2

// Iterate
map.forEach((value, key) => {
    console.log(key, value);
});

// Convert to array
const entries = [...map]; // [[key, value], ...]
```

### Set

Collection of **unique values**.

```javascript
const set = new Set();

// Add values
set.add(1);
set.add(2);
set.add(2); // Duplicate ignored

// Check existence
console.log(set.has(1)); // true

// Delete
set.delete(2);

// Size
console.log(set.size); // 1

// Convert array to Set (remove duplicates)
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)]; // [1, 2, 3, 4]
```

### WeakMap & WeakSet

Keys are **weakly held** (can be garbage collected).

```javascript
let obj = { name: 'John' };
const weakMap = new WeakMap();
weakMap.set(obj, 'metadata');

// When obj is no longer referenced, it can be garbage collected
obj = null;
```

---

## Advanced Array Methods

### flatMap()

```javascript
const arr = [1, 2, 3];
const result = arr.flatMap(x => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]
```

### Array.from()

```javascript
// String to array
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// NodeList to array
const divs = Array.from(document.querySelectorAll('div'));

// Generate array
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
```

### reduceRight()

```javascript
const arr = [[0, 1], [2, 3], [4, 5]];
const result = arr.reduceRight((acc, val) => acc.concat(val), []);
console.log(result); // [4, 5, 2, 3, 0, 1]
```

---

## Interview Questions

### Q1: What's the difference between Promise and async/await?

**A:** Async/await is syntactic sugar over Promises, making async code look synchronous.

### Q2: Explain Promise.all() vs Promise.race()

**A:**
- `Promise.all()`: Waits for all, fails if any fails
- `Promise.race()`: Returns first settled (resolve or reject)

### Q3: What are generators used for?

**A:** Lazy evaluation, infinite sequences, async flow control, custom iterators.

### Q4: Explain the difference between Map and Object

**A:**
- Map: Any type as key, ordered, has size property
- Object: String/Symbol keys, not always ordered, no size

### Q5: What are Symbols used for?

**A:** Unique property keys, avoid naming conflicts, define object behaviors.

---

## Practice Problems

1. Implement Promise.all() from scratch
2. Create a retry function for failed promises
3. Build a cache using WeakMap
4. Implement debounce using async/await
5. Create a custom iterator for Fibonacci sequence

---

## Next Steps

✅ Complete: Advanced JavaScript
⬜ Next: [DOM & Browser APIs](../04-dom-browser/README.md)
⬜ Build: Real-world async applications

---

**You're now ready for production JavaScript!** 🚀
