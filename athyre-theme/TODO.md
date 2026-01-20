# TODO.md - Development Tasks

## Current Sprint

### High Priority
- [ ] Test theme on Shopify development store
- [ ] Add product images via Shopify admin
- [ ] Create navigation menus (main-menu, footer-menu)
- [ ] Configure theme settings in customizer
- [ ] Test cart flow end-to-end

### Medium Priority
- [ ] Add predictive search AJAX
- [ ] Implement product quick view modal
- [ ] Add size guide modal/popup
- [ ] Create announcement bar section
- [ ] Add image-with-text section for about content

### Low Priority
- [ ] Add more icon variants to icon.liquid
- [ ] Create color swatch component with images
- [ ] Add breadcrumb navigation
- [ ] Implement infinite scroll for collections

---

## Backlog

### Features
- [ ] Wishlist functionality (requires app or metafields)
- [ ] Product reviews (Shopify Reviews app integration)
- [ ] Back in stock notifications
- [ ] Recently viewed products
- [ ] Product comparison
- [ ] Gift wrapping option
- [ ] Store locator (if applicable)

### Performance
- [ ] Implement critical CSS extraction
- [ ] Add lazy loading for all images
- [ ] Optimize JavaScript bundle size
- [ ] Add preload hints for key resources
- [ ] Implement service worker for offline support

### Accessibility
- [ ] Audit with axe DevTools
- [ ] Add skip navigation links
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add ARIA labels where missing
- [ ] Test with screen reader

### SEO
- [ ] Add structured data (JSON-LD) for products
- [ ] Add structured data for articles
- [ ] Optimize meta descriptions
- [ ] Add Open Graph tags
- [ ] Create XML sitemap customization

### Internationalization
- [ ] Add French translations (fr.json)
- [ ] Add Spanish translations (es.json)
- [ ] Implement currency selector
- [ ] Add language selector

---

## Completed

### v1.1.0
- [x] Add customer account templates
- [x] Add search page
- [x] Add collections list page
- [x] Add password page
- [x] Fix theme validation errors

### v1.0.0
- [x] Create theme structure
- [x] Convert header component
- [x] Convert footer component
- [x] Create hero banner section
- [x] Create featured collection section
- [x] Create product card snippet
- [x] Create cart drawer
- [x] Create product page
- [x] Create collection page
- [x] Create blog pages
- [x] Create cart page
- [x] Add all JSON templates
- [x] Implement AJAX cart
- [x] Add mobile menu
- [x] Create CSS utilities

---

## Notes

### Before Launch Checklist
1. [ ] All products created with images
2. [ ] Collections organized
3. [ ] Navigation menus configured
4. [ ] Theme settings customized (logo, colors)
5. [ ] Social media links added
6. [ ] Payment methods configured
7. [ ] Shipping zones set up
8. [ ] Tax settings configured
9. [ ] Domain connected
10. [ ] Password page disabled
11. [ ] Test orders placed
12. [ ] Mobile testing complete
13. [ ] Browser testing (Chrome, Safari, Firefox, Edge)
14. [ ] Performance audit (Lighthouse)
15. [ ] Accessibility audit

### Known Issues
- None currently tracked

### Technical Debt
- Consider splitting base.css if it grows > 50KB
- May need to modularize theme.js for maintainability
- Some sections could use more customization options
