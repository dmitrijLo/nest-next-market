import ProductCard from "@/components/productCard";
import { Product } from "./product.type";
import NewProductModal from "@/components/newProductModal";
import { getBaseApiUrl } from "@/utils/api";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${getBaseApiUrl()}/products`, {
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
        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-7">
          <NewProductModal />
        </div>
        {products.map((product) => (
          <ProductCard key={product.uuid.slice(6)} product={product} />
        ))}
      </section>
    </div>
  );
}
