import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

import logo from "../assets/logo.png";

const schema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  password: z.string().min(6, "Password must be 6+ characters").max(100),
});

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Store token
      localStorage.setItem("token", res.data.token);

      // Store user data
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(res.data.message);

      nav("/account");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">

        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-12"
        >
          <img src={logo} className="h-10 w-10" alt="" />

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

        <form onSubmit={onSubmit} className="space-y-5">

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) =>
              setForm({ ...form, email: v })
            }
            autoComplete="email"
          />

          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) =>
              setForm({ ...form, password: v })
            }
            autoComplete="current-password"
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
            >
              Forgot password?
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />

          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Or
          </span>

          <div className="flex-1 h-px bg-border" />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          New to SO.CLOTHING?{" "}

          <Link
            to="/register"
            className="text-accent hover:underline font-mono text-xs uppercase tracking-widest ml-1"
          >
            Create account →
          </Link>
        </p>

      </div>
    </section>
  );
}

function Field({ label, value, onChange, ...props }) {
  return (
    <label className="block">

      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
        {label}
      </span>

      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm"
      />

    </label>
  );
}