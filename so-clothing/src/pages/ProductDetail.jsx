// ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Minus,
  Plus,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useCart } from "@/contexts/CartContext";

gsap.registerPlugin(ScrollTrigger);

gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";
fontLink.rel = "stylesheet";

if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();

  const API =
    import.meta.env.VITE_API_URL ||
    "https://sooclothing-1.onrender.com";

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const pageRef = useRef(null);

  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const imgRevealRef = useRef(null);

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const descRef = useRef(null);

  const sizeRef = useRef(null);
  const qtyRef = useRef(null);

  const relatedRef = useRef(null);

  const selectedSizeStock =
    product?.sizes?.find((s) => s.size === size)?.quantity || 0;

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {

      gsap.set([
        imgRef.current,
        titleRef.current,
        categoryRef.current,
        priceRef.current,
        descRef.current,
      ], {
        willChange: "transform, opacity",
      });

      // MAIN FAST TIMELINE
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
          duration: 0.45,
        },
      });

      // IMAGE + TITLE SAME TIME
      tl
        .fromTo(
          imgRevealRef.current,
          {
            scaleX: 1,
            transformOrigin: "right center",
          },
          {
            scaleX: 0,
            duration: 0.65,
            ease: "power3.inOut",
          }
        )

        .from(
          imgRef.current,
          {
            scale: 1.08,
            duration: 0.65,
          },
          0
        )

        .from(
          titleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.65,
          },
          0
        )

        .from(
          categoryRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          0.05
        )

        .from(
          priceRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          0.08
        )

        .from(
          descRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          0.1
        )

        .from(
          sizeRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          0.15
        )

        .from(
          qtyRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          0.18
        );

      // IMAGE PARALLAX
      gsap.to(imgRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      // RELATED PRODUCTS
      gsap.from(".related-card", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 85%",
        },
      });

    }, pageRef);

    return () => ctx.revert();

  }, [product]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${API}/api/products/${slug}`
      );

      setProduct(res.data);

      fetchRelated(
        res.data.category,
        res.data._id
      );

    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelated = async (
    category,
    currentId
  ) => {
    try {
      const res = await axios.get(
        `${API}/api/products`
      );

      const filtered = res.data
        .filter(
          (p) =>
            p.category === category &&
            p._id !== currentId &&
            !p.isSpecialOffer
        )
        .slice(0, 4);

      setRelated(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    if (!size) {
      toast.error("Select a size");
      return;
    }

    if (selectedSizeStock === 0) {
      toast.error("Out of stock");
      return;
    }

    if (qty > selectedSizeStock) {
      toast.error(
        `Only ${selectedSizeStock} items available`
      );
      return;
    }

    add(product, size, qty);

    toast.success(
      `${product.name} added to bag`
    );

    gsap.fromTo(
      ".add-btn",
      {
        scale: 0.94,
      },
      {
        scale: 1,
        duration: 0.25,
        ease: "back.out(1.8)",
      }
    );
  };

  if (!product) {
    return (
      <div className="pt-40 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className="overflow-hidden"
    >
      <section className="pt-28 pb-20">

        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

          {/* BREADCRUMB */}
          <nav
            className="mb-8 flex items-center gap-2 text-foreground/50"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <Link
              to="/"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Home
            </Link>

            /

            <Link
              to="/shop"
              className="hover:text-accent transition-colors"
            >
              Shop
            </Link>

            /

            <span>{product.name}</span>
          </nav>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* IMAGE */}
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden rounded-lg"
            >

              {/* REVEAL */}
              <div
                ref={imgRevealRef}
                className="absolute inset-0 bg-background z-10"
              />

              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                className="w-full h-[620px] object-cover rounded-lg"
              />

              <div
                className="absolute top-4 left-4 bg-white/90 px-3 py-1"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                }}
              >
                SS'26
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-24 lg:self-start">

              {/* CATEGORY */}
              <p
                ref={categoryRef}
                className="text-accent uppercase mb-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                }}
              >
                {product.category}
              </p>

              {/* TITLE */}
              <div className="overflow-hidden">
                <h1
                  ref={titleRef}
                  className="uppercase leading-[0.9] mb-5"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                    fontSize:
                      "clamp(2.8rem,5vw,4.8rem)",
                    fontWeight: 700,
                  }}
                >
                  {product.name}
                </h1>
              </div>

              {/* PRICE */}
              <p
                ref={priceRef}
                className="mb-6"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontStyle: "italic",
                }}
              >
                ₹ {product.price}
              </p>

              {/* DESCRIPTION */}
              <p
                ref={descRef}
                className="text-foreground/60 mb-10"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.8,
                  fontSize: "15px",
                }}
              >
                {product.description}
              </p>

              {/* SIZE */}
              <div
                ref={sizeRef}
                className="mb-8"
              >
                <p
                  className="uppercase mb-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                  }}
                >
                  Size
                </p>

                <div className="flex flex-wrap gap-3">

                  {product.sizes?.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => {
                        setSize(s.size);
                        setQty(1);
                      }}
                      disabled={s.quantity === 0}
                      className={`px-5 py-3 border transition-all duration-200 ${
                        size === s.size
                          ? "bg-black text-white border-black"
                          : "hover:bg-black hover:text-white"
                      } ${
                        s.quantity === 0
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                      style={{
                        fontFamily:
                          "'DM Sans', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {s.size}
                    </button>
                  ))}

                </div>
              </div>

              {/* QUANTITY */}
              <div
                ref={qtyRef}
                className="flex gap-3 mb-8"
              >

                <div className="flex items-center border">

                  <button
                    onClick={() =>
                      setQty(Math.max(1, qty - 1))
                    }
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-12 text-center">
                    {qty}
                  </span>

                  <button
                    onClick={() => {
                      if (
                        qty < selectedSizeStock
                      ) {
                        setQty(qty + 1);
                      } else {
                        toast.error(
                          "Stock limit reached"
                        );
                      }
                    }}
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                </div>

                {/* ADD BUTTON */}
                <button
                  onClick={onAdd}
                  className="add-btn flex-1 bg-black text-white hover:bg-accent transition-all duration-300"
                  style={{
                    fontFamily:
                      "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  Add To Bag
                </button>
              </div>

              {/* PERKS */}
              <div className="grid grid-cols-2 gap-4 border-y py-6">

                <Perk
                  icon={
                    <Truck className="w-5 h-5" />
                  }
                  label="Free Shipping"
                />

                <Perk
                  icon={
                    <Shield className="w-5 h-5" />
                  }
                  label="Secure Payment"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section
        ref={relatedRef}
        className="border-t py-20"
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

          <div className="mb-10">
            <p
              className="text-accent uppercase mb-3"
              style={{
                fontFamily:
                  "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.3em",
              }}
            >
              — You May Also Like
            </p>

            <h2
              className="uppercase"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize:
                  "clamp(2rem,4vw,3.5rem)",
                fontWeight: 700,
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
                className="related-card border p-3 rounded-lg group overflow-hidden hover:shadow-lg transition-all duration-300"
              >

                <div className="overflow-hidden rounded">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2
                  className="mt-3 uppercase"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {p.name}
                </h2>

                <p
                  className="mt-1"
                  style={{
                    fontFamily:
                      "'DM Sans', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  ₹{p.price}
                </p>

              </Link>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}

function Perk({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {icon}

      <p
        className="uppercase"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.2em",
        }}
      >
        {label}
      </p>
    </div>
  );
}