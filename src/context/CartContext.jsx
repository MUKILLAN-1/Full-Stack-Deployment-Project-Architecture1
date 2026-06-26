import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, color = null, size = null) => {
    // If color/size is not selected, fallback to product defaults if available
    const itemColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const itemSize = size || (product.sizes && product.sizes[0]) || 'Standard';

    setCartItems((prevItems) => {
      // Find if item already exists in cart with same color and size
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === itemColor &&
          item.selectedSize === itemSize
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const currentQty = newItems[existingItemIndex].quantity;
        // Limit quantity to stock
        const newQty = Math.min(currentQty + quantity, product.stock || 99);
        newItems[existingItemIndex].quantity = newQty;
        return newItems;
      } else {
        return [...prevItems, { product, quantity, selectedColor: itemColor, selectedSize: itemSize }];
      }
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (productId, color, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          const maxStock = item.product.stock || 99;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping over $150, otherwise $15 flat
  const cartShipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  
  // Tax: 8.25%
  const cartTaxes = cartSubtotal * 0.0825;
  const cartTotal = cartSubtotal + cartShipping + cartTaxes;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTaxes,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
