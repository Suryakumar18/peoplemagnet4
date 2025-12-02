"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto">
        <div
          className={`relative bg-navy rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
            <p className="text-white/70 mb-8">Get weekly updates on the newest courses right in your mailbox.</p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-green">
                <Check className="w-5 h-5" />
                <span>Thank you! Your submission has been received!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6"
                  required
                />
                <Button type="submit" className="bg-green text-navy hover:bg-green/90 rounded-full px-8 group">
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
