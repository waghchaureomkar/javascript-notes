/**
 * SEARCHING ALGORITHMS
 * Techniques to find elements in data structures
 */

// ===== LINEAR SEARCH =====
// Time: O(n) | Space: O(1)
// Works on sorted and unsorted arrays

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// ===== BINARY SEARCH =====
// Time: O(log n) | Space: O(1) iterative, O(log n) recursive
// Requires sorted array

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

// Binary Search (Recursive)
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

// ===== BINARY SEARCH VARIATIONS =====

// 1. Find First Occurrence
function findFirstOccurrence(arr, target) {
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

// 2. Find Last Occurrence
function findLastOccurrence(arr, target) {
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

// 3. Find Range of Target
function searchRange(nums, target) {
    return [
        findFirstOccurrence(nums, target),
        findLastOccurrence(nums, target)
    ];
}

// 4. Search in Rotated Sorted Array
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

// 5. Find Minimum in Rotated Sorted Array
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

// 6. Find Peak Element
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

// 7. Search in 2D Matrix
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

// ===== JUMP SEARCH =====
// Time: O(√n) | Space: O(1)
// Works on sorted arrays

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

// ===== INTERPOLATION SEARCH =====
// Time: O(log log n) for uniform distribution, O(n) worst
// Works on sorted arrays with uniform distribution

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

// ===== EXPONENTIAL SEARCH =====
// Time: O(log n) | Space: O(1)
// Useful for unbounded/infinite arrays

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

// ===== TERNARY SEARCH =====
// Time: O(log₃ n) | Space: O(1)
// For unimodal functions

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

// ===== ADVANCED SEARCH PROBLEMS =====

// 1. Find First Bad Version (Binary Search)
function firstBadVersion(n, isBadVersion) {
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

// 2. Search Suggestions System
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

// 3. Find K Closest Elements
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

// 4. Median of Two Sorted Arrays
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
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
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

// ===== TEST CASES =====
console.log('\n===== Searching Algorithm Tests =====\n');

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

console.log('Linear Search (7):', linearSearch(sortedArray, 7)); // 3
console.log('Binary Search (7):', binarySearch(sortedArray, 7)); // 3
console.log('Jump Search (7):', jumpSearch(sortedArray, 7)); // 3

const duplicates = [1, 2, 2, 2, 3, 4, 5];
console.log('\nSearch Range (2):', searchRange(duplicates, 2)); // [1, 3]

const rotated = [4, 5, 6, 7, 0, 1, 2];
console.log('Search Rotated (0):', searchRotated(rotated, 0)); // 4
console.log('Find Min Rotated:', findMin(rotated)); // 0

const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
];
console.log('\nSearch Matrix (3):', searchMatrix(matrix, 3)); // true
console.log('Search Matrix (13):', searchMatrix(matrix, 13)); // false

console.log('\nClosest Elements:', findClosestElements([1, 2, 3, 4, 5], 4, 3));
// [1, 2, 3, 4]
