// ================= MUSEON - PRODUCTION JS =================
class MuseonApp {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('museon-cart')) || [];
    this.galleryData = [];
    this.marketplaceData = [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadGallery();
    this.loadMarketplace();
    this.updateCartUI();
    this.setupScrollEffects();
    this.setupParticles();
    this.setupIntersectionObserver();
  }

  // ================= EVENT BINDERS =================
  bindEvents() {
    // Mobile menu
    $('#menu-toggle').on('click', () => $('.nav-list').toggleClass('active'));
    
    // Smooth scrolling
    $('a[href^="#"]').on('click', (e) => {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 800, 'swing');
        $('.nav-list').removeClass('active');
      }
    });

    // Forms
    $('#contact-form').on('submit', (e) => this.handleContactSubmit(e));
    $('#login-form').on('submit', (e) => this.handleLoginSubmit(e));
    
    // Modals
    $('#login').on('click', () => $('#login-modal').addClass('active'));
    $('.modal-close, .modal').on('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        $('.modal').removeClass('active');
      }
    });
    
    $('#cart-icon').on('click', () => $('#cart-modal').addClass('active'));
    $('.checkout-btn').on('click', () => this.handleCheckout());
    
    // Auth toggle
    $('#show-register').on('click', (e) => {
      e.preventDefault();
      $('#login-form h3').text('Artist Registration');
      $('#login-form .auth-toggle').html('Already have an account? <a href="#" id="show-login">Login here</a>');
      $('#show-login').on('click', (e) => {
        e.preventDefault();
        $('#login-form h3').text('Artist Login');
        $('#login-form .auth-toggle').html('Don\'t have an account? <a href="#" id="show-register">Register here</a>');
      });
    });

    // Window events
    $(window).on('scroll', () => this.handleScroll());
    $(window).on('resize', () => this.handleResize());
  }

  // ================= DATA LOADING =================
  async loadGallery() {
    try {
      // Mock API - replace with your real endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=12');
      this.galleryData = await response.json();
      this.renderGallery();
    } catch (error) {
      console.error('Gallery load failed:', error);
      this.renderGalleryFallback();
    }
  }

  async loadMarketplace() {
    // Marketplace data with prices
    this.marketplaceData = [
      { id: 1, title: 'Sunset Over Paris', artist: 'Emma Johnson', price: 299, img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', sold: false },
      { id: 2, title: 'Abstract Dreams', artist: 'Carlos Rivera', price: 189, img: 'https://images.unsplash.com/photo-1579929933071-d9d5f1e9de68?w=400&h=400&fit=crop', sold: false },
      { id: 3, title: 'Ocean Whisper', artist: 'Aiko Tanaka', price: 450, img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop', sold: false },
      { id: 4, title: 'City Lights', artist: 'Liam Chen', price: 125, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop', sold: true },
      // Add more...
    ];
    this.renderMarketplace();
  }

  // ================= RENDERING =================
  renderGallery() {
    const grid = $('#gallery-grid');
    grid.empty();
    
    this.galleryData.slice(0, 12).forEach((item, index) => {
      const html = `
        <article class="gallery-item fade-in-up" style="animation-delay: ${index * 0.1}s">
          <img src="${item.thumbnailUrl}" alt="${item.title}" class="gallery-image" loading="lazy">
          <div class="overlay">
            <h3>${item.title}</h3>
            <p>by ${this.getRandomArtist()}</p>
            <div class="overlay-actions">
              <button class="btn-view"><i class="fas fa-eye"></i> View</button>
              <button class="btn-like"><i class="far fa-heart"></i></button>
            </div>
          </div>
        </article>
      `;
      grid.append(html);
    });
  }

  renderMarketplace() {
    const grid = $('#marketplace-grid');
    grid.empty();
    
    this.marketplaceData.forEach((item, index) => {
      if (!item.sold) {
        const html = `
          <article class="artwork-card fade-in-up" style="animation-delay: ${index * 0.1}s" data-id="${item.id}">
            <div class="artwork-image-wrapper">
              <img src="${item.img}" alt="${item.title}" class="artwork-image" loading="lazy">
              <div class="quick-actions">
                <button class="quick-btn wishlist"><i class="far fa-heart"></i></button>
                <button class="quick-btn cart-add" data-id="${item.id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
            <div class="artwork-content">
              <h3>${item.title}</h3>
              <p class="artist">${item.artist}</p>
              <div class="price-section">
                <span class="price">$${item.price}</span>
                <button class="btn-buy" data-id="${item.id}">Add to Cart</button>
              </div>
            </div>
          </article>
        `;
        grid.append(html);
      }
    });

    // Bind cart buttons
    $('.cart-add, .btn-buy').off('click').on('click', (e) => {
      const id = $(e.target).data('id') || $(e.target).closest('.artwork-card').data('id');
      this.addToCart(id);
    });
  }

  renderGalleryFallback() {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1579783902614-a3bd66f832ad?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
      // Add more fallback images
    ];
    
    const grid = $('#gallery-grid');
    grid.empty();
    for (let i = 0; i < 9; i++) {
      grid.append(`
        <div class="gallery-item">
          <img src="${fallbackImages[i % fallbackImages.length]}" alt="Gallery artwork ${i+1}">
          <div class="overlay">
            <h3>Featured Artwork ${i+1}</h3>
            <p>Renowned Artist</p>
          </div>
        </div>
      `);
    }
  }

  // ================= CART FUNCTIONALITY =================
  addToCart(itemId) {
    const item = this.marketplaceData.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(cartItem => cartItem.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('museon-cart', JSON.stringify(this.cart));
    this.updateCartUI();
    
    // Success feedback
    this.showNotification(`Added "${item.title}" to cart!`, 'success');
  }

  updateCartUI() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    $('#cart-count').text(count);
    $('#cart-total-items').text(count);
    $('#cart-total-price').text(total.toFixed(2));
    
    this.renderCartModal();
  }

  renderCartModal() {
    const container = $('#cart-items');
    container.empty();
    
    if (this.cart.length === 0) {
      container.html('<p class="empty-cart">Your cart is empty</p>');
      return;
    }
    
    this.cart.forEach(item => {
      const html = `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4>${item.title}</h4>
            <p>${item.artist}</p>
            <div class="quantity-controls">
              <button class="qty-btn" onclick="app.decrementQty(${item.id})">-</button>
              <span class="qty">${item.quantity}</span>
              <button class="qty-btn" onclick="app.incrementQty(${item.id})">+</button>
            </div>
          </div>
          <div class="cart-item-price">
            $${(item.price * item.quantity).toFixed(2)}
            <button class="remove-btn" onclick="app.removeFromCart(${item.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      container.append(html);
    });
  }

  incrementQty(id) { 
    const item = this.cart.find(i => i.id === id);
    if (item) item.quantity++; 
    localStorage.setItem('museon-cart', JSON.stringify(this.cart));
    this.updateCartUI(); 
  }

  decrementQty(id) {
    const item = this.cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(id);
    }
    localStorage.setItem('museon-cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    localStorage.setItem('museon-cart', JSON.stringify(this.cart));
    this.updateCartUI();
    this.showNotification('Item removed from cart', 'warning');
  }

  handleCheckout() {
    if (this.cart.length === 0) return;
    
    // Stripe integration ready
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Mock Stripe redirect
    this.showNotification(`Redirecting to checkout for $${total.toFixed(2)}...`, 'success');
    
    // Real Stripe: window.location.href = `/api/create-checkout-session?total=${total}`;
    
    setTimeout(() => {
      alert('🛒 Checkout would redirect to Stripe here!\n\nTotal: $' + total.toFixed(2));
      this.cart = [];
      localStorage.removeItem('museon-cart');
      this.updateCartUI();
      $('#cart-modal').removeClass('active');
    }, 1500);
  }

  // ================= UI EFFECTS =================
  handleScroll() {
    const scrolled = $(window).scrollTop();
    $('.header').toggleClass('scrolled', scrolled > 50);
  }

  setupScrollEffects() {
    // Parallax hero
    $(window).on('scroll', () => {
      const scrolled = $(window).scrollTop();
      $('.hero-section').css('transform', `translateY(${scrolled * 0.5}px)`);
    });
  }

  setupParticles() {
    // Hero particles effect
    if (particlesJS) {
      particlesJS('home', {
        particles: {
          number: { value: 80 },
          color: { value: ['#0077cc', '#ff6b6b', '#51cf66'] },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { speed: 1 }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: 'repulse' } }
        }
      });
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .artwork-card, .exhibition-card').forEach(el => {
      observer.observe(el);
    });
  }

  // ================= FORM HANDLERS =================
  async handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Show loading
    const btn = $(e.target).find('button[type="submit"]');
    const originalText = btn.html();
    btn.html('<i class="fas fa-spinner spinner"></i> Sending...').prop('disabled', true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.showNotification('Message sent successfully! 🎨', 'success');
      e.target.reset();
    } catch (error) {
      this.showNotification('Oops! Something went wrong. Please try again.', 'error');
    } finally {
      btn.html(originalText).prop('disabled', false);
    }
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = $('#user-email').val();
    const password = $('#user-password').val();
    
    // Mock auth
    localStorage.setItem('museon-user', JSON.stringify({ email, loggedIn: true }));
    this.showNotification(`Welcome back, ${email.split('@')[0]}! 🎨`, 'success');
    $('#login-modal').removeClass('active');
    $('.btn-login').text('Dashboard').addClass('btn-primary');
  }

  // ================= UTILITIES =================
  getRandomArtist() {
    const artists = ['Emma Johnson', 'Carlos Rivera', 'Aiko Tanaka', 'Liam Chen', 'Sophia Müller', 'Raj Patel'];
    return artists[Math.floor(Math.random() * artists.length)];
  }

  showNotification(message, type = 'info') {
    const colors = {
      success: '#51cf66', error: '#ff4757', warning: '#ffd43b', info: '#0077cc'
    };
    
    const notification = $(`
      <div class="notification ${type}" style="
        position: fixed; top: 100px; right: 20px; padding: 1rem 1.5rem;
        background: ${colors[type]}; color: white; border-radius: 10px;
        box-shadow: var(--shadow); z-index: 10000; transform: translateX(400px);
        transition: var(--transition);
      ">
        ${message}
      </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => notification.css('transform', 'translateX(0)'), 100);
    setTimeout(() => {
      notification.css('transform', 'translateX(400px)');
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }

  handleResize() {
    // Handle responsive layouts
    if ($(window).width() < 768) {
      $('.nav-list').removeClass('active');
    }
  }
}

// ================= INIT APP =================
$(document).ready(() => {
  window.app = new MuseonApp();
});

// ================= SERVICE WORKER (PWA) =================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW failed'));
  });
}