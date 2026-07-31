import { mongodbOverviewCertification } from "./list/mongodb-overview";
import { relationalDocumentModelCertification } from "./list/relational-document-model";
import { schemaDesignPatternsCertification } from "./list/schema-design-patterns";
import { crudOperationsMongodbCertification } from "./list/crud-operations-mongodb";
import { indexingDesignFundamentalsCertification } from "./list/indexing-design-fundamentals";
import { vectorSearchFundamentalsCertification } from "./list/vector-search-fundamentals";
import { ragMongodbCertification } from "./list/rag-mongodb";

import { Certification } from "../types/Certification";

// ── Google Free Verified Certifications ──
const googleCerts: Certification[] = [
  {
    id: "google-digital-marketing",
    slug: "google-fundamentals-of-digital-marketing",
    name: "Fundamentals of Digital Marketing",
    provider: "Google",
    providerLogo: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
    providerLink: "https://skillshop.exceedlms.com/student/path/18385-fundamentals-of-digital-marketing",
    interestedCount: "14.2k",
    cost: "Free",
    badge: "Verified Badge",
    enrollUrl: "https://skillshop.exceedlms.com/student/path/18385-fundamentals-of-digital-marketing",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60",
    description: "Master the basics of digital marketing with Google's free course accredited by Interactive Advertising Bureau Europe and The Open University.",
    skills: ["SEO", "SEM", "Social Media", "Content Marketing", "Analytics"],
    difficulty: "Beginner",
    duration: "40 hours"
  },
  {
    id: "google-analytics-iq",
    slug: "google-analytics-individual-qualification",
    name: "Google Analytics Certification",
    provider: "Google",
    providerLogo: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
    providerLink: "https://skillshop.exceedlms.com/student/path/2938-google-analytics-individual-qualification",
    interestedCount: "8.9k",
    cost: "Free",
    badge: "Verified Certificate",
    enrollUrl: "https://skillshop.exceedlms.com/student/path/2938-google-analytics-individual-qualification",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
    description: "Demonstrate your proficiency in Google Analytics, including how to set up and structure properties, use reporting tools, and perform analysis.",
    skills: ["Google Analytics 4", "Web Tracking", "Data Analysis", "Campaign Tracking"],
    difficulty: "Intermediate",
    duration: "4 hours"
  }
];

// ── Microsoft Free Verified Certifications ──
const microsoftCerts: Certification[] = [
  {
    id: "ms-azure-fundamentals",
    slug: "microsoft-azure-fundamentals-az900",
    name: "Azure Fundamentals (AZ-900)",
    provider: "Microsoft",
    providerLogo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
    providerLink: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    interestedCount: "25.1k",
    cost: "Free",
    badge: "Verified Certificate",
    enrollUrl: "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/",
    thumbnail: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&auto=format&fit=crop&q=60",
    description: "Prove that you understand cloud concepts, core Azure services, Azure pricing, SLA, and cloud security and privacy fundamentals.",
    skills: ["Cloud Computing", "Microsoft Azure", "Cloud Security", "SaaS/PaaS/IaaS"],
    difficulty: "Beginner",
    duration: "12 hours"
  },
  {
    id: "ms-applied-skills-storage",
    slug: "microsoft-applied-skills-azure-storage",
    name: "Configure Secure Storage in Azure",
    provider: "Microsoft",
    providerLogo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
    providerLink: "https://learn.microsoft.com/en-us/credentials/applied-skills/configure-secure-storage-in-microsoft-azure/",
    interestedCount: "6.2k",
    cost: "Free",
    badge: "Applied Credential",
    enrollUrl: "https://learn.microsoft.com/en-us/credentials/applied-skills/configure-secure-storage-in-microsoft-azure/",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=60",
    description: "Earn a verified hands-on credential by demonstrating your ability to configure security and data protection for Azure Files and Azure Blob Storage.",
    skills: ["Azure Storage", "Access Control", "Key Vault", "Data Encryption"],
    difficulty: "Intermediate",
    duration: "6 hours"
  }
];

// ── AWS Free Verified Certifications ──
const awsCerts: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    slug: "aws-cloud-practitioner-essentials",
    name: "AWS Cloud Practitioner Essentials",
    provider: "AWS",
    providerLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=64",
    providerLink: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
    interestedCount: "32.4k",
    cost: "Free",
    badge: "Verified Badge",
    enrollUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
    description: "Gain a detailed understanding of cloud concepts, AWS services, security, architecture, pricing, and support models to prepare for certification.",
    skills: ["AWS", "Cloud Infrastructure", "IAM Security", "Billing & Pricing"],
    difficulty: "Beginner",
    duration: "6 hours"
  },
  {
    id: "aws-technical-essentials",
    slug: "aws-technical-essentials-digital",
    name: "AWS Technical Essentials",
    provider: "AWS",
    providerLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=64",
    providerLink: "https://aws.amazon.com/training/path-infrastructure/",
    interestedCount: "11.7k",
    cost: "Free",
    badge: "Verified Badge",
    enrollUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/1851/aws-technical-essentials",
    thumbnail: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=400&auto=format&fit=crop&q=60",
    description: "Learn about AWS compute, database, storage, networking, and security services. Build technical skills to design cloud solutions.",
    skills: ["EC2", "RDS", "S3", "VPC", "AWS IAM"],
    difficulty: "Intermediate",
    duration: "4.5 hours"
  }
];

// ── IBM Free Verified Certifications ──
const ibmCerts: Certification[] = [
  {
    id: "ibm-design-thinking",
    slug: "ibm-enterprise-design-thinking-practitioner",
    name: "Enterprise Design Thinking Practitioner",
    provider: "IBM",
    providerLogo: "https://www.google.com/s2/favicons?domain=ibm.com&sz=64",
    providerLink: "https://www.ibm.com/design/thinking/page/badges/practitioner",
    interestedCount: "9.3k",
    cost: "Free",
    badge: "Verified Badge",
    enrollUrl: "https://www.ibm.com/design/thinking/page/courses/practitioner",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=60",
    description: "Develop a deeper understanding of user-centered design practices to create innovative products that solve real-world problems for users.",
    skills: ["Design Thinking", "User Research", "Agile Collaboration", "Prototyping"],
    difficulty: "Beginner",
    duration: "2.5 hours"
  }
];

// ── Meta Free Verified Certifications ──
const metaCerts: Certification[] = [
  {
    id: "meta-digital-marketing-assoc",
    slug: "meta-digital-marketing-associate-prep",
    name: "Meta Certified Digital Marketing Associate",
    provider: "Meta",
    providerLogo: "https://www.google.com/s2/favicons?domain=facebook.com&sz=64",
    providerLink: "https://www.facebook.com/business/learn/certification",
    interestedCount: "13.8k",
    cost: "Free",
    badge: "Verified Badge",
    enrollUrl: "https://www.facebook.com/business/learn/courses/digital-marketing-associate",
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&auto=format&fit=crop&q=60",
    description: "Learn advertising foundations across Facebook, Instagram, and Messenger. Prepares you for Meta's digital associate credentials.",
    skills: ["Facebook Ads", "Instagram Marketing", "Ad Campaigns", "Targeting & Audiences"],
    difficulty: "Beginner",
    duration: "5 hours"
  }
];

// ── MongoDB Free Verified Certifications ──
// Ensure static MongoDB certificates are marked as free and verified
const mongodbCerts: Certification[] = [
  {
    ...mongodbOverviewCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...relationalDocumentModelCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...schemaDesignPatternsCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...crudOperationsMongodbCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...indexingDesignFundamentalsCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...vectorSearchFundamentalsCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  },
  {
    ...ragMongodbCertification,
    cost: "Free",
    badge: "Verified Badge",
    providerLogo: "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64"
  }
];

export const certifications: Certification[] = [
  ...googleCerts,
  ...microsoftCerts,
  ...awsCerts,
  ...ibmCerts,
  ...metaCerts,
  ...mongodbCerts
];
