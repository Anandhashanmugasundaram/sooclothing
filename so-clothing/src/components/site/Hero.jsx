import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import hero1 from "../../assets/hero1.png";
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

export function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(imgRef.current, { scale: 1.1, duration: 2, ease: "power2.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 1 }, "-=1.5")
        .from(".hero-title .line", { opacity: 0, y: 80, duration: 1.2, stagger: 0.15 }, "-=0.8")
        .from(".hero-copy", { opacity: 0, y: 30, duration: 1 }, "-=0.7")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 0.8 }, "-=0.8")
        .from(".hero-side", { opacity: 0, x: -20, duration: 1 }, "-=0.8");

      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        yPercent: -20,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* HERO IMAGE */}
      <img
        ref={imgRef}
        src={hero1}
        alt="SO.CLOTHING SS26 campaign"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center gsap-parallax-img"
      />

      {/* OVERLAYS */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />

      {/* SIDE TEXT */}
      <div className="hero-side absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-20">
        <p
          className="text-foreground/50 [writing-mode:vertical-rl] rotate-180"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Collection 01 / Wear The Wild
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">

        {/* TOP LABEL */}
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <p
            className="text-foreground/70"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            New Drop / SS26
          </p>
        </div>

        {/* TITLE */}
        <h1
          ref={titleRef}
          className="hero-title uppercase leading-[0.85] max-w-5xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14vw, 16vw, 9rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="line block">Wear</span>
          <span className="line block">
            The{" "}
            <span
              className="text-accent"
              style={{ fontStyle: "italic", fontWeight: 400 }}
            >
              Wild
            </span>
          </span>
        </h1>

        {/* DESCRIPTION + BUTTON */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl">
          <p
            className="hero-copy text-foreground/70 max-w-md leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              lineHeight: 1.75,
            }}
          >
            Born from instinct. Cut from raw cloth. SO.CLOTHING crafts
            limited drops for those who refuse to blend in.
          </p>

          <a
            href="#shop"
            className="hero-cta group inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 transition-all duration-500"
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Shop the Drop
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3 text-foreground/40">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <span className="w-12 h-px bg-foreground/40" />
      </div>
    </section>
  );
}