// ================= MARKETPLACE PAGE JS =================
class MarketplaceApp {
  constructor() {
    this.artworks = [];
    this.filteredArtworks = [];
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.init();
  }

  init() {
    this.cart = JSON.parse(localStorage.getItem('museon-cart')) || [];
    this.bindEvents();
    this.loadArtworks();
    this.updateCartUI();
  }

  bindEvents() {
    // Filters
    $('#category-filter, #sort-filter').on('change', () => this.applyFilters());
    $('#search-input').on('input', debounce(() => this.applyFilters(), 300));
    
    // Load more
    $('#load-more').on('click', () => {
      this.currentPage++;
      this.renderArtworks();
    });

    // Cart modal
    $('#cart-icon').on('click', () => $('#cart-modal').addClass('active'));
    
    // Mobile menu (same as main)
    $('#menu-toggle').on('click', () => $('.nav-list').toggleClass('active'));
  }

  async loadArtworks() {
    // Real API endpoint
    try {
      const response = await fetch('/api/artworks?page=1&limit=100');
      this.artworks = await response.json();
    } catch {
      // Fallback data
      this.artworks = this.generateMockArtworks(100);
    }
    
    this.filteredArtworks = [...this.artworks];
    this.renderArtworks();
  }

  generateMockArtworks(count) {
    const categories = ['Painting', 'Sculpture', 'Digital Art', 'Photography'];
    const artists = ['Emma Johnson', 'Carlos Rivera', 'Aiko Tanaka', 'Liam Chen'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Artwork ${i + 1}`,
      artist: artists[Math.floor(Math.random() * artists.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 800) + 50,
      img: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=400&h=400&fit=crop`,
      description: 'Original artwork by verified artist',
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 200)
    }));
  }

  applyFilters() {
    const category = $('#category-filter').val();
    const sort = $('#sort-filter').val();
    const search = $('#search-input').val().toLowerCase();

    this.filteredArtworks = this.artworks.filter(artwork => {
      return (!category || artwork.category === category) &&
             (!search || artwork.title.toLowerCase().includes(search) || 
              artwork.artist.toLowerCase().includes(search));
    });

    // Sort
    switch(sort) {
      case 'Price: Low to High':
        this.filteredArtworks.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        this.filteredArtworks.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        this.filteredArtworks.sort((a, b) => b.id - a.id);
        break;
    }

    this.currentPage = 1;
    this.renderArtworks();
  }

  renderArtworks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageArtworks = this.filteredArtworks.slice(start, end);

    const grid = $('#marketplace-grid');
    
    if (this.currentPage === 1) {
      grid.empty();
    }

    pageArtworks.forEach(artwork => {
      const html = `
        <article class="artwork-card" data-id="${artwork.id}">
          <div class="artwork-image-wrapper">
            <img src="${artwork.img}" alt="${artwork.title}" class="artwork-image" loading="lazy">
            <div class="quick-actions">
              <button class="quick-btn heart"><i class="far fa-heart"></i></button>
              <button class="quick-btn view" data-id="${artwork.id}">
                <i class="fas fa-eye"></i>
              </button>
            </div>
            ${artwork.sold ? '<div class="sold-badge">SOLD</div>' : ''}
          </div>
          <div class="artwork-content">
            <h3 class="artwork-title">${artwork.title}</h3>
            <p class="artist">${artwork.artist}</p>
            <div class="artwork-meta">
              <span class="category">${artwork.category}</span>
              <span class="views"><i class="fas fa-eye"></i> ${artwork.views.toLocaleString()}</span>
            </div>
            <div class="price-section">
              <span class="price">$${artwork.price.toLocaleString()}</span>
              <button class="btn-buy" data-id="${artwork.id}">Add to Cart</button>
            </div>
          </div>
        </article>
      `;
      grid.append(html);
    });

    // Update load more button
    $('#load-more').toggleClass('hidden', end >= this.filteredArtworks.length);
    
    // Bind new buttons
    this.bindArtworkButtons();
  }

  bindArtworkButtons() {
    $('.btn-buy').off('click').on('click', (e) => {
      const id = $(e.currentTarget).data('id');
      this.addToCart(id);
    });

    $('.quick-btn.view').off('click').on('click', (e) => {
      const id = $(e.currentTarget).data('id');
      this.showArtworkDetail(id);
    });
  }

  // Same cart methods as main.js...
  addToCart(id) {
    const artwork = this.artworks.find(a => a.id === id);
    // ... (same cart logic)
  }

  showArtworkDetail(id) {
    const artwork = this.artworks.find(a => a.id === id);
    if (!artwork) return;

    const modalContent = $('#artwork-modal .artwork-detail-content');
    modalContent.html(`
      <div class="artwork-detail-grid">
        <div class="detail-image">
          <img src="${artwork.img}" alt="${artwork.title}">
        </div>
        <div class="detail-info">
          <h1>${artwork.title}</h1>
          <p class="artist-large">${artwork.artist}</p>
          <div class="detail-price">$${artwork.price.toLocaleString()}</div>
          <p class="detail-description">${artwork.description}</p>
          <div class="detail-meta">
            <span><i class="fas fa-tag"></i> ${artwork.category}</span>
            <span><i class="fas fa-eye"></i> ${artwork.views.toLocaleString()} views</span>
          </div>
          <div class="detail-actions">
            <button class="btn-buy-large" data-id="${artwork.id}">Buy Now - $${artwork.price}</button>
            <button class="btn-secondary">Add to Cart</button>
          </div>
        </div>
      </div>
    `);

    $('#artwork-modal').addClass('active');
  }

  updateCartUI() {
    // Same as main.js
  }
}

// Initialize
$(document).ready(() => {
  window.marketplaceApp = new MarketplaceApp();
});

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}