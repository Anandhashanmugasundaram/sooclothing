import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">— Error 404</p>
        <h1 className="font-display text-[20vw] md:text-[14rem] leading-none uppercase">Lost</h1>
        <p className="text-foreground/70 mt-6 mb-10">This trail has gone cold.</p>
        <Link to="/" className="inline-block bg-accent text-accent-foreground px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]">
          Back Home
        </Link>
      </div>
    </section>
  );
}
