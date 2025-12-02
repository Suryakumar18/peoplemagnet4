"use client"

import type React from "react"

import { useState } from "react"
import {
  X,
  Clock,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Course {
  title: string
  duration: string
  image: string
  category?: string
  description?: string
  highlights?: string[]
  modules?: number
  students?: number
}

interface CourseModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
}

export function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  const [showBrochureForm, setShowBrochureForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    purpose: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  if (!isOpen || !course) return null

  const defaultHighlights = [
    "Industry-recognized certification",
    "Live project experience",
    "Expert mentorship",
    "Job placement assistance",
    "Flexible learning schedule",
    "Lifetime access to materials",
  ]

  const highlights = course.highlights || defaultHighlights

  const handleBrochureDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsDownloaded(true)

    // Trigger download (in real app, this would be an actual PDF)
    const link = document.createElement("a")
    link.href = "/brochures/course-brochure.pdf"
    link.download = `${course.title.replace(/\s+/g, "-")}-Brochure.pdf`
    link.click()

    setTimeout(() => {
      setShowBrochureForm(false)
      setIsDownloaded(false)
      setFormData({ name: "", email: "", phone: "", city: "", purpose: "" })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-md animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2.5 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <X className="w-5 h-5 text-navy" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image section */}
          <div className="relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-green text-navy px-4 py-1.5 rounded-full text-sm font-semibold">
              {course.category || "Professional Course"}
            </div>

            {/* Title on image (mobile) */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">{course.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-16rem)] lg:max-h-[90vh]">
            {/* Title (desktop) */}
            <h2 className="hidden lg:block font-serif text-2xl lg:text-3xl font-bold text-navy mb-6 leading-tight">
              {course.title}
            </h2>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-2.5">
                <Clock className="w-5 h-5 text-blue" />
                <span className="text-navy font-medium text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-2.5">
                <BookOpen className="w-5 h-5 text-blue" />
                <span className="text-navy font-medium text-sm">{course.modules || 12}+ Modules</span>
              </div>
              <div className="flex items-center gap-2 bg-cream rounded-xl px-4 py-2.5">
                <Users className="w-5 h-5 text-blue" />
                <span className="text-navy font-medium text-sm">{course.students || "500"}+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-green/20 rounded-xl px-4 py-2.5">
                <Award className="w-5 h-5 text-green" />
                <span className="text-navy font-medium text-sm">Certified</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {course.description ||
                `Master the essential skills and concepts of ${course.title}. This comprehensive program is designed to take you from fundamentals to advanced practical applications, preparing you for real-world success in your career.`}
            </p>

            {/* Highlights */}
            <h3 className="font-serif text-xl font-bold text-navy mb-4">What You'll Get</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-green flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-navy/80 text-sm">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 bg-green text-navy hover:bg-green/90 rounded-xl py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green/30"
              >
                Enroll Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowBrochureForm(true)}
                className="flex-1 border-navy text-navy hover:bg-navy hover:text-white rounded-xl py-6 text-base font-semibold transition-all duration-300 bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>

        {/* Brochure Download Form Overlay */}
        {showBrochureForm && (
          <div
            className="absolute inset-0 bg-navy/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in z-10"
            onClick={() => setShowBrochureForm(false)}
          >
            <div
              className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBrochureForm(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-2">Download Brochure</h3>
                <p className="text-muted-foreground text-sm">
                  Fill in your details to get the complete course brochure
                </p>
              </div>

              <form onSubmit={handleBrochureDownload} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 py-5 rounded-xl bg-cream/50"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 py-5 rounded-xl bg-cream/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 py-5 rounded-xl bg-cream/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="pl-10 py-5 rounded-xl bg-cream/50"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream/50 border border-border text-navy appearance-none"
                    required
                  >
                    <option value="">Purpose of Learning</option>
                    <option value="career-switch">Career Switch</option>
                    <option value="upskilling">Upskilling</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="business">Business Growth</option>
                    <option value="student">Student/Fresh Graduate</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isDownloaded}
                  className="w-full bg-green text-navy hover:bg-green/90 rounded-xl py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : isDownloaded ? (
                    "Downloaded!"
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Now
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
