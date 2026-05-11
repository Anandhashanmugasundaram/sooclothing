import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import logo from "../../assets/logo.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { label: "Shop", to: "/shop" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="SO.CLOTHING" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg tracking-tight">$O.CLOTHING</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `font-mono text-xs uppercase tracking-[0.2em] transition-colors relative group ${
                    isActive ? "text-accent" : "text-foreground/70 hover:text-accent"
                  }`
                }
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="hover:text-accent transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <Link to={user ? "/account" : "/login"} aria-label="Account" className="hover:text-accent transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative hover:text-accent transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-mono">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="font-mono text-sm uppercase tracking-widest">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
