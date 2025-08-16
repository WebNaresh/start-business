// Calculator SEO Configuration
// High-traffic keywords and optimized content for financial calculators

export interface CalculatorSEOConfig {
    slug: string
    title: string
    description: string
    keywords: string[]
    category: 'Tax' | 'Loan' | 'Financial'
    priority: number
    relatedCalculators: string[]
    faqs: Array<{
        question: string
        answer: string
    }>
    features: string[]
    metaTitle: string
    metaDescription: string
}

export const calculatorSEOConfigs: Record<string, CalculatorSEOConfig> = {
    'ppf-calculator': {
        slug: 'ppf-calculator',
        title: 'PPF Calculator',
        metaTitle: 'Free PPF Calculator Online India 2024 | Calculate PPF Maturity Amount Interest',
        description: 'Calculate PPF maturity amount with our free online PPF calculator. Get accurate PPF returns, interest calculations, and investment planning for Public Provident Fund.',
        metaDescription: 'Free PPF Calculator India 2024. Calculate Public Provident Fund maturity amount, interest rate, returns. 15-year PPF investment planning with accurate calculations.',
        keywords: [
            'ppf calculator online',
            'free ppf calculator',
            'ppf calculator india',
            'public provident fund calculator',
            'ppf maturity calculator',
            'ppf interest calculator',
            'ppf investment calculator',
            'ppf return calculator',
            'ppf amount calculator',
            'ppf calculater',
            'ppf online calculator',
            'ppf compound interest calculator',
            'ppf calculator for 15 years',
            'post office ppf calculator',
            'ppf monthly calculator',
            'ppf calculator with existing balance',
            'ppf tax calculator',
            'ppf benefits calculator',
            'ppf rate calculator',
            'ppf value calculator',
            'ppf calculation formula',
            'calculate ppf',
            'calculate ppf',
            'ppf calculators',
            'ppf returns calculator',
            'postal ppf calculator',
            'ppf tax calculator',
            'ppf calculatir',
            'ppfcalculator',
            'ppf. calculator',
            'calculator for ppf',
            'calculation of ppf',
            'calculator ppf',
            'ppf calculate',
            'ppf. calculator',
            'ppf rate of interest calculator',
            'ppf calculator for 20 years',
            'ppf rate calculator',
            'ppf calculator interest rate',
            '15 year ppf calculator'
        ],
        category: 'Financial',
        priority: 1,
        relatedCalculators: ['sip-calculator', 'fixed-deposit-calculator', 'retirement-corpus-calculator'],
        features: [
            'Calculate PPF maturity amount for 15 years',
            'Annual contribution planning',
            'Interest rate calculations',
            'Year-wise breakdown',
            'Tax benefit calculations',
            'Withdrawal options after 15 years'
        ],
        faqs: [
            {
                question: 'How is PPF interest calculated?',
                answer: 'PPF interest is calculated monthly on the minimum balance between 5th and last day of the month. The current PPF interest rate is 7.1% per annum, compounded annually.'
            },
            {
                question: 'What is the maximum PPF contribution per year?',
                answer: 'The maximum PPF contribution is ₹1,50,000 per financial year. The minimum contribution is ₹500 per year.'
            },
            {
                question: 'When does PPF mature?',
                answer: 'PPF account matures after 15 years from the end of the financial year in which the account was opened. You can extend it in blocks of 5 years.'
            },
            {
                question: 'Is PPF tax-free?',
                answer: 'Yes, PPF offers triple tax benefits - investment is tax-deductible under Section 80C, interest earned is tax-free, and maturity amount is completely tax-free.'
            }
        ]
    },

    'gst-calculator': {
        slug: 'gst-calculator',
        title: 'GST Calculator',
        metaTitle: 'GST Calculator Online - Calculate GST Amount, Tax & Interest | StartBusiness',
        description: 'Free online GST calculator to calculate GST amount, inclusive/exclusive tax, interest, and penalties. Supports all GST rates - 5%, 12%, 18%, 28%.',
        metaDescription: 'Calculate GST tax amount with our free online GST calculator. Get GST inclusive/exclusive calculations, interest, penalties for all tax slabs. Easy & accurate!',
        keywords: [
            'gst calculator',
            'gst tax calculator',
            'gst calculator online',
            'gst calculator india',
            'calculate gst',
            'gst amount calculator',
            'gst interest calculator',
            'gst late fee calculator',
            'gst penalty calculator',
            'gst and tax calculator',
            'gst rate calculator',
            'gst inclusive calculator',
            'gst deduction calculator',
            'gst percentage calculator',
            'gst calculator maharashtra',
            'indian gst calculator',
            'india gst calculator',
            'gst india calculator',
            'indian gst calculator online',
            'gst calculator in india',
            'calculate gst online',
            'calculate gst india',
            'calculate gst tax',
            'gst tax calculation',
            'gst online calculator india',
            'gst calculator tax',
            'gst and cgst calculator',
            'gst on calculator',
            'gst portal calculator',
            'gst registration calculator',
            'gst itc calculator',
            'gst late filing fees calculator',
            'gst late filing fee calculator',
            'goods and services tax calculator',
            'gst conversion calculator',
            'gst cal',
            'gst converter',
            'gst tax calculator india',
            'gst online calculator',
            'business gst calculator',
            'gst liabilities payable calculator',
            'gst adjustment calculator',
            'cgst calculation',
            'cgst and sgst calculator',
            'sgst and cgst calculator',
            'gst and tds calculator',
            'gst tax credit calculator'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['income-tax-calculator', 'tds-calculator', 'gstr-3b-interest-calculator'],
        features: [
            'Calculate GST for all tax slabs (5%, 12%, 18%, 28%)',
            'GST inclusive and exclusive calculations',
            'CGST, SGST, IGST breakdown',
            'Interest and penalty calculations',
            'Bulk calculation support',
            'Export results to PDF/Excel'
        ],
        faqs: [
            {
                question: 'How to calculate GST amount?',
                answer: 'GST amount = (Original Amount × GST Rate) / 100. For inclusive GST: GST Amount = (Total Amount × GST Rate) / (100 + GST Rate)'
            },
            {
                question: 'What are the current GST rates in India?',
                answer: 'GST rates in India are 0%, 5%, 12%, 18%, and 28%. Essential items are at 0%, while luxury items attract 28% GST.'
            },
            {
                question: 'How is GST interest calculated?',
                answer: 'GST interest is calculated at 18% per annum on the outstanding tax amount from the due date until payment. Interest is calculated on a daily basis.'
            },
            {
                question: 'What is the difference between CGST, SGST, and IGST?',
                answer: 'CGST is Central GST, SGST is State GST (both applicable for intra-state transactions), and IGST is Integrated GST (applicable for inter-state transactions).'
            }
        ]
    },

    'hra-calculator': {
        slug: 'hra-calculator',
        title: 'HRA Calculator',
        metaTitle: 'HRA Calculator Online - Calculate House Rent Allowance Tax Exemption | StartBusiness',
        description: 'Calculate HRA tax exemption with our free online HRA calculator. Get accurate HRA calculations, rent receipts, and tax savings for salaried employees.',
        metaDescription: 'Free HRA Calculator to calculate House Rent Allowance tax exemption. Generate rent receipts, calculate HRA deduction, and maximize tax savings. Try now!',
        keywords: [
            'hra calculator',
            'hra calculator online',
            'hra calculator income tax',
            'hra calculator for income tax',
            'hra calculator india',
            'hra calculator monthly',
            'house rent allowance calculator',
            'hra calculation',
            'hra calculation for income tax',
            'hra calculation online',
            'hra calculation india',
            'hra calculation in india',
            'calculate hra',
            'calculate hra exemption',
            'how to calculate hra',
            'how to calculate hra exemption',
            'how to calculate house rent allowance',
            'hra exemption calculator',
            'hra tax calculator',
            'hra income tax calculator',
            'hra tax exemption calculator',
            'hra rebate calculation',
            'hra deduction calculation',
            'hra caculator',
            'hra calc',
            'calculate my hra',
            'hra calculations',
            'hra computation',
            'basic hra calculation',
            'hra exemption calculation',
            'calculation of hra',
            'basic and hra calculation',
            'calculation of hra exemption',
            'hra calculation income tax',
            'income tax hra calculator',
            'hra tax calculation',
            'taxable hra calculation',
            'house rent calculation in income tax',
            'how to calculate hra rebate',
            'how to calculate hra deduction',
            'how to calculate hra for income tax',
            'how to calculate hra tax exemption'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['income-tax-calculator', 'salary-calculator', 'hra-rent-receipt-calculator'],
        features: [
            'Calculate HRA tax exemption accurately',
            'Monthly and annual HRA calculations',
            'Metro and non-metro city rates',
            'Rent receipt generation',
            'Tax saving recommendations',
            'Detailed breakdown of calculations'
        ],
        faqs: [
            {
                question: 'How is HRA exemption calculated?',
                answer: 'HRA exemption is the minimum of: 1) Actual HRA received, 2) 50% of salary (metro) or 40% (non-metro), 3) Actual rent paid minus 10% of salary.'
            },
            {
                question: 'What documents are required for HRA claim?',
                answer: 'You need rent receipts, rental agreement, landlord\'s PAN (if rent > ₹1 lakh/year), and Form 12BB declaration to your employer.'
            },
            {
                question: 'Can I claim HRA if I live in my own house?',
                answer: 'No, you cannot claim HRA exemption if you live in your own house. HRA is only for rented accommodation.'
            },
            {
                question: 'What is the difference between metro and non-metro HRA rates?',
                answer: 'Metro cities (Delhi, Mumbai, Chennai, Kolkata) allow 50% of salary as HRA exemption, while non-metro cities allow 40% of salary.'
            }
        ]
    },

    'income-tax-calculator': {
        slug: 'income-tax-calculator',
        title: 'Income Tax Calculator',
        metaTitle: 'Income Tax Calculator 2024-25 - Calculate Tax Online | StartBusiness',
        description: 'Calculate income tax for FY 2024-25 with our free online calculator. Compare old vs new tax regime, get accurate tax calculations and planning advice.',
        metaDescription: 'Free Income Tax Calculator for AY 2024-25. Calculate tax liability, compare old vs new regime, get deductions under 80C, 80D. Accurate & updated!',
        keywords: [
            'income tax calculator',
            'income tax calculator india',
            'income tax calculator ay 2024 25',
            'tax calculator',
            'tax calculator india',
            'tax calculator 2024 25',
            'tax calculator 2024 new regime',
            'indian income tax calculator',
            'india income tax calculator',
            'indian tax calculator',
            'india tax calculator',
            'calculate income tax india',
            'income tax india calculator',
            'income tax calculator income tax india',
            'indian tax calculator 2024',
            'tax calculator ay 2024 25',
            'income tax calculator for 2024',
            'tax calculator for ay 2024 25',
            'income tax calculator ay 2024 25 business',
            'tax calculator tool',
            'tax estimator calculator 2024',
            'calculate income',
            'india calculate income tax',
            'income tax calculator - india',
            'tax calculator for partnership firm',
            'partnership firm income tax calculator',
            'income tax calculator for partnership firm',
            'partnership income tax calculator',
            'tax calculator for private limited company',
            'private limited company tax calculator',
            'limited company tax calculator',
            'corporate tax calculator india',
            'company tax calculator india',
            'sole proprietorship tax calculator',
            'llp income tax calculator',
            'income tax calculator for business'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['hra-calculator', 'salary-calculator', 'tds-calculator'],
        features: [
            'Calculate tax for FY 2024-25',
            'Compare old vs new tax regime',
            'All deductions under 80C, 80D, etc.',
            'Cess and surcharge calculations',
            'Tax planning recommendations',
            'Detailed tax breakdown'
        ],
        faqs: [
            {
                question: 'What is the basic exemption limit for income tax?',
                answer: 'For FY 2024-25, the basic exemption limit is ₹2.5 lakh for individuals below 60 years, ₹3 lakh for senior citizens (60-80 years), and ₹5 lakh for super senior citizens (above 80 years).'
            },
            {
                question: 'Should I choose old or new tax regime?',
                answer: 'Choose old regime if your deductions exceed ₹50,000-75,000. New regime offers lower rates but fewer deductions. Use our calculator to compare both.'
            },
            {
                question: 'What are the tax slabs for FY 2024-25?',
                answer: 'New regime: 0% up to ₹3L, 5% (₹3-6L), 10% (₹6-9L), 15% (₹9-12L), 20% (₹12-15L), 30% (above ₹15L). Old regime has different slabs with more deductions.'
            },
            {
                question: 'How is income tax calculated?',
                answer: 'Income tax is calculated on total taxable income after deductions. Tax is computed as per applicable slabs, then cess (4%) and surcharge (if applicable) are added.'
            }
        ]
    },

    'car-loan-calculator': {
        slug: 'car-loan-calculator',
        title: 'Car Loan Calculator',
        metaTitle: 'Car Loan EMI Calculator - Calculate Car Loan EMI & Eligibility | StartBusiness',
        description: 'Calculate car loan EMI, eligibility, and total interest with our free car loan calculator. Compare offers from top banks and get the best car loan deals.',
        metaDescription: 'Free Car Loan Calculator to calculate EMI, eligibility, interest rates. Compare car loans from top banks, get accurate calculations. Apply now!',
        keywords: [
            'car loan calculator',
            'car loan calculator india',
            'car loan emi calculator',
            'car loan emi calculator india',
            'car loan eligibility calculator',
            'car loan eligibility calculator india',
            'auto loan calculator india',
            'vehicle loan calculator india',
            'car finance calculator india',
            'india car loan calculator',
            'loan calculator car india',
            'car loans calculator india',
            'car emi calculator india',
            'car emi calculator',
            'car loan emi',
            'calculate car loan eligibility',
            'car eligibility calculator',
            'car loan emi eligibility calculator',
            'car calculator price',
            'auto loan calculator free',
            'free car finance calculator',
            'car loan calculator with tax',
            'car loan tax calculator',
            'car loan calculator with taxes',
            'loan calculator with taxes',
            'calculating net salary',
            'secured car loan calculator'
        ],
        category: 'Loan',
        priority: 1,
        relatedCalculators: ['emi-calculator', 'home-loan-calculator', 'business-loan-calculator'],
        features: [
            'Calculate car loan EMI accurately',
            'Check loan eligibility instantly',
            'Compare interest rates from banks',
            'Include insurance and processing fees',
            'Amortization schedule',
            'Tax benefits on car loans'
        ],
        faqs: [
            {
                question: 'What is the current car loan interest rate?',
                answer: 'Car loan interest rates range from 7.5% to 15% per annum depending on the lender, loan amount, tenure, and your credit profile.'
            },
            {
                question: 'What is the maximum car loan tenure?',
                answer: 'Most banks offer car loans for up to 7 years (84 months). However, longer tenure means higher total interest payment.'
            },
            {
                question: 'How much car loan can I get on my salary?',
                answer: 'Generally, your car loan EMI should not exceed 15-20% of your monthly income. Banks consider your income, existing EMIs, and credit score for eligibility.'
            },
            {
                question: 'What documents are required for car loan?',
                answer: 'You need income proof, identity proof, address proof, bank statements, car quotation, and insurance documents for car loan application.'
            }
        ]
    },

    'emi-calculator': {
        slug: 'emi-calculator',
        title: 'EMI Calculator',
        metaTitle: 'EMI Calculator Online - Calculate Loan EMI & Interest | StartBusiness',
        description: 'Calculate loan EMI for home, car, personal loans with our free EMI calculator. Get detailed amortization schedule and compare loan offers.',
        metaDescription: 'Free EMI Calculator to calculate monthly installments for any loan. Get accurate EMI, interest, amortization schedule. Compare loans easily!',
        keywords: [
            'emi calculator',
            'loan calculator',
            'emi calculator online',
            'calculate emi',
            'loan emi calculator',
            'monthly emi calculator',
            'home loan emi calculator',
            'personal loan emi calculator',
            'business loan emi calculator',
            'loan calculator india',
            'emi calculation',
            'equated monthly installment calculator',
            'loan interest calculator',
            'amortization calculator'
        ],
        category: 'Loan',
        priority: 1,
        relatedCalculators: ['home-loan-calculator', 'car-loan-calculator', 'business-loan-calculator'],
        features: [
            'Calculate EMI for any loan type',
            'Detailed amortization schedule',
            'Principal vs interest breakdown',
            'Compare different loan scenarios',
            'Prepayment impact analysis',
            'Export calculations to PDF'
        ],
        faqs: [
            {
                question: 'How is EMI calculated?',
                answer: 'EMI = [P × R × (1+R)^N] / [(1+R)^N-1], where P is principal, R is monthly interest rate, and N is number of months.'
            },
            {
                question: 'What factors affect EMI amount?',
                answer: 'EMI depends on loan amount (principal), interest rate, and loan tenure. Higher principal or interest rate increases EMI, while longer tenure reduces EMI.'
            },
            {
                question: 'Should I choose longer or shorter loan tenure?',
                answer: 'Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. Choose based on your repayment capacity.'
            },
            {
                question: 'Can I prepay my loan to reduce EMI?',
                answer: 'Yes, prepayment reduces the outstanding principal, which can either reduce your EMI amount or loan tenure, depending on your lender\'s policy.'
            }
        ]
    },

    'salary-calculator': {
        slug: 'salary-calculator',
        title: 'Salary Calculator',
        metaTitle: 'Salary Calculator - Calculate Take Home Salary & CTC | StartBusiness',
        description: 'Calculate your take-home salary, CTC breakdown, and tax deductions with our free salary calculator. Get accurate net salary calculations.',
        metaDescription: 'Free Salary Calculator to calculate take-home pay, CTC breakdown, tax deductions. Get accurate net salary, gross salary calculations. Try now!',
        keywords: [
            'salary calculator',
            'salary calculator india',
            'take home salary calculator',
            'take home salary calculator india',
            'net salary calculator',
            'gross salary calculator',
            'ctc calculator',
            'payroll calculator',
            'salary breakdown calculator',
            'take home pay calculator',
            'salary calculation',
            'net pay calculator',
            'gross to net calculator',
            'ctc to net salary calculator',
            'salary calculator take home',
            'salary calculator take home pay',
            'take home calculator',
            'take home calculator india',
            'take home pay calculator india',
            'take home pay calculator in india',
            'calculate take home salary in india',
            'calculate take home pay',
            'calculate take home pay india',
            'take home salary calculation',
            'take home salary calculation india',
            'take home wage calculator',
            'take home pay cal',
            'take home pay',
            'takehome calc',
            'take-home salary calculator india',
            'paycheck calculator',
            'paycheck tax calculator',
            'paycheck deduction calculator',
            'payroll tax calculator',
            'net wages calculator',
            'free salary calculator',
            'salary pay calculator',
            'pay take home calculator',
            'net calculator salary',
            'calculating net salary',
            'net salary calculation',
            'net salary calculator india',
            'net salary calculator in india',
            'net salary estimator',
            'calculate net salary',
            'gross pay calculator',
            'gross income calculator',
            'gross salary calculator india',
            'calculate gross salary',
            'gross to net salary',
            'gross to net salary calculator india',
            'income gross calculator',
            'calculator gross income',
            'total pay calculator',
            'ctc take home calculator',
            'ctc tax calculator',
            'salary calculator new tax regime',
            'salary calculator pune',
            'how to calculate salary',
            'salary calculation in india',
            'salary calculation tool',
            'calculate salary',
            'calculate salary in india',
            'salary calculator india online',
            'india salary calculator',
            'indian salary calculator',
            'salary calculator for india',
            'salary breakdown calculator india',
            'employer tax calculator',
            'inhand salary calculator'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['income-tax-calculator', 'hra-calculator', 'tds-calculator'],
        features: [
            'Calculate take-home salary accurately',
            'CTC to net salary conversion',
            'Tax deductions breakdown',
            'PF, ESI, and other deductions',
            'Compare old vs new tax regime',
            'Monthly and annual calculations'
        ],
        faqs: [
            {
                question: 'How is take-home salary calculated?',
                answer: 'Take-home salary = Gross salary - (Income tax + PF + ESI + Professional tax + Other deductions). It\'s the amount you receive in your bank account.'
            },
            {
                question: 'What is the difference between CTC and take-home salary?',
                answer: 'CTC (Cost to Company) includes all benefits and allowances. Take-home salary is what you receive after all deductions including taxes, PF, and other statutory deductions.'
            },
            {
                question: 'How much tax is deducted from salary?',
                answer: 'Tax deduction depends on your total income, chosen tax regime, and claimed deductions. Use our calculator to get accurate tax calculations based on current slabs.'
            },
            {
                question: 'What deductions are made from salary?',
                answer: 'Common deductions include Income Tax (TDS), Provident Fund (12% of basic), ESI (0.75% if salary < ₹21,000), Professional Tax (varies by state), and other voluntary deductions.'
            }
        ]
    },

    'tds-calculator': {
        slug: 'tds-calculator',
        title: 'TDS Calculator',
        metaTitle: 'TDS Calculator Online - Calculate Tax Deducted at Source | StartBusiness',
        description: 'Calculate TDS on salary, FD, property, and other income with our free TDS calculator. Get accurate TDS rates and deduction amounts.',
        metaDescription: 'Free TDS Calculator for salary, fixed deposits, rent, professional fees. Calculate Tax Deducted at Source with current rates. Accurate & updated!',
        keywords: [
            'tds calculator',
            'tds calculator online',
            'tds calculation',
            'tds calculations',
            'calculate tds',
            'calculate tds online',
            'tds computation',
            'tds formula',
            'tds on fd calculator',
            'tds calculator on fd',
            'tds on fixed deposit calculator',
            'tds on fd interest calculator',
            'fd tds calculator',
            'fixed deposit tds calculator',
            'tds calculator on fd interest',
            'fd calculator with tds',
            'fd calculator with tds deduction',
            'tds on fixed deposit interest calculator',
            'tax on fixed deposit calculator',
            'fixed deposit tax calculator',
            'tds return calculator',
            'tds payment calculator',
            'calculate tds on salary online',
            'tds calculator on salary online'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['income-tax-calculator', 'salary-calculator', 'gst-calculator'],
        features: [
            'Calculate TDS for all income types',
            'Current TDS rates and thresholds',
            'TDS on salary, FD, rent, professional fees',
            'Form 16A generation',
            'TDS refund calculations',
            'Quarterly TDS planning'
        ],
        faqs: [
            {
                question: 'What is TDS and when is it applicable?',
                answer: 'TDS (Tax Deducted at Source) is tax collected at the time of payment. It applies when payments exceed specified thresholds - salary, rent (₹2.4L), FD interest (₹40K), etc.'
            },
            {
                question: 'What is the TDS rate on fixed deposits?',
                answer: 'TDS on FD interest is 10% if interest exceeds ₹40,000 per year. If PAN is not provided, TDS is deducted at 20%.'
            },
            {
                question: 'How to claim TDS refund?',
                answer: 'If TDS deducted is more than your actual tax liability, you can claim refund by filing ITR. The excess amount will be refunded after processing.'
            },
            {
                question: 'What is TDS on salary?',
                answer: 'TDS on salary is deducted based on your projected annual income and tax liability. Employer deducts tax monthly and deposits with the government.'
            }
        ]
    },

    'gratuity-calculator': {
        slug: 'gratuity-calculator',
        title: 'Gratuity Calculator',
        metaTitle: 'Gratuity Calculator Online - Calculate Gratuity Amount | StartBusiness',
        description: 'Calculate gratuity amount for private and government employees with our free gratuity calculator. Get accurate gratuity calculations based on salary and service years.',
        metaDescription: 'Free Gratuity Calculator to calculate gratuity amount for private & government employees. Get accurate calculations based on latest rules. Try now!',
        keywords: [
            'gratuity calculator',
            'gratuity calculator india',
            'gratuity calculator pune',
            'gratuity calculator delhi',
            'calculate gratuity',
            'gratuity calculation',
            'gratuity calculation for private company',
            'gratuity calculation for private employees',
            'gratuity calculation for private sector employees',
            'how to calculate gratuity for private sector employees',
            'how to calculate gratuity amount',
            'how to check gratuity amount',
            'company gratuity calculator',
            'government gratuity calculator',
            'india gratuity calculator',
            'tax on gratuity calculator',
            'nps gratuity calculator'
        ],
        category: 'Tax',
        priority: 1,
        relatedCalculators: ['salary-calculator', 'income-tax-calculator', 'tds-calculator'],
        features: [
            'Calculate gratuity for private employees',
            'Government employee gratuity calculation',
            'Tax implications on gratuity',
            'Service period calculations',
            'Gratuity eligibility check',
            'Detailed calculation breakdown'
        ],
        faqs: [
            {
                question: 'How is gratuity calculated for private employees?',
                answer: 'Gratuity = (Last drawn salary × 15 × Years of service) / 26. Maximum gratuity amount is ₹20 lakhs. Minimum 5 years of service is required.'
            },
            {
                question: 'What is the eligibility for gratuity?',
                answer: 'Employee must complete minimum 5 years of continuous service. In case of death or disability, this condition is waived.'
            },
            {
                question: 'Is gratuity taxable?',
                answer: 'Gratuity up to ₹20 lakhs is tax-free for private employees. For government employees, entire gratuity is tax-free. Excess amount is taxable.'
            },
            {
                question: 'When is gratuity paid?',
                answer: 'Gratuity is paid at retirement, resignation (after 5 years), death, or disability. It must be paid within 30 days of becoming due.'
            }
        ]
    }
}

// High-traffic keyword mapping for landing pages
export const keywordLandingPages = {
    'start business': '/services/company-registration',
    'company registration': '/services/company-registration',
    'business registration': '/services/business-registration',
    'startup registration': '/services/startup-registration',
    'private limited company registration': '/services/private-limited-company',
    'llp registration': '/services/llp-registration',
    'gst registration': '/services/gst-registration',
    'trademark registration': '/services/trademark-registration',
    'fssai registration': '/services/fssai-license',
    'msme registration': '/services/msme-registration',
    'ngo registration': '/services/ngo-registration',
    'best ca firm': '/about',
    'ca firm pune': '/about',
    'business consultant': '/services',
    'compliance services': '/services/compliance'
}

// Generate sitemap entries for all calculators
export function generateCalculatorSitemapEntries() {
    return Object.values(calculatorSEOConfigs).map(config => ({
        url: `https://www.startbusiness.co.in/business-calculators/${config.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: config.priority === 1 ? 0.9 : 0.8,
        images: [`https://www.startbusiness.co.in/calculator-${config.slug}.png`]
    }))
}