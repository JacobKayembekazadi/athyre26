# UPDATES.md - Changelog

All notable changes to the ATHŸRE Shopify theme.

---

## [1.1.0] - 2026-01-20

### Added
- Customer account templates and sections
  - `main-login.liquid` - Login page with password recovery
  - `main-register.liquid` - Account registration
  - `main-account.liquid` - Account dashboard with order history
  - `main-addresses.liquid` - Address management
  - `main-order.liquid` - Order detail view
  - `main-activate-account.liquid` - Account activation
  - `main-reset-password.liquid` - Password reset
- Search functionality
  - `main-search.liquid` - Search results page
  - `search.json` template
- Collections list page
  - `main-list-collections.liquid` - All collections grid
  - `list-collections.json` template
- Password page for store protection
  - `password.liquid` template
- Customer translations in `en.default.json`

### Fixed
- Theme validation error "branch isn't valid theme" by adding all required Shopify templates

---

## [1.0.0] - 2026-01-20

### Added
- Initial Shopify 2.0 theme conversion from React/Vite

#### Layout
- `theme.liquid` - Main theme wrapper with section groups

#### Sections (13)
- `header.liquid` - Navigation with transparent mode on homepage
- `footer.liquid` - Links, social icons, newsletter signup
- `hero-banner.liquid` - Full-screen hero with customizable content
- `featured-collection.liquid` - Product grid section
- `newsletter.liquid` - Email signup with dark theme
- `main-product.liquid` - Product detail with gallery, variants, add to cart
- `main-collection.liquid` - Collection page with filters and grid
- `main-blog.liquid` - Blog listing with featured article
- `main-article.liquid` - Article detail page
- `main-cart.liquid` - Shopping cart page
- `main-page.liquid` - Generic page template
- `main-404.liquid` - 404 error page
- Section groups: `header-group.json`, `footer-group.json`

#### Snippets (4)
- `product-card.liquid` - Product card with hover, quick-add, swatches
- `cart-drawer.liquid` - Slide-out cart drawer
- `article-card.liquid` - Blog article card
- `icon.liquid` - SVG icon system

#### Templates (9)
- `index.json` - Homepage
- `product.json` - Product pages
- `collection.json` - Collection pages
- `blog.json` - Blog listing
- `article.json` - Article pages
- `cart.json` - Cart page
- `page.json` - Generic pages
- `404.json` - Error page
- `gift_card.liquid` - Gift card page

#### Assets
- `base.css` - Tailwind-like utility CSS + component styles
- `theme.js` - Cart drawer, mobile menu, AJAX cart, interactions

#### Configuration
- `settings_schema.json` - Theme settings (logo, colors, typography, social)
- `en.default.json` - English translations

### Technical Details
- Converted from React useState to Shopify AJAX Cart API
- Replaced Tailwind CSS with custom utility classes
- Implemented vanilla JavaScript for all interactions
- Mobile-first responsive design maintained
- Section schemas for full theme editor customization

---

## Planned Updates

### [1.2.0] - Upcoming
- [ ] Predictive search with AJAX
- [ ] Product quick view modal
- [ ] Wishlist functionality
- [ ] Size guide modal
- [ ] Back in stock notifications

### [1.3.0] - Future
- [ ] Multi-currency support
- [ ] Product reviews integration
- [ ] Advanced filtering (price, color, size)
- [ ] Mega menu navigation
- [ ] Video support in product gallery

---

## Migration Notes

### From React Version
The original React/Vite application used:
- React Router → Shopify URL routes
- useState/useContext → Shopify AJAX API + vanilla JS
- Tailwind CSS → Custom utility CSS in base.css
- Mock data → Shopify product/collection objects
- Component props → Liquid variables and section settings

### Key Differences
| React | Shopify |
|-------|---------|
| `useState` | JavaScript + DOM manipulation |
| `useEffect` | `DOMContentLoaded` + event listeners |
| Props | Liquid `{% render 'snippet', var: value %}` |
| CSS Modules | `{% style %}` blocks with `section.id` |
| fetch() | Shopify AJAX API endpoints |
