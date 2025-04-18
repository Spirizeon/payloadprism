import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import FooterSection from "@/components/Footer";
import { NavbarDemo } from "@/components/Nav";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import GoogleGeminiEffect from "@/components/Gemini";
import GlobeDemo from "@/components/Globe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "payloadprism",
  description: "malware verdiction",
};

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarDemo />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
