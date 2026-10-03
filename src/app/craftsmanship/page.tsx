'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, ChevronRight, Check } from 'lucide-react';

export default function CraftsmanshipPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] pb-24">
      {/* Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JAIPUR METALLURGY & BENCHCRAFT</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1615] leading-tight">
            Traditional Artistry, <br />
            Modern Metallurgy.
          </h1>
          <p className="text-xs sm:text-base text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            How our Raja Park workshop bridges 300 years of Rajasthani jewellery heritage with advanced anti-tarnish technology for today’s active lifestyle.
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
          <span className="text-[#1A1615] font-semibold">Craftsmanship</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Chapter 1: Jaipur Meenakari */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-square rounded-xs overflow-hidden bg-[#F4EFE6] border border-[#EAE3D6]">
            <Image
              src="/images/products/set-2-detail.jpg"
              alt="Jaipur Emerald Malachite Enamelling Close-up"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              CHAPTER I
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1615]">
              Authentic Jaipur Artisanal Stonecraft
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              Originated in the royal courts and perfected across generations in the walled alleys of Jaipur, our stonecraft blends vibrant gemstone cabochons with intricate concentric gold grooves.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              In our Raja Park studio, our artisans hand-finish deep emerald malachite, opalescent moonstones, and warm fiery carnelian, encasing each in mirror-finish 18K gold bezels that never tarnish.
            </p>
          </div>
        </div>

        {/* Chapter 2: Anti-Tarnish Metallurgy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              CHAPTER II
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1615]">
              18K Vacuum PVD Plating & Anti-Tarnish Shield
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              Traditional fashion jewellery tarnishes within weeks due to humidity and skin moisture. At DIVA, we utilize physical vapor deposition (PVD) inside a vacuum chamber.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              Real 18K yellow gold molecules are atomically bonded onto our hypoallergenic surgical brass bases, followed by an invisible nano-ceramic sealant. The result is sweat-resistant, shower-friendly jewellery that maintains its golden luster for years.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-[#F4EFE6] px-3 py-1 text-[#1A1615] rounded-xs font-medium">✓ 100% Waterproof</span>
              <span className="bg-[#F4EFE6] px-3 py-1 text-[#1A1615] rounded-xs font-medium">✓ Zero Green Skin</span>
              <span className="bg-[#F4EFE6] px-3 py-1 text-[#1A1615] rounded-xs font-medium">✓ Nickel & Lead Free</span>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-square rounded-xs overflow-hidden bg-[#F4EFE6] border border-[#EAE3D6]">
            <Image
              src="/images/products/bangles-1-detail.jpg"
              alt="18K Gold Plated Micro Texture"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Chapter 3: Featherlight Comfort */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-square rounded-xs overflow-hidden bg-[#F4EFE6] border border-[#EAE3D6]">
            <Image
              src="/images/products/ear-4.jpg"
              alt="Lightweight All-Day Wear"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              CHAPTER III
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1615]">
              Featherlight Hollow Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              Nothing ruins an evening like heavy earrings pulling painfully at your earlobes. We engineer our chunky hoops and grand jhumkas with precision hollow-core electroforming.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              You receive all the visual volume and dramatic sculptural presence of solid metal, while each earring weighs under 6 to 9 grams — light enough to wear effortlessly from 9 AM meetings all the way through midnight wedding after-parties.
            </p>
            <div className="pt-4">
              <Link
                href="/collections"
                className="px-6 py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors inline-block"
              >
                EXPERIENCE THE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
