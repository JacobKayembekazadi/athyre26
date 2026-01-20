/**
 * ATHYRE Theme JavaScript
 * Handles cart drawer, mobile menu, and AJAX interactions
 */

(function() {
  'use strict';

  // =====================
  // UTILITIES
  // =====================

  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const formatMoney = (cents) => {
    return '$' + (cents / 100).toFixed(2);
  };

  // =====================
  // HEADER
  // =====================

  const initHeader = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = debounce(() => {
      if (window.scrollY > 80) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  };

  // =====================
  // MOBILE MENU
  // =====================

  const initMobileMenu = () => {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
    const closeBtns = document.querySelectorAll('[data-mobile-menu-close]');

    if (!mobileMenu || !toggleBtn) return;

    const openMenu = () => {
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMenu);
    closeBtns.forEach(btn => btn.addEventListener('click', closeMenu));
  };

  // =====================
  // CART DRAWER
  // =====================

  const initCartDrawer = () => {
    const cartDrawer = document.querySelector('[data-cart-drawer]');
    const cartToggles = document.querySelectorAll('[data-cart-toggle]');
    const cartCloses = document.querySelectorAll('[data-cart-close]');

    if (!cartDrawer) return;

    const openCart = () => {
      cartDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
      cartDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    cartToggles.forEach(btn => btn.addEventListener('click', openCart));
    cartCloses.forEach(btn => btn.addEventListener('click', closeCart));

    // Expose globally
    window.Athyre = window.Athyre || {};
    window.Athyre.openCart = openCart;
    window.Athyre.closeCart = closeCart;
  };

  // =====================
  // CART AJAX
  // =====================

  const initCartAjax = () => {
    // Update cart count badges
    const updateCartCount = (count) => {
      const countElements = document.querySelectorAll('[data-cart-count]');
      const countTextElements = document.querySelectorAll('[data-cart-count-text]');

      countElements.forEach(el => {
        el.textContent = count;
        if (count > 0) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });

      countTextElements.forEach(el => {
        el.textContent = `(${count})`;
      });
    };

    // Update cart total
    const updateCartTotal = (total) => {
      const totalElements = document.querySelectorAll('[data-cart-total]');
      totalElements.forEach(el => {
        el.textContent = formatMoney(total);
      });
    };

    // Refresh cart drawer content
    const refreshCartDrawer = async () => {
      try {
        const response = await fetch('/?section_id=cart-drawer');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newItems = doc.querySelector('[data-cart-items]');
        const newFooter = doc.querySelector('[data-cart-footer]');
        const currentItems = document.querySelector('[data-cart-items]');
        const currentFooter = document.querySelector('[data-cart-footer]');

        if (newItems && currentItems) {
          currentItems.innerHTML = newItems.innerHTML;
        }
        if (newFooter && currentFooter) {
          currentFooter.innerHTML = newFooter.innerHTML;
        } else if (newFooter && !currentFooter) {
          document.querySelector('.cart-drawer__content').appendChild(newFooter);
        }

        // Re-init event listeners
        initCartItemListeners();
      } catch (e) {
        console.error('Error refreshing cart:', e);
      }
    };

    // Add to cart
    const addToCart = async (variantId, quantity = 1) => {
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const cartResponse = await fetch('/cart.js');
          const cart = await cartResponse.json();
          updateCartCount(cart.item_count);
          updateCartTotal(cart.total_price);
          await refreshCartDrawer();
          window.Athyre.openCart();
        }

        return data;
      } catch (e) {
        console.error('Error adding to cart:', e);
      }
    };

    // Update cart quantity
    const updateQuantity = async (lineKey, quantity) => {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: lineKey,
            quantity: quantity,
          }),
        });

        const cart = await response.json();
        updateCartCount(cart.item_count);
        updateCartTotal(cart.total_price);
        await refreshCartDrawer();

        return cart;
      } catch (e) {
        console.error('Error updating quantity:', e);
      }
    };

    // Initialize cart item event listeners
    const initCartItemListeners = () => {
      // Quantity buttons
      document.querySelectorAll('[data-quantity-minus]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const lineKey = btn.dataset.lineKey;
          const item = btn.closest('[data-cart-item]');
          const quantityEl = item.querySelector('[data-quantity-value]');
          const currentQty = parseInt(quantityEl.textContent);
          await updateQuantity(lineKey, Math.max(0, currentQty - 1));
        });
      });

      document.querySelectorAll('[data-quantity-plus]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const lineKey = btn.dataset.lineKey;
          const item = btn.closest('[data-cart-item]');
          const quantityEl = item.querySelector('[data-quantity-value]');
          const currentQty = parseInt(quantityEl.textContent);
          await updateQuantity(lineKey, currentQty + 1);
        });
      });

      // Remove buttons
      document.querySelectorAll('[data-remove-item]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const lineKey = btn.dataset.lineKey;
          await updateQuantity(lineKey, 0);
        });
      });
    };

    // Add to cart buttons
    document.addEventListener('click', async (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        e.preventDefault();
        const variantId = addBtn.dataset.variantId;
        if (variantId) {
          await addToCart(variantId);
        }
      }
    });

    // Product form submissions
    document.addEventListener('submit', async (e) => {
      const form = e.target.closest('[data-product-form]');
      if (form) {
        e.preventDefault();
        const formData = new FormData(form);
        const variantId = formData.get('id');
        const quantity = formData.get('quantity') || 1;
        if (variantId) {
          await addToCart(variantId, parseInt(quantity));
        }
      }
    });

    initCartItemListeners();

    // Expose globally
    window.Athyre = window.Athyre || {};
    window.Athyre.addToCart = addToCart;
    window.Athyre.updateQuantity = updateQuantity;
  };

  // =====================
  // PRODUCT CARD QUICK ADD
  // =====================

  const initProductCardQuickAdd = () => {
    // Desktop quick add toggle
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-quick-add-toggle]');
      if (toggle) {
        e.preventDefault();
        const card = toggle.closest('.product-card');
        const selector = card.querySelector('[data-size-selector]');
        if (selector) {
          const isHidden = selector.hasAttribute('hidden');
          selector.toggleAttribute('hidden', !isHidden);
          toggle.style.display = isHidden ? 'none' : '';
        }
      }
    });

    // Mobile quick add toggle
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-quick-add-toggle-mobile]');
      if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        const card = toggle.closest('.product-card');
        const selector = card.querySelector('[data-size-selector-mobile]');
        if (selector) {
          selector.toggleAttribute('hidden');
        }
      }
    });

    // Close size selectors when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.product-card__quick-add') &&
          !e.target.closest('[data-size-selector-mobile]') &&
          !e.target.closest('[data-quick-add-toggle-mobile]')) {
        document.querySelectorAll('[data-size-selector]').forEach(el => {
          el.setAttribute('hidden', '');
        });
        document.querySelectorAll('[data-size-selector-mobile]').forEach(el => {
          el.setAttribute('hidden', '');
        });
        document.querySelectorAll('[data-quick-add-toggle]').forEach(btn => {
          btn.style.display = '';
        });
      }
    });
  };

  // =====================
  // DROPDOWN MENUS
  // =====================

  const initDropdowns = () => {
    const dropdownItems = document.querySelectorAll('.header__nav-item--has-dropdown');

    dropdownItems.forEach(item => {
      const btn = item.querySelector('.header__nav-link');
      const dropdown = item.querySelector('.header__dropdown');

      if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !isExpanded);
        });
      }
    });
  };

  // =====================
  // INIT
  // =====================

  const init = () => {
    initHeader();
    initMobileMenu();
    initCartDrawer();
    initCartAjax();
    initProductCardQuickAdd();
    initDropdowns();
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
