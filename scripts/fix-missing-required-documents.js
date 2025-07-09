const fs = require('fs');
const path = require('path');

// Read the services.json file
const servicesPath = path.join(__dirname, '../app/(pages)/services/[slug]/data/services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Default requiredDocuments structure for different service types
const defaultRequiredDocuments = {
  'business-setup': {
    forDirectors: [
      "PAN Card",
      "Aadhaar Card", 
      "Passport size photographs",
      "Address proof",
      "Mobile number",
      "Email ID"
    ],
    forRegistration: [
      "Registered office address proof",
      "Rent agreement/ownership deed",
      "Utility bills",
      "NOC from property owner",
      "Business plan",
      "Investment details"
    ]
  },
  'compliance': {
    forCompany: [
      "Company incorporation documents",
      "Financial statements",
      "Board resolutions",
      "Director details",
      "Previous compliance records",
      "Audit reports"
    ],
    forFiling: [
      "Digital signature certificate",
      "Required forms",
      "Supporting documents",
      "Compliance certificates",
      "Bank statements",
      "Tax documents"
    ]
  },
  'registration': {
    forApplicant: [
      "Identity proof",
      "Address proof",
      "Business proof",
      "Photographs",
      "Mobile number",
      "Email ID"
    ],
    forRegistration: [
      "Application forms",
      "Supporting documents",
      "Fee payment proof",
      "Compliance certificates",
      "Business registration",
      "Address verification"
    ]
  },
  'legal': {
    forApplication: [
      "Identity proof",
      "Address proof",
      "Business documents",
      "Supporting evidence",
      "Previous registrations",
      "Power of attorney"
    ],
    forVerification: [
      "Original documents",
      "Certified copies",
      "Affidavits",
      "Declarations",
      "Witness statements",
      "Expert opinions"
    ]
  }
};

// Function to get appropriate requiredDocuments based on service category
function getRequiredDocuments(service, serviceKey) {
  const category = service.category || 'business-setup';
  
  // Use category-specific defaults or fallback to business-setup
  const template = defaultRequiredDocuments[category] || defaultRequiredDocuments['business-setup'];
  
  // Customize based on specific service types
  if (serviceKey.includes('trademark')) {
    return {
      forApplicant: [
        "Logo/brand artwork",
        "Business proof",
        "Identity proof", 
        "Address proof",
        "User affidavit",
        "Power of attorney"
      ],
      forRegistration: [
        "Trademark application form",
        "Class specification",
        "User affidavit",
        "Statement of use",
        "Priority documents",
        "Translation documents (if any)"
      ]
    };
  }
  
  if (serviceKey.includes('gst')) {
    return {
      forBusiness: [
        "PAN Card of business",
        "Aadhaar Card of proprietor/partners/directors",
        "Business registration certificate",
        "Bank account details",
        "Digital signature",
        "Photographs"
      ],
      forAddress: [
        "Rent agreement/ownership deed",
        "Electricity bill",
        "Property tax receipt",
        "NOC from landlord",
        "Address proof documents"
      ]
    };
  }
  
  if (serviceKey.includes('annual') || serviceKey.includes('roc')) {
    return {
      forCompany: [
        "Financial statements",
        "Board meeting minutes",
        "Shareholder details",
        "Director details",
        "Audit reports",
        "Previous year's returns"
      ],
      forFiling: [
        "Digital signature certificate",
        "Board resolution",
        "Auditor's report",
        "Annual return form",
        "Financial statements",
        "Director's report"
      ]
    };
  }
  
  return template;
}

// Process each service
let modified = false;
for (const [serviceKey, service] of Object.entries(servicesData)) {
  if (!service.requiredDocuments) {
    console.log(`Adding requiredDocuments to: ${serviceKey}`);
    service.requiredDocuments = getRequiredDocuments(service, serviceKey);
    modified = true;
  }
}

// Write back to file if modifications were made
if (modified) {
  fs.writeFileSync(servicesPath, JSON.stringify(servicesData, null, 2));
  console.log('Successfully updated services.json with missing requiredDocuments');
} else {
  console.log('No services were missing requiredDocuments');
}
