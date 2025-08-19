// data/index.ts

// ===== Business Info =====
export const businessInfo = {
  name: "Galon Consulting Services, LLC",
  email: "galonconsulting@outlook.com",
  phone: "770-256-3765",
  address: {
    street: "3355 Sweetwater Rd Apt 4303",
    city: "Lawrenceville",
    state: "GA",
    zip: "30044",
  },
  hours: "9am–5pm Monday–Saturday",
};

// Add to data/index.ts
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Booking", href: "/booking" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// ===== Types =====
export type Service = {
  id: string;
  name: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  services: Service[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  organization: string;
  text: string;
};

// ===== Services =====
export const serviceCategories: ServiceCategory[] = [
  {
    id: "billing",
    name: "Billing & Revenue Cycle Management",
    services: [
      {
        id: "medical-billing",
        name: "Medical Billing and Coding",
        description:
          "Accurate coding and claims submission for optimized reimbursement and reduced errors.",
      },
      {
        id: "claims",
        name: "Claims Processing and Reimbursement",
        description:
          "Efficient management of claims from submission to payment, minimizing delays and denials.",
      },
      {
        id: "accounts-receivable",
        name: "Accounts Receivable Management",
        description:
          "Comprehensive oversight of outstanding payments to ensure steady revenue flow.",
      },
      {
        id: "denials",
        name: "Denials Management and Appeals",
        description:
          "Expert review and resubmission of denied claims to maximize recoverable revenue.",
      },
      {
        id: "payment-posting",
        name: "Payment Posting and Patient Invoicing",
        description:
          "Timely and accurate posting of payments and generation of patient invoices for transparency.",
      },
      {
        id: "revenue-analytics",
        name: "Revenue Cycle Performance Analytics",
        description:
          "In-depth analysis and reporting to identify growth opportunities and streamline your revenue cycle.",
      },
    ],
  },
  {
    id: "compliance",
    name: "Healthcare Consulting & Compliance",
    services: [
      {
        id: "regulatory",
        name: "Regulatory Compliance (HIPAA, OSHA, etc.)",
        description:
          "Ensure your practice meets all regulatory standards and industry best practices.",
      },
      {
        id: "risk-management",
        name: "Risk Management and Audit Services",
        description:
          "Identify, assess, and mitigate risks to protect your organization from compliance issues.",
      },
      {
        id: "accreditation",
        name: "Accreditation Preparation (e.g., Joint Commission)",
        description:
          "Guidance and support to help you achieve and maintain necessary accreditations.",
      },
      {
        id: "policy",
        name: "Policy and Procedure Development",
        description:
          "Create clear, effective policies and procedures tailored to your operational needs.",
      },
      {
        id: "quality-improvement",
        name: "Quality Improvement Programs",
        description:
          "Implement programs to enhance care quality, patient outcomes, and operational efficiency.",
      },
      {
        id: "credentialing",
        name: "Credentialing and Licensure Support",
        description:
          "Streamlined credentialing processes to ensure compliance and reduce administrative burden.",
      },
    ],
  },
  {
    id: "care-coordination",
    name: "Patient Care Coordination",
    services: [
      {
        id: "care-management",
        name: "Care Management and Coordination",
        description:
          "Seamless coordination across providers to improve patient outcomes and continuity of care.",
      },
      {
        id: "patient-intake",
        name: "Patient Intake and Scheduling",
        description:
          "Streamlined intake and scheduling systems for a smooth patient experience.",
      },
      {
        id: "chronic-care",
        name: "Chronic Care Management",
        description:
          "Ongoing management for chronic conditions to enhance patient wellness and reduce hospitalizations.",
      },
      {
        id: "patient-outreach",
        name: "Patient Outreach and Engagement",
        description:
          "Engage patients through proactive communication and personalized outreach.",
      },
      {
        id: "referral-management",
        name: "Referral and Transition Management",
        description:
          "Coordinate referrals and care transitions for optimal patient support and satisfaction.",
      },
    ],
  },
  {
    id: "it-services",
    name: "Healthcare IT Services",
    services: [
      {
        id: "ehr",
        name: "EHR System Implementation and Optimization",
        description:
          "Set up and optimize Electronic Health Record systems for maximum efficiency and usability.",
      },
      {
        id: "it-infrastructure",
        name: "IT Infrastructure Support and Maintenance",
        description:
          "Reliable, ongoing support for your healthcare IT infrastructure and devices.",
      },
      {
        id: "cybersecurity",
        name: "Data Security and Cybersecurity Solutions",
        description:
          "Protect sensitive data with robust cybersecurity strategies and compliance safeguards.",
      },
      {
        id: "telemedicine",
        name: "Telemedicine Setup and Support",
        description:
          "Implement and support telemedicine platforms for remote patient care.",
      },
      {
        id: "software-integration",
        name: "Software Integration",
        description:
          "Seamlessly connect billing, scheduling, and clinical software for smooth operations.",
      },
    ],
  },
  {
    id: "hr",
    name: "Human Resources & Staffing Solutions",
    services: [
      {
        id: "recruitment",
        name: "Recruitment and Onboarding of Healthcare Staff",
        description:
          "Find and onboard qualified healthcare professionals to meet your staffing needs.",
      },
      {
        id: "training",
        name: "Staff Training and Development",
        description:
          "Professional training programs to boost staff skills and compliance.",
      },
      {
        id: "payroll",
        name: "Payroll Management",
        description:
          "Accurate, compliant payroll processing and administration for your team.",
      },
      {
        id: "staffing",
        name: "Temporary and Permanent Staffing",
        description:
          "Flexible staffing solutions to cover both short-term and long-term needs.",
      },
      {
        id: "workforce-planning",
        name: "Workforce Planning and Scheduling",
        description:
          "Strategic workforce management for optimized staffing and coverage.",
      },
      {
        id: "performance-eval",
        name: "Employee Performance Evaluation",
        description:
          "Objective performance reviews to drive growth and accountability.",
      },
    ],
  },
  {
    id: "financial",
    name: "Financial Management & Consulting",
    services: [
      {
        id: "planning",
        name: "Financial Planning and Budgeting",
        description:
          "Strategic planning to ensure long-term financial health and sustainability.",
      },
      {
        id: "profitability",
        name: "Profitability Analysis",
        description:
          "Analyze financial data to maximize profit and identify new revenue streams.",
      },
      {
        id: "expense",
        name: "Expense Management and Cost Reduction Strategies",
        description:
          "Identify savings opportunities and implement cost-effective solutions.",
      },
      {
        id: "reporting",
        name: "Financial Reporting and Forecasting",
        description:
          "Comprehensive reporting for informed decision-making and future planning.",
      },
      {
        id: "tax",
        name: "Tax Compliance and Advisory",
        description:
          "Expert guidance to navigate complex tax regulations and remain compliant.",
      },
    ],
  },
  {
    id: "operations",
    name: "Operational Management",
    services: [
      {
        id: "facility",
        name: "Facility Management and Operations",
        description:
          "Comprehensive facility management for a safe and efficient care environment.",
      },
      {
        id: "vendor",
        name: "Vendor Management and Supply Chain Optimization",
        description:
          "Efficient vendor management to reduce costs and ensure timely supply delivery.",
      },
      {
        id: "equipment",
        name: "Equipment Procurement and Maintenance",
        description:
          "Sourcing, installing, and maintaining essential medical equipment.",
      },
      {
        id: "contracts",
        name: "Contract Negotiation and Management",
        description:
          "Secure favorable terms and manage contracts for risk mitigation.",
      },
      {
        id: "workflow",
        name: "Workflow and Process Improvement",
        description:
          "Optimize internal processes to boost productivity and patient satisfaction.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Patient Acquisition",
    services: [
      {
        id: "strategy",
        name: "Healthcare Marketing Strategy Development",
        description:
          "Develop effective marketing strategies to attract and retain patients.",
      },
      {
        id: "digital-marketing",
        name: "Digital Marketing (SEO, Social Media, PPC)",
        description:
          "Leverage digital platforms to increase your online presence and engagement.",
      },
      {
        id: "surveys",
        name: "Patient Satisfaction Surveys and Reviews",
        description:
          "Gather and analyze patient feedback to improve services and reputation.",
      },
      {
        id: "reputation",
        name: "Reputation Management",
        description:
          "Protect and enhance your practice's online and offline reputation.",
      },
      {
        id: "community",
        name: "Community Outreach Programs",
        description:
          "Build connections and trust through community-based health initiatives.",
      },
      {
        id: "branding",
        name: "Brand Development and Awareness Campaigns",
        description:
          "Establish a strong brand identity and increase awareness in your target market.",
      },
    ],
  },
  {
    id: "legal",
    name: "Healthcare Legal Support Services",
    services: [
      {
        id: "legal-consulting",
        name: "Healthcare Law Consulting",
        description:
          "Access expert legal advice tailored to the unique needs of healthcare organizations.",
      },
      {
        id: "legal-risk",
        name: "Legal Risk Assessments",
        description:
          "Identify and mitigate potential legal risks in your operations and documentation.",
      },
      {
        id: "contract-review",
        name: "Contract Review and Drafting",
        description:
          "Thorough review and preparation of contracts to ensure legal soundness.",
      },
      {
        id: "malpractice",
        name: "Malpractice Defense Assistance",
        description:
          "Support and resources for navigating malpractice claims and defense.",
      },
      {
        id: "litigation",
        name: "Regulatory and Compliance Litigation Support",
        description:
          "Assistance with legal disputes related to regulatory and compliance matters.",
      },
    ],
  },
  {
    id: "analytics",
    name: "Data Analytics & Reporting",
    services: [
      {
        id: "clinical-analysis",
        name: "Clinical Data Analysis",
        description:
          "Analyze clinical data to improve outcomes and inform care strategies.",
      },
      {
        id: "population-health",
        name: "Population Health Management",
        description:
          "Monitor and improve the health of specific patient populations.",
      },
      {
        id: "outcome-tracking",
        name: "Patient Outcome Tracking and Reporting",
        description:
          "Track, measure, and report on patient outcomes for continuous improvement.",
      },
      {
        id: "metrics",
        name: "Performance Metrics and Dashboards",
        description:
          "Custom dashboards to visualize key performance indicators for your organization.",
      },
      {
        id: "custom-reporting",
        name: "Custom Reporting Solutions for Compliance and Strategic Planning",
        description:
          "Develop tailored reports to meet compliance requirements and drive strategic goals.",
      },
    ],
  },
];

// ===== FAQs =====
export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What types of healthcare organizations do you work with?",
    answer:
      "We serve a wide range of healthcare providers, including private practices, clinics, hospitals, specialty groups, and telehealth organizations.",
  },
  {
    id: "faq-2",
    question: "How do you ensure HIPAA and regulatory compliance?",
    answer:
      "Our team continually monitors changes in healthcare regulations and implements robust compliance protocols, regular staff training, and audit support.",
  },
  {
    id: "faq-3",
    question: "Can you help with both temporary and permanent staffing needs?",
    answer:
      "Yes, we offer flexible staffing solutions to meet both short-term and long-term workforce requirements, including recruitment, onboarding, and training.",
  },
  {
    id: "faq-4",
    question: "What is included in your revenue cycle management services?",
    answer:
      "Our services cover the entire revenue cycle: billing and coding, claims processing, accounts receivable, denials management, payment posting, and analytics.",
  },
  {
    id: "faq-5",
    question: "Do you offer support for telemedicine implementation?",
    answer:
      "Absolutely! We assist with selecting, implementing, and optimizing telemedicine platforms, ensuring data security and compliance.",
  },
  {
    id: "faq-6",
    question: "How do I get started with your consulting services?",
    answer:
      "Simply contact us by phone or email, or book a consultation online. We’ll discuss your needs and recommend a tailored solution.",
  },
  {
    id: "faq-7",
    question: "What geographic areas do you serve?",
    answer:
      "We support healthcare organizations nationwide with both remote and on-site consulting options.",
  },
  {
    id: "faq-8",
    question: "How are your services priced?",
    answer:
      "We offer competitive, transparent pricing customized to your project scope and organizational needs. Contact us for a detailed quote.",
  },
  {
    id: "faq-9",
    question: "Can you help us prepare for accreditation or audits?",
    answer:
      "Yes! We provide comprehensive accreditation preparation and audit support to help your organization meet industry standards.",
  },
  {
    id: "faq-10",
    question:
      "Is my organization too small or too large to benefit from your services?",
    answer:
      "We work with practices of all sizes—from solo providers to large health systems. Our services are scalable and adaptable.",
  },
];

// ===== Testimonials =====
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Sophia Bennett",
    role: "Medical Director",
    organization: "Sunrise Family Clinic",
    text: "Galon Consulting Services streamlined our billing and compliance, saving us both time and money. Their expertise is unmatched.",
  },
  {
    id: "t2",
    name: "James Lin",
    role: "Practice Manager",
    organization: "Willow Pediatrics",
    text: "Their team handled our EHR migration flawlessly. Our staff and patients both notice the difference.",
  },
  {
    id: "t3",
    name: "Katherine Rose, RN",
    role: "Clinic Supervisor",
    organization: "Rose Wellness Group",
    text: "We rely on Galon Consulting for staffing and payroll. The peace of mind they provide is invaluable.",
  },
  {
    id: "t4",
    name: "David Morgan",
    role: "CFO",
    organization: "Rivergate Surgical Center",
    text: "With Galon's financial management services, our revenue cycle efficiency increased dramatically.",
  },
  {
    id: "t5",
    name: "Emily Carter",
    role: "COO",
    organization: "Midtown Rehab Associates",
    text: "From compliance to marketing, Galon Consulting is our trusted partner for every operational challenge.",
  },
  {
    id: "t6",
    name: "Michael Tran",
    role: "Operations Manager",
    organization: "Trinity Health Partners",
    text: "Professional, responsive, and effective. We highly recommend Galon Consulting Services.",
  },
];
