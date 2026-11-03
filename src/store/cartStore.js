import { create } from "zustand";

const CART_STORAGE_KEY = "campus_store_cart";

function loadCartFromStorage() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to parse cart from localStorage:", error);
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadCartFromStorage(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          }
        ]
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return {
          items: state.items.filter((item) => item.id !== id)
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }),

  clear: () => set({ items: [] })
}));

// External subscription for persistence outside of React component lifecycle
useCartStore.subscribe((state) => {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  } catch (error) {
    console.warn("Failed to sync cart to localStorage:", error);
  }
});
