'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import BackButton from "@/components/back-button"
import { CheckoutModal } from "@/components/checkout-modal"

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    image_url: string
  }
  size: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      product: {
        id: "1",
        name: "Shakara Malt - Premium Nutrition",
        price: 450,
        image_url: "/shakara-malt-front.png",
      },
      size: "500g",
      quantity: 1,
    },
  ])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 100
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />

        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Start adding products to your cart!</p>
          <Link href="/products">
            <Button className="bg-[#2D5016] hover:bg-[#3d6b1f]">Continue Shopping</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />

      <h1 className="text-4xl font-bold mb-8 mt-4 text-balance">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="border-white/10 bg-white/5">
              <CardContent className="flex gap-4 p-6">
                <Image
                  src={item.product.image_url || "/placeholder.svg"}
                  alt={item.product.name}
                  width={120}
                  height={120}
                  className="rounded object-cover cursor-pointer hover:opacity-80 transition"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <Badge className="mt-2 bg-[#2D5016]">{item.size}</Badge>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border-white/20"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-white/20"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#D4AF37]">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">₹{item.product.price.toFixed(2)} each</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border-white/10 bg-white/5 sticky top-4">
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 border-b border-white/10 pb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? <Badge className="bg-green-600">FREE</Badge> : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#D4AF37]">₹{total.toFixed(2)}</span>
              </div>

              {subtotal <= 500 && (
                <p className="text-xs text-muted-foreground bg-white/10 p-2 rounded">
                  Free shipping on orders above ₹500
                </p>
              )}

              <Button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#2D5016] hover:bg-[#3d6b1f] text-white py-6"
              >
                Order Now
              </Button>

              <Button variant="outline" className="w-full border-white/20 bg-transparent">
                <Link href="/products" className="w-full">
                  Continue Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={total}
      />
    </main>
  )
}
