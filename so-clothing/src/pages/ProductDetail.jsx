import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
  stagger,
} from "framer-motion";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const ACCENT = "#e84c1e";
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRICE_RANGES = [
  { label: "Under ₹200",   value: "0-200" },
  { label: "₹201 – ₹400", value: "201-400" },
  { label: "₹401 – ₹600", value: "401-600" },
  { label: "₹601 – ₹800", value: "601-800" },
  { label: "₹801 – ₹1000",value: "801-1000" },
  { label: "₹1000+",      value: "1000+" },
];

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const sidebarVariant = {
  hidden:  { opacity: 0, y: 40, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 60, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const badgeVariant = {
  hidden:  { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 22, delay: 0.35 + i * 0.08 },
  }),
};

const pillVariant = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18, delay: 0.5 + i * 0.05 },
  }),
};

const lineVariant = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const decoCircle = {
  hidden:  { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 18, delay: i * 0.15 },
  }),
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const sidebarChild = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON (Sidebar CTA)
// ─────────────────────────────────────────────────────────────────
function MagneticLink({ to, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const arrowX = useSpring(useMotionValue(0), { stiffness: 350, damping: 26 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const handleLeave = () => {
    x.set(0); y.set(0); setHovered(false); arrowX.set(0);
  };

  return (
    <motion.div style={{ x: sx, y: sy }} className="mt-8">
      <Link
        ref={ref}
        to={to}
        className="relative flex items-center justify-between w-full px-6 py-4 rounded-2xl border overflow-hidden"
        style={{
          borderColor: hovered ? "transparent" : "rgba(255,255,255,0.25)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.2em",
        }}
        onMouseMove={handleMove}
        onMouseEnter={() => { setHovered(true); arrowX.set(5); }}
        onMouseLeave={handleLeave}
      >
        {/* Fill */}
        <motion.span
          className="absolute inset-0 bg-white rounded-2xl"
          style={{ originY: 1 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          className="relative z-10 uppercase transition-colors duration-300"
          style={{ color: hovered ? "#000" : "#fff" }}
        >
          Explore All
        </span>
        <span
          className="relative z-10 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-300"
          style={{ borderColor: hovered ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)" }}
        >
          <motion.span style={{ x: arrowX, display: "flex" }}>
            <ArrowRight
              className="w-3.5 h-3.5 transition-colors duration-300"
              style={{ color: hovered ? "#000" : "#fff" }}
            />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PULSE DOT
// ─────────────────────────────────────────────────────────────────
function PulseDot({ color = "#fff" }) {
  return (
    <span className="relative flex" style={{ width: 8, height: 8, flexShrink: 0 }}>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative rounded-full w-full h-full" style={{ background: color }} />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Tilt on hover
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const sRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleTilt = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
  };
  const resetTilt = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      style={{ perspective: 1000 }}
      className="cursor-pointer"
    >
      <Link to={`/product/${product.slug}`}>
        <motion.div
          style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleTilt}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { resetTilt(); setHovered(false); }}
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {/* IMAGE AREA */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#f7f7f7] border border-[#eee]">

            {/* Offer badge */}
            <motion.div
              className="absolute top-4 right-4 z-30"
              custom={index}
              variants={badgeVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="px-3 py-1.5 rounded-xl bg-white shadow-md text-[12px] font-medium text-pink-500 block"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                20% off
              </span>
            </motion.div>

            {/* Decorative circles */}
            <motion.div
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-red-400/30 pointer-events-none"
              custom={0}
              variants={decoCircle}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            <motion.div
              className="absolute right-[-35px] top-[130px] w-[110px] h-[220px] rounded-full pointer-events-none"
              style={{ border: "10px solid rgba(239,68,68,0.2)" }}
              custom={1}
              variants={decoCircle}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            {/* Image */}
            <div className="h-[260px] flex items-center justify-center p-4 relative z-10 overflow-hidden">
              <motion.img
                src={product.image}
                className="h-full object-contain"
                style={{ willChange: "transform" }}
                alt={product.name}
                animate={{ scale: hovered ? 1.09 : 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{ border: `2px solid ${ACCENT}` }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Quick view pill */}
            <motion.div
              className="absolute bottom-4 left-1/2 z-30 pointer-events-none whitespace-nowrap"
              style={{ translateX: "-50%" }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="bg-black text-white text-[10px] tracking-widest uppercase px-4 py-2 rounded-full shadow-lg"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Quick View
              </span>
            </motion.div>
          </div>

          {/* CARD INFO */}
          <div className="mt-3 px-1">
            <motion.h2
              className="font-semibold leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.07rem" }}
              animate={{ color: hovered ? ACCENT : "#000" }}
              transition={{ duration: 0.25 }}
            >
              {product.name}
            </motion.h2>

            <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              {product.category}
            </p>

            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                ₹{product.price}
              </p>
              <span className="text-sm text-gray-400 line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                ₹{Math.floor(product.price * 1.2)}
              </span>
              <motion.span
                className="text-xs font-medium rounded-full px-2 py-0.5"
                style={{ background: "#fef2f2", color: "#ef4444", fontFamily: "'Space Mono', monospace" }}
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                −20%
              </motion.span>
            </div>

            {/* Size pills */}
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {product.sizes?.map((s, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={pillVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.15, background: "#000", color: "#fff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="px-2 py-0.5 text-[10px] border border-gray-200 rounded-full cursor-pointer"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {s.size?.toUpperCase() ?? s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FILTER CHIP
// ─────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        background: active ? "#000" : "#f5f5f5",
        color: active ? "#fff" : "#333",
        borderColor: active ? "#000" : "#e5e5e5",
      }}
      transition={{ duration: 0.2 }}
      className="px-3 py-1 rounded-full border text-[11px] cursor-pointer"
      style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}
    >
      {label}
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-1.5 inline-flex"
        >
          ×
        </motion.span>
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCTS SECTION
// ─────────────────────────────────────────────────────────────────
export function ProductDetail() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const sidebarRef  = useRef(null);
  const countRef    = useRef(null);

  const headingInView = useInView(headingRef,  { once: true, margin: "-80px" });
  const sidebarInView = useInView(sidebarRef,  { once: true, margin: "-60px" });
  const countInView   = useInView(countRef,    { once: true, margin: "-40px" });

  const [products, setProducts]           = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [loading, setLoading]             = useState(true);

  const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleSize = (s) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const filteredProducts = products
    .filter((p) => !p.isSpecialOffer)
    .filter((p) => {
      const sizeMatch =
        selectedSizes.length === 0 ||
        p.sizes?.some((s) =>
          selectedSizes.includes((s.size ?? s).toUpperCase())
        );
      let priceMatch = true;
      if (selectedPrice === "0-200")    priceMatch = p.price <= 200;
      if (selectedPrice === "201-400")  priceMatch = p.price >= 201 && p.price <= 400;
      if (selectedPrice === "401-600")  priceMatch = p.price >= 401 && p.price <= 600;
      if (selectedPrice === "601-800")  priceMatch = p.price >= 601 && p.price <= 800;
      if (selectedPrice === "801-1000") priceMatch = p.price >= 801 && p.price <= 1000;
      if (selectedPrice === "1000+")    priceMatch = p.price > 1000;
      return sizeMatch && priceMatch;
    })
    .slice(0, 8);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-white overflow-hidden">

      {/* ── HEADING ────────────────────────────────────── */}
      <div ref={headingRef} className="mb-10">
        <div className="flex items-end gap-6">
          <motion.h1
            variants={fadeLeft}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
            className="text-4xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Latest Products
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-1 text-sm text-gray-400"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            SS26 — Collection 01
          </motion.span>
        </div>

        {/* animated underline */}
        <motion.div
          variants={lineVariant}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
          className="mt-3 h-[3px] w-20 rounded-full"
          style={{ background: ACCENT, transformOrigin: "left center" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

        {/* ── SIDEBAR ─────────────────────────────────── */}
        <div className="sticky top-24 h-fit">
          <motion.div
            ref={sidebarRef}
            variants={sidebarVariant}
            initial="hidden"
            animate={sidebarInView ? "visible" : "hidden"}
            className="bg-black text-white rounded-3xl p-8 relative overflow-hidden"
            style={{ perspective: 1000 }}
          >
            {/* Deco circles */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
              custom={0}
              variants={decoCircle}
              initial="hidden"
              animate={sidebarInView ? "visible" : "hidden"}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/5 rounded-full"
              custom={1}
              variants={decoCircle}
              initial="hidden"
              animate={sidebarInView ? "visible" : "hidden"}
            />

            <motion.div
              className="relative z-10"
              variants={staggerContainer}
              initial="hidden"
              animate={sidebarInView ? "visible" : "hidden"}
            >
              {/* Label */}
              <motion.div variants={sidebarChild} className="flex items-center gap-2">
                <PulseDot />
                <p className="text-sm tracking-[0.3em] text-gray-300" style={{ fontFamily: "'Space Mono', monospace" }}>
                  $O.CLOTHING
                </p>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={sidebarChild}
                className="text-3xl font-bold mt-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Explore Store
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={sidebarChild}
                className="text-gray-300 mt-4 text-sm leading-6"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Premium streetwear, oversized fits and new drops every season.
              </motion.p>

              {/* ── SIZE FILTER ── */}
              <motion.div variants={sidebarChild} className="mt-6">
                <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Filter by Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => toggleSize(s)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      animate={{
                        background: selectedSizes.includes(s) ? "#fff" : "transparent",
                        color: selectedSizes.includes(s) ? "#000" : "rgba(255,255,255,0.6)",
                        borderColor: selectedSizes.includes(s) ? "#fff" : "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-9 h-9 rounded-full border text-[11px] cursor-pointer flex items-center justify-center"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* ── PRICE FILTER ── */}
              <motion.div variants={sidebarChild} className="mt-6">
                <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Price Range
                </p>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map(({ label, value }) => (
                    <motion.button
                      key={value}
                      onClick={() =>
                        setSelectedPrice((p) => (p === value ? "" : value))
                      }
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.97 }}
                      animate={{
                        color: selectedPrice === value ? "#fff" : "rgba(255,255,255,0.5)",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 text-left text-[11px] cursor-pointer"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      <motion.span
                        className="block w-1.5 h-1.5 rounded-full"
                        animate={{ background: selectedPrice === value ? ACCENT : "rgba(255,255,255,0.2)" }}
                        transition={{ duration: 0.2 }}
                      />
                      {label}
                      {selectedPrice === value && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto"
                          style={{ color: ACCENT }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Clear filters */}
              <AnimatePresence>
                {(selectedSizes.length > 0 || selectedPrice) && (
                  <motion.button
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => { setSelectedSizes([]); setSelectedPrice(""); }}
                    className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <X className="w-3 h-3" />
                    Clear Filters
                  </motion.button>
                )}
              </AnimatePresence>

              {/* CTA */}
              <motion.div variants={sidebarChild}>
                <MagneticLink to="/shop">Explore All</MagneticLink>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── PRODUCT GRID ────────────────────────────── */}
        <div>
          {/* Count row */}
          <motion.div
            ref={countRef}
            initial={{ opacity: 0, y: 14 }}
            animate={countInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-between"
          >
            <p
              className="text-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={filteredProducts.length}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "inline-block" }}
                >
                  {filteredProducts.length}
                </motion.span>
              </AnimatePresence>
              {" "}Products Found
            </p>

            {/* Active filter chips */}
            <div className="flex gap-2 flex-wrap">
              {selectedSizes.map((s) => (
                <Chip key={s} label={s} active onClick={() => toggleSize(s)} />
              ))}
              {selectedPrice && (
                <Chip
                  label={PRICE_RANGES.find((r) => r.value === selectedPrice)?.label}
                  active
                  onClick={() => setSelectedPrice("")}
                />
              )}
            </div>
          </motion.div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
                  className="rounded-[28px] bg-gray-100"
                  style={{ height: 300 }}
                />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedSizes.join()}-${selectedPrice}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <ProductCard key={product._id} product={product} index={i} />
                  ))
                ) : (
                  <motion.div
                    className="col-span-4 py-24 flex flex-col items-center gap-4 text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SlidersHorizontal className="w-10 h-10 opacity-30" />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>
                      No products match your filters
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedSizes([]); setSelectedPrice(""); }}
                      className="text-sm px-5 py-2 border border-gray-200 rounded-full hover:border-black transition-colors"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      Clear filters
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
export default ProductDetail;