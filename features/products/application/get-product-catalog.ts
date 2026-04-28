import { 
  getProductsFromDb, 
  getProductsByCategoryFromDb,
  getCategoriesFromDb,
  getProductByIdFromDb,
} from "@/features/products/infrastructure/prisma-product-repository";
import type { Product, Category } from "@/types/product";

export async function getProductCatalog(): Promise<Product[]> {
  return getProductsFromDb();
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return getProductsByCategoryFromDb(categoryId);
}

export async function getCategories(): Promise<Category[]> {
  return getCategoriesFromDb();
}

export async function getProductById(id: string): Promise<Product | null> {
  return getProductByIdFromDb(id);
}
