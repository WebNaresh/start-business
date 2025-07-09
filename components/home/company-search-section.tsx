"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Search, Building2, Copy, CheckCircle, AlertCircle, Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
}

export default function CompanySearchSection() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isLoading: false,
    results: [],
    selectedCompany: null,
    error: null,
    showSuggestions: false
  })

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Debounced search function
  const debouncedSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchState(prev => ({ 
        ...prev, 
        results: [], 
        showSuggestions: false, 
        error: null 
      }))
      return
    }

    setSearchState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/company-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() })
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
          isLoading: false
        }))
      } else if (data.data && typeof data.data === 'object') {
        // Direct CIN/LLPIN search result
        setSearchState(prev => ({
          ...prev,
          results: [],
          showSuggestions: false,
          selectedCompany: data.data,
          isLoading: false
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

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchState(prev => ({ ...prev, query: value }))

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      debouncedSearch(value)
    }, 300)
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (result: CompanySearchResult) => {
    setSearchState(prev => ({
      ...prev,
      query: result.label,
      showSuggestions: false,
      selectedCompany: {
        companyName: result.label,
        cin: result.value.startsWith('L') || result.value.startsWith('U') ? result.value : undefined,
        llpin: result.value.match(/^[A-Z]{3}\d{4}[A-Z]\d{4}[A-Z]{3}\d{6}$/) ? result.value : undefined
      }
    }))
  }

  // Copy to clipboard function
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchState({
      query: '',
      isLoading: false,
      results: [],
      selectedCompany: null,
      error: null,
      showSuggestions: false
    })
    searchInputRef.current?.focus()
  }

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

      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            MCA Company Search
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Search Company Information
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find detailed information about any Indian company using Company Name, CIN, or LLPIN. 
            Get instant access to MCA registered company details.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Enter Company Name, CIN (L12345AB2020PLC123456), or LLPIN (ABC1234D2020LLP123456)"
                value={searchState.query}
                onChange={handleInputChange}
                className="pl-12 pr-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                disabled={searchState.isLoading}
              />
              {searchState.isLoading && (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
              )}
              {searchState.query && !searchState.isLoading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </Button>
              )}
            </div>

            {/* Search Suggestions */}
            {searchState.showSuggestions && searchState.results.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-2 max-h-60 overflow-y-auto">
                {searchState.results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionSelect(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-blue-50 focus:outline-none"
                  >
                    <div className="font-medium text-gray-900">{result.label}</div>
                    <div className="text-sm text-gray-500">{result.value}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {searchState.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <span className="text-red-700">{searchState.error}</span>
            </div>
          )}

          {/* Company Details */}
          {searchState.selectedCompany && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Company Details</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Company Name</label>
                    <div className="text-lg font-semibold text-gray-900">{searchState.selectedCompany.companyName}</div>
                  </div>

                  {searchState.selectedCompany.cin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">CIN</label>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-900">{searchState.selectedCompany.cin}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(searchState.selectedCompany!.cin!, 'cin')}
                          className="p-1 h-auto"
                        >
                          {copiedField === 'cin' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {searchState.selectedCompany.llpin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">LLPIN</label>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-900">{searchState.selectedCompany.llpin}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(searchState.selectedCompany!.llpin!, 'llpin')}
                          className="p-1 h-auto"
                        >
                          {copiedField === 'llpin' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {searchState.selectedCompany.status && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        searchState.selectedCompany.status.toLowerCase().includes('active') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {searchState.selectedCompany.status}
                      </span>
                    </div>
                  )}

                  {searchState.selectedCompany.registrationDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                      <div className="text-gray-900">{searchState.selectedCompany.registrationDate}</div>
                    </div>
                  )}

                  {searchState.selectedCompany.companyCategory && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                      <div className="text-gray-900">{searchState.selectedCompany.companyCategory}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services/roc-annual-compliances">
                    <Button className="flex-1 sm:flex-none">
                      <FileText className="w-4 h-4 mr-2" />
                      Annual Compliance Services
                    </Button>
                  </Link>
                  <Link href="/services/company-registration">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Building2 className="w-4 h-4 mr-2" />
                      Register New Company
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              <strong>Search Tips:</strong> Enter company name for suggestions, or paste exact CIN/LLPIN for direct lookup
            </p>
            <p>
              Need help with company registration or compliance? 
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 ml-1">Contact our experts</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
