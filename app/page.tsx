"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Shield, Award, Leaf } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import SwipeableCarousel from "@/components/swipeable-carousel"

interface Product {
  id: string
  name: string
  image_url: string
  price: number
  category: string
  rating: number
  certifications: string[]
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [hotDeals, setHotDeals] = useState<Product[]>([])
  const [bestDeals, setBestDeals] = useState<Product[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch all available products
      const { data: allProducts } = await supabase
        .from("products")
        .select("id, name, image_url, price, category, rating, certifications")
        .eq("available", true)

      if (allProducts) {
        setProducts(allProducts.slice(0, 5))

        const hotDealProducts = allProducts.filter((p) => p.rating && p.rating >= 4.5).slice(0, 6)

        setHotDeals(hotDealProducts.length > 0 ? hotDealProducts : allProducts.slice(0, 6))

        const bestDealProducts = [...allProducts].sort((a, b) => a.price - b.price).slice(0, 6)

        setBestDeals(bestDealProducts)
      }
    }

    fetchProducts()
  }, [supabase])

  const carouselItems = products.map((product, index) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    title: "Premium Natural Nutrition",
    subtitle: product.name + " - Lab-Tested, Certified, 100% Organic",
    color:
      index % 3 === 0
        ? "from-[#2D5016] to-[#4A7C2E]"
        : index % 3 === 1
          ? "from-[#C9A961] to-[#D4AF37]"
          : "from-[#2D5016] to-[#1a5c3f]",
    image_url: product.image_url,
    discount: Math.floor(Math.random() * 30) + 5,
  }))

  return (
    <main className="min-h-screen">
      <SwipeableCarousel items={carouselItems} autoPlay={true} interval={5000} />

      {/* Certification Banners */}
      <div className="bg-white/5 border-y border-white/10 overflow-hidden">
        <div className="flex animate-scroll gap-8 py-6 px-4">
          {["FSSAI Certified", "ISO 22000", "NABL Accredited", "Lab Tested", "Organic", "100% Natural"].map(
            (cert, i) => (
              <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-semibold text-white">{cert}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Explore our wide range of natural nutrition products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {["Protein", "Malt", "Herbal", "Energy", "Health"].map((category, i) => (
            <Link key={category} href={`/products?category=${category}`}>
              <Card className="h-40 hover:shadow-lg transition-all cursor-pointer border-white/10 bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 group">
                <CardContent className="h-full flex flex-col items-center justify-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {["💪", "🥛", "🌿", "⚡", "❤️"][i]}
                  </div>
                  <h3 className="font-semibold text-lg text-center group-hover:text-[#D4AF37] transition">
                    {category}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {hotDeals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-balance">🔥 Hot Deals</h2>
                <Badge className="bg-red-500 text-white text-sm px-3 py-1">Limited Time</Badge>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="text-[#D4AF37] hover:text-[#D4AF37]">
                  View All
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground text-lg">Top-rated products at unbeatable prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotDeals.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="h-full hover:shadow-xl transition-all cursor-pointer border-white/10 bg-gradient-to-b from-white/5 to-white/0 group relative">
                  <Badge className="absolute top-3 right-3 bg-red-500 z-10">Hot Deal</Badge>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-[#D4AF37] transition">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {product.rating && (
                        <span className="text-sm font-semibold text-[#D4AF37]">⭐ {product.rating.toFixed(1)}</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-[#D4AF37] mt-3">₹{product.price.toFixed(0)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bestDeals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-balance">✨ Best Deals</h2>
                <Badge className="bg-[#2D5016] text-white text-sm px-3 py-1">Budget Friendly</Badge>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="text-[#D4AF37] hover:text-[#D4AF37]">
                  View All
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground text-lg">Premium quality at the best prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestDeals.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="h-full hover:shadow-xl transition-all cursor-pointer border-white/10 bg-gradient-to-b from-white/5 to-white/0 group relative">
                  <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-[#2D5016] z-10">Best Deal</Badge>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-[#D4AF37] transition">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                    <p className="text-2xl font-bold text-[#D4AF37] mt-3">₹{product.price.toFixed(0)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lab Certified Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl font-bold text-balance">Lab Certified Products</h2>
            <Link href="/products">
              <Button variant="ghost" className="text-[#D4AF37] hover:text-[#D4AF37]">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-lg">
            Hand-picked products tested and certified by independent laboratories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full hover:shadow-xl transition-all cursor-pointer border-white/10 bg-gradient-to-b from-white/5 to-white/0 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-[#D4AF37] transition">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  <p className="text-2xl font-bold text-[#D4AF37] mt-3">₹{product.price.toFixed(0)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2D5016]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-muted-foreground">
              Every product is lab-tested and certified by accredited institutions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2D5016]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
            <p className="text-muted-foreground">No artificial additives, preservatives, or harmful chemicals</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2D5016]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Brand</h3>
            <p className="text-muted-foreground">Serving thousands of satisfied customers nationwide</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust Nutritham for premium natural nutrition
          </p>
          <Link href="/products">
            <Button className="bg-[#D4AF37] hover:bg-[#C9A961] text-[#2D5016] text-lg px-8 py-6">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
