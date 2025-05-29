"use client"

import { motion } from "framer-motion"
import {
  Clock,
  MapPin,
  Car,
  Building2,
  Coffee,
  ShoppingBag,
  Utensils,
  Navigation,
  Phone,
  CheckCircle,
  AlertCircle,
  Timer,
  Train,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function ContactLocationInfo() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const isBusinessOpen = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    if (day === 0 || day === 6) return false // Saturday and Sunday closed
    return hour >= 10 && hour < 19 // Monday-Friday 10-7
  }

  const getNextOpenTime = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    if (day === 0) return "Monday 10:00 AM" // Sunday
    if (day === 6) return "Monday 10:00 AM" // Saturday
    if (hour >= 19) return "Tomorrow 10:00 AM" // After hours
    if (hour < 10) return "Today 10:00 AM" // Before hours
    return null
  }

  const businessHours = [
    {
      day: "Monday - Friday",
      hours: "10:00 AM - 7:00 PM",
      isToday: [1, 2, 3, 4, 5].includes(new Date().getDay()),
      status: "open",
    },
    {
      day: "Saturday",
      hours: "Closed",
      isToday: new Date().getDay() === 6,
      status: "closed",
    },
    {
      day: "Sunday",
      hours: "Closed",
      isToday: new Date().getDay() === 0,
      status: "closed",
    },
  ]

  const nearbyLandmarks = [
    {
      name: "Pune Metro Station",
      distance: "500m",
      icon: Train,
      type: "Public Transport",
      walkTime: "6 min walk",
    },
    {
      name: "Goodluck Café",
      distance: "50m",
      icon: Coffee,
      type: "Restaurant",
      walkTime: "1 min walk",
    },
    {
      name: "Deccan Gymkhana",
      distance: "100m",
      icon: Building2,
      type: "Sports Club",
      walkTime: "2 min walk",
    },
    {
      name: "FC Road",
      distance: "200m",
      icon: ShoppingBag,
      type: "Shopping Street",
      walkTime: "3 min walk",
    },
    {
      name: "Local Restaurants",
      distance: "100m",
      icon: Utensils,
      type: "Dining",
      walkTime: "2 min walk",
    },
  ]

  const parkingInfo = [
    {
      type: "No Direct Parking",
      availability: "Not Available",
      icon: Car,
      cost: "N/A",
      notes: "No parking available at office location",
    },
    {
      name: "Prabhat Road Lanes",
      distance: "300m",
      icon: Car,
      cost: "Paid Parking",
      availability: "Available",
      notes: "Alternative parking option nearby",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 py-8 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-lg mx-auto"
    >
      {/* Current Time & Status Header */}
      <motion.div
        variants={itemVariants}
        className="text-center bg-white rounded-xl p-4 border border-slate-200 shadow-sm md:col-span-2 lg:col-span-3"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-slate-600" />
            <span className="text-xs text-slate-600">
              Current Time:{" "}
              {currentTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })}
            </span>
          </div>
          <Badge
            variant={isBusinessOpen() ? "default" : "secondary"}
            className={`${
              isBusinessOpen()
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-red-100 text-red-700 border-red-200"
            }`}
          >
            {isBusinessOpen() ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Open Now
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Closed
              </>
            )}
          </Badge>
          {!isBusinessOpen() && getNextOpenTime() && (
            <span className="text-xs text-slate-500">Opens {getNextOpenTime()}</span>
          )}
        </div>
      </motion.div>

      {/* Business Hours Section */}
      <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-1">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg transition-all duration-300 ${
                    schedule.isToday
                      ? "bg-blue-100 border-2 border-blue-300 shadow-sm"
                      : "bg-white/70 border border-blue-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${schedule.isToday ? "text-blue-800" : "text-slate-700"}`}>
                      {schedule.day}
                    </span>
                    {schedule.isToday && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Today
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className={`${schedule.isToday ? "text-blue-700 font-semibold" : "text-slate-600"}`}>
                      {schedule.hours}
                    </span>
                    {schedule.status === "open" && schedule.isToday && isBusinessOpen() && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Nearby Landmarks Section */}
      <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-1">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Nearby Landmarks
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => window.open("https://maps.google.com/?q=Deccan+Gymkhana+Pune", "_blank")}
              >
                <Navigation className="w-4 h-4 mr-1" />
                Directions
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {nearbyLandmarks.map((landmark, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center space-x-3 p-4 bg-white/70 rounded-lg border border-green-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <landmark.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-800">{landmark.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span>{landmark.distance}</span>
                      <span>•</span>
                      <span>{landmark.walkTime}</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700 border-green-200">
                      {landmark.type}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parking Information Section */}
      <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 flex items-center">
              <Car className="w-5 h-5 mr-2 text-purple-600" />
              Parking Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {parkingInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-start space-x-3 p-4 bg-white/70 rounded-lg border border-purple-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <info.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-800">{info.type || info.name}</p>
                    {info.distance && <p className="text-xs text-slate-600 mt-1">{info.distance} away</p>}
                    {info.notes && <p className="text-xs text-slate-500 mt-1 italic">{info.notes}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Parking Notice:</strong> No parking available at office. Please park at Prabhat Road Lanes
                  (300m away) or call us for assistance at +91-9699214195.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

     
    </motion.div>
  )
}
