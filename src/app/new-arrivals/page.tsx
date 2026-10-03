'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function NewArrivalsPage() {
  const newArrivals = products.filter((p) => p.newArrival);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-20">
      {/* Editorial Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-1.5 text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRESH FROM RAJA PARK STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615]">
            New Arrivals
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6560] max-w-xl mx-auto leading-relaxed">
            Discover the newest seasonal silhouettes: chunky sculptural hoops, hand-painted Meenakari lotus blooms, freshwater baroque pearls, and anti-tarnish layered chains.
          </p>
          <div className="text-xs text-[#807972] pt-2">
            {newArrivals.length} Fresh Drops • 100% Skin Safe & Anti-Tarnish
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <Link href="/collections" className="hover:text-[#1A1615] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold">New Arrivals</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
