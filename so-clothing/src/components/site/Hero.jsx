import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "@/assets/hero.jpg";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic intro
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(imgRef.current, { scale: 1.25, duration: 2.2, ease: "power2.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 1 }, "-=1.6")
        .from(".hero-title .line", { opacity: 0, y: 80, duration: 1.2, stagger: 0.15 }, "-=0.8")
        .from(".hero-copy", { opacity: 0, y: 30, duration: 1 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 0.8 }, "-=0.7")
        .from(".hero-side", { opacity: 0, x: -20, duration: 1 }, "-=0.8");

      // Parallax — image drifts UP slower than scroll, text drifts DOWN faster
      gsap.to(imgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(titleRef.current, {
        yPercent: -40,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <img
        ref={imgRef}
        src={hero}
        alt="SO.CLOTHING SS26 campaign"
        className="absolute inset-0 w-full h-[110%] object-cover object-center gsap-parallax-img"
      />
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />

      <div className="hero-side absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/50 [writing-mode:vertical-rl] rotate-180">
          Collection 01 / Wear The Wild
        </p>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-end pb-24 pt-32">
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-accent pulse-ember" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">New Drop / SS26</p>
        </div>

        <h1 ref={titleRef} className="hero-title font-display text-[15vw] md:text-[10vw] lg:text-[9rem] leading-[0.85] uppercase max-w-5xl">
          <span className="line block">Wear</span>
          <span className="line block">The <span className="text-accent italic">Wild</span></span>
        </h1>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl">
          <p className="hero-copy text-foreground/70 max-w-md text-base leading-relaxed">
            Born from instinct. Cut from raw cloth. SO.CLOTHING crafts limited drops for those who refuse to blend in.
          </p>
          <a
            href="#shop"
            className="hero-cta group inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 transition-all duration-500"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em]">Shop the Drop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-12 z-10 flex items-center gap-3 text-foreground/40">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-12 h-px bg-foreground/40" />
      </div>
    </section>
  );
}
