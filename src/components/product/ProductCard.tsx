'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, formatPrice } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col bg-[#FFFFFF] p-3 sm:p-3.5 rounded-[26px] sm:rounded-[30px] border border-[#EAE3D6]/70 shadow-[0_8px_24px_rgba(26,22,21,0.05)] hover:shadow-[0_20px_40px_rgba(212,162,87,0.14)] hover:border-[#D4A257]/40 transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Product Image Frame (Rounded Pastel Container) */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#FBF8F3] to-[#F5ECE0] rounded-[20px] sm:rounded-[22px] border border-[#EAE3D6]/50">
        <Link href={`/product/${product.slug}`} className="block w-full h-full p-2 sm:p-3">
          {/* Primary Product Shot */}
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className={`object-contain object-center transition-all duration-700 ease-out ${
                isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            />

            {/* Hover Second View */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} detail view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-contain object-center transition-all duration-700 ease-out absolute inset-0 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            )}
          </div>
        </Link>

        {/* Top Badges (Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="text-[10px] tracking-wider uppercase font-bold bg-[#141211] text-[#FAF7F2] px-2.5 py-1 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.trending && (
            <span className="text-[10px] tracking-wider uppercase font-bold bg-[#D4A257] text-[#141211] px-2.5 py-0.5 rounded-full shadow-xs flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart & Quick View buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-8 h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#1A1615] hover:text-[#B85D43] transition-all duration-200 shadow-xs cursor-pointer active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                inWishlist ? 'fill-[#B85D43] text-[#B85D43] scale-110' : 'text-[#1A1615]'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={handleQuickView}
            aria-label="Quick View"
            className="w-8 h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#1A1615] hover:text-[#D4A257] transition-all duration-200 shadow-xs cursor-pointer active:scale-90 opacity-0 group-hover:opacity-100 hidden sm:flex"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Product Information (Matches Image 3 Aesthetic) */}
      <div className="pt-3.5 px-1.5 pb-1 flex flex-col flex-1 justify-between space-y-2.5">
        {/* Title */}
        <div>
          <Link href={`/product/${product.slug}`} className="block group/title">
            <h3 className="font-bold text-sm sm:text-[15px] text-[#1A1615] leading-snug line-clamp-1 group-hover/title:text-[#D4A257] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Micro Specification Badges (Like Vegan / Gluten Free / Organic in Image 3) */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-[#706B65]">
            <span className="font-medium">18K Gold Plated</span>
            <span className="w-1 h-1 rounded-full bg-[#D4A257]" />
            <span className="font-medium">Anti-Tarnish</span>
            <span className="w-1 h-1 rounded-full bg-[#D4A257]" />
            <span className="font-medium">Water-Safe</span>
          </div>

          {/* Micro Tagline (Like "Lorem ipsum dolor sit amet" in Image 3) */}
          <p className="text-xs text-[#807972] line-clamp-1 mt-1 font-normal leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Option Pills (Like Toppings in Image 3: Finish / Style) */}
        <div className="flex items-center space-x-1.5 text-[10px] text-[#807972] pt-0.5">
          <span className="font-medium text-[#706B65]">Finish:</span>
          <span className="font-semibold bg-[#F7F2EA] text-[#1A1615] px-2.5 py-0.5 rounded-full border border-[#EAE3D6]">
            18K Yellow Gold
          </span>
          <span className="text-[#807972] bg-white px-2 py-0.5 rounded-full border border-dashed border-[#EAE3D6] hidden sm:inline-block">
            Atelier Polished
          </span>
        </div>

        {/* 3. Bottom Bar: Price on Left + Add to Cart Button on Right (Exact Image 3 Layout) */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#EAE3D6]/50">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-bold text-[#D4A257]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-[#A8A199] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] text-[#807972] font-medium tracking-tight">
              + Free Jaipur Shipping
            </span>
          </div>

          {/* Add to Cart Pill Button (Exact warm golden button from Image 3) */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="bg-[#D4A257] hover:bg-[#C28E44] active:bg-[#B37E36] text-[#141211] font-semibold text-xs sm:text-[13px] px-4 sm:px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(212,162,87,0.35)] hover:shadow-[0_6px_20px_rgba(212,162,87,0.5)] transition-all duration-200 flex items-center space-x-1.5 cursor-pointer shrink-0 active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Add to bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
