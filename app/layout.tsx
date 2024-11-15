import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import Navbar from "@/components/ui/navigation/navbar/Index";
import "./globals.css";
import ThemProvider from "@/contex/Theme";



const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/spacegroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700 ",
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          <Navbar />
        {children}
        </ThemProvider>
      </body>
    </html>
  );
}
