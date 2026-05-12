// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { toast } from "sonner";
// import { useAuth } from "@/contexts/AuthContext";
// import logo from "../assets/logo.png";

// const schema = z.object({
//   name: z.string().trim().min(2, "Name required").max(100),
//   email: z.string().trim().email("Valid email required").max(255),
//   password: z.string().min(6, "Password must be 6+ characters").max(100),
// });

// export default function Register() {
//   const { register } = useAuth();
//   const nav = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const parsed = schema.safeParse(form);
//     if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
//     setLoading(true);
//     try {
//       await register(form.name, form.email, form.password);
//       toast.success("Welcome to the pack");
//       nav("/account");
//     } finally { setLoading(false); }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center px-6 py-32">
//       <div className="w-full max-w-md">
//         <Link to="/" className="flex items-center justify-center gap-3 mb-12">
//           <img src={logo} className="h-10 w-10" alt="" />
//           <span className="font-display text-lg">SO.CLOTHING</span>
//         </Link>
//         <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3 text-center">— Join The Pack</p>
//         <h1 className="font-display text-4xl md:text-5xl uppercase text-center mb-12">Create Account</h1>

//         <form onSubmit={onSubmit} className="space-y-5">
//           <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
//           <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" />
//           <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} autoComplete="new-password" />
//           <button disabled={loading} className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 disabled:opacity-60">
//             {loading ? "Creating..." : "Create Account"}
//           </button>
//         </form>

//         <p className="mt-10 text-center text-sm text-muted-foreground">
//           Already part of the pack?{" "}
//           <Link to="/login" className="text-accent font-mono text-xs uppercase tracking-widest ml-1">Sign in →</Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// function Field({ label, value, onChange, ...props }) {
//   return (
//     <label className="block">
//       <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">{label}</span>
//       <input
//         {...props}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm"
//       />
//     </label>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../assets/logo.png";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),

  email: z
    .string()
    .trim()
    .email("Valid email required")
    .max(255),

  password: z
    .string()
    .min(6, "Password must be 6+ characters")
    .max(100),
});

export default function Register() {

  const { register } = useAuth();

  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const onSubmit = async (e) => {

    e.preventDefault();

    const parsed =
      schema.safeParse(form);

    if (!parsed.success) {

      toast.error(
        parsed.error.errors[0].message
      );

      return;
    }

    setLoading(true);

    try {

      await register(
        form.name,
        form.email,
        form.password
      );

      toast.success(
        "Account created successfully"
      );

      // GO LOGIN
      nav("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
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
          — Join The Pack
        </p>

        <h1 className="font-display text-4xl md:text-5xl uppercase text-center mb-12">
          Create Account
        </h1>

        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >

          <Field
            label="Full name"
            value={form.name}
            onChange={(v) =>
              setForm({
                ...form,
                name: v,
              })
            }
            autoComplete="name"
          />

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
            autoComplete="email"
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
            autoComplete="new-password"
          />

          <button
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 disabled:opacity-60"
          >
            {
              loading
                ? "Creating..."
                : "Create Account"
            }
          </button>

        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">

          Already part of the pack?{" "}

          <Link
            to="/login"
            className="text-accent font-mono text-xs uppercase tracking-widest ml-1"
          >
            Sign in →
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
          onChange(e.target.value)
        }
        className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm"
      />
    </label>
  );
}
