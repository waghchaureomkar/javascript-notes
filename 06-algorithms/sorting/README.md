# Sorting Algorithms - Complete Guide

> **Fundamental Algorithms**
> Arrange elements in ascending or descending order

---

## Table of Contents

1. [Sorting Basics](#sorting-basics)
2. [Simple Sorts O(n²)](#simple-sorts-on)
3. [Efficient Sorts O(n log n)](#efficient-sorts-on-log-n)
4. [Linear Time Sorts O(n)](#linear-time-sorts-on)
5. [Comparison Chart](#comparison-chart)
6. [Top Interview Problems](#top-interview-problems)
7. [Practice Problems](#practice-problems)

---

## Sorting Basics

### Why Sorting?

- **Binary search** requires sorted data
- **Finding duplicates** is easier
- **Data analysis** often needs ordering
- **Optimization problems** use sorting

### Stability

A sort is **stable** if equal elements maintain their relative order.

```
Input:  [3a, 2, 3b, 1]
Stable:  [1, 2, 3a, 3b]  ✅ (3a before 3b)
Unstable: [1, 2, 3b, 3a] ❌ (order changed)
```

---

## Simple Sorts O(n²)

### 1. Bubble Sort

Repeatedly swap adjacent elements if they're in wrong order.

```javascript
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // Optimization: stop if no swaps
        if (!swapped) break;
    }

    return arr;
}
```

**Time:** O(n²) | **Space:** O(1) | **Stable:** Yes

**When to use:** Small datasets, nearly sorted data

### 2. Selection Sort

Find minimum element and move to beginning.

```javascript
function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }

    return arr;
}
```

**Time:** O(n²) | **Space:** O(1) | **Stable:** No

**When to use:** Small datasets, minimal swaps needed

### 3. Insertion Sort

Build sorted array one element at a time.

```javascript
function insertionSort(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}
```

**Time:** O(n²) average, O(n) best | **Space:** O(1) | **Stable:** Yes

**When to use:** Small datasets, nearly sorted, online sorting

---

## Efficient Sorts O(n log n)

### 4. Merge Sort

Divide and conquer - split, sort, merge.

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Time:** O(n log n) always | **Space:** O(n) | **Stable:** Yes

**When to use:** Guaranteed O(n log n), linked lists, external sorting

**Pros:**
- ✅ Predictable performance
- ✅ Stable
- ✅ Good for linked lists

**Cons:**
- ❌ Requires extra space
- ❌ Slower than quick sort in practice

### 5. Quick Sort

Divide and conquer - pick pivot, partition, recurse.

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
```

**Time:** O(n log n) average, O(n²) worst | **Space:** O(log n) | **Stable:** No

**When to use:** General purpose, in-place sorting

**Pros:**
- ✅ Fast in practice
- ✅ In-place (low memory)
- ✅ Cache-friendly

**Cons:**
- ❌ Unstable
- ❌ O(n²) worst case
- ❌ Not good for linked lists

### 6. Heap Sort

Build max heap, extract maximum repeatedly.

```javascript
function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
```

**Time:** O(n log n) always | **Space:** O(1) | **Stable:** No

**When to use:** Guaranteed O(n log n) with O(1) space

---

## Linear Time Sorts O(n)

### 7. Counting Sort

Count occurrences, reconstruct sorted array.

```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let num of arr) {
        count[num - min]++;
    }

    // Cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    return output;
}
```

**Time:** O(n + k) where k = range | **Space:** O(k) | **Stable:** Yes

**When to use:** Small range of integers

### 8. Radix Sort

Sort by each digit, starting from least significant.

```javascript
function radixSort(arr) {
    const max = Math.max(...arr);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
    }

    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
```

**Time:** O(d × (n + k)) where d = digits | **Space:** O(n + k) | **Stable:** Yes

**When to use:** Fixed-length integers

### 9. Bucket Sort

Distribute into buckets, sort each bucket.

```javascript
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    const min = Math.min(...arr);
    const max = Math.max(...arr);

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute into buckets
    for (let num of arr) {
        const bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].push(num);
    }

    // Sort each bucket and combine
    const result = [];
    for (let bucket of buckets) {
        insertionSort(bucket);
        result.push(...bucket);
    }

    return result;
}
```

**Time:** O(n + k) average | **Space:** O(n + k) | **Stable:** Yes

**When to use:** Uniformly distributed data

---

## Comparison Chart

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Radix | O(nk) | O(nk) | O(nk) | O(n+k) | Yes |
| Bucket | O(n+k) | O(n+k) | O(n²) | O(n+k) | Yes |

---

## Top Interview Problems

### 1. Sort Colors (Dutch National Flag)

```javascript
function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }

    return nums;
}
```

**Time:** O(n) | **Space:** O(1)

### 2. Merge Intervals

```javascript
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);

    const result = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];

        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }

    return result;
}
```

**Time:** O(n log n) | **Space:** O(n)

### 3. Kth Largest Element (Quick Select)

```javascript
function findKthLargest(nums, k) {
    k = nums.length - k; // Convert to kth smallest

    function quickSelect(left, right) {
        const pivot = nums[right];
        let p = left;

        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[p], nums[i]] = [nums[i], nums[p]];
                p++;
            }
        }

        [nums[p], nums[right]] = [nums[right], nums[p]];

        if (p === k) return nums[p];
        if (p < k) return quickSelect(p + 1, right);
        return quickSelect(left, p - 1);
    }

    return quickSelect(0, nums.length - 1);
}
```

**Time:** O(n) average, O(n²) worst | **Space:** O(1)

### 4. Sort List (Merge Sort for Linked List)

```javascript
function sortList(head) {
    if (!head || !head.next) return head;

    // Find middle
    let slow = head;
    let fast = head;
    let prev = null;

    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    prev.next = null;

    // Sort each half
    const left = sortList(head);
    const right = sortList(slow);

    // Merge
    return merge(left, right);
}

function merge(l1, l2) {
    const dummy = { next: null };
    let current = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
}
```

**Time:** O(n log n) | **Space:** O(log n)

---

## Practice Problems

### Easy
1. Merge Sorted Array
2. Sort Colors
3. Intersection of Two Arrays
4. Valid Anagram
5. Contains Duplicate

### Medium
6. Merge Intervals
7. Kth Largest Element
8. Top K Frequent Elements
9. Sort Characters By Frequency
10. Meeting Rooms II

### Hard
11. Merge K Sorted Lists
12. Largest Number
13. Maximum Gap
14. Count of Smaller Numbers After Self
15. Reverse Pairs

---

## Interview Tips

### Which Sort to Choose?

| Scenario | Algorithm |
|----------|-----------|
| General purpose | Quick Sort |
| Stable needed | Merge Sort |
| Limited memory | Heap Sort |
| Nearly sorted | Insertion Sort |
| Small integers | Counting Sort |
| Fixed digits | Radix Sort |
| Uniform data | Bucket Sort |

### Common Patterns

1. **Two pointers**: Sort first, then two pointers
2. **Merge intervals**: Sort by start time
3. **Kth element**: Quick select
4. **Custom comparator**: Define sort order

### Edge Cases

```javascript
// Always test:
- Empty array
- Single element
- All same elements
- Already sorted
- Reverse sorted
- Duplicates
```

---

## Quick Reference

```javascript
// Built-in sort
arr.sort((a, b) => a - b); // Ascending
arr.sort((a, b) => b - a); // Descending

// Quick Sort Template
function quickSort(arr, left, right) {
    if (left < right) {
        const pivot = partition(arr, left, right);
        quickSort(arr, left, pivot - 1);
        quickSort(arr, pivot + 1, right);
    }
}

// Merge Sort Template
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

// Three-way partitioning (Dutch Flag)
let low = 0, mid = 0, high = n - 1;
while (mid <= high) {
    if (arr[mid] === 0) swap(low++, mid++);
    else if (arr[mid] === 1) mid++;
    else swap(mid, high--);
}
```

---

**Master sorting for 30% of interview problems!** 📊
