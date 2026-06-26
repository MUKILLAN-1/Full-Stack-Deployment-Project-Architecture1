import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Take the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="container hero-container">
          <span className="badge badge-accent animate-fade-in" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            New Summer Capsule 2026
          </span>
          <h1>
            Refined Essentials <br />
            <span>For the Modern Minimalist</span>
          </h1>
          <p>
            Thoughtfully curated daily necessities designed to blend clean architectural form with premium tactile utility. Elevate your everyday rituals.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Explore Collection
              <ArrowRight size={18} />
            </Link>
            <a href="#featured" className="btn btn-secondary">
              Featured Items
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Browse Categories</h2>
              <p>Explore structured capsules designed for every aspect of your life.</p>
            </div>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'hsl(var(--accent))' }}>
              <span>View All Shop</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            <Link to="/shop?category=apparel" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
                alt="Apparel"
              />
              <div className="category-card-content">
                <h3>Apparel</h3>
                <span>
                  View items <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/shop?category=accessories" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&q=80"
                alt="Accessories"
              />
              <div className="category-card-content">
                <h3>Accessories</h3>
                <span>
                  View items <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/shop?category=living" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                alt="Living"
              />
              <div className="category-card-content">
                <h3>Living</h3>
                <span>
                  View items <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/shop?category=wellness" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                alt="Wellness"
              />
              <div className="category-card-content">
                <h3>Wellness</h3>
                <span>
                  View items <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Featured Products</h2>
              <p>Hand-selected essentials representing our commitment to quality craftsmanship.</p>
            </div>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'hsl(var(--accent))' }}>
              <span>See Entire Shop</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Value Section */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid hsl(var(--border))' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent))' }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Complimentary Shipping</h3>
            <p style={{ color: 'hsl(var(--muted))', fontSize: '0.95rem', maxWidth: '280px' }}>
              Enjoy complimentary standard shipping and premium signature wrapping on all orders over $150.
            </p>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent))' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Sustainable Sourcing</h3>
            <p style={{ color: 'hsl(var(--muted))', fontSize: '0.95rem', maxWidth: '280px' }}>
              We partner directly with certified vertical manufacturing facilities prioritizing minimal waste policies.
            </p>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent))' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Lifetime Guarantee</h3>
            <p style={{ color: 'hsl(var(--muted))', fontSize: '0.95rem', maxWidth: '280px' }}>
              Every product is built to last. We offer complimentary repair or trade-in credits for our core collection.
            </p>
          </div>
        </div>
      </section>

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

export default Home;
