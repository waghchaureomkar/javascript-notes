/**
 * MEMOIZATION - Complete Implementation Guide
 *
 * This file contains working examples of:
 * 1. Basic memoization
 * 2. Memoized Fibonacci
 * 3. Memoized factorial
 * 4. LRU Cache
 * 5. Performance comparisons
 */

console.log('=== MEMOIZATION EXAMPLES ===\n');

// ============================================
// 1. BASIC MEMOIZATION IMPLEMENTATION
// ============================================

function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`  [Cache Hit] Key: ${key}`);
      return cache.get(key);
    }

    console.log(`  [Cache Miss] Computing for: ${key}`);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive computation
function expensiveAdd(a, b) {
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum = a + b;
  }
  return sum;
}

console.log('1. BASIC MEMOIZATION');
console.log('-------------------');
const memoizedAdd = memoize(expensiveAdd);

console.log('First call:');
console.log('Result:', memoizedAdd(5, 3));

console.log('\nSecond call (same arguments):');
console.log('Result:', memoizedAdd(5, 3));

console.log('\nThird call (different arguments):');
console.log('Result:', memoizedAdd(10, 20));
console.log();

// ============================================
// 2. ADVANCED MEMOIZATION WITH OPTIONS
// ============================================

function memoizeAdvanced(fn, options = {}) {
  const {
    maxSize = Infinity,
    ttl = Infinity,
    keyGenerator = (...args) => JSON.stringify(args)
  } = options;

  const cache = new Map();

  return function(...args) {
    const key = keyGenerator(...args);
    const cached = cache.get(key);

    // Check if cached and not expired
    if (cached) {
      if (ttl === Infinity || Date.now() - cached.timestamp < ttl) {
        return cached.value;
      }
      cache.delete(key); // Expired
    }

    const result = fn.apply(this, args);

    // Remove oldest if at max size
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });

    return result;
  };
}

console.log('2. ADVANCED MEMOIZATION');
console.log('----------------------');

const multiply = memoizeAdvanced(
  (a, b) => {
    console.log('  Computing:', a, '*', b);
    return a * b;
  },
  {
    maxSize: 3,
    ttl: 2000,
    keyGenerator: (a, b) => `${a}-${b}`
  }
);

console.log('Result:', multiply(2, 3));
console.log('Result:', multiply(2, 3)); // Cached
console.log('Result:', multiply(4, 5));
console.log('Result:', multiply(6, 7));
console.log('Result:', multiply(8, 9)); // This will evict oldest
console.log();

// ============================================
// 3. FIBONACCI WITHOUT MEMOIZATION
// ============================================

function fibonacciSlow(n) {
  if (n <= 1) return n;
  return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
}

console.log('3. FIBONACCI - WITHOUT MEMOIZATION');
console.log('----------------------------------');

console.time('Fibonacci(30) - No Memo');
const result1 = fibonacciSlow(30);
console.timeEnd('Fibonacci(30) - No Memo');
console.log('Result:', result1);
console.log();

// ============================================
// 4. FIBONACCI WITH MEMOIZATION (Closure)
// ============================================

function createMemoizedFibonacci() {
  const cache = {};

  return function fibonacci(n) {
    if (n in cache) {
      return cache[n];
    }

    if (n <= 1) {
      return n;
    }

    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return cache[n];
  };
}

console.log('4. FIBONACCI - WITH MEMOIZATION (Closure)');
console.log('----------------------------------------');

const fibonacciFast = createMemoizedFibonacci();

console.time('Fibonacci(30) - Memoized');
const result2 = fibonacciFast(30);
console.timeEnd('Fibonacci(30) - Memoized');
console.log('Result:', result2);

console.time('Fibonacci(40) - Memoized');
const result3 = fibonacciFast(40);
console.timeEnd('Fibonacci(40) - Memoized');
console.log('Result:', result3);
console.log();

// ============================================
// 5. FIBONACCI WITH GENERIC MEMOIZATION
// ============================================

console.log('5. FIBONACCI - GENERIC MEMOIZATION');
console.log('----------------------------------');

const genericFibonacci = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.time('Fibonacci(35) - Generic Memo');
const result4 = genericFibonacci(35);
console.timeEnd('Fibonacci(35) - Generic Memo');
console.log('Result:', result4);
console.log();

// ============================================
// 6. FACTORIAL WITH MEMOIZATION
// ============================================

function createMemoizedFactorial() {
  const cache = { 0: 1, 1: 1 };

  return function factorial(n) {
    if (n in cache) {
      return cache[n];
    }

    cache[n] = n * factorial(n - 1);
    return cache[n];
  };
}

console.log('6. FACTORIAL - WITH MEMOIZATION');
console.log('-------------------------------');

const factorial = createMemoizedFactorial();

console.log('factorial(5):', factorial(5));
console.log('factorial(10):', factorial(10));
console.log('factorial(15):', factorial(15));
console.log('factorial(20):', factorial(20));
console.log();

// ============================================
// 7. LRU CACHE IMPLEMENTATION (Map-based)
// ============================================

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // Move to end (most recent)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    // Delete if exists (to reinsert at end)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Add new entry
    this.cache.set(key, value);

    // Remove oldest if over capacity
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      console.log(`  [LRU] Evicting: ${firstKey}`);
      this.cache.delete(firstKey);
    }
  }

  display() {
    console.log('  Cache:', Array.from(this.cache.entries()));
  }
}

console.log('7. LRU CACHE (Map-based)');
console.log('------------------------');

const lru = new LRUCache(3);

console.log('put(1, "A")');
lru.put(1, 'A');
lru.display();

console.log('\nput(2, "B")');
lru.put(2, 'B');
lru.display();

console.log('\nput(3, "C")');
lru.put(3, 'C');
lru.display();

console.log('\nget(1):', lru.get(1)); // Makes 1 most recent
lru.display();

console.log('\nput(4, "D") - Will evict 2');
lru.put(4, 'D');
lru.display();

console.log('\nget(2):', lru.get(2)); // Returns -1 (evicted)
console.log();

// ============================================
// 8. LRU CACHE WITH DOUBLY LINKED LIST
// ============================================

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheOptimized {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();

    // Dummy head and tail
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key);
    this.remove(node);
    this.add(node); // Move to tail (most recent)

    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key));
    }

    const node = new Node(key, value);
    this.add(node);
    this.cache.set(key, node);

    if (this.cache.size > this.capacity) {
      const lru = this.head.next;
      this.remove(lru);
      this.cache.delete(lru.key);
    }
  }

  add(node) {
    // Add to tail (most recent)
    const prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }

  remove(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  toArray() {
    const result = [];
    let current = this.head.next;
    while (current !== this.tail) {
      result.push([current.key, current.value]);
      current = current.next;
    }
    return result;
  }
}

console.log('8. LRU CACHE (Doubly Linked List)');
console.log('---------------------------------');

const lruOptimized = new LRUCacheOptimized(3);

lruOptimized.put(1, 'One');
lruOptimized.put(2, 'Two');
lruOptimized.put(3, 'Three');
console.log('After adding 1,2,3:', lruOptimized.toArray());

console.log('get(2):', lruOptimized.get(2));
console.log('After get(2):', lruOptimized.toArray());

lruOptimized.put(4, 'Four');
console.log('After adding 4 (evicts 1):', lruOptimized.toArray());
console.log();

// ============================================
// 9. MEMOIZATION WITH LRU
// ============================================

function memoizeWithLRU(fn, capacity = 100) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      // Move to end (most recent)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    // Remove oldest if over capacity
    if (cache.size > capacity) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
}

console.log('9. MEMOIZATION WITH LRU');
console.log('-----------------------');

const expensiveCalc = memoizeWithLRU(
  (n) => {
    console.log(`  Computing for n=${n}`);
    return n * n * n;
  },
  3
);

console.log('Result:', expensiveCalc(1));
console.log('Result:', expensiveCalc(2));
console.log('Result:', expensiveCalc(3));
console.log('Result:', expensiveCalc(1)); // Cached
console.log('Result:', expensiveCalc(4)); // Evicts oldest
console.log('Result:', expensiveCalc(2)); // Recalculate (was evicted)
console.log();

// ============================================
// 10. MEMOIZATION WITH EXPIRY
// ============================================

function memoizeWithExpiry(fn, ttl = 5000) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      console.log('  [Cache] Valid cache hit');
      return cached.value;
    }

    if (cached) {
      console.log('  [Cache] Expired, recomputing');
    }

    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });

    return result;
  };
}

console.log('10. MEMOIZATION WITH EXPIRY');
console.log('---------------------------');

const timedFn = memoizeWithExpiry(
  (x) => {
    console.log('  Computing for x =', x);
    return x * 2;
  },
  2000 // 2 seconds TTL
);

console.log('Result:', timedFn(5));
console.log('Result:', timedFn(5)); // Cached

setTimeout(() => {
  console.log('\n[After 2.5 seconds]');
  console.log('Result:', timedFn(5)); // Expired, recompute
}, 2500);

// ============================================
// 11. ASYNC MEMOIZATION
// ============================================

function memoizeAsync(fn) {
  const cache = new Map();
  const pending = new Map();

  return async function(...args) {
    const key = JSON.stringify(args);

    // Return cached result
    if (cache.has(key)) {
      console.log('  [Async Cache] Hit');
      return cache.get(key);
    }

    // Return pending promise (dedupe concurrent requests)
    if (pending.has(key)) {
      console.log('  [Async Cache] Waiting for pending...');
      return pending.get(key);
    }

    console.log('  [Async Cache] Fetching...');
    const promise = fn.apply(this, args);
    pending.set(key, promise);

    try {
      const result = await promise;
      cache.set(key, result);
      return result;
    } finally {
      pending.delete(key);
    }
  };
}

// Simulated async function
const fetchData = memoizeAsync(async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data for ID: ${id}`);
    }, 1000);
  });
});

console.log('\n11. ASYNC MEMOIZATION');
console.log('---------------------');

(async () => {
  console.log('First call:');
  console.log(await fetchData(1));

  console.log('\nSecond call (cached):');
  console.log(await fetchData(1));

  console.log('\nDifferent argument:');
  console.log(await fetchData(2));
  console.log();

  // ============================================
  // 12. PERFORMANCE COMPARISON
  // ============================================

  console.log('12. PERFORMANCE COMPARISON');
  console.log('-------------------------');

  function performanceTest() {
    // Without memoization
    let calls1 = 0;
    function fib1(n) {
      calls1++;
      if (n <= 1) return n;
      return fib1(n - 1) + fib1(n - 2);
    }

    // With memoization
    let calls2 = 0;
    const cache = {};
    function fib2(n) {
      calls2++;
      if (n in cache) return cache[n];
      if (n <= 1) return n;
      return cache[n] = fib2(n - 1) + fib2(n - 2);
    }

    const n = 25;

    console.time('Without Memoization');
    const result1 = fib1(n);
    console.timeEnd('Without Memoization');
    console.log('Result:', result1);
    console.log('Function calls:', calls1.toLocaleString());

    console.log();

    console.time('With Memoization');
    const result2 = fib2(n);
    console.timeEnd('With Memoization');
    console.log('Result:', result2);
    console.log('Function calls:', calls2);

    console.log();
    console.log('Speed improvement:', Math.round(calls1 / calls2) + 'x faster');
    console.log('Calls reduced by:', Math.round((1 - calls2/calls1) * 100) + '%');
  }

  performanceTest();

  // ============================================
  // 13. GRID TRAVELER PROBLEM
  // ============================================

  console.log('\n13. GRID TRAVELER PROBLEM');
  console.log('-------------------------');

  function createGridTraveler() {
    const cache = {};

    return function gridTraveler(m, n) {
      const key = `${m},${n}`;

      if (key in cache) return cache[key];
      if (m === 1 && n === 1) return 1;
      if (m === 0 || n === 0) return 0;

      cache[key] = gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
      return cache[key];
    };
  }

  const gridTraveler = createGridTraveler();

  console.log('gridTraveler(1, 1):', gridTraveler(1, 1)); // 1
  console.log('gridTraveler(2, 3):', gridTraveler(2, 3)); // 3
  console.log('gridTraveler(3, 3):', gridTraveler(3, 3)); // 6
  console.log('gridTraveler(18, 18):', gridTraveler(18, 18));

  // ============================================
  // 14. MEMOIZATION WITH CUSTOM CACHE
  // ============================================

  console.log('\n14. CUSTOM CACHE CONTROL');
  console.log('------------------------');

  function memoizeWithControl(fn) {
    const cache = new Map();

    const memoized = function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);

      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };

    // Expose cache control methods
    memoized.clear = () => cache.clear();
    memoized.delete = (...args) => cache.delete(JSON.stringify(args));
    memoized.has = (...args) => cache.has(JSON.stringify(args));
    memoized.size = () => cache.size;

    return memoized;
  }

  const controlledFn = memoizeWithControl((x, y) => x + y);

  console.log('Result:', controlledFn(1, 2));
  console.log('Result:', controlledFn(3, 4));
  console.log('Cache size:', controlledFn.size());

  console.log('Has (1,2)?', controlledFn.has(1, 2));
  controlledFn.delete(1, 2);
  console.log('After delete, has (1,2)?', controlledFn.has(1, 2));

  controlledFn.clear();
  console.log('After clear, cache size:', controlledFn.size());

  console.log('\n=== ALL EXAMPLES COMPLETED ===');
})();
