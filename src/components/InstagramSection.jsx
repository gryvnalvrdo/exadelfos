import React, { useState } from 'react';
import { ExternalLink, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CAFE_INFO } from '../data/menu';

export default function InstagramSection() {
  const [hashtagCopied, setHashtagCopied] = useState(false);

  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80',
      caption: 'Espresso blend pilihan barista untuk menemani harimu ☕ #TemanExa',
      likes: '124',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
      caption: 'Exadelfos Aren, paduan legit gula aren asli & creamy milk yang selalu ngangenin.',
      likes: '189',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80',
      caption: 'Mocktail Sakura Berry yang sparkling dan manis segar buat siang terik ✨',
      likes: '145',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=80',
      caption: 'Good Coffee, Good People. Spot ternyaman buat diskusi santai atau nugas.',
      likes: '230',
    },
  ];

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(CAFE_INFO.hashtag);
    setHashtagCopied(true);
    setTimeout(() => setHashtagCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-white border-t border-stone-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider mb-2">
              <InstagramIcon className="w-3.5 h-3.5" />
              Komunitas & Suasana
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Ikuti Cerita di Instagram
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Tag kami di Instagram Story kamu dan gunakan hashtag resmi kami!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyHashtag}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              title="Salin Hashtag"
            >
              {hashtagCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{CAFE_INFO.hashtag} Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>{CAFE_INFO.hashtag}</span>
                </>
              )}
            </button>

            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-95"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@{CAFE_INFO.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-stone-100 block"
            >
              <img
                src={post.image}
                alt="Exadelfos Moment"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white text-xs">
                <p className="line-clamp-2 text-[11px] leading-snug">{post.caption}</p>
                <div className="flex items-center gap-1 mt-1 text-pink-300 text-[10px] font-bold">
                  <Heart className="w-3 h-3 fill-pink-400" />
                  <span>{post.likes} Suka</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
