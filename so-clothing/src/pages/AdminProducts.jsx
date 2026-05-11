import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // REMOVE FROM UI
      setProducts(
        products.filter(
          (p) => p._id !== id
        )
      );

      alert("Product deleted");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  if (loading) {

    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 mt-12">

      <div className="max-w-[1400px] mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          All Products
        </h1>

        {
          products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {products.map((product) => (

                <div
                  key={product._id}
                  className="border rounded-xl overflow-hidden shadow-sm"
                >

                  {/* IMAGE */}
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-[300px] object-cover"
                  />

                  {/* DETAILS */}
                  <div className="p-4">

                    <h2 className="text-xl font-semibold">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      ₹ {product.price}
                    </p>

                    <p className="text-sm capitalize text-gray-500 mt-1">
                      {product.category}
                    </p>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                    >

                      <Trash2 className="w-4 h-4" />

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>
          )
        }

      </div>

    </div>
  );
}