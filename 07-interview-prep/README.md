# JavaScript Interview Preparation 🔥

> **Master the Most Asked Interview Questions**
> Production-ready implementations of critical concepts

---

## 🎯 What's in This Section?

This section covers **critical interview topics** that are frequently asked but often not covered in basic tutorials. These are **real-world patterns** you'll encounter in production code and technical interviews.

### Why This Section?

While the previous sections (01-06) covered fundamentals, this section focuses on:
- ✅ **Practical implementations** of advanced concepts
- ✅ **Production-ready code** patterns
- ✅ **Performance optimization** techniques
- ✅ **Object manipulation** strategies
- ✅ **Tricky output questions** with explanations

---

## 📚 Topics Covered

### 1. [Debouncing & Throttling](./debouncing-throttling/README.md) 🔥🔥🔥

**Most Asked Performance Pattern**

Learn how to optimize expensive operations by controlling function execution rate.

**What You'll Learn:**
- What is Debouncing?
- What is Throttling?
- Difference between them
- Real-world use cases (search, scroll, resize)
- Implementation from scratch
- With leading/trailing edge options
- Interview questions with code

**Common Use Cases:**
- Search autocomplete
- Window resize handlers
- Scroll event optimization
- Button click prevention (form submit)
- API call rate limiting

**Interview Probability:** ⭐⭐⭐⭐⭐ (Very High)

---

### 2. [Memoization](./memoization/README.md) 🔥🔥🔥

**Performance Optimization through Caching**

Cache expensive function results to avoid redundant calculations.

**What You'll Learn:**
- What is Memoization?
- How it improves performance
- Implementing memoization function
- Memoizing recursive functions (Fibonacci, Factorial)
- Cache invalidation strategies
- LRU Cache implementation
- Trade-offs: Memory vs Speed

**Common Use Cases:**
- Expensive calculations
- Recursive algorithms
- API response caching
- React.memo and useMemo

**Interview Probability:** ⭐⭐⭐⭐ (High)

---

### 3. [Object Manipulation](./object-manipulation/README.md) 🔥🔥

**Deep Understanding of JavaScript Objects**

Master object operations that interviewers love to ask about.

**What You'll Learn:**
- **Shallow Copy vs Deep Copy**
  - Spread operator limitations
  - Object.assign() behavior
  - Deep copy implementations
  - JSON.parse/stringify pitfalls
  - structuredClone() (modern approach)
- **Object.freeze vs Object.seal**
  - Immutability patterns
  - const vs freeze
  - Nested object freezing (deep freeze)
- **Object Cloning Techniques**
  - Different methods and their trade-offs

**Interview Probability:** ⭐⭐⭐⭐ (High)

---

### 4. [Tricky Output Questions](./tricky-questions/README.md) 🔥🔥🔥

**Master the Most Common Interview Traps**

Output-based questions that test your deep understanding of JavaScript.

**Categories:**
1. **Type Coercion**
   - `== vs ===`
   - `NaN` comparisons
   - `typeof null`
   - `[] + []`, `{} + {}`
2. **Hoisting**
   - var, let, const behavior
   - Function hoisting
3. **Closures**
   - setTimeout in loops
   - IIFE patterns
4. **Event Loop**
   - Promise vs setTimeout
   - Microtask vs Macrotask
5. **this Keyword**
   - Different contexts
   - Arrow functions
6. **Scope Chain**
   - Variable shadowing
   - Lexical scope

**Interview Probability:** ⭐⭐⭐⭐⭐ (Very High)

---

## 🎓 How to Use This Section

### For Interview Preparation

1. **Start with Concepts**
   - Read the README for each topic
   - Understand the "why" before the "how"

2. **Practice Implementations**
   - Run the code in index.js files
   - Try implementing from scratch
   - Modify examples to test understanding

3. **Solve Output Questions**
   - Predict output before running code
   - Understand each step of execution
   - Learn common traps

4. **Build Mini Projects**
   - Create search with debounce
   - Build caching layer with memoization
   - Implement deep clone utility

### Study Plan

#### Week 1: Performance Patterns
- Day 1-2: Debouncing (theory + implementation)
- Day 3-4: Throttling (theory + implementation)
- Day 5: Build search autocomplete with debounce
- Day 6-7: Practice and review

#### Week 2: Optimization & Objects
- Day 1-3: Memoization (theory + implementations)
- Day 4-5: Object manipulation (copy, freeze, seal)
- Day 6-7: Build projects using learned concepts

#### Week 3: Interview Questions
- Day 1-2: Tricky output questions (type coercion, hoisting)
- Day 3-4: Event loop output questions
- Day 5-6: this keyword and closures
- Day 7: Mock interviews and practice

---

## 🚀 Quick Reference

### Debouncing
```javascript
// Execute function after delay, reset on each call
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};
```

### Throttling
```javascript
// Execute function at most once per interval
const throttle = (fn, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
```

### Memoization
```javascript
// Cache function results
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
};
```

### Deep Copy
```javascript
// Modern approach
const deepCopy = structuredClone(obj);

// Manual implementation
const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));

    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
};
```

---

## 📊 Interview Preparation Checklist

### Before the Interview

- [ ] Can implement debounce from scratch
- [ ] Can implement throttle from scratch
- [ ] Know the difference between debounce and throttle
- [ ] Can implement memoization function
- [ ] Understand shallow vs deep copy
- [ ] Know Object.freeze vs Object.seal
- [ ] Can predict output of tricky questions
- [ ] Understand Event Loop execution order
- [ ] Master `this` keyword in all contexts
- [ ] Understand closure scope chain

### Common Interview Questions

**Q1: "Implement a debounce function"**
→ See [debouncing-throttling](./debouncing-throttling/README.md)

**Q2: "What's the difference between debounce and throttle?"**
→ Debounce: Execute after delay, reset timer on each call
→ Throttle: Execute at most once per interval

**Q3: "Implement memoization for Fibonacci"**
→ See [memoization](./memoization/README.md)

**Q4: "What's the difference between shallow and deep copy?"**
→ See [object-manipulation](./object-manipulation/README.md)

**Q5: "What will this code output?"** (tricky question)
→ See [tricky-questions](./tricky-questions/README.md)

---

## 💡 Pro Tips

1. **Practice Output Questions Daily**
   - Predict before running
   - Explain why each line executes

2. **Implement from Scratch**
   - Don't just read the code
   - Type it out yourself
   - Understand each line

3. **Create Real Use Cases**
   - Build search with debounce
   - Implement cache with memoization
   - Clone complex objects

4. **Explain While Coding**
   - Practice talking through your solution
   - Explain trade-offs
   - Discuss time/space complexity

5. **Know the Edge Cases**
   - What if null/undefined passed?
   - What about nested objects?
   - How to handle errors?

---

## 🔗 Additional Resources

### Related Sections
- [01-Basics](../01-basics/README.md) - Fundamentals
- [02-Functions-Scope](../02-functions-scope/README.md) - Closures, this
- [03-Advanced](../03-advanced/README.md) - Event Loop, Promises
- [04-DOM-Browser](../04-dom-browser/README.md) - Performance, Memory

### Next Steps
1. Complete all examples in this section
2. Build mini-projects using these patterns
3. Practice on LeetCode/HackerRank
4. Do mock interviews
5. Review before each interview

---

## 🎯 Interview Success Strategy

### Before Interview (1-2 weeks)
- [ ] Study all topics in this section
- [ ] Implement each pattern from scratch
- [ ] Solve 5-10 output questions daily
- [ ] Build at least one project using these concepts

### Day Before Interview
- [ ] Review quick reference
- [ ] Practice tricky output questions
- [ ] Revise debounce/throttle implementations
- [ ] Review Event Loop execution order

### During Interview
- [ ] Think out loud
- [ ] Start with simple solution
- [ ] Discuss trade-offs
- [ ] Ask clarifying questions
- [ ] Test with examples

---

## 📝 Practice Projects

### 1. Search Autocomplete
- Implement search with debouncing
- API call optimization
- Handle race conditions

### 2. Infinite Scroll
- Use throttling for scroll events
- Load more data efficiently
- Performance monitoring

### 3. Function Cache System
- Implement memoization
- Add cache size limit (LRU)
- Cache invalidation

### 4. Deep Object Utilities
- Deep clone function
- Deep freeze function
- Deep merge function
- Deep equality check

---

**Ready to ace your JavaScript interview?** 🚀

Start with any topic above, practice implementations, and you'll be interview-ready in no time!

---

**Previous:** [Algorithms](../06-algorithms/README.md)
**Next:** Start with [Debouncing & Throttling](./debouncing-throttling/README.md)
