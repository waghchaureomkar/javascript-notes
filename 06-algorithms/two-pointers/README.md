# Two Pointers - Complete Guide

> **Efficient Array/String Traversal**
> Use two indices to solve problems in linear time

---

## Table of Contents

1. [Two Pointers Basics](#two-pointers-basics)
2. [Common Patterns](#common-patterns)
3. [Two Pointers Techniques](#two-pointers-techniques)
4. [Top Interview Problems](#top-interview-problems)
5. [Practice Problems](#practice-problems)

---

## Two Pointers Basics

### What is Two Pointers?

A technique that uses **two indices** to traverse arrays or strings efficiently.

**Benefits:**
- Reduces O(n²) to O(n)
- Saves space
- Clean, readable code

### Types of Two Pointers

1. **Opposite Direction**: Start from both ends
2. **Same Direction**: Both move forward
3. **Fast-Slow**: Different speeds (Floyd's algorithm)

---

## Common Patterns

### 1. Opposite Direction (Converging)

Pointers move toward each other.

```javascript
// Two Sum II (Sorted Array)
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [-1, -1];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [1, 2]
```

**Time:** O(n) | **Space:** O(1)

**When to use:**
- Sorted array problems
- Palindrome checks
- Pair sum problems

### 2. Same Direction (Sliding Window)

Both pointers move forward, expand window.

```javascript
// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let i = 0; // Slow pointer

    for (let j = 1; j < nums.length; j++) { // Fast pointer
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
}

const arr = [1, 1, 2, 2, 3];
console.log(removeDuplicates(arr)); // 3
console.log(arr); // [1, 2, 3, ...]
```

**Time:** O(n) | **Space:** O(1)

**When to use:**
- Remove duplicates
- Partition problems
- Merge operations

### 3. Fast-Slow Pointers (Floyd's Algorithm)

One pointer moves faster than the other.

```javascript
// Detect Cycle in Linked List
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}
```

**Time:** O(n) | **Space:** O(1)

**When to use:**
- Linked list cycle detection
- Find middle of linked list
- Palindrome linked list

---

## Two Pointers Techniques

### 1. Valid Palindrome

```javascript
function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
```

**Time:** O(n) | **Space:** O(n)

### 2. Reverse String

```javascript
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }

    return s;
}

console.log(reverseString(['h', 'e', 'l', 'l', 'o']));
// ['o', 'l', 'l', 'e', 'h']
```

**Time:** O(n) | **Space:** O(1)

### 3. Container With Most Water

```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
```

**Time:** O(n) | **Space:** O(1)

### 4. Trapping Rain Water

```javascript
function trap(height) {
    if (height.length === 0) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
```

**Time:** O(n) | **Space:** O(1)

---

## Top Interview Problems

### 1. Three Sum

```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]
```

**Time:** O(n²) | **Space:** O(1)

### 2. Three Sum Closest

```javascript
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = Infinity;

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }

            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                return sum;
            }
        }
    }

    return closest;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1)); // 2
```

**Time:** O(n²) | **Space:** O(1)

### 3. Four Sum

```javascript
function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let left = j + 1;
            let right = nums.length - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
// [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

**Time:** O(n³) | **Space:** O(1)

### 4. Sort Colors (Dutch National Flag)

```javascript
function sortColors(nums) {
    let left = 0;
    let mid = 0;
    let right = nums.length - 1;

    while (mid <= right) {
        if (nums[mid] === 0) {
            [nums[left], nums[mid]] = [nums[mid], nums[left]];
            left++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[right]] = [nums[right], nums[mid]];
            right--;
        }
    }

    return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
```

**Time:** O(n) | **Space:** O(1)

### 5. Move Zeroes

```javascript
function moveZeroes(nums) {
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
    }

    return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

**Time:** O(n) | **Space:** O(1)

### 6. Remove Element

```javascript
function removeElement(nums, val) {
    let i = 0;

    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[i] = nums[j];
            i++;
        }
    }

    return i;
}

const arr = [3, 2, 2, 3];
console.log(removeElement(arr, 3)); // 2
console.log(arr); // [2, 2, ...]
```

**Time:** O(n) | **Space:** O(1)

### 7. Linked List Cycle II (Find Start)

```javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;

    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Find start of cycle
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }

    return null;
}
```

**Time:** O(n) | **Space:** O(1)

### 8. Middle of Linked List

```javascript
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}
```

**Time:** O(n) | **Space:** O(1)

### 9. Palindrome Linked List

```javascript
function isPalindromeList(head) {
    // Find middle
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let prev = null;
    while (slow) {
        const next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }

    // Compare
    let left = head;
    let right = prev;

    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}
```

**Time:** O(n) | **Space:** O(1)

### 10. Merge Sorted Array

```javascript
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }

    return nums1;
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
// [1, 2, 2, 3, 5, 6]
```

**Time:** O(m + n) | **Space:** O(1)

---

## Practice Problems

### Easy
1. Two Sum II
2. Valid Palindrome
3. Remove Duplicates from Sorted Array
4. Move Zeroes
5. Reverse String

### Medium
6. Three Sum
7. Container With Most Water
8. Sort Colors
9. Find Middle of Linked List
10. Remove Nth Node From End
11. Linked List Cycle II
12. Three Sum Closest
13. Partition List

### Hard
14. Trapping Rain Water
15. Four Sum
16. Minimum Window Substring
17. Palindrome Linked List
18. Merge K Sorted Lists

---

## Interview Tips

### When to Use Two Pointers?

✅ **Sorted array** - Looking for pairs/triplets
✅ **Palindrome** - Check from both ends
✅ **Linked list** - Fast-slow for cycle, middle
✅ **Merge** - Combining sorted arrays
✅ **Partition** - Dutch flag, sort colors

### Choosing Pointer Strategy

| Problem Type | Strategy |
|--------------|----------|
| Pair sum | Opposite direction |
| Remove duplicates | Same direction |
| Cycle detection | Fast-slow |
| Merge arrays | Two arrays, one index each |
| Partition | Three pointers |

### Common Patterns

```javascript
// Pattern 1: Opposite Direction
let left = 0, right = n - 1;
while (left < right) {
    // Compare and move
}

// Pattern 2: Same Direction
let slow = 0;
for (let fast = 0; fast < n; fast++) {
    // Process and move slow conditionally
}

// Pattern 3: Fast-Slow
let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
```

### Edge Cases

```javascript
// Always test:
- Empty array/list
- Single element
- Two elements
- All same elements
- Already sorted
- Reverse sorted
- Duplicates
```

---

## Complexity Cheat Sheet

```
Two Sum (sorted):     O(n) time, O(1) space
Three Sum:            O(n²) time, O(1) space
Four Sum:             O(n³) time, O(1) space
Remove Duplicates:    O(n) time, O(1) space
Fast-Slow:            O(n) time, O(1) space
Merge:                O(n) time, O(1) space

Most two pointer problems: O(n) or O(n²) time, O(1) space
```

---

## Quick Reference

```javascript
// Opposite Direction Template
function oppositePointers(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // Check condition
        if (condition) {
            // Found answer
            return;
        } else if (needMoveLeft) {
            left++;
        } else {
            right--;
        }
    }
}

// Same Direction Template
function sameDirection(arr) {
    let slow = 0;

    for (let fast = 0; fast < arr.length; fast++) {
        if (condition) {
            arr[slow] = arr[fast];
            slow++;
        }
    }

    return slow;
}

// Fast-Slow Template
function fastSlow(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Cycle detected
            return true;
        }
    }

    return false;
}

// Three Pointers Template
function threePointers(arr, target) {
    arr.sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];
            // Process sum
        }
    }
}
```

---

**Two pointers: Double the pointers, half the time!** ⚡
