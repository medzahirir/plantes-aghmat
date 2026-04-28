import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getProductById, getProductsByCategory } from "@/features/products/application/get-product-catalog";
import { ProductDetailsActions } from "@/features/products/presentation/product-details-actions";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Produit non trouvé" };

  return {
    title: `${product.name} | Plantes Aghmat`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
    return; // TypeScript narrowing guard
  }

  const relatedProducts = (await getProductsByCategory(product.categoryId))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen font-body text-on-surface">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-screen-2xl mx-auto px-8 mb-12">
          <nav className="flex text-sm font-label uppercase tracking-widest text-on-surface-variant/60">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="mx-4">/</span>
            <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
            <span className="mx-4">/</span>
            <span className="text-primary font-bold">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container shadow-2xl group">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold tracking-widest rounded-full uppercase">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-display italic text-primary leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-label text-secondary font-bold">
                {product.price} MAD
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-headline italic text-primary">À propos de cette plante</h3>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Actions (Add to Cart / Quantity) */}
            <ProductDetailsActions product={product} />

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                <div className="text-sm">
                  <p className="font-bold">Livraison express</p>
                  <p className="text-on-surface-variant">Rabat & Casa sous 24h</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                <div className="text-sm">
                  <p className="font-bold">Direct pépinière</p>
                  <p className="text-on-surface-variant">Plantes d&apos;Aghmat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="max-w-screen-2xl mx-auto px-8 mt-48">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl font-display italic text-primary">Vous pourriez aussi aimer</h2>
                <div className="h-1 w-24 bg-primary/20 rounded-full"></div>
              </div>
              <Link href="/boutique" className="text-sm font-bold tracking-widest text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">
                VOIR TOUT LE CATALOGUE
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group space-y-6">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-display italic text-primary">{p.name}</h4>
                      <span className="font-bold text-secondary">{p.price} MAD</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
