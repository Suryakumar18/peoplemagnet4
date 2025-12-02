"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  Building2,
  GraduationCap,
  Briefcase,
  Send,
  Mail,
  Phone,
  User,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FloatingLinesBackground } from "@/components/floating-lines-background"

const benefits = [
  {
    icon: Users,
    title: "Customized Training",
    description: "Tailored programs designed specifically for your team's needs and industry requirements.",
  },
  {
    icon: Target,
    title: "Industry-Ready Talent",
    description: "Access pre-trained candidates with hands-on project experience and certifications.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous assessment process ensures only top performers join your organization.",
  },
  {
    icon: TrendingUp,
    title: "Reduced Hiring Costs",
    description: "Save on recruitment and training expenses with our job-ready candidates.",
  },
]

const services = [
  {
    title: "Corporate Training",
    description:
      "Upskill your existing workforce with customized training programs in Digital Marketing, Development, and Design.",
    features: ["On-site or remote training", "Flexible scheduling", "Progress tracking", "Certification"],
  },
  {
    title: "Hire Trained Talent",
    description: "Recruit from our pool of certified professionals who have completed our rigorous training programs.",
    features: ["Pre-screened candidates", "Portfolio review", "Interview support", "90-day guarantee"],
  },
  {
    title: "Internship Programs",
    description:
      "Partner with us for internship programs that give students real-world experience while supporting your projects.",
    features: ["Project-based interns", "Mentorship included", "Flexible duration", "Conversion options"],
  },
]

export default function HireAndTrainPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="min-h-screen relative">
      <FloatingLinesBackground
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={[8, 12, 16]}
        lineDistance={[10, 8, 6]}
        interactive={true}
        parallax={true}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Just Learn Digital" width={200} height={50} className="h-10 w-auto" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-navy hover:text-blue transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 bg-green/10 text-green px-4 py-2 rounded-full mb-6">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">For Businesses & Recruiters</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy mb-6 leading-tight">
              Hire & Train
              <br />
              <span className="text-blue">Future-Ready Talent</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Partner with Just Learn Digital to access skilled professionals or train your team with industry-relevant
              skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green text-navy hover:bg-green/90 rounded-full px-8 py-6 text-lg font-semibold">
                <GraduationCap className="w-5 h-5 mr-2" />
                Hire Talent
              </Button>
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white rounded-full px-8 py-6 text-lg font-semibold bg-transparent"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Train Your Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 lg:px-12 bg-cream/50 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-navy mb-16">
            Why Partner With Us<span className="text-green">?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-green/10 flex items-center justify-center mb-4 group-hover:bg-green/20 group-hover:scale-110 transition-all">
                    <Icon className="w-7 h-7 text-green" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-navy mb-16">
            Our Services<span className="text-green">.</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="h-2 w-20 bg-gradient-to-r from-green to-blue rounded-full mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="font-serif text-2xl font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                      <span className="text-navy/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 lg:px-12 bg-navy relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Work Together<span className="text-green">.</span>
            </h2>
            <p className="text-white/70">
              Tell us about your hiring or training needs, and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 py-6 rounded-xl bg-cream/50"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 py-6 rounded-xl bg-cream/50"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 py-6 rounded-xl bg-cream/50"
                    required
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="pl-12 py-6 rounded-xl bg-cream/50"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Tell us about your requirements..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-4 rounded-xl bg-cream/50 border border-border resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green text-navy hover:bg-green/90 rounded-xl py-6 text-lg font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-cream border-t border-border relative z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">© 2025 Just Learn Digital. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
