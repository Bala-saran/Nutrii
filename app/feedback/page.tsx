"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Upload } from "lucide-react"
import BackButton from "@/components/back-button"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle feedback submission
    setSubmitted(true)
    setTimeout(() => {
      setRating(0)
      setFeedback("")
      setImage(null)
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-16 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Share Your Experience</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">Your feedback helps us improve and serve you better</p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-3xl">Rate Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold mb-4">Product Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="mt-2 text-sm text-[#D4AF37]">
                    {rating === 5 && "Excellent!"}
                    {rating === 4 && "Great!"}
                    {rating === 3 && "Good"}
                    {rating === 2 && "Okay"}
                    {rating === 1 && "Needs improvement"}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-semibold mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience with Nutritham products..."
                  className="w-full h-32 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold mb-2">
                  Upload Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#D4AF37] transition cursor-pointer">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">{image ? image.name : "Click to upload image"}</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!rating || !feedback || submitted}
                className="w-full bg-[#2D5016] hover:bg-[#3d6b1f] text-white py-6 text-lg"
              >
                {submitted ? "Thank You!" : "Submit Feedback"}
              </Button>

              {submitted && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center">
                  We appreciate your feedback! It helps us serve you better.
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-12 text-balance">What Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Rajesh Kumar",
              role: "Fitness Enthusiast",
              feedback:
                "Nutritham products are exceptional! The quality is unmatched and I noticed visible results within weeks.",
              rating: 5,
              image: "👨",
            },
            {
              name: "Priya Singh",
              role: "Health Conscious",
              feedback:
                "Finally found natural products I can trust. All certifications are genuine and customer service is amazing!",
              rating: 5,
              image: "👩",
            },
            {
              name: "Amit Patel",
              role: "Athlete",
              feedback:
                "The HerboVita protein mix is my go-to post-workout supplement. Lab tested and results speak for themselves.",
              rating: 5,
              image: "👨",
            },
            {
              name: "Neha Sharma",
              role: "Nutritionist",
              feedback:
                "I recommend Nutritham to all my clients. The ingredient transparency and certifications set them apart.",
              rating: 5,
              image: "👩",
            },
            {
              name: "Vikram Gupta",
              role: "Regular Customer",
              feedback:
                "Monthly subscriber to Shakara Malt. Consistent quality, excellent value, and great customer support.",
              rating: 5,
              image: "👨",
            },
            {
              name: "Anjali Desai",
              role: "Mother of Two",
              feedback: "Safe for my family, naturally sourced, and my kids love the taste. Worth every penny!",
              rating: 5,
              image: "👩",
            },
          ].map((testimonial, i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <span className="text-3xl">{testimonial.image}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.feedback}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
