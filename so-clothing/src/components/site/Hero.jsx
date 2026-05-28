
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// import { ArrowRight } from "lucide-react";

// import hero1 from "../../assets/hero1.png";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// // ─────────────────────────────────────────────────────────────────
// // GOOGLE FONTS — injected once
// // ─────────────────────────────────────────────────────────────────
// if (!document.head.querySelector('[href*="Cormorant"]')) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href =
//     "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap";
//   document.head.appendChild(link);
// }

// // ─────────────────────────────────────────────────────────────────
// // CUSTOM CURSOR — singleton so it never duplicates
// // ─────────────────────────────────────────────────────────────────
// let cursorDot = null;
// let cursorRing = null;

// function mountCursor() {
//   if (document.getElementById("so-cursor-dot")) return;

//   cursorDot = document.createElement("div");
//   cursorDot.id = "so-cursor-dot";
//   Object.assign(cursorDot.style, {
//     position: "fixed", top: 0, left: 0,
//     width: "6px", height: "6px",
//     background: "#e84c1e", borderRadius: "50%",
//     pointerEvents: "none", zIndex: 9999,
//     transform: "translate(-50%,-50%)",
//     mixBlendMode: "difference",
//   });

//   cursorRing = document.createElement("div");
//   cursorRing.id = "so-cursor-ring";
//   Object.assign(cursorRing.style, {
//     position: "fixed", top: 0, left: 0,
//     width: "32px", height: "32px",
//     border: "1px solid rgba(232,76,30,0.55)",
//     borderRadius: "50%", pointerEvents: "none",
//     zIndex: 9998, transform: "translate(-50%,-50%)",
//     transition: "width 0.3s, height 0.3s, background 0.3s",
//   });

//   document.body.appendChild(cursorDot);
//   document.body.appendChild(cursorRing);
// }

// function unmountCursor() {
//   document.getElementById("so-cursor-dot")?.remove();
//   document.getElementById("so-cursor-ring")?.remove();
// }

// // ─────────────────────────────────────────────────────────────────
// // HERO
// // ─────────────────────────────────────────────────────────────────
// export function Hero() {
//   const sectionRef   = useRef(null);
//   const imgRef       = useRef(null);
//   const overlayRef   = useRef(null);
//   const titleRef     = useRef(null);
//   const eyebrowRef   = useRef(null);
//   const copyRef      = useRef(null);
//   const ctaRef       = useRef(null);
//   const sideRef      = useRef(null);
//   const scrollRef    = useRef(null);
//   const pulseRef     = useRef(null);
//   const revealBarRef = useRef(null);
//   const navRef       = useRef(null);
//   const gridLinesRef = useRef(null);

//   useEffect(() => {
//     mountCursor();
//     const dot  = document.getElementById("so-cursor-dot");
//     const ring = document.getElementById("so-cursor-ring");

//     const moveDot = (e) => {
//       gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
//       gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.32, ease: "power2.out" });
//     };

//     const growRing = () => {
//       ring.style.width = "60px";
//       ring.style.height = "60px";
//       ring.style.background = "rgba(232,76,30,0.1)";
//     };
//     const shrinkRing = () => {
//       ring.style.width = "32px";
//       ring.style.height = "32px";
//       ring.style.background = "transparent";
//     };

//     window.addEventListener("mousemove", moveDot);
//     const interactables = document.querySelectorAll("a, button");
//     interactables.forEach((el) => {
//       el.addEventListener("mouseenter", growRing);
//       el.addEventListener("mouseleave", shrinkRing);
//     });

//     const ctx = gsap.context(() => {

//       // ── Grain drift ─────────────────────────────────────────────
//       gsap.to(".so-grain", {
//         x: () => gsap.utils.random(-2, 2),
//         y: () => gsap.utils.random(-2, 2),
//         duration: 0.08, repeat: -1, ease: "none", yoyo: true,
//       });

//       // ── Reveal bar wipe ─────────────────────────────────────────
//       gsap.fromTo(
//         revealBarRef.current,
//         { scaleX: 1 },
//         { scaleX: 0, duration: 1.5, ease: "expo.inOut", transformOrigin: "right center" }
//       );

//       // ── Magnetic CTA ─────────────────────────────────────────────
//       const cta = ctaRef.current;
//       if (cta) {
//         const onMove = (e) => {
//           const r  = cta.getBoundingClientRect();
//           const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
//           const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
//           gsap.to(cta, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
//         };
//         const onLeave = () => gsap.to(cta, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
//         cta.addEventListener("mousemove", onMove);
//         cta.addEventListener("mouseleave", onLeave);
//       }

//       // ── Pulse dot ────────────────────────────────────────────────
//       gsap.to(pulseRef.current, {
//         scale: 1.9, opacity: 0.1, duration: 0.85,
//         repeat: -1, yoyo: true, ease: "sine.inOut",
//       });

//       // ── Scroll indicator line ────────────────────────────────────
//       gsap.to(".so-scroll-line", {
//         scaleX: 0.15, transformOrigin: "left center",
//         duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut",
//       });

//       // ── Grid line fade in ────────────────────────────────────────
//       gsap.from(gridLinesRef.current, { opacity: 0, duration: 2.5, delay: 1.8 });

//       // ── Intro timeline ───────────────────────────────────────────
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       tl
//         .from(imgRef.current, { scale: 1.14, duration: 2.2, ease: "power2.out" })
//         .from(overlayRef.current, { opacity: 0, duration: 1.8 }, "<")
//         .from(navRef.current, { opacity: 0, y: -20, duration: 0.9 }, "-=1.4")
//         .from(sideRef.current, { opacity: 0, x: -24, duration: 0.9 }, "-=1.2")
//         .from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.8 }, "-=1.1")
//         .from(".so-line-inner", {
//           yPercent: 115, opacity: 0, duration: 1.1,
//           stagger: 0.16, ease: "power4.out",
//         }, "-=0.8")
//         .from(copyRef.current, { opacity: 0, y: 24, duration: 0.8 }, "-=0.7")
//         .from(ctaRef.current, {
//           opacity: 0, y: 24, scale: 0.9, duration: 0.75, ease: "back.out(1.4)",
//         }, "-=0.55")
//         .from(".so-stat", { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, "-=0.5")
//         .from(scrollRef.current, { opacity: 0, x: 16, duration: 0.6 }, "-=0.35");

//       // ── Scroll: parallax image ───────────────────────────────────
//       gsap.to(imgRef.current, {
//         yPercent: 20, ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top", end: "bottom top", scrub: 1.2,
//         },
//       });

//       // ── Scroll: title drift + fade ───────────────────────────────
//       gsap.to(titleRef.current, {
//         yPercent: -22, opacity: 0.08, ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top", end: "55% top", scrub: 1,
//         },
//       });

//       // ── Scroll: overlay deepens ──────────────────────────────────
//       gsap.to(overlayRef.current, {
//         opacity: 0.94, ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top", end: "bottom top", scrub: 1,
//         },
//       });

//       // ── Scroll: side text slides out ─────────────────────────────
//       gsap.to(sideRef.current, {
//         x: -36, opacity: 0, ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "20% top", end: "55% top", scrub: 1,
//         },
//       });

//       // ── Scroll: eyebrow color shift ──────────────────────────────
//       gsap.to(eyebrowRef.current, {
//         color: "#e84c1e", ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "35% top", end: "65% top", scrub: 1,
//         },
//       });

//     }, sectionRef);

//     return () => {
//       ctx.revert();
//       window.removeEventListener("mousemove", moveDot);
//       interactables.forEach((el) => {
//         el.removeEventListener("mouseenter", growRing);
//         el.removeEventListener("mouseleave", shrinkRing);
//       });
//       unmountCursor();
//     };
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative min-h-screen w-full overflow-hidden bg-black"
//       >
//         {/* REVEAL BAR */}
//         <div
//           ref={revealBarRef}
//           className="absolute inset-0 z-50 bg-black"
//           style={{ transformOrigin: "right center" }}
//         />

//         {/* IMAGE */}
//         <img
//           ref={imgRef}
//           src={hero1}
//           alt="SO.CLOTHING SS26 campaign"
//           className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center"
//           style={{ willChange: "transform" }}
//         />

//         {/* GRAIN OVERLAY */}
//         <div
//           className="so-grain absolute inset-0 z-[2] pointer-events-none"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
//             backgroundSize: "128px 128px",
//             mixBlendMode: "overlay",
//             opacity: 0.3,
//           }}
//         />

//         {/* OVERLAYS */}
//         <div
//           ref={overlayRef}
//           className="absolute inset-0"
//           style={{
//             background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.18) 100%)",
//           }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)" }}
//         />

//         {/* EDITORIAL GRID LINES */}
//         <div
//           ref={gridLinesRef}
//           className="absolute inset-0 z-[3] pointer-events-none hidden lg:block"
//           style={{ opacity: 0.06 }}
//         >
//           {[25, 50, 75].map((pos) => (
//             <div
//               key={pos}
//               className="absolute top-0 bottom-0 border-l border-white"
//               style={{ left: `${pos}%` }}
//             />
//           ))}
//         </div>

//         {/* ── NAVIGATION ─────────────────────────────────────────── */}
//         <nav
//           ref={navRef}
//           className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-6"
//         >
//           <a
//             href="/"
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontWeight: 700,
//               fontSize: "1.35rem",
//               letterSpacing: "0.08em",
//               color: "#fff",
//               textDecoration: "none",
//               textTransform: "uppercase",
//             }}
//           >
//             SO.
//           </a>

//           <div className="flex items-center gap-8">
//             {["Shop", "Drops", "About"].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 style={{
//                   fontFamily: "'Space Mono', monospace",
//                   fontSize: "10px",
//                   letterSpacing: "0.3em",
//                   textTransform: "uppercase",
//                   color: "rgba(255,255,255,0.6)",
//                   textDecoration: "none",
//                   transition: "color 0.3s",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#e84c1e")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </nav>

//         {/* CORNER BRACKETS */}
//         <div className="absolute top-6 right-6 z-20 hidden md:block pointer-events-none">
//           <div style={{ width: 40, height: 40, borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" }} />
//         </div>
//         <div className="absolute bottom-6 left-6 z-20 hidden md:block pointer-events-none">
//           <div style={{ width: 40, height: 40, borderBottom: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" }} />
//         </div>

//         {/* SIDE TEXT */}
//         <div
//           ref={sideRef}
//           className="absolute left-5 top-1/2 -translate-y-1/2 hidden md:block z-20"
//         >
//           <p
//             className="text-white/40"
//             style={{
//               fontFamily: "'Space Mono', monospace",
//               fontSize: "9px",
//               letterSpacing: "0.45em",
//               textTransform: "uppercase",
//               writingMode: "vertical-rl",
//               transform: "rotate(180deg)",
//             }}
//           >
//             Collection 01 / Wear The Wild / SS26
//           </p>
//         </div>

//         {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
//         <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-16 sm:pb-24 pt-28">

//           {/* EYEBROW */}
//           <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 sm:mb-8">
//             <span
//               ref={pulseRef}
//               className="block rounded-full"
//               style={{ width: 7, height: 7, background: "#e84c1e", flexShrink: 0 }}
//             />
//             <p
//               className="text-white/65"
//               style={{
//                 fontFamily: "'Space Mono', monospace",
//                 fontSize: "11px",
//                 letterSpacing: "0.32em",
//                 textTransform: "uppercase",
//               }}
//             >
//               New Drop /&nbsp;
//               <span style={{ color: "#e84c1e" }}>SS26 — Collection 01</span>
//             </p>
//           </div>

//           {/* HEADLINE */}
//           <h1
//             ref={titleRef}
//             className="uppercase leading-[0.82] max-w-5xl"
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontWeight: 700,
//               letterSpacing: "-0.02em",
//               fontSize: "clamp(5rem, 13vw, 12rem)",
//             }}
//           >
//             <span className="block overflow-hidden">
//               <span className="so-line-inner block text-white">Wear</span>
//             </span>
//             <span className="block overflow-hidden">
//               <span className="so-line-inner block text-white">
//                 The{" "}
//                 <em style={{ color: "#e84c1e", fontStyle: "italic", fontWeight: 700 }}>
//                   Wild
//                 </em>
//               </span>
//             </span>
//           </h1>

//           {/* STAT ROW */}
//           <div className="flex gap-6 sm:gap-10 mt-6 mb-2">
//             {[
//               { num: "01",   label: "Collection" },
//               { num: "12",   label: "Pieces / Drop" },
//               { num: "SS26", label: "Season" },
//             ].map(({ num, label }) => (
//               <div key={label} className="so-stat">
//                 <p
//                   style={{
//                     fontFamily: "'Space Mono', monospace",
//                     fontSize: "11px",
//                     letterSpacing: "0.28em",
//                     color: "#e84c1e",
//                     textTransform: "uppercase",
//                     lineHeight: 1,
//                   }}
//                 >
//                   {num}
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "'Space Mono', monospace",
//                     fontSize: "9px",
//                     letterSpacing: "0.28em",
//                     textTransform: "uppercase",
//                     opacity: 0.38,
//                     color: "#fff",
//                     marginTop: 4,
//                     lineHeight: 1,
//                   }}
//                 >
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* THIN RULE */}
//           <div
//             className="mt-8 mb-6 hidden sm:block"
//             style={{ height: "0.5px", background: "rgba(255,255,255,0.12)", maxWidth: 480 }}
//           />

//           {/* COPY + CTA */}
//           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl mt-4 md:mt-0">
//             <p
//               ref={copyRef}
//               className="max-w-sm leading-relaxed text-white/60"
//               style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.95rem" }}
//             >
//               Born from instinct. Cut from raw cloth.
//               SO.CLOTHING crafts limited drops for those
//               who refuse to blend in.
//             </p>

//             <a
//               ref={ctaRef}
//               href="#shop"
//               className="group inline-flex items-center gap-4"
//               style={{
//                 willChange: "transform",
//                 padding: "14px 32px",
//                 border: "1px solid #e84c1e",
//                 color: "#fff",
//                 textDecoration: "none",
//                 transition: "background 0.4s, color 0.4s",
//                 background: "transparent",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#e84c1e";
//                 gsap.to(e.currentTarget.querySelector("svg"), { x: 5, duration: 0.3, ease: "power2.out" });
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "transparent";
//                 gsap.to(e.currentTarget.querySelector("svg"), { x: 0, duration: 0.4, ease: "elastic.out(1,0.5)" });
//               }}
//             >
//               <span
//                 style={{
//                   fontFamily: "'Space Mono', monospace",
//                   fontSize: "11px",
//                   letterSpacing: "0.28em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Shop the Drop
//               </span>
//               <ArrowRight className="w-4 h-4" />
//             </a>
//           </div>
//         </div>

//         {/* SCROLL INDICATOR */}
//         <div
//           ref={scrollRef}
//           className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3"
//           style={{ color: "rgba(255,255,255,0.35)" }}
//         >
//           <span
//             style={{
//               fontFamily: "'Space Mono', monospace",
//               fontSize: "9px",
//               letterSpacing: "0.35em",
//               textTransform: "uppercase",
//             }}
//           >
//             Scroll
//           </span>
//           <span
//             className="so-scroll-line block"
//             style={{ width: 48, height: "0.5px", background: "rgba(255,255,255,0.35)" }}
//           />
//         </div>
//       </section>

//       <Marquee />
//     </>
//   );
// }

// // ─────────────────────────────────────────────────────────────────
// // MARQUEE
// // ─────────────────────────────────────────────────────────────────
// function Marquee() {
//   const trackRef = useRef(null);
//   const wrapRef  = useRef(null);

//   useEffect(() => {
//     const track = trackRef.current;
//     const wrap  = wrapRef.current;
//     if (!track || !wrap) return;

//     let anim;
//     const raf = requestAnimationFrame(() => {
//       const totalW = track.scrollWidth / 2;

//       anim = gsap.to(track, {
//         x: -totalW, duration: 22, ease: "none",
//         repeat: -1, force3D: true,
//       });

//       const slow  = () => gsap.to(anim, { timeScale: 0.2, duration: 0.5, ease: "power2.out", overwrite: "auto" });
//       const fast  = () => gsap.to(anim, { timeScale: 1,   duration: 0.5, ease: "power2.out", overwrite: "auto" });

//       wrap.addEventListener("mouseenter", slow);
//       wrap.addEventListener("mouseleave", fast);

//       gsap.fromTo(
//         wrap,
//         { opacity: 0, y: 28 },
//         {
//           opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
//           scrollTrigger: { trigger: wrap, start: "top 92%" },
//         }
//       );

//       return () => {
//         wrap.removeEventListener("mouseenter", slow);
//         wrap.removeEventListener("mouseleave", fast);
//       };
//     });

//     return () => {
//       cancelAnimationFrame(raf);
//       if (anim) anim.kill();
//     };
//   }, []);

//   const words   = ["WEAR THE WILD", "—", "STREET CART COLLECTION", "—", "LIMITED DROPS", "—", "SS26", "—"];
//   const doubled = [...words, ...words];

//   return (
//     <div
//       ref={wrapRef}
//       style={{ background: "#111", padding: "24px 0", overflow: "hidden" }}
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
//               color: w === "—" ? "#e84c1e" : "#fff",
//               letterSpacing: "0.05em",
//               flexShrink: 0,
//               textTransform: "uppercase",
//             }}
//           >
//             {w}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationControls,
  AnimatePresence,
  stagger,
  animate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import hero1 from "../../assets/hero1.png";

// ─────────────────────────────────────────────────────────────────
// GOOGLE FONTS — injected once
// ─────────────────────────────────────────────────────────────────
if (!document.head.querySelector('[href*="Cormorant"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);
}

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const ACCENT = "#e84c1e";

// const NAV_ITEMS = ["Shop", "Drops", "About"];
const STATS = [
  { num: "01", label: "Collection" },
  { num: "12", label: "Pieces / Drop" },
  { num: "SS26", label: "Season" },
];
const HEADLINE_LINES = ["Wear", "The Wild"];

// ─────────────────────────────────────────────────────────────────
// CUSTOM CURSOR — singleton
// ─────────────────────────────────────────────────────────────────
function useCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 900, damping: 60 });
  const springY = useSpring(cursorY, { stiffness: 900, damping: 60 });
  const ringX   = useSpring(cursorX, { stiffness: 200, damping: 28 });
  const ringY   = useSpring(cursorY, { stiffness: 200, damping: 28 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return { dotX: springX, dotY: springY, ringX, ringY, hovered, setHovered };
}

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay } },
});

const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut", delay } },
});

const revealBar = {
  hidden:  { scaleX: 1 },
  visible: { scaleX: 0, transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
};

const navSlide = {
  hidden:  { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 } },
};

const sideText = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 } },
};

const lineReveal = (i) => ({
  hidden:  { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 1.2 + i * 0.15 },
  },
});

const statVariant = (i) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.7 + i * 0.09 },
  },
});

const ctaVariant = {
  hidden:  { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 2.05 },
  },
};

const scrollIndicator = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 2.3 } },
};

const gridLines = {
  hidden:  { opacity: 0 },
  visible: { opacity: 0.06, transition: { duration: 2.2, delay: 1.9 } },
};

// ─────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ─────────────────────────────────────────────────────────────────
function MagneticCTA({ href, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const [bg, setBg] = useState("transparent");
  const arrowX = useMotionValue(0);
  const arrowSpring = useSpring(arrowX, { stiffness: 400, damping: 28 });

  const handleMove = (e) => {
    const r  = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
    x.set(dx); y.set(dy);
  };
  const handleLeave = () => {
    x.set(0); y.set(0);
    setBg("transparent");
    arrowX.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, willChange: "transform" }}
      variants={ctaVariant}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMove}
      onMouseEnter={() => setBg(ACCENT)}
      onMouseLeave={handleLeave}
      className="group inline-flex items-center gap-4"
      css={{}}
      aria-label="Shop the drop"
      _style={{
        padding: "14px 32px",
        border: `1px solid ${ACCENT}`,
        color: "#fff",
        textDecoration: "none",
        background: bg,
        transition: "background 0.35s",
      }}
      /* inline style workaround since we can't use styled-components */
    >
      <motion.span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 32px",
          border: `1px solid ${ACCENT}`,
          color: "#fff",
          textDecoration: "none",
          background: bg,
          transition: "background 0.35s ease",
        }}
        onMouseEnter={() => { setBg(ACCENT); arrowX.set(5); }}
        onMouseLeave={() => { setBg("transparent"); arrowX.set(0); }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {children}
        </span>
        <motion.span style={{ x: arrowSpring, display: "flex" }}>
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────
// PULSING DOT
// ─────────────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative flex" style={{ width: 7, height: 7, flexShrink: 0 }}>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: ACCENT }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative rounded-full"
        style={{ width: 7, height: 7, background: ACCENT }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// SCROLL LINE
// ─────────────────────────────────────────────────────────────────
function ScrollLine() {
  return (
    <motion.span
      className="block"
      style={{ width: 48, height: "0.5px", background: "rgba(255,255,255,0.35)" }}
      animate={{ scaleX: [1, 0.15, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef(null);
  const { dotX, dotY, ringX, ringY, hovered, setHovered } = useCursor();

  // Scroll-driven transforms
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const imgY        = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const titleY      = useTransform(scrollYProgress, [0, 0.55], ["0%", "-22%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.08]);
  const overlayOp   = useTransform(scrollYProgress, [0, 1], [0.7, 0.94]);
  const sideX       = useTransform(scrollYProgress, [0.2, 0.55], [0, -36]);
  const sideOp      = useTransform(scrollYProgress, [0.2, 0.55], [1, 0]);
  const eyebrowColor = useTransform(scrollYProgress, [0.35, 0.65], ["rgba(255,255,255,0.65)", ACCENT]);

  // Smooth springs for scroll values
  const imgYSpring     = useSpring(imgY, { stiffness: 60, damping: 20 });
  const titleYSpring   = useSpring(titleY, { stiffness: 80, damping: 25 });

  // Grain drift via CSS animation
  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
    backgroundSize: "128px 128px",
    mixBlendMode: "overlay",
    opacity: 0.3,
    animation: "grain 0.12s steps(1) infinite",
  };

  return (
    <>
      {/* CUSTOM CURSOR */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, x: dotX, y: dotY,
          width: 6, height: 6, background: ACCENT, borderRadius: "50%",
          pointerEvents: "none", zIndex: 9999,
          translateX: "-50%", translateY: "-50%",
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, x: ringX, y: ringY,
          border: `1px solid rgba(232,76,30,0.55)`,
          borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
          translateX: "-50%", translateY: "-50%",
        }}
        animate={{ width: hovered ? 60 : 32, height: hovered ? 60 : 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10%       { transform: translate(-1px, 1px); }
          20%       { transform: translate(1px, -1px); }
          30%       { transform: translate(-2px, 0); }
          40%       { transform: translate(2px, 1px); }
          50%       { transform: translate(0, -2px); }
          60%       { transform: translate(-1px, 2px); }
          70%       { transform: translate(1px, 0); }
          80%       { transform: translate(-2px, -1px); }
          90%       { transform: translate(2px, 0); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-black"
        onMouseEnter={() => {}}
      >
        {/* REVEAL BAR */}
        <motion.div
          className="absolute inset-0 z-50 bg-black"
          style={{ transformOrigin: "right center" }}
          variants={revealBar}
          initial="hidden"
          animate="visible"
        />

        {/* IMAGE with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imgYSpring, scale: 1.15 }}
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.08, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } }}
        >
          <img
            src={hero1}
            alt="SO.CLOTHING SS26 campaign"
            className="w-full h-full object-cover object-[center_top] sm:object-center"
            style={{ willChange: "transform" }}
          />
        </motion.div>

        {/* GRAIN OVERLAY */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={grainStyle} />

        {/* OVERLAYS */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.18) 100%)",
            opacity: overlayOp,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)" }}
        />

        {/* EDITORIAL GRID LINES */}
        <motion.div
          className="absolute inset-0 z-[3] pointer-events-none hidden lg:block"
          variants={gridLines}
          initial="hidden"
          animate="visible"
        >
          {[25, 50, 75].map((pos) => (
            <div
              key={pos}
              className="absolute top-0 bottom-0 border-l border-white"
              style={{ left: `${pos}%` }}
            />
          ))}
        </motion.div>

        {/* ── NAVIGATION ─────────────────────────────────────── */}
        <motion.nav
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-6"
          variants={navSlide}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="/"
            whileHover={{ letterSpacing: "0.14em" }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: "0.08em",
              color: "#fff",
              textDecoration: "none",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            $O.CLOTHING
          </motion.a>

          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.0 + i * 0.08, duration: 0.5 } }}
                whileHover={{ color: ACCENT, y: -2 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* CORNER BRACKETS */}
        <motion.div
          className="absolute top-6 right-6 z-20 hidden md:block pointer-events-none"
          variants={fadeIn(1.5)}
          initial="hidden"
          animate="visible"
        >
          <div style={{ width: 40, height: 40, borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" }} />
        </motion.div>
        <motion.div
          className="absolute bottom-6 left-6 z-20 hidden md:block pointer-events-none"
          variants={fadeIn(1.6)}
          initial="hidden"
          animate="visible"
        >
          <div style={{ width: 40, height: 40, borderBottom: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" }} />
        </motion.div>

        {/* SIDE TEXT */}
        <motion.div
          className="absolute left-5 top-1/2 -translate-y-1/2 hidden md:block z-20"
          style={{ x: sideX, opacity: sideOp }}
          variants={sideText}
          initial="hidden"
          animate="visible"
        >
          <p
            className="text-white/40"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Collection 01 / Wear The Wild / SS26
          </p>
        </motion.div>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-16 sm:pb-24 pt-28">

          {/* EYEBROW */}
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            style={{ color: eyebrowColor }}
            variants={fadeUp(1.05)}
            initial="hidden"
            animate="visible"
          >
            <PulseDot />
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              New Drop /&nbsp;
              <span style={{ color: ACCENT }}>SS26 — Collection 01</span>
            </p>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            className="uppercase leading-[0.82] max-w-5xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontSize: "clamp(5rem, 13vw, 12rem)",
              y: titleYSpring,
              opacity: titleOpacity,
            }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block text-white"
                  variants={lineReveal(i)}
                  initial="hidden"
                  animate="visible"
                >
                  {i === 1 ? (
                    <>
                      The{" "}
                      <motion.em
                        style={{ color: ACCENT, fontStyle: "italic", fontWeight: 700 }}
                        initial={{ opacity: 0, skewX: "-12deg" }}
                        animate={{ opacity: 1, skewX: "0deg" }}
                        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Wild
                      </motion.em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* STAT ROW */}
          <div className="flex gap-6 sm:gap-10 mt-6 mb-2">
            {STATS.map(({ num, label }, i) => (
              <motion.div
                key={label}
                variants={statVariant(i)}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
              >
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  color: ACCENT,
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>
                  {num}
                </p>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  opacity: 0.38,
                  color: "#fff",
                  marginTop: 4,
                  lineHeight: 1,
                }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* THIN RULE */}
          <motion.div
            className="mt-8 mb-6 hidden sm:block"
            style={{ height: "0.5px", background: "rgba(255,255,255,0.12)", maxWidth: 480 }}
            initial={{ scaleX: 0, transformOrigin: "left center" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.85 }}
          />

          {/* COPY + CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl mt-4 md:mt-0">
            <motion.p
              className="max-w-sm leading-relaxed text-white/60"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.95rem" }}
              variants={fadeUp(1.9)}
              initial="hidden"
              animate="visible"
            >
              Born from instinct. Cut from raw cloth.
              SO.CLOTHING crafts limited drops for those
              who refuse to blend in.
            </motion.p>

            {/* MAGNETIC CTA */}
            <MagneticButton href="#shop" />
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3"
          style={{ color: "rgba(255,255,255,0.35)" }}
          variants={scrollIndicator}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <ScrollLine />
        </motion.div>
      </section>

      <Marquee />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// STANDALONE MAGNETIC CTA
// ─────────────────────────────────────────────────────────────────
function MagneticButton({ href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const arrowX = useMotionValue(0);
  const arrowSpring = useSpring(arrowX, { stiffness: 350, damping: 26 });
  const [bg, setBg] = useState("transparent");

  const handleMove = (e) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  };
  const handleLeave = () => { x.set(0); y.set(0); setBg("transparent"); arrowX.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, willChange: "transform", display: "inline-flex" }}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 2.05 }}
      onMouseMove={handleMove}
      onMouseEnter={() => { setBg(ACCENT); arrowX.set(5); }}
      onMouseLeave={handleLeave}
    >
      <motion.span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 32px",
          border: `1px solid ${ACCENT}`,
          color: "#fff",
          textDecoration: "none",
          background: bg,
          transition: "background 0.35s ease",
        }}
      >
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}>
          Shop the Drop
        </span>
        <motion.span style={{ x: arrowSpring, display: "flex" }}>
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE  — pure CSS animation, no GSAP needed
// ─────────────────────────────────────────────────────────────────
function Marquee() {
  const wrapRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const words   = ["WEAR THE WILD", "—", "STREET CART COLLECTION", "—", "LIMITED DROPS", "—", "SS26", "—"];
  const doubled = [...words, ...words, ...words];

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .so-marquee-track {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        .so-marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <motion.div
        ref={wrapRef}
        style={{ background: "#111", padding: "24px 0", overflow: "hidden" }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`so-marquee-track${paused ? " paused" : ""}`}
          style={{
            display: "flex",
            gap: 48,
            whiteSpace: "nowrap",
            backfaceVisibility: "hidden",
          }}
        >
          {doubled.map((w, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 36,
                color: w === "—" ? ACCENT : "#fff",
                letterSpacing: "0.05em",
                flexShrink: 0,
                textTransform: "uppercase",
              }}
              whileHover={
                w !== "—"
                  ? { color: ACCENT, transition: { duration: 0.2 } }
                  : {}
              }
            >
              {w}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </>
  );
}