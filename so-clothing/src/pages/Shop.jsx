import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { PageHeader } from "@/components/site/PageHeader";

const cats = [
  "all",
  "tops",
  "bottoms",
  "outerwear",
  "accessories",
];

export default function Shop() {

  const [products, setProducts] = useState([]);

  const [cat, setCat] = useState("all");

  const [sort, setSort] =
    useState("featured");

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

  // FILTER + SORT
  const list = useMemo(() => {

    let l =
      cat === "all"
        ? products
        : products.filter(
            (p) =>
              p.category.toLowerCase() ===
              cat.toLowerCase()
          );

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

  }, [products, cat, sort]);

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        eyebrow="Collection 01"
        title="Shop"
      >
        Every piece in the SS26 drop.
      </PageHeader>

      {/* FILTER SECTION */}
      <section className="py-12 border-b">

        <div className="w-full px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-3">

            {cats.map((c) => (

              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-6 py-3 border transition-all duration-300 capitalize
                ${
                  cat === c
                    ? "bg-black text-white"
                    : ""
                }`}
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
            className="border px-5 py-3"
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

      {/* PRODUCTS */}
      <section className="py-16">

        <div className="w-full px-6 lg:px-12">

          {/* PRODUCT COUNT */}
          <p className="mb-10 text-lg">
            {list.length} Products Found
          </p>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {list.map((p) => (

              <ProductCard
                key={p._id}
                product={p}
              />

            ))}

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

        {/* PRODUCT IMAGE */}
        <div className="w-full overflow-hidden rounded-xl">

          <img
            src={
              product.img ||
              `http://localhost:5000/uploads/${product.image}`
            }
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl hover:scale-105 transition-all duration-500"
          />

        </div>

        {/* PRODUCT NAME */}
        <h2 className="text-2xl mt-4">
          {product.name}
        </h2>

        {/* PRICE */}
        <p className="mt-2 text-xl">
          ₹ {product.price}
        </p>

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

        {/* SIZE */}
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

      {/* ADD TO CART */}
      <button
        className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg transition-all duration-300"
      >
        Add To Cart
      </button>

    </div>
  );
}