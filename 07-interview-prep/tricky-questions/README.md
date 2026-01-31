# Tricky JavaScript Interview Questions

## Table of Contents
1. [Type Coercion Questions](#type-coercion-questions)
2. [Hoisting Questions](#hoisting-questions)
3. [Closure Questions](#closure-questions)
4. [Event Loop Questions](#event-loop-questions)
5. [This Keyword Questions](#this-keyword-questions)
6. [Scope Chain Questions](#scope-chain-questions)
7. [Miscellaneous Tricky Questions](#miscellaneous-tricky-questions)

## Type Coercion Questions

### Q1: Double vs Triple Equals

```javascript
console.log(0 == '0');    // ?
console.log(0 === '0');   // ?
console.log(false == 0);  // ?
console.log(false === 0); // ?
```

**Answer**:
```javascript
console.log(0 == '0');    // true (type coercion)
console.log(0 === '0');   // false (different types)
console.log(false == 0);  // true (false coerces to 0)
console.log(false === 0); // false (different types)
```

**Explanation**: `==` performs type coercion, `===` checks type and value.

### Q2: NaN Comparisons

```javascript
console.log(NaN == NaN);  // ?
console.log(NaN === NaN); // ?
console.log(NaN > 0);     // ?
console.log(NaN < 0);     // ?
console.log(isNaN(NaN));  // ?
console.log(Number.isNaN(NaN)); // ?
```

**Answer**:
```javascript
console.log(NaN == NaN);  // false (NaN is not equal to anything)
console.log(NaN === NaN); // false
console.log(NaN > 0);     // false
console.log(NaN < 0);     // false
console.log(isNaN(NaN));  // true
console.log(Number.isNaN(NaN)); // true
```

**Explanation**: NaN is the only value not equal to itself. Use `Number.isNaN()` for reliable checking.

### Q3: Null vs Undefined

```javascript
console.log(null == undefined);  // ?
console.log(null === undefined); // ?
console.log(typeof null);        // ?
console.log(typeof undefined);   // ?
```

**Answer**:
```javascript
console.log(null == undefined);  // true (special case)
console.log(null === undefined); // false (different types)
console.log(typeof null);        // 'object' (famous bug!)
console.log(typeof undefined);   // 'undefined'
```

**Explanation**: `null == undefined` is true by specification. `typeof null` returning 'object' is a historic bug.

### Q4: Array to Number Coercion

```javascript
console.log([1, 2] + [3, 4]); // ?
console.log([1] + 2);         // ?
console.log([1, 2] - [3, 4]); // ?
console.log([] + {});         // ?
console.log({} + []);         // ?
```

**Answer**:
```javascript
console.log([1, 2] + [3, 4]); // "1,23,4" (string concatenation)
console.log([1] + 2);         // "12" (string concatenation)
console.log([1, 2] - [3, 4]); // NaN (subtraction can't work on arrays)
console.log([] + {});         // "[object Object]" (string)
console.log({} + []);         // 0 or "[object Object]" (context dependent!)
```

**Explanation**: `+` converts to strings, `-` tries to convert to numbers.

### Q5: Tricky Boolean Conversions

```javascript
console.log(Boolean('false')); // ?
console.log(Boolean('0'));     // ?
console.log(Boolean([]));      // ?
console.log(Boolean({}));      // ?
console.log(!![]);             // ?
console.log(!!{});             // ?
```

**Answer**:
```javascript
console.log(Boolean('false')); // true (non-empty string)
console.log(Boolean('0'));     // true (non-empty string)
console.log(Boolean([]));      // true (object)
console.log(Boolean({}));      // true (object)
console.log(!![]);             // true
console.log(!!{});             // true
```

**Explanation**: Only `false`, `0`, `''`, `null`, `undefined`, and `NaN` are falsy.

### Q6: Plus Operator Magic

```javascript
console.log(+'123');    // ?
console.log(+[]);       // ?
console.log(+[1]);      // ?
console.log(+[1, 2]);   // ?
console.log(+true);     // ?
console.log(+false);    // ?
console.log(+null);     // ?
console.log(+undefined);// ?
```

**Answer**:
```javascript
console.log(+'123');    // 123 (string to number)
console.log(+[]);       // 0 (empty array to 0)
console.log(+[1]);      // 1 (single element)
console.log(+[1, 2]);   // NaN (multiple elements)
console.log(+true);     // 1
console.log(+false);    // 0
console.log(+null);     // 0
console.log(+undefined);// NaN
```

### Q7: String Concatenation Tricks

```javascript
console.log('5' + 3);   // ?
console.log('5' - 3);   // ?
console.log('5' * 3);   // ?
console.log('5' / 3);   // ?
console.log('5' + + '3');// ?
console.log('5' - - '3');// ?
```

**Answer**:
```javascript
console.log('5' + 3);   // "53" (concatenation)
console.log('5' - 3);   // 2 (coerce to number)
console.log('5' * 3);   // 15 (coerce to number)
console.log('5' / 3);   // 1.666... (coerce to number)
console.log('5' + + '3');// "53" (+ converts '3' to 3, then concat)
console.log('5' - - '3');// 8 (5 - (-3) = 8)
```

### Q8: Equality Comparison Tricks

```javascript
console.log([] == ![]);  // ?
console.log('' == 0);    // ?
console.log(' ' == 0);   // ?
console.log('0' == false);// ?
console.log(null == 0);  // ?
console.log(undefined == 0);// ?
```

**Answer**:
```javascript
console.log([] == ![]);  // true (![] is false, [] becomes '')
console.log('' == 0);    // true ('' coerces to 0)
console.log(' ' == 0);   // true (' ' coerces to 0)
console.log('0' == false);// true (both coerce to 0)
console.log(null == 0);  // false (special rule)
console.log(undefined == 0);// false (special rule)
```

## Hoisting Questions

### Q9: var Hoisting

```javascript
console.log(x);
var x = 5;
console.log(x);
```

**Answer**:
```javascript
console.log(x); // undefined (hoisted but not initialized)
var x = 5;
console.log(x); // 5
```

**Explanation**: Variable declaration is hoisted, but assignment is not.

### Q10: let/const Temporal Dead Zone

```javascript
console.log(x);
let x = 5;
```

**Answer**:
```javascript
// ReferenceError: Cannot access 'x' before initialization
```

**Explanation**: `let`/`const` are hoisted but in the Temporal Dead Zone until declaration.

### Q11: Function Hoisting

```javascript
foo();
bar();

function foo() {
  console.log('foo');
}

var bar = function() {
  console.log('bar');
};
```

**Answer**:
```javascript
// "foo" (function declaration hoisted)
// TypeError: bar is not a function (var hoisted, but undefined)
```

**Explanation**: Function declarations are fully hoisted, function expressions are not.

### Q12: Hoisting with Same Name

```javascript
var x = 1;
function x() {}
console.log(x);
```

**Answer**:
```javascript
console.log(x); // 1
```

**Explanation**: Function declaration is hoisted first, then overwritten by variable assignment.

### Q13: Multiple Hoisting

```javascript
console.log(typeof foo);
var foo = 'hello';
function foo() {}
console.log(typeof foo);
```

**Answer**:
```javascript
console.log(typeof foo); // 'function' (function hoisted over var)
var foo = 'hello';
function foo() {}
console.log(typeof foo); // 'string' (assignment happened)
```

### Q14: Block Scope Hoisting

```javascript
{
  console.log(x);
  let x = 5;
}
```

**Answer**:
```javascript
// ReferenceError: Cannot access 'x' before initialization
```

**Explanation**: Block-scoped variables have TDZ within their block.

## Closure Questions

### Q15: Classic setTimeout in Loop

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**Answer**:
```javascript
// Prints: 3, 3, 3
```

**Explanation**: `var` is function-scoped, all callbacks share same `i`. After loop ends, `i` is 3.

**Fix 1**: Use `let`
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```

**Fix 2**: Use IIFE
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Prints: 0, 1, 2
```

### Q16: Closure with Private Variables

```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // ?
console.log(counter.increment()); // ?
console.log(counter.value());     // ?
console.log(counter.count);       // ?
```

**Answer**:
```javascript
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.value());     // 2
console.log(counter.count);       // undefined (private!)
```

### Q17: Closure Memory Issue

```javascript
function createFunctions() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(() => i);
  }
  return arr;
}

const fns = createFunctions();
console.log(fns[0]()); // ?
console.log(fns[1]()); // ?
console.log(fns[2]()); // ?
```

**Answer**:
```javascript
console.log(fns[0]()); // 3
console.log(fns[1]()); // 3
console.log(fns[2]()); // 3
```

**Explanation**: All functions close over the same `i` variable.

### Q18: Nested Closures

```javascript
function outer() {
  let x = 10;

  function middle() {
    let y = 20;

    function inner() {
      console.log(x + y);
    }

    return inner;
  }

  return middle;
}

const fn = outer()();
fn(); // ?
```

**Answer**:
```javascript
fn(); // 30
```

**Explanation**: `inner` has access to both `x` and `y` through closure chain.

## Event Loop Questions

### Q19: Promise vs setTimeout

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

**Answer**:
```javascript
// Output: 1, 4, 3, 2
```

**Explanation**:
- `1`: Synchronous
- `4`: Synchronous
- `3`: Microtask (Promise) - runs before macrotasks
- `2`: Macrotask (setTimeout)

### Q20: Multiple Promise Chains

```javascript
Promise.resolve()
  .then(() => console.log('1'))
  .then(() => console.log('2'));

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));
```

**Answer**:
```javascript
// Output: 1, 3, 2, 4
```

**Explanation**: Both promise chains start, alternating between them.

### Q21: Async/Await Order

```javascript
async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
foo();
console.log('4');
```

**Answer**:
```javascript
// Output: 3, 1, 4, 2
```

**Explanation**: `await` pauses function execution, rest runs as microtask.

### Q22: Mixed Async Operations

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => {
  console.log('C');
  setTimeout(() => console.log('D'), 0);
});

Promise.resolve().then(() => console.log('E'));

console.log('F');
```

**Answer**:
```javascript
// Output: A, F, C, E, B, D
```

**Explanation**:
1. Sync: A, F
2. Microtasks: C, E (C schedules D for later)
3. Macrotasks: B, D

### Q23: Promise.then Chaining

```javascript
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { console.log(x); })
  .then(x => { console.log(x); });
```

**Answer**:
```javascript
// Output: 2, undefined
```

**Explanation**: Second `.then()` doesn't return anything, so third gets `undefined`.

## This Keyword Questions

### Q24: Arrow Function This

```javascript
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name);
  },
  greetArrow: () => {
    console.log(this.name);
  }
};

obj.greet();      // ?
obj.greetArrow(); // ?
```

**Answer**:
```javascript
obj.greet();      // "John" (this is obj)
obj.greetArrow(); // undefined (this is lexical, not obj)
```

### Q25: Method Extraction

```javascript
const user = {
  name: 'John',
  greet() {
    console.log(this.name);
  }
};

user.greet();           // ?
const fn = user.greet;
fn();                   // ?
```

**Answer**:
```javascript
user.greet();           // "John"
fn();                   // undefined or error (this is undefined/window)
```

### Q26: Constructor This

```javascript
function Person(name) {
  this.name = name;
  return { age: 30 };
}

const p = new Person('John');
console.log(p.name); // ?
console.log(p.age);  // ?
```

**Answer**:
```javascript
console.log(p.name); // undefined
console.log(p.age);  // 30
```

**Explanation**: Constructor returns object, overriding `this`.

### Q27: setTimeout This

```javascript
const obj = {
  name: 'John',
  greet() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};

obj.greet(); // ?
```

**Answer**:
```javascript
// undefined (this is window/undefined)
```

**Fix**: Use arrow function
```javascript
setTimeout(() => {
  console.log(this.name); // "John"
}, 100);
```

### Q28: Call/Apply/Bind

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const user = { name: 'John' };

greet.call(user, 'Hello', '!');   // ?
greet.apply(user, ['Hi', '?']);   // ?
const bound = greet.bind(user, 'Hey');
bound('...');                      // ?
```

**Answer**:
```javascript
greet.call(user, 'Hello', '!');   // "Hello John!"
greet.apply(user, ['Hi', '?']);   // "Hi John?"
bound('...');                      // "Hey John..."
```

## Scope Chain Questions

### Q29: Scope Chain Lookup

```javascript
let a = 1;

function outer() {
  let a = 2;

  function inner() {
    let a = 3;
    console.log(a);
  }

  inner();
  console.log(a);
}

outer();
console.log(a);
```

**Answer**:
```javascript
// Output: 3, 2, 1
```

**Explanation**: Each function has its own scope, looks up the chain.

### Q30: Variable Shadowing

```javascript
let x = 10;

function test() {
  console.log(x);
  let x = 20;
}

test(); // ?
```

**Answer**:
```javascript
// ReferenceError: Cannot access 'x' before initialization
```

**Explanation**: Local `x` shadows outer, but TDZ prevents access before declaration.

### Q31: Global vs Local

```javascript
var x = 1;

function foo() {
  console.log(x);
  var x = 2;
  console.log(x);
}

foo();
console.log(x);
```

**Answer**:
```javascript
// Output: undefined, 2, 1
```

**Explanation**: Local `var x` is hoisted but not initialized in first log.

## Miscellaneous Tricky Questions

### Q32: Array Length

```javascript
const arr = [1, 2, 3];
arr[10] = 10;
console.log(arr.length); // ?
console.log(arr[5]);     // ?
```

**Answer**:
```javascript
console.log(arr.length); // 11 (sparse array)
console.log(arr[5]);     // undefined (hole)
```

### Q33: Object Keys

```javascript
const obj = {
  1: 'one',
  '1': 'uno',
  name: 'John'
};

console.log(Object.keys(obj)); // ?
```

**Answer**:
```javascript
console.log(Object.keys(obj)); // ['1', 'name']
```

**Explanation**: Number keys are converted to strings, '1' overwrites 1.

### Q34: Delete Operator

```javascript
const obj = { a: 1, b: 2 };
delete obj.a;
console.log(obj.a);      // ?
console.log('a' in obj); // ?

let x = 5;
delete x;
console.log(x); // ?
```

**Answer**:
```javascript
console.log(obj.a);      // undefined
console.log('a' in obj); // false
console.log(x);          // 5 (can't delete variables)
```

### Q35: Comma Operator

```javascript
let x = (1, 2, 3);
console.log(x); // ?

let y = (console.log('A'), console.log('B'), 'C');
console.log(y); // ?
```

**Answer**:
```javascript
console.log(x); // 3 (returns last value)
// Prints: A, B, C
```

### Q36: Logical Operators

```javascript
console.log(0 || 1);      // ?
console.log(1 || 2);      // ?
console.log(0 && 1);      // ?
console.log(1 && 2);      // ?
console.log(null ?? 0);   // ?
console.log(undefined ?? 0); // ?
console.log(false ?? 0);  // ?
```

**Answer**:
```javascript
console.log(0 || 1);      // 1 (first truthy)
console.log(1 || 2);      // 1 (first truthy)
console.log(0 && 1);      // 0 (first falsy)
console.log(1 && 2);      // 2 (last if all truthy)
console.log(null ?? 0);   // 0 (nullish coalescing)
console.log(undefined ?? 0); // 0
console.log(false ?? 0);  // false (?? only checks null/undefined)
```

### Q37: Array Methods Side Effects

```javascript
const arr = [1, 2, 3];
const result = arr.map(x => {
  arr.push(x + 3);
  return x * 2;
});

console.log(result); // ?
console.log(arr);    // ?
```

**Answer**:
```javascript
console.log(result); // [2, 4, 6] (original 3 elements)
console.log(arr);    // [1, 2, 3, 4, 5, 6] (mutated during iteration)
```

**Explanation**: `map` iterates over original length, but array is mutated.

### Q38: Object Property Order

```javascript
const obj = {
  '2': 'two',
  '1': 'one',
  'b': 'B',
  'a': 'A'
};

console.log(Object.keys(obj)); // ?
```

**Answer**:
```javascript
console.log(Object.keys(obj)); // ['1', '2', 'a', 'b']
```

**Explanation**: Integer keys are sorted numerically, then string keys in insertion order.

### Q39: Function Name

```javascript
const foo = function bar() {
  console.log(typeof bar);
};

foo();          // ?
console.log(typeof bar); // ?
```

**Answer**:
```javascript
foo();          // "function" (bar is available inside)
console.log(typeof bar); // "undefined" (bar not in outer scope)
```

### Q40: Increment Operator

```javascript
let x = 1;
console.log(x++); // ?
console.log(x);   // ?

let y = 1;
console.log(++y); // ?
console.log(y);   // ?
```

**Answer**:
```javascript
console.log(x++); // 1 (post-increment returns old value)
console.log(x);   // 2

console.log(++y); // 2 (pre-increment returns new value)
console.log(y);   // 2
```

### Q41: Function Parameters

```javascript
function foo(a = 1, b = a + 1, c = b + a) {
  console.log(a, b, c);
}

foo();         // ?
foo(10);       // ?
foo(10, 20);   // ?
```

**Answer**:
```javascript
foo();         // 1, 2, 3
foo(10);       // 10, 11, 21
foo(10, 20);   // 10, 20, 30
```

### Q42: Try-Catch-Finally

```javascript
function foo() {
  try {
    return 1;
  } finally {
    return 2;
  }
}

console.log(foo()); // ?
```

**Answer**:
```javascript
console.log(foo()); // 2
```

**Explanation**: `finally` return overrides `try` return.

### Q43: String Comparison

```javascript
console.log('10' > '9');  // ?
console.log(10 > 9);      // ?
console.log('10' > 9);    // ?
console.log('B' > 'A');   // ?
```

**Answer**:
```javascript
console.log('10' > '9');  // false (string comparison: '1' < '9')
console.log(10 > 9);      // true
console.log('10' > 9);    // true (coerces to number)
console.log('B' > 'A');   // true (lexicographic)
```

### Q44: Array Destructuring

```javascript
const [a, b, c] = [1, 2];
console.log(a, b, c); // ?

const [x, ...rest] = [1];
console.log(x, rest); // ?
```

**Answer**:
```javascript
console.log(a, b, c); // 1, 2, undefined
console.log(x, rest); // 1, []
```

### Q45: Object Destructuring

```javascript
const { a, b = 5 } = { a: 1 };
console.log(a, b); // ?

const { x: y } = { x: 10 };
console.log(y); // ?
console.log(x); // ?
```

**Answer**:
```javascript
console.log(a, b); // 1, 5 (default value)
console.log(y); // 10 (renamed)
console.log(x); // ReferenceError (x is not defined)
```

## Summary

These tricky questions cover:
- **Type Coercion**: Understanding `==` vs `===`, implicit conversions
- **Hoisting**: Variable and function hoisting behavior
- **Closures**: Scope capture and memory implications
- **Event Loop**: Microtasks vs macrotasks, Promise execution
- **This Keyword**: Context binding in different scenarios
- **Scope Chain**: Variable lookup and shadowing
- **Edge Cases**: Unusual JavaScript behaviors

Practice these to ace your interviews!
