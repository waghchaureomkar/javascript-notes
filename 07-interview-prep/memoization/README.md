# Memoization in JavaScript

## Table of Contents
1. [What is Memoization?](#what-is-memoization)
2. [How Memoization Works](#how-memoization-works)
3. [Implementation from Scratch](#implementation-from-scratch)
4. [Memoizing Recursive Functions](#memoizing-recursive-functions)
5. [LRU Cache Implementation](#lru-cache-implementation)
6. [Trade-offs](#trade-offs)
7. [Real-world Use Cases](#real-world-use-cases)
8. [Interview Questions](#interview-questions)

## What is Memoization?

**Memoization** is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again. It's a form of caching specifically for function results.

### Key Characteristics:
- **Pure Functions**: Works best with pure functions (same input always produces same output)
- **Time-Space Tradeoff**: Trades memory for computation speed
- **Automatic Caching**: Results are cached automatically on first computation
- **Dynamic Programming**: Core technique in many DP algorithms

### When to Use Memoization:
- Recursive calculations (Fibonacci, factorial)
- Expensive computations with repeated inputs
- API calls with same parameters
- Complex mathematical calculations
- Tree/graph traversals with overlapping subproblems

## How Memoization Works

```
First Call: fn(5)
├─> Compute result
├─> Store in cache: { 5: result }
└─> Return result

Second Call: fn(5)
├─> Check cache: found!
└─> Return cached result (no computation)
```

### Basic Flow:
1. Function is called with arguments
2. Create a unique key from arguments
3. Check if result exists in cache
4. If exists: return cached result
5. If not: compute, cache, and return result

## Implementation from Scratch

### Simple Memoization Function

```javascript
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log('Fetching from cache:', key);
      return cache[key];
    }

    console.log('Computing result for:', key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

### Advanced Memoization with Custom Key Generator

```javascript
function memoizeAdvanced(fn, keyGenerator) {
  const cache = new Map();

  return function(...args) {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage with custom key
const add = memoizeAdvanced(
  (a, b) => a + b,
  (a, b) => `${a}-${b}` // Custom key generator
);
```

### Memoization with Expiry

```javascript
function memoizeWithExpiry(fn, ttl = 5000) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });

    return result;
  };
}
```

## Memoizing Recursive Functions

### Fibonacci with Memoization

**Without Memoization** - O(2^n):
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// fibonacci(40) takes several seconds!
```

**With Memoization** - O(n):
```javascript
function fibonacciMemo() {
  const cache = {};

  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fibonacci = fibonacciMemo();
// fibonacci(40) returns instantly!
```

### Factorial with Memoization

```javascript
function factorialMemo() {
  const cache = { 0: 1, 1: 1 };

  return function factorial(n) {
    if (n in cache) return cache[n];
    cache[n] = n * factorial(n - 1);
    return cache[n];
  };
}

const factorial = factorialMemo();
```

### Grid Traveler Problem

```javascript
function gridTravelerMemo() {
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
```

## LRU Cache Implementation

**LRU (Least Recently Used)** cache removes the least recently used items when capacity is reached.

### Simple LRU Cache

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

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
      this.cache.delete(firstKey);
    }
  }
}
```

### LRU Cache with Doubly Linked List

```javascript
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
    this.head = new Node(0, 0); // Dummy head
    this.tail = new Node(0, 0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    this.remove(node);
    this.add(node);

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
}
```

### Memoization with LRU

```javascript
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
```

## Trade-offs

### Memory vs Speed

| Aspect | Without Memoization | With Memoization |
|--------|-------------------|------------------|
| **Time Complexity** | Can be exponential (e.g., O(2^n)) | Usually O(n) or better |
| **Space Complexity** | O(call stack depth) | O(unique inputs) |
| **Memory Usage** | Low | High (stores results) |
| **Speed** | Slow for repeated inputs | Fast for repeated inputs |

### Pros of Memoization

1. **Dramatic Speed Improvements**: Exponential to linear time
2. **Automatic**: Once set up, works automatically
3. **No Code Changes**: Original function logic unchanged
4. **Easy to Implement**: Wrapper function pattern

### Cons of Memoization

1. **Memory Usage**: Can consume significant memory
2. **Cache Management**: Need to handle cache size
3. **Pure Functions Only**: Doesn't work with side effects
4. **Stale Data**: Cached results may become outdated
5. **Serialization Overhead**: JSON.stringify can be slow

### When NOT to Use Memoization

- Functions with side effects
- Functions with different outputs for same inputs
- Functions called with unique inputs each time
- Functions with large object arguments (serialization cost)
- When memory is constrained

## Real-world Use Cases

### 1. API Call Memoization

```javascript
function memoizeAPI(apiFn, ttl = 60000) {
  const cache = new Map();

  return async function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    const data = await apiFn(...args);
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  };
}

// Usage
const fetchUser = memoizeAPI(async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}, 300000); // 5 minutes
```

### 2. Expensive Calculations

```javascript
const expensiveOperation = memoize((data) => {
  // Complex data transformation
  return data
    .filter(item => item.active)
    .map(item => processItem(item))
    .reduce((acc, item) => acc + item.value, 0);
});
```

### 3. React Component Memoization

```javascript
// useMemo hook
const MemoizedComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  return <div>{processedData}</div>;
};

// React.memo
const MemoizedChild = React.memo(({ value }) => {
  return <div>{value}</div>;
});
```

### 4. Dynamic Programming Problems

```javascript
// Coin change problem
function coinChangeMemo(coins, amount) {
  const cache = {};

  function dp(remaining) {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    if (remaining in cache) return cache[remaining];

    let min = Infinity;
    for (const coin of coins) {
      min = Math.min(min, dp(remaining - coin) + 1);
    }

    cache[remaining] = min;
    return min;
  }

  return dp(amount);
}
```

### 5. Lodash Memoize

```javascript
// Using lodash
import _ from 'lodash';

const expensiveFn = _.memoize((n) => {
  // Expensive computation
  return n * n;
});

// Custom resolver
const complexMemoize = _.memoize(
  (obj) => obj.id,
  (obj) => obj.id // Key resolver
);
```

## Interview Questions

### Question 1: Implement Basic Memoization

**Question**: Implement a memoize function that works with any number of arguments.

```javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Test
const add = memoize((a, b) => a + b);
console.log(add(1, 2)); // Computes
console.log(add(1, 2)); // Returns from cache
```

### Question 2: Memoize Fibonacci

**Question**: Optimize the Fibonacci function using memoization.

```javascript
function fibonacci() {
  const cache = {};

  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

// Time complexity: O(n)
// Space complexity: O(n)
```

### Question 3: LRU Cache

**Question**: Implement an LRU cache with get and put operations in O(1) time.

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}
```

### Question 4: Memoization with Expiry

**Question**: Implement memoization that invalidates cache after a certain time.

```javascript
function memoizeWithExpiry(fn, ttl = 5000) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });

    return result;
  };
}
```

### Question 5: Memoization Pitfalls

**Question**: What are the limitations of this memoization implementation?

```javascript
function memoize(fn) {
  const cache = {};
  return function(x) {
    if (x in cache) return cache[x];
    return cache[x] = fn(x);
  };
}
```

**Issues**:
1. Only works with single argument
2. Uses object (limited key types)
3. No cache size limit (memory leak)
4. No cache invalidation
5. Doesn't handle `this` context

### Question 6: Compare Time Complexity

**Question**: Compare time complexity of Fibonacci with and without memoization.

**Without Memoization**: O(2^n)
- Each call makes 2 recursive calls
- Creates exponential call tree

**With Memoization**: O(n)
- Each unique value computed once
- Subsequent lookups are O(1)

### Question 7: When Not to Memoize?

**Question**: List scenarios where memoization is NOT appropriate.

**Answer**:
1. Functions with side effects
2. Functions with different results for same inputs
3. Rarely called with same inputs
4. Memory-constrained environments
5. Arguments are large objects (serialization overhead)
6. Real-time data requirements

### Question 8: Implement Memoized Async Function

**Question**: Create a memoization wrapper for async functions.

```javascript
function memoizeAsync(fn) {
  const cache = new Map();
  const pending = new Map();

  return async function(...args) {
    const key = JSON.stringify(args);

    // Return cached result
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Return pending promise
    if (pending.has(key)) {
      return pending.get(key);
    }

    // Create new promise
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
```

### Question 9: Memoization vs Tabulation

**Question**: Explain the difference between memoization and tabulation.

**Memoization (Top-Down)**:
- Recursive approach
- Caches results as needed
- Computes only required subproblems
- Uses recursion + cache

**Tabulation (Bottom-Up)**:
- Iterative approach
- Fills table systematically
- Computes all subproblems
- Uses array/table

```javascript
// Memoization
function fibMemo(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n <= 1) return n;
  return cache[n] = fibMemo(n-1, cache) + fibMemo(n-2, cache);
}

// Tabulation
function fibTab(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}
```

### Question 10: Cache Invalidation Strategy

**Question**: Implement a memoization function with manual cache clearing.

```javascript
function memoizeWithClear(fn) {
  const cache = new Map();

  const memoized = function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  memoized.clear = () => cache.clear();
  memoized.delete = (...args) => cache.delete(JSON.stringify(args));
  memoized.has = (...args) => cache.has(JSON.stringify(args));

  return memoized;
}
```

## Summary

Memoization is a powerful optimization technique that:
- Trades memory for speed
- Works best with pure functions
- Essential for dynamic programming
- Requires careful consideration of trade-offs
- Common in interview questions

Master these concepts for technical interviews!
