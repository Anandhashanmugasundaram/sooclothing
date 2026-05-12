import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <>
      <PageHeader eyebrow="Your Selection" title="Bag" />

      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-4xl md:text-6xl uppercase mb-4">
                Empty Bag
              </p>
              <p className="text-muted-foreground mb-10">
                Nothing in here yet — go hunt something good.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-accent text-accent-foreground px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map((it) => (
                  <article
                    key={`${it.product.id}-${it.size}`}
                    className="flex gap-6 pb-6 border-b border-border"
                  >
                    <Link
                      to={`/product/${it.product.slug}`}
                      className="w-32 h-40 bg-secondary shrink-0 overflow-hidden"
                    >
                      <img
                        src={
                          it.product.img ||
                          `http://localhost:5000/uploads/${it.product.image}`
                        }
                        alt={it.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link
                            to={`/product/${it.product.slug}`}
                            className="font-display text-xl uppercase hover:text-accent"
                          >
                            {it.product.name}
                          </Link>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                            SO.{it.product.id} / Size {it.size}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(it.product.id, it.size)}
                          className="text-muted-foreground hover:text-accent"
                          aria-label="Remove"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-auto flex justify-between items-end">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              setQty(it.product.id, it.size, it.qty - 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center font-mono text-sm">
                            {it.qty}
                          </span>
                          <button
                            onClick={() =>
                              setQty(it.product.id, it.size, it.qty + 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-mono">
                          {formatPrice(it.product.price * it.qty)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start bg-secondary p-8 space-y-5">
                <p className="font-display text-2xl uppercase">Summary</p>
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatPrice(shipping)}
                />
                <div className="h-px bg-border" />
                <Row label="Total" value={formatPrice(total)} bold />
                {subtotal > 0 && subtotal < 150 && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Spend {formatPrice(150 - subtotal)} more for free shipping
                  </p>
                )}
                <Link
                  to="/checkout"
                  className="block w-full bg-accent text-accent-foreground py-4 text-center font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="block text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
                >
                  Continue shopping →
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, value, bold }) {
  return (
    <div
      className={`flex justify-between font-mono text-sm ${bold ? "text-base" : ""}`}
    >
      <span className="uppercase tracking-widest text-xs text-muted-foreground">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}
