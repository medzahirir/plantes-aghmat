"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/hooks/use-cart";
import type { Product, Category } from "@/types/product";

const DEFAULT_VISIBLE = 12;

interface BoutiqueContentProps {
  initialProducts: Product[];
  categories: Category[];
}

export function BoutiqueContent({ initialProducts, categories }: BoutiqueContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  const addItem = useCart((state) => state.addItem);

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newFavs = new Set(favorites);
    if (newFavs.has(productId)) newFavs.delete(productId);
    else newFavs.add(productId);
    setFavorites(newFavs);
  };

  const filtered = initialProducts.filter(
    (p) =>
      (activeCategory === null || p.categoryId === activeCategory) &&
      p.price <= maxPrice
  );

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hasMore = filtered.length > DEFAULT_VISIBLE && !showAll;

  const toggleCategory = (categoryId: string) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
    setShowAll(false);
  };

  return (
    <div className="bg-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen font-body text-on-surface">
      <style dangerouslySetInnerHTML={{ __html: `
        .product-card:hover .hover-actions {
            opacity: 1;
            transform: translateY(0);
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #163526;
            cursor: pointer;
            margin-top: -6px;
        }
        input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: #c2c8c1;
            border-radius: 2px;
        }
      `}} />

      <Navbar />

      <main className="pt-24 min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-8 py-24 flex flex-col md:flex-row gap-16">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 space-y-12 shrink-0">
            <div className="space-y-6">
              <h3 className="text-2xl text-primary font-headline italic">Catégories</h3>
              <div className="flex flex-col gap-3 font-body">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="w-4 h-4 border-outline-variant text-primary rounded-sm focus:ring-primary" 
                      type="checkbox"
                      checked={activeCategory === category.id}
                      onChange={() => toggleCategory(category.id)}
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl text-primary font-headline italic">Prix</h3>
              <div className="space-y-4">
                <input 
                  className="w-full h-1 bg-outline-variant appearance-none cursor-pointer" 
                  max="5000" 
                  min="0" 
                  step="50"
                  type="range" 
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setShowAll(false);
                  }}
                />
                <div className="flex justify-between font-label text-xs font-bold text-on-surface-variant">
                  <span>0 MAD</span>
                  <span>{maxPrice} MAD</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-on-surface-variant">
                Aucune plante ne correspond à vos critères.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {visible.map((product) => (
                    <div key={product.id} className="product-card group flex flex-col">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container mb-6">
                        <Link href={`/product/${product.id}`} className="block w-full h-full">
                          <Image 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt={product.image.alt} 
                            src={product.image.src}
                            width={400}
                            height={533}
                          />
                        </Link>
                        <div className="hover-actions absolute top-4 right-4 flex flex-col gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <button 
                            onClick={(e) => toggleFavorite(product.id, e)}
                            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white text-primary transition-colors"
                          >
                            <span 
                              className="material-symbols-outlined text-lg transition-colors" 
                              style={{ fontVariationSettings: favorites.has(product.id) ? "'FILL' 1" : "'FILL' 0", color: favorites.has(product.id) ? "var(--color-error)" : "inherit" }}
                            >
                              favorite
                            </span>
                          </button>
                          <button 
                            onClick={(e) => { e.preventDefault(); setZoomedImage(product.image.src); }}
                            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">zoom_in</span>
                          </button>
                        </div>
                      </div>
                      <Link href={`/product/${product.id}`} className="space-y-2 mb-4 block hover:opacity-80 transition-opacity">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xl font-display italic text-primary">{product.name}</h4>
                          <span className="font-label font-bold text-secondary">{product.price} MAD</span>
                        </div>
                        <p className="text-sm text-on-surface-variant font-body line-clamp-2">{product.description}</p>
                      </Link>
                      <button 
                        onClick={() => addItem(product)}
                        className="w-full py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest rounded-full scale-95 active:scale-100 transition-all hover:bg-[#2d4c3b]"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={() => setShowAll(true)}
                      className="rounded-full border border-primary/20 px-10 py-4 text-xs font-bold tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
                    >
                      VOIR LES {filtered.length - DEFAULT_VISIBLE} AUTRES PLANTES
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal Zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm transition-all"
          onClick={() => setZoomedImage(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomedImage} alt="Aperçu agrandi" className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
        </div>
      )}

      <Footer />
    </div>
  );
}
