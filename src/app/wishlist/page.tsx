'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { products } from '@/data/products';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, formatPrice } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold">Wishlist</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAVED FOR LATER</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1615] mt-1.5">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6560] mt-1">
            Keep track of your favorite DIVA pieces and move them to bag whenever you&apos;re ready.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F4EFE6]/60 border border-[#EAE3D6] rounded-xs max-w-md mx-auto p-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAE3D6] flex items-center justify-center text-[#B85D43] mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl text-[#1A1615]">Your wishlist is empty</h2>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Explore our trendy hoops, Jaipur Meenakari jhumkas, and layered chains to curate your personal style.
            </p>
            <Link
              href="/collections"
              className="py-3 px-6 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors inline-block"
            >
              EXPLORE JEWELLERY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs p-3 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative aspect-square rounded-xs overflow-hidden bg-[#F4EFE6] mb-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-1.5 bg-[#FAF7F2]/90 backdrop-blur-xs rounded-full text-[#B85D43] hover:text-[#1A1615] transition-colors shadow-xs"
                      aria-label="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-[#6B6560] font-medium">
                    {product.category}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium text-xs sm:text-sm text-[#1A1615] hover:text-[#C5A880] transition-colors line-clamp-1 block mt-0.5"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1615] mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EAE3D6]">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product, 1);
                      toggleWishlist(product.id);
                    }}
                    className="w-full py-2.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
