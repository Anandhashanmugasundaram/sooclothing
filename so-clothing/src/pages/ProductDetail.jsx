// ProductDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Minus, Plus, Truck, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const selectedSizeStock = product?.sizes?.find((s) => s.size === size)?.quantity || 0;

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API}/api/products/${slug}`);
      setProduct(res.data);
      fetchRelated(res.data.category, res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const res = await axios.get(`${API}/api/products`);
      const filtered = res.data
        .filter((p) => p.category === category && p._id !== currentId && !p.isSpecialOffer)
        .slice(0, 4);
      setRelated(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    if (!size) { toast.error("Select a size"); return; }
    if (selectedSizeStock === 0) { toast.error("Out of stock"); return; }
    if (qty > selectedSizeStock) { toast.error(`Only ${selectedSizeStock} items available`); return; }
    add(product, size, qty);
    toast.success(`${product.name} added to bag`);
  };

  if (!product) {
    return (
      <div className="pt-44 pb-32 text-center">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          {/* BREADCRUMB */}
          <nav
            className="mb-8 text-foreground/50"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            {" / "}
            <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* MAIN PRODUCT */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* IMAGE */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[700px] object-cover rounded-lg"
              />
            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-28 lg:self-start">

              {/* CATEGORY EYEBROW */}
              <p
                className="text-accent uppercase mb-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.3em",
                  fontWeight: 500,
                }}
              >
                {product.category}
              </p>

              {/* PRODUCT NAME */}
              <h1
                className="uppercase leading-[0.9] mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {product.name}
              </h1>

              {/* PRICE */}
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                }}
              >
                ₹ {product.price}
              </p>

              {/* DESCRIPTION */}
              <p
                className="text-foreground/60 mb-10"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                {product.description}
              </p>

              {/* SIZE LABEL */}
              <div className="mb-8">
                <p
                  className="uppercase mb-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.3em",
                    fontWeight: 500,
                  }}
                >
                  Size
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => { setSize(s.size); setQty(1); }}
                      disabled={s.quantity === 0}
                      className={`px-5 py-3 border transition-all duration-300 ${
                        size === s.size
                          ? "bg-black text-white border-black"
                          : "hover:bg-black hover:text-white"
                      } ${s.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.2em",
                        fontWeight: 500,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.size} ({s.quantity})
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY + ADD TO BAG */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    className="w-12 text-center"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      if (qty < selectedSizeStock) setQty(qty + 1);
                      else toast.error("Stock limit reached");
                    }}
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={onAdd}
                  className="flex-1 bg-black text-white hover:bg-accent transition-colors duration-500"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Add To Bag
                </button>
              </div>

              {/* PERKS */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y mb-8">
                <Perk icon={<Truck className="w-5 h-5" />} label="Free Shipping" />
                <Perk icon={<Shield className="w-5 h-5" />} label="Secure Payment" />
              </div>

              {/* PRODUCT DETAILS */}
              <div>
                <p
                  className="uppercase mb-4"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.3em",
                    fontWeight: 500,
                  }}
                >
                  Product Details
                </p>
                <ul
                  className="space-y-2 text-foreground/60"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 300,
                    lineHeight: 1.75,
                  }}
                >
                  <li>Premium Quality Material</li>
                  <li>Comfortable Fit</li>
                  <li>Stylish Modern Design</li>
                  <li>Long Lasting Fabric</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="border-t py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          {/* Section heading */}
          <div className="mb-10">
            <p
              className="text-accent uppercase mb-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                fontWeight: 500,
              }}
            >
              — You May Also Like
            </p>
            <h2
              className="uppercase leading-[0.9]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="border p-3 rounded-lg block hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={p.image}
                  className="h-40 w-full object-contain"
                  alt={p.name}
                />
                <h2
                  className="mt-2 uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                  }}
                >
                  {p.name}
                </h2>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                  }}
                >
                  ₹{p.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Perk({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span>{icon}</span>
      <p
        className="uppercase"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          fontWeight: 400,
        }}
      >
        {label}
      </p>
    </div>
  );
}