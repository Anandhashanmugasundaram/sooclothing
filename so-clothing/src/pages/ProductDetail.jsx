// // ProductDetail.jsx
// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Minus, Plus, Truck, Shield } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Google Fonts injection
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
//     import.meta.env.VITE_API_URL || https://sooclothing-pw64.vercel.app/;

//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [size, setSize] = useState("");
//   const [qty, setQty] = useState(1);

//   const selectedSizeStock =
//     product?.sizes?.find((s) => s.size === size)?.quantity || 0;

//   // REFS
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
//             p.category === category && p._id !== currentId && !p.isSpecialOffer,
//         )
//         .slice(0, 4);

//       setRelated(filtered);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onAdd = () => {
//     if (!size) return toast.error("Select a size");
//     if (selectedSizeStock === 0) return toast.error("Out of stock");
//     if (qty > selectedSizeStock)
//       return toast.error(`Only ${selectedSizeStock} items available`);

//     add(product, size, qty);
//     toast.success(`${product.name} added to bag`);
//   };

//   // ================= MAIN ANIMATIONS =================
//   useEffect(() => {
//     if (!product) return;

//     const ctx = gsap.context(() => {
//       // Image
//       gsap.from(imageRef.current, {
//         opacity: 0,
//         scale: 1.1,
//         duration: 1.2,
//         ease: "power3.out",
//       });

//       // Text stagger
//       gsap.from(textRefs.current, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.15,
//         duration: 0.9,
//         ease: "power3.out",
//         delay: 0.2,
//       });

//       // Size buttons
//       gsap.from(sizeRef.current, {
//         opacity: 0,
//         y: 20,
//         duration: 0.8,
//         ease: "power3.out",
//         delay: 0.4,
//       });

//       // CTA row
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

//   // ================= RELATED ANIMATION =================
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
//               <p ref={(el) => (textRefs.current[0] = el)}>{product.category}</p>

//               <h1
//                 ref={(el) => (textRefs.current[1] = el)}
//                 className="uppercase leading-[0.9] mb-4 text-4xl font-bold"
//               >
//                 {product.name}
//               </h1>

//               <p
//                 ref={(el) => (textRefs.current[2] = el)}
//                 className="mb-8 text-xl"
//               >
//                 ₹ {product.price}
//               </p>

//               <p
//                 ref={(el) => (textRefs.current[3] = el)}
//                 className="text-foreground/60 mb-10"
//               >
//                 {product.description}
//               </p>

//               {/* SIZE */}
//               <div ref={sizeRef} className="flex gap-3 flex-wrap mb-8">
//                 {product.sizes?.map((s) => (
//                   <button
//                     key={s.size}
//                     onClick={() => {
//                       setSize(s.size);
//                       setQty(1);
//                     }}
//                     className={`px-4 py-2 border transition ${
//                       size === s.size ? "bg-black text-white" : ""
//                     }`}
//                   >
//                     {s.size}
//                   </button>
//                 ))}
//               </div>

//               {/* QTY */}
//               <div ref={actionRef} className="flex gap-3 mb-6 items-center">
//                 <button onClick={() => setQty(Math.max(1, qty - 1))}>
//                   <Minus />
//                 </button>

//                 <span>{qty}</span>

//                 <button
//                   onClick={() =>
//                     setQty((q) => (q < selectedSizeStock ? q + 1 : q))
//                   }
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
//               <div className="flex gap-6 mb-10">
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
//                 ref={(el) => (relatedItemsRef.current[i] = el)}
//                 className="group border p-3 rounded-lg block"
//               >
//                 <img
//                   src={p.image}
//                   className="h-40 w-full object-contain transition-transform duration-500 group-hover:scale-110"
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
import { Minus, Plus, Truck, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";

if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();

  const API =
    import.meta.env.VITE_API_URL ||
    https://sooclothing-pw64.vercel.app/;

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
  const relatedItemsRef = useRef([]);

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
    if (selectedSizeStock === 0)
      return toast.error("Out of stock");

    if (qty > selectedSizeStock) {
      return toast.error(
        `Only ${selectedSizeStock} items available`
      );
    }

    add(product, size, qty);
    toast.success(`${product.name} added to bag`);
  };

  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(textRefs.current, {
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

  useEffect(() => {
    if (!related.length) return;

    const ctx = gsap.context(() => {
      gsap.from(relatedRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 85%",
        },
      });

      gsap.from(relatedItemsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.12,
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
        <p className="text-3xl font-light">Loading...</p>
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* IMAGE */}
            <div>
              <img
                ref={imageRef}
                src={product.image}
                alt={product.name}
                className="w-full h-[700px] object-cover rounded-lg"
              />
            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p ref={(el) => (textRefs.current[0] = el)}>
                {product.category}
              </p>

              <h1
                ref={(el) => (textRefs.current[1] = el)}
                className="uppercase text-4xl font-bold mb-4"
              >
                {product.name}
              </h1>

              <p
                ref={(el) => (textRefs.current[2] = el)}
                className="text-xl mb-2"
              >
                ₹ {product.price}
              </p>

              {/* ✅ STOCK INFO */}
              {size && (
                <p className="text-sm text-gray-500 mb-6">
                  {selectedSizeStock > 0
                    ? `${selectedSizeStock} items available`
                    : "Out of stock"}
                </p>
              )}

              <p
                ref={(el) => (textRefs.current[3] = el)}
                className="text-gray-500 mb-10"
              >
                {product.description}
              </p>

              {/* SIZE */}
              <div ref={sizeRef} className="flex gap-3 flex-wrap mb-4">
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      setSize(s.size);
                      setQty(1);
                    }}
                    className={`px-4 py-2 border transition ${
                      size === s.size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* QTY */}
              <div
                ref={actionRef}
                className="flex gap-3 mb-6 items-center"
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus />
                </button>

                <span>{qty}</span>

                <button
                  onClick={() => {
                    if (!size)
                      return toast.error("Select size first");

                    if (qty >= selectedSizeStock) {
                      toast.error(
                        `Only ${selectedSizeStock} items available`
                      );
                      return;
                    }

                    setQty((q) => q + 1);
                  }}
                >
                  <Plus />
                </button>

                <button
                  onClick={onAdd}
                  className="bg-black text-white px-6 py-2"
                >
                  Add To Bag
                </button>
              </div>

              {/* PERKS */}
              <div className="flex gap-6">
                <Truck />
                <Shield />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section ref={relatedRef} className="border-t py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold uppercase mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                ref={(el) =>
                  (relatedItemsRef.current[i] = el)
                }
                className="group border p-3 rounded-lg"
              >
                <img
                  src={p.image}
                  className="h-40 w-full object-contain group-hover:scale-110 transition"
                  alt={p.name}
                />
                <h2 className="mt-2 uppercase">{p.name}</h2>
                <p>₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}