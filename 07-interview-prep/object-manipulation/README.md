# Object Manipulation in JavaScript

## Table of Contents
1. [Shallow Copy vs Deep Copy](#shallow-copy-vs-deep-copy)
2. [All Copy Methods](#all-copy-methods)
3. [Object.freeze vs Object.seal](#objectfreeze-vs-objectseal)
4. [Modern structuredClone()](#modern-structuredclone)
5. [JSON.parse/stringify Limitations](#jsonparsestringify-limitations)
6. [Deep Freeze Implementation](#deep-freeze-implementation)
7. [Common Pitfalls](#common-pitfalls)
8. [Interview Questions](#interview-questions)

## Shallow Copy vs Deep Copy

### Shallow Copy

A **shallow copy** creates a new object, but nested objects are still referenced (not copied).

```javascript
const original = {
  name: 'John',
  address: {
    city: 'New York'
  }
};

const shallowCopy = { ...original };

shallowCopy.name = 'Jane'; // Only affects copy
shallowCopy.address.city = 'Boston'; // Affects BOTH!

console.log(original.address.city); // 'Boston' (modified!)
```

**Key Points**:
- Top-level properties are copied
- Nested objects/arrays are referenced
- Fast and memory efficient
- Not safe for nested structures

### Deep Copy

A **deep copy** creates a completely independent copy, including all nested objects.

```javascript
const original = {
  name: 'John',
  address: {
    city: 'New York'
  }
};

const deepCopy = structuredClone(original);

deepCopy.name = 'Jane';
deepCopy.address.city = 'Boston';

console.log(original.address.city); // 'New York' (unchanged!)
```

**Key Points**:
- All levels are copied
- Completely independent
- Slower and uses more memory
- Safe for nested structures

## All Copy Methods

### 1. Spread Operator (Shallow)

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

// Pros: Clean syntax, fast
// Cons: Shallow copy only
```

### 2. Object.assign() (Shallow)

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);

// Can merge multiple objects
const merged = Object.assign({}, obj1, obj2, obj3);

// Pros: Standard, can merge
// Cons: Shallow copy, verbose
```

### 3. JSON.parse(JSON.stringify()) (Deep)

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = JSON.parse(JSON.stringify(original));

// Pros: Simple deep copy
// Cons: Many limitations (see below)
```

**Limitations**:
- Loses functions
- Loses undefined values
- Loses Symbols
- Loses Date objects (converts to string)
- Can't handle circular references
- Loses Map, Set, RegExp

### 4. structuredClone() (Deep) - Modern

```javascript
const original = {
  a: 1,
  b: { c: 2 },
  date: new Date(),
  regex: /test/g,
  map: new Map([['key', 'value']])
};

const copy = structuredClone(original);

// Pros: Deep copy, handles many types, circular refs
// Cons: Can't clone functions, DOM nodes
```

### 5. Custom Deep Clone Function

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }

  // Handle Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    hash.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(key, deepClone(value, hash));
    });
    return mapCopy;
  }

  // Handle Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    hash.set(obj, setCopy);
    obj.forEach(value => {
      setCopy.add(deepClone(value, hash));
    });
    return setCopy;
  }

  // Handle Object
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, objCopy);

  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });

  return objCopy;
}
```

### 6. Lodash cloneDeep

```javascript
import _ from 'lodash';

const original = { a: 1, b: { c: 2 } };
const copy = _.cloneDeep(original);

// Pros: Battle-tested, handles everything
// Cons: External dependency
```

### 7. Array Shallow Copy Methods

```javascript
const arr = [1, 2, { a: 3 }];

// Method 1: Spread
const copy1 = [...arr];

// Method 2: slice()
const copy2 = arr.slice();

// Method 3: Array.from()
const copy3 = Array.from(arr);

// Method 4: concat()
const copy4 = [].concat(arr);

// All are SHALLOW copies
```

## Object.freeze vs Object.seal

### Object.freeze()

**Prevents**:
- Adding properties
- Deleting properties
- Modifying existing properties
- Changing property descriptors

```javascript
const obj = {
  name: 'John',
  age: 30
};

Object.freeze(obj);

obj.name = 'Jane'; // Ignored (strict mode: error)
obj.city = 'NYC'; // Ignored (strict mode: error)
delete obj.age; // Ignored (strict mode: error)

console.log(obj); // { name: 'John', age: 30 }
```

**Important**: Only freezes first level (shallow freeze)

```javascript
const obj = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

Object.freeze(obj);

obj.name = 'Jane'; // Ignored
obj.address.city = 'Boston'; // WORKS! (nested object not frozen)
```

### Object.seal()

**Prevents**:
- Adding properties
- Deleting properties
- Changing property descriptors

**Allows**:
- Modifying existing properties

```javascript
const obj = {
  name: 'John',
  age: 30
};

Object.seal(obj);

obj.name = 'Jane'; // WORKS!
obj.city = 'NYC'; // Ignored (strict mode: error)
delete obj.age; // Ignored (strict mode: error)

console.log(obj); // { name: 'Jane', age: 30 }
```

### Object.preventExtensions()

**Prevents**:
- Adding properties

**Allows**:
- Modifying existing properties
- Deleting properties

```javascript
const obj = {
  name: 'John',
  age: 30
};

Object.preventExtensions(obj);

obj.name = 'Jane'; // WORKS!
delete obj.age; // WORKS!
obj.city = 'NYC'; // Ignored (strict mode: error)
```

### Comparison Table

| Method | Add | Delete | Modify | Reconfigure |
|--------|-----|--------|--------|-------------|
| **freeze** | ❌ | ❌ | ❌ | ❌ |
| **seal** | ❌ | ❌ | ✅ | ❌ |
| **preventExtensions** | ❌ | ✅ | ✅ | ✅ |

### Checking Object State

```javascript
const obj = { name: 'John' };

// Check if frozen
Object.isFrozen(obj); // false
Object.freeze(obj);
Object.isFrozen(obj); // true

// Check if sealed
Object.isSealed(obj); // true (frozen objects are also sealed)

// Check if extensible
Object.isExtensible(obj); // false
```

## Modern structuredClone()

**structuredClone()** is the modern, built-in way to deep clone objects.

### What it Handles

```javascript
const original = {
  // Primitives
  string: 'hello',
  number: 42,
  boolean: true,
  null: null,
  undefined: undefined,

  // Objects
  nested: { a: { b: { c: 1 } } },
  array: [1, 2, [3, 4]],

  // Built-in types
  date: new Date(),
  regex: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  arrayBuffer: new ArrayBuffer(8),
  typedArray: new Uint8Array([1, 2, 3]),

  // Circular references
  circular: null
};

original.circular = original; // Self-reference

const clone = structuredClone(original);

console.log(clone.date instanceof Date); // true
console.log(clone.circular === clone); // true (circular preserved)
```

### What it Doesn't Handle

```javascript
const obj = {
  // ❌ Functions
  fn: () => 'hello',

  // ❌ Symbols
  [Symbol('key')]: 'value',

  // ❌ DOM nodes
  element: document.body,

  // ❌ Error objects
  error: new Error('test'),

  // ❌ Prototype chain (clones to Object.prototype)
  // ❌ Property descriptors
  // ❌ Getters and setters
};

// These will throw or be lost
const clone = structuredClone(obj);
```

### Browser Support

- Chrome 98+ (2022)
- Firefox 94+ (2021)
- Safari 15.4+ (2022)
- Node.js 17+

### Polyfill for Older Environments

```javascript
if (typeof structuredClone !== 'function') {
  global.structuredClone = (obj) => {
    // Fallback implementation
    return JSON.parse(JSON.stringify(obj));
  };
}
```

## JSON.parse/stringify Limitations

### What Gets Lost

```javascript
const original = {
  // ✅ Works
  string: 'hello',
  number: 42,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  nested: { a: 1 },

  // ❌ Lost/Changed
  undefined: undefined, // Lost
  function: () => {}, // Lost
  symbol: Symbol('test'), // Lost
  date: new Date(), // Becomes string
  regex: /test/, // Becomes {}
  nan: NaN, // Becomes null
  infinity: Infinity, // Becomes null
  map: new Map(), // Becomes {}
  set: new Set() // Becomes {}
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy);
// {
//   string: 'hello',
//   number: 42,
//   boolean: true,
//   null: null,
//   array: [1, 2, 3],
//   nested: { a: 1 },
//   date: '2024-01-31T12:00:00.000Z', // STRING!
//   regex: {}, // EMPTY OBJECT!
//   nan: null, // NULL!
//   infinity: null, // NULL!
//   map: {}, // EMPTY OBJECT!
//   set: {} // EMPTY OBJECT!
// }
// undefined, function, symbol are MISSING!
```

### Circular Reference Error

```javascript
const obj = { name: 'John' };
obj.self = obj; // Circular reference

try {
  JSON.parse(JSON.stringify(obj));
} catch (e) {
  console.log(e); // TypeError: Converting circular structure to JSON
}
```

### When to Use JSON Method

Safe cases:
- Plain objects with primitive values
- No functions, dates, or special types
- No circular references
- No undefined values that matter
- Need string representation for storage/transmission

## Deep Freeze Implementation

**Deep freeze** recursively freezes all nested objects.

### Basic Implementation

```javascript
function deepFreeze(obj) {
  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze all properties
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = obj[prop];

    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return obj;
}
```

### Advanced Implementation

```javascript
function deepFreezeAdvanced(obj, frozen = new WeakSet()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Avoid infinite loops with circular references
  if (frozen.has(obj)) {
    return obj;
  }

  // Mark as frozen
  frozen.add(obj);

  // Freeze the object
  Object.freeze(obj);

  // Handle arrays
  if (Array.isArray(obj)) {
    obj.forEach(item => deepFreezeAdvanced(item, frozen));
    return obj;
  }

  // Handle Map
  if (obj instanceof Map) {
    obj.forEach(value => deepFreezeAdvanced(value, frozen));
    return obj;
  }

  // Handle Set
  if (obj instanceof Set) {
    obj.forEach(value => deepFreezeAdvanced(value, frozen));
    return obj;
  }

  // Freeze all properties (including symbols)
  Reflect.ownKeys(obj).forEach(key => {
    const value = obj[key];
    if (value && typeof value === 'object') {
      deepFreezeAdvanced(value, frozen);
    }
  });

  return obj;
}
```

### Usage Example

```javascript
const config = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

deepFreeze(config);

// All modifications are prevented
config.api.url = 'https://hacker.com'; // Ignored
config.api.headers['Content-Type'] = 'text/plain'; // Ignored
config.api.newProp = 'value'; // Ignored
```

### Deep Seal Implementation

```javascript
function deepSeal(obj, sealed = new WeakSet()) {
  if (obj === null || typeof obj !== 'object' || sealed.has(obj)) {
    return obj;
  }

  sealed.add(obj);
  Object.seal(obj);

  Object.values(obj).forEach(value => {
    if (value && typeof value === 'object') {
      deepSeal(value, sealed);
    }
  });

  return obj;
}
```

## Common Pitfalls

### 1. Shallow Copy Trap

```javascript
const user = {
  name: 'John',
  settings: {
    theme: 'dark'
  }
};

const copy = { ...user };
copy.settings.theme = 'light';

console.log(user.settings.theme); // 'light' - OOPS!
```

**Solution**: Use deep copy method.

### 2. Array of Objects

```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

const copy = [...users];
copy[0].name = 'Bob';

console.log(users[0].name); // 'Bob' - OOPS!
```

**Solution**: Deep copy each object.

### 3. Date Object Loss

```javascript
const data = {
  created: new Date('2024-01-31')
};

const copy = JSON.parse(JSON.stringify(data));

console.log(copy.created instanceof Date); // false!
console.log(typeof copy.created); // 'string'
```

**Solution**: Use structuredClone or custom clone.

### 4. Frozen Object Illusion

```javascript
const obj = {
  user: {
    name: 'John'
  }
};

Object.freeze(obj);

obj.user.name = 'Jane'; // WORKS! Nested not frozen
console.log(obj.user.name); // 'Jane'
```

**Solution**: Use deepFreeze.

### 5. Object.assign Gotcha

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }
// Target is MUTATED!
```

**Solution**: Use empty object as target.

```javascript
const result = Object.assign({}, target, source);
```

### 6. Spread with Undefined

```javascript
const obj = { a: 1, b: undefined };
const copy = { ...obj };

console.log('b' in copy); // true
console.log(copy.b); // undefined

const jsonCopy = JSON.parse(JSON.stringify(obj));
console.log('b' in jsonCopy); // false! Lost!
```

### 7. Class Instance Copy

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const john = new Person('John');
const copy = { ...john };

console.log(copy.greet); // undefined! Method lost!
console.log(copy instanceof Person); // false!
```

**Solution**: Use custom clone that preserves prototype.

### 8. Property Descriptor Loss

```javascript
const obj = {};

Object.defineProperty(obj, 'secret', {
  value: 42,
  enumerable: false,
  writable: false
});

const copy = { ...obj };

console.log(copy.secret); // undefined! Non-enumerable lost!
```

### 9. Getter/Setter Loss

```javascript
const obj = {
  _value: 0,
  get value() {
    return this._value;
  },
  set value(v) {
    this._value = v;
  }
};

const copy = { ...obj };

console.log(copy.value); // 0 (gets the VALUE, not the getter)
copy.value = 10; // Sets property, doesn't call setter
console.log(copy._value); // undefined
```

### 10. WeakMap/WeakSet Can't Be Cloned

```javascript
const wm = new WeakMap();
const key = {};
wm.set(key, 'value');

// Can't iterate or clone WeakMap!
const copy = structuredClone(wm); // Throws error!
```

## Interview Questions

### Question 1: Implement Deep Clone

**Question**: Implement a deep clone function that handles objects, arrays, and circular references.

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // Null or primitive
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Circular reference
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, i) => {
      arrCopy[i] = deepClone(item, hash);
    });
    return arrCopy;
  }

  // Object
  const objCopy = {};
  hash.set(obj, objCopy);
  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });

  return objCopy;
}
```

### Question 2: Shallow vs Deep Copy

**Question**: What's the output?

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };

obj2.b.c = 3;

console.log(obj1.b.c); // ?
```

**Answer**: `3` - Spread is shallow, nested objects are referenced.

### Question 3: Object.freeze Behavior

**Question**: What's the output?

```javascript
const obj = {
  name: 'John',
  address: { city: 'NYC' }
};

Object.freeze(obj);

obj.name = 'Jane';
obj.address.city = 'Boston';

console.log(obj.name); // ?
console.log(obj.address.city); // ?
```

**Answer**: `'John'`, `'Boston'` - freeze is shallow.

### Question 4: JSON Limitation

**Question**: What's wrong with this code?

```javascript
const obj = {
  fn: () => 'hello',
  date: new Date(),
  regex: /test/
};

const copy = JSON.parse(JSON.stringify(obj));
```

**Answer**:
- `fn` is lost (functions not serialized)
- `date` becomes string
- `regex` becomes empty object

### Question 5: Implement Deep Freeze

**Question**: Implement a function that freezes an object recursively.

```javascript
function deepFreeze(obj) {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (
      obj[prop] &&
      typeof obj[prop] === 'object' &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
}
```

### Question 6: Object.seal vs Object.freeze

**Question**: What's the difference?

**Answer**:
- **freeze**: Can't add, delete, or modify properties
- **seal**: Can't add or delete, but CAN modify existing properties

### Question 7: structuredClone Limitation

**Question**: What can't structuredClone handle?

**Answer**:
- Functions
- Symbols
- DOM nodes
- Error objects
- Some complex objects (WeakMap, WeakSet)

### Question 8: Copy Array of Objects

**Question**: How to properly deep copy an array of objects?

```javascript
const arr = [{ a: 1 }, { b: 2 }];

// Wrong (shallow)
const copy1 = [...arr];

// Correct (deep)
const copy2 = structuredClone(arr);
// OR
const copy3 = arr.map(obj => ({ ...obj })); // If single level
// OR
const copy4 = JSON.parse(JSON.stringify(arr)); // If no special types
```

### Question 9: Circular Reference

**Question**: How to clone an object with circular references?

```javascript
const obj = { name: 'John' };
obj.self = obj;

// This works
const copy1 = structuredClone(obj);

// Custom implementation
function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj);
  // ... rest of implementation
}
```

### Question 10: Property Descriptors

**Question**: How to copy an object with property descriptors?

```javascript
function cloneWithDescriptors(obj) {
  const clone = Object.create(Object.getPrototypeOf(obj));

  Object.defineProperties(
    clone,
    Object.getOwnPropertyDescriptors(obj)
  );

  return clone;
}
```

## Summary

### Quick Reference

| Need | Use |
|------|-----|
| **Shallow copy object** | `{ ...obj }` or `Object.assign({}, obj)` |
| **Shallow copy array** | `[...arr]` or `arr.slice()` |
| **Deep copy (modern)** | `structuredClone(obj)` |
| **Deep copy (legacy)** | `JSON.parse(JSON.stringify(obj))` |
| **Deep copy (custom)** | Custom `deepClone()` function |
| **Prevent modifications** | `Object.freeze()` |
| **Prevent add/delete** | `Object.seal()` |
| **Deep freeze** | Custom `deepFreeze()` function |

Master these concepts for interviews and production code!
