import BackButton from "@/components/back-button"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <BackButton />

      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-12 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/80">Effective Date: January 1, 2025</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              Nutritham Private Limited ("we", "our", or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing
                address
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials, profile preferences, order history
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details, transaction history (processed securely)
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent on site
              </li>
              <li>
                <strong>Cookies:</strong> Tracking and preference cookies for enhanced user experience
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>To process orders and deliver products</li>
              <li>To communicate about your account and orders</li>
              <li>To improve our products and services</li>
              <li>To send promotional emails (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-gray-300">
              We implement industry-standard security measures including SSL encryption, secure servers, and regular
              security audits. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to access, modify, or delete your personal information. Contact us at
              privacy@nutritham.com to exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-gray-300">For privacy-related questions, contact us at: privacy@nutritham.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}
