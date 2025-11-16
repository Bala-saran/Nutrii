import BackButton from "@/components/back-button"

export default function ShippingInfo() {
  return (
    <main className="min-h-screen">
      <BackButton />

      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-12 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Shipping Information</h1>
          <p className="text-white/80">Fast, Reliable Delivery Across India</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Delivery Areas</h2>
            <p className="text-gray-300">
              We ship to all locations across India, including remote areas. Standard delivery is available for all pin
              codes in India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Shipping Methods & Timeline</h2>
            <div className="bg-white/5 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-bold text-white mb-2">Standard Shipping</h3>
                <p className="text-gray-300">Delivery: 5-7 business days | Cost: ₹50 (Free above ₹500)</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Express Shipping</h3>
                <p className="text-gray-300">Delivery: 2-3 business days | Cost: ₹150</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Overnight Shipping</h3>
                <p className="text-gray-300">Delivery: Next day (selected cities) | Cost: ₹300</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. Shipping Charges</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Orders above ₹500: FREE standard shipping</li>
              <li>Orders below ₹500: ₹50 shipping charge applies</li>
              <li>Express and overnight shipping charges vary by location</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Order Tracking</h2>
            <p className="text-gray-300">
              Once your order is shipped, you'll receive a tracking number via SMS and email. Track your package in
              real-time on your account dashboard or directly with our logistics partner.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Packaging & Handling</h2>
            <p className="text-gray-300">
              All products are carefully packaged in eco-friendly materials to ensure they arrive in perfect condition.
              We use insulation and protective padding for temperature-sensitive products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Delivery Exceptions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Holidays and weekends may extend delivery times</li>
              <li>Natural disasters or unforeseen circumstances may cause delays</li>
              <li>Remote locations may take additional 2-3 days</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">7. Delayed Deliveries</h2>
            <p className="text-gray-300">
              If your order is delayed beyond the promised timeline, contact us immediately at shipping@nutritham.com.
              We will provide status updates and may offer compensation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">8. Lost or Damaged Packages</h2>
            <p className="text-gray-300">
              Report lost or damaged packages within 48 hours of delivery. We will investigate and provide replacement
              or refund within 7-10 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">9. International Shipping</h2>
            <p className="text-gray-300">
              We are currently available for delivery within India only. International shipping will be available soon.
              Check back for updates!
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">10. Contact Shipping Support</h2>
            <p className="text-gray-300">
              Shipping inquiries: shipping@nutritham.com | Phone: +91 98765 43210 | Available Monday-Friday, 10 AM - 6
              PM IST
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
