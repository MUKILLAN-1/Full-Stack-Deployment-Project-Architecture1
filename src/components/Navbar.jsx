import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Handle Search Input Change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (productId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="navbar glass">
        <div className="container nav-content">
          <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            AURA
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
              Shop
            </NavLink>
          </div>

          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="btn-icon-theme"
              style={{ padding: '6px', borderRadius: '50%' }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Search Trigger */}
            <div style={{ position: 'relative' }} ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                style={{ padding: '6px' }}
              >
                <Search size={20} />
              </button>

              {/* Active Search Dropdown Overlay */}
              {isSearchOpen && (
                <div className="search-dropdown animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search collection..."
                      className="form-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <Search size={18} />
                  </form>

                  {searchResults.length > 0 ? (
                    <div className="search-results">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="search-result-item"
                          onClick={() => handleResultClick(product.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="search-result-img"
                          />
                          <div className="search-result-info">
                            <span className="search-result-name">{product.name}</span>
                            <span className="search-result-price">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.trim() !== '' ? (
                    <div style={{ fontSize: '0.85rem', color: 'hsl(var(--muted))', textAlign: 'center', padding: '10px 0' }}>
                      No products found
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: 'hsl(var(--muted))', textAlign: 'center', padding: '10px 0' }}>
                      Type to search...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon trigger */}
            <Link to="/cart" className="cart-trigger" aria-label="View Shopping Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              style={{ padding: '6px' }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className="glass"
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              zIndex: 90,
              boxShadow: 'var(--shadow-lg)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <NavLink
              to="/"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '1.25rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted))'
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '1.25rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted))'
              })}
            >
              Shop
            </NavLink>
          </div>
        )}
      </nav>
      {/* Background shadow click-away for search overlay */}
      {isSearchOpen && <div className="search-overlay active" />}
    </>
  );
};

export default Navbar;
