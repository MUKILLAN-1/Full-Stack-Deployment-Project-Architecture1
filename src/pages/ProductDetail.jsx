import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Shield, Truck, RotateCcw, AlertTriangle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Find product by id
  const product = products.find((p) => p.id === id);

  // Initialize selected defaults on product change
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors[0]?.name || '');
      setSelectedSize(product.sizes && product.sizes[0] || '');
      setQuantity(1);
      setActiveImgIndex(0);
      setAdded(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container animate-fade-in" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'hsl(var(--error) / 0.1)', color: 'hsl(var(--error))', marginBottom: '1.5rem' }}>
          <AlertTriangle size={36} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Product Not Found</h2>
        <p style={{ color: 'hsl(var(--muted))', marginTop: '0.5rem', marginBottom: '2rem' }}>
          The product you are looking for does not exist or has been discontinued.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // Get gallery images
  const galleryImages = product.secondaryImages || [product.mainImage];

  return (
    <div className="container animate-fade-in">
      <div className="detail-layout">
        {/* Gallery */}
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={galleryImages[activeImgIndex]} alt={product.name} />
          </div>
          {galleryImages.length > 1 && (
            <div className="detail-thumbs">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImgIndex(index)}
                  className={`detail-thumb ${activeImgIndex === index ? 'active' : ''}`}
                  aria-label={`View thumbnail ${index + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="detail-info">
          <div className="detail-info-header">
            <span className="product-card-category" style={{ fontSize: '0.85rem' }}>
              {product.category}
            </span>
            <h1 className="detail-title">{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', color: '#eab308' }}>
                <Star size={18} fill="#eab308" color="#eab308" />
              </div>
              <span style={{ fontWeight: '500' }}>
                {product.rating} ({product.reviews.length} customer reviews)
              </span>
            </div>
          </div>

          <div className="detail-price">
            ${product.price.toFixed(2)}
          </div>

          <p className="detail-desc" style={{ lineHeight: '1.7' }}>
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h4 className="selector-title">Color: <span style={{ fontWeight: '500', color: 'hsl(var(--foreground))' }}>{selectedColor}</span></h4>
              <div className="color-swatches">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`color-swatch ${selectedColor === color.name ? 'active' : ''}`}
                    title={color.name}
                  >
                    <div className="color-swatch-inner" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
            <div>
              <h4 className="selector-title">Size: <span style={{ fontWeight: '500', color: 'hsl(var(--foreground))' }}>{selectedSize}</span></h4>
              <div className="size-btns">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Cart Actions */}
          <div className="qty-add-to-cart">
            <div className="qty-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn ${added ? 'btn-secondary' : 'btn-accent'}`}
              style={{ flexGrow: 1, height: '3.25rem' }}
              disabled={product.stock === 0}
            >
              <ShoppingBag size={20} />
              <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid hsl(var(--border))', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <Truck size={18} style={{ color: 'hsl(var(--accent))' }} />
              <span style={{ fontWeight: '600' }}>Free Shipping</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <RotateCcw size={18} style={{ color: 'hsl(var(--accent))' }} />
              <span style={{ fontWeight: '600' }}>30-Day Returns</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <Shield size={18} style={{ color: 'hsl(var(--accent))' }} />
              <span style={{ fontWeight: '600' }}>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs specs/reviews section */}
      <div className="tabs-container">
        <div className="tabs-nav">
          <button
            onClick={() => setActiveTab('specs')}
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>

        <div className="tab-panel">
          {activeTab === 'specs' ? (
            <div className="specs-grid">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="specs-item">
                  <span className="specs-label">{key}</span>
                  <span className="specs-val">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="reviews-list">
              {product.reviews.map((rev, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="review-author">{rev.author}</span>
                      <span className="review-date">{new Date(rev.date).toLocaleDateString()}</span>
                    </div>
                    <div className="review-rating">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="#eab308" color="#eab308" />
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '6rem 0 3rem' }}>
          <div className="section-header">
            <h2>You May Also Like</h2>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'hsl(var(--accent))' }}>
              <span>View All Shop</span>
            </Link>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>
      )}

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

export default ProductDetail;
