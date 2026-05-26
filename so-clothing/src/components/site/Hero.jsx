// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight } from "lucide-react";

// import hero1 from "../../assets/hero1.png";

// gsap.registerPlugin(ScrollTrigger);

// // ─────────────────────────────────────────────────────────────────
// // GOOGLE FONTS
// // ─────────────────────────────────────────────────────────────────

// const fontLink = document.createElement("link");

// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";

// fontLink.rel = "stylesheet";

// if (!document.head.querySelector('[href*="Archivo+Black"]')) {
//   document.head.appendChild(fontLink);
// }

// // ─────────────────────────────────────────────────────────────────
// // HERO
// // ─────────────────────────────────────────────────────────────────

// export function Hero() {
//   const sectionRef = useRef(null);
//   const imgRef = useRef(null);
//   const overlayRef = useRef(null);
//   const titleRef = useRef(null);
//   const eyebrowRef = useRef(null);
//   const copyRef = useRef(null);
//   const ctaRef = useRef(null);
//   const sideRef = useRef(null);
//   const scrollRef = useRef(null);
//   const pulseRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       // ── Custom cursor ───────────────────────────────────────────
//       const dot = document.createElement("div");

//       Object.assign(dot.style, {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "8px",
//         height: "8px",
//         background: "#e84c1e",
//         borderRadius: "50%",
//         pointerEvents: "none",
//         zIndex: 9999,
//         transform: "translate(-50%,-50%)",
//       });

//       document.body.appendChild(dot);

//       const moveDot = (e) => {
//         gsap.to(dot, {
//           x: e.clientX,
//           y: e.clientY,
//           duration: 0.15,
//           ease: "power2.out",
//         });
//       };

//       window.addEventListener("mousemove", moveDot);

//       // ── Magnetic CTA ────────────────────────────────────────────
//       const cta = ctaRef.current;

//       if (cta) {
//         const onMove = (e) => {
//           const rect = cta.getBoundingClientRect();

//           const dx =
//             (e.clientX - (rect.left + rect.width / 2)) * 0.25;

//           const dy =
//             (e.clientY - (rect.top + rect.height / 2)) * 0.25;

//           gsap.to(cta, {
//             x: dx,
//             y: dy,
//             duration: 0.4,
//             ease: "power2.out",
//           });
//         };

//         const onLeave = () => {
//           gsap.to(cta, {
//             x: 0,
//             y: 0,
//             duration: 0.7,
//             ease: "elastic.out(1,0.4)",
//           });
//         };

//         cta.addEventListener("mousemove", onMove);
//         cta.addEventListener("mouseleave", onLeave);
//       }

//       // ── Intro Timeline ──────────────────────────────────────────
//       const tl = gsap.timeline({
//         defaults: { ease: "power3.out" },
//       });

//       tl
//         .from(imgRef.current, {
//           scale: 1.14,
//           duration: 2.2,
//           ease: "power2.out",
//         })

//         .from(
//           overlayRef.current,
//           {
//             opacity: 0,
//             duration: 1.8,
//           },
//           "<"
//         )

//         .from(
//           sideRef.current,
//           {
//             opacity: 0,
//             x: -30,
//             duration: 1,
//           },
//           "-=1.4"
//         )

//         .from(
//           eyebrowRef.current,
//           {
//             opacity: 0,
//             y: 24,
//             duration: 0.9,
//           },
//           "-=1.2"
//         )

//         .from(
//           ".hero-line-inner",
//           {
//             yPercent: 110,
//             opacity: 0,
//             duration: 1.1,
//             stagger: 0.2,
//             ease: "power4.out",
//           },
//           "-=0.8"
//         )

//         .from(
//           copyRef.current,
//           {
//             opacity: 0,
//             y: 28,
//             duration: 0.9,
//           },
//           "-=0.6"
//         )

//         .from(
//           ctaRef.current,
//           {
//             opacity: 0,
//             y: 28,
//             scale: 0.88,
//             duration: 0.8,
//             ease: "back.out(1.4)",
//           },
//           "-=0.7"
//         )

//         .from(
//           scrollRef.current,
//           {
//             opacity: 0,
//             x: 20,
//             duration: 0.7,
//           },
//           "-=0.4"
//         );

//       // ── Parallax ────────────────────────────────────────────────
//       gsap.to(imgRef.current, {
//         yPercent: 18,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//         },
//       });

//       gsap.to(titleRef.current, {
//         yPercent: -22,
//         opacity: 0.2,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//         },
//       });

//       gsap.to(overlayRef.current, {
//         opacity: 0.88,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//         },
//       });

//       // ── Pulse ───────────────────────────────────────────────────
//       gsap.to(pulseRef.current, {
//         scale: 1.7,
//         opacity: 0.2,
//         duration: 0.9,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       // ── Scroll line ─────────────────────────────────────────────
//       gsap.to(".hero-scroll-line", {
//         scaleX: 0.25,
//         transformOrigin: "left center",
//         duration: 1.2,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       return () => {
//         window.removeEventListener("mousemove", moveDot);
//         dot.remove();
//       };

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       {/* HERO */}
//       <section
//         ref={sectionRef}
//         className="relative min-h-screen w-full overflow-hidden"
//       >

//         {/* IMAGE */}
//         <img
//           ref={imgRef}
//           src={hero1}
//           alt="SO.CLOTHING SS26 campaign"
//           className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center"
//           style={{ willChange: "transform" }}
//         />

//         {/* OVERLAYS */}
//         <div
//           ref={overlayRef}
//           className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
//         />

//         <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />

//         {/* SIDE TEXT */}
//         <div
//           ref={sideRef}
//           className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-20"
//         >
//           <p
//             className="text-foreground/50 [writing-mode:vertical-rl] rotate-180"
//             style={{
//               fontFamily: "'Space Mono', monospace",
//               fontSize: "10px",
//               letterSpacing: "0.4em",
//               textTransform: "uppercase",
//             }}
//           >
//             Collection 01 / Wear The Wild
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">

//           {/* EYEBROW */}
//           <div
//             ref={eyebrowRef}
//             className="flex items-center gap-3 mb-8"
//           >
//             <span
//               ref={pulseRef}
//               className="w-2 h-2 bg-accent rounded-full block"
//             />

//             <p
//               className="text-foreground/70"
//               style={{
//                 fontFamily: "'Space Mono', monospace",
//                 fontSize: "12px",
//                 letterSpacing: "0.3em",
//                 textTransform: "uppercase",
//               }}
//             >
//               New Drop / SS26
//             </p>
//           </div>

//           {/* TITLE */}
// <h1
//   ref={titleRef}
//   className="uppercase leading-[0.85] max-w-5xl text-[22vw] sm:text-[19vw] md:text-[14vw] lg:text-[12rem]"
//   style={{
//     fontFamily: "'Cormorant Garamond', serif",
//     fontWeight: 700,
//     letterSpacing: "-0.02em",
//   }}
// >
//   <span className="block overflow-hidden">
//     <span className="hero-line-inner block">Wear</span>
//   </span>

//   <span className="block overflow-hidden">
//     <span className="hero-line-inner block">
//       The{" "}
//       <span
//         className="text-accent"
//         style={{ fontStyle: "italic", fontWeight: 700 }}
//       >
//         Wild
//       </span>
//     </span>
//   </span>
// </h1>

//           {/* COPY + CTA */}
//           <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl">

//             <p
//               ref={copyRef}
//               className="text-foreground/70 max-w-md text-base leading-relaxed"
//               style={{
//                 fontFamily: "'Inter', sans-serif",
//               }}
//             >
//               Born from instinct. Cut from raw cloth.
//               SO.CLOTHING crafts limited drops for those
//               who refuse to blend in.
//             </p>

//             <a
//               ref={ctaRef}
//               href="#shop"
//               className="group inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 transition-colors duration-500"
//               style={{
//                 willChange: "transform",
//               }}
//               onMouseEnter={(e) =>
//                 gsap.to(
//                   e.currentTarget.querySelector("svg"),
//                   {
//                     x: 4,
//                     duration: 0.3,
//                     ease: "power2.out",
//                   }
//                 )
//               }
//               onMouseLeave={(e) =>
//                 gsap.to(
//                   e.currentTarget.querySelector("svg"),
//                   {
//                     x: 0,
//                     duration: 0.4,
//                     ease: "elastic.out(1,0.5)",
//                   }
//                 )
//               }
//             >
//               <span
//                 style={{
//                   fontFamily: "'Space Mono', monospace",
//                   fontSize: "12px",
//                   letterSpacing: "0.25em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Shop the Drop
//               </span>

//               <ArrowRight className="w-4 h-4" />
//             </a>
//           </div>
//         </div>

//         {/* SCROLL */}
//         <div
//           ref={scrollRef}
//           className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3 text-foreground/40"
//         >
//           <span
//             style={{
//               fontFamily: "'Space Mono', monospace",
//               fontSize: "10px",
//               letterSpacing: "0.3em",
//               textTransform: "uppercase",
//             }}
//           >
//             Scroll
//           </span>

//           <span className="hero-scroll-line block w-12 h-px bg-foreground/40" />
//         </div>
//       </section>

//       <Marquee />
//     </>
//   );
// }

// // ─────────────────────────────────────────────────────────────────
// // MARQUEE
// // ─────────────────────────────────────────────────────────────────

// // ─────────────────────────────────────────────────────────────────
// // MARQUEE
// // ─────────────────────────────────────────────────────────────────

// function Marquee() {
//   const trackRef = useRef(null);

//   useEffect(() => {
//     const track = trackRef.current;

//     if (!track) return;

//     let anim;

//     const parent = track.parentElement;

//     requestAnimationFrame(() => {
//       const totalW = track.scrollWidth / 2;

//       // Main infinite marquee animation
//       anim = gsap.to(track, {
//         x: -totalW,
//         duration: 22,
//         ease: "none",
//         repeat: -1,
//         force3D: true,
//       });

//       // Smooth slowdown
//       const slow = () => {
//         gsap.to(anim, {
//           timeScale: 0.25,
//           duration: 0.4,
//           ease: "power2.out",
//           overwrite: "auto",
//         });
//       };

//       // Smooth restore speed
//       const fast = () => {
//         gsap.to(anim, {
//           timeScale: 1,
//           duration: 0.4,
//           ease: "power2.out",
//           overwrite: "auto",
//         });
//       };

//       parent.addEventListener("mouseenter", slow);
//       parent.addEventListener("mouseleave", fast);

//       // Cleanup listeners
//       return () => {
//         parent.removeEventListener("mouseenter", slow);
//         parent.removeEventListener("mouseleave", fast);
//       };
//     });

//     return () => {
//       if (anim) anim.kill();
//     };
//   }, []);

//   const words = [
//     "WEAR THE WILD",
//     "—",
//     "STREET CART COLLECTION",
//     "—",
//     "LIMITED DROPS",
//     "—",
//     "SS26",
//     "—",
//   ];

//   const doubled = [...words, ...words];

//   return (
//     <div
//       style={{
//         background: "#111",
//         padding: "24px 0",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         ref={trackRef}
//         style={{
//           display: "flex",
//           gap: 48,
//           whiteSpace: "nowrap",
//           willChange: "transform",
//           transform: "translate3d(0,0,0)",
//           backfaceVisibility: "hidden",
//         }}
//       >
//         {doubled.map((w, i) => (
//           <span
//             key={i}
//             style={{
//               fontFamily: "'Archivo Black', sans-serif",
//               fontSize: 36,
//               color: i % 2 === 0 ? "#fff" : "#e84c1e",
//               letterSpacing: "0.05em",
//               flexShrink: 0,
//             }}
//           >
//             {w}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";

import hero1 from "../../assets/hero1.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─────────────────────────────────────────────────────────────────
// GOOGLE FONTS
// ─────────────────────────────────────────────────────────────────

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,700&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Archivo+Black"]')) {
  document.head.appendChild(fontLink);
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const sideRef = useRef(null);
  const scrollRef = useRef(null);
  const pulseRef = useRef(null);
  const grainRef = useRef(null);
  const counterRef = useRef(null);
  const revealBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Grain overlay animation ─────────────────────────────────
      if (grainRef.current) {
        gsap.to(grainRef.current, {
          backgroundPosition: "100% 100%",
          duration: 0.08,
          repeat: -1,
          ease: "none",
          yoyo: true,
        });
      }

      // ── Custom cursor ────────────────────────────────────────────
      const dot = document.createElement("div");
      const ring = document.createElement("div");

      Object.assign(dot.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "6px",
        height: "6px",
        background: "#e84c1e",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%,-50%)",
        mixBlendMode: "difference",
      });

      Object.assign(ring.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        border: "1px solid rgba(232,76,30,0.6)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9998,
        transform: "translate(-50%,-50%)",
        transition: "width 0.3s, height 0.3s",
      });

      document.body.appendChild(dot);
      document.body.appendChild(ring);

      const moveDot = (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
      };

      const growRing = () => {
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.background = "rgba(232,76,30,0.08)";
      };
      const shrinkRing = () => {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.background = "transparent";
      };

      const interactables = document.querySelectorAll("a, button");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", growRing);
        el.addEventListener("mouseleave", shrinkRing);
      });

      window.addEventListener("mousemove", moveDot);

      // ── Reveal bar wipe ─────────────────────────────────────────
      if (revealBarRef.current) {
        gsap.fromTo(revealBarRef.current,
          { scaleX: 1 },
          { scaleX: 0, duration: 1.6, ease: "expo.inOut", transformOrigin: "right center" }
        );
      }

      // ── Magnetic CTA ─────────────────────────────────────────────
      const cta = ctaRef.current;
      if (cta) {
        const onMove = (e) => {
          const rect = cta.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
          gsap.to(cta, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(cta, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
        };
        cta.addEventListener("mousemove", onMove);
        cta.addEventListener("mouseleave", onLeave);
      }

      // ── Animated counter ────────────────────────────────────────
      if (counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 26,
          duration: 2.4,
          ease: "power2.out",
          delay: 0.8,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `SS'${String(Math.round(obj.val)).padStart(2, "0")}`;
            }
          },
        });
      }

      // ── Intro Timeline ───────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        .from(imgRef.current, { scale: 1.18, duration: 2.4, ease: "power2.out" })
        .from(overlayRef.current, { opacity: 0, duration: 1.8 }, "<")
        .from(sideRef.current, { opacity: 0, x: -30, duration: 1 }, "-=1.4")
        .from(eyebrowRef.current, { opacity: 0, y: 24, duration: 0.9 }, "-=1.2")
        .from(".hero-line-inner", {
          yPercent: 110,
          opacity: 0,
          duration: 1.15,
          stagger: 0.18,
          ease: "power4.out",
        }, "-=0.9")
        .from(copyRef.current, { opacity: 0, y: 28, duration: 0.9 }, "-=0.7")
        .from(ctaRef.current, {
          opacity: 0,
          y: 28,
          scale: 0.88,
          duration: 0.8,
          ease: "back.out(1.4)",
        }, "-=0.6")
        .from(".hero-stat", {
          opacity: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.7,
        }, "-=0.5")
        .from(scrollRef.current, { opacity: 0, x: 20, duration: 0.7 }, "-=0.4");

      // ── Scroll: Parallax image ───────────────────────────────────
      gsap.to(imgRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ── Scroll: Title drift + fade ───────────────────────────────
      gsap.to(titleRef.current, {
        yPercent: -28,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      // ── Scroll: Overlay deepens ──────────────────────────────────
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ── Scroll: Side text slides out ─────────────────────────────
      gsap.to(sideRef.current, {
        x: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: 1,
        },
      });

      // ── Scroll: CTA scale pulse on scroll stop ───────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "80% top",
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { scale: 1 },
            { scale: 1.04, yoyo: true, repeat: 1, duration: 0.35, ease: "power2.inOut" }
          );
        },
      });

      // ── Scroll: eyebrow text color shift ────────────────────────
      gsap.to(eyebrowRef.current, {
        color: "#e84c1e",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "70% top",
          scrub: 1,
        },
      });

      // ── Pulse ────────────────────────────────────────────────────
      gsap.to(pulseRef.current, {
        scale: 1.8,
        opacity: 0.15,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ── Scroll line animation ────────────────────────────────────
      gsap.to(".hero-scroll-line", {
        scaleX: 0.2,
        transformOrigin: "left center",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ── Image grain drift ────────────────────────────────────────
      const grainAnim = gsap.to(".hero-grain", {
        x: () => gsap.utils.random(-3, 3),
        y: () => gsap.utils.random(-3, 3),
        duration: 0.07,
        repeat: -1,
        ease: "none",
        yoyo: true,
      });

      return () => {
        window.removeEventListener("mousemove", moveDot);
        dot.remove();
        ring.remove();
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", growRing);
          el.removeEventListener("mouseleave", shrinkRing);
        });
        grainAnim.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* REVEAL BAR */}
        <div
          ref={revealBarRef}
          className="absolute inset-0 z-50 bg-background origin-right"
          style={{ transformOrigin: "right center" }}
        />

        {/* IMAGE */}
        <img
          ref={imgRef}
          src={hero1}
          alt="SO.CLOTHING SS26 campaign"
          className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center"
          style={{ willChange: "transform" }}
        />

        {/* FILM GRAIN */}
        <div
          className="hero-grain absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
            mixBlendMode: "overlay",
            opacity: 0.35,
          }}
        />

        {/* OVERLAYS */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />

        {/* CORNER LINES — decorative */}
        <div className="absolute top-8 right-8 z-20 hidden md:block pointer-events-none">
          <div style={{ width: 48, height: 48, borderTop: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" }} />
        </div>
        <div className="absolute bottom-8 left-8 z-20 hidden md:block pointer-events-none">
          <div style={{ width: 48, height: 48, borderBottom: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" }} />
        </div>

        {/* SIDE TEXT */}
        <div
          ref={sideRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-20"
        >
          <p
            className="text-foreground/50 [writing-mode:vertical-rl] rotate-180"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Collection 01 / Wear The Wild
          </p>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">

          {/* EYEBROW */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-8">
            <span
              ref={pulseRef}
              className="w-2 h-2 bg-accent rounded-full block"
            />
            <p
              className="text-foreground/70"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              New Drop /{" "}
              <span ref={counterRef} style={{ color: "#e84c1e" }}>
                SS'00
              </span>
            </p>
          </div>

          {/* TITLE */}
          <h1
            ref={titleRef}
            className="uppercase leading-[0.85] max-w-5xl text-[22vw] sm:text-[19vw] md:text-[14vw] lg:text-[12rem]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">Wear</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">
                The{" "}
                <span className="text-accent" style={{ fontStyle: "italic", fontWeight: 700 }}>
                  Wild
                </span>
              </span>
            </span>
          </h1>

          {/* STATS ROW */}
          <div className="flex gap-8 mt-8 mb-2">
            {[
              { num: "01", label: "Collection" },
              { num: "26", label: "Drops" },
              { num: "∞", label: "Attitude" },
            ].map(({ num, label }) => (
              <div key={label} className="hero-stat">
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: "#e84c1e",
                    textTransform: "uppercase",
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                  }}
                  className="text-foreground"
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* COPY + CTA */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl">
            <p
              ref={copyRef}
              className="text-foreground/70 max-w-md text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Born from instinct. Cut from raw cloth.
              SO.CLOTHING crafts limited drops for those
              who refuse to blend in.
            </p>

            <a
              ref={ctaRef}
              href="#shop"
              className="group inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 transition-colors duration-500"
              style={{ willChange: "transform" }}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget.querySelector("svg"), {
                  x: 4,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget.querySelector("svg"), {
                  x: 0,
                  duration: 0.4,
                  ease: "elastic.out(1,0.5)",
                })
              }
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Shop the Drop
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* SCROLL */}
        <div
          ref={scrollRef}
          className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3 text-foreground/40"
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <span className="hero-scroll-line block w-12 h-px bg-foreground/40" />
        </div>
      </section>

      <Marquee />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────

function Marquee() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let anim;

    requestAnimationFrame(() => {
      const totalW = track.scrollWidth / 2;

      anim = gsap.to(track, {
        x: -totalW,
        duration: 22,
        ease: "none",
        repeat: -1,
        force3D: true,
      });

      const slow = () => gsap.to(anim, { timeScale: 0.2, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      const fast = () => gsap.to(anim, { timeScale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });

      wrap.addEventListener("mouseenter", slow);
      wrap.addEventListener("mouseleave", fast);

      // Scroll-triggered: marquee only becomes visible when scrolled into view
      gsap.fromTo(
        wrap,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
          },
        }
      );

      return () => {
        wrap.removeEventListener("mouseenter", slow);
        wrap.removeEventListener("mouseleave", fast);
      };
    });

    return () => { if (anim) anim.kill(); };
  }, []);

  const words = [
    "WEAR THE WILD", "—", "STREET CART COLLECTION", "—",
    "LIMITED DROPS", "—", "SS26", "—",
  ];
  const doubled = [...words, ...words];

  return (
    <div
      ref={wrapRef}
      style={{ background: "#111", padding: "24px 0", overflow: "hidden" }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
      >
        {doubled.map((w, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 36,
              color: i % 2 === 0 ? "#fff" : "#e84c1e",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}