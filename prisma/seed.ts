import { PrismaClient } from "@prisma/client";
import { categories, productCatalog } from "../features/products/infrastructure/catalog";

const prisma = new PrismaClient();

async function main() {
  console.log("Sowing seeds... 🌱");

  // 1. Clean existing data
  await prisma.image.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Seed Categories
  for (const cat of categories) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name_fr: cat.name,
        name_ar: cat.name, // Placeholder for Arabic
        description_fr: cat.description,
        description_ar: cat.description, // Placeholder for Arabic
      },
    });
  }

  console.log(`Created ${categories.length} categories.`);

  // 3. Seed Products
  for (const product of productCatalog) {
    await prisma.product.create({
      data: {
        id: product.id,
        name_fr: product.name,
        name_ar: product.name, // Placeholder
        description_fr: product.description,
        description_ar: product.description, // Placeholder
        price: product.price,
        stock: 50, // Default stock
        accent: product.accent,
        categoryId: product.categoryId,
        images: {
          create: {
            src: product.image.src,
            alt: product.image.alt,
          },
        },
      },
    });
  }

  console.log(`Created ${productCatalog.length} products.`);
  console.log("Seeding finished! 🌿✨");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
