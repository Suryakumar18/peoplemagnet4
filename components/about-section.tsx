"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Users, Award, Lightbulb, TrendingUp, Heart } from "lucide-react"

const aboutCards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize quality education and empower individuals with industry-relevant digital skills that open doors to new career opportunities.",
    color: "bg-blue/10",
    iconColor: "text-blue",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "To become India's most trusted platform for practical, job-ready skill development, transforming lives through accessible education.",
    color: "bg-green/10",
    iconColor: "text-green",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A passionate group of industry experts, educators, and mentors dedicated to delivering world-class learning experiences.",
    color: "bg-navy/10",
    iconColor: "text-navy",
  },
  {
    icon: Award,
    title: "Our Approach",
    description:
      "Project-based learning with real-world applications, ensuring students graduate with portfolios that impress employers.",
    color: "bg-green/10",
    iconColor: "text-green",
  },
  {
    icon: TrendingUp,
    title: "Our Growth",
    description:
      "From a small team to training 500+ students across India, we continue to expand our reach and impact every day.",
    color: "bg-blue/10",
    iconColor: "text-blue",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, excellence, accessibility, and student success drive everything we do. Your growth is our priority.",
    color: "bg-navy/10",
    iconColor: "text-navy",
  },
]

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !cardsRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const viewportHeight = window.innerHeight

      // Calculate scroll progress within the section
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - sectionTop) / (sectionHeight + viewportHeight * 0.5)),
      )

      // Map scroll progress to card index
      const newIndex = Math.min(aboutCards.length - 1, Math.floor(scrollProgress * aboutCards.length))

      setActiveIndex(newIndex)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-[200vh] relative py-20 md:py-24 px-6 lg:px-12">
      <div className="sticky top-24 container mx-auto max-w-6xl">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-navy mb-4">
            About <span className="relative inline-block">
              <span className="relative z-10">Us</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-green/30 rounded-full -rotate-1"></span>
            </span>
            <span className="text-green animate-pulse">.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation of digital professionals with industry-ready skills and practical experience.
          </p>
        </div>

        {/* Scroll Stack Cards */}
        <div ref={cardsRef} className="relative h-[380px] md:h-[400px] max-w-3xl mx-auto">
          {aboutCards.map((card, index) => {
            const Icon = card.icon
            const isActive = index === activeIndex
            const isPast = index < activeIndex
            const offset = index - activeIndex

            return (
              <div
                key={card.title}
                className={`absolute inset-0 transition-all duration-500 ease-out ${
                  isPast ? "opacity-0 scale-95 -translate-y-8" : ""
                }`}
                style={{
                  transform: `translateY(${offset * 20}px) scale(${1 - Math.abs(offset) * 0.05})`,
                  opacity: isPast ? 0 : 1 - Math.abs(offset) * 0.3,
                  zIndex: aboutCards.length - Math.abs(offset),
                }}
              >
                <div
                  className={`bg-card rounded-3xl p-7 md:p-10 lg:p-12 shadow-xl border border-border/50 h-full flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    isActive ? "shadow-2xl shadow-green/20" : "shadow-lg"
                  }`}
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${card.color} flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 ${
                      isActive ? "scale-110 rotate-3" : ""
                    }`}
                  >
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${card.iconColor} ${isActive ? "scale-110" : ""}`} />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl lg:text-[2rem] font-bold text-navy mb-3 md:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {aboutCards.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-gradient-to-r from-green to-blue"
                  : index < activeIndex
                    ? "w-2 bg-green/50"
                    : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}