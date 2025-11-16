'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'
import { createClient } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import BackButton from '@/components/back-button'
import { Search } from 'lucide-react'

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

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch categories
      const { data: categoryData } = await supabase.from('products').select('category').eq('available', true)

      if (categoryData) {
        const uniqueCategories = Array.from(new Set(categoryData.map((item) => item.category)))
        setCategories(uniqueCategories)
      }

      // Fetch all products
      const { data: productData } = await supabase.from('products').select('*').eq('available', true).order('created_at', { ascending: false })

      if (productData) {
        setProducts(productData)
        setFilteredProducts(productData)
      }

      const search = searchParams.get('search')
      if (search) {
        setSearchQuery(search)
        performSearch(productData || [], search)
      }

      setLoading(false)
    }

    fetchData()
  }, [searchParams, supabase])

  const performSearch = (allProducts: Product[], query: string) => {
    const lowerQuery = query.toLowerCase()
    const results = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
    )
    setFilteredProducts(results)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      performSearch(products, query)
    } else {
      setFilteredProducts(products)
    }
  }

  const handleFilterChange = (filters: any) => {
    let filtered = products

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category))
    }

    if (filters.priceRange) {
      filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    }

    if (filters.certifications.length > 0) {
      filtered = filtered.filter((p) => p.certifications.some((cert) => filters.certifications.includes(cert)))
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />

      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-2 text-balance">Our Products</h1>
        <p className="text-muted-foreground text-lg">
          Discover our complete range of lab-tested, certified natural nutrition products
        </p>

        <div className="mt-6 flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by product name, ingredients, or category..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters categories={categories} onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your search. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
