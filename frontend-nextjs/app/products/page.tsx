import ProductCard from "@/components/productCard";
import { Product } from "./product.type";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product data");

  return res.json();
}

export default async function ProductsList() {
  const products = await getProducts();
  return (
    <div className="container mx-auto p-8">
      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map(({ uuid, ...product }) => (
          <ProductCard key={uuid.slice(6)} {...product} />
        ))}
      </section>
    </div>
  );
}
