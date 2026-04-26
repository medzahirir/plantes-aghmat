export type Category = {
  id: string;
  name: string;
  description: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: ProductImage;
  description: string;
  categoryId: string;
  category?: string;
  accent?: string;
};
