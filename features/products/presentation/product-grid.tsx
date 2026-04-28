"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import type { Product, Category } from "@/types/product";

const DEFAULT_VISIBLE = 12;

interface ProductGridProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

export function ProductGrid({ initialProducts, initialCategories }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const tabs = [
    { label: "Tous", categoryId: null },
    ...initialCategories.map((c) => ({ label: c.name, categoryId: c.id })),
  ];

  const filtered =
    activeTab === null
      ? initialProducts
      : initialProducts.filter((p) => p.categoryId === activeTab);

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hasMore = filtered.length > DEFAULT_VISIBLE && !showAll;

  function handleTabClick(categoryId: string | null) {
    setActiveTab(categoryId);
    setShowAll(false);
  }

  function countFor(categoryId: string | null) {
    if (categoryId === null) return initialProducts.length;
    return initialProducts.filter((p) => p.categoryId === categoryId).length;
  }

  return (
    <section id="plants" className="mx-auto max-w-[1440px] overflow-hidden px-8 py-24">
      {/* Header */}
      <div className="mb-12 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h2 className="font-display text-4xl italic text-primary">
          Nos plantes d&apos;exception
        </h2>
        <div className="flex w-full gap-4 overflow-x-auto pb-4 md:w-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.categoryId;
            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab.categoryId)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-primary hover:bg-surface-container"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-on-primary/20 text-on-primary"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {countFor(tab.categoryId)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-on-surface-variant">
          Aucune plante dans cette catégorie pour le moment.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <div key={product.id} className="group flex flex-col">
                {/* Clickable image → product detail */}
                <Link
                  href={`/product/${product.id}`}
                  className="mb-4 block aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image.src}
                    alt={product.image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      <h5 className="font-display text-xl text-primary">{product.name}</h5>
                    </Link>
                    <p className="text-sm italic text-on-surface-variant">{product.category}</p>
                  </div>
                  <span className="font-bold text-primary">{product.price} DH</span>
                </div>

                {/* Commander button → adds to cart */}
                <button
                  onClick={() => addItem(product)}
                  className="mt-6 w-full rounded-full border border-primary/10 py-3 text-xs font-bold tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
                >
                  COMMANDER
                </button>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="rounded-full border border-primary/20 px-10 py-3 text-xs font-bold tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
              >
                VOIR LES {filtered.length - DEFAULT_VISIBLE} AUTRES PLANTES
              </button>
  
            </div>
          )}
        </>
      )}
    </section>
  );
}
