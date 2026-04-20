import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, formatPrice } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export function Products() {
  const sectionRef = useRef(null);
  const featured = products.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".section-head > *"), {
        opacity: 0, y: 40, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(sectionRef.current.querySelectorAll(".product-card"), {
        opacity: 0, y: 80, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current.querySelector(".product-grid"), start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="shop" ref={sectionRef} className="bg-background py-24 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="section-head flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">— Collection 01</p>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-none">The<br />Latest Drop</h2>
          </div>
          <Link to="/shop" className="font-mono text-xs uppercase tracking-[0.25em] border-b border-foreground/40 hover:border-accent hover:text-accent pb-1 transition-colors">
            View All →
          </Link>
        </div>

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-5">
        <img src={product.img} alt={product.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
        {product.tag && (
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-background/90 backdrop-blur px-3 py-1.5">
            {product.tag}
          </span>
        )}
        <span className="absolute bottom-0 left-0 right-0 bg-accent text-accent-foreground py-4 text-center font-mono text-xs uppercase tracking-[0.25em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          View Product
        </span>
      </div>
      <div className="flex justify-between items-baseline">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">SO.{product.id}</p>
          <h3 className="font-display text-lg uppercase mt-1">{product.name}</h3>
        </div>
        <p className="font-mono text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
