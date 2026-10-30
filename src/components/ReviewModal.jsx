import React, { useState } from 'react';
import { X, Star, Copy, Check, MessageSquare, ExternalLink, ThumbsUp, Send, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAFE_INFO, REVIEW_TEMPLATES } from '../data/menu';

export default function ReviewModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!isOpen) return null;

  const handleSelectStar = (stars) => {
    setRating(stars);
    if (stars >= 4) {
      // Trigger festive celebration
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FF5C00', '#12382B', '#FFD1B5', '#F59E0B'],
        });
      } catch (e) {
        // fallback silently
      }
    }
  };

  const handleCopyTemplate = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSendPrivateFeedback = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Halo Pengelola Exadelfos,\n\nSaya ingin menyampaikan masukan kunjungan saya:\nRating: ${rating}/5 Bintang\nNama: ${customerName || 'Pelanggan'}\nMasukan: ${feedbackText}\n\nTerima kasih!`
    );
    window.open(`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${message}`, '_blank');
    setFeedbackSent(true);
  };

  const currentDisplayRating = hoverRating || rating;

  const ratingDescriptions = {
    1: { emoji: '😢', text: 'Sangat Kurang', sub: 'Ada yang mengecewakan? Beritahu kami langsung agar kami bisa ganti rugi/perbaiki.' },
    2: { emoji: '🙁', text: 'Kurang Puas', sub: 'Mohon maaf. Masukan kamu sangat penting agar kami bisa berbenah.' },
    3: { emoji: '😐', text: 'Cukup Baik', sub: 'Terima kasih, kami akan terus meningkatkan kualitas kami.' },
    4: { emoji: '😊', text: 'Puas & Enak!', sub: 'Senang mendengarnya! Yuk bagikan pengalamanmu di Google.' },
    5: { emoji: '🤩', text: 'Luar Biasa / Sempurna!', sub: 'Keren banget! Bantuan review bintang 5 kamu sangat berharga!' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Mascot theme */}
        <div className="bg-gradient-to-r from-exa-orange to-amber-500 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md">
              <img src="/logo.jpg" alt="Exadelfos" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                Google Review Hub
              </span>
              <h3 className="text-lg font-bold">Bagikan Pengalamanmu</h3>
            </div>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Star selector */}
          <div className="text-center">
            <div className="text-4xl mb-1 transition-transform duration-200">
              {ratingDescriptions[currentDisplayRating]?.emoji}
            </div>
            <p className="font-bold text-lg text-stone-800">
              {ratingDescriptions[currentDisplayRating]?.text}
            </p>
            <p className="text-xs text-stone-500 mt-0.5 max-w-xs mx-auto">
              {ratingDescriptions[currentDisplayRating]?.sub}
            </p>

            {/* Interactive Stars */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleSelectStar(star)}
                    className="p-1.5 focus:outline-none transform transition active:scale-125 hover:scale-110"
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        isActive
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'fill-stone-100 text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Path: Positive (4-5 stars) */}
          {rating >= 4 ? (
            <div className="space-y-4">
              <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-exa-orange text-white mb-2">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <h4 className="font-bold text-stone-800 text-sm">
                  1 Langkah Menuju Google Review ⭐
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Bingung mau nulis apa? Kamu bisa klik salah satu ide review di bawah untuk menyalin teks otomatis:
                </p>
              </div>

              {/* 1-Tap Copy Suggestions */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-2">
                  💡 Ide Ulasan Cepat (Klik untuk Salin):
                </label>
                <div className="space-y-2">
                  {REVIEW_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopyTemplate(tmpl, idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${
                        copiedIndex === idx
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm'
                          : 'bg-stone-50 hover:bg-orange-50/60 border-stone-200 text-stone-700'
                      }`}
                    >
                      <span className="line-clamp-2">{tmpl}</span>
                      <span className="shrink-0 flex items-center gap-1 font-semibold text-[11px] px-2 py-1 rounded-md bg-white border">
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-500" />
                            <span>Salin</span>
                          </>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Open Google Review Link CTA */}
              <div className="pt-2">
                <a
                  href={CAFE_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-floating hover:shadow-lg transition-all transform active:scale-98"
                >
                  <Star className="w-5 h-5 fill-white text-white" />
                  <span>Kirim Review di Google Maps</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
                <p className="text-[11px] text-center text-stone-400 mt-2">
                  Akan langsung membuka halaman review Google Maps Exádelfos
                </p>
              </div>
            </div>
          ) : (
            /* Conditional Path: Negative / Feedback (1-3 stars) */
            <div className="space-y-4">
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs text-amber-900 leading-relaxed">
                  Kami memohon maaf bila pengalaman nongkrong atau minumanmu hari ini belum sesuai ekspektasi. 
                  Tuliskan keluhan atau saranmu agar tim barista & pengelola kami dapat segera menindaklanjuti.
                </p>
              </div>

              {feedbackSent ? (
                <div className="text-center py-6 bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">Masukan Terkirim</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Terima kasih atas kejujuranmu! Kami berkomitmen memberikan yang terbaik untuk kunjunganmu berikutnya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendPrivateFeedback} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Nama Kamu (Opsional):
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Budi (Meja 4)"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-exa-orange"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Apa yang bisa kami perbaiki? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Ceritakan rasa minuman, waktu penyajian, atau suasana..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-exa-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Kirim Masukan Langsung via WhatsApp</span>
                  </button>
                  <p className="text-[10px] text-center text-stone-400">
                    Pesan akan langsung terhubung ke pengelola Exádelfos.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-100 p-3 text-center text-xs text-stone-500">
          <p>
            Exádelfos • <span className="font-semibold text-exa-orange">{CAFE_INFO.tagline}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
