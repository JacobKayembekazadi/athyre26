# CLAUDE.md - Project Context

## Project Overview

**ATHŸRE** is a premium activewear e-commerce brand. This repository contains:

1. **React/Vite Source** (`/`) - Original frontend application
2. **Shopify Theme** (`/athyre-theme/`) - Converted Shopify 2.0 theme

## Repository Structure

```
athyre-shopify-store/
├── src/                    # React source (reference only)
│   ├── components/         # React components
│   ├── pages/              # Page components
│   └── data.ts             # Mock data
├── athyre-theme/           # Shopify theme (active)
│   ├── assets/
│   ├── config/
│   ├── layout/
│   ├── locales/
│   ├── sections/
│   ├── snippets/
│   └── templates/
└── public/                 # Static assets
```

## Quick Commands

### React Development (Reference)
```bash
npm install
npm run dev        # Start dev server at localhost:5173
npm run build      # Build for production
```

### Shopify Theme
```bash
cd athyre-theme
shopify theme dev --store=your-store.myshopify.com
shopify theme push
shopify theme check
```

## Current State

- **React App**: Complete reference implementation
- **Shopify Theme**: v1.1.0 - Fully functional, all templates complete

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CSS Framework | Custom utilities | Smaller bundle, no build step needed |
| JavaScript | Vanilla JS | No framework overhead, Shopify compatible |
| Cart | AJAX drawer | Better UX than page refresh |
| Templates | JSON + Liquid | Shopify 2.0 standard, customizer support |

## Working with This Project

### For React Work
The React source in the root directory is the **reference implementation**. Modify it to test new features before converting to Shopify.

### For Shopify Work
All active development happens in `/athyre-theme/`. See [athyre-theme/CLAUDE.md](athyre-theme/CLAUDE.md) for detailed Shopify context.

### Converting Features
When adding new features:
1. Build/test in React first (optional)
2. Create Shopify section in `athyre-theme/sections/`
3. Add to appropriate template JSON
4. Add translations to `locales/en.default.json`
5. Update `athyre-theme/UPDATES.md`

## File Mapping

| React Component | Shopify Section |
|-----------------|-----------------|
| `components/Header.tsx` | `sections/header.liquid` |
| `components/Hero.tsx` | `sections/hero-banner.liquid` |
| `components/ProductCard.tsx` | `snippets/product-card.liquid` |
| `components/CartDrawer.tsx` | `snippets/cart-drawer.liquid` |
| `pages/RiseCollection.tsx` | `sections/main-collection.liquid` |
| `pages/ProductDetail.tsx` | `sections/main-product.liquid` |
| `pages/Journal.tsx` | `sections/main-blog.liquid` |

## Brand Guidelines

- **Colors**: Black (#000), White (#FFF), Grays (#f9fafb → #374151)
- **Typography**: Inter font, bold headings (700-900)
- **Style**: Minimal, premium, athletic
- **Voice**: Confident, aspirational, active

## Git Workflow

```bash
# Feature branch
git checkout -b feature/feature-name

# Commit with co-author
git commit -m "feat: Description

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Push
git push origin feature/feature-name
```

## Related Documentation

- [athyre-theme/CLAUDE.md](athyre-theme/CLAUDE.md) - Shopify theme details
- [athyre-theme/ARCHITECTURE.md](athyre-theme/ARCHITECTURE.md) - Technical architecture
- [athyre-theme/UPDATES.md](athyre-theme/UPDATES.md) - Changelog
- [athyre-theme/TODO.md](athyre-theme/TODO.md) - Task list

## Troubleshooting

### Port 3000/5173 in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /F /PID <pid>

# Mac/Linux
lsof -i :3000
kill -9 <pid>
```

### Shopify CLI errors
```bash
shopify auth logout
shopify auth login
```

### Theme not valid
Check all required templates exist in `athyre-theme/templates/`:
- `customers/*.json` (7 files)
- `password.liquid`
- `gift_card.liquid`
- `search.json`
- `list-collections.json`
