import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import campaign from "@/assets/campaign.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Campaign() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Strong parallax on the campaign image
      gsap.to(imgRef.current, {
        yPercent: -20,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(sectionRef.current.querySelectorAll(".campaign-text > *"), {
        opacity: 0, y: 60, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(sectionRef.current.querySelectorAll(".campaign-stat"), {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current.querySelector(".campaign-stats"), start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lookbook" ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[16/19] overflow-hidden">
            <img ref={imgRef} src={campaign} alt="SO.CLOTHING editorial" loading="lazy" className="w-full h-[120%] object-cover gsap-parallax-img" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            <p className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80 bg-background/70 backdrop-blur px-3 py-1.5">
              Lookbook 26 / Frame 04
            </p>
          </div>

          <div className="campaign-text lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">— The Manifesto</p>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none mb-8">
              Made For The<br /><span className="italic text-accent">Untamed.</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              We don't follow trends. We hunt them. Every stitch carries the weight of the wild —
              fabric chosen for its grit, silhouettes built for those who move with intent.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-10">
              SO.CLOTHING is a refusal of the ordinary. A second skin for those who run with the pack.
            </p>
            <div className="campaign-stats grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat n="07" label="Drops / Year" />
              <Stat n="120+" label="Cities" />
              <Stat n="∞" label="Attitude" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div className="campaign-stat">
      <p className="font-display text-3xl md:text-4xl mb-1">{n}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
