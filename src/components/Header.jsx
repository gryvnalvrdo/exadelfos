import React from 'react';
import { Star, Clock, ShoppingBag, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';
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
        {/* Top Info Bar */}
        <div className="flex items-center justify-between py-2 border-b border-orange-100/80 text-xs sm:text-sm text-stone-600 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/90 text-emerald-800 font-semibold text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Buka Sekarang
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-stone-500">
              <Clock className="w-3.5 h-3.5 text-exa-orange" />
              {CAFE_INFO.shortHours}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart shortcut in header */}
            {orderCount > 0 && (
              <button
                onClick={onOpenOrder}
                className="inline-flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm hover:border-exa-orange transition active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-exa-orange" />
                <span>Keranjang ({orderCount})</span>
              </button>
            )}

            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-exa-orange font-medium transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span className="font-semibold">@{CAFE_INFO.instagramHandle}</span>
            </a>
          </div>
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

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            {/* Primary Direct Google Review CTA */}
            <button
              onClick={handleDirectReview}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-floating hover:shadow-lg transition-all duration-200 transform active:scale-95"
            >
              <Star className="w-4 h-4 fill-white text-white animate-bounce-soft" />
              <span>Beri Review Google</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-90" />
            </button>

            {/* Instagram Quick Link */}
            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-exa-green hover:bg-exa-green-600 text-white font-semibold text-sm px-5 py-3.5 rounded-2xl shadow-sm transition-all duration-200 active:scale-95"
            >
              <InstagramIcon className="w-4 h-4 text-orange-200" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Review Card Tap Notice */}
          <div className="mt-5 w-full max-w-lg bg-gradient-to-r from-orange-100/70 via-white/80 to-emerald-50/80 border border-orange-200/70 rounded-2xl p-3.5 text-left flex items-start gap-3 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-exa-orange/10 flex items-center justify-center text-exa-orange shrink-0 mt-0.5">
              <Star className="w-5 h-5 fill-exa-orange text-exa-orange" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-stone-800">
                Terima kasih sudah berkunjung ke Exádelfos! 👋
              </p>
              <p className="text-stone-600 mt-0.5">
                Bantu barista kami dengan review bintang 5 di Google Maps. Tekan tombol <strong>Beri Review Google</strong> di atas untuk menulis langsung!
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
