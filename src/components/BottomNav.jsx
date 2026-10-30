import React from 'react';
import { Coffee, Search, ShoppingBag, Star, Sparkles } from 'lucide-react';

export default function BottomNav({ onOpenReview, onOpenOrder, orderCount, orderTotal }) {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      {/* Floating Order Bar preview if customer selected items */}
      {orderCount > 0 && (
        <div className="px-4 pb-2">
          <div 
            onClick={onOpenOrder}
            className="cursor-pointer bg-stone-900 text-white p-3 rounded-2xl shadow-floating flex items-center justify-between border border-stone-700 animate-bounce-soft"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-exa-orange text-white text-xs font-bold flex items-center justify-center">
                {orderCount}
              </span>
              <span className="text-xs font-semibold">Minuman Dipilih</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-400">
                Rp {orderTotal.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-lg font-medium">
                Lihat ➔
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav */}
      <div className="glass-nav border-t border-orange-100/80 px-4 py-2 flex items-center justify-around shadow-lg">
        {/* Menu Tab */}
        <button
          onClick={scrollToMenu}
          className="flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-exa-orange p-1 active:scale-95 transition"
        >
          <Coffee className="w-5 h-5 text-stone-600" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Order Calculator */}
        <button
          onClick={onOpenOrder}
          className="relative flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-exa-orange p-1 active:scale-95 transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-stone-600" />
            {orderCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-exa-orange text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Pesanan</span>
        </button>

        {/* Center Google Review Button - Highlighted */}
        <button
          onClick={onOpenReview}
          className="flex flex-col items-center justify-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-exa-orange via-amber-500 to-orange-400 p-0.5 shadow-floating transform transition group-hover:scale-105 active:scale-95">
            <div className="w-full h-full rounded-full bg-exa-orange flex items-center justify-center text-white">
              <Star className="w-6 h-6 fill-white text-white animate-pulse" />
            </div>
          </div>
          <span className="text-[10px] font-black text-exa-orange mt-1">Review</span>
        </button>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/exadelfos.c/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-pink-600 p-1 active:scale-95 transition"
        >
          <Sparkles className="w-5 h-5 text-stone-600" />
          <span className="text-[10px] font-bold">Instagram</span>
        </a>
      </div>
    </div>
  );
}

