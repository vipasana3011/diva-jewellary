'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight, Sparkles, X } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(products);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.finish.toLowerCase().includes(q) ||
        p.materials.stones.toLowerCase().includes(q) ||
        p.moods.some((m) => m.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  const searchPills = [
    'Jhumkas',
    'Gold Hoops',
    'Layered Pendants',
    'Snake Chain',
    'Cuffs & Bangles',
    'Dome Rings',
    'Sets'
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-24">
      {/* Editorial Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JAIPUR CATALOGUE SEARCH</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1615]">
            Search DIVA
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6560] max-w-md mx-auto">
            Find the perfect earring, jhumka, chain or bracelet for every version of you.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold">Search</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs px-4 py-3">
            <Search className="w-5 h-5 text-[#997448] mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by jewellery type, style, or occasion..."
              className="w-full bg-transparent text-sm sm:text-base text-[#1A1615] outline-none placeholder:text-[#807972]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs uppercase text-[#6B6560] hover:text-[#1A1615] ml-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Search Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#807972]">Suggested:</span>
            {searchPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setQuery(pill)}
                className="text-xs px-3 py-1 bg-[#F4EFE6] text-[#2C2724] rounded-full hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6 text-xs text-[#6B6560] pb-2 border-b border-[#EAE3D6]">
          <span>
            {query.trim()
              ? `Found ${results.length} results for "${query}"`
              : `Showing all ${results.length} designs in catalogue`}
          </span>
          <span>Jaipur Fashion Jewellery</span>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="text-center py-20 bg-[#F4EFE6]/50 rounded-xs border border-[#EAE3D6] space-y-3">
            <p className="text-lg font-serif text-[#1A1615]">No jewellery matched &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-[#6B6560]">
              Try searching for &apos;hoops&apos;, &apos;jhumkas&apos;, &apos;pendant&apos;, or view our new arrivals.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="px-6 py-2.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial rounded-xs hover:bg-[#C5A880] transition-colors"
            >
              SHOW ALL JEWELLERY
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="text-sm font-serif text-[#1A1615] animate-pulse">
            Loading search...
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
