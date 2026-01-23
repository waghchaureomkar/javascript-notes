# Arrays - Complete Guide

> **Foundation of Data Structures**
> Linear collection of elements with O(1) access time

---

## Table of Contents

1. [Array Basics](#array-basics)
2. [Time Complexity](#time-complexity)
3. [Common Operations](#common-operations)
4. [Two Pointers Technique](#two-pointers-technique)
5. [Sliding Window](#sliding-window)
6. [Prefix Sum](#prefix-sum)
7. [Top Interview Problems](#top-interview-problems)
8. [Practice Problems](#practice-problems)

---

## Array Basics

### What is an Array?

An **ordered collection** of elements stored at contiguous memory locations.

```
Index:   0    1    2    3    4
Array: [10] [20] [30] [40] [50]
         ↑
    arr[0] = 10
```

### Creating Arrays

```javascript
// Literal
const arr1 = [1, 2, 3, 4, 5];

// Constructor
const arr2 = new Array(5); // [empty × 5]
const arr3 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of()
const arr4 = Array.of(7); // [7] (not [empty × 7])

// Array.from()
const arr5 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr6 = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

---

## Time Complexity

| Operation | Time | Notes |
|-----------|------|-------|
| Access | O(1) | Direct index access |
| Search | O(n) | Linear search |
| Insert at end | O(1) | push() |
| Insert at start | O(n) | unshift() shifts all |
| Insert at middle | O(n) | splice() shifts elements |
| Delete from end | O(1) | pop() |
| Delete from start | O(n) | shift() shifts all |
| Delete from middle | O(n) | splice() shifts elements |

---

## Common Operations

### Access

```javascript
const arr = [10, 20, 30, 40, 50];

// By index
console.log(arr[0]); // 10
console.log(arr[2]); // 30

// First element
console.log(arr[0]);

// Last element
console.log(arr[arr.length - 1]); // 50
```

### Insert

```javascript
const arr = [1, 2, 3];

// At end - O(1)
arr.push(4); // [1, 2, 3, 4]

// At start - O(n)
arr.unshift(0); // [0, 1, 2, 3, 4]

// At position - O(n)
arr.splice(2, 0, 1.5); // [0, 1, 1.5, 2, 3, 4]
//           ↑  ↑   ↑
//        index del add
```

### Delete

```javascript
const arr = [1, 2, 3, 4, 5];

// From end - O(1)
arr.pop(); // [1, 2, 3, 4]

// From start - O(n)
arr.shift(); // [2, 3, 4]

// From position - O(n)
arr.splice(1, 1); // [2, 4] (delete 1 element at index 1)
```

### Search

```javascript
const arr = [10, 20, 30, 40, 50];

// Find index
console.log(arr.indexOf(30)); // 2
console.log(arr.indexOf(100)); // -1 (not found)

// Check existence
console.log(arr.includes(30)); // true

// Find element
console.log(arr.find(x => x > 25)); // 30

// Find index with condition
console.log(arr.findIndex(x => x > 25)); // 2
```

---

## Two Pointers Technique

### Pattern 1: Opposite Direction

**Use when:** Array is sorted or you need to find pairs.

```javascript
// Two Sum (Sorted Array)
function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [];
}

// Example
console.log(twoSum([1, 2, 3, 4, 6], 6)); // [1, 3] (2 + 4 = 6)
```

### Pattern 2: Same Direction

**Use when:** Modifying array in-place.

```javascript
// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let i = 0; // Slow pointer

    for (let j = 1; j < nums.length; j++) { // Fast pointer
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
}

// Example
const arr = [1, 1, 2, 2, 3, 4, 4];
console.log(removeDuplicates(arr)); // 4
console.log(arr.slice(0, 4)); // [1, 2, 3, 4]
```

### Pattern 3: Move Zeros

```javascript
function moveZeroes(nums) {
    let nonZeroIndex = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
            nonZeroIndex++;
        }
    }

    return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

---

## Sliding Window

### Fixed Size Window

```javascript
// Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)
```

### Variable Size Window

```javascript
// Longest Subarray with Sum ≤ K
function longestSubarray(arr, k) {
    let left = 0;
    let sum = 0;
    let maxLen = 0;

    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];

        while (sum > k) {
            sum -= arr[left];
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(longestSubarray([1, 2, 3, 4, 5], 8)); // 3
```

---

## Prefix Sum

### Basic Prefix Sum

```javascript
function prefixSum(arr) {
    const prefix = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    return prefix;
}

const arr = [1, 2, 3, 4, 5];
console.log(prefixSum(arr)); // [1, 3, 6, 10, 15]
```

### Range Sum Query

```javascript
class RangeSum {
    constructor(arr) {
        this.prefix = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            this.prefix[i] = this.prefix[i - 1] + arr[i];
        }
    }

    query(left, right) {
        if (left === 0) return this.prefix[right];
        return this.prefix[right] - this.prefix[left - 1];
    }
}

const rs = new RangeSum([1, 2, 3, 4, 5]);
console.log(rs.query(1, 3)); // 9 (2+3+4)
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

### 2. Maximum Subarray (Kadane's Algorithm)

```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}
```

**Time:** O(n) | **Space:** O(1)

### 3. Best Time to Buy and Sell Stock

```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
}
```

**Time:** O(n) | **Space:** O(1)

### 4. Product of Array Except Self

```javascript
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);

    // Left products
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}
```

**Time:** O(n) | **Space:** O(1) (output array doesn't count)

### 5. Container With Most Water

```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * minHeight);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}
```

**Time:** O(n) | **Space:** O(1)

---

## Practice Problems

### Easy
1. Find Missing Number
2. Contains Duplicate
3. Rotate Array
4. Merge Sorted Array
5. Plus One

### Medium
6. 3Sum
7. Subarray Sum Equals K
8. Sort Colors
9. Next Permutation
10. Spiral Matrix

### Hard
11. Trapping Rain Water
12. Median of Two Sorted Arrays
13. First Missing Positive
14. Longest Consecutive Sequence
15. Sliding Window Maximum

---

## Interview Tips

### Common Patterns

1. **Two Pointers**: Sorted array, find pairs
2. **Sliding Window**: Subarray problems
3. **Prefix Sum**: Range queries
4. **Hash Map**: Fast lookup
5. **Kadane's Algorithm**: Maximum subarray

### Questions to Ask

- Is array sorted?
- Can it be modified in-place?
- Are there duplicates?
- What's the range of values?
- Space constraints?

### Edge Cases

```javascript
// Always test:
- Empty array: []
- Single element: [1]
- All same: [5, 5, 5]
- All negative: [-1, -2, -3]
- Mixed: [-1, 0, 1]
```

---

## Complexity Cheat Sheet

```
Access:     O(1)
Search:     O(n)
Insert:     O(n) average
Delete:     O(n) average
Push:       O(1)
Pop:        O(1)
Unshift:    O(n)
Shift:      O(n)
```

---

## Quick Reference

```javascript
// Creation
const arr = [1, 2, 3];

// Access
arr[0]          // First
arr[arr.length-1]  // Last

// Modify
arr.push(4)     // Add end
arr.pop()       // Remove end
arr.unshift(0)  // Add start
arr.shift()     // Remove start

// Search
arr.indexOf(2)  // Find index
arr.includes(2) // Check exists
arr.find(x => x > 1)  // Find element

// Transform
arr.map(x => x * 2)
arr.filter(x => x > 1)
arr.reduce((sum, x) => sum + x, 0)

// Two Pointers
let left = 0, right = arr.length - 1;

// Sliding Window
for (let right = 0; right < arr.length; right++) {
    // Add arr[right] to window
    while (condition) {
        // Shrink window from left
    }
}
```

---

**Master arrays and you'll ace 50% of coding interviews!** 🚀
