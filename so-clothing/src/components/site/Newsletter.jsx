import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Newsletter() {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".nl-text > *"), {
        opacity: 0, y: 50, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.to(blobRef.current, {
        scale: 1.4, opacity: 0.6, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(0_0%_14%)]" />
      <div ref={blobRef} className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/30 blur-[120px]" />
      <div className="nl-text relative max-w-3xl mx-auto px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">— Join The Pack</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-8">
          First Access.<br /><span className="italic">No Mercy.</span>
        </h2>
        <p className="text-primary-foreground/70 mb-10 max-w-md mx-auto">
          Subscribe and unlock 24-hour early access to every drop, before it sells out.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto border-b border-primary-foreground/30 focus-within:border-accent transition-colors">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent py-4 outline-none placeholder:text-primary-foreground/40 font-mono text-sm text-primary-foreground"
          />
          <button type="submit" className="px-4 hover:text-accent transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
