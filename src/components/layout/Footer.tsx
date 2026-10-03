'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const tickerItems = [
    'JAIPUR BENCH-CRAFTED ATELIER',
    '18K ANTI-TARNISH PVD METALLURGY',
    'RAJA PARK STUDIO',
    '100% HYPOALLERGENIC & WATERPROOF',
    'COMPLIMENTARY PAN-INDIA EXPRESS SHIPPING',
    '7-DAY HASSLE-FREE RETURNS & EXCHANGES',
    'ESTABLISHED IN JAIPUR, RAJASTHAN'
  ];
  return (
    <footer className="bg-[#0C0A09] text-[#FAF7F2] relative overflow-hidden select-none">
      {/* ======================================================== */}
      {/* 1. LUXURY GOLD RUNNING MARQUEE                           */}
      {/* ======================================================== */}
      <div className="border-b border-[#26201B] py-3.5 bg-[#080706] overflow-hidden">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] space-x-12 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#D4A257]/90 uppercase">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-6">
              <span>{item}</span>
              <span className="text-[#D4A257]/40 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BRAND TRUST BADGES ROW (EDITORIAL SEALS)              */}
      {/* ======================================================== */}
      <div className="border-b border-[#26201B] py-10 px-4 sm:px-6 lg:px-8 bg-[#100D0B]/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-[#D4A257]/10 border border-[#D4A257]/25 flex items-center justify-center text-[#D4A257] shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-editorial uppercase text-[#FAF7F2]">18K Anti-Tarnish Gold</h4>
              <p className="text-[11px] text-[#A8A199] mt-0.5 leading-relaxed">Shower-safe vacuum PVD micron plating</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-[#D4A257]/10 border border-[#D4A257]/25 flex items-center justify-center text-[#D4A257] shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-editorial uppercase text-[#FAF7F2]">Complimentary Shipping</h4>
              <p className="text-[11px] text-[#A8A199] mt-0.5 leading-relaxed">Free express India delivery over ₹999</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-[#D4A257]/10 border border-[#D4A257]/25 flex items-center justify-center text-[#D4A257] shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-editorial uppercase text-[#FAF7F2]">100% Skin-Safe Alloy</h4>
              <p className="text-[11px] text-[#A8A199] mt-0.5 leading-relaxed">Hypoallergenic titanium, lead & nickel free</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-[#D4A257]/10 border border-[#D4A257]/25 flex items-center justify-center text-[#D4A257] shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-editorial uppercase text-[#FAF7F2]">Jaipur Bench-Crafted</h4>
              <p className="text-[11px] text-[#A8A199] mt-0.5 leading-relaxed">Hand-finished in Raja Park atelier</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. VIP ATELIER NEWSLETTER INVITATION CARD                */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#171310] via-[#1E1915] to-[#171310] border border-[#382F26] p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-radial from-[#D4A257]/10 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.25em] text-[#D4A257] uppercase bg-[#D4A257]/10 px-3 py-1 rounded-full border border-[#D4A257]/20">
                <span>✦ DIVA PRIVÉ CLUB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2] font-normal leading-tight">
                Unlock 10% Off Your First Order
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A199] max-w-lg leading-relaxed">
                Be the first to access limited Jaipur atelier drops, secret sales, and VIP jewellery styling edits.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-[#D4A257]/15 border border-[#D4A257]/30 rounded-xl flex items-center space-x-3 text-sm text-[#FAF7F2]">
                  <CheckCircle2 className="w-5 h-5 text-[#D4A257] shrink-0" />
                  <div>
                    <span className="font-semibold">Welcome to the Club!</span>
                    <p className="text-xs text-[#D4A257] mt-0.5">Use code <span className="font-bold underline">DIVA10</span> at checkout.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3.5 bg-[#0C0A09] border border-[#382F26] rounded-full text-xs text-[#FAF7F2] placeholder-[#706963] focus:outline-none focus:border-[#D4A257] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3.5 bg-[#D4A257] text-[#0C0A09] text-xs font-semibold tracking-editorial uppercase rounded-full hover:bg-[#FAF7F2] transition-colors shrink-0 flex items-center justify-center space-x-1.5 shadow-md shadow-[#D4A257]/15 cursor-pointer"
                    >
                      <span>JOIN NOW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-[#706963]">
                    <Lock className="w-3 h-3 text-[#D4A257]" />
                    <span>No spam, strictly curated luxury drops. Unsubscribe anytime.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN FOOTER NAVIGATION COLUMNS                        */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Anchor Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block relative group" aria-label="DIVA Jewellery Homepage">
              <div className="h-12 w-auto relative">
                <Image
                  src="/images/diva-gold-logo.png"
                  alt="DIVA Jewellery"
                  width={280}
                  height={88}
                  className="h-full w-auto object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <p className="text-xs text-[#A8A199] leading-relaxed max-w-sm">
              DIVA is a Jaipur-born Indian fashion jewellery atelier creating wearable, trend-driven, and accessible pieces for modern women. From viral everyday molten gold to handcrafted Jaipur statement jewellery.
            </p>

            <div className="space-y-2.5 text-xs text-[#D9CEBF]">
              <div className="flex items-center space-x-3 text-[#D4A257]">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-[#A8A199]">Raja Park, Jaipur, Rajasthan 302004, India</span>
              </div>
              <div className="flex items-center space-x-3 text-[#D4A257]">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+918239017449" className="text-[#A8A199] hover:text-[#FAF7F2] transition-colors">
                  +91 82390 17449
                </a>
              </div>
              <div className="flex items-center space-x-3 text-[#D4A257]">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:care@divajewels.in" className="text-[#A8A199] hover:text-[#FAF7F2] transition-colors">
                  care@divajewels.in
                </a>
              </div>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4A257] mb-5">
              COLLECTIONS
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A199]">
              <li>
                <Link href="/new-arrivals" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Earrings & Hoops
                </Link>
              </li>
              <li>
                <Link href="/collections/pendants" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Pendants & Chains
                </Link>
              </li>
              <li>
                <Link href="/collections/bangles" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Bangles & Cuffs
                </Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Stackable Rings
                </Link>
              </li>
              <li>
                <Link href="/collections/sets" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Curated Suites & Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/western-jewellery" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Western Girly Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* ATELIER Column */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4A257] mb-5">
              THE ATELIER
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A199]">
              <li>
                <Link href="/about" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Craftsmanship & Heritage
                </Link>
              </li>
              <li>
                <Link href="/about#jaipur" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Raja Park Studio
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Anti-Tarnish Metallurgy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Contact & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP & CONCIERGE Column */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4A257] mb-5">
              CLIENT CARE
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A199]">
              <li>
                <Link href="/contact#shipping" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Shipping & Pan-India Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact#returns" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  7-Day Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/about#care" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Jewellery Care Guide
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#FAF7F2] hover:translate-x-1 inline-block transition-transform">
                  Track Your Order
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/918239017449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4A257] hover:underline flex items-center space-x-1"
                >
                  <span>WhatsApp Concierge ↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. EDITORIAL WATERMARK & BOTTOM BAR                      */}
        {/* ======================================================== */}
        <div className="mt-14 pt-8 border-t border-[#26201B] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#706963] gap-4">
          <p>© {new Date().getFullYear()} DIVA FASHION JEWELLERY. All Rights Reserved. Raja Park, Jaipur, India.</p>

          <div className="flex items-center space-x-6 text-[#A8A199]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4A257] transition-colors flex items-center space-x-1.5"
            >
              <InstagramIcon className="w-4 h-4 text-[#D4A257]" />
              <span>@divajewels.jaipur</span>
            </a>
            <span className="text-[#382F26]">•</span>
            <span className="text-[#807972]">Handcrafted with 18K Gold Micron Finish</span>
          </div>
        </div>
      </div>

      {/* Massive Luxury Watermark Backdrop */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[140px] sm:text-[220px] lg:text-[280px] font-serif font-black text-[#D4A257]/[0.025] select-none pointer-events-none tracking-tighter whitespace-nowrap">
        DIVA
      </div>
    </footer>
  );
}
