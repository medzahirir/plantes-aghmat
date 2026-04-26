import Image from "next/image";

import { AddToCartButton } from "@/features/cart/presentation/add-to-cart-button";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.9rem] bg-[var(--color-surface-lowest)] shadow-[0_0_30px_rgba(27,28,26,0.07)]">
      <div className={`bg-gradient-to-br ${product.accent} p-5`}>
        <div className="rounded-[1.5rem] bg-[rgba(255,255,255,0.28)] p-5 backdrop-blur-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] border border-white/40 bg-[linear-gradient(180deg,_rgba(255,255,255,0.52),_rgba(255,255,255,0.18))]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 18rem, (min-width: 768px) 42vw, 92vw"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {product.category}
            </p>
            <h3 className="mt-2 font-display text-3xl leading-none">
              {product.name}
            </h3>
          </div>
          <span className="rounded-full bg-[var(--color-secondary-container)] px-3 py-1 text-sm font-semibold text-[var(--color-on-secondary-container)]">
            ${product.price}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
          {product.description}
        </p>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
