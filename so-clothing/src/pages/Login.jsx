import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
const BASE_URL =
  "https://sooclothing-1tpa.vercel.app/";
import logo from "../assets/logo.png";

import { z } from "zod";

import { toast } from "sonner";

const schema = z.object({

  email: z
    .string()
    .trim()
    .email("Valid email required")
    .max(255),

  password: z
    .string()
    .min(
      6,
      "Password must be 6+ characters"
    )
    .max(100),

});

export default function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (
    e
  ) => {

    e.preventDefault();

    const parsed =
      schema.safeParse(form);

    if (!parsed.success) {

      toast.error(
        parsed.error.errors[0]
          .message
      );

      return;
    }

    try {

      setLoading(true);

      // LOGIN API
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email: form.email,
          password:
            form.password,
        }
      );

      // SAVE USER TO CONTEXT
      login(
        res.data.user,
        res.data.token
      );

      toast.success(
        "Login successful"
      );

      // REDIRECT
      if (
        res.data.user.isAdmin
      ) {

        navigate("/admin");

      } else {

        navigate("/");

      }

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen flex items-center justify-center px-6 py-32">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-12"
        >

          <img
            src={logo}
            className="h-10 w-10"
            alt=""
          />

          <span className="font-display text-lg">
            SO.CLOTHING
          </span>

        </Link>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3 text-center">
          — Welcome Back
        </p>

        <h1 className="font-display text-4xl md:text-5xl uppercase text-center mb-12">
          Sign In
        </h1>

        {/* FORM */}
        <form
          onSubmit={
            submitHandler
          }
          className="space-y-5"
        >

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) =>
              setForm({
                ...form,
                email: v,
              })
            }
          />

          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) =>
              setForm({
                ...form,
                password: v,
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 disabled:opacity-60"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        {/* REGISTER */}
        <p className="mt-10 text-center text-sm text-muted-foreground">

          New here?{" "}

          <Link
            to="/register"
            className="text-accent font-mono text-xs uppercase tracking-widest ml-1"
          >
            Create account →
          </Link>

        </p>

      </div>

    </section>

  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}) {

  return (

    <label className="block">

      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">

        {label}

      </span>

      <input
        {...props}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm"
      />

    </label>

  );
}