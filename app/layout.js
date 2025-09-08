
import ThemeProvider from "@/components/ui/ThemeProvider"; // Import ThemeProvider;

import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import { Metadata } from "next";




export const metadata = {
  title: "Dirassati",
  description: "A platform for educational resources and management for private schools",
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
