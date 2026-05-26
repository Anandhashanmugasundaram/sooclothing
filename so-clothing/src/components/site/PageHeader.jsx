// PageHeader.jsx
import { useReveal } from "@/hooks/useGsap";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function PageHeader({ eyebrow, title, children }) {
  const ref = useReveal();

  return (
    <section className="pt-26 pb-5 lg:pt-39 lg:pb-14 border-b border-border">
      <div
        ref={ref}
        className="gsap-fade max-w-[1600px] mx-auto px-6 lg:px-12"
      >
        {/* EYEBROW */}
        {eyebrow && (
          <p
            className="text-accent mb-5 uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              fontWeight: 500,
            }}
          >
            — {eyebrow}
          </p>
        )}

        {/* TITLE */}
        <h1
          className="uppercase leading-[0.9]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* CHILDREN / DESCRIPTION */}
        {children && (
          <div
            className="mt-8 max-w-2xl text-foreground/70"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              lineHeight: 1.75,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}