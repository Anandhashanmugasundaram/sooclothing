import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(10, "Message too short").max(1000),
});

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "saiprasana2404@gmail.com",
        },
        "YOUR_PUBLIC_KEY"
      );

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Get In Touch" title="Contact">
        Wholesale, press, custom commissions, or just to say hello — we read every message.
      </PageHeader>

      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">

          {/* Contact Details */}
          <div className="space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
                — Studio
              </p>

              <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">
                Find Us
              </h2>

              <div className="space-y-5 text-foreground/80">

                <ContactItem
                  icon={<MapPin className="w-4 h-4" />}
                  title="Address"
                >
                  No:37/17, 11th Street
                  <br />
                  Ashok Nagar
                  <br />
                  Chennai - 600083
                </ContactItem>

                <ContactItem
                  icon={<Mail className="w-4 h-4" />}
                  title="Email"
                >
                  saiprasana2404@gmail.com
                </ContactItem>

                <ContactItem
                  icon={<Phone className="w-4 h-4" />}
                  title="Phone"
                >
                  8787989867
                </ContactItem>

                <ContactItem
                  icon={<Instagram className="w-4 h-4" />}
                  title="Social"
                >
                  @so.clothing
                </ContactItem>

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="bg-secondary p-8 lg:p-12 space-y-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              — Send a Message
            </p>

            <Field
              label="Name"
              value={form.name}
              onChange={(v) =>
                setForm({
                  ...form,
                  name: v,
                })
              }
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
            />

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                Message
              </span>

              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                rows={6}
                className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 font-mono text-sm resize-none"
              />
            </label>

            <button
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-accent/90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="text-accent mt-1">{icon}</span>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
          {title}
        </p>

        <p className="text-sm">{children}</p>
      </div>
    </div>
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