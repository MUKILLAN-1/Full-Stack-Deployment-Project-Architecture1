import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simulate API subscription
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="logo">AURA</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
              Crafting modern daily essentials for the minimalist lifestyle. Premium quality, sustainable materials, and architectural design.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Collection</h4>
            <div>
              <Link to="/shop">All Products</Link>
              <Link to="/shop?category=apparel">Apparel</Link>
              <Link to="/shop?category=accessories">Accessories</Link>
              <Link to="/shop?category=living">Home & Living</Link>
            </div>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <div>
              <Link to="/shop">Shipping & Returns</Link>
              <Link to="/shop">Sustainability</Link>
              <Link to="/shop">Size Guide</Link>
              <Link to="/shop">Contact Us</Link>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              Subscribe to receive early access to new collections and minimalist design stories.
            </p>
            {subscribed ? (
              <div style={{ color: 'hsl(var(--success))', fontSize: '0.9rem', fontWeight: '500', padding: '8px 0' }}>
                ✓ Thank you! You've been subscribed to the newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: '0.9rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem', fontSize: '0.9rem' }}>
                  Join
                </button>
              </form>
            )}
            {error && (
              <div style={{ color: 'hsl(var(--error))', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ opacity: 0.7 }}>&copy; {new Date().getFullYear()} AURA Boutique. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.7 }}>
            <a href="#" className="hover-link">Instagram</a>
            <a href="#" className="hover-link">Pinterest</a>
            <a href="#" className="hover-link">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
