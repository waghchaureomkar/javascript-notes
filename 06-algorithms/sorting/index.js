/**
 * SORTING ALGORITHMS
 * Various techniques to sort arrays
 */

// ===== BUBBLE SORT =====
// Time: O(n²) | Space: O(1)
// Stable, Simple but inefficient

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

        // Optimization: if no swaps, array is sorted
        if (!swapped) break;
    }

    return arr;
}

// ===== SELECTION SORT =====
// Time: O(n²) | Space: O(1)
// Unstable, Simple

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

// ===== INSERTION SORT =====
// Time: O(n²) average, O(n) best | Space: O(1)
// Stable, Good for small/nearly sorted arrays

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

// ===== MERGE SORT =====
// Time: O(n log n) | Space: O(n)
// Stable, Divide and Conquer

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

// ===== QUICK SORT =====
// Time: O(n log n) average, O(n²) worst | Space: O(log n)
// Unstable, Very fast in practice

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

// ===== HEAP SORT =====
// Time: O(n log n) | Space: O(1)
// Unstable, In-place

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

// ===== COUNTING SORT =====
// Time: O(n + k) | Space: O(k)
// Stable, Good for limited range integers

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

// ===== RADIX SORT =====
// Time: O(d * (n + k)) | Space: O(n + k)
// Stable, Good for fixed-length integers

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

// ===== BUCKET SORT =====
// Time: O(n + k) average | Space: O(n + k)
// For uniformly distributed data

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

// ===== COMPARISON OF SORTING ALGORITHMS =====

function compareSort(arr) {
    console.log('Original:', [...arr]);

    console.log('\nBubble Sort:', bubbleSort([...arr]));
    console.log('Selection Sort:', selectionSort([...arr]));
    console.log('Insertion Sort:', insertionSort([...arr]));
    console.log('Merge Sort:', mergeSort([...arr]));
    console.log('Quick Sort:', quickSort([...arr]));
    console.log('Heap Sort:', heapSort([...arr]));
    console.log('Counting Sort:', countingSort([...arr]));
    console.log('Radix Sort:', radixSort([...arr]));
    console.log('Bucket Sort:', bucketSort([...arr]));
}

// ===== SPECIAL SORTING PROBLEMS =====

// 1. Sort Colors (Dutch National Flag)
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

// 2. Merge Intervals
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

// 3. Kth Largest Element (Quick Select)
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

// ===== TEST CASES =====
console.log('\n===== Sorting Algorithm Tests =====\n');

const testArray = [64, 34, 25, 12, 22, 11, 90];
compareSort(testArray);

console.log('\n===== Special Problems =====\n');
console.log('Sort Colors:', sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
console.log('Merge Intervals:', mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));
// [[1, 6], [8, 10], [15, 18]]
console.log('Kth Largest:', findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
