# Heaps - Complete Guide

> **Priority Queue Data Structure**
> Complete binary tree with heap property

---

## Table of Contents

1. [Heap Basics](#heap-basics)
2. [Min Heap & Max Heap](#min-heap--max-heap)
3. [Heap Operations](#heap-operations)
4. [Priority Queue](#priority-queue)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Heap Basics

### What is a Heap?

A **complete binary tree** where:
- **Min Heap**: Parent ≤ Children
- **Max Heap**: Parent ≥ Children

```
Max Heap:        Min Heap:
     50               10
    /  \             /  \
   30  40          20   30
  / \              / \
 10 20            40 50
```

**Properties:**
- Complete binary tree (filled left to right)
- Efficient for finding min/max: O(1)
- Used in priority queues, heap sort

### Array Representation

Heap stored as array (index-based):

```
Array:  [50, 30, 40, 10, 20]

        50(0)
       /    \
    30(1)  40(2)
    /  \
 10(3) 20(4)
```

**Formulas:**
- Parent of i: `⌊(i-1)/2⌋`
- Left child of i: `2i + 1`
- Right child of i: `2i + 2`

---

## Min Heap & Max Heap

### Min Heap Implementation

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Insert - O(log n)
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let current = index;
        let parent = this.getParentIndex(current);

        while (current > 0 && this.heap[current] < this.heap[parent]) {
            this.swap(current, parent);
            current = parent;
            parent = this.getParentIndex(current);
        }
    }

    // Extract Min - O(log n)
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return min;
    }

    heapifyDown(index) {
        let smallest = index;
        const left = this.getLeftChildIndex(index);
        const right = this.getRightChildIndex(index);

        if (left < this.heap.length &&
            this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length &&
            this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Peek - O(1)
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
```

### Max Heap Implementation

```javascript
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Same helper methods...

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let current = index;
        let parent = this.getParentIndex(current);

        // Only difference: > instead of <
        while (current > 0 && this.heap[current] > this.heap[parent]) {
            this.swap(current, parent);
            current = parent;
            parent = this.getParentIndex(current);
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return max;
    }

    heapifyDown(index) {
        let largest = index;
        const left = this.getLeftChildIndex(index);
        const right = this.getRightChildIndex(index);

        // Only difference: > instead of <
        if (left < this.heap.length &&
            this.heap[left] > this.heap[largest]) {
            largest = left;
        }

        if (right < this.heap.length &&
            this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }
}
```

---

## Heap Operations

### Time Complexity

| Operation | Time |
|-----------|------|
| Insert | O(log n) |
| Extract Min/Max | O(log n) |
| Peek Min/Max | O(1) |
| Build Heap | O(n) |
| Heapify | O(log n) |
| Search | O(n) |

### Build Heap from Array

```javascript
function buildHeap(arr) {
    const n = arr.length;

    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, n, i);
    }

    return arr;
}

function heapifyDown(arr, n, i) {
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
        heapifyDown(arr, n, largest);
    }
}
```

**Time:** O(n) - Not O(n log n)!

### Heap Sort

```javascript
function heapSort(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyDown(arr, i, 0);
    }

    return arr;
}
```

**Time:** O(n log n) | **Space:** O(1)

---

## Priority Queue

### What is Priority Queue?

Abstract data type where elements have **priorities**.

- **Min Priority Queue**: Lowest priority served first
- **Max Priority Queue**: Highest priority served first

### Implementation

```javascript
class PriorityQueue {
    constructor() {
        this.heap = new MinHeap();
    }

    enqueue(value, priority) {
        this.heap.insert({ value, priority });
    }

    dequeue() {
        const item = this.heap.extractMin();
        return item ? item.value : null;
    }

    peek() {
        const item = this.heap.peek();
        return item ? item.value : null;
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}
```

**Use cases:**
- Task scheduling
- Dijkstra's algorithm
- Huffman coding
- A* pathfinding

---

## Top Interview Problems

### 1. Kth Largest Element

```javascript
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();

    for (let num of nums) {
        minHeap.insert(num);

        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    return minHeap.peek();
}

// Or use Max Heap
function findKthLargestMaxHeap(nums, k) {
    const maxHeap = new MaxHeap();

    for (let num of nums) {
        maxHeap.insert(num);
    }

    for (let i = 0; i < k - 1; i++) {
        maxHeap.extractMax();
    }

    return maxHeap.peek();
}
```

**Time:** O(n log k) with min heap | **Space:** O(k)

### 2. Top K Frequent Elements

```javascript
function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Use min heap of size k
    const minHeap = new MinHeap();

    for (let [num, freq] of freqMap) {
        minHeap.insert({ num, freq });

        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    return minHeap.heap.map(item => item.num);
}
```

**Time:** O(n log k) | **Space:** O(n)

### 3. Merge K Sorted Lists

```javascript
function mergeKLists(lists) {
    const minHeap = new MinHeap();
    const dummy = new ListNode(0);
    let current = dummy;

    // Add first node from each list
    for (let list of lists) {
        if (list) {
            minHeap.insert({ val: list.val, node: list });
        }
    }

    while (!minHeap.isEmpty()) {
        const { node } = minHeap.extractMin();
        current.next = node;
        current = current.next;

        if (node.next) {
            minHeap.insert({ val: node.next.val, node: node.next });
        }
    }

    return dummy.next;
}
```

**Time:** O(N log k) where N = total nodes, k = lists

### 4. Find Median from Data Stream

```javascript
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap(); // Lower half
        this.minHeap = new MinHeap(); // Upper half
    }

    addNum(num) {
        // Add to max heap (lower half)
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.insert(num);
        } else {
            this.minHeap.insert(num);
        }

        // Balance heaps
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.extractMax());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }

    findMedian() {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        } else {
            return this.maxHeap.peek();
        }
    }
}
```

**Time:** addNum O(log n), findMedian O(1)

### 5. Last Stone Weight

```javascript
function lastStoneWeight(stones) {
    const maxHeap = new MaxHeap();

    for (let stone of stones) {
        maxHeap.insert(stone);
    }

    while (maxHeap.size() > 1) {
        const stone1 = maxHeap.extractMax();
        const stone2 = maxHeap.extractMax();

        if (stone1 !== stone2) {
            maxHeap.insert(stone1 - stone2);
        }
    }

    return maxHeap.isEmpty() ? 0 : maxHeap.peek();
}
```

**Time:** O(n log n) | **Space:** O(n)

### 6. K Closest Points to Origin

```javascript
function kClosest(points, k) {
    const maxHeap = new MaxHeap();

    for (let [x, y] of points) {
        const dist = x * x + y * y;
        maxHeap.insert({ dist, point: [x, y] });

        if (maxHeap.size() > k) {
            maxHeap.extractMax();
        }
    }

    return maxHeap.heap.map(item => item.point);
}
```

**Time:** O(n log k) | **Space:** O(k)

### 7. Meeting Rooms II

```javascript
function minMeetingRooms(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    intervals.sort((a, b) => a[0] - b[0]);

    const minHeap = new MinHeap();
    minHeap.insert(intervals[0][1]); // End time

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= minHeap.peek()) {
            minHeap.extractMin();
        }
        minHeap.insert(intervals[i][1]);
    }

    return minHeap.size();
}
```

**Time:** O(n log n) | **Space:** O(n)

---

## Practice Problems

### Easy
1. Kth Largest Element in Stream
2. Last Stone Weight
3. Relative Ranks
4. Sort Characters By Frequency
5. Find K Pairs with Smallest Sums

### Medium
6. Kth Largest Element in Array
7. Top K Frequent Elements
8. K Closest Points to Origin
9. Find Median from Data Stream
10. Meeting Rooms II

### Hard
11. Merge K Sorted Lists
12. Sliding Window Median
13. Find Median from Data Stream
14. Trapping Rain Water II
15. Minimum Cost to Hire K Workers

---

## Interview Tips

### When to Use Heap?

✅ **Kth Largest/Smallest** - Keep heap of size k
✅ **Top K Elements** - Min/max heap
✅ **Median** - Two heaps (max + min)
✅ **Merge K Sorted** - Min heap
✅ **Priority Queue** - Task scheduling

### Min Heap vs Max Heap?

| Need | Use |
|------|-----|
| Kth Largest | Min Heap (size k) |
| Kth Smallest | Max Heap (size k) |
| Top K | Opposite heap |
| Median | Both (max + min) |

### Common Patterns

1. **K-sized Heap**: Keep heap size = k
2. **Two Heaps**: Median problems
3. **Merge Pattern**: Combine sorted structures
4. **Priority Tasks**: Scheduling problems

### Edge Cases

```javascript
// Always test:
- Empty heap
- Single element
- All same elements
- K larger than array size
- Negative numbers
```

---

## Complexity Cheat Sheet

```
Insert:     O(log n)
Extract:    O(log n)
Peek:       O(1)
Build:      O(n)
Heapify:    O(log n)
Heap Sort:  O(n log n)
Space:      O(n)
```

---

## Quick Reference

```javascript
// Min Heap
class MinHeap {
    constructor() { this.heap = []; }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() { return this.heap[0]; }
}

// Parent/Child formulas
parent(i) = ⌊(i-1)/2⌋
leftChild(i) = 2i + 1
rightChild(i) = 2i + 2

// Kth Largest Pattern
const minHeap = new MinHeap();
for (let num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
        minHeap.extractMin();
    }
}
return minHeap.peek();
```

---

**Heaps are perfect for "top K" problems!** ⛰️
