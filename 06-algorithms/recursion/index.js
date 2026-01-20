/**
 * RECURSION & BACKTRACKING
 * Solving problems by breaking them into smaller subproblems
 */

// ===== BASIC RECURSION =====

// 1. Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 2. Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 3. Power
function power(base, exp) {
    if (exp === 0) return 1;
    return base * power(base, exp - 1);
}

// 4. Sum of Array
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}

// 5. Reverse String
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

// 6. Is Palindrome
function isPalindrome(str) {
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
}

// ===== BACKTRACKING PROBLEMS =====

// 1. Generate Parentheses
function generateParenthesis(n) {
    const result = [];

    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }

        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

// 2. Letter Combinations of Phone Number
function letterCombinations(digits) {
    if (!digits) return [];

    const map = {
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

        const letters = map[digits[index]];

        for (let letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }

    backtrack(0, '');
    return result;
}

// 3. Permutations
function permute(nums) {
    const result = [];

    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            backtrack(current, newRemaining);
            current.pop();
        }
    }

    backtrack([], nums);
    return result;
}

// 4. Permutations II (with duplicates)
function permuteUnique(nums) {
    const result = [];
    nums.sort((a, b) => a - b);

    function backtrack(current, used) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            current.push(nums[i]);
            used[i] = true;
            backtrack(current, used);
            current.pop();
            used[i] = false;
        }
    }

    backtrack([], []);
    return result;
}

// 5. Subsets
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

// 6. Subsets II (with duplicates)
function subsetsWithDup(nums) {
    const result = [];
    nums.sort((a, b) => a - b);

    function backtrack(start, current) {
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;

            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// 7. Combination Sum
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, current, sum) {
        if (sum === target) {
            result.push([...current]);
            return;
        }

        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, sum + candidates[i]); // i not i+1 because can reuse
            current.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}

// 8. Combination Sum II (no reuse)
function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);

    function backtrack(start, current, sum) {
        if (sum === target) {
            result.push([...current]);
            return;
        }

        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            current.push(candidates[i]);
            backtrack(i + 1, current, sum + candidates[i]);
            current.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}

// 9. Palindrome Partitioning
function partition(s) {
    const result = [];

    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }

        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop();
            }
        }
    }

    backtrack(0, []);
    return result;
}

// 10. N-Queens
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(0).map(() => Array(n).fill('.'));

    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check diagonal (top-left)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check diagonal (top-right)
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
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }

    backtrack(0);
    return result;
}

// 11. Sudoku Solver
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
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }

        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = '1'; num <= '9'; num++) {
                        if (isValid(row, col, num)) {
                            board[row][col] = num;

                            if (solve()) return true;

                            board[row][col] = '.';
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }

    solve();
    return board;
}

// 12. Word Search
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
        board[row][col] = '#'; // Mark as visited

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

// 13. Word Search II
function findWords(board, words) {
    const result = new Set();
    const rows = board.length;
    const cols = board[0].length;

    // Build Trie
    const trie = {};
    for (let word of words) {
        let node = trie;
        for (let char of word) {
            if (!node[char]) node[char] = {};
            node = node[char];
        }
        node.word = word;
    }

    function backtrack(row, col, node) {
        if (node.word) {
            result.add(node.word);
        }

        if (row < 0 || row >= rows || col < 0 || col >= cols) return;

        const char = board[row][col];
        if (!node[char]) return;

        board[row][col] = '#';

        backtrack(row + 1, col, node[char]);
        backtrack(row - 1, col, node[char]);
        backtrack(row, col + 1, node[char]);
        backtrack(row, col - 1, node[char]);

        board[row][col] = char;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            backtrack(i, j, trie);
        }
    }

    return Array.from(result);
}

// ===== DIVIDE AND CONQUER =====

// 1. Merge Sort (already in sorting)

// 2. Quick Sort (already in sorting)

// 3. Binary Search (already in searching)

// 4. Maximum Subarray (Divide & Conquer)
function maxSubArray(nums) {
    function divideAndConquer(left, right) {
        if (left === right) return nums[left];

        const mid = Math.floor((left + right) / 2);

        const leftMax = divideAndConquer(left, mid);
        const rightMax = divideAndConquer(mid + 1, right);

        // Cross max
        let leftSum = -Infinity;
        let sum = 0;
        for (let i = mid; i >= left; i--) {
            sum += nums[i];
            leftSum = Math.max(leftSum, sum);
        }

        let rightSum = -Infinity;
        sum = 0;
        for (let i = mid + 1; i <= right; i++) {
            sum += nums[i];
            rightSum = Math.max(rightSum, sum);
        }

        const crossMax = leftSum + rightSum;

        return Math.max(leftMax, rightMax, crossMax);
    }

    return divideAndConquer(0, nums.length - 1);
}

// ===== TEST CASES =====
console.log('\n===== Recursion & Backtracking Tests =====\n');

console.log('Factorial(5):', factorial(5)); // 120
console.log('Fibonacci(7):', fibonacci(7)); // 13
console.log('Power(2, 5):', power(2, 5)); // 32

console.log('\nGenerate Parentheses(3):', generateParenthesis(3));
// ['((()))', '(()())', '(())()', '()(())', '()()()']

console.log('\nPermutations([1,2,3]):', permute([1, 2, 3]));

console.log('\nSubsets([1,2,3]):', subsets([1, 2, 3]));

console.log('\nCombination Sum([2,3,6,7], 7):', combinationSum([2, 3, 6, 7], 7));
// [[2,2,3], [7]]

console.log('\nN-Queens(4):', solveNQueens(4));

const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];
console.log('\nWord Search "ABCCED":', exist(board, 'ABCCED')); // true
console.log('Word Search "SEE":', exist(board, 'SEE')); // true
console.log('Word Search "ABCB":', exist(board, 'ABCB')); // false
