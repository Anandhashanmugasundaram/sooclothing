import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


import logo from "../assets/logo.png";
import z from "zod";

const schema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  password: z.string().min(6, "Password must be 6+ characters").max(100),
});

export default function Login() {

  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  // SUBMIT
  const submitHandler = async (e) => {
  console.log("EMAIL:", form.email);
  console.log("PASSWORD:", form.password);
    e.preventDefault();

    try {

      setLoading(true);

      // API CALL
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // CHECK RESPONSE
      console.log(res.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      alert("Login Successful");

      // ADMIN REDIRECT
      if (res.data.user.isAdmin) {

        navigate("/admin");

      } else {

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            className="border p-4 w-full rounded"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            className="border p-4 w-full rounded"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-4 rounded"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

      </div>
    </div>
  );
}