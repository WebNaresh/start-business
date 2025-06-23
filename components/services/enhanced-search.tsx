"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Filter,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSuggestion {
  id: string
  text: string
  type: "service" | "category" | "keyword"
  href?: string
  popular?: boolean
}

interface EnhancedSearchProps {
  onSearch: (query: string) => void
  onFilter?: (filters: string[]) => void
  placeholder?: string
  className?: string
}

export default function EnhancedSearch({
  onSearch,
  onFilter,
  placeholder = "Search services (e.g., company registration, GST filing...)",
  className = ""
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Popular searches and suggestions
  const popularSearches = [
    "Private Limited Company",
    "GST Registration", 
    "Trademark Registration",
    "LLP Registration",
    "One Person Company",
    "ROC Compliance",
    "Income Tax Filing",
    "MSME Registration"
  ]

  const searchSuggestions: SearchSuggestion[] = [
    { id: "1", text: "Private Limited Company Registration", type: "service", href: "/services/private-limited-company", popular: true },
    { id: "2", text: "GST Registration", type: "service", href: "/services/gst-registration", popular: true },
    { id: "3", text: "Trademark Registration", type: "service", href: "/services/trademark-registration" },
    { id: "4", text: "LLP Registration", type: "service", href: "/services/llp" },
    { id: "5", text: "One Person Company", type: "service", href: "/services/opc" },
    { id: "6", text: "Business Setup", type: "category" },
    { id: "7", text: "Tax Compliance", type: "category" },
    { id: "8", text: "Legal Services", type: "category" },
    { id: "9", text: "company registration", type: "keyword" },
    { id: "10", text: "gst filing", type: "keyword" },
    { id: "11", text: "trademark protection", type: "keyword" },
    { id: "12", text: "business license", type: "keyword" }
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse recent searches")
      }
    }
  }, [])

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    const totalItems = suggestions.length + (query.length === 0 ? popularSearches.length : 0)

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : -1))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : totalItems - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          if (query.length === 0 && selectedIndex < popularSearches.length) {
            handleSearch(popularSearches[selectedIndex])
          } else if (suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex])
          }
        } else if (query) {
          handleSearch(query)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))

    // Perform search
    onSearch(searchQuery)
    setQuery(searchQuery)
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.href) {
      window.location.href = suggestion.href
    } else {
      handleSearch(suggestion.text)
    }
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
    inputRef.current?.focus()
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "service": return <Sparkles className="w-4 h-4 text-blue-500" />
      case "category": return <Filter className="w-4 h-4 text-purple-500" />
      case "keyword": return <Search className="w-4 h-4 text-slate-400" />
      default: return <Search className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12 py-3 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {/* No query - show popular searches and recent */}
          {query.length === 0 && (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Recent Searches</span>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3",
                          selectedIndex === index && "bg-blue-50"
                        )}
                      >
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Popular Searches</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className={cn(
                        "text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm",
                        selectedIndex === recentSearches.length + index && "bg-blue-50"
                      )}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Query suggestions */}
          {query.length > 0 && suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-slate-500 px-3 py-2">
                Suggestions for "{query}"
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between group",
                    selectedIndex === index && "bg-blue-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-sm">{suggestion.text}</span>
                    {suggestion.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query.length > 0 && suggestions.length === 0 && (
            <div className="p-4 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No suggestions found for "{query}"</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSearch(query)}
                className="mt-2"
              >
                Search anyway
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
