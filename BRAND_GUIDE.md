## B3 Fashion Studio — Brand System (Developer Handoff)

This guide consolidates the final brand architecture and implementation details for designers and developers.

### Color Palette
- Primary Accent — Sunny Gold: `#FDBD2F`
- Secondary Base — Deep Navy: `#001F49`
- Neutral — Pure White: `#FFFFFF`

Usage
- Primary Accent: Use for CTAs, highlights, icons, hover.
- Secondary Base: Use for backgrounds, headers, text, and key components.
- Neutral: Use as the primary page background.

### Typography
- Primary Typeface: Hind (400, 500, 600, 700)
- Headlines: Bold/Semi-bold; Subheads: Medium; Body: Regular; min body 16px.

### Logo Usage
- Primary: “B3 Fashion Studio” wordmark (Hind)
- Secondary: “B3” monogram (small contexts)
- Clear space: ≥ height of “B” on all sides
- Provide vector assets (SVG/EPS)

### Imagery
- High-contrast, editorial, luxe feel. Include diversity across ethnicity, body shapes, and ages.
- Subtle gold or navy accents in frame/props.
- Include alt text with product, fabric, color, and context.

### Layout & Spacing
- 12-column grid, base spacing unit 8px (use multiples: 8/16/24...)
- Ample white space; avoid dense stacking without section paddings.

### Icons & Buttons
- Minimal, line-based icons. Sizes: 20–24px (h-5/w-5 or h-6/w-6)
- Primary Button: Gold fill, white text, radius 6px
- Secondary Button: Navy outline, navy text; hover → gold fill white text

---

## Implemented Dev Tokens & Setup

### Tailwind config additions (already applied)
```ts
extend: {
  colors: {
    brandGold: '#FDBD2F',
    brandNavy: '#001F49',
    pureWhite: '#FFFFFF',
  },
  fontFamily: {
    hind: ['Hind', 'system-ui', 'sans-serif'],
  },
  borderRadius: { brand: '6px' }
}
```

### Font import (already applied)
```html
<link href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Base typography (already applied)
```css
body { font-family: 'Hind', system-ui, sans-serif; line-height: 1.5; }
h1, h2, h3, h4, h5, h6 { font-family: 'Hind'; letter-spacing: 0.2px; }
```

### Button variants (already applied)
```tsx
// default (primary)
bg-brandGold text-white hover:opacity-90
// outline (secondary)
border border-brandNavy text-brandNavy bg-white hover:bg-brandGold hover:text-white
// secondary (filled navy)
bg-brandNavy text-white hover:bg-brandNavy/90
```

### Navigation updates (already applied)
- Solid white header background
- Links: Hind, Navy text, Gold hover
- Logo: height 96px (h-24), pushed left with padding

---

## Asset Structure
- public/brand/
  - logos/ (SVG/PNG)
  - typography/ (specs)
  - palette/ (tokens JSON)
  - imagery/ (references)

---

## Accessibility & Performance
- Minimum body font size 16px
- Lazy-load images with `loading="lazy"` and `decoding="async"`
- Descriptive alt text for all images

---

For design updates, sync this guide with your Figma file. For dev updates, treat Tailwind tokens as the source of truth and avoid hardcoding hex values outside token definitions.


