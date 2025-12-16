"use client";
import { Product } from "@/app/products/product.type";
import { useCartStore } from "@/stores/useCartStore";

type ProductCardProps = { product: Product }; //Omit<Product, "uuid">;

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);

  function handleClick() {
    addToCart(product);
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions flex items-center justify-between mt-4">
          <span className="text-xl font-bold">{product.price} €</span>
          <button onClick={handleClick} className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
