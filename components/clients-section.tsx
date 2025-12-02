"use client"

import { useEffect, useRef } from "react"

const clients = [
  { name: "TechCorp", logo: "TC" },
  { name: "Digital First", logo: "DF" },
  { name: "InnovateTech", logo: "IT" },
  { name: "StartUp Hub", logo: "SH" },
  { name: "CodeMaster", logo: "CM" },
  { name: "WebFlow Pro", logo: "WP" },
  { name: "DataDriven", logo: "DD" },
  { name: "CloudNine", logo: "CN" },
  { name: "AI Solutions", logo: "AI" },
  { name: "Growth Labs", logo: "GL" },
  { name: "Digital Edge", logo: "DE" },
  { name: "FutureTech", logo: "FT" },
]

export function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPos = 0

    const animate = () => {
      scrollPos += 0.5

      // Reset scroll position for seamless loop
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
      }

      scrollContainer.style.transform = `translateX(-${scrollPos}px)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <section className="py-20 px-6 bg-cream/50 overflow-hidden relative z-10">
      <div className="container mx-auto max-w-6xl mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-navy">
          Trusted By Leading Companies<span className="text-green">.</span>
        </h2>
        <p className="text-center text-muted-foreground mt-4">
          Our students work at some of the best companies worldwide
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream/50 to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div ref={scrollRef} className="flex gap-8 items-center" style={{ width: "max-content" }}>
            {/* Duplicate clients for seamless loop */}
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-card rounded-2xl shadow-sm border border-border/30 flex items-center justify-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-blue flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {client.logo}
                </div>
                <span className="text-navy font-semibold text-sm">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
