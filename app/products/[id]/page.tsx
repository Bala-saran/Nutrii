"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Truck, RotateCcw } from 'lucide-react'
import { createClient } from "@/lib/supabase/client"
import BackButton from "@/components/back-button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  ingredients: string[]
  benefits: string[]
  sizes: string[]
  available: boolean
  rating: number
  rating_count: number
  lab_certified: boolean
  certifications: string[]
  created_at: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", params.id).single()

      if (data) {
        setProduct(data)
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, supabase])

  const handleOrderNow = async () => {
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
      alert("Please login to place an order")
      return
    }

    const orderItems = [
      {
        product_id: product!.id,
        product_name: product!.name,
        quantity,
        size: selectedSize,
        price: product!.price,
      },
    ]

    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.data.user.id,
        items: orderItems,
        total: product!.price * quantity,
        shipping_address: "To be provided at checkout",
        user_email: user.data.user.email,
      }),
    })

    if (response.ok) {
      setOrderSuccess(true)
      setTimeout(() => setOrderSuccess(false), 3000)
    }
  }

  if (!product) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />

      {orderSuccess && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
          <p className="text-green-400">Order placed successfully! Delivery in 7 days.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-white/5 rounded-xl p-4">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <Badge className="mb-3 bg-[#2D5016]">{product.category}</Badge>
            <h1 className="text-4xl font-bold mb-3 text-balance">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating_count} reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6 text-lg">{product.description}</p>

          {/* Price */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Price</p>
            <p className="text-4xl font-bold text-[#D4AF37]">₹{product.price.toFixed(2)}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Select Size</label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={`${selectedSize === size ? "bg-[#2D5016] text-white" : "border-white/20"}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-white/20"
              >
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-16 text-center bg-white/5 border border-white/10 rounded px-2 py-1"
              />
              <Button variant="outline" onClick={() => setQuantity(quantity + 1)} className="border-white/20">
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button onClick={handleOrderNow} className="flex-1 bg-[#2D5016] hover:bg-[#2D5016]/90 text-white py-6 text-lg">
              <ShoppingCart className="mr-2 w-5 h-5" />
              Order Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="px-6 border-white/20 hover:bg-white/10 bg-transparent"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm">Fast delivery within 7 days</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
        {/* Ingredients */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Key Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Certifications */}
      {product.certifications && product.certifications.length > 0 && (
        <Card className="mt-8 border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Certifications & Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {product.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="px-4 py-2 text-sm">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
