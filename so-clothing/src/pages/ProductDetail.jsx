import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import { getProduct, formatPrice, products } from "@/data/products";
import { ProductCard } from "@/components/site/Products";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { add } = useCart();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="pt-44 pb-32 text-center">
        <p className="font-display text-3xl uppercase mb-4">Not found</p>
        <Link to="/shop" className="font-mono text-xs uppercase tracking-widest text-accent">← Back to shop</Link>
      </div>
    );
  }

  const onAdd = () => {
    if (!size) { toast.error("Select a size"); return; }
    add(product, size, qty);
    toast.success(`${product.name} added to bag`);
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <>
      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <nav className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent">Home</Link> /{" "}
            <Link to="/shop" className="hover:text-accent">Shop</Link> /{" "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-secondary overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[product.img, product.img, product.img].map((src, i) => (
                  <div key={i} className="aspect-square bg-secondary overflow-hidden opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">SO.{product.id} / {product.category}</p>
              <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-4">{product.name}</h1>
              <p className="font-mono text-xl mb-8">{formatPrice(product.price)}</p>
              <p className="text-foreground/80 leading-relaxed mb-10">{product.description}</p>

              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em]">Size</p>
                  <button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent">Size guide →</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3 font-mono text-xs uppercase tracking-widest border transition-all ${
                        size === s ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-secondary" aria-label="Decrease"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-mono">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-secondary" aria-label="Increase"><Plus className="w-4 h-4" /></button>
                </div>
                <button
                  onClick={onAdd}
                  className="flex-1 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 transition-colors"
                >
                  Add To Bag — {formatPrice(product.price * qty)}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-8">
                <Perk icon={<Truck className="w-4 h-4" />} label="Free Ship $150+" />
                <Perk icon={<RotateCcw className="w-4 h-4" />} label="30-Day Returns" />
                <Perk icon={<Shield className="w-4 h-4" />} label="Lifetime Repair" />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4 text-accent">— Details</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-3"><span className="text-accent">/</span>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="font-display text-3xl md:text-5xl uppercase mb-10">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function Perk({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-accent">{icon}</span>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
