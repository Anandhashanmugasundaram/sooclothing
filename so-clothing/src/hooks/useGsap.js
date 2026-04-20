import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useReveal — fades + rises the element into view on scroll.
 * Usage: const ref = useReveal(); <div ref={ref} className="gsap-fade">...</div>
 */
export function useReveal(opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: opts.delay || 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [opts.delay]);
  return ref;
}

/**
 * useStagger — animates children of the ref with a stagger.
 * children should have class "gsap-fade".
 */
export function useStagger(selector = ".gsap-fade", stagger = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll(selector), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, [selector, stagger]);
  return ref;
}

/**
 * useParallax — moves the element on scroll for a parallax effect.
 * speed: positive = scrolls slower than page (drifts down), negative = faster (drifts up).
 */
export function useParallax(speed = -0.9) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);
  return ref;
}
