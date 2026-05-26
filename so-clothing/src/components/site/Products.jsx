// Products.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function Products() {
  const sectionRef = useRef(null);
<<<<<<< HEAD
  const headingRef = useRef(null);
  const sidebarRef = useRef(null);
  const gridRef    = useRef(null);
  const countRef   = useRef(null);
  const lineRef    = useRef(null); // NEW: accent line under heading

  const [products, setProducts]           = useState([]);
=======
  const [products, setProducts] = useState([]);
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";

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

  // ── Animations ────────────────────────────────────────────────────
  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {

      // 1. Heading slide in from left
      gsap.from(headingRef.current, {
        opacity:  0,
        x:        -60,
        duration: 1,
        ease:     "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });

      // 2. NEW — accent line draws in under heading
      gsap.from(lineRef.current, {
        scaleX:          0,
        transformOrigin: "left center",
        duration:        1.1,
        ease:            "power3.out",
        delay:           0.3,
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });

      // 3. Sidebar card flip-in
      gsap.from(sidebarRef.current, {
        opacity:  0,
        y:        50,
        rotateX:  8,
        duration: 1,
        ease:     "power3.out",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 90%" },
      });

      // 4. Decorative circles elastic pop
      gsap.from(".deco-circle", {
        scale:           0,
        opacity:         0,
        duration:        1.2,
        stagger:         0.15,
        ease:            "elastic.out(1, 0.5)",
        transformOrigin: "center center",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 90%" },
      });

      // 5. NEW — sidebar text lines stagger
      gsap.from(".sidebar-text", {
        opacity:  0,
        y:        20,
        duration: 0.7,
        stagger:  0.12,
        ease:     "power2.out",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 88%" },
        delay: 0.3,
      });

      // 6. Product count fade + number count-up
      gsap.from(countRef.current, {
        opacity:  0,
        y:        12,
        duration: 0.7,
        scrollTrigger: { trigger: countRef.current, start: "top 90%" },
      });

      // 7. Cards stagger fade-up
      gsap.from(".product-card", {
        opacity:  0,
        y:        70,
        scale:    0.93,
        duration: 0.8,
        stagger:  0.09,
        ease:     "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      // 8. NEW — badges pop in after cards
      gsap.from(".offer-badge", {
        opacity:  0,
        scale:    0,
        duration: 0.5,
        stagger:  0.09,
        ease:     "back.out(2)",
        delay:    0.4,
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      // 9. NEW — size pills stagger per card
      gsap.from(".size-pill", {
        opacity:  0,
        scale:    0.7,
        duration: 0.4,
        stagger:  0.04,
        ease:     "back.out(1.5)",
        delay:    0.6,
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
      });

      // 10. NEW — floating pulse on sidebar logo text
      gsap.to(".sidebar-logo-dot", {
        scale:    1.6,
        opacity:  0.3,
        duration: 0.9,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  // ── Card hover (GSAP) ─────────────────────────────────────────────
  const onCardEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".card-img"),    { scale: 1.08, duration: 0.5, ease: "power2.out" });
    gsap.to(card.querySelector(".card-border"), { opacity: 1,  duration: 0.25 });
    gsap.to(card.querySelector(".quick-view"),  { opacity: 1,  y: 0, duration: 0.3, ease: "power2.out" });
    // NEW — lift the whole card
    gsap.to(card, { y: -6, duration: 0.35, ease: "power2.out" });
  };

  const onCardLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".card-img"),    { scale: 1,   duration: 0.5, ease: "power2.out" });
    gsap.to(card.querySelector(".card-border"), { opacity: 0, duration: 0.25 });
    gsap.to(card.querySelector(".quick-view"),  { opacity: 0, y: 8, duration: 0.3 });
    // NEW — settle back down with bounce
    gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  // ── Filter logic ──────────────────────────────────────────────────
  const filteredProducts = products
    .filter((p) => !p.isSpecialOffer)
    .filter((product) => {
      const sizeMatch =
        selectedSizes.length === 0 ||
        product.sizes?.some((s) => selectedSizes.includes(s.toUpperCase()));

      let priceMatch = true;
<<<<<<< HEAD
      if (selectedPrice === "0-200")    priceMatch = product.price <= 200;
      if (selectedPrice === "201-400")  priceMatch = product.price >= 201  && product.price <= 400;
      if (selectedPrice === "401-600")  priceMatch = product.price >= 401  && product.price <= 600;
      if (selectedPrice === "601-800")  priceMatch = product.price >= 601  && product.price <= 800;
      if (selectedPrice === "801-1000") priceMatch = product.price >= 801  && product.price <= 1000;
      if (selectedPrice === "1000+")    priceMatch = product.price > 1000;
=======
      if (selectedPrice === "0-200") priceMatch = product.price <= 200;
      if (selectedPrice === "201-400") priceMatch = product.price >= 201 && product.price <= 400;
      if (selectedPrice === "401-600") priceMatch = product.price >= 401 && product.price <= 600;
      if (selectedPrice === "601-800") priceMatch = product.price >= 601 && product.price <= 800;
      if (selectedPrice === "801-1000") priceMatch = product.price >= 801 && product.price <= 1000;
      if (selectedPrice === "1000+") priceMatch = product.price > 1000;
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c

      return sizeMatch && priceMatch;
    })
    .slice(0, 8);

  return (
    <section ref={sectionRef} className="py-20 px-6">

<<<<<<< HEAD
      {/* HEADING + accent line */}
      <div className="mb-8">
        <h1 ref={headingRef} className="text-3xl font-bold">
          Latest Products
        </h1>
        {/* NEW: animated accent underline */}
        <div
          ref={lineRef}
          className="mt-2 h-[3px] w-16 bg-black rounded-full"
        />
=======
      {/* SECTION HEADING */}
      <div className="mb-10">
        {/* Eyebrow */}
        <p
          className="text-accent uppercase mb-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            fontWeight: 500,
          }}
        >
          — New Drop / SS26
        </p>
        {/* Title */}
        <h1
          className="uppercase leading-[0.9]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Latest Products
        </h1>
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

        {/* ── SIDEBAR ───────────────────────────────────────────── */}
        <div className="sticky top-24 h-fit">
<<<<<<< HEAD
          <div
            ref={sidebarRef}
            className="bg-black text-white rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Deco circles */}
            <div className="deco-circle absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="deco-circle absolute -bottom-16 -left-16 w-52 h-52 bg-white/5 rounded-full" />

            <div className="relative z-10">

              {/* NEW: pulse dot + label */}
              <div className="sidebar-text flex items-center gap-2">
                <span className="sidebar-logo-dot w-2 h-2 bg-white rounded-full block" />
                <p className="text-sm tracking-[0.3em] text-gray-300">$O.CLOTHING</p>
              </div>

              <h2 className="sidebar-text text-3xl font-bold mt-4">Explore Store</h2>

              <p className="sidebar-text text-gray-300 mt-4 text-sm leading-6">
=======
          <div className="bg-black text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/5 rounded-full" />

            <div className="relative z-10">
              {/* Sidebar eyebrow */}
              <p
                className="text-gray-300 uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.3em",
                  fontWeight: 400,
                }}
              >
                $O.CLOTHING
              </p>

              {/* Sidebar title */}
              <h2
                className="mt-4 uppercase leading-[0.9]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Explore Store
              </h2>

              {/* Sidebar body */}
              <p
                className="text-gray-300 mt-4"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                Premium streetwear, oversized fits and new drops.
              </p>

              <Link
                to="/shop"
<<<<<<< HEAD
                className="
                  sidebar-text
                  group relative inline-flex items-center justify-center
                  overflow-hidden mt-6 px-7 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-black via-zinc-900 to-neutral-800
                  border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                  transition-all duration-500
                  hover:scale-105 hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
                  hover:border-white/20
                "
              >
                {/* Shimmer sweep */}
                <span className="
                  absolute inset-0
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  translate-x-[-120%] group-hover:translate-x-[120%]
                  transition-transform duration-1000 skew-x-12
                " />
                <span className="relative z-10 flex items-center gap-2">
=======
                className="group relative inline-flex items-center justify-center overflow-hidden mt-6 px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-black via-zinc-900 to-neutral-800 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)] hover:border-white/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 skew-x-12" />
                <span
                  className="relative z-10 flex items-center gap-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                  Explore Now
                  <span className="group-hover:translate-x-1 transition">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS ──────────────────────────────────────────── */}
        <div>
<<<<<<< HEAD
          <p ref={countRef} className="mb-6 text-lg">
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
=======
          {/* Count */}
          <p
            className="mb-6 text-foreground/60"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            {filteredProducts.length} Products Found
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group">
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                <Link to={`/product/${product.slug}`}>

                  {/* CARD IMAGE BOX */}
                  <div className="relative overflow-hidden rounded-[30px] bg-[#f7f7f7] border border-[#eee]">
<<<<<<< HEAD

                    {/* Hover border */}
                    {/* <div className="card-border absolute inset-0 rounded-[30px] border-2 border-black opacity-0 z-20 pointer-events-none" /> */}

                    {/* NEW: Badge with pop animation class */}
                    <div className="offer-badge absolute top-5 right-5 z-30">
                      <div className="px-4 py-2 rounded-xl bg-white shadow-md text-[13px] font-medium text-pink-500">
=======
                    {/* BADGE */}
                    <div className="absolute top-5 right-5 z-30">
                      <div
                        className="px-4 py-2 rounded-xl bg-white shadow-md text-pink-500"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                        }}
                      >
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                        20% offer
                      </div>
                    </div>

<<<<<<< HEAD
                    {/* Deco rings */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="deco-circle absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-500" />
                      <div className="deco-circle absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full border-[10px] border-red-300 opacity-60" />
=======
                    {/* IMAGE BG DECORATION */}
                    <div className="absolute inset-0">
                      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-500" />
                      <div className="absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full border-[10px] border-red-300 opacity-60" />
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                    </div>

                    {/* Image */}
                    <div className="h-[260px] flex items-center justify-center p-4 relative z-10 overflow-hidden">
                      <img
                        src={product.image}
                        className="card-img h-full object-contain"
                        style={{ willChange: "transform" }}
                        alt={product.name}
                      />
                    </div>
<<<<<<< HEAD

                    {/* Quick View chip */}
                    <div
                      className="quick-view absolute bottom-4 left-1/2 z-30 opacity-0 pointer-events-none"
                      style={{ transform: "translate(-50%, 8px)" }}
                    >
                      <span className="bg-black text-white text-[11px] font-mono tracking-widest uppercase px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                        Quick View
                      </span>
                    </div>
=======
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                  </div>

                  {/* PRODUCT TEXT */}
                  <div className="mt-3">
<<<<<<< HEAD
                    <h2 className="mt-2 font-semibold leading-snug">{product.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-base font-semibold">₹{product.price}</p>
                      <span className="text-sm text-gray-400 line-through">
=======
                    <h2
                      className="mt-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.30rem",
                        fontWeight: 900,
                        letterSpacing: "0.01em",
                        
                      }}
                    >
                      {product.name}
                    </h2>

                    <p
                      className="mt-1 text-foreground/50 uppercase"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        fontWeight: 400,
                      }}
                    >
                      {product.category}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                        }}
                      >
                        ₹{product.price}
                      </p>
                      <span
                        className="text-foreground/40 line-through"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 300,
                        }}
                      >
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
                        ₹{Math.floor(product.price * 1.2)}
                      </span>
                    </div>

                    {/* Sizes — NEW: size-pill class for stagger */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {product.sizes?.map((s, i) => (
                        <span
                          key={i}
<<<<<<< HEAD
                          className="size-pill px-2 py-1 text-xs border rounded-full hover:bg-black hover:text-white transition"
=======
                          className="px-2 py-1 border rounded-full hover:bg-black hover:text-white transition"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.62rem",
                            letterSpacing: "0.15em",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
>>>>>>> 51498b41bceff452e2098d5d0bbba793ce7a103c
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