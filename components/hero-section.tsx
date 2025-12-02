"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import localFont from "next/font/local"

// Import fancy fonts (you'll need to add these fonts to your project)
// These are examples - you can choose different ones

// For headings - Playfair Display (elegant serif)
import { Playfair_Display, Montserrat, Inter, Poppins } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const heroCards = [
  {
    image: "/professional-marketing-executive-woman-laptop-digi.jpg",
    label: "Marketing",
    course: "Marketing Course",
    topics: 100,
  },
  {
    image: "/teacher-educator-professional-classroom-modern-tea.jpg",
    label: "Teaching",
    course: "Teaching Course",
    topics: 100,
  },
  {
    image: "/software-developer-coding-programmer-laptop-modern.jpg",
    label: "Coding",
    course: "Coding Training",
    topics: 100,
  },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
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

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className={`${playfair.variable} ${montserrat.variable} ${poppins.variable} relative min-h-screen pt-24 pb-12 overflow-hidden z-10`}
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-20 xl:px-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          <div className={`space-y-8 pl-4 md:pl-10 lg:pl-12 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            {/* Main Headline with elegant fonts */}
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-navy tracking-tight">
              <span className="block font-black italic">Skillup.</span>
              <span className="block text-blue font-black italic mt-2">Grow.</span>
              <span className="block font-black italic mt-2">Succeed.</span>
            </h1>

            {/* Subtitle with modern sans-serif */}
            <p className="text-navy/70 text-lg md:text-xl max-w-lg leading-relaxed font-[family-name:var(--font-poppins)] font-light tracking-wide">
              Transform your career with industry-leading courses designed for real-world success. Learn from experts
              and build your future.
            </p>

            {/* Button with clean font */}
            <Button
              size="lg"
              className="bg-green text-navy hover:bg-green/90 rounded-xl px-10 py-7 text-lg font-[family-name:var(--font-montserrat)] font-semibold group transition-all duration-300 hover:shadow-xl hover:shadow-green/30 hover:-translate-y-1 tracking-wide"
            >
              Explore Courses
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>

          <div
            className="flex gap-4 justify-center items-stretch h-[450px] md:h-[550px] lg:h-[600px]"
            onMouseLeave={() => setActiveCard(0)}
          >
            {heroCards.map((card, index) => {
              const isActive = activeCard === index

              return (
                <div
                  key={card.label}
                  onMouseEnter={() => setActiveCard(index)}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 ease-out ${
                    isVisible ? "animate-scale-in" : "opacity-0"
                  } ${isActive ? "flex-[2.5] z-10" : "flex-1 opacity-70 hover:opacity-90"}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div
                    className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-navy/80 via-navy/20 to-blue/5"
                        : "bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20"
                    }`}
                  />

                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.label}
                    fill
                    className={`object-cover transition-all duration-700 ${isActive ? "scale-100" : "scale-110 grayscale-[30%]"}`}
                  />

                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 z-20 transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-100"
                    }`}
                  >
                    {isActive ? (
                      <div className="bg-green/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl transform transition-all duration-300 font-[family-name:var(--font-poppins)]">
                        <p className="font-bold text-navy text-xl tracking-tight">{card.course}</p>
                        <p className="text-navy/80 text-sm mt-1 font-medium tracking-wide">{card.topics} TOPICS</p>
                      </div>
                    ) : (
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg font-[family-name:var(--font-montserrat)]">
                        <p className="text-navy font-bold text-sm text-center tracking-wider uppercase">{card.label}</p>
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-green/15 to-transparent" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}