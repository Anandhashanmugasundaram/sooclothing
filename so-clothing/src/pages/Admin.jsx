import { useState } from "react";
import axios from "axios";

export default function Admin() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
  });

  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("sizes", form.sizes);
    data.append("image", image);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        data
      );

      alert("Product Uploaded");

      console.log(res.data);

      // RESET FORM
      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        sizes: "",
      });

      setImage(null);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl mb-10">
        Admin Upload
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5 max-w-md"
      >

        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 w-full"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 w-full"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 w-full"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Sizes (S,M,L,XL)"
          className="border p-3 w-full"
          value={form.sizes}
          onChange={(e) =>
            setForm({
              ...form,
              sizes: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="border p-3 w-full"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button className="bg-black text-white px-6 py-3">
          Upload Product
        </button>

      </form>
    </div>
  );
}