export function Marquee() {
  const items = ["SPECIAL OFFER", "★", "DISCOUNT", "%", "SPECIAL OFFER", "★", "DISCOUNT", "%"];
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
