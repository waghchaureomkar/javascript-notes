/**
 * DYNAMIC PROGRAMMING
 * Optimization technique using memoization and tabulation
 * "Remember the past to solve the future"
 */

// ===== FIBONACCI SEQUENCE =====

// 1. Naive Recursion: O(2^n)
function fibRecursive(n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 2. Memoization (Top-Down DP): O(n)
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// 3. Tabulation (Bottom-Up DP): O(n)
function fibTab(n) {
    if (n <= 1) return n;

    const dp = [0, 1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// 4. Space Optimized: O(1) space
function fibOptimized(n) {
    if (n <= 1) return n;

    let prev2 = 0, prev1 = 1;

    for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// ===== CLIMBING STAIRS =====
// n steps, can climb 1 or 2 at a time

function climbStairs(n) {
    if (n <= 2) return n;

    let prev2 = 1, prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// ===== COIN CHANGE =====

// 1. Minimum Coins (Unbounded Knapsack)
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 2. Coin Change II (Count ways)
function coinChange2(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[amount];
}

// ===== KNAPSACK PROBLEM =====

// 1. 0/1 Knapsack
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}

// 2. Space Optimized Knapsack
function knapsackOptimized(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }

    return dp[capacity];
}

// ===== LONGEST COMMON SUBSEQUENCE =====

function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// ===== LONGEST INCREASING SUBSEQUENCE =====

function lengthOfLIS(nums) {
    if (!nums.length) return 0;

    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

// Optimized O(n log n) using Binary Search
function lengthOfLISOptimized(nums) {
    const tails = [];

    for (let num of nums) {
        let left = 0, right = tails.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        tails[left] = num;
    }

    return tails.length;
}

// ===== EDIT DISTANCE =====

function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,     // delete
                    dp[i][j - 1] + 1,     // insert
                    dp[i - 1][j - 1] + 1  // replace
                );
            }
        }
    }

    return dp[m][n];
}

// ===== WORD BREAK =====

function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

// ===== HOUSE ROBBER =====

// 1. House Robber I (Linear)
function rob(nums) {
    if (!nums.length) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        const curr = Math.max(prev1, nums[i] + prev2);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// 2. House Robber II (Circular)
function robCircular(nums) {
    if (!nums.length) return 0;
    if (nums.length === 1) return nums[0];

    function robLinear(start, end) {
        let prev2 = 0, prev1 = 0;

        for (let i = start; i <= end; i++) {
            const curr = Math.max(prev1, nums[i] + prev2);
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }

    return Math.max(
        robLinear(0, nums.length - 2),
        robLinear(1, nums.length - 1)
    );
}

// ===== UNIQUE PATHS =====

function uniquePaths(m, n) {
    const dp = Array(m).fill(0).map(() => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}

// With Obstacles
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    if (obstacleGrid[0][0] === 1) return 0;

    const dp = Array(m).fill(0).map(() => Array(n).fill(0));
    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0;
            } else {
                if (i > 0) dp[i][j] += dp[i - 1][j];
                if (j > 0) dp[i][j] += dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
}

// ===== PARTITION EQUAL SUBSET SUM =====

function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);

    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}

// ===== MAXIMUM SUBARRAY PRODUCT =====

function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let minEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const temp = maxEndingHere;
        maxEndingHere = Math.max(nums[i], nums[i] * maxEndingHere, nums[i] * minEndingHere);
        minEndingHere = Math.min(nums[i], nums[i] * temp, nums[i] * minEndingHere);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

// ===== PALINDROME PROBLEMS =====

// 1. Longest Palindromic Substring
function longestPalindrome(s) {
    if (!s || s.length < 1) return '';

    let start = 0, maxLen = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i);
        const len2 = expandAroundCenter(i, i + 1);
        const len = Math.max(len1, len2);

        if (len > maxLen) {
            maxLen = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLen);
}

// 2. Palindromic Substrings Count
function countSubstrings(s) {
    let count = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
        expandAroundCenter(i, i + 1);
    }

    return count;
}

// ===== TEST CASES =====
console.log('\n===== Dynamic Programming Tests =====\n');

console.log('Fibonacci(10):', fibOptimized(10)); // 55
console.log('Climb Stairs(5):', climbStairs(5)); // 8
console.log('Coin Change:', coinChange([1, 2, 5], 11)); // 3
console.log('Knapsack:', knapsack([1, 2, 3], [6, 10, 12], 5)); // 22
console.log('LCS("abcde", "ace"):', longestCommonSubsequence('abcde', 'ace')); // 3
console.log('LIS([10,9,2,5,3,7,101,18]):', lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log('Edit Distance("horse", "ros"):', minDistance('horse', 'ros')); // 3
console.log('Word Break:', wordBreak('leetcode', ['leet', 'code'])); // true
console.log('House Robber:', rob([2, 7, 9, 3, 1])); // 12
console.log('Unique Paths(3, 7):', uniquePaths(3, 7)); // 28
