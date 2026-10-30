import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import GoogleReviewSection from './components/GoogleReviewSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import BottomNav from './components/BottomNav';
import ScrollToTop from './components/ScrollToTop';
import { MENU_ITEMS, CAFE_INFO } from './data/menu';

export default function App() {
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Auto redirect / open review if accessed with ?action=review or #review from NFC card
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'review' || window.location.hash === '#review') {
      window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const currentQty = prev[item.id] || 0;
      return { ...prev, [item.id]: currentQty + 1 };
    });
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = newQty;
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  // Calculate order counts & total
  const orderCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const orderTotal = Object.entries(cartItems).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

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
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          cartItems={cartItems}
          onOpenCart={() => setIsOrderDrawerOpen(true)}
        />

        {/* Dedicated Google Review Section with Place ID */}
        <GoogleReviewSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        orderCount={orderCount}
        orderTotal={orderTotal}
      />

      {/* Shopping Cart Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
