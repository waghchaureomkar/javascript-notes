/**
 * ARRAYS - Data Structure
 * Arrays are ordered collections of elements
 */

// ===== BASIC OPERATIONS =====

// 1. Array Creation
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(5); // [empty × 5]
const arr3 = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// 2. Common Array Methods
const numbers = [1, 2, 3, 4, 5];

// Access: O(1)
console.log(numbers[0]); // 1

// Insert at end: O(1)
numbers.push(6); // [1, 2, 3, 4, 5, 6]

// Insert at beginning: O(n)
numbers.unshift(0); // [0, 1, 2, 3, 4, 5, 6]

// Remove from end: O(1)
numbers.pop(); // [0, 1, 2, 3, 4, 5]

// Remove from beginning: O(n)
numbers.shift(); // [1, 2, 3, 4, 5]

// Insert/Remove at specific position: O(n)
numbers.splice(2, 0, 2.5); // [1, 2, 2.5, 3, 4, 5]

// ===== COMMON ARRAY PROBLEMS =====

// 1. Two Sum Problem
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

// 2. Maximum Subarray (Kadane's Algorithm)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// 3. Move Zeros to End
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

// 4. Find Missing Number
function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}

// 5. Rotate Array
function rotate(nums, k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

// 6. Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
}

// 7. Best Time to Buy and Sell Stock
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
}

// ===== ADVANCED ARRAY TECHNIQUES =====

// 1. Prefix Sum
function prefixSum(nums) {
    const prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }
    return prefix;
}

// 2. Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

// ===== TEST CASES =====
console.log('\n===== Array Problems Tests =====\n');

console.log('Two Sum:', twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log('Max Subarray:', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log('Move Zeroes:', moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log('Missing Number:', missingNumber([3, 0, 1])); // 2
console.log('Max Profit:', maxProfit([7, 1, 5, 3, 6, 4])); // 5
