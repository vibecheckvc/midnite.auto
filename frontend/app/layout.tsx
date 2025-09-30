import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ Navbar now shared across all pages

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ⚡ ensures faster font rendering
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midnite.auto",
  description: "Underground Car Hub – Garage. Crew. Events. Marketplace.",
  icons: {
    icon: "/favicon.ico", // add custom favicon if you have one
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black text-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 🔥 Global Navbar */}
        <Navbar />

        {/* 🔥 Page content */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* 🔥 Global footer */}
        <footer className="bg-neutral-950 border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">Midnite.auto</span> — Built for the underground car community 🚗💨
          </p>
        </footer>
      </body>
    </html>
  );
}
