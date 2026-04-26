"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = totalPrice > 1000 ? 0 : 50; // Free shipping over 1000 MAD
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-surface min-h-screen font-body text-on-surface flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 px-6">
          <div className="max-w-md w-full bg-surface-container-lowest p-8 md:p-12 rounded-3xl text-center shadow-lg border border-outline-variant/30">
            <div className="w-20 h-20 bg-[#e8f5e9] text-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-display italic text-primary mb-4">Commande Confirmée !</h1>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Merci pour votre commande. Vous recevrez un email de confirmation très prochainement avec les détails de la livraison.
            </p>
            <button
              onClick={() => router.push("/boutique")}
              className="w-full py-4 bg-primary text-on-primary font-label text-sm uppercase tracking-widest rounded-full hover:bg-[#2d4c3b] active:scale-[0.98] transition-all"
            >
              Retour à la boutique
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />

      <main className="pt-24 min-h-screen pb-16">
        <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-display italic text-primary mb-12">Finaliser votre commande</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-6xl opacity-30 mb-4">shopping_bag</span>
              <p className="text-xl text-on-surface-variant font-body mb-8">Votre panier est vide.</p>
              <button
                onClick={() => router.push("/boutique")}
                className="py-4 px-8 bg-primary text-on-primary font-label text-sm uppercase tracking-widest rounded-full hover:bg-[#2d4c3b] transition-colors"
              >
                Découvrir nos plantes
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              
              {/* Left Column: Form */}
              <div className="w-full lg:w-[60%] flex flex-col gap-10">
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Contact Info */}
                  <section className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
                    <h2 className="text-2xl font-display italic text-primary mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">contact_mail</span>
                      Informations de contact
                    </h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="font-label text-sm text-on-surface-variant ml-1">Prénom</label>
                          <input required id="firstName" type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="font-label text-sm text-on-surface-variant ml-1">Nom</label>
                          <input required id="lastName" type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-label text-sm text-on-surface-variant ml-1">Email</label>
                        <input required id="email" type="email" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="font-label text-sm text-on-surface-variant ml-1">Téléphone</label>
                        <input required id="phone" type="tel" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="+212 6XX XX XX XX" />
                      </div>
                    </div>
                  </section>

                  {/* Shipping Info */}
                  <section className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
                    <h2 className="text-2xl font-display italic text-primary mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">local_shipping</span>
                      Adresse de livraison
                    </h2>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label htmlFor="address" className="font-label text-sm text-on-surface-variant ml-1">Adresse complète</label>
                        <input required id="address" type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="Rue, N° d'appartement..." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="city" className="font-label text-sm text-on-surface-variant ml-1">Ville</label>
                          <select required id="city" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface appearance-none">
                            <option value="">Sélectionner une ville</option>
                            <option value="marrakech">Marrakech</option>
                            <option value="casablanca">Casablanca</option>
                            <option value="rabat">Rabat</option>
                            <option value="agadir">Agadir</option>
                            <option value="tanger">Tanger</option>
                            <option value="other">Autre (Livraison prolongée)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="zip" className="font-label text-sm text-on-surface-variant ml-1">Code postal</label>
                          <input required id="zip" type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" placeholder="40000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="notes" className="font-label text-sm text-on-surface-variant ml-1">Instructions de livraison (Optionnel)</label>
                        <textarea id="notes" rows={3} className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface resize-none" placeholder="Code d'accès, indication spécifique..."></textarea>
                      </div>
                    </div>
                  </section>

                  {/* Payment Info */}
                  <section className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
                    <h2 className="text-2xl font-display italic text-primary mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">payments</span>
                      Paiement
                    </h2>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer transition-colors">
                        <input type="radio" name="payment" value="cod" defaultChecked className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                        <div className="flex flex-col">
                          <span className="font-label font-bold text-primary">Paiement à la livraison</span>
                          <span className="text-sm text-on-surface-variant">Payez en espèces lorsque vous recevez votre commande.</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant opacity-50 cursor-not-allowed">
                        <input disabled type="radio" name="payment" value="card" className="w-5 h-5" />
                        <div className="flex flex-col">
                          <span className="font-label font-bold text-on-surface">Carte bancaire (Bientôt disponible)</span>
                          <span className="text-sm text-on-surface-variant">Paiement en ligne sécurisé.</span>
                        </div>
                      </label>
                    </div>
                  </section>
                </form>
              </div>

              {/* Right Column: Order Summary */}
              <div className="w-full lg:w-[40%]">
                <div className="sticky top-32 bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-lg">
                  <h2 className="text-2xl font-display italic text-primary mb-6">Résumé de la commande</h2>
                  
                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image.src} alt={item.image.alt} className="object-cover w-full h-full" />
                          <span className="absolute -top-2 -right-2 bg-secondary text-on-secondary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-label font-bold text-sm text-primary line-clamp-1">{item.name}</h4>
                          <span className="text-xs text-on-surface-variant">{item.price} MAD</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-label font-bold text-sm">{item.price * item.quantity} MAD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-outline-variant/30 text-sm font-body text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Sous-total ({totalItems} articles)</span>
                      <span>{totalPrice} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      {shippingCost === 0 ? (
                        <span className="text-[#2e7d32] font-bold">Gratuite</span>
                      ) : (
                        <span>{shippingCost} MAD</span>
                      )}
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-primary/70 italic text-right mt-1">
                        Livraison gratuite à partir de 1000 MAD
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/30 mb-8">
                    <span className="font-display italic text-xl text-primary">Total</span>
                    <span className="font-label font-bold text-2xl text-secondary">{finalTotal} MAD</span>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-on-primary font-label text-sm uppercase tracking-widest rounded-full hover:bg-[#2d4c3b] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">lock</span>
                        Confirmer la commande
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-on-surface-variant mt-4 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">gpp_good</span>
                    Vos informations sont sécurisées.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c2c8c1;
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
