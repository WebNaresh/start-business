"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface AccessibilityImprovementsProps {
  children: React.ReactNode
  className?: string
}

export default function AccessibilityImprovements({ 
  children, 
  className = "" 
}: AccessibilityImprovementsProps) {
  
  useEffect(() => {
    // Add focus-visible polyfill styles
    const style = document.createElement('style')
    style.textContent = `
      /* Enhanced focus indicators */
      .focus-visible:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
      }
      
      /* Remove default focus for mouse users */
      .focus-visible:focus:not(.focus-visible) {
        outline: none !important;
        box-shadow: none !important;
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .service-card {
          border-width: 2px !important;
        }
        
        .service-card:hover {
          border-width: 3px !important;
        }
        
        .text-slate-600 {
          color: #000000 !important;
        }
        
        .text-slate-400 {
          color: #333333 !important;
        }
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Screen reader only content */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      /* Skip link */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      /* Keyboard navigation indicators */
      .keyboard-nav button:focus,
      .keyboard-nav a:focus,
      .keyboard-nav input:focus,
      .keyboard-nav select:focus,
      .keyboard-nav textarea:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }
      
      /* Touch target improvements */
      @media (pointer: coarse) {
        button, 
        a, 
        input, 
        select, 
        textarea,
        [role="button"],
        [role="link"] {
          min-height: 44px !important;
          min-width: 44px !important;
        }
      }
    `
    document.head.appendChild(style)
    
    // Add keyboard navigation class to body
    document.body.classList.add('keyboard-nav')
    
    // Handle keyboard navigation detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav')
      }
    }
    
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-nav')
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className={cn("accessibility-wrapper", className)}>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Screen Reader Announcements */}
      <div 
        id="sr-announcements" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
      
      {/* Main Content */}
      <main id="main-content" role="main">
        {children}
      </main>
    </div>
  )
}

// Screen Reader Utility Component
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>
}

// Focus Trap Component for Modals
export function FocusTrap({ 
  children, 
  active = true 
}: { 
  children: React.ReactNode
  active?: boolean 
}) {
  useEffect(() => {
    if (!active) return
    
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
    
    document.addEventListener('keydown', handleTabKey)
    
    // Focus first element
    if (firstElement) {
      firstElement.focus()
    }
    
    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [active])
  
  return <>{children}</>
}

// Announce to Screen Readers
export function announceToScreenReader(message: string) {
  const announcer = document.getElementById('sr-announcements')
  if (announcer) {
    announcer.textContent = message
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = ''
    }, 1000)
  }
}

// ARIA Live Region Component
export function LiveRegion({ 
  children, 
  politeness = "polite" 
}: { 
  children: React.ReactNode
  politeness?: "polite" | "assertive" | "off"
}) {
  return (
    <div 
      aria-live={politeness} 
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  )
}
