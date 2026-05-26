import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dropsImage from "../../assets/drop-image.png";

gsap.registerPlugin(ScrollTrigger);

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function Drops() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drops"
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary py-24 lg:py-32 border-y border-border"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* TOP TEXT */}
        <div ref={textRef} className="mb-16 text-center">
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
            — Street Cart Collection
          </p>

          <h2
            className="uppercase mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Wear The Wild
          </h2>

          <p
            className="max-w-2xl mx-auto text-muted-foreground leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Crafted for the streets. Inspired by movement. SO.CLOTHING blends
            minimalist fashion with urban energy through limited edition drops.
          </p>
        </div>

        {/* IMAGE CARD */}
        <div
          ref={imageRef}
          className="relative rounded-[2rem] overflow-hidden border border-border bg-background shadow-2xl"
        >
          <img
            src={dropsImage}
            alt="SO.CLOTHING street cart"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          {/* FLOATING LABEL */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-background/80 backdrop-blur-md border border-border px-5 py-4 rounded-2xl">
            <p
              className="text-accent mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              New Drop / SS26
            </p>

            <h3
              className="uppercase leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Street Cart
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}