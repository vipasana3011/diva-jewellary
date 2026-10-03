export type CategoryType =
  | 'earrings'
  | 'pendants'
  | 'bracelets'
  | 'rings'
  | 'jhumkas'
  | 'bangles'
  | 'sets'
  | 'western-jewellery'
  | 'traditional-jewellery';

export type StyleType =
  | 'minimal'
  | 'statement'
  | 'traditional'
  | 'western'
  | 'pearl'
  | 'gold-tone'
  | 'silver-tone';

export type MoodType =
  | 'everyday'
  | 'party'
  | 'wedding-guest'
  | 'office'
  | 'date-night'
  | 'festive'
  | 'brunch';

export interface ProductMaterial {
  finish: string;
  base: string;
  stones: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number; // in INR
  originalPrice: number; // in INR
  category: CategoryType;
  style: StyleType;
  moods: MoodType[];
  collection: string;
  description: string;
  craftDetails: string[];
  materials: ProductMaterial;
  dimensions: string;
  careInstructions: string[];
  images: string[]; // [Shot 01 Hero, Shot 02 Detail, Shot 03 Lifestyle/Model, Shot 04 Influencer]
  availability: 'in-stock' | 'pre-order';
  rating: number;
  reviewCount: number;
  featured?: boolean;
  newArrival?: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  editorialQuote?: string;
  relatedSlugs: string[];
  completeTheLook?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  giftWrap?: boolean;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}
