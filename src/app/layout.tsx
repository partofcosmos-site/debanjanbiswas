import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Debanjan Biswas | Physics Olympiad & IIT-JEE Portfolio",
  description: "Academic student portfolio of Debanjan Biswas, Class 11 student preparing for the International Physics Olympiad (IPhO) and IIT-JEE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#04060a] text-slate-100 font-sans select-none antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10 pt-20">
          {children}
        </main>
        
        {/* Minimal Footer */}
        <footer className="w-full border-t border-white/5 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Debanjan Biswas. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">IPhO & IIT-JEE Candidate</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
