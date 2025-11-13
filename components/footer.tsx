import Link from "next/link"
import { Mail, MapPin, Phone, Linkedin, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl text-[#D4AF37] mb-4">Nutritham</h3>
            <p className="text-gray-400 text-sm">
              Natural, certified, lab-tested nutrition products for healthy living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#D4AF37] transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[#D4AF37] transition">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-white mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-[#D4AF37] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D4AF37] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#D4AF37] transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#D4AF37] transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@nutritham.com" className="hover:text-[#D4AF37] transition">
                  info@nutritham.com
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#D4AF37] transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 Nutritham Private Limited. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://linkedin.com/company/nutritham"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4AF37] transition"
              title="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/nutritham_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4AF37] transition"
              title="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4AF37] transition"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
