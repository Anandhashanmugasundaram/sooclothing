export function Marquee() {
  const items = ["Free Shipping Over $150", "★", "Limited Drops Weekly", "★", "Crafted In Small Batches", "★", "Worldwide Delivery", "★"];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-primary text-primary-foreground py-5 overflow-hidden border-y border-border">
      <div className="marquee flex gap-12 whitespace-nowrap">
        {repeated.map((t, i) => (
          <span key={i} className="font-display text-sm uppercase tracking-tight">{t}</span>
        ))}
      </div>
    </div>
  );
}
