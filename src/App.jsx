import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import MenuDetailModal from './components/MenuDetailModal';
import Toast from './components/Toast';
import BottomNav from './components/BottomNav';
import ScrollToTop from './components/ScrollToTop';
import { CAFE_INFO } from './data/menu';

export default function App() {
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [detailItem, setDetailItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Auto redirect / open review if accessed with ?action=review or #review from NFC card
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'review' || window.location.hash === '#review') {
      window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2200);
  };

  // Add item with options (temperature, sugar level, notes)
  const handleAddToCartWithOptions = (item, qty = 1, options = {}) => {
    const temp = options.temperature || 'Dingin';
    const sugar = options.sugarLevel || 'Normal';
    const notes = options.notes || '';
    const cartKey = `${item.id}_${temp}_${sugar}_${notes}`;

    setCartItems((prev) => {
      const existing = prev[cartKey];
      const newQty = existing ? existing.qty + qty : qty;
      return {
        ...prev,
        [cartKey]: {
          cartKey,
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: newQty,
          temperature: temp,
          sugarLevel: sugar,
          notes,
        },
      };
    });

    showToast(`${item.name} (${qty}x) ditambahkan ke keranjang`);
  };

  const handleUpdateQuantity = (cartKey, newQty) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[cartKey];
      } else if (updated[cartKey]) {
        updated[cartKey] = { ...updated[cartKey], qty: newQty };
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  // Calculate order counts & total
  const orderCount = Object.values(cartItems).reduce((sum, item) => sum + (item.qty || 0), 0);
  const orderTotal = Object.values(cartItems).reduce((sum, item) => sum + (item.price * item.qty || 0), 0);

  return (
    <div className="min-h-screen bg-exa-cream flex flex-col font-sans">
      {/* Hero & Brand Header */}
      <Header
        orderCount={orderCount}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Interactive Menu Section with 4 Categories & Cart */}
        <MenuSection
          cartItems={cartItems}
          onOpenDetailModal={(item) => setDetailItem(item)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        orderCount={orderCount}
        orderTotal={orderTotal}
      />

      {/* Drink Detail & Customization Modal */}
      <MenuDetailModal
        item={detailItem}
        isOpen={Boolean(detailItem)}
        onClose={() => setDetailItem(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Shopping Cart Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} isVisible={isToastVisible} />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
