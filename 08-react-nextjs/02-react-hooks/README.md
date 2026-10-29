1| # React Hooks - Complete Guide 🪝
2| 
3| > **Most Important Topic for React Interviews**
4| > Master all hooks from basics to advanced patterns
5| 
6| **Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)
7| 
8| ---
9| 
10| ## 📚 Table of Contents
11| 
12| 1. [What are Hooks?](#what-are-hooks)
13| 2. [Basic Hooks](#basic-hooks)
14|    - [useState](#usestate)
15|    - [useEffect](#useeffect)
16|    - [useContext](#usecontext)
17| 3. [Additional Hooks](#additional-hooks)
18|    - [useReducer](#usereducer)
19|    - [useQuery](#usequery)
20|    - [useCallback](#usecallback)
21|    - [useMemo](#usememo)
22|    - [useRef](#useref)
23|    - [useImperativeHandle](#useimperativehandle)
24|    - [useLayoutEffect](#uselayouteffect)
25|    - [useDebugValue](#usedebugvalue)
26| 4. [React 18+ Hooks](#react-18-hooks)
27|    - [useId](#useid)
28|    - [useTransition](#usetransition)
29|    - [useDeferredValue](#usedeferredvalue)
30|    - [useSyncExternalStore](#usesyncexternalstore)
31|    - [useInsertionEffect](#useinsertioneffect)
32| 5. [Custom Hooks](#custom-hooks)
33| 6. [Rules of Hooks](#rules-of-hooks)
34| 7. [Common Patterns](#common-patterns)
35| 8. [Interview Questions](#interview-questions)
36| 
37| ---
38| 
39| ## What are Hooks?
40| 
41| **Hooks** are functions that let you "hook into" React state and lifecycle features from function components.
42| 
43| ### Why Hooks?
44| 
45| **Before Hooks (Class Components):**
46| ```jsx
47| class Counter extends React.Component {
48|   constructor(props) {
49|     super(props);
50|     this.state = { count: 0 };
51|   }
52| 
53|   componentDidMount() {
54|     document.title = `Count: ${this.state.count}`;
54|   }
55| 
56|   componentDidUpdate() {
57|     document.title = `Count: ${this.state.count}`;
58|   }
59| 
60|   render() {
61|     return (
62|       <button onClick={() => this.setState({ count: this.state.count + 1 })}>
63|         Count: {this.state.count}
64|       </button>
65|     );
66|   }
67| }
68| ```
69| 
70| **After Hooks (Function Components):**
71| ```jsx
72| function Counter() {
73|   const [count, setCount] = useState(0);
74| 
75|   useEffect(() => {
76|     document.title = `Count: ${count}`;
77|   }, [count]);
78| 
79|   return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
80| }
81| ```
82| 
83| ### Benefits of Hooks
84| 
85| ✅ No more confusing `this` keyword
86| ✅ Reuse stateful logic without HOCs or Render Props
87| ✅ Split code by concern, not lifecycle methods
88| ✅ Easier to test and reason about
89| ✅ Better code organization
90| 
91| ---
92| 
93| ## Basic Hooks
94| 
95| ### useState
96| 
97| **Purpose:** Add state to functional components
