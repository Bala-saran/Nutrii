"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, Menu, X, User, Lock } from 'lucide-react'
import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'
import HiddenAdminAccess from "@/components/hidden-admin-access"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const logoClickCount = useRef(0)
  const logoClickTimeout = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const supabase = createClient()

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
    router.push(href)
  }

  const handleLogoClick = () => {
    logoClickCount.current += 1

    if (logoClickTimeout.current) {
      clearTimeout(logoClickTimeout.current)
    }

    if (logoClickCount.current === 2) {
      // Double-click detected
      setAdminOpen(true)
      logoClickCount.current = 0
    } else {
      logoClickTimeout.current = setTimeout(() => {
        logoClickCount.current = 0
      }, 500)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push("/")
  }

  return (
    <>
      <nav className="glass sticky top-0 z-50 border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={handleLogoClick} className="font-bold text-xl text-[#2D5016] dark:text-[#D4AF37] flex items-center gap-2 hover:opacity-80 transition">
              <Image src="/logo.png" alt="Nutritham Logo" width={40} height={40} className="object-contain" />
              <span className="hidden sm:inline text-base">Nutritham Private Limited</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => handleNavClick("/")} className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
                Home
              </button>
              <button onClick={() => handleNavClick("/products")} className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
                Products
              </button>
              <button onClick={() => handleNavClick("/certifications")} className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
                Certifications
              </button>
              <button onClick={() => handleNavClick("/about")} className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
                About
              </button>
              <button onClick={() => handleNavClick("/contact")} className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
                Contact
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex gap-4 items-center">
              <div className="hidden sm:flex">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-32 bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value
                      if (value.trim()) {
                        handleNavClick(`/products?search=${encodeURIComponent(value)}`)
                      }
                    }
                  }}
                />
              </div>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => handleNavClick("/")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded">
                Home
              </button>
              <button onClick={() => handleNavClick("/products")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded">
                Products
              </button>
              <button onClick={() => handleNavClick("/certifications")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded">
                Certifications
              </button>
              <button onClick={() => handleNavClick("/about")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded">
                About
              </button>
              <button onClick={() => handleNavClick("/contact")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded">
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      <HiddenAdminAccess isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  )
}
