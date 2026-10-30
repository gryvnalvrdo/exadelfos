import React from 'react';
import { MapPin, Clock, Heart, Star, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CAFE_INFO } from '../data/menu';

export default function Footer() {
  const handleDirectReview = () => {
    window.open(CAFE_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-exa-green-800 text-stone-300 pt-12 pb-24 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-exa-green-700/60">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 overflow-hidden">
                <img src="/logo.jpg" alt="Exádelfos" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-none font-display">Exádelfos</h4>
                <span className="text-[11px] font-semibold text-exa-orange tracking-wider">
                  {CAFE_INFO.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Ruang temu ramah rasa untuk semua kalangan. Nikmati kopi racikan terbaik dengan kehangatan obrolan.
            </p>
          </div>

          {/* Col 2: Jam Operasional & Lokasi */}
          <div className="space-y-2.5 text-xs">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-3 text-orange-300">
              Informasi Kedai
            </h5>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-exa-orange shrink-0 mt-0.5" />
              <span>{CAFE_INFO.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-exa-orange shrink-0 mt-0.5" />
              <span>{CAFE_INFO.operatingHours}</span>
            </div>
            <div className="flex items-start gap-2">
              <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <a
                href={CAFE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-2"
              >
                @{CAFE_INFO.instagramHandle} ({CAFE_INFO.hashtag})
              </a>
            </div>
          </div>

          {/* Col 3: Review CTA */}
          <div className="bg-exa-green-900/60 p-4 rounded-2xl border border-exa-green-700/40">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-amber-300">
              <Star className="w-4 h-4 fill-amber-300" />
              Ulasan Google Maps
            </h5>
            <p className="text-[11px] text-stone-400 mb-3 leading-relaxed">
              Dukungan ulasan bintang 5 dari #TemanExa sangat berarti untuk kemajuan kedai kami.
            </p>
            <button
              onClick={handleDirectReview}
              className="w-full py-2.5 px-3 bg-exa-orange hover:bg-exa-orange-600 text-white font-bold text-xs rounded-xl shadow transition text-center inline-flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Tulis Ulasan di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-400 text-xs gap-2">
          <p>© {new Date().getFullYear()} Exádelfos Coffee. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 fill-exa-orange text-exa-orange" /> for #TemanExa
          </p>
        </div>
      </div>
    </footer>
  );
}
