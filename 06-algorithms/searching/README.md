# Searching Algorithms - Complete Guide

> **Find Elements Efficiently**
> Linear search to binary search and beyond

---

## Table of Contents

1. [Search Basics](#search-basics)
2. [Linear Search](#linear-search)
3. [Binary Search](#binary-search)
4. [Binary Search Variations](#binary-search-variations)
5. [Advanced Search](#advanced-search)
6. [Top Interview Problems](#top-interview-problems)
7. [Practice Problems](#practice-problems)

---

## Search Basics

### Types of Search

1. **Linear Search**: O(n) - Unsorted data
2. **Binary Search**: O(log n) - Sorted data
3. **Jump Search**: O(√n) - Sorted data
4. **Interpolation Search**: O(log log n) - Uniformly distributed
5. **Exponential Search**: O(log n) - Unbounded arrays

---

## Linear Search

### Basic Linear Search

Check each element sequentially.

```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
```

**Time:** O(n) | **Space:** O(1)

**When to use:**
- Unsorted data
- Small datasets
- Single search operation

---

## Binary Search

### Prerequisites

- Array must be **sorted**
- Random access (arrays, not linked lists)

### Iterative Binary Search

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

**Time:** O(log n) | **Space:** O(1)

### Recursive Binary Search

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
```

**Time:** O(log n) | **Space:** O(log n) - recursion stack

### Binary Search Template

```javascript
function binarySearchTemplate(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (condition) {
            return mid; // or store result
        } else if (shouldGoLeft) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1; // or left/right based on problem
}
```

---

## Binary Search Variations

### 1. Find First Occurrence

```javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}
```

**Use:** Find leftmost occurrence of duplicate elements

### 2. Find Last Occurrence

```javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}
```

### 3. Find Range

```javascript
function searchRange(nums, target) {
    return [
        findFirst(nums, target),
        findLast(nums, target)
    ];
}
```

**Time:** O(log n) | **Space:** O(1)

### 4. Search in Rotated Sorted Array

```javascript
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}
```

**Time:** O(log n) | **Space:** O(1)

### 5. Find Minimum in Rotated Sorted Array

```javascript
function findMin(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return nums[left];
}
```

**Time:** O(log n) | **Space:** O(1)

### 6. Find Peak Element

```javascript
function findPeakElement(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}
```

**Time:** O(log n) | **Space:** O(1)

### 7. Search 2D Matrix

```javascript
function searchMatrix(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;

    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / n)][mid % n];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}
```

**Time:** O(log(m × n)) | **Space:** O(1)

---

## Advanced Search

### Jump Search

Jump ahead by fixed steps, then linear search.

```javascript
function jumpSearch(arr, target) {
    const n = arr.length;
    const jump = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Finding block
    while (arr[Math.min(jump, n) - 1] < target) {
        prev = jump;
        jump += Math.floor(Math.sqrt(n));

        if (prev >= n) return -1;
    }

    // Linear search in block
    while (arr[prev] < target) {
        prev++;

        if (prev === Math.min(jump, n)) {
            return -1;
        }
    }

    if (arr[prev] === target) return prev;

    return -1;
}
```

**Time:** O(√n) | **Space:** O(1)

**When to use:** Sorted arrays where jumping is cheaper than comparison

### Interpolation Search

Use value to estimate position (like phone book).

```javascript
function interpolationSearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right && target >= arr[left] && target <= arr[right]) {
        if (left === right) {
            if (arr[left] === target) return left;
            return -1;
        }

        // Interpolation formula
        const pos = left + Math.floor(
            ((target - arr[left]) * (right - left)) /
            (arr[right] - arr[left])
        );

        if (arr[pos] === target) {
            return pos;
        }

        if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }

    return -1;
}
```

**Time:** O(log log n) average, O(n) worst | **Space:** O(1)

**When to use:** Uniformly distributed sorted data

### Exponential Search

Find range, then binary search.

```javascript
function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;

    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i *= 2;
    }

    return binarySearch(
        arr.slice(i / 2, Math.min(i, arr.length)),
        target
    ) + i / 2;
}
```

**Time:** O(log n) | **Space:** O(1)

**When to use:** Unbounded/infinite arrays

### Ternary Search

Divide into 3 parts (for unimodal functions).

```javascript
function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;

    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;

    if (target < arr[mid1]) {
        return ternarySearch(arr, target, left, mid1 - 1);
    } else if (target > arr[mid2]) {
        return ternarySearch(arr, target, mid2 + 1, right);
    } else {
        return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
    }
}
```

**Time:** O(log₃ n) | **Space:** O(log n)

---

## Top Interview Problems

### 1. First Bad Version

```javascript
function firstBadVersion(n) {
    let left = 1, right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}
```

**Time:** O(log n) | **Space:** O(1)

### 2. Search Suggestions System

```javascript
function suggestedProducts(products, searchWord) {
    products.sort();
    const result = [];
    let prefix = '';

    for (let char of searchWord) {
        prefix += char;
        const suggestions = products
            .filter(p => p.startsWith(prefix))
            .slice(0, 3);
        result.push(suggestions);
    }

    return result;
}
```

**Time:** O(n log n + m × n) | **Space:** O(1)

### 3. Find K Closest Elements

```javascript
function findClosestElements(arr, k, x) {
    let left = 0;
    let right = arr.length - k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return arr.slice(left, left + k);
}
```

**Time:** O(log n + k) | **Space:** O(1)

### 4. Median of Two Sorted Arrays

```javascript
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    let left = 0, right = m;

    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];

        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) +
                       Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
}
```

**Time:** O(log(min(m, n))) | **Space:** O(1)

---

## Practice Problems

### Easy
1. Binary Search
2. First Bad Version
3. Search Insert Position
4. Sqrt(x)
5. Valid Perfect Square

### Medium
6. Search in Rotated Sorted Array
7. Find First and Last Position
8. Find Peak Element
9. Search a 2D Matrix
10. Find K Closest Elements

### Hard
11. Median of Two Sorted Arrays
12. Split Array Largest Sum
13. Koko Eating Bananas
14. Minimum Time to Complete Trips
15. Magnetic Force Between Two Balls

---

## Interview Tips

### Binary Search When?

✅ **Sorted array** - Direct application
✅ **Rotated sorted** - Modified binary search
✅ **Find peak/valley** - Search space reduction
✅ **Minimize/maximize** - Answer space binary search
✅ **2D matrix** - Treat as 1D array

### Common Mistakes

❌ **Off-by-one errors**
```javascript
// Wrong
mid = (left + right) / 2;
// Right
mid = Math.floor((left + right) / 2);
```

❌ **Integer overflow** (not in JS, but good to know)
```javascript
// Safer
mid = left + Math.floor((right - left) / 2);
```

❌ **Wrong loop condition**
```javascript
// For exact match: left <= right
// For range: left < right
```

### Binary Search Patterns

**Pattern 1: Find Exact**
```javascript
while (left <= right) {
    if (arr[mid] === target) return mid;
    // ...
}
return -1;
```

**Pattern 2: Find Boundary**
```javascript
while (left < right) {
    if (condition) {
        right = mid;
    } else {
        left = mid + 1;
    }
}
return left;
```

**Pattern 3: Rotated Array**
```javascript
// Check which half is sorted
if (nums[left] <= nums[mid]) {
    // Left half sorted
} else {
    // Right half sorted
}
```

---

## Complexity Cheat Sheet

```
Linear Search:         O(n)
Binary Search:         O(log n)
Jump Search:           O(√n)
Interpolation Search:  O(log log n) avg
Exponential Search:    O(log n)
Ternary Search:        O(log₃ n)
```

---

## Quick Reference

```javascript
// Binary Search Template
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

// Find First Occurrence
while (left <= right) {
    if (arr[mid] === target) {
        result = mid;
        right = mid - 1; // Go left
    }
}

// Find Last Occurrence
while (left <= right) {
    if (arr[mid] === target) {
        result = mid;
        left = mid + 1; // Go right
    }
}

// Search Space Pattern
while (left < right) {
    if (isValid(mid)) {
        right = mid;
    } else {
        left = mid + 1;
    }
}
```

---

**Binary search is your friend for sorted data!** 🔍
