import { Phone, Mail, MapPin, Clock, Car, Building2, Coffee, ShoppingBag, Utensils, Train } from "lucide-react"

export const contactInfo = {
    phone: {
        value: "+91 91684 99520",
        href: "tel:+919168499520",
        display: "+91 91684 99520"
    },
    contact: {
        value: "Contact Us",
        href: "/contact",
        display: "Contact Form"
    },
    address: {
        value: "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004",
        href: "#map"
    }
}

export const contactMethods = [
    {
        icon: Phone,
        title: "Phone Support",
        description: "Speak directly with our experts",
        value: contactInfo.phone.value,
        href: contactInfo.phone.href,
        color: "bg-blue-100 text-blue-600",
        hoverColor: "hover:bg-blue-200",
    },
    {
        icon: Mail,
        title: "Contact Form",
        description: "Send us detailed inquiries",
        value: contactInfo.contact.value,
        href: contactInfo.contact.href,
        color: "bg-purple-100 text-purple-600",
        hoverColor: "hover:bg-purple-200",
    },
    {
        icon: MapPin,
        title: "Office Address",
        description: "Visit us for in-person consultation",
        value: contactInfo.address.value,
        href: contactInfo.address.href,
        color: "bg-orange-100 text-orange-600",
        hoverColor: "hover:bg-orange-200",
    },
]

export const businessHours = [
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

export const nearbyLandmarks = [
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

export const parkingInfo = [
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