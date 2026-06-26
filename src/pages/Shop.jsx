import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // URL Params Syncing
  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const maxPriceFilter = Number(searchParams.get('maxPrice')) || 400;
  const sortBy = searchParams.get('sort') || 'featured';

  // Local search query so we don't spam URL on every single keystroke immediately (we can use a search form)
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', localSearch);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setLocalSearch('');
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      // Category Match
      const matchesCategory =
        categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
      
      // Search Match
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price Match
      const matchesPrice = product.price <= maxPriceFilter;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured' / default (sort by stock or item stability)
      return a.id.localeCompare(b.id);
    });

  return (
    <div className="container animate-fade-in">
      <div style={{ padding: '3rem 0 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Our Collection</h1>
        <p style={{ color: 'hsl(var(--muted))', marginTop: '0.25rem' }}>
          Explore our collection of minimal lifestyle products.
        </p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          {/* Categories */}
          <div className="shop-sidebar-section">
            <h3 className="shop-sidebar-title">Categories</h3>
            <div className="category-filter-list">
              {['all', 'apparel', 'accessories', 'living', 'wellness'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateParam('category', cat)}
                  className={`category-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                >
                  <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                    ({cat === 'all' ? products.length : products.filter((p) => p.category === cat).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="shop-sidebar-section">
            <h3 className="shop-sidebar-title">Price Range</h3>
            <div className="price-range-container">
              <input
                type="range"
                min="0"
                max="400"
                step="10"
                value={maxPriceFilter}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="price-slider"
              />
              <div className="price-range-inputs">
                <span>$0</span>
                <span style={{ fontWeight: '700', color: 'hsl(var(--accent))' }}>Up to ${maxPriceFilter}</span>
                <span>$400</span>
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={handleResetFilters}
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </aside>

        {/* Catalog Main Panel */}
        <main>
          {/* Controls Bar */}
          <div className="shop-controls">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="shop-search-bar">
              <input
                type="text"
                placeholder="Search collection..."
                className="form-input"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <Search size={18} />
            </form>

            {/* Results Count & Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'hsl(var(--muted))' }}>
                Showing {filteredProducts.length} results
              </span>
              
              <div className="shop-sort">
                <select
                  value={sortBy}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                border: '1px dashed hsl(var(--border))',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'hsl(var(--card) / 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <SlidersHorizontal size={40} style={{ color: 'hsl(var(--muted))', opacity: 0.7 }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>No products match filters</h3>
              <p style={{ color: 'hsl(var(--muted))', maxWidth: '320px', fontSize: '0.95rem' }}>
                Try adjusting your search terms, categories, or price slider parameters.
              </p>
              <button onClick={handleResetFilters} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;
