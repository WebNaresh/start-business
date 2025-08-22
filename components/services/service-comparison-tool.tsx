"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  X,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Zap,
  RotateCcw,
  TrendingUp,
  Award,
  Target,
  AlertCircle,
  Sparkles,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EnhancedCTAButton from "@/components/ui/enhanced-cta-button";

interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  price: string;
  originalPrice: string;
  timeline: string;
  slug: string;
  popular?: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  idealFor: string[];
  compliance: string[];
}

interface ServiceComparisonToolProps {
  services?: Service[];
  maxComparisons?: number;
  className?: string;
}

export default function ServiceComparisonTool({
  services: propServices,
  maxComparisons = 3,
  className = "",
}: ServiceComparisonToolProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    features: true,
    pros: true,
    cons: false,
    idealFor: false,
    compliance: false,
  });
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Default services data
  const defaultServices: Service[] = [
    {
      id: "pvt-ltd",
      title: "Private Limited Company Registration",
      shortTitle: "Private Limited",
      description: "Most popular choice for startups and growing businesses",
      price: "₹12,000",
      originalPrice: "₹15,000",
      timeline: "15-20 days",
      slug: "private-limited-company",
      popular: true,
      features: [
        "Company Name Reservation",
        "Digital Signature Certificate",
        "Director Identification Number",
        "Certificate of Incorporation",
        "PAN & TAN Registration",
      ],
      pros: [
        "Limited liability protection",
        "Easy to raise capital",
        "Professional credibility",
        "Perpetual succession",
      ],
      cons: [
        "More compliance requirements",
        "Higher registration cost",
        "Mandatory annual filings",
      ],
      idealFor: [
        "Startups seeking funding",
        "Medium to large businesses",
        "Tech companies",
        "Manufacturing units",
      ],
      compliance: [
        "Annual Return Filing",
        "Board Meetings",
        "Financial Statements",
        "Regulatory Compliance",
      ],
    },
    {
      id: "opc",
      title: "One Person Company Registration",
      shortTitle: "OPC",
      description: "Perfect for solo entrepreneurs with limited liability",
      price: "₹8,000",
      originalPrice: "₹10,000",
      timeline: "12-15 days",
      slug: "opc",
      features: [
        "Name Reservation",
        "DSC for director",
        "DIN for director",
        "OPC incorporation certificate",
        "PAN & TAN",
      ],
      pros: [
        "Single person ownership",
        "Limited liability protection",
        "Easy to manage",
        "Lower compliance burden",
      ],
      cons: [
        "Cannot have more than one director",
        "Conversion required if turnover exceeds ₹2 crores",
        "Limited growth potential",
      ],
      idealFor: [
        "Solo entrepreneurs",
        "Small business owners",
        "Professionals",
        "Consultants",
      ],
      compliance: [
        "Annual Return Filing",
        "Financial Statements",
        "Regulatory Compliance",
      ],
    },
    {
      id: "llp",
      title: "Limited Liability Partnership Registration",
      shortTitle: "LLP",
      description: "Ideal for professional service partnerships",
      price: "₹10,000",
      originalPrice: "₹13,000",
      timeline: "12-18 days",
      slug: "llp",
      features: [
        "Name Reservation",
        "DSC for partners",
        "DIN for designated partners",
        "LLP incorporation certificate",
        "LLP Agreement",
      ],
      pros: [
        "Operational flexibility",
        "No minimum capital requirement",
        "Easy compliance",
        "Tax benefits",
      ],
      cons: [
        "Cannot raise funds from public",
        "Limited credibility compared to company",
        "Conversion restrictions",
      ],
      idealFor: [
        "Professional service firms",
        "Consultancy businesses",
        "Family businesses",
        "Joint ventures",
      ],
      compliance: [
        "Annual Return Filing",
        "Statement of Accounts",
        "Regulatory Compliance",
      ],
    },
    {
      id: "gst",
      title: "GST Registration",
      shortTitle: "GST",
      description: "Essential for business compliance and growth",
      price: "₹3,000",
      originalPrice: "₹4,500",
      timeline: "7-10 days",
      slug: "gst-registration",
      features: [
        "GST registration application",
        "Document preparation",
        "Government liaison",
        "GST certificate",
        "Post-registration support",
      ],
      pros: [
        "Legal compliance",
        "Input tax credit benefits",
        "Nationwide business expansion",
        "Enhanced credibility",
      ],
      cons: [
        "Monthly/quarterly filing required",
        "Penalty for late filing",
        "Complex return filing process",
      ],
      idealFor: [
        "Businesses with turnover > ₹20 lakhs",
        "E-commerce sellers",
        "Inter-state traders",
        "Service providers",
      ],
      compliance: [
        "Monthly GST Returns",
        "Annual GST Return",
        "GST Audit (if applicable)",
      ],
    },
  ];

  const services = propServices || defaultServices;

  // Enhanced filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortTitle.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesCategory = true;
    if (filterCategory !== "all") {
      switch (filterCategory) {
        case "company":
          matchesCategory =
            ["pvt-ltd", "opc", "llp"].includes(service.id) ||
            service.title.toLowerCase().includes("company") ||
            service.title.toLowerCase().includes("llp") ||
            service.title.toLowerCase().includes("opc");
          break;
        case "compliance":
          matchesCategory =
            ["gst"].includes(service.id) ||
            service.title.toLowerCase().includes("gst") ||
            service.title.toLowerCase().includes("compliance") ||
            service.title.toLowerCase().includes("filing") ||
            service.title.toLowerCase().includes("return");
          break;
        case "registration":
          matchesCategory =
            service.title.toLowerCase().includes("registration") ||
            service.title.toLowerCase().includes("register");
          break;
        case "legal":
          matchesCategory =
            service.title.toLowerCase().includes("trademark") ||
            service.title.toLowerCase().includes("copyright") ||
            service.title.toLowerCase().includes("legal");
          break;
        default:
          matchesCategory = true;
      }
    }

    return matchesSearch && matchesCategory;
  });

  const handleServiceToggle = (serviceId: string) => {
    setIsAnimating(true);
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else if (prev.length < maxComparisons) {
        return [...prev, serviceId];
      }
      return prev;
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const selectedServiceData = services.filter((service) =>
    selectedServices.includes(service.id)
  );

  const startComparison = () => {
    if (selectedServices.length >= 2) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowComparison(true);
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetComparison = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedServices([]);
      setShowComparison(false);
      setIsAnimating(false);
    }, 300);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (showComparison) {
    return (
      <div className={cn("space-y-6 animate-in fade-in duration-500", className)}>
        {/* Sticky Comparison Header */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-full">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Service Comparison
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedServiceData.length} services selected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1.5">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {selectedServiceData.length} Selected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetComparison}
                  className="group hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
          <div className="relative p-6 sm:p-8 text-center">
            <div className="animate-in slide-in-from-top duration-500">
              <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                Compare services side by side to make the best decision for your
                business.
                <span className="block mt-2 text-sm text-slate-500">
                  Detailed feature comparison, pricing analysis, and expert
                  recommendations
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-First Responsive Comparison */}
        <div className="space-y-6">
          {/* Mobile View - Enhanced Stacked Cards */}
          <div className="lg:hidden space-y-4">
            {selectedServiceData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <Card
                  className={cn(
                    "relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2",
                    service.popular
                      ? "border-blue-500 shadow-lg bg-gradient-to-br from-blue-50/50 to-white"
                      : "border-slate-200 hover:border-blue-300"
                  )}
                >
                  {service.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                          {service.shortTitle}
                        </CardTitle>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      {service.popular && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-xs px-2 py-1 ml-3">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    {/* Enhanced Pricing Section */}
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">{service.price}</div>
                          <div className="text-sm text-slate-400 line-through">{service.originalPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-blue-500" />
                            {service.timeline}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Processing time</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                        Key Features
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs sm:text-sm"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <EnhancedCTAButton
                      href={`/services/${service.slug}`}
                      variant={service.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      popular={service.popular}
                    >
                      Get Started Now
                    </EnhancedCTAButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Desktop View - Side by Side Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div
                  className="grid gap-6 animate-in fade-in duration-700"
                  style={{
                    gridTemplateColumns: `250px repeat(${selectedServiceData.length}, 1fr)`,
                  }}
                >
                  {/* Header Row */}
                  <div className="font-semibold text-slate-700 p-4"></div>
                  {selectedServiceData.map((service, index) => (
                    <div
                      key={service.id}
                      className="animate-in slide-in-from-bottom duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Card
                        className={cn(
                          "relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl",
                          service.popular && "ring-2 ring-blue-500 shadow-xl"
                        )}
                      >
                        {service.popular && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        )}
                        <CardHeader className="text-center pb-4">
                          {service.popular && (
                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 border-0">
                              <Star className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                          )}
                          <CardTitle className="text-lg">
                            {service.shortTitle}
                          </CardTitle>
                          <p className="text-sm text-slate-600">
                            {service.description}
                          </p>
                          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">
                              {service.price}
                            </div>
                            <div className="text-sm text-slate-400 line-through">
                              {service.originalPrice}
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mt-1">
                              <Clock className="w-4 h-4" />
                              {service.timeline}
                            </div>
                          </div>
                          <EnhancedCTAButton
                            href={`/services/${service.slug}`}
                            variant={service.popular ? "primary" : "secondary"}
                            size="sm"
                            className="w-full mt-4"
                            popular={service.popular}
                          >
                            Get Started
                          </EnhancedCTAButton>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}

                  {/* Features Comparison */}
                  <div className="font-semibold text-slate-700 p-4 bg-slate-50 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Key Features
                  </div>
                  {selectedServiceData.map((service) => (
                    <Card key={`${service.id}-features`} className="p-4">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}

                  {/* Pros Comparison */}
                  <div className="font-semibold text-slate-700 p-4 bg-green-50 rounded-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Advantages
                  </div>
                  {selectedServiceData.map((service) => (
                    <Card key={`${service.id}-pros`} className="p-4">
                      <ul className="space-y-2">
                        {service.pros.map((pro, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-green-700"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}

                  {/* Cons Comparison */}
                  <div className="font-semibold text-slate-700 p-4 bg-orange-50 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Considerations
                  </div>
                  {selectedServiceData.map((service) => (
                    <Card key={`${service.id}-cons`} className="p-4">
                      <ul className="space-y-2">
                        {service.cons.map((con, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-orange-700"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}

                  {/* Ideal For Comparison */}
                  <div className="font-semibold text-slate-700 p-4 bg-blue-50 rounded-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Best For
                  </div>
                  {selectedServiceData.map((service) => (
                    <Card key={`${service.id}-ideal`} className="p-4">
                      <ul className="space-y-2">
                        {service.idealFor.map((ideal, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-blue-700"
                          >
                            <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            {ideal}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8 animate-in fade-in duration-500", className)}>
      {/* Enhanced Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl"></div>
        <div className="relative p-8 text-center">
          <div className="animate-in slide-in-from-top duration-500 delay-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Service Comparison Tool
              </h3>
            </div>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Select 2-{maxComparisons} services to compare features, pricing,
              and benefits side by side. Make informed decisions for your
              business needs.
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="company">Company Formation</option>
                  <option value="compliance">Regulatory Compliance</option>
                  <option value="registration">Business Registration</option>
                  <option value="legal">Legal Services</option>
                </select>
              </div>
            </div>

            {/* Filter Results & Selection Status */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {filteredServices.length} service
                  {filteredServices.length !== 1 ? "s" : ""} found
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-300",
                    selectedServices.length > 0
                      ? "bg-green-500"
                      : "bg-slate-300"
                  )}
                ></div>
                <span className="text-sm font-medium">
                  {selectedServices.length} of {maxComparisons} selected
                </span>
              </div>

              {selectedServices.length > 0 && (
                <div className="animate-in zoom-in duration-300">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedServices([])}
                    className="text-red-600 border-red-200 hover:bg-red-50 transition-all duration-200"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              )}

              {selectedServices.length >= 2 && (
                <div className="animate-in zoom-in duration-300 delay-100">
                  <Button
                    onClick={startComparison}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg transition-all duration-300"
                    disabled={isAnimating}
                  >
                    {isAnimating ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Compare Selected
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No services found
            </h3>
            <p className="text-slate-500 mb-4">
              Try adjusting your search terms or filter category to find the
              services you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Service Cards Grid */}
      {filteredServices.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            const isDisabled =
              !isSelected && selectedServices.length >= maxComparisons;

            return (
              <div
                key={service.id}
                className="animate-in slide-in-from-bottom duration-500 hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card
                  className={cn(
                    "relative h-full transition-all duration-300 cursor-pointer group overflow-hidden hover:shadow-xl",
                    isSelected &&
                      "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    !isDisabled &&
                      !isSelected &&
                      "hover:border-slate-300 hover:bg-gradient-to-br hover:from-slate-50 hover:to-gray-50",
                    service.popular && "border-yellow-300"
                  )}
                  onClick={() => !isDisabled && handleServiceToggle(service.id)}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={cn(
                          "transition-all duration-300",
                          isSelected && "scale-110"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          disabled={isDisabled}
                          className={cn(
                            "transition-all duration-300",
                            isSelected && "border-blue-500 bg-blue-500"
                          )}
                        />
                      </div>
                      {service.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-medium border-0">
                          <Award className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {service.shortTitle}
                    </CardTitle>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-green-600">
                          {service.price}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          {service.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        {service.timeline}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Key Features
                      </div>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-slate-600 animate-in slide-in-from-left duration-300"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-sm text-blue-600 font-medium">
                            +{service.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>

                  {/* Selection Overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none animate-in fade-in duration-300" />
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* No Results Message */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12 animate-in slide-in-from-bottom duration-500">
          <div className="p-6 bg-slate-50 rounded-2xl max-w-md mx-auto">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No services found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find the services
              you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="transition-all duration-200 hover:bg-slate-100"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
