import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageHeader } from "@/components/site/PageHeader";
import campaign from "@/assets/campaign.jpg";
import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import hero from "@/assets/hero.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  { src: hero, span: "lg:col-span-7 lg:row-span-2", caption: "Frame 01 / Wild Hood", speed: -0.15 },
  { src: look1, span: "lg:col-span-5", caption: "Frame 02 / Hood Down", speed: -0.25 },
  { src: look3, span: "lg:col-span-5", caption: "Frame 03 / Texture", speed: -0.2 },
  { src: campaign, span: "lg:col-span-12", caption: "Frame 04 / The Pack", speed: -0.1 },
  { src: look2, span: "lg:col-span-7", caption: "Frame 05 / Pair", speed: -0.2 },
  { src: p3, span: "lg:col-span-5", caption: "Frame 06 / Antler Cargo", speed: -0.25 },
  { src: p2, span: "lg:col-span-12", caption: "Frame 07 / Wild Hood Detail", speed: -0.1 },
];

export default function Lookbook() {
  return (
    <>
      <PageHeader eyebrow="SS26 Editorial" title="Lookbook">
        Seven frames from the wild. Shot on location, no retouching.
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {frames.map((f, i) => <Frame key={i} {...f} />)}
        </div>
      </section>
    </>
  );
}

function Frame({ src, span, caption, speed }) {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, y: 60, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      gsap.to(imgRef.current, {
        yPercent: speed * 100, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [speed]);

  return (
    <figure ref={ref} className={`group relative overflow-hidden ${span}`}>
      <div className="aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-secondary">
        <img ref={imgRef} src={src} alt={caption} loading="lazy" className="w-full h-[125%] object-cover gsap-parallax-img" />
      </div>
      <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground bg-background/80 backdrop-blur px-3 py-1.5">
        {caption}
      </figcaption>
    </figure>
  );
}
