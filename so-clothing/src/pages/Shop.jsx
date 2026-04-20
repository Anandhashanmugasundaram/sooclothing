import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/Products";
import { PageHeader } from "@/components/site/PageHeader";

const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

export default function Shop() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = cat === "all" ? products : products.filter((p) => p.category === cat);
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  return (
    <>
      <PageHeader eyebrow="Collection 01" title="Shop">
        Every piece in the SS26 drop. Crafted in small batches, restocked rarely.
      </PageHeader>

      <section className="py-12 border-b border-border sticky top-20 bg-background/90 backdrop-blur-xl z-30">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-2 border transition-all ${
                  cat === c ? "bg-accent border-accent text-accent-foreground" : "border-border hover:border-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low</option>
              <option value="high">Price: High</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {list.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">Nothing here.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
