import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { productCatalog } from "@/features/products/infrastructure/catalog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductDetailsClient } from "./product-details-client";

// Placeholder images logic used in the boutique page for consistency
const PLACEHOLDER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOMsu706D49vLxa50kmNjMzeOx-1gyJBlTv8uDqtlOHUiSaslLU76xepWLeG1IfR5BOwrDU1UmEBQv6M2-GYxmnZIdaNQjDw4EUpQC0lJ-9DYH2mRp9GljwKbW-2xDLq0UnrywncL433ZEub_8Z_lJFRH3jUAIJNComsgCmTOsdrLep5RFZlotrOUdGudvgKj8m7W5to9WroAqZGt8WyAMLyYi7iSYauM7iHTskAu_ycArslbknQ_ZAOPhfxchv8EUTCUsjJsu22to",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFdGrKYZ_D7cYLCYDFF0bu0BuL67iyerxQ-gCCLJdS2c2lbSoFjN3O_PrEe2G-lSz2JekeyB83zkVDsAiC8C44dQmzBVp32JfvTcsOi337wvxv9XWJ5h-Gc6NmTSIE1Vd2MG0XBpmtinDKyMKYAquF08iaCyJWyiHHuzrdShhMsEagK2AjVv2fwzZ0y3bscUDTFC2XQbvBcC3CE945nP3jHP0ox5vhCk-m7HciJfzsAwrTuuIcIl_tuUXOelrlUdRdquCsMMRlAF8a",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_O8EELvfy0yBu71MKJp3FPt7uPwoRyVXigLOyGAIl-73UvfNRrO19IDZGNVZvdoCPxhcHLpxqbkyuQMrShT9gdpMWUB35LboVE7Jc3K5khF2nkyerM6gcH3GaCA3tXXbLikzoQVytjZZNALTH-MUcVcluucfk2fCtsbt-pQol4MyuarBvkBuq79zAKfGt_4GF1JS_HsmSBvJxFApMGqFlX-Cc4toClZKKD9X0aNOtb9dvHIlWQ7uOz3E_GjmuXKQmPXKJi8J6A07",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAC6PSYJmH96jq1nclZ7fKbkjgjsxIuEq0QCvKFRkE8jfTnsyKn5DbN1S2Ep-AckU4g-nFcr8j8Qpi64xxIQM-CgBMfnw3vJnLO68pSFKyP0DET45IZ1SssCvhu83nKKWfmwFUjYFdyF8DvislOL1xVsC2DdzRFYNZCj9eam8wV2cESu3xXeUC8794kL_-QrLP-2Fr-1o78axu5IvVEDcdWIFUM2vaEDhoXYKaelCZMeKuam9jCN8LmMbkGeKAViTdAGGBsqbzNQyxe",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAfeUZ4IMFjUWjTEC5-5yQXRFvNiKFUKr13UEKWf6dla4XMsTQmgt1z9SN0LvVxgFwoPChHtt0btWDTmYdc8a76_7K56Wl_gcrXqRgW2F4elTR1z6g5b1WWYmcbA6N_aVh7LNLFWSPGTVSPRSSixGLaP01RzujzEGL9z2trrvdt0UEeqZ5hZSkjpWwsM9u1YvTvrE8xfKY3TImAunPxLV0ie-afOhQ3aiPHHTUFtlY1vcljWWh1PQMxmVsmkMLBV28fyhbM1O4JNyj6",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHpj3SHApxQxw_JxE0_D1JaY2zdZWabGn2QTAP-C7uu-SYmlyi8TZfEJtWZg3cTEbGM3QkPOocSHGHG9jtnFY_EoIY9BFPqN1Il3_Vhu6gJBpSYElDV5b_IcdqVu4GMEqFFeXNHC1V7cLOckIuV0JSzD9MfsTJZZz4e-UE5-vMTf-H2LhDdp1aohqdEHrnOsuxL-SMJx4GDTGbZ0ykyGNFWJ-v8JOC6F8bcJ_c63rYZXc89h98HwL9Pcd7IyG92qIT2eb0TWjtpsLL",
];

const getPlaceholderImage = (productId: string) => {
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
};

export function generateStaticParams() {
  return productCatalog.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productCatalog.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const imageUrl = getPlaceholderImage(product.id);
  // Modify the product to include our placeholder image for the client component
  const productWithImage = {
    ...product,
    image: { ...product.image, src: imageUrl }
  };

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />

      <main className="pt-24 min-h-screen pb-16">
        <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery Area */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <Link href="/boutique" className="inline-flex items-center gap-2 text-primary hover:text-primary/70 transition-colors w-fit mb-4">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="font-label text-sm uppercase tracking-wider">Retour à la boutique</span>
            </Link>
            
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-container shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-surface-container opacity-60 hover:opacity-100 cursor-pointer transition-opacity border-2 border-transparent hover:border-primary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imageUrl} 
                    alt={`${product.name} vue ${i}`} 
                    className="w-full h-full object-cover grayscale-[30%]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Area */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <ProductDetailsClient product={productWithImage} />
            
            <div className="mt-16 space-y-8 border-t border-outline-variant/30 pt-12">
              <h3 className="text-2xl font-display italic text-primary">Conseils d&apos;entretien</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/20 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-primary mb-1">Arrosage</h4>
                    <p className="text-sm text-on-surface-variant">Modéré. Laisser sécher la surface du terreau entre deux arrosages.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/20 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">light_mode</span>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-primary mb-1">Exposition</h4>
                    <p className="text-sm text-on-surface-variant">Lumière vive indirecte. Éviter le soleil direct aux heures chaudes.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/20 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">thermostat</span>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-primary mb-1">Température</h4>
                    <p className="text-sm text-on-surface-variant">Idéale entre 18°C et 25°C. Protéger des courants d&apos;air froids.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/20 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">eco</span>
                  </div>
                  <div>
                    <h4 className="font-label font-bold text-primary mb-1">Substrat</h4>
                    <p className="text-sm text-on-surface-variant">Terreau pour plantes d&apos;intérieur, bien drainant.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
