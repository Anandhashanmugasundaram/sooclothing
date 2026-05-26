import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import hero1 from "../../assets/hero1.png";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const titleRef   = useRef(null);
  const eyebrowRef = useRef(null);
  const copyRef    = useRef(null);
  const ctaRef     = useRef(null);
  const sideRef    = useRef(null);
  const scrollRef  = useRef(null);
  const pulseRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Custom cursor dot ────────────────────────────────────────
      const dot = document.createElement("div");
      Object.assign(dot.style, {
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "8px",
        height:        "8px",
        background:    "#e84c1e",
        borderRadius:  "50%",
        pointerEvents: "none",
        zIndex:        9999,
        transform:     "translate(-50%,-50%)",
      });
      document.body.appendChild(dot);
      const moveDot = (e) =>
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      window.addEventListener("mousemove", moveDot);

      // ── Magnetic CTA ─────────────────────────────────────────────
      const cta = ctaRef.current;
      if (cta) {
        const onMove = (e) => {
          const rect = cta.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.25;
          const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.25;
          gsap.to(cta, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () =>
          gsap.to(cta, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
        cta.addEventListener("mousemove", onMove);
        cta.addEventListener("mouseleave", onLeave);
      }

      // ── Intro timeline ───────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        .from(imgRef.current, { scale: 1.14, duration: 2.2, ease: "power2.out" })
        .from(overlayRef.current, { opacity: 0, duration: 1.8 }, "<")
        .from(sideRef.current, { opacity: 0, x: -30, duration: 1 }, "-=1.4")
        .from(eyebrowRef.current, { opacity: 0, y: 24, duration: 0.9 }, "-=1.2")
        .from(".hero-line-inner", {
          yPercent: 110,
          opacity:  0,
          duration: 1.1,
          stagger:  0.2,
          ease:     "power4.out",
        }, "-=0.8")
        .from(copyRef.current, { opacity: 0, y: 28, duration: 0.9 }, "-=0.6")
        .from(ctaRef.current, {
          opacity:  0,
          y:        28,
          scale:    0.88,
          duration: 0.8,
          ease:     "back.out(1.4)",
        }, "-=0.7")
        .from(scrollRef.current, { opacity: 0, x: 20, duration: 0.7 }, "-=0.4");

      // ── Scroll parallax ──────────────────────────────────────────
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(titleRef.current, {
        yPercent: -22,
        opacity:  0.2,
        ease:     "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.88,
        ease:    "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ── Eyebrow pulse dot loop ───────────────────────────────────
      gsap.to(pulseRef.current, {
        scale:    1.7,
        opacity:  0.2,
        duration: 0.9,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
      });

      // ── Scroll-line breathe loop ─────────────────────────────────
      gsap.to(".hero-scroll-line", {
        scaleX:          0.25,
        transformOrigin: "left center",
        duration:        1.2,
        repeat:          -1,
        yoyo:            true,
        ease:            "sine.inOut",
      });

      // ── Cleanup ──────────────────────────────────────────────────
      return () => {
        window.removeEventListener("mousemove", moveDot);
        dot.remove();
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* BG IMAGE */}
        <img
          ref={imgRef}
          src={hero1}
          alt="SO.CLOTHING SS26 campaign"
          className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center"
          style={{ willChange: "transform" }}
        />

        {/* OVERLAYS */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />

        {/* SIDE TEXT */}
        <div
          ref={sideRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/50 [writing-mode:vertical-rl] rotate-180">
            Collection 01 / Wear The Wild
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">

          {/* EYEBROW */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8">
            <span ref={pulseRef} className="w-2 h-2 bg-accent rounded-full block" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
              New Drop / SS26
            </p>
          </div>

          {/* TITLE */}
          <h1
            ref={titleRef}
            className="font-display uppercase leading-[0.85] max-w-5xl text-[18vw] sm:text-[15vw] md:text-[10vw] lg:text-[9rem]"
          >
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">Wear</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">
                The <span className="text-accent italic">Wild</span>
              </span>
            </span>
          </h1>

          {/* COPY + CTA */}
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl">
            <p ref={copyRef} className="text-foreground/70 max-w-md text-base leading-relaxed">
              Born from instinct. Cut from raw cloth. SO.CLOTHING crafts
              limited drops for those who refuse to blend in.
            </p>

            <a
              ref={ctaRef}
              href="#shop"
              className="group inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 transition-colors duration-500"
              style={{ willChange: "transform" }}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget.querySelector("svg"), { x: 4, duration: 0.3, ease: "power2.out" })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget.querySelector("svg"), { x: 0, duration: 0.4, ease: "elastic.out(1,0.5)" })
              }
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em]">
                Shop the Drop
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div
          ref={scrollRef}
          className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3 text-foreground/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="hero-scroll-line block w-12 h-px bg-foreground/40" />
        </div>
      </section>

      {/* ── MARQUEE below hero ── */}
      <Marquee />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MARQUEE  (slow infinite text band below hero)
// ─────────────────────────────────────────────────────────────────
function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    requestAnimationFrame(() => {
      const totalW = track.scrollWidth / 2;

      const anim = gsap.to(track, {
        x:        -totalW,
        duration: 22,
        ease:     "none",
        repeat:   -1,
      });

      const parent = track.parentElement;
      const slow   = () => gsap.to(anim, { timeScale: 0.3, duration: 0.5 });
      const fast   = () => gsap.to(anim, { timeScale: 1,   duration: 0.5 });
      parent.addEventListener("mouseenter", slow);
      parent.addEventListener("mouseleave", fast);
    });
  }, []);

  const words   = ["WEAR THE WILD", "—", "STREET CART COLLECTION", "—", "LIMITED DROPS", "—", "SS26", "—"];
  const doubled = [...words, ...words];

  return (
    <div style={{ background: "#111", padding: "24px 0", overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap", willChange: "transform" }}
      >
        {doubled.map((w, i) => (
          <span
            key={i}
            style={{
              fontFamily:    "'Bebas Neue', Impact, sans-serif",
              fontSize:      36,
              color:         i % 2 === 0 ? "#fff" : "var(--color-accent, #e84c1e)",
              letterSpacing: "0.05em",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}