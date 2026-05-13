import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    setQty,
    remove,
    subtotal,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          open
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-white border-l flex flex-col transition-transform duration-500 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <p className="text-xl font-semibold uppercase">
            Bag{" "}
            <span className="text-gray-500 text-sm">
              ({items.length})
            </span>
          </p>

          <button
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMPTY */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="text-3xl font-bold uppercase mb-3">
              Empty
            </p>

            <p className="text-gray-500 text-sm mb-8">
              Your bag is waiting to be filled.
            </p>

            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="border px-8 py-3 text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 border-b pb-6"
                >
                  {/* IMAGE */}
                  <Link
                    to={`/product/${it.product.slug}`}
                    onClick={() => setOpen(false)}
                    className="block w-20 h-24 bg-gray-100 shrink-0 overflow-hidden rounded"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${it.product.image}`}
                      alt={it.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* DETAILS */}
                  <div className="flex-1 flex flex-col">

                    {/* TOP */}
                    <div className="flex justify-between gap-2">

                      <Link
                        to={`/product/${it.product.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-semibold uppercase text-sm hover:text-red-500"
                      >
                        {it.product.name}
                      </Link>

                      {/* REMOVE */}
                      <button
                        onClick={() => remove(it.id)}
                        className="text-gray-500 hover:text-red-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>

                    </div>

                    {/* SIZE */}
                    <p className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">
                      Size {it.size}
                    </p>

                    {/* BOTTOM */}
                    <div className="mt-auto flex justify-between items-end">

                      {/* QTY */}
                      <div className="flex items-center border">

                        <button
                          onClick={() =>
                            setQty(it.id, it.qty - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-8 text-center text-sm">
                          {it.qty}
                        </span>

                        <button
                          onClick={() =>
                            setQty(it.id, it.qty + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                      </div>

                      {/* PRICE */}
                      <p className="font-semibold">
                        ₹{it.product.price * it.qty}
                      </p>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* FOOTER */}
            <div className="border-t p-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="uppercase tracking-widest text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₹{subtotal}
                </span>
              </div>

              <p className="text-[11px] text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              {/* CHECKOUT */}
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-black text-white py-4 text-center text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition"
              >
                Checkout — ₹{subtotal}
              </Link>

              {/* VIEW BAG */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="block w-full border py-4 text-center text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition"
              >
                View Bag
              </Link>

            </div>
          </>
        )}
      </aside>
    </>
  );
}