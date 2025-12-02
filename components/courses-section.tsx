"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Sparkles, Clock, BookOpen, Award } from "lucide-react"
import { CourseModal } from "./course-modal"

const tabs = [
  { id: "all", name: "All Courses" },
  { id: "marketing", name: "Marketing & Sales" },
  { id: "teaching", name: "Teaching" },
  { id: "coding", name: "Coding" },
  { id: "design", name: "Design & Creative" },
  { id: "language", name: "Language Learning" },
]

const courses = {
  marketing: [
    {
      title: "Advance Digital Marketing - Agency Track",
      duration: "3 months",
      image: "/digital-marketing-agency-social-media-analytics-da.jpg",
      category: "Marketing and Sales",
      level: "Advanced",
      format: "Live Sessions",
    },
    {
      title: "Advance Digital Marketing - Business Growth Track",
      duration: "3 months",
      image: "/business-growth-chart-analytics-marketing-strategy.jpg",
      category: "Marketing and Sales",
      level: "Advanced",
      format: "Hybrid",
    },
    {
      title: "Business Mastery and Success Program",
      duration: "4 months",
      image: "/business-leadership-success-corporate-meeting-prof.jpg",
      category: "Marketing and Sales",
      level: "Master",
      format: "Executive",
    },
  ],
  teaching: [
    {
      title: "Montessori Teacher Training - Professional Diploma",
      duration: "6 months",
      image: "/montessori-teacher-classroom-children-colorful-edu.jpg",
      category: "Teaching",
      level: "Professional",
      format: "Certification",
    },
    {
      title: "Video Editing & Post-Production Essential",
      duration: "2 months",
      image: "/video-editing-timeline-premiere-pro-creative-studi.jpg",
      category: "Teaching",
      level: "Beginner",
      format: "Workshop",
    },
    {
      title: "AI Powered Advance Video Editing Program",
      duration: "3 months",
      image: "/artificial-intelligence-ai-video-editing-futuristi.jpg",
      category: "Teaching",
      level: "Advanced",
      format: "Live Sessions",
    },
  ],
  coding: [
    {
      title: "MERN Stack Development - Foundation Level",
      duration: "4 months",
      image: "/mern-stack-mongodb-express-react-nodejs-code-progr.jpg",
      category: "Coding",
      level: "Foundation",
      format: "Bootcamp",
    },
    {
      title: "MERN Stack Development - Advance Level",
      duration: "3 months",
      image: "/advanced-web-development-programming-code-editor-b.jpg",
      category: "Coding",
      level: "Advanced",
      format: "Bootcamp",
    },
    {
      title: "Full Stack Java Development - Foundation Level",
      duration: "4 months",
      image: "/java-programming-development-code-coffee-cup-orang.jpg",
      category: "Coding",
      level: "Foundation",
      format: "Bootcamp",
    },
    {
      title: "Full Stack Java Development - Advance Level",
      duration: "3 months",
      image: "/java-spring-boot-enterprise-development-blue-profe.jpg",
      category: "Coding",
      level: "Advanced",
      format: "Bootcamp",
    },
    {
      title: "Full Stack Python Development - Foundation Level",
      duration: "4 months",
      image: "/python-programming-snake-blue-yellow-code-developm.jpg",
      category: "Coding",
      level: "Foundation",
      format: "Bootcamp",
    },
    {
      title: "Full Stack Python Development - Advance Level",
      duration: "3 months",
      image: "/python-django-framework-advanced-development-machi.jpg",
      category: "Coding",
      level: "Advanced",
      format: "Bootcamp",
    },
  ],
  design: [
    {
      title: "Advanced UI/UX Design Program",
      duration: "3 months",
      image: "/ui-ux-design-figma-prototype-wireframe-creative-bl.jpg",
      category: "Designing and Creative",
      level: "Advanced",
      format: "Masterclass",
    },
    {
      title: "Pro UI/UX Design & Product Experience Program",
      duration: "4 months",
      image: "/product-design-user-experience-mobile-app-design-i.jpg",
      category: "Designing and Creative",
      level: "Professional",
      format: "Masterclass",
    },
  ],
  language: [
    {
      title: "Spoken English",
      duration: "2 months",
      image: "/spoken-english-communication-language-learning-pro.jpg",
      category: "Language Learning",
      level: "All Levels",
      format: "Interactive",
    },
  ],
}

type CourseCategory = keyof typeof courses

interface Course {
  title: string
  duration: string
  image: string
  category?: string
  level?: string
  format?: string
}

export function CoursesSection() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const getDisplayedCourses = (): Course[] => {
    if (activeTab === "all") {
      return Object.values(courses).flat()
    }
    return courses[activeTab as CourseCategory] || []
  }

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  return (
    <>
      <section
        id="courses"
        ref={sectionRef}
        className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-cream overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue/5 to-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-navy/5 to-blue/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 bg-green/20 text-navy px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-navy/10">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider uppercase">
                Explore Our Programs
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4 tracking-tight">
                Explore Our
                <span className="block mt-2">
                  All Type Of Courses
                  <span className="text-blue">.</span>
                </span>
              </h2>
            </div>
            
            <p className="text-navy/70 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Curated expertise, transformative learning journeys, and industry-relevant skills 
              designed to elevate your professional trajectory.
            </p>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-3 md:gap-4 mb-16 ${
              isVisible ? "animate-fade-in animation-delay-200" : "opacity-0"
            }`}
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-medium text-sm md:text-base transform hover:scale-105 relative overflow-hidden group ${
                  activeTab === tab.id
                    ? "bg-navy text-white shadow-lg shadow-navy/20"
                    : "text-navy/70 hover:text-navy bg-white hover:bg-green/10 border border-navy/10"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="relative z-10 tracking-wide">
                  {tab.name}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {getDisplayedCourses().map((course, index) => (
              <div
                key={`${course.title}-${index}`}
                onClick={() => handleCourseClick(course)}
                className={`group relative rounded-3xl overflow-hidden bg-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-navy/5 ${
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index % 8) * 0.08}s` }}
              >
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-cream to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-green/90 text-navy px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-sm">
                    {course.category}
                  </div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 text-navy px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 shadow-sm">
                    {course.level}
                  </div>
                  
                  {/* View Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-navy" />
                  </div>
                </div>

                <div className="relative p-5 bg-card group-hover:bg-green/5 transition-colors duration-300">
                  <div className="mb-4">
                    <h3 className="font-medium text-navy text-base leading-snug tracking-tight group-hover:text-blue transition-colors duration-300 line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-navy/60">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-normal">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span className="font-normal">{course.format}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-navy/10">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-navy/40 group-hover:text-green transition-colors duration-300" />
                      <span className="text-xs text-navy/50 font-medium tracking-wide group-hover:text-green transition-colors duration-300">
                        View Details
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-navy/40 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-green/20 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className={`text-center mt-16 ${isVisible ? "animate-fade-in animation-delay-1000" : "opacity-0"}`}>
            <p className="text-navy/60 text-base font-light tracking-wide mb-6 max-w-xl mx-auto leading-relaxed">
              Can't find what you're looking for? <span className="font-normal text-blue">Contact our advisors</span> for 
              personalized program recommendations.
            </p>
            <button className="px-6 py-3 bg-navy text-white rounded-full font-medium tracking-wide text-base hover:shadow-lg hover:shadow-navy/20 transition-all duration-300 hover:scale-105 transform">
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      <CourseModal course={selectedCourse} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}