'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SignUpSuccessPage() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="border-white/10 bg-white/5">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl">Account Created!</CardTitle>
            <CardDescription className="mt-2">Your Nutritham account has been created successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground/80">
              A confirmation email has been sent to your inbox. Please verify your email to complete the registration.
            </p>
            <p className="text-sm text-foreground/70">
              You can now explore our products, add items to your wishlist, and track your orders.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/">
                <Button className="w-full bg-[#2D5016] hover:bg-[#3d6b1f]">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full border-white/20">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
