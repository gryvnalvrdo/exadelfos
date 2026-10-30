import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Coffee, 
  CupSoda, 
  Wine, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Plus, 
  Check, 
  X,
  Flame,
  Star,
  Info
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

export default function MenuSection({ onAddToCart, cartItems = {} }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Map category icons
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'signature':
        return <Sparkles className="w-4 h-4" />;
      case 'coffee':
        return <Coffee className="w-4 h-4" />;
      case 'non-coffee':
        return <CupSoda className="w-4 h-4" />;
      case 'mocktail':
        return <Wine className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  // Filter & Sort logic
  const filteredAndSortedItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recommended':
      default:
        // Prioritize popular / signature
        items.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    CATEGORIES.forEach((c) => {
      if (c.id !== 'all') {
        counts[c.id] = MENU_ITEMS.filter((item) => item.category === c.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <section id="menu-section" className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-exa-green-700 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Coffee className="w-3.5 h-3.5" />
            Daftar Menu Pilihan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Menu Kopi & Segar
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Pilih favoritmu, sesuaikan selera, dan hitung estimasi pesananmu.
          </p>
        </div>

        {/* View Mode Toggle (Grid vs List) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-stone-100 p-1 rounded-xl flex items-center gap-1 border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Tampilan Grid"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Tampilan List"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Search & Sort Bar */}
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-soft mb-6 sticky top-2 z-20">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kopi aren, matcha, mocktail sakura..."
              className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-exa-orange transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm font-medium py-2.5 pl-3.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-exa-orange cursor-pointer"
              >
                <option value="recommended">⭐ Rekomendasi</option>
                <option value="price-low">💵 Harga: Termurah (12K)</option>
                <option value="price-high">💎 Harga: Tertinggi (18K)</option>
                <option value="rating">🌟 Rating Tertinggi</option>
                <option value="name">🔤 Nama A - Z</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Categories Filter Pills (Horizontal Scroll on Mobile) */}
      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all transform active:scale-95 ${
                  isActive
                    ? 'bg-exa-orange text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/90 shadow-sm'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-exa-orange'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {categoryCounts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-exa-orange flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-800">Menu Tidak Ditemukan</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Tidak ada menu yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau reset filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs rounded-xl transition"
          >
            Tampilkan Semua Menu
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredAndSortedItems.map((item) => {
            const quantityInCart = cartItems[item.id] || 0;
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-card hover:border-orange-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Category & Price Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        {item.categoryName}
                      </span>
                      {item.popular && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-exa-orange border border-orange-200">
                          <Flame className="w-3 h-3 fill-exa-orange" />
                          Favorit
                        </span>
                      )}
                    </div>

                    {/* Price Pill */}
                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-exa-orange font-display tracking-tight">
                        {item.priceDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-exa-orange transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-stone-500 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-stone-700">{item.rating}</span>
                    <span className="text-[10px] text-stone-400">({item.reviewsCount})</span>
                  </div>

                  {/* Add to order / counter button */}
                  <button
                    onClick={() => onAddToCart(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all transform active:scale-95 ${
                      quantityInCart > 0
                        ? 'bg-exa-green text-white shadow-sm'
                        : 'bg-orange-50 hover:bg-exa-orange text-exa-orange hover:text-white border border-orange-200'
                    }`}
                  >
                    {quantityInCart > 0 ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Ditambah ({quantityInCart})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pilih</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredAndSortedItems.map((item) => {
            const quantityInCart = cartItems[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {item.categoryName}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-bold text-exa-orange flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-exa-orange" />
                        Favorit
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-base font-black text-exa-orange font-display">
                    {item.priceDisplay}
                  </span>

                  <button
                    onClick={() => onAddToCart(item)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all active:scale-95 ${
                      quantityInCart > 0
                        ? 'bg-exa-green text-white'
                        : 'bg-orange-50 hover:bg-exa-orange text-exa-orange hover:text-white border border-orange-200'
                    }`}
                    title="Tambah ke Pesanan"
                  >
                    {quantityInCart > 0 ? (
                      <span className="text-xs font-bold">{quantityInCart}</span>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

