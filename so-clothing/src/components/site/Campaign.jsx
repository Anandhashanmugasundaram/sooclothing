import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import campaign from "@/assets/campaign.jpg";

gsap.registerPlugin(ScrollTrigger);

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function Campaign() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -20,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(sectionRef.current.querySelectorAll(".campaign-text > *"), {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(sectionRef.current.querySelectorAll(".campaign-stat"), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".campaign-stats"),
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative py-24 lg:py-40 overflow-hidden bg-background"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* IMAGE */}
          <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[16/19] overflow-hidden">
            <img
              ref={imgRef}
              src={campaign}
              alt="SO.CLOTHING editorial"
              loading="lazy"
              className="w-full h-[120%] object-cover gsap-parallax-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            <p
              className="absolute bottom-6 left-6 bg-background/70 backdrop-blur px-3 py-1.5 text-foreground/80"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              Lookbook 26 / Frame 04
            </p>
          </div>

          {/* TEXT */}
          <div className="campaign-text lg:col-span-5">
            <p
              className="text-accent mb-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              — The Manifesto
            </p>

            <h2
              className="uppercase leading-none mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Made For The
              <br />
              <span
                className="text-accent"
                style={{ fontStyle: "italic", fontWeight: 400 }}
              >
                Untamed.
              </span>
            </h2>

            <p
              className="text-foreground/70 leading-relaxed mb-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              We don't follow trends. We hunt them. Every stitch carries the
              weight of the wild — fabric chosen for its grit, silhouettes built
              for those who move with intent.
            </p>

            <p
              className="text-foreground/70 leading-relaxed mb-10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              SO.CLOTHING is a refusal of the ordinary. A second skin for those
              who run with the pack.
            </p>

            <div className="campaign-stats grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat n="07" label="Drops / Year" />
              <Stat n="120+" label="Cities" />
              <Stat n="∞" label="Attitude" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div className="campaign-stat">
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          marginBottom: "0.25rem",
        }}
      >
        {n}
      </p>
      <p
        className="text-muted-foreground"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        {label}
      </p>
    </div>
  );
}