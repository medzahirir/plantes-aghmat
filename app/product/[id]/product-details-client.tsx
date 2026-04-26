"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface ProductDetailsClientProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    image: {
      src: string;
      alt: string;
    };
  };
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Add the item multiple times if quantity > 1
    // The useCart hook will handle incrementing the quantity in the cart state
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 flex items-center gap-2">
        <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-label uppercase tracking-widest">
          {product.categoryId}
        </span>
        <span className="px-3 py-1 bg-[#e8f5e9] text-[#2e7d32] rounded-full text-xs font-label uppercase tracking-widest flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          En stock
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-display italic text-primary mb-4 leading-tight">
        {product.name}
      </h1>
      
      <div className="text-3xl font-label font-bold text-secondary mb-8">
        {product.price} MAD
      </div>

      <div className="prose prose-p:text-on-surface-variant prose-p:leading-relaxed max-w-none mb-10 font-body">
        <p>{product.description}</p>
        <p className="mt-4">
          Cette plante est soigneusement cultivée dans nos pépinières d&apos;Aghmat, garantissant une qualité et une robustesse exceptionnelles. Parfaite pour apporter une touche de nature et d&apos;élégance à votre espace.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between border border-outline-variant rounded-full p-2 w-full sm:w-32 bg-surface">
            <button 
              onClick={decreaseQuantity}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-primary transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
              aria-label="Diminuer la quantité"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-label font-bold text-lg w-8 text-center">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-primary transition-colors disabled:opacity-50"
              disabled={quantity >= 20}
              aria-label="Augmenter la quantité"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`flex-1 py-4 px-8 rounded-full font-label text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
              isAdded 
                ? "bg-secondary text-on-secondary scale-95" 
                : "bg-primary text-on-primary hover:bg-[#2d4c3b] active:scale-[0.98]"
            }`}
          >
            <span className="material-symbols-outlined">
              {isAdded ? "check" : "shopping_cart"}
            </span>
            {isAdded ? "Ajouté au panier" : "Ajouter au panier"}
          </button>
        </div>

        <button className="w-full py-4 px-8 rounded-full font-label text-sm uppercase tracking-widest border-2 border-primary text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-3">
          <span className="material-symbols-outlined">favorite</span>
          Ajouter aux favoris
        </button>
      </div>

      {/* Info list */}
      <ul className="mt-8 space-y-4 border-t border-outline-variant/30 pt-8 font-body text-sm text-on-surface-variant">
        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary">local_shipping</span>
          <span>Livraison disponible partout au Maroc (2-5 jours ouvrables).</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary">psychiatry</span>
          <span>Plantes saines et vigoureuses, élevées avec soin.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary">support_agent</span>
          <span>Service client à votre écoute pour tout conseil d&apos;entretien.</span>
        </li>
      </ul>
    </div>
  );
}
