import { useReveal } from "@/hooks/useGsap";

export function PageHeader({ eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <section className="pt-26 pb-5 lg:pt-39 lg:pb-14 border-b border-border">
      <div ref={ref} className="gsap-fade max-w-[1600px] mx-auto px-6 lg:px-12">
        {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-5">— {eyebrow}</p>}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9]">{title}</h1>
        {children && <div className="mt-8 max-w-2xl text-foreground/70">{children}</div>}
      </div>
    </section>
  );
}
