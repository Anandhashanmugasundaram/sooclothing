import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dropsImage from "../../assets/drop-image.png";

gsap.registerPlugin(ScrollTrigger);

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

const ORB_PALETTE = ["#d4906a", "#c46b4a", "#b8a490", "#e8c9a8", "#c9b99a"];

function createOrbs(count = 6) {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 1400,
    y: Math.random() * 600,
    r: 70 + Math.random() * 100,
    color: ORB_PALETTE[i % ORB_PALETTE.length],
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.2,
    alpha: 0.06 + Math.random() * 0.08,
  }));
}

function createDots(count = 32) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 1400,
    y: Math.random() * 600,
    r: 1 + Math.random() * 2.5,
    speedX: (Math.random() - 0.5) * 0.18,
    speedY: -0.12 - Math.random() * 0.22,
    alpha: 0.1 + Math.random() * 0.18,
    color: ORB_PALETTE[Math.floor(Math.random() * ORB_PALETTE.length)],
  }));
}

export function Drops() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const animFrameRef = useRef(null);

  // Canvas background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const section = sectionRef.current;
    const orbs = createOrbs(6);
    const dots = createDots(32);

    function resize() {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    function loop() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Floating soft orbs
      orbs.forEach((o) => {
        o.x += o.speedX;
        o.y += o.speedY;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        if (o.y < -o.r) o.y = H + o.r;

        const hex = Math.round(o.alpha * 255).toString(16).padStart(2, "0");
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, o.color + hex);
        grad.addColorStop(1, o.color + "00");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Rising particles
      dots.forEach((d) => {
        d.x += d.speedX;
        d.y += d.speedY;
        if (d.y < -4) {
          d.y = H + 4;
          d.x = Math.random() * W;
        }
        if (d.x > W + 4) d.x = -4;
        if (d.x < -4) d.x = W + 4;
        const hex = Math.round(d.alpha * 255).toString(16).padStart(2, "0");
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color + hex;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(loop);
    }
    loop();

    // Pulse orb alphas with GSAP
    orbs.forEach((o, i) => {
      gsap.to(o, {
        alpha: o.alpha * 1.6,
        duration: 2.5 + i * 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.97,
        duration: 1.3,
        ease: "power3.out",
        transformOrigin: "center bottom",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drops"
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary py-24 lg:py-32 border-y border-border"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-drops">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-drops)" />
      </svg>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 2 }}>

        {/* TOP TEXT */}
        <div ref={textRef} className="mb-16 text-center">
          <p
            className="text-accent mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            — Street Cart Collection
          </p>

          <h2
            className="uppercase mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Wear The Wild
          </h2>

          <p
            className="max-w-2xl mx-auto text-muted-foreground leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Crafted for the streets. Inspired by movement. SO.CLOTHING blends
            minimalist fashion with urban energy through limited edition drops.
          </p>
        </div>

        {/* IMAGE CARD */}
        <div
          ref={imageRef}
          className="relative rounded-[2rem] overflow-hidden border border-border bg-background shadow-2xl"
        >
          <img
            src={dropsImage}
            alt="SO.CLOTHING street cart"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          {/* FLOATING LABEL */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-background/80 backdrop-blur-md border border-border px-5 py-4 rounded-2xl">
            <p
              className="text-accent mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              New Drop / SS26
            </p>

            <h3
              className="uppercase leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Street Cart
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}