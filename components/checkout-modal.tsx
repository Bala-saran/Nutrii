'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Loader } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
  }
  size: string
  quantity: number
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  total: number
}

export function CheckoutModal({ isOpen, onClose, cartItems, total }: CheckoutModalProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  
  const [formData, setFormData] = useState({
    receiverName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('cod')

  useEffect(() => {
    const getUser = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        setFormData(prev => ({ ...prev, email: user.email || '' }))
      }
    }
    getUser()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.receiverName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all fields')
      return
    }

    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId) {
      alert('Please login to place an order')
      return
    }

    if (!formData.email) {
      alert('Email is required')
      return
    }

    if (cartItems.length === 0) {
      alert('Cart is empty')
      return
    }

    setIsLoading(true)

    try {
      const orderData = {
        user_id: userId,
        user_email: formData.email,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        })),
        total: total,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
        paymentMethod,
      }

      console.log("[v0] Sending order data:", orderData)

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const responseData = await response.json()
      console.log("[v0] API response:", responseData, "Status:", response.status)

      if (response.ok) {
        setShowSuccessPopup(true)
        setTimeout(() => {
          setStep('confirmation')
        }, 2000)
      } else {
        alert(`Failed to place order: ${responseData.error}`)
      }
    } catch (error) {
      console.error('[v0] Order creation failed:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep('address')
    setShowSuccessPopup(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
          </DialogHeader>

          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Delivery Address</h3>
                
                <div>
                  <label className="text-sm font-medium">Receiver Name *</label>
                  <Input
                    name="receiverName"
                    placeholder="Full name"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/10 border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/10 border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input
                    name="phone"
                    placeholder="+91 9XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/10 border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Address *</label>
                  <Input
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 bg-white/10 border-white/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium">City *</label>
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">State *</label>
                    <Input
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pincode *</label>
                    <Input
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/20"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#2D5016] hover:bg-[#3d6b1f]">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Payment Method</h3>
                
                <Card className="border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition" onClick={() => setPaymentMethod('cod')}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="cod" className="cursor-pointer flex-1">
                        <div className="font-semibold">Cash on Delivery</div>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5 opacity-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="online"
                        name="payment"
                        value="online"
                        disabled
                        className="w-4 h-4"
                      />
                      <label htmlFor="online" className="cursor-not-allowed flex-1">
                        <div className="font-semibold">Online Payment</div>
                        <p className="text-sm text-muted-foreground">Coming Soon</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">Delivery Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Receiver:</span>
                  <span>{formData.receiverName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Date:</span>
                  <span>7 Days</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span className="text-[#D4AF37]">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          )}

          {step === 'confirmation' && (
            <div className="text-center space-y-4 py-8">
              <div className="flex justify-center">
                <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold">Order Placed Successfully!</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Thank you for your order</p>
                <p className="text-sm">Confirmation email sent to {formData.email}</p>
                <p className="text-sm">Expected delivery in 7 days</p>
              </div>
              <Button 
                onClick={handleClose}
                className="w-full bg-[#2D5016] hover:bg-[#3d6b1f]"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce">
            <div className="bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl text-lg font-bold">
              ✓ Order Confirmed!
            </div>
          </div>
        </div>
      )}
    </>
  )
}
