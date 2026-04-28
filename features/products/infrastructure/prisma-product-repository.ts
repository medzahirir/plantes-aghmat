import { prisma } from "@/lib/prisma";
import { toProduct, toCategory } from "./product-mapper";
import { productCatalog, categories as staticCategories } from "./catalog";
import type { Product, Category } from "@/types/product";

export async function getProductsFromDb(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, images: true },
      orderBy: { createdAt: "desc" },
    });
    return products.map(toProduct);
  } catch (error) {
    console.warn("[DB] Supabase unreachable, falling back to static catalog:", (error as Error).message);
    return productCatalog;
  }
}

export async function getProductsByCategoryFromDb(categoryId: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: { category: true, images: true },
    });
    return products.map(toProduct);
  } catch (error) {
    console.warn("[DB] Supabase unreachable, falling back to static catalog:", (error as Error).message);
    return productCatalog.filter((p) => p.categoryId === categoryId);
  }
}

export async function getCategoriesFromDb(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany();
    return categories.map(toCategory);
  } catch (error) {
    console.warn("[DB] Supabase unreachable, falling back to static categories:", (error as Error).message);
    return staticCategories;
  }
}

export async function getProductByIdFromDb(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });
    if (!product) return null;
    return toProduct(product);
  } catch (error) {
    console.warn("[DB] Supabase unreachable, falling back to static catalog:", (error as Error).message);
    return productCatalog.find((p) => p.id === id) ?? null;
  }
}
