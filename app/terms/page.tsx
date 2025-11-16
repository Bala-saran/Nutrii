import BackButton from "@/components/back-button"

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen">
      <BackButton />

      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-12 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
          <p className="text-white/80">Effective Date: January 1, 2025</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-gray-300">
              Permission is granted to temporarily download one copy of the materials on Nutritham website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-gray-300">
              The materials on Nutritham website are provided on an 'as is' basis. Nutritham makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-gray-300">
              In no event shall Nutritham Private Limited or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on Nutritham website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-300">
              The materials appearing on Nutritham website could include technical, typographical, or photographic
              errors. Nutritham does not warrant that any of the materials on the website are accurate, complete, or
              current.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">6. Links</h2>
            <p className="text-gray-300">
              Nutritham has not reviewed all of the sites linked to its website and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by Nutritham of the site.
              Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-gray-300">
              Nutritham may revise these terms of service for the website at any time without notice. By using this
              website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-gray-300">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
