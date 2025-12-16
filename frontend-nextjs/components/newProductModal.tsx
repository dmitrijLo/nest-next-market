"use client";
import { ProductDto } from "@/app/products/product.type";
import { getBaseApiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function postProduct(productData: ProductDto) {
  const res = await fetch(`${getBaseApiUrl()}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) throw new Error("Fehler beim Erstellen eines neuen Produkts.");
}

export default function NewProductModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newProduct = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
    };

    await postProduct(newProduct as ProductDto);

    setIsOpen(false);
    form.reset();
    router.refresh();
    setIsLoading(false);
  }
  return (
    <>
      <button
        className="btn btn-accent col-start-3 col-span-3"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add product
      </button>

      <dialog
        className="modal backdrop-blur-sm transition-all duration-200"
        open={isOpen}
      >
        <div className="container modal-box p-8 glass max-w-lg">
          <fieldset className="fieldset w-full bg-base-200/50 border-base-300 rounded-box border p-6">
            <legend className="fieldset-legend font-bold text-lg">
              Neues Produkt
            </legend>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="label">Beschreibung</label>
                <textarea
                  name="description"
                  className="textarea w-full resize-none h-24"
                  placeholder="Beschreibung"
                ></textarea>
              </div>

              <div>
                <label className="label">Preis</label>
                <input
                  name="price"
                  required
                  type="number"
                  step="0.01"
                  className="input validator w-full"
                  placeholder="€"
                  min="0"
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </fieldset>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
