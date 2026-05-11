import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Products } from "@/components/site/Products";
import { Campaign } from "@/components/site/Campaign";
import { Drops } from "@/components/site/Drops";
import { Newsletter } from "@/components/site/Newsletter";

export default function Index() {
  return (
    <>
      <h1 className="sr-only">SO.CLOTHING — Premium streetwear, limited drops</h1>
      <Marquee />
      <Hero />
      <Products />
      <Campaign />
      <Drops />
      <Newsletter />
    </>
  );
}
