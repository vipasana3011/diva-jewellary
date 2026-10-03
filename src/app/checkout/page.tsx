'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  Sparkles
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, freeShippingRemaining, clearCart, formatPrice } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Rajasthan',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const shippingFee = freeShippingRemaining === 0 ? 0 : 99;
  const totalAmount = cartSubtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `DIVA-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#1A1615', '#B85D43', '#F4EFE6']
      });
    }, 1000);
  };

  const indianStates = [
    'Rajasthan',
    'Maharashtra',
    'Delhi NCR',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
    'Gujarat',
    'West Bengal',
    'Telangana',
    'Punjab',
    'Haryana',
    'Kerala',
    'Madhya Pradesh',
    'Bihar',
    'Assam',
    'Goa',
    'Uttarakhand',
    'Himachal Pradesh',
    'Other'
  ];

  if (orderConfirmed) {
    return (
      <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-[#F4EFE6]/80 p-8 sm:p-10 rounded-xs border border-[#EAE3D6] text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
              ORDER CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1615] mt-1">
              Thank You, {formData.fullName || 'Valued Customer'}!
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6560] mt-1.5">
              Your order <span className="font-bold text-[#1A1615]">{confirmedOrderId}</span> has been placed successfully.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#EAE3D6] pb-2">
              <span className="text-[#6B6560]">Dispatch Location:</span>
              <span className="font-medium text-[#1A1615]">Raja Park Atelier, Jaipur</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE3D6] pb-2">
              <span className="text-[#6B6560]">Estimated Delivery:</span>
              <span className="font-semibold text-emerald-800">3–4 Business Days</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE3D6] pb-2">
              <span className="text-[#6B6560]">Payment Method:</span>
              <span className="font-medium uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-sm">
              <span>Amount Paid / Due:</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <p className="text-xs text-[#6B6560] leading-relaxed">
            We have sent an order confirmation SMS and email to <strong className="text-[#1A1615]">{formData.phone}</strong> and <strong className="text-[#1A1615]">{formData.email}</strong> with live tracking details.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors"
            >
              RETURN TO HOME
            </Link>
            <Link
              href="/collections"
              className="px-8 py-3 border border-[#1A1615] text-[#1A1615] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-24">
      {/* Top Header */}
      <div className="border-b border-[#EAE3D6] bg-[#FAF7F2] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/cart" className="text-xs text-[#6B6560] hover:text-[#1A1615] flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bag</span>
          </Link>
          <Link href="/" className="h-8 w-auto relative inline-block">
            <Image
              src="/images/diva-gold-logo.png"
              alt="DIVA Jewellery"
              width={160}
              height={50}
              className="h-full w-auto object-contain"
            />
          </Link>
          <div className="flex items-center space-x-1 text-xs text-[#6B6560]">
            <Lock className="w-3.5 h-3.5 text-[#997448]" />
            <span>256-bit Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1615] mb-8">
          Express Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Customer & Address Form */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="bg-[#FAF7F2] border border-[#EAE3D6] p-6 rounded-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1615] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>CONTACT INFORMATION</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Mobile Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#6B6560] mb-1 font-medium">Email Address (for order updates) *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ananya@example.com"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-[#FAF7F2] border border-[#EAE3D6] p-6 rounded-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1615] text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>DELIVERY ADDRESS (INDIA)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#6B6560] mb-1 font-medium">Flat / House No., Apartment, Street *</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 42B, Gulab Marg, Raja Park"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near LBS College"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">City / District *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Jaipur"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880] cursor-pointer"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B6560] mb-1 font-medium">6-Digit PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="302004"
                    className="w-full px-3 py-2.5 bg-[#F4EFE6] border border-[#D9CEBF] rounded-xs outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-[#FAF7F2] border border-[#EAE3D6] p-6 rounded-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1615] text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>PAYMENT METHOD</span>
              </h2>

              <div className="space-y-3 text-xs">
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'upi' ? 'border-[#C5A880] bg-[#F4EFE6]' : 'border-[#EAE3D6]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#1A1615]"
                    />
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-[#997448]" />
                      <span className="font-semibold text-[#1A1615]">UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-xs">FASTEST</span>
                </label>

                {/* Card Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-[#C5A880] bg-[#F4EFE6]' : 'border-[#EAE3D6]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#1A1615]"
                    />
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-[#997448]" />
                      <span className="font-semibold text-[#1A1615]">Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-[#C5A880] bg-[#F4EFE6]' : 'border-[#EAE3D6]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#1A1615]"
                    />
                    <div className="flex items-center space-x-2">
                      <Banknote className="w-4 h-4 text-[#997448]" />
                      <span className="font-semibold text-[#1A1615]">Cash on Delivery (Pay upon delivery)</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#807972]">Available</span>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-xs hover:bg-[#C5A880] hover:text-[#1A1615] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
            >
              {isSubmitting ? (
                <span>CONFIRMING YOUR ORDER...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>PLACE ORDER • {formatPrice(totalAmount)}</span>
                </>
              )}
            </button>
          </form>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#F4EFE6] p-6 rounded-xs border border-[#EAE3D6] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615]">
              BAG SUMMARY ({cart.reduce((t, i) => t + i.quantity, 0)})
            </h3>

            {/* Items list */}
            <div className="divide-y divide-[#EAE3D6] max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-white rounded-xs overflow-hidden shrink-0 border border-[#EAE3D6]">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-[#1A1615] line-clamp-1">{item.product.name}</div>
                      <div className="text-[11px] text-[#6B6560]">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1A1615]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost totals */}
            <div className="border-t border-[#EAE3D6] pt-3 space-y-2 text-xs text-[#2C2724]">
              <div className="flex justify-between">
                <span className="text-[#6B6560]">Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6560]">Shipping (India)</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE3D6] text-sm font-bold text-[#1A1615]">
                <span>Total Amount</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE3D6] space-y-2 text-[11px] text-[#6B6560]">
              <div className="flex items-center space-x-1.5 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>All items quality inspected in Raja Park, Jaipur</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 shrink-0 text-[#997448]" />
                <span>Express courier tracking dispatched via SMS & Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
