import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const drops = [
  { no: "07", name: "Wild Sigil", date: "Apr 26, 2026", status: "Live Now" },
  { no: "08", name: "Black Antler", date: "May 10, 2026", status: "Coming" },
  { no: "09", name: "Ash & Bone", date: "May 24, 2026", status: "Teaser" },
];

export function Drops() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".drop-row"), {
        opacity: 0, x: -60, duration: 1, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="drops" ref={sectionRef} className="bg-secondary py-24 lg:py-32 border-y border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">— Schedule</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase">Upcoming Drops</h2>
        </div>

        <div className="border-t border-border">
          {drops.map((d) => <DropRow key={d.no} {...d} />)}
        </div>
      </div>
    </section>
  );
}

function DropRow({ no, name, date, status }) {
  const isLive = status === "Live Now";
  return (
    <div className="drop-row group grid grid-cols-12 items-center gap-4 py-8 border-b border-border hover:bg-background transition-colors px-2 cursor-pointer">
      <span className="col-span-2 font-mono text-xs text-muted-foreground">DROP {no}</span>
      <h3 className="col-span-5 font-display text-2xl md:text-4xl uppercase group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
        {name}
      </h3>
      <span className="col-span-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">{date}</span>
      <span className={`col-span-5 md:col-span-2 text-right font-mono text-[10px] uppercase tracking-[0.25em] ${isLive ? "text-accent" : "text-muted-foreground"}`}>
        {isLive && <span className="inline-block w-1.5 h-1.5 bg-accent mr-2 pulse-ember" />}
        {status}
      </span>
    </div>
  );
}
