# Dynamic Programming - Complete Guide

> **Optimized Recursion**
> Break down problems, store results, avoid recomputation

---

## Table of Contents

1. [DP Basics](#dp-basics)
2. [Memoization vs Tabulation](#memoization-vs-tabulation)
3. [Common DP Patterns](#common-dp-patterns)
4. [Classic DP Problems](#classic-dp-problems)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## DP Basics

### What is Dynamic Programming?

An optimization technique that:
1. **Breaks down** problems into subproblems
2. **Stores** results to avoid recomputation
3. **Combines** subproblem solutions

**Key properties:**
- **Overlapping Subproblems**: Same subproblems computed multiple times
- **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems

### When to Use DP?

✅ Problem asks for **optimal** solution (min/max, count)
✅ Problem has **overlapping subproblems**
✅ Problem has **choices** at each step
✅ Keywords: "maximum", "minimum", "longest", "count ways"

---

## Memoization vs Tabulation

### Memoization (Top-Down)

Recursive + Cache results.

```javascript
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

console.log(fibMemo(50)); // Fast!
```

**Pros:** Intuitive, only computes needed subproblems
**Cons:** Recursion overhead, stack space

### Tabulation (Bottom-Up)

Iterative + Build table.

```javascript
function fibTab(n) {
    if (n <= 1) return n;

    const dp = [0, 1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

console.log(fibTab(50)); // Fast!
```

**Pros:** No recursion, faster, predictable
**Cons:** Computes all subproblems

### Space Optimization

```javascript
function fibOptimized(n) {
    if (n <= 1) return n;

    let prev2 = 0, prev1 = 1;

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

**Space:** O(1) instead of O(n)

---

## Common DP Patterns

### 1. 1D DP

Single parameter state.

```javascript
// Climbing Stairs
function climbStairs(n) {
    if (n <= 2) return n;

    const dp = [0, 1, 2];

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

**Time:** O(n) | **Space:** O(n)

### 2. 2D DP

Two parameters state.

```javascript
// Unique Paths
function uniquePaths(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}
```

**Time:** O(m × n) | **Space:** O(m × n)

### 3. Subsequence Pattern

```javascript
// Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

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
```

**Time:** O(m × n) | **Space:** O(m × n)

### 4. Knapsack Pattern

```javascript
// 0/1 Knapsack
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}
```

**Time:** O(n × capacity) | **Space:** O(n × capacity)

---

## Classic DP Problems

### 1. Fibonacci

```javascript
// Memoization
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// Tabulation
function fibTab(n) {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// Space Optimized
function fibOpt(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        [prev2, prev1] = [prev1, prev1 + prev2];
    }
    return prev1;
}
```

### 2. Coin Change

```javascript
// Minimum coins to make amount
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
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

console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)
```

**Time:** O(amount × coins) | **Space:** O(amount)

### 3. Longest Increasing Subsequence

```javascript
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const dp = Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
```

**Time:** O(n²) | **Space:** O(n)

**Optimized with Binary Search:** O(n log n)

### 4. Edit Distance

```javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j],      // Delete
                    dp[i][j - 1],      // Insert
                    dp[i - 1][j - 1]   // Replace
                ) + 1;
            }
        }
    }

    return dp[m][n];
}

console.log(minDistance("horse", "ros")); // 3
```

**Time:** O(m × n) | **Space:** O(m × n)

---

## Top Interview Problems

### 1. House Robber

```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = 0, prev1 = 0;

    for (let num of nums) {
        const current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

console.log(rob([2, 7, 9, 3, 1])); // 12
```

**Time:** O(n) | **Space:** O(1)

### 2. Maximum Subarray (Kadane's Algorithm)

```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
```

**Time:** O(n) | **Space:** O(1)

### 3. Partition Equal Subset Sum

```javascript
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}

console.log(canPartition([1, 5, 11, 5])); // true
```

**Time:** O(n × sum) | **Space:** O(sum)

### 4. Word Break

```javascript
function wordBreak(s, wordDict) {
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    const wordSet = new Set(wordDict);

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

console.log(wordBreak("leetcode", ["leet", "code"])); // true
```

**Time:** O(n² × m) where m = avg word length | **Space:** O(n)

### 5. Longest Palindromic Substring

```javascript
function longestPalindrome(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(false));
    let start = 0, maxLen = 1;

    // Single character
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // Two characters
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }

    // Three or more characters
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }

    return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad")); // "bab" or "aba"
```

**Time:** O(n²) | **Space:** O(n²)

### 6. Decode Ways

```javascript
function numDecodings(s) {
    if (s[0] === '0') return 0;

    const n = s.length;
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(s.slice(i - 1, i));
        const twoDigits = parseInt(s.slice(i - 2, i));

        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }

        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
}

console.log(numDecodings("226")); // 3
```

**Time:** O(n) | **Space:** O(n)

### 7. Unique Binary Search Trees

```javascript
function numTrees(n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let nodes = 2; nodes <= n; nodes++) {
        for (let root = 1; root <= nodes; root++) {
            const left = root - 1;
            const right = nodes - root;
            dp[nodes] += dp[left] * dp[right];
        }
    }

    return dp[n];
}

console.log(numTrees(3)); // 5
```

**Time:** O(n²) | **Space:** O(n)

### 8. Maximum Product Subarray

```javascript
function maxProduct(nums) {
    let maxProd = nums[0];
    let currentMax = nums[0];
    let currentMin = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];

        if (num < 0) {
            [currentMax, currentMin] = [currentMin, currentMax];
        }

        currentMax = Math.max(num, currentMax * num);
        currentMin = Math.min(num, currentMin * num);

        maxProd = Math.max(maxProd, currentMax);
    }

    return maxProd;
}

console.log(maxProduct([2, 3, -2, 4])); // 6
```

**Time:** O(n) | **Space:** O(1)

---

## Practice Problems

### Easy
1. Climbing Stairs
2. Min Cost Climbing Stairs
3. House Robber
4. Maximum Subarray
5. Pascal's Triangle

### Medium
6. Coin Change
7. Longest Increasing Subsequence
8. Unique Paths
9. Word Break
10. Decode Ways
11. Partition Equal Subset Sum
12. Longest Palindromic Substring
13. Maximum Product Subarray
14. Jump Game

### Hard
15. Edit Distance
16. Regular Expression Matching
17. Longest Common Subsequence
18. Interleaving String
19. Distinct Subsequences
20. Burst Balloons

---

## Interview Tips

### DP Problem Identification

Look for these keywords:
- **Optimization**: "minimum", "maximum", "longest", "shortest"
- **Counting**: "count ways", "number of ways"
- **Decision**: "can you", "is it possible"
- **Subsequence/Substring**: "longest", "common"

### Step-by-Step Approach

1. **Identify if DP applies**
   - Overlapping subproblems?
   - Optimal substructure?

2. **Define state**
   - What parameters define subproblem?
   - `dp[i]` = answer for first i elements

3. **Find recurrence relation**
   - How to compute `dp[i]` from smaller subproblems?

4. **Define base cases**
   - What are the simplest subproblems?

5. **Choose implementation**
   - Memoization (top-down) or Tabulation (bottom-up)?

6. **Optimize space**
   - Can we reduce dimensions?

### Common Patterns

| Pattern | Example | State Definition |
|---------|---------|------------------|
| Linear DP | Climbing Stairs | `dp[i]` = ways to reach step i |
| 2D Grid | Unique Paths | `dp[i][j]` = ways to reach (i,j) |
| Subsequence | LCS | `dp[i][j]` = LCS of first i and j chars |
| Knapsack | Subset Sum | `dp[i][w]` = can make weight w with first i items |

---

## Complexity Cheat Sheet

```
1D DP:          O(n) time, O(n) space
2D DP:          O(n²) time, O(n²) space
Knapsack:       O(n × capacity) time/space
LCS:            O(m × n) time/space
LIS:            O(n²) or O(n log n) time

Space Optimization:
- Often reduce to O(1) or O(n) from O(n²)
- Keep only previous row/column
```

---

## Quick Reference

```javascript
// Memoization Template
function dpMemo(input, memo = {}) {
    if (input in memo) return memo[input];
    if (baseCase) return baseValue;

    memo[input] = // compute using recursive calls
    return memo[input];
}

// Tabulation Template
function dpTab(n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = baseValue;

    for (let i = 1; i <= n; i++) {
        dp[i] = // compute using dp[i-1], dp[i-2], etc.
    }

    return dp[n];
}

// 2D DP Template
function dp2D(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(0));

    // Initialize base cases
    for (let i = 0; i < m; i++) dp[i][0] = baseValue;
    for (let j = 0; j < n; j++) dp[0][j] = baseValue;

    // Fill table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = // compute
        }
    }

    return dp[m-1][n-1];
}
```

---

**Dynamic Programming: Remember the past to optimize the future!** 🧠
