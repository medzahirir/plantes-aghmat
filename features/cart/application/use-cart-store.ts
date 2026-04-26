'use client';

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import {
  getCartItemCount,
  getCartSubtotal,
  type CartItem,
} from "@/features/cart/domain/cart";
import type { Product } from "@/types/product";

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
}));

export function useCartItemQuantity(productId: string): number {
  return useCartStore(
    (state) => state.items.find((item) => item.id === productId)?.quantity ?? 0,
  );
}

export function useCartActions() {
  return useCartStore(
    useShallow((state) => ({
      addItem: state.addItem,
      removeItem: state.removeItem,
    })),
  );
}

export function useCartSummaryState() {
  return useCartStore(
    useShallow((state) => ({
      items: state.items,
      itemCount: getCartItemCount(state.items),
      subtotal: getCartSubtotal(state.items),
      removeItem: state.removeItem,
    })),
  );
}
