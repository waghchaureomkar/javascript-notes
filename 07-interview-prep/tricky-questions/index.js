/**
 * TRICKY JAVASCRIPT INTERVIEW QUESTIONS
 *
 * All questions with runnable code and detailed explanations.
 * Categories:
 * 1. Type Coercion
 * 2. Hoisting
 * 3. Closures
 * 4. Event Loop
 * 5. This Keyword
 * 6. Scope Chain
 * 7. Miscellaneous
 */

console.log('=== TRICKY JAVASCRIPT QUESTIONS ===\n');

// ============================================
// CATEGORY 1: TYPE COERCION
// ============================================

console.log('CATEGORY 1: TYPE COERCION');
console.log('=========================\n');

// Q1: Double vs Triple Equals
console.log('Q1: Double vs Triple Equals');
console.log('0 == "0":', 0 == '0');        // true (type coercion)
console.log('0 === "0":', 0 === '0');      // false (different types)
console.log('false == 0:', false == 0);    // true (false coerces to 0)
console.log('false === 0:', false === 0);  // false (different types)
console.log();

// Q2: NaN Comparisons
console.log('Q2: NaN Comparisons');
console.log('NaN == NaN:', NaN == NaN);         // false
console.log('NaN === NaN:', NaN === NaN);       // false
console.log('NaN > 0:', NaN > 0);               // false
console.log('NaN < 0:', NaN < 0);               // false
console.log('isNaN(NaN):', isNaN(NaN));         // true
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true
console.log('isNaN("hello"):', isNaN('hello')); // true (converts first!)
console.log('Number.isNaN("hello"):', Number.isNaN('hello')); // false (no conversion)
console.log();

// Q3: Null vs Undefined
console.log('Q3: Null vs Undefined');
console.log('null == undefined:', null == undefined);   // true (special case)
console.log('null === undefined:', null === undefined); // false (different types)
console.log('typeof null:', typeof null);               // 'object' (famous bug!)
console.log('typeof undefined:', typeof undefined);     // 'undefined'
console.log();

// Q4: Array to Number Coercion
console.log('Q4: Array to Number Coercion');
console.log('[1, 2] + [3, 4]:', [1, 2] + [3, 4]); // "1,23,4" (both to string)
console.log('[1] + 2:', [1] + 2);                 // "12" (array to string)
console.log('[1, 2] - [3, 4]:', [1, 2] - [3, 4]); // NaN (can't subtract arrays)
console.log('[] + {}:', [] + {});                 // "[object Object]"
console.log('{} + []:', eval('({}) + []'));       // "[object Object]"
console.log();

// Q5: Tricky Boolean Conversions
console.log('Q5: Tricky Boolean Conversions');
console.log('Boolean("false"):', Boolean('false')); // true (non-empty string!)
console.log('Boolean("0"):', Boolean('0'));         // true (non-empty string!)
console.log('Boolean([]):', Boolean([]));           // true (object)
console.log('Boolean({}):', Boolean({}));           // true (object)
console.log('!![]:', !![]);                         // true
console.log('!!{}:', !!{});                         // true
console.log('Boolean(""):', Boolean(''));           // false (empty string)
console.log('Boolean(0):', Boolean(0));             // false
console.log();

// Q6: Plus Operator Magic
console.log('Q6: Plus Operator Magic');
console.log('+"123":', +'123');         // 123 (unary plus converts to number)
console.log('+[]:', +[]);               // 0 (empty array to 0)
console.log('+[1]:', +[1]);             // 1 (single element)
console.log('+[1, 2]:', +[1, 2]);       // NaN (multiple elements)
console.log('+true:', +true);           // 1
console.log('+false:', +false);         // 0
console.log('+null:', +null);           // 0
console.log('+undefined:', +undefined); // NaN
console.log();

// Q7: String Concatenation Tricks
console.log('Q7: String Concatenation Tricks');
console.log('"5" + 3:', '5' + 3);           // "53" (concatenation)
console.log('"5" - 3:', '5' - 3);           // 2 (coerce to number)
console.log('"5" * 3:', '5' * 3);           // 15 (coerce to number)
console.log('"5" / 3:', '5' / 3);           // 1.666... (coerce to number)
console.log('"5" + + "3":', '5' + + '3');   // "53" (+ converts '3' to 3)
console.log('"5" - - "3":', '5' - - '3');   // 8 (5 - (-3) = 8)
console.log();

// Q8: Equality Comparison Tricks
console.log('Q8: Equality Comparison Tricks');
console.log('[] == ![]:', [] == ![]);          // true (![] is false, [] becomes '')
console.log('"" == 0:', '' == 0);              // true ('' coerces to 0)
console.log('" " == 0:', ' ' == 0);            // true (' ' coerces to 0)
console.log('"0" == false:', '0' == false);    // true (both coerce to 0)
console.log('null == 0:', null == 0);          // false (special rule)
console.log('undefined == 0:', undefined == 0);// false (special rule)
console.log('null == false:', null == false);  // false
console.log();

// ============================================
// CATEGORY 2: HOISTING
// ============================================

console.log('CATEGORY 2: HOISTING');
console.log('====================\n');

// Q9: var Hoisting
console.log('Q9: var Hoisting');
console.log('x before declaration:', typeof x); // undefined (hoisted)
var x = 5;
console.log('x after declaration:', x); // 5
console.log();

// Q10: let/const Temporal Dead Zone
console.log('Q10: let/const Temporal Dead Zone');
try {
  console.log(y); // ReferenceError
  let y = 5;
} catch (e) {
  console.log('Error:', e.message);
}
console.log();

// Q11: Function Hoisting
console.log('Q11: Function Hoisting');
foo();    // "foo" (function declaration hoisted)
// bar(); // TypeError (commented to prevent error)

function foo() {
  console.log('foo called');
}

var bar = function() {
  console.log('bar');
};
console.log();

// Q12: Hoisting with Same Name
console.log('Q12: Hoisting with Same Name');
var a = 1;
function a() {}
console.log('a:', a); // 1 (assignment wins)
console.log('typeof a:', typeof a); // 'number'
console.log();

// Q13: Multiple Hoisting
console.log('Q13: Multiple Hoisting');
console.log('typeof b:', typeof b); // 'function' (function hoisted over var)
var b = 'hello';
function b() {}
console.log('typeof b after assignment:', typeof b); // 'string'
console.log();

// ============================================
// CATEGORY 3: CLOSURES
// ============================================

console.log('CATEGORY 3: CLOSURES');
console.log('====================\n');

// Q15: Classic setTimeout in Loop
console.log('Q15: Classic setTimeout in Loop');
console.log('With var (prints after delay):');
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('  var i:', i), 10);
}

setTimeout(() => {
  console.log('\nWith let:');
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('  let j:', j), 10);
  }

  setTimeout(() => {
    console.log('\nWith IIFE:');
    for (var k = 0; k < 3; k++) {
      (function(num) {
        setTimeout(() => console.log('  IIFE k:', num), 10);
      })(k);
    }
  }, 50);
}, 50);

// Q16: Closure with Private Variables
console.log('\nQ16: Closure with Private Variables');
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}

const counter = createCounter();
console.log('increment():', counter.increment()); // 1
console.log('increment():', counter.increment()); // 2
console.log('value():', counter.value());         // 2
console.log('counter.count:', counter.count);     // undefined (private!)
console.log();

// Q17: Closure Memory Issue
console.log('Q17: Closure Memory Issue');
function createFunctions() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(() => i);
  }
  return arr;
}

const fns = createFunctions();
console.log('fns[0]():', fns[0]()); // 3
console.log('fns[1]():', fns[1]()); // 3
console.log('fns[2]():', fns[2]()); // 3
console.log();

// Q18: Nested Closures
console.log('Q18: Nested Closures');
function outer() {
  let x = 10;

  function middle() {
    let y = 20;

    function inner() {
      return x + y;
    }

    return inner;
  }

  return middle;
}

const nestedFn = outer()();
console.log('Nested closure result:', nestedFn()); // 30
console.log();

// ============================================
// CATEGORY 4: EVENT LOOP
// ============================================

console.log('CATEGORY 4: EVENT LOOP');
console.log('======================\n');

// Q19: Promise vs setTimeout
console.log('Q19: Promise vs setTimeout');
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
// Output order: 1, 4, 3, 2
console.log();

// Q20: Multiple Promise Chains
console.log('Q20: Multiple Promise Chains');
Promise.resolve()
  .then(() => console.log('Promise 1 - then 1'))
  .then(() => console.log('Promise 1 - then 2'));

Promise.resolve()
  .then(() => console.log('Promise 2 - then 1'))
  .then(() => console.log('Promise 2 - then 2'));
// Output: 1-1, 2-1, 1-2, 2-2
console.log();

// Q21: Async/Await Order
console.log('Q21: Async/Await Order');
async function asyncFoo() {
  console.log('async 1');
  await Promise.resolve();
  console.log('async 2');
}

console.log('sync 3');
asyncFoo();
console.log('sync 4');
// Output: sync 3, async 1, sync 4, async 2
console.log();

// Q22: Mixed Async Operations
setTimeout(() => {
  console.log('\nQ22: Mixed Async Operations');
  console.log('A');

  setTimeout(() => console.log('B'), 0);

  Promise.resolve().then(() => {
    console.log('C');
    setTimeout(() => console.log('D'), 0);
  });

  Promise.resolve().then(() => console.log('E'));

  console.log('F');
  // Output: A, F, C, E, B, D
  console.log();
}, 200);

// Q23: Promise.then Chaining
setTimeout(() => {
  console.log('Q23: Promise.then Chaining');
  Promise.resolve(1)
    .then(x => x + 1)
    .then(x => { console.log('First then:', x); })
    .then(x => { console.log('Second then:', x); });
  // Output: 2, undefined
  console.log();
}, 300);

// ============================================
// CATEGORY 5: THIS KEYWORD
// ============================================

setTimeout(() => {
  console.log('CATEGORY 5: THIS KEYWORD');
  console.log('========================\n');

  // Q24: Arrow Function This
  console.log('Q24: Arrow Function This');
  const obj = {
    name: 'John',
    greet: function() {
      console.log('  Regular function this.name:', this.name);
    },
    greetArrow: () => {
      console.log('  Arrow function this:', typeof this);
    }
  };

  obj.greet();      // "John"
  obj.greetArrow(); // undefined (lexical this)
  console.log();

  // Q25: Method Extraction
  console.log('Q25: Method Extraction');
  const user = {
    name: 'Alice',
    greet() {
      console.log('  this.name:', this.name);
    }
  };

  user.greet(); // "Alice"
  const extractedFn = user.greet;
  try {
    extractedFn(); // undefined or error
  } catch (e) {
    console.log('  Error with extracted function');
  }
  console.log();

  // Q26: Constructor This
  console.log('Q26: Constructor This');
  function Person(name) {
    this.name = name;
    return { age: 30 }; // Explicit return
  }

  const p = new Person('John');
  console.log('  p.name:', p.name); // undefined
  console.log('  p.age:', p.age);   // 30
  console.log();

  // Q27: setTimeout This
  console.log('Q27: setTimeout This');
  const obj2 = {
    name: 'Bob',
    greet() {
      console.log('  Before setTimeout:', this.name);
      setTimeout(function() {
        console.log('  Inside setTimeout (regular):', this.name);
      }, 10);
      setTimeout(() => {
        console.log('  Inside setTimeout (arrow):', this.name);
      }, 20);
    }
  };

  obj2.greet();

  // Q28: Call/Apply/Bind
  setTimeout(() => {
    console.log('\nQ28: Call/Apply/Bind');
    function greet(greeting, punctuation) {
      console.log('  ' + greeting + ' ' + this.name + punctuation);
    }

    const user = { name: 'Charlie' };

    greet.call(user, 'Hello', '!');
    greet.apply(user, ['Hi', '?']);
    const bound = greet.bind(user, 'Hey');
    bound('...');
    console.log();
  }, 100);
}, 400);

// ============================================
// CATEGORY 6: SCOPE CHAIN
// ============================================

setTimeout(() => {
  console.log('CATEGORY 6: SCOPE CHAIN');
  console.log('=======================\n');

  // Q29: Scope Chain Lookup
  console.log('Q29: Scope Chain Lookup');
  let a = 1;

  function outer() {
    let a = 2;

    function inner() {
      let a = 3;
      console.log('  Inner a:', a);
    }

    inner();
    console.log('  Outer a:', a);
  }

  outer();
  console.log('  Global a:', a);
  console.log();

  // Q30: Variable Shadowing
  console.log('Q30: Variable Shadowing');
  let z = 10;

  function test() {
    try {
      console.log('  z before declaration:', z);
      let z = 20;
    } catch (e) {
      console.log('  Error:', e.message);
    }
  }

  test();
  console.log();

  // Q31: Global vs Local
  console.log('Q31: Global vs Local');
  var globalX = 1;

  function scopeTest() {
    console.log('  First log:', globalX); // undefined (hoisted)
    var globalX = 2;
    console.log('  Second log:', globalX); // 2
  }

  scopeTest();
  console.log('  Global:', globalX); // 1
  console.log();
}, 600);

// ============================================
// CATEGORY 7: MISCELLANEOUS
// ============================================

setTimeout(() => {
  console.log('CATEGORY 7: MISCELLANEOUS');
  console.log('=========================\n');

  // Q32: Array Length
  console.log('Q32: Array Length');
  const arr = [1, 2, 3];
  arr[10] = 10;
  console.log('  arr.length:', arr.length);     // 11 (sparse array)
  console.log('  arr[5]:', arr[5]);             // undefined (hole)
  console.log('  arr:', arr);
  console.log();

  // Q33: Object Keys
  console.log('Q33: Object Keys');
  const obj = {
    1: 'one',
    '1': 'uno',
    name: 'John'
  };
  console.log('  Object.keys(obj):', Object.keys(obj)); // ['1', 'name']
  console.log();

  // Q34: Delete Operator
  console.log('Q34: Delete Operator');
  const obj2 = { a: 1, b: 2 };
  delete obj2.a;
  console.log('  obj2.a:', obj2.a);           // undefined
  console.log('  "a" in obj2:', 'a' in obj2); // false

  let deleteX = 5;
  delete deleteX;
  console.log('  deleteX after delete:', deleteX); // 5 (can\'t delete)
  console.log();

  // Q35: Comma Operator
  console.log('Q35: Comma Operator');
  let commaX = (1, 2, 3);
  console.log('  commaX:', commaX); // 3 (returns last)

  let commaY = (console.log('  Executing A'), console.log('  Executing B'), 'C');
  console.log('  commaY:', commaY); // C
  console.log();

  // Q36: Logical Operators
  console.log('Q36: Logical Operators');
  console.log('  0 || 1:', 0 || 1);              // 1
  console.log('  1 || 2:', 1 || 2);              // 1
  console.log('  0 && 1:', 0 && 1);              // 0
  console.log('  1 && 2:', 1 && 2);              // 2
  console.log('  null ?? 0:', null ?? 0);        // 0
  console.log('  undefined ?? 0:', undefined ?? 0); // 0
  console.log('  false ?? 0:', false ?? 0);      // false
  console.log();

  // Q37: Array Methods Side Effects
  console.log('Q37: Array Methods Side Effects');
  const arr2 = [1, 2, 3];
  const result = arr2.map(x => {
    arr2.push(x + 3);
    return x * 2;
  });
  console.log('  result:', result); // [2, 4, 6]
  console.log('  arr2:', arr2);     // [1, 2, 3, 4, 5, 6]
  console.log();

  // Q38: Object Property Order
  console.log('Q38: Object Property Order');
  const obj3 = {
    '2': 'two',
    '1': 'one',
    'b': 'B',
    'a': 'A'
  };
  console.log('  Object.keys(obj3):', Object.keys(obj3)); // ['1', '2', 'b', 'a']
  console.log();

  // Q39: Function Name
  console.log('Q39: Function Name');
  const foo = function bar() {
    console.log('  typeof bar inside:', typeof bar);
  };
  foo();
  console.log('  typeof bar outside:', typeof bar);
  console.log();

  // Q40: Increment Operator
  console.log('Q40: Increment Operator');
  let incX = 1;
  console.log('  incX++:', incX++); // 1 (returns old value)
  console.log('  incX:', incX);     // 2

  let incY = 1;
  console.log('  ++incY:', ++incY); // 2 (returns new value)
  console.log('  incY:', incY);     // 2
  console.log();

  // Q41: Function Parameters
  console.log('Q41: Function Parameters');
  function defaultParams(a = 1, b = a + 1, c = b + a) {
    console.log('  a, b, c:', a, b, c);
  }
  defaultParams();         // 1, 2, 3
  defaultParams(10);       // 10, 11, 21
  defaultParams(10, 20);   // 10, 20, 30
  console.log();

  // Q42: Try-Catch-Finally
  console.log('Q42: Try-Catch-Finally');
  function finallyReturn() {
    try {
      return 1;
    } finally {
      return 2;
    }
  }
  console.log('  finallyReturn():', finallyReturn()); // 2
  console.log();

  // Q43: String Comparison
  console.log('Q43: String Comparison');
  console.log('  "10" > "9":', '10' > '9');   // false (string: '1' < '9')
  console.log('  10 > 9:', 10 > 9);           // true
  console.log('  "10" > 9:', '10' > 9);       // true (coerces to number)
  console.log('  "B" > "A":', 'B' > 'A');     // true (lexicographic)
  console.log();

  // Q44: Array Destructuring
  console.log('Q44: Array Destructuring');
  const [arrA, arrB, arrC] = [1, 2];
  console.log('  a, b, c:', arrA, arrB, arrC); // 1, 2, undefined

  const [arrX, ...rest] = [1];
  console.log('  x, rest:', arrX, rest); // 1, []
  console.log();

  // Q45: Object Destructuring
  console.log('Q45: Object Destructuring');
  const { destructA, destructB = 5 } = { destructA: 1 };
  console.log('  a, b:', destructA, destructB); // 1, 5

  const { x: renamedY } = { x: 10 };
  console.log('  y:', renamedY); // 10
  try {
    console.log('  x:', x);
  } catch (e) {
    console.log('  x is not defined (renamed to y)');
  }
  console.log();

  console.log('=== ALL TRICKY QUESTIONS COMPLETED ===');
}, 800);

// Additional synchronous examples
console.log('\n--- ADDITIONAL TRICKY EXAMPLES ---\n');

// Typeof gotchas
console.log('TYPEOF GOTCHAS:');
console.log('typeof null:', typeof null);              // "object" (bug!)
console.log('typeof []:', typeof []);                  // "object"
console.log('typeof {}:', typeof {});                  // "object"
console.log('typeof NaN:', typeof NaN);                // "number"
console.log('typeof function(){}:', typeof function(){}); // "function"
console.log();

// parseInt gotchas
console.log('PARSEINT GOTCHAS:');
console.log('parseInt("08"):', parseInt('08'));        // 8
console.log('parseInt("08", 10):', parseInt('08', 10));// 8
console.log('["1", "2", "3"].map(parseInt):', ['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]
console.log('Explanation: map passes (item, index) to parseInt(string, radix)');
console.log();

// Falsy values
console.log('FALSY VALUES:');
const falsyValues = [false, 0, '', null, undefined, NaN];
falsyValues.forEach(val => {
  console.log(`Boolean(${JSON.stringify(val)}):`, Boolean(val));
});
console.log();

// Math precision
console.log('MATH PRECISION:');
console.log('0.1 + 0.2 === 0.3:', 0.1 + 0.2 === 0.3);  // false!
console.log('0.1 + 0.2:', 0.1 + 0.2);                   // 0.30000000000000004
console.log('Math.max():', Math.max());                  // -Infinity
console.log('Math.min():', Math.min());                  // Infinity
console.log();
