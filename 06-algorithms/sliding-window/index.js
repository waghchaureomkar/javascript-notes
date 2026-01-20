/**
 * SLIDING WINDOW TECHNIQUE
 * Efficiently process subarrays/substrings
 * Two types: Fixed size and Variable size
 */

// ===== FIXED SIZE WINDOW =====

// 1. Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;

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

// 2. Average of Subarrays of Size K
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

// 3. Maximum of All Subarrays of Size K
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices

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

// 4. First Negative in Every Window of Size K
function firstNegativeInWindow(arr, k) {
    const result = [];
    const negatives = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            negatives.push(i);
        }

        if (i >= k - 1) {
            // Remove out of window negatives
            while (negatives.length && negatives[0] <= i - k) {
                negatives.shift();
            }

            result.push(negatives.length > 0 ? arr[negatives[0]] : 0);
        }
    }

    return result;
}

// ===== VARIABLE SIZE WINDOW =====

// 5. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// 6. Longest Substring with At Most K Distinct Characters
function lengthOfLongestSubstringKDistinct(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// 7. Longest Repeating Character Replacement
function characterReplacement(s, k) {
    const count = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        count.set(s[right], (count.get(s[right]) || 0) + 1);
        maxCount = Math.max(maxCount, count.get(s[right]));

        // If replacements needed > k, shrink window
        while (right - left + 1 - maxCount > k) {
            count.set(s[left], count.get(s[left]) - 1);
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// 8. Minimum Window Substring
function minWindow(s, t) {
    if (s.length === 0 || t.length === 0) return '';

    const need = new Map();
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    const window = new Map();
    let left = 0;
    let right = 0;
    let valid = 0;
    let minLen = Infinity;
    let start = 0;

    while (right < s.length) {
        const char = s[right];
        right++;

        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }

        while (valid === need.size) {
            if (right - left < minLen) {
                minLen = right - left;
                start = left;
            }

            const leftChar = s[left];
            left++;

            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }

    return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

// 9. Smallest Subarray with Sum >= Target
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

// 10. Longest Subarray with Ones after Replacement
function longestOnes(nums, k) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }

        while (zeros > k) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// 11. Max Consecutive Ones III
function longestSubarray(nums) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }

        while (zeros > 1) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen - 1; // -1 because we must delete one element
}

// ===== SUBSTRING PROBLEMS =====

// 12. Find All Anagrams in String
function findAnagrams(s, p) {
    const result = [];
    const need = new Map();
    const window = new Map();

    for (let char of p) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;

    while (right < s.length) {
        const char = s[right];
        right++;

        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }

        while (right - left >= p.length) {
            if (valid === need.size) {
                result.push(left);
            }

            const leftChar = s[left];
            left++;

            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }

    return result;
}

// 13. Permutation in String
function checkInclusion(s1, s2) {
    const need = new Map();
    const window = new Map();

    for (let char of s1) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;

    while (right < s2.length) {
        const char = s2[right];
        right++;

        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }

        while (right - left >= s1.length) {
            if (valid === need.size) {
                return true;
            }

            const leftChar = s2[left];
            left++;

            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }

    return false;
}

// 14. Longest Substring with At Least K Repeating Characters
function longestSubstring(s, k) {
    if (s.length < k) return 0;

    const count = new Map();
    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    for (let [char, freq] of count) {
        if (freq < k) {
            let maxLen = 0;
            for (let substr of s.split(char)) {
                maxLen = Math.max(maxLen, longestSubstring(substr, k));
            }
            return maxLen;
        }
    }

    return s.length;
}

// ===== ADVANCED PROBLEMS =====

// 15. Fruits into Baskets (At most 2 types)
function totalFruit(fruits) {
    const count = new Map();
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        count.set(fruits[right], (count.get(fruits[right]) || 0) + 1);

        while (count.size > 2) {
            count.set(fruits[left], count.get(fruits[left]) - 1);
            if (count.get(fruits[left]) === 0) {
                count.delete(fruits[left]);
            }
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
}

// 16. Subarray Product Less Than K
function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0;

    let product = 1;
    let left = 0;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];

        while (product >= k) {
            product /= nums[left];
            left++;
        }

        count += right - left + 1;
    }

    return count;
}

// 17. Count Number of Nice Subarrays
function numberOfSubarrays(nums, k) {
    const count = new Map();
    count.set(0, 1);

    let odds = 0;
    let result = 0;

    for (let num of nums) {
        if (num % 2 === 1) {
            odds++;
        }

        if (count.has(odds - k)) {
            result += count.get(odds - k);
        }

        count.set(odds, (count.get(odds) || 0) + 1);
    }

    return result;
}

// ===== TEST CASES =====
console.log('\n===== Sliding Window Tests =====\n');

console.log('Max Sum Subarray (k=3) [2,1,5,1,3,2]:', maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9

console.log('\nLongest Substring Without Repeating "abcabcbb":', lengthOfLongestSubstring('abcabcbb')); // 3

console.log('\nLongest Substring K Distinct (k=2) "eceba":', lengthOfLongestSubstringKDistinct('eceba', 2)); // 3

console.log('\nCharacter Replacement "AABABBA", k=1:', characterReplacement('AABABBA', 1)); // 4

console.log('\nMin Window Substring "ADOBECODEBANC", "ABC":', minWindow('ADOBECODEBANC', 'ABC')); // BANC

console.log('\nMin SubArray Length (target=7) [2,3,1,2,4,3]:', minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2

console.log('\nLongest Ones (k=2) [1,1,1,0,0,0,1,1,1,1,0]:', longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6

console.log('\nFind Anagrams "cbaebabacd", "abc":', findAnagrams('cbaebabacd', 'abc')); // [0, 6]

console.log('\nPermutation in String "ab", "eidbaooo":', checkInclusion('ab', 'eidbaooo')); // true

console.log('\nMax Sliding Window [1,3,-1,-3,5,3,6,7], k=3:', maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]

console.log('\nTotal Fruit [1,2,1]:', totalFruit([1, 2, 1])); // 3

console.log('\nSubarray Product Less Than K [10,5,2,6], k=100:', numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // 8
