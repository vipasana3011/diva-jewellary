'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const jewelleryCategories = [
    { name: 'Pendants & Necklaces', href: '/collections/pendants', desc: 'Bows, clovers, lockets & snake chains' },
    { name: 'Bangles & Stacking Cuffs', href: '/collections/bangles', desc: 'Molten wave bangles & tennis links' },
    { name: 'Chunky Hoops & Earrings', href: '/collections/earrings', desc: 'Sculptural molten hoops & baguette huggies' },
    { name: 'Stackable Rings', href: '/collections/rings', desc: 'Molten dome rings & eternity trios' },
    { name: 'Western Girly Accessories', href: '/collections/western-jewellery', desc: 'Coquette bows, charms & pearl chokers' }
  ];

  const collectionsList = [
    { name: 'New Arrivals', href: '/new-arrivals', badge: 'NEW' },
    { name: 'Viral Pendants Bar', href: '/collections/pendants', badge: 'TRENDING' },
    { name: 'Chunky Bangles Edit', href: '/collections/bangles', badge: 'HOT' },
    { name: 'Clean-Girl Everyday', href: '/collections?mood=everyday' },
    { name: 'Sunday Brunch Stacks', href: '/collections?mood=brunch' },
    { name: 'Under ₹999 Drops', href: '/collections?maxPrice=999', badge: 'POPULAR' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1615] text-[#FAF7F2] text-[11px] md:text-xs tracking-widest-editorial py-2 px-4 text-center font-medium uppercase border-b border-[#2C2724] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
          <span>FREE EXPRESS DELIVERY ACROSS INDIA OVER ₹999 • HANDCRAFTED IN RAJA PARK, JAIPUR</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse hidden sm:inline" />
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#EAE3D6] py-2.5'
            : 'bg-[#FAF7F2] border-b border-[#EAE3D6]/70 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* DESKTOP LEFT NAV (NEW, COLLECTIONS, JEWELLERY, ABOUT) */}
            <nav className="hidden lg:flex items-center space-x-7 flex-1">
              <Link
                href="/new-arrivals"
                className={`text-[12px] uppercase font-medium tracking-editorial transition-colors hover:text-[#C5A880] ${
                  pathname === '/new-arrivals' ? 'text-[#C5A880] font-semibold' : 'text-[#1A1615]'
                }`}
              >
                NEW
              </Link>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/collections"
                  className={`text-[12px] uppercase font-medium tracking-editorial flex items-center space-x-1 transition-colors hover:text-[#C5A880] ${
                    pathname.startsWith('/collections') ? 'text-[#C5A880] font-semibold' : 'text-[#1A1615]'
                  }`}
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown className="w-3 h-3 transition-transform" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === 'collections' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 w-64 bg-[#FAF7F2] border border-[#EAE3D6] shadow-xl p-3 rounded-none mt-2 z-50"
                    >
                      <div className="space-y-1">
                        {collectionsList.map((col) => (
                          <Link
                            key={col.name}
                            href={col.href}
                            className="flex items-center justify-between px-3 py-2 text-xs text-[#2C2724] hover:bg-[#F4EFE6] hover:text-[#1A1615] transition-colors"
                          >
                            <span>{col.name}</span>
                            {col.badge && (
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#C5A880]/15 text-[#997448] font-semibold rounded-xs">
                                {col.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Jewellery Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('jewellery')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="text-[12px] uppercase font-medium tracking-editorial flex items-center space-x-1 transition-colors hover:text-[#C5A880] text-[#1A1615] cursor-pointer"
                >
                  <span>JEWELLERY</span>
                  <ChevronDown className="w-3 h-3 transition-transform" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'jewellery' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 w-72 bg-[#FAF7F2] border border-[#EAE3D6] shadow-xl p-3 rounded-none mt-2 z-50"
                    >
                      <div className="space-y-1">
                        {jewelleryCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="block px-3 py-2 text-xs text-[#2C2724] hover:bg-[#F4EFE6] transition-colors"
                          >
                            <div className="font-medium text-[#1A1615]">{cat.name}</div>
                            <div className="text-[11px] text-[#6B6560]">{cat.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className={`text-[12px] uppercase font-medium tracking-editorial transition-colors hover:text-[#C5A880] ${
                  pathname === '/about' ? 'text-[#C5A880] font-semibold' : 'text-[#1A1615]'
                }`}
              >
                ABOUT
              </Link>
            </nav>

            {/* MOBILE HAMBURGER BUTTON (LEFT) */}
            <div className="flex lg:hidden flex-1 items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-1.5 text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* CENTER: LARGE PROMINENT DIVA LOGO (MAIN BRAND ANCHOR) */}
            <div className="flex items-center justify-center shrink-0 px-4">
              <Link href="/" className="inline-block relative group" aria-label="DIVA Jewellery Homepage">
                <div
                  className={`transition-all duration-300 relative flex items-center justify-center ${
                    isScrolled ? 'h-9 md:h-11' : 'h-11 md:h-14'
                  }`}
                >
                  <Image
                    src="/images/diva-gold-logo.png"
                    alt="DIVA — Modern Indian Fashion Jewellery"
                    width={400}
                    height={136}
                    priority
                    className="h-full w-auto object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </div>

            {/* DESKTOP RIGHT NAV (SEARCH, ACCOUNT, WISHLIST, BAG) */}
            <div className="flex items-center justify-end space-x-6 flex-1">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-1.5 text-[12px] uppercase font-medium tracking-editorial text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer"
                aria-label="Search DIVA"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">SEARCH</span>
              </button>

              {/* Account Link */}
              <Link
                href="/account"
                className="hidden md:flex items-center space-x-1.5 text-[12px] uppercase font-medium tracking-editorial text-[#1A1615] hover:text-[#C5A880] transition-colors"
                aria-label="My Account"
              >
                <User className="w-4 h-4" />
                <span>ACCOUNT</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative flex items-center space-x-1.5 text-[12px] uppercase font-medium tracking-editorial text-[#1A1615] hover:text-[#C5A880] transition-colors"
                aria-label="My Wishlist"
              >
                <div className="relative">
                  <Heart className="w-4 h-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#B85D43] text-[#FAF7F2] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline">WISHLIST</span>
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-1.5 text-[12px] uppercase font-medium tracking-editorial text-[#1A1615] hover:text-[#C5A880] transition-colors cursor-pointer"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#1A1615] text-[#FAF7F2] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline">BAG</span>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#FAF7F2] border-t border-[#EAE3D6] overflow-hidden"
            >
              <div className="px-6 py-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                  <div className="h-8 w-auto relative">
                    <Image
                      src="/images/diva-gold-logo.png"
                      alt="DIVA Jewellery"
                      width={160}
                      height={54}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-[#997448] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-full border border-[#C5A880]/20">
                    JAIPUR ATELIER
                  </span>
                </div>

                <div className="border-b border-[#EAE3D6] pb-4">
                  <Link
                    href="/new-arrivals"
                    className="block text-sm font-semibold tracking-editorial uppercase text-[#1A1615] py-2"
                  >
                    ✨ NEW ARRIVALS
                  </Link>
                  <Link
                    href="/collections"
                    className="block text-sm font-semibold tracking-editorial uppercase text-[#1A1615] py-2"
                  >
                    ALL COLLECTIONS
                  </Link>
                  <Link
                    href="/about"
                    className="block text-sm font-semibold tracking-editorial uppercase text-[#1A1615] py-2"
                  >
                    OUR JAIPUR STORY
                  </Link>
                  <Link
                    href="/account"
                    className="block text-sm font-semibold tracking-editorial uppercase text-[#1A1615] py-2"
                  >
                    MY ACCOUNT
                  </Link>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-widest-editorial text-[#6B6560] mb-2 font-medium">
                    SHOP BY JEWELLERY
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {jewelleryCategories.map((c) => (
                      <Link
                        key={c.name}
                        href={c.href}
                        className="py-1.5 text-[#2C2724] hover:text-[#C5A880] transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EAE3D6] text-xs text-[#6B6560] space-y-1">
                  <p>📍 Raja Park, Jaipur, Rajasthan</p>
                  <p>📞 +91 82390 17449</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
