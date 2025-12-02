"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Database, BarChart3, BookOpen, Code, Palette, Languages, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const servicesData = [
  {
    category: "Data Science & AI",
    icon: Database,
    courses: [
      "Machine Learning Fundamentals",
      "Deep Learning & Neural Networks",
      "Data Analytics with Python",
      "AI for Business Applications",
      "Natural Language Processing",
      "Computer Vision",
      "Big Data Analytics",
      "Statistical Modeling"
    ]
  },
  {
    category: "Marketing and Sales",
    icon: BarChart3,
    courses: [
      "Advance Digital Marketing - Agency Track",
      "Advance Digital Marketing - Business Growth Track",
      "Business Mastery and Success Program",
      "Social Media Marketing",
      "SEO & Content Strategy",
      "Email Marketing Automation",
      "Marketing Analytics",
      "Sales Funnel Optimization"
    ]
  },
  {
    category: "Teaching & Education",
    icon: BookOpen,
    courses: [
      "Montessori Teacher Training - Professional Diploma",
      "Video Editing & Post-Production Essential",
      "AI Powered Advance Video Editing Program",
      "Classroom Management",
      "Curriculum Development",
      "Educational Technology",
      "Special Education",
      "Online Teaching Strategies"
    ]
  },
  {
    category: "Coding & Development",
    icon: Code,
    courses: [
      "MERN Stack Development - Foundation Level",
      "MERN Stack Development - Advance Level",
      "Full Stack Java Development",
      "Full Stack Python Development",
      "Mobile App Development",
      "Cloud Computing & DevOps",
      "Cybersecurity Fundamentals",
      "Blockchain Development"
    ]
  },
  {
    category: "Designing and Creative",
    icon: Palette,
    courses: [
      "Advanced UI/UX Design Program", 
      "Pro UI/UX Design & Product Experience Program",
      "Graphic Design Mastery",
      "Motion Graphics & Animation",
      "3D Modeling & Rendering",
      "Brand Identity Design",
      "Web Design Fundamentals",
      "Digital Illustration"
    ]
  },
  {
    category: "Language Learning",
    icon: Languages,
    courses: [
      "Spoken English",
      "Business Communication",
      "Spanish Language Course",
      "French for Beginners",
      "German Language Program",
      "Japanese & Korean",
      "IELTS/TOEFL Preparation",
      "Public Speaking Skills"
    ]
  }
]

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "Students", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const smoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
    setIsMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('header')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-cream/95 backdrop-blur-lg shadow-lg border-b border-border/60 py-2" 
        : "bg-cream/90 backdrop-blur-sm border-b border-border/40 py-4"
    }`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <Image 
            src="/images/logo.png" 
            alt="Just Learn Digital" 
            width={200} 
            height={50} 
            className={`transition-all duration-300 ${
              scrolled ? "h-8 w-auto" : "h-10 w-auto"
            }`} 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                smoothScroll(link.href)
              }}
              className="relative text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-[14px] group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green/30 transition-all duration-500 group-hover:w-full group-hover:delay-100" />
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-[14px] group">
             Courses
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Mega dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                isServicesOpen 
                  ? "opacity-100 visible translate-y-0 scale-100" 
                  : "opacity-0 invisible -translate-y-4 scale-95"
              }`}
            >
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-[800px] transform transition-all duration-300">
                <div className="flex h-[400px]">
                  {/* Left Side - Categories */}
                  <div className="w-1/3 border-r border-gray-200 pr-6">
                    <h3 className="text-lg font-semibold text-navy mb-4 font-archia">Categories</h3>
                    <div className="space-y-1">
                      {servicesData.map((service, index) => (
                        <button
                          key={service.category}
                          onMouseEnter={() => setActiveCategory(index)}
                          onClick={() => setActiveCategory(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 font-archia ${
                            activeCategory === index 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          <service.icon className={`w-4 h-4 transition-colors duration-200 ${
                            activeCategory === index ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium text-sm font-archia">
                            {service.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Courses List */}
                  <div className="w-2/3 pl-6">
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-semibold text-navy mb-4 font-archia">
                        {servicesData[activeCategory]?.category}
                      </h3>
                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-2">
                          {servicesData[activeCategory]?.courses.map((course, index) => (
                            <div 
                              key={course}
                              className="text-sm text-gray-600 p-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-archia"
                            >
                              {course}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/hire-and-train"
            className="relative text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-[14px] group"
          >
            Hire & Train
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-navy hover:bg-navy/5 transition-all duration-300 hover:scale-105 font-archia text-[14px]"
          >
            Login
          </Button>
          <Button 
            className="bg-green text-navy hover:bg-green/90 rounded-full px-6 font-archia font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-[14px]"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 transition-all duration-300 hover:bg-navy/5 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-navy transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={24} className="text-navy transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-cream border-t border-border transition-all duration-500 overflow-hidden ${
        isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                smoothScroll(link.href)
              }}
              className="text-navy/80 hover:text-navy py-2 font-archia font-medium text-[14px] transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
              style={{
                transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Services accordion */}
          <div 
            className="border-t border-border pt-4 transition-all duration-500"
            style={{
              transitionDelay: isMenuOpen ? "400ms" : "0ms",
              transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            <p className="font-archia font-semibold text-navy mb-3 text-lg">Our Services</p>
            
            {/* Services in Mobile */}
            {servicesData.map((service, index) => (
              <div 
                key={service.category} 
                className="mb-4 transition-all duration-500"
                style={{
                  transitionDelay: isMenuOpen ? `${500 + (index * 100)}ms` : "0ms",
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMenuOpen ? 1 : 0
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <service.icon className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-archia font-medium text-navy">{service.category}</p>
                </div>
                <ul className="pl-4 space-y-1">
                  {service.courses.slice(0, 4).map((course, courseIndex) => (
                    <li key={course}>
                      <div className="text-sm text-muted-foreground font-archia">
                        {course}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/hire-and-train"
            className="text-navy/80 hover:text-navy py-2 font-archia font-medium text-[14px] border-t border-border pt-4 transition-all duration-500 transform hover:translate-x-2"
            style={{
              transitionDelay: isMenuOpen ? "900ms" : "0ms",
              transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
              opacity: isMenuOpen ? 1 : 0
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Hire & Train
          </Link>

          <div 
            className="flex flex-col gap-2 pt-4 border-t border-border transition-all duration-500"
            style={{
              transitionDelay: isMenuOpen ? "1000ms" : "0ms",
              transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            <Button 
              variant="ghost" 
              className="justify-start transition-all duration-300 hover:scale-105 font-archia text-[14px]"
            >
              Login
            </Button>
            <Button 
              className="bg-green text-navy transition-all duration-300 hover:scale-105 hover:shadow-lg font-archia text-[14px]"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}