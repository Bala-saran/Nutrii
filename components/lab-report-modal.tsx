"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, AlertCircle } from "lucide-react"

interface LabReportModalProps {
  certificateTitle: string
  certificateType: string
  description: string
  pdfUrl?: string
  testDate?: string
  validUntil?: string
  details?: string[]
}

export function LabReportModal({
  certificateTitle,
  certificateType,
  description,
  pdfUrl,
  testDate,
  validUntil,
  details,
}: LabReportModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    if (!pdfUrl) return
    setIsDownloading(true)
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${certificateTitle.replace(/\s+/g, "-")}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-[#D4AF37]/30 hover:border-[#D4AF37] bg-transparent">
          <FileText className="w-4 h-4" />
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{certificateTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Badge className="bg-[#2D5016]">{certificateType}</Badge>
            {testDate && <span className="text-sm text-muted-foreground">Tested: {testDate}</span>}
            {validUntil && <span className="text-sm text-muted-foreground">Valid until: {validUntil}</span>}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Certificate Details</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Test Details */}
          {details && details.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Test Results</h3>
              <ul className="space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 text-[#D4AF37]" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pdfUrl && (
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full gap-2 bg-[#2D5016] hover:bg-[#1f3810]"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download PDF Report"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
