import { createClient } from "@/lib/supabase/server"

export interface Product {
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

export async function getProducts(filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}) {
  const supabase = await createClient()

  let query = supabase.from("products").select("*").eq("available", true)

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) throw error
  return data as Product
}

export async function getProductsByCategory(category: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("available", true)
    .limit(10)

  if (error) throw error
  return data as Product[]
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("category").eq("available", true)

  if (error) throw error

  // Deduplicate categories using Set
  const uniqueCategories = Array.from(new Set(data?.map((item) => item.category) || []))
  return uniqueCategories
}
