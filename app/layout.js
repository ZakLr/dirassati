import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ui/ThemeProvider"; // Import ThemeProvider;

import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import { Metadata } from "next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dirassati - Algerian Education Platform",
  description:
    "Comprehensive education management platform for Algerian schools and institutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>{" "}
          {/* Wrap with ThemeProvider */}
        </ReduxProvider>
      </body>
    </html>
  );
}
