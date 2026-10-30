import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Copy, Check, ShoppingBag, Receipt } from 'lucide-react';
import { CAFE_INFO, MENU_ITEMS } from '../data/menu';

export default function OrderDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }) {
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build items list
  const selectedList = Object.entries(cartItems)
    .map(([itemId, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === itemId);
      return item ? { ...item, qty } : null;
    })
    .filter((item) => item && item.qty > 0);

  const subtotal = selectedList.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const totalItemsCount = selectedList.reduce((acc, curr) => acc + curr.qty, 0);

  const formatRupiah = (num) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const generateOrderText = () => {
    let text = `*PESANAN EXÁDELFOS COFFEE*\n`;
    if (tableNumber) text += `📍 Nomor Meja: ${tableNumber}\n`;
    text += `📅 Waktu: ${new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `--------------------------------\n`;

    selectedList.forEach((it) => {
      text += `• ${it.name} (${it.qty}x) = ${formatRupiah(it.price * it.qty)}\n`;
    });

    text += `--------------------------------\n`;
    text += `*TOTAL ESTIMASI: ${formatRupiah(subtotal)}*\n`;
    if (notes.trim()) {
      text += `Catatan: ${notes.trim()}\n`;
    }
    text += `\n#GoodCoffeeGoodPeople`;
    return text;
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(generateOrderText());
    window.open(`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(generateOrderText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-exa-orange">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Catatan Pesanan</h3>
              <p className="text-[11px] text-stone-500">{totalItemsCount} Minuman Terpilih</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {selectedList.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-stone-400 hover:text-red-500 font-semibold px-2 py-1 rounded-lg transition"
                title="Kosongkan Catatan"
              >
                Reset
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List (Scrollable) */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {selectedList.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Receipt className="w-12 h-12 mx-auto text-stone-300 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-stone-600">Belum ada menu yang dipilih</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                Tekan tombol "+ Pilih" pada daftar menu untuk menghitung estimasi atau membuat catatan pesanan.
              </p>
            </div>
          ) : (
            selectedList.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-800 truncate">{item.name}</h4>
                  <p className="text-[11px] text-stone-500">
                    {formatRupiah(item.price)} × {item.qty} = <span className="font-semibold text-stone-800">{formatRupiah(item.price * item.qty)}</span>
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-600 active:scale-95"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-600 active:scale-95"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Form Options if items exist */}
          {selectedList.length > 0 && (
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Nomor Meja (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Meja 4 / Outdoor 2"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-exa-orange"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Catatan Rasa (Less Sugar / Less Ice):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Exadelfos Aren less ice"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-exa-orange"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with Subtotal & Actions */}
        {selectedList.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Estimasi Total</span>
              <span className="text-xl font-black text-exa-orange font-display">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyOrder}
                className="inline-flex items-center justify-center gap-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs py-3 rounded-xl transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copied ? 'Tersalin!' : 'Salin Catatan'}</span>
              </button>

              <button
                onClick={handleSendToWhatsApp}
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim ke Barista</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

