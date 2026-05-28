import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import emailjs from "@emailjs/browser";
import { PIN_PREFIXES } from "@/data/pinPrefixes";
import { CITIES } from "@/data/cities";
import axios from "axios";

import { useEffect } from "react";


const schema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  name: z.string().trim().min(2, "Name required").max(100),
  phone: z.string().trim().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  address: z
    .string()
    .trim()
    .min(10, "Enter complete address")
    .max(200)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s,./-]+$/, "Enter a valid address"),
  city: z.string().trim().refine(
    (val) => CITIES.some((c) => c.toLowerCase() === val.toLowerCase()),
    { message: "Enter a valid city" }
  ),
  zip: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  country: z.string().trim().min(2).max(60),
});

export default function Checkout() {

  useEffect(() => {
  if (!document.head.querySelector('[href*="Cormorant"]')) {
    const fontLink = document.createElement("link");

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";

    fontLink.rel = "stylesheet";

    document.head.appendChild(fontLink);
  }
}, []);


  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();

  const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [confirmedOrderId, setConfirmedOrderId] = useState("");

  // No tax, always free shipping
  const shipping = 0;
  const total = subtotal;

  const [form, setForm] = useState({
    email: user?.email ?? "",
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    address: "",
    city: "",
    zip: "",
    country: "India",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to continue");
      nav("/account");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError =
        errors.phone?.[0] ||
        errors.email?.[0] ||
        errors.name?.[0] ||
        errors.address?.[0] ||
        errors.city?.[0] ||
        errors.zip?.[0] ||
        errors.country?.[0] ||
        "Enter the form correctly";
      toast.error(firstError);
      return;
    }

    const cityPrefix = PIN_PREFIXES[form.city];
    if (!cityPrefix) {
      toast.error("Select a valid city");
      return;
    }
    if (!form.zip.startsWith(cityPrefix)) {
      toast.error(`PIN must start with ${cityPrefix} for ${form.city}`);
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment SDK not loaded. Please refresh the page.");
      return;
    }

    try {
      setLoading(true);

      const { data: razorpayOrder } = await axios.post(
        `${API}/api/payment/create-order`,
        { amount: subtotal }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Soo Clothing",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          try {
            const { data: verifyData } = await axios.post(
              `${API}/api/payment/verify`,
              response
            );

            if (!verifyData.success) {
              toast.error("Payment verification failed");
              setLoading(false);
              return;
            }

            await axios.post(`${API}/api/orders`, {
              userEmail: form.email,
              name: form.name,
              phone: form.phone,
              address: form.address,
              city: form.city,
              zip: form.zip,
              country: form.country,
              items: items.map((it) => ({
                productId: it.product.id,
                name: it.product.name,
                image: it.product.image,
                size: it.size,
                qty: it.qty,
                price: it.product.price,
              })),
              subtotal,
              shipping: 0,
              tax: 0,
              total,
              paymentId: verifyData.paymentId,
              paymentStatus: "Paid",
            });

            await axios.post(`${API}/api/products/decrement-stock`, {
              items: items.map((it) => ({
                productId: it.product._id,
                size: it.size,
                qty: it.qty,
              })),
            });

            const orderId = "SO-" + Math.floor(Math.random() * 90000 + 10000);

            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID,
              {
                order_id: orderId,
                email: form.email,
                customer_email: form.email,
                customer_phone: form.phone,
                customer_name: form.name,
                address: form.address,
                city: form.city,
                zip: form.zip,
                country: form.country,
                orders: items.map((it) => ({
                  name: `${it.product.name} - Size ${it.size}`,
                  units: it.qty,
                  price: it.product.price * it.qty,
                  image_url: it.product.image,
                })),
                cost: { shipping: 0, tax: 0, total },
                logo_url: "https://sooclothing.vercel.app/logo.png",
              },
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setConfirmedEmail(form.email);
            setConfirmedOrderId(orderId);
            toast.success("Order placed successfully!");
            setDone(true);
            clear();
          } catch (err) {
            console.error(err);
            toast.error("Order saving failed after payment. Contact support.");
          } finally {
            setLoading(false);
          }
        },

        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to initiate payment");
      setLoading(false);
    }
  };

  // EMPTY CART
  if (items.length === 0 && !done) {
    return (
      <div
        className="pt-44 pb-32 text-center px-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p
          className="uppercase mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 600,
          }}
        >
          Bag is empty
        </p>
        <Link
          to="/shop"
          className="text-accent"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ← Back to shop
        </Link>
      </div>
    );
  }

  // ORDER SUCCESS
  if (done) {
    return (
      <section
        className="pt-44 pb-32"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-8" />

          <p
            className="text-accent mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            — Order Confirmed
          </p>

          <h1
            className="uppercase leading-none mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Thank You.
          </h1>

          <p
            className="text-foreground/70 mb-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 300,
            }}
          >
            Order # {confirmedOrderId}
          </p>

          <p
            className="text-foreground/70 mb-10"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 300,
            }}
          >
            A confirmation has been sent to {confirmedEmail}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
            <Link
              to="/shop"
              className="bg-accent text-accent-foreground px-10 py-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Keep Shopping
            </Link>
            <button
              onClick={() => nav("/account")}
              className="border w-full md:w-auto border-border px-10 py-4 hover:border-accent transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              View Orders
            </button>
          </div>
        </div>
      </section>
    );
  }

  // CHECKOUT FORM
  return (
    <section
      className="pt-28 lg:pt-32 pb-20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* HEADER */}
        <div className="mb-12">
          <p
            className="text-accent mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            — Secure Checkout
          </p>
          <h1
            className="uppercase leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Checkout
          </h1>
        </div>

<form
  onSubmit={onSubmit}
  className="
    grid
    grid-cols-1
    xl:grid-cols-[1.4fr_0.8fr]
    gap-10
    xl:gap-16
    items-start
  "
>
          {/* LEFT SIDE */}
<div className="space-y-10 md:space-y-12 min-w-0">
            <Section title="01 / Contact">
              <Input label="Email" value={form.email} onChange={set("email")} type="email" placeholder="example@example.com" />
              <Input label="Phone" value={form.phone} onChange={set("phone")} type="tel" placeholder="9876543210" />
            </Section>

            <Section title="02 / Shipping">
              <Input label="Full name" value={form.name} onChange={set("name")} placeholder="John Doe" />
              <Input label="Address" value={form.address} onChange={set("address")} placeholder="Eg: No 12, Gandhi Street, Anna Nagar, Chennai" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="City" value={form.city} onChange={set("city")} placeholder="Chennai" />
                <Input label="ZIP" value={form.zip} onChange={set("zip")} placeholder="600032" />
              </div>
              <Input label="Country" value={form.country} onChange={set("country")} placeholder="India" />
            </Section>

            <Section title="03 / Payment">
              <div className="border border-border p-5 flex items-start gap-4">
                <Lock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    Secured by Razorpay
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      lineHeight: 1.6,
                    }}
                  >
                    You will be redirected to Razorpay's secure payment page.
                    We accept UPI, Cards, Net Banking & Wallets.
                  </p>
                </div>
              </div>
            </Section>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
<aside
  className="
    xl:sticky
    xl:top-28
    xl:self-start
    bg-secondary
    p-5
    sm:p-6
    lg:p-8
    space-y-5
    rounded-none
    border
    border-border/50
    h-fit
    w-full
    overflow-hidden
  "
>            <p
              className="uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Order
            </p>

            {/* ITEMS */}
<div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">              {items.map((it) => (
<div
  key={`${it.product.id}-${it.size}`}
  className="flex gap-3 min-w-0"
>
<div className="w-14 h-16 sm:w-16 sm:h-20 bg-background shrink-0 overflow-hidden relative">                    <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" />
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground flex items-center justify-center"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                      }}
                    >
                      {it.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
  className="uppercase line-clamp-2 break-words"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {it.product.name}
                    </p>
                    <p
                      className="text-muted-foreground uppercase"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.15em",
                        fontWeight: 400,
                      }}
                    >
                      Size {it.size}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    ₹ {it.product.price * it.qty}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-border" />

            <Row label="Subtotal" value={`₹ ${subtotal}`} />
            <Row label="Shipping" value="FREE" />

            <div className="h-px bg-border" />
            <Row label="Total" value={`₹ ${total.toFixed(2)}`} bold />

{/* PAY BUTTON */}
<button
  type="submit"
  disabled={loading}
  className="
    w-full
    sm:w-full
    md:w-full
    lg:w-[340px]
    xl:w-[380px]
    bg-accent
    text-accent-foreground
    py-4
    sm:py-4
    md:py-5
    px-6
    hover:bg-accent/90
    transition-all
    duration-300
    flex
    items-center
    justify-center
    gap-2
    disabled:opacity-60
    rounded-none
  "
  style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    fontWeight: 600,
  }}
>
  <Lock className="w-4 h-4" />
  {loading ? "Processing..." : `Pay ₹ ${total.toFixed(2)}`}
</button>

            <p
              className="text-muted-foreground text-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 300,
              }}
            >
              🔒 Secured by Razorpay
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p
        className="text-accent mb-4"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span
        className="text-muted-foreground block mb-2"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 transition-colors"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 300,
        }}
      />
    </label>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span
        className="text-muted-foreground uppercase"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: bold ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
          fontSize: bold ? "1.1rem" : "0.85rem",
          fontWeight: bold ? 700 : 400,
          color: bold ? "#0f1d4d" : "inherit",
        }}
      >
        {value}
      </span>
    </div>
  );
}