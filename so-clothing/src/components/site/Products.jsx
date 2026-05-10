import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Products() {

  const sectionRef = useRef(null);

  const [products, setProducts] = useState([]);

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

  const featured = products.slice(0, 4);

  useEffect(() => {

    if (!products.length) return;

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

  }, [products]);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-24 lg:py-40"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        <h1 className="text-4xl font-bold mb-12">
          Latest Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featured.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export function ProductCard({ product }) {

  return (

    <Link to={`/product/${product.slug}`}>

      <div className="product-card cursor-pointer">

        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="w-full h-[400px] object-cover"
        />

        <h2 className="text-xl mt-3">
          {product.name}
        </h2>

        <p className="mt-1">
          ₹ {product.price}
        </p>

        <p className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

      </div>

    </Link>
  );
}