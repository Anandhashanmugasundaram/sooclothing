import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, loading } = useAuth();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const cartKey = user?.email ? `cart_${user.email}` : null;

  // ===============================
  // LOAD CART
  // ===============================
  useEffect(() => {
    if (loading) return;

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
  // SAVE CART
  // ===============================
  useEffect(() => {
    if (!hydrated || !user?.email) return;
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey, user?.email, hydrated]);

  // ===============================
  // ADD ITEM (with stock enforcement)
  // ===============================
  const add = (product, size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id && item.size === size
      );

      const stockForSize =
        product.sizes?.find((s) => s.size === size)?.quantity ?? 0;

      if (existing) {
        const newQty = existing.qty + qty;
        if (newQty > stockForSize) {
          toast.error(`Only ${stockForSize} available in size ${size}`);
          return prev;
        }
        return prev.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, qty: newQty }
            : item
        );
      }

      if (qty > stockForSize) {
        toast.error(`Only ${stockForSize} available in size ${size}`);
        return prev;
      }

      return [...prev, { id: crypto.randomUUID(), product, size, qty }];
    });

    setOpen(true);
  };

  // ===============================
  // REMOVE ITEM (by UUID)
  // ===============================
  const remove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ===============================
  // UPDATE QUANTITY (with stock enforcement)
  // ===============================
  const setQty = (id, qty) => {
    if (qty <= 0) {
      remove(id);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const stockForSize =
          item.product.sizes?.find((s) => s.size === item.size)?.quantity ?? 0;

        if (qty > stockForSize) {
          toast.error(`Only ${stockForSize} available in size ${item.size}`);
          return item; // don't update
        }

        return { ...item, qty };
      })
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
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
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