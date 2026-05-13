import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export function Footer() {

  // WHATSAPP MESSAGE
  const whatsappMessage =
    "Hello SO.CLOTHING 👋 I’m interested in your products. Please share more details.";

  return (

    <footer className="bg-secondary border-t border-border pt-20 pb-8">

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">

          {/* BRAND */}
          <div className="col-span-2">

            <Link
              to="/"
              className="flex items-center gap-3 mb-6"
            >

              <img
                src={logo}
                alt="SO.CLOTHING"
                className="h-10 w-10"
              />

              <span className="font-display text-lg">
                $O.CLOTHING
              </span>

            </Link>

            <p className="text-foreground/60 max-w-xs text-sm leading-relaxed">

              Premium streetwear born from the wild.
              Crafted in small batches for those who
              run alone.

            </p>

          </div>
<<<<<<< HEAD
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
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
            // { label: "Instagram", href: "https://www.instagram.com/_s0.clothing_/" },
            { label: "Shop", to: "/shop" },
          ]} />
=======

          {/* SHOP */}
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

          {/* HELP */}
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

          {/* BRAND */}
          <FooterCol
            title="Brand"
            links={[
              { label: "About", to: "/about" },
              { label: "Lookbook", to: "/lookbook" },
              { label: "Instagram", to: "/contact" },
              { label: "TikTok", to: "/contact" },
            ]}
          />

>>>>>>> a9618187f9281c3736f2ffabfc0a2008ef4e42ba
        </div>

        {/* BIG TEXT */}
        <div className="overflow-hidden border-t border-border pt-12">
<<<<<<< HEAD
          <p className="font-display text-[15vw] md:text-[11vw] leading-none uppercase text-foreground/10 select-none whitespace-nowrap">
            $O.CLOTHINGS
=======

          <p
            className="
              font-display
              text-[18vw]
              md:text-[14vw]
              leading-none
              uppercase
              text-foreground/10
              select-none
              whitespace-nowrap
            "
          >
            $O.CLOTHING®
>>>>>>> a9618187f9281c3736f2ffabfc0a2008ef4e42ba
          </p>

        </div>

        {/* BOTTOM */}
        <div
           className="
    flex
    flex-col
    items-center
    justify-center
    gap-6
    mt-8
    pt-8
    border-t
    border-border
    text-center
  "
        >

          {/* COPYRIGHT */}
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-widest
              text-muted-foreground
            "
          >
            © 2026 SO.CLOTHING — All Rights Reserved
          </p>

          {/* SOCIAL ICONS */}
         
<div className="flex items-center justify-center gap-5">

            {/* INSTAGRAM */}
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
                hover:bg-gradient-to-r
                hover:from-pink-500
                hover:to-orange-400
                hover:text-white
                transition-all
                duration-300
                hover:scale-110
              "
            >

              <i className="fa-brands fa-instagram text-lg"></i>

            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/919444545351?text=${encodeURIComponent(
                whatsappMessage
              )}`}
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
                hover:bg-green-500
                hover:text-white
                transition-all
                duration-300
                hover:scale-110
                hover:shadow-[0_10px_25px_rgba(34,197,94,0.4)]
              "
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
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-accent
          mb-5
        "
      >
        {title}
      </p>

      <ul className="space-y-3">

        {links.map((l) => (

          <li key={l.label}>

            <Link
              to={l.to}
              className="
                text-sm
                text-foreground/70
                hover:text-accent
                transition-colors
              "
            >

              {l.label}

            </Link>

          </li>

        ))}

      </ul>

    </div>

  );
}