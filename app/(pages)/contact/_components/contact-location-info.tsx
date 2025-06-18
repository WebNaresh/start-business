"use client"

import {
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
import { nearbyLandmarks, parkingInfo } from "./contact-config"

export default function ContactLocationInfo() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 py-6 px-4 md:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-lg mx-auto">
      {/* Current Time Header */}
      <div className="text-center bg-white rounded-lg p-3 sm:p-4 border border-slate-200 shadow-sm md:col-span-2">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
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
        </div>
      </div>

      {/* Nearby Landmarks Section */}
      <div className="md:col-span-1">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center justify-between">
              <div className="flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-green-600" />
                Nearby Landmarks
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nearbyLandmarks.map((landmark, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-green-100"
                >
                  <div className="p-2 rounded-lg bg-green-100">
                    {landmark.icon && <landmark.icon className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-800">{landmark.name}</h4>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {landmark.distance}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{landmark.type}</p>
                    {landmark.walkTime && (
                      <p className="text-xs text-green-600 mt-1">{landmark.walkTime}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parking Information Section */}
      <div className="md:col-span-1">
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
              <Car className="w-4 h-4 mr-2 text-amber-600" />
              Parking Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {parkingInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/70 rounded-lg border border-amber-100"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-medium text-slate-800">{info.type || info.name}</h4>
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
                    <p className="text-sm text-slate-600 mb-1">Distance: {info.distance}</p>
                  )}
                  {info.cost && <p className="text-sm text-slate-600 mb-1">Cost: {info.cost}</p>}
                  {info.notes && <p className="text-sm text-amber-600">{info.notes}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
