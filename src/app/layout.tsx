import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import MiniCart from '@/components/cart/MiniCart';
import SearchModal from '@/components/search/SearchModal';
import QuickViewModal from '@/components/product/QuickViewModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://divajewels.in'),
  title: 'DIVA | Modern Indian Fashion Jewellery — Jaipur',
  description:
    'Shop trendy, wearable, and affordable fashion jewellery handcrafted in Raja Park, Jaipur. Sculptural chunky hoops, authentic Meenakari jhumkas, layered chains, and statement cuffs.',
  keywords: [
    'DIVA Jewellery',
    'Indian Fashion Jewellery',
    'Jaipur Jewellery',
    'Chunky Gold Hoops',
    'Meenakari Jhumkas',
    'Layered Pendants',
    'Anti Tarnish Jewellery',
    'Raja Park Jaipur'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1A1615] font-sans antialiased min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-[#FAF7F2]">
        <ShopProvider>
          {/* Main Global Header with Centered DIVA Logo */}
          <Header />

          {/* Main App Page Content */}
          <main className="flex-1">{children}</main>

          {/* Global Interactive Drawers & Overlays */}
          <MiniCart />
          <SearchModal />
          <QuickViewModal />

          {/* Global Brand Footer */}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
