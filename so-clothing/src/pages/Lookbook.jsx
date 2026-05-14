import { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";

export default function Lookbook() {
  const [offers, setOffers] = useState([]);
  const API =import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);

      const special = res.data.filter((p) => p.isSpecialOffer);

      setOffers(special);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Special Offers" title="Exclusive Deal" />

      <section className="py-12 px-6">
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

  {offers.map((product) => (
    <div key={product._id} className="group">

      <Link to={`/product/${product.slug}`}>

        {/* CARD */}
        <div className="relative overflow-hidden rounded-[30px] bg-[#f7f7f7] border border-[#eee]">

          {/* OFFER BADGE */}
          <div className="absolute top-5 right-5 z-30">
            <div className="px-4 py-2 rounded-xl bg-white shadow-md text-[13px] font-medium text-pink-500">
              20% OFF
            </div>
          </div>

          {/* BACKGROUND SHAPES */}
          <div className="absolute inset-0">

            <div
              className="
                absolute
                -top-10
                -left-10
                w-40
                h-40
                rounded-full
                border
                border-red-500
              "
            />

            <div
              className="
                absolute
                right-[-35px]
                top-[130px]
                w-[110px]
                h-[220px]
                rounded-full
                border-[10px]
                border-red-300
                opacity-60
              "
            />

          </div>

          {/* IMAGE */}
          <div
            className="
              h-[260px]
              flex
              items-center
              justify-center
              p-4
              relative
              z-10
            "
          >

            <img
              src={product.image}
              alt={product.name}
              className="
                h-full
                object-contain
                transition
                duration-500
                group-hover:scale-105
              "
            />

          </div>

        </div>

        {/* TEXT */}
        <div className="mt-3">

          <h2 className="mt-2 font-semibold">
            {product.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {product.category}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-2">

            <p className="text-base font-semibold">
              ₹{product.price}
            </p>

            <span className="text-sm text-gray-400 line-through">
              ₹{Math.floor(product.price * 1.2)}
            </span>

          </div>

          {/* SIZES */}
          <div className="flex gap-2 mt-3 flex-wrap">

            {product.sizes?.map((size, i) => (
              <span
                key={i}
                className="
                  px-2
                  py-1
                  text-xs
                  border
                  rounded-full
                  hover:bg-black
                  hover:text-white
                  transition
                "
              >
                {size.toUpperCase()}
              </span>
            ))}

          </div>

        </div>

      </Link>

    </div>
  ))}

</div>
      </section>
    </>
  );
}