import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import { toast } from "sonner";

import logo from "../../assets/logo.png";

import { useCart } from "@/contexts/CartContext";

import { useAuth } from "@/contexts/AuthContext";

const links = [
  {
    label: "Shop",
    to: "/shop",
  },
  {
    label: "Special Offers",
    to: "/lookbook",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export function Nav() {

  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const {
    count,
    setOpen: setCartOpen,
  } = useCart();

  const {
    user,
    googleLogin,
    logout,
  } = useAuth();

  useEffect(() => {

    const onScroll = () =>
      setScrolled(
        window.scrollY > 20
      );

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );

  }, []);

  return (

    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >

      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <img
            src={logo}
            alt="SO.CLOTHING"
            className="h-10 w-10 object-contain"
          />

          <span className="font-display text-lg tracking-tight">
            $O.CLOTHING
          </span>

        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center gap-10">

          {links.map((l) => (

            <li key={l.to}>

              <NavLink
                to={l.to}
                className={({
                  isActive,
                }) =>
                  `font-mono text-xs uppercase tracking-[0.2em] transition-colors relative group ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/70 hover:text-accent"
                  }`
                }
              >

                {l.label}

                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />

              </NavLink>

            </li>

          ))}

        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* USER */}
          <div className="relative">

            {user ? (

              <>
                {/* PROFILE BUTTON */}
                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="hover:text-accent transition-colors"
                >

                  {user.photo ? (

                    <img
                      src={user?.photo}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />

                  ) : (

                    <User className="w-5 h-5" />

                  )}

                </button>

                {/* DROPDOWN */}
                {profileOpen && (

                  <div className="absolute right-0 top-12 w-72 bg-background border border-border p-5 rounded-2xl shadow-2xl z-50">

                    {/* USER INFO */}
                    <div className="flex items-center gap-3 pb-4 border-b border-border">

                      {user.photo ? (

                        <img
                          src={user.photo}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover"
                        />

                      ) : (

                        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">

                          <User size={24} />

                        </div>

                      )}

                      <div>

                        <h3 className="font-semibold text-base">
                          {user.name}
                        </h3>

                        <p className="text-sm text-muted-foreground break-all">
                          {user.email}
                        </p>

                      </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex flex-col gap-3">

                      <Link
                        to="/account"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="text-sm hover:text-accent transition-colors"
                      >

                        My Account

                      </Link>

                      <button
                        onClick={async () => {

                          await logout();

                          toast.success(
                            "Logged out successfully"
                          );

                          setProfileOpen(false);

                        }}
                        className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors"
                      >

                        <LogOut size={16} />

                        Logout

                      </button>

                    </div>

                  </div>

                )}

              </>

            ) : (

              <button
                onClick={
                  googleLogin
                }
                aria-label="Google Login"
                className="hover:text-accent transition-colors"
              >

                <User className="w-5 h-5" />

              </button>

            )}

          </div>

          {/* CART */}
          <button
            aria-label="Cart"
            onClick={() =>
              setCartOpen(true)
            }
            className="relative hover:text-accent transition-colors"
          >

            <ShoppingBag className="w-5 h-5" />

            {count > 0 && (

              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-mono rounded-full">

                {count}

              </span>

            )}

          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="lg:hidden"
            aria-label="Menu"
          >

            {open ? (

              <X className="w-5 h-5" />

            ) : (

              <Menu className="w-5 h-5" />

            )}

          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}
      {open && (

        <div className="lg:hidden bg-background border-t border-border">

          <ul className="flex flex-col p-6 gap-4">

            {links.map((l) => (

              <li key={l.to}>

                <Link
                  to={l.to}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="font-mono text-sm uppercase tracking-widest"
                >

                  {l.label}

                </Link>

              </li>

            ))}

            {/* MOBILE USER */}
            {user ? (

              <>
                <div className="flex items-center gap-3 pt-4 border-t border-border">

                  {user.photo ? (

                    <img
                      src={user.photo}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />

                  ) : (

                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">

                      <User size={18} />

                    </div>

                  )}

                  <div>

                    <h3 className="text-sm font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>

                  </div>

                </div>

                <Link
                  to="/account"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="font-mono text-sm uppercase tracking-widest"
                >

                  My Account

                </Link>

                <button
                  onClick={async () => {

                    await logout();

                    toast.success(
                      "Logged out successfully"
                    );

                    setOpen(false);

                  }}
                  className="font-mono text-sm uppercase tracking-widest text-left"
                >

                  Logout

                </button>

              </>

            ) : (

              <button
                onClick={async () => {

                  await googleLogin();

                  setOpen(false);

                }}
                className="font-mono text-sm uppercase tracking-widest text-left"
              >

                Login With Google

              </button>

            )}

          </ul>

        </div>

      )}

    </header>

  );
}