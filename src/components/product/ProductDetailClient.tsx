'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  ArrowRight,
  Share2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronDown,
  Plus,
  Minus,
  MapPin
} from 'lucide-react';
import { products, formatINR } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const {
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    recentlyViewed,
    addRecentlyViewed
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  // Indian Pincode check widget state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const SHOT_LABELS = ['01 STUDIO SHOT', '02 CLOSE-UP DETAIL', '03 LIFESTYLE STYLING'];

  useEffect(() => {
    addRecentlyViewed(product);
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [product]);

  // Fullscreen keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, product.images.length]);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Standard Delivery: 2–4 Business Days to PIN ${pincode} • Cash on Delivery Available`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  // Smart Recommendations: YOU MAY ALSO LIKE
  const relatedProducts = (product.relatedSlugs || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  const fallbackRecommendations = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.style === product.style))
    .slice(0, 4);

  const finalRecommendations = relatedProducts.length >= 2 ? relatedProducts : fallbackRecommendations;

  // COMPLETE THE LOOK products
  const completeLookProducts = (product.completeTheLook || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <Link href="/collections" className="hover:text-[#1A1615] transition-colors">
            Jewellery
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[#1A1615] transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ======================================================== */}
          {/* LEFT: 3-SHOT IMAGE GALLERY                               */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-[#F4EFE6] border border-[#EAE3D6] group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} - ${SHOT_LABELS[activeImageIndex]}`}
                fill
                priority
                className="object-cover object-center transition-all duration-500"
              />

              {/* Shot Label Indicator */}
              <div className="absolute top-4 left-4 z-10 bg-[#1A1615]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] tracking-widest-editorial font-semibold px-2.5 py-1 rounded-xs uppercase">
                {SHOT_LABELS[activeImageIndex]}
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                aria-label="View Fullscreen"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs flex items-center justify-center text-[#1A1615] hover:text-[#C5A880] transition-colors shadow-xs cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Mobile Swipe Left / Right Navigation */}
              <div className="flex sm:hidden items-center justify-between absolute inset-x-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + product.images.length) % product.images.length
                    )
                  }
                  className="w-8 h-8 rounded-full bg-[#FAF7F2]/80 flex items-center justify-center text-[#1A1615] pointer-events-auto shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % product.images.length)
                  }
                  className="w-8 h-8 rounded-full bg-[#FAF7F2]/80 flex items-center justify-center text-[#1A1615] pointer-events-auto shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pagination Dots (Mobile) */}
              <div className="absolute bottom-3 inset-x-0 flex sm:hidden justify-center space-x-1.5 z-10">
                {product.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImageIndex === idx ? 'bg-[#1A1615] w-5' : 'bg-[#1A1615]/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Thumbnails (3 Visual Shots) */}
            <div className="hidden sm:grid grid-cols-3 gap-3.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-xs overflow-hidden border-2 transition-all cursor-pointer bg-[#F4EFE6] group ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] shadow-sm'
                      : 'border-[#EAE3D6] opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Shot ${idx + 1}`} fill className="object-cover" />
                  <div className="absolute bottom-1 inset-x-1 bg-[#1A1615]/80 text-[#FAF7F2] text-[9px] font-semibold tracking-wider text-center py-0.5 rounded-2xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {SHOT_LABELS[idx]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: PRODUCT DETAILS & PURCHASE CONTROLS               */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Collection Tag */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-[#997448] font-semibold uppercase tracking-widest-editorial">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.collection}</span>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-[#6B6560] hover:text-[#1A1615] flex items-center space-x-1 transition-colors text-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Product Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1615] leading-snug">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-[#6B6560] italic">
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Ratings & Reviews */}
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex text-[#997448]">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="font-semibold text-[#1A1615]">{product.rating}</span>
                <span className="text-[#807972]">({product.reviewCount} customer reviews)</span>
                <span className="text-[#807972]">•</span>
                <span className="text-emerald-700 font-medium">In Stock (Raja Park Atelier)</span>
              </div>

              {/* Pricing Section */}
              <div className="pt-3 pb-2 border-y border-[#EAE3D6] flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#1A1615]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#807972] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#B85D43] text-[#FAF7F2] px-2.5 py-0.5 rounded-xs">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-[11px] text-[#807972] ml-auto">Inclusive of all taxes</span>
              </div>

              {/* Brand Trust Badges Row */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#2C2724] bg-[#F4EFE6]/60 p-3.5 rounded-xs border border-[#EAE3D6]">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>18K Anti-Tarnish Plating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Hypoallergenic & Skin-Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Free Shipping &gt; ₹999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>7-Day Easy Exchange</span>
                </div>
              </div>

              {/* Quantity & CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#D9CEBF] rounded-xs bg-[#FAF7F2]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-[#1A1615] hover:bg-[#F4EFE6] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-[#1A1615] hover:bg-[#F4EFE6] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial py-3.5 px-6 rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ADD TO BAG • {formatPrice(product.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className="p-3.5 border border-[#D9CEBF] rounded-xs text-[#1A1615] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWishlist ? 'fill-[#B85D43] text-[#B85D43]' : ''}`}
                    />
                  </button>
                </div>

                {/* Direct Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 border border-[#1A1615] text-[#1A1615] text-xs font-semibold uppercase tracking-editorial rounded-xs hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>BUY NOW (INSTANT CHECKOUT)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Indian Pincode Delivery Checker */}
              <div className="pt-2">
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-[#807972] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit PIN code"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAF7F2] border border-[#1A1615] text-[#1A1615] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#1A1615] hover:text-white transition-colors"
                  >
                    CHECK
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-[11px] text-[#997448] font-medium mt-1.5">{pincodeStatus}</p>
                )}
              </div>

              {/* ======================================================== */}
              {/* EXPANDABLE ACCORDIONS                                     */}
              {/* ======================================================== */}
              <div className="pt-4 border-t border-[#EAE3D6] divide-y divide-[#EAE3D6] text-xs">
                {/* Description */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'desc' ? null : 'desc')
                    }
                    className="w-full py-3 flex justify-between items-center text-left font-semibold uppercase tracking-wider text-[#1A1615]"
                  >
                    <span>Description & Styling</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'desc' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pb-4 text-[#6B6560] leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      {product.editorialQuote && (
                        <p className="p-3 bg-[#F4EFE6] border-l-2 border-[#C5A880] text-[#1A1615] italic">
                          &ldquo;{product.editorialQuote}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Materials & Specs */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'materials' ? null : 'materials')
                    }
                    className="w-full py-3 flex justify-between items-center text-left font-semibold uppercase tracking-wider text-[#1A1615]"
                  >
                    <span>Materials & Specifications</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'materials' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'materials' && (
                    <div className="pb-4 space-y-2 text-[#2C2724]">
                      <div>
                        <span className="text-[#6B6560]">Plating & Finish: </span>
                        <span className="font-medium">{product.materials.finish}</span>
                      </div>
                      <div>
                        <span className="text-[#6B6560]">Base Metal: </span>
                        <span className="font-medium">{product.materials.base}</span>
                      </div>
                      <div>
                        <span className="text-[#6B6560]">Stones & Accents: </span>
                        <span className="font-medium">{product.materials.stones}</span>
                      </div>
                      <div>
                        <span className="text-[#6B6560]">Dimensions: </span>
                        <span className="font-medium">{product.dimensions}</span>
                      </div>
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {product.materials.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#F4EFE6] px-2 py-0.5 rounded-xs text-[#1A1615] font-medium"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Jaipur Craftsmanship */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'craft' ? null : 'craft')
                    }
                    className="w-full py-3 flex justify-between items-center text-left font-semibold uppercase tracking-wider text-[#1A1615]"
                  >
                    <span>Jaipur Craftsmanship</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'craft' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'craft' && (
                    <ul className="pb-4 space-y-1.5 list-disc list-inside text-[#6B6560]">
                      {product.craftDetails.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Care Guide */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'care' ? null : 'care')
                    }
                    className="w-full py-3 flex justify-between items-center text-left font-semibold uppercase tracking-wider text-[#1A1615]"
                  >
                    <span>Care & Longevity</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'care' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'care' && (
                    <ul className="pb-4 space-y-1.5 list-disc list-inside text-[#6B6560]">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* COMPLETE THE LOOK SECTION                                */}
      {/* ======================================================== */}
      {completeLookProducts.length > 0 && (
        <section className="py-12 bg-[#F4EFE6] border-y border-[#EAE3D6] my-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
                  CURATED STYLING
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1615]">
                  Complete The Look
                </h3>
              </div>
              <span className="text-xs text-[#6B6560] hidden sm:inline">
                Pieces frequently styled together with {product.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {completeLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* YOU MAY ALSO LIKE (SMART RECOMMENDATIONS)                 */}
      {/* ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAE3D6]">
          <div>
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              RECOMMENDED FOR YOU
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1615]">
              You May Also Like
            </h3>
          </div>
          <Link
            href={`/collections/${product.category}`}
            className="text-xs font-semibold tracking-editorial uppercase text-[#1A1615] hover:text-[#C5A880] flex items-center space-x-1"
          >
            <span>MORE {product.category.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {finalRecommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* RECENTLY VIEWED SECTION                                  */}
      {/* ======================================================== */}
      {recentlyViewed.filter((p) => p.id !== product.id).length > 0 && (
        <section className="py-12 bg-[#FAF7F2] border-t border-[#EAE3D6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xs uppercase tracking-widest-editorial text-[#6B6560] font-semibold mb-6">
              RECENTLY VIEWED
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL                                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-[#1A1615]/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#C5A880] p-2 cursor-pointer z-50"
              aria-label="Close fullscreen"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Prev */}
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (prev) => (prev - 1 + product.images.length) % product.images.length
                )
              }
              className="absolute left-6 text-white hover:text-[#C5A880] p-3 cursor-pointer z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center">
              <Image
                src={product.images[activeImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Right Next */}
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev + 1) % product.images.length)
              }
              className="absolute right-6 text-white hover:text-[#C5A880] p-3 cursor-pointer z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 text-center text-[#EAE3D6] text-xs tracking-wider">
              {product.name} — {SHOT_LABELS[activeImageIndex]} ({activeImageIndex + 1} / {product.images.length})
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
