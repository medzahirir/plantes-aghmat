"use client";

import { useState } from "react";
import { productCatalog } from "@/features/products/infrastructure/catalog";

const tabs: { label: string; categoryId: string | null }[] = [
  { label: "Tous", categoryId: null },
  { label: "Intérieur", categoryId: "interieur" },
  { label: "Extérieur", categoryId: "exterieur" },
  { label: "Fruitiers", categoryId: "fruitiers" },
  { label: "Aromatiques", categoryId: "aromatiques" },
];

const DEFAULT_VISIBLE = 12;

export function ProductGrid() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeTab === null
      ? productCatalog
      : productCatalog.filter((p) => p.categoryId === activeTab);

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hasMore = filtered.length > DEFAULT_VISIBLE && !showAll;

  function handleTabClick(categoryId: string | null) {
    setActiveTab(categoryId);
    setShowAll(false);
  }

  function countFor(categoryId: string | null) {
    if (categoryId === null) return productCatalog.length;
    return productCatalog.filter((p) => p.categoryId === categoryId).length;
  }

  return (
    <section
      id="plants"
      className="mx-auto max-w-[1440px] overflow-hidden px-8 py-24"
    >
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
            {visible.map(({ id, name, category, price, image }) => (
              <div key={id} className="group">
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-display text-xl text-primary">{name}</h5>
                    <p className="text-sm italic text-on-surface-variant">
                      {category}
                    </p>
                  </div>
                  <span className="font-bold text-primary">{price} DH</span>
                </div>
                <button className="mt-6 w-full rounded-full border border-primary/10 py-3 text-xs font-bold tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary">
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
