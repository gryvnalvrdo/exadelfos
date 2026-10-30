import React from 'react';
import { Coffee, ShoppingCart, Star } from 'lucide-react';
import { CAFE_INFO } from '../data/menu';

export default function BottomNav({ onOpenCart, orderCount, orderTotal }) {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectReview = () => {
    window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      {/* Floating Cart Bar preview if customer selected items */}
      {orderCount > 0 && (
        <div className="px-4 pb-2">
          <div 
            onClick={onOpenCart}
            className="cursor-pointer bg-stone-900 text-white p-3 rounded-2xl shadow-floating flex items-center justify-between border border-stone-700 animate-bounce-soft"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-exa-orange text-white text-xs font-black flex items-center justify-center">
                {orderCount}
              </div>
              <span className="text-xs font-semibold">Minuman di Keranjang</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-400 font-display">
                Rp {orderTotal.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-lg font-bold">
                Lihat ➔
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav: Uniform 3-Column Grid */}
      <nav className="glass-nav border-t border-orange-100/80 shadow-lg px-2 py-2">
        <div className="grid grid-cols-3 items-center max-w-md mx-auto">
          {/* Col 1: Menu Tab */}
          <button
            onClick={scrollToMenu}
            className="flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-exa-orange py-1 active:scale-95 transition"
          >
            <Coffee className="w-5 h-5" />
            <span className="text-[11px] font-bold">Menu</span>
          </button>

          {/* Col 2: Center Google Review Button (Uniform Size + Gentle Bobbing Animation) */}
          <button
            onClick={handleDirectReview}
            className="flex flex-col items-center justify-center gap-1 text-exa-orange hover:text-exa-orange-600 py-1 active:scale-95 transition"
            title="Beri Review di Google Maps"
          >
            <div className="animate-bob flex items-center justify-center">
              <Star className="w-5 h-5 fill-exa-orange text-exa-orange" />
            </div>
            <span className="text-[11px] font-bold">Review</span>
          </button>

          {/* Col 3: Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-exa-orange py-1 active:scale-95 transition"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {orderCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-exa-orange text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {orderCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold">Keranjang</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
