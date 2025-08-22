"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2,
  Send,
  CheckCircle,
  RefreshCw,
  Phone,
  Mail,
  User,
  Briefcase,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

// Validation schema for service-specific form (with captcha)
const zohoServiceFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(40, "First name must be less than 40 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(80, "Last name must be less than 80 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9+\-\s()]*$/,
      "Phone number can only contain numbers, +, -, (, ), and spaces"
    )
    .max(30, "Phone number must be less than 30 characters"),
  service: z.string().min(1, "Please select a service"),
  captcha: z
    .string()
    .min(1, "Please enter the captcha code")
    .max(10, "Captcha code must be less than 10 characters"),
});

type ZohoServiceFormData = z.infer<typeof zohoServiceFormSchema>;

interface ZohoServiceFormProps {
  className?: string;
  title?: string;
  description?: string;
  defaultService?: string;
}

export default function ZohoServiceForm({
  className = "",
  title = "Get Expert Consultation",
  description = "Fill out the form below and our experts will get back to you within 24 hours.",
  defaultService = "",
}: ZohoServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ZohoServiceFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: defaultService,
    captcha: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ZohoServiceFormData, string>>
  >({});

  // Handle client-side rendering to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const validateField = (name: keyof ZohoServiceFormData, value: string) => {
    try {
      zohoServiceFormSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (name: keyof ZohoServiceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      zohoServiceFormSchema.parse(formData);

      // Create a hidden form element for Zoho CRM submission
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://crm.zoho.in/crm/WebToLeadForm";
      form.name = "WebToLeads958448000000550148";
      form.target = "_self";
      form.style.display = "none";
      form.acceptCharset = "UTF-8";

      // Add form fields with exact Zoho CRM parameters
      const fields = [
        {
          name: "xnQsjsdp",
          value:
            "c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55",
        },
        { name: "zc_gad", value: "" },
        {
          name: "xmIwtLD",
          value:
            "731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a",
        },
        { name: "actionType", value: "TGVhZHM=" },
        { name: "returnURL", value: "https://startbusiness.co.in/thank-you" },
        { name: "First Name", value: formData.firstName },
        { name: "Last Name", value: formData.lastName },
        { name: "Email", value: formData.email },
        { name: "Phone", value: formData.phone },
        { name: "LEADCF1", value: formData.service },
        { name: "Description", value: "Service inquiry from website" },
        { name: "Lead Source", value: "Service Page" },
        { name: "enterdigest", value: formData.captcha },
        { name: "aG9uZXlwb3Q", value: "" }, // Honeypot field
      ];

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = field.name;
        input.value = field.value || "";
        form.appendChild(input);
      });

      // Submit form
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Show success message immediately since we're submitting to external service
      setTimeout(() => {
        setIsSubmitted(true);
        toast.success("Form Submitted Successfully!", {
          description:
            "Thank you for your interest. Our team will contact you within 24 hours.",
          duration: 6000,
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });

        // Reset form after showing success message
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: defaultService,
          captcha: "",
        });
        setErrors({});

        // Reset submitted state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }, 1000); // Small delay to ensure form submission started
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ZohoServiceFormData, string>> =
          {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ZohoServiceFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced loading state during hydration
  if (!isClient) {
    return (
      <div className={className}>
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl font-bold mb-2">
                  {title}
                </CardTitle>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6 animate-pulse">
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-14 bg-gray-200 rounded-lg"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Enhanced success message
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-4 sm:py-8"
              role="alert"
              aria-live="polite"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                aria-hidden="true"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl font-bold text-green-600 mb-2"
              >
                Thank You!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed"
              >
                Your request has been submitted successfully. Our expert will
                call you within 30 minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-green-200"
              >
                <p className="text-sm sm:text-base text-slate-700 font-medium mb-3">
                  What's Next?
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>Expert consultation call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Customized service plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-600" />
                    <span>Instant process initiation</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl font-bold mb-2">
                {title}
              </CardTitle>

              <p className="text-blue-100 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form
            key={isClient ? "client-form" : "server-form"}
            className="space-y-4"
            onSubmit={handleSubmit}
            noValidate
            suppressHydrationWarning={true}
          >
            {/* Enhanced Name Fields */}
            <motion.div
              className="grid gap-4 sm:gap-6 lg:grid-cols-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  First Name *
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={`h-12 pl-4 pr-4 text-base transition-all duration-200 ${
                      errors.firstName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Last Name *
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={`h-12 ${
                    errors.lastName ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your last name"
                  required
                />
                <AnimatePresence>
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Enhanced Contact Fields */}
            <motion.div
              className="grid gap-4 sm:gap-6 lg:grid-cols-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email Address *
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-12 pl-4 pr-4 text-base transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  Phone Number *
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`h-12 pl-4 pr-4 text-base transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Service Selection - Hidden if defaultService is provided */}
            {!defaultService && (
              <div>
                <Label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Service *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                >
                  <SelectTrigger
                    className={`h-12 w-full ${
                      errors.service ? "border-red-500" : "border-border"
                    }`}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Company Registration">
                      Company Registration
                    </SelectItem>
                    <SelectItem value="Trademark Registration">
                      Trademark Registration
                    </SelectItem>
                    <SelectItem value="GST Registration">
                      GST Registration
                    </SelectItem>
                    <SelectItem value="FSSAI License">FSSAI License</SelectItem>
                    <SelectItem value="MSME Registration">
                      MSME Registration
                    </SelectItem>
                    <SelectItem value="Tax Filing">Tax Filing</SelectItem>
                    <SelectItem value="Compliance Services">
                      Compliance Services
                    </SelectItem>
                    <SelectItem value="Other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                )}
              </div>
            )}

            {/* Captcha Field */}
            <div>
              <Label
                htmlFor="captcha"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Enter the Captcha *
              </Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    id="captchaImage"
                    src="https://crm.zoho.in/crm/CaptchaServlet?formId=731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a&grpid=c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55"
                    alt="Captcha"
                    className="border border-gray-300 rounded"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const img = document.getElementById(
                        "captchaImage"
                      ) as HTMLImageElement;
                      if (img) {
                        const src = img.src;
                        if (src.indexOf("&d") !== -1) {
                          img.src =
                            src.substring(0, src.indexOf("&d")) +
                            "&d" +
                            new Date().getTime();
                        } else {
                          img.src = src + "&d" + new Date().getTime();
                        }
                      }
                    }}
                    className="text-sm"
                  >
                    Reload
                  </Button>
                </div>
                <Input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={formData.captcha}
                  onChange={(e) => handleChange("captcha", e.target.value)}
                  className={`h-12 ${
                    errors.captcha ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Enter the captcha code"
                  maxLength={10}
                  required
                />
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
                )}
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    <span>Submitting your request...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5 mr-3" />
                    <span>Get Free Consultation</span>
                  </motion.div>
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Quick Response</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>Expert Support</span>
                </div>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
