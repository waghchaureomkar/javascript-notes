# HTML Basics

Complete guide to HTML fundamentals with practical examples.

## Topics Covered

### 1. HTML Document Structure
- DOCTYPE declaration
- HTML, head, body elements
- Meta tags (charset, viewport, description, keywords)
- Title tag
- Link and Script tags

### 2. Text Elements
- **Headings**: h1 to h6
- **Paragraphs**: p
- **Text Formatting**:
  - Bold: `<b>` vs `<strong>` (semantic)
  - Italic: `<i>` vs `<em>` (semantic)
  - Underline: `<u>`
  - Mark: `<mark>`
  - Small: `<small>`
  - Delete: `<del>`
  - Insert: `<ins>`
  - Subscript: `<sub>`
  - Superscript: `<sup>`
- **Code**: `<code>`, `<pre>`
- **Quotes**: `<blockquote>`, `<q>`
- **Abbreviations**: `<abbr>`

### 3. Links & Images
- **Links (Anchor tags)**:
  - External links
  - Internal links (anchors)
  - Email links (`mailto:`)
  - Phone links (`tel:`)
  - Download links
  - Target attribute (`_blank`, `_self`)
  - `rel="noopener noreferrer"` for security
- **Images**:
  - `<img>` tag
  - `src`, `alt` attributes
  - Width and height
  - Responsive images
- **Semantic Images**:
  - `<figure>` and `<figcaption>`

### 4. Lists
- **Unordered Lists** (`<ul>`)
- **Ordered Lists** (`<ol>`)
  - Type attribute (1, A, a, I, i)
  - Start attribute
  - Reversed attribute
- **Description Lists** (`<dl>`, `<dt>`, `<dd>`)
- Nested lists

### 5. Tables
- Basic table structure
- `<table>`, `<tr>`, `<td>`, `<th>`
- Table sections:
  - `<thead>` - Table header
  - `<tbody>` - Table body
  - `<tfoot>` - Table footer
- `<caption>` - Table caption
- Attributes:
  - `colspan` - Merge columns
  - `rowspan` - Merge rows

### 6. Forms
- **Form element**: `<form>` with action and method
- **Input types**:
  - text, email, password
  - number, tel, url
  - date, time, datetime-local
  - color, range
  - file, hidden
  - radio, checkbox
  - submit, reset, button
- **Other form elements**:
  - `<textarea>` - Multi-line text
  - `<select>` and `<option>` - Dropdown
  - `<button>` - Button element
  - `<label>` - Form labels
  - `<fieldset>` and `<legend>` - Group form elements
- **Form attributes**:
  - required
  - readonly
  - disabled
  - placeholder
  - autofocus
  - autocomplete
  - pattern (regex)
  - maxlength, minlength
  - min, max
  - multiple

### 7. Semantic HTML5 Elements
- `<header>` - Page/section header
- `<nav>` - Navigation links
- `<main>` - Main content
- `<section>` - Thematic sections
- `<article>` - Independent content
- `<aside>` - Sidebar/related content
- `<footer>` - Page/section footer
- `<figure>` and `<figcaption>` - Images with captions
- `<details>` and `<summary>` - Collapsible content
- `<time>` - Date and time
- `<mark>` - Highlighted text

### 8. Other Important Elements
- **Comments**: `<!-- comment -->`
- **Line breaks**: `<br>`
- **Horizontal rule**: `<hr>`
- **Div & Span**: Block vs Inline containers
- **IFrame**: Embed external content
- **Media**:
  - `<audio>` with controls
  - `<video>` with controls
  - `<source>` for multiple formats

## Block vs Inline Elements

### Block-level Elements
Take full width, start on new line:
- `<div>`, `<p>`, `<h1>-<h6>`
- `<section>`, `<article>`, `<header>`, `<footer>`
- `<ul>`, `<ol>`, `<li>`
- `<table>`, `<form>`

### Inline Elements
Take only necessary width, don't start on new line:
- `<span>`, `<a>`, `<img>`
- `<strong>`, `<em>`, `<code>`
- `<input>`, `<label>`, `<button>`

## Best Practices

1. **Always use DOCTYPE**: `<!DOCTYPE html>`
2. **Use semantic HTML**: Improves SEO and accessibility
3. **Alt text for images**: Required for accessibility
4. **Label form inputs**: Associate labels with inputs using `for` and `id`
5. **Use proper headings**: Only one h1 per page, maintain hierarchy
6. **Close all tags**: Even self-closing tags in XHTML
7. **Indentation**: Maintain proper indentation for readability
8. **Validate HTML**: Use W3C validator
9. **Meta viewport**: Essential for responsive design
10. **Meaningful names**: Use descriptive id and class names

## Interview Questions

### Easy
1. **What is HTML?**
   - HyperText Markup Language
   - Standard markup language for web pages
   - Uses tags to structure content

2. **What is DOCTYPE?**
   - Document Type Declaration
   - Tells browser which HTML version to use
   - `<!DOCTYPE html>` for HTML5

3. **Difference between div and span?**
   - div: Block-level element (full width)
   - span: Inline element (only necessary width)

4. **What are semantic elements?**
   - Elements with meaningful names
   - Describe their content (header, nav, article, footer)
   - Improve SEO and accessibility

5. **Difference between <b> and <strong>?**
   - `<b>`: Bold text (presentational)
   - `<strong>`: Strong importance (semantic)
   - Screenreaders emphasize `<strong>`

### Medium
6. **Difference between id and class?**
   - id: Unique identifier (only one per page)
   - class: Can be used multiple times
   - id has higher CSS specificity

7. **What is alt attribute?**
   - Alternative text for images
   - Shown if image fails to load
   - Used by screen readers (accessibility)
   - Important for SEO

8. **Different types of lists?**
   - Unordered (`<ul>`): Bullet points
   - Ordered (`<ol>`): Numbered
   - Description (`<dl>`): Term and definition pairs

9. **What are data attributes?**
   - Custom attributes: `data-*`
   - Store extra information
   - Accessible via JavaScript: `dataset`

10. **Difference between GET and POST?**
    - GET: Data in URL, visible, limited size, bookmarkable
    - POST: Data in body, hidden, unlimited size, not bookmarkable

## How to Use

1. **Open in Browser**:
   ```bash
   open index.html
   ```

2. **Explore Different Sections**:
   - Click navigation links to jump to sections
   - Interact with form elements
   - Try collapsible details
   - Inspect code with browser DevTools

3. **Experiment**:
   - Modify HTML in DevTools
   - Try different form inputs
   - Test accessibility with screen reader
   - Validate with W3C validator

## Resources

- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML Validator](https://validator.w3.org/)
- [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

## Next Steps

After mastering HTML basics:
1. Move to HTML Advanced (02-html-advanced/)
2. Learn CSS Basics (03-css-basics/)
3. Practice building complete web pages
4. Learn about accessibility (ARIA)
