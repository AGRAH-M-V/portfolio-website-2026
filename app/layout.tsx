import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agrah M V | Full Stack Developer",
  description:
    "Engineering portfolio for Agrah M V, a Full Stack Developer specializing in reliable systems, microservices, and production clarity.",
  keywords: [
    "Agrah M V",
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "REST API",
  ],
  authors: [{ name: "Agrah M V" }],
  creator: "Agrah M V",
  openGraph: {
    title: "Agrah M V | Full Stack Developer",
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
      <body className="font-sans bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
