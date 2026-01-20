# ARCHITECTURE.md - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Shopify Platform                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Products  │  │ Collections │  │   Blogs     │             │
│  │   Database  │  │   Database  │  │  Database   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          │                                      │
│                    ┌─────▼─────┐                                │
│                    │  Liquid   │                                │
│                    │  Engine   │                                │
│                    └─────┬─────┘                                │
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                    ATHŸRE THEME                                  │
│                          │                                      │
│  ┌───────────────────────┼───────────────────────────┐         │
│  │               layout/theme.liquid                  │         │
│  │  ┌─────────────────────────────────────────────┐  │         │
│  │  │           Section Groups                     │  │         │
│  │  │  ┌─────────────┐     ┌─────────────┐       │  │         │
│  │  │  │   Header    │     │   Footer    │       │  │         │
│  │  │  │   Group     │     │   Group     │       │  │         │
│  │  │  └─────────────┘     └─────────────┘       │  │         │
│  │  └─────────────────────────────────────────────┘  │         │
│  │                                                    │         │
│  │  ┌─────────────────────────────────────────────┐  │         │
│  │  │         {{ content_for_layout }}            │  │         │
│  │  │  ┌─────────────────────────────────────┐   │  │         │
│  │  │  │     Template (JSON or Liquid)       │   │  │         │
│  │  │  │  ┌─────────┐ ┌─────────┐ ┌───────┐ │   │  │         │
│  │  │  │  │ Section │ │ Section │ │ ...   │ │   │  │         │
│  │  │  │  └─────────┘ └─────────┘ └───────┘ │   │  │         │
│  │  │  └─────────────────────────────────────┘   │  │         │
│  │  └─────────────────────────────────────────────┘  │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  assets/    │  │  snippets/  │  │  locales/   │             │
│  │  base.css   │  │  product-   │  │  en.default │             │
│  │  theme.js   │  │  card.liquid│  │  .json      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

```
Browser Request
      │
      ▼
┌─────────────────┐
│  Shopify CDN    │
│  (Assets)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Shopify        │
│  Router         │
│                 │
│  /products/*    │──▶ product.json ──▶ main-product.liquid
│  /collections/* │──▶ collection.json ──▶ main-collection.liquid
│  /blogs/*       │──▶ blog.json ──▶ main-blog.liquid
│  /cart          │──▶ cart.json ──▶ main-cart.liquid
│  /              │──▶ index.json ──▶ hero + featured-collection
└─────────────────┘
```

## Component Hierarchy

### Sections

```
sections/
├── Global (Section Groups)
│   ├── header.liquid          # Navigation, cart, mobile menu
│   └── footer.liquid          # Links, social, newsletter
│
├── Homepage
│   ├── hero-banner.liquid     # Full-screen hero
│   ├── featured-collection.liquid  # Product grid
│   └── newsletter.liquid      # Email signup
│
├── E-commerce
│   ├── main-product.liquid    # Product detail page
│   ├── main-collection.liquid # Collection grid + filters
│   └── main-cart.liquid       # Shopping cart
│
├── Content
│   ├── main-blog.liquid       # Blog listing
│   ├── main-article.liquid    # Article detail
│   └── main-page.liquid       # Generic pages
│
├── Customer
│   ├── main-login.liquid
│   ├── main-register.liquid
│   ├── main-account.liquid
│   ├── main-addresses.liquid
│   ├── main-order.liquid
│   ├── main-activate-account.liquid
│   └── main-reset-password.liquid
│
└── Utility
    ├── main-search.liquid
    ├── main-list-collections.liquid
    └── main-404.liquid
```

### Snippets

```
snippets/
├── product-card.liquid    # Used in: featured-collection, main-collection, main-search
├── article-card.liquid    # Used in: main-blog, main-article (related)
├── cart-drawer.liquid     # Used in: theme.liquid (global)
└── icon.liquid            # Used in: everywhere (SVG icons)
```

## Data Flow

### Cart Operations

```
┌─────────────────┐
│  Add to Cart    │
│  Button Click   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  theme.js       │
│  addToCart()    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  POST           │
│  /cart/add.js   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Shopify        │
│  Cart API       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  cart:updated   │
│  Event          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update DOM     │
│  - Cart count   │
│  - Cart drawer  │
└─────────────────┘
```

### Section Settings

```
┌─────────────────────────────────────────────────────────────┐
│  Theme Customizer (Shopify Admin)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Section Settings Panel                              │   │
│  │  - Heading: [___________]                           │   │
│  │  - Show button: [✓]                                 │   │
│  │  - Button text: [___________]                       │   │
│  └──────────────────────┬──────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Section Schema (JSON)                                       │
│  {                                                          │
│    "settings": [                                            │
│      { "id": "heading", "type": "text" },                  │
│      { "id": "show_button", "type": "checkbox" },          │
│      { "id": "button_text", "type": "text" }               │
│    ]                                                        │
│  }                                                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Liquid Template                                             │
│  <h2>{{ section.settings.heading }}</h2>                    │
│  {%- if section.settings.show_button -%}                    │
│    <a>{{ section.settings.button_text }}</a>                │
│  {%- endif -%}                                              │
└─────────────────────────────────────────────────────────────┘
```

## CSS Architecture

### Layer Order

```css
/* 1. Reset & Base */
*, *::before, *::after { box-sizing: border-box; }

/* 2. CSS Variables */
:root {
  --color-primary: #000000;
  --font-body: 'Inter', sans-serif;
}

/* 3. Typography */
body { font-family: var(--font-body); }
h1, h2, h3 { font-weight: 700; }

/* 4. Layout Utilities */
.container { max-width: 1200px; margin: 0 auto; }
.grid { display: grid; }

/* 5. Component Styles */
.product-card { ... }
.cart-drawer { ... }

/* 6. Section-Specific (via {% style %}) */
.section-{{ section.id }} { ... }

/* 7. Utility Classes */
.text-center { text-align: center; }
.hidden { display: none; }
```

### Responsive Breakpoints

```css
/* Mobile First */
.element { /* Base mobile styles */ }

/* Tablet */
@media (min-width: 768px) {
  .element { /* Tablet styles */ }
}

/* Desktop */
@media (min-width: 1024px) {
  .element { /* Desktop styles */ }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .element { /* Large desktop styles */ }
}
```

## JavaScript Architecture

### Module Pattern

```javascript
// theme.js structure
(function() {
  'use strict';

  // State
  let cartCount = 0;

  // DOM Cache
  const selectors = {
    cartDrawer: '[data-cart-drawer]',
    cartCount: '[data-cart-count]',
    addToCart: '[data-add-to-cart]'
  };

  // Cart Module
  const Cart = {
    async add(variantId, quantity) { ... },
    async update(key, quantity) { ... },
    async remove(key) { ... },
    render(cart) { ... }
  };

  // Header Module
  const Header = {
    init() { ... },
    handleScroll() { ... },
    toggleMobileMenu() { ... }
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    Header.init();
    // ...
  });
})();
```

### Event System

```javascript
// Custom Events
document.dispatchEvent(new CustomEvent('cart:updated', {
  detail: { cart: cartData }
}));

// Listening
document.addEventListener('cart:updated', function(e) {
  updateCartUI(e.detail.cart);
});
```

## Performance Considerations

### Image Loading
- Use Shopify's image CDN with width parameters
- Implement lazy loading for below-fold images
- Use `srcset` for responsive images

### CSS/JS Loading
- Single CSS file (base.css) - consider splitting if > 50KB
- Single JS file (theme.js) - defer loading
- Critical CSS inlined in `<head>` if needed

### Liquid Optimization
- Use `{%- -%}` to strip whitespace
- Limit nested loops
- Cache repeated calculations with `{% capture %}` or `{% assign %}`
