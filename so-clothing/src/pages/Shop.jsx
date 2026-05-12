// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { PageHeader } from "@/components/site/PageHeader";

// const cats = [
//   "all",
//   "tops",
//   "bottoms",
//   "outerwear",
//   "accessories",
// ];

// export default function Shop() {

//   const [products, setProducts] = useState([]);

//   const [cat, setCat] = useState("all");

//   const [sort, setSort] =
//     useState("featured");

//   // FETCH PRODUCTS
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

//   // FILTER + SORT
//   const list = useMemo(() => {

//     let l =
//       cat === "all"
//         ? products
//         : products.filter(
//             (p) =>
//               p.category.toLowerCase() ===
//               cat.toLowerCase()
//           );

//     if (sort === "low") {

//       l = [...l].sort(
//         (a, b) => a.price - b.price
//       );
//     }

//     if (sort === "high") {

//       l = [...l].sort(
//         (a, b) => b.price - a.price
//       );
//     }

//     return l;

//   }, [products, cat, sort]);

//   return (
//     <>
//       {/* PAGE HEADER */}
//       <PageHeader
//         eyebrow="Collection 01"
//         title="Shop"
//       >
//         Every piece in the SS26 drop.
//       </PageHeader>

//       {/* FILTER SECTION */}
//       <section className="py-12 border-b">

//         <div className="w-full px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">

//           {/* CATEGORY BUTTONS */}
//           <div className="flex flex-wrap gap-3">

//             {cats.map((c) => (

//               <button
//                 key={c}
//                 onClick={() => setCat(c)}
//                 className={`px-6 py-3 border transition-all duration-300 capitalize
//                 ${
//                   cat === c
//                     ? "bg-black text-white"
//                     : ""
//                 }`}
//               >
//                 {c}
//               </button>

//             ))}

//           </div>

//           {/* SORT */}
//           <select
//             value={sort}
//             onChange={(e) =>
//               setSort(e.target.value)
//             }
//             className="border px-5 py-3"
//           >

//             <option value="featured">
//               Featured
//             </option>

//             <option value="low">
//               Price Low
//             </option>

//             <option value="high">
//               Price High
//             </option>

//           </select>

//         </div>

//       </section>

//       {/* PRODUCTS */}
//       <section className="py-16">

//         <div className="w-full px-6 lg:px-12">

//           {/* PRODUCT COUNT */}
//           <p className="mb-10 text-lg">
//             {list.length} Products Found
//           </p>

//           {/* PRODUCTS GRID */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

//             {list.map((p) => (

//               <ProductCard
//                 key={p._id}
//                 product={p}
//               />

//             ))}

//           </div>

//         </div>

//       </section>
//     </>
//   );
// }

// // PRODUCT CARD
// export function ProductCard({ product }) {

//   return (

//     <div className="product-card cursor-pointer w-full">

//       <Link to={`/product/${product.slug}`}>

//         {/* PRODUCT IMAGE */}
//         <div className="w-full overflow-hidden rounded-xl">

//           <img
//             src={
//               product.img ||
//               `http://localhost:5000/uploads/${product.image}`
//             }
//             alt={product.name}
//             className="w-full h-[350px] object-cover rounded-xl hover:scale-105 transition-all duration-500"
//           />

//         </div>

//         {/* PRODUCT NAME */}
//         <h2 className="text-2xl mt-4">
//           {product.name}
//         </h2>

//         {/* PRICE */}
//         <p className="mt-2 text-xl">
//           ₹ {product.price}
//         </p>

//         {/* CATEGORY */}
//         <p className="text-sm text-gray-500 mt-1 capitalize">
//           {product.category}
//         </p>

//         {/* SIZE */}
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

//       {/* ADD TO CART */}
//       <button
//         className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg transition-all duration-300"
//       >
//         Add To Cart
//       </button>

//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { PageHeader } from "@/components/site/PageHeader";

const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER + SORT
  const filteredList = useMemo(() => {
    let l =
      cat === "all"
        ? products
        : products.filter(
            (p) => p.category.toLowerCase() === cat.toLowerCase()
          );

    if (sort === "low") {
      l = [...l].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      l = [...l].sort((a, b) => b.price - a.price);
    }

    return l;
  }, [products, cat, sort]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const paginatedList = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, page]);

  // RESET PAGE WHEN CATEGORY CHANGES
  useEffect(() => {
    setPage(1);
  }, [cat, sort]);

  return (
    <>
      <PageHeader eyebrow="Collection 01" title="Shop">
        Every piece in the SS26 drop.
      </PageHeader>

      {/* FILTER SECTION */}
      <section className="py-12 border-b">
        <div className="w-full px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">
          
          {/* CATEGORY */}
          <div className="flex flex-wrap gap-3">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-6 py-3 border capitalize transition-all duration-300 ${
                  cat === c ? "bg-black text-white" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-5 py-3"
          >
            <option value="featured">Featured</option>
            <option value="low">Price Low</option>
            <option value="high">Price High</option>
          </select>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16">
        <div className="w-full px-6 lg:px-12">
          
          <p className="mb-10 text-lg">
            {filteredList.length} Products Found
          </p>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {paginatedList.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {/* PAGINATION */}
          {/* PAGINATION */}
<div className="flex justify-center mt-12 items-center gap-3 flex-wrap">

  {/* PREV BUTTON */}
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`px-4 py-2 border ${
      page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
    }`}
  >
    Prev
  </button>

  {/* PAGE NUMBERS */}
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`px-4 py-2 border ${
        page === i + 1 ? "bg-black text-white" : ""
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* NEXT BUTTON */}
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={`px-4 py-2 border ${
      page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
    }`}
  >
    Next
  </button>

</div>

        </div>
      </section>
    </>
  );
}

// PRODUCT CARD
export function ProductCard({ product }) {
  return (
    <div className="product-card cursor-pointer w-full">
      <Link to={`/product/${product.slug}`}>
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src={
              product.img ||
              `http://localhost:5000/uploads/${product.image}`
            }
            alt={product.name}
            className="w-full h-[180px] sm:h-[250px] lg:h-[350px] object-cover rounded-xl hover:scale-105 transition-all duration-500"
          />
        </div>

        <h2 className="text-2xl mt-4">{product.name}</h2>
        <p className="mt-2 text-xl">₹ {product.price}</p>

        <p className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Size :{" "}
          {product.sizes?.map((size, index) => (
            <span key={index}>
              {size.toUpperCase()}
              {index !== product.sizes.length - 1 && ", "}
            </span>
          ))}
        </p>
      </Link>

      <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg transition-all duration-300">
        Add To Cart
      </button>
    </div>
  );
}