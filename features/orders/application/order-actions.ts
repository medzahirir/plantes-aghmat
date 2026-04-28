"use server";

import { createOrderInDb } from "../infrastructure/prisma-order-repository";

export async function submitOrder(formData: {
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
}) {
  try {
    const order = await createOrderInDb(formData);
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order submission error:", error);
    return { success: false, error: "Une erreur est survenue lors de la commande." };
  }
}
