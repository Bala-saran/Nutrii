"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Lock } from 'lucide-react'

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/orders-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.status === 401) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        setError("Failed to fetch orders. Please try again.")
        setIsLoading(false)
        return
      }

      const csvContent = await response.text()
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `nutritham-orders-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      
      setIsAuthenticated(true)
      setIsLoading(false)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-400">✓ Successfully authenticated as admin</p>
              <p className="text-green-400/80 text-sm mt-2">CSV file download started automatically</p>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>CSV Contents:</strong> Order ID, Date, Delivery Date, Customer Email, Products, Quantities, Total, Status
              </p>
            </div>

            <Button 
              onClick={() => {
                setIsAuthenticated(false)
                setEmail("")
                setPassword("")
                setError("")
              }} 
              variant="outline" 
              className="w-full border-white/20"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-md mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <Card className="w-full border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="thestylishman7@gmail.com"
                className="bg-white/10 border-white/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white/10 border-white/20"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-[#2D5016] hover:bg-[#3d6b1f]">
              {isLoading ? "Logging in..." : "Login & Download CSV"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
