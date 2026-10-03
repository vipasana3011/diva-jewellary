'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { products } from '@/data/products';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchSuggestions = [
    'Jhumkas',
    'Gold Hoops',
    'Layered Pendants',
    'Freshwater Pearls',
    'Snake Chain',
    'Cuffs & Bangles',
    'Dome Rings',
    'Wedding Sets'
  ];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.style.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.moods.some((m) => m.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#1A1615]/70 backdrop-blur-md cursor-pointer"
          />

          {/* Search Content Window */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative min-h-screen bg-[#FAF7F2] p-4 sm:p-8 flex flex-col max-w-4xl mx-auto shadow-2xl"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#EAE3D6]">
              <span className="text-xs uppercase tracking-widest-editorial text-[#997448] font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SEARCH DIVA JAIPUR</span>
              </span>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Big Search Input Field */}
            <div className="py-8 border-b border-[#EAE3D6]">
              <div className="relative flex items-center">
                <Search className="w-6 h-6 text-[#997448] absolute left-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search earrings, jhumkas, layered pendants, cuffs..."
                  className="w-full pl-10 pr-4 text-lg sm:text-2xl font-serif text-[#1A1615] bg-transparent outline-none placeholder:text-[#807972]/60 placeholder:font-serif"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs uppercase tracking-wider text-[#6B6560] hover:text-[#1A1615]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Suggestion Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#807972] mr-1">Popular searches:</span>
                {searchSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="text-xs px-3 py-1 bg-[#F4EFE6] text-[#2C2724] rounded-full hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 py-6">
              {query.trim() === '' ? (
                <div>
                  <h4 className="text-xs uppercase tracking-widest-editorial text-[#6B6560] mb-4 font-semibold">
                    TRENDING RIGHT NOW
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {products.slice(0, 4).map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex flex-col space-y-2"
                      >
                        <div className="relative aspect-square bg-[#F4EFE6] rounded-xs overflow-hidden">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#1A1615] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-xs font-semibold text-[#1A1615] mt-0.5">
                            {formatPrice(p.price)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs uppercase tracking-widest-editorial text-[#6B6560] font-semibold">
                      FOUND {filteredProducts.length} JEWELLERY PIECES
                    </h4>
                    <Link
                      href={`/collections?search=${encodeURIComponent(query)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="text-xs text-[#997448] font-medium flex items-center space-x-1 hover:underline"
                    >
                      <span>View in catalogue</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex flex-col space-y-2 p-2 rounded-xs hover:bg-[#F4EFE6]/60 transition-colors"
                      >
                        <div className="relative aspect-square bg-[#F4EFE6] rounded-xs overflow-hidden">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-[#6B6560] tracking-wider">
                            {p.category}
                          </span>
                          <div className="text-xs font-medium text-[#1A1615] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-xs font-semibold text-[#1A1615] mt-0.5">
                            {formatPrice(p.price)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <p className="text-base font-serif text-[#1A1615]">
                    No jewellery found matching &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[#6B6560] max-w-sm mx-auto">
                    Try searching for &apos;hoops&apos;, &apos;jhumkas&apos;, &apos;pearls&apos;, or browse our curated collections.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs font-semibold uppercase tracking-editorial text-[#997448] underline mt-2"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
