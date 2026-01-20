# ATHYRE Shopify Store Setup Guide

This guide walks you through setting up your Shopify store content to match the original design.

---

## 1. Create Products (Required First)

Go to **Shopify Admin → Products → Add product**

### Product 1: Rise Sports Bra
- **Title:** Rise Sports Bra
- **Price:** $68.00
- **Description:** High-support sports bra engineered for intense workouts. Features moisture-wicking fabric and a secure fit.
- **Images:** Upload 2 product photos
- **Options:**
  - Color: Black, Navy, Cherry
  - Size: XS, S, M, L, XL
- **Tags:** `new`, `tops`, `rise-collection`
- **Inventory:** Track quantity, set stock levels

### Product 2: Rise Leggings
- **Title:** Rise Leggings
- **Price:** $88.00
- **Description:** Premium performance leggings with 4-way stretch, high waist, and hidden pocket.
- **Options:**
  - Color: Black, Navy, Cherry
  - Size: XS, S, M, L, XL
- **Tags:** `bottoms`, `rise-collection`

### Product 3: Rise Tank
- **Title:** Rise Tank
- **Price:** $48.00
- **Description:** Lightweight breathable tank for training and everyday movement.
- **Options:**
  - Color: Black, Navy, Cherry
  - Size: XS, S, M, L, XL
- **Tags:** `tops`, `rise-collection`

### Product 4: Rise Shorts
- **Title:** Rise Shorts
- **Price:** $58.00
- **Description:** Performance shorts with built-in liner and secure waistband.
- **Options:**
  - Color: Black, Navy, Cherry
  - Size: XS, S, M, L, XL
- **Tags:** `bottoms`, `rise-collection`

### Product 5: Rise Long Sleeve Top
- **Title:** Rise Long Sleeve Top
- **Price:** $72.00
- **Description:** Versatile long sleeve training top with thumbholes and reflective details.
- **Options:**
  - Color: Black, Navy
  - Size: XS, S, M, L, XL
- **Tags:** `new`, `tops`, `rise-collection`

### Product 6: Rise Crop Top
- **Title:** Rise Crop Top
- **Price:** $52.00
- **Description:** Cropped training top with modern cut and soft stretch fabric.
- **Options:**
  - Color: Black, Cherry
  - Size: XS, S, M, L
- **Tags:** `tops`, `rise-collection`

### Product 7: Rise Joggers
- **Title:** Rise Joggers
- **Price:** $78.00
- **Description:** Tapered joggers perfect for warm-ups, cool-downs, and everything in between.
- **Options:**
  - Color: Black, Navy
  - Size: XS, S, M, L, XL
- **Tags:** `bottoms`, `rise-collection`

### Product 8: Rise Sports Jacket
- **Title:** Rise Sports Jacket
- **Price:** $98.00
- **Description:** Lightweight jacket with water-resistant finish and packable design.
- **Options:**
  - Color: Black, Navy, Cherry
  - Size: S, M, L, XL
- **Tags:** `new`, `outerwear`, `rise-collection`

---

## 2. Create Collections

Go to **Shopify Admin → Products → Collections → Create collection**

### Collection 1: Rise Collection (Main Collection)
- **Title:** Rise Collection
- **Description:** Engineered for peak performance. The Rise Collection features premium activewear designed for those who demand more.
- **Collection type:** Manual (add all 8 products)
- **Collection image:** Upload hero image

### Collection 2: Tops
- **Title:** Tops
- **Condition:** Products tagged with `tops`
- **Collection type:** Automated

### Collection 3: Bottoms
- **Title:** Bottoms
- **Condition:** Products tagged with `bottoms`
- **Collection type:** Automated

### Collection 4: New Arrivals
- **Title:** New Arrivals
- **Condition:** Products tagged with `new`
- **Collection type:** Automated

---

## 3. Create Navigation Menus

Go to **Shopify Admin → Online Store → Navigation**

### Main Menu (Header)
Create menu called `main-menu` with these items:

| Label | Link |
|-------|------|
| Shop | /collections/all |
| Rise Collection | /collections/rise-collection |
| Tops | /collections/tops |
| Bottoms | /collections/bottoms |
| New | /collections/new-arrivals |
| Journal | /blogs/journal |

### Footer Menu
Create menu called `footer-menu` with these items:

| Label | Link |
|-------|------|
| Shop All | /collections/all |
| Rise Collection | /collections/rise-collection |
| About Us | /pages/about |
| Contact | /pages/contact |
| Shipping & Returns | /pages/shipping-returns |
| Size Guide | /pages/size-guide |

---

## 4. Create Blog Posts (Journal)

Go to **Shopify Admin → Online Store → Blog posts**

First, create a blog called **Journal** if it doesn't exist.

### Article 1: Pre-Workout Energy Bites Recipe
- **Title:** Pre-Workout Energy Bites Recipe
- **Author:** Sarah Chen
- **Content:** Fuel your workout with these delicious, nutritious energy bites packed with protein and healthy fats. [Add full recipe content]
- **Featured image:** Food/recipe image
- **Tags:** Recipe

### Article 2: Morning Movement Mix
- **Title:** Morning Movement Mix
- **Author:** DJ Riley
- **Content:** Wake up and energize with this curated playlist designed to get you moving and motivated. [Add playlist details]
- **Featured image:** Music/workout image
- **Tags:** Playlist

### Article 3: Perfect Form: Mastering the Squat
- **Title:** Perfect Form: Mastering the Squat
- **Author:** Coach Marcus
- **Content:** Learn the fundamentals of proper squat technique to maximize results and prevent injury. [Add technique guide]
- **Featured image:** Fitness/training image
- **Tags:** Fitness Tip

---

## 5. Create Pages

Go to **Shopify Admin → Online Store → Pages**

### About Page
- **Title:** About ATHYRE
- **Content:** Our story, mission, values

### Contact Page
- **Title:** Contact Us
- **Content:** Contact form, email, social links

### Shipping & Returns
- **Title:** Shipping & Returns
- **Content:** Shipping policy, return process

### Size Guide
- **Title:** Size Guide
- **Content:** Size chart for all products

---

## 6. Configure Theme Settings

Go to **Shopify Admin → Online Store → Themes → Customize**

### Logo & Branding
1. Click **Theme settings** (gear icon)
2. Upload your logo
3. Set logo width (120px recommended)
4. Upload favicon

### Colors (already set, but verify)
- Primary: #000000 (black)
- Background: #FFFFFF (white)
- Text: #000000 (black)

### Homepage Sections
1. **Hero Banner**
   - Heading: "MOVE WITH PURPOSE"
   - Subheading: "Premium activewear engineered for those who demand more."
   - Button text: "Shop Collection"
   - Button link: /collections/rise-collection
   - Upload background image

2. **Featured Collection**
   - Select collection: Rise Collection
   - Products to show: 4
   - Heading: "THE RISE COLLECTION"

3. **Newsletter**
   - Heading: "JOIN THE MOVEMENT"
   - Text: "Unlock 10% off your first order..."

### Header Settings
- Select menu: main-menu
- Enable transparent header on homepage: Yes
- Show search icon: Yes
- Show account icon: Yes

### Footer Settings
- Select menu: footer-menu
- Add social media links

---

## 7. Final Checklist

- [ ] 8 products created with images
- [ ] 4 collections created
- [ ] Main menu configured
- [ ] Footer menu configured
- [ ] 3 blog posts published
- [ ] 4 pages created
- [ ] Theme settings configured
- [ ] Logo uploaded
- [ ] Social links added
- [ ] Test cart functionality
- [ ] Test checkout flow
- [ ] Preview on mobile

---

## Quick Tips

### Product Images
- Use consistent aspect ratio (4:5 recommended)
- Upload at least 2 images per product
- First image is the main/featured image
- Second image shows on hover

### Tags for "New" Badge
Products tagged with `new` will show a "NEW" badge on product cards.

### Collection for Homepage
The Featured Collection section on homepage needs you to select a collection in the theme customizer.

---

## Need Help?

If something isn't working:
1. Check that menus are named exactly `main-menu` and `footer-menu`
2. Ensure collections have products assigned
3. Verify the blog is named `journal` (lowercase)
4. Clear browser cache and refresh

---

Setup complete! Your store should now display all content as designed.
