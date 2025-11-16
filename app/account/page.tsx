"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, User, ShoppingBag, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface UserProfile {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postal_code: string
}

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
      }
    }

    checkAuth()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Save profile logic
    setIsEditing(false)
  }

  if (!user) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-balance">My Account</h1>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="bg-white/10 border border-white/20">
          <TabsTrigger value="profile" className="flex gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex gap-2">
            <ShoppingBag className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex gap-2">
            <Heart className="w-4 h-4" />
            Wishlist
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Info */}
            <Card className="md:col-span-2 border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Profile Information
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-white/20"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        disabled={!isEditing}
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        disabled={!isEditing}
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input disabled value={user?.email || ""} className="bg-white/5 border-white/20" />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border-white/20"
                    />
                  </div>

                  <div>
                    <Label>Address</Label>
                    <Input
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="bg-white/5 border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        disabled={!isEditing}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        disabled={!isEditing}
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    <div>
                      <Label>Postal Code</Label>
                      <Input
                        disabled={!isEditing}
                        value={formData.postal_code}
                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <Button type="submit" className="w-full bg-[#2D5016] hover:bg-[#3d6b1f]">
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <div className="space-y-4">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Member Since</span>
                      <Badge className="bg-[#2D5016]">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Email Verified</span>
                      <Badge className="bg-green-600">Yes</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No orders yet</p>
                <Link href="/products">
                  <Button className="mt-4 bg-[#2D5016] hover:bg-[#3d6b1f]">Start Shopping</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">Your wishlist is empty</p>
                <Link href="/products">
                  <Button className="mt-4 bg-[#2D5016] hover:bg-[#3d6b1f]">Explore Products</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
