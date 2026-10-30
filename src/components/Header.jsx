import React from 'react';
import { Star, ShoppingCart, ExternalLink, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/menu';

export default function Header({ orderCount, onOpenOrder }) {
  const handleDirectReview = () => {
    window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-exa-orange-50 via-exa-cream to-exa-cream pb-8 pt-4 px-4 sm:px-6">
      {/* Decorative background blurs */}
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-exa-orange-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-exa-green-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top Row: Cart Button on the Top Right Corner */}
        <div className="flex items-center justify-end py-1 mb-5">
          <button
            onClick={onOpenOrder}
            className="group relative inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-stone-200/90 hover:border-exa-orange text-stone-800 hover:text-exa-orange px-3.5 py-2 rounded-2xl shadow-sm transition-all transform active:scale-95"
            title="Buka Keranjang Pesanan"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-stone-700 group-hover:text-exa-orange transition-colors" />
              {orderCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-exa-orange text-white text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs">
                  {orderCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-stone-800 group-hover:text-exa-orange transition-colors">
              Keranjang {orderCount > 0 ? `(${orderCount})` : ''}
            </span>
          </button>
        </div>

        {/* Brand Card & Hero */}
        <div className="text-center flex flex-col items-center">
          {/* Logo */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-exa-orange via-amber-500 to-exa-green-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-card border-4 border-white bg-exa-green-700 flex items-center justify-center p-1.5">
              <img
                src="/logo.jpg"
                alt="Exádelfos Logo"
                className="w-full h-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="mt-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Exádelfos
            </h1>
            <p className="mt-1 text-sm sm:text-base font-semibold tracking-widest text-exa-orange uppercase">
              {CAFE_INFO.tagline}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Kedai Kopi & Ruang Kumpul Santai • <span className="text-exa-green-700 font-bold">{CAFE_INFO.hashtag}</span>
            </p>
          </div>

          {/* Action CTA: Direct Google Review */}
          <div className="mt-6 w-full max-w-sm">
            <button
              onClick={handleDirectReview}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-base py-3.5 px-6 rounded-2xl shadow-floating hover:shadow-lg transition-all duration-200 transform active:scale-95"
            >
              <Star className="w-5 h-5 fill-white text-white animate-bounce-soft" />
              <span>Beri Review Google</span>
              <ExternalLink className="w-4 h-4 ml-0.5 opacity-90" />
            </button>
          </div>

          {/* NFC Tap Welcome Card - Interactive & Aesthetic */}
          <div 
            onClick={handleDirectReview}
            className="mt-5 w-full max-w-lg cursor-pointer group bg-gradient-to-br from-white via-orange-50/50 to-amber-50/60 border border-orange-200/90 rounded-3xl p-4 sm:p-5 text-left shadow-soft hover:shadow-card hover:border-exa-orange transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start gap-3.5 relative z-10">
              {/* Glowing Icon Badge */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-exa-orange to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
              </div>

              {/* Text & Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-exa-green-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Kartu Meja #TemanExa
                  </span>

                  {/* 5 Shiny Stars */}
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-exa-orange transition-colors">
                  Terima kasih sudah ngopi di Exádelfos! 👋
                </h4>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Ngopi asik hari ini? Ulasan bintang 5 Anda di Google Maps adalah dukungan terbaik untuk barista kami.
                </p>

                {/* Clickable Action Tag */}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-exa-orange group-hover:translate-x-1 transition-transform">
                  <span>Klik untuk beri review bintang 5</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
