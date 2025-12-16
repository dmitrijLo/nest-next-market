import { Product } from "@/app/products/product.type";
import { create } from "zustand";

type ProductItem = Product & { count: number };

interface CartCtx {
  items: ProductItem[];
  addItem: (item: Product) => void;
  remove: (byUUID: string) => void;
  clearCart: () => void;
  // getTotalCount: () => number;
}

export const useCartStore = create<CartCtx>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const hasItemIdx = state.items.findIndex(
        (item) => item.uuid === product.uuid,
      );
      // new Product
      if (hasItemIdx === -1)
        return { items: [{ ...product, count: 1 }, ...state.items] };

      // If product already exists in list, increment its count
      const updatedItems = state.items.map((item, idx) => {
        if (idx === hasItemIdx) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      return { items: updatedItems };
    }),
  remove: (byUUID) =>
    set((state) => ({
      items: state.items.filter(({ uuid }) => uuid !== byUUID),
    })),
  clearCart: () => set({ items: [] }),
  // getTotalCount: () => get().items.reduce((acc, { count }) => acc + count, 0),
}));
