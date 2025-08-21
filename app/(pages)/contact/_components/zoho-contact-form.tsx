"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ZohoContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaUrl, setCaptchaUrl] = useState("");

  useEffect(() => {
    // Initialize captcha
    reloadCaptcha();
  }, []);

  const reloadCaptcha = () => {
    const timestamp = new Date().getTime();
    setCaptchaUrl(
      `https://crm.zoho.in/crm/CaptchaServlet?formId=731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a&grpid=c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55&d=${timestamp}`
    );
  };

  const validateEmail = (email: string) => {
    const emailVal = email.replace(/^\s+|\s+$/g, "");
    if (emailVal.length === 0) return true;
    
    const atpos = emailVal.indexOf("@");
    const dotpos = emailVal.lastIndexOf(".");
    
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Validate required fields
    const requiredFields = [
      { name: "First Name", label: "First Name" },
      { name: "Last Name", label: "Last Name" },
      { name: "Email", label: "Email" },
      { name: "Phone", label: "Phone" },
      { name: "LEADCF1", label: "Services" },
    ];

    for (const field of requiredFields) {
      const value = formData.get(field.name) as string;
      if (!value || value.trim().length === 0) {
        toast.error(`${field.label} cannot be empty.`);
        setIsSubmitting(false);
        return;
      }
    }

    // Validate email
    const email = formData.get("Email") as string;
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Zoho CRM
      const response = await fetch("https://crm.zoho.in/crm/WebToLeadForm", {
        method: "POST",
        body: formData,
        mode: "no-cors", // Required for cross-origin requests to Zoho
      });

      toast.success("Thank you! Your message has been sent successfully. We'll get back to you soon.");
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      reloadCaptcha();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden fields required by Zoho */}
        <input type="hidden" name="xnQsjsdp" value="c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55" />
        <input type="hidden" name="zc_gad" value="" />
        <input type="hidden" name="xmIwtLD" value="731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a" />
        <input type="hidden" name="actionType" value="TGVhZHM=" />
        <input type="hidden" name="returnURL" value="https://startbusiness.co.in/thank-you" />
        <input type="hidden" name="Lead Source" value="Web Research" />
        <input type="hidden" name="aG9uZXlwb3Q" value="" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="First_Name" className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="First_Name"
              name="First Name"
              maxLength={40}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your first name"
            />
          </div>
          
          <div>
            <label htmlFor="Last_Name" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Last_Name"
              name="Last Name"
              maxLength={80}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              maxLength={100}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="Phone"
              name="Phone"
              maxLength={30}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="LEADCF1" className="block text-sm font-medium text-gray-700 mb-2">
            Services <span className="text-red-500">*</span>
          </label>
          <select
            id="LEADCF1"
            name="LEADCF1"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a service</option>
            <option value="Company Registration">Company Registration</option>
            <option value="GST Registration">GST Registration</option>
            <option value="Trademark Registration">Trademark Registration</option>
            <option value="FSSAI License">FSSAI License</option>
            <option value="MSME Registration">MSME Registration</option>
            <option value="Tax Filing">Tax Filing</option>
            <option value="Compliance Services">Compliance Services</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-2">
            Brief Requirement
          </label>
          <textarea
            id="Description"
            name="Description"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your requirements..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="captchaField" className="block text-sm font-medium text-gray-700 mb-2">
              Enter the Captcha
            </label>
            <input
              type="text"
              id="captchaField"
              name="enterdigest"
              maxLength={10}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter captcha"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            {captchaUrl && (
              <img
                src={captchaUrl}
                alt="Captcha"
                className="border border-gray-300 rounded"
              />
            )}
            <Button
              type="button"
              variant="outline"
              onClick={reloadCaptcha}
              className="whitespace-nowrap"
            >
              Reload
            </Button>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          
          <Button
            type="reset"
            variant="outline"
            onClick={reloadCaptcha}
            className="px-6 py-3 rounded-lg font-medium"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
