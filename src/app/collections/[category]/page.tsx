import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { products, getProductsByCategory, categories } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORY_EDITORIAL: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  earrings: {
    title: 'Earrings Collection',
    subtitle: 'CHUNKY HOOPS, PEARL DROPS & HUGGIES',
    description:
      'From viral sculptural gold hoops to delicate baguette huggies. Lightweight, hypoallergenic, and finished with 18K anti-tarnish gold plating for seamless daily wear.'
  },
  pendants: {
    title: 'Pendants & Necklaces',
    subtitle: 'LAYERED CHAINS & NATURAL PEARL CHOKERS',
    description:
      'Tangle-free pre-layered chains, 100% waterproof flat snake chains, and organic freshwater baroque pearl chokers hand-knotted in our Jaipur atelier.'
  },
  bracelets: {
    title: 'Bracelets & Cuffs',
    subtitle: 'SCULPTURAL CUFFS & TENNIS BRACELETS',
    description:
      'Architectural molten cuffs, chunky paperclip chains with toggle clasps, and sparkling cubic zirconia tennis bracelets designed for carefree stacking.'
  },
  rings: {
    title: 'Stackable & Statement Rings',
    subtitle: 'MOLTEN DOMES, SIGNETS & CZ BANDS',
    description:
      'Chunky liquid gold dome rings, vintage embossed signets, and micro-pave eternity trios engineered for comfortable all-day finger styling.'
  },
  jhumkas: {
    title: 'Jaipur Jhumkas',
    subtitle: 'AUTHENTIC MEENAKARI & TEMPLE BELLS',
    description:
      'Hand-painted lotus enamel from Jaipur, uncut Kundan glass, and cascading seed pearls. Heritage craftsmanship made remarkably lightweight and festive.'
  },
  bangles: {
    title: 'Bangles & Kadas',
    subtitle: 'KUNDAN ACCENTS & BEATEN GOLD',
    description:
      'Jaipur Jadau floral kadas with screw-hinge clasps and artisanal hand-hammered beaten gold bangles that celebrate royal desert artistry.'
  },
  sets: {
    title: 'Curated Jewellery Sets',
    subtitle: 'FESTIVE CHOKERS & EVERYDAY DUOS',
    description:
      'Thoughtfully bundled necklace and earring suites. Enjoy effortless styling and save 15–20% compared to purchasing individual pieces.'
  },
  'western-jewellery': {
    title: 'Western Fashion Jewellery',
    subtitle: 'CONTEMPORARY MINIMALISM & STREETWEAR CHIC',
    description:
      'Chunky golden hoops, clean herringbone ribbons, signet rings, and paperclip link chains tailored for shirts, blazers, and modern separates.'
  },
  'traditional-jewellery': {
    title: 'Traditional Indian Jewellery',
    subtitle: 'JAIPUR MEENAKARI, KUNDAN & POLKI',
    description:
      'Celebratory heirlooms for festive pujas, sangeets, and weddings. Handcrafted in Raja Park, Jaipur with authentic 24K foil backings and seed pearls.'
  }
};

export async function generateStaticParams() {
  return [
    { category: 'earrings' },
    { category: 'pendants' },
    { category: 'bracelets' },
    { category: 'rings' },
    { category: 'jhumkas' },
    { category: 'bangles' },
    { category: 'sets' },
    { category: 'western-jewellery' },
    { category: 'traditional-jewellery' }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORY_EDITORIAL[category];
  if (!cat) return { title: 'Collections | DIVA Jaipur Fashion Jewellery' };

  return {
    title: `${cat.title} | DIVA Jaipur Fashion Jewellery`,
    description: cat.description
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const editorial = CATEGORY_EDITORIAL[category];

  if (!editorial) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1615] min-h-screen pb-20">
      {/* Category Hero Header */}
      <section className="bg-[#F4EFE6] border-b border-[#EAE3D6] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-[11px] font-semibold tracking-widest-editorial uppercase text-[#997448]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{editorial.subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615]">
            {editorial.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#6B6560] max-w-xl mx-auto leading-relaxed">
            {editorial.description}
          </p>

          <div className="text-xs text-[#807972] pt-2">
            Showing all {categoryProducts.length} verified pieces • Starting from ₹599
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EAE3D6] text-xs text-[#6B6560]">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-[#1A1615] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <Link href="/collections" className="hover:text-[#1A1615] transition-colors">
            All Collections
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8A199]" />
          <span className="text-[#1A1615] font-semibold capitalize">{editorial.title}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Other Collections Navigation */}
        <div className="mt-20 pt-10 border-t border-[#EAE3D6]">
          <h3 className="text-xs font-semibold tracking-widest-editorial uppercase text-[#6B6560] mb-4 text-center">
            EXPLORE OTHER DIVA EDITS
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories
              .filter((c) => c.slug !== category && c.slug !== 'all')
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className="px-4 py-2 bg-[#F4EFE6] text-xs font-medium text-[#2C2724] hover:bg-[#1A1615] hover:text-[#FAF7F2] transition-colors rounded-xs"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
