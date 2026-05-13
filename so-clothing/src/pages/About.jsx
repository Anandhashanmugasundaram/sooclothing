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

      gsap.from(
        sectionRef.current.querySelectorAll(".fade-up"),
        {
          opacity: 0,
          y: 60,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.from(
        sectionRef.current.querySelectorAll(".zoom-card"),
        {
          opacity: 0,
          scale: 0.92,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-section",
            start: "top 85%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Streetwear Culture"
        title="$O.CLOTHING"
      >
        Oversized fits. Bold identity.
        Built for the new generation.
      </PageHeader>

      <div
        ref={sectionRef}
        className="overflow-hidden bg-white"
      >

        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-36">

          {/* BACKGROUND */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#ffffff]
              via-[#fafafa]
              to-[#ffffff]
            "
          />

          {/* RED BLUR */}
          <div
            className="
              absolute
              top-20
              right-0
              w-[350px]
              h-[350px]
              bg-red-500/10
              blur-[120px]
              rounded-full
            "
          />

          <div
            className="
              max-w-[1600px]
              mx-auto
              px-6
              lg:px-12
              grid
              lg:grid-cols-2
              gap-20
              items-center
              relative
              z-10
            "
          >

            {/* LEFT CONTENT */}
            <div className="fade-up">

              <p
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-full
                  border
                  border-red-200
                  bg-red-50
                  text-red-500
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  font-semibold
                  mb-8
                "
              >

                <Sparkles className="w-4 h-4" />

                Modern Streetwear

              </p>

              <h1
                className="
                  text-[50px]
                  md:text-[80px]
                  lg:text-[100px]
                  font-black
                  leading-[0.9]
                  uppercase
                  tracking-[-4px]
                  text-[#111]
                "
              >
                Wear
                <br />
                Your
                <br />
                Identity.
              </h1>

              <p
                className="
                  mt-8
                  text-lg
                  leading-relaxed
                  text-gray-600
                  max-w-xl
                "
              >
                $O.CLOTHING blends oversized
                silhouettes, premium fabrics,
                and elevated aesthetics into
                a bold modern streetwear identity.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  to="/shop"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    bg-black
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    hover:bg-red-500
                    transition-all
                    duration-300
                    shadow-lg
                  "
                >

                  Shop Collection

                  <ArrowRight
                    className="
                      w-5
                      h-5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </Link>

                <a
                  href="https://www.instagram.com/_s0.clothing_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    border
                    border-gray-300
                    px-8
                    py-4
                    rounded-2xl
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >

                  <Instagram className="w-5 h-5" />

                  Instagram

                </a>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div
              className="
                relative
                fade-up
                flex
                justify-center
                lg:justify-end
              "
            >

              {/* MAIN CARD */}
              <div
                className="
                  relative
                  w-full
                  max-w-[620px]
                  rounded-[40px]
                  overflow-hidden
                  border
                  border-gray-200
                  bg-white
                  shadow-[0_40px_100px_rgba(0,0,0,0.12)]
                "
              >

                {/* IMAGE WRAPPER */}
                <div
                  className="
                    relative
                    h-[650px]
                    overflow-hidden
                  "
                >

                  <img
  ref={heroImgRef}
  src={campaign}
  alt="$O.CLOTHING"
  className="
    absolute
    inset-0
    w-full
    h-[115%]
    object-cover
    object-center

    scale-110
    group-hover:scale-100

    transition-transform
    duration-700
    ease-out
  "
/>

                </div>

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                  "
                />

                {/* FLOATING INFO */}
                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6

                    bg-white/90
                    backdrop-blur-xl

                    border
                    border-white/30

                    rounded-3xl
                    px-6
                    py-5

                    shadow-xl
                  "
                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-red-500
                      font-semibold
                      mb-2
                    "
                  >
                    Limited Drop
                  </p>

                  <div className="flex items-end justify-between">

                    <div>

                      <h3
                        className="
                          text-3xl
                          font-black
                          uppercase
                          text-black
                          leading-none
                        "
                      >
                        Summer 2026
                      </h3>

                      <p className="text-gray-500 mt-2">
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

          <div
            className="
              max-w-[1600px]
              mx-auto
              px-6
              lg:px-12
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-10
            "
          >

            {[
              {
                n: "2025",
                l: "Brand Started",
              },
              {
                n: "10K+",
                l: "Instagram Reach",
              },
              {
                n: "500+",
                l: "Orders Delivered",
              },
              {
                n: "24/7",
                l: "Customer Support",
              },
            ].map((item) => (

              <div
                key={item.l}
                className="fade-up"
              >

                <h2
                  className="
                    text-5xl
                    md:text-6xl
                    font-black
                    text-[#111]
                  "
                >
                  {item.n}
                </h2>

                <p
                  className="
                    mt-3
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    text-gray-500
                  "
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
                className="
                  uppercase
                  tracking-[0.35em]
                  text-red-500
                  text-xs
                  font-semibold
                  mb-4
                "
              >
                WHY CHOOSE US
              </p>

              <h2
                className="
                  text-4xl
                  md:text-6xl
                  font-black
                  text-black
                  uppercase
                "
              >
                Built Different
              </h2>

              <p
                className="
                  mt-6
                  max-w-2xl
                  mx-auto
                  text-gray-500
                  text-lg
                "
              >
                Premium streetwear designed
                with oversized silhouettes
                and elevated aesthetics.
              </p>

            </div>

            {/* GRID */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >

              {[
                {
                  icon: <Star size={34} />,
                  title: "Premium Quality",
                  desc:
                    "Heavyweight fabrics with premium finishing and modern oversized fits.",
                },
                {
                  icon: <Truck size={34} />,
                  title: "Fast Shipping",
                  desc:
                    "Quick dispatch and reliable delivery across India.",
                },
                {
                  icon: <ShieldCheck size={34} />,
                  title: "Trusted Brand",
                  desc:
                    "Built for the new generation of streetwear lovers.",
                },
              ].map((card) => (

                <div
                  key={card.title}
                  className="
                    zoom-card
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-gray-200
                    bg-[#fafafa]
                    p-10
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    group
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-[160px]
                      h-[160px]
                      bg-red-100
                      rounded-full
                      blur-[80px]
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                    "
                  />

                  {/* ICON */}
                  <div
                    className="
                      relative
                      z-10
                      w-16
                      h-16
                      rounded-2xl
                      bg-black
                      text-white
                      flex
                      items-center
                      justify-center
                      mb-8
                    "
                  >
                    {card.icon}
                  </div>

                  <h3
                    className="
                      relative
                      z-10
                      text-2xl
                      font-bold
                      text-black
                      mb-4
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      relative
                      z-10
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    {card.desc}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

      </div>
    </>
  );
}