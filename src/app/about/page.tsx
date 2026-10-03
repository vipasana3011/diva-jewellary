import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] pb-24">
      {/* Editorial Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE DIVA PHILOSOPHY</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1615] leading-tight">
            An Aspirational Indian Fashion Jewellery Brand, Born in Jaipur.
          </h1>
          <p className="text-xs sm:text-base text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            We believe you shouldn&apos;t have to choose between cheap fast-fashion trinkets that turn your neck green, and ₹5 lakh diamond jewellery locked in a bank vault.
          </p>
        </div>
      </section>

      {/* Narrative Section with Editorial Visual */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              MODERN JAIPUR ROOTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1615]">
              Made To Be Worn. <br />
              Made To Be Noticed.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              <p>
                DIVA was established in Raja Park, the bustling cultural and commercial hub of Jaipur, Rajasthan. Surrounded by centuries of royal enamelling masters, gemstone cutters, and filigree artisans, we set out to reimagine Indian jewellery for a new generation.
              </p>
              <p>
                Our muse is the modern Indian woman: ambitious at work, effortless at Sunday brunch with friends, radiant at a family sangeet, and confident in her everyday life. She wants jewellery that seamlessly transitions between an unbuttoned linen blazer and an embroidered pastel saree.
              </p>
              <p>
                That is why every DIVA creation strikes the deliberate balance between Western minimalism and Indian artisanal flair.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-xs overflow-hidden shadow-xl bg-[#EAE3D6] border border-[#EAE3D6]">
              <Image
                src="/images/jaipur-editorial.jpg"
                alt="Jaipur Architecture and Fashion Editorial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#EAE3D6]">
          <div className="bg-[#F4EFE6]/70 p-8 rounded-xs border border-[#EAE3D6] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#997448]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#1A1615]">
              Accessible Luxury
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Believable, realistic Indian fashion pricing (₹499 to ₹3,499). Premium digital presentation with accessible price tags.
            </p>
          </div>

          <div className="bg-[#F4EFE6]/70 p-8 rounded-xs border border-[#EAE3D6] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#997448]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#1A1615]">
              18K Anti-Tarnish Coating
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Engineered with advanced vacuum PVD plating over surgical-grade brass and steel. Waterproof, sweat-resistant, and 100% skin-safe.
            </p>
          </div>

          <div className="bg-[#F4EFE6]/70 p-8 rounded-xs border border-[#EAE3D6] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#997448]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#1A1615]">
              Jaipur Handcrafted
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Every Meenakari lotus petal, Kundan foil setting, and seed-pearl tassel is hand-finished by master jewel-smiths in Raja Park.
            </p>
          </div>
        </div>

        {/* Physical Atelier Location Details */}
        <div id="jaipur" className="bg-[#1A1615] text-[#FAF7F2] p-8 sm:p-12 rounded-xs shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#C5A880]">
                VISIT OUR JAIPUR STUDIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2]">
                Raja Park Design Studio
              </h2>
              <p className="text-xs text-[#D9CEBF] leading-relaxed">
                Step into our creative space in the heart of Jaipur to view our latest season collections, experience our tactile finishes, or pick up your online orders.
              </p>
              <div className="space-y-2 text-xs text-[#FAF7F2] pt-2">
                <div className="flex items-center space-x-2 text-[#C5A880]">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Raja Park, Jaipur, Rajasthan 302004, India</span>
                </div>
                <div className="flex items-center space-x-2 text-[#C5A880]">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:+918239017449" className="hover:underline">+91 82390 17449</a>
                </div>
                <div className="flex items-center space-x-2 text-[#C5A880]">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:care@divajewels.in" className="hover:underline">care@divajewels.in</a>
                </div>
              </div>
            </div>

            <div className="relative aspect-16/10 rounded-xs overflow-hidden bg-[#2C2724] border border-[#C5A880]/30">
              <Image
                src="/images/hero-campaign.jpg"
                alt="DIVA Jaipur Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
