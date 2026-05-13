import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, loading } = useAuth();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const cartKey = user?.email ? `cart_${user.email}` : null;

  // ===============================
  // LOAD CART (ONLY ONCE STABLE USER)
  // ===============================
  useEffect(() => {
    if (loading) return;

    // if logged out → clear cart UI
    if (!user?.email) {
      setItems([]);
      setHydrated(true);
      return;
    }

    try {
      const saved = localStorage.getItem(cartKey);

      setItems(saved ? JSON.parse(saved) : []);
    } catch (err) {
      console.log(err);
      setItems([]);
    }

    setHydrated(true);
  }, [user?.email, loading, cartKey]);

  // ===============================
  // SAVE CART (AFTER HYDRATION ONLY)
  // ===============================
  useEffect(() => {
    if (!hydrated || !user?.email) return;

    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey, user?.email, hydrated]);

  // ===============================
  // ADD ITEM (ALWAYS SEPARATE)
  // ===============================
  const add = (product, size, qty = 1) => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        product,
        size,
        qty,
      },
    ]);

    setOpen(true);
  };

  // ===============================
  // REMOVE ITEM
  // ===============================
  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ===============================
  // UPDATE QTY
  // ===============================
  const setQty = (id, qty) => {
    if (qty <= 0) return remove(id);

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  // ===============================
  // CLEAR CART
  // ===============================
  const clear = () => {
    setItems([]);
    if (cartKey) localStorage.removeItem(cartKey);
  };

  // ===============================
  // TOTALS
  // ===============================
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.qty,
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