import { Product as PrismaProduct, Category as PrismaCategory, Image as PrismaImage } from "@prisma/client";
import type { Product, Category } from "@/types/product";

/**
 * Mappers to convert Prisma database entities to application domain types.
 * Currently defaults to French (FR) content.
 */

export function toCategory(prismaCategory: PrismaCategory): Category {
  return {
    id: prismaCategory.id,
    name: prismaCategory.name_fr,
    description: prismaCategory.description_fr || "",
  };
}

export function toProduct(
  prismaProduct: PrismaProduct & {
    category: PrismaCategory;
    images: PrismaImage[];
  }
): Product {
  const mainImage = prismaProduct.images[0];
  let src = mainImage?.src || "/products/placeholder.jpg";

  // Fallback for missing local images during development
  const generatedImages = [
    "/products/monstera-deliciosa.jpg",
    "/products/olivier-ornement.jpg",
    "/products/citrus-sinensis.jpg",
    "/products/rosmarinus-officinalis.jpg"
  ];

  if (!generatedImages.includes(src)) {
    // Use the custom generated nano banana placeholder icon
    src = "/products/fallback-plant.png";
  }

  return {
    id: prismaProduct.id,
    name: prismaProduct.name_fr,
    price: prismaProduct.price,
    description: prismaProduct.description_fr,
    categoryId: prismaProduct.categoryId,
    category: prismaProduct.category.name_fr,
    accent: prismaProduct.accent || "",
    image: {
      src: src,
      alt: mainImage?.alt || prismaProduct.name_fr,
    },
  };
}
