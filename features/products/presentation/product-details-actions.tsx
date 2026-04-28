"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/product";

interface ProductDetailsActionsProps {
  product: Product;
}

export function ProductDetailsActions({ product }: ProductDetailsActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    // We can extend useCart to support quantity if needed, 
    // for now we just call it multiple times or we could pass quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center border border-outline-variant rounded-full p-2 bg-surface">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <span className="w-12 text-center font-bold text-lg">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        
        <p className="text-sm font-label text-on-surface-variant italic">
          Disponible en stock
        </p>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full md:w-auto px-16 py-5 bg-primary text-on-primary font-label text-sm uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary/20 hover:bg-[#2d4c3b] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
