/**
 * OBJECT MANIPULATION - Complete Examples
 *
 * This file demonstrates:
 * 1. Shallow vs Deep Copy
 * 2. All copy methods
 * 3. Object.freeze vs Object.seal
 * 4. structuredClone
 * 5. Deep clone implementation
 * 6. Deep freeze implementation
 * 7. Edge cases and pitfalls
 */

console.log('=== OBJECT MANIPULATION EXAMPLES ===\n');

// ============================================
// 1. SHALLOW COPY - THE TRAP
// ============================================

console.log('1. SHALLOW COPY - THE TRAP');
console.log('--------------------------');

const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'gaming']
};

// Shallow copy using spread
const shallowCopy = { ...original };

// Modify top-level property
shallowCopy.name = 'Jane';
console.log('After modifying copy.name:');
console.log('  Original:', original.name); // 'John' (unchanged)
console.log('  Copy:', shallowCopy.name); // 'Jane'

// Modify nested object - THE TRAP!
shallowCopy.address.city = 'Boston';
console.log('\nAfter modifying copy.address.city:');
console.log('  Original:', original.address.city); // 'Boston' (CHANGED!)
console.log('  Copy:', shallowCopy.address.city); // 'Boston'

// Modify array
shallowCopy.hobbies.push('cooking');
console.log('\nAfter pushing to copy.hobbies:');
console.log('  Original:', original.hobbies); // ['reading', 'gaming', 'cooking'] (CHANGED!)
console.log('  Copy:', shallowCopy.hobbies);
console.log();

// ============================================
// 2. ALL SHALLOW COPY METHODS
// ============================================

console.log('2. ALL SHALLOW COPY METHODS');
console.log('---------------------------');

const obj = {
  a: 1,
  b: { c: 2 }
};

// Method 1: Spread operator
const copy1 = { ...obj };
console.log('Spread operator:', copy1);

// Method 2: Object.assign
const copy2 = Object.assign({}, obj);
console.log('Object.assign:', copy2);

// Method 3: Object.create (different - creates with prototype)
const copy3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
console.log('Object.create:', copy3);

// Arrays
const arr = [1, 2, { a: 3 }];

console.log('\nArray shallow copies:');
console.log('Spread:', [...arr]);
console.log('slice():', arr.slice());
console.log('Array.from():', Array.from(arr));
console.log('concat():', [].concat(arr));
console.log();

// ============================================
// 3. JSON DEEP COPY (WITH LIMITATIONS)
// ============================================

console.log('3. JSON DEEP COPY (WITH LIMITATIONS)');
console.log('------------------------------------');

const data = {
  // These work fine
  string: 'hello',
  number: 42,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  nested: { a: { b: { c: 1 } } },

  // These have issues
  undefined: undefined,
  function: () => 'hello',
  symbol: Symbol('test'),
  date: new Date('2024-01-31'),
  regex: /test/gi,
  nan: NaN,
  infinity: Infinity,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3])
};

console.log('Original:', data);

const jsonCopy = JSON.parse(JSON.stringify(data));

console.log('\nAfter JSON.parse(JSON.stringify()):');
console.log(jsonCopy);
console.log('\nWhat was lost/changed:');
console.log('  undefined:', 'undefined' in jsonCopy); // false (lost!)
console.log('  function:', 'function' in jsonCopy); // false (lost!)
console.log('  symbol:', 'symbol' in jsonCopy); // false (lost!)
console.log('  date type:', jsonCopy.date instanceof Date); // false (string!)
console.log('  regex:', jsonCopy.regex); // {} (empty object!)
console.log('  nan:', jsonCopy.nan); // null
console.log('  infinity:', jsonCopy.infinity); // null

// Circular reference error
const circular = { name: 'John' };
circular.self = circular;

try {
  JSON.parse(JSON.stringify(circular));
} catch (e) {
  console.log('\nCircular reference error:', e.message);
}
console.log();

// ============================================
// 4. STRUCTURED CLONE (MODERN)
// ============================================

console.log('4. STRUCTURED CLONE (MODERN)');
console.log('----------------------------');

const modern = {
  string: 'hello',
  nested: { a: { b: { c: 1 } } },
  date: new Date('2024-01-31'),
  regex: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  array: [1, 2, [3, 4]],
  typedArray: new Uint8Array([1, 2, 3])
};

// Add circular reference
modern.circular = modern;

if (typeof structuredClone === 'function') {
  const cloned = structuredClone(modern);

  console.log('Date preserved:', cloned.date instanceof Date);
  console.log('RegExp preserved:', cloned.regex instanceof RegExp);
  console.log('Map preserved:', cloned.map instanceof Map);
  console.log('Set preserved:', cloned.set instanceof Set);
  console.log('Circular preserved:', cloned.circular === cloned);

  // Verify deep copy
  cloned.nested.a.b.c = 999;
  console.log('Original nested value:', modern.nested.a.b.c); // 1 (unchanged)
  console.log('Cloned nested value:', cloned.nested.a.b.c); // 999
} else {
  console.log('structuredClone not available in this environment');
}
console.log();

// ============================================
// 5. CUSTOM DEEP CLONE IMPLEMENTATION
// ============================================

console.log('5. CUSTOM DEEP CLONE IMPLEMENTATION');
console.log('-----------------------------------');

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
    return new RegExp(obj.source, obj.flags);
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

  // Handle plain Object
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, objCopy);

  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });

  return objCopy;
}

// Test deep clone
const testObj = {
  name: 'John',
  nested: { a: { b: { c: 1 } } },
  date: new Date(),
  regex: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  array: [1, [2, [3]]]
};
testObj.circular = testObj;

const deepCopied = deepClone(testObj);

console.log('Deep clone successful:', deepCopied.name);
console.log('Circular reference handled:', deepCopied.circular === deepCopied);
console.log('Date preserved:', deepCopied.date instanceof Date);
console.log('RegExp preserved:', deepCopied.regex instanceof RegExp);

// Verify independence
deepCopied.nested.a.b.c = 999;
console.log('Original nested.a.b.c:', testObj.nested.a.b.c); // 1
console.log('Cloned nested.a.b.c:', deepCopied.nested.a.b.c); // 999
console.log();

// ============================================
// 6. OBJECT.FREEZE
// ============================================

console.log('6. OBJECT.FREEZE');
console.log('----------------');

const frozen = {
  name: 'John',
  age: 30,
  address: {
    city: 'NYC'
  }
};

Object.freeze(frozen);

console.log('Is frozen:', Object.isFrozen(frozen));

// Try to modify
frozen.name = 'Jane'; // Silently ignored
frozen.city = 'Boston'; // Silently ignored
delete frozen.age; // Silently ignored

console.log('After modification attempts:');
console.log('  name:', frozen.name); // 'John' (unchanged)
console.log('  age:', frozen.age); // 30 (not deleted)
console.log('  city:', frozen.city); // undefined (not added)

// But nested objects can be modified!
frozen.address.city = 'Boston';
console.log('  address.city:', frozen.address.city); // 'Boston' (CHANGED!)
console.log();

// ============================================
// 7. OBJECT.SEAL
// ============================================

console.log('7. OBJECT.SEAL');
console.log('--------------');

const sealed = {
  name: 'John',
  age: 30
};

Object.seal(sealed);

console.log('Is sealed:', Object.isSealed(sealed));

// Can modify existing properties
sealed.name = 'Jane';
console.log('After sealed.name = "Jane":', sealed.name); // 'Jane' (works!)

// Can't add or delete
sealed.city = 'NYC';
delete sealed.age;

console.log('After add/delete attempts:');
console.log('  city:', sealed.city); // undefined (not added)
console.log('  age:', sealed.age); // 30 (not deleted)
console.log();

// ============================================
// 8. OBJECT.PREVENTEXTENSIONS
// ============================================

console.log('8. OBJECT.PREVENTEXTENSIONS');
console.log('---------------------------');

const obj2 = {
  name: 'John',
  age: 30
};

Object.preventExtensions(obj2);

console.log('Is extensible:', Object.isExtensible(obj2));

// Can modify and delete
obj2.name = 'Jane';
delete obj2.age;

console.log('After modify/delete:');
console.log('  name:', obj2.name); // 'Jane' (modified)
console.log('  age:', obj2.age); // undefined (deleted)

// Can't add
obj2.city = 'NYC';
console.log('  city:', obj2.city); // undefined (not added)
console.log();

// ============================================
// 9. COMPARISON TABLE
// ============================================

console.log('9. FREEZE vs SEAL vs PREVENT_EXTENSIONS');
console.log('---------------------------------------');

function testMutability(obj, label) {
  console.log(`\n${label}:`);

  const original = { ...obj };

  // Try modify
  obj.name = 'Modified';
  console.log('  Modify:', obj.name !== original.name ? 'Allowed' : 'Blocked');

  // Try delete
  const hadAge = 'age' in obj;
  delete obj.age;
  console.log('  Delete:', !('age' in obj) && hadAge ? 'Allowed' : 'Blocked');

  // Try add
  obj.newProp = 'value';
  console.log('  Add:', 'newProp' in obj ? 'Allowed' : 'Blocked');
}

testMutability({ name: 'John', age: 30 }, 'Normal Object');
testMutability(Object.freeze({ name: 'John', age: 30 }), 'Frozen');
testMutability(Object.seal({ name: 'John', age: 30 }), 'Sealed');
testMutability(Object.preventExtensions({ name: 'John', age: 30 }), 'Non-extensible');
console.log();

// ============================================
// 10. DEEP FREEZE IMPLEMENTATION
// ============================================

console.log('10. DEEP FREEZE IMPLEMENTATION');
console.log('------------------------------');

function deepFreeze(obj, frozen = new WeakSet()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Avoid infinite loops with circular references
  if (frozen.has(obj)) {
    return obj;
  }

  // Mark as processing
  frozen.add(obj);

  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze all properties
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = obj[prop];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value, frozen);
    }
  });

  // Handle symbols
  Object.getOwnPropertySymbols(obj).forEach(sym => {
    const value = obj[sym];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value, frozen);
    }
  });

  return obj;
}

const config = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    }
  },
  features: {
    darkMode: true,
    notifications: {
      email: true,
      push: false
    }
  }
};

deepFreeze(config);

console.log('Config deep frozen');

// Try to modify at various levels
config.api.url = 'https://hacker.com';
config.api.headers['Content-Type'] = 'text/plain';
config.features.notifications.email = false;

console.log('After modification attempts:');
console.log('  api.url:', config.api.url); // Original (unchanged)
console.log('  headers[Content-Type]:', config.api.headers['Content-Type']); // Original
console.log('  notifications.email:', config.features.notifications.email); // Original
console.log('All nested objects frozen:', Object.isFrozen(config.features.notifications));
console.log();

// ============================================
// 11. EDGE CASE: ARRAY OF OBJECTS
// ============================================

console.log('11. EDGE CASE: ARRAY OF OBJECTS');
console.log('--------------------------------');

const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 }
];

// Shallow copy - WRONG
const shallowUsers = [...users];
shallowUsers[0].name = 'Bob';

console.log('After shallow copy modification:');
console.log('  Original:', users[0].name); // 'Bob' (CHANGED!)
console.log('  Copy:', shallowUsers[0].name); // 'Bob'

// Deep copy - CORRECT
const deepUsers = users.map(user => ({ ...user })); // Single level
deepUsers[0].name = 'Alice';

console.log('\nAfter deep copy modification:');
console.log('  Original:', users[0].name); // 'Bob' (unchanged)
console.log('  Copy:', deepUsers[0].name); // 'Alice'

// Better: use structuredClone or deepClone for nested objects
const users2 = [
  { id: 1, name: 'John', profile: { age: 30, city: 'NYC' } }
];

const properDeep = deepClone(users2);
properDeep[0].profile.city = 'Boston';

console.log('\nNested object in array:');
console.log('  Original:', users2[0].profile.city); // 'NYC' (unchanged)
console.log('  Copy:', properDeep[0].profile.city); // 'Boston'
console.log();

// ============================================
// 12. EDGE CASE: PROPERTY DESCRIPTORS
// ============================================

console.log('12. EDGE CASE: PROPERTY DESCRIPTORS');
console.log('-----------------------------------');

const objWithDescriptors = {};

Object.defineProperty(objWithDescriptors, 'secret', {
  value: 42,
  enumerable: false,
  writable: false,
  configurable: false
});

Object.defineProperty(objWithDescriptors, 'public', {
  value: 'hello',
  enumerable: true
});

console.log('Original descriptors:');
console.log('  Keys:', Object.keys(objWithDescriptors)); // ['public'] only
console.log('  secret:', objWithDescriptors.secret); // 42 (exists but not enumerable)

// Spread loses non-enumerable properties
const spread = { ...objWithDescriptors };
console.log('\nAfter spread:');
console.log('  Keys:', Object.keys(spread)); // ['public']
console.log('  secret:', spread.secret); // undefined (LOST!)

// Proper copy with descriptors
function cloneWithDescriptors(obj) {
  return Object.defineProperties(
    Object.create(Object.getPrototypeOf(obj)),
    Object.getOwnPropertyDescriptors(obj)
  );
}

const proper = cloneWithDescriptors(objWithDescriptors);
console.log('\nWith proper descriptor copy:');
console.log('  Keys:', Object.keys(proper)); // ['public']
console.log('  secret:', proper.secret); // 42 (preserved!)
console.log();

// ============================================
// 13. EDGE CASE: GETTERS AND SETTERS
// ============================================

console.log('13. EDGE CASE: GETTERS AND SETTERS');
console.log('-----------------------------------');

const objWithGetterSetter = {
  _value: 0,
  get value() {
    console.log('  Getter called');
    return this._value;
  },
  set value(v) {
    console.log('  Setter called');
    this._value = v;
  }
};

console.log('Original - get value:', objWithGetterSetter.value);
objWithGetterSetter.value = 10;

// Spread loses getter/setter
const spreadObj = { ...objWithGetterSetter };
console.log('\nAfter spread:');
console.log('  value:', spreadObj.value); // 10 (the VALUE, not getter)
console.log('  Has getter?', Object.getOwnPropertyDescriptor(spreadObj, 'value').get !== undefined); // false

spreadObj.value = 20; // Just sets property, doesn't call setter
console.log('  _value:', spreadObj._value); // undefined
console.log();

// ============================================
// 14. EDGE CASE: CLASS INSTANCES
// ============================================

console.log('14. EDGE CASE: CLASS INSTANCES');
console.log('-------------------------------');

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const john = new Person('John', 30);

// Spread loses methods and prototype
const spreadPerson = { ...john };
console.log('Spread:');
console.log('  name:', spreadPerson.name); // 'John' (data preserved)
console.log('  greet:', spreadPerson.greet); // undefined (method LOST!)
console.log('  instanceof Person:', spreadPerson instanceof Person); // false

// Proper clone preserving prototype
const clonedPerson = Object.assign(Object.create(Object.getPrototypeOf(john)), john);
console.log('\nProper clone:');
console.log('  name:', clonedPerson.name); // 'John'
console.log('  greet():', clonedPerson.greet()); // "Hello, I'm John" (works!)
console.log('  instanceof Person:', clonedPerson instanceof Person); // true
console.log();

// ============================================
// 15. PERFORMANCE COMPARISON
// ============================================

console.log('15. PERFORMANCE COMPARISON');
console.log('--------------------------');

const largeObj = {
  data: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: Math.random(),
    nested: { a: i, b: i * 2 }
  }))
};

console.log('Cloning array with 1000 objects...\n');

console.time('Spread');
const s1 = { ...largeObj };
console.timeEnd('Spread');

console.time('Object.assign');
const s2 = Object.assign({}, largeObj);
console.timeEnd('Object.assign');

console.time('JSON.parse/stringify');
const s3 = JSON.parse(JSON.stringify(largeObj));
console.timeEnd('JSON.parse/stringify');

if (typeof structuredClone === 'function') {
  console.time('structuredClone');
  const s4 = structuredClone(largeObj);
  console.timeEnd('structuredClone');
}

console.time('Custom deepClone');
const s5 = deepClone(largeObj);
console.timeEnd('Custom deepClone');

console.log('\n=== ALL EXAMPLES COMPLETED ===');
