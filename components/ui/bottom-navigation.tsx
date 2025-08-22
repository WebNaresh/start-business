"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building2,
  Calculator,
  MessageCircle,
  Menu,
  Phone,
  Mail,
  FileText,
  Info,
  HelpCircle,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/components/ui/use-mobile"

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  activePatterns: string[]
}

interface MoreMenuItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    activePatterns: ["/"]
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    icon: Building2,
    badge: "50+",
    activePatterns: ["/services"]
  },
  {
    id: "calculators",
    label: "Tools",
    href: "/business-calculators",
    icon: Calculator,
    badge: "New",
    activePatterns: ["/business-calculators", "/ppf-calculator-online", "/gst-calculator-online", "/income-tax-calculator-online", "/emi-calculator-online"]
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
    activePatterns: ["/contact"]
  },
  {
    id: "more",
    label: "More",
    href: "#",
    icon: Menu,
    activePatterns: ["/about-us", "/blog", "/faq", "/resources-guides"]
  }
]

const moreMenuItems: MoreMenuItem[] = [
  {
    id: "about",
    label: "About Us",
    href: "/about-us",
    icon: Info,
    description: "Learn about our company"
  },
  {
    id: "blog",
    label: "Blog & Guides",
    href: "/blog",
    icon: FileText,
    description: "Latest business insights & guides"
  },
  {
    id: "faq",
    label: "Help & FAQ",
    href: "/faq",
    icon: HelpCircle,
    description: "Get answers to common questions"
  },
  {
    id: "call",
    label: "Call Expert",
    href: "tel:+919699214195",
    icon: Phone,
    description: "Speak with our business experts"
  },
  {
    id: "email",
    label: "Email Support",
    href: "mailto:start@startbusiness.co.in",
    icon: Mail,
    description: "Get help via email"
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Smart auto-hide on scroll with improved performance
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Only hide if scrolling down fast and far
          if (currentScrollY > lastScrollY && currentScrollY > 200 && (currentScrollY - lastScrollY) > 15) {
            setIsVisible(false) // Hide when scrolling down fast
          } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsVisible(true) // Show when scrolling up or near top
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Memoized active state check for better performance
  const isActive = useCallback((item: NavigationItem) => {
    if (item.id === "more") {
      return item.activePatterns.some(pattern => pathname.startsWith(pattern))
    }
    return item.activePatterns.some(pattern => {
      if (pattern === "/") {
        return pathname === "/"
      }
      return pathname.startsWith(pattern)
    })
  }, [pathname])

  // Memoized more menu click handler
  const handleMoreClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    // Haptic feedback simulation for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }

    setShowMoreMenu(prev => !prev)
  }, [])

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMoreMenu(false)
    }

    if (showMoreMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showMoreMenu])

  // Memoize the navigation items rendering
  const navigationItemsJSX = useMemo(() => navigationItems.map((item) => {
    const active = isActive(item)
    const isMoreItem = item.id === "more"

    return (
      <div key={item.id} className="relative">
        {isMoreItem ? (
          <button
            onClick={handleMoreClick}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full transition-all duration-300 relative group bottom-nav-item",
              "hover:bg-gradient-to-t hover:from-blue-50 hover:to-transparent active:scale-95 rounded-xl mx-1 px-2 py-1",
              active || showMoreMenu
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            )}
            aria-label={`${item.label} menu`}
            aria-expanded={showMoreMenu}
          >
            {/* Enhanced Background highlight for active/open state */}
            {(active || showMoreMenu) && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/80 to-blue-50/40 rounded-xl transition-all duration-300 shadow-sm" />
            )}

            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/0 to-slate-50/0 group-hover:from-slate-100/50 group-hover:to-slate-50/20 rounded-xl transition-all duration-300" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className={`relative transition-all duration-300 flex items-center justify-center ${
                  active || showMoreMenu ? 'scale-110 transform' : 'scale-100 group-hover:scale-105'
                } ${showMoreMenu ? 'rotate-180' : 'rotate-0'}`}
              >
                <item.icon className={`h-5 w-5 mb-1 transition-all duration-300 ${active || showMoreMenu ? 'drop-shadow-sm' : ''}`} />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 px-1.5 text-xs bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md animate-pulse">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium text-center transition-all duration-300 ${
                active || showMoreMenu ? 'font-semibold' : 'group-hover:font-medium'
              }`}>
                {item.label}
              </span>
            </div>

            {/* Enhanced Active indicator */}
            {(active || showMoreMenu) && (
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full bottom-nav-indicator shadow-sm" />
            )}

            {/* Subtle bottom glow for active state */}
            {(active || showMoreMenu) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full transition-all duration-300 relative group bottom-nav-item",
              "hover:bg-gradient-to-t hover:from-blue-50 hover:to-transparent active:scale-95 rounded-xl mx-1 px-2 py-1",
              active
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            )}
            aria-label={`Navigate to ${item.label}`}
            aria-current={active ? 'page' : undefined}
          >
            {/* Enhanced Background highlight for active state */}
            {active && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/80 to-blue-50/40 rounded-xl transition-all duration-300 shadow-sm" />
            )}

            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/0 to-slate-50/0 group-hover:from-slate-100/50 group-hover:to-slate-50/20 rounded-xl transition-all duration-300" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className={`relative transition-all duration-300 flex items-center justify-center ${
                  active ? 'scale-110 transform' : 'scale-100 group-hover:scale-105'
                }`}
              >
                <item.icon className={`h-5 w-5 mb-1 transition-all duration-300 ${active ? 'drop-shadow-sm' : ''}`} />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 px-1.5 text-xs bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md animate-pulse">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium text-center transition-all duration-300 ${
                active ? 'font-semibold' : 'group-hover:font-medium'
              }`}>
                {item.label}
              </span>
            </div>

            {/* Enhanced Active indicator */}
            {active && (
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full bottom-nav-indicator shadow-sm" />
            )}

            {/* Subtle bottom glow for active state */}
            {active && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
            )}
          </Link>
        )}
      </div>
    )
  }), [isActive, showMoreMenu, handleMoreClick])

  // Don't render on desktop, admin pages, or when isMobile is undefined (SSR)
  if (isMobile === undefined || !isMobile || pathname.startsWith("/admin")) {
    return null
  }

  return (
    <>
      <style jsx>{`
        .bottom-nav-item {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
        }
        .bottom-nav-item > div {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>
      {/* Enhanced More Menu Overlay */}
      {showMoreMenu && (
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-all duration-300 ${
            showMoreMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out max-h-[80vh] overflow-hidden ${
              showMoreMenu ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              paddingBottom: 'env(safe-area-inset-bottom, 0px)'
            }}
          >
              {/* Enhanced Menu Header */}
              <div className="relative">
                {/* Drag indicator */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between px-6 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Quick Access</h3>
                    <p className="text-sm text-slate-500">Explore more options</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMoreMenu(false)}
                    className="h-10 w-10 rounded-full hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Gradient border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              </div>

              {/* Enhanced Menu Items */}
              <div className="px-6 py-4 space-y-3 max-h-[50vh] overflow-y-auto">
                {moreMenuItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowMoreMenu(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 group border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md"
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      index === 0 ? 'bg-blue-100 text-blue-600' :
                      index === 1 ? 'bg-green-100 text-green-600' :
                      index === 2 ? 'bg-purple-100 text-purple-600' :
                      index === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{item.label}</div>
                      {item.description && (
                        <div className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors mt-1 leading-relaxed">{item.description}</div>
                      )}
                    </div>
                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+919168499520"
                    className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                  <a
                    href="mailto:info@startbusiness.com"
                    className="flex items-center justify-center gap-2 p-3 bg-slate-600 text-white rounded-xl font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Enhanced Bottom Navigation Bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-2xl transform transition-all duration-300 ease-out bottom-nav-fallback ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0.95))'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Enhanced Navigation Container */}
        <div className="relative">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

          <div className="grid grid-cols-5 h-16 relative items-center justify-items-center px-2">
            {navigationItemsJSX}
          </div>
        </div>
      </nav>

      {/* Bottom padding to prevent content from being hidden behind the nav */}
      <div className="h-16" />
    </>
  )
}
