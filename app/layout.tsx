import Navbar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: {
    default: "Galon Consulting Services | Healthcare Consulting & Solutions",
    template: "%s | Galon Consulting Services",
  },
  description:
    "Comprehensive healthcare consulting, billing, compliance, and staffing for clinics, practices, and health systems. Streamline your revenue, compliance, and operations with Galon Consulting Services.",
  keywords: [
    "healthcare consulting",
    "medical billing",
    "revenue cycle",
    "HIPAA compliance",
    "healthcare staffing",
    "Galon Consulting",
    "Georgia medical consulting",
    "healthcare operations",
    "practice management",
    "health IT",
    "medical consulting",
    "patient care coordination",
    "healthcare compliance",
  ],
  metadataBase: new URL("https://galon-consulting.vercel.app/"), // Change to your real domain!
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.galonconsulting.com",
    siteName: "Galon Consulting Services",
    title: "Galon Consulting Services | Healthcare Consulting & Solutions",
    description:
      "Comprehensive healthcare consulting, billing, compliance, and staffing for clinics, practices, and health systems.",
    images: [
      {
        url: "/og-image.png", // Place a 1200x630 px OG image in /public
        width: 1200,
        height: 630,
        alt: "Galon Consulting Services - Healthcare Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galon Consulting Services",
    description:
      "Healthcare consulting, billing, compliance, staffing, and IT for practices, clinics, and health systems.",
    images: ["/og-image.png"],
    site: "@yourtwitter", // If you have a Twitter, else remove this line
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Local Business JSON-LD */}
        <script
          type="application/ld+json"
          // You can break this out as a string template for readability
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Galon Consulting Services, LLC",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3355 Sweetwater Rd Apt 4303",
                addressLocality: "Lawrenceville",
                addressRegion: "GA",
                postalCode: "30044",
              },
              telephone: "7702563765",
              email: "galonconsulting@outlook.com",
              url: "https://galon-consulting.vercel.app/",
            }),
          }}
        />
      </head>
      <body className="bg-[var(--color-background)]">
        <Navbar />
        {children}
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
