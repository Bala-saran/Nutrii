"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CarouselItem {
  id: string
  name: string
  price: number
  title: string
  subtitle: string
  color: string
  image_url: string
  discount?: number
}

interface SwipeableCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
}

export default function SwipeableCarousel({ items, autoPlay = true, interval = 5000 }: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!autoPlay || items.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    setDragStart("clientX" in e ? e.clientX : e.touches[0].clientX)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const dragEnd = "clientX" in e ? e.clientX : e.changedTouches[0].clientX
    const diff = dragStart - dragEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }

    setIsDragging(false)
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div
      className="relative h-96 md:h-screen bg-gradient-to-b from-[#2D5016]/20 to-transparent overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: 1 }}>
        <div className={`w-full h-full bg-gradient-to-r ${currentItem.color}`}>
          <Image
            src={currentItem.image_url || "/placeholder.svg"}
            alt={currentItem.name}
            fill
            className="object-cover opacity-40"
          />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <Badge className="mb-4 bg-[#D4AF37] text-[#2D5016]">Nutritham Private Limited</Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">{currentItem.title}</h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl text-balance">{currentItem.subtitle}</p>
        {currentItem.discount && (
          <Badge className="mb-4 bg-red-500 text-white text-lg px-4 py-2">
            {currentItem.discount}% OFF - ₹{(currentItem.price * (1 - currentItem.discount / 100)).toFixed(0)}
          </Badge>
        )}
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 transition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 transition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
