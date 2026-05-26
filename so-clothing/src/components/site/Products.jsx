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
  const [products, setProducts] = useState([]);
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

        {/* SIDEBAR */}
        <div className="sticky top-24 h-fit">
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
                Premium streetwear, oversized fits and new drops.
              </p>

              <Link
                to="/shop"
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
                  Explore Now
                  <span className="group-hover:translate-x-1 transition">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
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
                <Link to={`/product/${product.slug}`}>

                  <div className="relative overflow-hidden rounded-[30px] bg-[#f7f7f7] border border-[#eee]">
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
                        20% offer
                      </div>
                    </div>

                    {/* IMAGE BG DECORATION */}
                    <div className="absolute inset-0">
                      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-500" />
                      <div className="absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full border-[10px] border-red-300 opacity-60" />
                    </div>

                    <div className="h-[260px] flex items-center justify-center p-4 relative z-10">
                      <img
                        src={product.image}
                        className="h-full object-contain group-hover:scale-105 transition"
                        alt={product.name}
                      />
                    </div>
                  </div>

                  {/* PRODUCT TEXT */}
                  <div className="mt-3">
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
                        ₹{Math.floor(product.price * 1.2)}
                      </span>
                    </div>

                    {/* SIZES */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {product.sizes?.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 border rounded-full hover:bg-black hover:text-white transition"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.62rem",
                            letterSpacing: "0.15em",
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
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