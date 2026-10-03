import { Product } from '@/types';

export const products: Product[] = [
  // ==========================================
  // EARRINGS (5 Products from ear 1 - ear 5)
  // ==========================================
  {
    id: 'diva-ear-01',
    name: 'Hammered Gold & Mother-of-Pearl Drops',
    slug: 'hammered-disc-pearl-drops',
    tagline: 'Organic molten hammered gold studs suspending iridescent baroque pearl resin stones.',
    price: 799,
    originalPrice: 1199,
    category: 'earrings',
    style: 'statement',
    moods: ['everyday', 'brunch', 'date-night'],
    collection: 'Pinterest Viral Essentials',
    description:
      'Artisanal hammered gold coin studs suspending luminous natural mother-of-pearl marbled resin stones within an open organic molten contour. Featherlight on the earlobes for effortless day-to-night glamour.',
    craftDetails: [
      'Hand-hammered organic beaten texture reflecting multi-directional light',
      'Lustrous baroque mother-of-pearl resin teardrops with unique swirling grain',
      'Hypoallergenic titanium post with secure butterfly friction back',
      '18K heavy gold vacuum micron plating with anti-tarnish protective shield'
    ],
    materials: {
      finish: '18K Heavy Yellow Gold PVD Plating',
      base: 'Hypoallergenic Surgical Brass & Titanium Post',
      stones: 'Artisanal Mother-of-Pearl Marbled Acetate Resin',
      features: ['Anti-Tarnish Nano Coating', 'Nickel & Lead Free', 'Water-Resistant', 'Featherlight (< 7g)']
    },
    dimensions: 'Total Length: 42mm | Disc Width: 18mm | Weight: 6.8g per pair',
    careInstructions: [
      'Store in your DIVA velvet pouch to preserve mirror plating luster.',
      'Apply perfume and cosmetics prior to putting on earrings.',
      'Gently wipe with a soft microfiber cloth after wear.'
    ],
    images: [
      '/images/products/ear-1.jpg',
      '/images/products/ear-1-detail.jpg',
      '/images/products/ear-1-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.92,
    reviewCount: 168,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The quintessential French-girl summer statement earring. Effortlessly elevates linen shirts and slip dresses.',
    relatedSlugs: ['entwined-open-heart-snake-chain', 'molten-gold-fluid-trio', 'chunky-hammered-dome-bangle-stack'],
    completeTheLook: ['entwined-open-heart-snake-chain', 'molten-gold-fluid-trio', 'chunky-hammered-dome-bangle-stack']
  },
  {
    id: 'diva-ear-02',
    name: 'Amber Tortoiseshell Molten Square Drops',
    slug: 'amber-tortoiseshell-square-drops',
    tagline: 'Sculptural square molten gold studs with warm honey-amber tortoiseshell resin pendants.',
    price: 849,
    originalPrice: 1299,
    category: 'earrings',
    style: 'western',
    moods: ['brunch', 'office', 'date-night'],
    collection: 'Warm Amber Archive',
    description:
      'A retro-modern statement featuring pillow-molten gold square tops holding radiant amber tortoiseshell resin drops encased in molten bezels. The rich cognac tones catch the light with warm honey-like translucence.',
    craftDetails: [
      'Melted organic square gold top with high-gloss mirror finish',
      'Hand-cast translucent amber resin with bespoke tortoiseshell swirls',
      'Articulated jump-ring linkage for fluid swinging movement',
      '18K vacuum gold coating tested for daily moisture resistance'
    ],
    materials: {
      finish: '18K Heavy Gold Micron Plating',
      base: 'Eco-Friendly Brass & Surgical Steel Post',
      stones: 'Cognac Amber Swirl Resin',
      features: ['Sweat & Perfume Resistant', 'Hypoallergenic', 'Lightweight Architecture', 'Nickel Free']
    },
    dimensions: 'Total Length: 45mm | Width: 22mm | Weight: 7.2g per pair',
    careInstructions: [
      'Keep away from harsh solvents and alcohol sanitizers.',
      'Polish gently with a dry lint-free cloth.'
    ],
    images: [
      '/images/products/ear-2.jpg',
      '/images/products/ear-2-detail.jpg',
      '/images/products/ear-2-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.88,
    reviewCount: 142,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Warm amber tones that capture golden-hour sunlight like liquid honey.',
    relatedSlugs: ['organic-marble-resin-gold-cuffs', 'carnelian-cabochon-gold-pendant', 'ribbed-pebble-sculptural-stack'],
    completeTheLook: ['organic-marble-resin-gold-cuffs', 'carnelian-cabochon-gold-pendant']
  },
  {
    id: 'diva-ear-03',
    name: 'Tortoise Amber Petal Cuffed Hoops',
    slug: 'amber-petal-cuffed-hoops',
    tagline: 'Curved amber resin chunky hoops cradled in sculpted 18K gold leaf petal clasps.',
    price: 699,
    originalPrice: 1099,
    category: 'earrings',
    style: 'western',
    moods: ['everyday', 'brunch', 'party'],
    collection: 'Retro Chic',
    description:
      'Sculptural C-shaped chunky amber resin hoops embraced by organic gold leaf petal caps. Lightweight, high-gloss, and designed to inject instant vintage European chic into any everyday ensemble.',
    craftDetails: [
      'Molded ergonomic C-curve huggie hoop architecture',
      'Sculpted 18K yellow gold petal leaf end-caps',
      'Translucent cognac tortoiseshell resin body',
      'Easy-click hypoallergenic push-back stud'
    ],
    materials: {
      finish: '18K Yellow Gold Dip',
      base: 'Hypoallergenic Brass Post',
      stones: 'Glossy Amber Acetate Resin',
      features: ['Featherlight (< 5g)', 'Anti-Tarnish Seal', 'Skin Safe']
    },
    dimensions: 'Diameter: 32mm | Tube Thickness: 10mm | Weight: 4.9g per pair',
    careInstructions: [
      'Store flat in a dry pouch.',
      'Wipe clean after daily wear.'
    ],
    images: [
      '/images/products/ear-3.jpg',
      '/images/products/ear-3-detail.jpg',
      '/images/products/ear-3-macro.jpg',
      '/images/products/influencer-earing2.jpg'
    ],
    availability: 'in-stock',
    rating: 4.85,
    reviewCount: 119,
    featured: false,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The go-to everyday hoop that pairs effortlessly with autumn neutrals, beige knits, and clean white tees.',
    relatedSlugs: ['amber-tortoiseshell-square-drops', 'organic-marble-resin-gold-cuffs', 'ribbed-candy-resin-caged-cuffs'],
    completeTheLook: ['organic-marble-resin-gold-cuffs', 'ribbed-candy-resin-caged-cuffs']
  },
  {
    id: 'diva-ear-04',
    name: 'High-Gloss Sculptural Vortex Hoops',
    slug: 'sculptural-gold-vortex-spirals',
    tagline: 'Dramatic high-fashion swirling liquid spiral earrings in mirror-finish 18K yellow gold.',
    price: 899,
    originalPrice: 1499,
    category: 'earrings',
    style: 'statement',
    moods: ['party', 'date-night', 'festive'],
    collection: 'Molten Atelier',
    description:
      'Statement-making oversized vortex swirls crafted with hollow-tube metallurgy for supreme lightness. Cast in a hypnotic fluid coil with mirror gold polish that turns heads at every angle.',
    craftDetails: [
      'Hollow electroformed tubular spiral for maximum size with ultra-light weight',
      'Mirror-buffed 18K gold surface that catches strobe and candlelight',
      'Ergonomic post placement for upright, flattering forward-facing orientation',
      'Anti-tarnish polymer coating'
    ],
    materials: {
      finish: '18K Heavy Gold PVD Plating',
      base: 'Hollow Lightweight Alloy & Titanium Post',
      stones: 'None (Pure High-Shine Polished Gold)',
      features: ['Ultra-Lightweight (< 7g)', 'Anti-Tarnish Nano Coating', 'Nickel Free']
    },
    dimensions: 'Outer Diameter: 52mm | Spiral Thickness: 8mm | Weight: 6.9g per pair',
    careInstructions: [
      'Avoid bending or pressing under heavy objects.',
      'Store in original padded box.'
    ],
    images: [
      '/images/products/ear-4.jpg',
      '/images/products/ear-4-detail.jpg',
      '/images/products/ear-4-macro.jpg',
      '/images/products/influencer-earing.jpg'
    ],
    availability: 'in-stock',
    rating: 4.96,
    reviewCount: 210,
    featured: true,
    newArrival: true,
    trending: true,
    bestSeller: true,
    editorialQuote: 'Pure runway drama. Bold, swirling, and surprisingly weightless all night long.',
    relatedSlugs: ['chunky-hammered-dome-bangle-stack', 'viral-chunky-dome-coil-rings', 'botanical-signet-statement-edit'],
    completeTheLook: ['chunky-hammered-dome-bangle-stack', 'viral-chunky-dome-coil-rings']
  },
  {
    id: 'diva-ear-05',
    name: 'Cherry Burgundy Enamel Huggie Hoops',
    slug: 'burgundy-enamel-gold-huggies',
    tagline: 'Deep black-cherry vitreous enamel hugging rich 18K gold rims in a chunky silhouette.',
    price: 599,
    originalPrice: 999,
    category: 'earrings',
    style: 'minimal',
    moods: ['everyday', 'office', 'brunch'],
    collection: 'French Girl Minimal',
    description:
      'Lustrous deep cherry red enamel paired with polished gold lining. These chunky huggies click securely shut, offering a pop of Parisian moodiness to complement clean white shirts and knitwear.',
    craftDetails: [
      'Hand-painted vitreous enamel in deep Bordeaux black-cherry',
      'Click-lock hinge mechanism engineered for 10,000+ snaps',
      'Rounded interior profile for zero pinch comfort',
      'Waterproof gold plating'
    ],
    materials: {
      finish: '18K Yellow Gold Plating',
      base: 'Surgical Brass Base',
      stones: 'High-Gloss Cherry Enamel',
      features: ['Water-Resistant', 'Hypoallergenic', 'Click-Secure Closure']
    },
    dimensions: 'Outer Diameter: 18mm | Width: 6mm | Weight: 3.8g per pair',
    careInstructions: ['Wipe clean with a soft dry cloth.'],
    images: [
      '/images/products/ear-5.jpg',
      '/images/products/ear-5-detail.jpg',
      '/images/products/ear-5-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.91,
    reviewCount: 135,
    featured: false,
    newArrival: false,
    trending: false,
    bestSeller: true,
    editorialQuote: 'The understated pop of cherry red every minimalist jewelry collection needs.',
    relatedSlugs: ['entwined-open-heart-snake-chain', 'carnelian-cabochon-gold-pendant', 'molten-gold-fluid-trio'],
    completeTheLook: ['entwined-open-heart-snake-chain', 'carnelian-cabochon-gold-pendant']
  },

  // ==========================================
  // RINGS (4 Products from ring 1 - ring 4)
  // ==========================================
  {
    id: 'diva-rng-01',
    name: 'Molten Fluid 3-Piece Ring Stack',
    slug: 'molten-gold-fluid-trio',
    tagline: 'Viral Pinterest molten dome croissant ring, split teardrop ring, and wrap petal band.',
    price: 899,
    originalPrice: 1399,
    category: 'rings',
    style: 'statement',
    moods: ['everyday', 'brunch', 'office'],
    collection: 'Pinterest Viral Essentials',
    description:
      'Three harmoniously designed sculptural rings: a plump molten dome ring, an open bypass tear ring, and a contoured curved leaf band. Wear them together across multiple fingers or stacked on one hand.',
    craftDetails: [
      'Ergonomically contoured smooth interior comfort fit',
      'Poured molten organic curves with radiant hand polish',
      'Open-back adjustable shanks fitting US sizes 6 to 9',
      'Anti-tarnish 18K gold coating safe for sanitizers'
    ],
    materials: {
      finish: '18K Yellow Gold Micron Plating',
      base: 'Hypoallergenic Eco-Brass',
      stones: 'None (Solid Sculptural Metal)',
      features: ['Adjustable Sizing', 'Anti-Tarnish Coating', 'Smooth Comfort Fit']
    },
    dimensions: 'Dome Ring Width: 14mm | Bypass Ring Width: 8mm | Band: 4mm | Set Weight: 14g',
    careInstructions: [
      'Gently adjust sizing by squeezing sides evenly.',
      'Remove before swimming in chlorine.'
    ],
    images: [
      '/images/products/ring-1.jpg',
      '/images/products/ring-1-detail.jpg',
      '/images/products/ring-1-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.94,
    reviewCount: 198,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The #1 stackable ring set that gives an immediate high-fashion manicure upgrade.',
    relatedSlugs: ['hammered-disc-pearl-drops', 'entwined-open-heart-snake-chain', 'chunky-hammered-dome-bangle-stack'],
    completeTheLook: ['hammered-disc-pearl-drops', 'chunky-hammered-dome-bangle-stack']
  },
  {
    id: 'diva-rng-02',
    name: 'Triple Ridge & Molten Pebble Trio',
    slug: 'ribbed-pebble-sculptural-stack',
    tagline: 'Multi-ridge sculptural ring paired with an organic molten pebble and droplet bar band.',
    price: 949,
    originalPrice: 1499,
    category: 'rings',
    style: 'statement',
    moods: ['party', 'date-night', 'everyday'],
    collection: 'Architectural Gold',
    description:
      'An avant-garde finger styling set consisting of a stacked triple-tiered ridge ring, an asymmetrical molten gold pebble signet, and a sleek vertical nugget bar ring. Crafted with smooth rounded inner comfort contours.',
    craftDetails: [
      'Triple ribbed architectural band with high-shine fluted grooves',
      'Asymmetric melted gold pebble center piece with liquid reflections',
      'Slim vertical nugget stacking ring for pinky or mid-finger placement',
      'Heavy 18K gold plating'
    ],
    materials: {
      finish: '18K Yellow Gold Heavy Plating',
      base: 'Nickel-Free Eco Brass',
      stones: 'None (Sculptural High Polish)',
      features: ['Tarnish Resistant', 'Comfort Contoured', 'Hypoallergenic']
    },
    dimensions: 'Ridge Width: 12mm | Pebble: 16mm | Set Weight: 15.5g',
    careInstructions: ['Clean with mild soap water and wipe dry.'],
    images: [
      '/images/products/ring-2.jpg',
      '/images/products/ring-2-detail.jpg',
      '/images/products/ring-2-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.89,
    reviewCount: 127,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Bold, tactile, and sculptural. Commands attention with every hand gesture.',
    relatedSlugs: ['amber-tortoiseshell-square-drops', 'sculptural-gold-vortex-spirals', 'liquid-wave-fluid-bangles'],
    completeTheLook: ['amber-tortoiseshell-square-drops', 'liquid-wave-fluid-bangles']
  },
  {
    id: 'diva-rng-03',
    name: 'Viral Half-Sphere Dome & 5-Band Coil Stack',
    slug: 'viral-chunky-dome-coil-rings',
    tagline: 'Audacious spherical button dome, spiral wire coil, and melted oval signet ring.',
    price: 999,
    originalPrice: 1599,
    category: 'rings',
    style: 'statement',
    moods: ['brunch', 'party', 'everyday'],
    collection: 'Pinterest Viral Essentials',
    description:
      'The heavyweight Instagram favorite: an oversized mirror-shine hemisphere ring, an expansive 5-layer coil wrap ring, and an organic liquid oval cocktail ring. Each piece is adjustable to fit standard sizes 6 through 9.',
    craftDetails: [
      'Bold 3D hollow half-sphere dome reflecting everything like a fisheye mirror',
      'Structured 5-row wrap coil giving the illusion of multiple stacked rings',
      'Smooth melted signet disc with curved perimeter',
      'Triple-layered gold micron plating'
    ],
    materials: {
      finish: '18K Gold Micron Plating',
      base: 'Hypoallergenic Brass',
      stones: 'None (Pure Gloss Metal)',
      features: ['Adjustable Fit', 'Mirror Shine Finish', 'Anti-Tarnish Coating']
    },
    dimensions: 'Sphere Dome: 16mm | Coil Height: 15mm | Oval Signet: 20x15mm | Set Weight: 17g',
    careInstructions: ['Store in cloth bag to prevent surface scratches.'],
    images: [
      '/images/products/ring-3.jpg',
      '/images/products/ring-3-detail.jpg',
      '/images/products/ring-3-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.95,
    reviewCount: 224,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The statement stack seen on every European style creator moodboard this season.',
    relatedSlugs: ['sculptural-gold-vortex-spirals', 'chunky-hammered-dome-bangle-stack', 'entwined-open-heart-snake-chain'],
    completeTheLook: ['sculptural-gold-vortex-spirals', 'chunky-hammered-dome-bangle-stack']
  },
  {
    id: 'diva-rng-04',
    name: 'Botanical Blossom & Puffed Heart 5-Ring Edit',
    slug: 'botanical-signet-statement-edit',
    tagline: 'Sculpted 5-petal blossom, molten heart, bark signet, egg dome & organic fluid square.',
    price: 1299,
    originalPrice: 1899,
    category: 'rings',
    style: 'western',
    moods: ['party', 'festive', 'date-night'],
    collection: 'Romantic Botanica',
    description:
      'A five-piece master set featuring a delicately veined 5-petal flower ring, a three-dimensional molten gold puffed heart ring, a tree-bark textured rectangular signet, a glossy egg dome, and an organic sunken molten square.',
    craftDetails: [
      'Five distinct artisanal motifs designed for cohesive two-handed styling',
      'Intricate petal veining on botanical blossom ring',
      'Puffed 3D volumetric heart with comfortable hollow back',
      'Tree-bark vertical textured relief on rectangle cocktail ring'
    ],
    materials: {
      finish: '18K Heavy Gold PVD Plating',
      base: 'Hypoallergenic Eco Alloy',
      stones: 'None (Sculptural Relief Motifs)',
      features: ['Complete 5-Ring Set', 'Adjustable Fit', 'Lead & Nickel Free']
    },
    dimensions: 'Flower: 24mm | Heart: 18mm | Rectangle: 22x16mm | Total Set: 26g',
    careInstructions: ['Keep pieces separated in pouch compartments.'],
    images: [
      '/images/products/ring-4.jpg',
      '/images/products/ring-4-detail.jpg',
      '/images/products/ring-4-macro.jpg',
      '/images/products/influncer-ring.jpg'
    ],
    availability: 'in-stock',
    rating: 4.93,
    reviewCount: 176,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'An entire curated jewellery box in one set. Wear individually or mix across both hands for editorial maximalism.',
    relatedSlugs: ['entwined-open-heart-snake-chain', 'amber-petal-cuffed-hoops', 'liquid-wave-fluid-bangles'],
    completeTheLook: ['entwined-open-heart-snake-chain', 'amber-petal-cuffed-hoops']
  },

  // ==========================================
  // BANGLES (4 Products from bangles 1 - bangles 4)
  // ==========================================
  {
    id: 'diva-ban-01',
    name: 'Artisan 4-Piece Chunky Molten Bangle Stack',
    slug: 'chunky-hammered-dome-bangle-stack',
    tagline: 'Hand-hammered beaten cuff, liquid mirror tube, radial fluted kada, and croissant gadroon.',
    price: 1399,
    originalPrice: 2199,
    category: 'bangles',
    style: 'statement',
    moods: ['party', 'festive', 'everyday'],
    collection: 'Pinterest Viral Essentials',
    description:
      'Four complementary chunky silhouettes engineered for the ultimate wrist stack: a hand-hammered beaten dome cuff, an ultra-smooth liquid gold tubular bangle, a radial ribbed fluted kada, and a French croissant twisted bangle.',
    craftDetails: [
      'Hand-hammered dimpled surface capturing light at countless facet angles',
      'Heavy-gauge hollow electroformed tubing for comfortable all-day wear',
      'Smooth hinged spring-clasp closures on select bangles for effortless slip-on',
      'Triple PVD 18K gold coating tested for over 2 years of daily wear'
    ],
    materials: {
      finish: '18K Heavy Gold PVD Plating',
      base: 'Jewellery-Grade Surgical Brass Alloy',
      stones: 'None (Pure High-Shine Polished Metal)',
      features: ['Anti-Tarnish Nano Coating', 'Water-Resistant', 'Nickel & Lead Free', 'Complete 4-Piece Suite']
    },
    dimensions: 'Inner Diameter: 62mm (Standard Medium) | Stack Width: 48mm combined | Weight: 78g total',
    careInstructions: [
      'Store in the provided signature DIVA pouch.',
      'Wipe clean after daily wear.'
    ],
    images: [
      '/images/products/bangles-1.jpg',
      '/images/products/bangles-1-detail.jpg',
      '/images/products/bangles-1-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.97,
    reviewCount: 248,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The golden arm party that makes a whisper of sound and commands an entire room.',
    relatedSlugs: ['molten-gold-fluid-trio', 'hammered-disc-pearl-drops', 'entwined-open-heart-snake-chain'],
    completeTheLook: ['molten-gold-fluid-trio', 'hammered-disc-pearl-drops']
  },
  {
    id: 'diva-ban-02',
    name: 'Organic Cream Marble & Amber Resin Bangle Trio',
    slug: 'organic-marble-resin-gold-cuffs',
    tagline: 'Chunky cream marble swirl, liquid molten gold, and cognac tortoiseshell resin cuffs.',
    price: 1199,
    originalPrice: 1799,
    category: 'bangles',
    style: 'western',
    moods: ['brunch', 'everyday', 'office'],
    collection: 'Natural Elements',
    description:
      'A tactile fusion of materials: a rounded ivory marbled acetate bangle, a mirror-finish molten gold doughnut cuff, and a translucent deep tortoiseshell resin bangle. Smooth and silky against the skin.',
    craftDetails: [
      'Artisanal hand-swirled acetate resin with natural marble veining',
      'Solid heavyweight feel with rounded silky-soft wrist contours',
      'Central 18K yellow gold plated doughnut cuff for metallic contrast',
      'Non-snag seamless construction'
    ],
    materials: {
      finish: '18K Gold Tone & High-Gloss Resin',
      base: 'Eco Acetate Resin & Brass Core',
      stones: 'None (Marbled Acetate & Amber Resin)',
      features: ['Hypoallergenic', 'Lightweight Feel', 'Zero Color Fade']
    },
    dimensions: 'Inner Diameter: 65mm | Individual Width: 18mm | Set Weight: 62g',
    careInstructions: ['Avoid direct exposure to acetones and harsh chemicals.'],
    images: [
      '/images/products/bangles-2.jpg',
      '/images/products/bangles-2-detail.jpg',
      '/images/products/bangles-2-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.89,
    reviewCount: 153,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Earthy luxury meets warm gold minimalism. Stacks effortlessly over sweater cuffs and blazers.',
    relatedSlugs: ['amber-tortoiseshell-square-drops', 'carnelian-cabochon-gold-pendant', 'ribbed-pebble-sculptural-stack'],
    completeTheLook: ['amber-tortoiseshell-square-drops', 'carnelian-cabochon-gold-pendant']
  },
  {
    id: 'diva-ban-03',
    name: 'Candy Glass Resin & Gold Caged Rib Bangle',
    slug: 'ribbed-candy-resin-caged-cuffs',
    tagline: 'Puffed translucent candy-resin cuff encased in structured 18K yellow gold ribs.',
    price: 999,
    originalPrice: 1499,
    category: 'bangles',
    style: 'western',
    moods: ['brunch', 'party', 'everyday'],
    collection: 'Pastel Atelier',
    description:
      'Reminiscent of 1960s Italian Riviera jewelry. Glossy translucent colored resin segments cradled within arched gold ribbing. Available in honey amber, rose quartz, mint jade, and creamy alabaster.',
    craftDetails: [
      'Precision arched gold cage setting with rounded outer ribs',
      'Glow-from-within translucent gemstone candy resin',
      'Hidden pressure-release hinge clasp for easy wearing',
      'Electroplated 18K gold frame'
    ],
    materials: {
      finish: '18K Yellow Gold Dip',
      base: 'Jewellery Alloy & Translucent Lucite Resin',
      stones: 'Cast Candy Lucite',
      features: ['Secure Hinge Closure', 'Tarnish-Resistant Gold', 'Skin Safe']
    },
    dimensions: 'Inner Diameter: 60mm | Width: 24mm | Weight: 38g each',
    careInstructions: ['Clean gently with a soft micro-cloth.'],
    images: [
      '/images/products/bangles-3.jpg',
      '/images/products/bangles-3-detail.jpg',
      '/images/products/bangles-3-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.87,
    reviewCount: 131,
    featured: false,
    newArrival: false,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Vibrant, playful, and undeniably chic. Brings an instant burst of summer dopamine.',
    relatedSlugs: ['amber-petal-cuffed-hoops', 'organic-marble-resin-gold-cuffs', 'botanical-signet-statement-edit'],
    completeTheLook: ['amber-petal-cuffed-hoops', 'botanical-signet-statement-edit']
  },
  {
    id: 'diva-ban-04',
    name: 'Sculptural Liquid Wave 4-Bangle Set',
    slug: 'liquid-wave-fluid-bangles',
    tagline: 'Fluid organic undulating waves in molten gold, ocean cobalt, cerulean, and pearlescent cream.',
    price: 1299,
    originalPrice: 1899,
    category: 'bangles',
    style: 'statement',
    moods: ['brunch', 'party', 'everyday'],
    collection: 'Oceanic Curve',
    description:
      'Undulating wave contours that mimic the gentle surge of ocean ripples. Featuring an 18K gold molten wave bangle paired with three translucent resin wave bangles in cobalt, sky, and seafoam ivory.',
    craftDetails: [
      'Fluid sinusoidal curve architecture designed to nest together smoothly',
      'Mirror-polished 18K gold molten wave centerpiece',
      'Glossy colored resin bangles in striking nautical and sea-glass hues',
      'Effortless slip-on profile'
    ],
    materials: {
      finish: '18K Gold Plated Alloy & Resin',
      base: 'Brass Alloy & Organic Acetate',
      stones: 'None (Gloss Resin & Gold Wave)',
      features: ['Stackable Harmony', 'Water-Resistant Plating', 'Smooth Rounded Edges']
    },
    dimensions: 'Inner Diameter: 64mm | Stack Height: 36mm | Total Weight: 52g',
    careInstructions: ['Store flat in individual pouches.'],
    images: [
      '/images/products/bangles-4.jpg',
      '/images/products/bangles-4-detail.jpg',
      '/images/products/bangles-4-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.91,
    reviewCount: 160,
    featured: true,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Mesmerizing liquid waves that turn your wrist into a dynamic work of art.',
    relatedSlugs: ['geometric-sapphire-cylinder-necklace', 'ribbed-pebble-sculptural-stack', 'sculptural-gold-vortex-spirals'],
    completeTheLook: ['geometric-sapphire-cylinder-necklace', 'ribbed-pebble-sculptural-stack']
  },

  // ==========================================
  // PENDANTS (4 Products from pendent 1 - pendent 4)
  // ==========================================
  {
    id: 'diva-pen-01',
    name: 'Entwined Open Heart Snake Chain Necklace',
    slug: 'entwined-open-heart-snake-chain',
    tagline: 'Organic fluid loop heart suspended seamlessly through a silky 18K gold snake chain.',
    price: 749,
    originalPrice: 1199,
    category: 'pendants',
    style: 'minimal',
    moods: ['everyday', 'date-night', 'brunch'],
    collection: 'Pinterest Viral Essentials',
    description:
      'Sleek, fluid, and endlessly romantic. An asymmetrical molten ribbon loops into an open heart silhouette, gliding smoothly along a silky, skin-safe 18K gold snake chain. Lies flat against the collarbone.',
    craftDetails: [
      'Tubular molten wire bent into an organic, asymmetrical continuous heart loop',
      'Silky 1.5mm flat-lying snake chain that never pinches or pulls fine hairs',
      'Secure lobster claw clasp with 5cm extension links for custom layering length',
      'Nano-ceramic anti-tarnish coating 100% waterproof for gym and shower wear'
    ],
    materials: {
      finish: '18K Heavy Gold PVD Plating',
      base: 'Hypoallergenic Stainless Steel Core',
      stones: 'None (Sculptural Liquid Gold Wire)',
      features: ['100% Waterproof', 'Zero Green Skin', 'Anti-Tarnish Seal', 'Featherlight (< 8g)']
    },
    dimensions: 'Chain Length: 40cm + 5cm extender | Heart Charm: 22x20mm | Weight: 7.4g',
    careInstructions: [
      'Wipe with dry cotton cloth to restore instant shine.',
      'Safe for daily water and sweat contact.'
    ],
    images: [
      '/images/products/pendent-1.jpg',
      '/images/products/pendent-1-detail.jpg',
      '/images/products/pendent-1-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.96,
    reviewCount: 265,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'The minimalist heart necklace everyone is saving on Pinterest. Subtle, sweet, and exquisitely made.',
    relatedSlugs: ['hammered-disc-pearl-drops', 'molten-gold-fluid-trio', 'chunky-hammered-dome-bangle-stack'],
    completeTheLook: ['hammered-disc-pearl-drops', 'molten-gold-fluid-trio']
  },
  {
    id: 'diva-pen-02',
    name: 'Vintage Red Carnelian Cabochon Pendant',
    slug: 'carnelian-cabochon-gold-pendant',
    tagline: 'Polished deep red carnelian agate stone in an 18K gold bezel on a liquid snake chain.',
    price: 799,
    originalPrice: 1249,
    category: 'pendants',
    style: 'western',
    moods: ['everyday', 'office', 'date-night'],
    collection: 'Gemstone Archive',
    description:
      'Warm fiery-red natural carnelian gemstone cut into a smooth oval cabochon and secured within a clean minimal gold bezel. Hanging from a gleaming snake chain with anti-tarnish protective lacquer.',
    craftDetails: [
      'Hand-polished oval carnelian cabochon with rich natural terracotta undertones',
      'Flush-set protective gold bezel rim',
      'Fluid rounded snake chain with seamless articulation',
      'Anti-tarnish PVD gold finish'
    ],
    materials: {
      finish: '18K Heavy Gold Micron Plating',
      base: 'Hypoallergenic Surgical Brass',
      stones: 'Natural Red Carnelian Agate Cabochon',
      features: ['Anti-Tarnish Coating', 'Natural Gemstone', 'Skin-Safe Hypoallergenic']
    },
    dimensions: 'Chain Length: 42cm + 5cm extender | Pendant: 20x14mm | Weight: 9.2g',
    careInstructions: ['Avoid dropping on hard surfaces to protect the natural stone.'],
    images: [
      '/images/products/pendent-2.jpg',
      '/images/products/pendent-2-detail.jpg',
      '/images/products/pendent-2-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.90,
    reviewCount: 148,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'A captivating burst of gemstone color. Earthy, sensual, and timeless.',
    relatedSlugs: ['amber-tortoiseshell-square-drops', 'burgundy-enamel-gold-huggies', 'organic-marble-resin-gold-cuffs'],
    completeTheLook: ['amber-tortoiseshell-square-drops', 'organic-marble-resin-gold-cuffs']
  },
  {
    id: 'diva-pen-03',
    name: 'Luminous Moonstone Molten Bezel Pendant',
    slug: 'luminous-moonstone-molten-pendant',
    tagline: 'Milky iridescent moonstone cabochon framed in an organic melted gold bezel contour.',
    price: 849,
    originalPrice: 1299,
    category: 'pendants',
    style: 'minimal',
    moods: ['date-night', 'everyday', 'brunch'],
    collection: 'Moonlit Serenade',
    description:
      'Capturing an ethereal glow against the skin. An oval opalescent moonstone cabochon cradled by molten, organic gold contours. Suspended from an ultra-delicate gold glide chain.',
    craftDetails: [
      'Opalescent milky moonstone displaying soft blue adularescence under lighting',
      'Organic melted gold perimeter contour crafted with lost-wax casting technique',
      'Featherlight chain resting gracefully at the collarbone hollow',
      'Waterproof gold plating'
    ],
    materials: {
      finish: '18K Yellow Gold PVD Plating',
      base: 'Eco-Friendly Brass & Stainless Steel Chain',
      stones: 'Luminous Opaline Moonstone Cabochon',
      features: ['Water-Resistant', 'Hypoallergenic', 'Featherlight (< 6g)']
    },
    dimensions: 'Chain: 40cm + 5cm extender | Pendant: 18x13mm | Weight: 5.8g',
    careInstructions: ['Store in pouch away from sunlight when not in use.'],
    images: [
      '/images/products/pendent-3.jpg',
      '/images/products/pendent-3-detail.jpg',
      '/images/products/pendent-3-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.94,
    reviewCount: 183,
    featured: false,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'Pure moonlight captured in molten gold. An intimate, dreamy everyday accent.',
    relatedSlugs: ['hammered-disc-pearl-drops', 'molten-gold-fluid-trio', 'luminous-cat-eye-pendant-suite'],
    completeTheLook: ['hammered-disc-pearl-drops', 'molten-gold-fluid-trio']
  },
  {
    id: 'diva-pen-04',
    name: 'Geometric Midnight Sapphire Cylinder Necklace',
    slug: 'geometric-sapphire-cylinder-necklace',
    tagline: 'Deep sapphire crystal square pendant framed with architectural gold tube beads.',
    price: 899,
    originalPrice: 1399,
    category: 'pendants',
    style: 'statement',
    moods: ['office', 'party', 'date-night'],
    collection: 'Modern Geometry',
    description:
      'A chic modern collarpiece with segmented rectangular gold cylinder beads leading to a beveled square midnight-blue crystal pendant. An elevated focal point for scoop-neck tops and blazer lapels.',
    craftDetails: [
      'Faceted square deep midnight-sapphire crystal capturing jewel-like depth',
      'Segmented articulated gold tube beads creating a graduated collar silhouette',
      'Sturdy cable core with secure safety lobster clasp',
      'Heavy gold plating resistant to perfume and lotions'
    ],
    materials: {
      finish: '18K Yellow Gold Heavy Plating',
      base: 'Surgical Brass',
      stones: 'Faceted Midnight Sapphire K9 Crystal',
      features: ['Sweat Resistant', 'Nickel Free', 'Architectural Styling']
    },
    dimensions: 'Collar Length: 42cm + 5cm extender | Square Gem: 15x15mm | Weight: 12g',
    careInstructions: ['Wipe clean with a soft dry cloth.'],
    images: [
      '/images/products/pendent-4.jpg',
      '/images/products/pendent-4-detail.jpg',
      '/images/products/pendent-4-macro.jpg',
      '/images/products/influncer-pendent.jpg'
    ],
    availability: 'in-stock',
    rating: 4.88,
    reviewCount: 112,
    featured: false,
    newArrival: true,
    trending: false,
    bestSeller: false,
    editorialQuote: 'Architectural, commanding, and impeccably sharp. Tailored perfection for power dressing.',
    relatedSlugs: ['liquid-wave-fluid-bangles', 'sculptural-gold-vortex-spirals', 'ribbed-pebble-sculptural-stack'],
    completeTheLook: ['liquid-wave-fluid-bangles', 'sculptural-gold-vortex-spirals']
  },

  // ==========================================
  // SETS (5 Products from set 1 - set 5)
  // ==========================================
  {
    id: 'diva-set-01',
    name: 'Cat-Eye Moonstone Pendant & Earring Suite',
    slug: 'luminous-cat-eye-pendant-suite',
    tagline: 'Luminous circular cat-eye cabochon necklace with pavé crystal bail & matching drop studs.',
    price: 1499,
    originalPrice: 2299,
    category: 'sets',
    style: 'statement',
    moods: ['party', 'date-night', 'wedding-guest'],
    collection: 'Jaipur Royal Atelier',
    description:
      'A showstopping coordinated suite featuring a round opalescent cat-eye cabochon anchored by a micro-pavé crystal cylinder bail on a rounded snake chain, complete with matching push-back drop earrings.',
    craftDetails: [
      'Grade-A opalescent cat-eye cabochons with dynamic light-reflecting chatoyancy',
      'Pave-set Austrian crystal crystal accent collars on necklace and earrings',
      'Rounded liquid snake chain with high tensile strength',
      'Complete coordinated 3-piece jewellery suite'
    ],
    materials: {
      finish: '18K Yellow Gold Heavy Plating',
      base: 'Skin-Safe Surgical Brass',
      stones: 'Luminous Cat-Eye Cabochons & Pavé Micro Crystals',
      features: ['Complete Suite (Necklace + Earrings)', 'Anti-Tarnish', 'Hypoallergenic']
    },
    dimensions: 'Necklace: 42cm + 5cm | Center Disc: 28mm | Earring Disc: 16mm | Set: 32g',
    careInstructions: ['Store in padded jewelry box compartments.'],
    images: [
      '/images/products/set-1.jpg',
      '/images/products/set-1-detail.jpg',
      '/images/products/set-1-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.98,
    reviewCount: 189,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'A mesmerizing lunar radiance. Designed for cocktail parties, festive dinners, and memorable nights.',
    relatedSlugs: ['luminous-moonstone-molten-pendant', 'chunky-hammered-dome-bangle-stack', 'molten-gold-fluid-trio'],
    completeTheLook: ['chunky-hammered-dome-bangle-stack', 'molten-gold-fluid-trio']
  },
  {
    id: 'diva-set-02',
    name: 'Emerald Malachite Concentric Gold Trio Set',
    slug: 'emerald-malachite-concentric-set',
    tagline: 'Concentric fluted gold pendant, matching studs & open torc bangle with twin emerald orbs.',
    price: 1799,
    originalPrice: 2699,
    category: 'sets',
    style: 'western',
    moods: ['festive', 'party', 'wedding-guest'],
    collection: 'Regal Heritage',
    description:
      'Vibrant forest-green malachite cabochons resting in textured square concentric gold bezels. Includes a delicate chain pendant, statement stud earrings, and a hinged open-cuff bangle tipped with polished emerald globes.',
    craftDetails: [
      'Concentric rippled gold frames with matte satin and mirror-shine contrasts',
      'Rich emerald green cabochons with deep verdant polish',
      'Hinged gold torc bangle with twin glossy spherical finials',
      'Complete 4-piece coordinated suite (Necklace, 2 Earrings, 1 Bangle)'
    ],
    materials: {
      finish: '18K Heavy Gold PVD Plating',
      base: 'High-Purity Brass Alloy',
      stones: 'Rich Emerald Green Resin Cabochons',
      features: ['Full 3-Category Suite', 'Anti-Tarnish Nano Seal', 'Lead & Nickel Free']
    },
    dimensions: 'Necklace: 45cm | Pendant: 24x24mm | Bangle: 62mm inside | Set: 46g',
    careInstructions: ['Wipe clean with soft microfiber cloth.'],
    images: [
      '/images/products/set-2.jpg',
      '/images/products/set-2-detail.jpg',
      '/images/products/set-2-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.95,
    reviewCount: 204,
    featured: true,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'Royal Jaipur green paired with modern architectural gold. A masterclass in luxury styling.',
    relatedSlugs: ['botanical-signet-statement-edit', 'sculptural-gold-vortex-spirals', 'chunky-hammered-dome-bangle-stack'],
    completeTheLook: ['botanical-signet-statement-edit', 'sculptural-gold-vortex-spirals']
  },
  {
    id: 'diva-set-03',
    name: 'Sculptural Cradled Pearl Atelier 3-Piece Suite',
    slug: 'sculptural-cradled-pearl-atelier-set',
    tagline: 'Molten open-drop pendant, matching ear jackets & bypass bangle cradling lustrous pearls.',
    price: 1699,
    originalPrice: 2599,
    category: 'sets',
    style: 'pearl',
    moods: ['date-night', 'wedding-guest', 'festive'],
    collection: 'Atelier Pearl',
    description:
      'Fluid golden stirrups that delicately clasp iridescent button pearls in mid-air. Comprises a substantial box-chain pendant necklace, matching sculptural drop earrings, and a contoured hinge cuff bangle.',
    craftDetails: [
      'Sculptural open-frame teardrop bezels with floating pearl suspension',
      'High-luster button freshwater pearls with rich rosy iridescence',
      'Sturdy rounded Venetian box-link chain necklace',
      'Contoured spring-hinge cuff bangle'
    ],
    materials: {
      finish: '18K Yellow Gold Heavy Plating',
      base: 'Hypoallergenic Surgical Brass',
      stones: 'Natural Button Freshwater Pearls',
      features: ['3-Piece Suite (Necklace + Earrings + Cuff)', 'Anti-Tarnish', 'Skin-Safe']
    },
    dimensions: 'Necklace: 45cm | Pendant: 32mm | Bangle: 60mm | Set: 42g',
    careInstructions: ['Wipe pearls with soft dry cloth after wear.'],
    images: [
      '/images/products/set-3.jpg',
      '/images/products/set-3-detail.jpg',
      '/images/products/set-3-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.96,
    reviewCount: 172,
    featured: false,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'Sculptural modernism cradling timeless pearls. Effortless elegance for grand occasions.',
    relatedSlugs: ['hammered-disc-pearl-drops', 'entwined-open-heart-snake-chain', 'molten-gold-fluid-trio'],
    completeTheLook: ['molten-gold-fluid-trio', 'hammered-disc-pearl-drops']
  },
  {
    id: 'diva-set-04',
    name: 'Mediterranean Turquoise Teardrop Suite',
    slug: 'mediterranean-turquoise-triad',
    tagline: 'Dramatic turquoise teardrop pendant on box chain, textured studs & turquoise enamel bangle.',
    price: 1599,
    originalPrice: 2399,
    category: 'sets',
    style: 'western',
    moods: ['brunch', 'festive', 'party'],
    collection: 'Coastal Riviera',
    description:
      'Natural veined turquoise stone in an elongated teardrop bezel hanging from an antique-gold box chain, accompanied by textured cushion studs and a sleek turquoise enamel-inlaid gold hinge bangle.',
    craftDetails: [
      'Elongated waterdrop cabochon displaying organic natural turquoise veining',
      'Heavy box chain with vintage-inspired warm gold patina',
      'Hinged gold bangle featuring a seamless turquoise enamel inlay ring',
      'Textured cushion-cut stud earrings'
    ],
    materials: {
      finish: '18K Yellow Gold Plating',
      base: 'Hypoallergenic Brass Core',
      stones: 'Natural Turquoise Stone & High-Gloss Enamel',
      features: ['Full 3-Piece Suite', 'Anti-Tarnish Coating', 'Nickel Free']
    },
    dimensions: 'Chain: 48cm | Teardrop: 36x22mm | Bangle: 63mm | Set: 48g',
    careInstructions: ['Keep away from harsh swimming pool chlorine.'],
    images: [
      '/images/products/set-4.jpg',
      '/images/products/set-4-detail.jpg',
      '/images/products/set-4-macro.jpg',
      '/images/products/influencer-set.jpg'
    ],
    availability: 'in-stock',
    rating: 4.92,
    reviewCount: 155,
    featured: false,
    newArrival: true,
    trending: true,
    bestSeller: false,
    editorialQuote: 'The refreshing brilliance of azure waters set against glowing warm gold.',
    relatedSlugs: ['liquid-wave-fluid-bangles', 'amber-petal-cuffed-hoops', 'botanical-signet-statement-edit'],
    completeTheLook: ['liquid-wave-fluid-bangles', 'botanical-signet-statement-edit']
  },
  {
    id: 'diva-set-05',
    name: 'Warm Apricot Carnelian Statement Suite',
    slug: 'apricot-carnelian-statement-suite',
    tagline: 'Kite-cut carnelian pendant on rolo chain, dome cocktail ring & tangerine enamel bangle stack.',
    price: 1899,
    originalPrice: 2899,
    category: 'sets',
    style: 'statement',
    moods: ['party', 'wedding-guest', 'festive'],
    collection: 'Sunset Jaipur',
    description:
      'Rich terracotta apricot tones evoking Jaipur sunsets. A rhombus kite pendant on a rounded chunky link necklace, an oversized dome cocktail ring, and a dual tangerine enamel and molten gold bangle stack.',
    craftDetails: [
      'Rhombus kite-cut carnelian stone framed in sculptural molten gold bezels',
      'Chunky rounded link collar chain with secure clasp',
      'Statement dome cocktail ring with bezel-set carnelian center orb',
      'Dual bangle stack: glossy tangerine enamel cuff & molten gold cuff'
    ],
    materials: {
      finish: '18K Heavy Gold Micron Plating',
      base: 'Eco-Friendly Brass Alloy',
      stones: 'Warm Carnelian Agate & Vitreous Tangerine Enamel',
      features: ['Full 4-Piece Suite (Necklace + Ring + 2 Bangles)', 'Anti-Tarnish', 'Hypoallergenic']
    },
    dimensions: 'Necklace: 44cm | Kite: 35x28mm | Ring: Size 7 Adjustable | Bangles: 62mm | Set: 64g',
    careInstructions: ['Store in provided signature DIVA hard-shell presentation box.'],
    images: [
      '/images/products/set-5.jpg',
      '/images/products/set-5-detail.jpg',
      '/images/products/set-5-macro.jpg'
    ],
    availability: 'in-stock',
    rating: 4.97,
    reviewCount: 218,
    featured: true,
    newArrival: false,
    trending: true,
    bestSeller: true,
    editorialQuote: 'A warm golden sunset on your skin. The ultimate high-glamour statement suite.',
    relatedSlugs: ['carnelian-cabochon-gold-pendant', 'amber-tortoiseshell-square-drops', 'chunky-hammered-dome-bangle-stack'],
    completeTheLook: ['chunky-hammered-dome-bangle-stack', 'amber-tortoiseshell-square-drops']
  }
];

export const categories = [
  { slug: 'all', name: 'All Jewellery', count: products.length },
  { slug: 'new-arrivals', name: 'New Arrivals', count: products.filter(p => p.newArrival).length },
  { slug: 'pendants', name: 'Pendants & Necklaces', count: products.filter(p => p.category === 'pendants').length },
  { slug: 'bangles', name: 'Bangles & Cuffs', count: products.filter(p => p.category === 'bangles').length },
  { slug: 'earrings', name: 'Earrings & Hoops', count: products.filter(p => p.category === 'earrings').length },
  { slug: 'rings', name: 'Stackable Rings', count: products.filter(p => p.category === 'rings').length },
  { slug: 'sets', name: 'Curated Suites & Sets', count: products.filter(p => p.category === 'sets').length },
  { slug: 'western-jewellery', name: 'Western Girly Edit', count: products.filter(p => p.style === 'western' || p.style === 'minimal' || p.style === 'statement').length }
];

export const moodCategories = [
  {
    id: 'everyday',
    name: 'CLEAN GIRL EVERYDAY',
    tagline: 'Effortless gold chains, lightweight hoops & signets for your daily routine.',
    image: '/images/mood-everyday.jpg',
    href: '/collections?mood=everyday'
  },
  {
    id: 'brunch',
    name: 'SUNDAY BRUNCH & MATCHA',
    tagline: 'Bold sculptural hoops, chunky cuffs & textured sunbursts under the morning sun.',
    image: '/images/mood-brunch.jpg',
    href: '/collections?mood=brunch'
  },
  {
    id: 'office',
    name: 'BOARDROOM CHIC',
    tagline: 'Clean herringbone weaves, quiet geometric studs & understated signet rings.',
    image: '/images/mood-office.jpg',
    href: '/collections?mood=office'
  },
  {
    id: 'date-night',
    name: 'CANDLELIT DATE NIGHT',
    tagline: 'Intimate candlelight reflections, baroque pearl drops & delicate pendants.',
    image: '/images/mood-datenight.jpg',
    href: '/collections?mood=date-night'
  },
  {
    id: 'party',
    name: 'COCKTAIL & PARTY',
    tagline: 'Liquid crystal tennis bracelets, chunky dome rings & high-shine gold.',
    image: '/images/mood-party.jpg',
    href: '/collections?mood=party'
  },
  {
    id: 'festive',
    name: 'CELEBRATION EDIT',
    tagline: 'Layered gold chains, molten cuffs & radiant pearl accents for celebrations.',
    image: '/images/mood-festive.jpg',
    href: '/collections?mood=festive'
  }
];

export const styleCategories = [
  {
    id: 'western',
    name: 'WESTERN GIRLY',
    description: 'Bows, clovers, chunky hoops & coquette pearl accents.',
    count: products.filter(p => p.style === 'western').length,
    href: '/collections?style=western'
  },
  {
    id: 'minimal',
    name: 'MINIMAL CHIC',
    description: 'Dainty everyday essentials designed to layer or wear solo.',
    count: products.filter(p => p.style === 'minimal').length,
    href: '/collections?style=minimal'
  },
  {
    id: 'statement',
    name: 'MOLTEN STATEMENT',
    description: 'Sculptural organic fluid silhouettes that command attention.',
    count: products.filter(p => p.style === 'statement').length,
    href: '/collections?style=statement'
  },
  {
    id: 'pearl',
    name: 'AESTHETIC PEARL',
    description: 'Lustrous natural baroque pearls and delicate ribbon chokers.',
    count: products.filter(p => p.style === 'pearl').length,
    href: '/collections?style=pearl'
  },
  {
    id: 'gold-tone',
    name: '18K GOLD TONE',
    description: 'Radiant warm gold finishes with anti-tarnish protective coating.',
    count: products.filter(p => p.materials.finish.includes('Gold')).length,
    href: '/collections?style=gold-tone'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  if (category === 'new-arrivals') return products.filter(p => p.newArrival);
  if (category === 'western-jewellery') return products.filter(p => p.style === 'western' || p.style === 'minimal' || p.style === 'statement');
  if (category === 'traditional-jewellery') return products.filter(p => p.category === 'sets' || p.category === 'bangles');
  if (category === 'bracelets') return products.filter(p => p.category === 'bangles');
  if (category === 'jhumkas') return products.filter(p => p.category === 'earrings');
  return products.filter(p => p.category === category);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
