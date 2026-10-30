import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

export default function ImageLightbox({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-stone-900/90 border-b border-stone-800 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-exa-orange uppercase tracking-wider">
              Menu Fisik Asli
            </span>
            <span className="text-stone-500 text-xs hidden sm:inline">• Exádelfos Coffee</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/menu-full.png"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
              title="Buka Ukuran Penuh"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Content Container */}
        <div className="overflow-auto p-2 sm:p-4 flex items-center justify-center bg-stone-950/50 flex-1">
          <img
            src="/menu-full.png"
            alt="Daftar Menu Fisik Exadelfos"
            className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-lg border border-stone-800"
          />
        </div>

        {/* Bottom hint */}
        <div className="py-2.5 px-4 bg-stone-900 text-center text-[11px] text-stone-400 border-t border-stone-800">
          <span>Geser / cubit untuk memperbesar detail menu atau gunakan menu interaktif di halaman utama.</span>
        </div>
      </div>
    </div>
  );
}
