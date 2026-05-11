import { PageHeader } from "@/components/site/PageHeader";

export default function Lookbook() {
  return (
    <>
      <PageHeader
        eyebrow="Special Offers"
        title="Coming Soon"
      >
        Exciting deals and exclusive collections are on the way.
      </PageHeader>

      <section className="min-h-[70vh] flex items-center justify-center bg-background">

        <div className="text-center px-6">

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            We Will Be Updated Soon
          </h1>

          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
            Our special offers page is currently under construction.
            Stay tuned for amazing discounts, new arrivals,
            and exclusive fashion collections.
          </p>

          <div className="mt-10">
            <button className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition">
              Coming Soon
            </button>
          </div>

        </div>

      </section>
    </>
  );
}