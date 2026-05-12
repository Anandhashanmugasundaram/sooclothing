import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/contexts/AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const cartKey = user?.email ? `cart_${user.email}` : null;

  // LOAD CART
  useEffect(() => {
    if (!user?.email) return;

    try {
      const saved = localStorage.getItem(cartKey);
      setItems(saved ? JSON.parse(saved) : []);
    } catch {
      setItems([]);
    }
  }, [cartKey, user?.email]);

  // SAVE CART
  useEffect(() => {
    if (!user?.email) return;

    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey, user?.email]);

  // ADD ITEM (NO MERGE = ALWAYS SEPARATE)
  const add = (product, size, qty = 1) => {
    setItems((prev) => [
      ...prev,
      {
        product,
        size,
        qty,
        id: Date.now(),
      },
    ]);

    setOpen(true);
  };

  // REMOVE
  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // QTY UPDATE
  const setQty = (id, qty) => {
    if (qty <= 0) {
      remove(id);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty } : i
      )
    );
  };

  // CLEAR
  const clear = () => {
    setItems([]);
    if (cartKey) localStorage.removeItem(cartKey);
  };

  const count = items.reduce((s, i) => s + i.qty, 0);

  const subtotal = items.reduce(
    (s, i) => s + i.product.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        subtotal,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};