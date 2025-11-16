import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Leaf, Award, Users } from 'lucide-react'
import Link from "next/link"
import BackButton from "@/components/back-button"

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />

      {/* Hero Section */}
      <div className="text-center mb-12 mt-4">
        <h1 className="text-5xl font-bold mb-4 text-balance">About Nutritham Private Limited</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner in natural, certified nutrition for a healthier lifestyle
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#2D5016]" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide the highest quality, lab-certified organic nutrition products that support optimal health and wellness for every individual.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To become India's leading natural nutrition brand, trusted by millions for quality, authenticity, and commitment to health.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Company Story */}
      <Card className="border-white/10 bg-white/5 mb-12">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Nutritham Private Limited was founded with a simple belief: everyone deserves access to pure, natural nutrition without compromising on quality or trust. Founded in 2020, we started with a vision to revolutionize the health and nutrition industry in India.
          </p>
          <p className="text-muted-foreground">
            Our commitment to excellence is reflected in every product we create. We source only the finest organic ingredients, subject them to rigorous lab testing, and ensure they meet international quality standards including FSSAI, ISO, and NABL certifications.
          </p>
          <p className="text-muted-foreground">
            Today, Nutritham serves thousands of customers across India who trust us for their daily nutrition needs. Our products range from premium malt nutrition mixes to herbal protein supplements, all designed to support your health journey.
          </p>
        </CardContent>
      </Card>

      {/* Core Values */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Leaf, title: "100% Natural", desc: "No artificial additives or fillers" },
            { icon: Award, title: "Certified Quality", desc: "Lab-tested and certified" },
            { icon: Users, title: "Customer First", desc: "Your health is our priority" },
            { icon: CheckCircle, title: "Transparency", desc: "Complete ingredient disclosure" },
          ].map((value, i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardContent className="pt-6 text-center">
                <value.icon className="w-12 h-12 mx-auto mb-3 text-[#2D5016]" />
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <Card className="border-white/10 bg-white/5 text-center">
        <CardContent className="pt-12 pb-12">
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get in touch with our team to learn more about our products and commitment to quality.
          </p>
          <Link href="/contact">
            <Button className="bg-[#2D5016] hover:bg-[#3d6b1f]">Contact Us</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
