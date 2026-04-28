import { getProductCatalog, getCategories } from "@/features/products/application/get-product-catalog";
import { BoutiqueContent } from "@/features/products/presentation/boutique-content";

export const dynamic = "force-dynamic";

export default async function BoutiquePage() {
  const [products, categories] = await Promise.all([
    getProductCatalog(),
    getCategories(),
  ]);

  return <BoutiqueContent initialProducts={products} categories={categories} />;
}
