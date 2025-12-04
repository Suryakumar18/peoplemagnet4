"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  Calendar,
  Check,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Course {
  title: string
  duration: string
  image: string
  category?: string
  description?: string
  highlights?: string[]
  modules?: number
  students?: number
  level?: string
  format?: string
}

interface CourseModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
}

export function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState<"enroll" | "brochure">("enroll")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    purpose: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // For brochure download, trigger actual download
    if (formType === "brochure") {
      const link = document.createElement("a")
      link.href = "/brochures/course-brochure.pdf"
      link.download = `${course.title.replace(/\s+/g, "-")}-Brochure.pdf`
      link.click()
    }

    // Reset after delay
    setTimeout(() => {
      setIsSubmitted(false)
      setShowForm(false)
      setFormData({ name: "", email: "", phone: "", city: "", purpose: "", message: "" })
      
      // If it was brochure download, also close the modal
      if (formType === "brochure") {
        onClose()
      }
    }, 2000)
  }

  const openForm = (type: "enroll" | "brochure") => {
    setFormType(type)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setFormData({ name: "", email: "", phone: "", city: "", purpose: "", message: "" })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal Container */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {showForm ? (
          // FORM VIEW
          <div className="p-6">
            {/* Form Header with Close button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${formType === "enroll" ? "bg-blue/20" : "bg-green/20"} flex items-center justify-center`}>
                  {formType === "enroll" ? (
                    <Calendar className="w-5 h-5 text-blue" />
                  ) : (
                    <Download className="w-5 h-5 text-green" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {formType === "enroll" ? "Enroll Now" : "Download Brochure"}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {course.title}
                  </p>
                </div>
              </div>
              
              {/* Close button for form view */}
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              // SUCCESS MESSAGE
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {formType === "enroll" ? "Enrollment Request Sent!" : "Brochure Downloaded!"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {formType === "enroll" 
                    ? "Our team will contact you within 24 hours"
                    : "Check your email for the brochure"}
                </p>
                <Button
                  onClick={closeForm}
                  className="mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-8"
                >
                  Close
                </Button>
              </div>
            ) : (
              // FORM FIELDS
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* City & Purpose */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500 appearance-none"
                        required
                      >
                        <option value="">Purpose</option>
                        <option value="student">Student</option>
                        <option value="working">Working Professional</option>
                        <option value="business">Business Owner</option>
                        <option value="career-switch">Career Switch</option>
                        <option value="upskilling">Upskilling</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <Textarea
                    placeholder={formType === "enroll" 
                      ? "Any specific requirements or questions about the course..." 
                      : "Any specific information you need in the brochure..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[80px] rounded-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={closeForm}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg py-3"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 rounded-lg py-3 text-base font-semibold ${formType === "enroll" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                        {formType === "enroll" ? "Submitting..." : "Processing..."}
                      </span>
                    ) : (
                      formType === "enroll" ? "Submit" : "Download"
                    )}
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-2">
                  {formType === "enroll" 
                    ? "No payment required now. We'll contact you with details."
                    : "The brochure will be emailed to you immediately."}
                </p>
              </form>
            )}
          </div>
        ) : (
          // COURSE OVERVIEW VIEW
          <>
            {/* Close button for overview */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2.5 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {/* Image section */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
              <Image 
                src={course.image || "/placeholder.svg"} 
                alt={course.title} 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 bg-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                {course.category || "Professional Course"}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h2>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{course.level || "All Levels"}</span>
                </div>
                {course.modules && (
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{course.modules} Modules</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {course.description ||
                  `Master essential skills in ${course.title}. Comprehensive training with hands-on projects and expert guidance.`}
              </p>

              {/* Key Highlights */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Key Highlights</h3>
                </div>
                <div className="space-y-2">
                  {highlights.slice(0, 4).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => openForm("enroll")}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                           hover:from-blue-700 hover:to-blue-800 rounded-lg py-3 text-base font-semibold shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => openForm("brochure")}
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 
                           hover:text-gray-900 rounded-lg py-3 text-base font-semibold transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}