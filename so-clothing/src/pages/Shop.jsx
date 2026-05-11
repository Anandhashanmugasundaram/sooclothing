import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { ProductCard } from "@/components/site/Products";
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

  const list = useMemo(() => {

    let l =
      cat === "all"
        ? products
        : products.filter(
            (p) =>
              p.category === cat
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
      <PageHeader
        eyebrow="Collection 01"
        title="Shop"
      >
        Every piece in the SS26 drop.
      </PageHeader>

      <section className="py-12 border-b">

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2">

            {cats.map((c) => (

              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 border ${
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
            className="border px-3 py-2"
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

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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