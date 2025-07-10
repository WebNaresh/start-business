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

      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-100 rounded-full opacity-20 animate-pulse delay-300"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium mb-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <Building2 className="w-5 h-5 mr-2" />
            <span>MCA Company Search</span>
            <Sparkles className="w-4 h-4 ml-2 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Search Company 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Information</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find detailed information about any Indian company using Company Name, CIN, or LLPIN. 
            Get instant access to MCA registered company details with real-time search.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm shadow-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Real-time Data
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm shadow-sm">
              <Shield className="w-4 h-4 mr-2" />
              MCA Verified
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Instant Results
            </Badge>
          </div>
        </div>

        {/* Enhanced Search Interface */}
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12">
            <div className="relative group">
              <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-all duration-200 z-10 ${
                searchState.isLoading 
                  ? 'text-blue-500 animate-pulse' 
                  : searchState.isTyping 
                  ? 'text-blue-400' 
                  : 'text-gray-400'
              }`} />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Enter Company Name, CIN (L12345AB2020PLC123456), or LLPIN (ABC1234D2020LLP123456)"
                value={searchState.query}
                onChange={handleInputChange}
                className={`pl-16 pr-16 py-6 text-lg border-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-200 ${
                  searchState.isTyping 
                    ? 'border-blue-500 shadow-blue-100' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                } group-hover:shadow-xl`}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchState(prev => ({ ...prev, showSuggestions: false }))
                  }
                  if (e.key === 'Enter' && searchState.results.length > 0) {
                    handleSuggestionSelect(searchState.results[0])
                  }
                }}
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {searchState.isLoading && (
                  <div className="flex items-center">
                    <Loader2 className="text-blue-500 w-5 h-5 animate-spin mr-2" />
                    <span className="text-xs text-blue-500 font-medium">Searching...</span>
                  </div>
                )}
                {searchState.query && !searchState.isLoading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 rounded-full p-2 hover:bg-gray-100"
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

            {/* Enhanced Search Suggestions */}
            {searchState.showSuggestions && searchState.results.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl z-20 mt-3 max-h-80 overflow-hidden">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-4 py-2 border-b border-gray-100">
                    Search Results ({searchState.results.length})
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {searchState.results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionSelect(result)}
                        className="w-full px-4 py-4 text-left hover:bg-blue-50 rounded-xl mx-2 my-1 transition-all duration-150 group focus:bg-blue-50 focus:outline-none border border-transparent hover:border-blue-100"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                          {result.label}
                        </div>
                        <div className="text-sm text-gray-500 font-mono mt-1">
                          {result.value}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Popular Searches - Show when input is empty */}
            {!searchState.query && !searchState.selectedCompany && (
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-600 mb-4 text-center">Popular Searches:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearchSelect(search)}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {search}
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

          {/* Enhanced Company Details */}
          {searchState.selectedCompany && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 mb-12 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mr-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Company Details</h3>
                  <p className="text-gray-500 text-sm">Verified MCA Information</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl">
                    <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Company Name</label>
                    <div className="text-xl font-bold text-gray-900 leading-tight">{searchState.selectedCompany.companyName}</div>
                  </div>

                  {searchState.selectedCompany.cin && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                      <label className="block text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">CIN</label>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg text-gray-900 break-all">{searchState.selectedCompany.cin}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(searchState.selectedCompany!.cin!, 'cin')}
                          className="ml-3 p-2 h-auto rounded-xl hover:bg-blue-100 transition-colors"
                        >
                          {copiedField === 'cin' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-blue-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {searchState.selectedCompany.llpin && (
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl">
                      <label className="block text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">LLPIN</label>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg text-gray-900 break-all">{searchState.selectedCompany.llpin}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(searchState.selectedCompany!.llpin!, 'llpin')}
                          className="ml-3 p-2 h-auto rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                          {copiedField === 'llpin' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-indigo-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {searchState.selectedCompany.status && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                      <label className="block text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide">Status</label>
                      <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                        searchState.selectedCompany.status.toLowerCase().includes('active') 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {searchState.selectedCompany.status}
                      </span>
                    </div>
                  )}

                  {searchState.selectedCompany.registrationDate && (
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                      <label className="block text-sm font-semibold text-purple-600 mb-2 uppercase tracking-wide">Registration Date</label>
                      <div className="text-lg font-semibold text-gray-900">{searchState.selectedCompany.registrationDate}</div>
                    </div>
                  )}

                  {searchState.selectedCompany.companyCategory && (
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                      <label className="block text-sm font-semibold text-orange-600 mb-2 uppercase tracking-wide">Category</label>
                      <div className="text-lg font-semibold text-gray-900">{searchState.selectedCompany.companyCategory}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Call to Action */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Need Professional Help?</h4>
                  <p className="text-gray-600">Get expert assistance with compliance and registration services</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services/roc-annual-compliances">
                    <Button size="lg" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                      <FileText className="w-5 h-5 mr-2" />
                      Annual Compliance Services
                    </Button>
                  </Link>
                  <Link href="/services/company-registration">
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none border-2 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
                      <Building2 className="w-5 h-5 mr-2" />
                      Register New Company
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Help Text */}
          <div className="text-center space-y-8">
            <div className="text-gray-600">
              <p className="mb-2">
                Need help with company registration or compliance? 
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 ml-1 font-medium underline decoration-blue-200 hover:decoration-blue-400 transition-colors">Contact our experts</Link>
              </p>
              
              {/* Search History */}
              {searchState.searchHistory.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Recent Searches:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {searchState.searchHistory.slice(0, 5).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearchSelect(search)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors duration-150"
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
