"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingUp, Receipt, Home, Car, PiggyBank, Building2, FileText } from "lucide-react"

interface RelatedCalculator {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  category: 'Tax' | 'Loan' | 'Financial'
}

const calculatorData: Record<string, RelatedCalculator[]> = {
  'income-tax': [
    {
      title: "Salary Calculator",
      description: "Calculate take-home salary and CTC breakdown",
      href: "/business-calculators/salary-calculator",
      icon: Calculator,
      category: 'Tax'
    },
    {
      title: "HRA Calculator",
      description: "Calculate house rent allowance exemption",
      href: "/business-calculators/hra-calculator",
      icon: Home,
      category: 'Tax'
    },
    {
      title: "TDS Calculator",
      description: "Calculate tax deducted at source",
      href: "/business-calculators/tds-calculator",
      icon: FileText,
      category: 'Tax'
    },
    {
      title: "PPF Calculator",
      description: "Calculate Public Provident Fund returns",
      href: "/business-calculators/ppf-calculator",
      icon: PiggyBank,
      category: 'Financial'
    }
  ],
  'gst': [
    {
      title: "Income Tax Calculator",
      description: "Calculate income tax liability for FY 2024-25",
      href: "/business-calculators/income-tax-calculator",
      icon: Calculator,
      category: 'Tax'
    },
    {
      title: "TDS Calculator",
      description: "Calculate tax deducted at source",
      href: "/business-calculators/tds-calculator",
      icon: FileText,
      category: 'Tax'
    },
    {
      title: "Business Loan Calculator",
      description: "Calculate business loan EMI and eligibility",
      href: "/business-calculators/business-loan-calculator",
      icon: Building2,
      category: 'Loan'
    }
  ],
  'emi': [
    {
      title: "Home Loan Calculator",
      description: "Calculate home loan EMI and eligibility",
      href: "/business-calculators/home-loan-calculator",
      icon: Home,
      category: 'Loan'
    },
    {
      title: "Car Loan Calculator",
      description: "Calculate car loan EMI and total cost",
      href: "/business-calculators/car-loan-calculator",
      icon: Car,
      category: 'Loan'
    },
    {
      title: "Business Loan Calculator",
      description: "Calculate business loan EMI and eligibility",
      href: "/business-calculators/business-loan-calculator",
      icon: Building2,
      category: 'Loan'
    }
  ],
  'salary': [
    {
      title: "Income Tax Calculator",
      description: "Calculate income tax liability for FY 2024-25",
      href: "/business-calculators/income-tax-calculator",
      icon: Calculator,
      category: 'Tax'
    },
    {
      title: "HRA Calculator",
      description: "Calculate house rent allowance exemption",
      href: "/business-calculators/hra-calculator",
      icon: Home,
      category: 'Tax'
    },
    {
      title: "Gratuity Calculator",
      description: "Calculate gratuity amount for employees",
      href: "/business-calculators/gratuity-calculator",
      icon: TrendingUp,
      category: 'Tax'
    },
    {
      title: "NPS Calculator",
      description: "Calculate National Pension System returns",
      href: "/business-calculators/nps-calculator",
      icon: PiggyBank,
      category: 'Financial'
    }
  ],
  'ppf': [
    {
      title: "NPS Calculator",
      description: "Calculate National Pension System returns",
      href: "/business-calculators/nps-calculator",
      icon: PiggyBank,
      category: 'Financial'
    },
    {
      title: "SIP Calculator",
      description: "Calculate SIP returns and investment growth",
      href: "/business-calculators/sip-calculator",
      icon: TrendingUp,
      category: 'Financial'
    },
    {
      title: "Income Tax Calculator",
      description: "Calculate income tax liability for FY 2024-25",
      href: "/business-calculators/income-tax-calculator",
      icon: Calculator,
      category: 'Tax'
    }
  ],
  'home-loan': [
    {
      title: "EMI Calculator",
      description: "Calculate loan EMI for any loan type",
      href: "/business-calculators/emi-calculator",
      icon: Calculator,
      category: 'Loan'
    },
    {
      title: "Income Tax Calculator",
      description: "Calculate tax benefits on home loan",
      href: "/business-calculators/income-tax-calculator",
      icon: Receipt,
      category: 'Tax'
    },
    {
      title: "Car Loan Calculator",
      description: "Calculate car loan EMI and total cost",
      href: "/business-calculators/car-loan-calculator",
      icon: Car,
      category: 'Loan'
    }
  ],
  'car-loan': [
    {
      title: "EMI Calculator",
      description: "Calculate loan EMI for any loan type",
      href: "/business-calculators/emi-calculator",
      icon: Calculator,
      category: 'Loan'
    },
    {
      title: "Home Loan Calculator",
      description: "Calculate home loan EMI and eligibility",
      href: "/business-calculators/home-loan-calculator",
      icon: Home,
      category: 'Loan'
    },
    {
      title: "Business Loan Calculator",
      description: "Calculate business loan EMI and eligibility",
      href: "/business-calculators/business-loan-calculator",
      icon: Building2,
      category: 'Loan'
    }
  ]
}

interface RelatedCalculatorsProps {
  currentCalculator: string
  className?: string
}

export default function RelatedCalculators({ currentCalculator, className = "" }: RelatedCalculatorsProps) {
  const relatedCalcs = calculatorData[currentCalculator] || []

  if (relatedCalcs.length === 0) return null

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Related Calculators</h2>
        <p className="text-slate-600">Explore more financial planning tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedCalcs.map((calc, index) => {
          const IconComponent = calc.icon
          return (
            <Link key={index} href={calc.href}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {calc.category}
                    </div>
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-900 leading-tight">
                    {calc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs text-slate-600 leading-relaxed">
                    {calc.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
