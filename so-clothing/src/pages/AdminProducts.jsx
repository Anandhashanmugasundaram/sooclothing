import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Pencil,
  X,
} from "lucide-react";

export default function AdminProducts() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const API = import.meta.env.VITE_API_URL;

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      price: "",
      category: "",
      description: "",
      sizes: "",
    });

  const [image, setImage] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        const res =
          await axios.get(
            `${API}/api/products`
          );

        setProducts(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // DELETE PRODUCT
  const deleteProduct =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `${API}/api/products/${id}`
        );

        setProducts(
          products.filter(
            (p) =>
              p._id !== id
          )
        );

        alert(
          "Product deleted"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Delete failed"
        );

      }

    };

  // OPEN EDIT
  const openEdit =
    (product) => {

      setSelectedId(
        product._id
      );

      setForm({
        name:
          product.name,
        price:
          product.price,
        category:
          product.category,
        description:
          product.description,
        sizes:
          product.sizes?.join(
            ","
          ),
      });

      setImage(null);

      setEditOpen(true);

    };

  // UPDATE PRODUCT
  const updateProduct =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "name",
          form.name
        );

        data.append(
          "price",
          form.price
        );

        data.append(
          "category",
          form.category
        );

        data.append(
          "description",
          form.description
        );

        data.append(
          "sizes",
          form.sizes
        );

        if (image) {

          data.append(
            "image",
            image
          );

        }

        const res =
          await axios.put(
            `${API}/api/products/${selectedId}`,
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setProducts(
          products.map(
            (p) =>
              p._id ===
              selectedId
                ? res.data
                    .product
                : p
          )
        );

        alert(
          "Product updated"
        );

        setEditOpen(false);

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Update failed"
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
          products.length ===
          0 ? (
            <p>
              No products found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {products.map(
                (product) => (

                  <div
                    key={
                      product._id
                    }
                    className="border rounded-xl overflow-hidden shadow-sm"
                  >

                    {/* IMAGE */}
                  <img
  src={product.image}
  alt={product.name}

                      className="w-full h-[300px] object-cover"
                    />

                    {/* DETAILS */}
                    <div className="p-4">

                      <h2 className="text-xl font-semibold">
                        {
                          product.name
                        }
                      </h2>

                      <p className="mt-1 text-gray-600">
                        ₹{" "}
                        {
                          product.price
                        }
                      </p>

                      <p className="text-sm capitalize text-gray-500 mt-1">
                        {
                          product.category
                        }
                      </p>

                      <div className="flex gap-3 mt-4">

                        {/* UPDATE */}
                        <button
                          onClick={() =>
                            openEdit(
                              product
                            )
                          }
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >

                          <Pencil className="w-4 h-4" />

                          Update

                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >

                          <Trash2 className="w-4 h-4" />

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>
          )
        }

      </div>

      {/* EDIT MODAL */}
      {editOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-white w-full max-w-xl rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={() =>
                setEditOpen(
                  false
                )
              }
              className="absolute top-4 right-4"
            >

              <X />

            </button>

            <h2 className="text-3xl font-bold mb-8">
              Update Product
            </h2>

            <form
              onSubmit={
                updateProduct
              }
              className="space-y-5"
            >

              {/* NAME */}
              <input
                type="text"
                placeholder="Product Name"
                className="border p-4 w-full"
                value={
                  form.name
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    name:
                      e.target
                        .value,
                  })
                }
                required
              />

              {/* PRICE */}
              <input
                type="number"
                placeholder="Price"
                className="border p-4 w-full"
                value={
                  form.price
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    price:
                      e.target
                        .value,
                  })
                }
                required
              />

              {/* CATEGORY */}
              <input
                type="text"
                placeholder="Category"
                className="border p-4 w-full"
                value={
                  form.category
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    category:
                      e.target
                        .value,
                  })
                }
                required
              />

              {/* SIZES */}
              <input
                type="text"
                placeholder="Sizes (S,M,L)"
                className="border p-4 w-full"
                value={
                  form.sizes
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    sizes:
                      e.target
                        .value,
                  })
                }
              />

              {/* DESCRIPTION */}
              <textarea
                rows="5"
                placeholder="Description"
                className="border p-4 w-full"
                value={
                  form.description
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,
                    description:
                      e.target
                        .value,
                  })
                }
                required
              />

              {/* IMAGE */}
              <input
                type="file"
                accept="image/*"
                onChange={(
                  e
                ) =>
                  setImage(
                    e.target
                      .files[0]
                  )
                }
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-black text-white py-4 w-full rounded-lg"
              >

                Update Product

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}