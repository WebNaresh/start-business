"use client"

import { MapPin, Navigation, ExternalLink, Car, Building2, Coffee, ShoppingBag, Utensils, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { nearbyLandmarks, parkingInfo } from "./contact-config"
import Head from "next/head"

export default function ContactMap() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const officeLocation = {
    address: "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004",
    coordinates: "18.5194,73.8370",
    googleMapsUrl: "https://maps.google.com/?q=18.5194,73.8370",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    postalCode: "411004",
    areaServed: "Pune Metropolitan Region",
    hasMap: "https://www.google.com/maps/place/Deccan+Gymkhana,+Pune,+Maharashtra",
  }

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "StartBusiness Office",
    "image": "/logo.png",
    "url": "https://startbusiness.com",
    "telephone": "+91-XXXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café",
      "addressLocality": officeLocation.city,
      "addressRegion": officeLocation.state,
      "postalCode": officeLocation.postalCode,
      "addressCountry": officeLocation.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5194",
      "longitude": "73.8370"
    },
    "areaServed": {
      "@type": "City",
      "name": officeLocation.areaServed
    },
    "hasMap": officeLocation.hasMap,
    "sameAs": [
      "https://www.facebook.com/startbusiness",
      "https://www.linkedin.com/company/startbusiness",
      "https://twitter.com/startbusiness"
    ]
  }

  return (
    <>
      <Head>
        <title>Visit Our Office | StartBusiness - Business Registration Services in Pune</title>
        <meta name="description" content="Visit our office in Pune for business registration services. Located in Deccan Gymkhana, easily accessible with parking facilities and nearby landmarks." />
        <meta name="keywords" content="business registration office, company registration Pune, Deccan Gymkhana, business services, corporate office Pune" />
        <meta property="og:title" content="Visit Our Office | StartBusiness - Pune" />
        <meta property="og:description" content="Visit our office in Pune for business registration services. Located in Deccan Gymkhana, easily accessible with parking facilities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://startbusiness.com/contact" />
        <meta property="og:image" content="/office-location.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Visit Our Office | StartBusiness - Pune" />
        <meta name="twitter:description" content="Visit our office in Pune for business registration services. Located in Deccan Gymkhana, easily accessible with parking facilities." />
        <meta name="twitter:image" content="/office-location.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-blue-50/30" aria-label="Office Location">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Office Location
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              Visit Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Office
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Located in the heart of Pune, our office is easily accessible and equipped with modern facilities for
              in-person consultations.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
              {/* Enhanced Map */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2598522750845!2d73.83699!3d18.5194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4e32c379%3A0xc7a0a3b95ad3e2e!2sDeccan%20Gymkhana%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin`}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]"
                    title="StartBusiness Office Location"
                    aria-label="Interactive map showing StartBusiness office location in Pune"
                  />

                  {/* Enhanced Overlay with office info */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg max-w-xs border border-white/20">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-800 mb-1 text-sm md:text-base">StartBusiness Office</h3>
                        <address className="text-xs md:text-sm text-slate-600 leading-relaxed not-italic">
                          Office No 7, 3rd Floor<br />
                          Saraswati Heights<br />
                          Deccan Gymkhana, Pune
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 md:mt-6">
                  <Button
                    onClick={() => window.open(officeLocation.googleMapsUrl, "_blank")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    aria-label="Get directions to our office"
                  >
                    <Navigation className="w-4 h-4 mr-2" aria-hidden="true" />
                    Get Directions
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.coordinates}`, "_blank")}
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                    aria-label="Open location in Google Maps"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                    Open in Maps
                  </Button>
                </div>
              </div>

              {/* Location Details */}
              <div className="lg:col-span-7 space-y-4">
                {/* Nearby Landmarks */}
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
                      <Navigation className="w-4 h-4 mr-2 text-green-600" aria-hidden="true" />
                      Nearby Landmarks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {nearbyLandmarks.map((landmark, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 bg-white/70 rounded-lg border border-green-100"
                        >
                          <div className="p-2 rounded-lg bg-green-100">
                            <landmark.icon className="w-4 h-4 text-green-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-slate-800">{landmark.name}</h3>
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                {landmark.distance}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{landmark.type}</p>
                            <p className="text-xs text-green-600 mt-1">{landmark.walkTime}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Parking Information */}
                <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
                      <Car className="w-4 h-4 mr-2 text-amber-600" aria-hidden="true" />
                      Parking Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {parkingInfo.map((info, index) => (
                        <div
                          key={index}
                          className="p-2 bg-white/70 rounded-lg border border-amber-100"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-slate-800">{info.type || info.name}</h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                info.availability === "Available"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {info.availability}
                            </Badge>
                          </div>
                          {info.distance && (
                            <p className="text-xs text-slate-600">Distance: {info.distance}</p>
                          )}
                          {info.cost && <p className="text-xs text-slate-600">Cost: {info.cost}</p>}
                          <p className="text-xs text-amber-600">{info.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
