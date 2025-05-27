export interface ServiceData {
    title: string;
    shortTitle: string;
    description: string;
    category: string;
    icon: string;
    color: string;
    popular?: boolean;
    pricing: {
        amount: string;
        originalAmount: string;
        currency: string;
        gst: boolean;
        includes: string[];
    };
    timeline: {
        total: string;
        steps: Array<{ name: string; duration: string }>;
    };
    whatIs: {
        title: string;
        description: string;
    };
    keyFeatures: string[];
    idealFor: string[];
    process: Array<{
        step: number;
        title: string;
        description: string;
    }>;
    requiredDocuments: {
        [category: string]: string[];
    };
    faqs: Array<{
        question: string;
        answer: string;
    }>;
} 