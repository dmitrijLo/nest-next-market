export interface Product {
  uuid: string;
  name: string;
  description: string;
  price: number;
}

export type ProductDto = Omit<Product, "uuid">;
