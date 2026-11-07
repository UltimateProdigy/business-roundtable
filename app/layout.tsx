import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastWrapper from "./components/ToastWrapper";

export const metadata: Metadata = {
  title: "Ibadan Business Roundtable — Global Ready: Scaling Businesses, Building Wealth, Expanding Opportunities",
  description:
    "THEME: GLOBAL READY: Scaling Businesses, Building Wealth, Expanding Opportunities. Join Pastor Seun Afolayan and industry leaders on 5th December 2026 at PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch Filling Station).",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <ToastWrapper />
        <Navbar />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
