# Hash Tables - Complete Guide

> **Fast Key-Value Storage**
> O(1) average-case lookup, insert, and delete

---

## Table of Contents

1. [Hash Table Basics](#hash-table-basics)
2. [Hash Functions](#hash-functions)
3. [Collision Handling](#collision-handling)
4. [Implementation](#implementation)
5. [Map vs Object](#map-vs-object)
6. [Top Interview Problems](#top-interview-problems)
7. [Practice Problems](#practice-problems)

---

## Hash Table Basics

### What is a Hash Table?

A data structure that maps **keys to values** using a **hash function**.

```
Key → Hash Function → Index → Value

"john" → hash("john") → 5 → { name: "John", age: 25 }
```

**Advantages:**
- ✅ O(1) average lookup
- ✅ O(1) average insertion
- ✅ O(1) average deletion
- ✅ Fast key existence check

**Disadvantages:**
- ❌ No ordering
- ❌ O(n) worst case (with collisions)
- ❌ Extra space for hash table

**Real-world examples:**
- Databases (indexing)
- Caching (memoization)
- Symbol tables (compilers)
- Duplicate detection

---

## Hash Functions

### What is a Hash Function?

Converts a **key** into an **index** in the array.

**Good hash function properties:**
1. **Deterministic**: Same key → same hash
2. **Fast**: O(1) computation
3. **Uniform distribution**: Minimize collisions
4. **Avoid patterns**: Random-looking output

### Simple Hash Function

```javascript
function hash(key, arraySize) {
    let total = 0;
    const PRIME = 31; // Use prime for better distribution

    for (let i = 0; i < Math.min(key.length, 100); i++) {
        const char = key[i];
        const value = char.charCodeAt(0) - 96; // a=1, b=2, etc.
        total = (total * PRIME + value) % arraySize;
    }

    return total;
}

console.log(hash("hello", 53)); // 15
console.log(hash("world", 53)); // 42
```

### Why Use Prime Numbers?

- Reduces collisions
- Better distribution
- Mathematical properties

---

## Collision Handling

### What is a Collision?

When two keys hash to the **same index**.

```
hash("john") = 5
hash("jane") = 5  ← Collision!
```

### 1. Separate Chaining

Store multiple key-value pairs at same index using **linked list** or **array**.

```
Index 5: [["john", 25], ["jane", 30]]
```

```javascript
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        const PRIME = 31;

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * PRIME + value) % this.keyMap.length;
        }

        return total;
    }

    set(key, value) {
        const index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        // Update if key exists
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index][i][1] = value;
                return;
            }
        }

        // Add new key-value pair
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }

        return undefined;
    }

    delete(key) {
        const index = this._hash(key);

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    return true;
                }
            }
        }

        return false;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    keys() {
        const keysArr = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    keysArr.push(this.keyMap[i][j][0]);
                }
            }
        }

        return keysArr;
    }

    values() {
        const valuesArr = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }

        return valuesArr;
    }
}
```

### 2. Linear Probing (Open Addressing)

If index is taken, move to **next available** slot.

```
Index 5: occupied
Index 6: occupied
Index 7: store here ✓
```

```javascript
class HashTableLinearProbing {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        // Same as before
    }

    set(key, value) {
        let index = this._hash(key);

        // Linear probing
        while (this.keyMap[index] !== undefined) {
            if (this.keyMap[index][0] === key) {
                this.keyMap[index][1] = value;
                return;
            }
            index = (index + 1) % this.keyMap.length;
        }

        this.keyMap[index] = [key, value];
    }

    get(key) {
        let index = this._hash(key);

        while (this.keyMap[index] !== undefined) {
            if (this.keyMap[index][0] === key) {
                return this.keyMap[index][1];
            }
            index = (index + 1) % this.keyMap.length;
        }

        return undefined;
    }
}
```

**Comparison:**

| Method | Pros | Cons |
|--------|------|------|
| Separate Chaining | No limit on size | Extra space for lists |
| Linear Probing | Cache-friendly | Clustering issues |

---

## Implementation

### Hash Set (Unique Values)

```javascript
class HashSet {
    constructor(size = 53) {
        this.table = new Array(size);
    }

    _hash(key) {
        let total = 0;
        const PRIME = 31;

        for (let i = 0; i < Math.min(key.toString().length, 100); i++) {
            const char = key.toString()[i];
            const value = char.charCodeAt(0);
            total = (total * PRIME + value) % this.table.length;
        }

        return total;
    }

    add(key) {
        const index = this._hash(key);

        if (!this.table[index]) {
            this.table[index] = [];
        }

        if (!this.table[index].includes(key)) {
            this.table[index].push(key);
        }
    }

    has(key) {
        const index = this._hash(key);

        if (this.table[index]) {
            return this.table[index].includes(key);
        }

        return false;
    }

    remove(key) {
        const index = this._hash(key);

        if (this.table[index]) {
            const keyIndex = this.table[index].indexOf(key);
            if (keyIndex !== -1) {
                this.table[index].splice(keyIndex, 1);
                return true;
            }
        }

        return false;
    }
}
```

---

## Map vs Object

### JavaScript Object

```javascript
const obj = {
    name: "John",
    age: 25
};

// Access
obj.name;
obj["name"];

// Add
obj.email = "john@example.com";

// Delete
delete obj.age;

// Keys
Object.keys(obj);

// Values
Object.values(obj);
```

**Limitations:**
- Keys must be strings or symbols
- No guaranteed order (before ES6)
- No size property

### JavaScript Map

```javascript
const map = new Map();

// Set
map.set("name", "John");
map.set("age", 25);
map.set(1, "number key");
map.set(true, "boolean key");

// Get
map.get("name"); // "John"

// Has
map.has("age"); // true

// Delete
map.delete("age");

// Size
map.size; // 2

// Clear all
map.clear();

// Iterate
map.forEach((value, key) => {
    console.log(key, value);
});

// Keys
[...map.keys()]; // ["name", 1, true]

// Values
[...map.values()]; // ["John", "number key", "boolean key"]

// Entries
[...map.entries()]; // [["name", "John"], ...]
```

**Advantages of Map:**
- ✅ Any type as key
- ✅ Maintains insertion order
- ✅ Has size property
- ✅ Better performance for frequent additions/deletions

### JavaScript Set

```javascript
const set = new Set();

// Add
set.add(1);
set.add(2);
set.add(2); // Duplicate ignored

// Has
set.has(1); // true

// Delete
set.delete(2);

// Size
set.size; // 1

// Clear
set.clear();

// Convert array to Set (remove duplicates)
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)]; // [1, 2, 3, 4]

// Iterate
set.forEach(value => console.log(value));
```

---

## Top Interview Problems

### 1. Two Sum

```javascript
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [];
}
```

**Time:** O(n) | **Space:** O(n)

### 2. Group Anagrams

```javascript
function groupAnagrams(strs) {
    const map = new Map();

    for (let str of strs) {
        const sorted = str.split('').sort().join('');

        if (!map.has(sorted)) {
            map.set(sorted, []);
        }

        map.get(sorted).push(str);
    }

    return Array.from(map.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

**Time:** O(n × k log k) | **Space:** O(n × k)

### 3. Longest Consecutive Sequence

```javascript
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longest = 0;

    for (let num of numSet) {
        // Only check if it's the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longest = Math.max(longest, currentStreak);
        }
    }

    return longest;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
```

**Time:** O(n) | **Space:** O(n)

### 4. Valid Anagram

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = new Map();

    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    for (let char of t) {
        if (!count.has(char)) return false;
        count.set(char, count.get(char) - 1);
        if (count.get(char) < 0) return false;
    }

    return true;
}
```

**Time:** O(n) | **Space:** O(1) (26 letters max)

### 5. Subarray Sum Equals K

```javascript
function subarraySum(nums, k) {
    const map = new Map();
    map.set(0, 1);

    let sum = 0;
    let count = 0;

    for (let num of nums) {
        sum += num;

        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }

        map.set(sum, (map.get(sum) || 0) + 1);
    }

    return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2
```

**Time:** O(n) | **Space:** O(n)

### 6. LRU Cache

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const value = this.cache.get(key);
        // Move to end (most recently used)
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
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}
```

**Time:** O(1) for both operations

### 7. First Unique Character

```javascript
function firstUniqChar(s) {
    const count = new Map();

    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
        if (count.get(s[i]) === 1) {
            return i;
        }
    }

    return -1;
}
```

**Time:** O(n) | **Space:** O(1)

### 8. Top K Frequent Elements

```javascript
function topKFrequent(nums, k) {
    const freqMap = new Map();

    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Bucket sort by frequency
    const bucket = Array(nums.length + 1).fill(null).map(() => []);

    for (let [num, freq] of freqMap) {
        bucket[freq].push(num);
    }

    const result = [];

    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
        if (bucket[i].length > 0) {
            result.push(...bucket[i]);
        }
    }

    return result.slice(0, k);
}
```

**Time:** O(n) | **Space:** O(n)

---

## Practice Problems

### Easy
1. Two Sum
2. Valid Anagram
3. Contains Duplicate
4. First Unique Character
5. Intersection of Two Arrays

### Medium
6. Group Anagrams
7. Top K Frequent Elements
8. Subarray Sum Equals K
9. Longest Consecutive Sequence
10. LRU Cache

### Hard
11. Substring with Concatenation of All Words
12. Longest Substring with At Most K Distinct Characters
13. Minimum Window Substring
14. Max Points on a Line
15. Design In-Memory File System

---

## Interview Tips

### When to Use Hash Table?

✅ **Fast lookup** - Check if element exists
✅ **Counting** - Frequency of elements
✅ **Grouping** - Group by key
✅ **Caching** - Store computed results
✅ **Deduplication** - Remove duplicates

### Common Patterns

1. **Frequency Counter**: Count occurrences
2. **Complement Pattern**: Two Sum variants
3. **Prefix Sum**: Subarray sum problems
4. **Grouping**: Anagrams, similar strings
5. **Caching**: Memoization, LRU

### Map vs Set vs Object

| Need | Use |
|------|-----|
| Key-value pairs | Map |
| Unique values | Set |
| Simple object | Object |
| Any key type | Map |
| Fast lookup | All |

### Edge Cases

```javascript
// Always test:
- Empty input
- Single element
- All same elements
- No solution exists
- Multiple valid solutions
```

---

## Complexity Cheat Sheet

```
Average Case:
Get:     O(1)
Set:     O(1)
Delete:  O(1)
Has:     O(1)
Space:   O(n)

Worst Case (many collisions):
Get:     O(n)
Set:     O(n)
Delete:  O(n)
```

---

## Quick Reference

```javascript
// Map
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.size;
map.clear();

// Set
const set = new Set();
set.add(value);
set.has(value);
set.delete(value);
set.size;
set.clear();

// Object
const obj = {};
obj[key] = value;
obj[key];
delete obj[key];
Object.keys(obj);

// Two Sum Pattern
const map = new Map();
for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
        return [map.get(complement), i];
    }
    map.set(arr[i], i);
}

// Frequency Counter
const freq = new Map();
for (let item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
}
```

---

**Hash tables are your best friend for fast lookups!** 🔑
