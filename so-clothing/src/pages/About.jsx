import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageHeader } from "@/components/site/PageHeader";
import campaign from "@/assets/campaign.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -25, ease: "none",
        scrollTrigger: { trigger: imgRef.current.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(sectionRef.current.querySelectorAll(".about-text > *"), {
        opacity: 0, y: 50, duration: 1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(sectionRef.current.querySelectorAll(".about-stat"), {
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current.querySelector(".about-stats"), start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHeader eyebrow="The Story" title="Born From The Wild">
        $O.CLOTHING is a refusal of the ordinary. A second skin for those who refuse to blend in.
      </PageHeader>

      <div ref={sectionRef}>
        <section className="py-20 lg:py-32">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden">
              <img ref={imgRef} src={campaign} alt="SO.CLOTHING manifesto" className="w-full h-[125%] object-cover gsap-parallax-img" />
            </div>
            <div className="about-text space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">— Manifesto</p>
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-none">We Don't Follow Trends. We Hunt Them.</h2>
              <p className="text-foreground/80 leading-relaxed">
                Founded in 2022 in a converted warehouse, $O.CLOTHING was built around a single belief —
                that the clothes you wear should outlast the moment they were made for.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every piece begins with the fabric. We source heavyweight cotton from family mills in Portugal,
                wax our canvas by hand, and finish every seam under the eye of a maker who's been cutting cloth
                for thirty years.
              </p>
              <p className="text-foreground/80 leading-relaxed">We don't drop on a calendar. We drop when the work is ready.</p>
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-border bg-secondary">
          <div className="about-stats max-w-[1600px] mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { n: "2022", l: "Founded" },
              { n: "07", l: "Drops Released" },
              { n: "120+", l: "Cities Shipped" },
              { n: "100%", l: "Lifetime Repair" },
            ].map((s) => (
              <div key={s.l} className="about-stat">
                <p className="font-display text-5xl md:text-6xl mb-3">{s.n}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="about-text max-w-4xl mx-auto px-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">— The Promise</p>
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-none mb-8">
              If It Breaks,<br />We'll <span className="italic text-accent">Fix It</span>.
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Every $O.CLOTHING piece comes with a lifetime repair guarantee. Stitch popped? Lining torn?
              Send it in. We'll fix it. Forever.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
