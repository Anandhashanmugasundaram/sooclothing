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

import campaign from "@/assets/campaign.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {

  const sectionRef = useRef(null);

  const heroImgRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.to(heroImgRef.current, {
        yPercent: -18,
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
          y: 70,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.from(
        sectionRef.current.querySelectorAll(".zoom-card"),
        {
          opacity: 0,
          scale: 0.9,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-section",
            start: "top 80%",
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
        className="overflow-hidden"
      >

        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-36">

          {/* BG */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-white
              via-[#fafafa]
              to-white
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
              gap-16
              items-center
              relative
              z-10
            "
          >

            {/* LEFT */}
            <div className="fade-up">

              <p
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  border-red-200
                  bg-red-50
                  text-red-500
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  font-medium
                  mb-8
                "
              >
                <Sparkles className="w-4 h-4" />
                New Generation Streetwear
              </p>

              <h1
                className="
                  text-[48px]
                  md:text-[72px]
                  lg:text-[95px]
                  font-black
                  leading-[0.95]
                  uppercase
                  tracking-[-3px]
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
                $O.CLOTHING creates premium
                streetwear inspired by modern youth
                culture, oversized silhouettes,
                minimal aesthetics, and bold energy.
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
            <div className="relative fade-up">

              {/* RED GLOW */}
              <div
                className="
                  absolute
                  -top-10
                  -right-10
                  w-[220px]
                  h-[220px]
                  bg-red-400/20
                  blur-[100px]
                  rounded-full
                "
              />

              {/* IMAGE CARD */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[40px]
                  border
                  border-gray-200
                  shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                "
              >

                <img
                  ref={heroImgRef}
                  src={campaign}
                  alt="$O.CLOTHING"
                  className="
                    w-full
                    h-[115%]
                    object-cover
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />

                {/* FLOATING TAG */}
                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    bg-white
                    px-5
                    py-4
                    rounded-2xl
                    shadow-xl
                  "
                >

                  <p className="text-sm text-gray-500">
                    Limited Drop
                  </p>

                  <h3 className="text-xl font-bold">
                    Summer 2026
                  </h3>

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
<section className="py-24 lg:py-32 bg-white">

  <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

    {/* HEADING */}
    <div className="text-center mb-20">

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
        Premium streetwear designed with
        oversized silhouettes, modern fits,
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

          {/* TOP GLOW */}
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

          {/* TITLE */}
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

          {/* DESC */}
          <p
            className="
              relative
              z-10
              text-gray-600
              leading-relaxed
              text-[16px]
            "
          >
            {card.desc}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>
        {/* CTA */}
        <section className="pb-28">

          <div
            className="
              max-w-6xl
              mx-auto
              px-6
            "
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-[40px]
                bg-black
                text-white
                px-8
                py-20
                md:px-16
                text-center
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  top-0
                  left-1/2
                  -translate-x-1/2
                  w-[400px]
                  h-[400px]
                  bg-red-500/20
                  blur-[120px]
                "
              />

              <div className="relative z-10 fade-up">

                <p
                  className="
                    uppercase
                    tracking-[0.3em]
                    text-red-400
                    text-xs
                    mb-5
                  "
                >
                  — Join The Movement
                </p>

                <h2
                  className="
                    text-4xl
                    md:text-7xl
                    font-black
                    uppercase
                    leading-none
                  "
                >
                  $O.CLOTHING
                </h2>

                <p
                  className="
                    mt-8
                    max-w-2xl
                    mx-auto
                    text-gray-300
                    text-lg
                    leading-relaxed
                  "
                >
                  Streetwear made for creators,
                  dreamers, and people who never
                  settle for ordinary.
                </p>

                <Link
                  to="/shop"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    mt-10
                    bg-white
                    text-black
                    px-8
                    py-4
                    rounded-2xl
                    font-semibold
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  Explore Collection

                  <ArrowRight className="w-5 h-5" />

                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}