import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./providers";
import AuthHashHandler from "./authhandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midnite.auto",
  description: "Underground car hub",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Midnite.auto",
    description: "Underground car hub",
    url: "https://midnite.auto",
    siteName: "Midnite.auto",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnite.auto",
    description: "Underground car hub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--color-midnite-bg] text-[--color-midnite-text] min-h-screen flex flex-col`}
      >
        <Providers>
          <AuthHashHandler />
          <Navbar />

          <main className="flex-1 pt-20 px-4 md:px-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          <footer className="border-t border-white/10 py-6 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Midnite.auto — Built for the underground
          </footer>
        </Providers>
      </body>
    </html>
  );
}