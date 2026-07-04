"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "Lab", path: "/lab" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-2xl transition-all duration-500 ${
        scrolled 
          ? "bg-[#020408]/70 backdrop-blur-2xl border border-white/8 shadow-2xl shadow-black/50 py-2.5" 
          : "bg-[#020408]/30 backdrop-blur-lg border border-white/[0.03] py-3.5"
      }`}
    >
      <div className="px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[11px] group-hover:scale-105 shadow-lg shadow-indigo-500/15 transition-transform duration-300">
            DB
          </div>
          <span className="font-semibold tracking-tight text-white/90 text-sm hidden sm:block group-hover:text-white transition-colors">
            Debanjan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/[0.07] rounded-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 mx-3 rounded-xl border border-white/5 bg-[#020408]/95 backdrop-blur-2xl overflow-hidden"
          >
            <nav className="flex flex-col px-3 py-2 gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={handleLinkClick}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-white/[0.07] text-white" : "text-gray-400 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
