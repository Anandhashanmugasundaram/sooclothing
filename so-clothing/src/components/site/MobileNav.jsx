// MobileNav.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Tag, BookOpen, User,Phone } from "lucide-react";

const NAV_ITEMS = [
  { to: "/",        icon: Home,        label: "Home"    },
  { to: "/shop",    icon: ShoppingBag, label: "Shop"    },
  { to: "/lookbook",  icon: Tag,         label: "Offers"  },
  { to: "/about",   icon: BookOpen,    label: "Story"   },
  { to: "/account", icon: User,        label: "Account" },
   { to: "/contact", icon: Phone,        label: "Contact" },
];

export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <>
      <style>{`
        .mobile-nav-spacer { display: block; height: 96px; }
        .mobile-nav        { display: flex; }
        @media (min-width: 1024px) {
          .mobile-nav-spacer { display: none; }
          .mobile-nav        { display: none !important; }
        }
      `}</style>

      <div className="mobile-nav-spacer" />

      <nav
        className="mobile-nav"
        style={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          background: "#1c1c1c",
          borderRadius: "9999px",
          padding: "10px 16px",
          alignItems: "center",
          gap: "2px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.06)",
          width: "max-content",
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                padding: "6px 10px",
                borderRadius: "9999px",
                minWidth: "52px",
                transition: "background 0.25s ease, transform 0.2s ease",
                background: isActive ? "rgba(232, 76, 30, 0.18)" : "transparent",
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon
                style={{
                  width: 20,
                  height: 20,
                  color: isActive ? "#e84c1e" : "rgba(255,255,255,0.75)",
                  transition: "color 0.25s ease",
                  strokeWidth: isActive ? 2 : 1.5,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "7.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#e84c1e" : "rgba(255,255,255,0.55)",
                  transition: "color 0.25s ease",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>

              {isActive && (
                <span
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "#e84c1e",
                    display: "block",
                    marginTop: 1,
                    animation: "mnavDotPop 0.3s ease forwards",
                  }}
                />
              )}
            </Link>
          );
        })}

        <style>{`
          @keyframes mnavDotPop {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </nav>
    </>
  );
}