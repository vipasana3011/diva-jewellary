'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products, categories, styleCategories, moodCategories } from '@/data/products';
import { CategoryType, StyleType } from '@/types';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const styleParam = searchParams.get('style') || 'all';
  const moodParam = searchParams.get('mood') || 'all';
  const filterParam = searchParams.get('filter');
  const maxPriceParam = searchParams.get('maxPrice');
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [activeStyle, setActiveStyle] = useState<string>(styleParam);
  const [activeMood, setActiveMood] = useState<string>(moodParam);
  const [priceRange, setPriceRange] = useState<string>(maxPriceParam ? 'under-999' : 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dynamic filter logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'new-arrivals') {
        list = list.filter((p) => p.newArrival);
      } else if (activeCategory === 'western-jewellery') {
        list = list.filter((p) => p.style === 'western' || p.style === 'minimal' || p.style === 'statement');
      } else if (activeCategory === 'traditional-jewellery') {
        list = list.filter((p) => p.style === 'traditional' || p.category === 'jhumkas');
      } else {
        list = list.filter((p) => p.category === activeCategory);
      }
    }

    // Style filter
    if (activeStyle !== 'all') {
      if (activeStyle === 'gold-tone') {
        list = list.filter((p) => p.materials.finish.toLowerCase().includes('gold'));
      } else if (activeStyle === 'silver-tone') {
        list = list.filter((p) => p.materials.finish.toLowerCase().includes('rhodium') || p.materials.finish.toLowerCase().includes('silver'));
      } else {
        list = list.filter((p) => p.style === activeStyle);
      }
    }

    // Mood filter
    if (activeMood !== 'all') {
      list = list.filter((p) => p.moods.includes(activeMood as any));
    }

    // Price range
    if (priceRange === 'under-999') {
      list = list.filter((p) => p.price <= 999);
    } else if (priceRange === '1000-1999') {
      list = list.filter((p) => p.price >= 1000 && p.price <= 1999);
    } else if (priceRange === 'above-2000') {
      list = list.filter((p) => p.price >= 2000);
    }

    // Quick filter flag (e.g. ?filter=trending)
    if (filterParam === 'trending') {
      list = list.filter((p) => p.trending);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }

    return list;
  }, [searchQuery, activeCategory, activeStyle, activeMood, priceRange, filterParam, sortBy]);

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (activeStyle !== 'all' ? 1 : 0) +
    (activeMood !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveStyle('all');
    setActiveMood('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-20">
      {/* Editorial Category Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JAIPUR DESIGN STUDIO</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615]">
            {activeCategory === 'all'
              ? 'Complete Jewellery Collection'
              : categories.find((c) => c.slug === activeCategory)?.name || 'Curated Jewellery'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6560] max-w-xl mx-auto leading-relaxed">
            Modern Indian fashion jewellery designed for versatile everyday styling. 18K anti-tarnish gold plating, authentic Meenakari enamel, and skin-safe comfort.
          </p>
        </div>
      </section>

      {/* Main Filter & Products Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Category Pills + Sort + Mobile Filter Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D6]">
          {/* Scrollable Category Horizontal Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-editorial uppercase rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.slug
                    ? 'bg-[#1A1615] text-[#FAF7F2] shadow-xs'
                    : 'bg-[#F4EFE6] text-[#6B6560] hover:text-[#1A1615] hover:bg-[#EAE3D6]'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Right: Sort and Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center space-x-2 px-3.5 py-2 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs text-xs font-semibold uppercase tracking-wider text-[#1A1615]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#6B6560] hidden sm:inline">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs px-3 py-2 text-xs text-[#1A1615] font-medium outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value="featured">Featured / Best Matches</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Badges & Reset Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-[#6B6560]">Active Filters:</span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 text-[11px] bg-[#1A1615] text-[#FAF7F2] px-2.5 py-1 rounded-xs">
                <span>Category: {activeCategory}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveCategory('all')} />
              </span>
            )}
            {activeStyle !== 'all' && (
              <span className="inline-flex items-center space-x-1 text-[11px] bg-[#1A1615] text-[#FAF7F2] px-2.5 py-1 rounded-xs">
                <span>Style: {activeStyle}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveStyle('all')} />
              </span>
            )}
            {activeMood !== 'all' && (
              <span className="inline-flex items-center space-x-1 text-[11px] bg-[#1A1615] text-[#FAF7F2] px-2.5 py-1 rounded-xs">
                <span>Mood: {activeMood}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveMood('all')} />
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="inline-flex items-center space-x-1 text-[11px] bg-[#1A1615] text-[#FAF7F2] px-2.5 py-1 rounded-xs">
                <span>Price: {priceRange}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange('all')} />
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#997448] font-semibold underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content Layout: Left Sidebar Filters (Desktop) + Right Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <div className="hidden md:block md:col-span-1 space-y-6">
            {/* Price Filter */}
            <div className="border-b border-[#EAE3D6] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] mb-3">
                PRICE RANGE
              </h3>
              <div className="space-y-2 text-xs text-[#2C2724]">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-999', label: 'Under ₹999' },
                  { id: '1000-1999', label: '₹1,000 – ₹1,999' },
                  { id: 'above-2000', label: '₹2,000 & Above' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="accent-[#1A1615]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="border-b border-[#EAE3D6] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] mb-3">
                JEWELLERY STYLE
              </h3>
              <div className="space-y-2 text-xs text-[#2C2724]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="style"
                    checked={activeStyle === 'all'}
                    onChange={() => setActiveStyle('all')}
                    className="accent-[#1A1615]"
                  />
                  <span>All Styles</span>
                </label>
                {styleCategories.map((s) => (
                  <label key={s.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="style"
                      checked={activeStyle === s.id}
                      onChange={() => setActiveStyle(s.id)}
                      className="accent-[#1A1615]"
                    />
                    <span className="capitalize">{s.name.toLowerCase()} ({s.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mood Filter */}
            <div className="border-b border-[#EAE3D6] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] mb-3">
                SHOP BY MOOD
              </h3>
              <div className="space-y-2 text-xs text-[#2C2724]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mood"
                    checked={activeMood === 'all'}
                    onChange={() => setActiveMood('all')}
                    className="accent-[#1A1615]"
                  />
                  <span>All Occasions</span>
                </label>
                {moodCategories.map((m) => (
                  <label key={m.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mood"
                      checked={activeMood === m.id}
                      onChange={() => setActiveMood(m.id)}
                      className="accent-[#1A1615]"
                    />
                    <span className="capitalize">{m.name.toLowerCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quality Assurance Note */}
            <div className="p-4 bg-[#F4EFE6] rounded-xs border border-[#EAE3D6] space-y-2 text-xs text-[#6B6560]">
              <div className="font-semibold text-[#1A1615] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>The DIVA Promise</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All jewellery is 100% skin safe, lead & nickel free, and protected with anti-tarnish coating.
              </p>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="md:col-span-3 lg:col-span-4">
            <div className="flex justify-between items-center mb-4 text-xs text-[#6B6560]">
              <span>Showing {filteredProducts.length} jewellery pieces</span>
              {filteredProducts.length > 0 && <span>Verified Jaipur Artisanal Catalogue</span>}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#F4EFE6]/40 rounded-xs border border-[#EAE3D6] space-y-3">
                <p className="text-lg font-serif text-[#1A1615]">No jewellery matched your filters</p>
                <p className="text-xs text-[#6B6560]">
                  Try clearing your filters or exploring another category.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial rounded-xs hover:bg-[#C5A880] transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#1A1615]/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#EAE3D6]">
                  <h3 className="text-sm font-semibold uppercase tracking-editorial text-[#1A1615]">
                    FILTERS
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-[#1A1615]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1615] mb-2">
                    PRICE RANGE
                  </h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'under-999', label: 'Under ₹999' },
                      { id: '1000-1999', label: '₹1,000 – ₹1,999' },
                      { id: 'above-2000', label: '₹2,000 & Above' }
                    ].map((item) => (
                      <label key={item.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="mobile-price"
                          checked={priceRange === item.id}
                          onChange={() => setPriceRange(item.id)}
                          className="accent-[#1A1615]"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1615] mb-2">
                    STYLE
                  </h4>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="mobile-style"
                        checked={activeStyle === 'all'}
                        onChange={() => setActiveStyle('all')}
                        className="accent-[#1A1615]"
                      />
                      <span>All Styles</span>
                    </label>
                    {styleCategories.map((s) => (
                      <label key={s.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="mobile-style"
                          checked={activeStyle === s.id}
                          onChange={() => setActiveStyle(s.id)}
                          className="accent-[#1A1615]"
                        />
                        <span className="capitalize">{s.name.toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE3D6] space-y-2">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial rounded-xs"
                >
                  APPLY FILTERS ({filteredProducts.length} ITEMS)
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full py-2 text-xs text-[#6B6560] underline text-center"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="text-sm font-serif text-[#1A1615] animate-pulse">
            Loading DIVA Collections...
          </div>
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}
