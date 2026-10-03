'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Heart,
  Eye,
  Star,
  ShoppingBag,
  Flame,
  Layers,
  CircleDot
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Ring3DConfigurator from '@/components/3d/Ring3DConfigurator';
import { products, moodCategories, styleCategories, formatINR } from '@/data/products';
import { useShop } from '@/context/ShopContext';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function HomePage() {
  const { addToCart } = useShop();

  // Scroll Progress Animation (High-Class Top Bar)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll-driven Parallax values for floating aesthetic particles
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const floatingRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Carousel Controls
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [carouselProgress, setCarouselProgress] = useState(0);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    carouselContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCarouselScroll = () => {
    if (!carouselContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setCarouselProgress((scrollLeft / maxScroll) * 100);
    }
  };

  // Pinterest Stacking Bundle Tabs
  const [activeLookTab, setActiveLookTab] = useState(0);
  const [lookAddedStatus, setLookAddedStatus] = useState(false);

  // Best Sellers Filter Tab
  const [bestSellerTab, setBestSellerTab] = useState<'all' | 'pendants' | 'bangles' | 'under999' | 'trending'>('all');

  // Spotlight Signature Piece (Entwined Open Heart Snake Chain)
  const spotlightProduct = products.find((p) => p.slug === 'entwined-open-heart-snake-chain') || products[0];
  const [spotlightAdded, setSpotlightAdded] = useState(false);


  // Curated Subsets
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const trendingPieces = products.filter((p) => p.trending).slice(0, 8);
  const pendantsCollection = products.filter((p) => p.category === 'pendants').slice(0, 4);
  const banglesCollection = products.filter((p) => p.category === 'bangles').slice(0, 4);

  // Curated Pinterest Stacking Bundles
  const curatedLooks = [
    {
      title: 'The Clean-Girl Daily Stack',
      occasion: 'Casual Chic • Everyday Minimalism',
      quote: 'Organic hammered pearl drops and silky liquid snake chain with molten fluid rings.',
      image: '/images/mood-everyday.jpg',
      bundleDiscount: 'Bundle & Save 15%',
      productSlugs: ['hammered-disc-pearl-drops', 'entwined-open-heart-snake-chain', 'molten-gold-fluid-trio']
    },
    {
      title: 'The Warm Amber Atelier Edit',
      occasion: 'Honey Glow • Brunch & Dates',
      quote: 'Lustrous tortoiseshell amber drops paired with warm carnelian agate and marbled resin cuffs.',
      image: '/images/mood-brunch.jpg',
      bundleDiscount: 'Bundle & Save 15%',
      productSlugs: ['amber-tortoiseshell-square-drops', 'carnelian-cabochon-gold-pendant', 'organic-marble-resin-gold-cuffs']
    },
    {
      title: 'The Molten Bangle Arm Party',
      occasion: 'Statement Stacking • High Glamour',
      quote: 'Layered beaten dome cuffs and viral chunky rings with dramatic swirling vortex hoops.',
      image: '/images/mood-party.jpg',
      bundleDiscount: 'Bundle & Save 15%',
      productSlugs: ['chunky-hammered-dome-bangle-stack', 'viral-chunky-dome-coil-rings', 'sculptural-gold-vortex-spirals']
    }
  ];

  const currentLook = curatedLooks[activeLookTab];
  const currentLookProducts = currentLook.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  const lookBundleTotal = currentLookProducts.reduce((sum, p) => sum + (p ? p.price : 0), 0);
  const lookDiscountedTotal = Math.round(lookBundleTotal * 0.85);

  const handleAddLookBundle = () => {
    currentLookProducts.forEach((p) => {
      if (p) addToCart(p, 1);
    });
    setLookAddedStatus(true);
    setTimeout(() => setLookAddedStatus(false), 2200);
  };

  // Filtered Bestsellers
  const filteredBestsellers = products.filter((p) => {
    if (bestSellerTab === 'pendants') return p.category === 'pendants';
    if (bestSellerTab === 'bangles') return p.category === 'bangles';
    if (bestSellerTab === 'under999') return p.price <= 999;
    if (bestSellerTab === 'trending') return p.trending;
    return p.bestSeller || p.trending;
  }).slice(0, 8);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] overflow-x-hidden selection:bg-[#C5A880]/30 selection:text-[#1A1615] relative">
      {/* ============================================================ */}
      {/* TOP SCROLL PROGRESS BAR (HIGH-CLASS GOLD LINE)               */}
      {/* ============================================================ */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C5A880] via-[#E8B878] to-[#997448] origin-left z-50 shadow-sm"
      />

      {/* Floating Ambient Parallax Elements */}
      <motion.div
        style={{ y: floatingY1, rotate: floatingRotate }}
        className="fixed top-24 right-10 w-24 h-24 border border-[#C5A880]/15 rounded-full pointer-events-none z-0 hidden lg:block"
      />
      <motion.div
        style={{ y: floatingY2 }}
        className="fixed bottom-36 left-8 w-16 h-16 border border-[#C5A880]/10 rounded-full pointer-events-none z-0 hidden lg:block"
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION — FULL-SCREEN LANDSCAPE 3D RING CONFIGURATOR */}
      {/* ============================================================ */}
      <Ring3DConfigurator />

      {/* ============================================================ */}
      {/* 2. VALUE PILLARS INFINITE MARQUEE TICKER                     */}
      {/* ============================================================ */}
      <div className="bg-[#F4EFE6] py-3.5 border-b border-[#EAE3D6] overflow-hidden whitespace-nowrap relative z-10">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 24, repeat: Infinity }}
          className="inline-flex items-center space-x-8 text-xs font-semibold tracking-widest-editorial uppercase text-[#2C2724]"
        >
          <span className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>PINTEREST TRENDING WESTERN JEWELLERY</span>
          </span>
          <span className="text-[#C5A880]">✦</span>
          <span>18K HEAVY GOLD MICRON COATING</span>
          <span className="text-[#C5A880]">✦</span>
          <span>CHUNKY MOLTEN GOLD BANGLES &amp; STACKS</span>
          <span className="text-[#C5A880]">✦</span>
          <span>FEATHERLIGHT FOR 24/7 SKIN COMFORT</span>
          <span className="text-[#C5A880]">✦</span>
          <span>FREE SHIPPING ACROSS INDIA OVER ₹999</span>
          <span className="text-[#C5A880]">✦</span>
          <span>100% HYPOALLERGENIC &amp; NICKEL-FREE</span>
          <span className="text-[#C5A880]">✦</span>
          {/* Duplicate loop */}
          <span className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>PINTEREST TRENDING WESTERN JEWELLERY</span>
          </span>
          <span className="text-[#C5A880]">✦</span>
          <span>18K HEAVY GOLD MICRON COATING</span>
          <span className="text-[#C5A880]">✦</span>
          <span>CHUNKY MOLTEN GOLD BANGLES &amp; STACKS</span>
          <span className="text-[#C5A880]">✦</span>
          <span>FEATHERLIGHT FOR 24/7 SKIN COMFORT</span>
          <span className="text-[#C5A880]">✦</span>
          <span>FREE SHIPPING ACROSS INDIA OVER ₹999</span>
          <span className="text-[#C5A880]">✦</span>
          <span>100% HYPOALLERGENIC &amp; NICKEL-FREE</span>
          <span className="text-[#C5A880]">✦</span>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2.5 BEST FOR YOUR CATEGORIES & CURATED PROMO BANNERS         */}
      {/* (EXACT REPLICA OF USER REFERENCE IMAGE 1 & 2)                */}
      {/* ============================================================ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#EAE3D6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-[#D4A257]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615]">
                Best For Your Categories
              </h2>
              <span className="w-8 h-[1px] bg-[#D4A257]" />
            </div>
            <p className="text-xs sm:text-sm text-[#706B65]">
              Find your perfect style from our curated collections
            </p>
          </div>

          {/* 1. Circular Category Avatars Row (Matches Image 1 & 2) */}
          <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 lg:gap-12 overflow-x-auto pb-4 scrollbar-none snap-x">
            {[
              {
                name: 'Earrings',
                slug: 'earrings',
                count: '5 Products',
                img: '/images/categories/category-earrings.jpg'
              },
              {
                name: 'Pendants',
                slug: 'pendants',
                count: '4 Products',
                img: '/images/categories/category-pendants.jpg'
              },
              {
                name: 'Bangles',
                slug: 'bangles',
                count: '4 Products',
                img: '/images/categories/category-bangles.jpg'
              },
              {
                name: 'Rings',
                slug: 'rings',
                count: '4 Products',
                img: '/images/categories/category-rings.jpg'
              },
              {
                name: 'Curated Sets',
                slug: 'sets',
                count: '5 Products',
                img: '/images/categories/category-sets.jpg'
              },
              {
                name: 'Western Chic',
                slug: 'western-jewellery',
                count: '8 Products',
                img: '/images/categories/category-western.jpg'
              }
            ].map((cat, idx) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 snap-center"
              >
                <Link href={`/collections/${cat.slug}`} className="group flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative border-2 border-[#EAE3D6] group-hover:border-[#D4A257] shadow-sm group-hover:shadow-md transition-all duration-300 p-1 bg-white">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image
                        src={cat.img}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 80px, 120px"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1A1615] mt-3 group-hover:text-[#D4A257] transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-[#807972] font-medium">
                    {cat.count}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 2. Three Curated Promo Banners (Matches Image 1 & 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
            {[
              {
                badge: 'SUMMER COLLECTION',
                title: 'Sculptural Molten Hoops & Drops',
                href: '/collections/earrings',
                img: '/images/categories/promo-banner-1.jpg',
                bg: 'bg-gradient-to-r from-[#FAF3EA] to-[#F5ECE0]'
              },
              {
                badge: 'NEW ARRIVALS',
                title: '18K Western Gold Pendants & Chains',
                href: '/collections/pendants',
                img: '/images/categories/promo-banner-2.jpg',
                bg: 'bg-gradient-to-r from-[#FAF5ED] to-[#F2EBDE]'
              },
              {
                badge: 'TRENDING ACCESSORIES',
                title: 'Mediterranean Turquoise & Chic Suites',
                href: '/collections/sets',
                img: '/images/categories/promo-banner-3.jpg',
                bg: 'bg-gradient-to-r from-[#F6EFE6] to-[#EFE7DC]'
              }
            ].map((banner, idx) => (
              <motion.div
                key={banner.badge}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={banner.href}
                  className={`group relative rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#EAE3D6]/80 p-6 sm:p-7 flex items-center justify-between shadow-xs hover:shadow-lg transition-all duration-300 min-h-[170px] sm:min-h-[190px] ${banner.bg}`}
                >
                  <div className="space-y-2.5 max-w-[58%] z-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#8C6D46] block">
                      {banner.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#1A1615] leading-snug line-clamp-2 group-hover:text-[#997448] transition-colors">
                      {banner.title}
                    </h3>
                    <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider text-[#1A1615] uppercase pt-1">
                      <span className="underline underline-offset-4 decoration-[#D4A257]">SHOP NOW</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Cutout Image on Right Side */}
                  <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-2xl overflow-hidden relative shrink-0 shadow-sm border border-white/60">
                    <Image
                      src={banner.img}
                      alt={banner.title}
                      fill
                      sizes="140px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. TRENDING NOW — INTERACTIVE DRAG CAROUSEL                  */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>WHAT EVERYONE IS PINNING</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1">
                Trending on Pinterest
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EAE3D6] flex items-center justify-center text-[#1A1615] hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EAE3D6] flex items-center justify-center text-[#1A1615] hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <Link
                href="/collections?filter=trending"
                className="hidden sm:flex text-xs font-semibold tracking-editorial uppercase text-[#1A1615] hover:text-[#C5A880] transition-colors items-center space-x-1 ml-2"
              >
                <span>SEE ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Carousel Drag Track */}
          <div
            ref={carouselContainerRef}
            onScroll={handleCarouselScroll}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x cursor-grab active:cursor-grabbing"
          >
            {trendingPieces.map((product) => (
              <div
                key={product.id}
                className="w-[240px] sm:w-[280px] shrink-0 snap-start bg-[#FAF7F2] p-2 rounded-xl border border-[#EAE3D6] shadow-xs hover:border-[#C5A880]/40 transition-colors"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EAE3D6] h-1 mt-4 rounded-full overflow-hidden">
            <div
              className="bg-[#997448] h-full transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(15, carouselProgress)}%` }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE VIRAL PENDANT BAR (TRENDING GIRLY PENDANTS)           */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-[#EAE3D6]">
          <div>
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center space-x-1.5">
              <CircleDot className="w-3.5 h-3.5" />
              <span>THE NECK STACK</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1">
              Trending Pendants &amp; Chains
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] mt-1 max-w-lg">
              Bow ribbons, lucky four-leaf clovers, baroque pearls, and fluid snake ribbons designed to layer effortlessly.
            </p>
          </div>
          <Link
            href="/collections/pendants"
            className="mt-3 sm:mt-0 text-xs font-semibold tracking-editorial uppercase text-[#1A1615] hover:text-[#C5A880] transition-colors flex items-center space-x-1"
          >
            <span>VIEW ALL PENDANTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {pendantsCollection.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={prod} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. THE CHUNKY BANGLE & CUFF VAULT                           */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6]/60 border-y border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-[#EAE3D6]">
            <div>
              <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>ARM CANDY</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1">
                Chunky Bangles &amp; Stacking Cuffs
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6560] mt-1 max-w-lg">
                Sculptural molten waves, chunky paperclips, and tennis sparkle engineered for effortless daily wrist stacks.
              </p>
            </div>
            <Link
              href="/collections/bangles"
              className="mt-3 sm:mt-0 text-xs font-semibold tracking-editorial uppercase text-[#1A1615] hover:text-[#C5A880] transition-colors flex items-center space-x-1"
            >
              <span>VIEW ALL BANGLES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {banglesCollection.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={prod} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SIGNATURE SPOTLIGHT — COQUETTE BOW & PEARL PENDANT       */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF7F2] to-[#F5EFE6] p-6 sm:p-10 rounded-2xl border border-[#EAE3D6] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual */}
            <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden shadow-md bg-[#EAE3D6] border border-[#EAE3D6]">
              <Image
                src={spotlightProduct.images[0]}
                alt={spotlightProduct.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#1A1615] text-[#FAF7F2] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                #1 VIRAL PINTEREST PICK
              </div>
            </div>

            {/* Content & Direct Buy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIGNATURE SHOWSTOPPER</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615]">
                {spotlightProduct.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
                {spotlightProduct.description}
              </p>

              {/* Craft Pillars */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6]">
                  <div className="font-semibold text-[#1A1615]">3D Ribbon Loop</div>
                  <div className="text-[10px] text-[#807972] mt-0.5">Sculptural fluid knot</div>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6]">
                  <div className="font-semibold text-[#1A1615]">Freshwater Pearl</div>
                  <div className="text-[10px] text-[#807972] mt-0.5">Natural lustrous drop</div>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6]">
                  <div className="font-semibold text-[#1A1615]">18K Micron Gold</div>
                  <div className="text-[10px] text-[#807972] mt-0.5">Anti-tarnish polymer seal</div>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6]">
                  <div className="font-semibold text-[#1A1615]">Featherlight Fit</div>
                  <div className="text-[10px] text-[#807972] mt-0.5">Zero neck pull (&lt; 8g)</div>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#EAE3D6]">
                <div>
                  <div className="text-[11px] text-[#807972]">Accessible Luxury in ₹ INR</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-[#1A1615]">
                      {formatINR(spotlightProduct.price)}
                    </span>
                    <span className="text-sm text-[#807972] line-through">
                      {formatINR(spotlightProduct.originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(spotlightProduct, 1);
                      setSpotlightAdded(true);
                      setTimeout(() => setSpotlightAdded(false), 2000);
                    }}
                    disabled={spotlightAdded}
                    className="flex-1 sm:flex-none px-7 py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-full hover:bg-[#C5A880] hover:text-[#1A1615] transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{spotlightAdded ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}</span>
                  </button>

                  <Link
                    href={`/product/${spotlightProduct.slug}`}
                    className="px-5 py-3 border border-[#1A1615] text-[#1A1615] text-xs font-semibold tracking-editorial uppercase rounded-full hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors text-center"
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. COMPLETE THE LOOK — CURATED PINTEREST STACKING BUNDLES    */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6] border-y border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-[#EAE3D6]">
            <div>
              <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
                STYLED TO PERFECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1615] mt-1">
                Complete The Stacking Look
              </h2>
            </div>

            {/* Look Selector Tabs */}
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-1 max-w-full">
              {curatedLooks.map((look, idx) => (
                <button
                  key={look.title}
                  type="button"
                  onClick={() => setActiveLookTab(idx)}
                  className={`px-4 py-2 text-xs font-semibold tracking-editorial uppercase rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeLookTab === idx
                      ? 'bg-[#1A1615] text-[#FAF7F2] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#6B6560] hover:text-[#1A1615]'
                  }`}
                >
                  {look.title}
                </button>
              ))}
            </div>
          </div>

          {/* Current Look Bundle Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#EAE3D6] shadow-sm">
            {/* Visual */}
            <div className="lg:col-span-5 relative aspect-4/5 rounded-xl overflow-hidden shadow-md border border-[#EAE3D6]">
              <Image
                src={currentLook.image}
                alt={currentLook.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#C5A880]">
                  {currentLook.occasion}
                </span>
                <h3 className="text-xl font-serif text-[#FAF7F2] mt-0.5">{currentLook.title}</h3>
                <p className="text-xs text-[#EAE3D6] italic mt-1">&ldquo;{currentLook.quote}&rdquo;</p>
              </div>
            </div>

            {/* Pieces in Bundle */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1615]">
                    PIECES IN THIS STACK:
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85D43] bg-[#B85D43]/10 px-3 py-1 rounded-full">
                    {currentLook.bundleDiscount}
                  </span>
                </div>

                <div className="space-y-3">
                  {currentLookProducts.map((prod) => {
                    if (!prod) return null;
                    return (
                      <div
                        key={prod.id}
                        className="flex items-center justify-between bg-[#F4EFE6]/60 p-3 rounded-lg border border-[#EAE3D6]"
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className="relative w-14 h-14 bg-[#FAF7F2] rounded-md overflow-hidden shrink-0 border border-[#EAE3D6]">
                            <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#6B6560] tracking-wider font-medium">
                              {prod.category}
                            </span>
                            <Link
                              href={`/product/${prod.slug}`}
                              className="text-xs sm:text-sm font-medium text-[#1A1615] hover:text-[#C5A880] transition-colors block line-clamp-1"
                            >
                              {prod.name}
                            </Link>
                            <div className="text-xs font-semibold text-[#1A1615] mt-0.5">
                              {formatINR(prod.price)}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(prod, 1)}
                          className="p-2 text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer"
                          aria-label="Add individual piece to bag"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bundle Checkout */}
              <div className="pt-4 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#6B6560]">Bundle Price (3 Items):</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-[#1A1615]">
                      {formatINR(lookDiscountedTotal)}
                    </span>
                    <span className="text-xs text-[#807972] line-through">
                      {formatINR(lookBundleTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddLookBundle}
                  disabled={lookAddedStatus}
                  className="w-full sm:w-auto px-8 py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-full hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lookAddedStatus ? 'ALL 3 PIECES ADDED ✓' : 'ADD COMPLETE LOOK TO BAG'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FEATURED BEST SELLERS (FILTERABLE GRID)                   */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              CUSTOMER OBSESSIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1">
              Pinterest Favorites
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Favorites' },
              { id: 'pendants', label: 'Pendants & Chains' },
              { id: 'bangles', label: 'Bangles & Cuffs' },
              { id: 'under999', label: 'Under ₹999' },
              { id: 'trending', label: 'Trending' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBestSellerTab(tab.id as any)}
                className={`px-4 py-1.5 text-xs font-semibold tracking-editorial uppercase rounded-full transition-all cursor-pointer ${
                  bestSellerTab === tab.id
                    ? 'bg-[#1A1615] text-[#FAF7F2]'
                    : 'bg-[#F4EFE6] text-[#6B6560] border border-[#EAE3D6] hover:text-[#1A1615]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBestsellers.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={prod} />
            </motion.div>
          ))}
        </div>
      </section>
      {/* ============================================================ */}
      {/* 9. LUXURY SOCIAL-PROOF & VERIFIED CLIENT REVIEWS             */}
      {/* ============================================================ */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#EAE3D6] pb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>VERIFIED SOCIAL PROOF</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615] mt-1.5">
              Client Love &amp; Styling Edits
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] mt-2">
              Over 12,000+ modern Indian women styling DIVA daily across Mumbai, Delhi, Bengaluru &amp; Jaipur.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#1A1615] bg-[#F4EFE6] px-4 py-2 rounded-full border border-[#EAE3D6]">
            <div className="flex text-[#D4A257]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.95 / 5.0 (2,400+ Reviews)</span>
          </div>
        </div>

        {/* 3 Editorial Verified Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              quote:
                'The molten fluid ring stack is sheer perfection. I wore it for three consecutive days through humidity and multiple handwashes—zero tarnishing, zero green skin. The 18K gold luster looks identical to solid gold.',
              author: 'Ananya Sharma',
              location: 'Bandra, Mumbai',
              product: 'Molten Fluid 3-Piece Ring Stack',
              price: '₹899',
              image: '/images/products/ring-1-detail.jpg',
              slug: 'molten-gold-fluid-trio'
            },
            {
              quote:
                'Finally an Indian jewellery brand that captures the clean-girl Pinterest aesthetic without the ₹10,000 price tag. The open heart snake chain glides like liquid silk and catches candlelight so gracefully.',
              author: 'Rhea Mukherjee',
              location: 'Indiranagar, Bengaluru',
              product: 'Entwined Open Heart Snake Chain',
              price: '₹749',
              image: '/images/products/pendent-1-detail.jpg',
              slug: 'entwined-open-heart-snake-chain'
            },
            {
              quote:
                'The beaten dome bangle stack has that substantial, tactile weight and unmistakable luxury chime. Beautifully packaged in an ivory velvet pouch. Raja Park craftsmanship is truly world-class.',
              author: 'Kavya Deora',
              location: 'C-Scheme, Jaipur',
              product: 'Artisan 4-Piece Chunky Bangle Stack',
              price: '₹1,399',
              image: '/images/products/bangles-1-detail.jpg',
              slug: 'chunky-hammered-dome-bangle-stack'
            }
          ].map((rev, idx) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FBF9F6] border border-[#EAE3D6] rounded-2xl p-7 flex flex-col justify-between space-y-6 shadow-2xs hover:shadow-md hover:border-[#D4A257]/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4A257]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#997448] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-full">
                    VERIFIED BUYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#2C2724] leading-relaxed font-light italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE3D6]/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1615]">{rev.author}</h4>
                  <p className="text-[10px] text-[#807972]">{rev.location}</p>
                </div>
                <Link
                  href={`/product/${rev.slug}`}
                  className="flex items-center space-x-2.5 group-hover:text-[#D4A257] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative border border-[#EAE3D6] shrink-0">
                    <Image src={rev.image} alt={rev.product} fill className="object-cover" />
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-semibold text-[#1A1615] block max-w-[100px] truncate">{rev.product}</span>
                    <span className="text-[9px] text-[#997448] font-bold">{rev.price}</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* AS SEEN ON CREATORS & INFLUENCERS (5 REAL INFLUENCER LOOKS) */}
        {/* ============================================================ */}
        <div className="space-y-8 pt-8 border-t border-[#EAE3D6]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest-editorial uppercase text-[#997448] flex items-center space-x-1.5">
                <InstagramIcon className="w-3.5 h-3.5 text-[#D4A257]" />
                <span>AS SEEN ON CREATORS</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1.5">
                Styled by Muses &amp; Creators
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6560] mt-1">
                Real women styling DIVA pieces across the globe. Click any creator to shop their exact matching piece.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-editorial uppercase text-[#1A1615] hover:text-[#D4A257] transition-colors flex items-center space-x-1.5 bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#EAE3D6] shadow-2xs"
            >
              <span>FOLLOW @DIVAJEWELS.JAIPUR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                img: '/images/products/influencer-earing.jpg',
                handle: '@riya.sen',
                creator: 'Riya Sen',
                location: 'Mumbai',
                productName: 'High-Gloss Sculptural Vortex Hoops',
                category: 'Earrings & Hoops',
                price: '₹899',
                originalPrice: '₹1,499',
                slug: 'sculptural-gold-vortex-spirals',
                badge: 'VIRAL REEL'
              },
              {
                img: '/images/products/influencer-earing2.jpg',
                handle: '@tanya.kapoor',
                creator: 'Tanya Kapoor',
                location: 'Delhi',
                productName: 'Tortoise Amber Petal Cuffed Hoops',
                category: 'Earrings & Hoops',
                price: '₹849',
                originalPrice: '₹1,299',
                slug: 'amber-petal-cuffed-hoops',
                badge: 'CLEAN GIRL'
              },
              {
                img: '/images/products/influencer-set.jpg',
                handle: '@meera.atelier',
                creator: 'Meera Singhania',
                location: 'Jaipur',
                productName: 'Mediterranean Turquoise Teardrop Suite',
                category: 'Curated 3-Piece Suite',
                price: '₹1,599',
                originalPrice: '₹2,399',
                slug: 'mediterranean-turquoise-triad',
                badge: 'PARIS EDIT'
              },
              {
                img: '/images/products/influncer-pendent.jpg',
                handle: '@natasha.rao',
                creator: 'Natasha Rao',
                location: 'Bengaluru',
                productName: 'Geometric Midnight Sapphire Necklace',
                category: 'Pendants & Collars',
                price: '₹899',
                originalPrice: '₹1,399',
                slug: 'geometric-sapphire-cylinder-necklace',
                badge: 'SUMMER CHIC'
              },
              {
                img: '/images/products/influncer-ring.jpg',
                handle: '@alisha.verma',
                creator: 'Alisha Verma',
                location: 'Chandigarh',
                productName: 'Botanical Blossom & Puffed Heart 5-Ring Edit',
                category: '5-Ring Stack Set',
                price: '₹999',
                originalPrice: '₹1,599',
                slug: 'botanical-signet-statement-edit',
                badge: 'RING STACK'
              }
            ].map((look, idx) => (
              <motion.div
                key={look.handle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/product/${look.slug}`}
                  className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-[#EAE3D6] border border-[#EAE3D6] hover:border-[#D4A257] block shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={look.img}
                    alt={`Styled by ${look.creator}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Backing for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/95 via-[#0C0A09]/25 to-transparent transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-[#FAF7F2] border border-white/15 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <InstagramIcon className="w-3 h-3 text-[#D4A257]" />
                      <span>{look.handle}</span>
                    </span>

                    <span className="text-[9px] font-bold tracking-widest uppercase bg-[#D4A257] text-[#141211] px-2 py-0.5 rounded-full shadow-xs">
                      {look.badge}
                    </span>
                  </div>

                  {/* Bottom Content & Shoppable CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white space-y-1.5">
                    <span className="text-[9px] tracking-wider uppercase font-semibold text-[#D4A257] block">
                      {look.category}
                    </span>
                    <h4 className="text-sm font-serif text-[#FAF7F2] leading-snug line-clamp-1 group-hover:text-[#F2DEBA] transition-colors">
                      {look.productName}
                    </h4>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-sm font-bold text-[#FAF7F2]">{look.price}</span>
                        <span className="text-[10px] text-[#A8A199] line-through">{look.originalPrice}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-[10px] font-bold tracking-wider uppercase text-[#141211] bg-[#FAF7F2] group-hover:bg-[#D4A257] px-2.5 py-1 rounded-full transition-colors shadow-xs">
                        <span>SHOP PIECE</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 10. THE ATELIER CINEMA — FULL SCREEN CLEAN VIDEO & SHAPED    */}
      {/*     TRANSITION COMBINED WITH FOOTER                          */}
      {/* ============================================================ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative bg-[#141211] overflow-hidden"
      >
        {/* Top Header Transition from Section 9 */}
        <div className="bg-[#FAF7F2] pt-14 pb-8 border-t border-[#EAE3D6] text-center px-4">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A257]" />
            <span>DIVA ATELIER CINEMA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4A257]" />
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] mt-1.5">
            18K Molten Western Gold in Fluid Motion
          </h3>
          <p className="text-xs sm:text-sm text-[#706B65] mt-1 max-w-lg mx-auto">
            Experience the mirror gold luster, tactile molten contours, and lightweight luxury alive on the body.
          </p>
        </div>

        {/* Full-Width Edge-to-Edge Pure Clean Silent Video */}
        <div className="relative w-full aspect-16/9 md:aspect-21/9 max-h-[85vh] overflow-hidden bg-black flex items-center justify-center">
          <video
            src="/images/landscape_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Bottom Royal Arch Shaped Cutout Transition into Footer */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg
              viewBox="0 0 1440 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block"
              preserveAspectRatio="none"
            >
              {/* Golden Luminous Arch Contour */}
              <path
                d="M0,75 Q720,0 1440,75"
                stroke="#D4A257"
                strokeWidth="2.5"
                fill="none"
                className="filter drop-shadow-[0_-6px_14px_rgba(212,162,87,0.7)]"
              />
              {/* Solid Footer Color Base (#0C0A09) */}
              <path
                d="M0,75 Q720,0 1440,75 L1440,90 L0,90 Z"
                fill="#0C0A09"
              />
            </svg>

            {/* Centered Luxury Atelier Crest Badge */}
            <div className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <div className="bg-[#0C0A09] border border-[#D4A257]/80 rounded-full px-4 sm:px-6 py-1 sm:py-1.5 shadow-[0_4px_24px_rgba(212,162,87,0.45)] flex items-center space-x-2 text-[8px] sm:text-[10px] tracking-[0.25em] font-semibold text-[#D4A257] uppercase">
                <Sparkles className="w-3 h-3 text-[#D4A257]" />
                <span>DIVA ATELIER • JAIPUR</span>
                <Sparkles className="w-3 h-3 text-[#D4A257]" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
