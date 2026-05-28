// // ProductDetail.jsx
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Minus, Plus, Truck, Shield } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";

// // Google Fonts injection
// const fontLink = document.createElement("link");
// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
// fontLink.rel = "stylesheet";
// if (!document.head.querySelector('[href*="Cormorant"]')) {
//   document.head.appendChild(fontLink);
// }

// export default function ProductDetail() {
//   const { slug } = useParams();
//   const { add } = useCart();
//   const API =
//     import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";
//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [size, setSize] = useState("");
//   const [qty, setQty] = useState(1);
//   const selectedSizeStock =
//     product?.sizes?.find((s) => s.size === size)?.quantity || 0;

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
//             p.category === category && p._id !== currentId && !p.isSpecialOffer,
//         )
//         .slice(0, 4);
//       setRelated(filtered);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onAdd = () => {
//     if (!size) {
//       toast.error("Select a size");
//       return;
//     }
//     if (selectedSizeStock === 0) {
//       toast.error("Out of stock");
//       return;
//     }
//     if (qty > selectedSizeStock) {
//       toast.error(`Only ${selectedSizeStock} items available`);
//       return;
//     }
//     add(product, size, qty);
//     toast.success(`${product.name} added to bag`);
//   };

//   if (!product) {
//     return (
//       <div className="pt-44 pb-32 text-center">
//         <p
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "clamp(1.8rem, 4vw, 3rem)",
//             fontWeight: 300,
//             letterSpacing: "0.05em",
//           }}
//         >
//           Loading...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="pt-28 lg:pt-32 pb-20">
//         <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
//           {/* BREADCRUMB */}
//           <nav
//             className="mb-8 text-foreground/50"
//             style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "0.72rem",
//               letterSpacing: "0.15em",
//               fontWeight: 400,
//               textTransform: "uppercase",
//             }}
//           >
//             <Link to="/" className="hover:text-accent transition-colors">
//               Home
//             </Link>
//             {" / "}
//             <Link to="/shop" className="hover:text-accent transition-colors">
//               Shop
//             </Link>
//             {" / "}
//             <span className="text-foreground">{product.name}</span>
//           </nav>

//           {/* MAIN PRODUCT */}
//           <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
//             {/* IMAGE */}
//             <div>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[700px] object-cover rounded-lg"
//               />
//             </div>

//             {/* DETAILS */}
//             <div className="lg:sticky lg:top-28 lg:self-start">
//               {/* CATEGORY EYEBROW */}
//               <p
//                 className="text-accent uppercase mb-3"
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.68rem",
//                   letterSpacing: "0.3em",
//                   fontWeight: 500,
//                 }}
//               >
//                 {product.category}
//               </p>

//               {/* PRODUCT NAME */}
//               <h1
//                 className="uppercase leading-[0.9] mb-4"
//                 style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
//                   fontWeight: 700,
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 {product.name}
//               </h1>

//               {/* PRICE */}
//               <p
//                 className="mb-8"
//                 style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
//                   fontWeight: 400,
//                   fontStyle: "italic",
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 ₹ {product.price}
//               </p>

//               {/* DESCRIPTION */}
//               <p
//                 className="text-foreground/60 mb-10"
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.92rem",
//                   fontWeight: 300,
//                   lineHeight: 1.75,
//                 }}
//               >
//                 {product.description}
//               </p>

//               {/* SIZE LABEL */}
//               <div className="mb-8">
//                 <p
//                   className="uppercase mb-3"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.62rem",
//                     letterSpacing: "0.3em",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Size
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   {product.sizes?.map((s) => (
//                     <button
//                       key={s.size}
//                       onClick={() => {
//                         setSize(s.size);
//                         setQty(1);
//                       }}
//                       disabled={s.quantity === 0}
//                       className={`px-5 py-3 border transition-all duration-300 ${
//                         size === s.size
//                           ? "bg-black text-white border-black"
//                           : "hover:bg-black hover:text-white"
//                       } ${s.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: "0.68rem",
//                         letterSpacing: "0.2em",
//                         fontWeight: 500,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {s.size} ({s.quantity})
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* QUANTITY + ADD TO BAG */}
//               <div className="flex gap-3 mb-6">
//                 <div className="flex items-center border">
//                   <button
//                     onClick={() => setQty(Math.max(1, qty - 1))}
//                     className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span
//                     className="w-12 text-center"
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: "0.9rem",
//                       fontWeight: 400,
//                     }}
//                   >
//                     {qty}
//                   </span>
//                   <button
//                     onClick={() => {
//                       if (qty < selectedSizeStock) setQty(qty + 1);
//                       else toast.error("Stock limit reached");
//                     }}
//                     className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <button
//                   onClick={onAdd}
//                   className="flex-1 bg-black text-white hover:bg-accent transition-colors duration-500"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.68rem",
//                     letterSpacing: "0.3em",
//                     textTransform: "uppercase",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Add To Bag
//                 </button>
//               </div>

//               {/* PERKS */}
//               <div className="grid grid-cols-2 gap-4 py-6 border-y mb-8">
//                 <Perk
//                   icon={<Truck className="w-5 h-5" />}
//                   label="Free Shipping"
//                 />
//                 <Perk
//                   icon={<Shield className="w-5 h-5" />}
//                   label="Secure Payment"
//                 />
//               </div>

//               {/* PRODUCT DETAILS */}
//               <div>
//                 <p
//                   className="uppercase mb-4"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.62rem",
//                     letterSpacing: "0.3em",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Product Details
//                 </p>
//                 <ul
//                   className="space-y-2 text-foreground/60"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.88rem",
//                     fontWeight: 300,
//                     lineHeight: 1.75,
//                   }}
//                 >
//                   <li>Premium Quality Material</li>
//                   <li>Comfortable Fit</li>
//                   <li>Stylish Modern Design</li>
//                   <li>Long Lasting Fabric</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* RELATED PRODUCTS */}
//       <section className="border-t py-20">
//         <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
//           {/* Section heading */}
//           <div className="mb-10">
//             <p
//               className="text-accent uppercase mb-3"
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.68rem",
//                 letterSpacing: "0.3em",
//                 fontWeight: 500,
//               }}
//             >
//               — You May Also Like
//             </p>
//             <h2
//               className="uppercase leading-[0.9]"
//               style={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: "clamp(2rem, 4vw, 3.5rem)",
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Related Products
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {related.map((p) => (
//               <Link
//                 key={p._id}
//                 to={`/product/${p.slug}`}
//                 className="border p-3 rounded-lg block hover:scale-[1.02] transition-transform duration-300"
//               >
//                 <img
//                   src={p.image}
//                   className="h-40 w-full object-contain"
//                   alt={p.name}
//                 />
//                 <h2
//                   className="mt-2 uppercase"
//                   style={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                     letterSpacing: "0.01em",
//                   }}
//                 >
//                   {p.name}
//                 </h2>
//                 <p
//                   className="mt-1"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.85rem",
//                     fontWeight: 400,
//                   }}
//                 >
//                   ₹{p.price}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// function Perk({ icon, label }) {
//   return (
//     <div className="flex flex-col items-center gap-2 text-center">
//       <span>{icon}</span>
//       <p
//         className="uppercase"
//         style={{
//           fontFamily: "'DM Sans', sans-serif",
//           fontSize: "0.62rem",
//           letterSpacing: "0.3em",
//           fontWeight: 400,
//         }}
//       >
//         {label}
//       </p>
//     </div>
//   );
// }

// ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Minus, Plus, Truck, Shield, ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/contexts/CartContext";

gsap.registerPlugin(ScrollTrigger);

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap";
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
  const [imgLoaded, setImgLoaded] = useState(false);

  // Refs
  const pageRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const imgRevealRef = useRef(null);
  const detailsRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const categoryRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descRef = useRef(null);
  const sizeRef = useRef(null);
  const qtyRef = useRef(null);
  const perksRef = useRef(null);
  const detailListRef = useRef(null);
  const relatedSectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const floatingLabelRef = useRef(null);
  const imageTagRef = useRef(null);
  const bgPanelRef = useRef(null);
  const priceDividerRef = useRef(null);

  const selectedSizeStock = product?.sizes?.find((s) => s.size === size)?.quantity || 0;

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // ── Scroll progress bar ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── GSAP animations after product loads ─────────────────────────
  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {

      // ── Page entrance timeline ───────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        // Background accent panel slides in from left
        .from(bgPanelRef.current, {
          x: "-100%",
          duration: 0.4,
          ease: "expo.inOut",
        })

        // Breadcrumb slides in from left
        .from(breadcrumbRef.current, { x: -40, opacity: 0, duration: 0.7 }, "-=0.6")

        // Image reveal — curtain wipe
        .fromTo(
          imgRevealRef.current,
          { scaleX: 1, transformOrigin: "right center" },
          { scaleX: 0, duration: 1.1, ease: "expo.inOut" },
          "-=0.3"
        )

        // Image itself scales in from slight zoom
        .from(imgRef.current, { scale: 1.12, duration: 1.4, ease: "power2.out" }, "-=1.1")

        // Corner tag bounces in
        .from(imageTagRef.current, {
          scale: 0,
          rotate: -15,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2.5)",
        }, "-=0.4")

        // Category eyebrow
        .from(categoryRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.5")

        // Product name
        .from(nameRef.current, {
          yPercent: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
        }, "-=0.4")

        // Price
        .from(priceRef.current, {
          opacity: 0,
          x: -20,
          scale: 0.92,
          duration: 0.6,
          ease: "back.out(1.8)",
        }, "-=0.5")

        // Description
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");

      // Size, qty, perks, details animated separately with clearProps
      // so they ALWAYS end up fully visible regardless of timeline state
      gsap.from(sizeRef.current,       { opacity: 0, y: 16, duration: 0.5, delay: 1.4,  ease: "power3.out", clearProps: "all" });
      gsap.from(qtyRef.current,        { opacity: 0, y: 16, duration: 0.5, delay: 1.55, ease: "power3.out", clearProps: "all" });
      gsap.from(perksRef.current,      { opacity: 0, y: 16, duration: 0.5, delay: 1.7,  ease: "power3.out", clearProps: "all" });
      gsap.from(detailListRef.current, { opacity: 0, y: 16, duration: 0.5, delay: 1.85, ease: "power3.out", clearProps: "all" });

      // ── Scroll: Sticky image parallax ───────────────────────────
      if (imgWrapRef.current) {
        gsap.to(imgRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ── Scroll: Image wrapper subtle skew ───────────────────────
      gsap.to(imgWrapRef.current, {
        skewY: -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 2,
        },
      });

      // ── Scroll: Background panel drifts right ───────────────────
      gsap.to(bgPanelRef.current, {
        x: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // ── Size buttons stagger in after parent fades in ────────────
      gsap.from(".size-btn", {
        opacity: 0,
        scale: 0.85,
        stagger: 0.07,
        duration: 0.5,
        ease: "back.out(1.6)",
        delay: 1.5,
        clearProps: "all",
      });

      // ── Scroll: Price divider draws in (uses ref, not class) ────
      gsap.fromTo(priceDividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      }, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });

      // ── Scroll: Perks icon bounce — delay-based ──────────────────
      gsap.from(".perk-icon", {
        scale: 0,
        rotate: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(2)",
        delay: 1.8,
      });

      // ── Scroll: Product detail list items stagger ────────────────
      gsap.from(".detail-li", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailListRef.current,
          start: "top 90%",
        },
      });

      // ── Scroll: Detail dots pop in ───────────────────────────────
      gsap.from(".detail-dot", {
        scale: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: detailListRef.current,
          start: "top 92%",
        },
      });

      // ── Related section animations ───────────────────────────────
      if (relatedSectionRef.current) {

        // Tinted background on scroll enter
        gsap.fromTo(relatedSectionRef.current, {
          backgroundColor: "transparent",
        }, {
          backgroundColor: "rgba(232,76,30,0.03)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: relatedSectionRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        });

        // Heading wipe
        gsap.from(".related-heading", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: relatedSectionRef.current,
            start: "top 80%",
          },
        });

        // Heading underline draws in
        gsap.fromTo(".related-underline", {
          scaleX: 0,
          transformOrigin: "left center",
        }, {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: relatedSectionRef.current,
            start: "top 78%",
          },
        });

        // Cards stagger in
        gsap.from(".related-card", {
          opacity: 0,
          y: 60,
          scale: 0.94,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".related-grid",
            start: "top 85%",
          },
        });

        // Cards subtle rotateX on scroll
        gsap.to(".related-card", {
          rotateX: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".related-grid",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        });

        // Cards float up/down loop
        gsap.to(".related-card", {
          y: -6,
          stagger: { each: 0.08, yoyo: true, repeat: -1 },
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Card images parallax
        gsap.to(".related-card img", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".related-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Eyebrow color fade in
        ScrollTrigger.create({
          trigger: relatedSectionRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.fromTo(".related-eyebrow", {
              color: "transparent",
            }, {
              color: "#e84c1e",
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // ── Floating "Add to Bag" label on scroll down ────────────────
      ScrollTrigger.create({
        trigger: qtyRef.current,
        start: "bottom top",
        onEnter: () => {
          if (floatingLabelRef.current) {
            gsap.fromTo(
              floatingLabelRef.current,
              { y: 80, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
          }
        },
        onLeaveBack: () => {
          if (floatingLabelRef.current) {
            gsap.to(floatingLabelRef.current, { y: 80, opacity: 0, duration: 0.4, ease: "power3.in" });
          }
        },
      });

      // ── Progress bar color shifts when related section enters ────
      ScrollTrigger.create({
        trigger: relatedSectionRef.current,
        start: "top 50%",
        onEnter: () => {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              backgroundColor: "#111",
              duration: 0.6,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              backgroundColor: "#e84c1e",
              duration: 0.4,
            });
          }
        },
      });

      // ── Breadcrumb fades out as you scroll down ──────────────────
      gsap.to(breadcrumbRef.current, {
        opacity: 0,
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "200px top",
          end: "400px top",
          scrub: true,
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, [product]);

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

    const btn = document.querySelector(".add-to-bag-btn");
    if (btn) {
      gsap.timeline()
        .to(btn, { scale: 0.93, duration: 0.1, ease: "power2.in" })
        .to(btn, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.4)" });
    }
  };

  if (!product) {
    return (
      <div className="pt-44 pb-32 text-center">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="h-[700px] bg-foreground/5 animate-pulse rounded-lg" />
            <div className="space-y-6 pt-8">
              <div className="h-4 w-24 bg-foreground/5 animate-pulse" />
              <div className="h-20 w-full bg-foreground/5 animate-pulse" />
              <div className="h-8 w-32 bg-foreground/5 animate-pulse" />
              <div className="h-24 w-full bg-foreground/5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative overflow-x-hidden">

      {/* Decorative background accent panel */}
      <div
        ref={bgPanelRef}
        className="fixed top-0 left-0 h-full w-[40vw] -z-10 pointer-events-none"
        style={{ background: "rgba(232,76,30,0.03)", willChange: "transform" }}
      />

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-[2px] bg-accent transition-none"
        ref={progressBarRef}
        style={{ width: "0%", willChange: "width" }}
      />

      {/* Floating sticky "Add to bag" bar */}
      <div
        ref={floatingLabelRef}
        className="fixed bottom-6 left-1/2 z-40 pointer-events-auto"
        style={{ transform: "translateX(-50%) translateY(80px)", opacity: 0 }}
      >
        <button
          onClick={onAdd}
          className="add-to-bag-btn flex items-center gap-4 bg-accent text-white px-10 py-4 shadow-2xl hover:bg-primary transition-colors duration-500 animate-pulse"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            animationDuration: "3s",
          }}
        >
          {size ? `Add ${size} To Bag` : "Select A Size First"}
        </button>
      </div>

      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          {/* BREADCRUMB */}
          <nav
            ref={breadcrumbRef}
            className="mb-8 text-foreground/50 flex items-center gap-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Home
            </Link>
            {" / "}
            <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* MAIN PRODUCT GRID */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* IMAGE */}
            <div ref={imgWrapRef} className="relative overflow-hidden" style={{ willChange: "transform" }}>
              <div
                ref={imgRevealRef}
                className="absolute inset-0 bg-background z-10"
                style={{ transformOrigin: "right center" }}
              />
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                className="w-full h-[700px] object-cover rounded-lg"
                style={{ willChange: "transform" }}
              />
              <div
                ref={imageTagRef}
                className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#e84c1e",
                }}
              >
                SS '26
              </div>
              {/* Subtle animated corner accent lines */}
              <div className="absolute bottom-4 right-4 pointer-events-none animate-pulse" style={{ animationDuration: "4s" }}>
                <div className="w-8 h-[1px] bg-accent/60 mb-1" />
                <div className="w-4 h-[1px] bg-accent/40" />
              </div>
            </div>

            {/* DETAILS */}
            <div ref={detailsRef} className="lg:sticky lg:top-28 lg:self-start">

              {/* CATEGORY EYEBROW */}
              <p
                ref={categoryRef}
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
              <div style={{ overflow: "hidden" }}>
                <h1
                  ref={nameRef}
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
              </div>

              {/* PRICE */}
              <p
                ref={priceRef}
                className="mb-6"
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

              {/* Animated divider line — uses ref not class */}
              <div
                ref={priceDividerRef}
                className="h-[1px] bg-foreground/10 mb-8 origin-left"
                style={{ willChange: "transform" }}
              />

              {/* DESCRIPTION */}
              <p
                ref={descRef}
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

              {/* SIZE */}
              <div ref={sizeRef} className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.3em",
                      fontWeight: 500,
                    }}
                  >
                    Size
                  </p>
                  {size && (
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: selectedSizeStock > 0 ? "#e84c1e" : "inherit",
                        textTransform: "uppercase",
                      }}
                    >
                      {selectedSizeStock > 0 ? `${selectedSizeStock} left` : "Out of stock"}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => { setSize(s.size); setQty(1); }}
                      disabled={s.quantity === 0}
                      className={`size-btn px-5 py-3 border transition-all duration-300 ${
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
                      {s.size}
                      {s.quantity <= 3 && s.quantity > 0 && (
                        <span className="animate-pulse" style={{ color: "#e84c1e", marginLeft: 4, fontSize: "0.55rem" }}>
                          {s.quantity}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY + ADD TO BAG */}
              <div ref={qtyRef} className="flex gap-3 mb-6">
                <div className="flex items-center border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.2, ease: "back.out(2)" })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.4)" })}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    className="w-12 text-center"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 400 }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      if (qty < selectedSizeStock) setQty(qty + 1);
                      else toast.error("Stock limit reached");
                    }}
                    className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.2, ease: "back.out(2)" })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.4)" })}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={onAdd}
                  className="add-to-bag-btn flex-1 bg-black text-white hover:bg-accent transition-colors duration-500 relative overflow-hidden group"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget.querySelector(".btn-fill"), {
                      scaleX: 1, duration: 0.45, ease: "power3.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget.querySelector(".btn-fill"), {
                      scaleX: 0, duration: 0.35, ease: "power3.in",
                    });
                  }}
                >
                  <span
                    className="btn-fill absolute inset-0 bg-accent"
                    style={{ transform: "scaleX(0)", transformOrigin: "left center", willChange: "transform" }}
                  />
                  <span className="relative z-10">Add To Bag</span>
                </button>
              </div>

              {/* PERKS */}
              <div ref={perksRef} className="grid grid-cols-2 gap-4 py-6 border-y mb-8">
                <Perk icon={<Truck className="w-5 h-5 perk-icon" />} label="Free Shipping" />
                <Perk icon={<Shield className="w-5 h-5 perk-icon" />} label="Secure Payment" />
              </div>

              {/* PRODUCT DETAILS */}
              <div ref={detailListRef}>
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
                  {["Premium Quality Material", "Comfortable Fit", "Stylish Modern Design", "Long Lasting Fabric"].map(
                    (item) => (
                      <li key={item} className="detail-li flex items-center gap-2">
                        <span
                          className="detail-dot"
                          style={{
                            width: 4,
                            height: 4,
                            background: "#e84c1e",
                            borderRadius: "50%",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section ref={relatedSectionRef} className="border-t py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          <div className="related-heading mb-10">
            <p
              className="related-eyebrow text-accent uppercase mb-3"
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
            {/* Animated underline */}
            <div
              className="related-underline mt-3 h-[1px] bg-foreground/20 origin-left"
              style={{ willChange: "transform" }}
            />
          </div>

          <div className="related-grid grid grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "800px" }}>
            {related.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="related-card border p-3 rounded-lg block group relative overflow-hidden transition-shadow duration-500 hover:shadow-lg"
                style={{ willChange: "transform" }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), { scale: 1.06, duration: 0.6, ease: "power2.out" });
                  gsap.to(e.currentTarget.querySelector(".card-overlay"), { opacity: 1, duration: 0.4 });
                  gsap.to(e.currentTarget, { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", duration: 0.4, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), { scale: 1, duration: 0.5, ease: "power2.out" });
                  gsap.to(e.currentTarget.querySelector(".card-overlay"), { opacity: 0, duration: 0.4 });
                  gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.5, ease: "elastic.out(1, 0.5)" });
                }}
              >
                <div className="overflow-hidden rounded">
                  <img
                    src={p.image}
                    className="h-40 w-full object-contain transition-none"
                    alt={p.name}
                    style={{ willChange: "transform" }}
                  />
                </div>
                <div
                  className="card-overlay absolute inset-0 flex items-center justify-center pointer-events-none rounded-lg"
                  style={{ background: "rgba(0,0,0,0.08)", opacity: 0 }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#e84c1e",
                      background: "rgba(0,0,0,0.85)",
                      padding: "8px 16px",
                    }}
                  >
                    View Product
                  </span>
                </div>
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
                <p className="mt-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 400 }}>
                  ₹{p.price}
                </p>
                {/* Animated accent line on hover */}
                <div className="mt-2 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
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