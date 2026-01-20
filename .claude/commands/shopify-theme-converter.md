---
name: shopify-theme-converter
description: Convert any web project (React, Next.js, Vue, HTML/CSS, any framework) into a deployable Shopify theme with customizable sections. Use when converting websites to Shopify, creating Shopify themes from prototypes, or transforming web components into Liquid sections with full editor customization (text, images, colors, layout, spacing, visibility toggles, repeatable blocks). Supports single-file components or complete project conversions.
---

# Shopify Theme Converter

Convert any web project into a Shopify 2.0 theme with fully customizable sections.

## Quick Reference

Before converting, load the relevant reference file:

- **Liquid syntax**: `references/liquid-patterns.md`
- **Section schemas**: `references/section-schemas.md`
- **Theme structure**: `references/theme-structure.md`
- **Conversion examples**: `references/conversion-examples.md`

## Conversion Workflow

### Step 1: Analyze Input

Identify what you're converting:

| Input Type | Action |
|------------|--------|
| Single component/file | Convert to one section |
| Multiple components | Convert each to a section |
| Full project | Extract all components, create complete theme |

For each component, identify:
- Props/data → become `section.settings`
- Repeated items (maps/loops) → become `blocks`
- Conditional renders → become visibility settings
- Styles → become customization settings (colors, spacing, etc.)

### Step 2: Create Theme Structure

**Option A: Start from base theme**
```bash
cp -r /path/to/skill/assets/base-theme ./theme-name
```

**Option B: Create manually**
```
theme-name/
├── assets/
│   ├── base.css
│   └── theme.js
├── config/
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── locales/
│   └── en.default.json
├── sections/
├── snippets/
└── templates/
    └── index.json
```

### Step 3: Convert Components to Sections

For each component:

1. **Create section file** in `sections/component-name.liquid`

2. **Map props to settings**:
```
React prop           → Shopify setting
-----------------    → -----------------
heading (string)     → { type: "text", id: "heading" }
description (text)   → { type: "textarea", id: "description" }
image (url/src)      → { type: "image_picker", id: "image" }
link (href)          → { type: "url", id: "link" }
isVisible (boolean)  → { type: "checkbox", id: "show_section" }
variant (enum)       → { type: "select", id: "variant", options: [...] }
items (array)        → blocks with appropriate type
```

3. **Add standard settings** (always include):
   - Padding top/bottom (range, 0-100px)
   - Background color
   - Text color
   - Container width (select: full/contained/narrow)
   - Mobile/desktop visibility toggles

4. **Structure the section**:
```liquid
{% comment %} Markup {% endcomment %}
<section class="section-{{ section.id }}">
  ...
</section>

{% comment %} Scoped styles {% endcomment %}
{% style %}
  .section-{{ section.id }} { ... }
{% endstyle %}

{% comment %} Schema {% endcomment %}
{% schema %}
{
  "name": "Section Name",
  "settings": [...],
  "blocks": [...],
  "presets": [{ "name": "Section Name" }]
}
{% endschema %}
```

### Step 4: Handle Repeatable Content

When component has `.map()` or loops over items:

**Use blocks** (recommended for 1-10 items user manages):
```json
{
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [...]
    }
  ],
  "max_blocks": 10
}
```

**Use fixed slots** (for fixed structure with toggles):
```json
{
  "settings": [
    { "type": "header", "content": "Item 1" },
    { "type": "checkbox", "id": "show_item_1", "label": "Show item 1", "default": true },
    { "type": "text", "id": "item_1_title", "label": "Title" },
    ...
  ]
}
```

Decision guide:
- Items user adds/removes/reorders → **blocks**
- Fixed number, just show/hide → **fixed slots**
- Both needed → **blocks** with visibility checkbox per block

### Step 5: Convert Styles

| CSS Source | Shopify Approach |
|------------|-----------------|
| Hardcoded colors | Color picker settings |
| Fixed spacing | Range sliders |
| Fixed fonts | Use `var(--font-heading)` / `var(--font-body)` |
| Media queries | Keep in `{% style %}` block |
| CSS classes | Keep, scope with `.section-{{ section.id }}` |
| CSS variables | Convert to settings, output in `{% style %}` |

### Step 6: Create Templates

For each page type, create `templates/[type].json`:

```json
{
  "sections": {
    "unique-key": {
      "type": "section-filename",
      "settings": {}
    }
  },
  "order": ["unique-key"]
}
```

Required templates: `index.json`, `page.json`, `product.json`, `collection.json`, `cart.json`

### Step 7: Output

**Complete theme folder:**
```bash
# Zip for manual upload
zip -r theme-name.zip theme-name/

# Or provide folder for GitHub connection
```

**File-by-file review:**
Present each section for approval before moving to next.

## Must-Have Sections Checklist

Essential sections every theme should include:

- [ ] `header.liquid` - Logo, navigation, cart
- [ ] `footer.liquid` - Links, social, copyright
- [ ] `announcement-bar.liquid` - Promotional banner
- [ ] `hero-banner.liquid` - Hero with image/CTA
- [ ] `rich-text.liquid` - Flexible text content
- [ ] `image-with-text.liquid` - Side-by-side layout
- [ ] `featured-collection.liquid` - Product grid
- [ ] `multicolumn.liquid` - Feature columns
- [ ] `newsletter.liquid` - Email signup
- [ ] `contact-form.liquid` - Contact page
- [ ] `collapsible-content.liquid` - FAQ/accordion
- [ ] `main-product.liquid` - Product page
- [ ] `main-collection.liquid` - Collection page
- [ ] `main-cart.liquid` - Cart page
- [ ] `main-page.liquid` - Generic page content

## Common Patterns

### Always Include in Settings
```json
{
  "type": "header",
  "content": "Spacing"
},
{
  "type": "range",
  "id": "padding_top",
  "label": "Top padding",
  "min": 0,
  "max": 100,
  "step": 4,
  "unit": "px",
  "default": 40
},
{
  "type": "range",
  "id": "padding_bottom",
  "label": "Bottom padding",
  "min": 0,
  "max": 100,
  "step": 4,
  "unit": "px",
  "default": 40
}
```

### Visibility Toggles
```json
{
  "type": "header",
  "content": "Visibility"
},
{
  "type": "checkbox",
  "id": "show_on_desktop",
  "label": "Show on desktop",
  "default": true
},
{
  "type": "checkbox",
  "id": "show_on_mobile",
  "label": "Show on mobile",
  "default": true
}
```

### Image with Fallback
```liquid
{% if section.settings.image != blank %}
  {{ section.settings.image | image_url: width: 800 | image_tag: loading: 'lazy' }}
{% else %}
  {{ 'image' | placeholder_svg_tag: 'placeholder-image' }}
{% endif %}
```

### Block Loop with shopify_attributes
```liquid
{% for block in section.blocks %}
  <div class="item" {{ block.shopify_attributes }}>
    {{ block.settings.content }}
  </div>
{% endfor %}
```

## Framework-Specific Notes

### React/Next.js
- `useState`/`useEffect` → Static (no state)
- Props → `section.settings`
- `children` → Blocks or nested sections
- CSS modules/styled-components → `{% style %}` with scoped classes
- `next/image` → Liquid image filters

### Vue/Nuxt
- `props` → `section.settings`
- `v-for` → `{% for %}`
- `v-if` → `{% if %}`
- `<slot>` → Blocks
- Scoped styles → `{% style %}` with `.section-{{ section.id }}`

### Plain HTML/CSS
- Extract repeated patterns → Blocks
- Identify customizable values → Settings
- Global styles → `assets/base.css`
- Component styles → `{% style %}` in section
