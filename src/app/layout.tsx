//import type React from "react"
import type { Metadata } from "next"
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/main/AuthProvider";
import HeaderBar from "@/components/main/HeaderBar";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-baskerville",
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-source-sans-pro",
})

export const metadata: Metadata = {
  title: "CMS Cloud - Reliable WordPress & CMS Hosting",
  description: "Experience seamless performance and unmatched support for your WordPress and CMS hosting needs.",
  keywords: [
    "WordPress hosting",
    "CMS hosting",
    "reliable hosting",
    "fast WordPress hosting",
    "secure CMS hosting",
    "managed WordPress hosting",
    "scalable CMS solutions",
    "24/7 support",
    "performance optimization",
    "cloud hosting"
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AuthProvider>
        <html lang="en">
          <body
            className={`${libreBaskerville.variable} ${sourceSansPro.variable} antialiased`}
          >
            <HeaderBar />
            {children}
          </body>
        </html>
      </AuthProvider>
    </>
  )
}


