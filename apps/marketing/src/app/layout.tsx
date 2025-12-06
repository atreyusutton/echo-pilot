import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://echopilot.me"),
  title: {
    default: "EchoPilot | Human replies for every Google review",
    template: "%s | EchoPilot",
  },
  description:
    "EchoPilot connects to your Google Business Profile, learns your tone, and keeps every reviewer acknowledged with warm, human-grade replies.",
  openGraph: {
    title: "EchoPilot | Human replies for every Google review",
    description:
      "Automate on-brand replies that keep your Google Business Profile active, responsive, and trustworthy.",
    url: "https://echopilot.me",
    siteName: "EchoPilot",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "EchoPilot brand mark",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoPilot | Human replies for every Google review",
    description:
      "Smart, human replies—on autopilot. Stay on top of every Google review with EchoPilot.",
    images: ["/assets/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-white text-navy antialiased`}>
        {children}
      </body>
    </html>
  );
}
