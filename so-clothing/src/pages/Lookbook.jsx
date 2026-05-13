import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";

export default function Lookbook() {
  const [offers, setOffers] = useState([]);
  const API ="https://sooclothing-1tpa.vercel.app";

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
            <Link
              key={product._id}
              to={`/product/${product.slug}`}
              className="border p-3 rounded-lg block"
            >
              <img
                src={product.image}
                className="h-50 w-full object-contain"
              />

              <h2 className="mt-2 font-semibold">
                {product.name}
              </h2>

              <p className="text-pink-600">
                ₹{product.price}
              </p>
            </Link>
          ))}

        </div>
      </section>
    </>
  );
}