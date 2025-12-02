"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Clock, BookOpen, Play } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Briefcase,
    title: "Industry Ready Portfolio",
    description: "Gain a Robust, Market Ready Portfolio of Projects to Showcase Your Skills to Employers",
  },
  {
    icon: Clock,
    title: "Flexible Learning Path",
    description: "Study at Your Own Pace With On-Demand Access to all lessons and Materials",
  },
  {
    icon: BookOpen,
    title: "Up to Date Curriculum",
    description: "Courses are Continuously Updated to Reflect The Latest Tools and Trends in Digital Space",
  },
]

const stats = [
  { value: "5", label: "Years Experience" },
  { value: "15", label: "Types of Courses" },
]

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState(stats.map(() => 0))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          stats.forEach((stat, index) => {
            const target = Number.parseInt(stat.value)
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters((prev) => {
                const newCounters = [...prev]
                newCounters[index] = Math.floor(current)
                return newCounters
              })
            }, 30)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-cream">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div
                className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight ${
                  isVisible ? "animate-slide-up" : "opacity-0"
                }`}
              >
                <div className="mb-2">Learn In-Demand Skills,</div>
                <div>
                  Get{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue via-green to-blue bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      Job Ready
                    </span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-blue/20 via-green/20 to-blue/20 rounded-full"></span>
                  </span>{" "}
                  in Months
                  <span className="text-blue animate-pulse">.</span>
                </div>
              </div>

              <div
                className={`text-navy/70 italic font-light text-lg border-l-4 border-green pl-4 py-2 ${
                  isVisible ? "animate-fade-in animation-delay-200" : "opacity-0"
                }`}
              >
                Transform your career with cutting-edge skills
              </div>
            </div>

            <p
              className={`text-muted-foreground text-base md:text-lg leading-relaxed ${
                isVisible ? "animate-fade-in animation-delay-200" : "opacity-0"
              }`}
            >
              The modern labor market dictates its own terms. Today, to be a competitive specialist requires more than
              professional skills.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex gap-5 group p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg cursor-pointer ${
                    isVisible ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green/30 to-blue/20 flex items-center justify-center group-hover:from-green group-hover:to-green/80 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <feature.icon className="w-6 h-6 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-navy text-base md:text-lg group-hover:text-blue transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className={`${isVisible ? "animate-scale-in animation-delay-300" : "opacity-0"}`}>
            <div className="bg-gradient-to-br from-green via-green/90 to-green/80 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-green/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 flex justify-around items-center gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-navy mb-3 font-serif">
                      {counters[index]}
                      {stat.label.includes("Courses") && <span className="text-4xl align-super">+</span>}
                    </div>
                    <div className="text-navy/80 text-sm uppercase tracking-widest font-medium">
                      {stat.label.split(" ").map((word, i) => (
                        <div key={i} className={i === 0 ? "mb-1" : ""}>
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl overflow-hidden aspect-video relative group cursor-pointer shadow-xl">
              <Image
                src="/students-learning-online-education-classroom-moder.jpg"
                alt="Students Learning"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent group-hover:from-navy/50 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-green to-blue flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 group-hover:shadow-green/50">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 fill-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white font-semibold text-lg md:text-xl">Watch Success Stories</div>
                <div className="text-white/80 text-sm md:text-base">See how our students transformed their careers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}