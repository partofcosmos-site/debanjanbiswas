import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020408] text-slate-100 font-sans select-none antialiased">
        <div className="cosmic-grid" />
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="w-full border-t border-white/5 py-10 mt-16 relative z-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 font-sans">
              © {new Date().getFullYear()} Debanjan Biswas. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 font-mono tracking-wider">
              IPhO & IIT-JEE Candidate
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
