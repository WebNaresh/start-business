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

    activePatterns: ["/services"]
  },
  {
    id: "calculators",
    label: "Calculators",
    href: "/business-calculators",
    icon: Calculator,
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
    label: "Blog",
    href: "/blog",
    icon: FileText,
    description: "Latest business insights"
  },
  {
    id: "faq",
    label: "FAQ",
    href: "/faq",
    icon: HelpCircle,
    description: "Frequently asked questions"
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources-guides",
    icon: FileText,
    description: "Guides and resources"
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
              "flex flex-col items-center justify-center h-full w-full transition-all duration-200 relative group bottom-nav-item",
              "hover:bg-slate-50 active:bg-slate-100 rounded-lg mx-0.5 px-1",
              active
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-500"
            )}
            aria-label={`${item.label} menu`}
            aria-expanded={showMoreMenu}
          >
            {/* Background highlight for active state */}
            {active && (
              <div className="absolute inset-0 bg-blue-50 rounded-lg transition-all duration-200" />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className={`relative transition-transform duration-200 flex items-center justify-center ${
                  active ? 'scale-110' : 'scale-100'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 px-1 text-xs bg-red-500 text-white">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </div>

            {/* Active indicator */}
            {active && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full bottom-nav-indicator" />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full transition-all duration-200 relative group bottom-nav-item",
              "hover:bg-slate-50 active:bg-slate-100 rounded-lg mx-0.5 px-1",
              active
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-500"
            )}
            aria-label={`Navigate to ${item.label}`}
            aria-current={active ? 'page' : undefined}
          >
            {/* Background highlight for active state */}
            {active && (
              <div className="absolute inset-0 bg-blue-50 rounded-lg transition-all duration-200" />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className={`relative transition-transform duration-200 flex items-center justify-center ${
                  active ? 'scale-110' : 'scale-100'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 px-1 text-xs bg-red-500 text-white">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </div>

            {/* Active indicator */}
            {active && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full bottom-nav-indicator" />
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
      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
            showMoreMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out ${
              showMoreMenu ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
              {/* More Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">More Options</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMoreMenu(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* More Menu Items */}
              <div className="p-4 space-y-2">
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowMoreMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{item.label}</div>
                      {item.description && (
                        <div className="text-sm text-slate-500">{item.description}</div>
                      )}
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

      {/* Bottom Navigation Bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-lg transform transition-all duration-300 ease-out bottom-nav-fallback ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-5 h-16 relative items-center justify-items-center">
          {navigationItemsJSX}
        </div>
      </nav>

      {/* Bottom padding to prevent content from being hidden behind the nav */}
      <div className="h-16" />
    </>
  )
}
