"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Shield, 
  Lock, 
  Award, 
  CheckCircle, 
  Users, 
  FileCheck,
  Clock,
  Phone,
  Star,
  Building2,
  Gavel,
  Database
} from "lucide-react"

export default function TrustSecuritySection() {
  const trustFactors = [
    {
      icon: Shield,
      title: "100% Secure Process",
      description: "Bank-grade security with SSL encryption for all your sensitive documents and data",
      features: ["256-bit SSL encryption", "Secure document upload", "GDPR compliant"]
    },
    {
      icon: Award,
      title: "Government Approved",
      description: "Authorized by Ministry of Corporate Affairs and recognized by all regulatory bodies",
      features: ["MCA authorized", "ISO certified", "Legal compliance guaranteed"]
    },
    {
      icon: Users,
      title: "Expert CA Team",
      description: "Qualified Chartered Accountants and legal experts with 10+ years experience",
      features: ["CA qualified team", "Legal expertise", "24/7 support available"]
    },
    {
      icon: FileCheck,
      title: "Document Safety",
      description: "Your documents are stored securely and accessible only to authorized personnel",
      features: ["Secure cloud storage", "Access controls", "Regular backups"]
    }
  ]

  const certifications = [
    {
      icon: Building2,
      title: "MCA Authorized",
      description: "Ministry of Corporate Affairs"
    },
    {
      icon: Gavel,
      title: "Legal Compliance",
      description: "100% Regulatory Compliant"
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "GDPR & Privacy Compliant"
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "ISO 9001:2015 Certified"
    }
  ]

  const securityFeatures = [
    "End-to-end encryption for all communications",
    "Multi-factor authentication for account access",
    "Regular security audits and compliance checks",
    "Secure document management system",
    "Privacy-first approach to data handling",
    "Compliance with Indian data protection laws"
  ]

  const trustMetrics = [
    { value: "1,000+", label: "Businesses Registered", icon: Building2 },
    { value: "99.9%", label: "Uptime Guarantee", icon: Clock },
    { value: "4.9/5", label: "Customer Rating", icon: Star },
    { value: "24/7", label: "Expert Support", icon: Phone }
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Trust & Security
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Your Business Data is Safe with Us
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              We prioritize security, compliance, and transparency in everything we do. 
              Your trust is our foundation.
            </p>
          </div>

          {/* Trust Factors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trustFactors.map((factor, index) => (
              <Card key={index} className="border-2 border-slate-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <factor.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{factor.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{factor.description}</p>
                  
                  <div className="space-y-1">
                    {factor.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Features */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Security List */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Advanced Security Features
              </h3>
              
              <div className="space-y-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications & Compliance
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-slate-200 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <cert.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{cert.title}</h4>
                    <p className="text-xs text-slate-600">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Trusted by Thousands of Entrepreneurs
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Promise */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl border border-primary/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Our Security Promise</h3>
              <p className="text-sm text-slate-600 mb-4">
                We guarantee the highest level of security for your business data. Our systems are regularly 
                audited and we maintain strict compliance with all applicable regulations.
              </p>
              <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-green-600" />
                  <span>Encrypted Storage</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-green-600" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
