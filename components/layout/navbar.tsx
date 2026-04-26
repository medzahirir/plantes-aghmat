"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/shared/cart-drawer";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Nos Services", href: "/#services" },
  { label: "Réalisations", href: "/#gallery" },
  { label: "À Propos", href: "/#features" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="fixed top-0 z-50 w-full bg-[rgba(251,249,245,0.80)] shadow-[0_1px_0_rgba(27,28,26,0.05)] backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-primary">
          Plantes Aghmat
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            // Handle hash links for home page
            const isHashActive = pathname === "/" && link.href.startsWith("/#");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive && !isHashActive
                    ? "border-b border-primary/20 font-bold text-primary transition-all duration-300"
                    : "text-primary/70 transition-all duration-300 hover:text-primary"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="relative p-2 text-primary hover:text-primary/70 transition-colors"
            onClick={() => setIsCartOpen(true)}
            aria-label="Ouvrir le panier"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-primary transition-colors hover:bg-surface-container-highest md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined pointer-events-none">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 top-full w-full border-t border-primary/10 bg-background/95 px-6 py-6 shadow-xl backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-primary transition-colors hover:text-primary/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
