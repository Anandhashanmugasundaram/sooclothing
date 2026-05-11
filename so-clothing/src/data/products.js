import p1 from "../assets/dress-image1.jpeg";
import p2 from "../assets/dress-image2.jpeg";
import p3 from "../assets/dress-image3.jpeg";
import p4 from "../assets/dress-image4.jpeg";
import p5 from "../assets/dress-image5.jpeg";
import p6 from "../assets/dress-image6.jpeg";
import p7 from "../assets/dress-image7.jpeg";
import p8 from "../assets/dress-image8.jpeg";

export const products = [
  { id: "001", slug: "sigil-tee", name: "Sigil Tee", price: 68, category: "tops", tag: "Essential", img: p1,
    description: "Heavyweight 280gsm cotton, garment-dyed for that lived-in, wear-it-forever feel.",
    details: ["280gsm organic cotton", "Garment-dyed in small batches", "Boxy oversized fit", "Made in Portugal"],
    sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "002", slug: "wild-hood", name: "Wild Hood", price: 148, category: "tops", tag: "New", img: p2,
    description: "The flagship hoodie — brushed-back fleece, dropped shoulders, built to outlast trends.",
    details: ["480gsm brushed fleece", "Custom-tooled hardware", "Oversized silhouette", "Hand-finished seams"],
    sizes: ["S", "M", "L", "XL"] },
  { id: "003", slug: "antler-cargo", name: "Antler Cargo", price: 184, category: "bottoms", tag: "Limited", img: p3,
    description: "Tactical cargo cut from waxed cotton-canvas with reinforced articulated knees.",
    details: ["Waxed cotton canvas", "Articulated knees", "Six pocket configuration", "YKK hardware throughout"],
    sizes: ["28", "30", "32", "34", "36"] },
  { id: "004", slug: "nocturne-bomber", name: "Nocturne Bomber", price: 246, category: "outerwear", tag: "New", img: p4,
    description: "Lightweight bomber with a quilted satin lining and embroidered antler crest.",
    details: ["Recycled nylon shell", "Quilted satin lining", "Ribbed cuffs and hem", "Embroidered chest crest"],
    sizes: ["S", "M", "L", "XL"] },
  { id: "005", slug: "ridge-beanie", name: "Ridge Beanie", price: 42, category: "accessories", img: p5,
    description: "Ribbed merino beanie with a woven label patch.",
    details: ["100% merino wool", "Ribbed knit", "Woven label patch", "One size"],
    sizes: ["OS"] },
  { id: "006", slug: "shadow-sling", name: "Shadow Sling", price: 168, category: "accessories", tag: "Limited", img: p6,
    description: "Compact crossbody in vegetable-tanned leather. Holds the essentials, nothing more.",
    details: ["Vegetable-tanned leather", "Brass hardware", "Adjustable strap", "Suede interior"],
    sizes: ["OS"] },
  { id: "007", slug: "totem-tee", name: "Totem Tee", price: 78, category: "tops", img: p7,
    description: "Hand-screened tribal sigil on heavyweight cotton.",
    details: ["280gsm cotton", "Hand-screened print", "Boxy fit", "Made in Portugal"],
    sizes: ["S", "M", "L", "XL"] },
  { id: "008", slug: "raven-overcoat", name: "Raven Overcoat", price: 428, category: "outerwear", tag: "Flagship", img: p8,
    description: "Single-breasted wool overcoat. The piece that anchors the whole wardrobe.",
    details: ["Italian wool blend", "Bemberg cupro lining", "Horn buttons", "Hand-tailored"],
    sizes: ["S", "M", "L", "XL"] },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const formatPrice = (n) => `$${n.toFixed(0)}`;
