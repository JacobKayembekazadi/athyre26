# ATHŸRE Shopify Theme

A premium Shopify 2.0 theme for ATHŸRE activewear, converted from a React/Vite application.

## Quick Start

### Prerequisites
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- A Shopify Partner account or development store

### Development

```bash
# Start local development server
shopify theme dev --store=your-store.myshopify.com

# Check for Liquid errors
shopify theme check

# Push to Shopify
shopify theme push
```

### Installation via GitHub

1. Go to Shopify Admin → Online Store → Themes
2. Click "Add theme" → "Connect from GitHub"
3. Select this repository and branch
4. Shopify will sync the theme automatically

### Installation via ZIP

1. Download/zip this repository
2. Go to Shopify Admin → Online Store → Themes
3. Click "Add theme" → "Upload zip file"
4. Upload and publish

## Theme Structure

```
/ (repository root - Shopify theme)
├── assets/
│   ├── base.css           # All styles
│   └── theme.js           # JavaScript functionality
├── config/
│   └── settings_schema.json   # Theme customizer settings
├── layout/
│   └── theme.liquid       # Main wrapper
├── locales/
│   └── en.default.json    # English translations
├── sections/              # 25 modular sections
├── snippets/              # 4 reusable components
├── templates/             # Page templates (JSON + Liquid)
└── react-source/          # Original React app (reference)
```

## Features

### E-commerce
- Product pages with image gallery and variant selection
- Collection pages with tag filtering
- AJAX cart drawer
- Quick add to cart from product cards
- Responsive product grid

### Content
- Blog with featured articles
- Article pages with related posts
- Generic page template
- 404 error page

### Customer Accounts
- Login and registration
- Account dashboard
- Order history
- Address management

### Design
- Mobile-first responsive design
- Transparent header on homepage
- Smooth animations and transitions
- Dark/light section options

## Customization

### Theme Settings

Access via Shopify Admin → Online Store → Themes → Customize:

- **Logo**: Upload your brand logo
- **Colors**: Primary, background, text colors
- **Typography**: Heading and body fonts
- **Social Media**: Links to social profiles
- **Cart**: Drawer behavior settings

### Section Settings

Each section has customizable options:

- **Hero Banner**: Image, heading, button text/link
- **Featured Collection**: Collection picker, product count
- **Newsletter**: Heading, description, colors
- **Product Page**: Show/hide elements, related products

## Documentation

- [CLAUDE.md](CLAUDE.md) - AI assistant context
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [UPDATES.md](UPDATES.md) - Changelog
- [TODO.md](TODO.md) - Development tasks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Credits

- Original React design by ATHŸRE team
- Shopify theme conversion by Claude AI
- Icons: Custom SVG icons

## License

Proprietary - ATHŸRE © 2026
