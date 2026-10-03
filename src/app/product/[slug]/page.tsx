import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Jewellery Not Found | DIVA Jaipur'
    };
  }

  return {
    title: `${product.name} | DIVA Jaipur Fashion Jewellery`,
    description: product.description,
    openGraph: {
      title: `${product.name} — DIVA Jaipur`,
      description: product.tagline,
      images: [{ url: product.images[0] }]
    }
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
