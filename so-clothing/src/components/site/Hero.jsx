import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import hero1 from "../../assets/hero1.png";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// GOOGLE FONTS
// ─────────────────────────────────────────────────────────────
if (!document.head.querySelector('[href*="Cormorant"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:wght@300;400;700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap";

  document.head.appendChild(link);
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const sideTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // IMAGE PARALLAX
      gsap.to(imageRef.current, {
        yPercent: 15,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // OVERLAY
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // TITLE DRIFT
      gsap.to(titleRef.current, {
        yPercent: -15,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // SIDE TEXT
      gsap.to(sideTextRef.current, {
        x: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["Wear", "The", "Wild"];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-black"
      >
        {/* REVEAL LAYER */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ transformOrigin: "right" }}
          className="absolute inset-0 z-[100] bg-black"
        />

        {/* IMAGE */}
        <motion.img
          ref={imageRef}
          src={hero1}
          alt="hero"
          initial={{
            scale: 1.25,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            willChange: "transform",
          }}
        />

        {/* GRAIN */}
        <div
          className="absolute inset-0 z-[2] opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* OVERLAY */}
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.68 }}
          transition={{
            duration: 1.8,
          }}
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* SIDE OVERLAY */}
        <div
          className="absolute inset-0 z-[4]"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.75), transparent 60%)",
          }}
        />

        {/* GRID */}
        <div className="absolute inset-0 z-[5] hidden lg:block opacity-[0.06] pointer-events-none">
          {[25, 50, 75].map((item) => (
            <div
              key={item}
              className="absolute top-0 bottom-0 border-l border-white"
              style={{
                left: `${item}%`,
              }}
            />
          ))}
        </div>

        {/* NAVBAR */}
        <motion.nav
          initial={{
            y: -80,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 lg:px-12 py-8"
        >
          <a
            href="/"
            className="text-white uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontSize: "1.5rem",
            }}
          >
            SO.
          </a>

          <div className="flex items-center gap-8">
            {["Shop", "Drops", "About"].map((item, i) => (
              <motion.a
                key={i}
                href="/"
                whileHover={{
                  y: -2,
                  color: "#e84c1e",
                }}
                transition={{
                  duration: 0.2,
                }}
                className="uppercase text-white/70 text-[11px]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.28em",
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* SIDE TEXT */}
        <motion.div
          ref={sideTextRef}
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 hidden md:block"
        >
          <p
            className="text-white/40"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
            }}
          >
            Collection 01 / Wear The Wild / SS26
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 flex min-h-screen flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24 pt-28">
          {/* EYEBROW */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mb-8 flex items-center gap-3"
          >
            {/* PULSE DOT */}
            <motion.div
              animate={{
                scale: [1, 1.7, 1],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="h-2 w-2 rounded-full bg-[#e84c1e]"
            />

            <p
              className="uppercase text-white/65"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.32em",
              }}
            >
              New Drop /
              <span className="text-[#e84c1e]">
                {" "}
                SS26 — Collection 01
              </span>
            </p>
          </motion.div>

          {/* TITLE */}
          <div ref={titleRef}>
            {headline.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{
                    y: 180,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.5 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="uppercase leading-[0.82]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(4rem,12vw,12rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: word === "Wild" ? "#e84c1e" : "#fff",
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* STATS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.5,
              duration: 0.8,
            }}
            className="mt-8 flex gap-8 sm:gap-12"
          >
            {[
              {
                num: "01",
                label: "Collection",
              },
              {
                num: "12",
                label: "Pieces",
              },
              {
                num: "SS26",
                label: "Season",
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-[#e84c1e]"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.28em",
                  }}
                >
                  {item.num}
                </p>

                <p
                  className="mt-1 text-white/40 uppercase"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* LINE */}
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              delay: 1.7,
              duration: 1.2,
            }}
            style={{
              transformOrigin: "left",
            }}
            className="mt-10 mb-8 h-[1px] max-w-[480px] bg-white/10"
          />

          {/* DESCRIPTION + CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 max-w-5xl">
            {/* COPY */}
            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.8,
                duration: 0.9,
              }}
              className="max-w-md text-white/60 leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
              }}
            >
              Born from instinct. Cut from raw cloth.
              SO.CLOTHING crafts limited drops for those
              who refuse to blend in.
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#shop"
              whileHover={{
                scale: 1.04,
                backgroundColor: "#e84c1e",
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="group inline-flex items-center gap-4 border border-[#e84c1e] px-8 py-4 text-white transition-colors"
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                }}
              >
                Shop The Drop
              </span>

              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </div>
        </div>

        {/* SCROLL */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="absolute bottom-8 right-8 lg:right-12 z-30 flex flex-col items-center gap-3"
        >
          <span
            className="uppercase text-white/40"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
            }}
          >
            Scroll
          </span>

          <div className="relative h-20 w-[1px] overflow-hidden bg-white/20">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
              className="absolute inset-0 bg-[#e84c1e]"
            />
          </div>
        </motion.div>
      </section>

      <Marquee />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────
function Marquee() {
  const words = [
    "WEAR THE WILD",
    "LIMITED DROPS",
    "STREETWEAR",
    "SS26",
    "SO.CLOTHING",
  ];

  return (
    <div className="overflow-hidden bg-[#0f0f0f] py-6">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
        className="flex gap-14 whitespace-nowrap"
      >
        {[...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="uppercase text-white"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}