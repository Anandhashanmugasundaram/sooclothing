import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";

const cats = ["all", "tops", "bottoms", "outerwear", "accessories"];

const API =import.meta.env.VITE_API_URL;
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

    // SIZE FILTER
    if (selectedSizes.length > 0) {
      l = l.filter((product) =>
        product.sizes?.some((s) => selectedSizes.includes(s.toUpperCase())),
      );
    }

    // PRICE FILTER
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

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader eyebrow="Collection 01" title="Shop">
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
              onChange={(e) => setSearch(e.target.value)}
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
            onChange={(e) => setSort(e.target.value)}
            className="
              border
              px-5
              py-3
              rounded-xl
              outline-none
            "
          >
            <option value="featured">Featured</option>

            <option value="low">Price Low</option>

            <option value="high">Price High</option>
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
                  <h2 className="text-xl font-semibold">Price Range</h2>

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
                      onClick={() => setSelectedPrice(item.value)}
                      className={`
                        px-4
                        py-2
                        border
                        rounded-full
                        text-sm
                        transition-all
                        duration-300
                        ${
                          selectedPrice === item.value
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
                  <h2 className="text-xl font-semibold">Size</h2>

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
                      className="
                          flex
                          items-center
                          gap-3
                          cursor-pointer
                        "
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
            <div>
              <p className="mb-10 text-lg">
                {filteredList.length} Products Found
              </p>

              {/* GRID */}
              <div
                className="
                grid
                grid-cols-2
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                sm:gap-6
                lg:gap-8
              "
              >
                {paginatedList.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {/* PAGINATION */}
              <div
                className="
                flex
                justify-center
                items-center
                gap-3
                flex-wrap
                mt-14
              "
              >
                {/* PREV */}
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
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
                ))}

                {/* NEXT */}
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
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
    <div className="group w-full">
      <Link to={`/product/${product.slug}`}>
        {/* CARD */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-[#f7f7f7]
            border
            border-[#ededed]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
          "
        >
          {/* ABSTRACT BACKGROUND */}
          <div className="absolute inset-0 overflow-hidden">
            {/* TOP CURVE */}
            <div
              className="
                absolute
                -top-16
                -left-8
                w-[140px]
                h-[140px]
                rounded-full
                border
                border-red-300
              "
            ></div>

            {/* SIDE SHAPE */}
            <div
              className="
                absolute
                right-[-28px]
                top-[110px]
                w-[90px]
                h-[180px]
                rounded-full
                border-[8px]
                border-pink-200
                opacity-70
              "
            ></div>
          </div>

          {/* OFFER TAG */}
          <div className="absolute top-4 right-4 z-20">
            <div
              className="
                px-3
                py-2
                rounded-xl
                bg-white
                shadow-md
                text-[12px]
                font-medium
                text-pink-500
              "
            >
              20% offer
            </div>
          </div>

          {/* IMAGE */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              h-[220px]
              sm:h-[280px]
              lg:h-[340px]
              p-5
              z-10
              flex
              items-center
              justify-center
            "
          >
            <img
              src={product.image}
              alt={product.name}
              className="
    w-full
    h-full
    object-contain
    transition-all
    duration-700
    group-hover:scale-[1.05]
  "
              onError={() => {
                console.log("FAILED IMAGE:", product.image);
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-5 px-1">
          {/* PRODUCT NAME */}
          <h2
            className="
              text-[18px]
              sm:text-[20px]
              lg:text-[22px]
              font-semibold
              leading-snug
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
              text-sm
              sm:text-base
              text-gray-500
              capitalize
            "
          >
            {product.category}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-3">
            <p
              className="
                text-lg
                lg:text-xl
                font-semibold
                text-[#0f1d4d]
              "
            >
              ₹ {product.price}
            </p>

            <span
              className="
                text-gray-400
                line-through
                text-base
                lg:text-lg
              "
            >
              ₹ {Math.floor(product.price * 1.2)}
            </span>
          </div>

          {/* SIZES */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.sizes?.map((size, index) => (
              <span
                key={index}
                className="
                    min-w-[42px]
                    h-9
                    px-3
                    flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-xs
                    sm:text-sm
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
