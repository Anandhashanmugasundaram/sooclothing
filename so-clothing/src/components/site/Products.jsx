// import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export function Products() {

//   const sectionRef = useRef(null);

//   const [products, setProducts] = useState([]);

//   // FILTER STATES
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState("");

//   // FETCH PRODUCTS
//   useEffect(() => {

//     fetchProducts();

//   }, []);

//   const fetchProducts = async () => {

//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/products"
//       );

//       console.log(res.data);

//       setProducts(res.data);

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   // HANDLE SIZE FILTER
//   const handleSizeChange = (size) => {

//     if (selectedSizes.includes(size)) {

//       setSelectedSizes(
//         selectedSizes.filter((s) => s !== size)
//       );

//     } else {

//       setSelectedSizes([...selectedSizes, size]);

//     }
//   };

//   // FILTER PRODUCTS
//   const filteredProducts = products.filter((product) => {

//     // SIZE FILTER
//     const sizeMatch =
//       selectedSizes.length === 0 ||
//       product.sizes?.some((s) =>
//         selectedSizes.includes(s.toUpperCase())
//       );

//     // PRICE FILTER
//     let priceMatch = true;

//     if (selectedPrice === "0-200") {
//       priceMatch = product.price <= 200;
//     }

//     if (selectedPrice === "201-400") {
//       priceMatch =
//         product.price >= 201 &&
//         product.price <= 400;
//     }

//     if (selectedPrice === "401-600") {
//       priceMatch =
//         product.price >= 401 &&
//         product.price <= 600;
//     }

//     if (selectedPrice === "601-800") {
//       priceMatch =
//         product.price >= 601 &&
//         product.price <= 800;
//     }

//     if (selectedPrice === "801-1000") {
//       priceMatch =
//         product.price >= 801 &&
//         product.price <= 1000;
//     }

//     if (selectedPrice === "1000+") {
//       priceMatch = product.price > 1000;
//     }

//     return sizeMatch && priceMatch;

//   });

//   // GSAP ANIMATION
//   useEffect(() => {

//     if (!filteredProducts.length) return;

//     const ctx = gsap.context(() => {

//       gsap.from(
//         sectionRef.current.querySelectorAll(".product-card"),
//         {
//           opacity: 0,
//           y: 80,
//           duration: 1,
//           stagger: 0.1,
//         }
//       );

//     }, sectionRef);

//     return () => ctx.revert();

//   }, [filteredProducts]);

//   return (

//     <section
//       ref={sectionRef}
//       className="bg-background py-20"
//     >

//       <div className="w-full px-4 lg:px-8">

//         {/* TITLE */}
//         <h1 className="text-4xl font-bold mb-10">
//           Latest Products
//         </h1>

//         {/* FILTER + PRODUCTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

//           {/* FILTER SIDEBAR */}
//           <div className="border rounded-2xl p-6 h-fit">

//             {/* PRICE FILTER */}
//             <div>

//               <div className="flex justify-between items-center mb-5">

//                 <h2 className="text-xl font-semibold">
//                   Price Range
//                 </h2>

//                 <button
//                   onClick={() => setSelectedPrice("")}
//                   className="text-sm"
//                 >
//                   Reset
//                 </button>

//               </div>

//               <div className="flex flex-wrap gap-3">

//                 {[
//                   {
//                     label: "Below ₹200",
//                     value: "0-200",
//                   },
//                   {
//                     label: "₹201 - ₹400",
//                     value: "201-400",
//                   },
//                   {
//                     label: "₹401 - ₹600",
//                     value: "401-600",
//                   },
//                   {
//                     label: "₹601 - ₹800",
//                     value: "601-800",
//                   },
//                   {
//                     label: "₹801 - ₹1000",
//                     value: "801-1000",
//                   },
//                   {
//                     label: "Above ₹1000",
//                     value: "1000+",
//                   },
//                 ].map((item) => (

//                   <button
//                     key={item.value}
//                     onClick={() =>
//                       setSelectedPrice(item.value)
//                     }
//                     className={`px-4 py-2 border rounded-full transition-all duration-300
//                     ${
//                       selectedPrice === item.value
//                         ? "border-black"
//                         : ""
//                     }`}
//                   >
//                     {item.label}
//                   </button>

//                 ))}

//               </div>

//             </div>

//             {/* SIZE FILTER */}
//             <div className="mt-10">

//               <div className="flex justify-between items-center mb-5">

//                 <h2 className="text-xl font-semibold">
//                   Size
//                 </h2>

//                 <button
//                   onClick={() => setSelectedSizes([])}
//                   className="text-sm"
//                 >
//                   Reset
//                 </button>

//               </div>

//               <div className="space-y-4">

//                 {["S", "M", "L", "XL"].map((size) => (

//                   <label
//                     key={size}
//                     className="flex items-center gap-3 cursor-pointer"
//                   >

//                     <input
//                       type="checkbox"
//                       checked={selectedSizes.includes(size)}
//                       onChange={() =>
//                         handleSizeChange(size)
//                       }
//                     />

//                     <span>
//                       {size}
//                     </span>

//                   </label>

//                 ))}

//               </div>

//             </div>

//           </div>

//           {/* PRODUCTS SECTION */}
//           <div>

//             <p className="mb-6 text-lg">
//               {filteredProducts.length} Products Found
//             </p>

//             {/* PRODUCTS GRID */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

//               {filteredProducts.map((product) => (

//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                 />

//               ))}

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export function ProductCard({ product }) {

//   return (

//     <div className="product-card cursor-pointer">

//       <Link to={`/product/${product.slug}`}>

//         {/* PRODUCT IMAGE */}
//         <img
//           src={
//             product.img ||
//             `http://localhost:5000/uploads/${product.image}`
//           }
//           alt={product.name}
//          className="w-full h-[250px] object-cover rounded-xl"
//         />

//         {/* PRODUCT NAME */}
//         <h2 className="text-xl mt-3">
//           {product.name}
//         </h2>

//         {/* PRICE */}
//         <p className="mt-1">
//           ₹ {product.price}
//         </p>

//         {/* CATEGORY */}
//         <p className="text-sm text-gray-500 mt-1 capitalize">
//           {product.category}
//         </p>

//         {/* SIZES */}
//         <p className="text-sm text-gray-500 mt-1">

//           Size : {

//             product.sizes?.map((size, index) => (

//               <span key={index}>

//                 {size.toUpperCase()}

//                 {index !== product.sizes.length - 1 && ", "}

//               </span>

//             ))

//           }

//         </p>

//       </Link>

//       {/* ADD TO CART BUTTON */}
//       <button
//         className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300"
//       >
//         Add To Cart
//       </button>

//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  ShoppingBag,
  Star,
  Eye,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Products() {

  const sectionRef = useRef(null);

  const [products, setProducts] = useState([]);

  // FILTER STATES
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      console.log(res.data);

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // HANDLE SIZE FILTER
  const handleSizeChange = (size) => {

    if (selectedSizes.includes(size)) {

      setSelectedSizes(
        selectedSizes.filter((s) => s !== size)
      );

    } else {

      setSelectedSizes([...selectedSizes, size]);

    }
  };

  // FILTER PRODUCTS
const filteredProducts = products
  .filter((product) => {

    // SIZE FILTER
    const sizeMatch =
      selectedSizes.length === 0 ||
      product.sizes?.some((s) =>
        selectedSizes.includes(s.toUpperCase())
      );

    // PRICE FILTER
    let priceMatch = true;

    if (selectedPrice === "0-200") {
      priceMatch = product.price <= 200;
    }

    if (selectedPrice === "201-400") {
      priceMatch =
        product.price >= 201 &&
        product.price <= 400;
    }

    if (selectedPrice === "401-600") {
      priceMatch =
        product.price >= 401 &&
        product.price <= 600;
    }

    if (selectedPrice === "601-800") {
      priceMatch =
        product.price >= 601 &&
        product.price <= 800;
    }

    if (selectedPrice === "801-1000") {
      priceMatch =
        product.price >= 801 &&
        product.price <= 1000;
    }

    if (selectedPrice === "1000+") {
      priceMatch = product.price > 1000;
    }

    return sizeMatch && priceMatch;

  })
  .slice(0, 8);

  // GSAP ANIMATION
  useEffect(() => {

    if (!filteredProducts.length) return;

    const ctx = gsap.context(() => {

      gsap.from(
        sectionRef.current.querySelectorAll(".product-card"),
        {
          opacity: 0,
          y: 80,
          duration: 1,
          stagger: 0.1,
        }
      );

    }, sectionRef);

    return () => ctx.revert();

  }, [filteredProducts]);

  return (

    <section
      ref={sectionRef}
      className="bg-background py-20"
    >

      <div className="w-full px-4 lg:px-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-10">
          Latest Products
        </h1>

        {/* FILTER + PRODUCTS */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

          {/* FILTER SIDEBAR */}
          {/* STORE CTA SIDEBAR */}
<div className="sticky top-24 h-fit">

  <div
    className="
      bg-black
      text-white
      rounded-3xl
      p-8
      overflow-hidden
      relative
    "
  >

    {/* BACKGROUND CIRCLE */}
    <div
      className="
        absolute
        -top-10
        -right-10
        w-40
        h-40
        rounded-full
        bg-white/10
      "
    />

    <div
      className="
        absolute
        -bottom-16
        -left-16
        w-52
        h-52
        rounded-full
        bg-white/5
      "
    />

    {/* CONTENT */}
    <div className="relative z-10">

      <p className="uppercase tracking-[0.3em] text-sm text-gray-300">
        $O.CLOTHING
      </p>

      <h2 className="text-4xl font-bold mt-4 leading-tight">
        Explore
        <br />
        The Full Store
      </h2>

      <p className="text-gray-300 mt-5 leading-7">
        Discover premium streetwear,
        oversized fits, latest drops,
        and exclusive collections.
      </p>

      {/* BUTTON */}
 <Link
  to="/shop"
  className="
    group
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    mt-8
    px-8
    py-4
    rounded-xl
    font-semibold
    text-white

    bg-gradient-to-r
    from-black
    via-zinc-900
    to-neutral-800

    border
    border-white/10

    shadow-[0_10px_40px_rgba(0,0,0,0.35)]

    transition-all
    duration-500

    hover:scale-105
    hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
    hover:border-white/20
  "
>

  {/* SHINE EFFECT */}
  <span
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent

      translate-x-[-120%]
      group-hover:translate-x-[120%]

      transition-transform
      duration-1000
      skew-x-12
    "
  />

  {/* TEXT */}
  <span className="relative z-10 flex items-center gap-3 tracking-wide">

    Visit Store

    <span
      className="
        text-lg
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    >
      →
    </span>

  </span>

</Link>

    </div>

  </div>

</div>

          {/* PRODUCTS SECTION */}
          <div>

            <p className="mb-6 text-lg">
              {filteredProducts.length} Products Found
            </p>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="group relative">

      <Link to={`/product/${product.slug}`}>

        {/* CARD */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-[#f7f7f7]
            border
            border-[#eeeeee]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
          "
        >

          {/* ABSTRACT BACKGROUND */}
          <div className="absolute inset-0 overflow-hidden">

            {/* CURVE LINE */}
            <div
              className="
                absolute
                -top-20
                -left-10
                w-[180px]
                h-[180px]
                rounded-full
                border
                border-red-200
              "
            ></div>

            {/* SIDE SHAPE */}
            <div
              className="
                absolute
                right-[-35px]
                top-[130px]
                w-[110px]
                h-[220px]
                rounded-full
                border-[10px]
                border-red-100
                opacity-60
              "
            ></div>

          </div>

          {/* OFFER TAG */}
          <div className="absolute top-5 right-5 z-30">

            <div
              className="
                px-4
                py-2
                rounded-xl
                bg-white
                shadow-md
                text-[13px]
                font-medium
                text-pink-500
              "
            >
              20% offer
            </div>

          </div>

          {/* IMAGE SECTION */}
          <div
            className="
              relative
              h-[350px]
              flex
              items-center
              justify-center
              p-6
              z-10
            "
          >

            {/* PRODUCT IMAGE */}
            <img
              src={
                product.img ||
                `http://localhost:5000/uploads/${product.image}`
              }
              alt={product.name}
              className="
                w-full
                h-full
                object-contain
                rounded-[24px]
                transition-all
                duration-700
                group-hover:scale-[1.04]
              "
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="pt-5 px-2 pb-3">

          {/* PRODUCT NAME */}
          <h2
            className="
              text-[20px]
              leading-snug
              font-semibold
              text-[#13204a]
              line-clamp-2
              transition-all
              duration-300
              group-hover:text-red-500
            "
          >
            {product.name}
          </h2>

          {/* CATEGORY */}
          <p
            className="
              mt-1
              text-[17px]
              text-gray-500
              font-normal
            "
          >
            {product.category}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-3">

            <p className="text-[18px] leading-none font-medium text-[#0f1d4d]">
              ₹{product.price}
            </p>

            <span className="text-gray-400 line-through text-lg mt-2">
              ₹{Math.floor(product.price * 1.2)}
            </span>

          </div>

          {/* SIZES */}
          <div className="flex gap-2 mt-5 flex-wrap">

            {product.sizes?.map((size, index) => (
              <span
                key={index}
                className="
                  min-w-[42px]
                  h-10
                  px-3
                  flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  font-medium
                  text-gray-700
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                {size.toUpperCase()}
              </span>
            ))}

          </div>

        </div>

      </Link>

    </div>
  );
}