import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";

const cats = [
  "all",
  "tops",
  "bottoms",
  "outerwear",
  "accessories",
];

const ITEMS_PER_PAGE = 8;

export default function Shop() {

  const [products, setProducts] = useState([]);

  // TOP CATEGORY
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

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // SIZE FILTER HANDLER
  const handleSizeChange = (size) => {

    if (selectedSizes.includes(size)) {

      setSelectedSizes(
        selectedSizes.filter((s) => s !== size)
      );

    } else {

      setSelectedSizes([
        ...selectedSizes,
        size,
      ]);

    }
  };

  // FILTER + SEARCH + SORT
  const filteredList = useMemo(() => {

    let l =
      cat === "all"
        ? [...products]
        : products.filter(
            (p) =>
              p.category.toLowerCase() ===
              cat.toLowerCase()
          );

    // SEARCH FILTER
    if (search.trim()) {

      const text = search.toLowerCase();

      l.sort((a, b) => {

        const aMatch = a.name
          .toLowerCase()
          .includes(text);

        const bMatch = b.name
          .toLowerCase()
          .includes(text);

        if (aMatch && !bMatch) return -1;

        if (!aMatch && bMatch) return 1;

        return 0;

      });
    }

    // SIZE FILTER
    if (selectedSizes.length > 0) {

      l = l.filter((product) =>
        product.sizes?.some((s) =>
          selectedSizes.includes(
            s.toUpperCase()
          )
        )
      );
    }

    // PRICE FILTER
    if (selectedPrice === "0-200") {
      l = l.filter(
        (p) => p.price <= 200
      );
    }

    if (selectedPrice === "201-400") {
      l = l.filter(
        (p) =>
          p.price >= 201 &&
          p.price <= 400
      );
    }

    if (selectedPrice === "401-600") {
      l = l.filter(
        (p) =>
          p.price >= 401 &&
          p.price <= 600
      );
    }

    if (selectedPrice === "601-800") {
      l = l.filter(
        (p) =>
          p.price >= 601 &&
          p.price <= 800
      );
    }

    if (selectedPrice === "801-1000") {
      l = l.filter(
        (p) =>
          p.price >= 801 &&
          p.price <= 1000
      );
    }

    if (selectedPrice === "1000+") {
      l = l.filter(
        (p) => p.price > 1000
      );
    }

    // SORT
    if (sort === "low") {

      l = [...l].sort(
        (a, b) => a.price - b.price
      );

    }

    if (sort === "high") {

      l = [...l].sort(
        (a, b) => b.price - a.price
      );

    }

    return l;

  }, [
    products,
    cat,
    sort,
    search,
    selectedSizes,
    selectedPrice,
  ]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredList.length / ITEMS_PER_PAGE
  );

  const paginatedList = useMemo(() => {

    const start =
      (page - 1) * ITEMS_PER_PAGE;

    return filteredList.slice(
      start,
      start + ITEMS_PER_PAGE
    );

  }, [filteredList, page]);

  // RESET PAGE
  useEffect(() => {

    setPage(1);

  }, [
    cat,
    sort,
    search,
    selectedSizes,
    selectedPrice,
  ]);

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        eyebrow="Collection 01"
        title="Shop"
      >
        Every piece in the SS26 drop.
      </PageHeader>

      {/* SEARCH + CATEGORY + SORT */}
      <section className="py-12 border-b">

        <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* SEARCH BAR */}
          <div className="relative w-full lg:w-[350px]">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border
                px-5
                py-3
                pl-12
                rounded-xl
                outline-none
                focus:border-black
                transition-all
              "
            />

            <Search
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
              size={18}
            />

          </div>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-3 justify-center">

            {cats.map((c) => (

              <button
                key={c}
                onClick={() => setCat(c)}
                className={`
                  px-6
                  py-3
                  border
                  rounded-xl
                  capitalize
                  transition-all
                  duration-300
                  ${
                    cat === c
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }
                `}
              >

                {c}

              </button>

            ))}

          </div>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
              border
              px-5
              py-3
              rounded-xl
              outline-none
            "
          >

            <option value="featured">
              Featured
            </option>

            <option value="low">
              Price Low
            </option>

            <option value="high">
              Price High
            </option>

          </select>

        </div>

      </section>

      {/* MAIN SECTION */}
      <section className="py-16">

        <div className="w-full px-4 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

            {/* FILTER SIDEBAR */}
            <div className="border rounded-2xl p-6 h-fit sticky top-24">

              {/* PRICE FILTER */}
              <div>

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-xl font-semibold">
                    Price Range
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedPrice("")
                    }
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
                        setSelectedPrice(
                          item.value
                        )
                      }
                      className={`
                        px-4
                        py-2
                        border
                        rounded-full
                        text-sm
                        transition-all
                        duration-300
                        ${
                          selectedPrice ===
                          item.value
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }
                      `}
                    >

                      {item.label}

                    </button>

                  ))}

                </div>

              </div>

              {/* SIZE FILTER */}
              <div className="mt-10">

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-xl font-semibold">
                    Size
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedSizes([])
                    }
                    className="text-sm"
                  >
                    Reset
                  </button>

                </div>

                <div className="space-y-4">

                  {["S", "M", "L", "XL"].map(
                    (size) => (

                      <label
                        key={size}
                        className="
                          flex
                          items-center
                          gap-3
                          cursor-pointer
                        "
                      >

                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(
                            size
                          )}
                          onChange={() =>
                            handleSizeChange(
                              size
                            )
                          }
                        />

                        <span>{size}</span>

                      </label>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* PRODUCTS */}
            <div>

              <p className="mb-10 text-lg">

                {filteredList.length}
                {" "}
                Products Found

              </p>

              {/* GRID */}
              <div className="
                grid
                grid-cols-2
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                sm:gap-6
                lg:gap-8
              ">

                {paginatedList.map((p) => (

                  <ProductCard
                    key={p._id}
                    product={p}
                  />

                ))}

              </div>

              {/* PAGINATION */}
              <div className="
                flex
                justify-center
                items-center
                gap-3
                flex-wrap
                mt-14
              ">

                {/* PREV */}
                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={page === 1}
                  className={`
                    px-4
                    py-2
                    border
                    rounded-lg
                    ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                    }
                  `}
                >
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => (

                    <button
                      key={i}
                      onClick={() =>
                        setPage(i + 1)
                      }
                      className={`
                        px-4
                        py-2
                        border
                        rounded-lg
                        ${
                          page === i + 1
                            ? "bg-black text-white"
                            : "hover:bg-black hover:text-white"
                        }
                      `}
                    >

                      {i + 1}

                    </button>

                  )
                )}

                {/* NEXT */}
                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    page === totalPages
                  }
                  className={`
                    px-4
                    py-2
                    border
                    rounded-lg
                    ${
                      page === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                    }
                  `}
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

// PRODUCT CARD
export function ProductCard({ product }) {

  return (

    <div className="product-card cursor-pointer w-full group">

      <Link to={`/product/${product.slug}`}>

        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">

          <img
            src={
              product.img ||
              `http://localhost:5000/uploads/${product.image}`
            }
            alt={product.name}
            className="
              w-full
              h-[180px]
              sm:h-[250px]
              lg:h-[350px]
              object-cover
              rounded-2xl
              transition-all
              duration-500
              group-hover:scale-105
            "
          />

        </div>

        {/* NAME */}
        <h2 className="text-lg lg:text-2xl mt-4">

          {product.name}

        </h2>

        {/* PRICE */}
        <p className="mt-2 text-lg lg:text-xl">

          ₹ {product.price}

        </p>

        {/* CATEGORY */}
        <p className="
          text-sm
          text-gray-500
          mt-1
          capitalize
        ">

          {product.category}

        </p>

        {/* SIZE */}
        <div className="flex flex-wrap gap-2 mt-3">

          {product.sizes?.map(
            (size, index) => (

              <span
                key={index}
                className="
                  px-3
                  py-1
                  border
                  rounded-full
                  text-xs
                  lg:text-sm
                "
              >

                {size.toUpperCase()}

              </span>

            )
          )}

        </div>

      </Link>

      {/* ADD TO CART */}
      <button
        className="
          w-full
          mt-4
          bg-red-600
          hover:bg-red-700
          text-white
          py-3
          rounded-lg
          transition-all
          duration-300
        "
      >
        Add To Cart
      </button>

    </div>
  );
}

// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Search } from "lucide-react";
// import { PageHeader } from "@/components/site/PageHeader";

// const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

// const ITEMS_PER_PAGE = 8;

// export default function Shop() {
//   const [products, setProducts] = useState([]);
//   const [cat, setCat] = useState("all");
//   const [sort, setSort] = useState("featured");
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");

//   // FETCH PRODUCTS
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FILTER + SORT
//   // const filteredList = useMemo(() => {
//   //   let l =
//   //     cat === "all"
//   //       ? products
//   //       : products.filter(
//   //           (p) => p.category.toLowerCase() === cat.toLowerCase()
//   //         );

//   //   if (sort === "low") {
//   //     l = [...l].sort((a, b) => a.price - b.price);
//   //   }

//   //   if (sort === "high") {
//   //     l = [...l].sort((a, b) => b.price - a.price);
//   //   }

//   //   return l;
//   // }, [products, cat, sort]);

//   const filteredList = useMemo(() => {

//   let l =
//     cat === "all"
//       ? [...products]
//       : products.filter(
//           (p) =>
//             p.category.toLowerCase() ===
//             cat.toLowerCase()
//         );

//   // SEARCH LOGIC
//   if (search.trim()) {

//     const text = search.toLowerCase();

//     l.sort((a, b) => {

//       const aMatch = a.name
//         .toLowerCase()
//         .includes(text);

//       const bMatch = b.name
//         .toLowerCase()
//         .includes(text);

//       if (aMatch && !bMatch) return -1;

//       if (!aMatch && bMatch) return 1;

//       return 0;
//     });
//   }

//   // PRICE SORT
//   if (sort === "low") {
//     l = [...l].sort((a, b) => a.price - b.price);
//   }

//   if (sort === "high") {
//     l = [...l].sort((a, b) => b.price - a.price);
//   }

//   return l;

// }, [products, cat, sort, search]);

//   // PAGINATION LOGIC
//   const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

//   const paginatedList = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredList.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredList, page]);

//   // RESET PAGE WHEN CATEGORY CHANGES
//   useEffect(() => {
//     setPage(1);
//   }, [cat, sort]);

//   return (
//     <>
//       <PageHeader eyebrow="Collection 01" title="Shop">
//         Every piece in the SS26 drop.
//       </PageHeader>

//       {/* FILTER SECTION */}
//       <section className="py-12 border-b">

//   <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

//     {/* SEARCH BAR */}
//     <div className="relative w-full lg:w-[350px]">

//       <input
//         type="text"
//         placeholder="Search products..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full border px-5 py-3 pl-12 rounded-xl outline-none focus:border-black transition-all"
//       />

//       <Search
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//         size={18}
//       />

//     </div>

//     {/* CATEGORY BUTTONS */}
//     <div className="flex flex-wrap gap-3 justify-center">

//       {cats.map((c) => (

//         <button
//           key={c}
//           onClick={() => setCat(c)}
//           className={`px-6 py-3 border capitalize transition-all duration-300 rounded-xl ${
//             cat === c
//               ? "bg-black text-white"
//               : "hover:bg-black hover:text-white"
//           }`}
//         >

//           {c}

//         </button>

//       ))}

//     </div>

//     {/* SORT */}
//     <select
//       value={sort}
//       onChange={(e) => setSort(e.target.value)}
//       className="border px-5 py-3 rounded-xl outline-none"
//     >

//       <option value="featured">
//         Featured
//       </option>

//       <option value="low">
//         Price Low
//       </option>

//       <option value="high">
//         Price High
//       </option>

//     </select>

//   </div>

// </section>

//       {/* PRODUCTS */}
//       <section className="py-16">
//         <div className="w-full px-6 lg:px-12">
          
//           <p className="mb-10 text-lg">
//             {filteredList.length} Products Found
//           </p>

//           {/* GRID */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//             {paginatedList.map((p) => (
//               <ProductCard key={p._id} product={p} />
//             ))}
//           </div>

//           {/* PAGINATION */}
//           {/* PAGINATION */}
// <div className="flex justify-center mt-12 items-center gap-3 flex-wrap">

//   {/* PREV BUTTON */}
//   <button
//     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//     disabled={page === 1}
//     className={`px-4 py-2 border ${
//       page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
//     }`}
//   >
//     Prev
//   </button>

//   {/* PAGE NUMBERS */}
//   {Array.from({ length: totalPages }, (_, i) => (
//     <button
//       key={i}
//       onClick={() => setPage(i + 1)}
//       className={`px-4 py-2 border ${
//         page === i + 1 ? "bg-black text-white" : ""
//       }`}
//     >
//       {i + 1}
//     </button>
//   ))}

//   {/* NEXT BUTTON */}
//   <button
//     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//     disabled={page === totalPages}
//     className={`px-4 py-2 border ${
//       page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
//     }`}
//   >
//     Next
//   </button>

// </div>

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
//         <div className="w-full overflow-hidden rounded-xl">
//           <img
//             src={
//               product.img ||
//               `http://localhost:5000/uploads/${product.image}`
//             }
//             alt={product.name}
//             className="w-full h-[180px] sm:h-[250px] lg:h-[350px] object-cover rounded-xl hover:scale-105 transition-all duration-500"
//           />
//         </div>

//         <h2 className="text-2xl mt-4">{product.name}</h2>
//         <p className="mt-2 text-xl">₹ {product.price}</p>

//         <p className="text-sm text-gray-500 mt-1 capitalize">
//           {product.category}
//         </p>

//         <p className="text-sm text-gray-500 mt-1">
//           Size :{" "}
//           {product.sizes?.map((size, index) => (
//             <span key={index}>
//               {size.toUpperCase()}
//               {index !== product.sizes.length - 1 && ", "}
//             </span>
//           ))}
//         </p>
//       </Link>

//       <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg transition-all duration-300">
//         Add To Cart
//       </button>
//     </div>
//   );
// }