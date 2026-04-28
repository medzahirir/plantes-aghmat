import { prisma } from "@/lib/prisma";

interface CreateOrderInput {
  email: string;
  name: string;
  address: string;
  city: string;
  total: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export async function createOrderInDb(input: CreateOrderInput) {
 
  return await prisma.$transaction(
    async (tx) => {
      // 1. Find or create user
      let user = await tx.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
        });
      }

      // 2. Create the order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          total: input.total,
          status: "PENDING",
          items: {
            create: input.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 20000, // default: 5000
    }
  );
 
  return await prisma.$transaction(async (tx) => {
    // 1. Find or create user
    let user = await tx.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      user = await tx.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
    }

    // 2. Create the order
    const order = await tx.order.create({
      data: {
        userId: user.id,
        total: input.total,
        status: "PENDING",
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  });
 
}
