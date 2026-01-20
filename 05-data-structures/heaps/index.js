/**
 * HEAPS - Data Structure
 * Complete binary tree with heap property
 * Min Heap: Parent <= Children
 * Max Heap: Parent >= Children
 */

// ===== MIN HEAP IMPLEMENTATION =====

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

    // Insert: O(log n)
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let currentIndex = index;
        let parentIndex = this.getParentIndex(currentIndex);

        while (currentIndex > 0 && this.heap[currentIndex] < this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex);
        }
    }

    // Extract Min: O(log n)
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

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Peek: O(1)
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

// ===== MAX HEAP IMPLEMENTATION =====

class MaxHeap {
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

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let currentIndex = index;
        let parentIndex = this.getParentIndex(currentIndex);

        while (currentIndex > 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex);
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

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }

        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

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

// ===== PRIORITY QUEUE =====

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

// ===== COMMON HEAP PROBLEMS =====

// 1. Kth Largest Element
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

// 2. Kth Smallest Element
function findKthSmallest(nums, k) {
    const maxHeap = new MaxHeap();

    for (let num of nums) {
        maxHeap.insert(num);

        if (maxHeap.size() > k) {
            maxHeap.extractMax();
        }
    }

    return maxHeap.peek();
}

// 3. Top K Frequent Elements
function topKFrequent(nums, k) {
    const freqMap = new Map();

    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const minHeap = new MinHeap();

    for (let [num, freq] of freqMap) {
        minHeap.insert({ num, freq });

        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    return minHeap.heap.map(item => item.num);
}

// 4. Merge K Sorted Lists
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    const minHeap = new MinHeap();

    // Add first node from each list
    for (let list of lists) {
        if (list) {
            minHeap.insert({ val: list.val, node: list });
        }
    }

    const dummy = new ListNode(0);
    let current = dummy;

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

// 5. Find Median from Data Stream
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap(); // Lower half
        this.minHeap = new MinHeap(); // Upper half
    }

    addNum(num) {
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

// 6. Reorganize String
function reorganizeString(s) {
    const freqMap = new Map();

    for (let char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    const maxHeap = new MaxHeap();

    for (let [char, freq] of freqMap) {
        maxHeap.insert({ char, freq });
    }

    let result = '';
    let prev = null;

    while (!maxHeap.isEmpty() || prev) {
        if (prev && maxHeap.isEmpty()) {
            return ''; // Can't reorganize
        }

        const current = maxHeap.extractMax();
        result += current.char;
        current.freq--;

        if (prev) {
            maxHeap.insert(prev);
            prev = null;
        }

        if (current.freq > 0) {
            prev = current;
        }
    }

    return result;
}

// 7. Last Stone Weight
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

// 8. K Closest Points to Origin
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

// 9. Meeting Rooms II (Min number of rooms)
function minMeetingRooms(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    intervals.sort((a, b) => a[0] - b[0]);

    const minHeap = new MinHeap();
    minHeap.insert(intervals[0][1]);

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= minHeap.peek()) {
            minHeap.extractMin();
        }
        minHeap.insert(intervals[i][1]);
    }

    return minHeap.size();
}

// 10. Task Scheduler
function leastInterval(tasks, n) {
    const freqMap = new Map();

    for (let task of tasks) {
        freqMap.set(task, (freqMap.get(task) || 0) + 1);
    }

    const maxHeap = new MaxHeap();

    for (let freq of freqMap.values()) {
        maxHeap.insert(freq);
    }

    let time = 0;

    while (!maxHeap.isEmpty()) {
        const temp = [];
        let i = 0;

        while (i <= n) {
            if (!maxHeap.isEmpty()) {
                const freq = maxHeap.extractMax();
                if (freq > 1) {
                    temp.push(freq - 1);
                }
            }

            time++;
            i++;

            if (maxHeap.isEmpty() && temp.length === 0) {
                break;
            }
        }

        for (let freq of temp) {
            maxHeap.insert(freq);
        }
    }

    return time;
}

// ===== HEAPIFY ARRAY =====

function heapifyArray(arr) {
    const n = arr.length;

    // Build max heap
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

// ===== TEST CASES =====
console.log('\n===== Heap Tests =====\n');

// Min Heap
const minHeap = new MinHeap();
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(2);
minHeap.insert(4);

console.log('Min Heap:', minHeap.heap); // [1, 2, 4, 5, 3, 6]
console.log('Extract Min:', minHeap.extractMin()); // 1
console.log('Peek:', minHeap.peek()); // 2

// Max Heap
const maxHeap = new MaxHeap();
maxHeap.insert(3);
maxHeap.insert(1);
maxHeap.insert(6);
maxHeap.insert(5);
maxHeap.insert(2);
maxHeap.insert(4);

console.log('\nMax Heap:', maxHeap.heap); // [6, 5, 4, 1, 2, 3]
console.log('Extract Max:', maxHeap.extractMax()); // 6
console.log('Peek:', maxHeap.peek()); // 5

// Kth Largest
console.log('\nKth Largest (k=2):', findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5

// Top K Frequent
console.log('Top K Frequent (k=2):', topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]

// Median Finder
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log('Median after [1, 2]:', mf.findMedian()); // 1.5
mf.addNum(3);
console.log('Median after [1, 2, 3]:', mf.findMedian()); // 2

// Last Stone Weight
console.log('\nLast Stone Weight:', lastStoneWeight([2, 7, 4, 1, 8, 1])); // 1

// Min Meeting Rooms
console.log('Min Meeting Rooms:', minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
