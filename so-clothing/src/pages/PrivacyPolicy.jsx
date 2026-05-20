import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Last Updated: May 20, 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to Soclothing. Your privacy is important to us.
              This Privacy Policy explains how we collect, use, and
              protect your personal information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment transaction details</li>
              <li>Account login information</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver orders</li>
              <li>To improve user experience</li>
              <li>To provide customer support</li>
              <li>To send order updates and notifications</li>
              <li>To prevent fraud and improve security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Payment Security
            </h2>

            <p>
              We use secure third-party payment providers to process
              payments. Your card details are not stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Cookies
            </h2>

            <p>
              Soclothing may use cookies to enhance your browsing
              experience, remember preferences, and analyze website
              traffic.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Sharing of Information
            </h2>

            <p>
              We do not sell or rent your personal information. We may
              share limited information with trusted partners such as
              payment gateways and delivery services for order fulfillment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Data Protection
            </h2>

            <p>
              We implement security measures to protect your personal
              data from unauthorized access, misuse, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              8. Your Rights
            </h2>

            <p>
              You may request access, correction, or deletion of your
              personal information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              9. Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy,
              please contact us at:
            </p>

            <p className="mt-3 font-medium">
              Email: support@soclothing.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}