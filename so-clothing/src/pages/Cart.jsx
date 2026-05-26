import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader eyebrow="Your Selection" title="Bag" />

      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <p
                className="uppercase mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Empty Bag
              </p>
              <p
                className="text-muted-foreground mb-10"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                }}
              >
                Nothing in here yet — go hunt something good.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-accent text-accent-foreground px-10 py-4"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
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
                        src={it.product.image || "/fallback.png"}
                        alt={it.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link
                            to={`/product/${it.product.slug}`}
                            className="uppercase hover:text-accent transition-colors"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "1.25rem",
                              fontWeight: 600,
                              letterSpacing: "0.01em",
                            }}
                          >
                            {it.product.name}
                          </Link>
                          <p
                            className="text-muted-foreground mt-1"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              fontWeight: 400,
                            }}
                          >
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
                            onClick={() => setQty(it.product.id, it.size, it.qty - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className="w-10 text-center"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "1rem",
                              fontWeight: 500,
                            }}
                          >
                            {it.qty}
                          </span>
                          <button
                            onClick={() => setQty(it.product.id, it.size, it.qty + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#0f1d4d",
                          }}
                        >
                          {formatPrice(it.product.price * it.qty)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* SUMMARY SIDEBAR */}
              <aside className="lg:sticky lg:top-28 lg:self-start bg-secondary p-8 space-y-5">
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  Summary
                </p>

                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                <div className="h-px bg-border" />
                <Row label="Total" value={formatPrice(total)} bold />

                {subtotal > 0 && subtotal < 150 && (
                  <p
                    className="text-accent"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    Spend {formatPrice(150 - subtotal)} more for free shipping
                  </p>
                )}

                <Link
                  to="/checkout"
                  className="block w-full bg-accent text-accent-foreground py-4 text-center hover:bg-accent/90 transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  className="block text-center text-muted-foreground hover:text-accent transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  Continue shopping →
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span
        className="text-muted-foreground"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: bold ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
          fontSize: bold ? "1.1rem" : "0.85rem",
          fontWeight: bold ? 700 : 400,
          color: bold ? "#0f1d4d" : "inherit",
        }}
      >
        {value}
      </span>
    </div>
  );
}