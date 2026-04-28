"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"cart" | "shipping" | "payment">("cart");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
  });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = totalPrice > 1000 ? totalPrice : totalPrice + 50;

  const handleNextStep = async () => {
    setErrorMsg(null);
    
    if (activeTab === "cart") {
      setActiveTab("shipping");
    } else if (activeTab === "shipping") {
      if (!formData.email || !formData.name || !formData.address || !formData.city) {
        setErrorMsg("Veuillez remplir tous les champs de livraison.");
        return;
      }
      setActiveTab("payment");
    } else {
      setIsSubmitting(true);
      try {
        const { submitOrder } = await import("@/features/orders/application/order-actions");
        const result = await submitOrder({
          ...formData,
          total: finalTotal,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        });

        if (result.success) {
          setOrderSuccess(result.orderId || "success");
          clearCart();
        } else {
          setErrorMsg(result.error || "Une erreur inattendue est survenue.");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Impossible de joindre le serveur. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null); // Clear error on typing
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[90] transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[100] flex flex-col h-[100dvh] w-[92%] sm:max-w-[440px] lg:max-w-[480px] bg-background shadow-2xl shadow-[#1b1c1a]/10 overflow-hidden transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-l-2xl sm:rounded-l-3xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── SUCCESS STATE ── */}
        {orderSuccess ? (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center space-y-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-display text-primary italic">
                Merci pour votre confiance&nbsp;!
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                Votre commande a été enregistrée avec succès. Nous vous contacterons par
                téléphone ou par email sous peu pour confirmer la livraison.
              </p>
              <p className="text-xs font-label uppercase tracking-widest text-primary/60 font-bold pt-4">
                ID de commande&nbsp;: {orderSuccess}
              </p>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(null);
                setActiveTab("cart");
                onClose();
                router.push("/");
              }}
              className="w-full bg-primary text-white py-4 rounded-full font-label font-bold text-xs uppercase tracking-[0.2em]"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        ) : (
          /* ── NORMAL DRAWER ── */
          <>
            {/* Header */}
            <div className="px-4 py-3 md:px-6 md:py-5 flex justify-between items-start">
              <div>
                <h2 className="text-2xl md:text-6xl font-display text-primary">Mon Panier</h2>
                <p className="text-[10px] font-label font-medium uppercase tracking-[0.2em] text-secondary mt-1 opacity-70">
                  Botanical Curation
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 md:p-2 hover:bg-surface-container-low rounded-full transition-colors group"
              >
                <span className="material-symbols-outlined text-primary text-2xl group-hover:rotate-90 transition-transform duration-300">
                  close
                </span>
              </button>
            </div>

            {/* Tabs */}
            <nav className="flex px-6 md:px-8 gap-4 md:gap-6 border-b border-outline-variant/10">
              {(["cart", "shipping", "payment"] as const).map((tab) => {
                const labels = { cart: "Panier", shipping: "Livraison", payment: "Paiement" };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2.5 text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? "text-primary font-bold border-b-2 border-primary"
                        : "text-primary/40 hover:text-primary"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </nav>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 space-y-8 custom-scrollbar">
              {/* ── Cart tab ── */}
              {activeTab === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-primary/20">
                        <span className="material-symbols-outlined text-3xl">shopping_basket</span>
                      </div>
                      <div>
                        <p className="font-display italic text-2xl text-primary/40">Le panier est vide</p>
                        <p className="text-[9px] md:text-[10px] font-label uppercase tracking-widest text-primary/30 mt-1">
                          Votre collection attend
                        </p>
                      </div>
                      <button
                        onClick={() => { onClose(); router.push("/boutique"); }}
                        className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
                      >
                        Explorer la boutique
                      </button>
                    </div>
                  ) : (
                    <>
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 md:gap-6 items-center group">
                          <div className="w-16 h-24 md:w-20 md:h-28 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              src={item.image.src}
                              alt={item.image.alt}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-display text-lg md:text-xl text-primary leading-tight truncate md:whitespace-normal">
                                {item.name}
                              </h3>
                              <span className="font-label font-medium text-primary text-xs md:text-sm whitespace-nowrap">
                                {item.price} MAD
                              </span>
                            </div>
                            <p className="text-[9px] md:text-[10px] font-label text-on-surface/40 mt-1 uppercase tracking-wider">
                              Spécimen d&apos;Aghmat
                            </p>
                            <div className="flex items-center gap-4 mt-3 md:mt-4">
                              <div className="flex items-center bg-surface-container-low rounded-full px-2 py-0.5 border border-outline-variant/10">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="material-symbols-outlined text-[10px] md:text-xs hover:text-primary p-0.5 transition-colors"
                                >
                                  remove
                                </button>
                                <span className="px-2 text-[10px] md:text-xs font-label font-semibold text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="material-symbols-outlined text-[10px] md:text-xs hover:text-primary p-0.5 transition-colors"
                                >
                                  add
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-[9px] md:text-[10px] font-label uppercase tracking-widest text-error/60 font-bold hover:text-error transition-colors"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-6 border-t border-outline-variant/10">
                        <div className="bg-secondary-container/20 p-4 md:p-5 rounded-2xl flex items-center gap-4">
                          <span
                            className="material-symbols-outlined text-secondary shrink-0"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            eco
                          </span>
                          <p className="text-[10px] md:text-[11px] font-label leading-relaxed text-on-secondary-container italic">
                            &quot;Chaque spécimen est sélectionné à la main et expédié dans un
                            emballage botanique compostable.&quot;
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* ── Shipping tab ── */}
              {activeTab === "shipping" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl text-primary italic">Détails de livraison</h3>
                    <div className="space-y-4">
                      {[
                        { key: "name", label: "Nom Complet", type: "text", placeholder: "Jean Dupont" },
                        { key: "email", label: "Email", type: "email", placeholder: "jean@example.com" },
                        { key: "address", label: "Adresse complète", type: "text", placeholder: "Rue, N° d'appartement..." },
                        { key: "city", label: "Ville", type: "text", placeholder: "Marrakech" },
                      ].map(({ key, label, type, placeholder }) => (
                        <div key={key} className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-primary/40">
                            {label}
                          </label>
                          <input
                            name={key}
                            value={formData[key as keyof typeof formData]}
                            onChange={handleInputChange}
                            type={type}
                            className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex gap-4">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Livraison Express</p>
                      <p className="text-[10px] text-primary/60 leading-relaxed">
                        Délai estimé&nbsp;: 24h à 48h selon votre ville.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Payment tab ── */}
              {activeTab === "payment" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl text-primary italic">Mode de paiement</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer transition-all">
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-primary">Paiement à la livraison (Cash)</p>
                          <p className="text-[10px] text-primary/60">
                            Payez en espèces dès réception de vos plantes.
                          </p>
                        </div>
                      </label>
                      <div className="flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/10 opacity-40 grayscale">
                        <div className="w-5 h-5 rounded-full border-2 border-outline-variant/30" />
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-primary">Carte Bancaire</p>
                          <p className="text-[10px] text-primary/60">Bientôt disponible</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary-container/20 p-5 rounded-2xl border border-secondary/10 flex gap-4">
                    <span className="material-symbols-outlined text-secondary">verified_user</span>
                    <p className="text-[10px] leading-relaxed text-on-secondary-container">
                      Vos informations sont cryptées et sécurisées par notre protocole SSL.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-4 py-3 md:px-4 md:py-4 bg-surface-container-low/50 backdrop-blur-sm border-t border-outline-variant/10">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[10px] md:text-xs font-label">
                    <span className="text-on-surface/60">Sous-total</span>
                    <span className="font-medium text-primary">{totalPrice} MAD</span>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs font-label">
                    <span className="text-on-surface/60">Livraison</span>
                    <span className="font-medium text-primary">
                      {totalPrice > 1000 ? "Gratuit" : "50 MAD"}
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-3">
                    <span className="font-display text-xl md:text-2xl text-primary">Total</span>
                    <span className="font-display text-2xl md:text-3xl text-primary">{finalTotal} MAD</span>
                  </div>
                </div>
                
                {errorMsg && (
                  <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
                    <span className="material-symbols-outlined text-error text-lg">error</span>
                    <p className="text-xs text-error font-medium">{errorMsg}</p>
                  </div>
                )}
                
                <button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-full font-label font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-95 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                      Traitement en cours...
                    </>
                  ) : activeTab === "cart" ? (
                    "Passer à la livraison"
                  ) : activeTab === "shipping" ? (
                    "Passer au paiement"
                  ) : (
                    "Confirmer la commande"
                  )}
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={activeTab === "cart" ? onClose : () => setActiveTab("cart")}
                  className="w-full mt-3 text-center text-[9px] font-label uppercase tracking-widest font-bold text-primary/40 hover:text-primary transition-colors disabled:opacity-0"
                >
                  {activeTab === "cart" ? "Continuer mes achats" : "Retour au panier"}
                </button>
              </div>
            )}
          </>
        )}
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(22,53,38,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #163526; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2d4c3b; }
      `}} />
    </>
  );
}
