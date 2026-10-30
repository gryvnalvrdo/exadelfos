import React from 'react';
import { Check, ShoppingBag } from 'lucide-react';

export default function Toast({ message, isVisible }) {
  if (!isVisible || !message) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 animate-fadeIn pointer-events-none px-4 w-full max-w-sm">
      <div className="bg-stone-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-floating border border-stone-700/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <p className="text-xs font-semibold truncate text-stone-100">
            {message}
          </p>
        </div>
        <div className="w-2 h-2 rounded-full bg-exa-orange animate-ping shrink-0" />
      </div>
    </div>
  );
}
