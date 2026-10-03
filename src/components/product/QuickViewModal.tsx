'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist, formatPrice } =
    useShop();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const discount = Math.round(
    ((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100
  );

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-[#1A1615]/70 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#FAF7F2] max-w-3xl w-full rounded-xs shadow-2xl overflow-hidden z-10 border border-[#EAE3D6] my-8"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#FAF7F2]/90 flex items-center justify-center text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-[#F4EFE6] flex flex-col justify-between">
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-white shadow-xs">
                <Image
                  src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2.5 mt-4 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#C5A880] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#997448] font-semibold">
                  <span>{quickViewProduct.category}</span>
                  <span>•</span>
                  <span>{quickViewProduct.collection}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif text-[#1A1615] mt-1.5 leading-snug">
                  {quickViewProduct.name}
                </h2>

                <p className="text-xs text-[#6B6560] mt-1.5 italic">
                  &ldquo;{quickViewProduct.tagline}&rdquo;
                </p>

                {/* Price Section */}
                <div className="mt-4 flex items-baseline space-x-3">
                  <span className="text-xl font-semibold text-[#1A1615]">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-xs text-[#807972] line-through">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#B85D43] text-white px-2 py-0.5 rounded-xs">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Materials Micro List */}
                <div className="mt-4 pt-4 border-t border-[#EAE3D6] space-y-1.5 text-xs text-[#2C2724]">
                  <div>
                    <span className="text-[#6B6560]">Finish: </span>
                    <span className="font-medium">{quickViewProduct.materials.finish}</span>
                  </div>
                  <div>
                    <span className="text-[#6B6560]">Base: </span>
                    <span className="font-medium">{quickViewProduct.materials.base}</span>
                  </div>
                  <div>
                    <span className="text-[#6B6560]">Dimensions: </span>
                    <span className="font-medium">{quickViewProduct.dimensions}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-2 text-[11px] text-[#997448]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Anti-tarnish coating • 100% skin safe & hypoallergenic</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#EAE3D6] space-y-3">
                <div className="flex gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#D9CEBF] rounded-xs bg-[#FAF7F2]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-[#1A1615] hover:bg-[#F4EFE6]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-[#1A1615] hover:bg-[#F4EFE6]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial py-2.5 px-4 rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ADD TO BAG • {formatPrice(quickViewProduct.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-2.5 border border-[#D9CEBF] rounded-xs text-[#1A1615] hover:bg-[#F4EFE6] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWishlist ? 'fill-[#B85D43] text-[#B85D43]' : ''}`}
                    />
                  </button>
                </div>

                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  onClick={closeQuickView}
                  className="w-full text-center text-xs text-[#6B6560] hover:text-[#1A1615] flex items-center justify-center space-x-1 py-1 transition-colors"
                >
                  <span>View full product details, reviews & styling</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
