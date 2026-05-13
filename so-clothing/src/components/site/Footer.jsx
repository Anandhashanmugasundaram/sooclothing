import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border pt-20 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="" className="h-10 w-10" />
              <span className="font-display text-lg">$O.CLOTHING</span>
            </Link>
            <p className="text-foreground/60 max-w-xs text-sm leading-relaxed">
              Premium streetwear born from the wild. Crafted in small batches for those who run alone.
            </p>
          </div>
          <FooterCol title="Shop" links={[
            { label: "All", to: "/shop" },
            { label: "Tops", to: "/shop" },
            { label: "Bottoms", to: "/shop" },
            { label: "Outerwear", to: "/shop" },
            { label: "Accessories", to: "/shop" },
          ]} />
          <FooterCol title="Help" links={[
            { label: "Contact", to: "/contact" },
            { label: "Shipping", to: "/contact" },
            { label: "Returns", to: "/contact" },
            { label: "Size Guide", to: "/contact" },
            { label: "Account", to: "/account" },
          ]} />
          <FooterCol title="Brand" links={[
            { label: "About", to: "/about" },
            { label: "Lookbook", to: "/lookbook" },
            { label: "Instagram", to: "/contact" },
            { label: "TikTok", to: "/contact" },
          ]} />
        </div>

        <div className="overflow-hidden border-t border-border pt-12">
          <p className="font-display text-[8vw] md:text-[14vw] leading-none uppercase text-foreground/10 select-none whitespace-nowrap">
            $O.CLOTHING®
          </p>
        </div>

<div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-border">

  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
    © 2026 SO.CLOTHING — All Rights Reserved
  </p>

  <a
    href="https://www.instagram.com/_s0.clothing_/"
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-11
      h-11
      rounded-full
      border
      border-border
      flex
      items-center
      justify-center
      hover:bg-black
      hover:text-white
      transition-all
      duration-300
    "
  >
    <i className="fa-brands fa-instagram text-lg"></i>
  </a>

</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-foreground/70 hover:text-accent transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
