import { usePOSStore } from "@/store/pos.store";

export function usePOS() {
  const { cart, total, addToCart, removeFromCart, updateQuantity, clearCart } =
    usePOSStore();

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
