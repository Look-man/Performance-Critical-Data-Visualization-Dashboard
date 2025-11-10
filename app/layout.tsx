import "./globals.css";
import React from "react";

export const metadata = {
  title: "Real-time Performance Dashboard",
  description: "High-performance dashboard rendering 10,000+ data points at 60 FPS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
