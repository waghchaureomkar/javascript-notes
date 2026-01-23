# Sliding Window - Complete Guide

> **Optimize Subarray/Substring Problems**
> Use a dynamic window to solve problems efficiently

---

## Table of Contents

1. [Sliding Window Basics](#sliding-window-basics)
2. [Fixed Window](#fixed-window)
3. [Variable Window](#variable-window)
4. [Window Patterns](#window-patterns)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Sliding Window Basics

### What is Sliding Window?

A technique that maintains a **window** (subarray/substring) and slides it across the input.

**Key idea:** Instead of recalculating from scratch, update window incrementally.

```
Array: [1, 3, 2, 6, 1, 4, 1, 8, 2]
Window size k=3:

[1, 3, 2] 6, 1, 4, 1, 8, 2  → sum = 6
1, [3, 2, 6] 1, 4, 1, 8, 2  → sum = 11
1, 3, [2, 6, 1] 4, 1, 8, 2  → sum = 9
```

**Benefits:**
- Reduces O(n²) to O(n)
- Saves recomputation
- Clean implementation

---

## Fixed Window

Window size is **constant**.

### Template

```javascript
function fixedWindow(arr, k) {
    let windowSum = 0;
    let maxSum = 0;

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
```

### 1. Maximum Sum Subarray of Size K

```javascript
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;

    let windowSum = 0;

    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9
```

**Time:** O(n) | **Space:** O(1)

### 2. Average of Subarrays of Size K

```javascript
function findAverages(arr, k) {
    const result = [];
    let windowSum = 0;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];

        if (i >= k - 1) {
            result.push(windowSum / k);
            windowSum -= arr[i - k + 1];
        }
    }

    return result;
}

console.log(findAverages([1, 3, 2, 6, -1, 4, 1, 8, 2], 5));
// [2.2, 2.8, 2.4, 3.6, 2.8]
```

**Time:** O(n) | **Space:** O(n)

### 3. Maximum of All Subarrays of Size K

```javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements (not useful)
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

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// [3, 3, 5, 5, 6, 7]
```

**Time:** O(n) | **Space:** O(k)

---

## Variable Window

Window size **changes** based on condition.

### Template

```javascript
function variableWindow(arr, target) {
    let left = 0;
    let windowSum = 0;
    let result = 0;

    for (let right = 0; right < arr.length; right++) {
        // Expand window
        windowSum += arr[right];

        // Shrink window while condition is violated
        while (windowSum > target) {
            windowSum -= arr[left];
            left++;
        }

        // Update result
        result = Math.max(result, right - left + 1);
    }

    return result;
}
```

### 1. Smallest Subarray with Sum ≥ Target

```javascript
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLen === Infinity ? 0 : minLen;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
```

**Time:** O(n) | **Space:** O(1)

### 2. Longest Substring with K Distinct Characters

```javascript
function longestSubstringKDistinct(s, k) {
    const charCount = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Expand window
        charCount[s[right]] = (charCount[s[right]] || 0) + 1;

        // Shrink window
        while (Object.keys(charCount).length > k) {
            charCount[s[left]]--;
            if (charCount[s[left]] === 0) {
                delete charCount[s[left]];
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(longestSubstringKDistinct("araaci", 2)); // 4 ("araa")
```

**Time:** O(n) | **Space:** O(k)

### 3. Longest Substring Without Repeating Characters

```javascript
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Shrink until no duplicate
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }

        charSet.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
```

**Time:** O(n) | **Space:** O(min(n, m)) where m = charset size

**Optimized with Map:**

```javascript
function lengthOfLongestSubstringOptimized(s) {
    const charIndex = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        if (s[right] in charIndex && charIndex[s[right]] >= left) {
            left = charIndex[s[right]] + 1;
        }

        charIndex[s[right]] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

---

## Window Patterns

### 1. Character Frequency Pattern

```javascript
function findAnagrams(s, p) {
    const result = [];
    const pCount = {};
    const windowCount = {};

    // Count characters in p
    for (let char of p) {
        pCount[char] = (pCount[char] || 0) + 1;
    }

    let left = 0;
    let matched = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        if (rightChar in pCount) {
            windowCount[rightChar] = (windowCount[rightChar] || 0) + 1;
            if (windowCount[rightChar] === pCount[rightChar]) {
                matched++;
            }
        }

        // Shrink window
        if (right >= p.length) {
            const leftChar = s[left];
            if (leftChar in pCount) {
                if (windowCount[leftChar] === pCount[leftChar]) {
                    matched--;
                }
                windowCount[leftChar]--;
            }
            left++;
        }

        // Found anagram
        if (matched === Object.keys(pCount).length) {
            result.push(left);
        }
    }

    return result;
}

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
```

**Time:** O(n) | **Space:** O(1) - max 26 characters

### 2. Maximum Frequency Pattern

```javascript
function characterReplacement(s, k) {
    const charCount = {};
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        charCount[s[right]] = (charCount[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, charCount[s[right]]);

        // If replacements needed > k, shrink window
        while ((right - left + 1) - maxCount > k) {
            charCount[s[left]]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(characterReplacement("AABABBA", 1)); // 4
```

**Time:** O(n) | **Space:** O(1)

---

## Top Interview Problems

### 1. Minimum Window Substring

```javascript
function minWindow(s, t) {
    const need = {};
    const have = {};

    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
    }

    let left = 0;
    let matched = 0;
    let minLen = Infinity;
    let minStart = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        if (rightChar in need) {
            have[rightChar] = (have[rightChar] || 0) + 1;
            if (have[rightChar] === need[rightChar]) {
                matched++;
            }
        }

        // Shrink window
        while (matched === Object.keys(need).length) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            const leftChar = s[left];
            if (leftChar in need) {
                if (have[leftChar] === need[leftChar]) {
                    matched--;
                }
                have[leftChar]--;
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
```

**Time:** O(n + m) | **Space:** O(m)

### 2. Permutation in String

```javascript
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    const s1Count = Array(26).fill(0);
    const s2Count = Array(26).fill(0);

    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - a]++;
        s2Count[s2.charCodeAt(i) - a]++;
    }

    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === s2Count[i]) matches++;
    }

    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) return true;

        // Add right character
        let index = s2.charCodeAt(i) - a;
        s2Count[index]++;
        if (s2Count[index] === s1Count[index]) {
            matches++;
        } else if (s2Count[index] === s1Count[index] + 1) {
            matches--;
        }

        // Remove left character
        index = s2.charCodeAt(i - s1.length) - a;
        s2Count[index]--;
        if (s2Count[index] === s1Count[index]) {
            matches++;
        } else if (s2Count[index] === s1Count[index] - 1) {
            matches--;
        }
    }

    return matches === 26;
}

console.log(checkInclusion("ab", "eidbaooo")); // true
```

**Time:** O(n) | **Space:** O(1)

### 3. Fruits Into Baskets

```javascript
function totalFruit(fruits) {
    const basket = {};
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        basket[fruits[right]] = (basket[fruits[right]] || 0) + 1;

        while (Object.keys(basket).length > 2) {
            basket[fruits[left]]--;
            if (basket[fruits[left]] === 0) {
                delete basket[fruits[left]];
            }
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
}

console.log(totalFruit([1, 2, 1])); // 3
```

**Time:** O(n) | **Space:** O(1)

### 4. Longest Repeating Character Replacement

```javascript
function characterReplacement(s, k) {
    const count = {};
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[right]]);

        if ((right - left + 1) - maxCount > k) {
            count[s[left]]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(characterReplacement("AABABBA", 1)); // 4
```

**Time:** O(n) | **Space:** O(1)

### 5. Max Consecutive Ones III

```javascript
function longestOnes(nums, k) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;

        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
```

**Time:** O(n) | **Space:** O(1)

### 6. Subarrays with K Different Integers

```javascript
function subarraysWithKDistinct(nums, k) {
    function atMostK(k) {
        const count = {};
        let left = 0;
        let result = 0;

        for (let right = 0; right < nums.length; right++) {
            count[nums[right]] = (count[nums[right]] || 0) + 1;

            while (Object.keys(count).length > k) {
                count[nums[left]]--;
                if (count[nums[left]] === 0) {
                    delete count[nums[left]];
                }
                left++;
            }

            result += right - left + 1;
        }

        return result;
    }

    return atMostK(k) - atMostK(k - 1);
}

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // 7
```

**Time:** O(n) | **Space:** O(k)

---

## Practice Problems

### Easy
1. Maximum Sum Subarray of Size K
2. Average of Subarrays of Size K
3. Max Consecutive Ones III
4. Minimum Difference Between Highest and Lowest of K Scores

### Medium
5. Longest Substring Without Repeating Characters
6. Longest Repeating Character Replacement
7. Permutation in String
8. Find All Anagrams in String
9. Fruits Into Baskets
10. Minimum Window Substring
11. Sliding Window Maximum
12. Longest Substring with At Most K Distinct Characters

### Hard
13. Minimum Window Substring
14. Substring with Concatenation of All Words
15. Subarrays with K Different Integers
16. Longest Substring with At Most Two Distinct Characters

---

## Interview Tips

### When to Use Sliding Window?

✅ **Subarray/substring** problems
✅ **Contiguous elements** required
✅ **Optimization** (min/max length, sum, count)
✅ Keywords: "contiguous", "substring", "subarray", "window"

### Fixed vs Variable Window

| Fixed Window | Variable Window |
|--------------|-----------------|
| Window size is constant | Window size changes |
| Add right, remove left | Expand & shrink based on condition |
| Maximum sum of k elements | Longest substring with condition |

### Common Patterns

1. **Fixed Window**: Slide by removing left, adding right
2. **Variable Window**: Expand until condition breaks, then shrink
3. **Character Count**: Use map/array to track frequencies
4. **At Most K**: Use helper function for "exactly K"

### Edge Cases

```javascript
// Always test:
- Empty array/string
- Window size > array length
- All same elements
- k = 0 or k = 1
- Single element
```

---

## Complexity Cheat Sheet

```
Fixed Window:       O(n) time, O(1) space
Variable Window:    O(n) time, O(k) space (for map)
Character Frequency: O(n) time, O(1) space (fixed charset)

Most sliding window: O(n) time, O(1) or O(k) space
```

---

## Quick Reference

```javascript
// Fixed Window Template
function fixedWindow(arr, k) {
    let windowSum = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let result = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result = Math.max(result, windowSum);
    }

    return result;
}

// Variable Window Template
function variableWindow(arr, condition) {
    let left = 0;
    let result = 0;

    for (let right = 0; right < arr.length; right++) {
        // Expand window
        addToWindow(arr[right]);

        // Shrink window
        while (windowInvalid()) {
            removeFromWindow(arr[left]);
            left++;
        }

        // Update result
        result = Math.max(result, right - left + 1);
    }

    return result;
}

// Character Frequency Template
function characterWindow(s, pattern) {
    const need = {};
    const have = {};

    for (let char of pattern) {
        need[char] = (need[char] || 0) + 1;
    }

    let left = 0;
    let matched = 0;

    for (let right = 0; right < s.length; right++) {
        // Expand
        if (s[right] in need) {
            have[s[right]] = (have[s[right]] || 0) + 1;
            if (have[s[right]] === need[s[right]]) {
                matched++;
            }
        }

        // Shrink
        while (matched === Object.keys(need).length) {
            // Process window
            // Shrink from left
        }
    }
}
```

---

**Sliding Window: Slide to victory, one element at a time!** 🪟
