'use client';

import type { Product } from "@/types/product";

import {
  useCartActions,
  useCartItemQuantity,
} from "@/features/cart/application/use-cart-store";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartActions();
  const quantity = useCartItemQuantity(product.id);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-container)]"
    >
      {quantity > 0 ? `Add another (${quantity} in cart)` : "Add to cart"}
    </button>
  );
}
