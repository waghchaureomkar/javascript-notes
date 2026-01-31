/**
 * DEBOUNCING & THROTTLING - Working Implementations
 * Run: node 07-interview-prep/debouncing-throttling/index.js
 */

console.log("=== DEBOUNCING & THROTTLING ===\n");

// ============================================
// 1. BASIC DEBOUNCE IMPLEMENTATION
// ============================================

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        // Clear previous timer
        clearTimeout(timeoutId);

        // Set new timer
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ============================================
// 2. BASIC THROTTLE IMPLEMENTATION
// ============================================

function throttle(func, limit) {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// ============================================
// 3. ADVANCED DEBOUNCE (with leading/trailing)
// ============================================

function debounceAdvanced(func, delay, options = {}) {
    let timeoutId;
    const { leading = false, trailing = true } = options;

    return function (...args) {
        const callNow = leading && !timeoutId;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (trailing) {
                func.apply(this, args);
            }
        }, delay);

        if (callNow) {
            func.apply(this, args);
        }
    };
}

// ============================================
// 4. ADVANCED THROTTLE (with leading/trailing)
// ============================================

function throttleAdvanced(func, limit, options = {}) {
    let inThrottle, lastFunc, lastTime;
    const { leading = true, trailing = true } = options;

    return function (...args) {
        if (!inThrottle) {
            if (leading) {
                func.apply(this, args);
            }
            inThrottle = true;
            lastTime = Date.now();

            setTimeout(() => {
                inThrottle = false;
                if (trailing && lastFunc) {
                    func.apply(this, lastFunc.args);
                    lastFunc = null;
                }
            }, limit);
        } else {
            lastFunc = { args };
        }
    };
}

// ============================================
// 5. DEBOUNCE WITH CANCEL & FLUSH
// ============================================

function debounceWithControls(func, delay) {
    let timeoutId;

    const debounced = function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };

    // Cancel pending execution
    debounced.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
    };

    // Execute immediately
    debounced.flush = function (...args) {
        clearTimeout(timeoutId);
        func.apply(this, args);
    };

    return debounced;
}

// ============================================
// EXAMPLES & DEMONSTRATIONS
// ============================================

console.log("--- Example 1: Basic Debounce ---");

let searchCount = 0;
function search(query) {
    searchCount++;
    console.log(`Search #${searchCount}: "${query}"`);
}

const debouncedSearch = debounce(search, 300);

// Simulate rapid typing
console.log("Simulating typing 'JavaScript'...");
"JavaScript".split("").forEach((char, i) => {
    setTimeout(() => debouncedSearch("JavaScript".slice(0, i + 1)), i * 50);
});

// Wait and show result
setTimeout(() => {
    console.log(`\nTotal searches made: ${searchCount}`);
    console.log(
        "Without debounce, it would be 10 searches (one per character)\n"
    );
}, 2000);

// ============================================

setTimeout(() => {
    console.log("\n--- Example 2: Basic Throttle ---");

    let scrollCount = 0;
    function handleScroll(position) {
        scrollCount++;
        console.log(`Scroll #${scrollCount}: position ${position}`);
    }

    const throttledScroll = throttle(handleScroll, 500);

    // Simulate continuous scrolling
    console.log("Simulating continuous scrolling...");
    for (let i = 0; i < 20; i++) {
        setTimeout(() => throttledScroll(i * 10), i * 100);
    }

    setTimeout(() => {
        console.log(`\nTotal scroll handlers executed: ${scrollCount}`);
        console.log(
            "Without throttle, it would be 20 executions\n"
        );
    }, 2500);
}, 3000);

// ============================================

setTimeout(() => {
    console.log("\n--- Example 3: Debounce with Leading Edge ---");

    let clickCount = 0;
    function handleClick() {
        clickCount++;
        console.log(`Click #${clickCount} handled`);
    }

    const debouncedClick = debounceAdvanced(handleClick, 500, {
        leading: true,
        trailing: false,
    });

    // Simulate rapid clicks
    console.log("Simulating rapid clicks...");
    debouncedClick(); // Executes immediately (leading)
    setTimeout(() => debouncedClick(), 100); // Ignored
    setTimeout(() => debouncedClick(), 200); // Ignored
    setTimeout(() => debouncedClick(), 300); // Ignored

    setTimeout(() => {
        console.log("\n--- Example 4: Cancel & Flush ---");

        let saveCount = 0;
        function save(data) {
            saveCount++;
            console.log(`Save #${saveCount}: "${data}"`);
        }

        const debouncedSave = debounceWithControls(save, 1000);

        console.log("Typing 'Hello'...");
        debouncedSave("H");
        setTimeout(() => debouncedSave("He"), 200);
        setTimeout(() => debouncedSave("Hel"), 400);

        // Cancel the save
        setTimeout(() => {
            console.log("Cancelling save...");
            debouncedSave.cancel();
        }, 600);

        // Start new save
        setTimeout(() => {
            console.log("Typing 'World'...");
            debouncedSave("W");
        }, 800);

        setTimeout(() => debouncedSave("Wo"), 1000);

        // Flush immediately
        setTimeout(() => {
            console.log("Flushing immediately...");
            debouncedSave.flush("World!");
        }, 1200);
    }, 1000);
}, 6000);

// ============================================

setTimeout(() => {
    console.log("\n\n--- Example 5: Practical Use Case - Form Validation ---");

    class FormValidator {
        constructor() {
            this.validationCount = 0;
        }

        validateEmail(email) {
            this.validationCount++;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            console.log(
                `Validation #${this.validationCount}: "${email}" - ${
                    isValid ? "✓ Valid" : "✗ Invalid"
                }`
            );
            return isValid;
        }
    }

    const validator = new FormValidator();

    // Create debounced validation
    const debouncedValidate = debounce(
        validator.validateEmail.bind(validator),
        500
    );

    // Simulate user typing email
    console.log("User typing email...");
    const typingSequence = [
        "j",
        "jo",
        "joh",
        "john",
        "john@",
        "john@e",
        "john@ex",
        "john@exa",
        "john@exam",
        "john@examp",
        "john@exampl",
        "john@example",
        "john@example.",
        "john@example.c",
        "john@example.co",
        "john@example.com",
    ];

    typingSequence.forEach((partial, i) => {
        setTimeout(() => debouncedValidate(partial), i * 100);
    });

    setTimeout(() => {
        console.log(
            `\nValidations performed: ${validator.validationCount}`
        );
        console.log(
            `Without debounce: ${typingSequence.length} validations`
        );
        console.log("Performance improvement: ~94%");
    }, 2500);
}, 10000);

// ============================================

setTimeout(() => {
    console.log(
        "\n\n--- Example 6: Throttle vs Debounce Comparison ---"
    );

    let throttleCount = 0;
    let debounceCount = 0;

    function handleEvent(type) {
        if (type === "throttle") {
            throttleCount++;
            console.log(`Throttle executed: ${throttleCount}`);
        } else {
            debounceCount++;
            console.log(`Debounce executed: ${debounceCount}`);
        }
    }

    const throttledHandler = throttle(() => handleEvent("throttle"), 500);
    const debouncedHandler = debounce(() => handleEvent("debounce"), 500);

    console.log("Triggering events continuously for 2 seconds...\n");

    // Continuous events for 2 seconds
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            throttledHandler();
            debouncedHandler();
        }, i * 100);
    }

    setTimeout(() => {
        console.log("\n=== RESULTS ===");
        console.log(`Throttle: ${throttleCount} executions (regular intervals)`);
        console.log(`Debounce: ${debounceCount} execution(s) (after events stop)`);
        console.log("\nThrottle: Good for continuous updates (scroll, mouse move)");
        console.log("Debounce: Good for waiting until user finishes (search, validation)");
    }, 2500);
}, 13000);

// ============================================

setTimeout(() => {
    console.log("\n\n--- Example 7: Context Preservation ---");

    const user = {
        name: "John",
        searchHistory: [],

        search: function (query) {
            this.searchHistory.push(query);
            console.log(`${this.name} searched for: "${query}"`);
            console.log(`Search history: [${this.searchHistory.join(", ")}]`);
        },
    };

    // Debounce preserves 'this' context
    user.debouncedSearch = debounce(user.search, 300);

    console.log("Testing context preservation...");
    user.debouncedSearch("JavaScript");

    setTimeout(() => {
        user.debouncedSearch("TypeScript");
    }, 100);

    setTimeout(() => {
        user.debouncedSearch("React");
    }, 200);

    setTimeout(() => {
        console.log("\nContext preserved correctly! ✓");
    }, 700);
}, 16000);

// ============================================

setTimeout(() => {
    console.log("\n\n=== PERFORMANCE COMPARISON ===\n");

    console.log("Scenario: API calls during typing");
    console.log("User types: 'JavaScript' (10 characters)");
    console.log("");
    console.log("Without optimization:");
    console.log("  - API calls: 10");
    console.log("  - Network requests: 10");
    console.log("  - Cost: High");
    console.log("");
    console.log("With Debounce (500ms):");
    console.log("  - API calls: 1");
    console.log("  - Network requests: 1");
    console.log("  - Savings: 90%");
    console.log("");
    console.log("With Throttle (500ms):");
    console.log("  - API calls: 2-3");
    console.log("  - Network requests: 2-3");
    console.log("  - Savings: 70-80%");

    console.log("\n\n=== KEY TAKEAWAYS ===\n");
    console.log("1. Debounce: Execute after delay, reset on each call");
    console.log("2. Throttle: Execute at most once per interval");
    console.log("3. Use debounce for search, validation, resize");
    console.log("4. Use throttle for scroll, mouse move, continuous events");
    console.log("5. Always preserve context with apply(this, args)");
    console.log("6. Add cancel/flush for advanced control");

    console.log("\n=== END OF DEMO ===\n");
}, 18000);
