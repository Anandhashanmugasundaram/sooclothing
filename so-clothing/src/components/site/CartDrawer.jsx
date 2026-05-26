import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function CartDrawer() {
  const { user } = useAuth();
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-white border-l flex flex-col transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <p
            className="uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Bag{" "}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 400,
                color: "#9ca3af",
              }}
            >
              ({items.length})
            </span>
          </p>

          <button onClick={() => setOpen(false)} className="hover:text-red-500 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p
              className="uppercase mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Empty
            </p>

            <p
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "#9ca3af",
              }}
            >
              Your bag is waiting to be filled.
            </p>

            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="border px-8 py-3 hover:bg-black hover:text-white transition"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 border-b pb-6">
                  {/* IMAGE */}
                  <Link
                    to={`/product/${it.product.slug}`}
                    onClick={() => setOpen(false)}
                    className="block w-20 h-24 bg-gray-100 shrink-0 overflow-hidden rounded"
                  >
                    <img
                      src={it.product.image || "/fallback.png"}
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
                        className="uppercase hover:text-red-500 transition-colors"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          letterSpacing: "0.01em",
                          lineHeight: 1.3,
                        }}
                      >
                        {it.product.name}
                      </Link>

                      <button
                        onClick={() => remove(it.id)}
                        className="text-gray-400 hover:text-red-500 transition shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* SIZE */}
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#9ca3af",
                        fontWeight: 400,
                      }}
                    >
                      Size {it.size}
                    </p>

                    {/* BOTTOM */}
                    <div className="mt-auto flex justify-between items-end">
                      {/* QTY */}
                      <div className="flex items-center border">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span
                          className="w-8 text-center"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          {it.qty}
                        </span>

                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* PRICE */}
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#0f1d4d",
                        }}
                      >
                        ₹{it.product.price * it.qty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    fontWeight: 400,
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#0f1d4d",
                  }}
                >
                  ₹{subtotal}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 300,
                  color: "#9ca3af",
                }}
              >
                Shipping and taxes calculated at checkout.
              </p>

              {/* CHECKOUT */}
              <Link
                to={user ? "/checkout" : "#"}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    toast.error("Please login to continue");
                    return;
                  }
                  setOpen(false);
                }}
                className="block w-full bg-black text-white py-4 text-center hover:bg-gray-800 transition"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Checkout — ₹{subtotal}
              </Link>

              {/* VIEW BAG */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="block w-full border py-4 text-center hover:bg-black hover:text-white transition"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
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