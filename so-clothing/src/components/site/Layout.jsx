import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after route change so new triggers register correctly
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Nav />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
