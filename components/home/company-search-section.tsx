"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Search, Building2, Copy, CheckCircle, AlertCircle, Loader2, FileText, Sparkles, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface CompanySearchResult {
  value: string // CIN or LLPIN
  label: string // Company name
}

interface CompanyDetails {
  cin?: string
  llpin?: string
  companyName: string
  status?: string
  registrationDate?: string
  authorizedCapital?: string
  paidUpCapital?: string
  companyCategory?: string
  companySubCategory?: string
  classOfCompany?: string
  registeredAddress?: string
}

interface SearchState {
  query: string
  isLoading: boolean
  results: CompanySearchResult[]
  selectedCompany: CompanyDetails | null
  error: string | null
  showSuggestions: boolean
  searchHistory: string[]
  isTyping: boolean
}

export default function CompanySearchSection() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isLoading: false,
    results: [],
    selectedCompany: null,
    error: null,
    showSuggestions: false,
    searchHistory: [],
    isTyping: false
  })

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Memoized popular search suggestions
  const popularSearches = useMemo(() => [
    'Reliance Industries Limited',
    'Tata Consultancy Services',
    'Infosys Limited',
    'HDFC Bank Limited',
    'Bharti Airtel Limited'
  ], [])

  // Optimized debounced search function with abort controller
  const debouncedSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchState(prev => ({
        ...prev,
        results: [],
        showSuggestions: false,
        error: null,
        isLoading: false
      }))
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    setSearchState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/company-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
        signal: abortControllerRef.current.signal
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Search failed')
      }

      // Handle different response types
      if (Array.isArray(data.data)) {
        // Name search results
        setSearchState(prev => ({
          ...prev,
          results: data.data,
          showSuggestions: true,
          selectedCompany: null,
          isLoading: false,
          // Add to search history if not already present
          searchHistory: prev.searchHistory.includes(query.trim())
            ? prev.searchHistory
            : [query.trim(), ...prev.searchHistory.slice(0, 4)]
        }))
      } else if (data.data && typeof data.data === 'object') {
        // Direct CIN/LLPIN search result
        setSearchState(prev => ({
          ...prev,
          results: [],
          showSuggestions: false,
          selectedCompany: data.data,
          isLoading: false,
          searchHistory: prev.searchHistory.includes(query.trim())
            ? prev.searchHistory
            : [query.trim(), ...prev.searchHistory.slice(0, 4)]
        }))
      } else {
        setSearchState(prev => ({
          ...prev,
          results: [],
          showSuggestions: false,
          selectedCompany: null,
          isLoading: false,
          error: 'No results found'
        }))
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled, ignore
        return
      }

      console.error('Search error:', error)
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Search failed. Please try again.',
        results: [],
        showSuggestions: false
      }))
    }
  }, [])

  // Enhanced input change handler with optimized typing detection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchState(prev => ({ ...prev, query: value, isTyping: true }))

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Clear typing indicator timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set typing indicator timeout
    typingTimeoutRef.current = setTimeout(() => {
      setSearchState(prev => ({ ...prev, isTyping: false }))
    }, 150)

    // Only search if we have meaningful input
    if (value.trim().length >= 2) {
      // Set longer debounce for better UX and performance
      debounceRef.current = setTimeout(() => {
        debouncedSearch(value)
      }, 500) // Increased from 200ms to 500ms
    } else {
      // Clear results immediately for short queries
      setSearchState(prev => ({
        ...prev,
        results: [],
        showSuggestions: false,
        error: null,
        isLoading: false
      }))
    }
  }

  // Handle suggestion selection with animation
  const handleSuggestionSelect = (result: CompanySearchResult) => {
    setSearchState(prev => ({
      ...prev,
      query: result.label,
      showSuggestions: false,
      isLoading: false, // Ensure loading state is cleared
      selectedCompany: {
        companyName: result.label,
        cin: result.value.startsWith('L') || result.value.startsWith('U') ? result.value : undefined,
        llpin: result.value.match(/^[A-Z]{3}\d{4}[A-Z]\d{4}[A-Z]{3}\d{6}$/) ? result.value : undefined
      },
      searchHistory: prev.searchHistory.includes(result.label)
        ? prev.searchHistory
        : [result.label, ...prev.searchHistory.slice(0, 4)]
    }))
  }

  // Handle popular search selection with optimized debounce
  const handlePopularSearchSelect = (searchTerm: string) => {
    setSearchState(prev => ({ ...prev, query: searchTerm, isTyping: true }))

    // Clear any existing timeouts
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Immediate search for popular selections
    debouncedSearch(searchTerm)
  }

  // Enhanced copy to clipboard with better feedback
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  // Clear search
  // Clear search
  const clearSearch = () => {
    setSearchState({
      query: '',
      isLoading: false,
      results: [],
      selectedCompany: null,
      error: null,
      showSuggestions: false,
      searchHistory: searchState.searchHistory,
      isTyping: false
    })
    searchInputRef.current?.focus()
  }

  // Cleanup effect for abort controller and timeouts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setSearchState(prev => ({ ...prev, showSuggestions: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Company Search Tool",
            "description": "Search Indian company information using Company Name, CIN, or LLPIN. Get instant access to MCA registered company details.",
            "url": "https://startbusiness.co.in",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "provider": {
              "@type": "Organization",
              "name": "StartBusiness",
              "url": "https://startbusiness.co.in"
            },
            "featureList": [
              "Company Name Search",
              "CIN Lookup",
              "LLPIN Search",
              "MCA Data Access",
              "Company Details Verification"
            ]
          })
        }}
      />

      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-100/15 to-transparent rounded-full -ml-40 -mb-40 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
          {/* Professional Header - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium mb-4 sm:mb-6 shadow-sm hover:shadow-md transition-all duration-200">
              <Building2 className="w-4 h-4 mr-2" />
              <span>MCA Company Search</span>
              <Sparkles className="w-4 h-4 ml-2" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight px-4">
              Search Company
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline sm:ml-2"> Information</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Find detailed information about any Indian company using Company Name, CIN, or LLPIN with real-time MCA data.
            </p>

            {/* Compact Feature badges - Mobile Optimized */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6 px-4">
              <Badge className="bg-green-50 text-green-700 border-green-200 px-2 sm:px-3 py-1 text-xs font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                Real-time Data
              </Badge>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-2 sm:px-3 py-1 text-xs font-medium">
                <Shield className="w-3 h-3 mr-1" />
                MCA Verified
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-2 sm:px-3 py-1 text-xs font-medium">
                <Sparkles className="w-3 h-3 mr-1" />
                Instant Results
              </Badge>
            </div>
          </div>

          {/* Modern Search Interface - Mobile Optimized */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative mb-8 sm:mb-10">
              <div className="relative group">
                <Search className={`absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 z-20 pointer-events-none ${searchState.isLoading
                    ? 'text-blue-600 animate-pulse'
                    : searchState.isTyping
                      ? 'text-blue-500'
                      : 'text-slate-400'
                  }`} />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by Company Name, CIN, or LLPIN..."
                  value={searchState.query}
                  onChange={handleInputChange}
                  className={`pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 text-sm sm:text-base border-2 rounded-xl bg-white shadow-md transition-all duration-200 ${searchState.isTyping
                      ? 'border-blue-500 shadow-blue-100 ring-2 sm:ring-4 ring-blue-50'
                      : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-50'
                    } group-hover:shadow-lg focus:outline-none`}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchState(prev => ({ ...prev, showSuggestions: false }))
                    }
                    if (e.key === 'Enter' && searchState.results.length > 0) {
                      handleSuggestionSelect(searchState.results[0])
                    }
                  }}
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {searchState.isLoading && (
                    <div className="flex items-center bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                      <Loader2 className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 animate-spin mr-1 sm:mr-2" />
                      <span className="text-xs text-blue-600 font-medium hidden sm:inline">Searching...</span>
                    </div>
                  )}
                  {searchState.query && !searchState.isLoading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 hover:bg-slate-100 h-auto"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              </div>

              {/* Search input guidance */}
              {searchState.query.length > 0 && searchState.query.length < 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700">
                  Type at least 2 characters to start searching...
                </div>
              )}

              {/* Modern Search Suggestions */}
              {searchState.showSuggestions && searchState.results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-20 mt-2 max-h-80 overflow-hidden">
                  <div className="p-3">
                    <div className="text-xs font-medium text-slate-500 px-3 py-2 border-b border-slate-100">
                      Found {searchState.results.length} companies
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {searchState.results.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionSelect(result)}
                          className="w-full px-3 py-3 text-left hover:bg-blue-50 rounded-lg my-1 transition-all duration-150 group focus:bg-blue-50 focus:outline-none"
                        >
                          <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                            {result.label}
                          </div>
                          <div className="text-sm text-slate-500 font-mono mt-1">
                            {result.value}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Popular Searches - Mobile Optimized */}
              {!searchState.query && !searchState.selectedCompany && (
                <div className="mt-6 sm:mt-8">
                  <p className="text-sm font-medium text-slate-600 mb-3 sm:mb-4 text-center">Popular Searches:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearchSelect(search)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <span className="truncate max-w-[120px] sm:max-w-none">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Error Message */}
            {searchState.error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Search Error</p>
                  <p className="text-red-600 text-sm mt-1">{searchState.error}</p>
                </div>
              </div>
            )}

            {/* Modern Company Details */}
            {searchState.selectedCompany && (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 mb-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Company Details</h3>
                    <p className="text-slate-600 text-sm">Verified MCA Information</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Company Name</label>
                      <div className="text-lg font-bold text-slate-900 leading-tight">{searchState.selectedCompany.companyName}</div>
                    </div>

                    {searchState.selectedCompany.cin && (
                      <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                        <label className="block text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">CIN</label>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-base text-slate-900 break-all">{searchState.selectedCompany.cin}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(searchState.selectedCompany!.cin!, 'cin')}
                            className="ml-3 p-2 h-auto rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            {copiedField === 'cin' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-blue-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {searchState.selectedCompany.llpin && (
                      <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                        <label className="block text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">LLPIN</label>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-base text-slate-900 break-all">{searchState.selectedCompany.llpin}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(searchState.selectedCompany!.llpin!, 'llpin')}
                            className="ml-3 p-2 h-auto rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            {copiedField === 'llpin' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-blue-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {searchState.selectedCompany.status && (
                      <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="block text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Status</label>
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${searchState.selectedCompany.status.toLowerCase().includes('active')
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                          {searchState.selectedCompany.status}
                        </span>
                      </div>
                    )}

                    {searchState.selectedCompany.registrationDate && (
                      <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Registration Date</label>
                        <div className="text-base font-semibold text-slate-900">{searchState.selectedCompany.registrationDate}</div>
                      </div>
                    )}

                    {searchState.selectedCompany.companyCategory && (
                      <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Category</label>
                        <div className="text-base font-semibold text-slate-900">{searchState.selectedCompany.companyCategory}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Call to Action */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Need Professional Help?</h4>
                    <p className="text-slate-600">Get expert assistance with compliance and registration services</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/services/roc-annual-compliances">
                      <Button size="lg" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                        <FileText className="w-4 h-4 mr-2" />
                        Annual Compliance
                      </Button>
                    </Link>
                    <Link href="/services/private-limited-company">
                      <Button variant="outline" size="lg" className="flex-1 sm:flex-none border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 px-6 py-3 rounded-xl transition-all duration-200">
                        <Building2 className="w-4 h-4 mr-2" />
                        Register Company
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Help Text */}
            <div className="text-center space-y-8">
              <div className="text-muted-foreground">
                <p className="mb-2">
                  Need help with company registration or compliance?
                  <Link href="/contact" className="text-primary hover:text-primary/80 ml-1 font-medium underline decoration-primary/30 hover:decoration-primary transition-colors">Contact our experts</Link>
                </p>

                {/* Search History */}
                {searchState.searchHistory.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Recent Searches:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {searchState.searchHistory.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handlePopularSearchSelect(search)}
                          className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs text-secondary-foreground transition-colors duration-150"
                        >
                          {search.length > 30 ? `${search.substring(0, 30)}...` : search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
