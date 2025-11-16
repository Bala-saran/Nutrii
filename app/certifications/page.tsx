'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import BackButton from "@/components/back-button"
import { ImageLightbox } from "@/components/image-lightbox"
import { LabReportModal } from "@/components/lab-report-modal"

interface Certificate {
  id: string
  title: string
  certificate_type: string
  image_url: string
  description: string
  created_at: string
  pdf_url?: string
  test_date?: string
  valid_until?: string
  test_details?: string[]
}

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false })

      if (data) setCertificates(data)
      setLoading(false)
    }

    fetchCertificates()
  }, [supabase])

  const filteredCerts = selectedType
    ? certificates.filter((cert) => cert.certificate_type === selectedType)
    : certificates

  const certTypes = ["FSSAI", "ISO", "NABL", "Lab", "Organic", "Recognition"]
  const certDescriptions: Record<string, string> = {
    FSSAI: "Food Safety and Standards Authority of India - Ensures highest food safety standards",
    ISO: "International Organization for Standardization - Quality management systems",
    NABL: "National Accreditation Board for Laboratory - Accredited testing standards",
    Lab: "Independent Laboratory Testing - Third-party verification of quality and purity",
    Organic: "Organic Certification - USDA and India organic certified products",
    Recognition: "10 Years Recognition - DPIIT Startup Certification - Government of India",
  }

  return (
    <main className="min-h-screen">
      <BackButton />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2D5016] to-[#4A7C2E] py-16 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Quality Assurance & Certifications
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Every Nutritham product is backed by rigorous testing, quality checks, and international certifications
          </p>
        </div>
      </section>

      {/* Recognition Badge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <ImageLightbox src="/10-years-recognition.png" alt="10 Years Recognition">
            <div className="rounded-lg overflow-hidden border-2 border-[#D4AF37] shadow-lg hover:shadow-xl transition">
              <Image
                src="/10-years-recognition.png"
                alt="10 Years Recognition Certificate"
                width={400}
                height={300}
                className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </ImageLightbox>
          <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-black font-bold px-4 py-2">
            10 Years Recognition
          </Badge>
        </div>
      </section>

      {/* Certification Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-balance">Our Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {certTypes.map((type) => (
            <Card
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`cursor-pointer transition-all border-white/10 ${
                selectedType === type ? "bg-[#2D5016] border-[#D4AF37]" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">{type}</h3>
                <p className="text-sm text-muted-foreground">{certDescriptions[type]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Certificate Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">Loading certificates...</div>
        ) : filteredCerts.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold mb-8 text-balance">
              {selectedType ? `${selectedType} Certifications` : "All Certifications"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => (
                <Card
                  key={cert.id}
                  className="overflow-hidden hover:shadow-xl transition-all border-white/10 bg-gradient-to-b from-white/5 to-white/0 group h-full flex flex-col"
                >
                  <ImageLightbox src={cert.image_url || "/placeholder.svg"} alt={cert.title}>
                    <div className="relative h-48 bg-white/5 flex items-center justify-center overflow-hidden cursor-pointer">
                      <Image
                        src={cert.image_url || "/placeholder.svg"}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </ImageLightbox>
                  <CardContent className="pt-6 flex-1 flex flex-col">
                    <Badge className="mb-3 bg-[#2D5016] w-fit">{cert.certificate_type}</Badge>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#D4AF37] transition">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{cert.description}</p>
                    <div className="mt-4">
                      <LabReportModal
                        certificateTitle={cert.title}
                        certificateType={cert.certificate_type}
                        description={cert.description}
                        pdfUrl={cert.pdf_url}
                        testDate={cert.test_date}
                        validUntil={cert.valid_until}
                        details={cert.test_details}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No certificates found for this type.</p>
          </div>
        )}
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-balance">Why Certifications Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl">Safety Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All products undergo rigorous testing for contaminants, allergens, and harmful substances to ensure consumer safety.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl">Quality Assured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                International standards certification guarantees consistent quality across every batch and production run.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl">Transparency First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete lab reports and test results available for every product to build trust with our customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
