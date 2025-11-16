"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"
import BackButton from "@/components/back-button"
import { useRouter } from "next/navigation"

interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: {
    id: string
    name: string
    price: number
    image_url: string
    category: string
    rating: number
    certifications: string[]
  }
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      await fetchWishlist(user.id)
    }

    checkAuth()
  }, [supabase, router])

  const fetchWishlist = async (userId: string) => {
    setLoading(true)
    const { data } = await supabase
      .from("wishlist")
      .select(
        `
        id,
        user_id,
        product_id,
        created_at,
        products:product_id (
          id,
          name,
          price,
          image_url,
          category,
          rating,
          certifications
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (data) {
      setWishlist(data as any)
    }
    setLoading(false)
  }

  const removeFromWishlist = async (wishlistId: string) => {
    await supabase.from("wishlist").delete().eq("id", wishlistId)
    setWishlist(wishlist.filter((item) => item.id !== wishlistId))
  }

  const addToCart = (productId: string) => {
    // Cart logic here
    router.push(`/cart?add=${productId}`)
  }

  if (!user) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <BackButton />
        <h1 className="text-4xl font-bold mt-4 mb-2 text-balance">My Wishlist</h1>
        <p className="text-muted-foreground text-lg">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading your wishlist...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="pt-12 pb-12 text-center">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start adding your favorite products to your wishlist and they will appear here
            </p>
            <Link href="/products">
              <Button className="bg-[#2D5016] hover:bg-[#3d6b1f]">
                Continue Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const product = (item as any).products || (item as any).product
            if (!product) return null

            return (
              <Card
                key={item.id}
                className="border-white/10 bg-gradient-to-b from-white/5 to-white/0 hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-red-500">In Wishlist</Badge>
                </div>

                <CardContent className="pt-4 pb-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold line-clamp-2 group-hover:text-[#D4AF37] transition cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mt-1">{product.category}</p>

                  <div className="flex items-center gap-2 mt-3">
                    {product.certifications && product.certifications.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {product.certifications[0]}
                      </Badge>
                    )}
                  </div>

                  <p className="text-2xl font-bold text-[#D4AF37] mt-4">₹{product.price.toFixed(0)}</p>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-[#2D5016] hover:bg-[#3d6b1f]" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </main>
  )
}
