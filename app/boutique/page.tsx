"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productCatalog } from "@/features/products/infrastructure/catalog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/hooks/use-cart";

const DEFAULT_VISIBLE = 12;

const PLACEHOLDER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOMsu706D49vLxa50kmNjMzeOx-1gyJBlTv8uDqtlOHUiSaslLU76xepWLeG1IfR5BOwrDU1UmEBQv6M2-GYxmnZIdaNQjDw4EUpQC0lJ-9DYH2mRp9GljwKbW-2xDLq0UnrywncL433ZEub_8Z_lJFRH3jUAIJNComsgCmTOsdrLep5RFZlotrOUdGudvgKj8m7W5to9WroAqZGt8WyAMLyYi7iSYauM7iHTskAu_ycArslbknQ_ZAOPhfxchv8EUTCUsjJsu22to",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFdGrKYZ_D7cYLCYDFF0bu0BuL67iyerxQ-gCCLJdS2c2lbSoFjN3O_PrEe2G-lSz2JekeyB83zkVDsAiC8C44dQmzBVp32JfvTcsOi337wvxv9XWJ5h-Gc6NmTSIE1Vd2MG0XBpmtinDKyMKYAquF08iaCyJWyiHHuzrdShhMsEagK2AjVv2fwzZ0y3bscUDTFC2XQbvBcC3CE945nP3jHP0ox5vhCk-m7HciJfzsAwrTuuIcIl_tuUXOelrlUdRdquCsMMRlAF8a",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_O8EELvfy0yBu71MKJp3FPt7uPwoRyVXigLOyGAIl-73UvfNRrO19IDZGNVZvdoCPxhcHLpxqbkyuQMrShT9gdpMWUB35LboVE7Jc3K5khF2nkyerM6gcH3GaCA3tXXbLikzoQVytjZZNALTH-MUcVcluucfk2fCtsbt-pQol4MyuarBvkBuq79zAKfGt_4GF1JS_HsmSBvJxFApMGqFlX-Cc4toClZKKD9X0aNOtb9dvHIlWQ7uOz3E_GjmuXKQmPXKJi8J6A07",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAC6PSYJmH96jq1nclZ7fKbkjgjsxIuEq0QCvKFRkE8jfTnsyKn5DbN1S2Ep-AckU4g-nFcr8j8Qpi64xxIQM-CgBMfnw3vJnLO68pSFKyP0DET45IZ1SssCvhu83nKKWfmwFUjYFdyF8DvislOL1xVsC2DdzRFYNZCj9eam8wV2cESu3xXeUC8794kL_-QrLP-2Fr-1o78axu5IvVEDcdWIFUM2vaEDhoXYKaelCZMeKuam9jCN8LmMbkGeKAViTdAGGBsqbzNQyxe",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAfeUZ4IMFjUWjTEC5-5yQXRFvNiKFUKr13UEKWf6dla4XMsTQmgt1z9SN0LvVxgFwoPChHtt0btWDTmYdc8a76_7K56Wl_gcrXqRgW2F4elTR1z6g5b1WWYmcbA6N_aVh7LNLFWSPGTVSPRSSixGLaP01RzujzEGL9z2trrvdt0UEeqZ5hZSkjpWwsM9u1YvTvrE8xfKY3TImAunPxLV0ie-afOhQ3aiPHHTUFtlY1vcljWWh1PQMxmVsmkMLBV28fyhbM1O4JNyj6",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHpj3SHApxQxw_JxE0_D1JaY2zdZWabGn2QTAP-C7uu-SYmlyi8TZfEJtWZg3cTEbGM3QkPOocSHGHG9jtnFY_EoIY9BFPqN1Il3_Vhu6gJBpSYElDV5b_IcdqVu4GMEqFFeXNHC1V7cLOckIuV0JSzD9MfsTJZZz4e-UE5-vMTf-H2LhDdp1aohqdEHrnOsuxL-SMJx4GDTGbZ0ykyGNFWJ-v8JOC6F8bcJ_c63rYZXc89h98HwL9Pcd7IyG92qIT2eb0TWjtpsLL",
];

export default function BoutiquePage() {
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

  const filtered = productCatalog.filter(
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

  const getPlaceholderImage = (productId: string) => {
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
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
        {/* Catalog Container */}
        <div className="max-w-screen-2xl mx-auto px-8 py-24 flex flex-col md:flex-row gap-16">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 space-y-12 shrink-0">
            <div className="space-y-6">
              <h3 className="text-2xl text-primary font-headline italic">Catégories</h3>
              <div className="flex flex-col gap-3 font-body">
                {[
                  { id: "interieur", label: "Intérieur" },
                  { id: "exterieur", label: "Extérieur" },
                  { id: "fruitiers", label: "Fruitiers" },
                  { id: "aromatiques", label: "Aromatiques" },
                ].map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="w-4 h-4 border-outline-variant text-primary rounded-sm focus:ring-primary" 
                      type="checkbox"
                      checked={activeCategory === category.id}
                      onChange={() => toggleCategory(category.id)}
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                      {category.label}
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt={product.image.alt} 
                            src={getPlaceholderImage(product.id)}
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
                            onClick={(e) => { e.preventDefault(); setZoomedImage(getPlaceholderImage(product.id)); }}
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
