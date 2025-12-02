import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  courses: [
    { name: "Marketing and Sales", href: "#" },
    { name: "Teaching", href: "#" },
    { name: "Coding", href: "#" },
    { name: "Designing and Creative", href: "#" },
    { name: "Language Learning", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Just Learn Digital"
              width={180}
              height={45}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering learners with in-demand digital skills to succeed in the modern workforce.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Just Learn Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
