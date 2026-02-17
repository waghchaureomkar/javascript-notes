# Advanced CSS - Complete Guide

Master advanced CSS techniques including pseudo-classes, pseudo-elements, transforms, filters, and modern CSS features.

## Topics Covered

### 1. Pseudo-classes
Pseudo-classes select elements based on their state or position.

**User Action Pseudo-classes**:
- `:hover` - Element is being hovered
- `:active` - Element is being activated/clicked
- `:focus` - Element has focus
- `:visited` - Visited link

**Form Pseudo-classes**:
- `:enabled` / `:disabled` - Form element state
- `:checked` - Checked checkbox/radio
- `:valid` / `:invalid` - Form validation state
- `:required` / `:optional` - Form requirement

**Structural Pseudo-classes**:
- `:first-child` / `:last-child` - First/last child
- `:nth-child(n)` - Nth child element
- `:nth-of-type(n)` - Nth element of specific type
- `:only-child` - Only child element
- `:empty` - Empty element

**Other Pseudo-classes**:
- `:not(selector)` - Negation pseudo-class
- `:is(selector1, selector2)` - Matches any selector in list
- `:where(selector1, selector2)` - Like :is() but with 0 specificity
- `:has(selector)` - Parent selector (if child matches)

### 2. Pseudo-elements
Pseudo-elements style specific parts of elements.

**Common Pseudo-elements**:
- `::before` - Insert content before element
- `::after` - Insert content after element
- `::first-line` - Style first line of text
- `::first-letter` - Style first letter
- `::selection` - Style selected text
- `::placeholder` - Style input placeholder
- `::marker` - Style list item markers
- `::backdrop` - Style fullscreen backdrop

### 3. CSS Transforms
Transform elements in 2D and 3D space.

**2D Transforms**:
- `translate(x, y)` - Move element
- `rotate(deg)` - Rotate element
- `scale(x, y)` - Scale element
- `skew(x-deg, y-deg)` - Skew element
- `matrix(n, n, n, n, n, n)` - Combined transform

**3D Transforms**:
- `translateZ(z)` / `translate3d(x, y, z)`
- `rotateX(deg)` / `rotateY(deg)` / `rotateZ(deg)`
- `scaleZ(z)` / `scale3d(x, y, z)`
- `perspective(n)` - 3D perspective
- `transform-style: preserve-3d` - Preserve 3D

**Transform Properties**:
- `transform-origin` - Transform pivot point
- `backface-visibility` - Show/hide back face
- `perspective-origin` - Perspective vanishing point

### 4. CSS Filters
Apply graphical effects to elements.

**Filter Functions**:
- `blur(px)` - Gaussian blur
- `brightness(%)` - Adjust brightness
- `contrast(%)` - Adjust contrast
- `grayscale(%)` - Convert to grayscale
- `hue-rotate(deg)` - Rotate hue
- `invert(%)` - Invert colors
- `opacity(%)` - Adjust opacity
- `saturate(%)` - Adjust saturation
- `sepia(%)` - Convert to sepia
- `drop-shadow(x y blur color)` - Drop shadow

**Backdrop Filter**:
```css
backdrop-filter: blur(10px);
/* Applies filter to background behind element */
```

### 5. CSS Variables (Custom Properties)
Define reusable values.

**Defining Variables**:
```css
:root {
    --primary-color: #3498db;
    --spacing: 20px;
}
```

**Using Variables**:
```css
.element {
    color: var(--primary-color);
    padding: var(--spacing);
    /* With fallback */
    color: var(--undefined, black);
}
```

**Dynamic Variables**:
```css
/* Change variables with JavaScript */
document.documentElement.style.setProperty('--primary-color', 'red');
```

### 6. Calc() Function
Perform calculations in CSS.

**Basic Usage**:
```css
width: calc(100% - 50px);
font-size: calc(16px + 1vw);
margin: calc(10px * 2);
```

**Mixed Units**:
```css
width: calc(100% - 50px);
padding: calc(1em + 10px);
height: calc(100vh - 80px);
```

**With Variables**:
```css
width: calc(var(--base-width) * 2);
```

## Interview Questions & Answers

### Basic Questions

**1. What is the difference between pseudo-classes and pseudo-elements?**
- **Pseudo-classes**: Select elements based on state (`:hover`, `:focus`)
- **Pseudo-elements**: Style specific parts of elements (`::before`, `::after`)
- **Syntax**: Pseudo-classes use single colon `:`, pseudo-elements use double colon `::`

**2. What is the :not() pseudo-class?**
The `:not()` pseudo-class selects elements that don't match the selector:
```css
p:not(.special) { color: blue; }
/* Styles all p elements except those with class "special" */
```

**3. Explain ::before and ::after pseudo-elements.**
They insert content before or after an element's content:
```css
.element::before {
    content: "→ ";
    color: blue;
}
.element::after {
    content: " ✓";
    color: green;
}
```
Requires `content` property to work.

**4. What is the content property used for?**
Used with `::before` and `::after` to insert content:
```css
content: "text";
content: url(image.png);
content: attr(data-text);
content: counter(item);
content: "";
```

**5. What are CSS transforms?**
CSS transforms modify element's coordinate space without affecting document flow. Includes translate, rotate, scale, and skew.

**6. What is transform-origin?**
The point around which a transformation is applied:
```css
transform-origin: center; /* default */
transform-origin: top left;
transform-origin: 50px 50px;
```

**7. What are CSS filters?**
Filters apply graphical effects like blur, brightness, grayscale to elements:
```css
filter: blur(5px) brightness(120%);
```

**8. What is backdrop-filter?**
Applies filter effects to the area behind an element (glassmorphism):
```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.3);
```

**9. What are CSS custom properties (variables)?**
Variables defined in CSS that can be reused:
```css
:root { --color: blue; }
.element { color: var(--color); }
```

**10. Why use CSS variables instead of preprocessor variables?**
- Can be changed at runtime with JavaScript
- Can be scoped to specific elements
- Support cascade and inheritance
- Don't require compilation

### Intermediate Questions

**11. What is the difference between :nth-child() and :nth-of-type()?**
```css
/* :nth-child() - counts all children */
p:nth-child(2) { } /* 2nd child that is p */

/* :nth-of-type() - counts only p elements */
p:nth-of-type(2) { } /* 2nd p element */
```

**12. Explain :nth-child() patterns.**
```css
:nth-child(2n)     /* Even elements */
:nth-child(2n+1)   /* Odd elements */
:nth-child(3n)     /* Every 3rd element */
:nth-child(-n+3)   /* First 3 elements */
:nth-child(n+4)    /* Starting from 4th */
```

**13. What is the :is() pseudo-class?**
Matches any element from a list of selectors:
```css
/* Instead of */
h1:hover, h2:hover, h3:hover { }

/* Use */
:is(h1, h2, h3):hover { }
```

**14. What is the difference between :is() and :where()?**
- `:is()`: Takes highest specificity from list
- `:where()`: Always has 0 specificity

**15. What is :has() pseudo-class?**
Parent selector - selects element if it contains matching child:
```css
div:has(> p) { }  /* div that has p child */
article:has(img) { }  /* article with image */
```

**16. How do you create a triangle with ::before?**
```css
.element::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid red;
}
```

**17. What is the difference between transform and position?**
- `transform`: Doesn't affect document flow, better performance
- `position`: Affects document flow, creates stacking context

**18. What are 3D transforms?**
Transforms in 3D space:
```css
transform: rotateX(45deg);
transform: rotateY(45deg);
transform: translateZ(50px);
perspective: 1000px;
transform-style: preserve-3d;
```

**19. What is perspective in CSS?**
Distance between viewer and z=0 plane, creates 3D depth:
```css
.parent { perspective: 1000px; }
.child { transform: rotateY(45deg); }
```

**20. How do you combine multiple transforms?**
```css
transform: translate(50px, 0) rotate(45deg) scale(1.2);
/* Order matters! */
```

### Advanced Questions

**21. What is the difference between opacity and rgba transparency?**
```css
/* opacity - affects entire element including children */
.element { opacity: 0.5; }

/* rgba - only affects the specific property */
.element { background: rgba(255, 0, 0, 0.5); }
```

**22. What is filter vs backdrop-filter?**
- `filter`: Applies to element and its content
- `backdrop-filter`: Applies to background behind element

**23. How do you create glassmorphism effect?**
```css
.glass {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**24. What is the ::selection pseudo-element?**
Styles text when selected by user:
```css
::selection {
    background: blue;
    color: white;
}
```

**25. How do CSS variables inherit?**
Variables follow cascade and inheritance rules:
```css
:root { --color: blue; }
.parent { --color: red; }
.child { color: var(--color); } /* inherits red */
```

**26. Can you use calc() with CSS variables?**
Yes:
```css
:root { --base: 10px; }
.element {
    width: calc(var(--base) * 5);
    padding: calc(var(--base) + 5px);
}
```

**27. What are the limitations of calc()?**
- Cannot divide by 0
- Cannot use percentages in all contexts
- Requires spaces around + and - operators
- Cannot mix incompatible units

**28. How do you create a CSS counter?**
```css
body {
    counter-reset: section;
}

h2::before {
    counter-increment: section;
    content: "Section " counter(section) ": ";
}
```

**29. What is attr() function?**
Retrieves attribute value:
```css
a::after {
    content: " (" attr(href) ")";
}
```

**30. How do you create a tooltip with ::before/::after?**
```css
.tooltip {
    position: relative;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.tooltip:hover::after {
    opacity: 1;
}
```

## Common Use Cases

### 1. Badge with ::after
```css
.notification::after {
    content: "3";
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### 2. Clearfix with ::after
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

### 3. Icon with ::before
```css
.icon::before {
    content: "→";
    margin-right: 5px;
}
```

### 4. 3D Card Flip
```css
.card-container {
    perspective: 1000px;
}

.card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card:hover {
    transform: rotateY(180deg);
}

.card-front,
.card-back {
    backface-visibility: hidden;
}

.card-back {
    transform: rotateY(180deg);
}
```

### 5. Animated Gradient Border
```css
.gradient-border {
    position: relative;
    background: white;
    padding: 20px;
}

.gradient-border::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, blue, red);
    z-index: -1;
    border-radius: inherit;
}
```

## Best Practices

1. **Use double colon for pseudo-elements** (`::before` not `:before`)
2. **Always include content property** for ::before/::after
3. **Prefer transforms over position** for animations (better performance)
4. **Use CSS variables for theming** and repeated values
5. **Combine filters efficiently** (order matters for performance)
6. **Use calc() for responsive sizing** with mixed units
7. **Set transform-origin** before applying transforms
8. **Use backdrop-filter for glassmorphism** effects
9. **Leverage :not() to simplify selectors**
10. **Use :is() and :where() to reduce repetition**

## Browser Compatibility

- Most pseudo-classes: Excellent support
- Pseudo-elements: Excellent support
- Transforms: Excellent support
- Filters: Good support (may need prefixes)
- Backdrop-filter: Good support (Safari prefix)
- CSS Variables: Excellent support (IE11 not supported)
- :has(): Modern browsers only (2023+)

## Resources

- MDN Web Docs: Pseudo-classes and Pseudo-elements
- CSS-Tricks: Transform and Filter Guides
- Can I Use: Browser compatibility checker
- CodePen: Interactive examples

---

**Next Steps**: After mastering advanced CSS, move on to:
- CSS Layouts (Flexbox & Grid)
- Responsive Design
- CSS Animations
