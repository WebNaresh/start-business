"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Gavel,
  Shield,
  Search,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  Grid3X3,
  List,
  TrendingUp,
  CheckCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FloatingActionButton from "@/components/ui/floating-action-button";
import ServiceSkeleton from "@/components/ui/service-skeleton";

interface SubService {
  name: string;
  href: string;
  popular?: boolean;
  new?: boolean;
  description?: string;
  price?: string;
  timeline?: string;
  features?: string[];
}

interface Service {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  description: string;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  subServices: SubService[];
  totalServices?: number;
}

type ViewMode = "grid" | "list";
type SortBy = "popular" | "name" | "newest";

export default function AllServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("popular");
  const [filteredServices, setFilteredServices] = useState<SubService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and filter services
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    const timer = setTimeout(
      () => {
        const allServices = serviceCategories.flatMap((category) =>
          category.subServices.map((service) => ({
            ...service,
            category: category.name,
            categoryId: category.id,
            categoryColor: category.color,
            categoryBg: category.bgColor,
          }))
        );

        let filtered = allServices;

        // Filter by category
        if (activeCategory !== "all") {
          filtered = filtered.filter(
            (service) => service.categoryId === activeCategory
          );
        }

        // Filter by search query
        if (searchQuery.trim()) {
          filtered = filtered.filter(
            (service) =>
              service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              service.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Sort services
        filtered.sort((a, b) => {
          switch (sortBy) {
            case "popular":
              if (a.popular && !b.popular) return -1;
              if (!a.popular && b.popular) return 1;
              return a.name.localeCompare(b.name);
            case "newest":
              if (a.new && !b.new) return -1;
              if (!a.new && b.new) return 1;
              return a.name.localeCompare(b.name);
            case "name":
            default:
              return a.name.localeCompare(b.name);
          }
        });

        setFilteredServices(filtered);
        setIsLoading(false);
      },
      searchQuery || activeCategory !== "all" ? 300 : 800
    ); // Shorter delay for filtering

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortBy]);

  const serviceCategories: Service[] = [
    {
      id: "business-setup",
      name: "Business Setup",
      shortName: "Setup",
      icon: Building2,
      description: "Complete business registration and setup services",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradientFrom: "from-blue-600",
      gradientTo: "to-blue-400",
      totalServices: 9,
      subServices: [
        {
          name: "Private Limited Company",
          href: "/services/private-limited-company",
          popular: true,
          description:
            "Register your business as a Private Limited Company with limited liability protection",
          price: "₹6,999",
          timeline: "7-10 days",
          features: [
            "Limited Liability",
            "Separate Legal Entity",
            "Easy Fund Raising",
          ],
        },
        {
          name: "Limited Liability Partnership",
          href: "/services/llp",
          description:
            "Form an LLP with the benefits of partnership and limited liability",
          price: "₹5,999",
          timeline: "5-7 days",
          features: [
            "Partnership Benefits",
            "Limited Liability",
            "Tax Advantages",
          ],
        },
        {
          name: "One Person Company",
          href: "/services/opc-registration",
          description:
            "Start a company with a single person as shareholder and director",
          price: "₹5,499",
          timeline: "7-10 days",
          features: ["Single Owner", "Limited Liability", "Corporate Benefits"],
        },
        {
          name: "Sole Proprietorship",
          href: "/services/sole-proprietorship",
          description:
            "Register as a sole proprietor for simple business structure",
          price: "₹2,999",
          timeline: "3-5 days",
          features: ["Simple Structure", "Easy Setup", "Full Control"],
        },
        {
          name: "Nidhi Company",
          href: "/services/nidhi-company",
          description:
            "Establish a Nidhi Company for borrowing and lending among members",
          price: "₹12,999",
          timeline: "15-20 days",
          features: ["Member Lending", "RBI Regulated", "Mutual Benefit"],
        },
        {
          name: "Producer Company",
          href: "/services/producer-company",
          description: "Form a company owned by primary producers or farmers",
          price: "₹8,999",
          timeline: "10-15 days",
          features: [
            "Farmer Owned",
            "Collective Benefits",
            "Agricultural Focus",
          ],
        },
        {
          name: "Partnership Firm",
          href: "/services/partnership-firm",
          description: "Create a partnership between two or more individuals",
          price: "₹3,999",
          timeline: "5-7 days",
          features: [
            "Shared Ownership",
            "Flexible Structure",
            "Easy Formation",
          ],
        },
        {
          name: "Section 8 Company",
          href: "/services/section-8-company",
          description:
            "Register a non-profit company for charitable and social welfare activities",
          price: "₹18,000",
          timeline: "30-45 days",
          features: ["Non-profit", "Tax Exemptions", "Social Impact"],
        },
        {
          name: "Subsidiary of Foreign Company",
          href: "/services/subsidiary-foreign-company",
          description:
            "Establish Indian subsidiary of your foreign company with complete compliance",
          price: "₹35,000",
          timeline: "25-35 days",
          features: [
            "100% Foreign Ownership",
            "Local Presence",
            "FEMA Compliance",
          ],
        },
      ],
    },
    {
      id: "tax-compliance",
      name: "Compliances",
      shortName: "Compliance",
      icon: FileText,
      description: "MCA, RBI and regulatory compliance management",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      gradientFrom: "from-emerald-600",
      gradientTo: "to-green-400",
      totalServices: 7,
      subServices: [
        {
          name: "GST Registration",
          href: "/services/gst-registration",
          popular: true,
          description:
            "Register for Goods and Services Tax (GST) for your business",
          price: "₹2,999",
          timeline: "3-5 days",
          features: ["GST Number", "Input Tax Credit", "Legal Compliance"],
        },
        {
          name: "Company Annual ROC Compliance",
          href: "/services/roc-annual-compliances",
          popular: true,
          description:
            "Stay compliant with all ROC requirements including annual returns",
          price: "₹15,000",
          timeline: "10-15 days",
          features: ["Annual Returns", "ROC Compliance", "Penalty Avoidance"],
        },
        {
          name: "LLP Annual Compliance",
          href: "/services/llp-annual-compliance",
          description:
            "Complete LLP annual compliance including Form 8 and Form 11",
          price: "₹8,000",
          timeline: "10-12 days",
          features: [
            "Form 11 & 8 Filing",
            "Compliance Review",
            "Expert Support",
          ],
        },
        {
          name: "FEMA Compliance Services",
          href: "/services/fema-compliance",
          description:
            "FDI/ODI reporting with RBI and FLA return filing services",
          price: "₹25,000",
          timeline: "15-20 days",
          features: ["FDI Reporting", "ODI Reporting", "FLA Returns"],
        },
        {
          name: "CSR Compliances",
          href: "/services/csr-compliance",
          description: "CSR consultancy, CSR-1 and CSR-2 filing services",
          price: "₹18,000",
          timeline: "10-15 days",
          features: ["CSR Strategy", "CSR-1 Filing", "CSR-2 Filing"],
        },
        {
          name: "Maintenance of Statutory Registers",
          href: "/services/statutory-registers",
          description: "Maintain all mandatory statutory registers and minutes",
          price: "₹12,000",
          timeline: "5-7 days",
          features: [
            "Register Maintenance",
            "Minutes Recording",
            "Compliance Updates",
          ],
        },
        {
          name: "Shifting of Registered Office",
          href: "/services/registered-office-shifting",
          description:
            "Change registered office address with all regulatory compliances",
          price: "₹15,000",
          timeline: "15-25 days",
          features: ["Address Change", "ROC Filing", "Regulatory Updates"],
        },
        {
          name: "Dematerialisation of Securities",
          href: "/services/dematerialisation-securities",
          description:
            "Convert physical securities to electronic form with NSDL/CDSL",
          price: "₹20,000",
          timeline: "20-30 days",
          features: [
            "NSDL/CDSL Process",
            "Electronic Conversion",
            "SEBI Compliance",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      name: "Trademark Services",
      shortName: "IP",
      icon: Shield,
      description: "Protect your brand and intellectual property",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradientFrom: "from-purple-600",
      gradientTo: "to-indigo-400",
      totalServices: 6,
      subServices: [
        {
          name: "Trademark Registration",
          href: "/services/trademark-registration",
          popular: true,
          description:
            "Protect your brand identity with trademark registration",
          price: "₹6,999",
          timeline: "12-18 months",
          features: ["Brand Protection", "Legal Rights", "Nationwide Coverage"],
        },
        {
          name: "Respond to TM Objection",
          href: "/services/trademark-objection",
          description: "Get help responding to trademark objections",
          price: "₹4,999",
          timeline: "30 days",
          features: ["Legal Response", "Expert Drafting", "Follow-up Support"],
        },
        {
          name: "Trademark Hearing",
          href: "/services/trademark-hearing",
          description: "Professional representation for trademark hearings",
          price: "₹8,000",
          timeline: "As per hearing date",
          features: [
            "Legal Representation",
            "Expert Arguments",
            "Documentation Support",
          ],
        },
        {
          name: "Trademark Rectification",
          href: "/services/trademark-rectification",
          description: "Rectify or remove conflicting trademarks from registry",
          price: "₹25,000",
          timeline: "12-18 months",
          features: [
            "Legal Proceedings",
            "Expert Representation",
            "Registry Removal",
          ],
        },
        {
          name: "Copyright Registration",
          href: "/services/copyright-registration",
          description:
            "Protect your creative works with copyright registration",
          price: "₹3,999",
          timeline: "6-8 months",
          features: [
            "Creative Protection",
            "Legal Rights",
            "Infringement Protection",
          ],
        },
        {
          name: "Copyright Objection",
          href: "/services/copyright-objection",
          description:
            "Handle copyright objections and disputes professionally",
          price: "₹12,000",
          timeline: "3-6 months",
          features: ["Legal Response", "Expert Handling", "Dispute Resolution"],
        },
      ],
    },
    {
      id: "licenses-registrations",
      name: "Important Registrations",
      shortName: "Licenses",
      icon: Gavel,
      description: "Various business licenses and regulatory approvals",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradientFrom: "from-amber-600",
      gradientTo: "to-orange-400",
      totalServices: 7,
      subServices: [
        {
          name: "Import Export Code",
          href: "/services/iec-license",
          description: "Get IEC code for import/export business activities",
          price: "₹2,999",
          timeline: "7-10 days",
          features: [
            "Import/Export Rights",
            "Global Trade",
            "Government Approval",
          ],
        },
        {
          name: "MSME Registration",
          href: "/services/msme-registration",
          popular: true,
          description: "Register as a Micro, Small, or Medium Enterprise",
          price: "₹1,999",
          timeline: "3-5 days",
          features: ["Government Benefits", "Loan Advantages", "Tax Benefits"],
        },
        {
          name: "Shop & Establishment License",
          href: "/services/shop-establishment",
          description: "Obtain mandatory license for your business premises",
          price: "₹2,499",
          timeline: "7-15 days",
          features: ["Legal Operation", "Employee Rights", "Compliance"],
        },
        {
          name: "Professional Tax Registration",
          href: "/services/professional-tax",
          description: "Register for professional tax in your state",
          price: "₹1,499",
          timeline: "5-7 days",
          features: ["State Compliance", "Employee Tax", "Legal Requirement"],
        },
        {
          name: "Startup India Registration",
          href: "/services/startup-india",
          new: true,
          description:
            "Register under Startup India to access government benefits and incentives",
          price: "₹4,999",
          timeline: "15-20 days",
          features: [
            "Government Benefits",
            "Tax Exemptions",
            "Funding Support",
          ],
        },
        {
          name: "NGO Darpan Registration",
          href: "/services/ngo-darpan",
          description:
            "Register your NGO on NITI Aayog's NGO Darpan portal for government funding",
          price: "₹5,999",
          timeline: "10-15 days",
          features: [
            "Government Recognition",
            "Funding Eligibility",
            "Credibility Enhancement",
          ],
        },
        {
          name: "GeM Portal Registration",
          href: "/services/gem-portal",
          description:
            "Register on Government e-Marketplace to sell to government organizations",
          price: "₹8,999",
          timeline: "7-12 days",
          features: [
            "Government Contracts",
            "Direct Sales",
            "Digital Marketplace",
          ],
        },
      ],
    },
  ];

  // Get category statistics
  const getCategoryStats = () => {
    const totalServices = serviceCategories.reduce(
      (sum, cat) => sum + cat.subServices.length,
      0
    );
    const popularServices = serviceCategories.reduce(
      (sum, cat) =>
        sum + cat.subServices.filter((service) => service.popular).length,
      0
    );
    const newServices = serviceCategories.reduce(
      (sum, cat) =>
        sum + cat.subServices.filter((service) => service.new).length,
      0
    );

    return { totalServices, popularServices, newServices };
  };

  const stats = getCategoryStats();

  // Category filter options
  const categoryOptions = [
    { id: "all", name: "All Services", count: stats.totalServices, icon: null },
    ...serviceCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.subServices.length,
      icon: cat.icon,
      color: cat.color,
      bgColor: cat.bgColor,
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
        data-section="hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-48 -mt-48 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-40 -mb-40 opacity-40 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              50+ Business Services Available
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Complete Business Solutions
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                All Under One Roof
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              From company registration to compliance management, get expert
              guidance for all your business needs.
              <span className="block mt-2 font-medium text-slate-700">
                Fast processing • Expert support • 100% compliance guaranteed
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Your Service
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-slate-300 hover:border-blue-300 px-8 py-3 rounded-xl font-semibold"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Compare Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  50+
                </div>
                <div className="text-sm text-slate-600">Business Services</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                  10K+
                </div>
                <div className="text-sm text-slate-600">Happy Clients</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                  7-15
                </div>
                <div className="text-sm text-slate-600">Days Processing</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                  24/7
                </div>
                <div className="text-sm text-slate-600">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-4 sm:py-6 bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Full Width on Mobile */}
          <div className="mb-4">
            <div className="sr-only" id="search-description">
              Search through our business services including company
              registration, GST, trademark, and compliance services
            </div>
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for company registration, GST, trademark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-slate-200 focus:border-blue-300 focus:ring-blue-200 text-sm bg-white shadow-sm"
                aria-label="Search business services"
                role="searchbox"
                aria-describedby="search-description"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filters - Horizontal Scroll on Mobile */}
            <div className="w-full lg:flex-1 order-1">
              <div
                className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide"
                role="tablist"
                aria-label="Service categories"
              >
                {categoryOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={
                      activeCategory === option.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(option.id)}
                    className={`flex-shrink-0 transition-all duration-300 text-xs sm:text-sm ${
                      activeCategory === option.id
                        ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                        : "hover:bg-blue-50 hover:border-blue-200"
                    }`}
                    role="tab"
                    aria-selected={activeCategory === option.id}
                    aria-controls="services-grid"
                  >
                    {option.icon && (
                      <option.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                    )}
                    <span className="whitespace-nowrap">{option.name}</span>
                    <Badge
                      variant="secondary"
                      className="ml-1.5 text-xs px-1.5 py-0"
                    >
                      {option.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center gap-3 order-2">
              <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:border-blue-300 focus:ring-blue-200 min-w-[120px]"
              >
                <option value="popular">Popular First</option>
                <option value="name">Name A-Z</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || activeCategory !== "all") && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-600 font-medium">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="h-4 w-4 p-0 hover:bg-slate-200 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {activeCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category:{" "}
                  {
                    categoryOptions.find((opt) => opt.id === activeCategory)
                      ?.name
                  }
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveCategory("all")}
                    className="h-4 w-4 p-0 hover:bg-slate-200 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Services Display Section */}
      <section className="py-8 sm:py-12" data-section="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {activeCategory === "all"
                  ? "All Services"
                  : categoryOptions.find((cat) => cat.id === activeCategory)
                      ?.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {filteredServices.length} service
                {filteredServices.length !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {filteredServices.length > 0 && (
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {filteredServices.filter((s) => s.popular).length} Popular
                </Badge>
                {filteredServices.filter((s) => s.new).length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {filteredServices.filter((s) => s.new).length} New
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Services Grid/List */}
          {isLoading ? (
            <ServiceSkeleton count={8} viewMode={viewMode} />
          ) : filteredServices.length > 0 ? (
            <div
              id="services-grid"
              className={cn(
                "transition-all duration-300",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                  : "space-y-3 sm:space-y-4"
              )}
              role="tabpanel"
              aria-label={`${filteredServices.length} services found`}
              aria-live="polite"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "group relative bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden",
                    viewMode === "grid"
                      ? "hover:-translate-y-1 shadow-sm"
                      : "flex items-center p-4 sm:p-6 hover:shadow-lg",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/0 before:to-purple-50/0 hover:before:from-blue-50/30 hover:before:to-purple-50/20 before:transition-all before:duration-300"
                  )}
                >
                  {/* Popular/New Badge */}
                  {(service.popular || service.new) && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        className={cn(
                          "text-xs px-2.5 py-1 font-medium shadow-sm",
                          service.popular
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                        )}
                      >
                        {service.popular && (
                          <Star className="w-3 h-3 mr-1 fill-current" />
                        )}
                        {service.new && <Sparkles className="w-3 h-3 mr-1" />}
                        {service.popular ? "Popular" : "New"}
                      </Badge>
                    </div>
                  )}

                  <Link
                    href={service.href}
                    className="block relative z-10"
                    aria-label={`Learn more about ${service.name} - ${service.price}`}
                  >
                    {viewMode === "grid" ? (
                      <article className="p-5 sm:p-6 h-full flex flex-col">
                        {/* Header */}
                        <header className="mb-4">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-base sm:text-lg leading-tight pr-8 mb-2">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {service.description}
                            </p>
                          )}
                        </header>

                        {/* Price and Timeline */}
                        {service.price && (
                          <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
                            <div>
                              <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                                {service.price}
                              </div>
                              <div className="text-xs text-slate-500">
                                Starting from
                              </div>
                            </div>
                            {service.timeline && (
                              <div className="text-right">
                                <div className="flex items-center text-sm text-slate-700 font-medium">
                                  <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                  {service.timeline}
                                </div>
                                <div className="text-xs text-slate-500">
                                  Processing time
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-2 mb-6 flex-1">
                            <div className="text-xs font-medium text-slate-700 mb-2">
                              Key Features:
                            </div>
                            {service.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-sm text-slate-600"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2.5 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            {service.features.length > 3 && (
                              <div className="text-xs text-slate-500 ml-6">
                                +{service.features.length - 3} more features
                              </div>
                            )}
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="mt-auto">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </article>
                    ) : (
                      <div className="flex-1 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          {/* Left Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-lg sm:text-xl leading-tight mb-2">
                              {service.name}
                            </h3>

                            {service.description && (
                              <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            )}

                            {/* Features and Timeline */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                              {service.timeline && (
                                <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
                                  <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                  {service.timeline}
                                </div>
                              )}
                              {service.features && (
                                <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                                  <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" />
                                  {service.features.length} features
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Content */}
                          <div className="flex flex-col sm:items-end gap-3 sm:text-right">
                            {service.price && (
                              <div className="bg-emerald-50 px-3 py-2 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                                  {service.price}
                                </div>
                                <div className="text-xs text-emerald-600/70">
                                  Starting from
                                </div>
                              </div>
                            )}

                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                            >
                              Get Started
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No services found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery
                    ? `No services match "${searchQuery}". Try adjusting your search or browse by category.`
                    : "No services available in this category."}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  variant="outline"
                >
                  View All Services
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton
        showScrollToTop={true}
        actions={[
          {
            icon: Search,
            label: "Quick Search",
            onClick: () => {
              const searchInput = document.querySelector(
                'input[placeholder*="Search"]'
              ) as HTMLInputElement;
              if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            },
            color: "bg-blue-600 hover:bg-blue-700",
          },
          {
            icon: Star,
            label: "Popular Services",
            onClick: () => {
              // Find and click the popular services filter
              const buttons = document.querySelectorAll("button");
              const popularButton = Array.from(buttons).find(
                (btn) =>
                  btn.textContent?.includes("Business Setup") ||
                  btn.textContent?.includes("All Services")
              );
              if (popularButton) {
                popularButton.click();
              }
              // Scroll to services section
              const servicesSection = document.querySelector(
                '[data-section="services"]'
              );
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            },
            color: "bg-amber-600 hover:bg-amber-700",
          },
        ]}
      />
    </div>
  );
}
