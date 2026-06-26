import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors[0]?.name || '');
      setSelectedSize(product.sizes && product.sizes[0] || '');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close" aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body">
          <div className="modal-grid">
            {/* Left Column: Image */}
            <div className="detail-main-img" style={{ height: '100%', minHeight: '350px' }}>
              <img
                src={product.mainImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right Column: Info */}
            <div className="detail-info" style={{ justifyContent: 'center' }}>
              <div className="detail-info-header">
                <span className="product-card-category" style={{ fontSize: '0.8rem' }}>
                  {product.category}
                </span>
                <h2 className="detail-title" style={{ fontSize: '1.8rem', marginTop: '0.25rem' }}>
                  {product.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', color: '#eab308' }}>
                    <Star size={16} fill="#eab308" color="#eab308" />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {product.rating} ({product.reviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="detail-price" style={{ fontSize: '1.5rem' }}>
                ${product.price.toFixed(2)}
              </div>

              <p className="detail-desc" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="selector-title">Color: {selectedColor}</h4>
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

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div>
                  <h4 className="selector-title">Size: {selectedSize}</h4>
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

              {/* Actions */}
              <div className="qty-add-to-cart" style={{ marginTop: '0.5rem' }}>
                <div className="qty-selector" style={{ height: '2.75rem' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`btn ${added ? 'btn-secondary' : 'btn-accent'}`}
                  style={{ flexGrow: 1, height: '2.75rem', padding: '0 1.5rem' }}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} />
                  <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
                </button>
              </div>

              {/* Full Details link */}
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'hsl(var(--accent))',
                  marginTop: '0.5rem'
                }}
              >
                <span>View Full Details</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
