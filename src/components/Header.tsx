/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import LogoAnimation from "./LogoAnimation";

const services = [
  { name: "Individual Tax Filing", href: "/services/individual" },
  { name: "Business Tax Filing", href: "/services/business" },
  { name: "FBAR & Foreign Reporting", href: "/services/foreign-reporting" },
  { name: "Indian Tax & NRI", href: "/services/indian-tax" },
];

const taxTools = [
  { name: "Federal Refund Status", href: "https://www.irs.gov/refunds", isExternal: true },
  { name: "State Refund Status", href: "https://taxadmin.org/fta-members/", isExternal: true },
  { name: "Federal Payment Portal", href: "https://www.irs.gov/payments/direct-pay-with-bank-account", isExternal: true },
  { name: "State Payment Portals", href: "https://taxadmin.org/fta-members/", isExternal: true },
  { name: "IRS Account Setup", href: "https://www.irs.gov/payments/online-account-for-individuals", isExternal: true },
  { name: "Refund & Payment Center Hub", href: "/tax-tools", isExternal: false },
  { name: "Ohio Tax Portal", href: "https://www.tax.ohio.gov/", isExternal: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8fafc]/95 backdrop-blur-md border-b border-[#dbeafe] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22 gap-8">
          {/* Logo — Stylized 3D Transparent Animated 'T' Component + Cursive 'Taxiva LLC' UI/UX Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group whitespace-nowrap shrink-0">
              <LogoAnimation size="md" variant="header" />

              <span
                className="text-2xl sm:text-[1.85rem] font-bold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors leading-none tracking-wide select-none drop-shadow-[0_1px_1px_rgba(15,23,42,0.08)]"
                style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
              >
                Taxiva LLC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <Link
              to="/"
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-[#0f172a] group-hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0">
                Services <ChevronDown className="w-4 h-4 text-[#1d4ed8] group-hover:text-[#0f172a]" />
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 w-64 bg-white border border-[#dbeafe] shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                )}
              >
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 text-sm font-semibold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/pricing"
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </Link>

            {/* Refund & Payment Center Dropdown */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-[#0f172a] group-hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0">
                Refund & Payment Center <ChevronDown className="w-4 h-4 text-[#1d4ed8] group-hover:text-[#0f172a]" />
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 w-72 bg-white border border-[#dbeafe] shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                )}
              >
                {taxTools.map((item) =>
                  item.href.startsWith("http") ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#1d4ed8]/70" />
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2.5 text-sm font-bold text-[#1d4ed8] bg-[#f8fafc] border-t border-[#eff6ff] hover:bg-[#eff6ff] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>

            <Link
              to="/contact"
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white border border-[#bfdbfe] hover:border-[#1d4ed8] hover:bg-[#eff6ff] text-[#0f172a] px-5 py-2.5 rounded-xl text-sm 2xl:text-base font-extrabold transition-all shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
            >
              Client Login
            </Link>
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm 2xl:text-base font-extrabold hover:bg-[#0f172a] transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0f172a] hover:text-[#1d4ed8] focus:outline-none p-1"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#f8fafc] border-t border-[#dbeafe] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              <Link
                to="/"
                className="block px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="w-full flex justify-between items-center px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
                >
                  Services{" "}
                  <ChevronDown
                    className={cn("w-5 h-5 transition-transform", activeDropdown === "services" && "rotate-180")}
                  />
                </button>
                {activeDropdown === "services" && (
                  <div className="pl-6 space-y-1">
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2.5 text-sm font-semibold text-[#334155] hover:text-[#1d4ed8]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/pricing"
                className="block px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
              >
                Pricing
              </Link>

              {/* Mobile Refund & Payment Center */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleDropdown("tools")}
                  className="w-full flex justify-between items-center px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
                >
                  Refund & Payment Center{" "}
                  <ChevronDown
                    className={cn("w-5 h-5 transition-transform", activeDropdown === "tools" && "rotate-180")}
                  />
                </button>
                {activeDropdown === "tools" && (
                  <div className="pl-6 space-y-1">
                    {taxTools.map((item) =>
                      item.href.startsWith("http") ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#334155] hover:text-[#1d4ed8]"
                        >
                          <span>{item.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#1d4ed8]" />
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-3 py-2.5 text-sm font-bold text-[#1d4ed8] hover:underline"
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="block px-3 py-3.5 text-base font-bold text-[#0f172a] hover:bg-[#eff6ff] rounded-lg"
              >
                About Us
              </Link>

              <div className="pt-6 grid grid-cols-1 gap-3">
                <Link
                  to="/login"
                  className="w-full text-center text-[#0f172a] bg-white font-extrabold border-2 border-[#dbeafe] px-4 py-3 rounded-xl"
                >
                  Client Login
                </Link>
                <Link
                  to="/get-started"
                  className="w-full text-center bg-[#1d4ed8] text-white font-extrabold px-4 py-3 rounded-xl shadow-lg"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
