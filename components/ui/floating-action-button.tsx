"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Plus,
  X,
  Search,
  Phone,
  MessageCircle,
  Filter,
  ArrowUp,
  Sparkles,
} from "lucide-react";

interface FloatingAction {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color?: string;
  href?: string;
}

interface FloatingActionButtonProps {
  actions?: FloatingAction[];
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  showScrollToTop?: boolean;
}

const defaultActions: FloatingAction[] = [
  {
    icon: Search,
    label: "Quick Search",
    onClick: () => {
      const searchInput = document.querySelector(
        'input[placeholder*="Search"]'
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: Filter,
    label: "Popular Services",
    onClick: () => {
      const popularButton = document.querySelector(
        'button[data-category="popular"]'
      ) as HTMLButtonElement;
      if (popularButton) {
        popularButton.click();
      } else {
        // Fallback: scroll to services section
        const servicesSection = document.querySelector(
          '[data-section="services"]'
        );
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    color: "bg-amber-600 hover:bg-amber-700",
  },
  {
    icon: Phone,
    label: "Call Now",
    onClick: () => window.open("tel:+919876543210", "_self"),
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    onClick: () =>
      window.open(
        "https://wa.me/919876543210?text=Hi, I need help with business services",
        "_blank"
      ),
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
];

export default function FloatingActionButton({
  actions = defaultActions,
  className,
  position = "bottom-right",
  showScrollToTop = true,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    if (showScrollToTop) {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showScrollToTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="mb-4"
          >
            <Button
              onClick={scrollToTop}
              size="sm"
              className="w-12 h-12 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              title="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    scale: 0.8,
                    transition: { delay: (actions.length - index - 1) * 0.05 },
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-slate-700 whitespace-nowrap">
                    {action.label}
                  </div>
                  <Button
                    onClick={action.onClick}
                    size="sm"
                    className={cn(
                      "w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300",
                      action.color || "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
            isOpen && "rotate-45"
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
