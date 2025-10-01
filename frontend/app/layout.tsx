import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Midnite.auto",
  description: "Underground car hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--color-midnite-bg] text-[--color-midnite-text]`}
      >
        {/* 🚦 Global Navbar */}
        <Navbar />

        {/* 💻 App-style container */}
        <main className="pt-20 px-4 md:px-8 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
