"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The teaching style is super clear and beginner-friendly. I now understand SEO, social media, and running ads — something I never thought I could learn this easily! Thank you!!!",
    name: "Praneeth S",
    role: "Freelancer",
    avatar: "/professional-indian-man-freelancer.jpg",
  },
  {
    quote:
      "From a complete beginner to creating real full-stack projects — this course shaped my skills step by step. The guidance was practical and easy to follow, and it gave me the confidence to start my tech career.",
    name: "Nivetha",
    role: "Developer",
    avatar: "/professional-indian-woman-developer.jpg",
  },
  {
    quote:
      "This is the only course that gave me practical experience. Real projects, real guidance, and real results. Thank you Just Learn Digital team!!!",
    name: "Sameer SA",
    role: "Digital Marketing Head",
    avatar: "/professional-indian-man-marketing-executive.jpg",
  },
  {
    quote:
      "This is the best course for beginners. The practical tasks, doubt sessions, and real project experience helped me confidently apply for developer roles.",
    name: "Vinoth",
    role: "Startup Owner",
    avatar: "/professional-indian-man-startup-founder.jpg",
  },
  {
    quote:
      "Before joining this course, marketing felt confusing. But the trainer made everything simple — from ads to content to strategy. Today, I confidently run digital campaigns for clients. Truly a career-changing course!",
    name: "Subin S",
    role: "Digital Marketing Executive",
    avatar: "/professional-indian-man-digital-marketer.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-8 lg:px-16 bg-navy relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-5xl relative">
        <h2
          className={`font-serif text-4xl md:text-5xl font-bold text-center mb-4 text-white ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          What Our Students Say<span className="text-green">.</span>
        </h2>
        <p
          className={`text-center text-white/60 mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          Real stories from real students who transformed their careers with us
        </p>

        {/* Main Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                    <Quote className="w-12 h-12 text-green mb-6" />
                    <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 font-light">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-green">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-green">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-green" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail preview */}
        <div className="hidden md:flex justify-center gap-4 mt-8">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              onClick={() => goToSlide(index)}
              className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ${
                index === currentIndex ? "ring-2 ring-green scale-110" : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
