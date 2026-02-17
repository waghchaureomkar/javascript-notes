# CSS Basics - Complete Guide

A comprehensive guide to CSS fundamentals with practical examples and interview preparation.

## Topics Covered

### 1. CSS Selectors
- **Element Selector**: Targets HTML elements directly
- **Class Selector**: Uses `.className` to target elements
- **ID Selector**: Uses `#idName` for unique elements
- **Universal Selector**: `*` targets all elements
- **Descendant Selector**: `parent child` targets nested elements
- **Child Selector**: `parent > child` targets direct children
- **Attribute Selector**: `[attribute]` or `[attribute="value"]`
- **Grouping Selector**: `selector1, selector2` applies same styles to multiple selectors

### 2. Box Model
The CSS box model consists of:
- **Content**: The actual content (text, images)
- **Padding**: Space between content and border
- **Border**: Line around padding
- **Margin**: Space outside the border

**Box-sizing property**:
- `content-box` (default): Width/height only includes content
- `border-box`: Width/height includes content, padding, and border

### 3. Colors
Multiple ways to specify colors:
- **Named colors**: `red`, `blue`, `tomato`
- **Hex**: `#FF5733`, `#3498db`
- **RGB**: `rgb(255, 87, 51)`
- **RGBA**: `rgba(255, 87, 51, 0.5)` - includes alpha/transparency
- **HSL**: `hsl(9, 100%, 60%)` - Hue, Saturation, Lightness
- **HSLA**: `hsla(9, 100%, 60%, 0.5)` - includes alpha

### 4. Text Styling
**Font Properties**:
- `font-family`: Specifies font
- `font-size`: Size of text
- `font-weight`: Boldness (normal, bold, 100-900)
- `font-style`: italic, normal
- `font-variant`: small-caps

**Text Properties**:
- `text-align`: left, center, right, justify
- `text-decoration`: underline, overline, line-through
- `text-transform`: uppercase, lowercase, capitalize
- `line-height`: Vertical spacing between lines
- `letter-spacing`: Space between characters
- `word-spacing`: Space between words
- `text-shadow`: Adds shadow to text

### 5. Backgrounds
- `background-color`: Solid color
- `background-image`: Image or gradient
- `background-repeat`: repeat, no-repeat, repeat-x, repeat-y
- `background-size`: cover, contain, specific dimensions
- `background-position`: Position of background image
- **Gradients**:
  - Linear: `linear-gradient(direction, color1, color2)`
  - Radial: `radial-gradient(shape, color1, color2)`
  - Conic: `conic-gradient(from angle, color1, color2)`

### 6. Borders
**Border Properties**:
- `border-width`: Thickness of border
- `border-style`: solid, dashed, dotted, double, groove, ridge, inset, outset
- `border-color`: Color of border
- `border-radius`: Rounds corners
- `box-shadow`: Adds shadow around element

**Shorthand**: `border: width style color;`

### 7. Display Property
- `block`: Takes full width, starts on new line (div, p, h1)
- `inline`: Flows with text, no width/height (span, a, strong)
- `inline-block`: Inline but accepts width/height
- `none`: Removes element from document flow
- `visibility: hidden`: Hides element but keeps space

### 8. Position Property
- `static` (default): Normal document flow
- `relative`: Positioned relative to normal position
- `absolute`: Positioned relative to nearest positioned ancestor
- `fixed`: Positioned relative to viewport, stays on scroll
- `sticky`: Hybrid of relative and fixed

**Related Properties**:
- `top`, `right`, `bottom`, `left`: Position offset
- `z-index`: Stacking order (higher values on top)

## Interview Questions & Answers

### Basic Questions

**1. What is CSS and why is it used?**
CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and responsive design. It separates presentation from content (HTML).

**2. What are the different ways to include CSS in HTML?**
- **Inline**: `<p style="color: red;">`
- **Internal**: `<style>` tag in `<head>`
- **External**: Separate `.css` file linked with `<link>`
- **@import**: `@import url('styles.css');` in CSS file

**3. What is CSS specificity?**
Specificity determines which CSS rule applies when multiple rules target the same element.
- Inline styles: 1000
- IDs: 100
- Classes, attributes, pseudo-classes: 10
- Elements, pseudo-elements: 1

Example: `#id .class p` has specificity of 100 + 10 + 1 = 111

**4. Explain the CSS box model.**
Every element is a rectangular box consisting of:
- Content (innermost)
- Padding (around content)
- Border (around padding)
- Margin (outermost, outside border)

**5. What is the difference between padding and margin?**
- **Padding**: Space inside the element, between content and border. Affects element's background.
- **Margin**: Space outside the element, between element and other elements. Doesn't affect background.

**6. What is box-sizing: border-box?**
It changes box model calculation:
- `content-box` (default): Width = content only
- `border-box`: Width = content + padding + border

Makes sizing more predictable and easier to work with.

**7. Explain CSS display property values.**
- `block`: Full width, new line, accepts width/height
- `inline`: Flows with text, no width/height
- `inline-block`: Inline but accepts width/height
- `none`: Removes from layout
- `flex`: Flexible box layout
- `grid`: Grid layout

**8. What is the difference between display: none and visibility: hidden?**
- `display: none`: Removes element completely, no space reserved
- `visibility: hidden`: Hides element but space is still reserved

**9. Explain CSS position property.**
- `static`: Default, normal flow
- `relative`: Offset from normal position, space reserved
- `absolute`: Removed from flow, positioned relative to nearest positioned ancestor
- `fixed`: Positioned relative to viewport
- `sticky`: Switches between relative and fixed based on scroll

**10. What is z-index and when is it used?**
Controls stacking order of positioned elements. Higher values appear on top. Only works with positioned elements (not static). Elements with same z-index stack by DOM order.

### Intermediate Questions

**11. What are pseudo-classes?**
Style elements based on their state:
```css
a:hover { color: red; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
p:nth-child(2) { background: yellow; }
```

**12. What are pseudo-elements?**
Style specific parts of elements:
```css
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
div::before { content: "→ "; }
div::after { content: " ✓"; }
```

**13. Explain CSS inheritance.**
Some CSS properties are inherited by child elements (color, font-family, text-align), while others aren't (margin, padding, border). Use `inherit` keyword to force inheritance.

**14. What is the CSS cascade?**
Order of importance:
1. Inline styles
2. IDs
3. Classes, attributes, pseudo-classes
4. Elements
5. Later rules override earlier ones (with same specificity)
6. `!important` overrides everything (use sparingly)

**15. How do you center a div horizontally?**
```css
/* Method 1: Margin auto */
div { width: 300px; margin: 0 auto; }

/* Method 2: Flexbox */
.parent { display: flex; justify-content: center; }

/* Method 3: Grid */
.parent { display: grid; place-items: center; }

/* Method 4: Absolute positioning */
div { position: absolute; left: 50%; transform: translateX(-50%); }
```

**16. How do you center a div vertically and horizontally?**
```css
/* Flexbox */
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Grid */
.parent {
    display: grid;
    place-items: center;
}

/* Absolute positioning */
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**17. What are CSS gradients?**
- **Linear**: Straight line gradient
  ```css
  background: linear-gradient(to right, red, blue);
  ```
- **Radial**: Circular gradient from center
  ```css
  background: radial-gradient(circle, red, blue);
  ```
- **Conic**: Rotational gradient
  ```css
  background: conic-gradient(red, yellow, green, blue, red);
  ```

**18. Explain CSS units.**
- **Absolute**: `px`, `pt`, `cm`, `mm`, `in`
- **Relative**:
  - `em`: Relative to parent font-size
  - `rem`: Relative to root font-size
  - `%`: Relative to parent
  - `vh/vw`: Viewport height/width (1vh = 1% of viewport)
  - `vmin/vmax`: Smaller/larger of vh or vw

**19. What is the difference between em and rem?**
- `em`: Relative to parent element's font-size (compounds)
- `rem`: Relative to root element's font-size (doesn't compound)

```css
/* If root font-size is 16px */
.parent { font-size: 2rem; } /* 32px */
.child { font-size: 2em; } /* 64px (2 × parent's 32px) */
```

**20. How do you create a triangle using CSS?**
```css
.triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```

### Advanced Questions

**21. Explain CSS specificity calculation.**
Calculate by counting: `(inline, ids, classes, elements)`
```css
/* Examples */
p { } /* 0,0,0,1 */
.class { } /* 0,0,1,0 */
#id { } /* 0,1,0,0 */
div p.class { } /* 0,0,1,2 */
#id .class p { } /* 0,1,1,1 */
```

**22. What are CSS combinators?**
- **Descendant** (`space`): `div p` - All p inside div
- **Child** (`>`): `div > p` - Direct children only
- **Adjacent sibling** (`+`): `h1 + p` - Immediately following sibling
- **General sibling** (`~`): `h1 ~ p` - All following siblings

**23. What is the difference between nth-child and nth-of-type?**
```css
/* nth-child counts all children */
p:nth-child(2) { } /* 2nd child that is a p */

/* nth-of-type counts only matching elements */
p:nth-of-type(2) { } /* 2nd p element */
```

**24. How do you handle CSS overflow?**
```css
div {
    overflow: visible; /* Default, content shows outside */
    overflow: hidden; /* Clips overflowing content */
    overflow: scroll; /* Always shows scrollbars */
    overflow: auto; /* Scrollbars only when needed */
}
```

**25. What is CSS stacking context?**
A 3D conceptualization of HTML elements. Created by:
- Root element
- Positioned elements with z-index
- Flex/grid items with z-index
- Elements with opacity < 1
- Elements with transform, filter, etc.

**26. How do you create a CSS circle?**
```css
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red;
}
```

**27. What are attribute selectors?**
```css
[type] { } /* Has type attribute */
[type="text"] { } /* Exact match */
[class^="btn"] { } /* Starts with */
[class$="btn"] { } /* Ends with */
[class*="btn"] { } /* Contains */
```

**28. Explain CSS opacity vs rgba transparency.**
- `opacity`: Affects entire element including children
- `rgba`: Only affects the specific property (background, color)

```css
/* Opacity affects all */
.box { opacity: 0.5; } /* Text and background both transparent */

/* RGBA only affects background */
.box { background: rgba(255, 0, 0, 0.5); } /* Text remains opaque */
```

**29. What is the difference between relative and absolute positioning?**
- `relative`: Positioned relative to its normal position, space is reserved in layout
- `absolute`: Positioned relative to nearest positioned ancestor, removed from normal flow

**30. How do you create a sticky footer?**
```css
/* Flexbox method */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
```

## Common Pitfalls and Best Practices

### Common Mistakes
1. **Not using box-sizing: border-box**
2. **Using too many !important declarations**
3. **Not using CSS variables for repeated values**
4. **Inline styles making maintenance difficult**
5. **Not organizing CSS with proper structure**
6. **Over-specific selectors**
7. **Not considering browser compatibility**

### Best Practices
1. **Use external stylesheets** for better maintainability
2. **Follow naming conventions** (BEM, SMACSS)
3. **Keep specificity low** for easier overrides
4. **Use CSS variables** for themes and repeated values
5. **Mobile-first approach** for responsive design
6. **Minimize use of !important**
7. **Comment complex CSS**
8. **Use shorthand properties** where appropriate
9. **Organize CSS logically** (layout, components, utilities)
10. **Use CSS preprocessors** (Sass, Less) for large projects

## Quick Reference

### Common CSS Properties
```css
/* Layout */
display, position, top, right, bottom, left, z-index
float, clear, overflow

/* Box Model */
width, height, padding, margin, border, box-sizing

/* Typography */
font-family, font-size, font-weight, font-style
color, text-align, text-decoration, line-height

/* Background */
background-color, background-image, background-size
background-position, background-repeat

/* Visual */
opacity, visibility, box-shadow, text-shadow
border-radius, transform
```

### CSS Reset
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## Practice Exercises

1. Create a card component with border, shadow, and hover effect
2. Style a navigation menu with different states
3. Create a pricing table with three columns
4. Build a profile card with centered content
5. Create a button with different states (hover, active, disabled)
6. Style a form with proper spacing and alignment
7. Create a modal overlay using position fixed
8. Build a hero section with background image
9. Create a sticky header that stays at top on scroll
10. Design a badge/pill component with rounded corners

## Resources for Further Learning

- MDN Web Docs: CSS Reference
- CSS-Tricks: Articles and tutorials
- Can I Use: Browser compatibility
- W3C CSS Specifications
- CSS Zen Garden: Design inspiration

---

**Next Steps**: After mastering these basics, move on to:
- Advanced CSS (transforms, filters, variables)
- CSS Layouts (Flexbox, Grid)
- Responsive Design
- CSS Animations
