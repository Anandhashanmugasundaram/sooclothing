import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export function Footer() {
  const whatsappMessage =
    "Hello SO.CLOTHING 👋 I'm interested in your products. Please share more details.";

  return (
   <footer
  className="bg-secondary border-t border-border pt-20 pb-32"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">

          {/* BRAND */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="SO.CLOTHING" className="h-10 w-10" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                $O.CLOTHING
              </span>
            </Link>

            <p
              className="text-foreground/60 max-w-xs leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              Premium streetwear born from the wild. Crafted in small batches
              for those who run alone.
            </p>
          </div>

          {/* NAV COLUMNS */}
          <FooterCol
            title="Shop"
            links={[
              { label: "All", to: "/shop" },
              { label: "Tops", to: "/shop" },
              { label: "Bottoms", to: "/shop" },
              { label: "Outerwear", to: "/shop" },
              { label: "Accessories", to: "/shop" },
            ]}
          />

          <FooterCol
            title="Help"
            links={[
              { label: "Contact", to: "/contact" },
              { label: "Shipping", to: "/contact" },
              { label: "Returns", to: "/contact" },
              { label: "Size Guide", to: "/contact" },
              { label: "Account", to: "/account" },
            ]}
          />

          <FooterCol
            title="Brand"
            links={[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ]}
          />
        </div>

        {/* BIG DISPLAY TEXT */}
        <div className="overflow-hidden border-t border-border pt-12">
          <p
            className="leading-none uppercase select-none whitespace-nowrap text-foreground/10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(12vw, 13vw, 18vw)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            $O.CLOTHINGS
          </p>
        </div>

        {/* POLICY LINKS */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
          {[
            { label: "Privacy Policy", to: "/privacy-policy" },
            { label: "Terms & Conditions", to: "/terms-and-conditions" },
            { label: "Refund Policy", to: "/refund-policy" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-foreground/70 hover:text-accent transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 300,
                letterSpacing: "0.02em",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-center gap-6 mt-8 pt-8 border-t border-border text-center">

          {/* COPYRIGHT */}
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            © 2026 SO.CLOTHING — All Rights Reserved
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://www.instagram.com/_s0.clothing_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>

            <a
              href={`https://wa.me/919444545351?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_25px_rgba(34,197,94,0.4)]"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p
        className="text-accent mb-5"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {title}
      </p>

      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-foreground/70 hover:text-accent transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}