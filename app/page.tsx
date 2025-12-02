import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CoursesSection } from "@/components/courses-section"
import { SkillsSection } from "@/components/skills-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactForm } from "@/components/contact-form"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { FloatingLinesBackground } from "@/components/floating-lines-background"
import { FloatingContactButton } from "@/components/floating-contact-button"

export default function Home() {
  return (
    <main className="min-h-screen relative">
     
      <Header />
      <HeroSection />
      <CoursesSection />
      <SkillsSection />
      <AboutSection />
      <TestimonialsSection />
      <ClientsSection />
      <ContactForm />
      <NewsletterSection />
      <Footer />

      <FloatingContactButton />
    </main>
  )
}
