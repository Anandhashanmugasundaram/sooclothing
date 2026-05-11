// import { useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// export default function Admin() {

//   // GET USER
//   const user = JSON.parse(
//     localStorage.getItem("user")
//   );

//   // PROTECT ADMIN PAGE
// //   if (!user?.isAdmin) {
// //     return <Navigate to="/" />;
// //   }

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     sizes: "",
//   });

//   const [image, setImage] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(false);

//   // SUBMIT
//   const submitHandler = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       // FORM DATA
//       const data = new FormData();

//       data.append("name", form.name);
//       data.append("price", form.price);
//       data.append(
//         "category",
//         form.category
//       );
//       data.append(
//         "description",
//         form.description
//       );
//       data.append(
//         "sizes",
//         form.sizes
//       );
//       data.append(
//         "image",
//         image
//       );

//       // GET TOKEN
//       const token =
//         localStorage.getItem("token");

//       console.log("TOKEN:", token);

//       // API CALL
//       const res = await axios.post(
//         "http://localhost:5000/api/products/add",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//       alert("Product Uploaded");

//       console.log(res.data);

//       // RESET FORM
//       setForm({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         sizes: "",
//       });

//       setImage(null);

//     } catch (error) {

//       console.log("TOKEN",error);

//       alert(
//         error.response?.data?.message ||
//         "Upload failed"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div className="min-h-screen p-10 bg-white">

//       <div className="max-w-xl mx-auto">

//         <h1 className="text-4xl font-bold mb-10">
//           Admin Upload Panel
//         </h1>

//         <form
//           onSubmit={submitHandler}
//           className="space-y-5"
//         >

//           {/* PRODUCT NAME */}
//           <input
//             type="text"
//             placeholder="Product Name"
//             className="border p-4 w-full"
//             value={form.name}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 name: e.target.value,
//               })
//             }
//             required
//           />

//           {/* PRICE */}
//           <input
//             type="number"
//             placeholder="Price"
//             className="border p-4 w-full"
//             value={form.price}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 price: e.target.value,
//               })
//             }
//             required
//           />

//           {/* CATEGORY */}
//           <input
//             type="text"
//             placeholder="Category"
//             className="border p-4 w-full"
//             value={form.category}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 category: e.target.value,
//               })
//             }
//             required
//           />

//           {/* SIZES */}
//           <input
//             type="text"
//             placeholder="Sizes (S,M,L,XL)"
//             className="border p-4 w-full"
//             value={form.sizes}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 sizes: e.target.value,
//               })
//             }
//           />

//           {/* DESCRIPTION */}
//           <textarea
//             rows="5"
//             placeholder="Description"
//             className="border p-4 w-full"
//             value={form.description}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 description: e.target.value,
//               })
//             }
//             required
//           />

//           {/* IMAGE */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               setImage(
//                 e.target.files[0]
//               )
//             }
//             required
//           />

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-black text-white px-8 py-4 w-full disabled:opacity-50"
//           >
//             {
//               loading
//                 ? "Uploading..."
//                 : "Upload Product"
//             }
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export default function Admin() {

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROTECT PAGE
  if (!user?.isAdmin) {

    return <Navigate to="/" />;

  }

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
  });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // SUBMIT
  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

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

      data.append(
        "image",
        image
      );

      // GET TOKEN
      const token =
        localStorage.getItem("token");

      console.log("TOKEN:", token);

      // API CALL
      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Product Uploaded");

      console.log(res.data);

      // RESET
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

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-white p-10 mt-12">

      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Admin Upload Panel
        </h1>
<div className="mb-6">

  <Link
    to="/admin-products"
    className="bg-black text-white px-6 py-3 inline-block"
  >
    View All Products
  </Link>

</div>
        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >

          {/* NAME */}
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
            placeholder="Sizes (S,M,L,XL)"
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
                description:
                  e.target.value,
              })
            }
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-4 w-full"
          >
            {
              loading
                ? "Uploading..."
                : "Upload Product"
            }
          </button>

        </form>

      </div>
    </div>
  );
}