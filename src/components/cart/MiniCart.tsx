'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Truck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function MiniCart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    formatPrice
  } = useShop();

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#1A1615]/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col z-10 border-l border-[#EAE3D6]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-[#F4EFE6]/60">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#1A1615]" />
                <h2 className="text-sm font-semibold tracking-editorial uppercase text-[#1A1615]">
                  YOUR SHOPPING BAG ({cart.reduce((t, i) => t + i.quantity, 0)})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-[#6B6560] hover:text-[#1A1615] transition-colors cursor-pointer"
                aria-label="Close Shopping Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3.5 bg-[#FAF7F2] border-b border-[#EAE3D6]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <div className="flex items-center space-x-1.5 text-[#1A1615]">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>
                    {freeShippingRemaining === 0 ? (
                      <span className="text-[#997448] font-semibold">🎉 You unlocked FREE Express Delivery!</span>
                    ) : (
                      <>
                        Add <span className="font-semibold text-[#1A1615]">{formatPrice(freeShippingRemaining)}</span> for FREE Express Delivery
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[11px] text-[#6B6560]">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#EAE3D6] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C5A880] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B6560]">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-medium text-[#1A1615]">Your bag is empty</h3>
                    <p className="text-xs text-[#6B6560] mt-1 max-w-xs">
                      Discover our modern Jaipur fashion jewellery crafted for every version of you.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-editorial rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors cursor-pointer"
                  >
                    EXPLORE NEW ARRIVALS
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex space-x-3.5 pb-4 border-b border-[#EAE3D6] last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-[#F4EFE6] rounded-xs shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs font-medium text-[#1A1615] hover:text-[#C5A880] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[11px] text-[#6B6560] capitalize mt-0.5">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          aria-label="Remove item"
                          className="text-[#807972] hover:text-[#B85D43] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#D9CEBF] rounded-xs bg-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 text-[#1A1615] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#1A1615]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 text-[#1A1615] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-[#1A1615]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#EAE3D6] bg-[#F4EFE6]/40 space-y-3.5">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B6560]">
                    <span>Bag Subtotal</span>
                    <span className="font-medium text-[#1A1615]">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6560]">
                    <span>Shipping</span>
                    <span>
                      {freeShippingRemaining === 0 ? (
                        <span className="text-[#997448] font-medium">FREE</span>
                      ) : (
                        formatPrice(99)
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#EAE3D6] flex justify-between text-sm font-semibold text-[#1A1615]">
                    <span>Total</span>
                    <span>
                      {formatPrice(cartSubtotal + (freeShippingRemaining === 0 ? 0 : 99))}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs flex items-center justify-center space-x-2 hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors"
                  >
                    <span>CHECKOUT SECURELY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="text-[#6B6560] hover:text-[#1A1615] underline underline-offset-4 transition-colors"
                    >
                      View Full Bag
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="text-[#6B6560] hover:text-[#1A1615] transition-colors"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
