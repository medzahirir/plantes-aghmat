import { productCatalog } from "@/features/products/infrastructure/catalog";
import type { Product } from "@/types/product";

export function getProductCatalog(): Product[] {
  return productCatalog;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return productCatalog.filter((product) => product.categoryId === categoryId);
}
