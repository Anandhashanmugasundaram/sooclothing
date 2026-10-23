


// // ProductDetail.jsx
// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Minus, Plus, Truck, Shield } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const fontLink = document.createElement("link");
// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
// fontLink.rel = "stylesheet";

// if (!document.head.querySelector('[href*="Cormorant"]')) {
//   document.head.appendChild(fontLink);
// }

// gsap.registerPlugin(ScrollTrigger);

// export default function ProductDetail() {
//   const { slug } = useParams();
//   const { add } = useCart();

//   const API =
//     import.meta.env.VITE_API_URL ||
//     "https://sooclothing-pw64.vercel.app";

//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [size, setSize] = useState("");
//   const [qty, setQty] = useState(1);

//   const selectedSizeStock =
//     product?.sizes?.find((s) => s.size === size)?.quantity || 0;

//   const rootRef = useRef(null);
//   const imageRef = useRef(null);
//   const textRefs = useRef([]);
//   const sizeRef = useRef(null);
//   const actionRef = useRef(null);

//   const relatedRef = useRef(null);
//   const relatedItemsRef = useRef([]);

//   useEffect(() => {
//     fetchProduct();
//   }, [slug]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`${API}/api/products/${slug}`);
//       setProduct(res.data);
//       fetchRelated(res.data.category, res.data._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchRelated = async (category, currentId) => {
//     try {
//       const res = await axios.get(`${API}/api/products`);
//       const filtered = res.data
//         .filter(
//           (p) =>
//             p.category === category &&
//             p._id !== currentId &&
//             !p.isSpecialOffer
//         )
//         .slice(0, 4);

//       setRelated(filtered);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onAdd = () => {
//     if (!size) return toast.error("Select a size");
//     if (selectedSizeStock === 0)
//       return toast.error("Out of stock");

//     if (qty > selectedSizeStock) {
//       return toast.error(
//         `Only ${selectedSizeStock} items available`
//       );
//     }

//     add(product, size, qty);
//     toast.success(`${product.name} added to bag`);
//   };

//   useEffect(() => {
//     if (!product) return;

//     const ctx = gsap.context(() => {
//       gsap.from(imageRef.current, {
//         opacity: 0,
//         scale: 1.1,
//         duration: 1.2,
//         ease: "power3.out",
//       });

//       gsap.from(textRefs.current, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.15,
//         duration: 0.9,
//         ease: "power3.out",
//         delay: 0.2,
//       });

//       gsap.from(sizeRef.current, {
//         opacity: 0,
//         y: 20,
//         duration: 0.8,
//         ease: "power3.out",
//         delay: 0.4,
//       });

//       gsap.from(actionRef.current, {
//         opacity: 0,
//         y: 25,
//         duration: 0.8,
//         ease: "power3.out",
//         delay: 0.5,
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, [product]);

//   useEffect(() => {
//     if (!related.length) return;

//     const ctx = gsap.context(() => {
//       gsap.from(relatedRef.current, {
//         opacity: 0,
//         y: 60,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: relatedRef.current,
//           start: "top 85%",
//         },
//       });

//       gsap.from(relatedItemsRef.current, {
//         opacity: 0,
//         y: 40,
//         scale: 0.95,
//         duration: 0.8,
//         stagger: 0.12,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: relatedRef.current,
//           start: "top 80%",
//         },
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, [related]);

//   if (!product) {
//     return (
//       <div className="pt-44 pb-32 text-center">
//         <p className="text-3xl font-light">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div ref={rootRef}>
//       <section className="pt-28 lg:pt-32 pb-20">
//         <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
//           <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
//             {/* IMAGE */}
//             <div>
//               <img
//                 ref={imageRef}
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[700px] object-cover rounded-lg"
//               />
//             </div>

//             {/* DETAILS */}
//             <div className="lg:sticky lg:top-28 lg:self-start">
//               <p ref={(el) => (textRefs.current[0] = el)}>
//                 {product.category}
//               </p>

//               <h1
//                 ref={(el) => (textRefs.current[1] = el)}
//                 className="uppercase text-4xl font-bold mb-4"
//               >
//                 {product.name}
//               </h1>

//               <p
//                 ref={(el) => (textRefs.current[2] = el)}
//                 className="text-xl mb-2"
//               >
//                 ₹ {product.price}
//               </p>

//               {/* ✅ STOCK INFO */}
//               {size && (
//                 <p className="text-sm text-gray-500 mb-6">
//                   {selectedSizeStock > 0
//                     ? `${selectedSizeStock} items available`
//                     : "Out of stock"}
//                 </p>
//               )}

//               <p
//                 ref={(el) => (textRefs.current[3] = el)}
//                 className="text-gray-500 mb-10"
//               >
//                 {product.description}
//               </p>

//               {/* SIZE */}
//               <div ref={sizeRef} className="flex gap-3 flex-wrap mb-4">
//                 {product.sizes?.map((s) => (
//                   <button
//                     key={s.size}
//                     onClick={() => {
//                       setSize(s.size);
//                       setQty(1);
//                     }}
//                     className={`px-4 py-2 border transition ${
//                       size === s.size
//                         ? "bg-black text-white"
//                         : ""
//                     }`}
//                   >
//                     {s.size}
//                   </button>
//                 ))}
//               </div>

//               {/* QTY */}
//               <div
//                 ref={actionRef}
//                 className="flex gap-3 mb-6 items-center"
//               >
//                 <button
//                   onClick={() => setQty(Math.max(1, qty - 1))}
//                 >
//                   <Minus />
//                 </button>

//                 <span>{qty}</span>

//                 <button
//                   onClick={() => {
//                     if (!size)
//                       return toast.error("Select size first");

//                     if (qty >= selectedSizeStock) {
//                       toast.error(
//                         `Only ${selectedSizeStock} items available`
//                       );
//                       return;
//                     }

//                     setQty((q) => q + 1);
//                   }}
//                 >
//                   <Plus />
//                 </button>

//                 <button
//                   onClick={onAdd}
//                   className="bg-black text-white px-6 py-2"
//                 >
//                   Add To Bag
//                 </button>
//               </div>

//               {/* PERKS */}
//               <div className="flex gap-6">
//                 <Truck />
//                 <Shield />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* RELATED */}
//       <section ref={relatedRef} className="border-t py-20">
//         <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
//           <h2 className="text-3xl font-bold uppercase mb-10">
//             Related Products
//           </h2>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {related.map((p, i) => (
//               <Link
//                 key={p._id}
//                 to={`/product/${p.slug}`}
//                 ref={(el) =>
//                   (relatedItemsRef.current[i] = el)
//                 }
//                 className="group border p-3 rounded-lg"
//               >
//                 <img
//                   src={p.image}
//                   className="h-40 w-full object-contain group-hover:scale-110 transition"
//                   alt={p.name}
//                 />
//                 <h2 className="mt-2 uppercase">{p.name}</h2>
//                 <p>₹{p.price}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// ProductDetail.jsx
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Minus, Plus, Truck, Shield, ArrowUpRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Google Fonts injection
if (!document.head.querySelector('[href*="Cormorant"]')) {
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   Scoped styles (uses !important on size buttons so any global
   `button:hover { background: black }` rule can't override them)
------------------------------------------------------------------- */
const styles = `
:root {
  --pd-accent: #0f766e;        /* teal  – selected */
  --pd-accent-dark: #115e59;   /* teal  – selected hover */
  --pd-accent-soft: #ccfbf1;   /* light teal – hover bg */
  --pd-accent-border: #5eead4; /* hover border */
}

.pd-display { font-family: 'Cormorant Garamond', serif; }
.pd-body    { font-family: 'DM Sans', sans-serif; }

/* ---------- SIZE BUTTONS ---------- */
.pd-size {
  min-width: 52px;
  padding: 10px 18px;
  border: 1px solid #d4d4d8 !important;
  background: #ffffff !important;
  color: #3f3f46 !important;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background .25s ease, color .25s ease, border-color .25s ease,
              transform .25s ease, box-shadow .25s ease;
}
.pd-size:hover:not(:disabled) {
  background: var(--pd-accent-soft) !important;
  border-color: var(--pd-accent-border) !important;
  color: var(--pd-accent-dark) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px -6px rgba(15, 118, 110, .35);
}
.pd-size.is-active,
.pd-size.is-active:hover {
  background: var(--pd-accent) !important;
  border-color: var(--pd-accent) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 18px -8px rgba(15, 118, 110, .6);
}
.pd-size:disabled {
  opacity: .4;
  cursor: not-allowed;
  text-decoration: line-through;
}
.pd-size:focus-visible,
.pd-card:focus-visible {
  outline: 2px solid var(--pd-accent);
  outline-offset: 3px;
}

/* ---------- QTY + ADD TO BAG ---------- */
.pd-qty-btn {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid #d4d4d8;
  border-radius: 999px;
  background: #fff;
  color: #3f3f46;
  transition: all .25s ease;
}
.pd-qty-btn:hover {
  background: var(--pd-accent-soft);
  border-color: var(--pd-accent-border);
  color: var(--pd-accent-dark);
}
.pd-add {
  background: var(--pd-accent);
  color: #fff;
  padding: 11px 30px;
  border-radius: 999px;
  font-weight: 500;
  letter-spacing: .04em;
  transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
}
.pd-add:hover {
  background: var(--pd-accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 12px 22px -10px rgba(15, 118, 110, .6);
}

/* ---------- RELATED CARD ---------- */
.pd-card {
  display: block;
  position: relative;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
}
.pd-card-inner {
  position: relative;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #ececec;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: box-shadow .5s ease, border-color .5s ease;
  will-change: transform;
}
.pd-card:hover .pd-card-inner {
  border-color: var(--pd-accent-border);
  box-shadow: 0 30px 50px -28px rgba(15, 118, 110, .45);
}

.pd-card-media {
  position: relative;
  aspect-ratio: 4 / 5;
  background: linear-gradient(160deg, #f5f5f4 0%, #e7e5e4 100%);
  overflow: hidden;
}
.pd-card-media img {
  width: 100%; height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.1s cubic-bezier(.19, 1, .22, 1);
}
.pd-card:hover .pd-card-media img { transform: scale(1.12); }

/* light sweep across image */
.pd-card-media::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%);
  transform: translateX(-120%);
  transition: transform 1s ease;
  pointer-events: none;
}
.pd-card:hover .pd-card-media::after { transform: translateX(120%); }

/* "View" pill sliding in */
.pd-card-view {
  position: absolute;
  right: 14px; bottom: 14px;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 999px;
  background: #fff;
  color: var(--pd-accent-dark);
  box-shadow: 0 10px 20px -8px rgba(0,0,0,.3);
  opacity: 0;
  transform: translateY(14px) scale(.8);
  transition: opacity .45s ease, transform .55s cubic-bezier(.19, 1, .22, 1),
              background .3s ease, color .3s ease;
}
.pd-card:hover .pd-card-view {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.pd-card-view:hover { background: var(--pd-accent); color: #fff; }

.pd-card-body { padding: 16px 18px 20px; }
.pd-card-cat {
  font-size: 12px;
  letter-spacing: .08em;
  color: #78716c;
  margin-bottom: 4px;
}
.pd-card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.15;
  color: #1c1917;
  position: relative;
  display: inline-block;
  padding-bottom: 6px;
}
/* underline that draws itself */
.pd-card-name::after {
  content: "";
  position: absolute; left: 0; bottom: 0;
  width: 100%; height: 1px;
  background: var(--pd-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .6s cubic-bezier(.19, 1, .22, 1);
}
.pd-card:hover .pd-card-name::after { transform: scaleX(1); }
.pd-card-price {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 500;
  color: var(--pd-accent-dark);
}

@media (prefers-reduced-motion: reduce) {
  .pd-card-media img,
  .pd-card-media::after,
  .pd-card-view,
  .pd-card-name::after,
  .pd-size,
  .pd-add { transition: none !important; }
}
`;

/* ------------------------------------------------------------------
   Related product card with subtle 3D tilt
------------------------------------------------------------------- */
function RelatedCard({ product, cardRef }) {
  const tiltRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e) => {
    if (reduceMotion || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(tiltRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      y: -8,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!tiltRef.current) return;
    gsap.to(tiltRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      ref={cardRef}
      className="pd-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={tiltRef} className="pd-card-inner">
        <div className="pd-card-media">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="pd-card-view" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>

        <div className="pd-card-body pd-body">
          <p className="pd-card-cat">{product.category}</p>
          <h3 className="pd-card-name">{product.name}</h3>
          <p className="pd-card-price">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();

  const API =
    import.meta.env.VITE_API_URL || "https://sooclothing-pw64.vercel.app";

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const selectedSizeStock =
    product?.sizes?.find((s) => s.size === size)?.quantity || 0;

  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);
  const sizeRef = useRef(null);
  const actionRef = useRef(null);

  const relatedRef = useRef(null);
  const relatedHeadingRef = useRef(null);
  const relatedItemsRef = useRef([]);

  useEffect(() => {
    setSize("");
    setQty(1);
    window.scrollTo({ top: 0 });
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!size) return toast.error("Select a size");
    if (selectedSizeStock === 0) return toast.error("Out of stock");

    if (qty > selectedSizeStock) {
      return toast.error(`Only ${selectedSizeStock} items available`);
    }

    add(product, size, qty);
    toast.success(`${product.name} added to bag`);
  };

  // ================= MAIN ANIMATIONS =================
  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(textRefs.current.filter(Boolean), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(sizeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(actionRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [product]);

  // ================= RELATED ANIMATION =================
  useEffect(() => {
    if (!related.length) return;

    const ctx = gsap.context(() => {
      gsap.from(relatedHeadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 85%",
        },
      });

      gsap.from(relatedItemsRef.current.filter(Boolean), {
        opacity: 0,
        y: 60,
        rotateX: -12,
        transformPerspective: 900,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 80%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [related]);

  if (!product) {
    return (
      <div className="pt-44 pb-32 text-center">
        <p className="pd-display text-3xl font-light tracking-wide">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="pd-body">
      <style>{styles}</style>

      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* IMAGE */}
            <div className="overflow-hidden rounded-2xl">
              <img
                ref={imageRef}
                src={product.image}
                alt={product.name}
                className="w-full h-[700px] object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p
                ref={(el) => (textRefs.current[0] = el)}
                className="text-sm tracking-wider text-gray-500 mb-2"
              >
                {product.category}
              </p>

              <h1
                ref={(el) => (textRefs.current[1] = el)}
                className="pd-display uppercase text-4xl lg:text-5xl font-semibold mb-4"
              >
                {product.name}
              </h1>

              <p
                ref={(el) => (textRefs.current[2] = el)}
                className="text-xl mb-2"
                style={{ color: "var(--pd-accent-dark)" }}
              >
                ₹ {product.price}
              </p>

              {/* STOCK INFO */}
              {size && (
                <p className="text-sm text-gray-500 mb-6">
                  {selectedSizeStock > 0
                    ? `${selectedSizeStock} items available`
                    : "Out of stock"}
                </p>
              )}

              <p
                ref={(el) => (textRefs.current[3] = el)}
                className="text-gray-500 mb-10 leading-relaxed"
              >
                {product.description}
              </p>

              {/* SIZE */}
              <div ref={sizeRef} className="flex gap-3 flex-wrap mb-6">
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    disabled={s.quantity === 0}
                    onClick={() => {
                      setSize(s.size);
                      setQty(1);
                    }}
                    className={`pd-size ${size === s.size ? "is-active" : ""}`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* QTY */}
              <div ref={actionRef} className="flex gap-3 mb-8 items-center">
                <button
                  type="button"
                  className="pd-qty-btn"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center">{qty}</span>

                <button
                  type="button"
                  className="pd-qty-btn"
                  aria-label="Increase quantity"
                  onClick={() => {
                    if (!size) return toast.error("Select size first");

                    if (qty >= selectedSizeStock) {
                      toast.error(`Only ${selectedSizeStock} items available`);
                      return;
                    }

                    setQty((q) => q + 1);
                  }}
                >
                  <Plus size={16} />
                </button>

                <button type="button" onClick={onAdd} className="pd-add ml-2">
                  Add To Bag
                </button>
              </div>

              {/* PERKS */}
              <div
                className="flex gap-6"
                style={{ color: "var(--pd-accent)" }}
              >
                <Truck />
                <Shield />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section ref={relatedRef} className="border-t py-20">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <h2
              ref={relatedHeadingRef}
              className="pd-display text-3xl lg:text-4xl font-semibold mb-10"
            >
              You may also like
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
              {related.map((p, i) => (
                <RelatedCard
                  key={p._id}
                  product={p}
                  cardRef={(el) => (relatedItemsRef.current[i] = el)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}