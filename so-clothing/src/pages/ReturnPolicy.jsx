import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Return & Refund Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Last Updated: May 20, 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-7">

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Return Eligibility
            </h2>

            <p>
              Customers may request a return within 7 days of delivery.
              Items must be unused, unwashed, and in their original
              packaging with tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Non-Returnable Items
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Used or damaged products</li>
              <li>Products without original tags</li>
              <li>Innerwear and personal-use items</li>
              <li>Final sale or clearance products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Refund Process
            </h2>

            <p>
              Once the returned product is inspected and approved,
              refunds will be processed to the original payment method
              within 5–7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Exchange Policy
            </h2>

            <p>
              Exchanges are subject to stock availability. Customers
              can request a size or product exchange during the return
              process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Damaged or Incorrect Products
            </h2>

            <p>
              If you receive a damaged or incorrect item, please contact
              us within 48 hours of delivery with product images for
              quick assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Shipping Charges
            </h2>

            <p>
              Shipping charges are non-refundable unless the return is
              due to a damaged, defective, or incorrect product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Contact Us
            </h2>

            <p>
              For return or refund support, contact:
            </p>

            <p className="mt-3 font-medium">
              support@soclothing.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}