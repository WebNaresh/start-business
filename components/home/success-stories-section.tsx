"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Building2, 
  Award,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SuccessStoriesSection() {
  const [currentStory, setCurrentStory] = useState(0)

  const successStories = [
    {
      id: 1,
      companyName: "TechStart Solutions",
      founderName: "Rahul Sharma",
      location: "Bangalore",
      industry: "Technology",
      registrationType: "Private Limited",
      timeline: "12 days",
      image: "/testimonials/rahul-sharma.jpg", // You'll need to add these images
      story: "StartBusiness made our company registration incredibly smooth. Their team guided us through every step, and we were able to focus on building our product while they handled all the paperwork.",
      metrics: {
        timeToMarket: "3 months faster",
        fundingRaised: "₹50 lakhs",
        teamSize: "15 employees"
      },
      rating: 5,
      tags: ["Tech Startup", "Fast Growth", "Funding Success"]
    },
    {
      id: 2,
      companyName: "StyleHub Fashion",
      founderName: "Priya Patel",
      location: "Mumbai",
      industry: "Fashion & Retail",
      registrationType: "LLP",
      timeline: "8 days",
      image: "/testimonials/priya-patel.jpg",
      story: "The transparency in pricing and quick turnaround time impressed us. StartBusiness helped us choose LLP structure which was perfect for our fashion business partnership.",
      metrics: {
        timeToMarket: "2 months faster",
        revenue: "₹25 lakhs in Year 1",
        stores: "3 retail outlets"
      },
      rating: 5,
      tags: ["Fashion", "Partnership", "Retail Success"]
    },
    {
      id: 3,
      companyName: "Global Exports Ltd",
      founderName: "Vikram Singh",
      location: "Delhi",
      industry: "Import/Export",
      registrationType: "Private Limited",
      timeline: "10 days",
      image: "/testimonials/vikram-singh.jpg",
      story: "Excellent service for international business setup. Their expertise in export-import regulations saved us months of research and potential compliance issues.",
      metrics: {
        timeToMarket: "4 months faster",
        exports: "₹2 crores",
        countries: "12 countries"
      },
      rating: 5,
      tags: ["Export Business", "International", "Compliance"]
    }
  ]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const currentData = successStories[currentStory]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 mb-4">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Real Businesses, Real Success
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              See how entrepreneurs like you have successfully started and grown their businesses with our help
            </p>
          </div>

          {/* Main Story Card */}
          <div className="relative">
            <Card className="border-2 border-slate-200 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  
                  {/* Story Content */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    
                    {/* Company Info */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{currentData.companyName}</h3>
                          <p className="text-sm text-slate-600">{currentData.industry} • {currentData.location}</p>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentData.tags.map((tag, index) => (
                          <Badge key={index} className="bg-primary/10 text-primary text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-primary/20 mb-3" />
                      <blockquote className="text-lg text-slate-700 leading-relaxed italic">
                        "{currentData.story}"
                      </blockquote>
                    </div>

                    {/* Founder Info */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-700">
                          {currentData.founderName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{currentData.founderName}</p>
                        <p className="text-sm text-slate-600">Founder, {currentData.companyName}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(currentData.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Registration Details */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Registration Type</p>
                        <p className="font-semibold text-slate-900">{currentData.registrationType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Completion Time</p>
                        <p className="font-semibold text-slate-900">{currentData.timeline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics & CTA */}
                  <div className="bg-gradient-to-br from-primary/5 to-slate-50 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    
                    {/* Success Metrics */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Business Growth Metrics
                      </h4>
                      
                      <div className="space-y-4">
                        {Object.entries(currentData.metrics).map(([key, value], index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-sm text-slate-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-semibold text-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <Link href="/services/private-limited-company">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                          Start Your Success Story
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      
                      <Link href="/contact">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                          Talk to Our Expert
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStory}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Indicators */}
              <div className="flex gap-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStory ? 'bg-primary w-6' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextStory}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 sm:mt-12">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">1,000+</div>
              <div className="text-sm text-slate-600">Businesses Registered</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">₹500Cr+</div>
              <div className="text-sm text-slate-600">Funding Raised</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
              <div className="text-sm text-slate-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
