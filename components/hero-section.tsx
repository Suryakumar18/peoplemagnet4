"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const heroCards = [
  {
    image: "/professional-marketing-executive-woman-laptop-digi.jpg",
    label: "Marketing and Sales Program",
    course: "Marketing and Sales Program",
  },
  {
    image: "/teacher-educator-professional-classroom-modern-tea.jpg",
    label: "Bridal Makeup Program",
    course: "Bridal Makeup Program",
  },
  {
    image: "/software-developer-coding-programmer-laptop-modern.jpg",
    label: "Teacher Training Program",
    course: "Teacher Training Program",
  },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null)

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  // Auto-rotate carousel for mobile
  const startAutoRotate = () => {
    if (autoRotateTimer.current) {
      clearInterval(autoRotateTimer.current)
    }
    
    autoRotateTimer.current = setInterval(() => {
      if (!isMobile || heroCards.length <= 1 || isTransitioning) return
      
      setIsTransitioning(true)
      setActiveCard((prev) => {
        const next = (prev + 1) % heroCards.length
        
        // Reset transitioning state after animation completes
        setTimeout(() => {
          setIsTransitioning(false)
        }, 500)
        
        return next
      })
    }, 5000) // 5 seconds
  }

  useEffect(() => {
    if (isMobile && heroCards.length > 1) {
      startAutoRotate()
    }
    
    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current)
      }
    }
  }, [isMobile])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (isTransitioning) return
    
    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      setIsTransitioning(true)
      if (diff > 0) {
        // Swipe left - next card
        setActiveCard((prev) => (prev + 1) % heroCards.length)
      } else {
        // Swipe right - previous card
        setActiveCard((prev) => (prev - 1 + heroCards.length) % heroCards.length)
      }
      
      // Reset auto-rotate timer on manual interaction
      if (isMobile) {
        startAutoRotate()
      }
      
      // Reset transitioning state after animation
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const changeCard = (direction: "next" | "prev" | number) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    if (typeof direction === "number") {
      setActiveCard(direction)
    } else if (direction === "next") {
      setActiveCard((prev) => (prev + 1) % heroCards.length)
    } else {
      setActiveCard((prev) => (prev - 1 + heroCards.length) % heroCards.length)
    }
    
    // Reset auto-rotate timer on manual interaction
    if (isMobile) {
      startAutoRotate()
    }
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-screen pt-24 pb-12 overflow-hidden z-10"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-20 xl:px-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          <div className={`space-y-8 pl-4 md:pl-10 lg:pl-12 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            {/* Main Headline with Montserrat */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-navy tracking-tight">
              <span className="block font-black">Skillup.</span>
              <span className="block text-blue font-black mt-2">Grow.</span>
              <span className="block font-black mt-2">Succeed.</span>
            </h1>

            {/* Subtitle with Inter */}
            <p className="font-body text-navy/70 text-lg md:text-xl max-w-lg leading-relaxed font-normal tracking-wide">
              Transform your career with industry-leading courses designed for real-world success. Learn from experts
              and build your future.
            </p>

            {/* Button with Poppins */}
        

{/* Button with Poppins */}
<Button
  size="lg"
  className="bg-green text-navy hover:bg-green/90 rounded-xl px-10 py-7 text-lg font-accent font-semibold group transition-all duration-300 hover:shadow-xl hover:shadow-green/30 hover:-translate-y-1 tracking-wide"
  onClick={() => {
    const coursesSection = document.querySelector("#courses")
    if (coursesSection) {
      coursesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }}
>
  Explore Courses
  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
</Button>
          </div>

          {/* Desktop View - Hover Cards */}
          <div className="hidden lg:flex gap-4 justify-center items-stretch h-[450px] md:h-[550px] lg:h-[600px]"
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
                    className={`absolute inset-0 z-10 transition-all duration-500 ${
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

                  {/* Text Container */}
                  <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div
                      className={`bg-white/95 backdrop-blur-sm rounded-2xl mx-4 mb-4 transition-all duration-500 font-accent ${
                        isActive 
                          ? "p-5 shadow-xl bg-green/95"  // Expanded state
                          : "p-3 shadow-lg"              // Collapsed state
                      }`}
                    >
                      <p className={`font-bold text-navy transition-all duration-300 ${
                        isActive 
                          ? "text-xl text-center md:text-left"  // Larger text for expanded
                          : "text-xs text-center leading-tight line-clamp-2"  // Smaller, centered text for collapsed
                      }`}>
                        {isActive ? card.course : card.label}
                      </p>
                    </div>
                  </div>

                  {/* Green gradient overlay for active card */}
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

          {/* Mobile View - Carousel */}
          <div className="lg:hidden relative">
            <div
              ref={carouselRef}
              className="relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {heroCards.map((card, index) => {
                const distance = Math.abs(index - activeCard)
                const isActive = index === activeCard
                
                return (
                  <div
                    key={card.label}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out rounded-3xl overflow-hidden shadow-2xl ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{
                      transform: `translateX(${(index - activeCard) * 100}%) scale(${isActive ? 1 : 0.95})`,
                      opacity: isActive ? 1 : 0.7,
                      zIndex: isActive ? 30 : 20 - distance,
                      filter: isActive ? "none" : "grayscale(30%)",
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy/80 via-navy/20 to-blue/5" />
                    
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.label}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority={isActive}
                    />
                    
                    {/* Mobile text container */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transition-all duration-500">
                      <div className={`bg-green/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl transform transition-all duration-300 font-accent ${
                        isActive ? "translate-y-0" : "translate-y-2"
                      }`}>
                        <p className="font-bold text-navy text-xl tracking-tight text-center">{card.course}</p>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-green/15 to-transparent" />
                    </div>
                  </div>
                )
              })}
              
              {/* Navigation Buttons */}
              {heroCards.length > 1 && (
                <>
                  <button
                    onClick={() => changeCard("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Previous card"
                    disabled={isTransitioning}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => changeCard("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Next card"
                    disabled={isTransitioning}
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
              
              {/* Indicators */}
              {heroCards.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                  {heroCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => changeCard(index)}
                      className={`transition-all duration-500 ease-out rounded-full ${
                        index === activeCard 
                          ? "bg-green w-8 h-2" 
                          : "bg-white/50 w-2 h-2 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      disabled={isTransitioning}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}