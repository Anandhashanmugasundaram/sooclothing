

// import { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Search } from "lucide-react";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { PageHeader } from "@/components/site/PageHeader";

// gsap.registerPlugin(ScrollTrigger);

// // GOOGLE FONT
// const fontLink = document.createElement("link");

// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";

// fontLink.rel = "stylesheet";

// if (!document.head.querySelector('[href*="Cormorant"]')) {
//   document.head.appendChild(fontLink);
// }

// const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

// const API = import.meta.env.VITE_API_URL;

// const ITEMS_PER_PAGE = 8;

// export default function Shop() {
//   const [products, setProducts] = useState([]);

//   // CATEGORY
//   const [cat, setCat] = useState("all");

//   // SORT
//   const [sort, setSort] = useState("featured");

//   // PAGINATION
//   const [page, setPage] = useState(1);

//   // SEARCH
//   const [search, setSearch] = useState("");

//   // SIZE FILTER
//   const [selectedSizes, setSelectedSizes] = useState([]);

//   // PRICE FILTER
//   const [selectedPrice, setSelectedPrice] = useState("");

//   // REFS
//   const pageRef = useRef(null);
//   const filterRef = useRef(null);
//   const productsRef = useRef(null);

//   // FETCH PRODUCTS
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API}/api/products`);

//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // SIZE FILTER HANDLER
//   const handleSizeChange = (size) => {
//     if (selectedSizes.includes(size)) {
//       setSelectedSizes(selectedSizes.filter((s) => s !== size));
//     } else {
//       setSelectedSizes([...selectedSizes, size]);
//     }
//   };

//   // FILTER + SEARCH + SORT
//   const filteredList = useMemo(() => {
//     let l =
//       cat === "all"
//         ? products.filter((p) => !p.isSpecialOffer)
//         : products.filter(
//             (p) =>
//               p.category?.toLowerCase() === cat.toLowerCase() &&
//               !p.isSpecialOffer,
//           );

//     // SEARCH
//     if (search.trim()) {
//       const text = search.toLowerCase();

//       l = l.filter((p) => p.name?.toLowerCase().includes(text));
//     }

//     // SIZE
//     if (selectedSizes.length > 0) {
//       l = l.filter((product) =>
//         product.sizes?.some((s) =>
//           selectedSizes.includes(s.size.toUpperCase()),
//         ),
//       );
//     }

//     // PRICE
//     if (selectedPrice === "0-200") {
//       l = l.filter((p) => p.price <= 200);
//     }

//     if (selectedPrice === "201-400") {
//       l = l.filter((p) => p.price >= 201 && p.price <= 400);
//     }

//     if (selectedPrice === "401-600") {
//       l = l.filter((p) => p.price >= 401 && p.price <= 600);
//     }

//     if (selectedPrice === "601-800") {
//       l = l.filter((p) => p.price >= 601 && p.price <= 800);
//     }

//     if (selectedPrice === "801-1000") {
//       l = l.filter((p) => p.price >= 801 && p.price <= 1000);
//     }

//     if (selectedPrice === "1000+") {
//       l = l.filter((p) => p.price > 1000);
//     }

//     // SORT
//     if (sort === "low") {
//       l = [...l].sort((a, b) => a.price - b.price);
//     }

//     if (sort === "high") {
//       l = [...l].sort((a, b) => b.price - a.price);
//     }

//     return l;
//   }, [products, cat, sort, search, selectedSizes, selectedPrice]);

//   // PAGINATION
//   const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

//   const paginatedList = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;

//     return filteredList.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredList, page]);

//   // RESET PAGE
//   useEffect(() => {
//     setPage(1);
//   }, [cat, sort, search, selectedSizes, selectedPrice]);

//   // GSAP
//   useEffect(() => {
//     // PREVENT DUPLICATE STRICT MODE ANIMATIONS
//     if (pageRef.current?.dataset.animated) return;

//     pageRef.current.dataset.animated = "true";

//     const ctx = gsap.context(() => {
//       // TOP CONTROLS
//       gsap.from(".shop-top-animate", {
//         y: 40,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.12,
//         ease: "power3.out",
//       });

//       // FILTER SIDEBAR
//       gsap.from(filterRef.current, {
//         scrollTrigger: {
//           trigger: filterRef.current,
//           start: "top 85%",
//         },
//         x: -80,
//         opacity: 0,
//         duration: 1,
//         ease: "power4.out",
//       });

//       // PRODUCT CARDS
//       gsap.from(".product-card-animate", {
//         scrollTrigger: {
//           trigger: productsRef.current,
//           start: "top 88%",
//         },
//         y: 80,
//         opacity: 0,
//         scale: 0.95,
//         duration: 1,
//         stagger: 0.1,
//         ease: "power3.out",
//       });

//       // FLOATING SHAPES
//       gsap.to(".floating-shape-1", {
//         y: 20,
//         duration: 4,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       gsap.to(".floating-shape-2", {
//         y: -20,
//         duration: 5,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       // IMAGE FLOAT
//       gsap.to(".product-image", {
//         y: -8,
//         duration: 2.5,
//         stagger: 0.08,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     }, pageRef);

//     return () => {
//       ctx.revert();

//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={pageRef}
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//       className="overflow-hidden"
//     >
//       {/* PAGE HEADER */}
//       <PageHeader eyebrow="Collection 01" title="Shop">
//         Every piece in the SS26 drop.
//       </PageHeader>

//       {/* SEARCH + CATEGORY + SORT */}
//       <section className="py-12 border-b">
//         <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           {/* SEARCH */}
//           <div className="relative w-full lg:w-[350px] shop-top-animate">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="
//                 w-full border px-5 py-3 pl-12 rounded-xl outline-none
//                 focus:border-black transition-all duration-300
//                 focus:scale-[1.02]
//               "
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.875rem",
//                 letterSpacing: "0.02em",
//               }}
//             />

//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//               size={18}
//             />
//           </div>

//           {/* CATEGORY */}
//           <div className="flex flex-wrap gap-3 justify-center shop-top-animate">
//             {cats.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setCat(c)}
//                 className={`
//                   px-6 py-3 border rounded-xl capitalize
//                   transition-all duration-500
//                   hover:-translate-y-1 hover:shadow-lg
//                   ${
//                     cat === c
//                       ? "bg-black text-white"
//                       : "hover:bg-black hover:text-white"
//                   }
//                 `}
//                 style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: "1rem",
//                   fontWeight: 500,
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>

//           {/* SORT */}
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="
//               border px-5 py-3 rounded-xl outline-none
//               transition-all duration-300 hover:shadow-md
//               shop-top-animate
//             "
//             style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "0.875rem",
//               letterSpacing: "0.03em",
//             }}
//           >
//             <option value="featured">Featured</option>
//             <option value="low">Price Low</option>
//             <option value="high">Price High</option>
//           </select>
//         </div>
//       </section>

//       {/* MAIN */}
//       <section className="py-16">
//         <div className="w-full px-4 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
//             {/* FILTER SIDEBAR */}
//             <div
//               ref={filterRef}
//               className="border rounded-2xl p-6 h-fit sticky top-24"
//             >
//               {/* PRICE */}
//               <div>
//                 <div className="flex items-center justify-between mb-5">
//                   <h2
//                     className="text-xl font-semibold"
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1.35rem",
//                       fontWeight: 600,
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     Price Range
//                   </h2>

//                   <button
//                     onClick={() => setSelectedPrice("")}
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: "0.75rem",
//                       letterSpacing: "0.08em",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Reset
//                   </button>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {[
//                     { label: "Below ₹200", value: "0-200" },
//                     { label: "₹201 - ₹400", value: "201-400" },
//                     { label: "₹401 - ₹600", value: "401-600" },
//                     { label: "₹601 - ₹800", value: "601-800" },
//                     { label: "₹801 - ₹1000", value: "801-1000" },
//                     { label: "Above ₹1000", value: "1000+" },
//                   ].map((item) => (
//                     <button
//                       key={item.value}
//                       onClick={() => setSelectedPrice(item.value)}
//                       className={`
//                         px-4 py-2 border rounded-full text-sm
//                         transition-all duration-300 hover:scale-105
//                         ${
//                           selectedPrice === item.value
//                             ? "bg-black text-white"
//                             : "hover:bg-black hover:text-white"
//                         }
//                       `}
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: "0.78rem",
//                         letterSpacing: "0.02em",
//                       }}
//                     >
//                       {item.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* SIZE */}
//               <div className="mt-10">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2
//                     className="text-xl font-semibold"
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1.35rem",
//                       fontWeight: 600,
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     Size
//                   </h2>

//                   <button
//                     onClick={() => setSelectedSizes([])}
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: "0.75rem",
//                       letterSpacing: "0.08em",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Reset
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {["S", "M", "L", "XL"].map((size) => (
//                     <label
//                       key={size}
//                       className="
//                         flex items-center gap-3 cursor-pointer
//                         transition-all duration-300 hover:translate-x-1
//                       "
//                       style={{
//                         fontFamily: "'Cormorant Garamond', serif",
//                         fontSize: "1.05rem",
//                         fontWeight: 500,
//                         letterSpacing: "0.08em",
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedSizes.includes(size)}
//                         onChange={() => handleSizeChange(size)}
//                       />

//                       <span>{size}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* PRODUCTS */}
//             <div ref={productsRef}>
//               <p
//                 className="mb-10 text-lg"
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "0.85rem",
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   fontWeight: 500,
//                   color: "#888",
//                 }}
//               >
//                 {filteredList.length} Products Found
//               </p>

//               {/* GRID */}
//               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//                 {paginatedList.map((p) => (
//                   <ProductCard key={p._id} product={p} />
//                 ))}
//               </div>

//               {/* PAGINATION */}
//               <div className="flex justify-center items-center gap-3 flex-wrap mt-14">
//                 {/* PREV */}
//                 <button
//                   onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={page === 1}
//                   className={`
//                     px-4 py-2 border rounded-lg
//                     transition-all duration-300 hover:-translate-y-1
//                     ${
//                       page === 1
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:bg-black hover:text-white"
//                     }
//                   `}
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.8rem",
//                     letterSpacing: "0.06em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Prev
//                 </button>

//                 {/* PAGE NUMBERS */}
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setPage(i + 1)}
//                     className={`
//                       px-4 py-2 border rounded-lg
//                       transition-all duration-300 hover:-translate-y-1
//                       ${
//                         page === i + 1
//                           ? "bg-black text-white"
//                           : "hover:bg-black hover:text-white"
//                       }
//                     `}
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1rem",
//                       fontWeight: page === i + 1 ? 600 : 400,
//                     }}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 {/* NEXT */}
//                 <button
//                   onClick={() =>
//                     setPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={page === totalPages}
//                   className={`
//                     px-4 py-2 border rounded-lg
//                     transition-all duration-300 hover:-translate-y-1
//                     ${
//                       page === totalPages
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:bg-black hover:text-white"
//                     }
//                   `}
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.8rem",
//                     letterSpacing: "0.06em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // PRODUCT CARD
// export function ProductCard({ product }) {
//   return (
//     <div className="group w-full product-card-animate">
//       <Link to={`/product/${product.slug}`}>
//         {/* CARD */}
//         <div
//           className="
//             relative overflow-hidden rounded-[28px]
//             bg-[#f7f7f7] border border-[#ededed]
//             transition-all duration-500
//             hover:-translate-y-2
//             hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
//           "
//         >
//           {/* BG SHAPES */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="floating-shape-1 absolute -top-16 -left-8 w-[140px] h-[140px] rounded-full border border-red-300"></div>

//             <div className="floating-shape-2 absolute right-[-28px] top-[110px] w-[90px] h-[180px] rounded-full border-[8px] border-pink-200 opacity-70"></div>
//           </div>

//           {/* OFFER */}
//           <div className="absolute top-4 right-4 z-20">
//             <div
//               className="
//                 px-3 py-2 rounded-xl bg-white shadow-md text-pink-500
//                 transition-all duration-500
//                 group-hover:rotate-3 group-hover:scale-110
//               "
//               style={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: "0.78rem",
//                 fontStyle: "italic",
//                 fontWeight: 500,
//                 letterSpacing: "0.04em",
//               }}
//             >
//               20% offer
//             </div>
//           </div>

//           {/* IMAGE */}
//           <div
//             className="
//               relative overflow-hidden rounded-[28px]
//               h-[220px] sm:h-[280px] lg:h-[340px]
//               p-5 z-10 flex items-center justify-center
//             "
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="
//                 product-image
//                 w-full h-full object-contain
//                 transition-all duration-700
//                 group-hover:scale-[1.05]
//                 group-hover:rotate-2
//               "
//             />
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="pt-5 px-1">
//           {/* NAME */}
//           <h2
//             className="
//               leading-snug line-clamp-2
//               transition-all duration-300
//               group-hover:text-red-500
//             "
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
//               fontWeight: 600,
//               color: "#13204a",
//               letterSpacing: "0.01em",
//               lineHeight: 1.25,
//             }}
//           >
//             {product.name}
//           </h2>

//           {/* CATEGORY */}
//           <p
//             className="mt-1 capitalize"
//             style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "0.72rem",
//               letterSpacing: "0.14em",
//               textTransform: "uppercase",
//               color: "#9ca3af",
//               fontWeight: 400,
//             }}
//           >
//             {product.category}
//           </p>

//           {/* PRICE */}
//           <div className="flex items-center gap-3 mt-3">
//             <p
//               style={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
//                 fontWeight: 700,
//                 color: "#0f1d4d",
//                 letterSpacing: "0.01em",
//               }}
//             >
//               ₹ {product.price}
//             </p>

//             <span
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "0.85rem",
//                 color: "#9ca3af",
//                 textDecoration: "line-through",
//                 fontWeight: 300,
//               }}
//             >
//               ₹ {Math.floor(product.price * 1.2)}
//             </span>
//           </div>

//           {/* SIZES */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             {product.sizes?.map((size, index) => (
//               <span
//                 key={index}
//                 className="
//                   min-w-[42px] h-9 px-3
//                   flex items-center justify-center
//                   rounded-full border border-gray-200 bg-white
//                   hover:border-black hover:bg-black hover:text-white
//                   transition-all duration-300 hover:scale-110
//                 "
//                 style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: "0.85rem",
//                   fontWeight: 500,
//                   letterSpacing: "0.1em",
//                   color: "#374151",
//                 }}
//               >
//                 {size.size.toUpperCase()}
//               </span>
//             ))}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PageHeader } from "@/components/site/PageHeader";

gsap.registerPlugin(ScrollTrigger);

// GOOGLE FONT
if (!document.head.querySelector('[href*="Cormorant"]')) {
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

// CARD + SIZE CHIP STYLES (injected once)
// Hover color: teal. Hover lift/scale/rotate use the individual `translate`,
// `scale` and `rotate` CSS properties so they never clash with GSAP, which
// writes inline `transform` on animated elements.
if (!document.getElementById("shop-card-styles")) {
  const style = document.createElement("style");
  style.id = "shop-card-styles";
  style.innerHTML = `
    /* ---------- SIZE CHIP ---------- */
    .size-chip {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      min-width: 42px;
      height: 36px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      background: #fff;
      color: #374151;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      cursor: pointer;
      translate: 0 0;
      scale: 1;
      animation: chip-in .55s cubic-bezier(.19, 1, .22, 1) backwards;
      animation-delay: var(--chip-delay, 0ms);
      transition:
        translate .5s cubic-bezier(.19, 1, .22, 1),
        scale .5s cubic-bezier(.19, 1, .22, 1),
        color .4s ease .05s,
        border-color .4s ease,
        letter-spacing .5s cubic-bezier(.19, 1, .22, 1),
        box-shadow .5s ease;
    }

    /* teal fill that blooms outward from the bottom centre */
    .size-chip::before {
      content: "";
      position: absolute;
      inset: -1px;
      z-index: -2;
      background: linear-gradient(135deg, #022c22 0%, #0f766e 60%, #14b8a6 100%);
      clip-path: circle(0% at 50% 110%);
      transition: clip-path .6s cubic-bezier(.19, 1, .22, 1);
    }

    /* shine that passes across once on hover */
    .size-chip::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 45%;
      z-index: -1;
      background: linear-gradient(
        105deg,
        transparent 0%,
        rgba(255, 255, 255, .5) 50%,
        transparent 100%
      );
      translate: -160% 0;
      transition: translate 0s;
      pointer-events: none;
    }

    .size-chip:hover {
      color: #fff;
      border-color: #0f766e;
      letter-spacing: 0.16em;
      translate: 0 -3px;
      scale: 1.1;
      box-shadow:
        0 10px 18px -8px rgba(15, 118, 110, .55),
        0 0 0 3px rgba(20, 184, 166, .22);
    }

    .size-chip:hover::before {
      clip-path: circle(150% at 50% 110%);
    }

    .size-chip:hover::after {
      translate: 360% 0;
      transition: translate .8s cubic-bezier(.19, 1, .22, 1) .12s;
    }

    .size-chip:active {
      scale: .94;
      translate: 0 -1px;
    }

    @keyframes chip-in {
      from { opacity: 0; scale: .7; translate: 0 10px; }
      to   { opacity: 1; scale: 1;  translate: 0 0; }
    }

    /* ---------- PRODUCT CARD ---------- */
    .shop-card {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      translate: 0 0;
      transition:
        translate .6s cubic-bezier(.19, 1, .22, 1),
        box-shadow .6s ease,
        border-color .4s ease;
    }

    /* soft teal bloom rising from the bottom of the card */
    .shop-card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      background: radial-gradient(
        circle at 50% 100%,
        rgba(20, 184, 166, .26) 0%,
        rgba(204, 251, 241, .45) 55%,
        rgba(240, 253, 250, .2) 100%
      );
      clip-path: circle(0% at 50% 110%);
      transition: clip-path .75s cubic-bezier(.19, 1, .22, 1);
      pointer-events: none;
    }

    .shop-link:hover .shop-card {
      translate: 0 -8px;
      border-color: #14b8a6;
      box-shadow:
        0 22px 40px -18px rgba(15, 118, 110, .45),
        0 0 0 3px rgba(20, 184, 166, .18);
    }

    .shop-link:hover .shop-card::before {
      clip-path: circle(150% at 50% 110%);
    }

    /* diagonal shine across the card */
    .shop-card-shine {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 40%;
      z-index: 25;
      pointer-events: none;
      background: linear-gradient(
        105deg,
        transparent 0%,
        rgba(255, 255, 255, .7) 50%,
        transparent 100%
      );
      translate: -160% 0;
      transition: translate 0s;
    }

    .shop-link:hover .shop-card-shine {
      translate: 380% 0;
      transition: translate .95s cubic-bezier(.19, 1, .22, 1) .1s;
    }

    /* image tilt + zoom */
    .shop-card-img {
      scale: 1;
      rotate: 0deg;
      transition:
        scale .8s cubic-bezier(.19, 1, .22, 1),
        rotate .8s cubic-bezier(.19, 1, .22, 1),
        filter .6s ease;
    }

    .shop-link:hover .shop-card-img {
      scale: 1.07;
      rotate: 2deg;
      filter: drop-shadow(0 18px 18px rgba(15, 118, 110, .28));
    }

    /* offer badge: pings continuously, turns teal on hover */
    .shop-badge {
      position: relative;
      padding: 8px 12px;
      border-radius: 12px;
      background: #fff;
      color: #ec4899;
      box-shadow: 0 4px 10px -2px rgba(0, 0, 0, .12);
      rotate: 0deg;
      scale: 1;
      transition:
        rotate .5s cubic-bezier(.19, 1, .22, 1),
        scale .5s cubic-bezier(.19, 1, .22, 1),
        background-color .4s ease,
        color .4s ease;
    }

    .shop-badge::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 2px solid currentColor;
      opacity: 0;
      animation: badge-ping 2.4s ease-out infinite;
      pointer-events: none;
    }

    .shop-link:hover .shop-badge {
      rotate: 4deg;
      scale: 1.1;
      background: #0f766e;
      color: #fff;
    }

    @keyframes badge-ping {
      0%   { opacity: .6; transform: scale(1); }
      100% { opacity: 0;  transform: scale(1.5); }
    }

    /* quick view pill slides up on hover */
    .shop-quick-view {
      position: absolute;
      bottom: 16px;
      left: 50%;
      z-index: 30;
      opacity: 0;
      translate: -50% 14px;
      pointer-events: none;
      transition:
        opacity .4s ease,
        translate .5s cubic-bezier(.19, 1, .22, 1);
    }

    .shop-link:hover .shop-quick-view {
      opacity: 1;
      translate: -50% 0;
    }

    /* name: colour change + underline that draws in */
    .shop-name-text {
      background: linear-gradient(currentColor, currentColor) left bottom / 0% 1px no-repeat;
      transition:
        background-size .6s cubic-bezier(.19, 1, .22, 1),
        color .4s ease;
    }

    .shop-link:hover .shop-name-text {
      color: #0f766e;
      background-size: 100% 1px;
    }

    /* price nudges right and turns teal */
    .shop-price {
      translate: 0 0;
      transition:
        translate .5s cubic-bezier(.19, 1, .22, 1),
        color .4s ease;
    }

    .shop-link:hover .shop-price {
      translate: 4px 0;
      color: #0f766e !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .size-chip,
      .size-chip::before,
      .size-chip::after,
      .shop-card,
      .shop-card::before,
      .shop-card-shine,
      .shop-card-img,
      .shop-badge,
      .shop-badge::after,
      .shop-quick-view,
      .shop-name-text,
      .shop-price { transition: none !important; animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

const API = import.meta.env.VITE_API_URL;

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [products, setProducts] = useState([]);

  // CATEGORY
  const [cat, setCat] = useState("all");

  // SORT
  const [sort, setSort] = useState("featured");

  // PAGINATION
  const [page, setPage] = useState(1);

  // SEARCH
  const [search, setSearch] = useState("");

  // SIZE FILTER
  const [selectedSizes, setSelectedSizes] = useState([]);

  // PRICE FILTER
  const [selectedPrice, setSelectedPrice] = useState("");

  // REFS
  const pageRef = useRef(null);
  const filterRef = useRef(null);
  const productsRef = useRef(null);

  // FETCH PRODUCTS
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

  // SIZE FILTER HANDLER
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // FILTER + SEARCH + SORT
  const filteredList = useMemo(() => {
    let l =
      cat === "all"
        ? products.filter((p) => !p.isSpecialOffer)
        : products.filter(
            (p) =>
              p.category?.toLowerCase() === cat.toLowerCase() &&
              !p.isSpecialOffer,
          );

    // SEARCH
    if (search.trim()) {
      const text = search.toLowerCase();

      l = l.filter((p) => p.name?.toLowerCase().includes(text));
    }

    // SIZE
    if (selectedSizes.length > 0) {
      l = l.filter((product) =>
        product.sizes?.some((s) =>
          selectedSizes.includes(s.size.toUpperCase()),
        ),
      );
    }

    // PRICE
    if (selectedPrice === "0-200") {
      l = l.filter((p) => p.price <= 200);
    }

    if (selectedPrice === "201-400") {
      l = l.filter((p) => p.price >= 201 && p.price <= 400);
    }

    if (selectedPrice === "401-600") {
      l = l.filter((p) => p.price >= 401 && p.price <= 600);
    }

    if (selectedPrice === "601-800") {
      l = l.filter((p) => p.price >= 601 && p.price <= 800);
    }

    if (selectedPrice === "801-1000") {
      l = l.filter((p) => p.price >= 801 && p.price <= 1000);
    }

    if (selectedPrice === "1000+") {
      l = l.filter((p) => p.price > 1000);
    }

    // SORT
    if (sort === "low") {
      l = [...l].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      l = [...l].sort((a, b) => b.price - a.price);
    }

    return l;
  }, [products, cat, sort, search, selectedSizes, selectedPrice]);

  // PAGINATION
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const paginatedList = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, page]);

  // RESET PAGE
  useEffect(() => {
    setPage(1);
  }, [cat, sort, search, selectedSizes, selectedPrice]);

  // GSAP (page-level: runs once)
  useEffect(() => {
    // PREVENT DUPLICATE STRICT MODE ANIMATIONS
    if (pageRef.current?.dataset.animated) return;

    pageRef.current.dataset.animated = "true";

    const ctx = gsap.context(() => {
      // TOP CONTROLS
      gsap.from(".shop-top-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      // FILTER SIDEBAR
      gsap.from(filterRef.current, {
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 85%",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }, pageRef);

    return () => {
      ctx.revert();

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // GSAP (cards: re-runs whenever the visible set of cards changes)
  // Products load async, so the cards don't exist yet when the page-level
  // effect above runs. This effect waits until they are on screen.
  const cardKey = paginatedList.map((p) => p._id).join(",");

  useEffect(() => {
    if (!cardKey || !productsRef.current) return;

    const ctx = gsap.context(() => {
      // PRODUCT CARDS
      gsap.from(".product-card-animate", {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 92%",
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // FLOATING SHAPES
      gsap.to(".floating-shape-1", {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-shape-2", {
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // IMAGE FLOAT (on the wrapper, so the img's CSS hover never clashes)
      gsap.to(".product-image", {
        y: -8,
        duration: 2.5,
        stagger: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, productsRef);

    return () => ctx.revert();
  }, [cardKey]);

  return (
    <div
      ref={pageRef}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="overflow-hidden"
    >
      {/* PAGE HEADER */}
      <PageHeader eyebrow="Collection 01" title="Shop">
        Every piece in the SS26 drop.
      </PageHeader>

      {/* SEARCH + CATEGORY + SORT */}
      <section className="py-12 border-b">
        <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* SEARCH */}
          <div className="relative w-full lg:w-[350px] shop-top-animate">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full border px-5 py-3 pl-12 rounded-xl outline-none
                focus:border-black transition-all duration-300
                focus:scale-[1.02]
              "
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                letterSpacing: "0.02em",
              }}
            />

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-3 justify-center shop-top-animate">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`
                  px-6 py-3 border rounded-xl capitalize
                  transition-all duration-500
                  hover:-translate-y-1 hover:shadow-lg
                  ${
                    cat === c
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }
                `}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              border px-5 py-3 rounded-xl outline-none
              transition-all duration-300 hover:shadow-md
              shop-top-animate
            "
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              letterSpacing: "0.03em",
            }}
          >
            <option value="featured">Featured</option>
            <option value="low">Price Low</option>
            <option value="high">Price High</option>
          </select>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-16">
        <div className="w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            {/* FILTER SIDEBAR */}
            <div
              ref={filterRef}
              className="border rounded-2xl p-6 h-fit sticky top-24"
            >
              {/* PRICE */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Price Range
                  </h2>

                  <button
                    onClick={() => setSelectedPrice("")}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Below ₹200", value: "0-200" },
                    { label: "₹201 - ₹400", value: "201-400" },
                    { label: "₹401 - ₹600", value: "401-600" },
                    { label: "₹601 - ₹800", value: "601-800" },
                    { label: "₹801 - ₹1000", value: "801-1000" },
                    { label: "Above ₹1000", value: "1000+" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setSelectedPrice(item.value)}
                      className={`
                        px-4 py-2 border rounded-full text-sm
                        transition-all duration-300 hover:scale-105
                        ${
                          selectedPrice === item.value
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }
                      `}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-5">
                  <h2
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Size
                  </h2>

                  <button
                    onClick={() => setSelectedSizes([])}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  {["S", "M", "L", "XL"].map((size) => (
                    <label
                      key={size}
                      className="
                        flex items-center gap-3 cursor-pointer
                        transition-all duration-300 hover:translate-x-1
                      "
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />

                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <div ref={productsRef}>
              <p
                className="mb-10 text-lg"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#888",
                }}
              >
                {filteredList.length} Products Found
              </p>

              {/* GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {paginatedList.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center items-center gap-3 flex-wrap mt-14">
                {/* PREV */}
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`
                    px-4 py-2 border rounded-lg
                    transition-all duration-300 hover:-translate-y-1
                    ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                    }
                  `}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`
                      px-4 py-2 border rounded-lg
                      transition-all duration-300 hover:-translate-y-1
                      ${
                        page === i + 1
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }
                    `}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: page === i + 1 ? 600 : 400,
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* NEXT */}
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className={`
                    px-4 py-2 border rounded-lg
                    transition-all duration-300 hover:-translate-y-1
                    ${
                      page === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                    }
                  `}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// PRODUCT CARD
export function ProductCard({ product }) {
  return (
    <div className="group w-full product-card-animate">
      <Link to={`/product/${product.slug}`} className="shop-link block">
        {/* CARD */}
        <div
          className="
            shop-card
            rounded-[28px]
            bg-[#f7f7f7] border border-[#ededed]
          "
        >
          {/* shine sweep */}
          <span className="shop-card-shine" />

          {/* BG SHAPES */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-shape-1 absolute -top-16 -left-8 w-[140px] h-[140px] rounded-full border border-red-300"></div>

            <div className="floating-shape-2 absolute right-[-28px] top-[110px] w-[90px] h-[180px] rounded-full border-[8px] border-pink-200 opacity-70"></div>
          </div>

          {/* OFFER */}
          <div className="absolute top-4 right-4 z-20">
            <div
              className="shop-badge"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.78rem",
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              20% offer
            </div>
          </div>

          {/* IMAGE */}
          <div
            className="
              relative overflow-hidden rounded-[28px]
              h-[220px] sm:h-[280px] lg:h-[340px]
              p-5 z-10 flex items-center justify-center
            "
          >
            {/* GSAP floats this wrapper; CSS hover runs on the img inside */}
            <div className="product-image w-full h-full">
              <img
                src={product.image}
                alt={product.name}
                className="shop-card-img w-full h-full object-contain"
              />
            </div>
          </div>

          {/* QUICK VIEW */}
          <div className="shop-quick-view">
            <span
              className="block bg-[#0f766e] text-white px-4 py-2 rounded-full whitespace-nowrap shadow-lg"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Quick View
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-5 px-1">
          {/* NAME */}
          <h2
            className="leading-snug line-clamp-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 600,
              color: "#13204a",
              letterSpacing: "0.01em",
              lineHeight: 1.25,
            }}
          >
            <span className="shop-name-text">{product.name}</span>
          </h2>

          {/* CATEGORY */}
          <p
            className="mt-1 capitalize"
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
          <div className="flex items-center gap-3 mt-3">
            <p
              className="shop-price"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                fontWeight: 700,
                color: "#0f1d4d",
                letterSpacing: "0.01em",
              }}
            >
              ₹ {product.price}
            </p>

            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "#9ca3af",
                textDecoration: "line-through",
                fontWeight: 300,
              }}
            >
              ₹ {Math.floor(product.price * 1.2)}
            </span>
          </div>

          {/* SIZES */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.sizes?.map((size, index) => (
              <span
                key={index}
                className="size-chip"
                style={{ "--chip-delay": `${index * 60}ms` }}
              >
                {size.size.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}