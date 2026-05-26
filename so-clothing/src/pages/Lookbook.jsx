import { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function Lookbook() {
  const [offers, setOffers] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);
      const special = res.data.filter((p) => p.isSpecialOffer);
      setOffers(special);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader eyebrow="Special Offers" title="Exclusive Deal" />

      <section className="py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {offers.map((product) => (
            <div key={product._id} className="group">
              <Link to={`/product/${product.slug}`}>

                {/* CARD */}
                <div className="relative overflow-hidden rounded-[30px] bg-[#f7f7f7] border border-[#eee]">

                  {/* OFFER BADGE */}
                  <div className="absolute top-5 right-5 z-30">
                    <div
                      className="px-4 py-2 rounded-xl bg-white shadow-md text-pink-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.78rem",
                        fontStyle: "italic",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      20% OFF
                    </div>
                  </div>

                  {/* BACKGROUND SHAPES */}
                  <div className="absolute inset-0">
                    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-500" />
                    <div className="absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full border-[10px] border-red-300 opacity-60" />
                  </div>

                  {/* IMAGE */}
                  <div className="h-[260px] flex items-center justify-center p-4 relative z-10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className="mt-3">

                  {/* PRODUCT NAME */}
                  <h2
                    className="mt-2 transition-all duration-300 group-hover:text-red-500"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                      fontWeight: 600,
                      color: "#13204a",
                      letterSpacing: "0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {product.name}
                  </h2>

                  {/* CATEGORY */}
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      fontWeight: 400,
                    }}
                  >
                    {product.category}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2">
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        fontWeight: 700,
                        color: "#0f1d4d",
                        letterSpacing: "0.01em",
                      }}
                    >
                      ₹{product.price}
                    </p>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "#9ca3af",
                        textDecoration: "line-through",
                        fontWeight: 300,
                      }}
                    >
                      ₹{Math.floor(product.price * 1.2)}
                    </span>
                  </div>

                  {/* SIZES */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {product.sizes?.map((size, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 border rounded-full hover:bg-black hover:text-white transition"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.82rem",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          color: "#374151",
                        }}
                      >
                        {size.size.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}