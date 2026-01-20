/**
 * HASH TABLES - Data Structure
 * Key-value pairs with O(1) average lookup
 */

// ===== HASH TABLE IMPLEMENTATION =====

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    // Hash function
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

    // Set: O(1) average
    set(key, value) {
        const index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        // Check if key exists, update if so
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index][i][1] = value;
                return;
            }
        }

        // Add new key-value pair
        this.keyMap[index].push([key, value]);
    }

    // Get: O(1) average
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

    // Has: O(1) average
    has(key) {
        return this.get(key) !== undefined;
    }

    // Delete: O(1) average
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

    // Get all keys
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

    // Get all values
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

// ===== HASH SET IMPLEMENTATION =====

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

// ===== LRU CACHE =====

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

// ===== COMMON HASH TABLE PROBLEMS =====

// 1. Two Sum (Hash Map)
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

// 2. Group Anagrams
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

// 3. Valid Anagram
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

// 4. First Unique Character
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

// 5. Contains Duplicate
function containsDuplicate(nums) {
    const set = new Set();

    for (let num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }

    return false;
}

// 6. Contains Duplicate II (within k distance)
function containsNearbyDuplicate(nums, k) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
            return true;
        }
        map.set(nums[i], i);
    }

    return false;
}

// 7. Longest Consecutive Sequence
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

// 8. Subarray Sum Equals K
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

// 9. Top K Frequent Elements
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

// 10. Design HashMap
class MyHashMap {
    constructor() {
        this.size = 1000;
        this.map = new Array(this.size);
    }

    _hash(key) {
        return key % this.size;
    }

    put(key, value) {
        const index = this._hash(key);

        if (!this.map[index]) {
            this.map[index] = [];
        }

        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                this.map[index][i][1] = value;
                return;
            }
        }

        this.map[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);

        if (this.map[index]) {
            for (let [k, v] of this.map[index]) {
                if (k === key) return v;
            }
        }

        return -1;
    }

    remove(key) {
        const index = this._hash(key);

        if (this.map[index]) {
            for (let i = 0; i < this.map[index].length; i++) {
                if (this.map[index][i][0] === key) {
                    this.map[index].splice(i, 1);
                    return;
                }
            }
        }
    }
}

// 11. Design HashSet
class MyHashSet {
    constructor() {
        this.size = 1000;
        this.set = new Array(this.size);
    }

    _hash(key) {
        return key % this.size;
    }

    add(key) {
        const index = this._hash(key);

        if (!this.set[index]) {
            this.set[index] = [];
        }

        if (!this.set[index].includes(key)) {
            this.set[index].push(key);
        }
    }

    contains(key) {
        const index = this._hash(key);
        return this.set[index] && this.set[index].includes(key);
    }

    remove(key) {
        const index = this._hash(key);

        if (this.set[index]) {
            const keyIndex = this.set[index].indexOf(key);
            if (keyIndex !== -1) {
                this.set[index].splice(keyIndex, 1);
            }
        }
    }
}

// 12. Isomorphic Strings
function isIsomorphic(s, t) {
    if (s.length !== t.length) return false;

    const mapST = new Map();
    const mapTS = new Map();

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        if (mapST.has(charS) && mapST.get(charS) !== charT) {
            return false;
        }

        if (mapTS.has(charT) && mapTS.get(charT) !== charS) {
            return false;
        }

        mapST.set(charS, charT);
        mapTS.set(charT, charS);
    }

    return true;
}

// 13. Word Pattern
function wordPattern(pattern, s) {
    const words = s.split(' ');

    if (pattern.length !== words.length) return false;

    const mapPW = new Map();
    const mapWP = new Map();

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];

        if (mapPW.has(char) && mapPW.get(char) !== word) {
            return false;
        }

        if (mapWP.has(word) && mapWP.get(word) !== char) {
            return false;
        }

        mapPW.set(char, word);
        mapWP.set(word, char);
    }

    return true;
}

// ===== TEST CASES =====
console.log('\n===== Hash Table Tests =====\n');

// Hash Table
const ht = new HashTable();
ht.set('hello', 'world');
ht.set('foo', 'bar');
ht.set('baz', 'qux');

console.log('Get "hello":', ht.get('hello')); // world
console.log('Keys:', ht.keys()); // ['hello', 'foo', 'baz']
console.log('Values:', ht.values()); // ['world', 'bar', 'qux']

// LRU Cache
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log('\nLRU Get 1:', cache.get(1)); // 1
cache.put(3, 3); // Evicts key 2
console.log('LRU Get 2:', cache.get(2)); // -1

// Two Sum
console.log('\nTwo Sum:', twoSum([2, 7, 11, 15], 9)); // [0, 1]

// Group Anagrams
console.log('Group Anagrams:', groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

// Valid Anagram
console.log('Is Anagram:', isAnagram('anagram', 'nagaram')); // true

// Longest Consecutive
console.log('Longest Consecutive:', longestConsecutive([100, 4, 200, 1, 3, 2])); // 4

// Top K Frequent
console.log('Top K Frequent:', topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
