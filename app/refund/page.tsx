import BackButton from "@/components/back-button"

export default function RefundPolicy() {
  return (
    <main className="min-h-screen">
      <BackButton />

      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-12 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Refund Policy</h1>
          <p className="text-white/80">Effective Date: January 1, 2025</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Refund Window</h2>
            <p className="text-gray-300">
              Nutritham offers a 30-day money-back guarantee on all products. If you're not satisfied with your
              purchase, you can request a refund within 30 days of delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Eligibility Criteria</h2>
            <p className="text-gray-300">Products are eligible for refund if:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
              <li>The product is in its original, unopened packaging</li>
              <li>Refund request is made within 30 days of purchase</li>
              <li>The product has not been used or tampered with</li>
              <li>All original packaging and documentation is intact</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. Non-Refundable Items</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Opened or partially used products</li>
              <li>Items damaged due to customer mishandling</li>
              <li>Products purchased during clearance sales (unless defective)</li>
              <li>Custom or specially ordered items</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Refund Process</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Contact our customer service team at refund@nutritham.com</li>
              <li>Provide your order number and reason for refund</li>
              <li>Receive return shipping instructions</li>
              <li>Ship the product back to us (customer pays return shipping unless defective)</li>
              <li>Once received and inspected, refund will be processed within 7-10 business days</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Refund Methods</h2>
            <p className="text-gray-300">
              Refunds will be credited to the original payment method used during purchase. Please allow 5-7 business
              days for the refund to appear in your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Defective Products</h2>
            <p className="text-gray-300">
              If you receive a defective or damaged product, please contact us immediately with photos. We will replace
              the product or issue a full refund without requiring return shipping.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">7. Contact Support</h2>
            <p className="text-gray-300">For refund inquiries: refund@nutritham.com | Phone: +91 98765 43210</p>
          </div>
        </div>
      </section>
    </main>
  )
}
