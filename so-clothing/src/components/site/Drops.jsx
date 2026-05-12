import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dropsImage from "../../assets/drop-image.png";

gsap.registerPlugin(ScrollTrigger);

export function Drops() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drops"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-secondary
        py-24
        lg:py-32
        border-y
        border-border
      "
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* TOP TEXT */}
        <div ref={textRef} className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            — Street Cart Collection
          </p>

          <h2 className="font-display text-4xl md:text-6xl uppercase mb-6">
            Wear The Wild
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Crafted for the streets. Inspired by movement. SO.CLOTHING blends
            minimalist fashion with urban energy through limited edition drops.
          </p>
        </div>

        {/* IMAGE CARD */}
        <div
          ref={imageRef}
          className="
            relative
            rounded-[2rem]
            overflow-hidden
            border
            border-border
            bg-background
            shadow-2xl
          "
        >
          <img
            src={dropsImage}
            alt="SO.CLOTHING street cart"
            className="
              w-full
              h-full
              object-cover
            "
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          {/* FLOATING LABEL */}
          <div
            className="
              absolute
              bottom-6
              left-6
              md:bottom-10
              md:left-10

              bg-background/80
              backdrop-blur-md

              border
              border-border

              px-5
              py-4
              rounded-2xl
            "
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-2">
              New Drop / SS26
            </p>

            <h3 className="font-display text-2xl md:text-4xl uppercase leading-none">
              Street Cart
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}