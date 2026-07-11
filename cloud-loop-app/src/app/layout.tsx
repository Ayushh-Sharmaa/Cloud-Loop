import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cloud Loop — Discover Every Student Opportunity",
    template: "%s | Cloud Loop",
  },
  description:
    "Cloud Loop is the single place students go to discover every opportunity — programs, events, internships, jobs, and certifications — instead of checking a dozen different websites.",
  keywords: [
    "student opportunities",
    "internships",
    "hackathons",
    "Google Cloud Arcade",
    "GSoC",
    "MLSA",
    "certifications",
    "campus programs",
  ],
  authors: [{ name: "Cloud Loop" }],
  creator: "Cloud Loop",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cloudloop.dev",
    title: "Cloud Loop — Discover Every Student Opportunity",
    description:
      "Programs, events, internships, jobs, and certifications — all in one place for students.",
    siteName: "Cloud Loop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Loop — Discover Every Student Opportunity",
    description:
      "Programs, events, internships, jobs, and certifications — all in one place for students.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClerkProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
