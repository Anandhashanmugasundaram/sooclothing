import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, CheckCircle2 } from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  email: z
    .string()
    .trim()
    .email("Valid email required")
    .max(255),

  name: z
    .string()
    .trim()
    .min(2, "Name required")
    .max(100),

  phone: z
    .string()
    .trim()
    .min(10, "Phone required"),

  address: z
    .string()
    .trim()
    .min(4, "Address required")
    .max(200),

  city: z
    .string()
    .trim()
    .min(2, "City required")
    .max(80),

  zip: z
    .string()
    .trim()
    .min(3, "ZIP required")
    .max(12),

  country: z
    .string()
    .trim()
    .min(2)
    .max(60),

  card: z
    .string()
    .trim()
    .regex(
      /^[\d ]{13,19}$/,
      "Card number invalid"
    ),

  expiry: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Use MM/YY"
    ),

  cvc: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "CVC invalid"),
});

export default function Checkout() {

  const {
    items,
    subtotal,
    clear,
  } = useCart();

  const { user } = useAuth();

  const nav = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [done, setDone] =
    useState(false);

  const shipping =
    subtotal > 150 ? 0 : 12;

  const tax = +(
    subtotal * 0.08
  ).toFixed(2);

  const total =
    subtotal + shipping + tax;

  const [form, setForm] =
    useState({
      email: user?.email ?? "",
      name: user?.name ?? "",
      phone: "",
      address: "",
      
      city: "",
      zip: "",
      country: "India",
      card: "",
      expiry: "",
      cvc: "",
    });

  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.value,
    });

  const onSubmit = async (e) => {

    e.preventDefault();

    const parsed =
      schema.safeParse(form);

    if (!parsed.success) {

      const first =
        Object.values(
          parsed.error.flatten()
            .fieldErrors
        )[0]?.[0];

      toast.error(
        first ??
        "Please check the form"
      );

      return;
    }

    try {

      setLoading(true);

      const orderData = {
        userEmail: form.email,

        customerName: form.name,

        phone: form.phone,

        address: form.address,

        city: form.city,

        zip: form.zip,

        country: form.country,

        items: items.map((it) => ({
          productId: it.product._id,
          name: it.product.name,
          image: it.product.image,
          size: it.size,
          qty: it.qty,
          price: it.product.price,
        })),

        subtotal,
        shipping,
        tax,
        total,
      };

     await axios.post(
  "http://localhost:5000/api/orders/create",
  {
    userEmail: form.email,
    name: form.name,
    phone: form.phone,
    address: form.address,
    city: form.city,
    zip: form.zip,
    country: form.country,

    items: items.map((it) => ({
      productId: it.product._id,
      name: it.product.name,
      image: it.product.image,
      size: it.size,
      qty: it.qty,
      price: it.product.price,
    })),

    subtotal,
    shipping,
    tax,
    total,
  }
);

      setDone(true);

      clear();

    } catch (error) {

      console.log(error);

      toast.error("Order failed");

    } finally {

      setLoading(false);

    }
  };

  // EMPTY CART
  if (
    items.length === 0 &&
    !done
  ) {

    return (
      <div className="pt-44 pb-32 text-center px-6">

        <p className="font-display text-3xl uppercase mb-4">
          Bag is empty
        </p>

        <Link
          to="/shop"
          className="font-mono text-xs uppercase tracking-widest text-accent"
        >
          ← Back to shop
        </Link>

      </div>
    );
  }

  // SUCCESS
  if (done) {

    return (
      <section className="pt-44 pb-32">

        <div className="max-w-2xl mx-auto px-6 text-center">

          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-8" />

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            — Order Confirmed
          </p>

          <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
            Thank You.
          </h1>

          <p className="text-foreground/70 mb-2">
            Order #
            SO-
            {Math.floor(
              Math.random() * 90000 + 10000
            )}
          </p>

          <p className="text-foreground/70 mb-10">
            A confirmation has been sent to{" "}
            {form.email}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to="/shop"
              className="bg-accent text-accent-foreground px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]"
            >
              Keep Shopping
            </Link>

            <button
              onClick={() =>
                nav("/account")
              }
              className="border border-border px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] hover:border-accent"
            >
              View Orders
            </button>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="pt-28 lg:pt-32 pb-20">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="mb-12">

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            — Secure Checkout
          </p>

          <h1 className="font-display text-4xl md:text-6xl uppercase leading-none">
            Checkout
          </h1>

        </div>

        <form
          onSubmit={onSubmit}
          className="grid lg:grid-cols-3 gap-12"
        >

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">

            {/* CONTACT */}
            <Section title="01 / Contact">

              <Input
                label="Email"
                value={form.email}
                onChange={set("email")}
                type="email"
              />

            </Section>

            {/* SHIPPING */}
            <Section title="02 / Shipping">

              <Input
                label="Full name"
                value={form.name}
                onChange={set("name")}
              />

              <Input
                label="Phone Number"
                value={form.phone}
                onChange={set("phone")}
                placeholder="9876543210"
              />

              <Input
                label="Address"
                value={form.address}
                onChange={set("address")}
              />

              <div className="grid grid-cols-2 gap-4">

                <Input
                  label="City"
                  value={form.city}
                  onChange={set("city")}
                />

                <Input
                  label="ZIP"
                  value={form.zip}
                  onChange={set("zip")}
                />

              </div>

              <Input
                label="Country"
                value={form.country}
                onChange={set("country")}
              />

            </Section>

            {/* PAYMENT */}
            <Section
              title="03 / Payment"
              subtitle="Demo only — no card will be charged."
            >

              <Input
                label="Card number"
                value={form.card}
                onChange={set("card")}
                placeholder="4242 4242 4242 4242"
              />

              <div className="grid grid-cols-2 gap-4">

                <Input
                  label="Expiry (MM/YY)"
                  value={form.expiry}
                  onChange={set("expiry")}
                  placeholder="12/28"
                />

                <Input
                  label="CVC"
                  value={form.cvc}
                  onChange={set("cvc")}
                  placeholder="123"
                />

              </div>

            </Section>

          </div>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-28 lg:self-start bg-secondary p-8 space-y-5">

            <p className="font-display text-xl uppercase">
              Order
            </p>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">

              {items.map((it) => (

                <div
                  key={it.id}
                  className="flex gap-3"
                >

                  <div className="w-14 h-16 bg-background shrink-0 overflow-hidden relative">

                    <img
                      src={`http://localhost:5000/uploads/${it.product.image}`}
                      alt={it.product.name}
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-mono">
                      {it.qty}
                    </span>

                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="font-display text-sm uppercase truncate">
                      {it.product.name}
                    </p>

                    <p className="font-mono text-[10px] text-muted-foreground uppercase">
                      Size {it.size}
                    </p>

                  </div>

                  <p className="font-mono text-xs">
                    ₹ {it.product.price * it.qty}
                  </p>

                </div>
              ))}

            </div>

            <div className="h-px bg-border" />

            <Row
              label="Subtotal"
              value={`₹ ${subtotal}`}
            />

            <Row
              label="Shipping"
              value={
                shipping === 0
                  ? "Free"
                  : `₹ ${shipping}`
              }
            />

            <Row
              label="Tax"
              value={`₹ ${tax}`}
            />

            <div className="h-px bg-border" />

            <Row
              label="Total"
              value={`₹ ${total}`}
              bold
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >

              <Lock className="w-3.5 h-3.5" />

              {
                loading
                  ? "Processing..."
                  : `Pay ₹ ${total}`
              }

            </button>

            <p className="text-[11px] text-muted-foreground text-center">
              🔒 Demo checkout — no real payment is processed.
            </p>

          </aside>

        </form>

      </div>

    </section>
  );
}


// SECTION
function Section({
  title,
  subtitle,
  children,
}) {

  return (

    <div>

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
        {title}
      </p>

      {
        subtitle && (
          <p className="text-xs text-muted-foreground mb-4">
            {subtitle}
          </p>
        )
      }

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}


// INPUT
function Input({
  label,
  ...props
}) {

  return (

    <label className="block">

      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
        {label}
      </span>

      <input
        {...props}
        className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm transition-colors"
      />

    </label>
  );
}


// ROW
function Row({
  label,
  value,
  bold,
}) {

  return (

    <div
      className={`flex justify-between font-mono ${
        bold
          ? "text-base"
          : "text-sm"
      }`}
    >

      <span className="uppercase tracking-widest text-xs text-muted-foreground">
        {label}
      </span>

      <span>{value}</span>

    </div>
  );
}