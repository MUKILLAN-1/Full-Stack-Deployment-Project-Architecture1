import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick Add defaults: 1st color, 1st size
    const defaultColor = product.colors && product.colors[0]?.name;
    const defaultSize = product.sizes && product.sizes[0];
    addToCart(product, 1, defaultColor, defaultSize);
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`} style={{ display: 'block', height: '100%' }}>
          <img src={product.mainImage} alt={product.name} loading="lazy" />
        </Link>
        
        {product.stock <= 5 && (
          <div className="product-badge-overlay">
            <span className="badge badge-error">Only {product.stock} left</span>
          </div>
        )}

        <div className="product-card-actions">
          <button
            onClick={() => onQuickView(product)}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
            title="Quick View"
          >
            <Eye size={18} />
            <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="btn btn-accent"
            style={{ padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)' }}
            title="Add to Bag"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <div className="product-card-rating">
            <Star size={14} fill="#eab308" color="#eab308" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
