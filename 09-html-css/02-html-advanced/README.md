# HTML Advanced - HTML5 APIs & Modern Features

Advanced HTML5 topics including Canvas, SVG, Web APIs, Accessibility, and SEO.

## Topics Covered

### 1. Canvas API
- Drawing rectangles, circles, lines
- Paths and shapes
- Gradients and patterns
- Text rendering
- Image manipulation
- Use cases: Games, charts, graphics

### 2. SVG (Scalable Vector Graphics)
- Vector graphics with XML
- Basic shapes: circle, rect, line, polygon, path
- SVG vs Canvas comparison
- When to use each

### 3. Web Storage API
- **localStorage**: Permanent storage
- **sessionStorage**: Session-only storage
- Methods: setItem, getItem, removeItem, clear
- Storage events
- Size limits (~5-10MB)

### 4. Geolocation API
- Get user's current position
- Watch position changes
- Handle errors and permissions
- Latitude, longitude, accuracy

### 5. Drag and Drop API
- Make elements draggable
- Drop zones
- Data transfer
- Drag events: dragstart, dragover, drop

### 6. Web Accessibility (ARIA)
- ARIA roles and attributes
- Screen reader support
- Keyboard navigation
- Color contrast
- Semantic HTML importance
- Testing with screen readers

### 7. SEO Optimization
- Meta tags (title, description, keywords)
- Open Graph for social media
- Twitter Cards
- Schema.org structured data
- Semantic HTML for SEO
- Mobile-friendly design
- Page speed optimization

### 8. Other HTML5 Features
- Data attributes (`data-*`)
- Content editable
- Progress bars
- Meter element
- Details/Summary

## Interview Questions

### Canvas vs SVG
**Q: When to use Canvas vs SVG?**

**Canvas**:
- Pixel-based, better for complex graphics
- Games, image manipulation
- Many objects (thousands)
- Lower memory with many elements

**SVG**:
- Vector-based, scales without quality loss
- Icons, logos, charts
- Fewer objects
- Better accessibility and SEO
- Can style with CSS
- Event handlers on individual elements

### Web Storage
**Q: localStorage vs sessionStorage vs cookies?**

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Size | ~5-10MB | ~5-10MB | ~4KB |
| Persistence | Permanent | Session only | Set expiry |
| Scope | All tabs | Single tab | Server + client |
| Sent to server | No | No | Yes (every request) |

### Accessibility
**Q: What is ARIA and when to use it?**
- ARIA = Accessible Rich Internet Applications
- Provides additional semantics for assistive technologies
- Use when semantic HTML isn't sufficient
- Examples: Custom widgets, dynamic content, complex interactions
- Always prefer semantic HTML first!

### SEO
**Q: Important meta tags for SEO?**
- `<title>`: Page title (50-60 chars)
- `<meta name="description">`: Page description (150-160 chars)
- `<meta name="viewport">`: Mobile-friendly
- Open Graph tags: Social media previews
- Canonical URL: Avoid duplicate content
- Schema markup: Rich snippets

## Best Practices

### Canvas
- Clear canvas before redrawing
- Use requestAnimationFrame for animations
- Save/restore context state
- Optimize for performance (object pooling)

### SVG
- Use for scalable graphics
- Optimize with SVGO
- Inline for better control
- Use sprites for icons

### Web Storage
- Check browser support first
- Handle storage quota exceeded errors
- Don't store sensitive data (not encrypted)
- Use JSON for complex objects
- Clear old data periodically

### Accessibility
- Use semantic HTML
- Provide alt text for all images
- Ensure keyboard navigation
- Test with screen readers
- Maintain proper heading hierarchy
- Use ARIA only when needed
- Provide skip navigation links
- Sufficient color contrast (4.5:1)

### SEO
- One H1 per page
- Descriptive URLs
- Fast loading (< 3 seconds)
- Mobile-friendly (responsive)
- Internal linking
- Quality content
- Regular updates
- HTTPS

## How to Use

```bash
open index.html
```

Explore and interact with:
- Canvas drawings
- SVG graphics
- Web Storage demos
- Geolocation
- Drag and drop
- All code examples

## Resources

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Schema.org](https://schema.org/)

## Next Steps

- Practice Canvas animations
- Build SVG icons
- Implement offline storage
- Learn accessibility testing tools
- Study SEO tools (Google Search Console)
