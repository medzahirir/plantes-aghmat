import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/shared/about-section";
import { ContactSection } from "@/components/shared/contact-section";
import { FeaturesSection } from "@/components/shared/features-section";
import { GallerySection } from "@/components/shared/gallery-section";
import { HeroSection } from "@/components/shared/hero-section";
import { ServicesSection } from "@/components/shared/services-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { ProductGrid } from "@/features/products/presentation/product-grid";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-on-surface">
      <Navbar />
      <main id="main-content">
        {/* 1. Hero — full-viewport photo */}
        <HeroSection />
        {/* 2. Services — bento grid */}
        <ServicesSection />
        {/* 3. Target clients — Hôtels / Villas / Résidences / Public */}
        <AboutSection />
        {/* 4. Product carousel */}
        <ProductGrid />
        {/* 5. Features — Direct pépinière / Qualité / Conseils */}
        <FeaturesSection />
        {/* 6. Gallery — transformations */}
        <GallerySection />
        {/* 7. Testimonials */}
        <TestimonialsSection />
        {/* 8. Contact */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
