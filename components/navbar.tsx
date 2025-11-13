"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, Menu, X, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl text-[#2D5016] dark:text-[#D4AF37] flex items-center gap-2">
            <Image src="/logo.png" alt="Nutritham Logo" width={40} height={40} className="object-contain" />
            <span className="hidden sm:inline">Nutritham</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
              Home
            </Link>
            <Link
              href="/products"
              className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition"
            >
              Products
            </Link>
            <Link
              href="/certifications"
              className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition"
            >
              Certifications
            </Link>
            <Link href="/contact" className="text-foreground hover:text-[#2D5016] dark:hover:text-[#D4AF37] transition">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex gap-4 items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="hidden sm:block w-32 bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10"
            />
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
            <Link href="/" className="block px-4 py-2 hover:bg-accent rounded">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 hover:bg-accent rounded">
              Products
            </Link>
            <Link href="/certifications" className="block px-4 py-2 hover:bg-accent rounded">
              Certifications
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-accent rounded">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
