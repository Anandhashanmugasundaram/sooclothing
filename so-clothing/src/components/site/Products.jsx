import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Products() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const sidebarRef = useRef(null);
  const gridRef = useRef(null);
  const countRef = useRef(null);
  const lineRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const API = import.meta.env.VITE_API_URL || https://sooclothing-pw64.vercel.app/;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, x: -60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });

      gsap.from(lineRef.current, {
        scaleX: 0, transformOrigin: "left center", duration: 1.1,
        ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });

      gsap.from(sidebarRef.current, {
        opacity: 0, y: 50, rotateX: 8, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 90%" },
      });

      gsap.from(".deco-circle", {
        scale: 0, opacity: 0, duration: 1.2, stagger: 0.15,
        ease: "elastic.out(1, 0.5)", transformOrigin: "center center",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 90%" },
      });

      gsap.from(".sidebar-text", {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.12,
        ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: sidebarRef.current, start: "top 88%" },
      });

      gsap.from(countRef.current, {
        opacity: 0, y: 12, duration: 0.7,
        scrollTrigger: { trigger: countRef.current, start: "top 90%" },
      });

      gsap.from(".product-card", {
        opacity: 0, y: 70, scale: 0.93, duration: 0.8, stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      gsap.from(".offer-badge", {
        opacity: 0, scale: 0, duration: 0.5, stagger: 0.09,
        ease: "back.out(2)", delay: 0.4,
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      gsap.from(".size-pill", {
        opacity: 0, scale: 0.7, duration: 0.4, stagger: 0.04,
        ease: "back.out(1.5)", delay: 0.6,
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      gsap.to(".sidebar-logo-dot", {
        scale: 1.6, opacity: 0.3, duration: 0.9,
        repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  const onCardEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".card-img"), { scale: 1.08, duration: 0.5, ease: "power2.out" });
    gsap.to(card.querySelector(".card-border"), { opacity: 1, duration: 0.25 });
    gsap.to(card.querySelector(".quick-view"), { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(card, { y: -6, duration: 0.35, ease: "power2.out" });
  };

  const onCardLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".card-img"), { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(card.querySelector(".card-border"), { opacity: 0, duration: 0.25 });
    gsap.to(card.querySelector(".quick-view"), { opacity: 0, y: 8, duration: 0.3 });
    gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const filteredProducts = products
    .filter((p) => !p.isSpecialOffer)
    .filter((product) => {
      const sizeMatch =
        selectedSizes.length === 0 ||
        product.sizes?.some((s) => selectedSizes.includes(s.toUpperCase()));

      let priceMatch = true;
      if (selectedPrice === "0-200") priceMatch = product.price <= 200;
      if (selectedPrice === "201-400") priceMatch = product.price >= 201 && product.price <= 400;
      if (selectedPrice === "401-600") priceMatch = product.price >= 401 && product.price <= 600;
      if (selectedPrice === "601-800") priceMatch = product.price >= 601 && product.price <= 800;
      if (selectedPrice === "801-1000") priceMatch = product.price >= 801 && product.price <= 1000;
      if (selectedPrice === "1000+") priceMatch = product.price > 1000;

      return sizeMatch && priceMatch;
    })
    .slice(0, 8);

  return (
    <section ref={sectionRef} className="py-20 px-6">

      {/* HEADING */}
      <div className="mb-8">
        <h1
          ref={headingRef}
          className="text-3xl font-bold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Latest Products
        </h1>
        <div ref={lineRef} className="mt-2 h-[3px] w-16 bg-black rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

        {/* SIDEBAR */}
        <div className="sticky top-24 h-fit">
          <div
            ref={sidebarRef}
            className="bg-black text-white rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="deco-circle absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="deco-circle absolute -bottom-16 -left-16 w-52 h-52 bg-white/5 rounded-full" />

            <div className="relative z-10">

              {/* Label */}
              <div className="sidebar-text flex items-center gap-2">
                <span className="sidebar-logo-dot w-2 h-2 bg-white rounded-full block" />
                <p
                  className="text-sm tracking-[0.3em] text-gray-300"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  $O.CLOTHING
                </p>
              </div>

              {/* Title */}
              <h2
                className="sidebar-text text-3xl font-bold mt-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Explore Store
              </h2>

              {/* Description */}
              <p
                className="sidebar-text text-gray-300 mt-4 text-sm leading-6"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Premium streetwear, oversized fits and new drops every season.
              </p>

              {/* Explore All Button */}
             <Link
  to="/shop"
  className="sidebar-text group relative mt-8 flex items-center justify-between w-full px-6 py-4 rounded-2xl border border-white/25 overflow-hidden"
  style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.2em" }}
  onMouseEnter={(e) => {
    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector(".btn-fill"), { scaleY: 1, duration: 0.45, ease: "power3.out" });
    gsap.to(e.currentTarget.querySelector(".btn-arrow"), { x: 5, duration: 0.3, ease: "power2.out" });
  }}
  onMouseLeave={(e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.5)" });
    gsap.to(e.currentTarget.querySelector(".btn-fill"), { scaleY: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(e.currentTarget.querySelector(".btn-arrow"), { x: 0, duration: 0.3, ease: "power2.out" });
  }}
>
  {/* White fill slides up on hover */}
  <span
    className="btn-fill absolute inset-0 bg-white origin-bottom rounded-2xl"
    style={{ transform: "scaleY(0)" }}
  />

  {/* LEFT: label */}
  <span className="relative z-10 uppercase text-white group-hover:text-black transition-colors duration-300">
    Explore All
  </span>

  {/* RIGHT: arrow in a circle */}
  <span className="relative z-10 w-7 h-7 rounded-full border border-white/40 group-hover:border-black/40 flex items-center justify-center transition-colors duration-300">
    <ArrowRight className="btn-arrow w-3.5 h-3.5 text-white group-hover:text-black transition-colors duration-300" />
  </span>
</Link>

            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <p
            ref={countRef}
            className="mb-6 text-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {filteredProducts.length} Products Found
          </p>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="product-card group cursor-pointer"
                style={{ willChange: "transform" }}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="relative overflow-hidden rounded-[30px] bg-[#f7f7f7] border border-[#eee]">

                    <div className="offer-badge absolute top-5 right-5 z-30">
                      <div className="px-4 py-2 rounded-xl bg-white shadow-md text-[13px] font-medium text-pink-500">
                        20% offer
                      </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="deco-circle absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-500" />
                      <div className="deco-circle absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full border-[10px] border-red-300 opacity-60" />
                    </div>

                    <div className="h-[260px] flex items-center justify-center p-4 relative z-10 overflow-hidden">
                      <img
                        src={product.image}
                        className="card-img h-full object-contain"
                        style={{ willChange: "transform" }}
                        alt={product.name}
                      />
                    </div>

                    <div
                      className="quick-view absolute bottom-4 left-1/2 z-30 opacity-0 pointer-events-none"
                      style={{ transform: "translate(-50%, 8px)" }}
                    >
                      <span className="bg-black text-white text-[11px] tracking-widest uppercase px-4 py-2 rounded-full whitespace-nowrap shadow-lg"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        Quick View
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h2
                      className="mt-2 font-semibold leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
                    >
                      {product.name}
                    </h2>

                    <p
                      className="text-sm text-gray-500 mt-1"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                    >
                      {product.category}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <p
                        className="text-2xl font-semibold"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ₹{product.price}
                      </p>
                      <span
                        className="text-sm text-gray-400 line-through"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        ₹{Math.floor(product.price * 1.2)}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      {product.sizes?.map((s, i) => (
                        <span
                          key={i}
                          className="size-pill px-2 py-1 text-xs border rounded-full hover:bg-black hover:text-white transition"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {s.size.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}