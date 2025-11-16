"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  onFilterChange: (filters: any) => void
}

export default function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    certification: true,
  })

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000],
    certifications: [] as string[],
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedFilters.categories, category]
      : selectedFilters.categories.filter((c) => c !== category)

    const newFilters = { ...selectedFilters, categories: newCategories }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCertificationChange = (cert: string, checked: boolean) => {
    const newCerts = checked
      ? [...selectedFilters.certifications, cert]
      : selectedFilters.certifications.filter((c) => c !== cert)

    const newFilters = { ...selectedFilters, certifications: newCerts }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (range: number[]) => {
    const newFilters = { ...selectedFilters, priceRange: range }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const certifications = ["FSSAI", "ISO 22000", "NABL", "Organic Certified"]

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full hover:text-[#D4AF37] transition"
          >
            <CardTitle className="text-lg">Category</CardTitle>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.category ? "rotate-180" : ""}`} />
          </button>
        </CardHeader>
        {expandedSections.category && (
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={selectedFilters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Price Filter */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full hover:text-[#D4AF37] transition"
          >
            <CardTitle className="text-lg">Price Range</CardTitle>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
          </button>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="space-y-4">
            <Slider
              value={selectedFilters.priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={2000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>₹{selectedFilters.priceRange[0]}</span>
              <span>₹{selectedFilters.priceRange[1]}</span>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Certification Filter */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-3">
          <button
            onClick={() => toggleSection("certification")}
            className="flex items-center justify-between w-full hover:text-[#D4AF37] transition"
          >
            <CardTitle className="text-lg">Certifications</CardTitle>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSections.certification ? "rotate-180" : ""}`}
            />
          </button>
        </CardHeader>
        {expandedSections.certification && (
          <CardContent className="space-y-3">
            {certifications.map((cert) => (
              <label key={cert} className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={selectedFilters.certifications.includes(cert)}
                  onCheckedChange={(checked) => handleCertificationChange(cert, checked as boolean)}
                />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </CardContent>
        )}
      </Card>

      <Button
        variant="outline"
        className="w-full border-white/20 hover:bg-white/10 bg-transparent"
        onClick={() => {
          setSelectedFilters({
            categories: [],
            priceRange: [0, 1000],
            certifications: [],
          })
          onFilterChange({
            categories: [],
            priceRange: [0, 1000],
            certifications: [],
          })
        }}
      >
        Clear Filters
      </Button>
    </div>
  )
}
