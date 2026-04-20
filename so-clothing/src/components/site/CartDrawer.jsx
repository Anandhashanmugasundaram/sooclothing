import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-background border-l border-border flex flex-col transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <p className="font-display text-xl uppercase">Bag <span className="text-muted-foreground text-sm font-mono">({items.length})</span></p>
          <button onClick={() => setOpen(false)} aria-label="Close" className="hover:text-accent transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-3xl uppercase mb-3">Empty</p>
            <p className="text-muted-foreground text-sm mb-8">Your bag is waiting to be filled.</p>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="border border-foreground/30 hover:border-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-all"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((it) => (
                <div key={`${it.product.id}-${it.size}`} className="flex gap-4 border-b border-border pb-6">
                  <Link to={`/product/${it.product.slug}`} onClick={() => setOpen(false)} className="block w-20 h-24 bg-secondary shrink-0 overflow-hidden">
                    <img src={it.product.img} alt={it.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${it.product.slug}`} onClick={() => setOpen(false)} className="font-display uppercase text-sm hover:text-accent">
                        {it.product.name}
                      </Link>
                      <button onClick={() => remove(it.product.id, it.size)} aria-label="Remove" className="text-muted-foreground hover:text-accent">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Size {it.size}</p>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(it.product.id, it.size, it.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary" aria-label="Decrease">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm">{it.qty}</span>
                        <button onClick={() => setQty(it.product.id, it.size, it.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary" aria-label="Increase">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-mono text-sm">{formatPrice(it.product.price * it.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-muted-foreground uppercase tracking-widest text-xs">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-accent text-accent-foreground py-4 text-center font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 transition-colors"
              >
                Checkout — {formatPrice(subtotal)}
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="block w-full border border-border py-4 text-center font-mono text-xs uppercase tracking-[0.25em] hover:border-accent hover:text-accent transition-colors"
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
