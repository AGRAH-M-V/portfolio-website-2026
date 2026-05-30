import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agrah M V | Backend Engineer",
  description:
    "Engineering portfolio for Agrah M V, a Backend Engineer specializing in reliable systems, microservices, and production clarity.",
  keywords: [
    "Agrah M V",
    "Backend Engineer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "REST API",
  ],
  authors: [{ name: "Agrah M V" }],
  creator: "Agrah M V",
  openGraph: {
    title: "Agrah M V | Backend Engineer",
    description:
      "Backend systems, production support, distributed architecture, and reliability.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} font-sans bg-paper text-ink antialiased h-screen flex flex-col overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
