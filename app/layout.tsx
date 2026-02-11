import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Darkhanbayar Erdenebat",
    template: "%s | Darkhanbayar Erdenebat",
  },
  description:
    "Personal portfolio of Darkhanbayar Erdenebat. Projects, experience, and ways to get in touch.",
  icons: {
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Darkhanbayar Erdenebat",
    description:
      "Personal portfolio of Darkhanbayar Erdenebat. Projects, experience, and ways to get in touch.",
    siteName: "Darkhanbayar Erdenebat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darkhanbayar Erdenebat",
    description:
      "Personal portfolio of Darkhanbayar Erdenebat. Projects, experience, and ways to get in touch.",
  },
  authors: [{ name: "Darkhanbayar Erdenebat" }],
  creator: "Darkhanbayar Erdenebat",
  publisher: "Darkhanbayar Erdenebat",
  keywords: [
    "Darkhanbayar Erdenebat",
    "portfolio",
    "software engineer",
    "projects",
    "web development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
