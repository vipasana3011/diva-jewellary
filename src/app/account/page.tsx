'use client';

import React from 'react';
import Link from 'next/link';
import { User, ShieldCheck, Heart, ShoppingBag, Package, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function AccountPage() {
  const { wishlist, cart } = useShop();

  const mockPastOrders = [
    {
      id: 'DIVA-849201',
      date: '28 Sep 2026',
      items: 'Sculptural Chunky Gold Hoops (1)',
      total: '₹899',
      status: 'Delivered',
      tracking: 'BlueDart • Track #BD8492'
    },
    {
      id: 'DIVA-738192',
      date: '12 Aug 2026',
      items: 'Jaipur Lotus Meenakari Jhumkas (1), Layered Herringbone Chain (1)',
      total: '₹2,798',
      status: 'Delivered',
      tracking: 'Delhivery • Track #DL7381'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold">My Account</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Profile Card Header */}
        <div className="bg-[#F4EFE6] border border-[#EAE3D6] p-6 sm:p-8 rounded-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#1A1615] text-[#FAF7F2] flex items-center justify-center text-xl font-serif shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest-editorial text-[#997448]">
                DIVA CIRCLE REWARDS MEMBER
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1615]">
                Welcome back, Ananya!
              </h1>
              <p className="text-xs text-[#6B6560] mt-0.5">
                Member since 2025 • Raja Park Preferred Shopper
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/wishlist"
              className="py-2.5 px-4 bg-[#FAF7F2] border border-[#D9CEBF] text-xs font-semibold uppercase tracking-wider text-[#1A1615] hover:bg-[#FAF7F2]/80 transition-colors rounded-xs flex items-center space-x-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#B85D43]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
            <Link
              href="/cart"
              className="py-2.5 px-4 bg-[#1A1615] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors rounded-xs flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cart.length})</span>
            </Link>
          </div>
        </div>

        {/* Account Columns: Recent Orders & Saved Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest-editorial text-[#1A1615] flex items-center space-x-2">
              <Package className="w-4 h-4 text-[#997448]" />
              <span>ORDER HISTORY</span>
            </h2>

            <div className="space-y-3">
              {mockPastOrders.map((ord) => (
                <div key={ord.id} className="bg-[#FAF7F2] border border-[#EAE3D6] p-5 rounded-xs space-y-2">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-[#1A1615]">{ord.id}</span>
                      <span className="text-[#807972] ml-2">• Placed on {ord.date}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-xs">
                      {ord.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#2C2724]">{ord.items}</p>

                  <div className="pt-2 border-t border-[#EAE3D6] flex justify-between items-center text-xs">
                    <span className="text-[#6B6560]">{ord.tracking}</span>
                    <span className="font-bold text-[#1A1615]">Total: {ord.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Perks & Saved Address (1 col) */}
          <div className="space-y-6">
            <div className="bg-[#F4EFE6] border border-[#EAE3D6] p-5 rounded-xs space-y-3 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#1A1615] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>MEMBER PERKS</span>
              </h3>
              <ul className="space-y-2 text-[#6B6560]">
                <li>✓ Free Express Delivery across India on orders &gt; ₹999</li>
                <li>✓ Complimentary anti-tarnish storage pouches with every order</li>
                <li>✓ Early 24-hour access to Diwali & festive capsule drops</li>
                <li>✓ Lifetime complimentary inspection at our Raja Park studio</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F2] border border-[#EAE3D6] p-5 rounded-xs space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[#1A1615] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#997448]" />
                <span>SAVED DELIVERY ADDRESS</span>
              </h3>
              <p className="text-[#2C2724] font-medium">Ananya Sharma (+91 98290 11223)</p>
              <p className="text-[#6B6560]">Flat 402, Royal Residency, Raja Park, Jaipur, Rajasthan 302004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
