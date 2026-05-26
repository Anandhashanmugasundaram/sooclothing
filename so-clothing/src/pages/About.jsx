import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Star,
  Instagram,
} from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";

import campaign from "@/assets/shope-image.jpeg";

gsap.registerPlugin(ScrollTrigger);

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function About() {
  const sectionRef = useRef(null);
  const heroImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroImgRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroImgRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(sectionRef.current.querySelectorAll(".fade-up"), {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const cards = sectionRef.current.querySelectorAll(".zoom-card");
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          scale: 0.92,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".cards-section"),
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader eyebrow="Streetwear Culture" title="$O.CLOTHING">
        Oversized fits. Bold identity. Built for the new generation.
      </PageHeader>

      <div ref={sectionRef} className="overflow-hidden bg-white">

        {/* HERO SECTION */}
        <section className="relative py-14 lg:py-26">

          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#fafafa] to-[#ffffff]" />

          {/* RED BLUR */}
          <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-red-500/10 blur-[120px] rounded-full" />

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">

            {/* LEFT CONTENT */}
            <div className="fade-up">

              {/* EYEBROW BADGE */}
              <p
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 bg-red-50 text-red-500 uppercase mb-8"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  fontWeight: 600,
                }}
              >
                <Sparkles className="w-4 h-4" />
                Modern Streetwear
              </p>

              {/* HERO HEADING */}
              <h1
                className="uppercase leading-[0.9] text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 9vw, 6.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                }}
              >
                Wear
                <br />
                Your
                <br />
                Identity.
              </h1>

              {/* BODY TEXT */}
              <p
                className="mt-8 leading-relaxed text-gray-600 max-w-xl"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                $O.CLOTHING blends oversized silhouettes, premium fabrics, and
                elevated aesthetics into a bold modern streetwear identity.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-red-500 transition-all duration-300 shadow-lg"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                  }}
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://www.instagram.com/_s0.clothing_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-gray-300 px-8 py-4 rounded-2xl hover:bg-black hover:text-white transition-all duration-300"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                  }}
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative fade-up flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px] rounded-[40px] overflow-hidden border border-gray-200 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
                <div className="relative h-[650px] overflow-hidden">
                  <img
                    ref={heroImgRef}
                    src={campaign}
                    alt="$O.CLOTHING"
                    className="absolute inset-0 w-full h-[115%] object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* FLOATING INFO */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl px-6 py-5 shadow-xl">
                  <p
                    className="text-red-500 mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Limited Drop
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <h3
                        className="uppercase text-black leading-none"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "2rem",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Summer 2026
                      </h3>
                      <p
                        className="mt-2 text-gray-500"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 300,
                        }}
                      >
                        Premium oversized collection
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 border-y bg-[#fafafa]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { n: "2025", l: "Brand Started" },
              { n: "1K+", l: "Instagram Reach" },
              { n: "500+", l: "Orders Delivered" },
              { n: "24/7", l: "Customer Support" },
            ].map((item) => (
              <div key={item.l} className="fade-up">
                <h2
                  className="text-[#111]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2.8rem, 5vw, 4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {item.n}
                </h2>
                <p
                  className="mt-3 text-gray-500"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {item.l}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CARDS */}
        <section className="cards-section py-24 lg:py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

            {/* HEADING */}
            <div className="text-center mb-20 fade-up">
              <p
                className="text-red-500 mb-4"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                WHY CHOOSE US
              </p>

              <h2
                className="text-black uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Built Different
              </h2>

              <p
                className="mt-6 max-w-2xl mx-auto text-gray-500"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                Premium streetwear designed with oversized silhouettes and
                elevated aesthetics.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Star size={34} />,
                  title: "Premium Quality",
                  desc: "Heavyweight fabrics with premium finishing and modern oversized fits.",
                },
                {
                  icon: <Truck size={34} />,
                  title: "Fast Shipping",
                  desc: "Quick dispatch and reliable delivery across India.",
                },
                {
                  icon: <ShieldCheck size={34} />,
                  title: "Trusted Brand",
                  desc: "Built for the new generation of streetwear lovers.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="zoom-card relative overflow-hidden rounded-[32px] border border-gray-200 bg-[#fafafa] p-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-8">
                    {card.icon}
                  </div>

                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      color: "#111",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}