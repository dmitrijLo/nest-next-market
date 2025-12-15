import { Product } from "@/app/products/product.type";

type ProductCardProps = Omit<Product, "uuid">;

export default function ProductCard({
  name,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions flex items-center justify-between mt-4">
          <span className="text-xl font-bold">{price} €</span>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
