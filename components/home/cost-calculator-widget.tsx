"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calculator, 
  Building2, 
  Users, 
  Briefcase, 
  ArrowRight, 
  CheckCircle,
  IndianRupee,
  Clock,
  Shield
} from "lucide-react"
import Link from "next/link"

export default function CostCalculatorWidget() {
  const [selectedType, setSelectedType] = useState<string>("private-limited")

  const businessTypes = [
    {
      id: "sole-proprietorship",
      name: "Sole Proprietorship",
      icon: Briefcase,
      cost: "₹2,999",
      originalCost: "₹4,999",
      timeline: "3-5 days",
      features: ["Lowest cost", "Simple process", "Individual ownership"],
      popular: false
    },
    {
      id: "private-limited",
      name: "Private Limited",
      icon: Building2,
      cost: "₹12,000",
      originalCost: "₹15,000",
      timeline: "7-15 days",
      features: ["Limited liability", "Professional credibility", "Easy funding"],
      popular: true
    },
    {
      id: "llp",
      name: "LLP",
      icon: Users,
      cost: "₹8,000",
      originalCost: "₹12,000",
      timeline: "10-15 days",
      features: ["Partnership benefits", "Limited liability", "Tax advantages"],
      popular: false
    }
  ]

  const selectedBusiness = businessTypes.find(type => type.id === selectedType)

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Cost Calculator
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Calculate Your Business Registration Cost
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Get instant pricing for your business registration with transparent, all-inclusive costs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Business Type Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Business Type:</h3>
              <div className="space-y-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-slate-200 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedType === type.id ? 'bg-primary/10' : 'bg-slate-100'}`}>
                          <type.icon className={`w-5 h-5 ${selectedType === type.id ? 'text-primary' : 'text-slate-600'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{type.name}</span>
                            {type.popular && (
                              <Badge className="bg-primary/10 text-primary text-xs px-2 py-0.5">
                                Most Popular
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-600 mt-1">
                            Starting from {type.cost}
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedType === type.id 
                          ? 'border-primary bg-primary' 
                          : 'border-slate-300'
                      }`}>
                        {selectedType === type.id && (
                          <CheckCircle className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            {selectedBusiness && (
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-3">
                    <selectedBusiness.icon className="w-6 h-6 text-primary" />
                    {selectedBusiness.name} Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-primary">{selectedBusiness.cost}</span>
                      <span className="text-lg text-slate-400 line-through">{selectedBusiness.originalCost}</span>
                      <Badge className="bg-green-100 text-green-700">
                        Save ₹{parseInt(selectedBusiness.originalCost.replace('₹', '').replace(',', '')) - parseInt(selectedBusiness.cost.replace('₹', '').replace(',', ''))}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">All-inclusive pricing with government fees</p>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-slate-900">Timeline: {selectedBusiness.timeline}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">What's Included:</h4>
                    <div className="space-y-2">
                      {selectedBusiness.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link href={`/services/${selectedType}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        Start Registration - {selectedBusiness.cost}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    
                    <div className="flex gap-2">
                      <Link href="/business-structure-quiz" className="flex-1">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                          Take Quiz
                        </Button>
                      </Link>
                      <Link href="/contact" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Get Expert Help
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-green-600" />
                        <span>100% Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>CA Verified</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-green-600" />
                        <span>Quick Process</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
