import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Send,
  ArrowUpRight,
} from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(10, "Message too short").max(1000),
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader eyebrow="$O.CLOTHING" title="Contact Us">
        Minimal streetwear inspired by movement, culture, and the streets of Chennai.
      </PageHeader>

      <section className="relative overflow-hidden py-20 lg:py-32 bg-background">

        {/* BACKGROUND BLUR */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-3xl rounded-full" />

        <div className="relative max-w-[1450px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* IMAGE CARD */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-2xl">
                <img
                  src="/store-image.jpeg"
                  alt="$O Clothing Store"
                  className="w-full h-[650px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* FLOATING CARD */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <p
                    className="text-accent mb-3"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    — Visit Our Store
                  </p>

                  <h2
                    className="uppercase text-white mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                    }}
                  >
                    $O.CLOTHING
                  </h2>

                  <p
                    className="text-white/70 leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    Premium streetwear crafted for bold individuals who live fashion beyond trends.
                  </p>
                </div>
              </div>

              {/* CONTACT INFO CARDS */}
              <div className="grid sm:grid-cols-2 gap-5">
                <ContactCard
                  icon={<MapPin className="w-5 h-5" />}
                  title="Location"
                  content={<>Deenadayalu Street, T Nagar, Chennai</>}
                />
                <ContactCard
                  icon={<Phone className="w-5 h-5" />}
                  title="Phone"
                  content="+91 94445 45351"
                />
                <ContactCard
                  icon={<Mail className="w-5 h-5" />}
                  title="Email"
                  content="soclothingoff@gmail.com"
                />
                <ContactCard
                  icon={<Instagram className="w-5 h-5" />}
                  title="Instagram"
                  content={
                    <a
                      href="https://www.instagram.com/_s0.clothing_/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent transition inline-flex items-center gap-2"
                    >
                      @$oclothingshop
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  }
                />
              </div>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="relative bg-secondary/70 backdrop-blur-xl border border-border rounded-[2rem] p-8 lg:p-12 shadow-2xl">

              <div className="mb-8">
                <p
                  className="text-accent mb-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  — Send Message
                </p>

                <h2
                  className="uppercase mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Let's Talk
                </h2>

                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.75,
                  }}
                >
                  Collaborations, wholesale, styling projects, or custom drops —
                  connect with the $O.CLOTHING team.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <Field
                  label="Your Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />

                {/* MESSAGE */}
                <label className="block">
                  <span
                    className="text-muted-foreground block mb-3"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      fontWeight: 400,
                    }}
                  >
                    Your Message
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={7}
                    placeholder="Tell us about your project..."
                    className="w-full bg-background/50 border border-border focus:border-accent outline-none px-5 py-4 rounded-xl resize-none transition"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                    }}
                  />
                </label>

                {/* SEND BUTTON */}
                <button
                  disabled={loading}
                  className="group w-full bg-accent text-accent-foreground py-4 rounded-xl hover:scale-[1.02] hover:bg-accent/90 transition-all duration-300 disabled:opacity-60"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  <span className="inline-flex items-center gap-3">
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, title, content }) {
  return (
    <div className="bg-secondary border border-border rounded-2xl p-5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p
            className="text-muted-foreground mb-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            {title}
          </p>
          <div
            className="leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
            }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, ...props }) {
  return (
    <label className="block">
      <span
        className="text-muted-foreground block mb-3"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background/50 border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none px-5 py-4 rounded-xl transition"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 300,
        }}
      />
    </label>
  );
}