# Recursion - Complete Guide

> **Divide and Conquer**
> A function that calls itself to solve smaller subproblems

---

## Table of Contents

1. [Recursion Basics](#recursion-basics)
2. [How Recursion Works](#how-recursion-works)
3. [Types of Recursion](#types-of-recursion)
4. [Backtracking](#backtracking)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Recursion Basics

### What is Recursion?

A function that **calls itself** to solve a problem by breaking it into smaller subproblems.

```javascript
function countdown(n) {
    if (n <= 0) {  // Base case
        console.log("Done!");
        return;
    }
    console.log(n);
    countdown(n - 1);  // Recursive call
}

countdown(5);
// Output: 5, 4, 3, 2, 1, Done!
```

### Two Essential Parts

1. **Base Case**: Condition to stop recursion
2. **Recursive Case**: Function calls itself with smaller input

**Without base case = Stack Overflow!**

---

## How Recursion Works

### Call Stack

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

factorial(4);

// Call Stack:
// factorial(4) → 4 * factorial(3)
//   factorial(3) → 3 * factorial(2)
//     factorial(2) → 2 * factorial(1)
//       factorial(1) → 1 (base case)
//     factorial(2) → 2 * 1 = 2
//   factorial(3) → 3 * 2 = 6
// factorial(4) → 4 * 6 = 24
```

### Recursion vs Iteration

| Recursion | Iteration |
|-----------|-----------|
| Function calls itself | Loop repeats |
| Uses call stack | Uses loop variables |
| More memory | Less memory |
| Elegant for trees/graphs | Faster for simple loops |

---

## Types of Recursion

### 1. Linear Recursion

Single recursive call per function.

```javascript
// Sum of first n numbers
function sum(n) {
    if (n <= 0) return 0;
    return n + sum(n - 1);
}

console.log(sum(5)); // 15
```

**Time:** O(n) | **Space:** O(n)

### 2. Tail Recursion

Recursive call is the **last operation**.

```javascript
// Tail recursive factorial
function factorialTail(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);
}

console.log(factorialTail(5)); // 120
```

**Benefit:** Can be optimized to O(1) space by compilers

### 3. Binary Recursion

Two recursive calls per function.

```javascript
// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8
```

**Time:** O(2^n) | **Space:** O(n)

**Optimized with memoization:**

```javascript
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;

    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

console.log(fibMemo(50)); // Fast!
```

**Time:** O(n) | **Space:** O(n)

### 4. Multiple Recursion

More than two recursive calls.

```javascript
// Tower of Hanoi
function towerOfHanoi(n, from, to, aux) {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
        return;
    }

    towerOfHanoi(n - 1, from, aux, to);
    console.log(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from);
}

towerOfHanoi(3, 'A', 'C', 'B');
```

**Time:** O(2^n) | **Space:** O(n)

---

## Backtracking

### What is Backtracking?

Recursively **try all possibilities**, backtrack when invalid.

**Pattern:**
1. Make a choice
2. Recurse
3. Undo the choice (backtrack)

### Template

```javascript
function backtrack(state, choices) {
    if (isValid(state)) {
        addToResult(state);
        return;
    }

    for (let choice of choices) {
        // Make choice
        state.add(choice);

        // Recurse
        backtrack(state, nextChoices);

        // Undo choice (backtrack)
        state.remove(choice);
    }
}
```

---

## Top Interview Problems

### 1. Power Function

```javascript
function power(base, exp) {
    if (exp === 0) return 1;
    if (exp === 1) return base;

    if (exp % 2 === 0) {
        const half = power(base, exp / 2);
        return half * half;
    } else {
        return base * power(base, exp - 1);
    }
}

console.log(power(2, 10)); // 1024
```

**Time:** O(log n) | **Space:** O(log n)

### 2. Reverse String

```javascript
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("hello")); // "olleh"
```

**Time:** O(n) | **Space:** O(n)

### 3. Palindrome Check

```javascript
function isPalindrome(str, left = 0, right = str.length - 1) {
    if (left >= right) return true;
    if (str[left] !== str[right]) return false;
    return isPalindrome(str, left + 1, right - 1);
}

console.log(isPalindrome("racecar")); // true
```

**Time:** O(n) | **Space:** O(n)

### 4. Permutations

```javascript
function permute(nums) {
    const result = [];

    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let num of nums) {
            if (current.includes(num)) continue;

            current.push(num);
            backtrack(current);
            current.pop();
        }
    }

    backtrack([]);
    return result;
}

console.log(permute([1, 2, 3]));
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

**Time:** O(n! × n) | **Space:** O(n)

### 5. Subsets

```javascript
function subsets(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

console.log(subsets([1, 2, 3]));
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

**Time:** O(2^n × n) | **Space:** O(n)

### 6. Combinations

```javascript
function combine(n, k) {
    const result = [];

    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }

        for (let i = start; i <= n; i++) {
            current.push(i);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(1, []);
    return result;
}

console.log(combine(4, 2));
// [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
```

**Time:** O(C(n,k) × k) | **Space:** O(k)

### 7. Letter Combinations of Phone Number

```javascript
function letterCombinations(digits) {
    if (!digits) return [];

    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        const letters = phone[digits[index]];
        for (let letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }

    backtrack(0, '');
    return result;
}

console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Time:** O(4^n) | **Space:** O(n)

### 8. N-Queens

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check anti-diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (!isValid(row, col)) continue;

            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
        }
    }

    backtrack(0);
    return result;
}

console.log(solveNQueens(4));
// [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
```

**Time:** O(n!) | **Space:** O(n²)

### 9. Sudoku Solver

```javascript
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== '.') continue;

                for (let num = 1; num <= 9; num++) {
                    const char = String(num);

                    if (!isValid(row, col, char)) continue;

                    board[row][col] = char;

                    if (solve()) return true;

                    board[row][col] = '.';
                }

                return false;
            }
        }

        return true;
    }

    solve();
    return board;
}
```

**Time:** O(9^(n²)) | **Space:** O(n²)

### 10. Word Search

```javascript
function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function backtrack(row, col, index) {
        if (index === word.length) return true;

        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }

        const temp = board[row][col];
        board[row][col] = '#'; // Mark visited

        const found = backtrack(row + 1, col, index + 1) ||
                      backtrack(row - 1, col, index + 1) ||
                      backtrack(row, col + 1, index + 1) ||
                      backtrack(row, col - 1, index + 1);

        board[row][col] = temp; // Restore

        return found;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

**Time:** O(m × n × 4^L) where L = word length | **Space:** O(L)

---

## Practice Problems

### Easy
1. Factorial
2. Fibonacci
3. Sum of Digits
4. Reverse String
5. Power of N

### Medium
6. Permutations
7. Subsets
8. Combinations
9. Letter Combinations
10. Generate Parentheses

### Hard
11. N-Queens
12. Sudoku Solver
13. Word Search II
14. Regular Expression Matching
15. Wildcard Matching

---

## Interview Tips

### When to Use Recursion?

✅ **Tree/Graph traversal** - Natural fit
✅ **Divide and conquer** - Merge sort, quick sort
✅ **Backtracking** - Permutations, combinations
✅ **Mathematical** - Factorial, Fibonacci
✅ **String manipulation** - Reverse, palindrome

### Common Mistakes

❌ **No base case** - Stack overflow
❌ **Wrong base case** - Infinite recursion
❌ **Not returning value** - Undefined results
❌ **Modifying global state** - Side effects

### Optimization Tips

1. **Memoization**: Cache results
2. **Tail recursion**: Last operation is recursive call
3. **Iterative conversion**: Use stack for iteration
4. **Pruning**: Skip invalid branches early

### Recursion Checklist

```javascript
// 1. Define base case
if (baseCondition) return baseValue;

// 2. Make problem smaller
const smallerProblem = reduceInput(input);

// 3. Recursive call
const result = recursiveFunction(smallerProblem);

// 4. Combine results
return combineResults(result);
```

---

## Complexity Cheat Sheet

```
Linear Recursion:     O(n) time, O(n) space
Binary Recursion:     O(2^n) time, O(n) space
Tail Recursion:       O(n) time, O(1) space (optimized)
Backtracking:         O(b^d) where b=branches, d=depth
Memoized Recursion:   O(n) time, O(n) space
```

---

## Quick Reference

```javascript
// Basic Recursion Template
function recursive(input) {
    // Base case
    if (baseCondition) return baseValue;

    // Recursive case
    return recursive(smallerInput);
}

// Backtracking Template
function backtrack(state, choices) {
    if (isComplete(state)) {
        addToResult(state);
        return;
    }

    for (let choice of choices) {
        // Make choice
        state.add(choice);

        // Recurse
        backtrack(state, nextChoices);

        // Undo choice
        state.remove(choice);
    }
}

// Memoization Template
function memoized(input, memo = {}) {
    if (input in memo) return memo[input];
    if (baseCondition) return baseValue;

    memo[input] = memoized(smallerInput, memo);
    return memo[input];
}
```

---

**Master recursion by thinking smaller!** 🔄
