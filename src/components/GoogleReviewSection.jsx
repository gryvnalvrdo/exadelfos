import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink, HeartHandshake, ShieldCheck } from 'lucide-react';
import { CAFE_INFO, SAMPLE_GOOGLE_REVIEWS } from '../data/menu';

export default function GoogleReviewSection({ onOpenReview }) {
  return (
    <section id="review-section" className="py-12 px-4 sm:px-6 bg-gradient-to-b from-exa-cream via-orange-50/50 to-exa-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-exa-orange font-bold text-xs uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-exa-orange" />
            Google Review Card
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Bagaimana Ngopi Kamu Hari Ini?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Bantu kedai kopi lokal kami terus bertumbuh dengan ulasan jujurmu di Google Maps. Cukup 10 detik!
          </p>
        </div>

        {/* Highlight Stats Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-orange-100/80 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Score Block */}
            <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl font-black text-stone-900 font-display">
                  {CAFE_INFO.rating}
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    Berdasarkan {CAFE_INFO.totalReviews}+ Ulasan Google
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-[11px] text-stone-600">
                <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Rasa Terbukti Enak
                </span>
                <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Pelayanan Ramah
                </span>
              </div>
            </div>

            {/* Right Action Block */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-base font-bold text-stone-800">
                Beri Rating 5 Bintang Kamu Sekarang ☕
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Setiap bintang dari #TemanExa sangat berarti bagi kelangsungan barista dan kedai kami.
              </p>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onOpenReview()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-floating hover:shadow-lg transition-all active:scale-95"
                >
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span>Tulis Review Bintang 5</span>
                </button>

                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm px-4 py-3.5 rounded-2xl transition-colors"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Real Reviews Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-exa-orange" />
              Kata #TemanExa di Google Maps
            </h3>
            <span className="text-xs text-stone-400">Terverifikasi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_GOOGLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {rev.relativeTime}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-stone-100">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-7 h-7 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 leading-tight">
                      {rev.author}
                    </h5>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      Local Guide / Reviewer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

