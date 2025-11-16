"use client"

import type { Product } from "@/lib/api/products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group border-white/10 bg-gradient-to-b from-white/5 to-white/0">
      <div className="relative overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {product.lab_certified && (
            <div className="bg-[#2D5016] text-white px-2 py-1 rounded text-xs font-semibold">Lab Tested</div>
          )}
        </div>
      </div>

      <CardContent className="pt-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-[#D4AF37] transition line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
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
          <span className="text-xs text-muted-foreground">({product.rating_count})</span>
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.certifications.slice(0, 3).map((cert) => (
              <span key={cert} className="text-xs bg-[#2D5016]/20 text-[#D4AF37] px-2 py-1 rounded">
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-2xl font-bold text-[#D4AF37]">₹{product.price.toFixed(2)}</p>
            {product.sizes.length > 0 && <p className="text-xs text-muted-foreground">{product.sizes.join(", ")}</p>}
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={isWishlisted ? "text-red-500" : ""}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
            <Link href={`/products/${product.id}`}>
              <Button size="sm" className="bg-[#2D5016] hover:bg-[#2D5016]/90 text-white">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Order
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
