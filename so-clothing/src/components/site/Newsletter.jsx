// Newsletter.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function Newsletter() {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".nl-text > *"), {
        opacity: 0,
        y: 50,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
      gsap.to(blobRef.current, {
        scale: 1.4,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(0_0%_14%)]" />
      <div
        ref={blobRef}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/30 blur-[120px]"
      />

      <div className="nl-text relative max-w-3xl mx-auto px-6 text-center">

        {/* EYEBROW */}
        <p
          className="text-accent mb-6 uppercase"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            fontWeight: 500,
          }}
        >
          — Join The Pack
        </p>

        {/* HEADLINE */}
        <h2
          className="uppercase leading-[0.9] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          First Access.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            No Mercy.
          </span>
        </h2>

        {/* BODY */}
        <p
          className="text-primary-foreground/70 mb-10 max-w-md mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          Subscribe and unlock 24-hour early access to every drop, before it
          sells out.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-md mx-auto border-b border-primary-foreground/30 focus-within:border-accent transition-colors"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent py-4 outline-none placeholder:text-primary-foreground/40 text-primary-foreground"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          />
          <button
            type="submit"
            className="px-4 hover:text-accent transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}