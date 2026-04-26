'use client';

import { useCartSummaryState } from "@/features/cart/application/use-cart-store";

export function CartSummary() {
  const { items, itemCount, subtotal, removeItem } = useCartSummaryState();

  return (
    <aside className="h-fit rounded-[1.9rem] bg-[var(--color-surface-lowest)] p-6 shadow-[0_0_30px_rgba(27,28,26,0.07)] xl:sticky xl:top-28">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
            Cart Summary
          </p>
          <h3 className="mt-2 font-display text-3xl leading-none text-[var(--color-ink)]">
            Your selection
          </h3>
        </div>
        <span className="rounded-full bg-[var(--color-secondary-container)] px-3 py-1 text-sm font-semibold text-[var(--color-on-secondary-container)]">
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 rounded-[1.4rem] bg-[var(--color-surface-low)] px-4 py-5 text-sm leading-7 text-[var(--color-muted)]">
          Your cart is empty. Add a few plants to see a quick summary here.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.4rem] bg-[var(--color-surface-low)] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    {item.category}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[var(--color-ink)]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm text-[var(--color-muted)]">
                  Qty: {item.quantity}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-semibold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-primary-container)]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-[1.5rem] bg-[var(--color-surface-low)] px-5 py-4">
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
          <span>Subtotal</span>
          <span className="text-lg font-semibold text-[var(--color-primary)]">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-xs leading-6 text-[var(--color-muted)]">
          Final delivery and confirmation are handled directly with the shop.
        </p>
      </div>
    </aside>
  );
}
