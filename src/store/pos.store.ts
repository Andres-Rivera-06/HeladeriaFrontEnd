import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface POSState {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const usePOSStore = create<POSState>((set) => ({
  cart: [],
  total: 0,
  addToCart: (item) => {
    // Add to cart logic will be implemented here
  },
  removeFromCart: (id) => {
    // Remove from cart logic will be implemented here
  },
  updateQuantity: (id, quantity) => {
    // Update quantity logic will be implemented here
  },
  clearCart: () => {
    set({ cart: [], total: 0 });
  },
}));
