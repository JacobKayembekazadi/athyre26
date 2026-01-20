# CLAUDE.md - AI Context for ATHŸRE Shopify Theme

## Project Overview

This is a **Shopify 2.0 theme** for ATHŸRE, a premium activewear brand. The theme was converted from a React/Vite application to native Shopify Liquid templates.

## Quick Reference

### Theme Location
```
athyre-theme/
```

### Key Commands
```bash
# Preview theme locally (requires Shopify CLI)
shopify theme dev --store=your-store.myshopify.com

# Push theme to Shopify
shopify theme push

# Check for Liquid errors
shopify theme check

# Pull latest from Shopify
shopify theme pull
```

## Architecture

### Directory Structure
```
athyre-theme/
├── assets/          # CSS and JavaScript
├── config/          # Theme settings schema
├── layout/          # Main theme wrapper
├── locales/         # Translation strings
├── sections/        # Modular page sections
├── snippets/        # Reusable components
└── templates/       # Page templates (JSON + Liquid)
```

### Section Types

| Section | Purpose | Template |
|---------|---------|----------|
| `header.liquid` | Site navigation, cart icon | All pages (section group) |
| `footer.liquid` | Links, social, newsletter | All pages (section group) |
| `hero-banner.liquid` | Full-screen hero | Homepage |
| `featured-collection.liquid` | Product grid | Homepage |
| `main-product.liquid` | Product detail page | product.json |
| `main-collection.liquid` | Collection with filters | collection.json |
| `main-blog.liquid` | Blog article listing | blog.json |
| `main-article.liquid` | Single article | article.json |
| `main-cart.liquid` | Shopping cart | cart.json |

### Key Files to Know

- **`layout/theme.liquid`** - Main wrapper, includes header/footer groups
- **`assets/theme.js`** - Cart drawer, mobile menu, AJAX functionality
- **`assets/base.css`** - All styles (Tailwind-like utilities)
- **`config/settings_schema.json`** - Theme customizer settings
- **`locales/en.default.json`** - All text strings (for i18n)

## Coding Conventions

### Liquid Patterns

```liquid
{%- comment -%} Use dash syntax to strip whitespace {%- endcomment -%}

{%- if condition -%}
  {%- comment -%} Content {%- endcomment -%}
{%- endif -%}

{%- for item in collection -%}
  {%- comment -%} Always use forloop.first/last for edge cases {%- endcomment -%}
{%- endfor -%}
```

### Section Schema Pattern

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section-class",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default text"
    }
  ],
  "blocks": [],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

### CSS Naming Convention

- BEM-like: `.block__element--modifier`
- Section-specific: `.section-{{ section.id }}` for unique scoping
- Utility classes available in `base.css`

### JavaScript Patterns

```javascript
// Use vanilla JS, no frameworks
// Cart API: /cart.js, /cart/add.js, /cart/change.js
// Always handle loading states
// Use data attributes for DOM selection
```

## Common Tasks

### Adding a New Section

1. Create `sections/section-name.liquid`
2. Add schema with settings
3. Add to template JSON or use as preset
4. Add translations to `locales/en.default.json`

### Modifying Styles

1. Edit `assets/base.css`
2. Or use `{% style %}` block in section for scoped styles
3. Use `section.id` for unique selectors

### Adding Cart Functionality

1. Use `theme.js` AJAX methods
2. Dispatch `cart:updated` event after changes
3. Update cart drawer via `renderCartDrawer()`

## Brand Guidelines

- **Primary Color**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Gray Scale**: #f9fafb, #f3f4f6, #e5e7eb, #9ca3af, #6b7280, #374151
- **Font**: Inter (or system sans-serif fallback)
- **Headings**: Bold (700-900), tight letter-spacing (-0.02em to -0.05em)
- **Buttons**: Uppercase, letter-spacing 0.1em, bold

## Troubleshooting

### "Branch isn't valid theme"
- Missing required templates (check `templates/customers/*`)
- Missing `password.liquid` or `gift_card.liquid`

### Styles not loading
- Check `{{ 'base.css' | asset_url | stylesheet_tag }}` in theme.liquid
- Verify file exists in `assets/`

### Cart not updating
- Check browser console for JS errors
- Verify AJAX endpoints return valid JSON
- Check `cart:updated` event is dispatched

## Files Changed Recently

See [UPDATES.md](UPDATES.md) for changelog.

## Related Documentation

- [Shopify Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Theme Architecture](https://shopify.dev/docs/themes/architecture)
- [Section Schema](https://shopify.dev/docs/themes/architecture/sections/section-schema)
