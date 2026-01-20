// ============================================
// ADVANCED JAVASCRIPT - Async, Promises, ES6+
// ============================================

console.log('=== 1. PROMISES ===\n');

// Creating a Promise
const simplePromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Promise resolved successfully!');
  } else {
    reject('Promise rejected!');
  }
});

// Consuming a Promise
simplePromise
  .then(result => console.log('Promise result:', result))
  .catch(error => console.log('Promise error:', error));

// Promise with timeout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Starting delay...');
delay(1000).then(() => console.log('1 second passed!'));

// Chaining Promises
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Omkar', email: 'omkar@example.com' });
    }, 100);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, 100);
  });
}

console.log('\nPromise chaining:');
fetchUser(1)
  .then(user => {
    console.log('User fetched:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts fetched:', posts.length, 'posts');
  })
  .catch(error => console.log('Error:', error));

console.log('\n=== 2. PROMISE METHODS ===\n');

// Promise.all - wait for all promises
const promise1 = Promise.resolve('First');
const promise2 = Promise.resolve('Second');
const promise3 = Promise.resolve('Third');

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('Promise.all:', results);
  });

// Promise.race - first promise to settle
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 1000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));

Promise.race([slow, fast])
  .then(result => {
    console.log('Promise.race:', result);
  });

// Promise.allSettled - all promises settled (resolved or rejected)
const mixedPromises = [
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
];

Promise.allSettled(mixedPromises)
  .then(results => {
    console.log('\nPromise.allSettled:');
    results.forEach((result, index) => {
      console.log(`  Promise ${index}:`, result.status, result.value || result.reason);
    });
  });

// Promise.any - first fulfilled promise
Promise.any([
  Promise.reject('Error 1'),
  Promise.resolve('Success!'),
  Promise.resolve('Also success')
])
  .then(result => {
    console.log('\nPromise.any:', result);
  });

console.log('\n=== 3. ASYNC/AWAIT ===\n');

// Basic async function
async function greet() {
  return 'Hello from async function!';
}

greet().then(result => console.log('Async function:', result));

// await keyword
async function fetchData() {
  console.log('\nFetching data...');
  await delay(500);
  console.log('Data fetched!');
  return { data: 'Some data' };
}

fetchData().then(result => console.log('Result:', result));

// Error handling with try-catch
async function fetchWithErrorHandling() {
  try {
    const user = await fetchUser(1);
    console.log('\nAsync user:', user.name);

    const posts = await fetchPosts(user.id);
    console.log('Async posts:', posts.length, 'posts');

    return { user, posts };
  } catch (error) {
    console.log('Error in async function:', error);
  }
}

fetchWithErrorHandling();

// Multiple awaits in parallel
async function parallelFetch() {
  console.log('\nParallel fetching...');

  // Sequential (slower)
  const start1 = Date.now();
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);
  console.log('Sequential time:', Date.now() - start1, 'ms');

  // Parallel (faster)
  const start2 = Date.now();
  const [user3, user4] = await Promise.all([
    fetchUser(3),
    fetchUser(4)
  ]);
  console.log('Parallel time:', Date.now() - start2, 'ms');
}

parallelFetch();

console.log('\n=== 4. CLASSES (ES6+) ===\n');

// Basic Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
  }

  // Static method
  static species() {
    return 'Homo Sapiens';
  }
}

const person1 = new Person('Omkar', 25);
console.log('Class instance:', person1.introduce());
console.log('Static method:', Person.species());

// Inheritance
class Developer extends Person {
  constructor(name, age, language) {
    super(name, age); // Call parent constructor
    this.language = language;
  }

  introduce() {
    return `${super.introduce()} and I code in ${this.language}`;
  }

  code() {
    return `Writing ${this.language} code...`;
  }
}

const dev = new Developer('Omkar', 25, 'JavaScript');
console.log('Inherited class:', dev.introduce());
console.log('Own method:', dev.code());

// Getters and Setters
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set width(value) {
    if (value > 0) {
      this._width = value;
    }
  }
}

const rect = new Rectangle(10, 5);
console.log('\nGetter (area):', rect.area);
rect.width = 20;
console.log('After setter:', rect.area);

// Private fields (ES2022)
class BankAccount {
  #balance; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
console.log('\nPrivate field via getter:', account.getBalance());
console.log('After deposit:', account.deposit(500));
// console.log(account.#balance); // Error! Private field

console.log('\n=== 5. MODULES (ES6+) ===\n');

// Note: In Node.js, you need "type": "module" in package.json
// Export examples (in separate files):
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export default class Calculator { }

// Import examples:
// import { PI, add } from './math.js';
// import Calculator from './calculator.js';
// import * as MathUtils from './math.js';

console.log('Module import/export syntax shown above');
console.log('(Requires separate files to demonstrate)');

console.log('\n=== 6. DESTRUCTURING (Advanced) ===\n');

// Nested destructuring
const userData = {
  id: 1,
  name: 'Omkar',
  address: {
    city: 'Mumbai',
    country: 'India'
  },
  hobbies: ['coding', 'reading']
};

const {
  name,
  address: { city, country },
  hobbies: [firstHobby]
} = userData;

console.log('Nested destructuring:', { name, city, country, firstHobby });

// Renaming in destructuring
const { name: userName, id: userId } = userData;
console.log('Renamed:', { userName, userId });

// Function parameter destructuring with defaults
function createUser({ name, age = 18, role = 'user' } = {}) {
  return { name, age, role };
}

console.log('Param destructuring:', createUser({ name: 'Omkar', age: 25 }));
console.log('With defaults:', createUser({ name: 'John' }));

console.log('\n=== 7. TEMPLATE LITERALS (Advanced) ===\n');

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `**${values[i]}**` : '');
  }, '');
}

const name2 = 'Omkar';
const role = 'Developer';
const tagged = highlight`Hello, I'm ${name2} and I'm a ${role}`;
console.log('Tagged template:', tagged);

console.log('\n=== 8. SYMBOLS ===\n');

// Unique identifiers
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log('Symbols equal?', id1 === id2); // false

// Using symbols as object keys
const user = {
  name: 'Omkar',
  [id1]: 123
};

console.log('Symbol key access:', user[id1]);
console.log('Symbol in Object.keys():', Object.keys(user)); // Symbol not shown

// Well-known symbols
const iterableObj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

console.log('Custom iterator:');
for (const value of iterableObj) {
  console.log(' ', value);
}

console.log('\n=== 9. ITERATORS & GENERATORS ===\n');

// Generator function
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

console.log('Generator:');
const gen = numberGenerator();
console.log(' ', gen.next().value); // 1
console.log(' ', gen.next().value); // 2
console.log(' ', gen.next().value); // 3
console.log(' ', gen.next().done);  // true

// Generator with parameters
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

console.log('\nFibonacci generator:');
const fib = fibonacci();
for (let i = 0; i < 7; i++) {
  console.log(' ', fib.next().value);
}

// Generator for iteration
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log('\nRange generator:', [...range(1, 5)]);

console.log('\n=== 10. PROXY & REFLECT ===\n');

// Proxy for validation
const validator = {
  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[property] = value;
    return true;
  }
};

const person2 = new Proxy({}, validator);
person2.age = 25;
console.log('Proxy validation passed:', person2.age);

try {
  person2.age = 'invalid';
} catch (e) {
  console.log('Proxy validation failed:', e.message);
}

// Reflect API
const obj = { x: 1, y: 2 };
console.log('\nReflect.has():', Reflect.has(obj, 'x'));
console.log('Reflect.get():', Reflect.get(obj, 'y'));
Reflect.set(obj, 'z', 3);
console.log('After Reflect.set():', obj);

console.log('\n=== 11. MAP & SET ===\n');

// Map
const map = new Map();
map.set('name', 'Omkar');
map.set('age', 25);
map.set(1, 'number key');

console.log('Map get:', map.get('name'));
console.log('Map size:', map.size);
console.log('Map has:', map.has('age'));

console.log('Map iteration:');
for (const [key, value] of map) {
  console.log(`  ${key}: ${value}`);
}

// Set
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log('\nSet (unique values):', [...set]);
set.add(6);
console.log('After add:', [...set]);
set.delete(1);
console.log('After delete:', [...set]);
console.log('Set has 3:', set.has(3));

console.log('\n=== 12. WEAKMAP & WEAKSET ===\n');

// WeakMap (keys must be objects, garbage collected)
let obj1 = { name: 'Object 1' };
const weakMap = new WeakMap();
weakMap.set(obj1, 'some data');

console.log('WeakMap get:', weakMap.get(obj1));

// WeakSet
let obj2 = { id: 1 };
const weakSet = new WeakSet();
weakSet.add(obj2);

console.log('WeakSet has obj2:', weakSet.has(obj2));

console.log('\n=== 13. OPTIONAL CHAINING & NULLISH COALESCING ===\n');

const user2 = {
  name: 'Omkar',
  address: {
    city: 'Mumbai'
  }
};

// Optional Chaining
console.log('Optional chaining (exists):', user2?.address?.city);
console.log('Optional chaining (missing):', user2?.contact?.phone);
console.log('Optional method call:', user2.getName?.() ?? 'Method does not exist');

// Nullish Coalescing
const value1 = null ?? 'default';
const value2 = undefined ?? 'default';
const value3 = 0 ?? 'default'; // 0 is not nullish
const value4 = '' ?? 'default'; // '' is not nullish

console.log('\nNullish coalescing:', { value1, value2, value3, value4 });

console.log('\n=== 14. ARRAY METHODS (ES6+) ===\n');

const numbers = [1, 2, 3, 4, 5];

// find & findIndex
console.log('find():', numbers.find(n => n > 3));
console.log('findIndex():', numbers.findIndex(n => n > 3));

// some & every
console.log('some():', numbers.some(n => n > 4));
console.log('every():', numbers.every(n => n > 0));

// flatMap & flat
const nested = [1, [2, 3], [4, [5, 6]]];
console.log('flat(1):', nested.flat(1));
console.log('flat(2):', nested.flat(2));

const mapped = [1, 2, 3].flatMap(x => [x, x * 2]);
console.log('flatMap():', mapped);

// Array.from
console.log('Array.from():', Array.from('hello'));
console.log('Array.from() with map:', Array.from([1, 2, 3], x => x * 2));

console.log('\n=== 15. OBJECT METHODS (ES6+) ===\n');

const obj3 = { a: 1, b: 2, c: 3 };

// Object.keys, values, entries
console.log('Object.keys():', Object.keys(obj3));
console.log('Object.values():', Object.values(obj3));
console.log('Object.entries():', Object.entries(obj3));

// Object.assign
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log('Object.assign():', target);

// Object.freeze & Object.seal
const frozen = Object.freeze({ name: 'Frozen' });
// frozen.name = 'Changed'; // Silently fails
console.log('Frozen object:', frozen);

console.log('\n✅ Advanced JavaScript completed! Run: npm run advanced');
