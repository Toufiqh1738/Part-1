/**
 * Cape Threads — script.js
 * Shared JS across all pages
 */

// ============================================================
// HAMBURGER MENU (global fallback)
// ============================================================
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

// ============================================================
// CART BADGE — keep in sync across pages
// ============================================================
function updateCartBadge() {
  const cart = JSON.parse(sessionStorage.getItem('ct_cart') || '[]');
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

// ============================================================
// GLOBAL SEARCH BAR (navbar) — redirect to Products page
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const gs = document.getElementById('globalSearch');
  if (gs) {
    gs.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) {
        window.location.href = 'Products.html?q=' + encodeURIComponent(this.value.trim());
      }
    });
  }

  // On Products page, pre-fill search from URL param
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      searchInput.value = q;
      if (typeof filterProducts === 'function') filterProducts();
    }
  }
});

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});