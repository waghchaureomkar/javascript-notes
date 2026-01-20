// ============================================
// JAVASCRIPT BASICS - Variables, Types, Operators
// ============================================

console.log('=== 1. VARIABLES ===\n');

// var - function scoped (old way, avoid using)
var oldWay = 'var is function scoped';

// let - block scoped, can be reassigned
let name = 'Omkar';
name = 'Omkar Waghchaure'; // reassignment allowed
console.log('let variable:', name);

// const - block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // Error! Cannot reassign const
console.log('const variable:', PI);

// const with objects - object properties can be modified
const person = { name: 'John', age: 25 };
person.age = 26; // This is allowed
// person = {}; // Error! Cannot reassign const
console.log('const object:', person);

console.log('\n=== 2. DATA TYPES ===\n');

// Primitive Types
const string = 'Hello World';
const number = 42;
const boolean = true;
const nullValue = null;
const undefinedValue = undefined;
const symbol = Symbol('unique');
const bigInt = 9007199254740991n;

console.log('String:', string, typeof string);
console.log('Number:', number, typeof number);
console.log('Boolean:', boolean, typeof boolean);
console.log('Null:', nullValue, typeof nullValue); // typeof null is 'object' (JS quirk)
console.log('Undefined:', undefinedValue, typeof undefinedValue);
console.log('Symbol:', symbol, typeof symbol);
console.log('BigInt:', bigInt, typeof bigInt);

// Reference Types
const array = [1, 2, 3, 4, 5];
const object = { key: 'value' };
const func = function() { return 'function'; };

console.log('\nArray:', array, typeof array); // typeof is 'object'
console.log('Object:', object, typeof object);
console.log('Function:', func, typeof func);

console.log('\n=== 3. TYPE CONVERSION ===\n');

// String Conversion
const num = 123;
const str = String(num);
console.log('Number to String:', str, typeof str);

// Number Conversion
const strNum = '456';
const converted = Number(strNum);
console.log('String to Number:', converted, typeof converted);

// Boolean Conversion
console.log('Boolean(""):', Boolean('')); // false
console.log('Boolean("text"):', Boolean('text')); // true
console.log('Boolean(0):', Boolean(0)); // false
console.log('Boolean(1):', Boolean(1)); // true

// Truthy and Falsy values
const falsyValues = [false, 0, '', null, undefined, NaN];
const truthyValues = [true, 1, 'text', [], {}, function(){}];
console.log('\nFalsy values:', falsyValues);
console.log('Truthy values:', truthyValues);

console.log('\n=== 4. OPERATORS ===\n');

// Arithmetic Operators
console.log('Addition: 5 + 3 =', 5 + 3);
console.log('Subtraction: 5 - 3 =', 5 - 3);
console.log('Multiplication: 5 * 3 =', 5 * 3);
console.log('Division: 5 / 3 =', 5 / 3);
console.log('Modulus: 5 % 3 =', 5 % 3);
console.log('Exponentiation: 5 ** 3 =', 5 ** 3);

// Increment/Decrement
let count = 5;
console.log('\nIncrement (count++):', count++); // 5 (post-increment)
console.log('Value after:', count); // 6
console.log('Increment (++count):', ++count); // 7 (pre-increment)

// Comparison Operators
console.log('\n== (loose equality): 5 == "5":', 5 == '5'); // true
console.log('=== (strict equality): 5 === "5":', 5 === '5'); // false
console.log('!= (loose inequality): 5 != "5":', 5 != '5'); // false
console.log('!== (strict inequality): 5 !== "5":', 5 !== '5'); // true
console.log('Greater than: 5 > 3:', 5 > 3);
console.log('Less than or equal: 5 <= 3:', 5 <= 3);

// Logical Operators
console.log('\nAND (&&): true && false:', true && false);
console.log('OR (||): true || false:', true || false);
console.log('NOT (!): !true:', !true);

// Nullish Coalescing Operator
const value1 = null;
const value2 = 'default';
console.log('\nNullish coalescing: null ?? "default":', value1 ?? value2);

// Optional Chaining
const user = { name: 'John', address: { city: 'Mumbai' } };
console.log('Optional chaining: user?.address?.city:', user?.address?.city);
console.log('Optional chaining: user?.phone?.number:', user?.phone?.number);

console.log('\n=== 5. STRING OPERATIONS ===\n');

const firstName = 'Omkar';
const lastName = 'Waghchaure';

// Concatenation
console.log('Concatenation:', firstName + ' ' + lastName);

// Template Literals
console.log(`Template literal: ${firstName} ${lastName}`);

// String Methods
console.log('Length:', firstName.length);
console.log('Uppercase:', firstName.toUpperCase());
console.log('Lowercase:', firstName.toLowerCase());
console.log('Includes:', firstName.includes('kar'));
console.log('Slice:', firstName.slice(0, 3));
console.log('Split:', 'a,b,c'.split(','));
console.log('Trim:', '  hello  '.trim());

console.log('\n=== 6. ARRAY BASICS ===\n');

const fruits = ['apple', 'banana', 'orange'];
console.log('Array:', fruits);
console.log('Length:', fruits.length);
console.log('First item:', fruits[0]);
console.log('Last item:', fruits[fruits.length - 1]);

// Array methods
fruits.push('mango'); // add to end
console.log('After push:', fruits);

fruits.pop(); // remove from end
console.log('After pop:', fruits);

fruits.unshift('grapes'); // add to beginning
console.log('After unshift:', fruits);

fruits.shift(); // remove from beginning
console.log('After shift:', fruits);

console.log('\n=== 7. OBJECT BASICS ===\n');

const car = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
  start: function() {
    return `${this.brand} ${this.model} is starting...`;
  }
};

console.log('Object:', car);
console.log('Access property (dot):', car.brand);
console.log('Access property (bracket):', car['model']);
console.log('Call method:', car.start());

// Adding properties
car.color = 'red';
console.log('After adding property:', car);

// Deleting properties
delete car.year;
console.log('After deleting property:', car);

console.log('\n=== 8. CONDITIONAL STATEMENTS ===\n');

const age = 18;

// if-else
if (age >= 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}

// Ternary operator
const status = age >= 18 ? 'Adult' : 'Minor';
console.log('Ternary result:', status);

// Switch statement
const day = 3;
switch (day) {
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  case 3:
    console.log('Wednesday');
    break;
  default:
    console.log('Other day');
}

console.log('\n=== 9. LOOPS ===\n');

// for loop
console.log('For loop:');
for (let i = 0; i < 3; i++) {
  console.log(`  Iteration ${i}`);
}

// while loop
console.log('\nWhile loop:');
let j = 0;
while (j < 3) {
  console.log(`  Iteration ${j}`);
  j++;
}

// for...of (iterate over values)
console.log('\nFor...of loop (arrays):');
for (const fruit of fruits) {
  console.log(`  ${fruit}`);
}

// for...in (iterate over keys)
console.log('\nFor...in loop (objects):');
for (const key in car) {
  console.log(`  ${key}: ${car[key]}`);
}

console.log('\n=== 10. SPREAD AND REST ===\n');

// Spread operator (...)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log('Spread in arrays:', combined);

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };
console.log('Spread in objects:', mergedObj);

// Rest operator (in function parameters)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log('Rest in functions: sum(1, 2, 3, 4):', sum(1, 2, 3, 4));

console.log('\n=== 11. DESTRUCTURING ===\n');

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log('Array destructuring:', { first, second, rest });

// Object destructuring
const { brand, model } = car;
console.log('Object destructuring:', { brand, model });

// With default values
const { color = 'black', engine = 'V6' } = car;
console.log('With defaults:', { color, engine });

console.log('\n✅ Basics completed! Run: npm run basics');
