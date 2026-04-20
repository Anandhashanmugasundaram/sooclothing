import { Navigate, Link } from "react-router-dom";
import { LogOut, Package, Heart, MapPin, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/site/PageHeader";

export default function Account() {
  const { user, logout } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  const orders = [
    { id: "SO-48291", date: "Apr 12, 2026", total: "$316", status: "Delivered" },
    { id: "SO-47118", date: "Mar 02, 2026", total: "$148", status: "Delivered" },
    { id: "SO-46002", date: "Feb 14, 2026", total: "$428", status: "Delivered" },
  ];

  return (
    <>
      <PageHeader eyebrow={`Welcome, ${user.name}`} title="Account" />
      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-4 gap-12">
          <aside className="space-y-1 lg:sticky lg:top-28 lg:self-start">
            <SideItem icon={<Package className="w-4 h-4" />} label="Orders" active />
            <SideItem icon={<Heart className="w-4 h-4" />} label="Wishlist" />
            <SideItem icon={<MapPin className="w-4 h-4" />} label="Addresses" />
            <SideItem icon={<CreditCard className="w-4 h-4" />} label="Payment" />
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mt-6 border-t border-border pt-6">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </aside>

          <div className="lg:col-span-3 space-y-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">— Profile</p>
              <div className="grid sm:grid-cols-2 gap-6 bg-secondary p-8">
                <Info label="Name" value={user.name} />
                <Info label="Email" value={user.email} />
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">— Recent Orders</p>
              <div className="border border-border">
                <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 border-b border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Order</span><span>Date</span><span>Total</span><span>Status</span><span></span>
                </div>
                {orders.map((o) => (
                  <div key={o.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-5 border-b border-border last:border-0 items-center font-mono text-sm">
                    <span>{o.id}</span>
                    <span className="text-muted-foreground hidden md:inline">{o.date}</span>
                    <span>{o.total}</span>
                    <span className="text-accent text-xs uppercase tracking-widest">{o.status}</span>
                    <Link to="/shop" className="text-right md:text-left text-xs uppercase tracking-widest hover:text-accent">View →</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SideItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${active ? "bg-secondary text-foreground border-l-2 border-accent" : "text-muted-foreground hover:text-foreground"}`}>
      {icon} {label}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="font-display uppercase">{value}</p>
    </div>
  );
}
