import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export default function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const API =
    import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";
  // PROTECT ADMIN PAGE
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
    
    isSpecialOffer: false,
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // SUBMIT PRODUCT
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);

      data.append("price", form.price);

      data.append("category", form.category);

      data.append("description", form.description);

      data.append("sizes", form.sizes);

  

      data.append("isSpecialOffer", form.isSpecialOffer);

      data.append("image", image);

      const res = await axios.post(`${API}/api/products/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Uploaded");

      console.log(res.data);

      // RESET FORM
      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
      
        sizes: "",
        isSpecialOffer: false,
      });

      setImage(null);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10 mt-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Admin Upload Panel</h1>

        {/* ADMIN NAVIGATION */}
        <div className="mb-6 flex gap-4">
          <Link
            to="/admin-products"
            className="bg-black text-white px-6 py-3 inline-block"
          >
            View All Products
          </Link>

          <Link
            to="/admin-orders"
            className="bg-black text-white px-6 py-3 inline-block"
          >
            View Orders
          </Link>
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* PRODUCT NAME */}
          <input
            type="text"
            placeholder="Product Name"
            className="border p-4 w-full"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            className="border p-4 w-full"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            required
          />

          {/* CATEGORY */}
          <input
            type="text"
            placeholder="Category"
            className="border p-4 w-full"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            required
          />

          {/* SIZES */}
          <input
            type="text"
            placeholder="Sizes & Stock (S:2,M:3,L:1)"
            className="border p-4 w-full"
            value={form.sizes}
            onChange={(e) =>
              setForm({
                ...form,
                sizes: e.target.value,
              })
            }
          />

         

          {/* DESCRIPTION */}
          <textarea
            rows="5"
            placeholder="Description"
            className="border p-4 w-full"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            required
          />

          {/* SPECIAL OFFER */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isSpecialOffer}
              onChange={(e) =>
                setForm({
                  ...form,
                  isSpecialOffer: e.target.checked,
                })
              }
            />
            Special Offer
          </label>

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-4 w-full"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
