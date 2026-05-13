import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Minus,
  Plus,
  Truck,
  Shield,
} from "lucide-react";

import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const BASE_URL ="https://sooclothing-1tpa-nh9kpsqdn-anands-projects-eec1eb1d.vercel.app";
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${slug}`
      );

      setProduct(res.data);
      fetchRelated(res.data.category, res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products`
      );

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
    if (!size) {
      toast.error("Select a size");
      return;
    }

    add(product, size, qty);
    toast.success(`${product.name} added to bag`);
  };

  if (!product) {
    return (
      <div className="pt-44 pb-32 text-center">
        <p className="text-3xl mb-4">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="pt-28 lg:pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          {/* BREADCRUMB */}
          <nav className="text-sm mb-8">
            <Link to="/" className="hover:text-gray-500">
              Home
            </Link>
            {" / "}
            <Link to="/shop" className="hover:text-gray-500">
              Shop
            </Link>
            {" / "}
            <span>{product.name}</span>
          </nav>

          {/* MAIN PRODUCT */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* IMAGE */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[700px] object-cover rounded-lg"
              />
            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-28 lg:self-start">

              <p className="uppercase text-sm text-gray-500 mb-3">
                {product.category}
              </p>

              <h1 className="text-5xl font-bold mb-4">
                {product.name}
              </h1>

              <p className="text-2xl mb-8">
                ₹ {product.price}
              </p>

              <p className="text-gray-600 leading-relaxed mb-10">
                {product.description}
              </p>

              {/* SIZE */}
              <div className="mb-8">
                <p className="uppercase text-sm mb-3">Size</p>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-5 py-3 border transition ${
                        size === s
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY + ADD */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center border">
                  <button
                    onClick={() =>
                      setQty(Math.max(1, qty - 1))
                    }
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-12 text-center">
                    {qty}
                  </span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={onAdd}
                  className="flex-1 bg-black text-white uppercase tracking-widest hover:bg-gray-800"
                >
                  Add To Bag
                </button>
              </div>

              {/* PERKS */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y mb-8">
                <Perk
                  icon={<Truck className="w-5 h-5" />}
                  label="Free Shipping"
                />

                <Perk
                  icon={<Shield className="w-5 h-5" />}
                  label="Secure Payment"
                />
              </div>

              {/* DETAILS */}
              <div>
                <p className="uppercase text-sm mb-4">
                  Product Details
                </p>

                <ul className="space-y-2 text-gray-600">
                  <li>Premium Quality Material</li>
                  <li>Comfortable Fit</li>
                  <li>Stylish Modern Design</li>
                  <li>Long Lasting Fabric</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="border-t py-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          <h2 className="text-4xl font-bold mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {related.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="border p-3 rounded-lg block hover:scale-[1.02] transition"
              >
                <img
                  src={p.image}
                  className="h-40 w-full object-contain"
                  alt={p.name}
                />

                <h2 className="mt-2 font-semibold">
                  {p.name}
                </h2>

                <p>₹{p.price}</p>
              </Link>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

function Perk({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span>{icon}</span>
      <p className="text-xs uppercase">{label}</p>
    </div>
  );
}