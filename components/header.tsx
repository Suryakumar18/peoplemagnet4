"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Database, BarChart3, BookOpen, Code, Palette, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

const servicesData = [
  {
    category: "Data Science & AI",
    icon: Database,
    courses: [
      { name: "Machine Learning Fundamentals", duration: "3 months", level: "Beginner" },
      { name: "Deep Learning & Neural Networks", duration: "6 months", level: "Advanced" },
      { name: "Data Analytics with Python", duration: "2 months", level: "Beginner" },
      { name: "AI for Business Applications", duration: "3 months", level: "Intermediate" },
      { name: "Natural Language Processing", duration: "4 months", level: "Advanced" },
      { name: "Computer Vision", duration: "4 months", level: "Advanced" },
      { name: "Big Data Analytics", duration: "3 months", level: "Intermediate" },
      { name: "Statistical Modeling", duration: "3 months", level: "Intermediate" }
    ]
  },
  {
    category: "Marketing and Sales",
    icon: BarChart3,
    courses: [
      { name: "Advance Digital Marketing - Agency Track", duration: "6 months", level: "Advanced" },
      { name: "Advance Digital Marketing - Business Growth Track", duration: "6 months", level: "Intermediate" },
      { name: "Business Mastery and Success Program", duration: "6 months", level: "All Levels" },
      { name: "Social Media Marketing", duration: "6 months", level: "Beginner" },
      { name: "SEO & Content Strategy", duration: "6 months", level: "Intermediate" },
      { name: "Email Marketing Automation", duration: "6 months", level: "Beginner" },
      { name: "Marketing Analytics", duration: "6 months", level: "Intermediate" },
      { name: "Sales Funnel Optimization", duration: "6 months", level: "Intermediate" }
    ]
  },
  {
    category: "Teaching & Education",
    icon: BookOpen,
    courses: [
      { name: "Montessori Teacher Training - Professional Diploma", duration: "10 months", level: "Professional" },
      { name: "Video Editing & Post-Production Essential", duration: "6 months", level: "Beginner" },
      { name: "AI Powered Advance Video Editing Program", duration: "6 months", level: "Advanced" },
      { name: "Classroom Management", duration: "6 months", level: "Beginner" },
      { name: "Curriculum Development", duration: "6 months", level: "Intermediate" },
      { name: "Educational Technology", duration: "6 months", level: "Intermediate" },
      { name: "Special Education", duration: "6 months", level: "Intermediate" },
      { name: "Online Teaching Strategies", duration: "6 months", level: "Beginner" }
    ]
  },
  {
    category: "Coding & Development",
    icon: Code,
    courses: [
      { name: "MERN Stack Development - Foundation Level", duration: "4 months", level: "Beginner" },
      { name: "MERN Stack Development - Advance Level", duration: "8 months", level: "Advanced" },
      { name: "Full Stack Java Development", duration: "8 months", level: "Intermediate" },
      { name: "Full Stack Python Development", duration: "8 months", level: "Intermediate" },
      { name: "Mobile App Development", duration: "8 months", level: "Intermediate" },
      { name: "Cloud Computing & DevOps", duration: "8 months", level: "Advanced" },
      { name: "Cybersecurity Fundamentals", duration: "8 months", level: "Beginner" },
      { name: "Blockchain Development", duration: "8 months", level: "Advanced" }
    ]
  },
  {
    category: "Designing and Creative",
    icon: Palette,
    courses: [
      { name: "Advanced UI/UX Design Program", duration: "8 months", level: "Advanced" },
      { name: "Pro UI/UX Design & Product Experience Program", duration: "8 months", level: "Professional" },
      { name: "Graphic Design Mastery", duration: "8 months", level: "Intermediate" },
      { name: "Motion Graphics & Animation", duration: "8 months", level: "Intermediate" },
      { name: "3D Modeling & Rendering", duration: "8 months", level: "Advanced" },
      { name: "Brand Identity Design", duration: "8 months", level: "Intermediate" },
      { name: "Web Design Fundamentals", duration: "8 months", level: "Beginner" },
      { name: "Digital Illustration", duration: "8 months", level: "Intermediate" }
    ]
  },
  {
    category: "Language Learning",
    icon: Languages,
    courses: [
      { name: "Spoken English", duration: "3 months", level: "Beginner" },
      { name: "Business Communication", duration: "2 months", level: "Intermediate" },
      { name: "Spanish Language Course", duration: "4 months", level: "Beginner" },
      { name: "French for Beginners", duration: "4 months", level: "Beginner" },
      { name: "German Language Program", duration: "5 months", level: "Intermediate" },
      { name: "Japanese & Korean", duration: "6 months", level: "Advanced" },
      { name: "IELTS/TOEFL Preparation", duration: "3 months", level: "All Levels" },
      { name: "Public Speaking Skills", duration: "2 months", level: "Beginner" }
    ]
  }
]

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "Students", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

type IconComponent = React.ComponentType<{ className?: string }>

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index)
  }

  const handleCourseClick = (courseName: string) => {
    // Navigate to courses section with the selected course
    const element = document.querySelector("#courses")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsServicesOpen(false)
    setIsMenuOpen(false)
  }

  const renderIcon = (IconComponent: IconComponent, className: string = "w-5 h-5 text-green") => {
    return <IconComponent className={className} />
  }

  return (
    <header 
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-cream/95 backdrop-blur-lg shadow-lg border-b border-border/60 py-2" 
          : "bg-cream/90 backdrop-blur-sm border-b border-border/40 py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 flex-shrink-0"
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
              scrolled ? "h-8 w-auto sm:h-9" : "h-9 w-auto sm:h-10 md:h-11"
            }`}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                smoothScroll(link.href)
              }}
              className="relative text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-sm xl:text-[14px] group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-sm xl:text-[14px] group">
              Courses
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Mega Dropdown - Split Layout */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                isServicesOpen 
                  ? "opacity-100 visible translate-y-0 scale-100" 
                  : "opacity-0 invisible -translate-y-4 scale-95"
              }`}
            >
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-0 w-[90vw] max-w-[900px] transform transition-all duration-300 overflow-hidden">
                <div className="flex min-h-[400px]">
                  {/* Left Side - Categories */}
                  <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4">
                    <h3 className="text-base md:text-lg font-semibold text-navy mb-4 font-archia">Browse All Courses</h3>
                    <div className="space-y-1">
                      {servicesData.map((service, index) => (
                        <button
                          key={service.category}
                          onClick={() => handleCategoryClick(index)}
                          onMouseEnter={() => handleCategoryClick(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 font-archia group ${
                            activeCategory === index 
                              ? "bg-white shadow-sm border border-green/20 text-green" 
                              : "hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-colors duration-200 ${
                            activeCategory === index ? "bg-green/20" : "bg-gray-100 group-hover:bg-green/10"
                          }`}>
                            {renderIcon(service.icon, activeCategory === index ? "w-5 h-5 text-green" : "w-5 h-5 text-gray-600")}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-navy text-sm">
                              {service.category}
                            </p>
                            <p className="text-xs text-gray-600">
                              {service.courses.length} courses
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Courses */}
                  <div className="w-2/3 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green/10 rounded-lg">
                        {activeCategory !== null && renderIcon(servicesData[activeCategory].icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy font-archia">
                          {activeCategory !== null ? servicesData[activeCategory].category : "Select a Category"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {activeCategory !== null ? `${servicesData[activeCategory].courses.length} courses available` : "Choose a category to view courses"}
                        </p>
                      </div>
                    </div>

                    {activeCategory !== null && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {servicesData[activeCategory].courses.map((course, index) => (
                          <button
                            key={course.name}
                            onClick={() => handleCourseClick(course.name)}
                            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green hover:shadow-sm transition-all duration-200 group cursor-pointer hover:bg-green/5"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-navy text-sm group-hover:text-green transition-colors duration-200">
                                {course.name}
                              </h4>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium whitespace-nowrap">
                                {course.level}
                              </span>
                            </div>
                            <div className="flex items-center mt-3">
                              <span className="text-xs text-gray-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {course.duration}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/hire-and-train"
            className="relative text-navy/80 hover:text-navy transition-all duration-300 font-archia font-medium text-sm xl:text-[14px] group"
          >
            Hire & Train
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          <Button 
            variant="ghost" 
            className="text-navy hover:bg-navy/5 transition-all duration-300 hover:scale-105 font-archia text-sm xl:text-[14px] px-4"
            size="sm"
          >
            Login
          </Button>
          <Button 
            className="bg-green text-navy hover:bg-green/90 rounded-full px-5 xl:px-6 font-archia font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm xl:text-[14px]"
            size="sm"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 transition-all duration-300 hover:bg-navy/5 rounded-lg flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-navy transition-transform duration-300" />
          ) : (
            <Menu size={24} className="text-navy transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Keep existing mobile functionality */}
      <div className={`lg:hidden bg-cream border-t border-border transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="flex flex-col gap-3 overflow-y-auto max-h-[calc(90vh-80px)] pr-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  smoothScroll(link.href)
                }}
                className="text-navy/80 hover:text-navy py-2 font-archia font-medium text-sm sm:text-base transition-all duration-300 transform hover:translate-x-2 border-b border-border/30 last:border-b-0"
                style={{
                  animation: isMenuOpen ? `slideInLeft 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Services Section */}
            <div className="pt-4 border-t border-border">
              <div className="mb-4">
                <p className="font-archia font-semibold text-navy text-base sm:text-lg mb-3">Our Courses</p>
                
                {activeCategory === null ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {servicesData.map((service, index) => (
                      <button
                        key={service.category}
                        onClick={() => setActiveCategory(index)}
                        className="bg-white rounded-lg p-3 border border-gray-200 hover:border-green transition-all duration-300 flex items-start gap-3"
                        style={{
                          animation: isMenuOpen ? `fadeInUp 0.4s ease-out ${0.5 + (index * 0.05)}s both` : 'none'
                        }}
                      >
                        <div className="p-2 bg-green/10 rounded-lg">
                          {renderIcon(service.icon)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-archia font-semibold text-navy text-left">
                            {service.category}
                          </p>
                          <p className="text-xs text-gray-600 text-left mt-1">
                            {service.courses.length} courses
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="flex items-center gap-2 text-gray-600 hover:text-navy transition-colors duration-200 mb-4 font-archia text-sm"
                    >
                      ← Back to Categories
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green/10 rounded-lg">
                        {renderIcon(servicesData[activeCategory].icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy font-archia">
                          {servicesData[activeCategory].category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {servicesData[activeCategory].courses.length} courses
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {servicesData[activeCategory].courses.map((course, index) => (
                        <button
                          key={course.name}
                          onClick={() => handleCourseClick(course.name)}
                          className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-green transition-all duration-200"
                          style={{
                            animation: isMenuOpen ? `fadeInUp 0.4s ease-out ${index * 0.05}s both` : 'none'
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-navy text-sm">
                              {course.name}
                            </h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {course.level}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {course.duration}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/hire-and-train"
              className="text-navy/80 hover:text-navy py-2 font-archia font-medium text-sm sm:text-base border-t border-border pt-4 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: isMenuOpen ? `slideInLeft 0.3s ease-out 0.8s both` : 'none'
              }}
            >
              Hire & Train
            </Link>

            <div 
              className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border"
              style={{
                animation: isMenuOpen ? `fadeInUp 0.4s ease-out 0.9s both` : 'none'
              }}
            >
              <Button 
                variant="ghost" 
                className="justify-center transition-all duration-300 hover:scale-105 font-archia text-sm sm:text-base"
                size="sm"
              >
                Login
              </Button>
              <Button 
                className="bg-green text-navy transition-all duration-300 hover:scale-105 hover:shadow-lg font-archia text-sm sm:text-base"
                size="sm"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>

        <style jsx>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </header>
  )
}
