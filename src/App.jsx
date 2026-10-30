import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import GoogleReviewSection from './components/GoogleReviewSection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import ReviewModal from './components/ReviewModal';
import OrderDrawer from './components/OrderDrawer';
import ImageLightbox from './components/ImageLightbox';
import BottomNav from './components/BottomNav';
import { MENU_ITEMS } from './data/menu';

export default function App() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isMenuImageOpen, setIsMenuImageOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Auto trigger review modal if NFC URL includes ?action=review or #review
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'review' || window.location.hash === '#review') {
      setIsReviewModalOpen(true);
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
        onOpenReview={() => setIsReviewModalOpen(true)}
        onOpenMenuImage={() => setIsMenuImageOpen(true)}
        orderCount={orderCount}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Interactive Menu Section with 4 Categories & Sorting */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        {/* Dedicated Google Review Showcase & Flow */}
        <GoogleReviewSection
          onOpenReview={() => setIsReviewModalOpen(true)}
        />

        {/* Instagram & Community Section */}
        <InstagramSection />
      </main>

      {/* Footer */}
      <Footer onOpenReview={() => setIsReviewModalOpen(true)} />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        onOpenReview={() => setIsReviewModalOpen(true)}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        orderCount={orderCount}
        orderTotal={orderTotal}
      />

      {/* Modals & Drawers */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <ImageLightbox
        isOpen={isMenuImageOpen}
        onClose={() => setIsMenuImageOpen(false)}
      />
    </div>
  );
}

