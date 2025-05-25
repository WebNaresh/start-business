"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactMap() {
  const officeLocation = {
    address: "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004",
    coordinates: "18.5194,73.8370",
    googleMapsUrl: "https://maps.google.com/?q=18.5194,73.8370",
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Visit Our Office</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Located in the heart of Pune, our office is easily accessible and equipped with modern facilities for
            in-person consultations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2598522750845!2d73.83699!3d18.5194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4e32c379%3A0xc7a0a3b95ad3e2e!2sDeccan%20Gymkhana%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlay with office info */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">StartBusiness Office</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{officeLocation.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Office Location
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">{officeLocation.address}</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(officeLocation.googleMapsUrl, "_blank")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.coordinates}`, "_blank")}
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>

              {/* Nearby Landmarks */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Nearby Landmarks</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Behind Goodluck Café
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Near Deccan Gymkhana
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Close to FC Road
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Walking distance from Pune Station
                  </li>
                </ul>
              </div>

              {/* Parking Info */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Parking Available</h3>
                <p className="text-sm text-green-700">
                  Free parking space available for visitors. Please inform us in advance for reserved parking.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
