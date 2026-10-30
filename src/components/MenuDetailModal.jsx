import React, { useState } from 'react';
import { X, Flame, Plus, Minus, ShoppingCart, Sparkles, Check } from 'lucide-react';

export default function MenuDetailModal({ item, isOpen, onClose, onAddToCartWithOptions }) {
  const [temperature, setTemperature] = useState('Dingin'); // 'Dingin' | 'Hangat'
  const [sugarLevel, setSugarLevel] = useState('Normal'); // 'Normal' | 'Less Sugar' | 'Tanpa Gula'
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    onAddToCartWithOptions(item, quantity, {
      temperature,
      sugarLevel,
      notes: specialNotes.trim(),
    });
    // Reset state & close
    setQuantity(1);
    setSpecialNotes('');
    onClose();
  };

  const totalPrice = item.price * quantity;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image with Close Button */}
        <div className="relative aspect-[16/10] w-full bg-stone-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition active:scale-90"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20">
              {item.categoryName}
            </span>
            {item.popular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-exa-orange text-white shadow-sm">
                <Flame className="w-3 h-3 fill-white" />
                Best Seller
              </span>
            )}
          </div>

          {/* Bottom Title & Price on Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display drop-shadow-sm">
                {item.name}
              </h3>
            </div>

            <div className="bg-white/95 backdrop-blur-md text-exa-orange px-3.5 py-1.5 rounded-2xl font-black text-lg font-display shadow-lg shrink-0">
              {item.priceDisplay}
            </div>
          </div>
        </div>

        {/* Scrollable Body: Description & Customization */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Deskripsi Rasa
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {item.description}
            </p>

            {/* Flavor tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Option 1: Suhu (Iced / Hot) */}
          <div className="pt-3 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-800 block mb-2">
              Pilihan Suhu
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Dingin (Iced)', 'Hangat (Hot)'].map((temp) => {
                const isSelected = temperature === (temp.includes('Dingin') ? 'Dingin' : 'Hangat');
                return (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setTemperature(temp.includes('Dingin') ? 'Dingin' : 'Hangat')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-exa-green-50 border-exa-green-600 text-exa-green-800 shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{temp.includes('Dingin') ? '🧊' : '☕'}</span>
                    <span>{temp}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-exa-green-600 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Option 2: Tingkat Gula (Sugar Level) */}
          <div className="pt-3 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-800 block mb-2">
              Tingkat Kemanisan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Normal', 'Less Sugar', 'Tanpa Gula'].map((sugar) => {
                const isSelected = sugarLevel === sugar;
                return (
                  <button
                    key={sugar}
                    type="button"
                    onClick={() => setSugarLevel(sugar)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'bg-orange-50 border-exa-orange text-exa-orange font-bold shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {sugar}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Option 3: Catatan Khusus */}
          <div className="pt-3 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              Catatan untuk Barista (Opsional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Contoh: Es dipisah, double espresso, dll"
              className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-exa-orange transition"
            />
          </div>
        </div>

        {/* Modal Bottom Footer: Stepper & Add Button */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/80 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl p-1 shadow-2xs">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-xl hover:bg-stone-100 text-stone-700 flex items-center justify-center font-bold active:scale-90 transition"
              title="Kurangi"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-6 text-center text-sm font-extrabold text-stone-900">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold active:scale-90 transition"
              title="Tambah"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-exa-orange to-orange-500 hover:from-exa-orange-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-floating hover:shadow-lg transition-all active:scale-98"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>+ Keranjang • Rp {totalPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

