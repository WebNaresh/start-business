"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Phone, Mail, X, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Top info bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-2 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 text-sm">
          <div className="flex flex-wrap items-center space-x-4">
            <a
              href="mailto:sales@biztreeaccounting.com"
              className="flex items-center hover:text-blue-100 transition-colors"
            >
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              <span className="hidden sm:inline">sales@biztreeaccounting.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <a
              href="https://wa.me/919699214195"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-100 transition-colors"
            >
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              <span>+91 96992 14195</span>
            </a>
            <a
              href="https://goo.gl/maps/YourLocationLink"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center hover:text-blue-100 transition-colors"
            >
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              <span className="truncate max-w-[200px] lg:max-w-xs">Deccan Gymkhana, Pune</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2 overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                alt="StartBusiness"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                StartBusiness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href) ? "text-blue-600" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <WhatsAppCTAButton className="rounded-full px-5 shadow-sm hover:shadow transition-all">
              Chat With Us
            </WhatsAppCTAButton>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden border-none">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                      alt="StartBusiness"
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <span className="text-lg font-bold text-slate-900">StartBusiness</span>
                  </Link>
                  <SheetClose className="rounded-full p-1 hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>

                {/* Mobile navigation */}
                <div className="flex-1 overflow-auto py-4 px-2">
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Mobile contact & CTA */}
                <div className="border-t p-4 space-y-4">
                  <div className="flex flex-col space-y-3">
                    <a
                      href="https://wa.me/919699214195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="mr-2 h-4 w-4 text-blue-600" />
                      <span>+91 96992 14195</span>
                    </a>
                    <a
                      href="mailto:sales@biztreeaccounting.com"
                      className="flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="mr-2 h-4 w-4 text-blue-600" />
                      <span>sales@biztreeaccounting.com</span>
                    </a>
                  </div>
                  <WhatsAppCTAButton className="w-full rounded-md">Chat With Us Now</WhatsAppCTAButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
