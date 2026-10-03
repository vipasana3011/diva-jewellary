'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ChevronRight, Truck, Check, Tag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    formatPrice
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIVA10') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try code: DIVA10');
    }
  };

  const discountAmount = discountApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const shippingFee = freeShippingRemaining === 0 ? 0 : 99;
  const finalTotal = cartSubtotal - discountAmount + shippingFee;

  const cartProductIds = cart.map((i) => i.product.id);
  const recommendedAddons = products
    .filter((p) => !cartProductIds.includes(p.id) && p.price <= 999)
    .slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold">Shopping Bag</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl sm:text-4xl font-serif text-[#1A1615] mb-8">
          Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center bg-[#F4EFE6]/60 rounded-xs border border-[#EAE3D6] max-w-xl mx-auto p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EAE3D6] flex items-center justify-center text-[#6B6560] mx-auto">
              <Sparkles className="w-6 h-6 text-[#997448]" />
            </div>
            <h2 className="font-serif text-2xl text-[#1A1615]">Your bag is currently empty</h2>
            <p className="text-xs text-[#6B6560] max-w-sm mx-auto leading-relaxed">
              Explore our curated Jaipur jewellery collection — from everyday sculptural hoops to handcrafted Meenakari jhumkas.
            </p>
            <Link
              href="/collections"
              className="py-3 px-8 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors inline-block"
            >
              EXPLORE JEWELLERY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery bar */}
              <div className="p-4 bg-[#F4EFE6] border border-[#EAE3D6] rounded-xs flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-[#997448]" />
                  <span>
                    {freeShippingRemaining === 0 ? (
                      <strong className="text-emerald-700">
                        🎉 Congratulations! Your order qualifies for FREE Express Shipping across India!
                      </strong>
                    ) : (
                      <>
                        Add <strong className="text-[#1A1615]">{formatPrice(freeShippingRemaining)}</strong> more to unlock FREE Express Delivery!
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs divide-y divide-[#EAE3D6]">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 bg-[#F4EFE6] rounded-xs overflow-hidden shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#6B6560] font-medium tracking-wider">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm font-medium text-[#1A1615] hover:text-[#C5A880] transition-colors block"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-xs text-[#807972] mt-0.5">
                          Unit Price: {formatPrice(item.product.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAE3D6]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9CEBF] rounded-xs bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="p-1.5 text-[#1A1615] hover:bg-[#F4EFE6]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1A1615]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="p-1.5 text-[#1A1615] hover:bg-[#F4EFE6]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-sm font-bold text-[#1A1615] min-w-20 text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        className="text-[#807972] hover:text-[#B85D43] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <div className="flex justify-between items-center pt-2 text-xs">
                <Link
                  href="/collections"
                  className="text-[#6B6560] hover:text-[#1A1615] flex items-center space-x-1"
                >
                  <span>← Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-4">
              {/* Order Summary Box */}
              <div className="bg-[#F4EFE6] p-6 rounded-xs border border-[#EAE3D6] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615]">
                  ORDER SUMMARY
                </h3>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#807972] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon: DIVA10"
                      className="w-full pl-8 pr-2 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBF] rounded-xs uppercase outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#C5A880] transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {discountApplied && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Coupon DIVA10 applied (10% OFF)!</span>
                  </p>
                )}
                {couponError && <p className="text-[11px] text-[#B85D43]">{couponError}</p>}

                <div className="divide-y divide-[#EAE3D6] pt-2 text-xs text-[#2C2724] space-y-2">
                  <div className="flex justify-between pt-2">
                    <span className="text-[#6B6560]">Subtotal</span>
                    <span className="font-semibold text-[#1A1615]">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between pt-2 text-emerald-700">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <span className="text-[#6B6560]">Shipping (India)</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 text-base font-bold text-[#1A1615]">
                    <span>Total Amount</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-2 text-[11px] text-[#6B6560] text-center space-y-1">
                  <p>🔒 256-Bit SSL Encrypted Checkout</p>
                  <p>🚚 Dispatch from Raja Park, Jaipur within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Add-ons Under ₹999 */}
        {recommendedAddons.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#EAE3D6]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
                  COMPLETE YOUR ORDER
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1615] mt-0.5">
                  Popular Pieces Under ₹999
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendedAddons.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
