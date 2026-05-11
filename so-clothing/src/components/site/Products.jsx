// import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export function Products() {

//   const sectionRef = useRef(null);

//   const [products, setProducts] = useState([]);

//   useEffect(() => {

//     fetchProducts();

//   }, []);

//   const fetchProducts = async () => {

//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/products"
//       );

//       setProducts(res.data);

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   const featured = products.slice(0, 4);

//   useEffect(() => {

//     if (!products.length) return;

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

//   }, [products]);

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-background py-24 lg:py-40"
//     >
//       <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

//         <h1 className="text-4xl font-bold mb-12">
//           Latest Products
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//           {featured.map((product) => (

//             <ProductCard
//               key={product._id}
//               product={product}
//             />

//           ))}

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
//           className="w-full h-[350px] object-cover rounded-xl"
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
  const filteredProducts = products.filter((product) => {

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

  });

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
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* FILTER SIDEBAR */}
          <div className="border rounded-2xl p-6 h-fit">

            {/* PRICE FILTER */}
            <div>

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-semibold">
                  Price Range
                </h2>

                <button
                  onClick={() => setSelectedPrice("")}
                  className="text-sm"
                >
                  Reset
                </button>

              </div>

              <div className="flex flex-wrap gap-3">

                {[
                  {
                    label: "Below ₹200",
                    value: "0-200",
                  },
                  {
                    label: "₹201 - ₹400",
                    value: "201-400",
                  },
                  {
                    label: "₹401 - ₹600",
                    value: "401-600",
                  },
                  {
                    label: "₹601 - ₹800",
                    value: "601-800",
                  },
                  {
                    label: "₹801 - ₹1000",
                    value: "801-1000",
                  },
                  {
                    label: "Above ₹1000",
                    value: "1000+",
                  },
                ].map((item) => (

                  <button
                    key={item.value}
                    onClick={() =>
                      setSelectedPrice(item.value)
                    }
                    className={`px-4 py-2 border rounded-full transition-all duration-300
                    ${
                      selectedPrice === item.value
                        ? "border-black"
                        : ""
                    }`}
                  >
                    {item.label}
                  </button>

                ))}

              </div>

            </div>

            {/* SIZE FILTER */}
            <div className="mt-10">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-semibold">
                  Size
                </h2>

                <button
                  onClick={() => setSelectedSizes([])}
                  className="text-sm"
                >
                  Reset
                </button>

              </div>

              <div className="space-y-4">

                {["S", "M", "L", "XL"].map((size) => (

                  <label
                    key={size}
                    className="flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() =>
                        handleSizeChange(size)
                      }
                    />

                    <span>
                      {size}
                    </span>

                  </label>

                ))}

              </div>

            </div>

          </div>

          {/* PRODUCTS SECTION */}
          <div>

            <p className="mb-6 text-lg">
              {filteredProducts.length} Products Found
            </p>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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

    <div className="product-card cursor-pointer">

      <Link to={`/product/${product.slug}`}>

        {/* PRODUCT IMAGE */}
        <img
          src={
            product.img ||
            `http://localhost:5000/uploads/${product.image}`
          }
          alt={product.name}
         className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* PRODUCT NAME */}
        <h2 className="text-xl mt-3">
          {product.name}
        </h2>

        {/* PRICE */}
        <p className="mt-1">
          ₹ {product.price}
        </p>

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

        {/* SIZES */}
        <p className="text-sm text-gray-500 mt-1">

          Size : {

            product.sizes?.map((size, index) => (

              <span key={index}>

                {size.toUpperCase()}

                {index !== product.sizes.length - 1 && ", "}

              </span>

            ))

          }

        </p>

      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300"
      >
        Add To Cart
      </button>

    </div>
  );
}