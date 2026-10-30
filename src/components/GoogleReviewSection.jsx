import React from 'react';
import { Star, MapPin, ExternalLink, CheckCircle, Smartphone, Award, ThumbsUp } from 'lucide-react';
import { CAFE_INFO } from '../data/menu';

export default function GoogleReviewSection() {
  const handleWriteReview = () => {
    window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="review-section" className="py-12 px-4 sm:px-6 bg-gradient-to-b from-exa-cream via-orange-50/50 to-exa-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-exa-orange font-bold text-xs uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-exa-orange" />
            Google Review Card
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Review Resmi di Google Maps
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Ulasan jujur Anda di Google Maps sangat membantu perkembangan barista dan kedai kopi kami.
          </p>
        </div>

        {/* Main Google Review Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-orange-100/80 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Block: Google Rating & Place Info */}
            <div className="md:col-span-6 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-6">
              <div className="inline-flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1 rounded-full mb-3 text-xs font-semibold text-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Terdaftar Resmi di Google Maps</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl font-black text-stone-900 font-display">
                  5.0
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    Bintang Sempurna dari Pelanggan
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center md:justify-start gap-1.5 text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-exa-orange shrink-0" />
                <span>{CAFE_INFO.address}</span>
              </div>

              <div className="mt-2 text-[11px] text-stone-400 font-mono">
                Place ID: {CAFE_INFO.placeId}
              </div>
            </div>

            {/* Right Block: Action Buttons directly to Google */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-base font-bold text-stone-800">
                Bantu Beri Ulasan Bintang 5 ⭐
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-5">
                Klik tombol di bawah untuk langsung membuka formulir ulasan Google Maps di perangkat Anda:
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleWriteReview}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-floating hover:shadow-lg transition-all active:scale-95"
                >
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span>Tulis Review Sekarang</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm px-4 py-3.5 rounded-2xl transition-colors"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step NFC Guide Card */}
        <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 shadow-sm">
          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider text-center mb-4">
            Cara Mudah Beri Ulasan dari Kartu Meja 📱
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100">
              <div className="w-8 h-8 rounded-full bg-exa-orange text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p className="text-xs font-bold text-stone-800">Tap Kartu di Meja</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Dekatkan smartphone Anda ke kartu Google Review NFC.</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p className="text-xs font-bold text-stone-800">Pilih Bintang 5 ⭐</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Beri rating terbaik untuk rasa minuman & keramahan barista.</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p className="text-xs font-bold text-stone-800">Kirim & Bagikan</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Ulasan Anda langsung tampil di Google Maps Exádelfos!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
