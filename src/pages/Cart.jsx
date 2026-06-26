import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, CreditCard, CheckCircle2, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartShipping,
    cartTaxes,
    cartTotal,
  } = useCart();

  // Wizard Steps: 1 = Cart, 2 = Shipping, 3 = Payment, 4 = Success
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });
  const [shippingErrors, setShippingErrors] = useState({});

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [paymentErrors, setPaymentErrors] = useState({});

  // Shipping Input Handlers
  const handleShippingChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (shippingErrors[e.target.name]) {
      setShippingErrors({ ...shippingErrors, [e.target.name]: '' });
    }
  };

  // Payment Input Handlers
  const handlePaymentChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    if (paymentErrors[e.target.name]) {
      setPaymentErrors({ ...paymentErrors, [e.target.name]: '' });
    }
  };

  // Validation Actions
  const validateShipping = () => {
    const errors = {};
    if (!shippingForm.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!shippingForm.address.trim()) errors.address = 'Street Address is required.';
    if (!shippingForm.city.trim()) errors.city = 'City is required.';
    if (!/^\d{5}$/.test(shippingForm.zipCode)) errors.zipCode = 'ZIP Code must be exactly 5 digits.';
    if (!/^\+?[\d-\s]{10,15}$/.test(shippingForm.phone)) errors.phone = 'Please enter a valid phone number (10-15 digits).';

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    if (!paymentForm.cardName.trim()) errors.cardName = 'Cardholder name is required.';
    if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Card number must be 16 digits.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.cardExpiry)) errors.cardExpiry = 'Expiry must be in MM/YY format.';
    if (!/^\d{3,4}$/.test(paymentForm.cardCvv)) errors.cardCvv = 'CVV must be 3 or 4 digits.';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateShipping()) setStep(3);
    } else if (step === 3) {
      if (validatePayment()) {
        // Complete checkout
        const randomId = `AURA-${Math.floor(100000 + Math.random() * 900000)}-2026`;
        setOrderId(randomId);
        setStep(4);
      }
    }
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleOrderSuccessComplete = () => {
    clearCart();
    setStep(1);
    setShippingForm({ fullName: '', address: '', city: '', zipCode: '', phone: '' });
    setPaymentForm({ cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '' });
  };

  // If cart is empty and we are not in order success, show Empty Cart
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="container animate-fade-in" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--muted))', marginBottom: '1.5rem' }}>
          <ShoppingBag size={36} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: 'hsl(var(--muted))', marginTop: '0.5rem', marginBottom: '2rem' }}>
          You haven't added any products to your bag yet. Browse our shop to discover premium essentials.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <div style={{ padding: '3rem 0 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center' }}>Checkout Flow</h1>
        <p style={{ color: 'hsl(var(--muted))', marginTop: '0.25rem', textAlign: 'center' }}>
          Secure Checkout with Aura Boutique
        </p>
      </div>

      {/* Checkout Wizard Stepper */}
      <div className="checkout-stepper">
        <div className={`step-node ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
          <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
          <span className="step-label">Bag</span>
        </div>
        <div className={`step-node ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
          <div className="step-circle">{step > 2 ? '✓' : '2'}</div>
          <span className="step-label">Shipping</span>
        </div>
        <div className={`step-node ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
          <div className="step-circle">{step > 3 ? '✓' : '3'}</div>
          <span className="step-label">Payment</span>
        </div>
        <div className={`step-node ${step === 4 ? 'completed active' : ''}`}>
          <div className="step-circle">4</div>
          <span className="step-label">Success</span>
        </div>
      </div>

      {/* Main wizard layouts */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
        
        {/* Step 1: Cart Items Review */}
        {step === 1 && (
          <div className="cart-layout">
            <div className="cart-items-list">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Review Items</h2>
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.product.mainImage} alt={item.product.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">
                      <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                    </h3>
                    <div className="cart-item-meta">
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                      {item.selectedSize !== 'One Size' && (
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      )}
                    </div>
                    <div className="cart-item-actions">
                      <div className="qty-selector" style={{ height: '2.25rem' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="qty-btn"
                          style={{ width: '2rem' }}
                        >
                          -
                        </button>
                        <span className="qty-value" style={{ width: '2rem' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="qty-btn"
                          style={{ width: '2rem' }}
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="cart-item-remove"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div>
              <div className="summary-box glass">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{cartShipping === 0 ? 'Free' : `$${cartShipping.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-row">
                    <span>Estimated Tax</span>
                    <span>${cartTaxes.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handleNextStep} className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Proceed to Shipping</span>
                  <ArrowRight size={18} />
                </button>
                
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted))', textAlign: 'center', marginTop: '0.5rem' }}>
                  Complimentary standard shipping on orders over $150.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Form */}
        {step === 2 && (
          <div className="checkout-wizard">
            <h2 className="wizard-title">Shipping Address</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Evelyn King"
                  className="form-input"
                  value={shippingForm.fullName}
                  onChange={handleShippingChange}
                />
                {shippingErrors.fullName && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{shippingErrors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="120 Mercer St, Loft 4B"
                  className="form-input"
                  value={shippingForm.address}
                  onChange={handleShippingChange}
                />
                {shippingErrors.address && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{shippingErrors.address}</span>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                    className="form-input"
                    value={shippingForm.city}
                    onChange={handleShippingChange}
                  />
                  {shippingErrors.city && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{shippingErrors.city}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="10012"
                    className="form-input"
                    value={shippingForm.zipCode}
                    onChange={handleShippingChange}
                  />
                  {shippingErrors.zipCode && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{shippingErrors.zipCode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="212-555-0199"
                  className="form-input"
                  value={shippingForm.phone}
                  onChange={handleShippingChange}
                />
                {shippingErrors.phone && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{shippingErrors.phone}</span>}
              </div>

              <div className="wizard-buttons">
                <button type="button" onClick={handleBackStep} className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back to Bag</span>
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment Form */}
        {step === 3 && (
          <div className="checkout-wizard">
            <h2 className="wizard-title">Payment Information</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              
              <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'hsl(var(--secondary) / 0.5)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid hsl(var(--border))' }}>
                <CreditCard size={20} style={{ color: 'hsl(var(--accent))' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Credit / Debit Card Secured Payment</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Evelyn King"
                  className="form-input"
                  value={paymentForm.cardName}
                  onChange={handlePaymentChange}
                />
                {paymentErrors.cardName && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{paymentErrors.cardName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4111222233334444"
                  className="form-input"
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentChange}
                />
                {paymentErrors.cardNumber && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{paymentErrors.cardNumber}</span>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cardExpiry">Expiration Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    className="form-input"
                    value={paymentForm.cardExpiry}
                    onChange={handlePaymentChange}
                  />
                  {paymentErrors.cardExpiry && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{paymentErrors.cardExpiry}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cardCvv">CVV Code</label>
                  <input
                    type="text"
                    id="cardCvv"
                    name="cardCvv"
                    placeholder="123"
                    className="form-input"
                    value={paymentForm.cardCvv}
                    onChange={handlePaymentChange}
                  />
                  {paymentErrors.cardCvv && <span style={{ color: 'hsl(var(--error))', fontSize: '0.8rem' }}>{paymentErrors.cardCvv}</span>}
                </div>
              </div>

              <div className="wizard-buttons">
                <button type="button" onClick={handleBackStep} className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back to Shipping</span>
                </button>
                <button type="submit" className="btn btn-accent" style={{ color: 'white' }}>
                  <span>Place Order: ${cartTotal.toFixed(2)}</span>
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Order Confirmation Success */}
        {step === 4 && (
          <div className="checkout-wizard" style={{ textAlign: 'center' }}>
            <div className="success-screen">
              <div className="success-icon-container">
                <CheckCircle2 size={40} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Order Placed Successfully!</h2>
              <p style={{ color: 'hsl(var(--muted))', maxWidth: '400px' }}>
                Thank you for your order. A digital invoice and shipping tracking link have been dispatched to your email address.
              </p>

              {/* DASHE RECEIPT SUMMARY */}
              <div className="success-receipt">
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.75rem', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.95rem' }}>
                  <span>Invoice Receipt</span>
                  <span style={{ color: 'hsl(var(--accent))' }}>{orderId}</span>
                </div>
                
                <div className="success-receipt-row">
                  <span style={{ color: 'hsl(var(--muted))' }}>Cardholder Name</span>
                  <span style={{ fontWeight: '500' }}>{paymentForm.cardName}</span>
                </div>

                <div className="success-receipt-row">
                  <span style={{ color: 'hsl(var(--muted))' }}>Shipping Destination</span>
                  <span style={{ fontWeight: '500', textAlign: 'right', maxWidth: '220px' }}>
                    {shippingForm.fullName}<br />
                    {shippingForm.address}<br />
                    {shippingForm.city}, {shippingForm.zipCode}
                  </span>
                </div>

                <div className="success-receipt-row">
                  <span style={{ color: 'hsl(var(--muted))' }}>Delivery Service</span>
                  <span style={{ fontWeight: '500' }}>Aura WhiteGlove Cargo (2-3 Business Days)</span>
                </div>

                <div className="success-receipt-row success-receipt-total">
                  <span>Grand Total Paid</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleOrderSuccessComplete} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                <span>Return to Shop Catalog</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
