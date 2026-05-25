// PremiumLoader.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import logo from "../../assets/logo.png";

export default function PremiumLoader() {
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef(null);
  const logoWrapRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef([]);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef({ value: 0 });

  const brand = "SO.CLOTHING".split("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    // INITIAL STATES
    gsap.set(loaderRef.current, {
      opacity: 1,
    });

    gsap.set(logoWrapRef.current, {
      scale: 0.7,
      opacity: 0,
      rotate: -8,
    });

    gsap.set(logoRef.current, {
      scale: 1.2,
      filter: "blur(12px)",
    });

    gsap.set(titleRef.current, {
      y: 120,
      opacity: 0,
      rotateX: -90,
      transformOrigin: "top center",
    });

    gsap.set(progressBarRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    // BACKGROUND BREATHING
    gsap.to(".loader-glow", {
      scale: 1.2,
      opacity: 0.7,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // FLOATING PARTICLES
    gsap.to(".particle", {
      y: "random(-100,100)",
      x: "random(-60,60)",
      opacity: "random(0.2,0.8)",
      duration: "random(3,6)",
      stagger: 0.05,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // LOGO ENTRANCE
    tl.to(logoWrapRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.8,
      ease: "expo.out",
    });

    tl.to(
      logoRef.current,
      {
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
      },
      "-=1.4"
    );

    // TITLE LETTERS
    tl.to(
      titleRef.current,
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: "expo.out",
      },
      "-=1"
    );

    // PROGRESS BAR
    tl.to(
      progressBarRef.current,
      {
        scaleX: 1,
        duration: 2.8,
        ease: "power2.inOut",
      },
      "-=0.8"
    );

    // COUNTER
    tl.to(
      counterRef.current,
      {
        value: 100,
        duration: 2.8,
        ease: "none",
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.innerHTML = `${Math.floor(
              counterRef.current.value
            )}%`;
          }
        },
      },
      "-=2.8"
    );

    // FINAL CINEMATIC FLASH
    tl.to(
      ".flash-layer",
      {
        opacity: 0.08,
        duration: 0.3,
        repeat: 1,
        yoyo: true,
      },
      "-=0.4"
    );

    // EXIT ANIMATION
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1.8,
      ease: "expo.inOut",
      delay: 0.2,
      onComplete: () => {
        setLoading(false);
        document.body.style.overflow = "auto";
      },
    });

    // MAIN CONTENT REVEAL
    tl.fromTo(
      ".main-content",
      {
        opacity: 0,
        scale: 1.05,
        filter: "blur(20px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
      },
      "-=1.2"
    );

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          ref={loaderRef}
          className="
            fixed inset-0 z-[99999]
            overflow-hidden
            bg-black
            text-white
          "
        >
          {/* FLASH */}
          <div className="flash-layer absolute inset-0 bg-white opacity-0 z-20" />

          {/* NOISE */}
          <div
            className="
              absolute inset-0 opacity-[0.04]
              mix-blend-screen
              bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]
            "
          />

          {/* HUGE GLOW */}
          <div
            className="
              loader-glow
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[900px]
              h-[900px]
              rounded-full
              bg-white/[0.05]
              blur-3xl
            "
          />

          {/* GRID */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
              bg-[size:80px_80px]
              opacity-20
            "
          />

          {/* PARTICLES */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <span
                key={i}
                className="
                  particle
                  absolute
                  rounded-full
                  bg-white/40
                "
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
            {/* LOGO */}
            <div
              ref={logoWrapRef}
              className="relative flex items-center justify-center mb-14"
            >
              {/* OUTER RINGS */}
              <div className="absolute w-[260px] h-[260px] rounded-full border border-white/10 animate-spin [animation-duration:20s]" />

              <div className="absolute w-[180px] h-[180px] rounded-full border border-white/10 animate-spin [animation-duration:12s] [animation-direction:reverse]" />

              {/* LOGO CONTAINER */}
              <div
                className="
                  relative
                  w-32
                  h-32
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  flex items-center justify-center
                  shadow-[0_0_80px_rgba(255,255,255,0.08)]
                "
              >
                <img
                  ref={logoRef}
                  src={logo}
                  alt="SO.CLOTHING"
                  className="
                    w-20
                    object-contain
                    invert
                    select-none
                    pointer-events-none
                  "
                  draggable="false"
                />
              </div>
            </div>

            {/* TITLE */}
            <div className="flex flex-wrap justify-center overflow-hidden">
              {brand.map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => (titleRef.current[index] = el)}
                  className="
                    text-[12vw]
                    sm:text-[8vw]
                    md:text-[5rem]
                    lg:text-[6rem]
                    font-extralight
                    tracking-[0.35em]
                    uppercase
                    text-white
                    leading-none
                  "
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            {/* SUBTEXT */}
            <p
              className="
                mt-6
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.6em]
                text-white/40
              "
            >
              PREMIUM STREETWEAR EXPERIENCE
            </p>

            {/* PROGRESS */}
            <div className="w-[280px] mt-16">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">
                  Initializing
                </span>

                <span
                  ref={progressRef}
                  className="text-[10px] tracking-[0.4em] text-white/50"
                >
                  0%
                </span>
              </div>

              <div className="h-[2px] overflow-hidden bg-white/10 rounded-full">
                <div
                  ref={progressBarRef}
                  className="
                    h-full
                    bg-white
                    shadow-[0_0_25px_rgba(255,255,255,0.9)]
                  "
                />
              </div>
            </div>

            {/* BOTTOM TEXT */}
            <div
              className="
                absolute bottom-10
                text-[10px]
                uppercase
                tracking-[0.7em]
                text-white/20
              "
            >
              EST. FUTURE STREET LUXURY
            </div>
          </div>

          {/* VIGNETTE */}
          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.9)_100%)]
            "
          />
        </div>
      )}
    </>
  );
}