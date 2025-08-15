export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "StartBusiness",
    "url": "https://www.startbusiness.co.in",
    "logo": "https://www.startbusiness.co.in/logo.png",
    "description": "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café",
      "addressLocality": "Pune",
      "postalCode": "411004",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5204",
      "longitude": "73.8567"
    },
    "telephone": "+919699214195",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.facebook.com/startbusiness",
      "https://www.linkedin.com/company/startbusiness",
      "https://twitter.com/startbusiness"
    ],
    "areaServed": "IN",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Private Limited Registration",
            "description": "Most popular choice for startups and growing businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GST Registration",
            "description": "Faster GST registration with compliance guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trademark Registration",
            "description": "Protect your brand identity with our end-to-end trademark registration services"
          }
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 96992 14195",
      "contactType": "customer service",
      "contactOption": "TollFree",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Marathi"]
    },
 
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 