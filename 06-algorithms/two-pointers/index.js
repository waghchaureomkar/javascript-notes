/**
 * TWO POINTERS TECHNIQUE
 * Use two pointers to solve problems efficiently
 * Common patterns: opposite direction, same direction, fast-slow
 */

// ===== OPPOSITE DIRECTION =====

// 1. Two Sum (Sorted Array)
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [];
}

// 2. 3Sum
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

// 3. 3Sum Closest
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

// 4. 4Sum
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

// 5. Container With Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * minHeight);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}

// 6. Trapping Rain Water
function trap(height) {
    if (!height || height.length === 0) return 0;

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

// 7. Valid Palindrome
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

// 8. Valid Palindrome II (Remove at most one char)
function validPalindrome(s) {
    function isPalindrome(left, right) {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return isPalindrome(left + 1, right) || isPalindrome(left, right - 1);
        }
        left++;
        right--;
    }

    return true;
}

// ===== SAME DIRECTION =====

// 9. Remove Duplicates from Sorted Array
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

// 10. Remove Duplicates II (at most twice)
function removeDuplicatesII(nums) {
    if (nums.length <= 2) return nums.length;

    let i = 2;

    for (let j = 2; j < nums.length; j++) {
        if (nums[j] !== nums[i - 2]) {
            nums[i] = nums[j];
            i++;
        }
    }

    return i;
}

// 11. Move Zeros
function moveZeroes(nums) {
    let nonZero = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[nonZero], nums[i]] = [nums[i], nums[nonZero]];
            nonZero++;
        }
    }

    return nums;
}

// 12. Remove Element
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

// 13. Sort Colors (Dutch National Flag)
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

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

// ===== FAST & SLOW POINTERS =====

// 14. Linked List Cycle
function hasCycle(head) {
    if (!head) return false;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true;
    }

    return false;
}

// 15. Linked List Cycle II (Find start of cycle)
function detectCycle(head) {
    if (!head) return null;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Find start of cycle
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }

    return null;
}

// 16. Find Duplicate Number (Array)
function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    slow = nums[0];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}

// 17. Happy Number
function isHappy(n) {
    function getNext(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }

    let slow = n;
    let fast = getNext(n);

    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }

    return fast === 1;
}

// 18. Middle of Linked List
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// ===== PARTITION PROBLEMS =====

// 19. Partition List
function partition(head, x) {
    const leftDummy = { next: null };
    const rightDummy = { next: null };

    let left = leftDummy;
    let right = rightDummy;
    let current = head;

    while (current) {
        if (current.val < x) {
            left.next = current;
            left = left.next;
        } else {
            right.next = current;
            right = right.next;
        }
        current = current.next;
    }

    right.next = null;
    left.next = rightDummy.next;

    return leftDummy.next;
}

// ===== MERGE PROBLEMS =====

// 20. Merge Sorted Array
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    return nums1;
}

// ===== STRING PROBLEMS =====

// 21. Reverse String
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

// 22. Reverse Vowels
function reverseVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const arr = s.split('');
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        while (left < right && !vowels.has(arr[left])) left++;
        while (left < right && !vowels.has(arr[right])) right--;

        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }

    return arr.join('');
}

// ===== TEST CASES =====
console.log('\n===== Two Pointers Tests =====\n');

console.log('Two Sum [2,7,11,15], 9:', twoSum([2, 7, 11, 15], 9)); // [0, 1]

console.log('\n3Sum [-1,0,1,2,-1,-4]:', threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1,-1,2],[-1,0,1]]

console.log('\n4Sum [1,0,-1,0,-2,2], 0:', fourSum([1, 0, -1, 0, -2, 2], 0));

console.log('\nContainer With Most Water [1,8,6,2,5,4,8,3,7]:', maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

console.log('\nTrapping Rain Water [0,1,0,2,1,0,1,3,2,1,2,1]:', trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6

console.log('\nValid Palindrome "A man, a plan, a canal: Panama":', isPalindrome('A man, a plan, a canal: Panama')); // true

console.log('\nMove Zeros [0,1,0,3,12]:', moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]

console.log('\nSort Colors [2,0,2,1,1,0]:', sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]

console.log('\nFind Duplicate [1,3,4,2,2]:', findDuplicate([1, 3, 4, 2, 2])); // 2

console.log('\nHappy Number 19:', isHappy(19)); // true

console.log('\nReverse Vowels "hello":', reverseVowels('hello')); // holle
