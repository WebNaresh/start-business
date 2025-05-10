"use client"

import { Mail, MapPin, Phone, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import FAQAccordion from "@/components/faq-accordion"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mb-6 text-lg text-slate-200">
              Have questions or need assistance? Our team is here to help you.
            </p>
            <WhatsAppCTAButton size="lg" className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
              Chat With Us Now
            </WhatsAppCTAButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
              <p className="mb-8 text-lg text-slate-600">
                Fill out the form below, and our team will get back to you within 24 hours.
              </p>

              <div className="mb-8 space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">WhatsApp</h3>
                    <p className="text-slate-600">
                      <a
                        href="https://wa.me/919699214195"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Phone</h3>
                    <p className="text-slate-600">
                      <a href="tel:+919699214195" className="hover:text-blue-600">
                        +91 96992 14195
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Email</h3>
                    <p className="text-slate-600">
                      <a href="mailto:sales@biztreeaccounting.com" className="hover:text-blue-600">
                        sales@biztreeaccounting.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Office Address</h3>
                    <p className="text-slate-600">
                      Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg">
              <form>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="company-registration">Company Registration</option>
                    <option value="trademark">Trademark Registration</option>
                    <option value="compliance">Compliance Services</option>
                    <option value="llp">LLP Registration</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-blue-600 focus:ring-blue-600"
                    placeholder="Please describe your requirements..."
                    required
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <WhatsAppCTAButton className="flex-1">Chat on WhatsApp</WhatsAppCTAButton>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-lg text-slate-600">Visit us at our office in Pune</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2598522750845!2d73.83699!3d18.5194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4e32c379%3A0xc7a0a3b95ad3e2e!2sDeccan%20Gymkhana%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Find quick answers to common questions</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </div>
  )
}

const faqs = [
  {
    question: "How long does it take to register a company?",
    answer:
      "The process typically takes 10-15 working days, depending on the type of company and the completeness of documentation provided.",
  },
  {
    question: "What documents are required for trademark registration?",
    answer:
      "You'll need proof of identity, address proof, business registration documents, the trademark logo/design (if applicable), and a list of goods/services for which the trademark will be used.",
  },
  {
    question: "Do you provide services outside of India?",
    answer:
      "Yes, we provide international trademark registration and company incorporation services in select foreign jurisdictions. Please contact us for specific requirements.",
  },
  {
    question: "What are the annual compliance requirements for a Private Limited Company?",
    answer:
      "Private Limited Companies must file Annual Returns (MGT-7), Financial Statements (AOC-4), conduct Annual General Meetings, and maintain statutory registers, among other requirements.",
  },
  {
    question: "How much does it cost to register a trademark in India?",
    answer:
      "The cost of trademark registration in India includes government fees and professional charges. The government fee starts from ₹4,500 for an individual/startup and ₹9,000 for a company per class. Professional charges vary based on the complexity of the case.",
  },
  {
    question: "Can I convert my existing business structure to a different one?",
    answer:
      "Yes, it's possible to convert your business structure, such as from a Proprietorship to an LLP or Private Limited Company. The process involves specific legal procedures and documentation based on the current and desired business structure.",
  },
]
